// Mobile High-Performance Offline Storage Service
const STORAGE_KEYS = {
  DEVICE_PAIRING: 'mobile_device_pairing',
  CUSTOMERS: 'mobile_cache_customers',
  KHATA_DUES: 'mobile_cache_khata_dues',
  GIRVI_LOANS: 'mobile_cache_girvi_loans',
  RATES: 'mobile_cache_metal_rates',
  OUTBOX_QUEUE: 'mobile_outbox_queue',
  LAST_SYNC: 'mobile_last_sync_timestamp'
};

const MobileStorage = {
  _memStore: {},

  getItem(key) {
    if (typeof localStorage !== 'undefined') {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
      } catch (e) {
        return null;
      }
    }
    return this._memStore[key] || null;
  },

  setItem(key, value) {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {}
    }
    this._memStore[key] = value;
  },

  removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
    delete this._memStore[key];
  },

  // High level helpers
  getPairingInfo() {
    return this.getItem(STORAGE_KEYS.DEVICE_PAIRING) || {
      paired: false,
      pairingCode: null,
      accountEmail: null,
      driveFolder: '/JwellersEdith_Sync/',
      pairedAt: null
    };
  },

  savePairingInfo(info) {
    this.setItem(STORAGE_KEYS.DEVICE_PAIRING, {
      ...info,
      paired: true,
      pairedAt: new Date().toISOString()
    });
  },

  getCustomers() {
    return this.getItem(STORAGE_KEYS.CUSTOMERS) || [];
  },

  saveCustomers(list) {
    this.setItem(STORAGE_KEYS.CUSTOMERS, list);
  },

  getKhataDues() {
    return this.getItem(STORAGE_KEYS.KHATA_DUES) || [];
  },

  saveKhataDues(list) {
    this.setItem(STORAGE_KEYS.KHATA_DUES, list);
  },

  getGirviLoans() {
    return this.getItem(STORAGE_KEYS.GIRVI_LOANS) || [];
  },

  saveGirviLoans(list) {
    this.setItem(STORAGE_KEYS.GIRVI_LOANS, list);
  },

  getMetalRates() {
    return this.getItem(STORAGE_KEYS.RATES) || {
      gold24k: 73500,
      gold22k: 67400,
      silver1kg: 86500,
      updatedAt: new Date().toISOString().split('T')[0]
    };
  },

  saveMetalRates(rates) {
    this.setItem(STORAGE_KEYS.RATES, rates);
  },

  queueMutation(mutation) {
    const queue = this.getItem(STORAGE_KEYS.OUTBOX_QUEUE) || [];
    queue.push({
      ...mutation,
      queued_at: new Date().toISOString()
    });
    this.setItem(STORAGE_KEYS.OUTBOX_QUEUE, queue);
  },

  getOutbox() {
    return this.getItem(STORAGE_KEYS.OUTBOX_QUEUE) || [];
  },

  clearOutbox() {
    this.setItem(STORAGE_KEYS.OUTBOX_QUEUE, []);
  }
};

if (typeof module !== 'undefined') {
  module.exports = { MobileStorage, STORAGE_KEYS };
}
