const order_uc = require('../usecase/order')
const order_status = require('../internal/constants/order')
const { create } = require('lodash')


exports.getOrder = async (req, res)=>{
    let id =req.params.id
    let res_data = {
        status: 'failed',
        message: 'belum ada data',
        data: null
    }
    res_data.data = await order_uc.getPendingOrderByUserID(id)
    if(res_data.data === null) {
        return res.status(404).json(res_data)
    }
    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = order

    res.status(200).json(res_data.data)
}


exports.createOrder = async (req, res) =>{
    let id = req.params.id
    let items = req.body.items
    let order = await order_uc.getPendingOrderByUserID(id)

    let res_data = {
        status: 'failed',
        message: 'something went wrong',
        data: null
    }

    if(order === null) {
        let create_res = await order_uc.createOrder(id, items)
        if (create_res.is_success !== true) {
           return res.status(400).json(res_data)
        }
    } else {
        await order_uc.addOrderDetails(order.id, items)
    }
    order = await order_uc.getPendingOrderByUserID(id)

    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = order

    res.json(res_data)
}

