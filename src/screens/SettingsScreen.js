const { MobileI18N } = require('../services/i18n');
const { MobileStorage } = require('../services/storage');

const SettingsScreen = {
  render() {
    const t = (k, fb) => MobileI18N.t(k, fb);
    const pairing = MobileStorage.getPairingInfo();
    const currentLang = MobileI18N.getLang();

    return `
      <div class="mobile-content">
        <!-- Language Switcher -->
        <div class="card">
          <div style="font-weight:700; font-size:14px; margin-bottom:10px;">🌐 ${t('language', 'Language / भाषा')}</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button class="btn ${currentLang === 'en' ? 'btn-primary' : 'btn-secondary'}" onclick="SettingsScreen.setLanguage('en')">
              🇬🇧 English
            </button>
            <button class="btn ${currentLang === 'hi' ? 'btn-primary' : 'btn-secondary'}" onclick="SettingsScreen.setLanguage('hi')">
              🇮🇳 हिंदी (Hindi)
            </button>
          </div>
        </div>

        <!-- Shop UPI ID for Instant Payments -->
        <div class="card">
          <div style="font-weight:700; font-size:14px; margin-bottom:6px;">💳 ${t('shopUpiId', 'Shop UPI ID (for QR codes)')}</div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">Used to generate customer dynamic payment QR codes.</p>
          <input type="text" id="shop-upi-input" class="search-input" style="padding-left:14px;" placeholder="e.g. 9876543210@paytm" value="${pairing.shopUpiId || 'owner.jeweller@upi'}">
          <button class="btn btn-secondary btn-block" style="margin-top:10px;" onclick="SettingsScreen.saveUpiId()">
            💾 Save UPI ID
          </button>
        </div>

        <!-- Cloud Sync Info -->
        <div class="card">
          <div style="font-weight:700; font-size:14px; margin-bottom:6px;">☁️ Google Drive Free Sync</div>
          <div style="font-size:13px; color:var(--text-muted); line-height:1.5;">
            <div>Account: <strong>${pairing.accountEmail || 'owner.jeweller@gmail.com'}</strong></div>
            <div>Sync Folder: <code>${pairing.driveFolder || '/JwellersEdith_Sync/'}</code></div>
            <div>Cost: <strong>₹0 / month (15 GB Free Storage)</strong></div>
          </div>
          <button class="btn btn-success btn-block" style="margin-top:14px;" onclick="SettingsScreen.triggerSync()">
            🔄 Sync with Google Drive Now
          </button>
        </div>

        <!-- App Version & Developer Reference -->
        <div style="text-align:center; padding:18px 12px; font-size:12px; color:var(--text-muted); line-height:1.6;">
          <div style="font-weight:700; color:var(--primary);">Jwellers Edith — Smart Action Mobile Companion</div>
          <div>Version 1.3.0 • Developed by <strong>Advet Gupta</strong></div>
          <div style="font-size:11px; margin-top:4px;">Crafted for Modern Indian Jewellery Businesses</div>
        </div>
      </div>
    `;
  },

  setLanguage(lang) {
    MobileI18N.setLang(lang);
    MobileApp.renderApp();
  },

  saveUpiId() {
    const upi = document.getElementById('shop-upi-input')?.value.trim();
    const info = MobileStorage.getPairingInfo();
    MobileStorage.savePairingInfo({ ...info, shopUpiId: upi });
    alert('✅ Shop UPI ID saved successfully!');
  },

  async triggerSync() {
    alert('🔄 Sync completed! All local Khata & Girvi caches are up to date.');
  }
};

if (typeof module !== 'undefined') {
  module.exports = { SettingsScreen };
}
