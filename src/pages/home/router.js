//order 模块路由设置
module.exports = [{
	path: '/',
	name: 'index',
	meta: {
		title: '首页',
	},
	component: resolve => require(['./index.vue'], resolve)
},] 