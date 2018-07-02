/*
安装vue-i18n
npm install vue-i18n --save
*/

/* 安装scss依赖
	npm install node-sass --sava-dev
	npm install sass-loader --save-dev
*/

/* 安装cross-env(用于配置项目多环境)
	npm install cross-env --save-dev
*/

import Vue from 'vue'        	//完整写法:import Vue from '../node_modules/vue/dist/vue.js'
import App from './App'		 		//完整写法:import App from './App.vue'
import router from './router'   //导入的是router文件夹下的index.js文件

// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//国际化语言
import i18n from './lang'

// icon
import './icons'

import './test'

Vue.config.productionTip = false

// 全局配置Element
Vue.use(ElementUI, {
	size: 'medium',     //设置组件默认尺寸
	i18n: (key, value) => i18n.t(key, value)   //设置语言转化
})

// Vue.component('todo-item', {
// 	template: '<li>item</li>'
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

