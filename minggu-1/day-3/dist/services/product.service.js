import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllProduct = async () => {
    const products = await prisma.product.findMany({ include: { category: true },
        where: {
            deletedAt: null
        }
    });
    const total = products.length;
    return { products, total };
};
export const getByIdProduct = async (id) => {
    const numId = parseInt(id);
    const product = await prisma.product.findUnique({
        where: {
            id: numId,
            deletedAt: null
        },
        include: { category: true },
    });
    if (!product) {
        throw new Error("Produk dengan ID tersebut tidak ditemukan");
    }
    return product;
};
export const searchProduct = async (name, min_price, max_price) => {
    return await prisma.product.findMany({
        where: {
            deletedAt: null,
            ...(name && {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }),
            price: {
                ...(min_price && { gte: min_price }),
                ...(max_price && { lte: max_price }),
            }
        },
        include: { category: true }
    });
};
export const createProduct = async (data) => {
    return await prisma.product.create({
        data: {
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId ?? null,
        }
    });
};
export const updateProduct = async (id, data) => {
    await getByIdProduct(id);
    const numId = parseInt(id);
    return await prisma.product.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data
    });
};
export const deleteProduct = async (id) => {
    const numId = parseInt(id);
    return await prisma.product.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data: { deletedAt: new Date() }
    });
};
//# sourceMappingURL=product.service.js.map