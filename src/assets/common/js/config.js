/*-------------------------------------------后台配置------------------------------------------------*/
module.exports = {
	//登陆页面 
	loginUrl: "/login.html?sourceurl=" + encodeURIComponent(location.href),

	//登陆成功后需要跳转到的页面                                                       
	homeUrl: "/",

	//根接口
	baseApi: "/",

	//ajax 请求超时时间
	ajaxtimeout: 12000,

	//发送验证码时间间隔
	msgTime: 60,

	//隐藏显示时间
	containerShowTime: 10,

	//pagesize 分页数量
	pageSize: 10,

	// 七牛云根链接地址
	qiNiuBaseUrl: 'http://oc3xj63bg.bkt.clouddn.com/',

	// 图片地址
	imgBaseUrl: 'http://img.central.morning-star.cn/',

	// 初始滚动状态
	scrollbegin: true,

	//滚动加载更多数据底部距离
	bottomTop: 350,

	//底部导航个人中心地址
	userUrl:"/user.html#!/index?type='afu'", 

	//底部活动链接
	activityUrl:'/activity.html#!/index',
	
	//底部vip图标链接
	goCodeUrl:'/user-card.html?#!/shake',

	// 腾讯地图的key
	qqMapKey:'YH6BZ-UT53D-36Z4E-HNCI6-656VJ-F3BVS',

	// 腾讯地图项目名
	referer:'zaneblog',

	// 微信分享默认的图标
	wxDefaultShare:{
		imgUrl:'https://img.allpyra.com/c36e2635-3391-42a5-ac6e-cede17606b2c.png?imageView2/2/w/80',
		title:'',
		desc:''
	},
	//M站点的接口地址
	webapiDomain:'http://storeapi.dev.sqj.fanscrm.cn',
	//M站点的地址
	msiteDomain:'',
	//支付服务器地址
	payDomain:'',
	//获取资源服务器地址
	imageDomain:'',
	//上传资源服务器地址
	resourceUploadUrl:'',
	//无线H5服务器地址
	h5ServiceHost:'',
	//公共服务站点地址
	commonDomain: ""
	//UBT服务器地址
	

};