import './App.css';
import { useState } from 'react';
import AuthForm from './Components/AuthForm/AuthForm';
import AuthSuccess from './Components/AuthSuccess/AuthSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <div className="App">
      {showIntro ?
        <div>
          <header className="App-header">
            <h1>
              Welcome to the Thoughtful coding challenge app!
            </h1>
          </header>
          <AuthForm />
          {/* <AuthSuccess /> */}
        </div>
        : null}
        <ToastContainer />
    </div>
  );
}

export default App;
