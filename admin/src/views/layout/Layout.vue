<template>
	<div class="app-wrapper" :class="classObj">
		<div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
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
import ResizeMixin from './components/mixin/ResizeHandler'

export default {
	name: 'layout',
	mixins: [ResizeMixin],
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
	},
	methods: {
		handleClickOutside() {
			this.$store.dispatch('closeSideBar', {withoutAnimation: false})
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
	.drawer-bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.3;
		z-index: 999;
	}
</style>