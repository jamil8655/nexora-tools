export type Language = 'en' | 'ar' | 'ur' | 'hi';

export interface Translations {
  appName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  popularTools: string;
  allTools: string;
  exploreCategories: string;
  privacyNotice: string;
  clientSideBadge: string;
  serverSideBadge: string;
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  chooseFiles: string;
  processing: string;
  download: string;
  downloadAllZip: string;
  startAgain: string;
  savedPercentage: string;
  originalSize: string;
  compressedSize: string;
  nav: {
    home: string;
    dashboard: string;
    pdfTools: string;
    imageTools: string;
    documents: string;
    textTools: string;
    compress: string;
    ocr: string;
    calculators: string;
    devTools: string;
    security: string;
    qrBarcode: string;
    aiTools: string;
    pdfEditor: string;
    myFiles: string;
    history: string;
    admin: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    privacyPolicy: string;
    terms: string;
    security: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'NEXORA TOOLS',
    tagline: 'Powerful Tools for Every File, Document and Digital Task.',
    heroTitle: 'Powerful Tools for Every File, Document & Digital Task',
    heroSubtitle: 'Convert, compress, edit, calculate, code and manage your files from one fast, secure, and privacy-first digital utility workspace.',
    searchPlaceholder: 'What do you want to do? (e.g., PDF to JPG, Compress PDF, MB to KB, JSON Formatter)...',
    popularTools: 'Popular & Essential Tools',
    allTools: 'All 60+ Utilities',
    exploreCategories: 'Explore by Category',
    privacyNotice: 'Zero Server Uploads • 100% Private Client-Side WASM Processing.',
    clientSideBadge: 'Processed Locally (100% Private)',
    serverSideBadge: 'Server Processing',
    dropzoneTitle: 'Drag & Drop your files here',
    dropzoneSubtitle: 'or click to browse files from your device',
    chooseFiles: 'Choose Files',
    processing: 'Processing files...',
    download: 'Download Result',
    downloadAllZip: 'Download All (ZIP)',
    startAgain: 'Process Another File',
    savedPercentage: 'Saved',
    originalSize: 'Original Size',
    compressedSize: 'New Size',
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      pdfTools: 'PDF Tools',
      imageTools: 'Image Tools',
      documents: 'Documents',
      textTools: 'Text Tools',
      compress: 'Compress',
      ocr: 'OCR Studio',
      calculators: 'Calculators',
      devTools: 'Developer',
      security: 'Security',
      qrBarcode: 'QR & Barcode',
      aiTools: 'AI Workspace',
      pdfEditor: 'PDF Editor',
      myFiles: 'My Files',
      history: 'History',
      admin: 'Admin',
    },
    footer: {
      desc: 'NEXORA TOOLS is the premier all-in-one digital utility super app for PDFs, images, developers, OCR, calculators, and security.',
      quickLinks: 'Quick Links',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms of Service',
      security: 'Security Architecture',
      rights: 'All rights reserved.',
    },
  },
  ar: {
    appName: 'نكسورا تولز',
    tagline: 'أدوات قوية لجميع الملفات والمستندات والمهام الرقمية.',
    heroTitle: 'أدوات قوية لجميع الملفات والمستندات والمهام الرقمية',
    heroSubtitle: 'تحويل، ضغط، تعديل، حساب، برمجة وإدارة ملفاتك من مساحة عمل رقمية سريعة وآمنة وخاصة تمامًا.',
    searchPlaceholder: 'ماذا تريد أن تفعل؟ (مثل تحويل PDF إلى JPG، ضغط PDF، محول الوحدات)...',
    popularTools: 'الأدوات الأكثر استخداماً',
    allTools: 'جميع الأدوات (60+)',
    exploreCategories: 'تصفح حسب الفئة',
    privacyNotice: 'معالجة محلية 100%: ملفاتك لا تغادر متصفحك أو جهازك أبدًا.',
    clientSideBadge: 'معالجة محلية آمنة',
    serverSideBadge: 'معالجة عبر الخادم',
    dropzoneTitle: 'اسحب وأفلت الملفات هنا',
    dropzoneSubtitle: 'أو انقر لتصفح واختيار الملفات من جهازك',
    chooseFiles: 'اختر الملفات',
    processing: 'جارٍ معالجة الملفات...',
    download: 'تحميل النتيجة',
    downloadAllZip: 'تحميل الكل (ZIP)',
    startAgain: 'معالجة ملف آخر',
    savedPercentage: 'تم توفير',
    originalSize: 'الحجم الأصلي',
    compressedSize: 'الحجم الجديد',
    nav: {
      home: 'الرئيسية',
      dashboard: 'لوحة العمل',
      pdfTools: 'أدوات PDF',
      imageTools: 'أدوات الصور',
      documents: 'المستندات',
      textTools: 'أدوات النصوص',
      compress: 'ضغط الملفات',
      ocr: 'التعرف الضوئي OCR',
      calculators: 'الحاسبات والوحدات',
      devTools: 'أدوات المطورين',
      security: 'الأمان والتشفير',
      qrBarcode: 'الباركود و QR',
      aiTools: 'مساعد الذكاء الاصطناعي',
      pdfEditor: 'محرر PDF',
      myFiles: 'ملفاتي',
      history: 'السجل',
      admin: 'لوحة الإدارة',
    },
    footer: {
      desc: 'نكسورا تولز هي المنصة الشاملة الرائدة لجميع أدوات ملفات PDF والصور وأدوات المطورين والأمان.',
      quickLinks: 'روابط سريعة',
      privacyPolicy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      security: 'الأمان والتشفير',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
  ur: {
    appName: 'نیکسورا ٹولز',
    tagline: 'ہر فائل، دستاویز اور ڈیجیٹل کام کے لیے طاقتور ٹولز۔',
    heroTitle: 'ہر فائل، دستاویز اور ڈیجیٹل کام کے لیے طاقتور ٹولز',
    heroSubtitle: 'فائلوں کو تبدیل، کمپریس، ایڈیٹ، حساب، کوڈ اور منظم کریں، مکمل رازداری اور تیز رفتار کے ساتھ۔',
    searchPlaceholder: 'آپ کیا کرنا چاہتے ہیں؟ (مثلاً پی ڈی ایف ضم کریں، ایم بی سے کے بی)...',
    popularTools: 'مقبول ٹولز',
    allTools: 'تمام ٹولز (60+)',
    exploreCategories: 'کیٹیگری کے لحاظ سے تلاش کریں',
    privacyNotice: '100% محفوظ اور نجی: آپ کی فائلیں براؤزر میں ہی پروسیس ہوتی ہیں۔',
    clientSideBadge: 'مقامی پروسیسنگ (محفوظ)',
    serverSideBadge: 'سرور پروسیسنگ',
    dropzoneTitle: 'اپنی فائلیں یہاں ڈریگ اور ڈراپ کریں',
    dropzoneSubtitle: 'یا کمپیوٹر اور موبائل سے منتخب کرنے کے لیے کلک کریں',
    chooseFiles: 'فائلیں منتخب کریں',
    processing: 'فائلیں پروسیس ہو رہی ہیں...',
    download: 'نتیجہ ڈاؤن لوڈ کریں',
    downloadAllZip: 'تمام فائلیں ڈاؤن لوڈ کریں (ZIP)',
    startAgain: 'دوسری فائل پروسیس کریں',
    savedPercentage: 'سائز کی بچت',
    originalSize: 'اصلی سائز',
    compressedSize: 'نیا سائز',
    nav: {
      home: 'ہوم',
      dashboard: 'ڈیش بورڈ',
      pdfTools: 'پی ڈی ایف ٹولز',
      imageTools: 'تصویری ٹولز',
      documents: 'دستاویزات',
      textTools: 'ٹیکسٹ ٹولز',
      compress: 'کمپریس',
      ocr: 'او سی آر اسٹوڈیو',
      calculators: 'کیلکولیٹر',
      devTools: 'ڈویلپر ٹولز',
      security: 'سیکیورٹی و ہیش',
      qrBarcode: 'کیو آر اور بارکوڈ',
      aiTools: 'اے آئی ورک اسپیس',
      pdfEditor: 'پی ڈی ایف ایڈیٹر',
      myFiles: 'میری فائلیں',
      history: 'ہسٹری',
      admin: 'ایڈمن',
    },
    footer: {
      desc: 'نیکسورا ٹولز پی ڈی ایف، تصاویر، دستاویزات اور فائلوں کے انتظام کے لیے معروف سپر ایپ ہے۔',
      quickLinks: 'فوری لنکس',
      privacyPolicy: 'پرائیویسی پالیسی',
      terms: 'شرائط و ضوابط',
      security: 'سیکیورٹی',
      rights: 'جملہ حقوق محفوظ ہیں۔',
    },
  },
  hi: {
    appName: 'नेक्सोरा टूल्स',
    tagline: 'हर फाइल, दस्तावेज़ और डिजिटल कार्य के लिए शक्तिशाली टूल्स।',
    heroTitle: 'हर फाइल, दस्तावेज़ और डिजिटल काम के लिए शक्तिशाली टूल्स',
    heroSubtitle: 'फाइलों को तुरंत कन्वर्ट, कंप्रेस, एडिट, कैलकुलेट, कोड और मैनेज करें पूरी प्राइवेसी और स्पीड के साथ।',
    searchPlaceholder: 'आप क्या करना चाहते हैं? (जैसे पीडीएफ मर्ज करें, जेपीजी से पीएनजी, जेसन फॉर्मेटर)...',
    popularTools: 'लोकप्रिय टूल्स',
    allTools: 'सभी टूल्स (60+)',
    exploreCategories: 'कैटेगरी के अनुसार देखें',
    privacyNotice: '100% सुरक्षित और प्राइवेट: आपकी फाइलें आपके ब्राउज़र में ही प्रोसेस होती हैं।',
    clientSideBadge: 'लोकल प्रोसेसिंग (प्राइवेट)',
    serverSideBadge: 'सर्वर प्रोसेसिंग',
    dropzoneTitle: 'अपनी फाइलें यहाँ ड्रैग और ड्रॉप करें',
    dropzoneSubtitle: 'या अपने डिवाइस से फाइलें चुनने के लिए क्लिक करें',
    chooseFiles: 'फाइलें चुनें',
    processing: 'फाइलें प्रोसेस हो रही हैं...',
    download: 'रिजल्ट डाउनलोड करें',
    downloadAllZip: 'सभी डाउनलोड करें (ZIP)',
    startAgain: 'दूसरी फाइल कन्वर्ट करें',
    savedPercentage: 'बचत',
    originalSize: 'मूल साइज',
    compressedSize: 'नया साइज',
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      pdfTools: 'पीडीएफ टूल्स',
      imageTools: 'इमेज टूल्स',
      documents: 'डॉक्यूमेंट्स',
      textTools: 'टेक्स्ट टूल्स',
      compress: 'कंप्रेस',
      ocr: 'ओसीआर स्टूडियो',
      calculators: 'कैलकुलेटर व यूनिट्स',
      devTools: 'डेवलपर टूल्स',
      security: 'सुरक्षा व हैश',
      qrBarcode: 'क्यूआर और बारकोड',
      aiTools: 'एआई वर्कस्पेस',
      pdfEditor: 'पीडीएफ एडिटर',
      myFiles: 'मेरी फाइलें',
      history: 'हिस्ट्री',
      admin: 'एडमिन',
    },
    footer: {
      desc: 'नेक्सोरा टूल्स पीडीएफ, इमेज, टेक्स्ट, डेवलपर और सुरक्षा टूल्स का संपूर्ण ऑल-इन-वन सुपर ऐप है।',
      quickLinks: 'त्वरित लिंक',
      privacyPolicy: 'गोपनीयता नीति',
      terms: 'नियम और शर्तें',
      security: 'सुरक्षा',
      rights: 'सर्वाधिकार सुरक्षित।',
    },
  },
};
