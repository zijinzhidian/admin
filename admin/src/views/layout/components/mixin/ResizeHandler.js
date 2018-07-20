import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
	watch: {
		// 监听路由变化,如果运行环境为手机且侧边栏打开,则关闭侧边栏
		$route() {
			if (this.device === 'mobile' && this.sidebar.opened) {
				store.dispatch('closeSideBar', { withoutAnimation: false })
			}
		} 
	},
	methods: {
		isMobile() {    //宽度小于某个值则视为手机
			const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
		},
		resizeHandler() {
			if (!document.hidden) {
				const isMobile = this.isMobile()
				store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

				//如果运行环境是手机则关闭侧边栏
				if (isMobile) {
					store.dispatch('closeSideBar', { withoutAnimation: true })
				}
			}
		}
	},
	beforeMount() {
		window.addEventListener('resize', this.resizeHandler)     //添加屏幕变化事件
	},
	mounted() {			
		if (this.isMobile()) {		//第一次加载完成时判断程序运行环境是否为手机
			store.dispatch('toggleDevice', 'mobile')
			store.dispatch('closeSideBar', { withoutAnimation: true })
		}
	}
}