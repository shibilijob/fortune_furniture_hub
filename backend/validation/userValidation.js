import Joi from "joi";

const registerValidatorSchema = Joi.object({
    username:Joi.string().min(3).required(),
    email:Joi.string().required(),
    password:Joi.string().min(4).required(),
    role:Joi.string().valid("user","admin"),
    status:Joi.string()
})

const loginValidatorSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().min(4).required()
})

export {registerValidatorSchema, loginValidatorSchema}