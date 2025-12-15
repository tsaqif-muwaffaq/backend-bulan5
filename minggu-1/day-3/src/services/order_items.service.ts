import { getPrisma } from "../prisma"
import type { OrderItems } from "../generated/client";

const prisma = getPrisma();

export const getAllItems = async(): Promise<OrderItems[]> => {
    return await prisma.orderItems.findMany({
        include: {
            order: true,
            product: true
        }
    })
}

export const getItemById = async(id: number): Promise<OrderItems> => {
    const item = await prisma.orderItems.findUnique({
        where: {
            id
        },
        include: {
            order: true,
            product: true
        }
    })

    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }
    return item;
}

export const searchItems = async (
    orderId?: number,
    productId?: number,
    minQty?: number,
    maxQty?: number
) => {
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

export const createItem = async(data: { orderId: number, productId: number, quantity: number}): Promise<OrderItems> => {
    return await prisma.orderItems.create({
        data : {
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity
        },
        include: {
            order: true,
            product: true
        }
    })
}

export const updateItem = async(id: number, data: { orderId: number, productId: number, quantity: number}): Promise<OrderItems> => {
    const item = await prisma.orderItems.findUnique({
        where: {
            id
        }
    })
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
    })
}

export const deleteItem = async(id: number): Promise<void> => {
    const item = await prisma.orderItems.findUnique({
        where: {
            id
        }
    })
    if (!item) {
        throw new Error("Order item tidak ditemukan");
    }

    await prisma.orderItems.delete({
        where: {
            id
        }
    })
}