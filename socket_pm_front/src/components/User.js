import './User.css'

const User = ({ user, selectedUser, setSelectedUser }) => {
    console.log(user)
    console.log(selectedUser)

    const handleClick = () => {
        user.hasNewMessages = false
        setSelectedUser(user)
    }

    return (
        <>
            <div className='user' onClick={handleClick} className={selectedUser === user && 'selected'}>
                <div className='name'>
                    {user.username} {user.self ? "you" : ""}
                </div>
                <div className='status'>
                    {user.connected ? <i className='icon.connected'> 'online' </i> : <i className='icon'>'offline'</i>}
                </div>
            </div>
            {user.hasNewMessages && <div className='new-messages'>!</div>}
        </>
    )

}

export default User
