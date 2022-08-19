const express = require("express")
const router = express.Router()
const item = require('../controller/product_controller')

// product
router.get('/', item.getlistProduct)
router.get('/detail/:id', item.getOneProduct)



// category
router.get('/category', item.getlistCategory)
router.get('/category/detail/:id', item.getOneCategory)
router.get('/category/detail/list/:id', item.getOneProductByCategory)






module.exports= router