<template>
	<section class="todoapp">
		<!-- header -->
		<header class="header">
			<input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
		</header>
		<!-- mian section -->
		<section class="main" v-show="todos.length">
			<input id="toggle-all" class="toggle-all" type="checkbox" :checked="allChecked" @change="toggleAll()">
			<label for="toggle-all"></label>
			<ul class="todo-list">
				<todo @toggleTodo="toggleTodo" @editTodo="editTodo" @deleteTodo="deleteTodo" v-for="(todo, index) in todos" :key="index" :todo="todo"></todo>
			</ul>
		</section>
		<!-- footer -->
		<footer class="footer" v-show="todos.length">
			<span class="todo=count">
				<strong>{{ remaining }}</strong>
				{{ remaining | pluralize('item') }} left
			</span>
			<ul class="filters">
				<li v-for="(value, key)"></li>
			</ul>
		</footer>
	</section>
</template>


<script>
	import Todo from './Todo'

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
	const filters = {
		all: todos => todos,			//全部
		active: todos => todos.filter(todo => !todo.done),		//未完成的
		compelted: todos => todos.filter(todo => todo.done)		//已完成的
	}

	export default {
		components: { Todo },
		data() {
			return {
				todos: defaultList,
				filters
			}
		},
		methods: {
			// 添加菜单
			addTodo(e) {
				const text = e.target.value
				if (text.trim()) {
					this.todos.push({ text, done: false })
				}
				e.target.value = ''
			},
			// 删除菜单
			deleteTodo(todo) {
				this.todos.splice(this.todos.indexOf(todo), 1)
			},
			// 编辑菜单
			editTodo({ todo, value }) {
				todo.text = value
			},
			// 菜单状态的改变
			toggleTodo(todo) {
				todo.done = !todo.done
			},
			// 全选状态的改变
			toggleAll() {
				const done = !this.allChecked
				this.todos.forEach(todo => {
					todo.done = done
				})
			}
		},
		computed: {
			// 是否全选
			allChecked() {
				return this.todos.every(todo => todo.done)
			},
			// 未完成的个数
			remaining() {
				return this.todos.filter(todo => !todo.done).length
			}
		},
		filters: {
			pluralize: (remaining, content) => remaining === 1 ? content : content + 's'
		}
	}
</script>

<!-- 此处不能加scoped,这样样式才会在import组件中生效 -->
<style lang="scss">
	@import './index.scss';
</style>