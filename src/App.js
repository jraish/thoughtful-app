import './App.css';
import { useState } from 'react';
import AuthForm from './Components/AuthForm/AuthForm';
import AuthSuccess from './Components/AuthSuccess/AuthSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authed, setAuthed] = useState(false)

  return (
    <div className="App">
        <div>
          <header className="App-header">
            <h1>
              Welcome to the Thoughtful coding challenge app!
            </h1>
          </header>
          {authed ? <AuthSuccess togglePage={() => setAuthed(!authed)} /> : <AuthForm togglePage={() => setAuthed(!authed)}/>}
          </div>
        <ToastContainer />
    </div>
  );
}

export default App;
