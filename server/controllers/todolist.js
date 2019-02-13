const todolistApi = require('../models/todolist.js')
// 获取代办事项
const getTodolist = async function (ctx) {
	const id = ctx.params.id
	const result = await todolistApi.getTodolistById(id)
	ctx.body = result
}
// 创建代办事项
const createTodolist = async function (ctx) {
	const data = ctx.request.body
	result = await todolistApi.createdTodolist(data)
	ctx.body = result
}
// 移除代办事项
const removeTodolist = async function (ctx) {
	const userId = ctx.params.userId
	const id = ctx.params.id
	const result = await todolistApi.removeTodolist(userId, id)
	ctx.body = result
	//ctx.body = {userId,id,}
}
// 更新代办事项
const updateTodolist = async function (ctx) {
	const userId = ctx.params.userId
	const id = ctx.params.id
	const status = ctx.params.status
	const result = await todolistApi.updateTodolist(id, userId, status)
	ctx.body = result
}

module.exports = {
	getTodolist, 
	createTodolist,
	removeTodolist,
	updateTodolist
}
