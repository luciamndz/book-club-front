import { useState, useEffect } from 'react'
import bookClubService from '@/services/bookClubService'

const useBookClubs = () => {
    const [bookClubs, setBookClubs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchBookClubs = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await bookClubService.getAll()
            setBookClubs(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookClubs()
    }, [])

    const createBookClub = async ({ name, description }) => {
        const newBookClub = await bookClubService.create({ name, description })
        setBookClubs((prev) => [...prev, newBookClub])
        return newBookClub
    }

    const joinBookClub = async (id) => {
        const updatedBookClub = await bookClubService.join(id)
        setBookClubs((prev) =>
            prev.map((bc) => (bc.id === id ? updatedBookClub : bc))
        )
        return updatedBookClub
    }

    const deleteBookClub = async (id) => {
        await bookClubService.destroy(id)
        setBookClubs((prev) => prev.filter((bc) => bc.id !== id))
    }

    return { bookClubs, loading, error, createBookClub, joinBookClub, deleteBookClub, refetch: fetchBookClubs }
}

export default useBookClubs