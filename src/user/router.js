import Router from 'express'
import UserController from './controller'

const router = new Router()

router.get('/users', UserController.get)
router.get('/users/:id', UserController.getById)
router.post('/users', UserController.create)
router.put('/users', UserController.update)
router.delete('/users/:id', UserController.delete)

export default router
