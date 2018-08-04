<template>
	<div class="tab-container">
		<el-tag>mounted times : {{ createTimes }}</el-tag>
		<el-alert title="Tab with keep-alive" type="success" :closable="false" style="width: 160px; display: inline-block; vertical-align: middle; margin-left: 30px;"></el-alert>
		<el-tabs type="border-card" style="margin-top: 15px;" v-model="activeName">
			<el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
				<keep-alive>
					<tab-pane></tab-pane>
				</keep-alive>
			</el-tab-pane>
		</el-tabs>
	</div>	
</template>

<script>
	import tabPane from './components/tabPane'
	export default {
		nama: 'tab',
		components: { tabPane },
		data() {
			return {
				createTimes: 0,
				activeName: 'CN',
				tabMapOptions: [
					{ label: 'China', key: 'CN'},
					{ label: 'USA', key: 'US' },
					{ label:'Japan', key: 'JP' },
					{ label: 'Eurozone', key: 'EU'}
				]
			}
		}
	}
</script>

<style scoped>
	.tab-container {
		margin: 30px;
	}
</style>