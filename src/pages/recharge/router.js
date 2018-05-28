//order 模块路由设置
module.exports = [{
	path: '/recharge/recharge',
	name: 'recharge',
	meta: {
		title: '重定价',
	},
	component: resolve => require(['./recharge.vue'], resolve)
},] 