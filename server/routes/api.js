//import api from '../controllers/todolist.js'
const api = require('../controllers/todolist.js')
const router = require('koa-router')()


router.get('/todolist/:id', api.getTodolist) // 获取事项
/*router.get('/todolist/:id', function(ctx) {

	const id = ctx.params.id
	return ctx.body = {
		what:'wahta',
		id,
	}
})*/
router.post('/todolist', api.createTodolist) // 增加事项
router.delete('/todolist/:userId/:id', api.removeTodolist) // 删除事项
router.put('/todolist/:userId/:id/:status', api.updateTodolist) // 更新事项

module.exports = router