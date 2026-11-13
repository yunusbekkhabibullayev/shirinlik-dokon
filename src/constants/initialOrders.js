// Boshlang'ich buyurtmalar — Bilet 010 talabiga binoan qat'iy belgilangan:
// Sinovchi 01 | 1 ta shokoladli tort | 22.11.2026 | Yangi
// Sinovchi 02 | 20 ta keks           | 23.11.2026 | Tayyor
// Sinovchi 03 | 2 ta mevali pirog    | 24.11.2026 | Yangi

export const INITIAL_ORDERS = [
  {
    id: "ORD-001",
    customerName: "Sinovchi 01",
    orderTitle: "1 ta shokoladli tort",
    deliveryDate: "22.11.2026",
    status: "Yangi",
    category: "TORTLAR",
    price: "150 000 so'm",
    quantity: "1 dona",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80",
    createdAt: "2026-11-13T09:00:00.000Z",
  },
  {
    id: "ORD-002",
    customerName: "Sinovchi 02",
    orderTitle: "20 ta keks",
    deliveryDate: "23.11.2026",
    status: "Tayyor",
    category: "KEKSLAR",
    price: "120 000 so'm",
    quantity: "20 dona",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&auto=format&fit=crop&q=80",
    createdAt: "2026-11-13T09:30:00.000Z",
  },
  {
    id: "ORD-003",
    customerName: "Sinovchi 03",
    orderTitle: "2 ta mevali pirog",
    deliveryDate: "24.11.2026",
    status: "Yangi",
    category: "PIROGLAR",
    price: "95 000 so'm",
    quantity: "2 dona",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&auto=format&fit=crop&q=80",
    createdAt: "2026-11-13T10:00:00.000Z",
  },
];

export const STORAGE_KEY = "shirinlik_dokoni_buyurtmalar_v2";
