//order 模块路由设置
module.exports = [{
	path: '/barcode/barcode',
	name: 'barcode',
	meta: {
		title: '二维码扫描',
	},
	component: resolve => require(['./barcode.vue'], resolve)
},] 