const { MobileI18N } = require('../services/i18n');
const { MobileStorage } = require('../services/storage');

const DashboardScreen = {
  render() {
    const t = (k, fb) => MobileI18N.t(k, fb);
    const khata = MobileStorage.getKhataDues();
    const girvi = MobileStorage.getGirviLoans();
    const rates = MobileStorage.getMetalRates();
    const pairing = MobileStorage.getPairingInfo();

    const totalKhataDues = khata.reduce((s, c) => s + (c.dues || 0), 0);
    const activeGirviCount = girvi.length || 0;
    const totalGirviPrincipal = girvi.reduce((s, g) => s + (g.principal_amount || 0), 0);
    const totalGoldWt = girvi.reduce((s, g) => s + (g.gold_weight || 0), 0);
    const totalSilverWt = girvi.reduce((s, g) => s + (g.silver_weight || 0), 0);

    return `
      <div class="mobile-content">
        <!-- Live Metal Rate Ticker -->
        <div class="card" style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%); border-left: 4px solid var(--primary);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:11px; font-weight:700; color:var(--primary); text-transform:uppercase;">🥇 ${t('todayGoldRate', 'Gold 22K (10g)')}</div>
              <div style="font-size:18px; font-weight:800; margin-top:2px;">₹${(rates.gold22k || 67400).toLocaleString('en-IN')}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px; font-weight:700; color:var(--info); text-transform:uppercase;">🥈 ${t('todaySilverRate', 'Silver (1kg)')}</div>
              <div style="font-size:18px; font-weight:800; margin-top:2px;">₹${(rates.silver1kg || 86500).toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        <!-- 4 Core Business KPIs -->
        <div class="stat-grid">
          <div class="stat-box" onclick="MobileApp.navigate('khata')" style="cursor:pointer;">
            <div class="stat-label">${t('activeKhataDues', 'Khata Dues')}</div>
            <div class="stat-val" style="color:var(--danger)">₹${totalKhataDues.toLocaleString('en-IN')}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">${khata.length} ${t('customers', 'customers')}</div>
          </div>
          <div class="stat-box" onclick="MobileApp.navigate('girvi')" style="cursor:pointer;">
            <div class="stat-label">${t('activeGirviLoans', 'Active Girvi')}</div>
            <div class="stat-val" style="color:var(--primary)">₹${totalGirviPrincipal.toLocaleString('en-IN')}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">${activeGirviCount} pledges</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">${t('totalGoldPledged', 'Gold Pledged')}</div>
            <div class="stat-val" style="color:var(--warning)">${totalGoldWt.toFixed(2)}g</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">In Safe Vault</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">${t('totalSilverPledged', 'Silver Pledged')}</div>
            <div class="stat-val" style="color:var(--info)">${totalSilverWt.toFixed(2)}g</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">In Safe Vault</div>
          </div>
        </div>

        <!-- Quick Action Shortcuts -->
        <div class="card">
          <div style="font-weight:700; font-size:14px; margin-bottom:12px;">⚡ Quick Actions</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button class="btn btn-primary" onclick="MobileApp.navigate('khata')" style="padding:12px;">
              📒 View Khata
            </button>
            <button class="btn btn-secondary" onclick="MobileApp.navigate('girvi')" style="padding:12px;">
              💍 View Girvi
            </button>
          </div>
        </div>

        <!-- Device Pairing Card -->
        <div class="card" style="border: 1px dashed var(--border);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:700; font-size:13px;">${pairing.paired ? '🟢 Paired to Desktop PC' : '⚪ Desktop Pairing'}</div>
              <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                ${pairing.paired ? `Drive Folder: ${pairing.driveFolder}` : 'Scan pairing code to connect'}
              </div>
            </div>
            <button class="btn btn-sm btn-secondary" onclick="MobileApp.navigate('pairing')">
              ${pairing.paired ? 'Manage' : 'Pair Now'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

if (typeof module !== 'undefined') {
  module.exports = { DashboardScreen };
}
