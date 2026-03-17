const WinnersSection = ({ votingRound }) => {
    if (!votingRound || votingRound.status !== 'finished' || !votingRound.winner) {
      return null
    }
  
    const finishedAt = new Date(votingRound.updated_at).toLocaleDateString('en-US', {
      month: 'short',
      day:   'numeric',
      year:  'numeric',
    })
  
    return (
      <div className='mb-6'>
        <h2 className='text-sm font-medium mb-3'>🏆 Last winner</h2>
        <div className='bg-background border rounded-xl overflow-hidden'>
          <div className='bg-muted/40 border-b px-4 py-2 flex items-center justify-between'>
            <p className='text-xs font-medium'>Selected book</p>
            <p className='text-xs text-muted-foreground'>{finishedAt}</p>
          </div>
          <div className='p-4 flex gap-3 items-center'>
            <div className='w-10 h-14 rounded flex-shrink-0 overflow-hidden bg-secondary flex items-center justify-center'>
              {votingRound.winner.cover_url ? (
                <img
                  src={votingRound.winner.cover_url}
                  alt={votingRound.winner.title}
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='text-lg'>📖</span>
              )}
            </div>
            <div>
              <p className='text-sm font-medium'>{votingRound.winner.title}</p>
              <p className='text-xs text-muted-foreground mt-0.5'>{votingRound.winner.author}</p>
              <p className='text-xs text-muted-foreground mt-1'>
                Won with {votingRound.vote_count} {votingRound.vote_count === 1 ? 'vote' : 'votes'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}
  
export default WinnersSection