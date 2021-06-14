import { useState } from 'react'
import socket from '../socket'

const SelectUsername = ({ setUsername }) => {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }


    const handleSubmit = (e) => {
        input.length > 2 ?
            (e.preventDefault(),
                setUsername(input),
                socket.auth = input,
                socket.connect())
            :
            alert('Provided username null or too short.')
    }

    return (
        <>
            <div className='select-username'>
                <form>
                    <label>
                        Username:
                        <input type='text' name='username' placeholder='username' onChange={handleChange} />
                    </label>
                    <input type='submit' value='Submit' onSubmit={handleSubmit} />
                </form>
            </div>
        </>
    )
}

export default SelectUsername