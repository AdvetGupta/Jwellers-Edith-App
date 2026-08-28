const { MobileI18N } = require('../services/i18n');
const { MobileStorage } = require('../services/storage');

const CustomerScreen = {
  _searchQuery: '',

  render() {
    const t = (k, fb) => MobileI18N.t(k, fb);
    const all = MobileStorage.getCustomers();
    const query = this._searchQuery.toLowerCase();

    const filtered = all.filter(c =>
      !query ||
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.phone && c.phone.includes(query)) ||
      (c.city && c.city.toLowerCase().includes(query)) ||
      (c.customer_id && c.customer_id.toLowerCase().includes(query))
    );

    return `
      <div class="mobile-content">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" id="customer-search-input" placeholder="${t('searchCustomer', 'Search customer name, phone, city...')}" value="${this._escape(this._searchQuery)}" oninput="CustomerScreen.onSearch(this.value)">
        </div>

        ${filtered.length === 0 ? `
          <div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">
            No customers found in local cache!
          </div>
        ` : filtered.map(c => `
          <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; font-size:15px;">${this._escape(c.name)}</div>
                <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📍 ${this._escape(c.city || 'Local')} • 📞 ${this._escape(c.phone)}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:11px; color:var(--text-muted);">Balance</div>
                <div style="font-weight:700; color:${(c.balance || 0) > 0 ? 'var(--danger)' : 'var(--success)'}; font-size:14px;">
                  ₹${(c.balance || 0).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-top:12px; border-top:1px solid var(--border); padding-top:10px;">
              <a href="tel:${c.phone}" class="btn btn-secondary" style="font-size:12px; padding:8px;">
                📞 ${t('call', 'Call')}
              </a>
              <a href="sms:${c.phone}" class="btn btn-secondary" style="font-size:12px; padding:8px;">
                💬 ${t('sms', 'SMS')}
              </a>
              <a href="https://api.whatsapp.com/send?phone=91${String(c.phone).replace(/\D/g,'')}" target="_blank" class="btn btn-whatsapp" style="font-size:12px; padding:8px;">
                📲 ${t('whatsapp', 'WhatsApp')}
              </a>
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

  _escape(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};

if (typeof module !== 'undefined') {
  module.exports = { CustomerScreen };
}
