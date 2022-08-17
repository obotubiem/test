const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models/index.model') 

// db.sequelize.sync({force:false})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :true}))


app.get('/', (req, res)=>{
    res.status(200).json('server ok!!!!!!!!!!!!')
})

const categoryRouter = require('./router/category.router')
app.use('/category', categoryRouter)

const productRouter = require('./router/product.router')
app.use('/product', productRouter)

const customerRouter = require('./router/customer.router')
app.use('/customer', customerRouter)

const orderRouter = require('./router/order.router')
app.use('/order', orderRouter)

const orderDetailRouter = require('./router/order_detail.router')
app.use('/order/detail', orderDetailRouter)








app.use('/', (req, res)=>{
    res.status(404).json('page not found 404')
})

app.listen(3000,()=>{
    console.log('server runing.......')
})