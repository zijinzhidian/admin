const tagsView = {
	state: {
		visitedViews: [],     //浏览的视图数组
		cachedViews: []				//缓存的视图数组
	},
	mutations: {
		// 添加浏览的视图
		ADD_VISITED_VIEWS: (state, view) => {
			// 若添加的视图已经存在则不在添加
			if (state.visitedViews.some(v => v.path === view.path)) return
			// 为添加的视图添加title属性
			state.visitedViews.push(Object.assign({}, view, {
				title: view.meta.title || 'no-title'
			}))
			// 若需要缓存,则添加至数组
			if (!view.meta.noCache) {
				state.cachedViews.push(view.name)
			}
		},

		// 删除浏览的视图
		DEL_VISITED_VIEWS: (state, view) => {
			for (const [i ,v] of state.visitedViews.entries()) {
				if (v.path === view.path) {
					state.visitedViews.splice(i, 1)
					break
				}
			}
			for (const name of state.cachedViews) {
				if (name === view.name) {
					const index = state.cachedViews.indexOf(name)
					state.cachedViews.splice(index, 1)
					break
				}
			}
		},

		// 删除除了选中元素外的视图
		DEL_OTHERS_VIEWS: (state, view) => {
			for (const [i, v] of state.visitedViews.entries()) {
				if (v.path === view.path) {
					state.visitedViews = 	state.visitedViews.slice(i, i + 1)		//截取
					break
				}
			}
			for (const name of state.cachedViews) {
				if (name === view.name) {
					const index = state.cachedViews.indexOf(name)
					state.cachedViews = state.cachedViews.slice(index, index + 1)
					break
				}
			}
		},

		// 删除所有试图
		DEL_ALL_VIEWS: (state) => {
			state.visitedViews = []
			state.cachedViews = []
		}
	},
	actions: {
		addVisitedViews({ commit }, view) {
			commit('ADD_VISITED_VIEWS', view)
		},
		delVisitedViews({ commit, state }, view) {
			return new Promise((resolve) => {
				commit('DEL_VISITED_VIEWS', view)
				resolve([...state.visitedViews])
			})
		},
		delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
	}
}

export default tagsView