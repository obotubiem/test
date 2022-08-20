const express = require('express')
const router = express.Router()
const order =require('../controller/order_controller')

router.post('/order/add', order.addOrder)


module.exports =router