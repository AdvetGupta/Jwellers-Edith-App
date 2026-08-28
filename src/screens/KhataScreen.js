const { MobileI18N } = require('../services/i18n');
const { MobileStorage } = require('../services/storage');
const { WhatsAppService } = require('../services/whatsapp');
const { UpiService } = require('../services/upi');

const KhataScreen = {
  _searchQuery: '',

  render() {
    const t = (k, fb) => MobileI18N.t(k, fb);
    const allKhata = MobileStorage.getKhataDues();
    const query = this._searchQuery.toLowerCase();

    const filtered = allKhata.filter(c => 
      !query || 
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.phone && c.phone.includes(query)) ||
      (c.city && c.city.toLowerCase().includes(query))
    );

    return `
      <div class="mobile-content">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" id="khata-search-input" placeholder="${t('searchKhata', 'Search customer name or phone...')}" value="${this._escape(this._searchQuery)}" oninput="KhataScreen.onSearch(this.value)">
        </div>

        ${filtered.length === 0 ? `
          <div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">
            ${t('noDuesFound', 'No pending Khata dues found!')}
          </div>
        ` : filtered.map(c => `
          <div class="card" style="border-left: 4px solid var(--danger);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <div style="font-weight:700; font-size:15px;">${this._escape(c.name)}</div>
                <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📍 ${this._escape(c.city || 'Local')} • 📞 ${this._escape(c.phone)}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:11px; font-weight:700; color:var(--text-muted);">DUES BALANCE</div>
                <div style="font-size:18px; font-weight:800; color:var(--danger); margin-top:2px;">₹${(c.dues || 0).toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:14px; border-top:1px solid var(--border); padding-top:12px;">
              <button class="btn btn-whatsapp" onclick="KhataScreen.sendWhatsApp('${this._escape(c.phone)}', '${this._escape(c.name)}', ${c.dues})">
                📲 ${t('sendWhatsappReminder', 'WhatsApp')}
              </button>
              <button class="btn btn-primary" onclick="KhataScreen.showUpiQr('${this._escape(c.name)}', ${c.dues})">
                💳 ${t('showUpiQr', 'UPI QR')}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  onSearch(val) {
    this._searchQuery = val || '';
    const root = document.getElementById('mobile-screen-root');
    if (root) root.innerHTML = this.render();
  },

  sendWhatsApp(phone, name, dues) {
    const msg = WhatsAppService.formatKhataReminder(name, dues, 'Jwellers Edith');
    const link = WhatsAppService.getWhatsAppLink(phone, msg);
    window.open(link, '_blank');
  },

  showUpiQr(name, dues) {
    const pairing = MobileStorage.getPairingInfo();
    const upiId = pairing.shopUpiId || 'owner.jeweller@upi';
    const upiUri = UpiService.generateUpiUri(upiId, 'Jwellers Edith', dues, `Khata Dues - ${name}`);
    const qrUrl = UpiService.generateQrImageUrl(upiUri, 280);

    const modalHtml = `
      <div class="mobile-modal-overlay" id="upi-qr-modal" onclick="KhataScreen.closeModal(event)">
        <div class="mobile-modal" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="font-size:16px;">💳 Customer Instant UPI Payment</h3>
            <button class="btn btn-sm btn-secondary" onclick="document.getElementById('upi-qr-modal').remove()">✕</button>
          </div>
          <div style="text-align:center; padding:10px 0;">
            <img src="${qrUrl}" alt="UPI QR Code" style="width:240px; height:240px; border-radius:12px; border:2px solid var(--border);" />
            <div style="font-weight:800; font-size:22px; color:var(--primary); margin-top:12px;">₹${Number(dues).toLocaleString('en-IN')}</div>
            <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">Scan with GPay, PhonePe, Paytm or any UPI App</div>
            <div style="font-size:12px; font-family:monospace; background:var(--bg-app); padding:6px; border-radius:6px; margin-top:10px; display:inline-block;">${upiId}</div>
          </div>
          <button class="btn btn-secondary btn-block" style="margin-top:16px;" onclick="document.getElementById('upi-qr-modal').remove()">Close</button>
        </div>
      </div>
    `;

    const container = document.getElementById('mobile-modal-root');
    if (container) container.innerHTML = modalHtml;
  },

  closeModal(e) {
    const modal = document.getElementById('upi-qr-modal');
    if (modal) modal.remove();
  },

  _escape(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};

if (typeof module !== 'undefined') {
  module.exports = { KhataScreen };
}
