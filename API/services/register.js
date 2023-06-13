const Users = require("../models/users");

const register = async (params) => {
  try {
    const { email, username, firstName, lastName, password } = params;

    // check if email existed
    const existed = await Users.findOne({email});
    if (existed) {
      throw "User is already existed~";
    }

    // create a new user
    const newUser = {
      email,
      username,
      firstName,
      lastName,
      password
    }

    const createdUser = await Users.create(newUser);
    return {
      success: true,
      data: createdUser
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: JSON.stringify(err) || 'error'
    }
  }
}

module.exports = {
  register
}