import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middlewares/error.handler';
import { errorResponse, successResponse } from './utils/response';
import productRouter from './routes/product.route';
import categoryRouter from './routes/category.route';
import orderRouter from './routes/order.routes';
import orderItemRouter from './routes/order_items.routes';
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use((req, _res, next) => {
    req.startTime = Date.now();
    next();
});
app.use((req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        return errorResponse(res, "Header X-API-Key wajib diisi!", 401);
    }
    if (apiKey !== "secret-api-key-123") {
        return errorResponse(res, "API Key tidak valid!", 403);
    }
    next();
});
app.get("/", (req, res) => {
    const time = Date.now() - req.startTime;
    successResponse(res, "API Produk aktif!", { waktuProses: `${time}ms` });
});
// ROUTE TEST ERROR
app.get("/api/error-test", () => {
    throw new Error("Ini error test!");
});
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/order-items', orderItemRouter);
// 404 fallback
app.use((req) => {
    throw new Error(`Route ${req.originalUrl} tidak ditemukan!`);
});
// GLOBAL ERROR HANDLER
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map