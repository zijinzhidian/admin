import Vue from 'Vue'
// import SvgIcon from '@/components/SvgIcon'			// svg组件

// // 注册全局组件
// Vue.component('svg-icon', SvgIcon)

Vue.component('todo-item', {
	template: '<li>item</li>'
})

console.log(123);


// import Vue from 'vue'
// import SvgIcon from '@/components/SvgIcon'// svg组件
// import generateIconsView from '@/views/svg-icons/generateIconsView.js'// just for @/views/icons , you can delete it

// // register globally
// Vue.component('svg-icon', SvgIcon)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /\.svg$/)
// const iconMap = requireAll(req)

// generateIconsView.generate(iconMap) // just for @/views/icons , you can delete it
