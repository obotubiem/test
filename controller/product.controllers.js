const db = require('../models/index.model')

exports.create = async (req, res)=>{
    const data ={
        name :req.body.name,
        price:req.body.price,
        stok:req.body.stok,
        description : req.body.description,
        category_id : req.body.category_id
        }
    db.product
    .create(data)
    .then(result => {
      res.send({
        code: 200,
        message: "Berhasil menambahkan data",
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

exports.findAll = async (req, res) =>{
  db.product.findAll().then(result => {
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

exports.findOne =async(req, res)=>{
  const id = req.params.id
  db.product.findOne({
    where :{id:id},
    // include :[
    //   {model : db.category}
    // ]
  }).then(result=>{
    if(!result){
      res.status(404).send({
        code:404,
        message : 'Product tidak ditemukan'
      })
    } else {
      res.status(200).send({
        code:200,
        message : 'OK!',
        data : result
      })
    }    
  }).catch(err =>{
    res.status(500).send({
      code : 500,
      message : "Gagal retive data" + err
    })
  })
}

exports.update = async (req, res)=>{
  const id = req.params.id
    const data ={
      name :req.body.name,
      price:req.body.price,
      stok:req.body.stok,
      description : req.body.description,
      category_id : req.body.category_id
      }
      db.product.update(data ,{
        where : {id:id}
      })
      .then(result =>{
        res.status(200).send({
          code : 200,
          message : 'Product Berhasil di update',
          data : result
        })
      }).catch(err =>{
        res.status(500).send({
          code :500,
          message : "Gagal update Product" + err
        })
      })
    }

    exports.delete =async (req, res)=>{
      const id = req.params.id
      db.product.destroy({
        where:{id:id}
      })
      .then(result =>{
        res.status(200).send({
          code : 200,
          message : "Product Berhasil dihapus"
        })
      })
      .catch(err =>{
        res.status(500).send({
          code : 500,
          message : "Gagal menghapus Product" + err
        })
      })
    }