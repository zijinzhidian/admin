<template>
	<div class="login-container">
		<el-form class="login-form">
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
    			<el-input name="username" type="text" :placeholder="$t('login.username')"></el-input>
  			</el-form-item>

  			<!-- 密码 -->
  			<el-form-item prop="password">
  				<span class="svg-container">
  					<svg-icon icon-class="password"></svg-icon>
  				</span>
  				<el-input name="password" type="text" :placeholder="$t('login.password')"></el-input>
  				<span class="show-pwd" @click="showPwd">
    				<svg-icon icon-class="eye"></svg-icon>
    			</span>
  			</el-form-item>

  			<!-- 登陆按钮 -->
  			<el-button style="width:100%;"></el-button>
		</el-form>
	</div>
</template>


<script>
	import LangSelect from '@/components/LangSelect'

	export default {
		name: 'login',
		components: {LangSelect},
		data() {
			return {
				passwordType: 'password'
			}
		},
		methods: {
			showPwd() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
			},
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
		// paddnig: 35px 35px 15px 35px;
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

</style>

