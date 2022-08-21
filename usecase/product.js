const {Product} = require("../models")
let db =require("../models/index")



getAllProduct = async (filters) => {
    let options = {}
    if (typeof filters !== "undefined" || filters !== null) {
        options.where = filters
    }
    let product = []

    // error handling
    try{
        product = await db.product.findAll(options)
    } catch (e) {
        console.log(e)
    }

    return product
}



    let getProudctByID = async(id)=>{
        let product = null
        try {
            product =await db.product.findOne({
                where: {id:id}
                ,
                include :[
                    {model : db.category,
                    attributes: ['id', 'name']
                    }
                  ]
            })
        } catch (error) {
            console.log(error)
        }
        return product
        
    }

   let createProduct = async (product) =>{
        let is_success = false
        try {
            product = await Product.create(product)
            is_success = true
        } catch (error) {
            console.log(error)
        }
        return {
            is_success : is_success,
            product : product
        }
    }

    let updateProduct = async (product, id) =>{
        let is_success =false 
        try {
            product =await Product.update(product,{
                where: {id:id}
            })
            is_success = true
        } catch (error) {
            console.log(error)
        }
        return {
            is_success : is_success,
            product : product
        }
    }        
    let deleteProduct = async (id) =>{
        let is_success =false 
        try {
            product =await Product.destroy({
                where: {id:id}
            })
            is_success = true
        } catch (error) {
            console.log(error)
        }
        return {
            is_success : is_success,
            product : product
        }
    }        


module.exports ={getAllProduct, getProudctByID, createProduct,updateProduct,deleteProduct}