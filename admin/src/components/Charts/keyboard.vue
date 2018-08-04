<template>
	<div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>


<script>
		import echarts from 'echarts'
		import resize from './mixins/resize'

		export default {
			mixins: [resize],
			props: {
				className: {
					type: String,
					default: 'chart'
				},
				id: {
					type: String,
					default: 'chart'
				},
				width: {
					type: String,
					default: '200px'
				},
				height: {
					type: String,
					default: '200px'
				}
			},
			data() {
				return {
					chart: null
				}
			},
			mounted() {
				this.initChart()
			},
			beforeDestroy() {
				if (this.chart) {
					this.chart.dispose()
					this.chart = null
				}
			},
			methods: {
				initChart() {
					const xAxisData = []
					const data = []
					const data2 = []
					for (let i = 0; i < 50; i++) {
						xAxisData.push(i)
						data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
						data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
					}

					this.chart = echarts.init(document.getElementById(this.id))
					this.chart.setOption({
						backgroundColor: '#08263a',
						animationEasing: 'elasticOut',
	          animationEasingUpdate: 'elasticOut',
	          animationDelay(idx) {
	            return idx * 20
	          },
	          animationDelayUpdate(idx) {
	            return idx * 20
	          },
						xAxis: [{		//两个x轴
							show: false,
							data: xAxisData
						}, {
							show: false,
							data: xAxisData
						}],
						yAxis: {
							axisLine: {
								show: false			// 隐藏y轴坐标线
							},
							axisLabel: {
								color: '#4a657a'			//刻度文本颜色
							},
							splitLine: {
								lineStyle: {
									color: '#08263f'		//y轴分割线颜色
								}
							},
							axisTick: {
								show: false					//隐藏坐标轴刻度
							}
						},
						visualMap: {
	            show: false,
	            min: 0,
	            max: 50,
	            dimension: 0,
	            inRange: {
	              color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
	            }
	          },
						series: [{
							name: 'back',
							type: 'bar',
							data: data2,
							z: 1,
							itemStyle: {
								opacity: .4,
								barBorderRadius: 5,
								shadowBlur: 3,
                shadowColor: '#111'
							}
						}, {
							name: 'Simulate Shadow',
							type: 'line',
							showSymbol: false,
							data,
							z: 2,
							animationDelay: 0,
	            animationEasing: 'linear',
	            animationDuration: 1200,
							lineStyle: {
								color: 'transparent'
							},
							areaStyle: {
								color: '#08263a',
                shadowBlur: 50,
                shadowColor: '#000'
							}
						}, {
							name: 'front',
							type: 'bar',
							data,
							z: 3,
							xAxisIndex: 1,
							itemStyle: {
								barBorderRadius: 5
							}			
						}]
					})
				}
			}
		}
</script>