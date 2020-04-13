


let users = [
  { id: "1", name: "Jane Reynolds", bio: "I'm from Jersey and drink tea" },
  { id: "2", name: "Luis Abellan", bio: "I'm from Madrid and drink coffee"  },
  { id: "3", name: "Jack Smith", bio: "I'm from Rome and drink water"  }
];


// GET
function getUsers() {
  return users;
}

// GET
function getUserById(id) {
  return users.find(u => u.id === id);
}

// POST
async function createUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data
  };

  users.push(payload);
  return payload;
}

// PATCH
function updateUser(id, data) {
  const index = users.findIndex(u => u.id === id);
  users[index] = {
    ...users[index],
    ...data
  };

  return users[index];
}

function deleteUser(id) {
  users =   users.filter(u => u.id != id);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
