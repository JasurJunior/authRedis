import pkg from 'mongoose'
const { Schema, model } = pkg

// Declare the Schema of the Mongo model
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

//Export the model
export default model('User', userSchema)
