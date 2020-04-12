import React, { useState } from "react";
import axios from "axios";
import BootstrapForm from "react-bootstrap/Form";
import BootstrapButton from "react-bootstrap/Button";
import "./Form.scss";

const usersServer = `http://localhost:5000/users/`;

function Form(props) {

  const[users, setUsers] = useState([])


  const[nameInput, setNameInput] = useState("")
  const[bioInput, setBioInput] = useState("")
  const[userToAdd, setUserToAdd] = useState({
      name: "",
      bio: ""
  })


  async function addUser(e) {
    e.preventDefault();

     axios
      .post(`${usersServer}`, {
          name: userToAdd.name,
          bio: userToAdd.bio
      })
      .then(res => {
        console.log(res);
        setUserToAdd(userToAdd);

      })


      .catch((err) => `Houston we have an error: ${err}`);
      window.location.reload()


  }
const onChangeBio = (e) =>{
    e.preventDefault()
    setBioInput(e.target.value)
    console.log("bio input: ", bioInput)

}
const onChangeName = (e) => {
    e.preventDefault()
    setNameInput(e.target.value)
    console.log("name input: ", nameInput)

}

  const addUser = (e,userToAdd) => {
      e.preventDefault()

       axios
        .post(usersServer, userToAdd)
        .then(res=>{
            console.log(res)
            setUserToAdd(userToAdd)

        })
        .catch(err=>{
            console.log(err)
        })
       // window.location.reload()
    }




  return (
    <>
      <BootstrapForm className="form">
        <BootstrapForm.Group controlId="formBasicEmail">
          <BootstrapForm.Label className="name">Name:</BootstrapForm.Label>
          <BootstrapForm.Control type="text" onChange={onChangeName} name="name" placeholder="Enter your name" />
         {/*  <BootstrapForm.Text className="text-muted">

          </BootstrapForm.Text> */}
        </BootstrapForm.Group>

        <BootstrapForm.Group controlId="formBasicPassword">
          <BootstrapForm.Label className="name">Bio:</BootstrapForm.Label>
          <BootstrapForm.Control type="text" onChange={onChangeBio}  name="bio" placeholder="Enter your bio" />
        </BootstrapForm.Group>
   {/*      <BootstrapForm.Group controlId="formBasicCheckbox">
          <BootstrapForm.Check type="checkbox" label="Check me out" />
        </BootstrapForm.Group> */}
        <BootstrapButton onClick={addUser} variant="primary" type="submit">
          Add User
        </BootstrapButton>
      </BootstrapForm>
    </>
  );
}

export default Form;
