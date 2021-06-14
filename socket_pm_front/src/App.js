import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat'
import { useState } from 'react'
import { Browserrouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [username, setUsername] = useState('')
  return (
    <>
      <div className="App">
        {username ?
          <SelectUsername username={username} setUsername={setUsername} />
          :
          <Chat username={username} />
        }
      </div>
    </>
  );
}

export default App;
