const logout = (session) => {
    try{
        session.destroy();
        return {
            success: true,
            data: "Logout successfully"
        }
    }catch(err){
        return{
            success: false,
            err: err
        }
    }

}

module.exports = {
    logout
}