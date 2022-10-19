import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from "../components/LoginForm.jsx"
import LogDisplay from "../components/LogDisplay"
import {PacmanLoader} from 'react-spinners'
import React, { useState, useEffect } from 'react';


function LoginPage() {
  const [showpacman, setShowPacman] = useState(false);

  return (<>
  <div>
    <h1>Logingrej</h1>
  </div>

  <LoginForm/>

  <hr></hr>

  <LogDisplay/>

  </>
  )
}


export default LoginPage

