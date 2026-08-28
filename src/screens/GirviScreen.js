const { MobileI18N } = require('../services/i18n');
const { MobileStorage } = require('../services/storage');

const GirviScreen = {
  _searchQuery: '',

  render() {
    const t = (k, fb) => MobileI18N.t(k, fb);
    const allGirvi = MobileStorage.getGirviLoans();
    const query = this._searchQuery.toLowerCase();

    const filtered = allGirvi.filter(g =>
      !query ||
      (g.loan_number && g.loan_number.toLowerCase().includes(query)) ||
      (g.customer_name && g.customer_name.toLowerCase().includes(query)) ||
      (g.phone1 && g.phone1.includes(query)) ||
      (g.address && g.address.toLowerCase().includes(query)) ||
      (g.item_name && g.item_name.toLowerCase().includes(query))
    );

    return `
      <div class="mobile-content">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" id="girvi-search-input" placeholder="${t('searchGirvi', 'Search Girvi #, name, phone, village...')}" value="${this._escape(this._searchQuery)}" oninput="GirviScreen.onSearch(this.value)">
        </div>

        ${filtered.length === 0 ? `
          <div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">
            No Girvi pledges found!
          </div>
        ` : filtered.map(g => {
          const wt = g.metal_type === 'gold' ? `${g.gold_weight}g Gold` : g.metal_type === 'silver' ? `${g.silver_weight}g Silver` : `${g.gold_weight}g Au / ${g.silver_weight}g Ag`;
          const intRate = g.monthly_interest_percent || 2.0;
          return `
            <div class="card" style="border-left: 4px solid var(--primary);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <div style="font-size:12px; font-weight:700; color:var(--primary);">${this._escape(g.loan_number)}</div>
                  <div style="font-weight:700; font-size:15px; margin-top:2px;">${this._escape(g.customer_name)}</div>
                  <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📍 ${this._escape(g.address)} • 📞 ${this._escape(g.phone1)}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:11px; font-weight:700; color:var(--text-muted);">${t('principalAmount', 'PRINCIPAL')}</div>
                  <div style="font-size:17px; font-weight:800; color:var(--primary); margin-top:2px;">₹${(g.principal_amount || 0).toLocaleString('en-IN')}</div>
                  <div style="font-size:11px; color:var(--text-muted);">${intRate}% /mo</div>
                </div>
              </div>

              <div style="background:var(--bg-app); padding:8px 12px; border-radius:8px; margin-top:10px; font-size:13px; display:flex; justify-content:space-between;">
                <span>💎 <strong>${this._escape(g.item_name)}</strong></span>
                <span>⚖️ <strong>${wt}</strong></span>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:12px;">
                <button class="btn btn-secondary" onclick="GirviScreen.attachPhoto('${g.id || g.loan_number}')">
                  📸 ${t('attachPhoto', 'Photo')}
                </button>
                <button class="btn btn-primary" onclick="GirviScreen.viewDetails('${this._escape(g.loan_number)}')">
                  👁️ ${t('viewDetails', 'Details')}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  onSearch(val) {
    this._searchQuery = val || '';
    const root = document.getElementById('mobile-screen-root');
    if (root) root.innerHTML = this.render();
  },

  attachPhoto(loanId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        MobileStorage.queueMutation({
          action: 'girvi:attach_photo',
          loanId,
          fileName: file.name,
          timestamp: new Date().toISOString()
        });
        alert('📸 Ornament photo captured and queued for sync!');
      }
    };
    input.click();
  },

  viewDetails(loanNo) {
    const all = MobileStorage.getGirviLoans();
    const g = all.find(x => x.loan_number === loanNo);
    if (!g) return;

    const modalHtml = `
      <div class="mobile-modal-overlay" id="girvi-detail-modal" onclick="document.getElementById('girvi-detail-modal').remove()">
        <div class="mobile-modal" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="font-size:16px;">💍 Ticket #${this._escape(g.loan_number)}</h3>
            <button class="btn btn-sm btn-secondary" onclick="document.getElementById('girvi-detail-modal').remove()">✕</button>
          </div>
          <div style="padding:10px 0; font-size:14px; line-height:1.6;">
            <div><strong>Customer:</strong> ${this._escape(g.customer_name)}</div>
            ${g.father_husband_name ? `<div><strong>Relation:</strong> S/o ${this._escape(g.father_husband_name)}</div>` : ''}
            <div><strong>Mobile:</strong> ${this._escape(g.phone1)}</div>
            <div><strong>Village/Address:</strong> ${this._escape(g.address)}</div>
            <hr style="margin:10px 0; border:0; border-top:1px solid var(--border);" />
            <div><strong>Ornament:</strong> ${this._escape(g.item_name)}</div>
            <div><strong>Metal Type:</strong> ${this._escape(g.metal_type).toUpperCase()}</div>
            <div><strong>Gold Weight:</strong> ${g.gold_weight} gms</div>
            <div><strong>Silver Weight:</strong> ${g.silver_weight} gms</div>
            <div><strong>Principal Loan:</strong> ₹${(g.principal_amount || 0).toLocaleString('en-IN')}</div>
            <div><strong>Monthly Rate:</strong> ${g.monthly_interest_percent || 2.0}%</div>
            <div><strong>Pledge Date:</strong> ${g.loan_date}</div>
            ${g.reference_person ? `<div><strong>Reference:</strong> ${this._escape(g.reference_person)}</div>` : ''}
          </div>
          <button class="btn btn-secondary btn-block" style="margin-top:16px;" onclick="document.getElementById('girvi-detail-modal').remove()">Close</button>
        </div>
      </div>
    `;

    const container = document.getElementById('mobile-modal-root');
    if (container) container.innerHTML = modalHtml;
  },

  _escape(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};

if (typeof module !== 'undefined') {
  module.exports = { GirviScreen };
}
