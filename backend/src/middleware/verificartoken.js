import { ROLES } from '../models/Role'
import User from '../models/User';

export const verificardatos = async (req, res, next) => {
    try {
        const user = await User.findOne({ nombre: req.body.nombre });
        if (user) return res.status(400).json({ message: 'El usuario existe' });

        const email = await User.findOne({ email: req.body.email });
        if (email) return res.status(400).json({ message: 'El email existe' });

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}

export const verifiRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `El rol ${req.body.roles[i]} no existe`
                });
            }
        }
    }
    next();
}
