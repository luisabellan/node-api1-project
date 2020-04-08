"use strict";function ownKeys(r,e){var s=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})),s.push.apply(s,t)}return s}function _objectSpread(r){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(s,!0).forEach(function(e){_defineProperty(r,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(s)):ownKeys(s).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(s,e))})}return r}function _defineProperty(e,r,s){return r in e?Object.defineProperty(e,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[r]=s,e}var express=require("express"),db=require("./database.js"),server=express();server.use(express.json()),server.post("/users",function(e,r){if(!e.body.name||!e.body.bio)return r.status(400).json({errorMessage:"Please provide name and bio for the user."});var s=db.createUser({name:e.body.name,bio:e.body.bio});return r.status(201).json(_objectSpread({},s))}),server.get("/",function(e,r){r.json({message:"Working :)"})}),server.get("/users",function(e,r){var s=db.getUsers();r.status(200).json(s)}),server.get("/users/:id",function(e,r){var s=e.params.id,t=db.getUserById(s);t?r.json(t):r.status(404).json({message:"User not found"})}),server.put("/users/:id",function(e,r){var s=db.getUserById(e.params.id);if(s){var t=db.updateUser(s.id,{name:e.body.name||s.name});r.json(t)}else r.status(404).json({message:"User not found"})}),server.delete("/users/:id",function(e,r){var s=db.getUserById(e.params.id);s?(db.deleteUser(s.id),r.status(204).end()):r.status(404).json({message:"User not found"})}),server.listen(5e3,function(){console.log("server started at port 5000")});