
import config from './config'
import popup from 'popup'
import appSDK from 'common/js/appSDK'

//common 公共 AJAX 函数
class common{
	//初始化对象
	constructor(){
		
	};
	getCompanyCode(){
		if(!util.getStorage('local','adminMsg') == ''){
			var companyCode = JSON.parse(util.getStorage('local','adminMsg')).companyCode;
			return companyCode;
		}
		else{
			return config.companyCode;
		}
		
		
	};
	// 用户定位获取最近的门店信息
	// getAdminMsg() {
	// 	var adminMsg = util.getStorage('session','adminMsg') ? JSON.parse(util.getStorage('session','adminMsg')) : [];
	// 	if (adminMsg && adminMsg.companyCode) {
	// 		return $.Deferred().resolve(adminMsg)
	// 	}
	// 	return util.ajax({
	// 		nohideloading: true,
 //            url:config.baseApi+'pos-manage/api/admin/findAdmin',
 //            data:{
 //                localEw:'114.056334', // 是   double  当前位置的经度
 //                localNs:'22.539169', // 是   double  当前位置的纬度
 //            }
 //        }).done(data=>{
 //            util.setStorage('session','adminMsg',JSON.stringify(data.data))
 //            return data.data
 //        })
	// };

	// 判断是 1:及时送 还是 2:次日送
	isTodayOrTommow(){
		let adminMsg=util.getStorage('local','adminMsg')?JSON.parse(util.getStorage('local','adminMsg')):{};
		let type=null;
		if(adminMsg.orderEndTime){
			let timeArr=adminMsg.orderEndTime.split(':')
			let nowtime=moment(new Date()).format('HH:mm:ss').split(':')
			if(parseInt(nowtime[0])<parseInt(timeArr[0])){
				type=1;
			}else if(parseInt(nowtime[0])==parseInt(timeArr[0])){
				if(parseInt(nowtime[1])<parseInt(timeArr[1])){
					type=1;
				}else if(parseInt(nowtime[1])==parseInt(timeArr[1])){
					if(parseInt(nowtime[2]) <= parseInt(timeArr[2])){
						type=1;
					}else{
						type=2;
					}
				}else{
					type=2;
				}
			}else{
				type=2;
			}
			return type;
		};
	};

	// 隐藏网页header
	//rexcept 是排除的路由
	hideHeadersFor904(rexcept,to){
	    let isIn=false;
	    for(let i=0,len=rexcept.length;i<len;i++){
	    	if(to.name == rexcept[i]){
	            isIn=true;
	            appSDK.hideHeader();
	        	console.log('隐藏网页header')
	        }
	    }
	};
	//隐藏购物车底部头部，订单头部
	//rexcept  是需要的路由
	hideHeadersFor901(rexcept,to){
	    let isIn=false;
	    for(let i=0,len=rexcept.length;i<len;i++){
	    	if(to.name == rexcept[i]){
	            isIn=true;
	            appSDK.hideOtherElement();
	        	console.log('隐藏购物车底部头部，订单头部') 
	            return true;
	        }
	    }
	};
	//显示鲜生活订单头部
	//rexcept  是需要的路由
	showHeadersFor903(rexcept,to){
	    let isIn=false;
	    for(let i=0,len=rexcept.length;i<len;i++){
	    	if(to.name == rexcept[i]){
	            isIn=true;
	            const index = ({
                    WAITPAY: 1,
                    SHIPPED: 2,
                    SIGNED: 3,
                }[this.orderStatus]) || 0
                appSDK.showOrderOtherElement( index )
	            return true;
	        }
	    }
	};
	// 判断用户是否登陆 并去登陆
	goingLogin(succfn){
		if($.cookie('sid')){
			succfn&&succfn()
        }else{
            if(appSDK.isApp){
                appSDK.openLogin().then(() => {
                    location.reload() // 登录完刷新
                })
            }else{
                alert('请在APP打开,开始登陆');
            }
        };
	};

	touch(touchObj,transObj,direction){
		var direction = direction || 'vertical',
		startS = 0,
		moveS = 0,
		_touchStartFun = function(e){
		    var _touch = e.touches[0];
		    if(direction=='vertical'){
		        startS = _touch.pageY;
		    }
		    else{
		        startS = _touch.pageX;
		    }
		},
		_touchMoveFun = function(e){
		    var _touch = e.touches[0];
		    //e.preventDefault(); 
		    if(direction == 'vertical'){
		        moveS = _touch.pageY;
		    }
		    else{
		        moveS = _touch.pageX;
		    }
		    var  _direct = moveS - startS;
		    if (_direct > 20) {
		        $('.detail-tab-tips').show();
		    } 
		},
		_touchEndFun = function(){
		    var  _direct = moveS - startS;
		    if (_direct > 20) {
		        transObj.removeClass('active');
		        $('.detail-tab-tips').hide();
		    } 
		    if (_direct < -20) {
		       transObj.addClass('active');
		    }
		},
		_stopBubble = function(_obj){
	        _obj[0].addEventListener('touchstart', function(event){
	                event.stopPropagation();
	        }, false);
	        _obj[0].addEventListener('touchmove', function(event){
	                event.stopPropagation();
	        }, false);
	        _obj[0].addEventListener('touchend', function(event){
	                event.stopPropagation();
	        }, false);
	    };
		touchObj[0].addEventListener('touchstart',_touchStartFun, false);
		touchObj[0].addEventListener('touchmove',_touchMoveFun, false);
		touchObj[0].addEventListener('touchend',_touchEndFun, false);
		if($('.tab-title').length) _stopBubble($('.tab-title'));
		if($('.add-cart').length) _stopBubble($('.add-cart'));
		if($('.detail-single-layer').length) _stopBubble($('.detail-single-layer'));
		if($('.detail-single').length) _stopBubble($('.detail-single'));
		if($('.detail-banner-box').length) _stopBubble($('.detail-banner-box'));
		if($('.store-mendian').length) _stopBubble($('.store-mendian'));
		if($('.store-peisong').length) _stopBubble($('.store-peisong'));
	};
	timestamp2Time(timestamp,separator){
		var result = "";
        if(timestamp){  
            var reg = new RegExp(/\D/, "g");
            var timestamp_str = timestamp.toString().replace(reg,"");
            var d = new Date();  
            d.setTime(timestamp_str);  
            var year = d.getFullYear();  
            var month = d.getMonth() + 1;  
            var day = d.getDate(); 
            var hour = d.getHours();
			var minute = d.getMinutes();
			var seconds = d.getSeconds();
            if(month < 10) {  
                month = "0" + month;  
            }  
            if(day < 10) {  
                day = "0" + day;  
            }
            if(hour < 10) {  
                hour = "0" + hour;  
            }
            if(minute < 10) {
                minute = "0" + minute;
            }
            if(seconds < 10) {  
                seconds = "0" + seconds;  
            }  
            result = year + separator + month + separator + day + ' ' + hour+ ':' + minute+ ':' + seconds;  
        }  
        return result;
	};

}

//初始化common对象
module.exports=new common();






