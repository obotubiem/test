const Joi =require('joi')

const schema = {
    create: Joi.object({
        qty:Joi.number().required(),
        customer_id: Joi.number().required(),
        product_id : Joi.number().required(),
       
    })
    .options({allowUnknown: true})
}


module.exports = schema;