import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)


/***************************

//默认为false,当设置为true的时候该路由不会在侧边栏出现,如401，login等页面
hidden:true;			//(默认为false)

//当设置为noredirect时,该路由在面包屑导航中不可被点击
redirect:noredirect

//当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
//只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
//若你想不管路由下面的 children 声明的个数都显示你的根路由
//你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true;

//设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
name: "router-name";

//路由元信息
meta: {
  roles: ["admin", "editor"]; //设置该路由进入的权限，支持多个权限叠加(如果没有设置权限,则代表该页面不需要请求权限)
  title: "title"; 						//设置该路由在侧边栏和面包屑中展示的名字
  icon: "svg-name"; 					//设置该路由的图标
  noCache: true; 							//如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
}
****************************/

// 所有权限通用路由表
// 如首页、登录和一些不用权限的公用页面
export const constantRouterMap = [
	{ path: '/login', component: () => import('@/views/login/index'), hidden: true },
	{ path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden:true },
	{ path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
	{ path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
	{
		path: '',
		component: Layout,
		redirect: 'dashboard',					//将根路径重定向至'dashboard'
		children: [{
			path: 'dashboard',
			component: () => import('@/views/dashboard/index'),
			name: 'dashboard',
			meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
		}]
	},
	{
		path: '/documentation',
		component: Layout,
		redirect: '/documentation/index',
		children: [{
			path: 'index',
			component: () => import('@/views/documentation/index'),
			name: 'documentation',
			meta: { title: 'documentation', icon: 'documentation', noCache: true }
		}]
	},
	{
		path: '/guide',
		component: Layout,
		redirect: 'guide/index',
		children: [{
			path: 'index',
			component: () => import('@/views/guide/index'),
			name: 'guide',
			meta: { title: 'guide', icon: 'guide', noCache:true }
		}]
	}
]

// 异步挂载的路由,动态需要根据权限加载的路由表
export const asyncRouterMap = [
	{
		path: '/permission',
		component: Layout,
		redirect: '/permission/index',    //无该路径,因此push到该路径时会导航至404界面
		alwaysShow: true,
		meta: {
			title: 'permission',
			icon: 'lock',
			roles: ['admin', 'editor']
		},
		children: [
			{ path: 'page', component: () => import('@/views/permission/page'), name: 'pagePermission', meta: { title: 'pagePermission', roles: ['admin'] }}, 
			{ path: 'directive', component: () => import('@/views/permission/directive'), name: 'directivePermission', meta: { title: 'directivePermission' }}
		]
	},


	{
		path: '/icon',
		component: Layout,
		children: [{ path: 'index', component: () => import('@/views/svg-icons/index'), name: 'icons', meta: { title: 'icons', icon: 'icon', noCache: true }}]
	},

	{
		path: '/charts',
		component: Layout,
		name: 'charts',
		redirect: 'noredirect',
		meta: {
			title: 'charts',
			icon: 'chart'
		},
		children: [
			{ path: 'keyboard', component: () => import('@/views/charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
			{ path: 'line', component: () => import('@/views/charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: () => import('@/views/charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
		]
	},

	{
		path: '/error',
		component: Layout,
		redirect: 'noredirect',
		name: 'errorPages',
		meta:{
			title: 'errorPages',
			icon: '404'
		},
		children: [
      { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
	},

	{
		path: '/tab',
		component: Layout,
		children: [{ path: 'index', component: () => import('@/views/tab/index'), name: 'tab', meta: { title: 'tab', icon: 'tab'}}]
	},

	{
		path: '/table',
		component: Layout,
		redirect: '/table/complex-table',
		meta: {
			title: 'table',
			icon: 'table'
		},
		children: [
			{ path: 'dynamic-table', component: () => import('@/views/table/dynamicTable/index'), name:'dynamicTable', meta: { title: 'dynamicTable' }},
			{ path: 'drag-table', component: () => import('@/views/table/dragTable'), name: 'dragTable', meta: {title: 'dragTable'}},
			{ path: 'inline-edit-table', component: () => import('@/views/table/inlineEditTable'), name: 'inlineEditTable', meta: {title: 'inlineEditTable'}},
		]
	},

	{
		path: '*',
		redirect: '/404',
		hidden: true
	}

]

export default new Router({
	scrollBehavior: () => ({ y: 0 }),     //切换到新路由时,页面的滚动行为
  routes: constantRouterMap
})
