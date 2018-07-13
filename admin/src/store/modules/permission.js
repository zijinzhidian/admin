// 权限管理界面

import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过route.meta.role判断是否与当前用户权限匹配
 * @param {array} roles 用户角色权限数组
 * @param {object} route 路由对象
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		// some()方法会依次执行数组的每个元素。如果有一个元素满足条件,则表达式返回返回true,剩余的元素不会再执行检测
		return roles.some(role => route.meta.roles.indexOf(role) >= 0)
	} else {
		return true
	}
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param  {array} asyncRouterMap	 异步路由表
 * @param  {array} roles	用户角色权限数组	
 */
function filterAsyncRouter(asyncRouterMap, roles) {
	const accessedRouters = asyncRouterMap.filter(route => {
		if (hasPermission(roles, route)) {
			if (route.children && route.children.length) {
				route.children = filterAsyncRouter(route.children, roles)
			}
			return true     //权限匹配成功则保留
		}
		return false 			//无权限则过滤
	})
	return accessedRouters
}

const permission = {
	state: {
		routers: constantRouterMap,			//权限路由数组(默认为公用路由数组)
		addRouters: []									//需要动态添加的路由数组
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)			//拼接路由数组
		}
	},
	actions: {
		GenerateRoutes({ commit }, data) {
			return new Promise(resolve => {
				const { roles } = data		//用户角色权限
				let accessedRouters
				if (roles.indexOf('admin') >= 0) {		//admin超级管理员,无权限限制
					accessedRouters = asyncRouterMap
				} else {
					accessedRouters = filterAsyncRouter(asyncRouterMap, roles)			//过滤
				}
				commit('SET_ROUTERS', accessedRouters)
				resolve()
			})
		}
	}
}

export default permission