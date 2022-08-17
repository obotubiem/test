const Joi =require('joi')

const schema = {
    create: Joi.object({
        name:Joi.string().max(150).required(),
        price: Joi.number().required(),
        stok: Joi.number().required(),
        description : Joi.string().max(5000).allow(''),
        category_id: Joi.number().required(),
       
    })
}


module.exports = schema;