const express = require('express')
const router = express.Router()
const customer = require('../controller/customer.controllers')
const Validation = require ('../validation/customer/customer.validation')

router.get('/',customer.findAll)
router.get('/login', customer.login)
router.post('/register',Validation.createCustomer, customer.register)
router.put('/:id', Validation.createCustomer, customer.update)

module.exports = router