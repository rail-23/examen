/// para manejar las autenticacion de los usuarios///
import { Router } from "express";

import * as authCrtl from '../controllers/auth.controller'
import { verificartoken } from "../middleware";
const router = Router()

router.post('/register',[verificartoken.verificardatos,verificartoken.verifiRoles],authCrtl.signUp);

router.post('/login',authCrtl.signin);

export default router;