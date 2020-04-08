"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var users = [{
  id: "1",
  name: "Jane Reynolds",
  bio: "I'm from Jersey and drink tea"
}, {
  id: "2",
  name: "Luis Abellan",
  bio: "I'm from Madrid and drink coffee"
}, {
  id: "3",
  name: "Jack Smith",
  bio: "I'm from Rome and drink water"
}]; // GET

function getUsers() {
  return users;
} // GET


function getUserById(id) {
  return users.find(function (u) {
    return u.id === id;
  });
} // POST


function createUser(data) {
  var payload = _objectSpread({
    id: String(users.length + 1)
  }, data);

  users.push(payload);
  return payload;
} // PATCH


function updateUser(id, data) {
  var index = users.findIndex(function (u) {
    return u.id === id;
  });
  users[index] = _objectSpread({}, users[index], {}, data);
  return users[index];
}

function deleteUser(id) {
  users = users.filter(function (u) {
    return u.id != id;
  });
}

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};