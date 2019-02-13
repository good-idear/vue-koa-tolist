const auth = require('../controllers/user.js')
//const todolist = require('../controllers/todolist.js')
const router = require('koa-router')()

router.get('/user/:id', auth.getUserInfo) // 获取用户信息 id是一个对象，如果获取出来需要key值获取

router.post('/user', auth.postUserAuth) // 验证用户

module.exports = router // 把router 的规则暴露出去，在app.js中挂载在 auth后