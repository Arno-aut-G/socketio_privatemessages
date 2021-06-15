import { useState } from 'react'
import socket from '../socket'



const SelectUsername = ({ name, setName }) => {
    const [username, setUsername] = useState('')
    console.log(username)

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.auth = { username }
        socket.connect()
        setName(username)

    }



    return (
        <>
            <div className='select-username'>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='username' placeholder='Username' onChange={handleChange} />

                    <button type='submit'>Submit</ button>
                </form>
            </div>
        </>
    )
}

export default SelectUsername