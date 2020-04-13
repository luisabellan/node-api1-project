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
  const [adding, setAdding] = useState(true);
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

  




  return (
    <>
    {/*   <BootstrapForm className="form">
        <BootstrapForm.Group controlId="formBasicEmail">
          <BootstrapForm.Label className="name">Name:</BootstrapForm.Label>
          <BootstrapForm.Control type="text" onChange={onChangeName} name="name" placeholder="Enter your name" />
       
        </BootstrapForm.Group>

        <BootstrapForm.Group controlId="formBasicPassword">
          <BootstrapForm.Label className="name">Bio:</BootstrapForm.Label>
          <BootstrapForm.Control type="text" onChange={onChangeBio}  name="bio" placeholder="Enter your bio" />
        </BootstrapForm.Group>

        <BootstrapButton onClick={addUser} variant="primary" type="submit">
          Add User
        </BootstrapButton>
  </BootstrapForm> */}


      {/* stretch - build another form here to add a user */}
      
      {!adding && (

      <form className="myForm" onSubmit={addUser}>
          <legend>add user</legend>
          <label>
            user name:
            <input
              onChange={e =>
                setUserToAdd({
                   ...userToAdd, 
                   user: e.target.value })}
              
              value={userToAdd.user}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setUserToAdd({
                  ...userToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={userToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button  type="submit">add</button>
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
