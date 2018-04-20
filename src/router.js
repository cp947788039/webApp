import globalService from 'common/js/global-service'
import appRouters from "common/js/app-routers"
// 默认首页路由
const route = [{
	path: '/',
	name: 'index',
	meta: {
		title: '首页',
	},
	component: resolve => require(['./pages/home/index.vue'], resolve)
}]

//合并路由 router.js 路由集合
let routes = route.concat(
	require('pages/home/router'),
	require('pages/barcode/router'),
	require('pages/users/router'),
	require('pages/customerGather/router'),
	require('pages/error/router'),
)
export default {
	routes: routes,
	
	//使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
	    	return savedPosition;
	  	} else {
	    	return { x: 0, y: 0 };
	  	}
	  	if (to.hash) {
    		return { selector: to.hash};
  		}
	},
	
	//创建路由
	createRouter(VueRouter, store){
		var _this = this;
		var router = new VueRouter({
			//路由列表
			routes: _this.routes,
			//使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
			scrollBehavior: _this.scrollBehavior,
			//hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
			//history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式.
			//abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
			//mode: 'history',
			//应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
			base: "/",
			//全局配置 <router-link> 的默认『激活 class 类名』。参考 router-link.
			linkActiveClass: "router-link-active"
		});
		//const [_push, _go, _replace] = [router.push, router.go, router.replace];
		const {push, go, replace} = router;
		router.push = function(location) {
			if(!store.state.routerStatus.direction){
				store.dispatch("updateDirection", "going");
			}
			push.call(this, location);
		}
		router.go = function(location) {
			if(store.state.routerStatus.direction != "backing"){
				store.dispatch("updateDirection", "backing");
			}
			app.log.error("app 不到万不得已不要用go来后退，这个直接会导致路由混乱");
			if(location > 0){
				store.dispatch("updateDirection", "going");
			} else {
				store.dispatch("updateDirection", "backing");
			}
			go.call(this, location);
		}
		router.replace = function(location) {
			if(store.state.routerStatus.direction != "replace"){
				store.dispatch("updateDirection", "replace");
			}
			replace.call(this, location);
		}
		router.beforeEach((to, from, next)=>_this.beforeEach(to, from, next, store));
		router.afterEach((router)=> _this.afterEach(router, store));
		return router;
	},

	//访问之前的函数
	beforeEach(to, from, next, store){
		if(JSON.stringify(store.state.routerStatus.backConfig) !== "{}") {
			store.dispatch("resetBackConfig");
		}
		if(to.meta.auth !== false && !globalService.isLogin()){
			next({name: 'login', query: Object.assign({toName: to.name}, to.query)});
			return;
		}
		// 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
		// next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
		// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
		next();
		const _direction = store.state.routerStatus.direction;
		if(!_direction) {
			store.dispatch("updateDirection", appRouters.isGoing(false, window.location.href) ? "going" : "backing");
		} else if(_direction === "replace"){
			appRouters.pop();
		}
		switch(to.name) {
			case 'home':
				store.dispatch("updateNavbarStatus",{isShowHead: false, isShowBack: false});
				appRouters.clear();
				break;
			case 'userCenter':
				store.dispatch("updateNavbarStatus",{isShowHead: false, isShowBack: false});
				appRouters.clear();
				break;
			case 'myCustomerGathers':
				store.dispatch("updateNavbarStatus",{isShowHead: false, isShowBack: false});
				appRouters.clear();
				break;
			case 'login':
				store.dispatch("updateNavbarStatus",{isShowBack: false, isShowHead: true, isShowFoot: false});
				appRouters.clear();
				break;
			case 'welcome':
				store.dispatch("updateNavbarStatus",{isShowBack: false, isShowHead: false, isShowFoot: false});
				appRouters.clear();
				break;
			case 'barcode':
				store.dispatch("updateTransition", null);
				store.dispatch("updateNavbarStatus",{isShowBack: false, isShowHead: false, isShowFoot: false});
				appRouters.clear();
				break;
			default:
				store.dispatch("updateNavbarStatus",{isShowFoot: false});
				break;
		}
		appRouters.push(_direction && (store.state.routerStatus.direction == "going" || store.state.routerStatus.direction == "backing" || store.state.routerStatus.direction == "replace"), {
			name: to.name,
			query: to.query,
			url: window.location.href
		});
		store.dispatch("updateDirection", null);
	},
	
	//可以记录访问路径
	afterEach(router, store){
		if(router.meta.title && router.meta.title != store.state.appData.navbarTitle){
			store.dispatch("updateNavbarTitle", router.meta.title);
			document.title = "粉丝煲-" + router.meta.title || "";
		}
	}
}