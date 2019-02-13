// db.js
// 初始化 Sequelize 和数据库的连接

const Sequelize = require('sequelize')
// 采用 url 的方式连接
const Todolist = new Sequelize('todolist', 'root', '123456',{
	host:'localhost',
	dialect:'mysql',
	pool:{
		max:5,
		min:0,
		idle:10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
	},
	define: {
		timestamps: false // 取消Sequelize 自动给数据表加入时间
	}
})

module.exports = {
	Todolist	// 暴露出去给 models 层使用（封装调用数据库的方法）
}