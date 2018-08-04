<template>
	<div class="app-container">
		<switch-roles @change="handleRolesChange"></switch-roles>
		<div :key="key" style="margin-top:30px;">
			<span class="permission-alert" v-permission="['admin']">
				Only
				<el-tag size="small">admin</el-tag>
				can see this
			</span>
			<span class="permission-alert" v-permission="['editor']">
				Only
				<el-tag size="small">editor</el-tag>
				can see this
			</span>
			<span class="permission-alert" v-permission="['admin', 'editor']">
				Both
				<el-tag size="small">admin</el-tag> and
				<el-tag size="small">editor</el-tag> can see this
			</span>
		</div>

		<div style="margin-top: 30px;">
			<code>In some cases it is not suitable to use v-permission, such as element Tab component  which can only be achieved by manually setting the v-if.
				<br>e.g.
			</code>
			<el-tabs type="border-card" style="width: 500px;">
				<el-tab-pane v-if="checkPermission(['admin'])" label="Admin">Admin can see this</el-tab-pane>
				<el-tab-pane v-if="checkPermission(['editor'])" label="Editor">Editor can see this</el-tab-pane>
				<el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="Admin-Or-Editor">Both admin or editor can see this</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import SwitchRoles from './components/SwitchRoles'
	import permission from '@/directive/permission/index.js'
	import checkPermission from '@/utils/permission.js'

	export default {
		name: 'directivePermission',
		components: { SwitchRoles },
		directives: { permission },
		data() {
			return {
				key: 1			//为了能够每次切换权限的时候重新初始化指令
			}
		},
		methods: {
			handleRolesChange() {
				this.key++ 
			},
			checkPermission
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		.permission-alert {
			display: block;
			width: 320px;
			margin-top: 30px;
			padding: 8px 16px;
			color: #67c23a;
			border-radius: 4px;
			background-color: #f0f9eb;
		}
	}
</style>