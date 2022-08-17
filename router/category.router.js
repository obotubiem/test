const express = require('express')
const router = express.Router()
const category =require('../controller/category.controllers')
const Validation = require('../validation/category/category.validation')


router.get('/', category.findAll)
router.get('/:id', category.findOne)
router.post('/',Validation.createCategory ,category.create)
router.put('/:id',Validation.createCategory, category.update)
router.delete('/:id', category.delete)

module.exports = router