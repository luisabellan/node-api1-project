import React from "react";
import axios from "axios";
import BootstrapCard from "react-bootstrap/Card";
import BootstrapButton from "react-bootstrap/Button";
const users = `http://localhost:5000/users`;

function Card(props) {

  

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
            onClick={(e) => {

              e.preventDefault()
 
                
                      axios
                        .delete(`${users}/${props.id}`)
                        .then(window.location.reload())
                        .catch(err => `Houston we have an error: ${err}`);

                        
                   
                  
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
