//order 模块路由设置
module.exports = [{
	path: '/withdraw/withdraw',
	name: 'withdraw',
	meta: {
		title: '撤消',
	},
	component: resolve => require(['./withdraw.vue'], resolve)
},] 