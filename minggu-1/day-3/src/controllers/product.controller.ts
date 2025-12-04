import type { Request, Response } from "express";
import { createProduct, deleteProduct, getAllProduct, getByIdProduct, searchProduct, updateProduct } from "../services/product.service";
import { successResponse } from "../utils/response";

export const getAll = (_req: Request, res: Response) => {
    const { products, total } = getAllProduct()
    successResponse(res, "Berhasil mengambil data", {jumlah: total, data: products, })
}

export const getById = (req: Request, res: Response) => {
    if (!req.params.id) throw new Error("id tidak ditemukan");
    const product = getByIdProduct(req.params.id);
    successResponse(res, "Berhasil mengambil data", product);
}

export const search = (req: Request, res: Response) => {
  const { name, max_price, min_price } = req.query;
  const result = searchProduct(name?.toString(), max_price?.toString(), min_price?.toString())
  res.json({
    success: true,
    filtered_result: result
  });
}

export const create = (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;
  const products = createProduct(nama, deskripsi, harga)
  successResponse(res, "Berhasil menambahkan data", products);
}

export const update = (req: Request, res: Response) => {
  const product = updateProduct(req.params.id!, req.body)
  successResponse(res, "Berhasil mengupdate data", product);
}

export const deleteById = (req: Request, res: Response) => {
  const deleted = deleteProduct(req.params.id!);
  successResponse(res, "Berhasil menghapus data", deleted);
}