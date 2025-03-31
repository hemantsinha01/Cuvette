const { ObjectId } = require("mongodb")
const bcrypt = require("bcryptjs")

const userSchema = {
  _id: ObjectId, // Automatically generated by MongoDB
  firstName: String,
  lastName: String,
  email: String, // Unique email
  password: String, // Encrypted password
  username: String, // New field for username
  category: String, // New field for selected category
  createdAt: Date,
}

/**
 * Hash the password before saving it
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

/**
 * Compare provided password with hashed password
 */
async function comparePassword(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}

module.exports = { userSchema, hashPassword, comparePassword }

