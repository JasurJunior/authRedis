import mongoose from 'mongoose'

export async function connectFun() {
  try {
    await mongoose.connect(
      'mongodb+srv://Jasur:1234@cluster0.nyfri.mongodb.net/avtorizatsiya?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    )
    console.log('db connected...')
  } catch (error) {
    console.log(error)
  }
}
