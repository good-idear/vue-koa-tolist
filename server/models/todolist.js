const Sequelize = require('sequelize');
const db  = require('../config/db.js');

const TodolistDb = db.Todolist

const User = TodolistDb.define('list', {
	id:{ 
		type:Sequelize.INTEGER,
		autoIncrement: true, // 自增 （但是类型一定要是INTEGER）
		allowNull: false, // 非空
		primaryKey: true
	},
	user_id:{
		type:Sequelize.INTEGER,
		allowNull: false
	},
	status:{ // 事件的状态 true 完成 false代表未完成
		type:Sequelize.ENUM('true','false'),
		allowNull: false
	},
	content:{ // 事件的内容
		type:Sequelize.CHAR
	}
}, {
	freezeTableName:true
});

var user = User.sync({force:false});

/**
 * 根据url的参数 id 来查询代办事项
 */
const getTodolistById = async function (id) {
	/*const result = await user.findAll({
		where:{
			user_id:userId
		},
		attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
	})
	return result*/
	const todolist = await User.findAll({ // 查找全部的todolist
	    where: {
	      user_id: id
	    },
	    attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
  })

  return todolist // 返回数据
}
const createdTodolist = async function (data) {
	await User.create({
		user_id:data.user_id,
		content:data.content,
		status:data.status
	})
	return {status:200}
}

const removeTodolist = async function (userId, id) {
	const result = await User.destroy({
		where:{
			id,
			user_id:userId
		}
	})
	if(result === 1){ // 如果成功删除了记录，返回1，否则返回0
		return {
			status:200
		}
	}else{
		return {
			status:500,
			err:'出现错误'
		}
	}
	
}

const updateTodolist = async function(id, user_id, status) {
	let status_code = ''
	if (status === 'true') {
		status_code = 'false'
	}else{
		status_code = 'true'
	}
	const result = await User.update(
	{
		status:status_code
	},
	{
		where:{
			id,
			status,
			user_id,
		} 
	})
	
	// 这里的 返回值是一个数组 里面只有 1 数组[1]
	//return result[0]
	if(result[0] === 1){ // 如果成功删除了记录，返回1，否则返回0
		return {
			status:200
		}
	}else{
		return {
			status:500,
			err:'出现错误',
			result,
		}
	}
}

module.exports = {
	getTodolistById,
	createdTodolist,
	removeTodolist,
	updateTodolist
}

