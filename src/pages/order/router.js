//order 模块路由设置
module.exports = [{
	path: '/order/orderList',
	name: 'orderList',
	meta: {
		title: '订单列表',
	},
	component: resolve => require(['./orderList.vue'], resolve)
},{
	path: '/order/orderDetails',
	name: 'orderDetails',
	meta: {
		title: '订单详情',
	},
	component: resolve => require(['./orderDetails.vue'], resolve)
},{
	path: '/order/orderPay',
	name: 'orderPay',
	meta: {
		title: '订单支付',
	},
	component: resolve => require(['./orderPay.vue'], resolve)
},] 