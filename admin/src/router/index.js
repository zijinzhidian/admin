import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 所有权限通用路由表
// 如首页、登录和一些不用权限的公用页面
export const constantRouterMap = [
	{ path: '/login', component: () => import('@/views/login/index'), hidden: true },
	{ path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden:true }
]

// 异步挂载的路由,动态需要根据权限加载的路由表
export const asyncRouterMap = [
	
]

export default new Router({
	scrollBehavior: () => ({ y: 0 }),     //切换到新路由时,页面的滚动行为
  routes: constantRouterMap
})
