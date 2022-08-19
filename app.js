const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const host = 'localhost'
const port = 3000

const authRouter = require('./router/auth_router')
const productRouter = require('./router/product_router')

const adminRouter = require('./router/admin_router')

// app.use(bodyParser.json())
app.use(express.json())
// app.use(bodyParser.urlencoded({extended :true}))
app.use(morgan('combined'))


// const db = require('./models/index') 

// db.sequelize.sync({force:false})

app.get('/',(req, res)=>{
    res.json({
        host: host,
        port: port
    })
})

app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/admin', adminRouter)




app.listen(port, host, () => {
    console.log(`server running on: http://${host}:${port}`)
})