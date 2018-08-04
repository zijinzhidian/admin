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
	    if (!this.chart) {
	      return
	    }
	    this.chart.dispose()
	    this.chart = null
	  },
	  methods: {
	  	initChart() {
	  		const xData = (function() {
	  			const data = []
	  			for (let i = 1; i < 13; i++) {
	  				data.push(i + 'mouth')
	  			}
	  			return data
	  		}())

	  		this.chart = echarts.init(document.getElementById(this.id))
	  		this.chart.setOption({
	  			backgroundColor: '#344b58',
	  			xAxis: [{
	          type: 'category',
	          axisLine: {
	            lineStyle: {
	              color: '#90979c'
	            }
	          },
	          splitLine: {
	            show: false
	          },
	          axisTick: {
	            show: false
	          },
	          splitArea: {
	            show: false
	          },
	          axisLabel: {
	            interval: 0

	          },
	          data: xData
	        }],
	        yAxis: [{
	          type: 'value',
	          splitLine: {
	            show: false
	          },
	          axisLine: {
	            lineStyle: {
	              color: '#90979c'
	            }
	          },
	          axisTick: {
	            show: false
	          },
	          axisLabel: {
	            interval: 0
	          },
	          splitArea: {
	            show: false
	          }
	       	}],
	       	grid: {
	       		top: 110,
	       		bottom: 95,
	       		borderWidth: 0
	       	},
	       	title: {
	       		text: 'statistics',
	       		x: '20',
	       		top: '20',
	       		textStyle: {
	       			color: '#fff',
	       			fontSize: '22'
	       		}
	       	},
	       	tooltip: {
	       		trigger: 'axis',
	       		axisPointer: {
	       			textStyle: {
	       				color: '#fff'
	       			}
	       		}
	       	},
	       	legend: {
	       		x: '5%',
	       		top: '10%',
	       		textStyle: {
	       			color: '#90979c'
	       		},
	       		data: ['female', 'male', 'average']
	       	},
	       	dataZoom: [{
	       		show: true,
	       		height: 30,
	       		xAxisIndex: [0],
	       		bottom: 30,
	       		start: 10,
	       		end: 80,
	       		borderColor: '#90979c',		
	       		textStyle: { color: '#fff' },
		       	handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
	          handleSize: '110%',
	          handleStyle: { color: '#d3dee5' }
	       	}],
	       	series: [{
	       		name: 'female',
	       		type: 'bar',
	       		stack: 'total',			//数据增叠
	       		barMaxWidth: 35,    //柱条最大宽度
	       		data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078],
	       		itemStyle: {
	       			color: 'rgba(255,144,128,1)'
	       		},
	       		label: {
	       			show: true,
	       			position: 'insideTop',
	       			formatter(p) {
	       				return p.value > 0 ? p.value : ''
	       			}
	       		}
	       	}, {
	       		name: 'male',
	       		type: 'bar',
	       		stack: 'total',
	       		data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220],
	       		itemStyle: {
	       			color: 'rgba(0,191,183,1)'
	       		},
	       		label: {
	       			show: true,
	       			position: 'top',
	       			formatter(p) {
	       				return p.value > 0 ? p.value : ''
	       			}
	       		}
	       	}, {
	       		name: 'average',
	       		type: 'line',
	       		stack: 'total',
	       		symbolSize: 10,
          	symbol: 'circle',
	       		data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298],
	       		itemStyle: {
	       			color: 'rgba(252,230,48,1)'
	       		},
	       		label: {
	       			show: true,
	       			position: 'top',
	       			formatter(p) {
	       				return p.value > 0 ? p.value : ''
	       			}
	       		}
	       	}]
	  		})
	  	}
	  }
	}
</script>