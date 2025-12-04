export interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
}

// DATA PRODUK
export let products: Product[] = [
  { id: 1, nama: "Celana Jeans", deskripsi: "Baggy Jeans Loose Oversize", harga: 177900 },
  { id: 2, nama: "Kemeja", deskripsi: "kemeja lengan panjang kasual slimfit", harga: 188000 },
  { id: 3, nama: "Sendal", deskripsi: "Sandal Crocs Unisex Classic Clog", harga: 230000 }
];