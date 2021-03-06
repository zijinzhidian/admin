/*
安装vue-i18n(国际化标准语言)
	npm install vue-i18n --save
*/

/*安装element
	npm i element-ui -S
*/

/*
安装vuex
	npm install vuex --save
*/

/* 
安装scss依赖
	npm install node-sass --sava-dev
	npm install sass-loader --save-dev
*/

/* 
安装cross-env(用于配置项目多环境)
	npm install cross-env --save-dev
*/

/*
1.安装svg-sprite-loader(用于处理svg图标,将多个svg打包成svg-sprite)
	npm install svg-sprite-loader --sava-dev

2.具体的配置在webpack.base.conf.js文件
*/

/*
安装js-cookie(用于操作cookie)
	npm install js-cookie --save
*/

/*
安装axios(用于数据请求)
	npm install axios --save
*/

/*
安装mockjs(用于模拟请求数据)
	npm install mockjs
*/

/*
安装screenfull(用于全屏显示)
	npm install screenfull --save
*/

/*
安装countup(用于数字动画跳动)
	npm install --save countup.js vue-countup-v2
*/

/*
安装echarts(各种可视化图形)
	npm install --save echarts
*/

/*安装driver.js(用于页面分布引导)
	npm install driver.js
*/

/*安装normalize.css(用于在默认的HTML元素样式上提供了跨浏览器的高度一致性)
	npm install --save normalize.css
*/

/*安装NProgress(网页加载进度条)
	npm install nprogress --save
*/

/*安装clipboard(用于复制粘贴到剪切板)
	npm install clipboard --save
*/

/*安装sortable.js(拖放排序插件)
	npm install sortablejs --save
*/

import Vue from 'vue'        	//完整写法:import Vue from '../node_modules/vue/dist/vue.js'
import App from './App'		 		//完整写法:import App from './App.vue'
import router from './router'   //导入的是router文件夹下的index.js文件

//全局样式
import '@/styles/index.scss'

//格式化样式
import 'normalize.css'

//Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//国际化语言
import i18n from './lang'

//vuex
import store from './store'

//icon
import './icons'

//权限控制
import './permission'

//模拟数据
import './mock'

//全局过滤器
import * as filters from './filters'

Vue.config.productionTip = false

//全局配置Element
Vue.use(ElementUI, {
	size: 'medium',     //设置组件默认尺寸
	i18n: (key, value) => i18n.t(key, value)   //设置语言转化
})

//注册全局过滤器
Object.keys(filters).forEach(key => {			//Object.keys()  获取对象的所有键值,返回一个数组
	Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})


// 登录的authredirect界面

