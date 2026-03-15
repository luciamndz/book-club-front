import Navbar from './Navbar'

const AppLayout = ({ children }) => {
    return (
        <div className='min-h-screen bg-muted/40'>
            <Navbar />
            <main className='mx-auto max-w-5xl px-4 py-8'>
                {children}
            </main>
        </div>
    )
}

export default AppLayout