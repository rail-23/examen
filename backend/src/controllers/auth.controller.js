import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role'

export const signUp = async (req, res) => {
    try {
        const { nombre, email, password, roles } = req.body;

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json({ message: 'El usuario ya existe' });

        const newUser = new User({
            nombre,
            email,
            password: await User.encryptPassword(password)
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email }).populate("roles");

        if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });

        const matchPassword = await User.comparePassword(password, userFound.password);
        if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
