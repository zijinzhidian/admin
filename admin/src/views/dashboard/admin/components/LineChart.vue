<template>
	<!-- 为ECharts准备一个具备宽高的DOM -->
	<div :class="className" :style="{width:width,height:height}"></div>
</template>

<script>
	import echarts from 'echarts'

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '350px'
			},
			autoResize: {
				type: Boolean,
				default: true
			},
			chartData: {
				type: Object
			}
		},
		data() {
			return {
				chart: null				//chart对象
			}
		},
		methods: {
			setOptions() {
				const myChart = echarts.init(document.getElementsByClassName(this.className)[0])
				myChart.setOption({
					// x轴
					xAxis: {
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],       // 刻度标签显示数据
						boundaryGap: false,		   			// 坐标轴两边留白策略,即开端和终端是否有空白部分
						axisTick: { 									//坐标轴刻度相关配置
							show: false 								//是否显示坐标轴刻度，默认为true
						}     
					},
					// y轴
					yAxis: {
						axisTick: { 
							show: false 
						}
					},
					// 直角坐标系内绘图网格
					grid: {
						left: 10,						//grid组件离容器左侧的距离，默认为10%
						right: 10,					//默认为10%
						bottom: 20,					//默认为60
						top: 30,						//默认为60
						containLabel: true	//grid区域是否包含坐标的刻度标签，默认为false
					},
					// 提示框浮层组件
					tooltip: {
						trigger: 'axis',				//触发类型(<1>axis:坐标轴触发  <2>item(默认):数据项图形触发  <3>none:不触发)
          	axisPointer: { 					//坐标轴指示器配置项
          		type: 'cross' 				//指示器类型(<1>line(默认):直线指示器  <2>shadow:阴影指示器   <3>cross:十字准星指示器)
          	},  
          	padding: [5, 10]				//内边距,默认为5	
					},
					// 图例组件
					legend: {
						data: ['expected', 'actual']      //图例的数据数组,每一项代表一个系列(series)的name
					},
					// 系列列表
					series: [{
						type: 'line',				//系列类型
						name: 'expected'		//系列名称，用于tooltip的显示，legend的图例筛选(需要和legend的data相对应,否则)
					}]
				})
			} 
		},
		mounted() {
			this.setOptions()
		}
	}

</script>