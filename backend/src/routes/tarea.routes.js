import { Router } from "express";
import * as tareaCtrl from "../controllers/tarea.controller"; // Controlador de tareas

const router = Router();

// Crear tarea (sin autenticación ni proyecto de referencia)
router.post("/", tareaCtrl.crearTarea);

// Listar todas las tareas
router.get("/", tareaCtrl.listarTareas);

// Actualizar tarea por ID
router.put("/:id", tareaCtrl.actualizarTarea);

// Eliminar tarea por ID
router.delete("/:id", tareaCtrl.eliminarTarea);

export default router;
