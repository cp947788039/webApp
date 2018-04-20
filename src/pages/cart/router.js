//order 模块路由设置
module.exports = [{
	path: '/cart/cart',
	name: 'cart',
	meta: {
		title: '购物车',
	},
	component: resolve => require(['./cart.vue'], resolve)
},{
	path: '/cart/templateCart',
	name: 'templateCart',
	meta: {
		title: '购物车模板',
	},
	component: resolve => require(['./templateCart.vue'], resolve)
},] 