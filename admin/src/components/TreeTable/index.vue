<template>
	<el-table></el-table>
</template>

<script>
	export default {
		name: 'treeTable',
		props: {
			data: {
				type: [Array, Object],
				required: true
			},
			columns: {
				type: Array,
				default: () => []
			},
			evalFunc: Function
		},
		computed: {
			// 格式化数据源
			formatData() {
				let temp     		//临时数据
				if (!Array.isArray(this.data)) {				//若data为对象则转为数组
					temp = [this.data]
				} else {
					temp = this.data
				}
				const func = this.evalFunc || treeToArray
			}
		}
	}
</script>