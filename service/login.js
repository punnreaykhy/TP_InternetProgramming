const users = require('../models/users')
const {decryptData} = require('../config/encrypt')

const login = async (email, password) => {
    try {
        //check email then check password and give difference
        var existed = await users.findOne({email})
        if(!existed){
            throw "Email is incorrected."
        } 
        else if(!decryptData(password,existed.password)){
            throw "Password is incorrected."
        }
        return {
            success: true,
            data: existed
        }
    } catch (err) {
        return {
            success: false,
            err: err
        }
    }
}

module.exports = {
    login
}