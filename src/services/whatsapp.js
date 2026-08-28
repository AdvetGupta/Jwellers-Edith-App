// Mobile WhatsApp Reminder & Share Service
const WhatsAppService = {
  cleanPhoneNumber(phone) {
    if (!phone) return '';
    let digits = String(phone).replace(/\D/g, '');
    if (digits.length === 10) {
      return `91${digits}`;
    }
    if (digits.length === 11 && digits.startsWith('0')) {
      return `91${digits.slice(1)}`;
    }
    if (digits.length === 12 && digits.startsWith('91')) {
      return digits;
    }
    return digits;
  },

  formatKhataReminder(customerName, duesAmount, shopName = 'Jwellers Edith', upiId = '') {
    const name = customerName ? customerName.trim() : 'Customer';
    const amountStr = Number(duesAmount || 0).toLocaleString('en-IN');
    
    let msg = `Namaste *${name} ji* 🙏\n\n`;
    msg += `This is a polite reminder regarding your outstanding Khata balance at *${shopName}*.\n\n`;
    msg += `• *Pending Balance Dues:* ₹${amountStr}\n`;
    
    if (upiId && upiId.trim().length > 0) {
      msg += `• *Shop UPI ID for Payment:* \`${upiId.trim()}\`\n`;
    }
    
    msg += `\nKindly clear your dues at your earliest convenience. If you have already paid, please ignore this message.\n\n`;
    msg += `Thank you!\n- *${shopName}*`;
    
    return msg;
  },

  formatGirviNotice(customerName, loanNumber, totalDues, shopName = 'Jwellers Edith') {
    const name = customerName ? customerName.trim() : 'Customer';
    const amountStr = Number(totalDues || 0).toLocaleString('en-IN');

    let msg = `Namaste *${name} ji* 🙏\n\n`;
    msg += `This is a statement regarding your Girvi Pledge ticket *#${loanNumber}* at *${shopName}*.\n\n`;
    msg += `• *Total Outstanding Balance:* ₹${amountStr}\n`;
    msg += `\nPlease feel free to contact us or visit the shop for interest payment or redemption.\n\n`;
    msg += `Thank you!\n- *${shopName}*`;

    return msg;
  },

  getWhatsAppLink(phone, messageText) {
    const cleanPhone = this.cleanPhoneNumber(phone);
    const encodedText = encodeURIComponent(messageText);
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  }
};

if (typeof module !== 'undefined') {
  module.exports = { WhatsAppService };
}
