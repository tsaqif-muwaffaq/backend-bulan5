// // ===== INI MATERI DAN TUGAS =====

// import express, {type Application, type Request, type Response, type NextFunction } from 'express';
// import dotenv from 'dotenv';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import cors from 'cors';
// import { body, param, validationResult, type ValidationChain } from 'express-validator';


// dotenv.config()

// const app: Application = express()
// const HOST = process.env.HOST
// const PORT = process.env.PORT

// app.use(express.json())
// app.use(helmet());
// app.use(cors()); 
// app.use(morgan('dev'));

// interface CustomRequest extends Request {
//   startTime?: number;
// }

// interface Product {
//   id: number;
//   nama: string;
//   deskripsi: string;
//   harga: number;
// }


// let products: Product[] = [
//   { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
//   { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
//   { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
// ];

// app.use((req: CustomRequest, _res: Response, next: NextFunction) => {
//   console.log(`Request masuk: ${req.method} ${req.path}`);
//   req.startTime = Date.now();
//   next();
// });

// app.use((req: Request, res: Response, next: NextFunction) => {
//   const apiKey = req.headers['x-api-key'];
//   if (!apiKey) {
//     return res.status(401).json({
//       success: false,
//       message: "Header X-API-Key wajib diisi untuk akses API!"
//     });
//   }
//   // Simulasi validasi API key (dalam produksi, cek ke database)
//   if (apiKey !== 'secret-api-key-123') {
//     return res.status(403).json({
//       success: false,
//       message: "API Key tidak valid!"
//     });
//   }
//   next();
// });

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data?: unknown;
//   pagination?: {
//     page: number;
//     limit: number;
//     total: number;
//   };
//   errors?: Array<{
//     field: string;
//     message: string;
//   }> | { stack?: string };
// }

// // Success Response Helper
// const successResponse = (
//   res: Response,
//   message: string,
//   data: unknown = null,
//   pagination: { page: number; limit: number; total: number } | null = null,
//   statusCode: number = 200
// ) => {
//   const response: ApiResponse = {
//     success: true,
//     message,
//   };

//   if (data !== null) response.data = data;
//   if (pagination) response.pagination = pagination;

//   return res.status(statusCode).json(response);
// };

// // Error Response Helper
// const errorResponse = (
//   res: Response,
//   message: string,
//   statusCode: number = 400,
//   errors: Array<{ field: string; message: string }> | { stack?: string } | null = null
// ) => {
//   const response: ApiResponse = {
//     success: false,
//     message,
//   };

//   if (errors) response.errors = errors;

//   return res.status(statusCode).json(response);
// };


// const validate = (validations: ValidationChain[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     await Promise.all(validations.map(validation => validation.run(req)));

//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       return next();
//     }

//     const errorList = errors.array().map(err => ({
//       field: err.type === 'field' ? err.path : 'unknown',
//       message: err.msg
//     }));

//     return errorResponse(res, 'Validasi gagal', 400, errorList);
//   };
// };

// // Validasi untuk CREATE & UPDATE produk
// const createProductValidation = [
//   body('nama')
//     .trim()
//     .notEmpty().withMessage('Nama produk wajib diisi')
//     .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  
//   body('deskripsi')
//     .trim()
//     .notEmpty().withMessage('Deskripsi wajib diisi'),
  
//   body('harga')
//     .isNumeric().withMessage('Harga harus angka')
//     .custom(value => value > 0).withMessage('Harga harus lebih dari 0')
// ];

// // Validasi untuk GET by ID produk
// const getProductByIdValidation = [
//   param('id')
//     .isNumeric().withMessage('ID harus angka')
// ];

// // ==================== ROUTES (sama seperti Hari 2 + tambahan validasi) ====================

// app.get('/', (req: CustomRequest, res: Response) => {
//   const waktuProses = Date.now() - (req.startTime || Date.now());
//   successResponse(res, 'API E-Commerce – Hari 4', {
//     hari: 4,
//     status: "Server hidup!",
//     waktuProses: `${waktuProses}ms`
//   }, null, 200);
// });

