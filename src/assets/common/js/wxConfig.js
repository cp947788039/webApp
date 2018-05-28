import config from 'common/js/config'

// 微信配置
class wxJDK {

	//初始化对象
	constructor() {
		this.shareImg 	=  config.wxDefaultShare.imgUrl
	};

	// 初始化
	init() {
		wx.ready(()=>{
			this.menuShareTimeline();
			this.menuShareAppMessage();
			this.menuShareQQ();
			this.menuShareWeibo();
			this.menuShareQZone();
		});
	};

	// 获得分享相关的内容
	shareBegin(){
		let itemicon 	= $('#wx-share-icon').attr('src')
		if(itemicon){
			if (itemicon.indexOf('http:') !== -1 || itemicon.indexOf('https:') !== -1) {
				this.shareImg = itemicon.replace(/220/,'80')
			} else {
				this.shareImg = location.origin+itemicon.replace(/220/,'80')
			}
		}else{
			let img = $('#content').find('img').attr('src')
			if(img&&img.indexOf('gods-default-icon') === -1){
				if (img.indexOf('http:') !== -1 || img.indexOf('https:') !== -1) {
					this.shareImg = img.replace(/750/,'80')
				} else {
					this.shareImg = location.origin+img.replace(/750/,'80')
				}
			}
		}
		this.json={
			// 分享标题
			title:$('title').text()||config.wxDefaultShare.title,
			// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			link:location.href,
			// 分享图标
			imgUrl:this.shareImg,
			// 分享描述
			desc:$('#description').attr('content') || config.wxDefaultShare.desc,
			success:()=>{
				// 用户确认分享后执行的回调函数
				console.log('分享成功!')
			},
			cancel:()=>{
				// 用户取消分享后执行的回调函数
				console.log('用户取消了分享!')
			}
		};
		this.init();
	}

	// 分享到朋友圈
	menuShareTimeline(){
		wx.onMenuShareTimeline(this.json);
	};
	
	// 分享给朋友
	menuShareAppMessage(){
		wx.onMenuShareAppMessage(this.json);
	};
		
	// 分享到QQ
	menuShareQQ(){
		wx.onMenuShareQQ(this.json);
	};
		
	// 分享到腾讯微博
	menuShareWeibo(){
		wx.onMenuShareWeibo(this.json);
	};

	// 分享到QQ空间
	menuShareQZone(){
		wx.onMenuShareQZone(this.json);	
	};

	// 微信获得地理位置
	getLocation(fn) {
		wx.getLocation({
			type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: (res) => {
				console.log(res)
				console.log('-----------------')
				var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				var speed = res.speed; // 速度，以米/每秒计
				var accuracy = res.accuracy; // 位置精度

				fn && fn(longitude, latitude);
			}
		});
	}

}
module.exports = new wxJDK();
