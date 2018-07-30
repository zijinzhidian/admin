<template>
	<el-card class="box-card-component" style="margin-left: 8px;">
		<div slot="header" class="box-card-header">
			<img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
		</div>
		<div style="position: relative;">
			<mallki class="mallki-text"></mallki>
			<pan-thumb class="panthumb" :image="avatar"></pan-thumb>
			<div class="progress-item" style="padding-top: 35px;">
				<span>Vue</span>
				<el-progress :percentage="70"></el-progress>
			</div>
			<div class='progress-item'>
        <span>JavaScript</span>
        <el-progress :percentage="18"></el-progress>
      </div>
      <div class='progress-item'>
        <span>Css</span>
        <el-progress :percentage="12"></el-progress>
      </div>
       <div class='progress-item'>
        <span>ESLint</span>
        <el-progress :percentage="100" status="success"></el-progress>
      </div>
		</div>
	</el-card>
</template>


<script>
	import { mapGetters } from 'vuex'
	import PanThumb from '@/components/PanThumb'
	import Mallki from '@/components/TextHoverEffect/Mallki'

	export default {
		components: { PanThumb, Mallki },
		data() {
			return {

			}
		},
		computed: {
			...mapGetters([
				'name',
				'avatar',
				'roles'
			])
		}
	}
</script>

<style lang="scss">
	.box-card-component {
		.el-card__header {
			padding: 0 !important;
		}
	}
</style>

<style lang="scss" scoped>
	.box-card-component {
		.box-card-header {
			position: relative;
			height: 220px;
			img {
				width: 100%;
				height: 100%;
				transition: all .2s linear;
				&:hover {
					transform: scale(1.1, 1.1);
					filter: contrast(130%);			//滤镜效果
				}
			}
		}
		.mallki-text {
			position: absolute;
			top: 0;
			right: 0;
			font-size: 20px;
			font-weight: bold;
		}
		.panthumb {
			position: absolute;
			top: -45px;
			left: 0px;
			width: 70px !important;
			height: 70px !important;
			box-shadow: none !important;
			border: 5px solid #fff;
			background-color: #fff;
		}
		.progress-item {
			margin-bottom: 10px;
			font-size: 14px;
		}
		@media only screen and (max-width: 1510px) {
			.mallki-text {
				display: none;
			}
		}
	}
</style>