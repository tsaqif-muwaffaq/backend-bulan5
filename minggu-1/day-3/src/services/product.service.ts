import { Prisma, type Product } from "../generated/client";
import * as productRepository from "../repository/product.repository";

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
    min_price?: number;
    max_price?: number;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface productListResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllProduct = async (
  params: FindAllParams
): Promise<productListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: Prisma.ProductWhereInput = {
    deletedAt: null,
  };

  if (search?.name) {
    whereClause.name = {
      contains: search.name,
      mode: "insensitive",
    };
  }

  if (search?.min_price || search?.max_price) {
    whereClause.price = {};
    if (search.min_price) whereClause.price.gte = search.min_price;
    if (search.max_price) whereClause.price.lte = search.max_price;
  }

  const sortCriteria: Prisma.ProductOrderByWithRelationInput = sortBy
    ? {
        [sortBy]: sortOrder || "desc",
      }
    : {
        createdAt: "desc",
      };

  const products = await productRepository.list(
    skip,
    limit,
    whereClause,
    sortCriteria
  );

  const total = await productRepository.countAll(whereClause);

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getByIdProduct = async (id: string) => {
  const numId = parseInt(id);
  const product = await productRepository.findById(numId);

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return product;
};

// export const searchProduct = async (
//   name?: string,
//   min_price?: number,
//   max_price?: number
// ): Promise<Product[]> => {
//   return await prisma.product.findMany({
//     where: {
//       deletedAt: null,
//       ...(name && {
//         name: {
//           contains: name,
//           mode: "insensitive",
//         },
//       }),
//       price: {
//         ...(min_price && { gte: min_price }),
//         ...(max_price && { lte: max_price }),
//       },
//     },
//     include: { category: true },
//   });
// };

export const createProduct = async (
  data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    image: string;
    categoryId?: number;
  }
): Promise<Product> => {
  return await productRepository.create(data);
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  await getByIdProduct(id);

  const numId = parseInt(id);

  return await productRepository.update(numId, data);
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const numId = parseInt(id);

  return await productRepository.softDelete(numId);
};
