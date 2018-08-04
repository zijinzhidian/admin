<template>
	<div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
		<div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	const padding = 15			//总内容在滚动层上面的偏移量

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
				const $wrapper = this.$refs.scrollWrapper  					 //滚动层上面的总内容
      	const $wrapperWidth = $wrapper.offsetWidth					 //滚动层上面的总内容宽度

      	if (eventDelta > 0) {   	//120的倍数,向上滚动
      		this.left = Math.min(0, this.left + eventDelta)
      	} else {							//-120的倍数,向下滚动
      		if ($containerWidth - padding < $wrapperWidth) {		//总内容宽度超过滚动层,需要进行滚动
      			this.left = Math.max(this.left + eventDelta, -($wrapperWidth + padding - $containerWidth))
      		} else {				//总内容宽度未超过滚动层,不需要进行滚动
      			this.left = 0
      		}
      	}
			},

			moveToTarget($target) {
				const $container = this.$refs.scrollContainer  		
				const $containerWidth = $container.offsetWidth
				const $targetLeft = $target.offsetLeft					//该元素距离父元素的左边距离
				const $targetWidth = $target.offsetWidth				//该元素的宽度
				console.log($targetLeft)
				console.log(-this.left)
	      if ($targetLeft < -this.left) {  //若偏移量大于左边距,说明该元素已经超出左边界
	        this.left = -$targetLeft + padding
	      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {	 //该元素在中间
	 
	      } else {			//该元素超出右边界
	        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
	      }
	   

			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-container {
		white-space: nowrap;			//文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止
		position: relative;
		overflow: hidden;
		width: 100%;
		.scroll-wrapper {
			position: absolute;
		}
	}
</style>