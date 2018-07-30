<template>
	<div class="app-container">
		<switch-roles></switch-roles>
		<div style="margin-top:30px;">
			<span class="permission-alert">
				Only
				<el-tag size="small">admin</el-tag>
				can see this
			</span>
			<span class="permission-alert">
				Only
				<el-tag size="small">editor</el-tag>
				can see this
			</span>
		</div>
	</div>
</template>

<script>
	import SwitchRoles from './components/SwitchRoles'
	import permission from '@/directive/permission/index.js'

	export default {
		name: 'directivePermission',
		components: { SwitchRoles }
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