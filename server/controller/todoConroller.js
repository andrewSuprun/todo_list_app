const { Todo } = require('../models/models')
const ApiError = require('../error/ApiError')

class TodoController {
  async create(req, res) {
    try {
      const  description  = req.body.description || '';
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
    const id = req.params.id
    const todo = await Todo.findOne({
      where: { id },
    })
    console.log('This is my data', todo, id)
    return res.json(todo)
  }

  async delete(req, res) {
    const id = req.params.id
    await Todo.destroy({
      where: { id }
    })
    res.sendStatus(204)
  }

  async update(req, res) {//catch e
    const id = req.params.id
    const { description, completed} = req.body
    await Todo.update({description, completed},
      {
        where: { id }
      }
    )
    res.sendStatus(204)
  }

  async markAsCompleted(req, res) {
    const id = req.params.id
    const { completed } = req.body
    await Todo.update({completed},
      {
        where: {id}
      }
    )
    res.sendStatus(204)
  }

  async getAllCompleted(req, res) {
   const completedTodos = await Todo.findAll({
      where: {
        completed: "true"
      }
    })
    res.json(completedTodos)
  }
}

module.exports = new TodoController()
