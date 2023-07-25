import express from "express";
import ProductManager from "./ProductManager.js"

const puerto = 8080
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
const productManagerServer = new ProductManager();

const main = async () => {
    await productManagerServer.addProduct({
        title: "TV smart prueba1",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123atyyjyt",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba2",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abqq",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba3",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123aertwc",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba4",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcuut",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba5",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abklle",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba6",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123akkdef",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba7",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abcghhj",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba8",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123abfhgfhf",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba9",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123adsaasgfg",
        stock: "25",
    });
    await productManagerServer.addProduct({
        title: "TV smart prueba10",
        description: "Este es un producto prueba",
        price: "200",
        thumbnail: "Sin imagen",
        code: "123eeefafss",
        stock: "25",
    });
}

main()


app.get("/products", async (req, res) => {
    let productsParsed = await productManagerServer.getProduct()
    let limit = req.query.limit || 10;
    const productsLimit = productsParsed.slice(0, limit);

    return res.status(200).json(productsLimit)
});

app.get("/products/:pid", async (req, res) => {
    const productId = +req.params.pid;
    const productToFind = await productManagerServer.getProductById(productId);
    if (!productToFind) return res.status(404).json({
        message: "No existe ese producto"
    })

    return res.status(200).json(productToFind)
});

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto :${puerto}`);
});

