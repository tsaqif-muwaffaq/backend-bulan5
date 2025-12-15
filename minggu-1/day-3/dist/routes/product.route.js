import { Router } from "express";
import { create, deleteById, getAll, getById, search, update } from "../controllers/product.controller";
import { createProductValidation, getProductsByIdValidation } from "../middlewares/product.validation";
import { validate } from "../utils/validator";
const router = Router();
router.get("/", getAll);
// GET BY ID + VALIDASI
router.get("/:id", validate(getProductsByIdValidation), getById);
// GET BY SEARCH
router.get("/search", search);
// CREATE PRODUK + VALIDASI
router.post("/", validate(createProductValidation), create);
// UPDATE PRODUK
router.put("/:id", validate(getProductsByIdValidation), update);
// DELETE PRODUK
router.delete("/:id", validate(getProductsByIdValidation), deleteById);
export default router;
//# sourceMappingURL=product.route.js.map