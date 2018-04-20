//order 模块路由设置
module.exports = [{
	path: '/customerGather/customerGather',
	name: 'customerGather',
	meta: {
		title: '我的集客',
	},
	component: resolve => require(['./customerGather.vue'], resolve)
},] 