import React, {useEffect, useState} from 'react'


function App () {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => {
        console.log(response);
        return response.json()
      }

    ).then(
      data => {
        setBackendData(data)
      }
    )

    console.log("Testa lite output")
  }, [])

  useEffect(() => {
    console.log("Min andra useEffect");
    
  })

  return (
    <div>
      Hejsan 

      {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ):(
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )} 
    </div>
  )
}


export default App