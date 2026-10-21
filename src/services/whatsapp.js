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

  formatKhataReminder(customerName, duesAmount, shopName = 'Jewellers', upiId = '', contactPhone = '') {
    const name = customerName ? customerName.trim() : 'Customer';
    const sName = (shopName && shopName.trim()) ? shopName.trim() : 'Jewellers';
    const amountStr = Number(duesAmount || 0).toLocaleString('en-IN');
    const contactLine = contactPhone ? `\n📞 *संपर्क / Contact:* ${contactPhone}` : '';
    const upiLine = upiId ? `\n💳 *UPI भुगतान / Payment ID:* \`${upiId.trim()}\`` : '';
    
    let msg = `नमस्ते *${name} जी* 🙏\nNamaste *${name} ji* 🙏\n\n`;
    msg += `यह *${sName}* से आपके खाता शेष (बकाया) के संबंध में एक विनम्र सूचना है।\nThis is a polite reminder regarding your pending Khata balance at *${sName}*.\n\n`;
    msg += `💰 *कुल बकाया राशि / Pending Balance:* *₹${amountStr}*${upiLine}\n\n`;
    msg += `कृपया अपनी सुविधानुसार बकाया राशि का भुगतान करें। यदि आप पहले ही भुगतान कर चुके हैं, तो कृपया इसे अनदेखा करें।\nKindly clear your dues at your earliest convenience. If you have already paid, please ignore this message.${contactLine}\n\n`;
    msg += `धन्यवाद / Thank you!\n*🏢 ${sName}*`;
    
    return msg;
  },

  formatGirviNotice(customerName, loanNumber, totalDues, shopName = 'Jewellers', upiId = '', contactPhone = '') {
    const name = customerName ? customerName.trim() : 'Customer';
    const sName = (shopName && shopName.trim()) ? shopName.trim() : 'Jewellers';
    const amountStr = Number(totalDues || 0).toLocaleString('en-IN');
    const contactLine = contactPhone ? `\n📞 *संपर्क / Contact:* ${contactPhone}` : '';
    const upiLine = upiId ? `\n💳 *UPI भुगतान / Payment ID:* \`${upiId.trim()}\`` : '';

    let msg = `नमस्ते *${name} जी* 🙏\nNamaste *${name} ji* 🙏\n\n`;
    msg += `यह *${sName}* में आपकी गिरवी रसीद *#${loanNumber}* के संबंध में सूचना है।\nThis is a statement regarding your Girvi Pledge ticket *#${loanNumber}* at *${sName}*.\n\n`;
    msg += `💰 *कुल देय राशि / Total Outstanding:* *₹${amountStr}*${upiLine}\n\n`;
    msg += `ब्याज जमा करने अथवा गिरवी छुड़ाने हेतु कृपया दुकान पर पधारें या संपर्क करें।\nKindly visit or contact the shop for interest clearance or redemption.${contactLine}\n\n`;
    msg += `धन्यवाद / Thank you!\n*🏢 ${sName}*`;

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
