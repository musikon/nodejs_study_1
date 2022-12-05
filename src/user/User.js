import mongoose from 'mongoose'

const User = new mongoose.Schema({
  login: { type: String, required: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v)
      },
      message: () => {
        return 'Password not secure!'
      },
    },
  },
  age: {
    type: Number,
    required: true,
    min: [4, 'Must be at least 4 years old, received {VALUE}'],
    max: [130, 'Must be no more than 130 years old, obtained {VALUE}'],
  },
})

export default mongoose.model('User', User)
