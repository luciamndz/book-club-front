import { useState } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const DatePicker = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='space-y-1.5'>
      <p className='text-xs font-medium text-muted-foreground'>{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className='w-full text-left border rounded-md px-3 py-2 text-sm hover:bg-secondary transition-colors'>
            {value ? format(value, 'MMM d, yyyy') : 'Pick a date'}
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={value}
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
            disabled={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              return date < today
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const VotingRoundBanner = ({
  votingRound,
  isAdmin,
  onStartDraft,
  onOpenVoting,
  onFinishVoting,
}) => {
  const [showDateForm, setShowDateForm] = useState(false)
  const [startsAt, setStartsAt]         = useState(null)
  const [endsAt, setEndsAt]             = useState(null)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)

  // No voting round yet — admin sees start button
  if (!votingRound) {
    return isAdmin ? (
      <div className='flex items-center justify-between bg-secondary rounded-xl px-4 py-3 mb-6'>
        <p className='text-sm text-muted-foreground'>No active voting round.</p>
        <Button size='sm' onClick={onStartDraft}>
          Start voting round
        </Button>
      </div>
    ) : null
  }

  const handleOpenVoting = async (e) => {
    e.preventDefault()
    if (!startsAt || !endsAt) {
      setError('Please select both dates')
      return
    }
    if (endsAt <= startsAt) {
      setError('End date must be after start date')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await onOpenVoting(votingRound.id, {
        startsAt: startsAt.toISOString(),
        endsAt:   endsAt.toISOString(),
      })
      setShowDateForm(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Draft state
  if (votingRound.status === 'draft') {
    return (
      <div className='mb-6 space-y-3'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div className='w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0' />
            <div>
              <p className='text-sm font-medium text-yellow-900'>Voting round coming soon</p>
              <p className='text-xs text-yellow-800 mt-0.5'>
                Submit a book from the library before voting opens
              </p>
            </div>
          </div>
          {isAdmin && !showDateForm && (
            <Button
              size='sm'
              variant='outline'
              className='flex-shrink-0 border-yellow-400 text-yellow-900 hover:bg-yellow-100'
              onClick={() => setShowDateForm(true)}
            >
              Open voting
            </Button>
          )}
        </div>

        {isAdmin && showDateForm && (
          <div className='border rounded-xl p-4 bg-background space-y-4'>
            <p className='text-sm font-medium'>Set voting duration</p>
            <form onSubmit={handleOpenVoting} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <DatePicker
                  label='Starts at'
                  value={startsAt}
                  onChange={setStartsAt}
                />
                <DatePicker
                  label='Ends at'
                  value={endsAt}
                  onChange={setEndsAt}
                />
              </div>
              {error && <p className='text-xs text-destructive'>{error}</p>}
              <div className='flex gap-2 justify-end'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => setShowDateForm(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' size='sm' disabled={loading}>
                  {loading ? 'Opening...' : 'Open voting'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }

  // Active state
  if (votingRound.status === 'active') {
    const endsAtFormatted = format(new Date(votingRound.ends_at), 'MMM d, yyyy')

    return (
      <div className='bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3 mb-6'>
        <div className='flex items-center gap-3'>
          <div className='w-2 h-2 rounded-full bg-green-500 flex-shrink-0' />
          <div>
            <p className='text-sm font-medium text-green-900'>Voting is open!</p>
            <p className='text-xs text-green-800 mt-0.5'>
              Cast your vote before {endsAtFormatted} · {votingRound.vote_count} votes cast
            </p>
          </div>
        </div>
        {isAdmin && (
          <Button
            size='sm'
            variant='outline'
            className='flex-shrink-0 border-green-400 text-green-900 hover:bg-green-100'
            onClick={() => onFinishVoting(votingRound.id)}
          >
            Close voting
          </Button>
        )}
      </div>
    )
  }

  return null
}

export default VotingRoundBanner