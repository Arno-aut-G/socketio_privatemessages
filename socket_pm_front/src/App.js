import './App.css';
import Chat from './components/Chat'
import SelectUsername from './components/SelectUsername'
import { useState } from 'react'


const App = () => {
  const [name, setName] = useState(null)



  return (
    <>
      <div className="App">
        {!name ?
          <SelectUsername setName={setName} username={name} />
          :
          <Chat username={name} />
        }
      </div>
    </>
  );
}

export default App;

