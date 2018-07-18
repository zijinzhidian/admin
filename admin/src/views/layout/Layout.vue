<template>
	<div class="app-wrapper" :class="classObj">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<tags-view></tags-view>
			<app-main></app-main>
		</div>
	</div>
</template>


<script>
import { Navbar, TagsView, Sidebar, AppMain } from './components'

export default {
	name: 'layout',
	components: {
		Navbar,
		TagsView,
		Sidebar,
		AppMain
	},
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		},
		device() {
			return this.$store.state.app.device
		},
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,				//侧边栏是否打开
				withoutAnimation: this.sidebar.withoutAnimation,		//侧边栏显隐是否有动画
				mobile: this.device === 'mobile'					//是否运行在手机上
			}
		}
	}
}	
</script>

<style lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		// @include clearfix;
		height: 100%;
		width: 100%;
		position: relative;
	}
</style>