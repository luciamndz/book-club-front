const STATUS_BADGE = {
  selected:  { label: 'Selected',  className: 'bg-green-100 text-green-800' },
  submitted: { label: 'Submitted', className: 'bg-amber-100 text-amber-800' },
  created:   { label: 'Created',   className: 'bg-secondary text-muted-foreground' },
}

const BookCard = ({
  book,
  onDelete,
  canDelete,
  votingRound,
  onSubmitBook,
  onCastVote,
  hasVoted,
}) => {
  const badge = STATUS_BADGE[book.status] ?? STATUS_BADGE.created

  // Should we show the submit button?
  const showSubmit =
    votingRound?.status === 'draft' &&
    book.status === 'created'

  // Should we show the vote button?
  const showVote =
    votingRound?.status === 'active' &&
    book.status === 'submitted'

  return (
    <div className='bg-background border rounded-xl p-4 flex gap-4 items-start'>

      {/* Cover */}
      <div className='w-10 h-14 rounded flex-shrink-0 overflow-hidden bg-secondary flex items-center justify-center'>
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className='w-full h-full object-cover'
          />
        ) : (
          <span className='text-lg'>📖</span>
        )}
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-start justify-between gap-2 mb-1'>
          <div>
            <p className='text-sm font-medium'>{book.title}</p>
            <p className='text-xs text-muted-foreground mt-0.5'>{book.author}</p>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ${badge.className}`}>
            {badge.label}
          </span>
        </div>

        {book.genre && (
          <p className='text-xs text-muted-foreground'>{book.genre}</p>
        )}

        {/* Actions row */}
        <div className='flex items-center gap-3 mt-2'>

          {/* Delete — never on selected books */}
          {canDelete && book.status !== 'selected' && (
            <button
              onClick={() => onDelete(book.id)}
              className='text-xs text-destructive hover:underline'
            >
              Delete
            </button>
          )}

          {/* Submit for voting — draft round only, created books only */}
          {showSubmit && (
            <button
              onClick={() => onSubmitBook(votingRound.id, book.id)}
              className='text-xs border border-yellow-300 bg-yellow-50 text-yellow-900 px-2 py-1 rounded hover:bg-yellow-100 transition-colors'
            >
              Submit for voting
            </button>
          )}

          {/* Vote — active round only, submitted books only */}
          {showVote && (
            hasVoted ? (
              <span className='text-xs text-muted-foreground italic'>Voted ✓</span>
            ) : (
              <button
                onClick={() => onCastVote(votingRound.id, book.id)}
                className='text-xs bg-green-900 text-green-50 px-2 py-1 rounded hover:bg-green-800 transition-colors'
              >
                Vote
              </button>
            )
          )}

        </div>
      </div>

    </div>
  )
}

export default BookCard