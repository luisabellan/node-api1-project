const express = require("express");
const db = require("./database.js");

// creates our server instance
const server = express();

// we'll talk about this later, just copy it for now
server.use(express.json());

server.post("/users", (req, res) => {

  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }

  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio
  });
  return res.status(201).json({ ...newUser });
})

server.get("/", (req, res) => {
  res.json({ message: "Working :\)" });
});

server.get("/users", (req, res) => {
  // don't worry about the function implementation yet, just call it.
  // it's essentially "faking" a real database
  const users = db.getUsers();
  res.status(200).json(users);
});

server.get("/users/:id", (req, res) => {
  // our route params come into variables with the same name as the param.
  // so :id === req.params.id
  const userId = req.params.id;
  const user = db.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});


server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  // can't update a user that doesn't exist, so make sure it exists first
  if (user) {
    const updatedUser = db.updateUser(user.id, {
      // use a fallback value if no name is specified, so it doesn't empty the field
      name: req.body.name || user.name
    });

    res.json(updatedUser);
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});

server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    db.deleteUser(user.id);
    // 204 is just a successful empty response
    res.status(204).end();
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});

server.listen(5000, () => {
  console.log("server started at port 5000");
});

// HTTP Method
// URI : scheme://host_name:port/path?parameter_list
// https://www.google.com/some/document?with_params=value