// // Route 1
// app.get('/', (_req: Request, res: Response) => {
//     successResponse(res, 'API E-Commerce – Hari 4', {
//     hari: 4,
//     status: "Server hidup!"
//   }, null, 200);
// })

// // Route 2
// app.get('/api/products', (_req: Request, res: Response) => {  // /api/products ngecek produk
//     res.json({
//         status: true,
//         jumlah: products.length,
//         data: products
//     })
// })

// // Route 3
// app.get('/api/products/:id', validate(getProductByIdValidation), (req: Request, res: Response) => {
//     if(!req.params.id) {
//         errorResponse(res, "ID produk tidak diberikan", 400);
//         return;
//     }
//     const id = parseInt(req.params.id)
//     const product = products.find(p => p.id === id)

//     if(!product) {
//         res.json({
//             status: false,
//             message: "Menu gak ditemukan"
//         })
//     }

//     res.json({
//         status: true,
//         data: product
//     })
// })

// // Route 4
// app.get('/api/search', (req: Request, res: Response) => {
//   const { name, max_price } = req.query;

//   let result = products;

//   if (name) {
//     result = result.filter(p => 
//       p.nama.toLowerCase().includes((name as string).toLowerCase())
//     );
//   }

//   if (max_price) {
//     result = result.filter(p => p.harga <= Number(max_price));
//   }

//   res.json({
//     success: true,
//     filtered_result: result
//   });
// });

// // Route 5
// app.post('/api/products', validate(createProductValidation), (req: Request, res: Response) => {
//   const { nama, deskripsi, harga } = req.body;

//     //Opsi 1
//     if(harga !== typeof 'number') {
//         errorResponse(res, 'Harga harus angka', 400);
//     }

//     //Opsi 2
// //   let number
// //   if(typeof harga === 'string') {
// //     number = parseInt(harga) 
// //   }

//   const newProduct = {
//     id: products.length + 1,
//     nama,
//     deskripsi,
//     harga
//   };

//   products.push(newProduct);

//   successResponse(res, "Menu berhasil ditambahkan", newProduct);
// });

// // Route 6
// app.put('/api/products/:id', (req: Request, res: Response) => {

//      if (!req.params.id) {
//     errorResponse(res, "ID produk tidak diberikan", 400);
//     return;
//   }

//   const id = parseInt(req.params.id);
//   const index = products.findIndex(p => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Menu tidak tersedia" });
//   }

//   products[index] = { ...products[index], ...req.body };

//   res.json({
//     success: true,
//     message: "Menu berhasil diperbarui",
//     data: products[index]
//   });
// });

// // Route 7
// app.delete('/api/products/:id', (req: Request, res: Response) => {

//     if (!req.params.id) {
//     return res.status(400).json({
//       success: false,
//       message: "ID produk tidak diberikan"
//     });
//   }

//   const id = parseInt(req.params.id);
//   const index = products.findIndex(p => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: " Menu tidak tersedia" });
//   }

//   const deleted = products.splice(index, 1);

//   res.json({
//     success: true,
//     message: "Menu sudah Dihapus",
//     data: deleted[0]
//   });
// });

// const asyncHandler = (fn: Function) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     // Promise.resolve digunakan untuk memastikan fungsi fn yang dijalankan selalu mengembalikan Promise.
//     // Ini penting agar .catch(next) dapat menangkap error yang terjadi, baik dari fungsi async
//     // maupun fungsi synchronous yang melempar error. Tanpa asyncHandler, setiap fungsi controller
//     // yang bersifat async dan berpotensi melempar error perlu dibungkus dengan try-catch manual.
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };

// // Contoh route async (nanti dipakai pas Sequelize)
// app.get('/api/test-async', asyncHandler(async (_req: Request, res: Response) => {
//   await new Promise(resolve => setTimeout(resolve, 100));
//   successResponse(res, "Async berhasil!");
// }));

// // 404 Handler: Middleware ini harus diletakkan PALING AKHIR di antara semua route dan middleware lainnya.
// //              Ini karena Express akan memproses request secara berurutan. Jika suatu request 
// //              tidak cocok dengan route atau middleware sebelumnya, maka request tersebut 
// //              akan mencapai handler ini, yang berarti route yang diakses tidak ditemukan.
// app.use(/.*/, (req: Request, _res: Response) => {
//   throw new Error(`Route ${req.originalUrl} tidak ada di API E-Commerce`);
// });

