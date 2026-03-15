import { Link, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

const Navbar = () => {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const initials = currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background'>
            <div className='mx-auto max-w-5xl px-4 h-14 flex items-center justify-between'>
                {/* Left — logo */}
                <Link to='/dashboard' className='flex items-center gap-2'>
                    <div className='w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center'>
                        <svg width='14' height='14' viewBox='0 0 20 20' fill='none'>
                            <path d='M4 6h12M4 10h8M4 14h10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'/>
                        </svg>
                    </div>
                    <span className='text-sm font-medium'>Book Club</span>
                </Link>

                {/* Right — user info + logout */}
                <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                        {/* Avatar with initials */}
                        <div className='w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary'>
                            {initials}
                        </div>
                        <span className='text-sm text-muted-foreground hidden sm:block'>
                            {currentUser?.name}
                        </span>
                    </div>
                    <div className='w-px h-4 bg-border' />

                    <button
                        onClick={handleLogout}
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar