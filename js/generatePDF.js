function generatePDF(products) {
  let doc = new jsPDF();

  let ejeX = 20;
  let ejeY = 20;

  doc.text(20, 10, "Factura");

  let content = "";
  for (const product of products) {
    content = `${product.name} - ${product.quantity} - ${product.currency} ${product.cost}`;
    doc.text(20, ejeY, content);
    ejeY += 10;
  }

  // Abre el PDF en una nueva ventana
  window.open(doc.output("bloburl"));
}
