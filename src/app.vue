<template>
	<div class="view">
		<header class="mui-bar mui-bar-nav" v-show="$store.state.appData.isShowHead">
			<a class="mui-icon mui-icon-left-nav mui-pull-left" @tap.stop.prevent="goBack" v-show="$store.state.appData.isShowBack"></a>
			<h1 class="mui-title">{{$store.state.appData.navbarTitle}}</h1>
			<a class="mui-icon mui-pull-right"></a>
		</header>
		<div class="pages" :class="{'mui-content': $store.state.appData.isShowHead, 'toolbar-fixed': $store.state.appData.isShowFoot}">
			<transition :name="$store.state.routerStatus.transition">
					<router-view class="page"></router-view>
			</transition>
		</div>
		<footer class="toolbar mui-row" v-show="$store.state.appData.isShowFoot">
			<div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'home'}" class="active toolbar-link" exact>
	            	<span class="mui-icon mui-icon-home"></span>
	            	首页
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'myCustomerGathers'}" class="toolbar-link">
	            	<span class="mui-icon mui-icon-paperplane"></span>
	            	我的集客
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'userCenter'}" class="toolbar-link">
	            	<span class="mui-icon mui-icon-person"></span>
	            	个人中心
	            </router-link>
	        </div>
		</footer>
	</div>
</template>
<script>
	import 'common/css/mui.css'
	import 'common/css/icons-extra.css'
	import "common/less/app.less" //加载公共样式
	import appRouters from "common/js/app-routers"
	export default {
		data: function() {
			return {};
		},
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 `this`
		// 因为当钩子执行前，组件实例还没被创建
		created() {
			this.initApp();
		},
		
		mounted(){
		},
		methods: {
			initApp: function() {
				var _this = this;
				//1.检查更新
				if(app.Config.isApp) {
//					app.ajax({
//						url: "http://demo.dcloud.net.cn/test/update/check.php",
//						success(result){
//							if(result !== app.Config.innerVersion){
//								//强制更新
//								app.mui.confirm("您的版本需要更新!", null, ["取消", "去下载"], function(result){
//									if(result.index === 1){
//										require(["../js/utils/update"], function(update){
//											update.updateWgt();
//										});
//									} else {
//										plus.runtime.quit();
//									}
//								});
//							} else if(!app.globalService.getStartFlag()){
//								//2.初始化是否启动欢迎页面
//								_this.$router.push({name: "welcome"});
//							}
//						},
//						error(){
//							if(!app.globalService.getStartFlag()){
//								_this.$router.push({name: "welcome"});
//							}
//						}
//					});
				}
				
				//2.初始化是否启动欢迎页面
				if(!app.globalService.getStartFlag()){
					this.$router.push({name: "welcome"});
				}
//				require(["../js/utils/site-utils.js", "../css/test.css"], function(utils){
//					console.info("app.vue AMD 加载");
//				});
			},
			//返回按钮
			goBack: function(){
				const _this = this, _goBack = function(){
					appRouters.back(function(routerOptions) {
						if(routerOptions && routerOptions.name) {
							//考虑用replace不恰当，浏览器的返回一样是有问题的
							_this.$router.push(routerOptions);
						} else if(routerOptions && routerOptions.url) {
							window.location.href = routerOptions.url;
						} else {
							_this.$router.push({name:'index'});
						}
					}, JSON.stringify(_this.$store.state.routerStatus.backConfig)=="{}"?null:_this.$store.state.routerStatus.backConfig);
				}
				if(_this.$store.state.routerStatus.direction != "backing"){
					_this.$store.dispatch("updateDirection", "backing");
				}
				if(_this.$store.state.routerStatus.backConfig && typeof(_this.$store.state.routerStatus.backConfig.callback) === "function"){
					_this.$store.state.routerStatus.backConfig.callback(_goBack);
				} else {
					_goBack();
				}
				return true;
			}
		},
	};
</script>
