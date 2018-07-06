import Cookies from 'js-cookie'

const app = {
	//状态
	state: {
		language: Cookies.get('language') || 'en'      //缓存的语言
	},
	//状态变更（必须是同步函数）
	mutations: {
		//更改语言
		SET_LANGUEGE: (state, language) => {
			state.language = language
			Cookies.set('language', language)
		}
	},
	//类似于mutations,但是提交的是mutation,而不是直接变更状态(可以包含任意异步操作)
	actions: {
		setLanguage({ commit }, language) {
			commit('SET_LANGUEGE', language)
		}
	}
}

export default app