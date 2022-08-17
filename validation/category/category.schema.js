const Joi =require('joi')

const schema = {
    create: Joi.object({
        name: Joi.string().max(255).required(),    
    })
}


module.exports = schema;