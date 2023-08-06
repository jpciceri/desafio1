import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import productRouter from "./src/routes/productRouter.js";
import cartsRouter from "./src/routes/cartsRouter.js";
import {
    Server
} from "socket.io";

const app = express();
const puerto = 8080;

const httpServer = app.listen(puerto, () => {
    console.log("Servidor activo en el puerto: " + puerto);
});

const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/api/products/", productRouter);
app.use("/api/carts/", cartsRouter);
socketServer.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    socket.on("message", (data) => {
        console.log(data);
    });

    socket.emit("socket_individual", "Hola desde el cliente #1");
});


