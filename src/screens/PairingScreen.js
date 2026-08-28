const { MobileI18N } = require('../services/i18n');
const { MobileStorage } = require('../services/storage');
const { MobileDriveSync } = require('../services/driveSync');

const PairingScreen = {
  render() {
    const t = (k, fb) => MobileI18N.t(k, fb);
    const pairing = MobileStorage.getPairingInfo();

    return `
      <div class="mobile-content">
        <div class="card" style="text-align:center; padding:24px 16px;">
          <div style="font-size:48px; margin-bottom:12px;">🔗</div>
          <h2 style="font-size:18px; font-weight:700;">${t('pairWithDesktop', 'Pair with Desktop PC')}</h2>
          <p style="font-size:13px; color:var(--text-muted); margin-top:6px; line-height:1.5;">
            ${t('desktopInstructions', 'Open Desktop Settings > Mobile Companion QR Code, then scan or enter pairing code JWELL-EDIT-8899')}
          </p>

          <div style="margin:20px 0; text-align:left;">
            <label style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Pairing Code</label>
            <input type="text" id="pairing-code-input" class="search-input" style="padding-left:14px; margin-top:6px; font-weight:700; letter-spacing:1px;" placeholder="e.g. JWELL-EDIT-8899" value="${pairing.pairingCode || 'JWELL-EDIT-8899'}">

            <label style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-top:14px; display:block;">Owner Google Account</label>
            <input type="email" id="pairing-email-input" class="search-input" style="padding-left:14px; margin-top:6px;" placeholder="owner.jeweller@gmail.com" value="${pairing.accountEmail || 'owner.jeweller@gmail.com'}">
          </div>

          <button class="btn btn-primary btn-block" onclick="PairingScreen.handlePair()">
            ✅ ${pairing.paired ? 'Update Pairing' : t('pairButton', 'Pair Device Now')}
          </button>

          ${pairing.paired ? `
            <div style="margin-top:16px; padding:12px; background:#e8f8f5; border-radius:8px; font-size:13px; color:var(--success); font-weight:600;">
              🟢 Device Paired (Last Synced: ${pairing.pairedAt ? pairing.pairedAt.split('T')[0] : 'Today'})
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  async handlePair() {
    const code = document.getElementById('pairing-code-input')?.value.trim() || 'JWELL-EDIT-8899';
    const email = document.getElementById('pairing-email-input')?.value.trim() || 'owner.jeweller@gmail.com';

    await MobileDriveSync.pairFromQrPayload({
      pairingCode: code,
      accountEmail: email,
      driveFolder: '/JwellersEdith_Sync/'
    });

    alert('🎉 Successfully paired with Desktop PC! Offline sync initialized.');
    MobileApp.navigate('dashboard');
  }
};

if (typeof module !== 'undefined') {
  module.exports = { PairingScreen };
}
