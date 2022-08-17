const express = require('express')
const router = express.Router()
const product =require('../controller/product.controllers')
const Validation = require('../validation/prduct/product.validation')

router.get('/',product.findAll)
router.get('/:id',product.findOne)
router.get('/category/:id',product.findOne)
router.post('/',Validation.createProduct ,product.create)
router.put('/:id',Validation.createProduct, product.update)
router.delete('/:id', product.delete)

module.exports = router