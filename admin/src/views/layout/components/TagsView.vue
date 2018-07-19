<template>
	<div class="tags-view-container">
		<scroll-pane class="tags-view-wrapper" ref="scollPane">
			<router-link 
				class="tags-view-item" 
				ref="tag" 
				:class="isActive(tag)?'active':''" 
				v-for="tag in visitedViews" 
				:to="tag" 
				:key="tag.path"
			>
				xxxxx
				<span class="el-icon-close" @click.prevent="closeSelectedTag"></span>
			</router-link>
		</scroll-pane>
	</div>
</template>

<script>
	import ScrollPane from '@/components/ScrollPane'

	export default {
		components: { ScrollPane },
		data() {
			return {

			}
		},
		computed: {
			visitedViews() {
				return this.$store.state.tagsView.visitedViews
			}
		},
		methods: {
			// 判断是否为选中
			isActive(route) {
				return route.path === this.$route.path		
			},
			// 关闭按钮的点击事件
			closeSelectedTag() {
				console.log('点击了')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tags-view-container {
		.tags-view-wrapper {
			background-color: #fff;
			height: 34px;
			border-bottom: 1px solid #d8dce5;
			box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
		}
		.tags-view-item {
			display: inline-block;
			position: relative;
			height: 26px;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background-color: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;
			// 第一个元素
			&:first-of-type {
				margin-left: 15px; 
			}
			// 当前选中的元素
			&.active {
				background-color: #42b983;
				color: #fff;
				border-color: #42b983;
				// 向选中元素前添加小白点
				&::before {
					content: '';
					background-color: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					margin-right: 2px;
				}
			}
		}
	}

	.el-icon-close {
		width: 16px;
		height: 16px;
		vertical-align: 2px;
		text-align: center;				//水平居中
		border-radius: 50%;				//圆角
		// transition: all .3s cubic-bezier(.645, .045, .355, 1);
    // transform-origin: 100% 50%;
		&:hover {
			background-color: #b4bccc;     //图标激活背景颜色
			color: #fff;									 //图标激活颜色
		}
		// icon里面的'X'
		&:before {
				display: inline-block;			 //设置为块级元素,否则不能缩放
        transform: scale(.6);				 //缩小为0.6倍
        vertical-align: -3px;
      }
	}
</style>