const Koa = require('koa'),
	  koaRouter = require('koa-router'),
	  json = require('koa-json'),
	  logger = require('koa-logger'),
	  koaBodyparser = require('koa-bodyparser'),
	  path = require('path'),
	  serve = require('koa-static'),
	  cors = require('koa-cors'); // 跨域需要使用

const auth = require('./routes/auth.js') // 引入auth.js
const api = require('./routes/api.js') // 引入api.js

const app = new Koa()
const router = koaRouter()

app.use(koaBodyparser())
app.use(json())
app.use(logger())
app.use(cors())

app.on('error', function (err, ctx) {
	console.log('server error', err)
})

/*router
	.get('/api', (ctx) => {
		ctx.body = {
			name:'wu',
			sex:'男'
		}
	})*/

router.get('/wu/:id/:user_id/:status', async(ctx) => {
    let url = ctx.url;
    let request = ctx.request;
    let params = ctx.params
    ctx.body = {
        url,
        request,
     	params,
    }
})
// 静态文件serve在koa-router的其他规则之上 
app.use(serve(path.resolve('../dist'))) // 开放静态文件

router.use('/auth', auth.routes()) // 在auth的路径之下
router.use('/api', api.routes()) // 这样就在api的路径之下

app.use(router.routes()) //将路由规则挂载到 Koa 上
app.listen(8889, () => {
	console.log('Koa is listening in 8889')
})

module.exports = app
