<!-- 响应式布局,以24为基础分栏
	 :xs="12"    <768px时一排两个
	 :sm="12"    >=768px时一排两个
	 :lg="6"     >=1200px时一排四个
 -->

<template>
	<el-row class="panel-group" :gutter="40">

		<el-col class="card-panel-col" :xs="12" :sm="12" :lg="6">
			<!-- 整个卡片 -->
			<div class="card-panel" @click="handleSetLineChartData('newVisits')">
				<!-- 卡片图标 -->
				<div class="card-panel-icon-wrapper icon-people">
					<svg-icon icon-class="peoples" class-name="card-panel-icon"></svg-icon>
				</div>
				<!-- 卡片描述 -->
				<div class="card-panel-description">
					<div class="card-panel-text">New Visits</div>
					<i-count-up class ="card-panel-num" :startVal="0" :endVal="102400" :duration="2.6"></i-count-up>
				</div>
			</div>
		</el-col>

		<el-col class="card-panel-col" :xs="12" :sm="12" :lg="6">
			<!-- 整个卡片 -->
			<div class="card-panel" @click="handleSetLineChartData('messages')">
				<!-- 卡片图标 -->
				<div class="card-panel-icon-wrapper icon-message">
					<svg-icon icon-class="message" class-name="card-panel-icon"></svg-icon>
				</div>
				<!-- 卡片描述 -->
				<div class="card-panel-description">
					<div class="card-panel-text">Messages</div>
					<i-count-up class ="card-panel-num" :startVal="0" :endVal="81212" :duration="3"></i-count-up>
				</div>
			</div>
		</el-col>

		<el-col class="card-panel-col" :xs="12" :sm="12" :lg="6">
			<!-- 整个卡片 -->
			<div class="card-panel" @click="handleSetLineChartData('purchases')">
				<!-- 卡片图标 -->
				<div class="card-panel-icon-wrapper icon-money">
					<svg-icon icon-class="money" class-name="card-panel-icon"></svg-icon>
				</div>
				<!-- 卡片描述 -->
				<div class="card-panel-description">
					<div class="card-panel-text">Purchases</div>
					<i-count-up class ="card-panel-num" :startVal="0" :endVal="9280" :duration="3.2"></i-count-up>
				</div>
			</div>
		</el-col>

		<el-col class="card-panel-col" :xs="12" :sm="12" :lg="6">
			<!-- 整个卡片 -->
			<div class="card-panel" @click="handleSetLineChartData('shoppings')">
				<!-- 卡片图标 -->
				<div class="card-panel-icon-wrapper icon-shoppingCard">
					<svg-icon icon-class="shoppingCard" class-name="card-panel-icon"></svg-icon>
				</div>
				<!-- 卡片描述 -->
				<div class="card-panel-description">
					<div class="card-panel-text">Shoppings</div>
					<i-count-up class ="card-panel-num" :startVal="0" :endVal="13600" :duration="3.6"></i-count-up>
				</div>
			</div>
		</el-col>

	</el-row>
</template>

<script>
	import ICountUp from 'vue-countup-v2'

	export default {
		components: { ICountUp },
		methods: {
			handleSetLineChartData(type) {
				// 发布订阅模式,用于子组件向父组件传递消息
				this.$emit('handleSetLineChartData', type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panel-group {
		margin-top: 18px;
		.card-panel-col { margin-bottom: 32px; }
		// 整个卡片的css
		.card-panel {
			position: relative;
			height: 108px;
			cursor: pointer;
			font-size: 12px;
			color: #666;
			background-color: #fff;
			border-color: rgba(0,0,0,.05);
			box-shadow: 4px 4px 40px rgba(0,0,0,.05);
			// 卡片图标外层的css
			.card-panel-icon-wrapper {
				float: left;
				margin: 14px 0 0 14px;
				padding: 16px;
				border-radius: 6px;
				transition: all .38s ease-out;
			}
			// 卡片图标的大小
			.card-panel-icon { font-size: 48px; }
			// 每个单独卡片的图标颜色
			.icon-people { color: #40c9c6; }
			.icon-message { color: #36a3f7; }
    	.icon-money { color: #f4516c; }
    	.icon-shoppingCard { color: #34bfa3 }
			// 鼠标激活后,每个单独卡片的图标颜色和背景颜色
			&:hover {
				.card-panel-icon-wrapper { color: #fff; }
				.icon-people { background-color: #40c9c6; }
				.icon-message { background: #36a3f7; }
      	.icon-money { background: #f4516c; }
      	.icon-shoppingCard { background: #34bfa3; }
			}
			// 卡片描述
			.card-panel-description {
				float: right;
				font-weight: bold;
				margin: 26px;
				.card-panel-text {
					color: rgba(0,0,0,.45);
					font-size: 16px;
					line-height: 18px;
					margin-bottom: 12px;
				}
				.card-panel-num { font-size: 20px; }
			}
		}
	}
</style>