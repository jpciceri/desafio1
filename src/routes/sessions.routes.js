import express from "express";
import UserManager from "../dao/UserManager.js";
import {createHash} from "../../utils.js";
import passport from "passport";

const router = express.Router();
const UM = new UserManager();
router.get("/login", async (req, res) => {
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    let {
        user,
        pass
    } = req.query;
    const userLogged = await UM.login(user, pass, req);

    if (userLogged) {
        res.send({
            status: "OK",
            message: userLogged
        });
    } else {
        console.log('Fallo al loguear en el servidor');
        res.status(401).send({
            status: "Error",
            message: "No se pudo loguear el Usuario!"
        });
    }
    console.log(`res.status: ${res.statusCode}`);
});

router.post("/register", async (req, res) => {
    const userRegistered = await UM.addUser(req.body);

    if (userRegistered) {
        res.send({
            status: "OK",
            message: userRegistered
        });
    } else {
        res.status(401).send({
            status: "Error",
            message: "No se pudo registrar el Usuario!"
        });
    }
});

router.get("/restore", async (req, res) => {
    let {
        user,
        pass
    } = req.query;
    pass = createHash(pass);
    const passwordRestored = await UM.restorePassword(user, pass);

    if (passwordRestored) {
        res.send({
            status: "OK",
            message: "La contraseña se ha actualizado correctamente!"
        });
    } else {
        res.status(401).send({
            status: "Error",
            message: "No se pudo actualizar la contraseña!"
        });
    }
});

router.get("/github", passport.authenticate("github", {
    scope: ["user:email"]
}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async (req, res) => {
    req.session.user = req.user;
    req.session.loggedIn = true;
    res.redirect("/products");
});


router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/profile');
        }
        res.redirect('/login');
    });
});

export default router;