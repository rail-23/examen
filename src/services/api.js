// src/services/api.js
import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3500',
    headers: {
        'x-access-token': getToken()
    }
});

export default api;
