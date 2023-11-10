function generatePDF(products, user, shipping_price) {
  let doc = new jsPDF();

  let ejeX = 20;
  let ejeY = 30;

  doc.text(ejeX , 10, "Factura");

  let content = "";
  let total = 0;
  for (const product of products) {
    content = `${product.name} - ${product.quantity} - ${product.currency} ${
      product.cost * product.quantity
    }`;
    doc.text(ejeX, ejeY, content);
    ejeY += 10;

    if (product.currency == "UYU") {
      total += (product.cost / 40) * product.quantity;
    } else {
      total += product.cost * product.quantity;
    }
  }

  ejeY += 10;
  let userInfo = `
  Comprado por: ${user.nombre} ${user.apellido}
  
  Departamento: ${user.address.departamento}
  Direccion de envio:
      Calle: ${user.address.calle} 
      Esquina: ${user.address.numero} 
      Numero: ${user.address.esquina}

  Subtotal: USD ${Math.round(total)}
  Envio: ${shipping_price}
  `;

  doc.text(ejeX, ejeY, userInfo);

  // Abre el PDF en una nueva ventana
  window.open(doc.output("bloburl"));
}
