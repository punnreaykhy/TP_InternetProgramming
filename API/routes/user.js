var express = require('express');
const auth = require('../middlewares/auth');
var router = express.Router();
const userService = require('../services/user');
const { logout } = require('../services/logout');


router.get('/all', auth.ensureSignedIn, async (req, res) => {
  const result = await userService.findAll()
  res.json(result)
})


router.get('/:id', auth.ensureSignedIn, auth.currentUser, async function (req, res, next) {
  const { id } = req.params;
  console.log(req?.currentUser);
  const result = await userService.findById(id);
  res.json(result);
})

router.post('/update-password', auth.ensureSignedIn, auth.currentUser, async function(req, res, next){
  const id = req.currentUser._id
  const {newPassword} = req.body
  const result = await userService.updatePass(newPassword, email)
  if(result.success){
    logout(req.session);
    res.clearCookie('access_token')
  }
  return res.json(result)
})
router.post('/update-user', auth.ensureSignedIn, auth.currentUser, async function(req, res){
  const id = req.currentUser._id
  const { username, firstName, lastName, email } = req.body
  try{
    const doc = await Users.findById(id);
      //update data
      doc.username = username;
      doc.firstName = firstName;
      doc.lastName = lastName;
      doc.email = email;
      await doc.save();
      res.json({ success: true, data: doc });
    } catch (error) {
      res.json({ success: false, error: error });
    }
})

router.post('/delete-user', auth.ensureSignedIn, auth.currentUser, async function(req,res){
  const id = req.currentUser._id
  const result = await userService.deleteUser(id);
  if(result.success){
      logout(req.session);
      res.clearCookie('token')
  }
  return res.json(result)
})


module.exports = router