//order 模块路由设置
module.exports = [{
	path: '/start/start',
	name: 'start',
	meta: {
		title: '启动页',
	},
	component: resolve => require(['./start.vue'], resolve)
},] 