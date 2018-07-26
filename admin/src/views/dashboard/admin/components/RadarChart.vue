<template>
	<div :class="className" :style="{width:width,height:height}"></div>
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons')			//引入macarons主题
	import { debounce } from '@/utils' 

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
				default: '300px'
			}
		},
		data() {
			return {
				chart: null
			}
		},
		methods: {
			initChart() {
				this.chart = echarts.init(this.$el, 'macarons')
				this.chart.setOption({
					// 雷达图坐标系组件
					radar: {
						// 半径
						radius: '66%',
						// 中心坐标
						center: ['50%', '42%'],
						// 指示器轴的分割段数
						splitNumber: 8,
						// 分隔区域
						splitArea: {
							areaStyle: {
								color: 'rgba(127,95,132,.3)',		
								shadowBlur: 45,
	              shadowColor: 'rgba(0,0,0,.5)',
	              shadowOffsetX: 0,
	              shadowOffsetY: 15
							}
						},
						// 雷达图的指示器,用来制定雷达图中的多个维度
						indicator: [
							{ name: 'Sales', max: 10000 },
	            { name: 'Administration', max: 20000 },
	            { name: 'Information Techology', max: 20000 },
	            { name: 'Customer Support', max: 20000 },
	            { name: 'Development', max: 20000 },
	            { name: 'Marketing', max: 20000 }
						]
					},

					// 图例组件
					legend: {
						data: ['Allocated Budget', 'Expected Spending', 'Actual Spending'],
						bottom: '10',
					},

					// 系列列表
					series: [{
						type: 'radar',
						symbolSize: 0,
						animationDuration: 3000,
						areaStyle: {
							shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
						},
						data: [
							{
	              value: [5000, 7000, 12000, 11000, 15000, 14000],
	              name: 'Allocated Budget'
	            },
	            {
	              value: [4000, 9000, 15000, 15000, 13000, 11000],
	              name: 'Expected Spending'
	            },
	            {
	              value: [5500, 11000, 12000, 15000, 12000, 12000],
	              name: 'Actual Spending'
	            }
						]
					}]
					
				})
			}
		},
		mounted() {
			this.initChart()
			this.__resizeHandle = debounce(() => {
				if (this.chart) this.chart.resize()
			}, 100)
			window.addEventListener('resize', this.__resizeHandle)
		},
		beforeDestroy() {
			if (!this.chart) return
			window.removeEventListener('resize', this.__resizeHanlder)
	    this.chart.dispose()
	    this.chart = null
		}
	}

</script>