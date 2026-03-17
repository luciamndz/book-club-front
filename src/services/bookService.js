import apiClient from './apiClient'

const bookService = {
  getAll: (bookClubId) =>
    apiClient.get(`/book_clubs/${bookClubId}/books`),

  create: (bookClubId, formData) =>
    fetch(`http://127.0.0.1:3000/book_clubs/${bookClubId}/books`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then(async (res) => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      return data
    }),

  destroy: (bookClubId, bookId) =>
    apiClient.delete(`/book_clubs/${bookClubId}/books/${bookId}`),
}

export default bookService