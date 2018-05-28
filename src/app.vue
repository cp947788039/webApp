<template>
	<div class="container">
		<headers></headers>
		<div class="wrapper" :class="{'mui-content': $store.state.appData.isShowHead, 'toolbar-fixed': $store.state.appData.isShowFoot}">
			<transition :name="$store.state.routerStatus.transition">
					<router-view class="page-wrap"></router-view>
			</transition>
		</div>
		<footers :attr="$store.state.appData.routerName"></footers>
	</div>
</template>
<script>
	import headers from './commonvue/headers'
	import footers from './commonvue/footers'
	export default {
		components: {
            headers,
            footers,
        },
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

				}
				
				//2.初始化是否启动欢迎页面
				if(!app.globalService.getStartFlag()){
					this.$router.push({name: "welcome"});
				}
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
