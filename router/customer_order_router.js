const express = require('express')
const router = express.Router()
const order =require('../controller/order_controller')

router.post('/order/add', order.addOrder)
// router.post('/order/add/detail/:id', order.addDetailOrder)
router.patch ('/order/sumbit/:id', order.changeStatus)

module.exports =router