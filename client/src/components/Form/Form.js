import React, { useState } from "react";
import axios from "axios";
import BootstrapForm from "react-bootstrap/Form";
import BootstrapButton from "react-bootstrap/Button";
import "./Form.scss"



const usersServer = `http://localhost:5000/users`;


function Form(props) {
  const [users, setUsers] = useState([]);

  async function removeUser (e) {


      e.preventDefault();
      await axios
      .delete(`${usersServer}/${props.id}`)
      
      .catch(err => `Houston we have an error: ${err}`);
      
      
      
      let filteredArray = users.filter(u => u !== e.target.value);
      setUsers(filteredArray);
      

    
  }

  return (
    <>
      <BootstrapForm>
  <BootstrapForm.Group controlId="formBasicEmail">
    <BootstrapForm.Label>Email address</BootstrapForm.Label>
    <BootstrapForm.Control type="email" placeholder="Enter email" />
    <BootstrapForm.Text className="text-muted">
      We'll never share your email with anyone else.
    </BootstrapForm.Text>
  </BootstrapForm.Group>

  <BootstrapForm.Group controlId="formBasicPassword">
    <BootstrapForm.Label>Password</BootstrapForm.Label>
    <BootstrapForm.Control type="password" placeholder="Password" />
  </BootstrapForm.Group>
  <BootstrapForm.Group controlId="formBasicCheckbox">
    <BootstrapForm.Check type="checkbox" label="Check me out" />
  </BootstrapForm.Group>
  <BootstrapButton variant="primary" type="submit">
    Submit
  </BootstrapButton>
</BootstrapForm>
    </>
  );
}

export default Form;
