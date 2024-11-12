///verificar que el usuario usuario tiene  sus roles ///
import config from '../config'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import Role from '../models/Role'

export const verifytoken = async (req, res, next) => {

    try {
        const token = req.headers['x-access-token'];

        console.log(token)
        if (!token) return res.status(403).json({ message: "!sin token no puede continuar!" })

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: 'usuario no encotrado' })
        next()
    } catch (error) {
        return res.status(401).json({ message: 'token no valido' })
    }
}
export const Moderador = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderador") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Solo Moderador realizan la accion" });
}
export const Admin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Solo Amind realizan la accion" });
}