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
			v-focus="editing"
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
		directives: {
			// el为指令绑定的元素,即input标签
			// context为该VueComponent对象
			focus(el, { value }, { context }) {
				if (value) {
					context.$nextTick(() => {
						el.focus()
					})
				}
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
					todo.text = value       //props为对象时，修改其值会影响父组件中的todos
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

