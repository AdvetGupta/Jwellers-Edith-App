const { MobileI18N } = require('./src/services/i18n');
const { MobileStorage } = require('./src/services/storage');
const { DashboardScreen } = require('./src/screens/DashboardScreen');
const { KhataScreen } = require('./src/screens/KhataScreen');
const { GirviScreen } = require('./src/screens/GirviScreen');
const { CustomerScreen } = require('./src/screens/CustomerScreen');
const { PairingScreen } = require('./src/screens/PairingScreen');
const { SettingsScreen } = require('./src/screens/SettingsScreen');

const MobileApp = {
  _currentScreen: 'dashboard',

  init() {
    MobileI18N.init();
    this._seedSampleCacheIfEmpty();
    this.renderApp();
  },

  _seedSampleCacheIfEmpty() {
    // Seed initial mobile cache if opening for the first time
    if (MobileStorage.getKhataDues().length === 0) {
      MobileStorage.saveKhataDues([
        { id: 1, name: 'Ramesh Patel', phone: '9822112233', city: 'Indapur', dues: 18500 },
        { id: 2, name: 'Sunita Sharma', phone: '9833445566', city: 'Baramati', dues: 24000 },
        { id: 3, name: 'Anand Kumar', phone: '9844556677', city: 'Pune', dues: 9200 },
        { id: 4, name: 'Vijay Deshmukh', phone: '9855667788', city: 'Phaltan', dues: 45000 },
        { id: 5, name: 'Sanjay Sonawane', phone: '9866778899', city: 'Daund', dues: 12800 }
      ]);
    }

    if (MobileStorage.getGirviLoans().length === 0) {
      MobileStorage.saveGirviLoans([
        { id: 1, loan_number: 'GIR-1001', customer_name: 'Ramesh Patel', father_husband_name: 'Dattatray', phone1: '9822112233', address: 'Indapur', item_name: 'Gold Chain 22K', metal_type: 'gold', gold_weight: 18.5, silver_weight: 0, principal_amount: 55000, monthly_interest_percent: 2.0, loan_date: '2026-06-10' },
        { id: 2, loan_number: 'GIR-1002', customer_name: 'Sunita Sharma', father_husband_name: 'Jagdish', phone1: '9833445566', address: 'Baramati', item_name: 'Silver Payal 92.5%', metal_type: 'silver', gold_weight: 0, silver_weight: 250, principal_amount: 14000, monthly_interest_percent: 2.5, loan_date: '2026-07-01' },
        { id: 3, loan_number: 'GIR-1003', customer_name: 'Vijay Deshmukh', father_husband_name: 'Baburao', phone1: '9855667788', address: 'Phaltan', item_name: 'Gold Bangles (2)', metal_type: 'gold', gold_weight: 32.0, silver_weight: 0, principal_amount: 95000, monthly_interest_percent: 1.5, loan_date: '2026-05-15' }
      ]);
    }

    if (MobileStorage.getCustomers().length === 0) {
      MobileStorage.saveCustomers([
        { id: 1, customer_id: 'CUST-001', name: 'Ramesh Patel', phone: '9822112233', city: 'Indapur', balance: 18500 },
        { id: 2, customer_id: 'CUST-002', name: 'Sunita Sharma', phone: '9833445566', city: 'Baramati', balance: 24000 },
        { id: 3, customer_id: 'CUST-003', name: 'Anand Kumar', phone: '9844556677', city: 'Pune', balance: 9200 },
        { id: 4, customer_id: 'CUST-004', name: 'Vijay Deshmukh', phone: '9855667788', city: 'Phaltan', balance: 45000 }
      ]);
    }
  },

  navigate(screenId) {
    this._currentScreen = screenId;
    this.renderApp();
    window.scrollTo(0, 0);
  },

  renderApp() {
    const root = document.getElementById('app');
    if (!root) return;

    const t = (k, fb) => MobileI18N.t(k, fb);
    const pairing = MobileStorage.getPairingInfo();

    let screenHtml = '';
    switch (this._currentScreen) {
      case 'khata': screenHtml = KhataScreen.render(); break;
      case 'girvi': screenHtml = GirviScreen.render(); break;
      case 'customers': screenHtml = CustomerScreen.render(); break;
      case 'pairing': screenHtml = PairingScreen.render(); break;
      case 'settings': screenHtml = SettingsScreen.render(); break;
      default: screenHtml = DashboardScreen.render(); break;
    }

    root.innerHTML = `
      <!-- Top Mobile Header -->
      <header class="mobile-header">
        <h1>
          <span>💍</span> ${t('appName', 'Jwellers Edith')}
        </h1>
        <div class="sync-badge" onclick="MobileApp.navigate('pairing')" style="cursor:pointer;">
          <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--success);"></span>
          ${pairing.paired ? t('paired', 'Connected') : t('pairWithDesktop', 'Pair PC')}
        </div>
      </header>

      <!-- Main Mobile Screen Container -->
      <main id="mobile-screen-root">
        ${screenHtml}
      </main>

      <!-- Modal Injection Anchor -->
      <div id="mobile-modal-root"></div>

      <!-- Bottom Floating Mobile Navigation -->
      <nav class="bottom-nav">
        <button class="nav-tab ${this._currentScreen === 'dashboard' ? 'active' : ''}" onclick="MobileApp.navigate('dashboard')">
          <span class="icon">◉</span>
          <span>${t('dashboard', 'Dashboard')}</span>
        </button>
        <button class="nav-tab ${this._currentScreen === 'khata' ? 'active' : ''}" onclick="MobileApp.navigate('khata')">
          <span class="icon">📒</span>
          <span>${t('khata', 'Khata')}</span>
        </button>
        <button class="nav-tab ${this._currentScreen === 'girvi' ? 'active' : ''}" onclick="MobileApp.navigate('girvi')">
          <span class="icon">💍</span>
          <span>${t('girvi', 'Girvi')}</span>
        </button>
        <button class="nav-tab ${this._currentScreen === 'customers' ? 'active' : ''}" onclick="MobileApp.navigate('customers')">
          <span class="icon">👥</span>
          <span>${t('customers', 'Customers')}</span>
        </button>
        <button class="nav-tab ${this._currentScreen === 'settings' ? 'active' : ''}" onclick="MobileApp.navigate('settings')">
          <span class="icon">⚙</span>
          <span>${t('settings', 'Settings')}</span>
        </button>
      </nav>
    `;
  }
};

window.MobileApp = MobileApp;
window.KhataScreen = KhataScreen;
window.GirviScreen = GirviScreen;
window.CustomerScreen = CustomerScreen;
window.PairingScreen = PairingScreen;
window.SettingsScreen = SettingsScreen;

if (typeof module !== 'undefined') {
  module.exports = { MobileApp };
}
