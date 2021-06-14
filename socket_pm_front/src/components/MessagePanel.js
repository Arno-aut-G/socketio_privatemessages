import './MessagePanel.css'
import { useState } from 'react'
import socket from '../socket'

const MessagePanel = ({ user }) => {
    const [content, setContent] = useState('')
    console.log(user)

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user) {
            socket.emit('private message', {
                content,
                to: user.userID
            })
            user.messages.push({
                content,
                fromSelf: true
            }) //i'll probably have to feed that back into the all users state via setUsers???? because we would want to have this information there, too
            console.log(user)
        }
    }


    return (
        <>
            <div className='header'>
                {user.connected ? <i className='icon.connected'> {user.username} </i> : <i className='icon'>{user.username}</i>}
            </div>
            <ul className='messages'>
                {user.messages.map((message, index) => {
                    <li key={index} className='message'>
                        {message.content} <br />
                        {message.fromSelf ? 'you' : user.username}
                    </li>
                })}
            </ul>
            <form onSubmit={handleSubmit}>

                <input type="text" value={content} name={content} onChange={handleChange} />

                <input type="submit" value="Submit" />
            </form>

            {/* input field */}
        </>
    )
}


// onMessage(content) {
//     if (this.selectedUser) {
//         socket.emit("private message", {
//             content,
//             to: this.selectedUser.userID,
//         });
//         this.selectedUser.messages.push({
//             content,
//             fromSelf: true,
//         });
//     }
// }