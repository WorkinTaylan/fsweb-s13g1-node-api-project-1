import React, {useEffect, useState} from 'react';

const App = () => {

const [backendData, setBackendData]=useState();

useEffect(()=>{

fetch("/api/users").then(
  response=>response.json()
).then(
  data=>{
    setBackendData(data)
  }
)

},[])

const handleDeleteUser = (id) => {
  fetch(`/api/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // Silinen kullanıcıyı listeden kaldırın
      const updatedData = backendData.filter((user) => user.id !== data.id); // siler, sonra ögelerin id'si silinene eşit değilse ögeleri updatedDatanın içine atar ve onu setler.
      setBackendData(updatedData);
    })
    .catch((error) => {
      console.error(error);
    });
};

  return (
    <div>
      {(typeof backendData==="undefined")?(
        <p>Loading...</p>
      ):(
        backendData.map((user)=>{ return(
          <div>
          <p key={user.id}>{user.name}</p>
          <button onClick={()=>handleDeleteUser(user.id)}>SİL</button>
          </div>
        )
          
        })
      )}
    
    </div>
  )
}

export default App
