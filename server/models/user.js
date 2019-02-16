const Sequelize = require('sequelize');
const db  = require('../config/db.js');
const userModel = '../schema/user.js'; // 引入 user 表结构

const TodolistDb = db.Todolist // 引入数据库
/**
 * 这里的import不可用
 */
//const User = TodolistDb.import(userModel) //用sequelize 的import方法引入表结构，实例化User
//创建 model
var User = TodolistDb.define('user',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true
	},
	user_name:{
		type:Sequelize.STRING,

	},
	password:{
		type:Sequelize.STRING
	}
},{
	// 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
	freezeTableName:true 
});
// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var user = User.sync({force:false});


const getUserById = async function (id) {
	const userInfo = await User.findOne({
		where: {
			id:id
		}
	})
	return userInfo
}
/**
 * 获取用户信息通过用户名
 * 
 */
const getUserByName = async function (name){
	//return {name:'name',user_name:name+'123'}
	console.log(name)
	const userInfo = await User.findOne({
		where:{
			user_name:name
		}
	})
	return userInfo
}
module.exports = {
	getUserById, // 导出getUserById的方法，将会在controller里调用
	/*addUser,
	findById*/
	getUserByName,
}