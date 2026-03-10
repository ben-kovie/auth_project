import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"

const userDB = mongoose.connection.useDb("userDB")

const UserSchema = new mongoose.Schema(
{
  firstName: {
    type: String,
    required: [true, "Please insert firsName"],
    trim: true
  },

  lastName: {
    type: String,
    required: [true, "Please insert lastName"],
    trim: true
  },

  email: {
    type: String,
    required: [true, "Please insert a valid email address"],
    trim: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: [true, "please insert a valid password"],
    minlength: 8,
    select: false
  },

  passwordResetToken: String,
  passwordResetExpires: Date
},
{
  timestamps: true
}
)

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return

  this.password = await bcrypt.hash(this.password, 12)
})

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.passwordResetExpires = Date.now() + 15 * 60 * 1000

  return resetToken
}

export const Users = userDB.model("Users", UserSchema)