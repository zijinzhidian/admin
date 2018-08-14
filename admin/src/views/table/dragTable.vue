<template>
	<div class="app-container">
		<el-table :data="list" row-key="id" v-loading.body="listLoading" border fit highlight-current-row>
			
			<el-table-column label="ID" width="65px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>

			<el-table-column label="Date" width="180px" align="center">
				<template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
			</el-table-column>

			<el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="icon-star" :key="n"></svg-icon>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="scope">
          <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
        </template>
      </el-table-column>

		</el-table>

		<div class="show-d">{{ $t('table.dragTips1') }} : {{ oldList }}</div>
		<div class="show-d">{{ $t('table.dragTips2') }} : {{ newList }}</div>

	</div>
</template>

<script>
	import { fetchList } from '@/api/article'
	import Sortable from 'sortablejs'

	export default {
		name: 'dragTable',
		data() {
			return {
				list: null,         //数据
				listLoading: true,	//是否正在加载数据
				listQuery: {
					page: 1,
					limit: 10
				},
				newList: [],
				oldList: [],
				sortable: null    //排序对象
			}
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				}
				return statusMap[status]
			}
		},
		methods: {
			getList() {
				this.listLoading = true
				fetchList(this.listQuery).then(response => {
					this.listLoading = false
					this.list = response.data.items
					this.oldList = this.list.map(v => v.id)
					this.newList = this.oldList.slice()
					this.$nextTick(() => {
						this.setSort()
					})
				})
			},
			setSort() {      //需要设置el-table的属性row-key，否则拖拽时会有bug
				const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
				this.sortable = Sortable.create(el, {
					ghostClass: 'sortable-ghost',				//当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况，此配置项就是来给这个影子单元添加一个class，我们可以通过这种方式来给影子元素进行编辑样式
					setData: function(dataTransfer) {		//为了解决Firefox上拖拽的bug
						dataTransfer.setData('Text', '')
					},
					onEnd: evt => {				  //拖放结束后的回调
						const targetRow = this.list.splice(evt.oldIndex, 1)[0]    //拖拽的目标元素,将其从list数组里面删除
						this.list.splice(evt.newIndex, 0, targetRow)							//将拖拽的目标元素重新插入

						const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
						this.newList.splice(evt.newIndex, 0, tempIndex)
					}
				})
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style>
	.sortable-ghost{
	  opacity: .8;
	  color: #fff!important;
	  background: #42b983!important;
	}
</style>

<style scoped>
	.icon-star {
		margin-right: 2px;
	}
	.drag-handler {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
	.show-d {
		margin-top: 15px;
	}
</style>
