import {fileURLToPath} from "url";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) => bcrypt.hashSync(password,bcryp.genSaltSync(10));

export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

export default __dirname
