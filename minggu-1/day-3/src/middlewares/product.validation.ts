import type { NextFunction, Response, Request } from "express";
import { body, param, validationResult, type ValidationChain } from "express-validator";
import { errorResponse } from "../utils/response";

export const validate = (rules: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(rules.map(r => r.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return errorResponse(
      res,
      "Validasi gagal",
      400,
      errors.array().map(err => ({
        field: err.type === "field" ? err.path : null,
        message: err.msg
      }))
    );
  };
};

export const productCreateValidation = [
  body('name')
        .trim()
        .notEmpty().withMessage('Nama produk wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),

    body('description')
        .trim()
        .notEmpty().withMessage('Deskripsi wajib diisi'),

    body('price')
        .isNumeric().withMessage('Harga harus angka')
        .custom(value => value > 0).withMessage('Harga harus lebih dari 0'),


    body('stock')
        .isNumeric().withMessage('Stock harus angka')
        .custom(value => value > 0).withMessage('Stock harus lebih dari 0'),

];

export const productIdValidation = [
  param("id").isNumeric().withMessage("ID harus angka")
];