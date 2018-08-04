import permission from './permission'

permission.install = function(Vue) {
	Vue.derective('permission', permission)
}

export default permission