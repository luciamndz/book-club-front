import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ROLE_BADGE = {
    admin: {label: 'Admin', className: 'bg-amber-100 text-amber-800'},
    member: {label: 'Member', className: 'bg-green-100 text-green-800'},
    default: {label: 'Open', className: 'bg-secondary text-muted-foreground'},
}

const BookClubCard = ({ bookClub, onJoin }) => {
    const navigate = useNavigate()
    const badge = ROLE_BADGE[bookClub.current_user_role] ?? ROLE_BADGE.default
    const isMember = !!bookClub.current_user_role

    return (
        <Card className='flex flex-col justify-between'>
            <CardContent className='pt-5 space-y-2'>

                {/* Header */}
                <div className='flex items-start justify-between gap-2'>
                    <h3 className='text-sm font-medium leading-snug'>{bookClub.name}</h3>
                    <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}>
                        {badge.label}
                    </span>
                </div>

                {/* Description */}
                <p className='text-xs text-muted-foreground line-clamp-2'>
                    {bookClub.description || 'No description provided.'}
                </p>

                {/* Footer */}
                <div className='flex items-center justify-between pt-2'>
                    <span className='text-xs text-muted-foreground'>
                        {bookClub.member_count} {bookClub.member_count === 1 ? 'member' : 'members'}
                    </span>

                    {isMember ? (
                        <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => navigate(`/book_clubs/${bookClub.id}`)}
                        >
                        View →
                        </Button>
                    ) : (
                        <Button
                        variant='outline'
                        size='sm'
                        onClick={() => onJoin(bookClub.id)}
                        >
                        Join
                        </Button>
                    )}
                </div>

            </CardContent>
        </Card>
    )
}

export default BookClubCard