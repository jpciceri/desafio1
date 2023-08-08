import { Router } from "express";
import ProductManager from "../managers/productmanager.js";
import  __dirname  from "../utils.js";

const productsRouter = Router();
const manager = new ProductManager(__dirname+"/files/products.json");

//Obtiene la lista de productos
productsRouter.get("/products", async (request, response)=>{
    const {limit}=request.query
    const product = await manager.getProducts()
    if(limit){
        const limitProds = product.slice(0, limit)
        response.json({status:"Success", limitProds})
    } else{
        response.json({status:"Success", product})
    }
});

//Obtiene el producto por su id
productsRouter.get("/products/:pid", async (request, response)=>{
    const products = await manager.getProductsById(request.params);
    response.json({status:"success", products});
});

//Agrega un nuevo producto
productsRouter.post("/products", async (request,response)=>{
    const newProduct = await manager.addProduct(request.body);
    response.json({status:"success", newProduct})
});

//Actualiza el producto
productsRouter.put("/products/:pid", async (request,response)=>{
    const UP = await manager.updateProduct(request.params, request.body);
    response.json({status:"success", UP});
});

//Borra el producto por su ID
productsRouter.delete("/products/:pid", async (request, response) => {
    const id = parseInt(request.params.pid);
    const eliminarP = await manager.deleteProduct(id);
    response.json({status:"success", eliminarP});
});

export default productsRouter;