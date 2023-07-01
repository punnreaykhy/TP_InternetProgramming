var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { } = require('../schemas');
var router = express.Router();
const priceService = require('../services/price');

// all itens
router.get('/all', async (req, res) => {
  const result = await priceService.findAll()
  res.json(result)
})

router.get('/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  res.json({});
})

router.post('/create', auth.ensureSignedIn, async (req, res) => {
  const { product, price, source } = req.body;
  const result = await priceService.create({ product, price, source })
  res.json(result);
})


router.post('/update/:id', auth.ensureSignedIn, async (req, res, next) => {
  const {price, source} = req.body
  const {id} = req.params
  const result = priceService.update({id, price, source})
  res.json(result)
})

router.post('/delete/:id', auth.ensureSignedIn, async (req, res, next) => {
  const {id} = req.params
  const result = priceService.remove(id)
  res.json(result);
})

module.exports = router