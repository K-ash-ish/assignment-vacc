const users = require("./users")
function createUser(newUser){
    newUser.isAdmin= false;
    users.push(newUser)
}
module.exports = createUser;
