let order_uc = require('../usecase/order')
let order_status = require('../internal/constants/order')



exports.getOrder = async (req, res) => {
    let id = req.params.id
    let res_data = {
        status: 'failed',
        message: 'belum ada data',
        data: null
    }
    res_data.data = await order_uc.getPendingOrderByUserID(id)
    if (res_data.data === null) {
        return res.status(404).json(res_data)
    }
    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = order

    res.status(200).json(res_data.data)
}


exports.addOrder= async(req, res)=>{
   let order ={
        user_id:req.body.user_id,
         status : order_status.ORDER_PENDING 
       }
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let create_res = await order_uc.createOrder(order)
    if(create_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }

    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = create_res.order

    res.json(res_data)
}
