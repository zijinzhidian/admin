<template>
	<li class="todo" :class="{ completed: todo.done, editing: editing }">
		<div class="view">
			<input 
				class="toggle" 
				type="checkbox"
				@checked="todo.done"
				@change="toggleTodo(todo)">
			<!-- @dblclick:双击事件 -->
			<label v-text="todo.text" @dblclick="editing = true"></label> 
			<button class="destroy" @click="deleteTodo(todo)"></button>  
		</div>
		<!-- <input type="" name=""> -->
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
			toggleTodo(todo) {

			},
			deleteTodo(tood) {

			}
		}
	}
</script>

