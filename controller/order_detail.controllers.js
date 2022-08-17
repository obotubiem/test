const db = require('../models/index.model')

exports.createOrderDetail = async (req, res) => {
    const id = req.body.product_id
    const orderProduct = await db.product.findOne({
        where: { id: id }
    })
    const data = {
        qty: req.body.qty,
        total: orderProduct.dataValues.price * req.body.qty,
        order_id: req.body.order_id,
        product_id: req.body.product_id,
       
    }
    const stokData = {
        stok: orderProduct.dataValues.stok - data.qty
    }

    const oldStok = orderProduct.dataValues.stok

    if (oldStok < data.qty) return res.status(400).json({
        message: "stok tidak cukup",
    });

    await db.product.update(stokData, {
        where: { id: id }
    })

    db.detail
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


exports.findAll = async (req, res) => {
    db.detail.findAll().then(result => {
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

exports.findOne = async (req, res) => {
    const id = req.params.id
    db.detail.findOne({ where: { id: id } })
        .then(result => {
            res.status(200).send({
                code: 200,
                message: "ok",
                data: result

            })
        }).catch(err => {
            res.status(500).send({
                code: 500,
                message: 'Gagal retive data' + err
            })
        })
}


exports.updateOrderDetail = async (req, res)=>{
    const id = req.params.id
    const product_id = req.body.product_id
    const orderProduct = await db.product.findOne({
        where: { id: product_id }
    })
    const data = {
        qty: req.body.qty,
        total: orderProduct.dataValues.price * req.body.qty,
        order_id: req.body.order_id,
        product_id: req.body.product_id
    }
    const stokData = {
        // error
        stok: orderProduct.dataValues.stok - data.qty
    }

    const oldStok = orderProduct.dataValues.stok

    if (oldStok < data.qty) return res.status(400).json({
        message: "stok tidak cukup",
    });

    await db.product.update(stokData, {
        where: { id: product_id }
    })

    db.detail.update(data, {
        where : {id :id}
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


exports.delete = async (req, res) => {
    const id = req.params.id
    db.detail.destroy({
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