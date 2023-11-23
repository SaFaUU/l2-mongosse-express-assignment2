import { Schema, model } from 'mongoose'
import { TAdress, TFullName, TUser } from './user.interface'

const addressSchema = new Schema<TAdress>({
  city: String,
  country: String,
  street: String,
})

const fullNameSchema = new Schema<TFullName>({
  firstName: String,
  lastName: String,
})

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: Number,
      unique: true,
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
    address: addressSchema,
  },
  {
    timestamps: true,
  },
)

const UserModel = model<TUser>('User', userSchema)
export default UserModel
