<template>
	<div class="dashboard-admin-container">
		<github-corner></github-corner>

		<panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

		<line-chart></line-chart>
	</div>
</template>

<script>
	import GithubCorner from '@/components/GithubCorner'
	import PanelGroup from './components/PanelGroup'
	import LineChart from './components/LineChart'

	export default {
		components: {
			GithubCorner,
			PanelGroup,
			LineChart
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