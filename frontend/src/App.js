import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './estilo.css'; // Importa el archivo CSS
import Register from './components/Register';
import Login from './components/Login';
import { isAuthenticated } from './utils/auth';
import { fetchProtectedData } from './services/authService';

function App() {
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setAuth(isAuthenticated());
        if (isAuthenticated()) {
            fetchProtectedData()
                .then(data => setData(data))
                .catch(error => console.error('Error al obtener datos:', error));
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Mi Aplicación</h1>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/protected" element={auth ? (
                            <div>
                                <p>Bienvenido, usuario autenticado</p>
                                {data ? (
                                    <div>Datos protegidos: {JSON.stringify(data)}</div>
                                ) : (
                                    <div>Cargando datos...</div>
                                )}
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )} />
                        <Route path="/" element={<Navigate to={auth ? "/protected" : "/login"} />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
