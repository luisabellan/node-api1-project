import React, { useState } from "react";
import axios from "axios";

import BootstrapCard from "react-bootstrap/Card";
import BootstrapButton from "react-bootstrap/Button";
const usersServer = `http://localhost:5000/users`;

function Card(props) {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(true);
  const [userToEdit, setUserToEdit] = useState([]);
  const [clicked, setClicked] = useState(false)

  async function removeUser() {
    await axios
      .delete(`${usersServer}/${props.id}`)
      .then(res => {
        console.log(res);
        setEditing(false);
        setUserToEdit({});
      })
      .catch(err => {
        console.log(err);
      });

    
  }

  const action = (e) => {
    e.preventDefault()
    setClicked(true)
    
  }

  return (
    
      <BootstrapCard key={props.user.id} onClick={(e)=>action} className="card">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <BootstrapCard.Body>
          <BootstrapCard.Title className="name">
            {props.user.name}
          </BootstrapCard.Title>
          <BootstrapCard.Text className="bio">{props.bio}</BootstrapCard.Text>
          <BootstrapButton
            onClick={e => {
              e.stopPropagation();
              removeUser();
            }}
            variant="primary"
          >
            Delete
          </BootstrapButton>
        </BootstrapCard.Body>
      </BootstrapCard>
    
  );
}

export default Card;
