<template>
	<div class="login-container">
		<el-form class="login-form">
			<div class="title-container">
				<h3 class="title">{{$t('login.title')}}</h3>
				<lang-select class="set-language"></lang-select>
			</div>

			<el-form-item prop="username">
				<span class="svg-container svg-container_login">
					<svg-icon icon-class="user"></svg-icon>
				</span>
    		<el-input></el-input>
  		</el-form-item>

		</el-form>
	</div>
</template>


<script>
	import LangSelect from '@/components/LangSelect'

	export default {
		name: 'login',
		//注册组件
		components: {LangSelect},
	}
</script>

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
</style>

