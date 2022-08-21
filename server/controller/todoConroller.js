const { Todo } = require('../models/models')
const ApiError = require('../error/ApiError')

class TodoController {
  async create(req, res) {
    try {
      const description = req.body.description || ''
      const userId = req.headers.userId

      const todo = await Todo.create({ description, userId })
      return res.json(todo)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res) {
    const todos = await Todo.findAll()
    return res.json(todos)
  }

  async getOne(req, res) {
    try {
      const id = req.params.id
      const todo = await Todo.findOne({
        where: { id },
      })
      console.log('This is my data', todo, id)
      return res.json(todo)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id
      await Todo.destroy({
        where: { id },
      })
      res.sendStatus(204)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const { description, completed } = req.body
      await Todo.update(
        { description, completed },
        {
          where: { id },
        }
      )
      res.sendStatus(204)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async markAsCompleted(req, res) {
    try {
      const id = req.params.id
      const { completed } = req.body
      await Todo.update(
        { completed },
        {
          where: { id },
        }
      )
      res.sendStatus(204)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAllCompleted(req, res) {
    try {
      const completedTodos = await Todo.findAll({
        where: {
          completed: 'true',
        },
      })
      res.json(completedTodos)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new TodoController()
