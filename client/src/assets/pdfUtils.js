import jsPDF from 'jspdf';

export const generateInvoicePdf = (invoice) => {
  if (!invoice) {
    console.error('No invoice data provided.');
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Invoice #${invoice.invoiceNumber}`, 20, 20);

  doc.setFontSize(12);
  doc.text(`Customer: ${invoice.customer?.name || 'N/A'}`, 20, 35);
  doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 20, 45);
  doc.text(`Total: ₹${invoice.total?.toFixed(2) || '0.00'}`, 20, 55);

  if (invoice.items && invoice.items.length > 0) {
    doc.text('Items:', 20, 70);
    let y = 80;
    invoice.items.forEach((item, index) => {
      const name = item.product?.name || 'Item';
      const qty = item.quantity || 0;
      const price = item.total?.toFixed(2) || '0.00';
      doc.text(`${index + 1}. ${name} x${qty} - ₹${price}`, 25, y);
      y += 10;
    });
  }

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank');
};
