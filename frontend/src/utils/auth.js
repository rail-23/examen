export const isAuthenticated = () => {
    // Lógica para verificar si el usuario está autenticado
    return !!localStorage.getItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};