// // Global Error Handler – INI YANG PALING PENTING HARI INI
// // Middleware ini memiliki empat parameter (err, req, res, next), yang menandakan bahwa ini adalah error handling middleware.
// // Express akan secara otomatis memanggil middleware ini ketika ada error yang terjadi
// // di salah satu route atau middleware sebelumnya (misalnya, dari throw new Error() atau Promise yang di-reject).
// // Ini adalah tempat sentral untuk mengelola semua error, mencegah server crash, 
// // dan mengirimkan respons error yang konsisten kepada klien.
// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   console.error('ERROR:', err.message);

//   // Kalau error validasi dari express-validator sudah ditangani di validate middleware.
//   // Ini untuk error umum lain atau error yang kita throw manual.
//   const statusCode = err.message.includes('tidak ditemukan') ? 404 : 400;
//  errorResponse(
//         res,
//         err.message || 'Terjadi kesalahan server',
//         statusCode,
//         process.env.NODE_ENV === 'development' ? { stack: err.stack } as { stack?: string } : null
//     );
// });

// app.listen(PORT, () => {
//     console.log(`Server running at ${HOST}:${PORT}`);
// })

// ===== INI MATERI DAN TUGAS =====

import express, {type Application, type Request, type Response, type NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { body, param, validationResult, type ValidationChain } from 'express-validator';

dotenv.config()

const app: Application = express()
const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 3000

// ===== MIDDLEWARE =====
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

interface CustomRequest extends Request {
  startTime?: number;
}

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
}

let products: Product[] = [
  { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
  { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
  { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
]

// ===== CUSTOM MIDDLEWARE 1: Hitung Waktu Request =====
app.use((req: CustomRequest, _res: Response, next: NextFunction) => {
  console.log(`Request masuk: ${req.method} ${req.path}`)
  req.startTime = Date.now()
  next()
})

// ===== CUSTOM MIDDLEWARE 2: Validasi API Key =====
app.use((req: Request, _res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key']
  if (!apiKey) {
    throw new Error("Header X-API-Key wajib diisi untuk akses API!")
  }
  
  if (apiKey !== 'secret-api-key-123') {
    throw new Error("API Key tidak valid!")
  }
  
  next()
})

// ===== TIPE DATA UNTUK ERRORS =====
interface ValidationError {
  field: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
  waktuProses?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  errors?: ValidationError[] | { stack?: string } | null;
}

// ===== HELPER FUNCTIONS =====
const successResponse = (
  res: Response,
  message: string,
  data: unknown = null,
  waktuProses?: number,
  pagination: { page: number; limit: number; total: number } | null = null,
  statusCode: number = 200
) => {
  const response: ApiResponse = {
    success: true,
    message,
  }

  if (data !== null) response.data = data
  if (waktuProses !== undefined) response.waktuProses = waktuProses
  if (pagination) response.pagination = pagination

  return res.status(statusCode).json(response)
}

const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  waktuProses?: number,
  errors: ValidationError[] | { stack?: string } | null = null
) => {
  const response: ApiResponse = {
    success: false,
    message,
  }

  if (waktuProses !== undefined) response.waktuProses = waktuProses
  if (errors) response.errors = errors

  return res.status(statusCode).json(response)
}

// ===== ASYNC HANDLER =====
const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// ===== VALIDATION MIDDLEWARE =====
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const errorList: ValidationError[] = errors.array().map(err => ({
      field: err.type === 'field' ? err.path : 'unknown',
      message: err.msg
    }))

    throw new Error("Validasi gagal: " + JSON.stringify(errorList))
  }
}

// ===== VALIDATION RULES =====
const createProductValidation = [
  body('nama')
    .trim()
    .notEmpty().withMessage('Nama produk wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  
  body('deskripsi')
    .trim()
    .notEmpty().withMessage('Deskripsi wajib diisi'),
  
  body('harga')
    .isNumeric().withMessage('Harga harus angka')
    .custom(value => value > 0).withMessage('Harga harus lebih dari 0')
]

const getProductByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
]

