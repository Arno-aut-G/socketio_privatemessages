import { useEffect } from 'react'
import './User.css'

const User = ({ user, selectedUser, setSelectedUser }) => {



    const handleClick = () => {
        user.hasNewMessages = false
        setSelectedUser(user)
    }


    return (
        <>
            <div className='user' onClick={handleClick} className={selectedUser === user ? 'selected' : undefined}>
                <div className='name'>
                    {user.username} {user.self ? "you" : ""}
                </div>
                <div className='status'>
                    {user.connected ? <i className='icon.connected'> 'online' </i> : <i className='icon'>'offline'</i>}
                </div>
            </div>
            {user.hasNewMessages === true ? <div className='new-messages'>!</div> : <div>No new message</div>}
        </>
    )

}

export default User
