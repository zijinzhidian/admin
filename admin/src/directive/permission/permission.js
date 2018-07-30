// 自定义permission指令

import store from '@/store'

console.log(window.Vue)

export default {
	// 被绑定元素插入父节点时调用
	inserted(el, binding, vnode) {
		const { value } = binding			//指令的绑定值
		const roles = store.getters && store.getters.roles   //判断角色是否存在
		
		// 判断传入的指令值是否合格
		if (value && value instanceof Array && value.length > 0) {

		} else {
			throw new Error(`need roles! Like v-permission="[admin, editor]"`)
		}
	}
}
