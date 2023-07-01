const Users = require("../models/users")
const { encryptData } = require('../configs/encrypt');

const findById = async (id) => {
  try {
    const user = await Users.findById(id);
    return {
      success: true,
      data: user
    };
  } catch (err) {
    return {
      success: false,
      error: err || 'error'
    }
  }
}

const findByOne = async (email) => {
  try{
      const User = await Users.findOne({email});
      return User
  }catch(err){
      throw('user invalid')
  }
}

const updatePass = async (newPassword, email) => {
  try{
      const hash = await encryptData(newPassword)
      await Users.findOneAndUpdate({email}, {"password":hash})
      const user = await Users.findOne({email})
      return {
          success: true,
      }
  }catch(err){
      throw('update err', err)
  }
}

const updateUser = async (newInfo, _id) => {
  try{
      await Users.findOneAndUpdate({email}, {"email":newInfo})
      const user = await Users.findOne({email})
      return {
          success: true,
          data: user
      }
  }catch(err){
      throw('update err', err)
  }
}
const deleteUser = async (_id) => {
  try{
      const user = await Users.findOneAndDelete({_id})
      
      return {
          success: true
      }
  }catch(err){
      throw('delete err', err)
  }
}


module.exports = {
  findById,
  findByOne,
  updatePass,
  updateUser,
  deleteUser
}