import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card/Card";
import Form from "./components/Form/Form";

import "./App.scss";

function App() {
  const [users, setUsers] = useState([]);
  const server = `http://localhost:5000/users`;
  
  const[nameInput, setNameInput] = useState("")
  const[bioInput, setBioInput] = useState("")
  const [adding, setAdding] = useState(false);
  const[userToAdd, setUserToAdd] = useState({
      name: "",
      bio: ""
  })

  async function addUser(e) {
    e.preventDefault();

     axios
      .post(`${server}`, {
          name: userToAdd.name,
          bio: userToAdd.bio
      })
      .then(res => {
        console.log(res);
        setUserToAdd(userToAdd);

      })


      .catch((err) => `Houston we have an error: ${err}`);
      // window.location.reload()


  }



  useEffect(() => {
    axios
      .get(server)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => `Houston we have an error: ${err}`);
  });

  //console.log(users);

  return (
    <div className="App">
      <div className="cards">
        {users.map(user => {
          return (
            <Card
              key={user.id}
              user={user}
              users={users}
              name=                                                                                                                                                                                                                                                                                                                                                                                                                       {user.name}
              bio={user.bio}
              id={user.id}
            />
          );
        })}
      </div>
      <div className="form">
      
      
        {!adding && (

      <form className="myForm" onSubmit={addUser}>
          <legend>add user</legend>
          <label>
            user name:
            <input
              onChange={e =>
                setUserToAdd({
                   ...userToAdd, 
                  name: e.target.value
                },
                console.log(userToAdd))}
              
              value={userToAdd.user}
            />
          </label>
          <label>
            bio:
            <input
              onChange={e =>
                setUserToAdd({
                  ...userToAdd,
                   bio: e.target.value
                },
                console.log(userToAdd))
              }
              value={userToAdd.bio}
            />
          </label>
          <div className="button-row">
            <button  type="submit">add</button>
          </div>
        </form>
      )} 
      </div>
    </div>
  );
}

export default App;
