<template>
	<div class="app-wrapper">
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