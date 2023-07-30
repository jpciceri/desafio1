import express from "express";
import productRouter from "./src/routes/productRouter.js";
import cartsRouter from "./src/routes/cartsRouter.js";

const app = express();
const puerto = 8080;

app.use(express.json());
app.use("/api/products/", productRouter);
app.use("/api/carts/", cartsRouter);

app.listen(puerto, () => {
    console.log("Servidor activo en el puerto: " + puerto);
});
