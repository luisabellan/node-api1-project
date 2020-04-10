import React, { useState } from "react";
import axios from "axios";
import BootstrapCard from "react-bootstrap/Card";
import BootstrapButton from "react-bootstrap/Button";
const usersServer = `http://localhost:5000/users`;

function Card(props) {
  const [users, setUsers] = useState([]);

  const removeUser = e => {
    e.preventDefault();

    axios
      .delete(`${usersServer}/${props.id}`)

      .catch(err => `Houston we have an error: ${err}`);

    window.location.reload(true);

    let filteredArray = users.filter(u => u !== e.target.value);
    setUsers(filteredArray);
  };

  return (
    <>
      <BootstrapCard key={props.user.id} className="card">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <BootstrapCard.Body>
          <BootstrapCard.Title className="name">
            {props.name}
          </BootstrapCard.Title>
          <BootstrapCard.Text className="bio">{props.bio}</BootstrapCard.Text>
          <BootstrapButton
            value={users[props.id - 1]}
            onClick={e => {
              removeUser(e);
            }}
            variant="primary"
          >
            Delete
          </BootstrapButton>
        </BootstrapCard.Body>
      </BootstrapCard>
    </>
  );
}

export default Card;
