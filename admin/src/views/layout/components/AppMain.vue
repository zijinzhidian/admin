<template>
	<section class="app-main" style="min-height: 100%">
		<!-- 过渡动画 -->
		<transition name="fade-transform" mode="out-in">
			<!-- 匹配include中的组件会被缓存 -->
			<keep-alive :include="cachedViews">
				<!-- 各个组件的内容 -->
				<router-view :key="key"></router-view>
			</keep-alive>
		</transition>
	</section>
</template>


<script>
	export default {
		name: 'AppMain',
		computed: {
			key() {
				return this.$route.fullPath
			},
			cachedViews() {
				return this.$store.state.tagsView.cachedViews
			}
		}
	}
</script>