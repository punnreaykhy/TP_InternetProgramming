var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { signInSchema, signUpSchema } = require('../schemas');
var router = express.Router();
const { login } = require('../services/login')
const { register } = require('../services/register');
const { createASessionToken } = require('../services/utils');
const userService = require('../services/user');
const { logout } = require('../services/logout');


router.get('/user/:id', auth.ensureSignedIn, auth.currentUser, async function (req, res, next) {
  const { id } = req.params;
  console.log(req?.currentUser);
  const result = await userService.findById(id);
  res.json(result);
})

router.post('/logout', auth.ensureSignedIn, async (req, res) => {
  const result = logout(req.session);
  return res.json(result);
})

router.post('/login', auth.ensureSignedOut, joiValidation(signInSchema), async (req, res, next) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  req.session.jwt = result?.data?.token

  res.json(result);
})

router.post('/register', auth.ensureSignedOut, joiValidation(signUpSchema), async (req, res, next) => {
  const createdUser = await register(req.body)
  res.json(createdUser);
})

router.get('/me', auth.ensureSignedIn, auth.currentUser, async function (req, res, next) {
  const { currentUser } = req;
  const result = await userService.findById(currentUser?._id);
  res.json(result);
})


router.post('/update-password', auth.ensureSignedIn, auth.currentUser, async function(req, res, next){
  const email = req.currentUser.email
  const param = req.body;
  const {newPassword} = param
  const result = await userService.updatePass(newPassword, email)
  if(result.success){
    logout(req.session);
    res.clearCookie('access_token')
  }
  return res.json(result)
})
router.post('/update-user', auth.ensureSignedIn, auth.currentUser, async function(req, res){
  const email = req.currentUser.email
  const param = req.body;
  const {newEmail} = param
  const result = await userService.updateUser(newEmail, email)
  if(result.success){
    logout(req.session);
    res.clearCookie('access_token')
  }
  return res.json(result)
})
router.post('/delete-user', auth.ensureSignedIn, auth.currentUser, async function(req,res){
  const email = req.currentUser.email
  const result = await userService.deleteUser(email);
  if(result.success){
      logout(req.session);
      res.clearCookie('token')
  }
  return res.json(result)
})


module.exports = router