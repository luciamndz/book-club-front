import { useState, useEffect, useCallback } from 'react'
import bookService from '@/services/bookService'

const useBooks = (bookClubId) => {
  const [books, setBooks]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await bookService.getAll(bookClubId)
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [bookClubId])

  useEffect(() => {
    if (bookClubId) fetchBooks()
  }, [bookClubId, fetchBooks])

  const createBook = async (formData) => {
    const newBook = await bookService.create(bookClubId, formData)
    setBooks((prev) => [...prev, newBook])
    return newBook
  }

  const deleteBook = async (bookId) => {
    await bookService.destroy(bookClubId, bookId)
    setBooks((prev) => prev.filter((b) => b.id !== bookId))
  }

  return {
    books,
    loading,
    error,
    createBook,
    deleteBook,
    refetch: fetchBooks,
  }
}

export default useBooks