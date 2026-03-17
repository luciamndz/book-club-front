import { useState } from 'react'
import useBookClubs from '@/hooks/useBookClubs'
import BookClubCard from '@/components/bookClubs/BookClubCard'
import CreateBookClubModal from '@/components/bookClubs/CreateBookClubModal'
import { Button } from '@/components/ui/button'

const DashboardPage = () => {
  const { bookClubs, loading, error, createBookClub, joinBookClub } = useBookClubs()
  const [showModal, setShowModal] = useState(false)

  const handleCreate = async (form) => {
    await createBookClub(form)
  }

  const handleJoin = async (id) => {
    await joinBookClub(id)
  }

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-xl font-medium'>Book clubs</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Join an existing club or create your own
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          + Create club
        </Button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='h-36 rounded-xl bg-secondary animate-pulse' />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <p className='text-sm text-destructive'>{error}</p>
      )}

      {/* Empty state */}
      {!loading && !error && bookClubs.length === 0 && (
        <div className='text-center py-16'>
          <p className='text-muted-foreground text-sm'>No book clubs yet.</p>
          <p className='text-muted-foreground text-sm'>Be the first to create one!</p>
        </div>
      )}

      {/* Club grid */}
      {!loading && !error && bookClubs.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {bookClubs.map((bookClub) => (
            <BookClubCard
              key={bookClub.id}
              bookClub={bookClub}
              onJoin={handleJoin}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CreateBookClubModal
          onSubmit={handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  )
}

export default DashboardPage