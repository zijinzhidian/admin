import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
	{path: '/login', component: () => import('@/views/login/index'), hidden: true}
]

export default new Router({
	scrollBehavior: () => ({ y: 0 }),     //切换到新路由时,页面的滚动行为
  routes: constantRouterMap
})
