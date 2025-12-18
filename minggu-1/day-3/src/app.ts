import type { Request, Response, NextFunction, Application } from 'express';
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
import authRouter from './routes/auth.route';
import profileRouter from './routes/profile.route'

const app: Application = express();

/* =====================
 * GLOBAL MIDDLEWARE
 * ===================== */
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.set("querryparser", "extended");
app.use(express.static('public'));


/* =====================
 * REQUEST TIMER
 * ===================== */
app.use((req: Request, _res: Response, next: NextFunction) => {
  (req as any).startTime = Date.now();
  next();
});

/* =====================
 * API KEY MIDDLEWARE
 * ===================== */
app.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return errorResponse(res, 'Header X-API-Key wajib diisi!', 401);
  }

  if (apiKey !== 'secret-api-key-123') {
    return errorResponse(res, 'API Key tidak valid!', 403);
  }

  next();
});

/* =====================
 * ROOT ROUTE
 * ===================== */
app.get('/', (req: Request, res: Response) => {
  const time = Date.now() - (req as any).startTime;

  successResponse(res, 'API Produk aktif!', {
    waktuProses: `${time}ms`,
  });
});

/* =====================
 * ROUTE TEST ERROR
 * ===================== */
app.get('/api/error-test', () => {
  throw new Error('Ini error test!');
});

/* =====================
 * API ROUTES
 * ===================== */
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/order-items', orderItemRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

/* =====================
 * 404 FALLBACK
 * ===================== */
app.use((req: Request) => {
  throw new Error(`Route ${req.originalUrl} tidak ditemukan!`);
});

/* =====================
 * GLOBAL ERROR HANDLER
 * ===================== */
app.use(errorHandler);

export default app;