const express = require('express')
const router = express.Router()
const order_detail =require('../controller/order_detail.controllers')
const Validation = require('../validation/category/category.validation')


router.post('/',order_detail.createOrderDetail)

module.exports = router