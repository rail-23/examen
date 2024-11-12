import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/auth/login', user);
            localStorage.setItem('token', response.data.token); // Almacenar el token en local storage
            console.log(response.data);
            alert('Inicio de sesión exitoso');
        } catch (error) {
            console.error("Hubo un error al iniciar sesión:", error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div>
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
