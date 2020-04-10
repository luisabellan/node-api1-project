import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './App.scss';

function App() {

  const [users, setUsers] = useState([])
  const server = `http://localhost:5000/users`

  useEffect(() => {
    axios
      .get(server)
      .then(res => setUsers(res.data))
      .catch(err => `Houston we have an error: ${err}`);
  }, [server]);

  console.log(users)
  return (
    <div className="App">
    {users.map(user => {
      return(
         <Card key={user.id} style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.bio}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      )
    })

    }
     
    </div>
  );
}

export default App;
