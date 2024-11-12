// src/components/Proyectos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Proyectos = () => {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        // Cambia la URL a la de tu API
        axios.get('http://localhost:3500/projects')
            .then(response => {
                setProyectos(response.data.proyectos);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los proyectos:", error);
            });
    }, []);

    return (
        <div>
            <h1>interfaces</h1>
            <ul>
                {proyectos.map(proyecto => (
                    <li key={proyecto._id}>{proyecto.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Proyectos;
