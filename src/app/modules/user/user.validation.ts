import Joi from 'joi'

const fullNameValidation = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message(
      'First Name must start with a capital letter and contain only alphabets',
    ),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Za-z]+$/)
    .message(
      'Last Name must start with a capital letter and contain only alphabets',
    ),
})
const addressValidaton = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
})
const orderValidation = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().integer().required(),
})

const userValidation = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string(),
  fullName: fullNameValidation.required(),
  age: Joi.number(),
  email: Joi.string().email(),
  isActive: Joi.bool(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidaton.required(),
  orders: orderValidation,
})

export { userValidation, orderValidation }
