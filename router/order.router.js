const express = require('express')
const router = express.Router()
const order =require('../controller/orders.controllers')
const Validation = require('../validation/order/order.validation')

router.get('/', order.findAll)
router.get('/:id', order.findOne)
router.post('/', order.createOrder)
router.put('/:id',Validation.createOrder, order.updateOrder)
router.delete('/:id', order.delete)

module.exports = router