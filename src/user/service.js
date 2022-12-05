import User from './User'

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async create(user) {
    const createdUser = await User.create(user)
    return createdUser
  }

  // eslint-disable-next-line class-methods-use-this
  async get() {
    const users = await User.find()
    return users
  }

  // eslint-disable-next-line class-methods-use-this
  async getById(id) {
    if (!id) {
      throw new Error('Id is not defined')
    }
    const user = await User.findById(id)
    return user
  }

  // eslint-disable-next-line class-methods-use-this
  async update(user) {
    // eslint-disable-next-line no-underscore-dangle
    const id = user._id
    if (!id) {
      throw new Error('Id is not defined')
    }
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
    return updatedUser
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(id) {
    if (!id) {
      throw new Error('Id is not defined')
    }
    const user = await User.findByIdAndDelete(id)
    return user
  }
}

export default new UserService()
