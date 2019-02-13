const user = require('../models/user.js')
const bcrypt = require('bcrypt')
//const jwt = require('koa-jwt') // 引入koa-jwt, 坑 在koa2.0版本中koa-jwt不能使用使用sign等
const jwt =  require('jsonwebtoken')

const saltRounds = 10; // bcrypt加密次数
/*const getUserInfo = async function(ctx){
	const id = ctx.params; // 获取url里传过来的参数里的id
	let result = await user.getUserById(id)
	ctx.body = result;
}*/
const getUserInfo = async function(ctx){
	const id = ctx.params.id;//这里是个坑，params是一个对象，所以要用key值提取对象，否则会报错
	let result = await user.getUserById(id)
	ctx.body = result
}

// 验证用户登录
const postUserAuth = async function(ctx){
	const data = ctx.request.body // post过来的数据存在request.body里
	
	const userInfo = await user.getUserByName(data.user_name) // 根据用户名获取客户信息
	/*ctx.body = {
		
		userInfo,
	}*/
	
	if(userInfo == null){ // 用户不存在
		ctx.body={
			success:false,
			info:'用户不存在！'
		}
	}else{ // 用户存在
		if (!bcrypt.compareSync(data.password, userInfo.password)) { // 比较密码是否正确 compareSync(未加密，加密)
			ctx.body = {
				success:false,
				info:'密码错误'
			}
		}else{ // 密码正确
			const userToken = {
				name: userInfo.user_name,
				id:userInfo.id
			}
			const secret = 'vue-koa-todolist' // 指定密钥，这是之后用来判断token合法性的标志
			const token = jwt.sign(userToken, secret) // 签名
			ctx.body = {
				success:true,
				token:token,
				id:userInfo.id
			}
		}
	}
}
module.exports = {
	getUserInfo,	// 在路由层面使用 // 获取用户信息
	postUserAuth, 

}