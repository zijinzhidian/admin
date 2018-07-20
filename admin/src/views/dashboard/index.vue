<template>
	<div class="dashboard-container">
		<!-- 动态切换组件,is绑定的是已经注册的组件的名字 -->
		<component :is="currentRole"></component>
	</div>
</template>

<script>
	import adminDashboard from './admin'
	import editorDashboard from './editor'
	import { mapGetters } from 'vuex'

	export default {
		name: 'dashboard',
		components: { adminDashboard, editorDashboard },
		data() {
			return {
				currentRole: 'adminDashboard'
			}
		},
		computed: {
			...mapGetters(['roles'])
		},
		created() {
			// 设置用户角色权限
			if (!this.roles.includes('admin')) {
				this.currentRole = 'adminDashboard'
			}
		}
	}
</script>