import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/user.model.js";
import { createHash,isValidPassword} from "../../utils.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy({
                passReqToCallback: true,
                usernameField: "email"
            },
            async (req, username, password, done) => {
                const {
                    first_name,
                    last_name,
                    email,
                    age
                } = req.body;

                try {
                    let user = await userModel.findOne({
                        email: username
                    });

                    if (user) {
                        console.log("El usuario " + email + " ya se encuentra registrado!");
                        return done(null, false);
                    }

                    user = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                    };

                    if (
                        user.email == "adminCoder@coder.com" &&
                        password === "1234jp"
                    ) {
                        user.role = "admin";
                    } else {
                        user.role = "user";
                    }

                    let result = await userModel.create(user);
                    console.log("Usuario creado con éxito:", result);

                    if (result) {
                        return done(null, result);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password"
            },
            async (username, password, done) => {
                try {
                    let user = await userModel.findOne({
                        email: username
                    });
                    console.log("Usuario de Passport:", user);

                    if (!user) {
                        return done(null, false, {
                            message: "Usuario incorrecto."
                        });
                    }
                    if (!isValidPassword(user, password)) {
                        return done(null, false, {
                            message: "Contraseña incorrecta."
                        });
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "github",
        new GitHubStrategy({
                clientID: "Iv1.5472bdf302b20f57",
                clientSecret: "bb1476175d10abb0ca152545061f3c58cb702489",
                callbackURL: "http://localhost:8080/api/sessions/githubcallback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile);
                    let user = await userModel.findOne({
                        email: profile._json.email
                    });

                    if (user) {
                        return done(null, user);
                    } else {
                        let newUser = {
                            first_name: profile._json.name,
                            last_name: "",
                            email: profile._json.email,
                            age: 100,
                            password: "",
                            role: "user",
                        };

                        let result = await userModel.create(newUser);

                        return done(null, result);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;