import './User.css'


const User = ({ user, selectedUser, setSelectedUser, updateUsers }) => {



    const handleClick = () => {
        let selUser = { ...user }
        selUser.hasNewMessages = false
        setSelectedUser(selUser)
        updateUsers(selUser)
    }


    return (
        <>
            <div onClick={handleClick} className={selectedUser === user ? 'selected' : user}>
                <div className='name'>
                    {user.username} {user.self ? "you" : ""}
                </div>
                <div className='status'>
                    {user.connected ? <i className='icon.connected'> 'online' </i> : <i className='icon'>'offline'</i>}
                    {user.hasNewMessages === true ? <div className='new-messages'>!</div> : <div></div>}
                </div>
            </div>

        </>
    )

}

export default User
