// // import express, { type Application, type Request, type Response } from "express";
// // import dotenv from "dotenv";

// // dotenv.config()

// // const app: Application = express();
// // const HOST = process.env.HOST;
// // const PORT = process.env.PORT;

// // app.use(express.json())

// // let products = [
// //   { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
// //   { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
// //   { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
// // ];

// // app.get('/api/products', (_req: Request, res: Response) => {
// //   res.json({
// //     status: true,
// //     jumlah: products.length,
// //     data: products

// //   })
// // });


// // app.get('/api/products/:id', (req: Request, res: Response) => {
// //     if (!req.params.id) {
// //         res.json({
// //             message: "parameter tidak di temukan"
// //         })
// //         return
// //     }

// //     const id = parseInt(req.params.id)
// //     const product = products.find(p => p.id === id)

// //     if (!product) {
// //         res.json({
// //             status: false,
// //             message: "product tidak ditemukan"
// //         })
        
// //     }

// //     res.json({
// //         status: true,
// //         data: product
// //     })
// // })

// // app.get('/api/search', (req: Request, res: Response) => {
// //   const { name, max_price } = req.query;

// //   let result = products;

// //   if (name) {
// //     result = result.filter(p => 
// //       p.nama.toLowerCase().includes((name as string).toLowerCase())
// //     );
// //   }

// //   if (max_price) {
// //     result = result.filter(p => p.harga <= Number(max_price));
// //   }

// //   res.json({
// //     success: true,
// //     filtered_result: result
// //   });

// // })

// // app.get('/', (_req: Request, res: Response) => {
// //   res.json({
// //     message: "Selamat datang di API E-Commerce!",
// //     hari: 3,
// //     status: "Server hidup!"
// //   });
// // });



// // app.listen(PORT, () => {
// //     console.log(`server running at ${HOST}:${PORT}`)
// // })


// import express, { type Request, type Response } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // Data produk
// let products = [
//   { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
//   { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
//   { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
// ];

// // Data untuk endpoint baru
// let categories = [
//   { id: 1, nama: "Elektronik", deskripsi: "Produk elektronik" },
//   { id: 2, nama: "Aksesori", deskripsi: "Aksesori komputer" },
//   { id: 3, nama: "Gaming", deskripsi: "Perangkat gaming" }
// ];

// let orders = [
//   { id: 1, product_id: 1, quantity: 1, total: 15000000, status: "completed" },
//   { id: 2, product_id: 2, quantity: 2, total: 1600000, status: "pending" }
// ];

// let users = [
//   { id: 1, username: "user1", email: "user1@example.com", saldo: 1000000 },
//   { id: 2, username: "user2", email: "user2@example.com", saldo: 2000000 }
// ];

// let reviews = [
//   { id: 1, product_id: 1, user_id: 1, rating: 5, comment: "Bagus!" },
//   { id: 2, product_id: 2, user_id: 2, rating: 4, comment: "Cukup baik" }
// ];

// let promotions = [
//   { id: 1, name: "Diskon Akhir Tahun", discount: 20, valid_until: "2024-12-31" },
//   { id: 2, name: "Flash Sale", discount: 50, valid_until: "2024-01-31" }
// ];

// // 1. ROUTE GET – Home
// app.get('/', (_req: Request, res: Response) => {
//   res.json({
//     message: "Selamat datang di API E-Commerce!",
//     hari: 3,
//     status: "Server hidup!"
//   });
// });

// // 2. ROUTE GET – Tampilkan semua produk
// app.get('/api/products', (_req: Request, res: Response) => {
//   res.json({
//     success: true,
//     jumlah: products.length,
//     data: products
//   });
// });

// // 3. ROUTE GET – Cari berdasarkan ID (Route Params)
// app.get('/api/products/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const product = products.find(p => p.id === id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Produk tidak ditemukan"
//     });
//   }

//   res.json({
//     success: true,
//     data: product
//   });
// });

// // 4. ROUTE GET – Filter dengan Query String
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

// // 5. ROUTE POST – Tambah produk baru
// app.post('/api/products', (req: Request, res: Response) => {
//   const { nama, deskripsi, harga } = req.body;

//   const newProduct = {
//     id: products.length + 1,
//     nama,
//     deskripsi,
//     harga: Number(harga)
//   };

//   products.push(newProduct);

//   res.status(201).json({
//     success: true,
//     message: "Produk berhasil ditambahkan",
//     data: newProduct
//   });
// });

// // 6. ROUTE PUT – Update produk
// app.put('/api/products/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const index = products.findIndex(p => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Produk tidak ada" });
//   }

//   products[index] = { ...products[index], ...req.body };

//   res.json({
//     success: true,
//     message: "Produk berhasil diupdate",
//     data: products[index]
//   });
// });

// // 7. ROUTE DELETE – Hapus produk
// app.delete('/api/products/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const index = products.findIndex(p => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Produk tidak ada" });
//   }

//   const deleted = products.splice(index, 1);

//   res.json({
//     success: true,
//     message: "Produk berhasil dihapus",
//     data: deleted[0]
//   });
// });

