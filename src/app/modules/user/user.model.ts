import { Schema, model } from 'mongoose'
import { TAdress, TFullName, TOrderObject, TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const addressSchema = new Schema<TAdress>({
  city: String,
  country: String,
  street: String,
})

const fullNameSchema = new Schema<TFullName>({
  firstName: String,
  lastName: String,
})
const orderSchema = new Schema<TOrderObject>({
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
})

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: Number,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: fullNameSchema,
    age: Number,
    email: {
      type: String,
    },
    isActive: Boolean,
    hobbies: {
      type: [String],
    },
    address: {
      type: addressSchema,
    },
    orders: {
      type: [orderSchema],
    },
  },
  {
    timestamps: true,
  },
)
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})
userSchema.methods.toJson = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

const UserModel = model<TUser>('User', userSchema)
export default UserModel
