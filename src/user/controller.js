import UserService from './service'

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async create(req, res) {
    try {
      const user = await UserService.create(req.body)
      res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async get(req, res) {
    try {
      const users = await UserService.get(req.query)
      res.json(users)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getById(req, res) {
    try {
      const user = await UserService.getById(req.params.id)
      res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req, res) {
    try {
      const user = await UserService.update(req.body)
      res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(req, res) {
    try {
      const user = await UserService.delete(req.params.id)
      res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new UserController()
