var express = require('express');
const auth = require('../middlewares/auth');
var router = express.Router();
const userService = require('../services/user');
const { logout } = require('../services/logout');


router.get('/:id', auth.ensureSignedIn, auth.currentUser, async function (req, res, next) {
  const { id } = req.params;
  console.log(req?.currentUser);
  const result = await userService.findById(id);
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