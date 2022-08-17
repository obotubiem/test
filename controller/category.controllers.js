const db = require('../models/index.model')


exports.create = async (req, res) => {
    const data = { name: req.body.name }
    db.category.create(data).then(result => {
        res.send({
            code: 200,
            message: "Berhasil menyimpan data",
            data: result
        });
    }).catch((err) => {
        res.status(500).send({
            message: ("Gagal menyimpan data " + err)
        })
    })
}

exports.findAll = async (req, res) => {
    db.category.findAll().then(result => {
        if (!result) {
            res.status(404).res.send({
                code: 404,
                message: 'tidak ada data'
            })
        } else {
            res.status(200).send({
                code: 200,
                message: "OK!",
                data: result
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Gagal retive data" + err
        })
    })
}

exports.findOne = async (req, res) => {
    const id = req.params.id
    db.category.findOne({
        where: { id: id }
    }).then(result => {
        res.status(200).send({
            code: 200,
            message: "OK",
            data: result
        })
    }).catch(err => {
        res.status(500).send({
            message: 'category tidak ditemukan ' + err
        })
    })
}

exports.update = async (req, res) => {
    const id = req.params.id
    data = { name: req.body.name }
    db.category.update(data, {
         where: {id: id }
        })
        .then(result => {
            res.status(200).send({
                code: 200,
                message: "berhasil mengupate category",
                data: result
            })
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message: 'Gagal mengupdate categori' + err
            })
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id
     db.category.destroy({
        where: { id: id }
    })
    
    .then(result => {
        res.status(200).send({
            code :200,
            message : 'Berhasi menghapus category'
        })
    }).catch(err =>{
        res.status(500).send({
            message : 'Gagal menghapus Category' + err
        })
    })
}