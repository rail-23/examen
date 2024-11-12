///para aplicar el crud creart,ver,editar, eliminar,
import { Router } from "express";
import * as projecstCtrl from '../controllers/proyect.controller'

const router = Router();
import {authJwt} from '../middleware'

router.post("/",[authJwt.verifytoken,authJwt.Admin], projecstCtrl.crearProyecto) ;
router.get("/",projecstCtrl.getProyectos) ;
router.put("/:projectId",[authJwt.verifytoken,authJwt.Moderador],   projecstCtrl.updateProyectoById) ;
router.delete("/:projectId",[authJwt.verifytoken,authJwt.Admin], projecstCtrl.deleteProyectoById) ;



export default router;