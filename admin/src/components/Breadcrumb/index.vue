<template>
	<!-- 面包屑 -->
	<el-breadcrumb class="app-breadcrumb" separator=">">
		<!-- 列表过渡 -->
		<transition-group name="breadcrumb">
			<!-- 面包屑元素 -->
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path" v-if="item.meta.title">
				<!-- 不可点击的元素(index==levelList.length-1 代表若只有一个元素即首页,让其不可点击) -->
				<span v-if='item.redirect==="noredict"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
				<!-- 可点击的元素 -->
				<router-link v-else :to="item.redirect||item.path">{{generateTitle(item.meta.title)}}</router-link>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

	export default {
		created() {
			this.getBreadcrumb()
		},
		data() {
			return {
				levelList: null
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb()
			}
		},
		methods: {
			generateTitle,
			// 获取面包屑元素数组
			getBreadcrumb() {
				// 剔除没有设置name的路由对象
				let matched = this.$route.matched.filter(item => item.name)
				const first = matched[0]
				if (first && first.name != 'dashboard') {
					// 将'dashboard'始终置于第一个位置
					matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
				}
				this.levelList = matched
			}
		}
	}
</script>


<style lang="scss" scoped>
	.app-breadcrumb {
		display: inline-block;
		font-size: 14px;
		line-height: 50px;
		margin-left: 10px;
		.no-redirect {
			color: #97a8be;
			cursor: text;
		}
	}
</style>