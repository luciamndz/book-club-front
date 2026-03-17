import { useNavigate } from 'react-router-dom'

const ROLE_BADGE = {
  admin:  { label: 'Admin',  className: 'bg-amber-100 text-amber-800' },
  member: { label: 'Member', className: 'bg-green-100 text-green-800' },
}

const BookClubHeader = ({ bookClub, currentUserRole }) => {
  const navigate = useNavigate()
  const badge    = ROLE_BADGE[currentUserRole]

  return (
    <div className='flex items-start justify-between gap-4 mb-6'>
      <div>
        <div className='flex items-center gap-1.5 mb-1'>
          <button
            onClick={() => navigate('/dashboard')}
            className='text-xs text-muted-foreground hover:text-foreground transition-colors'
          >
            ← Back
          </button>
          <span className='text-xs text-muted-foreground'>/</span>
          <span className='text-xs text-muted-foreground truncate max-w-[200px]'>
            {bookClub.name}
          </span>
        </div>
        <h1 className='text-xl font-medium'>{bookClub.name}</h1>
        {bookClub.description && (
          <p className='text-sm text-muted-foreground mt-1'>{bookClub.description}</p>
        )}
      </div>

      {badge && (
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${badge.className}`}>
          {badge.label}
        </span>
      )}
    </div>
  )
}

export default BookClubHeader