import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// 免登陆白名单(不需要重定向白名单)
const whiteList = ['/login', '/authredirect']			

/* 
全局前置守卫
	to: 即将要进入的目标路由对象
	from: 当前导航正要离开的路由对象
	next:必须执行的方法,决定执行效果
*/
router.beforeEach((to, from, next) => {
	if (getToken()) {						//有token
		if (to.path === '/login') {		//有token时跳过登录界面
			next({ path: '/' })
		} else {
			if (store.getters.roles.length === 0) {		//判断是否已经拉取用户信息
				console.log(12131)
				store.dispatch('GetUserInfo').then(res => {			//拉取用户信息
					consle.log(res)
					const roles = res.data.roles		
					store.dispatch('GenerateRoutes', { roles }).then(() => {		//根据roles权限生成可访问的路由表
						router.addRoutes(store.getters.addRouters)			//动态添加可访问路由表
						next({...to})
					})
				}).catch((err) => {
					store.dispatch('FedLogOut').then(() => {		//拉取失败,重定向至登录页面
						Message.error(err || 'Verification failed, please login again')
						next({ path: '/' })
					})
				})
			}
		}
	} else {       //无token
		if (whiteList.indexOf(to.path) !== -1) {       //在免登陆白名单中,直接进入
			next()
		} else {			//否则全部重定向到登陆页
			next('/login')
		}
	}
})


/*
初次进入项目router.beforeEach()调用两次的原因
	1.next()表示路由成功,直接进入to路由,不会再次调用router.beforeEach()
	2.next('./login')表示路由拦截成功,且重定向login,会再次调用router.beforeEach()
*/

/*
next()和next(xxxx)的区别
	next(xxxx)代表当前的导航被中断,然后进行一个新的导航。因此next(xxxx)会再次调用router.beforeEach(),而next()不会
*/

/*
初次进入项目的流程
	1.第一次进入项目时,to和from的path都为根路径('/')
	2.缓存里面没有token,且免登陆白名单中没有根路径('/'),所以会调用next('/login')跳转到登陆界面
*/