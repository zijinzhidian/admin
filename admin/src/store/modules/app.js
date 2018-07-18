import Cookies from 'js-cookie'

const app = {
	// 状态
	state: {
		sidebar: {
			opened: !+Cookies.get('sidebarStatus'),				//侧边栏状态
			withoutAnimation: false												//侧边栏是否有动画
		},
		language: Cookies.get('language') || 'en',      //缓存的语言
		device: 'deskTop'						//运行环境,电脑还是手机
	},

	// 状态变更（必须是同步函数）
	mutations: {
		// 触发侧边栏
		TOGGLE_SIDEBAR: state => {
			if (state.sidebar.opened) {
				Cookies.set('sidebarStatus', 1)
			} else {
				Cookies.set('sidebarStatus', 0)
			}
			state.sidebar.opened = !state.sidebar.opened
			state.sidebar.withoutAnimation = false
		},
		// 关闭侧边栏
		CLOSE_SIDEBAR: (state, withoutAnimation) => {
			Cookies.set('sidebarStatus', 1)
			state.sidebar.opened = false
			state.sidebar.withoutAnimation = withoutAnimation
		},
		// 更改语言
		SET_LANGUEGE: (state, language) => {
			state.language = language
			Cookies.set('language', language)
		},
		// 更改运行环境
		TOGGLE_DEVICE: (state, device) => {
			state.device = device
		}
	},
	
	// 类似于mutations,但是提交的是mutation,而不是直接变更状态(可以包含任意异步操作)
	actions: {
		toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
		setLanguage({ commit }, language) {
			commit('SET_LANGUEGE', language)
		},
		toggleDevice({ commit }, device) {
			commit('TOGGLE_DEVICE', device)
		}
	}
}

export default app