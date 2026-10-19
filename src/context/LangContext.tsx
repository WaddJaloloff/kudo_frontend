import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "uz" | "ru" | "en";

const T = {
  uz: {
    home: "Bosh sahifa",
    catalog: "Katalog",
    cart: "Savat",
    addToCart: "Savatga qo'shish",
    inCart: "Savatda bor",
    added: "Qo'shildi!",
    cartEmpty: "Savat bo'sh",
    cartEmptyDesc: "Mahsulotlarni savatga qo'shing",
    placeOrder: "Buyurtma berish",
    itemCount: (n: number) => `${n} ta mahsulot`,
    clearCart: "Tozalash",
    searchPlaceholder: "Mahsulot qidirish...",
    orderTitle: "Buyurtma berish",
    personalInfo: "Shaxsiy ma'lumotlar",
    name: "Ismingiz",
    namePlaceholder: "Ism va familiya",
    nameRequired: "Ism majburiy",
    nameMin: "Kamida 2 ta harf",
    phone: "Telefon raqam",
    phonePlaceholder: "+998 90 123 45 67",
    phoneRequired: "Telefon raqam majburiy",
    phoneInvalid: "Noto'g'ri telefon raqam",
    carModel: "Mashina turi",
    carModelPlaceholder: "Masalan: Cobalt 2021, Nexia 3...",
    carModelRequired: "Mashina turini kiriting",
    comment: "Izoh (ixtiyoriy)",
    commentPlaceholder: "Qo'shimcha ma'lumot...",
    deliveryAddress: "Yetkazib berish manzili",
    mapHint: "Xaritada yetkazib berish joyini belgilang",
    mapSearch: "Manzil qidirish...",
    myLocation: "Mening joylashuvim",
    locationRequired: "Iltimos, xaritadan manzilni belgilang",
    confirm: "Buyurtmani tasdiqlash",
    sending: "Yuborilmoqda...",
    orderSuccess: "Buyurtma qabul qilindi!",
    orderSuccessDesc: "Tez orada operatorimiz siz bilan bog'lanadi",
    goHome: "Bosh sahifaga",
    allCats: "Barchasi",
    productCount: "100 dan ortiq turdagi avtomobil ehtiyot qismlari va kimyoviy mahsulotlar",
    loading: "Mahsulotlar yuklanmoqda...",
    call: "Qo'ng'iroq qilish",
    features: "Xususiyatlari",
    mapLoading: "Xarita yuklanmoqda...",
    markLocation: "Yetkazib berish joyini xaritada bosib belgilang",
    searching: "Qidirilmoqda...",
    noResults: "Natija topilmadi",
    locationError: "Joylashuv aniqlanmadi",
    goToProducts: "Mahsulotlarga o'tish",
    cartSummary: "Savat",
    // Why choose section
    advantagesLabel: "Afzalliklar",
    whyKudo: "Nima uchun KUDO?",
    feat1Title: "Kafolatlangan sifat",
    feat1Desc: "Barcha mahsulotlar sertifikatlangan va sifat nazoratidan o'tgan.",
    feat2Title: "Qulay narx",
    feat2Desc: "Raqobatbardosh narxlar va muntazam chegirmalar.",
    feat3Title: "Yetkazib berish",
    feat3Desc: "O'zbekiston bo'ylab tez va ishonchli yetkazib berish xizmati.",
    statOriginal: "Original",
    statDealers: "Dilerlar",
    statService: "Xizmat",
    // Catalog section
    products: "Mahsulotlar",
    seeMore: "Ko'proq ko'rish →",
    // Contact section
    contactLabel: "Aloqa",
    contactTitle: "Biz bilan bog'laning",
    contactPhone: "Telefon",
    contactAddress: "Manzil",
    contactHours: "Ish vaqti",
    contactTgBot: "Telegram Bot",
    contactTgAdmin: "Telegram Admin",
    contactInsta: "Instagram",
  },
  ru: {
    home: "Главная",
    catalog: "Каталог",
    cart: "Корзина",
    addToCart: "В корзину",
    inCart: "В корзине",
    added: "Добавлено!",
    cartEmpty: "Корзина пуста",
    cartEmptyDesc: "Добавьте товары в корзину",
    placeOrder: "Оформить заказ",
    itemCount: (n: number) => `${n} ${n === 1 ? "товар" : n < 5 ? "товара" : "товаров"}`,
    clearCart: "Очистить",
    searchPlaceholder: "Поиск товара...",
    orderTitle: "Оформление заказа",
    personalInfo: "Личные данные",
    name: "Ваше имя",
    namePlaceholder: "Имя и фамилия",
    nameRequired: "Имя обязательно",
    nameMin: "Минимум 2 символа",
    phone: "Номер телефона",
    phonePlaceholder: "+998 90 123 45 67",
    phoneRequired: "Номер телефона обязателен",
    phoneInvalid: "Неверный номер телефона",
    carModel: "Марка/модель авто",
    carModelPlaceholder: "Например: Cobalt 2021, Nexia 3...",
    carModelRequired: "Укажите марку автомобиля",
    comment: "Комментарий (необязательно)",
    commentPlaceholder: "Дополнительная информация...",
    deliveryAddress: "Адрес доставки",
    mapHint: "Укажите место доставки на карте",
    mapSearch: "Поиск адреса...",
    myLocation: "Моё местоположение",
    locationRequired: "Пожалуйста, укажите адрес на карте",
    confirm: "Подтвердить заказ",
    sending: "Отправка...",
    orderSuccess: "Заказ принят!",
    orderSuccessDesc: "Наш оператор свяжется с вами в ближайшее время",
    goHome: "На главную",
    allCats: "Все",
    productCount: "Более 100 видов автозапчастей и химии",
    loading: "Загрузка товаров...",
    call: "Позвонить",
    features: "Характеристики",
    mapLoading: "Загрузка карты...",
    markLocation: "Нажмите на карту, чтобы выбрать место доставки",
    searching: "Поиск...",
    noResults: "Ничего не найдено",
    locationError: "Не удалось определить местоположение",
    goToProducts: "К товарам",
    cartSummary: "Корзина",
    // Why choose section
    advantagesLabel: "Преимущества",
    whyKudo: "Почему KUDO?",
    feat1Title: "Гарантированное качество",
    feat1Desc: "Все товары сертифицированы и прошли контроль качества.",
    feat2Title: "Доступные цены",
    feat2Desc: "Конкурентные цены и регулярные скидки.",
    feat3Title: "Доставка",
    feat3Desc: "Быстрая и надёжная доставка по всему Узбекистану.",
    statOriginal: "Оригинал",
    statDealers: "Дилеров",
    statService: "Сервис",
    // Catalog section
    products: "Товары",
    seeMore: "Смотреть больше →",
    // Contact section
    contactLabel: "Контакты",
    contactTitle: "Свяжитесь с нами",
    contactPhone: "Телефон",
    contactAddress: "Адрес",
    contactHours: "Часы работы",
    contactTgBot: "Telegram Bot",
    contactTgAdmin: "Telegram Admin",
    contactInsta: "Instagram",
  },
  en: {
    home: "Home",
    catalog: "Catalog",
    cart: "Cart",
    addToCart: "Add to cart",
    inCart: "In cart",
    added: "Added!",
    cartEmpty: "Cart is empty",
    cartEmptyDesc: "Add products to your cart",
    placeOrder: "Place order",
    itemCount: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
    clearCart: "Clear",
    searchPlaceholder: "Search products...",
    orderTitle: "Place Order",
    personalInfo: "Personal information",
    name: "Your name",
    namePlaceholder: "Full name",
    nameRequired: "Name is required",
    nameMin: "At least 2 characters",
    phone: "Phone number",
    phonePlaceholder: "+998 90 123 45 67",
    phoneRequired: "Phone number is required",
    phoneInvalid: "Invalid phone number",
    carModel: "Car model",
    carModelPlaceholder: "E.g. Cobalt 2021, Nexia 3...",
    carModelRequired: "Please enter your car model",
    comment: "Comment (optional)",
    commentPlaceholder: "Additional information...",
    deliveryAddress: "Delivery address",
    mapHint: "Select delivery location on the map",
    mapSearch: "Search address...",
    myLocation: "My location",
    locationRequired: "Please select location on the map",
    confirm: "Confirm order",
    sending: "Sending...",
    orderSuccess: "Order accepted!",
    orderSuccessDesc: "Our operator will contact you soon",
    goHome: "Go to home",
    allCats: "All",
    productCount: "100+ types of auto parts and chemicals",
    loading: "Loading products...",
    call: "Call us",
    features: "Features",
    mapLoading: "Loading map...",
    markLocation: "Click on the map to select delivery location",
    searching: "Searching...",
    noResults: "No results found",
    locationError: "Could not detect location",
    goToProducts: "Browse products",
    cartSummary: "Cart",
    // Why choose section
    advantagesLabel: "Advantages",
    whyKudo: "Why KUDO?",
    feat1Title: "Guaranteed quality",
    feat1Desc: "All products are certified and quality-checked.",
    feat2Title: "Affordable prices",
    feat2Desc: "Competitive prices and regular discounts.",
    feat3Title: "Delivery",
    feat3Desc: "Fast and reliable delivery across Uzbekistan.",
    statOriginal: "Original",
    statDealers: "Dealers",
    statService: "Service",
    // Catalog section
    products: "Products",
    seeMore: "See more →",
    // Contact section
    contactLabel: "Contact",
    contactTitle: "Get in touch",
    contactPhone: "Phone",
    contactAddress: "Address",
    contactHours: "Working hours",
    contactTgBot: "Telegram Bot",
    contactTgAdmin: "Telegram Admin",
    contactInsta: "Instagram",
  },
} as const;

export type Translations = typeof T.uz;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

const LANG_KEY = "kudo_lang";

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY) as Lang;
      if (saved && (saved === "uz" || saved === "ru" || saved === "en")) return saved;
    } catch {}
    return "uz";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
};

// Small language switcher component
export const LangSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ["uz", "ru", "en"];
  return (
    <div className={`flex items-center gap-0.5 rounded-lg bg-black/30 backdrop-blur-sm p-0.5 border border-white/10 ${className}`}>
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 rounded-md text-xs font-bold uppercase transition-all ${
            lang === l
              ? "bg-white text-primary shadow-sm"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};
