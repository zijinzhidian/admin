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
				@contextmenu.prevent.native="openMenu(tag, $event)"
			>
				{{generateTitle(tag.title)}}
				<span class="el-icon-close" @click="closeSelectedTag(tag)"></span>
			</router-link>
		</scroll-pane>
		<ul class="contextmenu" v-show="visible" :style="{left: left+'px', top: top+'px'}">
			<li @click="closeSelectedTag(selectedTag)">{{$t('tagsView.close')}}</li>
      <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
      <li @click="closeAllTags">{{$t('tagsView.closeAll')}}</li>
		</ul>
	</div>
</template>

<script>
	import ScrollPane from '@/components/ScrollPane'
	import { generateTitle } from '@/utils/i18n'

	export default {
		components: { ScrollPane },
		data() {
			return {
				visible: false,			//菜单是否激活 
				top: 0,							//右击点的top
				left: 0,						//右击点的left
				selectedTag: {}    	//右击选中的试图
			}
		},
		computed: {
			visitedViews() {
				return this.$store.state.tagsView.visitedViews
			}
		},
		watch: {
			//监听菜单的显隐情况
			visible(value) {
				if (value) {			//若菜单为显示状态,则注册鼠标的单击事件(即单击后关闭菜单)
					document.body.addEventListener('click', this.closeMenu)
				} else {					//注销点击事件
					document.body.removeEventListener('click', this.closeMenu)
				}
			},
			//监听路由的变化
			$route() {
				this.addViewTags()
				this.moveToCurrentTags()
			}
		},
		methods: {
			// 获取文字
			generateTitle,
			// 获取路由对象
			generateRoute() {
				if (this.$route.name) {
					return this.$route
				}
				return false
			},
			// 判断是否为选中
			isActive(route) {
				return route.path === this.$route.path		
			},
			// 添加浏览试图
			addViewTags() {
				const route = this.generateRoute()
				if (!route) {
					return false
				}
				this.$store.dispatch('addVisitedViews', route)
			},
			// 关闭选中的试图
			closeSelectedTag(view) {
				this.$store.dispatch('delVisitedViews', view).then((views) => {
					if (this.isActive(view)) {		// 若关闭的试图为当前选中的试图
						const lastedView = views.slice(-1)[0]			//获取最后一个试图
						if (lastedView) {   
							this.$router.push(lastedView)  
						} else {
							this.$router.push('/')
						}
					}
				})
			},
			// 关闭其他的试图
			closeOthersTags() {
				this.$router.push(this.selectedTag) 
				this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
					this.moveToCurrentTags()
				})
			},
			// 关闭所有试图
			closeAllTags() {
				this.store.dispatch('delAllViews')
				this.$router.push('/')
			},
			// 移动到当前视图
			moveToCurrentTags() {
				const tags = this.$refs.tag    //还存在的试图组件数组
				this.$nextTick(() => {
					for (const tag of tags) {
						if (tag.to.path === this.$route.path) {
							console.log(this.$refs.scollPane)
							this.$refs.scrollPane.moveToTarget(tag.$el)
							break
						}
					}
				})
			},
			// 打开菜单
			openMenu(tag, e) {
				this.visible = true
				this.selectedTag = tag
				this.left = e.clientX
				this.top = e.clientY
			},
			// 关闭菜单
			closeMenu() {
				this.visible = false
			}
		},
		mounted() {
			this.addViewTags()
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
		.contextmenu {
			position: absolute;
			padding: 5px 0;
			list-style-type: none;
			z-index: 100;
			background-color: #fff;
			color: #333;
			font-size: 12px;
			font-weight: 400;
			border-radius: 4px;
			box-shadow: 2px 2px 3px 0 rgba(0,0,0,.3);
			li {
				padding: 7px 16px;
				cursor: pointer;
				&:hover {
					background-color: #eee;
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