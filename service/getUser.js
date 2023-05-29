const users = require("../models/users")

const getUser = async (userId) => {
    try{
        const user = await users.findById(userId);
        if(!user){
            return{
                success: false,
                err: "Id is invalid"
            }
        }
        return{
            success: true,
            data: user
        }
    }catch(err){
        return{
            success: false,
            err: err
        }
    }
}

module.exports = {
    getUser
}