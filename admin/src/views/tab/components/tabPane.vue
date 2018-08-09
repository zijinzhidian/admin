<template>
	<el-table :data="list" border fit highlight-current-row>
		
		<el-table-column label="ID" width="65" align="center" v-loading="loading" element-loading-text="请给我点时间！">
			<template slot-scope="scope">
				<span>{{ scope.row.id }}</span>
			</template>
		</el-table-column>

		<el-table-column label="Date" width="180px" align="center">
			<template slot-scope="scope">
				<span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
			</template>
		</el-table-column>

		<el-table-column label="Title" min-width="300px" align="left">
			<template slot-scope="scope">
				<span>{{ scope.row.title }}</span>
				<el-tag>{{ scope.row.type }}</el-tag>
			</template>
		</el-table-column>

		<el-table-column label="Author" width="110px" align="center">
			<template slot-scope="scope">
				<span>{{ scope.row.author }}</span>
			</template>
		</el-table-column>

		<el-table-column label="Importance" width="120px" align="center">
			<template slot-scope="scope">
				<svg-icon v-for="n in scope.row.importance" icon-class="star" :key="n"></svg-icon>
			</template>
		</el-table-column>

		<el-table-column label="Readings" width="95px" align="center">
			<template slot-scope="scope">
				<span>{{ scope.row.pageviews }}</span>
			</template>
		</el-table-column>

		<el-table-column label="Status" width="180px" align="center">
			<template slot-scope="scope">
				<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
			</template>
		</el-table-column>

	</el-table>
</template>

<script>
	import { fetchList } from '@/api/article' 

	export default {
		props: {
			type: {
				type: String,
				default: 'CN'
			}
		},
		data() {
			return {
				listQuery: {
					page: 1,
					limit: 5,
					type: this.type,
					sort: '+id'
				},
				list: null,
				loading: false
			}
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danegr'
				}
				return statusMap[status]
			}
		},
		methods: {
			getList() {
				this.loading = true
				fetchList(this.listQuery).then(response => {
					this.list = response.data.items
					this.loading = false
				})
			}
		},
		created() {
			this.$emit('create')
			this.getList()
		}
	}
</script>