//order 模块路由设置
module.exports = [{
	path: '/kanjia/kanjia',
	name: 'kanjia',
	meta: {
		title: '砍价',
	},
	component: resolve => require(['./kanjia.vue'], resolve)
},] 