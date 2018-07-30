<!-- 分享下拉组件 -->

<template>
	<div class="share-dropdown-menu" :class="{active: isActive}">
		<div class="share-dropdown-menu-wrapper">
			<span class="share-dropdown-menu-title" @click.self="clickTitle">{{ title }}</span>
			<div class="share-dropdown-menu-item" v-for="(item, index) of items" :key="index">
				<a v-if="item.href" :href="item.href" target="_blank">{{ item.title }}</a>
				<span v-else>{{ item.title }}</span>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props: {
			items: {
				type: Array
			},
			title: {
				type: String,
				default: 'vue'
			}
		},
		data() {
			return {
				isActive: false
			}
		},
		methods: {
			clickTitle() {
				this.isActive = !this.isActive
			}
		}
	}
</script>

<style lang="scss" scoped>
	$n: 6;				//item个数
	$t: .1s;			//动画延迟时间

	.share-dropdown-menu {
		position: relative;
		z-index: 1;
		width: 250px;
		background-color: red;
		&-wrapper {
			position: relative;
		}
		&-title {
			z-index: 2;
			display: block;
			width: 100%;
			height: 60px;
			color: white;
			line-height: 60px;
			text-align: center;
			font-size: 20px;
			background-color: black;
			cursor: pointer;
		}
		&-item {
			position: absolute;
			width: 100%;
			height: 60px;
			line-height: 60px;
			text-align: center;
			font-size: 20px;
			background-color: #e0e0e0;
			cursor: pointer;
			transition: transform .28s ease;
			&:hover {
				background-color: black;
				color: white;
			}
			@for $i from 1 through $n {			
				&:nth-of-type(#{$i}) {
					z-index: -1;
					transition-delay: $i * $t;								//隐藏的动画延迟时间
					transform: translate3d(0, -60px, 0)				//全部上移60px
				}
			}
		}
		&.active {
			.share-dropdown-menu-wrapper {
				z-index: 1;
			}
			.share-dropdown-menu-item {
				@for $i from 1 through $n {
					&:nth-of-type(#{$i}) {
						transition-delay: ($n - $i) * $t;			//显示的动画延迟时间
						transform: translate3d(0, ($i - 1) * 60px, 0);
					}
				}	
			}
		}
	}

</style>