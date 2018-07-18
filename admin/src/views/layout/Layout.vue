<template>
	<div class="app-wrapper" :class="classObj">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<tags-view></tags-view>
		</div>
	</div>
</template>


<script>
import { Navbar, TagsView, Sidebar } from './components'

export default {
	name: 'layout',
	components: {
		Navbar,
		TagsView,
		Sidebar
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