const updateProductValidation = [
  param('id').isNumeric().withMessage('ID harus angka'),
  body('nama')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  body('deskripsi')
    .optional()
    .trim()
    .notEmpty().withMessage('Deskripsi tidak boleh kosong'),
  body('harga')
    .optional()
    .isNumeric().withMessage('Harga harus angka')
    .custom(value => value > 0).withMessage('Harga harus lebih dari 0')
]

const deleteProductValidation = [
  param('id').isNumeric().withMessage('ID harus angka')
]

// ===== ROUTES =====

// Route 1: Home dengan waktu proses
app.get('/', (req: CustomRequest, res: Response) => {
  const waktuProses = Date.now() - (req.startTime || Date.now())
  successResponse(res, 'API E-Commerce – Hari 4', {
    hari: 4,
    status: "Server hidup!",
    fitur: [
      "Morgan logging",
      "Helmet security",
      "CORS enabled",
      "API Key authentication",
      "Request timing",
      "Global error handling",
      "Express validation",
      "Async handler"
    ]
  }, waktuProses, null, 200)
})

// Route 2: Get all products
app.get('/api/products', (req: CustomRequest, res: Response) => {
  const waktuProses = Date.now() - (req.startTime || Date.now())
  successResponse(res, 'Berhasil mendapatkan semua produk', products, waktuProses)
})

// Route 3: Get product by ID dengan validasi
app.get('/api/products/:id', validate(getProductByIdValidation), (req: CustomRequest, res: Response) => {
  const id = parseInt(req.params.id!)
  const product = products.find(p => p.id === id)
  
  if (!product) {
    throw new Error(`Produk dengan ID ${id} tidak ditemukan`)
  }
  
  const waktuProses = Date.now() - (req.startTime || Date.now())
  successResponse(res, 'Berhasil mendapatkan produk', product, waktuProses)
})

// Route 4: Search products
app.get('/api/search', (req: CustomRequest, res: Response) => {
  const { name, max_price } = req.query
  const waktuProses = Date.now() - (req.startTime || Date.now())

  let result = products

  if (name) {
    result = result.filter(p => 
      p.nama.toLowerCase().includes((name as string).toLowerCase())
    )
  }

  if (max_price) {
    const maxPriceNum = Number(max_price)
    if (isNaN(maxPriceNum)) {
      throw new Error('Parameter max_price harus angka')
    }
    result = result.filter(p => p.harga <= maxPriceNum)
  }

  // Gunakan successResponse helper
  successResponse(res, 'Hasil pencarian produk', result, waktuProses)
})

// Route 5: Create product dengan validasi
app.post('/api/products', validate(createProductValidation), (req: CustomRequest, res: Response) => {
  const { nama, deskripsi, harga } = req.body
  
  const newProduct: Product = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    nama,
    deskripsi,
    harga: Number(harga)
  }

  products.push(newProduct)
  const waktuProses = Date.now() - (req.startTime || Date.now())
  successResponse(res, "Produk berhasil ditambahkan", newProduct, waktuProses, null, 201)
})

// Route 6: Update product dengan validasi
app.put('/api/products/:id', validate(updateProductValidation), (req: CustomRequest, res: Response) => {
  const id = parseInt(req.params.id!)
  const index = products.findIndex(p => p.id === id)

  if (index === -1) {
    throw new Error(`Produk dengan ID ${id} tidak ditemukan`)
  }

  const updatedProduct = { ...products[index], ...req.body }
  
  // Validasi harga jika diupdate
  if (req.body.harga !== undefined) {
    if (typeof req.body.harga !== 'number' || req.body.harga <= 0) {
      throw new Error('Harga harus angka dan lebih dari 0')
    }
    updatedProduct.harga = req.body.harga
  }

  products[index] = updatedProduct
  const waktuProses = Date.now() - (req.startTime || Date.now())
  
  successResponse(res, "Produk berhasil diperbarui", updatedProduct, waktuProses)
})

