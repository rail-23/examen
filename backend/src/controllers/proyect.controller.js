import Project from "../models/Project";

export const crearProyecto = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const newProject = new Project({
            nombre,
            descripcion,
            usuario: req.userId 
        });
        const projectSave = await newProject.save();
        res.status(201).json({
            message: 'Proyecto creado exitosamente',
            projectSave
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el proyecto' });
    }
};

export const getProyectos = async (req, res) => {
    try {
        const proyectos = await Project.find({ usuario: req.userId });
        res.status(200).json({
            message: 'Proyectos listados exitosamente',
            proyectos
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los proyectos' });
    }
};

export const updateProyectoById = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, {
            new: true,
        });
        if (!updatedProject) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.status(200).json({
            message: 'Proyecto actualizado exitosamente',
            updatedProject
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el proyecto' });
    }
};

export const deleteProyectoById = async (req, res) => {
    try {
        const { projectId } = req.params;
        await Project.findByIdAndDelete(projectId);
        res.status(204).json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proyecto' });
    }
};
