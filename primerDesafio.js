class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const verifyProduct = this.products.some((product) => product.code === code);

        if (!verifyProduct) {
            const producto = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: this.getId()
            }
            this.products.push(producto)
        }
    }
    getId() {
        let max = 0;

        this.products.forEach((producto) => {
            max = producto.id > max ? producto.id : max
        });

        return max + 1
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id)

        if (product) {
            return product;
        } else {
            console.log("Not found")
        }
    }
}

const newProduct = new ProductManager()
newProduct.addProduct("TV Samsung 75", "SMART TV SAMSUNG 75pulg CRYSTAL UHD 4K", 450000,"https://www.naldo.com.ar/medias/505102.1.jpg-515Wx515H?context=bWFzdGVyfHJvb3R8MzA0ODl8aW1hZ2UvanBlZ3xoODYvaDA4Lzk2Njc2NTg0ODE2OTQuanBnfDM0ZmE5ZWE2YmNjMjAzNThkYTI2OThlNzYwNDNlYWFkMmRiMjM0NjIwMTU2Y2RkZTFmZGI2OWZiNzMxNTA5YjY", "TVSAMSUNG75", 20)
newProduct.addProduct("TV Samsung 85", "SMART TV SAMSUNG 85” 8K NEOQLED", 2399999,"https://www.naldo.com.ar/medias/QN800B-01-NUEVO.jpg-515Wx515H?context=bWFzdGVyfHJvb3R8MzYyODR8aW1hZ2UvanBlZ3xoNTcvaGRmLzk3MDEyMzcwMzA5NDIuanBnfDg4MmVhYWVkYzRkOWZhMTVlMDYwZDU5MGNjMWY1ZGU2NTI3MjlkNmQ1OWQwNmQzMGE0YWIzNTM2NTBkMGNhMDI", "TVSAMSUNG85", 10)
newProduct.addProduct("TV LG 50", "SMART TV LG 50” 4K UHD THINQ AI", 169999,"https://www.naldo.com.ar/medias/Method-505299-1-515Wx515H?context=bWFzdGVyfGltYWdlc3w4NTY0MXxpbWFnZS9qcGVnfGltYWdlcy9oMGYvaDg5Lzk3MDQ1NTQyMzM4ODYuanBnfGM4MzEyZjI2MTg3MGUxYzUyMTc2YTBjNTI2MTY0YTZhYTFiZGRmZDEzNDVjMjY3ZTk3NzEzNjgwZDdkYjNlZWM", "TVLG50", 40)
newProduct.addProduct("TV PHILIPS 55", "SMART TV PHILIPS 55 4K HDR ANDROID", 198000,"https://www.naldo.com.ar/medias/504799.jpg-515Wx515H?context=bWFzdGVyfHJvb3R8ODg0MDh8aW1hZ2UvanBlZ3xoMDkvaGJjLzk3MTUwODE5Njk2OTQuanBnfDYyZWM3NTE2MzI4MTI0YzliMzkwYzgxOWI5MDcyYzczNmU5YTQ3YWUxNDAwMTRmNTNkZjc2NzI2NWJiZTNjNjU", "TVPHILIPS55", 30)
newProduct.addProduct("TV TCL 55", "SMART TV TCL 55” 4K GOOGLE TV", 179999,"https://www.naldo.com.ar/medias/Method-505163-1-515Wx515H?context=bWFzdGVyfGltYWdlc3wxNzY4NTN8aW1hZ2UvanBlZ3xpbWFnZXMvaGU5L2g3Mi85NjgxOTAyMjcyNTQyLmpwZ3wxZmE5MjhjZWVjNmVmY2M5NjQ5MjI2YmE4Zjc1ZjM0OGI3MDU1ZDJhMDRmMDJjZWQ1YjU3YTYxOTg4MzI5NTM3", "TVTCL55", 50)

console.log(newProduct.getProducts())
console.log(newProduct.getProductById(1))