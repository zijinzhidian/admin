import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginByUsername, logout, getUserInfo } from '@/api/login'

const user = {
	state: {
		token: getToken()
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		}
	},

	actions: {
		// 用户登录
		LoginByUsername({ commit }, userInfo) {
			const username = userInfo.username.trim()
			
		}
	}
}

export default user