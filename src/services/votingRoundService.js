import apiClient from './apiClient'

const votingRoundService = {
    getCurrent: (bookClubId, votingRoundId) =>
        apiClient.get(`/book_clubs/${bookClubId}/voting_rounds/${votingRoundId}`),

    create: (bookClubId) =>
        apiClient.post(`/book_clubs/${bookClubId}/voting_rounds`),
    
    open: (bookClubId, votingRoundId, { startsAt, endsAt }) =>
        apiClient.patch(`/book_clubs/${bookClubId}/voting_rounds/${votingRoundId}`, {
            voting_round: {
                status: 'active',
                starts_at: startsAt,
                ends_at:   endsAt,
            },
    }),

    finish: (bookClubId, votingRoundId) =>
        apiClient.patch(`/book_clubs/${bookClubId}/voting_rounds/${votingRoundId}`, {
            voting_round: {
                status: 'finished',
            },
        }),

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