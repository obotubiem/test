const express = require('express')
const morgan = require('morgan')
const app = express()

const host = 'localhost'
const port = 3000

const authRouter = require('./router/auth_router')


app.use(morgan('combined'))
app.use(express.json())

app.get('/',(req, res)=>{
    res.json({
        host: host,
        port: port
    })
})

app.use('/', authRouter)




app.listen(port, host, () => {
    console.log(`server running on: http://${host}:${port}`)
})