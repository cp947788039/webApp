//order 模块路由设置
module.exports = [{
	path: '/user/user',
	name: 'user',
	meta: {
		title: '个人中心',
	},
	component: resolve => require(['./user.vue'], resolve)
},] 