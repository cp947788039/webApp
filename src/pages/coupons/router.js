//order 模块路由设置
module.exports = [{
	path: '/coupons/coupons',
	name: 'coupons',
	meta: {
		title: '优惠券',
	},
	component: resolve => require(['./coupons.vue'], resolve)
},] 