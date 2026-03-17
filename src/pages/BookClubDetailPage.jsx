import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useBookClubDetail from '@/hooks/useBookClubDetail'
import useBook from '@/hooks/useBook'
import useAuth from '@/hooks/useAuth'
import useVotingRound from '@/hooks/useVotingRound'
import BookClubHeader from '@/components/bookClubs/BookClubHeader'
import MemberList from '@/components/bookClubs/MemberList'
import BookCard from '@/components/books/BookCard'
import AddBookModal from '@/components/books/AddBookModal'
import VotingRoundBanner from '@/components/votingRound/VotingRoundBanner'
import WinnerSection from '@/components/votingRound/WinnerSection'

const BookClubDetailPage = () => {
  const { id }                                                          = useParams()
  const { currentUser }                                                 = useAuth()
  const { bookClub, members, currentUserRole, isAdmin, loading, error } = useBookClubDetail(id)
  const {
    books,
    loading: booksLoading,
    createBook,
    deleteBook,
    refetch: refetchBooks,
  } = useBook(id)
  const {
    votingRound,
    createVotingRound,
    openVoting,
    finishVoting,
    submitBook,
    castVote,
  } = useVotingRound(id)
  const [showAddBook, setShowAddBook] = useState(false)

  const currentMember = members.find((m) => m.user.id === currentUser?.id)
  const hasVoted      = votingRound?.user_has_voted ?? false

  const handleSubmitBook = async (votingRoundId, bookId) => {
    await submitBook(votingRoundId, bookId)
    refetchBooks()  // refresh so book status updates to "submitted"
  }

  const handleCastVote = async (votingRoundId, bookId) => {
    await castVote(votingRoundId, bookId)
    // castVote already calls refetch internally via useVotingRound
  }

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='h-16 rounded-xl bg-secondary animate-pulse' />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 h-64 rounded-xl bg-secondary animate-pulse' />
          <div className='h-64 rounded-xl bg-secondary animate-pulse' />
        </div>
      </div>
    )
  }

  if (error) return <p className='text-sm text-destructive'>{error}</p>
  if (!bookClub) return null

  return (
    <div>
      {/* Header — no voting button here anymore */}
      <BookClubHeader
        bookClub={bookClub}
        currentUserRole={currentUserRole}
      />

      {/* Voting round banner — handles all voting states */}
      <VotingRoundBanner
        votingRound={votingRound}
        isAdmin={isAdmin}
        onStartDraft={createVotingRound}
        onOpenVoting={openVoting}
        onFinishVoting={finishVoting}
      />

      {/* Winner section */}
      <WinnerSection votingRound={votingRound} />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

        {/* Left — Books */}
        <div className='lg:col-span-2'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm font-medium'>
              Books
              {books.length > 0 && (
                <span className='font-normal text-muted-foreground ml-1'>· {books.length}</span>
              )}
            </h2>
            <button
              onClick={() => setShowAddBook(true)}
              className='text-xs border rounded-md px-3 py-1.5 hover:bg-secondary transition-colors'
            >
              + Add book
            </button>
          </div>

          {booksLoading && (
            <div className='space-y-2'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='h-20 rounded-xl bg-secondary animate-pulse' />
              ))}
            </div>
          )}

          {!booksLoading && books.length === 0 && (
            <div className='text-center py-12 border rounded-xl bg-background'>
              <p className='text-sm text-muted-foreground'>No books yet.</p>
              <p className='text-sm text-muted-foreground'>Add the first one!</p>
            </div>
          )}

          {!booksLoading && books.length > 0 && (
            <div className='space-y-2'>
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onDelete={deleteBook}
                  canDelete={
                    book.status !== 'selected' &&
                    book.status !== 'submitted' &&
                    isAdmin || book.submitted_by === currentMember?.id}
                  votingRound={votingRound}
                  onSubmitBook={handleSubmitBook}
                  onCastVote={handleCastVote}
                  hasVoted={hasVoted}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — Members */}
        <div>
          <MemberList members={members} />
        </div>

      </div>

      {showAddBook && (
        <AddBookModal
          onSubmit={createBook}
          onClose={() => setShowAddBook(false)}
        />
      )}
    </div>
  )
}

export default BookClubDetailPage