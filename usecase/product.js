

let {Product, product} = require("../models")
let db =require("../models/index")



  let  getAllProduct = async () =>{
        let product=[]
         try {
            product =  Product.findAll({
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


    let getProudctByID = async(id)=>{
        let product = null
        try {
            product =await Product.findOne({
                where: {id:id},
                include :[
                    {model : db.category,
                    attributes: ['id', 'name']
                    }
                  ]
            })
        } catch (error) {
            console.log(error)
        }
        return {
            product : product
        }
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