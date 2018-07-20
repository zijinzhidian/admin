<template>
	<div class="dashboard-admin-container">
		<github-corner></github-corner>

		<panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
	</div>
</template>

<script>
	import GithubCorner from '@/components/GithubCorner'
	import PanelGroup from './components/PanelGroup'

	export default {
		components: {
			GithubCorner,
			PanelGroup
		},
		methods: {
			handleSetLineChartData(type) {
				console.log(type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dashboard-admin-container {
		padding: 32px;
		background-color: rgb(240,242,245);
	}
</style>