// Route 7: Delete product dengan validasi
app.delete('/api/products/:id', validate(deleteProductValidation), (req: CustomRequest, res: Response) => {
  const id = parseInt(req.params.id!)
  const index = products.findIndex(p => p.id === id)

  if (index === -1) {
    throw new Error(`Produk dengan ID ${id} tidak ditemukan`)
  }

  const deletedProduct = products.splice(index, 1)[0]
  const waktuProses = Date.now() - (req.startTime || Date.now())
  
  successResponse(res, "Produk berhasil dihapus", deletedProduct, waktuProses)
})

// ===== ROUTE BARU SESUAI TUGAS =====

// Route 8: Error test route (sengaja lempar error)
app.get('/api/error-test', (_req: CustomRequest, _res: Response) => {
  throw new Error("Ini adalah error yang sengaja dibuat untuk testing!")
})

// Route 9: Async test route dengan asyncHandler
app.get('/api/async-test', asyncHandler(async (req: CustomRequest, res: Response) => {
  // Simulasi async operation
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Simulasi error jika ada query param 'fail'
  if (req.query.fail === 'true') {
    throw new Error("Async operation sengaja gagal!")
  }
  
  const waktuProses = Date.now() - (req.startTime || Date.now())
  successResponse(res, "Async test berhasil!", { 
    message: "Route ini menggunakan asyncHandler",
    timestamp: new Date().toISOString()
  }, waktuProses)
}))

// ===== 404 HANDLER =====
app.use(/.*/, (req: Request) => {
  throw new Error(`Route ${req.originalUrl} tidak ditemukan`)
})

// ===== GLOBAL ERROR HANDLER =====
app.use((err: Error, req: CustomRequest, res: Response, _next: NextFunction) => {
  console.error('ERROR:', err.message)
  
  const waktuProses = Date.now() - (req.startTime || Date.now())
  
  // Tentukan status code berdasarkan pesan error
  let statusCode = 500
  if (err.message.includes('tidak ditemukan')) {
    statusCode = 404
  } else if (err.message.includes('X-API-Key')) {
    statusCode = 401
  } else if (err.message.includes('tidak valid')) {
    statusCode = 403
  } else if (err.message.includes('Validasi gagal') || err.message.includes('harus')) {
    statusCode = 400
  }
  
  // Cek jika error berasal dari validasi
  let errorData: ValidationError[] | { stack?: string } | null = null
  let errorMessage = err.message
  
  if (err.message.includes('Validasi gagal:')) {
    try {
      const errorStr = err.message.replace('Validasi gagal: ', '')
      const parsedErrors = JSON.parse(errorStr) as ValidationError[]
      errorData = parsedErrors
      // Update pesan error menjadi lebih user-friendly
      errorMessage = 'Validasi input gagal'
    } catch {
      // Jika parsing gagal, gunakan pesan asli
      errorData = null
    }
  } else if (process.env.NODE_ENV === 'development' && err.stack) {
    // Hanya tampilkan stack trace di development
    errorData = { stack: err.stack }
  }
  
  errorResponse(
    res,
    errorMessage, // Gunakan pesan yang sudah diperbaiki
    statusCode,
    waktuProses,
    errorData
  )
})
// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${HOST}:${PORT}`)
  console.log(`🔑 API Key yang digunakan: secret-api-key-123`)
  console.log(`📚 Dokumentasi API:`)
  console.log(`   GET  /                       - Halaman utama`)
  console.log(`   GET  /api/products           - Get semua produk`)
  console.log(`   GET  /api/products/:id       - Get produk by ID`)
  console.log(`   GET  /api/search?name=...    - Cari produk`)
  console.log(`   POST /api/products           - Tambah produk`)
  console.log(`   PUT  /api/products/:id       - Update produk`)
  console.log(`   DELETE /api/products/:id     - Hapus produk`)
  console.log(`   GET  /api/error-test         - Test error handling`)
  console.log(`   GET  /api/async-test         - Test async handler`)
  console.log(`\n⚠️  Jangan lupa gunakan header: X-API-Key: secret-api-key-123`)
})