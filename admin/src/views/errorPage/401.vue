<template>
	<div class="errPage-container">
		<el-button class="pan-back-btn" @click="back">返回</el-button>
		<el-row>
			<el-col :span="12">
				<h1 class="text-jumbo text-ginormous">Oops!</h1>
				gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a>页面
				<h2>你没有权限去该页面</h2>
				<h6>如果你不满意请联系领导</h6>
				<h6>或者你可以去:</h6>
				<ul class="link-unstyled">
					<li><router-link to="/dashboard">回首页</router-link></li>
					<li><a href="https://www.taobao.com/">随便看看</a></li>
					<li><a href="#" @click.prevent="dialogVisible=true">点我看图</a></li>
				</ul>
			</el-col>
			<el-col :span="12">
				<img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
			</el-col>
		</el-row>
		<el-dialog :visible.sync="dialogVisible">
			<img class="pan-image" src="https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646">
		</el-dialog>
	</div>
</template>


<script>
	import errGif from '@/assets/401_images/401.gif'

	export default {
		name: 'page401',
		data() {
			return {
				errGif: errGif + '?' + +new Date(),
				dialogVisible: false
			}
		},
		methods: {
			back() {
				// 判断路径的查询参数的noGoBack是否为ture
				if (this.$route.query.noGoback) {
					this.$router.push({ path: '/dashboard' })
				} else {
					this.$router.go(-1)
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	.errPage-container {
		width: 800px;
		margin: 100px auto;
		.pan-back-btn {
			background-color: #008489;
			color: #fff;
		}
		.text-jumbo {
			font-weight: 700;
			font-size: 60px;
			color: #484848;
		}
		.link-unstyled {
			font-size: 14px;
			li {
				padding-bottom: 5px;
				a {
					color: #008489;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
		.pan-image {
			block: block;
			margin: 0 auto;
			width: 100%;
		}
	}
</style>