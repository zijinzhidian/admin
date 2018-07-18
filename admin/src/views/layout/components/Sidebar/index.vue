<template>
	<el-scrollbar wrapClass="scrollbar-wrapper">
		<el-menu 
			mode="vertical"
			:collapse="isCollapse"
			:default-active="$route.path"
			:show-timeout="200"
			background-color="#304156"
			text-color="#bfcbd9"
			active-text-color="#409EFF"
		>
			<sidebar-item :routes="permission_routers"></sidebar-item>	
		</el-menu>
	</el-scrollbar>
</template>

<script>
	import { mapGetters } from 'vuex'
	import SidebarItem from './SidebarItem'

	export default {
		components: { SidebarItem },
		computed: {
			...mapGetters([
				'permission_routers',      //路由数组
				'sidebar'									 //侧边栏对象
			]),
			// 侧边栏是否折叠
			isCollapse() {
				return !this.sidebar.opened
			}
		}
	}
</script>