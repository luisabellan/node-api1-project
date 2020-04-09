"use strict";function ownKeys(r,e){var s=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})),s.push.apply(s,t)}return s}function _objectSpread(r){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(s,!0).forEach(function(e){_defineProperty(r,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(s)):ownKeys(s).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(s,e))})}return r}function _defineProperty(e,r,s){return r in e?Object.defineProperty(e,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[r]=s,e}var express=require("express"),db=require("./database.js"),server=express();server.use(express.json()),server.use(cors()),server.post("/users",function(e,r){if(!e.body.name||!e.body.bio)return r.status(400).json({errorMessage:"Please provide name and bio for the user."});var s=db.createUser({name:e.body.name,bio:e.body.bio});return e.body.name&&e.body.bio?r.status(201).json(_objectSpread({},s)):r.status(500).json({errorMessage:"There was an error while saving the user to the database"})}),server.get("/",function(e,r){r.json({message:"Working :)"})}),server.get("/users",function(e,r){var s=db.getUsers();if(r.status(200).json(s),!s)return r.status(500).json({errorMessage:"The users information could not be retrieved."})}),server.get("/users/:id",function(e,r){var s=e.params.id,t=db.getUserById(s);t||r.status(404).json({message:"The user with the specified ID does not exist."}),r.json(t),t||r.status(500).json({errorMessage:"The user information could not be retrieved."})}),server.put("/users/:id",function(e,r){var s=db.getUserById(e.params.id);s||r.status(404).json({message:"The user with the specified ID does not exist."}),e.body.name&&e.body.bio||r.status(400).json({errorMessage:"Please provide name and bio for the user."});var t=db.updateUser(s.id,{name:e.body.name||s.name,bio:e.body.bio||s.bio});t.name===s.name||t.bio===s.bio?r.status(500).json({errorMessage:"The user information could not be modified."}):r.status(200).json(t)}),server.delete("/users/:id",function(e,r){var s=db.getUserById(e.params.id);return s?(db.deleteUser(s.id),r.status(204).end()):(r.status(404).json({message:"The user with the specified ID does not exist."}),s.id?r.status(500).json({errorMessage:"The user could not be removed"}):void 0)}),server.listen(5e3,function(){console.log("server started at port 5000")});