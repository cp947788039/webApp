import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import babelPolyfill from 'babel-polyfill'
import mui from "common/js/mui"
import app from './app.js'
import globalService from 'common/js/global-service'
import log from 'common/js/log'
import utils from 'common/js/utils'	
import directives from "common/js/directives"
import routers from "./router"
import appRouters from 'common/js/app-routers'
import filter from "./filter"
import vueApp from "./app.vue"
import store from './vuex/store'
import jQuery from "common/js/jquery-2.1.4.min"
import config from 'common/js/config'
import common from 'common/js/common'
import util from 'common/js/util'
import popup from 'popup'
import moment from 'moment'
import appSDK from 'common/js/appSDK'
import wxConfig from 'common/js/wxConfig'
import 'common/js/resize.js'
import 'common/js/jquery.cookie.js'
import 'common/lib/swiper/swiper.min.css'
import 'common/lib/swiper/swiper.min.js'
import 'common/js/echo.min.js'
import 'common/sass/app.scss'
import 'common/css/mui.css'
import 'common/css/icons-extra.css'
Object.assign(app.Config, config);
window.app = Object.assign({}, app, {log, utils, mui, globalService, config, common, util, popup, moment, appSDK, wxConfig, appRouters});
//signalR是基于jquery的，所以必须要把jQuery引进来，Jquery仅仅是用于signalR。太恶心了，其实我TM的真的不想这样...
window.jQuery = window.$ = jQuery;
const initVue = function(){
	Vue.use(Vuex);
	Vue.use(VueRouter);
	// 使用filter
	for (let k in filter) {
		Vue.filter(k, filter[k])
	};
	Object.keys(directives).forEach((key) => {
	    Vue.directive(key, directives[key]);
	});
	const [router, VueApp] = [routers.createRouter(VueRouter, store), Vue.extend(vueApp)];
	window.app.vueApp = new VueApp({ router, name: "app", store }).$mount('#app');
}
mui.init({
	swipeBack:false, //关闭右滑关闭功能（默认就是false）
	keyEventBind: {
		backbutton: true  //开启back按键监听（默认就是true）
	},
	statusBarBackground: "#1981D8" //设置状态栏颜色,仅iOS可用
});
if(mui.os.plus) {
	app.Config.isApp = true;
	mui.plusReady(function(){
		Object.assign(app.Config.device, {
			isAndroid : plus.os.name === "Android", //是否在安卓环境内
			isIOS : plus.os.name === "iOS", //是否在IOS环境内
			model: plus.device.model, //设备的型号
			imsi: plus.device.imsi, //设备的国际移动用户识别码 ,//Android - 2.2+ (支持): 如果设备没有插入SIM卡，则返回空数组。|iOS - 4.5+ (不支持): iOS设备不支持获取SIM卡信息，返回空数组。
			vendor: plus.device.vendor, // 设备的生产厂商
			uuid: plus.device.uuid, //设备的唯一标识
			version: plus.os.version, //系统版本信息
			osName: plus.os.name //系统的名称
		});
		app.Config.version = plus.runtime.version;
		app.Config.clientVersion = plus.runtime.innerVersion;
		initVue();
	});
} else {
	mui.ready(function() {
		initVue();
	});
}

