import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Input from './input/Input';

const getUsers = () => {
   return axios.get("http://localhost:3001/users")
}

const createUser = (user) => {
  return axios.post("http://localhost:3001/users", user)
}


function App(props) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]); 
  const [addNumber, setAddNumber] = useState([]);

  useEffect (() => {
    getUsers().then((res) => {
      setUsers(res.data)
    })
  }, [])

  const addNewUser = (event) => {
    event.preventDefault()
    const userObj = {
      name: newUser,
      number: addNumber
  };

  const person = users.find((user) => user.name.toLowerCase() === userObj.name.toLowerCase()
  );
  if(person){
    alert("This contact already exists")
  } else{
    userObj.name = newUser
    .split(/\s+/)
    .map((el) => el[0].toUpperCase() + el.slice(1))
    .join(" ")
  }
  createUser(userObj).then(() => {
    setNewUser("");
    setAddNumber("");
    getUsers().then((data) => setUsers(data.data))
  });
};
  
  return (
    <div className="App">
      <div className="inputForm">
      <h1 >Welcome!</h1>
      <form onSubmit={addNewUser}>
        <input
        className="textInput"
        type="text"
        placeholder="Enter your name"
        value={newUser} 
        onChange={event => setNewUser(event.target.value)}/> 
        <input
        className="textInput"
        type="text"
        placeholder="Enter your number"
        value={addNumber}
        onChange={event => setAddNumber(event.target.value)}/>
        <input className="submitInput" type="submit" value="Add User"/>
      </form>

    </div>
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
