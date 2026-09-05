import { Language } from './translations';
import { ToolDefinition } from '../types';
import { Course } from '../courses/courses-data';

export interface LocalizedItem {
  name?: string;
  title?: string;
  shortDesc?: string;
  description?: string;
  categoryLabel?: string;
}

export const CATEGORY_TRANSLATIONS: Record<string, Record<Language, string>> = {
  all: {
    en: 'All Tools',
    ur: 'تمام ٹولز',
    ar: 'جميع الأدوات',
    hi: 'सभी टूल्स',
  },
  pdf: {
    en: 'PDF Tools',
    ur: 'پی ڈی ایف ٹولز',
    ar: 'أدوات PDF',
    hi: 'PDF टूल्स',
  },
  image: {
    en: 'Image Studio',
    ur: 'امیج اسٹوڈیو',
    ar: 'استوديو الصور',
    hi: 'इमेज स्टूडियो',
  },
  document: {
    en: 'Documents',
    ur: 'دستاویزات',
    ar: 'المستندات',
    hi: 'दस्तावेज़',
  },
  text: {
    en: 'Text Tools',
    ur: 'ٹیکسٹ ٹولز',
    ar: 'أدوات النصوص',
    hi: 'टेक्स्ट टूल्स',
  },
  compress: {
    en: 'Compression',
    ur: 'فائل کمپریشن',
    ar: 'ضغط الملفات',
    hi: 'फ़ाइल कंप्रेशन',
  },
  ocr: {
    en: 'OCR Studio',
    ur: 'او سی آر اسٹوڈیو',
    ar: 'استخراج النصوص OCR',
    hi: 'OCR स्टूडियो',
  },
  calculator: {
    en: 'Calculators',
    ur: 'کیلکولیٹرز و کنورٹرز',
    ar: 'الحاسبات والمحولات',
    hi: 'कैलकुलेटर व कन्वर्टर',
  },
  dev: {
    en: 'Developer Tools',
    ur: 'ڈیولپر ٹولز',
    ar: 'أدوات المطورين',
    hi: 'डेवलपर टूल्स',
  },
  security: {
    en: 'Security & Privacy',
    ur: 'سیکیورٹی و پرائیویسی',
    ar: 'الأمان والخصوصية',
    hi: 'सुरक्षा और गोपनीयता',
  },
  qr: {
    en: 'QR & Barcode',
    ur: 'کیو آر و بارکوڈ',
    ar: 'الباركود وQR',
    hi: 'QR व बारकोड',
  },
  media: {
    en: 'Media Studio',
    ur: 'میڈیا اسٹوڈیو',
    ar: 'استوديو الوسائط',
    hi: 'मीडिया स्टूडियो',
  },
  ai: {
    en: 'AI Workspace',
    ur: 'اے آئی اسٹوڈیو',
    ar: 'مساحة الذكاء الاصطناعي',
    hi: 'AI वर्कस्पेस',
  },
};

