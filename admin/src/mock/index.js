import Mock from 'mockjs'
import loginAPI from './login'

/*
Mock.mock(rurl, rtype, function(options))
	rurl:表示需要拦截的URL,可以是URL字符串或URL正则表达式。例如/\/domian\/list\.json/代表'/domian/list.json'
	rtype:表示需要拦截的Ajax请求类型
	function(options):表示用于生成响应数据的函数
	options:指向本次请求的Ajax选项集
*/


// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)

export default Mock