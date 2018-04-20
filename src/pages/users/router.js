//order 模块路由设置
module.exports = [{
	path: '/users/userCenter',
	name: 'userCenter',
	meta: {
		title: '个人中心',
	},
	component: resolve => require(['./userCenter.vue'], resolve)
},{
	path: '/users/myMessageList',
	name: 'myMessageList',
	meta: {
		title: '消息列表',
	},
	component: resolve => require(['./myMessageList.vue'], resolve)
},{
	path: '/users/messageDetails',
	name: 'messageDetails',
	meta: {
		title: '消息详情',
	},
	component: resolve => require(['./messageDetails.vue'], resolve)
},{
	path: '/users/userInfo',
	name: 'userInfo',
	meta: {
		title: '个人资料',
	},
	component: resolve => require(['./userInfo.vue'], resolve)
},{
	path: '/users/resetPassword',
	name: 'resetPassword',
	meta: {
		title: '重设密码',
	},
	component: resolve => require(['./resetPassword.vue'], resolve)
},{
	path: '/users/register',
	name: 'register',
	meta: {
		title: '注册',
	},
	component: resolve => require(['./register.vue'], resolve)
},{
	path: '/users/login',
	name: 'login',
	meta: {
		title: '登录',
	},
	component: resolve => require(['./login.vue'], resolve)
},{
	path: '/users/welcome',
	name: 'welcome',
	meta: {
		title: '启动欢迎',
	},
	component: resolve => require(['./welcome.vue'], resolve)
},] 