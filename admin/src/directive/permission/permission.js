// 自定义permission指令

import store from '@/store'

export default {
	// 被绑定元素插入父节点时调用
	inserted(el, binding, vnode) {
		const { value } = binding			//指令的绑定值,必须为一个数组
		const roles = store.getters && store.getters.roles   //角色数组

		// 判断传入的指令值是否合格
		if (value && value instanceof Array && value.length > 0) {
			const permissionRoles = value
			// 当前登录的角色是否有权限显示该节点
			 const hasPermission = roles.some(role => {
				return permissionRoles.includes(role)
			})

			// 如果没有权限,则删除该节点
			if (!hasPermission) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		} else {
			throw new Error(`need roles! Like v-permission="[admin, editor]"`)
		}
	}
}
