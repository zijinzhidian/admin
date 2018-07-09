<!-- 语言选择 -->

<template>
	<!-- 下拉菜单
		trigger:触发方式,默认为hover激活,click为点击激活
		@command:点击菜单后会触发事件,可以通过相应的菜单项key(command)进行不同的操作
	 -->
	<el-dropdown trigger="click" class="international" @command="handleSetLanguage">
		<div>
			<svg-icon icon-class="language" class-name="international-icon"></svg-icon>
		</div>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item command="zh">中文</el-dropdown-item>
			<el-dropdown-item command="en">English</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
	export default {
		methods: {
			handleSetLanguage(lang) {    //参数lang为command的value
				//更改语言
				this.$i18n.locale = lang
				//提示更改成功
				this.$message({
					type: 'success',
					message: 'switch language success'
				})
				//保存更改语言
				this.$store.dispatch('setLanguage', lang)
			}
		}
	}
</script>

<style scoped>
	.international-icon {
		font-size: 20px;
		cursor: pointer;
	}
</style>