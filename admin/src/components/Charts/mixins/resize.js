import { debounce } from '@/utils'

export default {
	mounted() {
		this.__resizeHandle = debounce(() => {
			if (this.chart) {
				this.chart.resize()
			}
		}, 100)
		window.addEventListener('resize', this.__resizeHandle)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.__resizeHandle)
	}
}