import { promises } from "fs";
// import ProductManager from "./ProductManager.js";
import { productManagerServer } from "./src/routes/productRouter.js";

class CartManager {
    //   products;
    carts;
    path;
    id = 1;

    constructor() {
        this.carts = [];
        // this.products = [];
        this.path = "Carrito.json";
    }

    async createCart() {
        try {
            const cartToCreate = {
                id: this.id,
                products: [],
            };

            this.carts.push(cartToCreate);

            this.id = this.id + 1;

            const newCart = await promises.writeFile(
                this.path,
                JSON.stringify(this.carts)
            );

            return newCart;
        } catch (error) {
            throw new Error("No se pudo crear el carrito");
        }
    }

    async getProductsInCart(cartId) {
        try {
            const carts = await promises.readFile(this.path, {
                encoding: "utf-8",
            });
            const cartsParsed = JSON.parse(carts);

            const cartToFind = cartsParsed.find((cart) => cart.id === cartId);

            const productsToShow = cartToFind.products;

            return productsToShow;
        } catch (error) {
            console.log(error);
            throw new Error("No se encontro un carrito con ese ID");
        }
    }

    async addProductToCart(cartId, productId) {
        const cartsFile = await promises.readFile(this.path, {
            encoding: "utf-8",
        });

        const cartParsed = JSON.parse(cartsFile);

        try {
            const cart = cartParsed.find((cart) => cart.id === cartId);

            if (!cart) {
                throw new Error("No existe ese carrito");
            }

            const validProduct = await productManagerServer.getProductById(productId);

            if (!validProduct) {
                throw new Error("El producto con ese Id no existe");
            }

            const productIndex = cart.products.findIndex(
                (product) => product.id === productId
            );

            productIndex != -1 ?
                (cart.products[productIndex].quantity += 1) :
                cart.products.push({
                    id: productId,
                    quantity: 1
                });

            const cartIndex = this.carts.findIndex(
                (cart) => cart.id === cartId
            );
            Object.assign(this.carts.at(cartIndex), {
                id: cartId,
                products: [...cart.products],
            });

            return await promises.writeFile(
                this.path,
                JSON.stringify(this.carts),
                "utf-8"
            );

        } catch (error) {
            throw new Error("No se pudo agregar el producto al carrito");
        }
    }
}

export default CartManager;

// import fs from "fs";

// class CartManager {
//     constructor() {
//         this.carts = [];
//         this.path = "Carrito.json";
//         this.createFile();
//     }

//     createFile() {
//         if (!fs.existsSync(this.path)) {
//             fs.writeFileSync(this.path, JSON.stringify(this.carts));
//         }
//     }

//     newCart() {
//         this.carts.push({id:this.generateId(), products:[]});
//         this.saveCart();
//         console.log("Cart created!");

//         return true;
//     }

//     getCart(id) {
//         this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

//         return this.carts.find(item => item.id === id);
//     }

//     getCarts() {
//         let carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

//         return carts;
//     }

//     generateId() {
//         let max = 0;
//         let carts = this.getCarts();

//         carts.forEach(item => {
//             if (item.id > max) {
//                 max = item.id;
//             }
//         });

//         return max+1;
//     }

//     saveCart() {
//         fs.writeFileSync(this.path, JSON.stringify(this.carts));
//     }

//     addProductToCart(cid, pid) {
//         this.carts = this.getCarts();
//         const cart = this.carts.find(item => item.id === cid);
//         let product = cart.products.find(item => item.product === pid);

//         if (product) {
//             product.quantity+= 1;
//         } else {
//             cart.products.push({product:pid, quantity:1});
//         }

//         this.saveCart();
//         console.log("Product added!");

//         return true;
//     }    
// }

// export default CartManager;