import apiClient from './apiClient'

const authService = {
    register: ({ name, email, password, passwordConfirmation }) => 
        apiClient.post('/users', {
            user: {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }
        }),

    login: ({ email, password }) => 
        apiClient.post('/auth/login', {
            auth: {
                email,
                password,
            }
        }),

    logout: () => 
        apiClient.delete('/auth/logout'),

    me: () => apiClient.get('/users/me'),
}

export default authService