// // 8. ROUTE GET – Tampilkan semua kategori
// app.get('/api/categories', (_req: Request, res: Response) => {
//   res.json({
//     success: true,
//     jumlah: categories.length,
//     data: categories
//   });
// });

// // 9. ROUTE GET – Cari kategori berdasarkan ID (Route Params)
// app.get('/api/categories/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const category = categories.find(c => c.id === id);

//   if (!category) {
//     return res.status(404).json({
//       success: false,
//       message: "Kategori tidak ditemukan"
//     });
//   }

//   res.json({
//     success: true,
//     data: category
//   });
// });

// // 10. ROUTE POST – Tambah kategori baru
// app.post('/api/categories', (req: Request, res: Response) => {
//   const { nama, deskripsi } = req.body;

//   const newCategory = {
//     id: categories.length + 1,
//     nama,
//     deskripsi
//   };

//   categories.push(newCategory);

//   res.status(201).json({
//     success: true,
//     message: "Kategori berhasil ditambahkan",
//     data: newCategory
//   });
// });

// // 11. ROUTE PUT – Update kategori
// app.put('/api/categories/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const index = categories.findIndex(c => c.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Kategori tidak ada" });
//   }

//   categories[index] = { ...categories[index], ...req.body };

//   res.json({
//     success: true,
//     message: "Kategori berhasil diupdate",
//     data: categories[index]
//   });
// });

// // 12. ROUTE DELETE – Hapus kategori
// app.delete('/api/categories/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const index = categories.findIndex(c => c.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Kategori tidak ada" });
//   }

//   const deleted = categories.splice(index, 1);

//   res.json({
//     success: true,
//     message: "Kategori berhasil dihapus",
//     data: deleted[0]
//   });
// });

// // 13. ROUTE GET – Tampilkan semua pesanan
// app.get('/api/orders', (_req: Request, res: Response) => {
//   res.json({
//     success: true,
//     jumlah: orders.length,
//     data: orders
//   });
// });

// // 14. ROUTE GET – Cari pesanan berdasarkan ID (Route Params)
// app.get('/api/orders/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const order = orders.find(o => o.id === id);

//   if (!order) {
//     return res.status(404).json({
//       success: false,
//       message: "Pesanan tidak ditemukan"
//     });
//   }

//   res.json({
//     success: true,
//     data: order
//   });
// });

// // 15. ROUTE POST – Tambah pesanan baru
// app.post('/api/orders', (req: Request, res: Response) => {
//   const { product_id, quantity, total, status } = req.body;

//   const newOrder = {
//     id: orders.length + 1,
//     product_id: Number(product_id),
//     quantity: Number(quantity),
//     total: Number(total),
//     status: status || "pending"
//   };

//   orders.push(newOrder);

//   res.status(201).json({
//     success: true,
//     message: "Pesanan berhasil ditambahkan",
//     data: newOrder
//   });
// });

// // 16. ROUTE PUT – Update pesanan
// app.put('/api/orders/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const index = orders.findIndex(o => o.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Pesanan tidak ada" });
//   }

//   orders[index] = { ...orders[index], ...req.body };

//   res.json({
//     success: true,
//     message: "Pesanan berhasil diupdate",
//     data: orders[index]
//   });
// });

// // 17. ROUTE GET – Tampilkan semua pengguna
// app.get('/api/users', (_req: Request, res: Response) => {
//   res.json({
//     success: true,
//     jumlah: users.length,
//     data: users
//   });
// });

// // 18. ROUTE GET – Cari pengguna berdasarkan ID (Route Params)
// app.get('/api/users/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const user = users.find(u => u.id === id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "Pengguna tidak ditemukan"
//     });
//   }

//   res.json({
//     success: true,
//     data: user
//   });
// });

// // 19. ROUTE POST – Tambah pengguna baru
// app.post('/api/users', (req: Request, res: Response) => {
//   const { username, email, saldo } = req.body;

//   const newUser = {
//     id: users.length + 1,
//     username,
//     email,
//     saldo: Number(saldo) || 0
//   };

//   users.push(newUser);

//   res.status(201).json({
//     success: true,
//     message: "Pengguna berhasil ditambahkan",
//     data: newUser
//   });
// });

// // 20. ROUTE GET – Tampilkan semua ulasan
// app.get('/api/reviews', (_req: Request, res: Response) => {
//   res.json({
//     success: true,
//     jumlah: reviews.length,
//     data: reviews
//   });
// });

// // 21. ROUTE GET – Cari ulasan berdasarkan ID (Route Params)
// app.get('/api/reviews/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const review = reviews.find(r => r.id === id);

//   if (!review) {
//     return res.status(404).json({
//       success: false,
//       message: "Ulasan tidak ditemukan"
//     });
//   }

//   res.json({
//     success: true,
//     data: review
//   });
// });

// // 22. ROUTE POST – Tambah ulasan baru
// app.post('/api/reviews', (req: Request, res: Response) => {
//   const { product_id, user_id, rating, comment } = req.body;

