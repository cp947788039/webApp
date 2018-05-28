//order 模块路由设置
module.exports = [{
	path: '/materialFlow/materialFlow',
	name: 'materialFlow',
	meta: {
		title: '物流',
	},
	component: resolve => require(['./materialFlow.vue'], resolve)
},] 