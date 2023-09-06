import { userModel } from "./models/user.model.js";

class UserManager {
    async addUser(user) {
        try {
            await userModel.create(user)
            console.log("User added!");
    
            return true;
        } catch (error) {
            return false;
        }
    }

    async login(user, pass) {
        try {
            const userLogged = await userModel.findOne({$and:[{email:user}, {password:pass}]}) || null;
            
            if (userLogged) {
                console.log("User logged!");
                return user;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

}

export default UserManager;