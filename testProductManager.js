const {ProductManager} = require("./ProductManager.js");

const PM = new ProductManager();
PM.addProduct({title:"TV SAMSUNG", description:"3 cuotas sin interes de $ 42.900ARS", price:36990, thumbnail:"", code:"TV SAMSUNG", stock:19});
console.log(PM.getProducts());
PM.addProduct({title:"TV LG", description:"3 cuotas sin interes de $40.900ARS", price:37990, thumbnail:"", code:"TV LG", stock:12});
PM.addProduct({title:"TV PHILIPS", description:"3 cuotas sin interes de $35.000ARS", price:38990, thumbnail:"", code:"TV PHILIPS", stock:18});
PM.deleteProduct(1);
PM.updateProduct(2, {title:"TV SONY", description:"3 cuotas sin interes de $41.900ARS", price:58990, thumbnail:"", code:"TV SONY", stock:28})
console.log(PM.getProducts());