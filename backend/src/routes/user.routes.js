///crear usuario/// 
import { Router } from "express";
const router = Router()
import * as userCrtl from '../controllers/user.controller'
import { authJwt,verificartoken} from "../middleware"


router.post('/',[
    authJwt.verifytoken,
    authJwt.Admin,
    verificartoken.verifiRoles
],userCrtl.crearUsuario)

export default router;