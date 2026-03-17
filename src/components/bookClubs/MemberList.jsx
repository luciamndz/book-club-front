const getInitials = (name) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  
  const AVATAR_COLORS = {
    admin:  'bg-amber-100 text-amber-800',
    member: 'bg-blue-100 text-blue-800',
  }
  
  const MemberList = ({ members }) => {
    return (
      <div>
        <h2 className='text-sm font-medium mb-3'>
          Members
          <span className='font-normal text-muted-foreground ml-1'>· {members.length}</span>
        </h2>
  
        <div className='bg-background border rounded-xl overflow-hidden'>
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`flex items-center gap-3 px-4 py-3 ${
                index !== members.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${AVATAR_COLORS[member.role]}`}>
                {getInitials(member.user.name)}
              </div>
  
              {/* Info */}
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>{member.user.name}</p>
                <p className='text-xs text-muted-foreground capitalize'>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
export default MemberList