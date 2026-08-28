// Bilingual Mobile Translation Engine (English & Hindi)
const translations = {
  en: {
    appName: "Jwellers Edith Mobile",
    dashboard: "Dashboard",
    khata: "Khata Dues",
    girvi: "Girvi (Pledge)",
    customers: "Customers",
    settings: "Settings",
    pairWithDesktop: "Pair with Desktop",
    paired: "Connected to Desktop",
    syncStatus: "Sync Status",
    syncedJustNow: "Synced Just Now",
    syncing: "Syncing...",
    offlineMode: "100% Offline Ready",
    
    // Dashboard KPIs
    activeKhataDues: "Active Khata Dues",
    activeGirviLoans: "Active Girvi Pledges",
    totalGoldPledged: "Gold Pledged",
    totalSilverPledged: "Silver Pledged",
    todayGoldRate: "Today Gold Rate (22K)",
    todaySilverRate: "Today Silver Rate",
    recentTransactions: "Recent Activity",

    // Khata
    searchKhata: "Search customer or balance...",
    duesBalance: "Dues Balance",
    sendWhatsappReminder: "WhatsApp Reminder",
    showUpiQr: "Show UPI QR",
    noDuesFound: "No pending Khata dues found!",

    // Girvi
    searchGirvi: "Search Girvi #, name, phone, village...",
    pledgeDate: "Pledge Date",
    principalAmount: "Principal (₹)",
    ratePerMonth: "Rate %/mo",
    accruedInterest: "Interest Dues",
    totalDuesOutstanding: "Total Dues",
    attachPhoto: "Capture Photo",
    viewDetails: "View Details",

    // Customer
    searchCustomer: "Search customer directory...",
    call: "Call",
    whatsapp: "WhatsApp",
    sms: "SMS",

    // Pairing
    enterPairingCode: "Enter Pairing Code (e.g. JWELL-EDIT-8899)",
    connectDrive: "Connect Google Drive",
    pairButton: "Pair Device Now",
    desktopInstructions: "Open Desktop Settings > Scan QR or Enter Code JWELL-EDIT-8899",

    // Settings
    language: "Language / भाषा",
    shopUpiId: "Shop UPI ID (for QR codes)",
    driveFolder: "Sync Folder",
    disconnect: "Disconnect Device"
  },
  hi: {
    appName: "ज्वेलर्स एडिथ मोबाइल",
    dashboard: "डैशबोर्ड",
    khata: "खाता बकाया",
    girvi: "गिरवी खाता",
    customers: "ग्राहक सूची",
    settings: "सेटिंग्स",
    pairWithDesktop: "डेस्कटॉप से जोड़ें",
    paired: "डेस्कटॉप से जुड़ा हुआ",
    syncStatus: "सिंक स्थिति",
    syncedJustNow: "अभी सिंक हुआ",
    syncing: "सिंक हो रहा है...",
    offlineMode: "100% ऑफलाइन सक्रिय",

    // Dashboard KPIs
    activeKhataDues: "कुल खाता बकाया",
    activeGirviLoans: "सक्रिय गिरवी खाते",
    totalGoldPledged: "जमा सोना (ग्राम)",
    totalSilverPledged: "जमा चांदी (ग्राम)",
    todayGoldRate: "आज का सोना भाव (22K)",
    todaySilverRate: "आज का चांदी भाव",
    recentTransactions: "हाल की गतिविधियां",

    // Khata
    searchKhata: "ग्राहक या बकाया रकम खोजें...",
    duesBalance: "बकाया रकम",
    sendWhatsappReminder: "व्हाट्सएप तगादा भेजें",
    showUpiQr: "UPI QR दिखाएं",
    noDuesFound: "कोई बकाया खाता नहीं मिला!",

    // Girvi
    searchGirvi: "गिरवी नं., नाम, फोन, गांव से खोजें...",
    pledgeDate: "गिरवी दिनांक",
    principalAmount: "मूलधन (रकम)",
    ratePerMonth: "मासिक ब्याज दर %",
    accruedInterest: "ब्याज बकाया",
    totalDuesOutstanding: "कुल देय रकम",
    attachPhoto: "गहने का फोटो लें",
    viewDetails: "विवरण देखें",

    // Customer
    searchCustomer: "ग्राहक सूची में खोजें...",
    call: "कॉल करें",
    whatsapp: "व्हाट्सएप",
    sms: "SMS भेजें",

    // Pairing
    enterPairingCode: "पेयरिंग कोड दर्ज करें (जैसे JWELL-EDIT-8899)",
    connectDrive: "गूगल ड्राइव जोड़ें",
    pairButton: "डिवाइस कनेक्ट करें",
    desktopInstructions: "कंप्यूटर पर सेटिंग्स खोलें > QR कोड स्कैन करें या JWELL-EDIT-8899 डालें",

    // Settings
    language: "भाषा / Language",
    shopUpiId: "दुकान का UPI ID (QR पेमेंट के लिए)",
    driveFolder: "गूगल ड्राइव फोल्डर",
    disconnect: "डिवाइस डिस्कनेक्ट करें"
  }
};

let currentLang = 'en';

const MobileI18N = {
  getLang() {
    return currentLang;
  },
  setLang(lang) {
    if (translations[lang]) {
      currentLang = lang;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mobile_app_lang', lang);
      }
    }
  },
  t(key, fallback = '') {
    const dict = translations[currentLang] || translations.en;
    return dict[key] || fallback || key;
  },
  init() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('mobile_app_lang');
      if (saved && translations[saved]) {
        currentLang = saved;
      }
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = { translations, MobileI18N };
}
