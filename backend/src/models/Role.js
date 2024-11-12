import { Schema, model } from "mongoose";

////iniciamos los roles
export const ROLES = ["user","admin","moderador"]
const  roleSchema = new Schema({
    name: String,
}, {
    version: false,
})
export default model('Role', roleSchema)