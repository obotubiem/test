const express = require("express")
const router = express.Router()
const admin = require('../controller/admin_product_controller')
const adminOrder = require ('../controller/order_controller')


// product
router.post('/product/add', admin.addProduct)
router.put('/product/update/:id', admin.editProduct)
router.delete('/product/delete/:id', admin.delete)



// category
router.post('/category/add', admin.addCategory)
router.delete('/category/delete/:id', admin.destroyCategory)


// order
router.get('/order/:id', adminOrder.getOrder)
router.patch('/order/update', admin.changeStatusOrder)
router.get('/order', admin.getCompletedOrder)

module.exports= router