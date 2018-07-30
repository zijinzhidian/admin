<!-- 轻扫的权限管理头像 -->


<template>
	<div class="pan-item" :style="{zIndex:zIndex, height:height, width:width}">
		<div class="pan-info">
			<!-- 角色权限内容部分 -->
			<div class="pan-info-roles-container">
				<slot></slot>
			</div>
		</div>
		<!-- 角色权限头像部分 -->
		<img class="pan-thumb" :src="image">
	</div>
</template>

<script>
	export default {
		name: 'PanThumb',
		props: {
			image: {			//头像图片地址
				type: String,
				required: true
			},
			zIndex: {
				type: Number,
				default: 1
			},
			width: {
				type: String,
				default: '150px'
			},
			height: {
				type: String,
				default: '150px'
			}
		}
	}
</script>



<style lang="scss" scoped>
	.pan-item {
		position: relative;
		display: inline-block;
		border-radius: 50%;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		.pan-thumb {
			position: absolute;
			width: 100%;
			height: 100%;
			background-size: 100%;			
		  border-radius: 50%;
		  transform-origin: 95% 40%;						//旋转定位点
		  transition: all .3s ease-in-out;			//旋转动画
		}
		&:hover .pan-thumb {
			transform: rotate(-110deg);
		}
		.pan-info-roles-container {
			padding: 20px;
			text-align: center;   //字居中
		}
		.pan-info {
			position: absolute;
			width: inherit;			//宽度继承
			height: inherit;		//高度继承
			border-radius: 50%;
			box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
		}
	}
</style>