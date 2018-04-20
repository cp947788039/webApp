<template>
	<div data-page="login">
		<div class="page-content">
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label>商户编码</label>
					<input type="text" @focus="focusName=tenancyName" v-focus:tenancyName="focusName" v-model="tenancyName" class="mui-input-clear mui-input" placeholder="请输入商户编码">
				</div>
				<div class="mui-input-row">
					<label>账号</label>
					<input type="text" @focus="focusName=usernameOrEmailAddress" v-focus:usernameOrEmailAddress="focusName" v-model="usernameOrEmailAddress" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input type="password" @focus="focusName=password" v-focus:password="focusName" v-model="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</div>
			<div class="mui-content-padded">
				<button class="mui-btn mui-btn-block mui-btn-primary" data-loading-icon-position="right" @tap.stop.prevent="sumbit($event)">登录</button>
				<div class="link-area">
					<a>注册账号</a> 
					<span class="spliter">|</span> 
					<a>忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area"></div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tenancyName: "default",
			usernameOrEmailAddress: "admin",
			password: "123456",
			focusName: "tenancyName"
		}
	},
	methods: {
		sumbit(e){
			var _this = this;
			if(!_this.tenancyName){
				_this.focusName = "tenancyName";
				app.mui.toast('请输入商户编码');
				return;
			}
			if(!_this.usernameOrEmailAddress){
				_this.focusName = "usernameOrEmailAddress";
				app.mui.toast('请输入账号');
				return;
			}
			if(!_this.password){
				_this.focusName = "password";
				app.mui.toast('请输入密码');
				return;
			}
			app.mui(e.target).button('loading');
			app.api.user.login({
				data: {
					tenancyName: _this.tenancyName,
					usernameOrEmailAddress: _this.usernameOrEmailAddress,
					password: _this.password
				},
				success(data){
					app.globalService.setUserInfo({
						tenancyName: _this.tenancyName, 
						token: data.token, 
						usernameOrEmailAddress: _this.usernameOrEmailAddress, 
						expiredTime: data.expiredTime
					});
					_this.go();
				},
				complete(){
					app.mui(e.target).button('reset');
				}
			});
		},
		
		go: function(){
			const [_this, _toName, _current_query] = [this, this.$route.query.toName, this.$route.query];
			if(_toName){
				delete _current_query.toName;
				this.$router.push({name: _toName, query: _current_query});
			} else {
				this.$router.push({name: "home"});
			}
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='login'] {
		
		/*background-image: url(../../imgs/login-bg.jpg);
		background-size:100% 100%;
		-moz-background-size:100% 100%;
	   	-webkit-background-size:100% 100%;
	   	-o-background-size:100% 100%;
		
		.login-input-box {
			width: 80%;
		    margin: auto;
		    position: fixed;
		    top: 50%;
		    left: 50%;
		    -webkit-transform: translate(-50%,-50%);
		    -moz-transform: translate(-50%,-50%);
		    transform: translate(-50%,-50%);
		    
		    .logo p {
			    font-size: 2.2rem;
			    text-align: center;
			}
			
			.line1, .line2, .line3 {
			    width: 98%;
			    overflow: hidden;
			    border-bottom: 1px solid #aaa;
			    padding-left: 2%;
			    margin-top: 40px;
			}
			
			.line1 img, .line2 img, .line3 img {
			    float: left;
			    padding-top: 0px;
			}
			
			.user, .lock, .mail {
			    float: left;
			    width: 85%;
			    height: 35px;
			    border: none;
			    padding-left: 3%;
			    line-height: 2.4rem;
			    font-size: 1.2rem;
			    outline: none;
			    color: #4d4d4d;
			    background: none;
			    margin-bottom: 0px;
			}
			
			.line1 {
			    margin-top: 80px;
			}
			
			.register, .forgive{
			    margin-top: 20px;
			    color: #4d4d4d !important;
			    font-weight: normal;
			    padding: 0px 2%;
			}
			.register{
			    float: left;
			}
			.forgive{
			    float: right;
			}
			.chose .login{
			    float: left;
			    margin: 40px 0;
			    width: 100%;
			    font-size: 1.2rem;
			    line-height:2.6rem;
			    text-align: center;
			    color: #4d4d4d!important;
			    background:#e5e5e5;
			    border-radius: 20px;
			}
		}*/
		
		.link-area {
			text-align: center;
		}
	}
</style>