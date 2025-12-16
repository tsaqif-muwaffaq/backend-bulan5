import type { Request, Response } from "express";
import * as orderService from "../services/orders.service";
import { successResponse } from "../utils/response";

/* =======================
   GET ALL ORDERS
======================= */
export const getAll = async (_req: Request, res: Response) => {
  const data = await orderService.getAllOrders();
  successResponse(res, "Success", data);
};

/* =======================
   GET ORDER BY ID
======================= */
export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new Error("ID tidak valid");
  }

  const data = await orderService.getOrderById(id);
  successResponse(res, "Success", data);
};

/* =======================
   SEARCH ORDERS
======================= */
export const search = async (req: Request, res: Response) => {
  const userId = req.query.userId ? Number(req.query.userId) : undefined;
  const minTotal = req.query.minTotal ? Number(req.query.minTotal) : undefined;
  const maxTotal = req.query.maxTotal ? Number(req.query.maxTotal) : undefined;

  const data = await orderService.searchOrders(
    userId,
    minTotal,
    maxTotal
  );

  successResponse(res, "Success", data);
};

/* =======================
   CREATE ORDER
======================= */
export const create = async (req: Request, res: Response) => {
  const { userId, items } = req.body;

  if (!userId || isNaN(Number(userId))) {
    throw new Error("User ID tidak valid");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Items tidak boleh kosong");
  }

  const data = await orderService.createOrder(userId, items);
  successResponse(res, "Order created successfully", data, 201);
};

/* =======================
   UPDATE ORDER
======================= */
export const update = async (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const { items } = req.body;

  if (isNaN(orderId)) {
    throw new Error("Order ID tidak valid");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Items tidak boleh kosong");
  }

  const data = await orderService.updateOrder(orderId, items);
  successResponse(res, "Order updated successfully", data);
};

/* =======================
   DELETE ORDER
======================= */
export const remove = async (req: Request, res: Response) => {
  const orderId = Number(req.params.id);

  if (isNaN(orderId)) {
    throw new Error("Order ID tidak valid");
  }

  await orderService.deleteOrder(orderId);
  successResponse(res, "Order deleted successfully", null);
};

/* =======================
   CHECKOUT
======================= */
export const checkout = async (req: Request, res: Response) => {
    const result = await orderService.checkoutOrder(req.body, req.user!.id)
    successResponse(
        res,
        "Order berasil dibuat",
        result,
        null,
        201
    )
}
