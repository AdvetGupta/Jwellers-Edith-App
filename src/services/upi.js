// Dynamic Bharat UPI Payment String & QR URL Generator
const UpiService = {
  generateUpiUri(upiId, payeeName, amount, note = '') {
    if (!upiId) return '';
    const cleanId = encodeURIComponent(upiId.trim());
    const cleanName = encodeURIComponent((payeeName || 'Jwellers Edith').trim());
    const amtStr = parseFloat(amount || 0).toFixed(2);
    const cleanNote = encodeURIComponent((note || 'Jewellery Payment').trim());

    // Standard NPCI Bharat UPI deep-link format
    return `upi://pay?pa=${cleanId}&pn=${cleanName}&am=${amtStr}&cu=INR&tn=${cleanNote}`;
  },

  generateQrImageUrl(upiUri, size = 260) {
    if (!upiUri) return '';
    // High-performance QR SVG/PNG endpoint for on-screen customer scanning
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(upiUri)}`;
  }
};

if (typeof module !== 'undefined') {
  module.exports = { UpiService };
}
