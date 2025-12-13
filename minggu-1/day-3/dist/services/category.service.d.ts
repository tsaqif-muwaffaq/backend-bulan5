export declare const getAllCategories: () => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const getCategoryById: (id: string) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const createCategory: (name: string) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateCategory: (id: string, data: {
    name?: string;
}) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteCategory: (id: string) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=category.service.d.ts.map