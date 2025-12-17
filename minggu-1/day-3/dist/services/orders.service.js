import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });
};
export const getOrderById = async (id) => {
    const data = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });
    if (!data || data.deletedAt !== null) {
        throw new Error("Order tidak ditemukan");
    }
    return data;
};
export const searchOrders = async (userId, maxTotal, minTotal) => {
    return await prisma.order.findMany({
        where: {
            ...(userId !== undefined && { user_id: userId }),
            total: {
                ...(minTotal !== undefined && { gte: minTotal }),
                ...(maxTotal !== undefined && { lte: maxTotal }),
            },
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            },
        }
    });
};
export const createOrder = async (userId, items) => {
    if (!items || items.length === 0) {
        throw new Error("Items tidak boleh kosong");
    }
    const total = await Promise.all(items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: { id: item.productId }
        });
        if (!product) {
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        }
        return Number(product.price) * item.quantity;
    })).then(prices => prices.reduce((a, b) => a + b, 0));
    return prisma.order.create({
        data: {
            userId,
            total,
            orderItems: {
                create: items.map(item => ({
                    quantity: item.quantity,
                    product: {
                        connect: { id: item.productId }
                    }
                }))
            }
        },
        include: {
            orderItems: {
                include: { product: true }
            }
        }
    });
};
export const updateOrder = async (id, items) => {
    await getOrderById(id);
    await prisma.orderItems.deleteMany({
        where: { orderId: id }
    });
    const total = await Promise.all(items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: { id: item.productId }
        });
        if (!product) {
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        }
        return Number(product.price) * item.quantity;
    })).then(prices => prices.reduce((a, b) => a + b, 0));
    return prisma.order.update({
        where: { id },
        data: {
            total,
            orderItems: {
                create: items.map(item => ({
                    quantity: item.quantity,
                    product: {
                        connect: { id: item.productId }
                    }
                }))
            }
        },
        include: {
            orderItems: {
                include: { product: true }
            }
        }
    });
};
export const deleteOrder = async (id) => {
    await getOrderById(id);
    await prisma.orderItems.deleteMany({
        where: {
            orderId: id
        }
    });
    return await prisma.order.delete({
        where: {
            id
        }
    });
};
export const checkoutOrder = async (data, userId) => {
    return await prisma.$transaction(async (tx) => {
        let total = 0;
        const orderItemsData = [];
        // 1. Loop orderItems → ambil product asli
        for (const item of data.orderItems) {
            const product = await tx.product.findUnique({
                where: { id: item.productId }
            });
            if (!product) {
                throw new Error(`Product ID ${item.productId} not found`);
            }
            // 2. Validasi stok
            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product ${product.name}`);
            }
            // 3. Hitung total dari harga DB
            const price = Number(product.price);
            total += price * item.quantity;
            // 4. Siapkan data orderItems
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
            });
            // 5. Update stok
            await tx.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
        }
        // 6. Create order + orderItems (nested write)
        const newOrder = await tx.order.create({
            data: {
                userId: userId,
                total,
                orderItems: {
                    create: orderItemsData
                }
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return newOrder;
    });
};
//# sourceMappingURL=orders.service.js.map