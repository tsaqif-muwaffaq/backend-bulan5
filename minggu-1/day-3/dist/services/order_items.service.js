import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllItems = async () => {
    return await prisma.orderItems.findMany({
        include: {
            order: true,
            product: true
        }
    });
};
export const getItemById = async (id) => {
    const item = await prisma.orderItems.findUnique({
        where: {
            id
        },
        include: {
            order: true,
            product: true
        }
    });
    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }
    return item;
};
export const searchItems = async (orderId, productId, minQty, maxQty) => {
    return await prisma.orderItems.findMany({
        where: {
            ...(orderId !== undefined && { order_id: orderId }),
            ...(productId !== undefined && { product_id: productId }),
            quantity: {
                ...(minQty !== undefined && { gte: minQty }),
                ...(maxQty !== undefined && { lte: maxQty })
            }
        },
        include: {
            order: true,
            product: true
        }
    });
};
export const createItem = async (data) => {
    return await prisma.orderItems.create({
        data: {
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity
        },
        include: {
            order: true,
            product: true
        }
    });
};
export const updateItem = async (id, data) => {
    const item = await prisma.orderItems.findUnique({
        where: {
            id
        }
    });
    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }
    return await prisma.orderItems.update({
        where: {
            id
        },
        data: {
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity
        },
        include: {
            order: true,
            product: true
        }
    });
};
export const deleteItem = async (id) => {
    const item = await prisma.orderItems.findUnique({
        where: {
            id
        }
    });
    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }
    await prisma.orderItems.delete({
        where: {
            id
        }
    });
};
//# sourceMappingURL=order_items.service.js.map