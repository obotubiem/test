const express = require('express')
const router = express.Router()
const orderDetail =require('../controller/order_detail.controllers')
// const Validation = require('../validation/order/order.validation')

router.get('/all', orderDetail.findAll)
router.get('/:id', orderDetail.findOne)
router.post('/',orderDetail.createOrderDetail)
router.put('/:id',orderDetail.updateOrderDetail)
router.delete('/total/:id', orderDetail.delete)

module.exports = router