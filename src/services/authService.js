// src/services/authService.js

import api from './api';

export const fetchProtectedData = async () => {
    try {
        const response = await api.get('/ruta-protegida');
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos protegidos:', error);
        throw error;
    }
};