export const TOOL_TRANSLATIONS: Record<string, Record<Language, { name: string; shortDesc: string }>> = {
  'pdf-merge': {
    en: { name: 'Merge PDF', shortDesc: 'Combine multiple PDF files into one single organized document.' },
    ur: { name: 'پی ڈی ایف یکجا کریں', shortDesc: 'متعدد پی ڈی ایف فائلوں کو ایک منظم دستاویز میں جوڑیں۔' },
    ar: { name: 'دمج ملفات PDF', shortDesc: 'دمج ملفات PDF متعددة في مستند واحد منظم بسهولة وبأمان.' },
    hi: { name: 'PDF मर्ज करें', shortDesc: 'एकाधिक PDF फ़ाइलों को एक व्यवस्थित दस्तावेज़ में जोड़ें।' },
  },
  'merge-pdf': {
    en: { name: 'Merge PDF', shortDesc: 'Combine multiple PDF files into one single organized document.' },
    ur: { name: 'پی ڈی ایف جوڑیں', shortDesc: 'متعدد پی ڈی ایف فائلوں کو ایک منظم فائل میں یکجا کریں۔' },
    ar: { name: 'دمج PDF', shortDesc: 'دمج ملفات PDF متعددة في ملف واحد منظم.' },
    hi: { name: 'PDF जोड़ें', shortDesc: 'कई PDF फ़ाइलों को एक फ़ाइल में मिलाएं।' },
  },
  'pdf-split': {
    en: { name: 'Split PDF', shortDesc: 'Extract pages or separate a PDF into multiple individual files.' },
    ur: { name: 'پی ڈی ایف تقسیم کریں', shortDesc: 'صفحات الگ کریں یا پی ڈی ایف کو الگ فائلوں میں تقسیم کریں۔' },
    ar: { name: 'تقسيم PDF', shortDesc: 'استخراج الصفحات أو تقسيم ملف PDF إلى ملفات منفصلة.' },
    hi: { name: 'PDF विभाजित करें', shortDesc: 'पृष्ठ अलग करें या PDF को अलग-अलग फ़ाइलों में बांटें।' },
  },
  'split-pdf': {
    en: { name: 'Split PDF', shortDesc: 'Extract pages or separate a PDF into multiple individual files.' },
    ur: { name: 'پی ڈی ایف الگ کریں', shortDesc: 'پی ڈی ایف کے صفحات الگ الگ فائلوں میں تقسیم کریں۔' },
    ar: { name: 'فصل صفحات PDF', shortDesc: 'استخراج نطاق صفحات مخصص من ملف PDF.' },
    hi: { name: 'PDF अलग करें', shortDesc: 'PDF के पन्नों को अलग-अलग फ़ाइलों में निकालें।' },
  },
  'pdf-compress': {
    en: { name: 'Compress PDF', shortDesc: 'Reduce PDF file size while maintaining sharp visual clarity.' },
    ur: { name: 'پی ڈی ایف سائز کم کریں', shortDesc: 'معیار برقرار رکھتے ہوئے پی ڈی ایف فائل کا سائز چھوٹا کریں۔' },
    ar: { name: 'ضغط ملفات PDF', shortDesc: 'تقليل حجم ملف PDF مع الحفاظ على جودة ونقاء النصوص.' },
    hi: { name: 'PDF कंप्रेस करें', shortDesc: 'गुणवत्ता बनाए रखते हुए PDF फ़ाइल का आकार छोटा करें।' },
  },
  'compress-pdf': {
    en: { name: 'Compress PDF', shortDesc: 'Reduce PDF file size while maintaining sharp visual clarity.' },
    ur: { name: 'پی ڈی ایف کمپریس', shortDesc: 'سرکاری پورٹلز کے لیے پی ڈی ایف سائز فوری کم کریں۔' },
    ar: { name: 'تصغير حجم PDF', shortDesc: 'ضغط فائق لملفات PDF للمستندات والبريد الإلكتروني.' },
    hi: { name: 'PDF साइज घटाएं', shortDesc: 'ऑनलाइन अपलोड और ईमेल के लिए PDF साइज कम करें।' },
  },
  'image-to-pdf': {
    en: { name: 'Image to PDF', shortDesc: 'Convert JPG, PNG, WebP, and BMP images into a clean PDF document.' },
    ur: { name: 'تصویر سے پی ڈی ایف', shortDesc: 'تصاویر (JPG, PNG) کو فوری طور پر معیاری پی ڈی ایف میں تبدیل کریں۔' },
    ar: { name: 'تحويل الصور إلى PDF', shortDesc: 'تحويل الصور (JPG, PNG, WebP) إلى مستند PDF عالي الجودة.' },
    hi: { name: 'इमेज से PDF बनाएं', shortDesc: 'JPG, PNG तस्वीरों को साफ़ PDF दस्तावेज़ में बदलें।' },
  },
  'auto-crop-images-to-pdf': {
    en: { name: 'Auto Cut Images to PDF', shortDesc: 'Smart crop, split halves (top/bottom, left/right), and compile images to a numbered PDF.' },
    ur: { name: 'امیج آٹو کٹ اور پی ڈی ایف', shortDesc: 'تصاویر کو آدھے یا مطلوبہ سائز پر کاٹیں اور نمبرنگ کے ساتھ پی ڈی ایف بنائیں۔' },
    ar: { name: 'قص الصور تلقائياً إلى PDF', shortDesc: 'قص وتقسيم الصور (نصفين، علوي/سفلي) وترتيبها في ملف PDF مرقم.' },
    hi: { name: 'ऑटो कट इमेज टू PDF', shortDesc: 'तस्वीरों को आधा या इच्छानुसार काटें और नंबरिंग के साथ PDF बनाएं।' },
  },
  'pdf-to-image': {
    en: { name: 'PDF to Image', shortDesc: 'Extract high-resolution JPG or PNG images from PDF pages.' },
    ur: { name: 'پی ڈی ایف سے تصویر', shortDesc: 'پی ڈی ایف کے ہر صفحے کو ایچ ڈی تصویر (JPG/PNG) میں تبدیل کریں۔' },
    ar: { name: 'تحويل PDF إلى صور', shortDesc: 'استخراج صفحات PDF كصور عالية الدقة بجودة فائقة.' },
    hi: { name: 'PDF से इमेज निकालें', shortDesc: 'PDF पृष्ठों को उच्च रिज़ॉल्यूशन JPG या PNG में बदलें।' },
  },
  'pdf-to-jpg': {
    en: { name: 'PDF to JPG', shortDesc: 'Convert PDF pages directly into high quality JPG images.' },
    ur: { name: 'پی ڈی ایف تا جے پی جی', shortDesc: 'پی ڈی ایف دستاویز کو فوری جے پی جی تصاویر میں بدلیں۔' },
    ar: { name: 'تحويل PDF إلى JPG', shortDesc: 'تحويل صفحات PDF إلى صور JPG بجودة واضحة.' },
    hi: { name: 'PDF से JPG कन्वर्टर', shortDesc: 'PDF के पन्नों को JPG फोटो में बदलें।' },
  },
  'rotate-pdf': {
    en: { name: 'Rotate PDF', shortDesc: 'Rotate PDF pages permanently to landscape or portrait orientation.' },
    ur: { name: 'پی ڈی ایف صفحات گھمائیں', shortDesc: 'الٹے صفحات کو سیدھا کریں اور ہمیشہ کے لیے محفوظ کریں۔' },
    ar: { name: 'تدوير صفحات PDF', shortDesc: 'تدوير صفحات PDF بزوايا 90 أو 180 أو 270 درجة.' },
    hi: { name: 'PDF पन्ने घुमाएं', shortDesc: 'उल्टे पन्नों को सीधा करें और पोर्ट्रेट/लैंडस्केप में सेट करें।' },
  },
  'pdf-rotate': {
    en: { name: 'Rotate PDF', shortDesc: 'Rotate PDF pages permanently to landscape or portrait orientation.' },
    ur: { name: 'صفحات گھمائیں (PDF)', shortDesc: 'پی ڈی ایف کے رخ کو سیدھا کریں۔' },
    ar: { name: 'تدوير PDF', shortDesc: 'ضبط اتجاه صفحات المستند بدقة.' },
    hi: { name: 'PDF रोटेट करें', shortDesc: 'PDF के ओरिएंटेशन को सीधा करें।' },
  },
  'watermark-pdf': {
    en: { name: 'Watermark PDF', shortDesc: 'Add custom text or image watermarks to protect your PDF files.' },
    ur: { name: 'واٹر مارک لگائیں', shortDesc: 'کاپی رائٹ کی حفاظت کے لیے اپنے نام یا ادارے کا واٹر مارک شامل کریں۔' },
    ar: { name: 'إضافة علامة مائية لـ PDF', shortDesc: 'حماية المستندات بإضافة نصوص أو شعارات كعلامة مائية.' },
    hi: { name: 'PDF पर वॉटरमार्क लगाएं', shortDesc: 'सुरक्षा के लिए अपना नाम या लोगो वॉटरमार्क जोड़ें।' },
  },
  'pdf-watermark': {
    en: { name: 'Watermark PDF', shortDesc: 'Add custom text or image watermarks to protect your PDF files.' },
    ur: { name: 'پی ڈی ایف واٹر مارک', shortDesc: 'دستاویز پر اپنا نام یا لوگو واٹر مارک لگائیں۔' },
    ar: { name: 'علامة مائية PDF', shortDesc: 'إضافة علامة مائية مخصصة للمستند.' },
    hi: { name: 'PDF वॉटरमार्क', shortDesc: 'दस्तावेज़ की सुरक्षा के लिए वॉटरमार्क लगाएं।' },
  },
  'pdf-page-numbers': {
    en: { name: 'Add Page Numbers', shortDesc: 'Insert clean page numbers into your PDF headers or footers.' },
    ur: { name: 'صفحہ نمبر شامل کریں', shortDesc: 'پی ڈی ایف کے اوپر یا نیچے خوبصورت صفحہ نمبر درج کریں۔' },
    ar: { name: 'ترقيم صفحات PDF', shortDesc: 'إدراج أرقام الصفحات بتنسيقات مختلفة في رأس أو تذييل المستند.' },
    hi: { name: 'पेज नंबर जोड़ें', shortDesc: 'PDF के शीर्ष या पाद में साफ़ पेज नंबर लगाएं।' },
  },
  'pdf-metadata': {
    en: { name: 'Edit PDF Metadata', shortDesc: 'View and update title, author, subject, and keywords in PDF.' },
    ur: { name: 'میٹا ڈیٹا ایڈٹ کریں', shortDesc: 'عنوان، مصنف اور معلومات تبدیل کریں۔' },
    ar: { name: 'تعديل بيانات PDF الوصفية', shortDesc: 'تعديل العنوان والمؤلف والكلمات المفتاحية للمستند.' },
    hi: { name: 'PDF मेटाडेटा बदलें', shortDesc: 'PDF का शीर्षक, लेखक और विवरण अपडेट करें।' },
  },
  'pdf-organizer': {
    en: { name: 'Organize PDF Pages', shortDesc: 'Reorder, delete, duplicate, and rotate individual pages visually.' },
    ur: { name: 'صفحات کی ترتیب تبدیل کریں', shortDesc: 'صفحات کو آگے پیچھے کریں، فالتو صفحات حذف کریں یا گھمائیں۔' },
    ar: { name: 'تنظيم صفحات PDF', shortDesc: 'إعادة ترتيب الصفحات، وحذف الصفحات غير المرغوب فيها بصرياً.' },
    hi: { name: 'PDF पन्ने व्यवस्थित करें', shortDesc: 'पन्नों का क्रम बदलें, हटाएं या नए क्रम में लगाएं।' },
  },
  'word-to-pdf': {
    en: { name: 'Word to PDF', shortDesc: 'Convert DOC and DOCX Word documents into standard PDF format.' },
    ur: { name: 'ورڈ سے پی ڈی ایف', shortDesc: 'ورڈ فائلز (DOCX) کو فوری اور محفوظ پی ڈی ایف میں تبدیل کریں۔' },
    ar: { name: 'تحويل Word إلى PDF', shortDesc: 'تحويل ملفات Word (DOCX) إلى مستندات PDF بكل سهولة.' },
    hi: { name: 'Word से PDF बनाएं', shortDesc: 'Word (DOCX) फ़ाइलों को सुरक्षित PDF में बदलें।' },
  },
  'excel-to-pdf': {
    en: { name: 'Excel to PDF', shortDesc: 'Convert Excel spreadsheets (XLSX, XLS) into printable PDF sheets.' },
    ur: { name: 'ایکسل سے پی ڈی ایف', shortDesc: 'ایکسل شیٹس کو پرنٹ کے لیے تیار پی ڈی ایف میں تبدیل کریں۔' },
    ar: { name: 'تحويل Excel إلى PDF', shortDesc: 'تحويل جداول البيانات Excel إلى ملفات PDF قابلة للطباعة.' },
    hi: { name: 'Excel से PDF बनाएं', shortDesc: 'Excel स्प्रेडशीट को प्रिंट योग्य PDF में बदलें।' },
  },
  'pdf-to-word': {
    en: { name: 'PDF to Word', shortDesc: 'Extract formatted editable text and layout into Word documents.' },
    ur: { name: 'پی ڈی ایف سے ورڈ', shortDesc: 'پی ڈی ایف کو قابل تدوین ورڈ (DOCX) میں تبدیل کریں۔' },
    ar: { name: 'تحويل PDF إلى Word', shortDesc: 'تحويل مستند PDF إلى ملف Word قابل للتعديل.' },
    hi: { name: 'PDF से Word कन्वर्टर', shortDesc: 'PDF दस्तावेज़ को एडिटेबल Word फ़ाइल में बदलें।' },
  },
  'pdf-to-docx': {
    en: { name: 'PDF to DOCX', shortDesc: 'Convert PDF files to editable Microsoft Word format.' },
    ur: { name: 'پی ڈی ایف تا ڈاک ایکس', shortDesc: 'پی ڈی ایف کو مائیکروسافٹ ورڈ میں تبدیل کریں۔' },
    ar: { name: 'تحويل PDF إلى DOCX', shortDesc: 'تحويل مستند PDF إلى صيغة DOCX القابلة للتحرير.' },
    hi: { name: 'PDF से DOCX बनाएं', shortDesc: 'PDF को Microsoft Word प्रारूप में बदलें।' },
  },
  'ocr-image-to-text': {
    en: { name: 'OCR Image to Text', shortDesc: 'Extract printed or handwritten text from images and scanned documents.' },
    ur: { name: 'او سی آر: تصویر سے ٹیکسٹ', shortDesc: 'تصاویر، کتابوں اور اسکین شدہ دستاویزات سے اردو، انگلش اور عربی متن نکالیں۔' },
    ar: { name: 'استخراج النصوص من الصور OCR', shortDesc: 'استخراج النصوص المكتوبة من الصور والمستندات الممسوحة ضوئياً.' },
    hi: { name: 'OCR इमेज से टेक्स्ट निकालें', shortDesc: 'तस्वीरों और स्कैन किए गए दस्तावेज़ों से टेक्स्ट निकालें।' },
  },
  'image-compressor': {
    en: { name: 'Compress Image', shortDesc: 'Shrink JPG, PNG, and WebP image sizes up to 90% without quality loss.' },
    ur: { name: 'تصویر کا سائز کم کریں', shortDesc: 'معیار خراب کیے بغیر تصویر کا سائز 90 فیصد تک کم کریں۔' },
    ar: { name: 'ضغط الصور', shortDesc: 'تقليل حجم الصور (JPG, PNG, WebP) بنسبة تصل إلى 90% دون فقدان الجودة.' },
    hi: { name: 'फोटो साइज कम करें', shortDesc: 'गुणवत्ता खोए बिना JPG, PNG इमेज का आकार 90% तक घटाएं।' },
  },
  'image-resizer': {
    en: { name: 'Resize Image', shortDesc: 'Resize photos to custom pixel dimensions or preset social formats.' },
    ur: { name: 'تصویر کا سائز (پکسل) بدلیں', shortDesc: 'پاسپورٹ اور سوشل میڈیا کے لیے مطلوبہ پکسل اور ڈائمینشن سیٹ کریں۔' },
    ar: { name: 'تغيير أبعاد الصور', shortDesc: 'تغيير أبعاد الصور بالبكسل أو النسبة المئوية بدقة وسرعة.' },
    hi: { name: 'इमेज रिसाइज़र', shortDesc: 'फ़ोटो को अपनी पसंद के पिक्सेल या पासपोर्ट साइज़ में बदलें।' },
  },
  'image-converter': {
    en: { name: 'Convert Image Format', shortDesc: 'Convert between PNG, JPG, WebP, SVG, GIF, BMP, and ICO formats.' },
    ur: { name: 'تصویر کا فارمیٹ بدلیں', shortDesc: 'جے پی جی، پی این جی اور ویب پی کے درمیان فوری فارمیٹ تبدیل کریں۔' },
    ar: { name: 'محول صيغ الصور', shortDesc: 'التحويل الفوري بين صيغ PNG و JPG و WebP و ICO بسهولة.' },
    hi: { name: 'इमेज फॉर्मेट कन्वर्टर', shortDesc: 'PNG, JPG, WebP आदि के बीच तुरंत फॉर्मेट बदलें।' },
  },
  'png-to-jpg': {
    en: { name: 'PNG to JPG', shortDesc: 'Convert transparent PNG images to standard JPG format.' },
    ur: { name: 'پی این جی تا جے پی جی', shortDesc: 'پی این جی تصاویر کو فوری جے پی جی میں تبدیل کریں۔' },
    ar: { name: 'تحويل PNG إلى JPG', shortDesc: 'تحويل صور PNG الشفافة إلى JPG بسرعة فائقة.' },
    hi: { name: 'PNG से JPG कन्वर्टर', shortDesc: 'PNG फोटो को JPG प्रारूप में बदलें।' },
  },
  'jpg-to-png': {
    en: { name: 'JPG to PNG', shortDesc: 'Convert JPG images to lossless high-definition PNG format.' },
    ur: { name: 'جے پی جی تا پی این جی', shortDesc: 'جے پی جی تصویر کو صاف پی این جی میں تبدیل کریں۔' },
    ar: { name: 'تحويل JPG إلى PNG', shortDesc: 'تحويل صور JPG إلى صيغة PNG عالية الوضوح.' },
    hi: { name: 'JPG से PNG कन्वर्टर', shortDesc: 'JPG इमेज को हाई-डेफिनिशन PNG में बदलें।' },
  },
  'rotate-image': {
    en: { name: 'Rotate & Flip Image', shortDesc: 'Rotate photos 90°, 180°, 270° or flip horizontally and vertically.' },
    ur: { name: 'تصویر گھمائیں اور پلٹیں', shortDesc: 'تصویر کا رخ درست کریں یا افقی/عمودی طور پر پلٹیں۔' },
    ar: { name: 'تدوير وعكس الصور', shortDesc: 'تدوير الصور وعكسها أفقياً أو عمودياً بسهولة.' },
    hi: { name: 'इमेज घुमाएं व फ्लिप करें', shortDesc: 'फ़ोटो को 90 डिग्री घुमाएं या हॉरिजॉन्टल/वर्टिकल फ्लिप करें।' },
  },
  'passport-photo-maker': {
    en: { name: 'Passport Photo Maker', shortDesc: 'Crop and create standard official passport & visa size photos.' },
    ur: { name: 'پاسپورٹ سائز فوٹو میکر', shortDesc: 'سرکاری فارمز اور ویزا کے لیے پاسپورٹ سائز تصویر تیار کریں۔' },
    ar: { name: 'صانع صور جواز السفر', shortDesc: 'اقتصاص وتجهيز صور جوازات السفر والتأشيرات الرسمية.' },
    hi: { name: 'पासपोर्ट साइज़ फ़ोटो मेकर', shortDesc: 'सरकारी नौकरियों व वीज़ा के लिए पासपोर्ट फ़ोटो तैयार करें।' },
  },
  'image-metadata': {
    en: { name: 'Image EXIF Metadata', shortDesc: 'View and strip camera metadata, location GPS, and date info.' },
    ur: { name: 'تصویر کا ایکزف ڈیٹا', shortDesc: 'تصویر کیمرہ اور لوکیشن کا خفیہ ڈیٹا دیکھیں یا ختم کریں۔' },
    ar: { name: 'بيانات EXIF للصور', shortDesc: 'عرض وإزالة بيانات الكاميرا والموقع الجغرافي للصور.' },
    hi: { name: 'इमेज EXIF मेटाडेटा', shortDesc: 'कैमरा और लोकेशन जानकारी देखें या सुरक्षित रूप से हटाएं।' },
  },
  'word-counter': {
    en: { name: 'Word & Character Counter', shortDesc: 'Count words, characters, sentences, paragraphs, and reading time.' },
    ur: { name: 'الفاظ و حروف کاؤنٹر', shortDesc: 'الفاظ، حروف، جملوں اور پڑھنے کے وقت کی لائیو گنتی کریں۔' },
    ar: { name: 'عداد الكلمات والأحرف', shortDesc: 'حساب دقيق لعدد الكلمات والأحرف والفقرات ووقت القراءة.' },
    hi: { name: 'शब्द और वर्ण काउंटर', shortDesc: 'शब्दों, अक्षरों, वाक्यों और पढ़ने के समय की लाइव गिनती करें।' },
  },
  'case-converter': {
    en: { name: 'Text Case Converter', shortDesc: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case.' },
    ur: { name: 'ٹیکسٹ کیس کنورٹر', shortDesc: 'انگلش حروف کو کیپیٹل، اسمال یا ٹائٹل کیس میں تبدیل کریں۔' },
    ar: { name: 'محول حالة الأحرف', shortDesc: 'تحويل النصوص بين الحروف الكبيرة والصغيرة وتنسيقات البرمجة.' },
    hi: { name: 'टेक्स्ट केस कन्वर्टर', shortDesc: 'टेक्स्ट को UPPERCASE, lowercase, Title Case में बदलें।' },
  },
  'remove-duplicate-lines': {
    en: { name: 'Remove Duplicate Lines', shortDesc: 'Clean and deduplicate list entries, emails, and data arrays.' },
    ur: { name: 'تکراری لائنیں حذف کریں', shortDesc: 'فہرستوں اور ای میلز سے ڈپلیکیٹ لائنیں صاف کریں۔' },
    ar: { name: 'حذف الأسطر المكررة', shortDesc: 'تنظيف القوائم وحذف الأسطر والبيانات المكررة فوراً.' },
    hi: { name: 'डुप्लीकेट लाइनें हटाएं', shortDesc: 'लिस्ट और डेटा से दोहराई गई लाइनों को साफ़ करें।' },
  },
  'text-diff': {
    en: { name: 'Text Diff & Compare', shortDesc: 'Compare two text snippets side-by-side and highlight differences.' },
    ur: { name: 'دو تحریروں کا موازنہ', shortDesc: 'دو تحریروں کا موازنہ کریں اور بدلاؤ کو ہائی لائٹ کریں۔' },
    ar: { name: 'مقارنة النصوص واكتشاف الفروق', shortDesc: 'مقارنة نصين جنباً إلى جنب وإبراز الفروقات بدقة.' },
    hi: { name: 'टेक्स्ट अंतर और तुलना', shortDesc: 'दो टेक्स्ट की तुलना करें और परिवर्तनों को हाइलाइट करें।' },
  },
  'text-compare': {
    en: { name: 'Text Compare', shortDesc: 'Compare two text snippets side-by-side and highlight differences.' },
    ur: { name: 'تحریر کا موازنہ', shortDesc: 'دو دستاویزات کے فرق کی فوری شناخت کریں۔' },
    ar: { name: 'مقارنة النصوص', shortDesc: 'إبراز التغييرات بين نسختين من النص.' },
    hi: { name: 'टेक्स्ट तुलना', shortDesc: 'दो फ़ाइलों के टेक्स्ट में बदलाव देखें।' },
  },
  'percentage-calculator': {
    en: { name: 'Percentage Calculator', shortDesc: 'Calculate percentage increases, discounts, exam marks, and ratios.' },
    ur: { name: 'فیصد کیلکولیٹر', shortDesc: 'امتحانات، رعایت، منافع اور فیصد کا حساب فوری لگائیں۔' },
    ar: { name: 'حاسبة النسبة المئوية', shortDesc: 'حساب النسب المئوية، والخصومات، ومعدلات الزيادة والنقصان.' },
    hi: { name: 'प्रतिशत कैलकुलेटर', shortDesc: 'छूट, लाभ, परीक्षा अंक और प्रतिशत की त्वरित गणना करें।' },
  },
  'unit-converter': {
    en: { name: 'Unit Converter', shortDesc: 'Convert length, weight, temperature, speed, area, and volume.' },
    ur: { name: 'پیمائش کنورٹر', shortDesc: 'لمبائی، وزن، درجہ حرارت اور رقبے کی پیمائش تبدیل کریں۔' },
    ar: { name: 'محول الوحدات', shortDesc: 'تحويل شامل لوحدات الطول والوزن ودرجة الحرارة والمساحة.' },
    hi: { name: 'इकाई परिवर्तक', shortDesc: 'लंबाई, वजन, तापमान और क्षेत्र की इकाइयों को बदलें।' },
  },
  'json-formatter': {
    en: { name: 'JSON Formatter & Validator', shortDesc: 'Format, validate, beautify, and minify JSON data structures.' },
    ur: { name: 'جے ایس او این فارمیٹر', shortDesc: 'جے ایس او این کوڈ کو خوبصورت بنائیں اور درستگی چیک کریں۔' },
    ar: { name: 'منسق ومحقق JSON', shortDesc: 'تنسيق والتحقق من صحة بيانات JSON وضغطها بكل سهولة.' },
    hi: { name: 'JSON फॉर्मेटर व वैलिडेटर', shortDesc: 'JSON कोड को सुंदर बनाएं और त्रुटियों की जांच करें।' },
  },
  'jwt-decoder': {
    en: { name: 'JWT Token Decoder', shortDesc: 'Decode and inspect JSON Web Tokens headers and payload claims securely.' },
    ur: { name: 'جے ڈبلیو ٹی ڈیکوڈر', shortDesc: 'ٹوکن کے اندر موجود کلیمز اور ڈیٹا کو پرائیویٹ طور پر چیک کریں۔' },
    ar: { name: 'فك تشفير JWT', shortDesc: 'فحص بيانات ومعلومات رموز JWT بأمان محلي تام.' },
    hi: { name: 'JWT टोकन डीकोडर', shortDesc: 'JSON वेब टोकन हेडर और डेटा सुरक्षित रूप से देखें।' },
  },
  'uuid-generator': {
    en: { name: 'UUID / GUID Generator', shortDesc: 'Generate random v4 and cryptographic unique identifiers.' },
    ur: { name: 'یو یو آئی ڈی جنریٹر', shortDesc: 'ڈیٹا بیس کے لیے منفرد شناختی کوڈز (UUID v4) تیار کریں۔' },
    ar: { name: 'مولد معرّفات UUID', shortDesc: 'توليد معرّفات فريدة وعشوائية بصيغة UUID v4 للتطبيقات.' },
    hi: { name: 'UUID जनरेटर', shortDesc: 'डेटाबेस के लिए अद्वितीय UUID v4 कोड बनाएं।' },
  },
  'hash-generator': {
    en: { name: 'Hash Generator (MD5, SHA)', shortDesc: 'Generate cryptographic MD5, SHA-1, SHA-256, and SHA-512 hashes.' },
    ur: { name: 'ہیش جنریٹر (SHA-256)', shortDesc: 'ٹیکسٹ اور پاس ورڈز کے لیے کرپٹو گرافک ہیش بنائیں۔' },
    ar: { name: 'مولد الهاش والتشفير', shortDesc: 'توليد بصمات التشفير مثل MD5 و SHA-256 و SHA-512.' },
    hi: { name: 'क्रिप्टोग्राफ़िक हैश जनरेटर', shortDesc: 'सुरक्षित MD5, SHA-256 और SHA-512 हैश बनाएं।' },
  },
  'password-generator': {
    en: { name: 'Secure Password Generator', shortDesc: 'Generate strong, unpredictable passwords with custom entropy.' },
    ur: { name: 'مضبوط پاس ورڈ جنریٹر', shortDesc: 'انتہائی محفوظ اور ناقابل تسخیر پاس ورڈز تیار کریں۔' },
    ar: { name: 'مولد كلمات المرور الآمنة', shortDesc: 'إنشاء كلمات مرور قوية ومعقدة لحماية حساباتك.' },
    hi: { name: 'मजबूत पासवर्ड जनरेटर', shortDesc: 'अत्यधिक सुरक्षित और मजबूत पासवर्ड बनाएं।' },
  },
  'qr-code-generator': {
    en: { name: 'QR Code Generator', shortDesc: 'Create customized QR codes for URLs, WiFi, text, and contacts.' },
    ur: { name: 'کیو آر کوڈ جنریٹر', shortDesc: 'ویب سائٹ لنکس، وائی فائی اور واٹس ایپ کے لیے خوبصورت کیو آر کوڈ بنائیں۔' },
    ar: { name: 'مولد رموز QR', shortDesc: 'إنشاء رموز QR مخصصة للروابط والواي فاي وبطاقات الاتصال.' },
    hi: { name: 'QR कोड जनरेटर', shortDesc: 'वेबसाइट लिंक, वाई-फ़ाई और टेक्स्ट के लिए QR कोड बनाएं।' },
  },
  'qr-generator': {
    en: { name: 'QR Generator', shortDesc: 'Create customized QR codes for URLs, WiFi, text, and contacts.' },
    ur: { name: 'کیو آر کوڈ بنائیں', shortDesc: 'روابط اور ٹیکسٹ کے لیے کیو آر کوڈ تیار کریں۔' },
    ar: { name: 'صانع باركود QR', shortDesc: 'توليد وتخصيص رموز QR بسرعة وسهولة.' },
    hi: { name: 'QR कोड मेकर', shortDesc: 'कस्टम QR कोड आसानी से बनाएं।' },
  },
  'video-downloader': {
    en: { name: 'Social Video Downloader', shortDesc: 'Download public videos in MP4 HD from YouTube, Instagram, and TikTok.' },
    ur: { name: 'ویڈیو ڈاؤنلوڈر', shortDesc: 'یوٹیوب، انسٹاگرام اور ٹک ٹاک ویڈیوز کو فل ایچ ڈی میں محفوظ کریں۔' },
    ar: { name: 'محمل الفيديو من منصات التواصل', shortDesc: 'تحميل مقاطع الفيديو عالية الدقة من مختلف المنصات.' },
    hi: { name: 'वीडियो डाउनलोडर', shortDesc: 'YouTube, Instagram और TikTok से HD वीडियो डाउनलोड करें।' },
  },
  'youtube-downloader': {
    en: { name: 'YouTube Video Downloader', shortDesc: 'Download YouTube videos in MP4 HD or convert directly to MP3.' },
    ur: { name: 'یوٹیوب ویڈیو ڈاؤنلوڈر', shortDesc: 'یوٹیوب ویڈیوز کو ایچ ڈی یا ایم پی تھری میں ڈاؤنلوڈ کریں۔' },
    ar: { name: 'محمل فيديوهات يوتيوب', shortDesc: 'تنزيل مقاطع يوتيوب بجودة عالية وتحويلها إلى صوت.' },
    hi: { name: 'YouTube वीडियो डाउनलोडर', shortDesc: 'YouTube वीडियो को HD या MP3 में सुरक्षित करें।' },
  },
  'instagram-downloader': {
    en: { name: 'Instagram Reels Downloader', shortDesc: 'Download public Instagram Reels, videos, and stories.' },
    ur: { name: 'انسٹاگرام ریلز ڈاؤنلوڈر', shortDesc: 'انسٹاگرام ویڈیوز اور ریلز بغیر واٹر مارک ڈاؤنلوڈ کریں۔' },
    ar: { name: 'تنزيل ريلز إنستغرام', shortDesc: 'تحميل مقاطع الفيديو والريلز من إنستغرام بسهولة.' },
    hi: { name: 'Instagram रील्स डाउनलोडर', shortDesc: 'Instagram रील्स और वीडियो सुरक्षित डाउनलोड करें।' },
  },
  'tiktok-downloader': {
    en: { name: 'TikTok No-Watermark Downloader', shortDesc: 'Download TikTok videos without watermark in original HD clarity.' },
    ur: { name: 'ٹک ٹاک ویڈیو ڈاؤنلوڈر', shortDesc: 'ٹک ٹاک ویڈیوز بغیر واٹر مارک کے اصل کوالٹی میں ڈاؤنلوڈ کریں۔' },
    ar: { name: 'تحميل فيديو تيك توك بدون علامة', shortDesc: 'تنزيل مقاطع تيك توك بدون علامة مائية وبجودة أصلية.' },
    hi: { name: 'TikTok वीडियो डाउनलोडर', shortDesc: 'बिना वॉटरमार्क के TikTok वीडियो डाउनलोड करें।' },
  },
  'whatsapp-status-saver': {
    en: { name: 'WhatsApp Direct Chat & Status', shortDesc: 'Open direct WhatsApp chats without saving numbers and save statuses.' },
    ur: { name: 'واٹس ایپ ڈائریکٹ چیٹ', shortDesc: 'نمبر محفوظ کیے بغیر براہ راست واٹس ایپ میسج بھیجیں۔' },
    ar: { name: 'محادثة واتساب المباشرة', shortDesc: 'بدء محادثة واتساب فورية بدون حفظ رقم الهاتف.' },
    hi: { name: 'WhatsApp डायरेक्ट चैट', shortDesc: 'नंबर सेव किए बिना सीधे WhatsApp संदेश भेजें।' },
  },
  'video-to-mp3': {
    en: { name: 'Video to MP3 Converter', shortDesc: 'Extract high bitrate crystal-clear MP3 audio from any video file.' },
    ur: { name: 'ویڈیو سے آڈیو (MP3)', shortDesc: 'ویڈیو میں سے شفاف آواز کو ایم پی تھری فارمیٹ میں الگ کریں۔' },
    ar: { name: 'تحويل الفيديو إلى صوت MP3', shortDesc: 'استخراج الصوت عالي الجودة من مقاطع الفيديو بصيغة MP3.' },
    hi: { name: 'वीडियो से MP3 ऑडियो निकालें', shortDesc: 'किसी भी वीडियो फ़ाइल से साफ़ MP3 ऑडियो अलग करें।' },
  },
  'financial-calculators': {
    en: { name: 'Loan & EMI Calculator', shortDesc: 'Calculate monthly loan EMI, total interest, and amortized repayment schedules.' },
    ur: { name: 'قرض اور قسط (EMI) کیلکولیٹر', shortDesc: 'ماہانہ قسط (EMI)، کل سود اور قرض کی ادائیگی کا حساب لگائیں۔' },
    ar: { name: 'حاسبة القروض والأقساط الشهرية', shortDesc: 'حساب القسط الشهري، إجمالي الفوائد، وجدول سداد القرض.' },
    hi: { name: 'लोन और ईएमआई (EMI) कैलकुलेटर', shortDesc: 'मासिक ईएमआई, कुल ब्याज और ऋण भुगतान अनुसूची की गणना करें।' },
  },
  'gst-calculator': {
    en: { name: 'GST & Sales Tax Calculator', shortDesc: 'Calculate inclusive and exclusive GST / VAT taxes with CGST and SGST splits.' },
    ur: { name: 'جی ایس ٹی اور سیلز ٹیکس کیلکولیٹر', shortDesc: 'جی ایس ٹی اور ویٹ ٹیکس کا حساب لگائیں (CGST + SGST تقسیم کے ساتھ)۔' },
    ar: { name: 'حاسبة ضريبة القيمة المضافة (GST/VAT)', shortDesc: 'حساب الضرائب الشاملة وغير الشاملة وتفصيل الضريبة المضافة.' },
    hi: { name: 'जीएसटी और टैक्स कैलकुलेटर', shortDesc: 'जीएसटी और वैट टैक्स की गणना करें (CGST + SGST विभाजन के साथ)।' },
  },
  'discount-calculator': {
    en: { name: 'Discount & Sale Calculator', shortDesc: 'Calculate final shopping price, percentage discounts, and total money saved.' },
    ur: { name: 'رعایت اور بچت کیلکولیٹر', shortDesc: 'خریداری کی حتمی قیمت، فیصد رعایت اور کل بچت کا حساب لگائیں۔' },
    ar: { name: 'حاسبة الخصومات والعروض والتوفير', shortDesc: 'حساب السعر النهائي بعد الخصم ونسبة التوفير الإجمالية.' },
    hi: { name: 'छूट और बचत कैलकुलेटर', shortDesc: 'अंतिम खरीद मूल्य, प्रतिशत छूट और कुल बचत की गणना करें।' },
  },
  'profit-margin-calculator': {
    en: { name: 'Profit Margin & Markup Calculator', shortDesc: 'Calculate gross profit, profit margins, and markup percentages for products.' },
    ur: { name: 'منافع کا مارجن اور مارک اپ', shortDesc: 'کاروبار یا مصنوعات کے خالص منافع، مارجن اور مارک اپ فیصد کا حساب لگائیں۔' },
    ar: { name: 'حاسبة هامش الربح والزيادة', shortDesc: 'حساب إجمالي الربح، هامش الربح المئوي ونسبة زيادة الأسعار.' },
    hi: { name: 'लाभ मार्जिन और मार्कअप कैलकुलेटर', shortDesc: 'उत्पाद या व्यवसाय के लिए सकल लाभ, लाभ मार्जिन और मार्कअप प्रतिशत की गणना करें।' },
  },
};

export const COURSE_TRANSLATIONS: Record<string, Record<Language, { title: string; subtitle: string; category: string }>> = {
  'modern-fullstack-web-mastery': {
    en: {
      title: 'Modern Full-Stack Web Mastery (Next.js 14, TypeScript & Tailwind)',
      subtitle: 'Master complete full-stack web engineering with React Server Components, Tailwind CSS, PostgreSQL, and Firebase security architecture.',
      category: 'Web Development',
    },
    ur: {
      title: 'مکمل فل اسٹیک ویب ڈیولپمنٹ ماسٹری (Next.js 14 و TypeScript)',
      subtitle: 'جدید ری ایکٹ سرور کمپوننٹس، ٹیل ونڈ سی ایس ایس، اور فائر بیس سیکیورٹی آرکیٹیکچر میں مکمل مہارت حاصل کریں۔',
      category: 'ویب ڈیولپمنٹ',
    },
    ar: {
      title: 'احتراف تطوير الويب الشامل (Next.js 14 و TypeScript)',
      subtitle: 'أتقن هندسة الويب الحديثة مع React Server Components و Tailwind CSS والأمان المتقدم لقواعد البيانات.',
      category: 'تطوير الويب',
    },
    hi: {
      title: 'आधुनिक फुल-स्टैक वेब डेवलपमेंट मास्टरी (Next.js 14 व TypeScript)',
      subtitle: 'React Server Components, Tailwind CSS, और Firebase सुरक्षा आर्किटेक्चर के साथ सम्पूर्ण वेब इंजीनियरिंग सीखें।',
      category: 'वेब डेवलपमेंट',
    },
  },
  'python-ai-prompt-engineering-mastery': {
    en: {
      title: 'Python for AI, Automation & Advanced Prompt Engineering',
      subtitle: 'Build autonomous AI agents, automate business workflows, and master LLM prompting with LangChain, LlamaIndex, and Vector Databases.',
      category: 'AI & Data Science',
    },
    ur: {
      title: 'پائتھون برائے اے آئی، آٹومیشن اور پرامپٹ انجینئرنگ',
      subtitle: 'خودکار اے آئی ایجنٹس بنائیں، کاروباری عمل کو آٹومیٹ کریں اور لارج لینگویج ماڈلز میں ماسٹری حاصل کریں۔',
      category: 'مصنوعی ذہانت و ڈیٹا',
    },
    ar: {
      title: 'بايثون للذكاء الاصطناعي وهندسة الأوامر المتقدمة',
      subtitle: 'بناء وكلاء الذكاء الاصطناعي المستقلين وأتمتة المهام المعقدة باستخدام نماذج اللغات وقواعد البيانات الشعاعية.',
      category: 'الذكاء الاصطناعي',
    },
    hi: {
      title: 'पायथन फॉर एआई, ऑटोमेशन और प्रॉम्प्ट इंजीनियरिंग',
      subtitle: 'स्वायत्त AI एजेंट बनाएं, वर्कफ़्लो ऑटोमेट करें और वेक्टर डेटाबेस व LLM प्रॉम्प्टिंग में महारत हासिल करें।',
      category: 'एआई व डेटा साइंस',
    },
  },
  'document-pdf-automation-mastery': {
    en: {
      title: 'Document Engineering, PDF Architecture & OCR Systems',
      subtitle: 'Deep dive into PDF internals, WebAssembly document parsing, Tesseract OCR optimization, and high-performance client-side workflows.',
      category: 'Document Engineering',
    },
    ur: {
      title: 'دستاویزات انجینئرنگ، پی ڈی ایف آرکیٹیکچر اور او سی آر سسٹمز',
      subtitle: 'پی ڈی ایف فارمیٹس، ویب اسمبلی دستاویز پروسیسنگ اور او سی آر سے ٹیکسٹ نکالنے کی جدید ترین مہارت حاصل کریں۔',
      category: 'دستاویزات انجینئرنگ',
    },
    ar: {
      title: 'هندسة المستندات وهيكلية PDF وأنظمة OCR',
      subtitle: 'دراسة متعمقة في معالجة ملفات PDF عبر WebAssembly واستخراج النصوص بتقنيات OCR عالية الأداء.',
      category: 'هندسة المستندات',
    },
    hi: {
      title: 'डॉक्यूमेंट इंजीनियरिंग, PDF आर्किटेक्चर और OCR सिस्टम',
      subtitle: 'PDF संरचना, WebAssembly डॉक्यूमेंट प्रोसेसिंग और Tesseract OCR टेक्स्ट निष्कर्षण की तकनीकें सीखें।',
      category: 'दस्तावेज़ इंजीनियरिंग',
    },
  },
  'cybersecurity-privacy-engineering': {
    en: {
      title: 'Cyber Security, Cryptography & Zero-Trust Privacy Engineering',
      subtitle: 'Master modern encryption (AES-256, SHA-256), client-side sandboxes, Firebase custom claims, and zero-knowledge storage security.',
      category: 'Security & Privacy',
    },
    ur: {
      title: 'سائبر سیکیورٹی، کرپٹوگرافی اور زیرو ٹرسٹ پرائیویسی',
      subtitle: 'جدید ترین خفیہ کاری (AES-256)، کلائنٹ سائیڈ سینڈ باکسز اور فائر بیس کسٹم کلیمز میں مکمل کمان حاصل کریں۔',
      category: 'سیکیورٹی و پرائیویسی',
    },
    ar: {
      title: 'الأمن السيبراني والتشفير وهندسة الخصوصية الفائقة',
      subtitle: 'إتقان تقنيات التشفير الحديثة (AES-256 و SHA) وحماية البيانات محلياً بدون مشاركة أي معلومات حساسة.',
      category: 'الأمان والخصوصية',
    },
    hi: {
      title: 'साइबर सुरक्षा, क्रिप्टोग्राफ़ी और ज़ीरो-ट्रस्ट गोपनीयता',
      subtitle: 'आधुनिक एन्क्रिप्शन (AES-256), क्लाइंट-साइड सैंडबॉक्स, और Firebase सुरक्षा दावों की सम्पूर्ण समझ प्राप्त करें।',
      category: 'सुरक्षा व गोपनीयता',
    },
  },
};

/**
 * Returns localized tool definition name, shortDesc, and category label.
 */
export function getLocalizedTool(tool: ToolDefinition, lang: Language): { name: string; shortDesc: string; categoryLabel: string } {
  const trans = TOOL_TRANSLATIONS[tool.id]?.[lang] || TOOL_TRANSLATIONS[tool.slug]?.[lang];
  const catLabel = CATEGORY_TRANSLATIONS[tool.category]?.[lang] || tool.category;

  return {
    name: trans?.name || tool.name,
    shortDesc: trans?.shortDesc || tool.shortDesc,
    categoryLabel: catLabel,
  };
}

/**
 * Returns localized category name for navigation / filters.
 */
export function getLocalizedCategory(categoryKey: string, lang: Language): string {
  return CATEGORY_TRANSLATIONS[categoryKey]?.[lang] || categoryKey;
}

/**
 * Returns localized course title, description, and category label.
 */
export function getLocalizedCourse(course: Course, lang: Language): Course {
  const trans = COURSE_TRANSLATIONS[course.id]?.[lang] || COURSE_TRANSLATIONS[course.slug]?.[lang];
  if (!trans) return course;

  return {
    ...course,
    title: trans.title || course.title,
    description: trans.subtitle || course.description,
    categoryLabel: trans.category || course.categoryLabel,
  };
}
