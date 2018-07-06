import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'			// svg组件

// // 注册全局组件
Vue.component('svg-icon', SvgIcon)

// import generateIconsView from '@/views/svg-icons/generateIconsView.js'// just for @/views/icons , you can delete it

/*
1.require.context的作用：通过正则匹配引入相应的文件模块

2.require.context有三个参数:
	+ directory：说明需要检索的目录
	+ useSubdirectories：是否检索子目录
	+ regExp：匹配怒文件的正则表达式
*/
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)         //引入svg文件夹(不包含子目录)下面的所有以.svg结尾的文件
const iconMap = requireAll(req)

// generateIconsView.generate(iconMap) // just for @/views/icons , you can delete it
