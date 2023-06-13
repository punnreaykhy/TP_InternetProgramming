var express = require('express');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();
const categoryService = require('../services/category');

// all users
router.get('/all', async (req, res) => {
  const result = await categoryService.findAll();
  res.json(result);
})
// Categorized items
router.get('/categorized-items', async (req, res) => {
  const result = await categoryService.findCategorizedItems()
  res.json(result);
})

router.get('/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await categoryService.findById(id)
  res.json(result);
})

router.post('/create', auth.ensureSignedIn, async (req, res, next) => {
  const {name, desc, imageUrl } = req.body
  const result = await categoryService.create({name, desc, imageUrl});
  res.json(result);
})

router.post('/update/:id', auth.ensureSignedIn, async (req, res, next) => {
  const { name, desc, imageUrl } = req.body
  const { id } = req.params
  console.log(id);
  const result = await categoryService.update(id, {name, desc, imageUrl})
  res.json(result);
})

router.post('/delete/:id', auth.ensureSignedIn, async (req, res, next) => {
  const { id } = req.params
  const result = await categoryService.remove(id)
  res.json(result);
})

module.exports = router