import './User.css'


const User = ({ user, selectedUser, setSelectedUser, updateUsers }) => {



    const handleClick = () => {
        user.hasNewMessages = false
        setSelectedUser(user)
    }


    return (
        <>
            <div onClick={handleClick} className={selectedUser === user ? 'selected' : user}>
                <div className='name'>
                    {user.username} {user.self ? "you" : ""}
                </div>
                <div className='status'>
                    {user.connected ? <i className='icon.connected'> 'online' </i> : <i className='icon'>'offline'</i>}
                </div>
            </div>
            {user.hasNewMessages === true ? <div className='new-messages'>!</div> : <div>''</div>}
        </>
    )

}

export default User
