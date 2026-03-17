import apiClient from './apiClient'

const votingRoundService = {
    getCurrent: (bookClubId) =>
        apiClient.get(`/book_clubs/${bookClubId}/voting_rounds/current`),

    create: (bookClubId) =>
        apiClient.post(`/book_clubs/${bookClubId}/voting_rounds`),
    
    open: (bookClubId, votingRoundId, { startsAt, endsAt }) =>
        apiClient.patch(`/book_clubs/${bookClubId}/voting_rounds/${votingRoundId}/open`, {
            voting_round: {
            starts_at: startsAt,
            ends_at:   endsAt,
            },
    }),

    finish: (bookClubId, votingRoundId) =>
        apiClient.patch(`/book_clubs/${bookClubId}/voting_rounds/${votingRoundId}/finish`),

    submitBook: (bookClubId, votingRoundId, bookId) =>
        apiClient.post(`/book_clubs/${bookClubId}/voting_rounds/${votingRoundId}/submit_book`, {
            book_id: bookId,
        }),

    castVote: (bookClubId, votingRoundId, bookId) =>
        apiClient.post(`/book_clubs/${bookClubId}/voting_rounds/${votingRoundId}/votes`, {
            book_id: bookId,
        }),
}
    
export default votingRoundService