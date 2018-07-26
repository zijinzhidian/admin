<template>
	<section class="todoapp">
		<!-- header -->
		<header class="header">
			<input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
		</header>
		<!-- mian section -->
		<section class="main" v-show="todos.length">
			<input id="toggle-all" class="toggle-all" type="checkbox" :checked="allChecked">
			<label for="toggle-all"></label>
			<ul class="todo-list">
				<todo v-for="(todo, index) in todos" :key="index" :todo="todo"></todo>
			</ul>
		</section>
	</section>
</template>


<script>
	import Todo from './Todo'

	const STORAGE_KEY = 'todos'
	const defaultList = [
	  { text: 'star this repository', done: false },
	  { text: 'fork this repository', done: false },
	  { text: 'follow author', done: false },
	  { text: 'vue-element-admin', done: true },
	  { text: 'vue', done: true },
	  { text: 'element-ui', done: true },
	  { text: 'axios', done: true },
	  { text: 'webpack', done: true }
	]

	export default {
		components: { Todo },
		data() {
			return {
				todos: defaultList
			}
		},
		methods: {
			// 添加新的菜单
			addTodo(e) {

			}
		},
		computed: {
			// 是否全选
			allChecked() {
				return this.todos.every(todo => todo.done)
			}
		}
	}
</script>

<!-- 此处不能加scoped,这样样式才会在import组件中生效 -->
<style lang="scss">
	@import './index.scss';
</style>