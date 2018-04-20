//order 模块路由设置
module.exports = [{
	path: '/address/addressAdd',
	name: 'addressAdd',
	meta: {
		title: '新增地址',
	},
	component: resolve => require(['./addressAdd.vue'], resolve)
},{
	path: '/address/selectAddress',
	name: 'selectAddress',
	meta: {
		title: '选择地址',
	},
	component: resolve => require(['./selectAddress.vue'], resolve)
},] 