import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

const getUsers = () => {
   return axios.get("http://localhost:3001/users")
}

function App() {
  const [users, setUsers] = useState([]);

  useEffect (() => {
    getUsers().then((data) => {
      setUsers(data.data)
    })
  }, [])
 
  return (
    <div className="App">
      {users.map((user) => {
       return (
       <div className="user" key={user.id}>
        <h1 className="user-name">{user.name}</h1>
        <p className="user-number">{user.number}</p>
       </div>
      )})
      }
    </div>
  );
}

export default App;
