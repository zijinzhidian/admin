<template>
	<div class="dashboard-admin-container">
		<github-corner></github-corner>

		<panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

		<el-row style="background-color: #fff;padding: 16px 16px 0;margin-bottom: 32px;">
			<line-chart :chart-data="lineChartData"></line-chart>	
		</el-row>
		
		<el-row :gutter="32">
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<radar-chart></radar-chart>
				</div>
			</el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>
		</el-row>

		<el-row :gutter="8">
			<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-right: 8px;margin-bottom: 30px">
				<transaction-table></transaction-table>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-bottom: 30px;">
				<todo-list></todo-list>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-bottom: 30px;">
				<box-card></box-card>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import GithubCorner from '@/components/GithubCorner'
	import PanelGroup from './components/PanelGroup'
	import LineChart from './components/LineChart'				//线状图
	import RadarChart from './components/RadarChart'			//雷达图
	import PieChart from './components/PieChart'					//饼状图
	import BarChart from './components/BarChart'					//柱状图
	import TransactionTable from './components/TransactionTable'			//账单图
	import TodoList from './components/TodoList'					//菜单图
	import BoxCard from './components/BoxCard'

	const lineChartData = {
	  newVisitis: {
	    expectedData: [100, 120, 161, 134, 105, 160, 165],
	    actualData: [120, 82, 91, 154, 162, 140, 145]
	  },
	  messages: {
	    expectedData: [200, 192, 120, 144, 160, 130, 140],
	    actualData: [180, 160, 151, 106, 145, 150, 130]
	  },
	  purchases: {
	    expectedData: [80, 100, 121, 104, 105, 90, 100],
	    actualData: [120, 90, 100, 138, 142, 130, 130]
	  },
	  shoppings: {
	    expectedData: [130, 140, 141, 142, 145, 150, 160],
	    actualData: [120, 82, 91, 154, 162, 140, 130]
	  }
	}

	export default {
		name: 'dashboard-admin',
		components: {
			GithubCorner,
			PanelGroup,
			LineChart,
			RadarChart,
			PieChart,
			BarChart,
			TransactionTable,
			TodoList,
			BoxCard
		},
		data() {
			return {
				lineChartData: lineChartData.newVisitis
			}
		},
		methods: {
			handleSetLineChartData(type) {
				this.lineChartData = lineChartData[type]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dashboard-admin-container {
		padding: 32px;
		background-color: rgb(240,242,245);
		.chart-wrapper {
			background-color: #fff;
			padding: 16px 16px 0;
			margin-bottom: 32px;
		}
	}
</style>