<template>
	<el-menu class="navbar" mode="horizontal">
		<!-- 侧边栏控制按钮 -->
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

		<!-- 面包屑 -->
		<breadcrumb class="breadcrumb-container"></breadcrumb>

		<div class="right-menu">
			<!-- 全屏按钮 -->
			<el-tooltip effect="dark" placement="bottom" :content="$t('navbar.screenfull')">
				<screenfull class="screenfull right-menu-item"></screenfull>
			</el-tooltip>

			<!-- 语言选择按钮 -->
			<lang-select class="international right-menu-item"></lang-select>

			<!-- 主题选择按钮 -->
			<el-tooltip effect="dark" placement="bottom" :content="$t('navbar.theme')">
				<theme-picker class="theme-switch right-menu-item"></theme-picker>
			</el-tooltip>

			<!-- 头像按钮 -->
			<el-dropdown class="avatar-container right-menu-item" trigger="click">
				<div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
        	<!-- 首页 -->
        	<router-link to="/">
        		<el-dropdown-item>{{$t('navbar.dashboard')}}</el-dropdown-item>
        	</router-link>
        	<!-- 项目地址 -->
        	<a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
        		<el-dropdown-item>{{$t('navbar.github')}}</el-dropdown-item>
        	</a>
        	<!-- 退出登录 -->
        	<el-dropdown-item>
        		<span @click="logout">{{$t('navbar.logOut')}}</span>
        	</el-dropdown-item>
        </el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Hamburger from '@/components/Hamburger'
	import Breadcrumb from '@/components/Breadcrumb'
	import Screenfull from '@/components/Screenfull'
	import LangSelect from '@/components/LangSelect'
	import ThemePicker from '@/components/ThemePicker'

	export default {
		components: {
			Hamburger,
			Breadcrumb,
			Screenfull,
			LangSelect,
			ThemePicker
		},
		computed: {
			...mapGetters([
				'sidebar',
				'name',
				'avatar'
			])
		},
		methods: {
			toggleSideBar() {
				this.$store.dispatch('toggleSideBar')
			},
			logout() {
				this.$store.dispatch('LogOut').then(() => {
					// 刷新界面,为了重新实例化vue-router对象以避免bug
					location.reload()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 50px;
		line-height: 50px;
		border-radius: 0px !important;
		// 侧边栏控制按钮
		.hamburger-container {
			float: left;
			line-height: 58px;
			height: 50px;
			padding: 0 10px;
		}
		// 面包屑
		.breadcrumb-container {
			float: left;
		}
		// 右侧区域
		.right-menu {
			float: right;
			height: 100%;
			.right-menu-item {
				display: inline-block;
				margin: 0 8px;
			}
			.screenfull {
				height: 20px;
			}
			.international {
				vertical-align: top;
			}
			.theme-switch {
				vertical-align: 15px;
			}
			.avatar-container {
      height: 50px;
      margin-right: 30px;
	      .avatar-wrapper {
	        cursor: pointer;
	        margin-top: 5px;
	        position: relative;
	        .user-avatar {
	          width: 40px;
	          height: 40px;
	          border-radius: 10px;
	        }
	        .el-icon-caret-bottom {
	          position: absolute;
	          right: -20px;
	          top: 25px;
	          font-size: 12px;
	        }
	      }
	    }
		}
	}
</style>