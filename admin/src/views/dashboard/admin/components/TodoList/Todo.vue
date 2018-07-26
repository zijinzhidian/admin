<template>
	<li class="todo" :class="{ completed: todo.done, editing: editing }">
		<div class="view">
			<input 
				class="toggle" 
				type="checkbox"
				:checked="todo.done"
				@change="toggleTodo(todo)">
			<!-- @dblclick:双击事件 -->
			<label v-text="todo.text" @dblclick="editing = true"></label> 
			<button class="destroy" @click="deleteTodo(todo)"></button>  
		</div>
		<input
			class="edit"
			v-show="editing"
			:value="todo.text"
			@keyup.enter="doneEdit"
			@keyup.esc="cancelEdit"
			@blur="doneEdit"
		>
	</li>
</template>

<script>
	export default {
		name: "Todo",
		props: ['todo'],
		data() {
			return {
				editing: false	
			}
		},
		methods: {
			// 菜单状态的改变
			toggleTodo(todo) {
				this.$emit('toggleTodo', todo)
			},
			// 删除菜单
			deleteTodo(todo) {
				this.$emit('deleteTodo', todo)
			},
			// 完成编辑
			doneEdit(e) {
				const value = e.target.value.trim()		//输入的值
				const { todo } = this									//通过解析赋值获取todo
				if (!value) {			//无数据则删除
					this.deleteTodo(todo)
				} else {
					// this.$emit
					todo.text = value
				} 
				this.editing = false 
			},
			// 取消编辑
			cancelEdit() {
				this.editing = false
			}
		}
	}
</script>

