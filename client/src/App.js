import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card/Card";
import Form from "./components/Form/Form";

import "./App.scss";

function App() {
  const [users, setUsers] = useState([]);
  const server = `http://localhost:5000/users`;

  const [clicked, setClicked] = useState(true)
  
  const[nameInput, setNameInput] = useState("")
  const[bioInput, setBioInput] = useState("")
  const [adding, setAdding] = useState(true);
  const [editing, setEditing] = useState(false);
  const[userToAdd, setUserToAdd] = useState({
      name: "",
      bio: ""
  })
  const[userToEdit, setUserToEdit] = useState({
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


  async function updateUser(e, user) {
    e.preventDefault();

    
     axios
      .put(`${server}/${userToEdit.id}`, {
          name: userToEdit.name,
          bio: userToEdit.bio
      })
      .then(res => {
        console.log(res);
        setUserToEdit(userToEdit);

      })


      .catch((err) => `Houston we have an error: ${err}`);


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
              bio={user.bio}
              id={user.id}
              clicked={clicked}
            />
          );
        })}
      </div>
      <div className="form">
      
      
        {adding && (

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
      <div className="form">
      
      
      {!editing && (

    <form className="myForm" onSubmit={updateUser}>
        <legend>update user</legend>
        <label>
          name:
          <input
            onChange={e =>
              setUserToEdit({
                 ...userToEdit, 
                name: e.target.value
              },
              console.log(userToEdit))}
            
            value={userToEdit.user}
          />
        </label>
        <label>
          bio:
          <input
            onChange={e =>

              setUserToEdit({
                ...userToEdit,
                 bio: e.target.value
              },
              console.log(userToEdit))
            }
            value={userToEdit.bio}
          />
        </label>
        <div className="button-row">
          <button  type="submit">Update</button>
        </div>
      </form>
    )} 
    </div>


    </div>
  );
}

export default App;
