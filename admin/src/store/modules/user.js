import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginByUsername, logout, getUserInfo } from '@/api/login'

const user = {
	state: {
		token: getToken(),		//令牌
		roles: [],						//用户角色
		name: '',							//用户名称
		avatar: '',						//用户头像url
		introduction: '',			//用户介绍
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_INTRODUCTION: (state, introduction) => {
			state.introduction = introduction
		}
	},

	actions: {
		// 用户登录
		LoginByUsername({ commit }, userInfo) {
			const username = userInfo.username.trim()      //trim()：去除字符串前后空格
			return new Promise((resolve, reject) => {   //该方法返回一个Promise对象
				loginByUsername(username, userInfo.password).then(response => {		//登陆成功
					commit('SET_TOKEN', response.data.token)		//变更token状态
					setToken(response.data.token)								//token保存至cookies		
					resolve()
				}).catch(error => {			//登陆失败
					reject(error)
				})
			})
		},

		// 获取用户信息
		GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				getUserInfo(state.token).then(response => {     //获取信息成功
					if (!response.data) {   // 由于mockjs 不支持自定义状态码只能这样写
						reject('error')
					}
					const data = response.data
					if (data.roles && data.roles.length > 0) {		//验证返回的roles数组是否为空
						commit('SET_ROLES', data.roles)
					} else {
						reject('getInfo: roles must be a non-null array !')
					}
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_INTRODUCTION', data.introduction)
					resolve(response)
				}).catch(error => {				//获取信息失败
					reject(error)
				})
			})
		},

		// 登出
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {			//登出成功
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					removeToken()
					resolve()
				}).catch(error => {			//登出失败
					reject(error)
				})
			})
		},

		// 前端登出
		FedLogOut({ commit }) {
			return new Promise((resolve) => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		},

		// 动态修改权限
		ChangeRoles({ commit }, role) {
			return new Promise(resolve => {
				commit('SET_TOKEN', role)
				setToken(role)
				getUserInfo(role).then(response => {
					const data = response.data
					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_INTRODUCTION', data.introduction)
					resolve()
				})
			})
		}
	}
}

export default user