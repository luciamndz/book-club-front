import { useState, useEffect, useCallback } from 'react'
import votingRoundService from '@/services/votingRoundService'

const useVotingRound = (bookClubId) => {
  const [votingRound, setVotingRound] = useState(null)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  const fetchVotingRound = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await votingRoundService.getCurrent(bookClubId)
      setVotingRound(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [bookClubId])

  useEffect(() => {
    if (bookClubId) fetchVotingRound()
  }, [bookClubId, fetchVotingRound])

  const createVotingRound = async () => {
    const data = await votingRoundService.create(bookClubId)
    setVotingRound(data)
    return data
  }

  const openVoting = async (votingRoundId, { startsAt, endsAt }) => {
    const data = await votingRoundService.open(bookClubId, votingRoundId, { startsAt, endsAt })
    setVotingRound(data)
    return data
  }

  const finishVoting = async (votingRoundId) => {
    const data = await votingRoundService.finish(bookClubId, votingRoundId)
    setVotingRound(data)
    return data
  }

  const submitBook = async (votingRoundId, bookId) => {
    await votingRoundService.submitBook(bookClubId, votingRoundId, bookId)
  }

  const castVote = async (votingRoundId, bookId) => {
    await votingRoundService.castVote(bookClubId, votingRoundId, bookId)
    await fetchVotingRound()
  }

  return {
    votingRound,
    loading,
    error,
    createVotingRound,
    openVoting,
    finishVoting,
    submitBook,
    castVote,
    refetch: fetchVotingRound,
  }
}

export default useVotingRound