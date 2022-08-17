const db = require('../models/index.model')

exports.createOrder = async(req, res)=>{

  const data ={
   
    customer_id : req.body.customer_id
    }
    await db.order
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

exports.updateOrder = async (req, res)=>{
    const order_id = req.params.id
    const product_id = req.body.product_id
    const orderProduct = await db.product.findOne({
     where : {id:product_id}
    })
    const data ={
        qty :req.body.qty,
        total:orderProduct.dataValues.price * req.body.qty,
        costumer_id:req.body.costumer_id,
        product_id: req.body.product_id,
        }
    db.order.update(data, {
        where : {id :order_id}
    })
    .then((result)=>{
        res.status(200).send({
            code: 200,
            message : 'Berhasi mengubah order',
            data : result
        })
    })
    .catch(err =>{
        res.status(500).send({
            code : 500,
            message : 'Gagal mengubah orderan' +err
        })
    })
}


exports.findAll = async (req, res) =>{
    db.order.findAll().then(result => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Tidak ada data",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        code: 500,
        message: "Gagal retrive data",
      });
    });
  };

  exports.delete = async (req, res) => {
    const id = req.params.id
    db.order.destroy({
        where:{
            id:id
        }
    }).then(result =>{
        res.send({
            code:200,
            message: "Succes delete data"
        })
    }).catch(err =>{
        res.status(500).send({
            code:500,
            message : "Gagal delete data"+err
        })
    })
};