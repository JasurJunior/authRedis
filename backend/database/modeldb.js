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
const googleSxema = new Schema({
  name: String,
  foto: String,
  email: String,
})

//Export the model
export default {
  modelUser: model('User', userSchema),
  modelGoogle: model('google', googleSxema),
}
