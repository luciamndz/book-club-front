const DashboardPage = () => {
    return (
        <div>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h1 className='text-xl font-medium'>Book clubs</h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Join an existing club or create your own
                    </p>
                </div>
                <button className='h-9 px-4 rounded-md bg-foreground text-background text-sm font-medium'>
                    + Create club
                </button>
            </div>
    
            {/* Placeholder grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {[1, 2, 3].map((i) => (
                    <div
                    key={i}
                    className='h-36 rounded-xl bg-muted animate-pulse'
                    />
                ))}
            </div>
        </div>
    )
}
  
export default DashboardPage