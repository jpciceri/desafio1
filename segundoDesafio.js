const fs = require("fs").promises;

class ProductManager {

    products;
    id = 1;

    constructor() {
        this.products = [];
        this.path = "./products.json";
    }

    async loadData() {
        this.products = await this.getProduct();
    }
    async addProduct(product) {
        const productValues = Object.values(product)
        console.log("productValues", productValues)

        productValues.map((value) => {
            if (String(value).trim().length === 0) {
                throw new Error("Completa todos los campos para continuar")
            }
            return value
        })

        const productCode = this.products.find(
            (oneProduct) => oneProduct.code === product.code
        )

        if (productCode) {
            throw new Error("El Code ya existe")
        }

        this.products.push({
            ...product,
            id: this.id
        })
        this.id = this.id + 1;

        await fs.writeFile(this.path, JSON.stringify(this.products))
        return "Su producto se creó con exito"
    }

    async getProduct() {
        try {
            const products = await fs.readFile(this.path, {
                encoding: "utf-8"
            });
            return JSON.parse(products);
        } catch (error) {
            console.log(`El archivo ${this.path} no existe, creando...`);
            await fs.writeFile(this.path, "[]");
            return [];
        }
    }

    async getProductById(productId) {
        try {
            const products = await fs.readFile(this.path, {
                encoding: "utf-8"
            });
            const productParsed = JSON.parse(products);

            const productToFind = productParsed.find(
                (product) => product.id === productId
            );
            return productToFind;
        } catch (error) {
            console.log(error);
            throw new Error("No se encontro un producto con ese ID");
        }
    }

    async updateProduct(id, product) {
        const productToUpdate = await this.getProductById(id);
        try {
            if (productToUpdate) {
                const filterProducts = this.products.filter((product) => product.id !== productToUpdate.id);
                this.products.push([...filterProducts, Object.assign(productToUpdate, product)]);
                await fs.writeFile(this.path, JSON.stringify(this.products));
                return productToUpdate;
            }
        } catch (error) {
            throw new Error("No se puedo actualizar el producto");
        }
    }

    async deleteProduct(id) {
        const productToDelete = await this.getProductById(id);
        try {
            const productsDeleted = this.products.filter(
                (product) => product.id !== productToDelete.id
            );
            await fs.writeFile(this.path, JSON.stringify(productsDeleted));
        } catch (error) {
            throw new Error("No se pudo borrar el producto");
        }
    }
}


const main = async () => {
const newProduct = new ProductManager()

await newProduct.loadData()


await newProduct.addProduct({
    title:"TV Samsung 75",
    description:"SMART TV SAMSUNG 75pulg CRYSTAL UHD 4K",
    price: 450000,
    thumbnail:"https://www.naldo.com.ar/medias/505102.1.jpg-515Wx515H?context=bWFzdGVyfHJvb3R8MzA0ODl8aW1hZ2UvanBlZ3xoODYvaDA4Lzk2Njc2NTg0ODE2OTQuanBnfDM0ZmE5ZWE2YmNjMjAzNThkYTI2OThlNzYwNDNlYWFkMmRiMjM0NjIwMTU2Y2RkZTFmZGI2OWZiNzMxNTA5YjY",
    code: "TVSAMSUNG75",
    stock: 20,})
await newProduct.addProduct({
    title:"TV Samsung 85",
    description: "SMART TV SAMSUNG 85” 8K NEOQLED",
    price: 2399999,
    thumbnail: "https://www.naldo.com.ar/medias/QN800B-01-NUEVO.jpg-515Wx515H?context=bWFzdGVyfHJvb3R8MzYyODR8aW1hZ2UvanBlZ3xoNTcvaGRmLzk3MDEyMzcwMzA5NDIuanBnfDg4MmVhYWVkYzRkOWZhMTVlMDYwZDU5MGNjMWY1ZGU2NTI3MjlkNmQ1OWQwNmQzMGE0YWIzNTM2NTBkMGNhMDI",
    code:"TVSAMSUNG85",
    stock: 10,})
await newProduct.addProduct({
    title:"TV LG 50", 
    description: "SMART TV LG 50” 4K UHD THINQ AI",
    price: 169999, 
    thumbnail:"https://www.naldo.com.ar/medias/Method-505299-1-515Wx515H?context=bWFzdGVyfGltYWdlc3w4NTY0MXxpbWFnZS9qcGVnfGltYWdlcy9oMGYvaDg5Lzk3MDQ1NTQyMzM4ODYuanBnfGM4MzEyZjI2MTg3MGUxYzUyMTc2YTBjNTI2MTY0YTZhYTFiZGRmZDEzNDVjMjY3ZTk3NzEzNjgwZDdkYjNlZWM",
    code: "TVLG50",
    stock: 40,})
await newProduct.addProduct({
    title:"TV PHILIPS 55",
    description: "SMART TV PHILIPS 55 4K HDR ANDROID",
    price: 198000,
    thumbnail: "https://www.naldo.com.ar/medias/504799.jpg-515Wx515H?context=bWFzdGVyfHJvb3R8ODg0MDh8aW1hZ2UvanBlZ3xoMDkvaGJjLzk3MTUwODE5Njk2OTQuanBnfDYyZWM3NTE2MzI4MTI0YzliMzkwYzgxOWI5MDcyYzczNmU5YTQ3YWUxNDAwMTRmNTNkZjc2NzI2NWJiZTNjNjU",
    code:"TVPHILIPS55", 
    price:30,})
await newProduct.addProduct({
    title:"TV TCL 55",
    description: "SMART TV TCL 55” 4K GOOGLE TV",
    price: 179999,
    thumbnail: "https://www.naldo.com.ar/medias/Method-505163-1-515Wx515H?context=bWFzdGVyfGltYWdlc3wxNzY4NTN8aW1hZ2UvanBlZ3xpbWFnZXMvaGU5L2g3Mi85NjgxOTAyMjcyNTQyLmpwZ3wxZmE5MjhjZWVjNmVmY2M5NjQ5MjI2YmE4Zjc1ZjM0OGI3MDU1ZDJhMDRmMDJjZWQ1YjU3YTYxOTg4MzI5NTM3", 
    code:"TVTCL55",
    price: 50,})


    const products = await newProduct.getProduct()
    console.log(products)

}

main();
