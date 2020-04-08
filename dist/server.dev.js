"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var db = require("./database.js"); // creates our server instance


var server = express(); // we'll talk about this later, just copy it for now

server.use(express.json());
server.post("/users", function (req, res) {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }

  var newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio
  });

  if (!req.body.name || !req.body.bio) {
    return res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  } else {
    return res.status(201).json(_objectSpread({}, newUser));
  }
});
server.get("/", function (req, res) {
  res.json({
    message: "Working :\)"
  });
});
server.get("/users", function (req, res) {
  if (!res.body) {
    return res.status(500).json({
      errorMessage: "The users information could not be retrieved."
    });
  } // don't worry about the function implementation yet, just call it.
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