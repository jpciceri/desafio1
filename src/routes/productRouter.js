import { Router } from "express";
import ProductManager from "../../ProductManager.js"

export const productManagerServer = new ProductManager();

const main = async () => {
    await productManagerServer.addProduct({
        title: "producto prueba1",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123a",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba2",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123ab",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba3",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abc",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba4",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcd",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba5",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcde",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba6",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcdef",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba7",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcdefg",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba8",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcdefgh",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba9",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcdefghi",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "producto prueba10",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcdefghij",
        stock: "25",
    });
};

main();

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    const productsParsed = await productManagerServer.getProducts();
    const limit = req.query.limit || 10;
    const productsLimit = productsParsed.slice(0, limit);

    return res.status(200).json(productsLimit);
});

productsRouter.get("/:pid", async (req, res) => {
    const productId = +req.params.pid;
    const productToFind = await productManagerServer.getProductById(productId);
    if (!productToFind)
        return res.status(404).json({
            message: "No existe ese producto"
        });

    return res.status(200).json(productToFind);
});

productsRouter.post("/create", async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productManagerServer.addProduct(product);
        return res.status(200).json({
            message: "Producto creado con éxito",
            data: newProduct
        });
    } catch (error) {
        // Si no hay un json creado debería crearlo con el producto
        return res.status(400).json({
            message: "Fallo en la creación del producto"
        });
    }
});

productsRouter.put("/update/:pid", async (req, res) => {
    const productId = +req.params.pid;
    const productToUpdate = req.body;

    try {
        const updateProduct = await productManagerServer.updateProduct(productId, productToUpdate);
        return res.status(200).json({
            message: "Producto actualizado con éxito",
            data: updateProduct
        });
    } catch (error) {
        return res.status(400).json({
            message: "Fallo en la actualización del producto"
        });
    }

});

productsRouter.delete("/delete/:pid", async (req, res) => {
    const productId = +req.params.pid;

    try {
        const productToDelete = await productManagerServer.deleteProduct(productId);
        return res.status(200).json({
            message: "Producto borrado con éxito",
            data: productToDelete
        });
    } catch (error) {
        return res.status(400).json({
            message: "Fallo en el borrado del producto"
        });
    }
});

export default productsRouter;

// const productsRouter = Router();
// const PM = new ProductManager();

// productsRouter.get("/", (req, res) => {
//     const products = PM.getProducts();
//     let {limit} = req.query;

//     res.send({products:limit ? products.slice(0, limit) : products});
// });

// productsRouter.get("/:pid", (req, res) => {
//     const products = PM.getProducts();
//     let pid = Number(req.params.pid);

//     res.send({product:products.find(item => item.id === pid) || "Error! El ID de Producto no existe!"});
// });

// productsRouter.post("/", (req, res) => {
//     let {title, description, code, price, status, stock, category, thumbnails} = req.body;

//     if (!title) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
//         return false;
//     }

//     if (!description) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
//         return false;
//     }

//     if (!code) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
//         return false;
//     }

//     if (!price) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
//         return false;
//     }

//     status = !status && true;

//     if (!stock) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
//         return false;
//     }

//     if (!category) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
//         return false;
//     }

//     if (!thumbnails) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
//         return false;
//     } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
//         res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
//         return false;
//     }

//     if (PM.addProduct({title, description, code, price, status, stock, category, thumbnails})) {
//         res.send({status:"ok", message:"El Producto se agregó correctamente!"});
//     } else {
//         res.status(500).send({status:"error", message:"Error! No se pudo agregar el Producto!"});
//     }
// });

// productsRouter.put("/:pid", (req, res) => {
//     let pid = Number(req.params.pid);
//     let {title, description, code, price, status, stock, category, thumbnails} = req.body;

//     if (!title) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
//         return false;
//     }

//     if (!description) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
//         return false;
//     }

//     if (!code) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
//         return false;
//     }

//     if (!price) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
//         return false;
//     }

//     status = !status && true;

//     if (!stock) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
//         return false;
//     }

//     if (!category) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
//         return false;
//     }

//     if (!thumbnails) {
//         res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
//         return false;
//     } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
//         res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
//         return false;
//     }

//     if (PM.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnails})) {
//         res.send({status:"ok", message:"El Producto se actualizó correctamente!"});
//     } else {
//         res.status(500).send({status:"error", message:"Error! No se pudo actualizar el Producto!"});
//     }
// });

// productsRouter.delete("/:pid", (req, res) => {
//     let pid = Number(req.params.pid);

//     if (PM.deleteProduct(pid)) {
//         res.send({status:"ok", message:"El Producto se eliminó correctamente!"});
//     } else {
//         res.status(500).send({status:"error", message:"Error! No se pudo eliminar el Producto!"});
//     }
// });

// export default productsRouter;