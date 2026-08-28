# Jwellers Edith — Smart Action Mobile Companion Application

A cross-platform mobile companion application for **Jwellers Edith Jewelry ERP**, designed for Indian jewelry shop owners to manage Khata balances, Girvi pledges, and customer payments on the go.

---

## 📱 Key Features

* **⚡ ₹0/Month Google Drive Free Sync**: Connects to the desktop software using the QR Pairing Code (`JWELL-EDIT-8899`) and your personal 15 GB Google Drive folder (`/JwellersEdith_Sync/`).
* **📦 100% Offline Access**: High-performance local cache for Khata balances, Girvi pledge records, and customer contacts.
* **💳 Dynamic Bharat UPI QR Generator**: Generates on-screen customer payment QR codes with exact dues amounts for instant scanning via GPay, PhonePe, or Paytm.
* **📲 1-Tap WhatsApp Dues Sender**: Formatted polite reminder messages with phone number sanitization (`91`).
* **📸 Ornament Camera Attachment**: Capture and attach jewelry photos to pledge records.
* **🌐 Bilingual Interface**: Instant toggle between **English & हिंदी**.

---

## 🚀 Getting Started

### Local Browser Preview
```bash
# Open public/index.html in any modern mobile browser or Chrome DevTools (Mobile Mode)
```

### Folder Structure
```
jwelles edith app/
├── App.js                   # Main application router & coordinator
├── package.json             # App metadata & dependencies
├── public/
│   ├── index.html           # Mobile HTML entry shell
│   └── manifest.json        # PWA & Web App manifest
├── src/
│   ├── screens/
│   │   ├── DashboardScreen.js
│   │   ├── KhataScreen.js
│   │   ├── GirviScreen.js
│   │   ├── CustomerScreen.js
│   │   ├── PairingScreen.js
│   │   └── SettingsScreen.js
│   ├── services/
│   │   ├── driveSync.js     # Delta sync engine for Google Drive
│   │   ├── storage.js       # Offline storage & cache
│   │   ├── upi.js           # Bharat UPI payment QR generator
│   │   ├── whatsapp.js      # WhatsApp reminder templates
│   │   └── i18n.js          # English & Hindi translation dictionary
│   └── styles/
│       └── mobile.css       # Mobile UI styles & animations
```

---

## 🧪 Testing

Run the automated test suite from the root directory:
```bash
node tests/mobile_sync.test.js
```
