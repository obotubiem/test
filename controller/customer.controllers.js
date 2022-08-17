const db = require('../models/index.model');



exports.findAll = async (req, res) => {
    db.customer.findAll().then(result => {
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



exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const checkEmail =await db.customer.findOne({
        where :{email:email}
    })
    const checkAccount =await db.customer.findOne({
        where :{
            email:email,
            password:password
        }
    })
    
    if(!checkEmail) return res.status(400).json({
        message: "email belum terdaftar",
      });
      if(!checkAccount) return res.status(400).json({
        message: "email atau password salah",
      });
    
    db.customer.findOne().then(result =>{
         res.send({
              code:200,
              message: 'login berhasil',
              data :result
          })
      }) .catch(err =>{
          res.status(500).send({
              code:500,
              message: 'Gagal retrive data' + err
          })
      })
  }

  


exports.register = async (req, res) => {
    const data = { 
    username = req.body.username,
    name = req.body.name,
    email = req.body.email,
    password = req.body.password,
    confrimPassword = req.body.confrimPassword,
    phone = req.body.phone,
    } = req.body
  
    if (password !== confrimPassword)
      return res.status(400).json({
        message: "password dan confirm password tidak sama",
      });
  
    const duplicate =await db.customer.findOne({
        where :{
            email:email,
            password:password
        }
    })
  
    if (duplicate)
      return res.status(400).json({
        message: "email sudah terdaftar",
      });
     
      db.customer
      .create(data)
      .then(result => {
        res.send({
          code: 200,
          message: "Register Berhasil",
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
  
  exports.update = async (req, res)=>{
    const id = req.params.id
    const data = { 
      username = req.body.username,
      name = req.body.name,
      email = req.body.email,
      password = req.body.password,
      confrimPassword = req.body.confrimPassword,
      phone = req.body.phone,
      } = req.body

    db.customer.update(data , {
      where : {id:id}
    }).then(result =>{
      res.status(200).send({
        code : 200,
        message : 'Profil Berhasil di Update',
        data : result
      })
    }).catch(err =>{
      res.status(500).send({
        message : 'Gagal Update Profil' + err
      })
    })
  }