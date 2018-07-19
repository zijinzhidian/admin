<template>
	<div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
		<div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'scrollPane',
		data() {
			return {
				left: 0
			}
		},
		methods: {
			handleScroll(e) {
				const eventDelta = e.wheelDelta || -e.deltaY * 3     //滑轮滚动量
				const $container = this.$refs.scrollContainer  			 //滚动层的div元素
				const $containerWidth = $container.offsetWidth			 //滚动层的div元素的宽度(一般固定,随浏览器变化)
				const $wrapper = this.$refs.scrollWrapper  					 //滚动层上面的内容div元素
      	const $wrapperWidth = $wrapper.offsetWidth					 //滚动层上面的内容div元素的宽度(随上面的内容变化而变化)
				console.log(eventDelta)
      	if (eventDelta > 0) {   	//120的倍数,向上滚动

      	} else {							//-120的倍数,向下滚动

      	}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-container {
		// white-space: nowrap;			//文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止
		position: relative;
		overflow: hidden;
		width: 100%;
		.scroll-wrapper {
			position: absolute;
		}
	}
</style>