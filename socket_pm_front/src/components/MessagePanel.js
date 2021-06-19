import './MessagePanel.css'
import { useState, useEffect } from 'react'
import socket from '../socket'

const MessagePanel = ({ user, updateUsers, setSelectedUser }) => {
    const [content, setContent] = useState('')


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
            let handleUser = { ...user, messages: [...user.messages, { content, fromSelf: true }] }
            console.log('handleUser', handleUser);
            updateUsers(handleUser)

        }
    }


    return (
        <>
            <div className='header'>
                {user.connected ? <i className='icon.connected'> {user.username} </i> : <i className='icon'>{user.username}</i>}
            </div>
            <ul className='messages'>
                {user.messages.map((message, index) => (
                    <li key={index} className='message'>
                        {message.content} <br />
                        {message.fromSelf ? 'you' : user.username}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>

                <input type="text" value={content} name={content} onChange={handleChange} />

                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default MessagePanel

