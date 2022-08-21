const { Todo } = require('../models/models')
const ApiError = require('../error/ApiError')

class TodoController {
  async create(req, res) {
    try {
      const { description } = req.body
      const todo = await Todo.create({ description, completed: false})
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
    const {id} = req.params
    const todo = await Todo.findOne(
        {
            where: {id},
        },
    )
    return res.json(todo)
}

  async delete(req, res) {
    const {id} = req.params
    await Todo.destroy({
      where: {id}
    });
    return
  }

  async update(req, res) {
    const {id} = req.params
    await Todo.update({
      where:{id}
    })
    return
  }
}

module.exports = new TodoController()