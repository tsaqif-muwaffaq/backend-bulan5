import type { Order } from "../generated/client";
export declare const getAllOrders: () => Promise<Order[]>;
export declare const getOrderById: (id: number) => Promise<Order>;
export declare const searchOrders: (userId?: number, maxTotal?: number, minTotal?: number) => Promise<({
    orderItems: ({
        product: {
            name: string;
            id: number;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            image: string;
            categoryId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        productId: number;
        orderId: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    total: import("@prisma/client-runtime-utils").Decimal;
    userId: number;
})[]>;
export declare const createOrder: (userId: number, items: {
    productId: number;
    quantity: number;
}[]) => Promise<{
    orderItems: ({
        product: {
            name: string;
            id: number;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            image: string;
            categoryId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        productId: number;
        orderId: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    total: import("@prisma/client-runtime-utils").Decimal;
    userId: number;
}>;
export declare const updateOrder: (id: number, items: {
    productId: number;
    quantity: number;
}[]) => Promise<{
    orderItems: ({
        product: {
            name: string;
            id: number;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            image: string;
            categoryId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        productId: number;
        orderId: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    total: import("@prisma/client-runtime-utils").Decimal;
    userId: number;
}>;
export declare const deleteOrder: (id: number) => Promise<Order>;
export interface CreateOrder {
    orderItems: OrderItems[];
}
export interface OrderItems {
    productId: number;
    quantity: number;
}
export declare const checkoutOrder: (data: CreateOrder, userId: number) => Promise<{
    orderItems: ({
        product: {
            name: string;
            id: number;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            image: string;
            categoryId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        productId: number;
        orderId: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    total: import("@prisma/client-runtime-utils").Decimal;
    userId: number;
}>;
//# sourceMappingURL=orders.service.d.ts.map