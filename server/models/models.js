const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true}
})

const Todo = sequelize.define('todo', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  description: { type: DataTypes.STRING},
  completed: { type: DataTypes.STRING}
} )

User.hasMany(Todo)
Todo.belongsTo(User)

module.exports = {
  User,
  Todo,
}