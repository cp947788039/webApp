//order 模块路由设置
module.exports = [{
	path: '*',
	name: '404',
	meta: {
		title: '未发现该页面',
	},
	component: resolve => require(['./404.vue'], resolve)
},] 