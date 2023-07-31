import {
    promises
} from "fs";

class ProductManager {
    products;
    path;
    id = 1;

    constructor() {
        this.products = [];
        this.path = "./products.json";
    }

    async loadData() {
        // Load JSON information
        this.products = await this.getProducts();
    }

    async addProduct(product) {
        const valuesOfProduct = Object.values(product);
        // console.log("valuesOfProduct", valuesOfProduct)

        valuesOfProduct.map((value) => {
            if (value.trim().length === 0) {
                throw new Error("Debes completar todos los campos");
            }
            return value;
        });

        const productCode = this.products.find(
            (oneProduct) => oneProduct.code === product.code
        );

        if (productCode) {
            throw new Error("Ya existe ese code");
        }

        this.products.push({
            ...product,
            id: this.id,
        });

        this.id = this.id + 1;

        await promises.writeFile(this.path, JSON.stringify(this.products));
        return "producto creado con exito";
    }

    async getProducts() {
        try {
            const products = await promises.readFile(this.path, {
                encoding: "utf-8",
            });
            return JSON.parse(products);
        } catch (error) {
            console.log(`El archivo ${this.path} no existe, creando...`);
            await promises.writeFile(this.path, "[]");
            return [];
        }
    }

    async getProductById(productId) {
        try {
            const products = await promises.readFile(this.path, {
                encoding: "utf-8",
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
            const valuesOfProduct = Object.values(product);

            valuesOfProduct.map((value) => {
                if (value.trim().length === 0) {
                    throw new Error("Debes completar todos los campos");
                }
                return value;
            });

            if (productToUpdate) {
                const filterProducts = this.products.filter(
                    (product) => product.id !== productToUpdate.id
                );
                
                this.products = [
                    ...filterProducts,
                    Object.assign(productToUpdate, product),
                ];
                await promises.writeFile(this.path, JSON.stringify(this.products));
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
            await promises.writeFile(this.path, JSON.stringify(productsDeleted));
        } catch (error) {
            throw new Error("No se pudo borrar el producto");
        }
    }
}


export default ProductManager;

// import fs from "fs";

// class ProductManager {
//     constructor() {
//         this.products = [];
//         this.path = "Products.json";
//         this.createFile();
//     }

//     createFile() {
//         if (!fs.existsSync(this.path)) {
//             fs.writeFileSync(this.path, JSON.stringify(this.products));
//         }
//     }

//     addProduct(product) {
//         if (this.validateCode(product.code)) {
//             console.log("Error! Code exists!");

//             return false;
//         } else {
//             const producto = {id:this.generateId(), title:product.title, description:product.description, code:product.code, price:product.price, status:product.status, stock:product.stock, category:product.category, thumbnails:product.thumbnails};
//             this.products = this.getProducts();
//             this.products.push(producto);
//             this.saveProducts();
//             console.log("Product added!");

//             return true;
//         }
//     }

//     updateProduct(id, product) {
//         this.products = this.getProducts();
//         let pos = this.products.findIndex(item => item.id === id);

//         if (pos > -1) {
//             this.products[pos].title = product.title;
//             this.products[pos].description = product.description;
//             this.products[pos].code = product.code;
//             this.products[pos].price = product.price;
//             this.products[pos].status = product.status;
//             this.products[pos].stock = product.stock;
//             this.products[pos].category = product.category;
//             this.products[pos].thumbnails = product.thumbnails;
//             this.saveProducts();
//             console.log("Product updated!");

//             return true;
//         } else {
//             console.log("Not found!");

//             return false;
//         }
//     }

//     deleteProduct(id) {
//         this.products = this.getProducts();
//         let pos = this.products.findIndex(item => item.id === id);

//         if (pos > -1) {
//             this.products.splice(pos, 1); (0,1)
//             this.saveProducts();
//             console.log("Product #" + id + " deleted!");

//             return true;
//         } else {
//             console.log("Not found!");

//             return false;
//         }
//     }

//     getProducts() {
//         let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

//         return products;
//     }

//     getProductById(id) {
//         this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

//         return this.products.find(item => item.id === id) || "Not found";
//     }

//     validateCode(code) {
//         return this.products.some(item => item.code === code);
//     }

//     generateId() {
//         let max = 0;
//         let products = this.getProducts();

//         products.forEach(item => {
//             if (item.id > max) {
//                 max = item.id;
//             }
//         });

//         return max+1;

//     }

//     saveProducts() {
//         fs.writeFileSync(this.path, JSON.stringify(this.products));
//     }
// }


// export default ProductManager;