import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  EN: {
    home: "Home",
    earn: "Earn",
    luckyDraw: "🎁 Lucky Draw",
    wallet: "Wallet",
    profile: "Profile",
    welcome: "WELCOME TO GOOVO REAL",
    heroTitle1: "Search. Play. ",
    heroTitle2: "Earn.",
    heroSub: "Watch Ads, Enter Lucky Draws & Redeem Via EasyPaisa / JazzCash / Bank.",
    searchPlaceholder: "Search anything...",
    yourBalance: "YOUR BALANCE",
    earnCoinsTitle: "Earn Coins",
    earnCoinsDesc: "Watch ads, play games & take quizzes.",
    startEarning: "Start Earning",
    luckyDrawTitle: "Lucky Draw",
    luckyDrawDesc: "Enter with Coins or EasyPaisa/JazzCash.",
    enterLuckyDraw: "Enter Lucky Draw",
    footerSub: "Search • Explore • Earn Real Rewards",
    rights: "© 2026 GOOVO. Official App Version.",
    langLabel: "Language",
    currLabel: "Currency"
  },
  UR: {
    home: "ہوم",
    earn: "کمائیں",
    luckyDraw: "🎁 لکی ڈرا",
    wallet: "والیٹ",
    profile: "پروفائل",
    welcome: "گووو ریئل میں خوش آمدید",
    heroTitle1: "تلاش کریں۔ کھیلیں اور ",
    heroTitle2: "کمائیں۔",
    heroSub: "اشتہارات دیکھیں، لکی ڈرا میں حصہ لیں اور ایزی پیسہ / جاز کیش سے رقم حاصل کریں۔",
    searchPlaceholder: "kuch bhi search karein...",
    yourBalance: "آپ کا بیلنس",
    earnCoinsTitle: "سکے کمائیں",
    earnCoinsDesc: "اشتہارات دیکھیں، گیمز کھیلیں اور کوئز حل کریں۔",
    startEarning: "کمانا شروع کریں",
    luckyDrawTitle: "لکی ڈرا",
    luckyDrawDesc: "سکے یا ایزی پیسہ/جاز کیش کے ذریعے حصہ لیں۔",
    enterLuckyDraw: "لکی ڈرا میں شامل ہوں",
    footerSub: "تلاش کریں • دیکھیں • حقیقی انعامات حاصل کریں",
    rights: "© 2026 گووو۔ آفیشل ایپ ورژن۔",
    langLabel: "زبان",
    currLabel: "کرنسی"
  },
  HI: {
    home: "होम",
    earn: "कमाएं",
    luckyDraw: "🎁 लकी ड्रॉ",
    wallet: "वॉलेट",
    profile: "प्रोफ़ाइल",
    welcome: "गूवो रियल में आपका स्वागत है",
    heroTitle1: "खोजें। खेलें। ",
    heroTitle2: "कमाएं।",
    heroSub: "विज्ञापन देखें, लकी ड्रॉ में भाग लें और ईज़ीपैसा / जैज़कैश द्वारा भुनाएं।",
    searchPlaceholder: "कुछ भी खोजें...",
    yourBalance: "आपका बैलेंस",
    earnCoinsTitle: "सिक्के कमाएं",
    earnCoinsDesc: "विज्ञापन देखें, गेम खेलें और क्विज़ लें।",
    startEarning: "कमाना शुरू करें",
    luckyDrawTitle: "लकी ड्रॉ",
    luckyDrawDesc: "सिक्कों या ईज़ीपैसा/जैज़कैश के साथ प्रवेश करें।",
    enterLuckyDraw: "लकी ड्रॉ में शामिल हों",
    footerSub: "खोजें • अन्वेषण करें • वास्तविक पुरस्कार कमाएं",
    rights: "© 2026 गूवो। आधिकारिक ऐप संस्करण।",
    langLabel: "भाषा",
    currLabel: "मुद्रा"
  },
  AR: {
    home: "الرئيسية",
    earn: "اكسب",
    luckyDraw: "🎁 السحب المحظوظ",
    wallet: "المحفظة",
    profile: "الملف الشخصي",
    welcome: "مرحباً بك في GOOVO REAL",
    heroTitle1: "ابحث. العب. ",
    heroTitle2: "اكسب.",
    heroSub: "شاهد الإعلانات، وشارك في السحب المحظوظ واستلم أرباحك عبر EasyPaisa / JazzCash / البنك.",
    searchPlaceholder: "ابحث عن أي شيء...",
    yourBalance: "رصيدك",
    earnCoinsTitle: "اكسب العملات",
    earnCoinsDesc: "شاهد الإعلانات، العب الألعاب وحل الاختبارات.",
    startEarning: "ابدأ الكسب",
    luckyDrawTitle: "السحب المحظوظ",
    luckyDrawDesc: "ادخل باستخدام العملات أو EasyPaisa/JazzCash.",
    enterLuckyDraw: "انضم للسحب المحظوظ",
    footerSub: "ابحث • استكشف • اكسب مكافآت حقيقية",
    rights: "© 2026 GOOVO. الإصدار الرسمي للتطبيق.",
    langLabel: "اللغة",
    currLabel: "العملة"
  },
  ES: {
    home: "Inicio",
    earn: "Ganar",
    luckyDraw: "🎁 Sorteo",
    wallet: "Billetera",
    profile: "Perfil",
    welcome: "BIENVENIDO A GOOVO REAL",
    heroTitle1: "Busca. Juega. ",
    heroTitle2: "Gana.",
    heroSub: "Mira anuncios, participa en sorteos y retira mediante EasyPaisa / JazzCash / Banco.",
    searchPlaceholder: "Buscar cualquier cosa...",
    yourBalance: "TU SALDO",
    earnCoinsTitle: "Ganar Monedas",
    earnCoinsDesc: "Mira anuncios, juega juegos y responde cuestionarios.",
    startEarning: "Empieza a Ganar",
    luckyDrawTitle: "Sorteo",
    luckyDrawDesc: "Ingresa con monedas o EasyPaisa/JazzCash.",
    enterLuckyDraw: "Entrar al Sorteo",
    footerSub: "Buscar • Explorar • Ganar Recompensas Reales",
    rights: "© 2026 GOOVO. Versión Oficial de la App.",
    langLabel: "Idioma",
    currLabel: "Moneda"
  },
  RU: {
    home: "Главная",
    earn: "Заработать",
    luckyDraw: "🎁 Розыгрыш",
    wallet: "Кошелек",
    profile: "Профиль",
    welcome: "ДОБРО ПОЖАЛОВАТЬ В GOOVO REAL",
    heroTitle1: "Ищите. Играйте. ",
    heroTitle2: "Зарабатывайте.",
    heroSub: "Смотрите рекламу, участвуйте в розыгрышах и выводите средства через EasyPaisa / JazzCash / Банк.",
    searchPlaceholder: "Искать что угодно...",
    yourBalance: "ВАШ БАЛАНС",
    earnCoinsTitle: "Заработать монеты",
    earnCoinsDesc: "Смотрите рекламу, играйте в игры и проходите викторины.",
    startEarning: "Начать зарабатывать",
    luckyDrawTitle: "Розыгрыш",
    luckyDrawDesc: "Участвуйте за монеты или EasyPaisa/JazzCash.",
    enterLuckyDraw: "Участвовать в розыгрыше",
    footerSub: "Ищите • Исследуйте • Получайте реальные награды",
    rights: "© 2026 GOOVO. Официальная версия приложения.",
    langLabel: "Язык",
    currLabel: "Валюта"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // LocalStorage se saved value load karein
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("goovo_lang") || "EN";
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("goovo_curr") || "PKR";
  });

  const currencies = {
    PKR: { symbol: "Rs", rate: 3.35, name: "PKR" },
    INR: { symbol: "₹", rate: 1.0, name: "INR" },
    USD: { symbol: "$", rate: 0.012, name: "USD" },
    EUR: { symbol: "€", rate: 0.011, name: "EUR" }
  };

  // Language update karne par LocalStorage aur Document Direction (RTL/LTR) set karein
  useEffect(() => {
    localStorage.setItem("goovo_lang", lang);
    // Urdu (UR) aur Arabic (AR) ke liye Right-To-Left (RTL) mode enable karein
    document.dir = lang === "UR" || lang === "AR" ? "rtl" : "ltr";
  }, [lang]);

  // Currency update hone par LocalStorage update karein
  useEffect(() => {
    localStorage.setItem("goovo_curr", currency);
  }, [currency]);

  const t = translations[lang] || translations.EN;
  const activeCurrency = currencies[currency] || currencies.PKR;

  const convertCoins = (coins) => {
    return (((coins || 0) / 100) * activeCurrency.rate).toFixed(2);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, currency, setCurrency, t, activeCurrency, convertCoins }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}