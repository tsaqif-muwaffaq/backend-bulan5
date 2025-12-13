import { errorResponse } from "../utils/response";
import { Prisma } from "../generated/client";
export const errorHandler = (err, _req, res, _next) => {
    console.error('ERROR:', err.message);
    const statusCode = err.message.includes('tidak ditemukan') ? 404 : 400;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            errorResponse(res, err.message, statusCode, process.env.NODE_ENV === 'development' ? { stack: err.stack } : null);
        }
        if (err.code === 'P2025') {
            errorResponse(res, `data tidak ditemukan \n${err.message}`, statusCode, process.env.NODE_ENV === 'development' ? { stack: err.stack } : null);
        }
    }
    errorResponse(res, err.message || 'terjadi kesalahan', statusCode, process.env.NODE_ENV === 'development' ? { stack: err.stack } : null);
};
//# sourceMappingURL=error.handler.js.map