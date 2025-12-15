import type { OrderItems } from "../generated/client";
export declare const getAllItems: () => Promise<OrderItems[]>;
export declare const getItemById: (id: number) => Promise<OrderItems>;
export declare const searchItems: (orderId?: number, productId?: number, minQty?: number, maxQty?: number) => Promise<({
    product: {
        name: string;
        id: number;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        categoryId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    };
    order: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        userId: number;
    };
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    quantity: number;
    productId: number;
    orderId: number;
})[]>;
export declare const createItem: (data: {
    orderId: number;
    productId: number;
    quantity: number;
}) => Promise<OrderItems>;
export declare const updateItem: (id: number, data: {
    orderId: number;
    productId: number;
    quantity: number;
}) => Promise<OrderItems>;
export declare const deleteItem: (id: number) => Promise<void>;
//# sourceMappingURL=order_items.service.d.ts.map