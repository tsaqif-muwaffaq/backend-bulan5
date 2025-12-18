import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllProduct = async (params) => {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;
    const whereClause = {
        deletedAt: null,
    };
    if (search?.name) {
        whereClause.name = {
            contains: search.name,
            mode: 'insensitive',
        };
    }
    if (search?.min_price || search?.max_price) {
        whereClause.price = {};
        if (search.min_price)
            whereClause.price.gte = search.min_price;
        if (search.max_price)
            whereClause.price.lte = search.max_price;
    }
    const products = await prisma.product.findMany({
        skip,
        take: limit,
        where: whereClause,
        orderBy: sortBy
            ? { [sortBy]: sortOrder }
            : { createdAt: 'desc' },
        include: { category: true },
    });
    const total = await prisma.product.count({
        where: whereClause,
    });
    return {
        products,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
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
            image: data.image
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