import User from '../models/User';
import Role from '../models/Role';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

export const crearUsuario = async (req, res) => {
    const { nombre, email, password, roles } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    try {
        // Buscar los ObjectIds correspondientes a los roles proporcionados
        const foundRoles = await Role.find({ name: { $in: roles } });
        const roleIds = foundRoles.map(role => role._id);

        // Crear una nueva instancia del usuario
        const newUser = new User({
            nombre,
            email,
            password: bcrypt.hashSync(password, 10), // Encriptar la contraseña
            roles: roleIds
        });

        // Guardar el usuario en la base de datos
        const savedUser = await newUser.save();

        // Generar el token JWT
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};
