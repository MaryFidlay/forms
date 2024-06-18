import { useState } from 'react';
import './App.css'
import Authenticate from './components/Authenticate';
import SignUpForm from './components/SignUpForm';


export default function App() {
const [token, setToken] = useState("");
    return (
      <>
        <SignUpForm token={token} setToken={setToken} />
              
        <Authenticate token={token} setToken={setToken} />
      </>
    );
  }

