import Tarea from "../models/Tarea"; // Importa el modelo de Tarea

export const crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, estado, prioridad } = req.body;

        // Crear una nueva tarea sin asociarla a un proyecto
        const nuevaTarea = new Tarea({
            titulo,
            descripcion,
            estado,
            prioridad
        });

        const tareaGuardada = await nuevaTarea.save();

        res.status(201).json({
            message: "Tarea creada exitosamente",
            tareaGuardada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la tarea" });
    }
};

// Listar todas las tareas
export const listarTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json({
            message: "Tareas listadas exitosamente",
            tareas
        });
    } catch (error) {
        res.status(500).json({ message: "Error al listar las tareas" });
    }
};

// Actualizar una tarea por su ID
export const actualizarTarea = async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!tareaActualizada) return res.status(404).json({ message: "Tarea no encontrada" });
        res.status(200).json({
            message: "Tarea actualizada exitosamente",
            tareaActualizada
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
};

// Eliminar una tarea por su ID
export const eliminarTarea = async (req, res) => {
    try {
        await Tarea.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
};
