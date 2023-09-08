import passport from "passport";
import local from "passport-local"
import { userModel } from "../dao/models/user.model.js";
import {createHash, isValidPassword } from "../../utils.js";
import {log} from "console";

const LocalStrategy =local.Strategy;
const initializePassport = () =>{
    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"},
        async (req,username,password,done) =>{
            const {first_name,last_name,email,age} = req.body;
            try{
                let user = await userService.findeOne({email:username});
                if(user) {
                    console.log("user alredy exists");
                    return done(null,false);
                
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password:createHash(password)
                }
                let result = await userService.create(newUser);
                return done(null,result);
            }catch (error){
return done("error al obtener el usuario: "+error);
            }
        }
    ));
    passport.serializeUser((user, done) =>{
        done(null, user._id);
});
passport.deserializeUser(async(id, done) => {
    let user = await userService.findById(id);
    done(null,user);
});

passport.use("login", new LocalStrategy({usernameField:"email"}, async (username, password, done) => {
    try {
        let user = await userModel.findeOne({email:username});

        if (!user) {
            console.log("Error! El usuario no existe!");
            return done (null, false);

        }
        if (!isValidPassword(user,password)){
            console.log
            return done(null,false);
        }
        return done(null,user);

    } catch (error) {
        return done(null,"error: "+error)
    }
}))

}

export default initializePassport;