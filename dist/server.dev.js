"use strict";

var express = require("express");

var db = require("./database.js"); // creates our server instance


var server = express(); // we'll talk about this later, just copy it for now

server.use(express.json());
server.get("/", function (req, res) {
  res.json({
    message: "Working :\)"
  });
});
server.get("/users", function (req, res) {
  // don't worry about the function implementation yet, just call it.
  // it's essentially "faking" a real database
  var users = db.getUsers();
  res.status(200).json(users);
});
server.get("/users/:id", function (req, res) {
  // our route params come into variables with the same name as the param.
  // so :id === req.params.id
  var userId = req.params.id;
  var user = db.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});
server.post("/users", function (req, res) {
  // we don't want to create a user with an empty name, so check for it
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }

  var newUser = db.createUser({
    name: req.body.name
  }); // 201 status code means a resource was successfully created

  res.status(201).json(newUser);
});
server.put("/users/:id", function (req, res) {
  var user = db.getUserById(req.params.id); // can't update a user that doesn't exist, so make sure it exists first

  if (user) {
    var updatedUser = db.updateUser(user.id, {
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
server["delete"]("/users/:id", function (req, res) {
  var user = db.getUserById(req.params.id);

  if (user) {
    db.deleteUser(user.id); // 204 is just a successful empty response

    res.status(204).end();
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});
server.listen(5000, function () {
  console.log("server started at port 5000");
}); // HTTP Method
// URI : scheme://host_name:port/path?parameter_list
// https://www.google.com/some/document?with_params=value