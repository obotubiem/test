const db = require('../models/index.model')



exports.createOrderDetail = async (req, res)=>{
    const id = req.body.product_id 
    const orderProduct = await db.product.findOne({
        where : {id:id}
    })

    const data ={
        qty : req.body.qty,
        total:orderProduct.dataValues.price * req.body.qty,
        order_id : req.body.order_id,
        product_id : req.body.product_id
    }
    await db.order_detail
    .create(data)
    .then(result => {
      res.send({
        code: 200,
        message: "order Berhasil di tambahkan",
        data: result,
      });
    })
    .catch(err => {
      res.status(500).send({
        code: 500,
        message: "Gagal menambahkan data" + err,
      });
    });
}