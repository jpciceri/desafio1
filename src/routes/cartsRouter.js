import { Router } from "express";
import CartManager from "../../CartManager.js";

const cartManagerServer = new CartManager();

const cartsRouter = Router();

cartsRouter.post("/create", async (req, res) => {
    try {
        const newCart = await cartManagerServer.createCart();
        return res.status(200).json({
            message: "Carrito creado con éxito",
            data: newCart
        })
    } catch (error) {
        return res.status(400).json({
            message: "Carrito no creado"
        })
    }
})

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = +req.params.cid;
        const productsToShow = await cartManagerServer.getProductsInCart(cartId)
        return res.status(200).json({
            message: "Productos",
            data: productsToShow
        })
    } catch (error) {
        return res.status(400).json({
            message: `Carrito ${cartId} no encontrado`
        });
    }
})

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cartId = +req.params.cid
        const productId = +req.params.pid;
        const productToAdd = await cartManagerServer.addProductToCart(cartId, productId);
        return res.status(200).json({
            message: "Producto agregado con éxito al carrito",
            data: productToAdd
        })
    } catch (error) {
        return res.status(400).json({
            message: "El producto no ha sido agregado"
        });
    }
})

export default cartsRouter;


// const cartsRouter = Router();
// const CM = new CartManager();

// cartsRouter.post("/", (req, res) => {
//     if (CM.newCart()) {
//         res.send({status:"ok", message:"El Carrito se creó correctamente!"});
//     } else {
//         res.status(500).send({status:"error", message:"Error! No se pudo crear el Carrito!"});
//     }
// });

// cartsRouter.get("/:cid", (req, res) => {
//     const cid = Number(req.params.cid);
//     const cart = CM.getCart(cid);

//     if (cart) {
//         res.send({products:cart.products});
//     } else {
//         res.status(400).send({status:"error", message:"Error! No se encuentra el ID de Carrito!"});
//     }
// });

// cartsRouter.post("/:cid/products/:pid", (req, res) => {
//     const cid = Number(req.params.cid);
//     const pid = Number(req.params.pid);
//     const cart = CM.getCart(cid);

//     if (cart) {
//         if (CM.addProductToCart(cid, pid)) {
//             res.send({status:"ok", message:"El producto se agregó correctamente!"});
//         } else {
//             res.status(400).send({status:"error", message:"Error! No se pudo agregar el Producto al Carrito!"});
//         }
//     } else {
//         res.status(400).send({status:"error", message:"Error! No se encuentra el ID de Carrito!"});
//     }
// });

// export default cartsRouter;