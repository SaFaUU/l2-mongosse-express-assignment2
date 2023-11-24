import { Schema, UpdateQuery, model } from 'mongoose'
import {
  TAdress,
  TFullName,
  TOrderObject,
  TUser,
  UserModel,
} from './user.interface'
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

const userSchema = new Schema<TUser, UserModel>(
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
    isActive: {
      type: Boolean,
      default: true,
    },
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
userSchema.pre('findOneAndUpdate', async function (next) {
  const data: any = this.getUpdate()
  if (data.password) {
    data.password = await bcrypt.hash(
      data.$set.password,
      Number(config.bcrypt_salt_rounds),
    )
  }
  next()
})

userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

const User = model<TUser, UserModel>('User', userSchema)
export default User
