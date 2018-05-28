//order 模块路由设置
module.exports = [{
	path: '/notice/notice',
	name: 'notice',
	meta: {
		title: '信息',
	},
	component: resolve => require(['./notice.vue'], resolve)
},] 