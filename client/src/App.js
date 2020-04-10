import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card/Card"
import Form from "./components/Form/Form"
import "./App.scss";

function App() {
  const [users, setUsers] = useState([])
  const server = `http://localhost:5000/users`

  


  useEffect(() => {
    axios
      .get(server)
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => `Houston we have an error: ${err}`);
  }, [server]);

  console.log(users);


  return (
    <div className="App">
      <div className="cards">
        {users.map(user => {
          return (
            <Card key={user.id} user={user} name= {user.name} bio= {user.bio} id={user.id}/>
          );
        })}
      </div>
      <Form />
    </div>
  );

}

export default App;
