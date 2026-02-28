export interface ApiProduct {
  id: number;
  nomi: string;
  tavsifi: string;

  rasmlar: {
    id: number;
    rasm: string;
    asosiy: boolean;
  }[];

  xususiyatlar: {
    id: number;
    sarlavha: string;
  }[];

  mahsulot_kategoriyasi: string;  // mahsulot kategoriyasi faqat bitta string
  avtomobillar: string[];         // avtomobillar array

  kategoriyalar?: string[];       // ProductModal uchun optional
  asosiy_rasm?: string;           // optional
}