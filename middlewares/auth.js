const Jwt = require('jsonwebtoken')

const currentUser = (req, res, next) => {
  if(!req.session.jwt){
    return res.json({
      success: false,
      error: `You must sign In~`
    })
  }

  const user = Jwt.verify(req.session.jwt, 'jwt-secret')
  req.currentUser = user;
  next()
}

const ensureSignedIn = (req, res, next) =>{
  
  if(!req.session.jwt){
    return res.json({
      success: false,
      error: `You must sign In~`
    })
  }

  next();
}

const ensureSignedOut = (req, res, next) =>{
  if(req.session.jwt){
    return res.json({
      success: false,
      error: `You already signed in~`
    })
  }

  next();
}

module.exports = {
  currentUser,
  ensureSignedIn,
  ensureSignedOut
}