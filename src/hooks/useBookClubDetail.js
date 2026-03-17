import { useState, useEffect, useCallback } from 'react'
import bookClubService from '@/services/bookClubService'

const useBookClubDetail = (id) => {
  const [bookClub, setBookClub]               = useState(null)
  const [members, setMembers]                 = useState([])
  const [currentUserRole, setCurrentUserRole] = useState(null)
  const [loading, setLoading]                 = useState(true)
  const [error, setError]                     = useState(null)

  const fetchBookClubDetails = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await bookClubService.getOne(id)
      setBookClub(data.book_club)
      setMembers(data.members)
      setCurrentUserRole(data.book_club.current_user_role)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) fetchBookClubDetails()
  }, [id, fetchBookClubDetails])

  return {
    bookClub,
    members,
    currentUserRole,
    loading,
    error,
    isAdmin: currentUserRole === 'admin',
    refetch: fetchBookClubDetails,
  }
}

export default useBookClubDetail