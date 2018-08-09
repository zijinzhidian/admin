<template>
	<div class="app-container">

		<div class="filter-container">
			<el-checkbox-group v-model="checkboxVal">
				<el-checkbox label="apple">apple</el-checkbox>
				<el-checkbox label="banana">banana</el-checkbox>
				<el-checkbox label="orange">orange</el-checkbox>
			</el-checkbox-group>
		</div>

		<el-table :data="tableData" :key="key" border fit highlight-current-row>
			<el-table-column prop="name" label="fruitName" width="180"></el-table-column>
			<el-table-column v-for="fruit in formThead" :label="fruit" :key="fruit">
				<template slot-scope="scope">{{ scope.row[fruit] }}</template>
			</el-table-column>
		</el-table>

	</div>
</template>


<script>
	const defaultFormThead = ['apple', 'banana']

	export default {
		data() {
			return {
				tableData: [
					{
						name: 'fruit-1',
						apple: 'apple-10',
						banana: 'banana-10',
						orange: 'orange-10'
					},
					{
						name: 'fruit-2',
						apple: 'apple-20',
						banana: 'banana-20',
						orange: 'orange-20'
					}
				],
				checkboxVal: defaultFormThead,					//复选框选中
				key: 1,																	//table key
				formThead: defaultFormThead,						//默认表头
				formTheadOptions: ['apple', 'banana', 'orange']
			}
		},
		watch: {
			checkboxVal(valArr) {
				this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
				this.key = this.key + 1      //为了保证table每次都会重新渲染
			}
		}
	}
</script>