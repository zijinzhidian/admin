<template>
	<div class="login-container">
		<el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm">
			<!-- 主题 -->
			<div class="title-container">
				<h3 class="title">{{$t('login.title')}}</h3>
				<lang-select class="set-language"></lang-select>
			</div>

			<!-- 用户名 -->
			<el-form-item prop="username">
				<span class="svg-container svg-container_login">
					<svg-icon icon-class="user"></svg-icon>
				</span>
    			<el-input name="username" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.username" :placeholder="$t('login.username')"></el-input>
  			</el-form-item>

  			<!-- 密码 -->
  			<el-form-item prop="password">
  				<span class="svg-container">
  					<svg-icon icon-class="password"></svg-icon>
  				</span>
  				<el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" :placeholder="$t('login.password')"></el-input>
  				<span class="show-pwd" @click="showPwd">
    				<svg-icon icon-class="eye"></svg-icon>
    			</span>
  			</el-form-item>

  			<!-- 登陆按钮 -->
  			<el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

  			<!-- 登陆提示 -->
  			<div class="tips">
  				<span>{{$t('login.username')}} : admin</span>
  				<span>{{$t('login.password')}} : {{$t('login.any')}}</span>
  			</div>
  			<div class="tips">
  				<span>{{$t('login.username')}} : editor</span>
  				<span>{{$t('login.password')}} : {{$t('login.any')}}</span>
  			</div>

  			<!-- 第三方登录按钮 -->
  			<el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button>
		</el-form>

		<!-- 对话框 -->
		<el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <social-sign></social-sign>
    </el-dialog>
	</div>
</template>


<script>
	import LangSelect from '@/components/LangSelect'
	import SocialSign from './socialsignin'
	import { isvalidUsername } from '@/utils/validate'
 
	export default {
		name: 'login',
		components: {LangSelect, SocialSign},
		data() {
			const validateUsername = (rule, value, callback) => {
	      if (!isvalidUsername(value)) {
	        callback(new Error(this.$t('login.usernameError')))
	      } else {
	        callback()
	      }
    	}
    	const validatePassword = (rule, value, callback) => {
	      if (value.length < 6) {
	        callback(new Error(this.$t('login.passwordError')))
	      } else {
	        callback()
	      }
    	}
			return {
				loginForm: {
					username: 'admin',
					password: '111111'
				},
				loginRules: {
					username: [{ required: true, trigger: 'blur', validator: validateUsername }],
       		password: [{ required: true, trigger: 'blur', validator: validatePassword }]
				},
				loading: false,  						//是否正在登录
				passwordType: 'password',		//密码输入框类型
				showDialog: false						//是否显示对话框
			}
		},
		methods: {
			// 是否显示密码
			showPwd() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
			},
			// 登陆
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {     //通过验证
						this.loading = true	
						this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
							// 登陆成功
							this.loading = false
							this.$router.push({ path: '/' })
						}).catch(() => {
							// 登陆失败
							this.loading = false
						})
					} else {					//未通过验证
						console.log('error submit!!')
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

	.login-container {
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;
			input {
				height: 47px;
				background-color: transparent;
				border: 0;
				color: $light_gray;
			}
		}
	}
	.el-form-item {
		border: 1px solid rgba(255, 255, 255, .1);
		background-color: rgba(0, 0, 0, .1);
		border-radius: 5px;
		color: #454545;
	}
</style>
	
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: $bg;
	.login-form {
		position: absolute;
		left: 0;
		right: 0;
		width: 520px;
		margin: 120px auto;
	}
}

.title-container {
	position: relative;
	.title {
		font-size: 26px;
		font-weight: bold;
		color: $light_gray;
		text-align: center;
		margin: 0 auto 40px auto;
	}
	.set-language {
		position: absolute;
		right: 0;
		top: 5px;
		color: #fff;
	}
}

.svg-container {
	display: inline-block;
	padding: 6px 5px 6px 15px;
	color: $dark_gray;
	vertical-align: middle;
	width: 10px;
	&_login {
		font-size: 20px;
	}
}

.show-pwd {
	position: absolute;
	right: 10px;
	top: 7px;
	font-size: 16px;
	color: $dark_gray;
	cursor: pointer;
	user-select: none;
}

.tips {
	font-size: 14px;
	color: #fff;
	margin-bottom: 10px;
	span {
		&:first-child {
			margin-right: 16px;
		}
	}
}

.thirdparty-button {
	position: absolute;
	right: 0;
	bottom: 20px;
}
</style>

