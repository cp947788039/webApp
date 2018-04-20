//order 模块路由设置
module.exports = [{
	path: '/goods/goodsDetails',
	name: 'goodsDetails',
	meta: {
		title: '商品详情',
	},
	component: resolve => require(['./goodsDetails.vue'], resolve)
},] 