import motorOilImg from "@/assets/products/image.png";
import brakeFluidImg from "@/assets/products/yonilgi-nasosi.png";
import antifreezeImg from "@/assets/products/rul-mexanizimi.png";
import filtersImg from "@/assets/products/filters.jpg";
import batteryImg from "@/assets/products/battery.jpg";
import autoChemistryImg from "@/assets/products/auto-chemistry.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  details: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ichki Granata",
    category: "Ehtiyot qismlar",
    description: "Matiz, Spaek, Nexia/R3 AT/LH/RH, Cobalt MT/AT/LH/RH, Gentra AT/LH/RH",
    image: motorOilImg,
    details:
      "KUDO motor moylari dvigatelni ishqalanishdan himoya qiladi, yonilg'i tejamkorligini oshiradi va dvigatel umrini uzaytiradi. Barcha turdagi benzin va dizel dvigatellari uchun mos.",
    features: [
      "Sintetik va yarim sintetik turlar",
      "5W-30, 5W-40, 10W-40 klasslar",
      "API SN/CF sertifikati",
      "Dvigatelni mukammal himoya qiladi",
    ],
  },
  {
    id: "2",
    name: "Yonilg'i nasosi",
    category: "Ehtiyot qismlar",
    description: "Matiz, Nexia, Spark, Cobalt, Lacetti",
    image: brakeFluidImg,
    details:
      "Yuqori qaynash nuqtasiga ega tormoz suyuqliklari — xavfsiz haydash uchun. DOT 3 va DOT 4 standartlariga mos keladi.",
    features: [
      "DOT 3 va DOT 4 standartlari",
      "Yuqori qaynash nuqtasi",
      "Korroziyadan himoya",
      "Barcha tormoz tizimlari uchun mos",
    ],
  },
  {
    id: "3",
    name: "Rul Mexanizimi",
    category: "Ehtiyot qismlar",
    description: "Damas, Aniq boshqaruvchanlik va barqarorlik uchun rul mexanizimi",
    image: antifreezeImg,
    details:
      "KUDO antifrizlari dvigatelni haddan tashqari qizishdan va muzlashdan himoya qiladi. Uzoq muddat samarali ishlaydi.",
    features: [
      "G11, G12, G12+ turlari",
      "-40°C gacha himoya",
      "Korroziyaga qarshi",
      "Uzoq xizmat muddati",
    ],
  },
  // {
  //   id: "4",
  //   name: "Filtrlash tizimlari",
  //   category: "Filtrlar",
  //   description: "Havo, moy va yoqilg'i filtrlari — barcha markalar uchun",
  //   image: filtersImg,
  //   details:
  //     "Yuqori sifatli filtrlar dvigatelga toza havo va moy yetkazib beradi, dvigatel samaradorligini oshiradi.",
  //   features: [
  //     "Havo filtrlari",
  //     "Moy filtrlari",
  //     "Yoqilg'i filtrlari",
  //     "200+ avtomobil markasiga mos",
  //   ],
  // },
  // {
  //   id: "5",
  //   name: "Akkumulyatorlar",
  //   category: "Elektr",
  //   description: "Uzoq muddatli va ishonchli akkumulyator batareyalar",
  //   image: batteryImg,
  //   details:
  //     "KUDO akkumulyatorlari barcha ob-havo sharoitlarida ishonchli ishga tushirishni ta'minlaydi. 2 yillik kafolat bilan.",
  //   features: [
  //     "60Ah, 75Ah, 100Ah sig'imlar",
  //     "Sovuq haroratda ishonchli ishga tushirish",
  //     "2 yillik kafolat",
  //     "Texnik xizmat ko'rsatishsiz",
  //   ],
  // },
  // {
  //   id: "6",
  //   name: "Avtokimyo",
  //   category: "Kimyo",
  //   description: "Tozalash, himoya va parvarishlash vositalari",
  //   image: autoChemistryImg,
  //   details:
  //     "Avtomobilingizni professional darajada parvarish qilish uchun kimyoviy vositalar to'plami.",
  //   features: [
  //     "Dvigatel tozalagichlar",
  //     "Salon tozalash vositalari",
  //     "Himoya vosk va polirolar",
  //     "Shisha tozalagichlar",
  //   ],
  // },
];