//   const newReview = {
//     id: reviews.length + 1,
//     product_id: Number(product_id),
//     user_id: Number(user_id),
//     rating: Number(rating),
//     comment
//   };

//   reviews.push(newReview);

//   res.status(201).json({
//     success: true,
//     message: "Ulasan berhasil ditambahkan",
//     data: newReview
//   });
// });

// // 23. ROUTE GET – Filter produk berdasarkan harga range
// app.get('/api/products/filter/price', (req: Request, res: Response) => {
//   const { min_price, max_price } = req.query;

//   let result = products;

//   if (min_price) {
//     result = result.filter(p => p.harga >= Number(min_price));
//   }

//   if (max_price) {
//     result = result.filter(p => p.harga <= Number(max_price));
//   }

//   res.json({
//     success: true,
//     filtered_result: result
//   });
// });

// // 24. ROUTE GET – Tampilkan semua promosi
// app.get('/api/promotions', (_req: Request, res: Response) => {
//   res.json({
//     success: true,
//     jumlah: promotions.length,
//     data: promotions
//   });
// });

// // 25. ROUTE GET – Cari promosi berdasarkan ID (Route Params)
// app.get('/api/promotions/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const promotion = promotions.find(p => p.id === id);

//   if (!promotion) {
//     return res.status(404).json({
//       success: false,
//       message: "Promosi tidak ditemukan"
//     });
//   }

//   res.json({
//     success: true,
//     data: promotion
//   });
// });

// // 26. ROUTE POST – Tambah promosi baru
// app.post('/api/promotions', (req: Request, res: Response) => {
//   const { name, discount, valid_until } = req.body;

//   const newPromotion = {
//     id: promotions.length + 1,
//     name,
//     discount: Number(discount),
//     valid_until
//   };

//   promotions.push(newPromotion);

//   res.status(201).json({
//     success: true,
//     message: "Promosi berhasil ditambahkan",
//     data: newPromotion
//   });
// });

// // 27. ROUTE DELETE – Hapus promosi
// app.delete('/api/promotions/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id!);
//   const index = promotions.findIndex(p => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Promosi tidak ada" });
//   }

//   const deleted = promotions.splice(index, 1);

//   res.json({
//     success: true,
//     message: "Promosi berhasil dihapus",
//     data: deleted[0]
//   });
// });

// // Middleware untuk 404
// app.use((_req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Endpoint tidak ditemukan"
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server jalan → http://localhost:${PORT}`);
//   console.log(`Total endpoints: 27 endpoint`);
//   console.log(`Coba buka semua route di atas pakai Postman!`);
// });

// ===== INI MATERI =====

import express, { type Application, type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app: Application = express()
const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(express.json())

let products = [
  { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
  { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
  { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];

// Route 1
app.get('/', (_req: Request, res: Response) => {
    res.json({
        message: "Selamat datang di API E-Commerce!",
        hari: 3, 
        status: "Server hidup!"
    })
})

// Route 2
app.get('/api/products', (_req: Request, res: Response) => {  // /api/products ngecek produk
    res.json({
        status: true,
        jumlah: products.length,
        data: products
    })
})

// Route 3
app.get('/api/products/:id', (req: Request, res: Response) => {
    if(!req.params.id) {
        res.json({
            message: "Parameter Gak ada"
        })
        return
    }
    const id = parseInt(req.params.id)
    const product = products.find(p => p.id === id)

    if(!product) {
        res.json({
            status: false,
            message: "Menu gak ditemukan"
        })
    }

    res.json({
        status: true,
        data: product
    })
})

// Route 4
app.get('/api/search', (req: Request, res: Response) => {
  const { name, max_price } = req.query;

  let result = products;

  if (name) {
    result = result.filter(p => 
      p.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (max_price) {
    result = result.filter(p => p.harga <= Number(max_price));
  }

  res.json({
    success: true,
    filtered_result: result
  });
});

// Route 5
app.post('/api/products', (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

    //Opsi 1
    if(harga !== typeof 'number') {
        res.json({
            status: false,
            message: "Harga harus berupa angka bukan string"
        })
    }

    //Opsi 2
//   let number
//   if(typeof harga === 'string') {
//     number = parseInt(harga) 
//   }

  const newProduct = {
    id: products.length + 1,
    nama,
    deskripsi,
    harga
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Menu Baru ditambahkan",
    data: products
  });
});

// Route 6
app.put('/api/products/:id', (req: Request, res: Response) => {

     if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: "ID Menu tidak diberikan"
    });
  }

  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Menu tidak tersedia" });
  }

  products[index] = { ...products[index], ...req.body };

  res.json({
    success: true,
    message: "Menu berhasil diperbarui",
    data: products[index]
  });
});

// Route 7
app.delete('/api/products/:id', (req: Request, res: Response) => {

    if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: "ID produk tidak diberikan"
    });
  }

  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: " Menu tidak tersedia" });
  }

  const deleted = products.splice(index, 1);

  res.json({
    success: true,
    message: "Menu sudah Dihapus",
    data: deleted[0]
  });
});

app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
})
