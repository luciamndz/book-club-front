import apiClient from './apiClient'

const bookClubService = {
    getAll: () => 
        apiClient.get('/book_clubs'),

    getOne: (id) => 
        apiClient.get(`/book_clubs/${id}`),
    
    create: ({name, description }) => 
        apiClient.post('/book_clubs', {
            book_club: {
                name,
                description,
            }
        }),
    
    join: (id) => 
        apiClient.post(`/book_clubs/${id}/join`),

    destroy: (id) => 
        apiClient.delete(`/book_clubs/${id}`),
}

export default bookClubService