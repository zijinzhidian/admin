import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'


// 创建一个axios实例
const service = axios.create({
	baseURL: process.env.BASE_API,        //'baseURL'将自动加在'url'前面,除非'url'是一个绝对URL
	timeout: 5000
});

// 添加请求拦截器
service.interceptors.request.use(config => {
	// 在发送请求之前需要做的事情
	if (store.getters.token) {
		// 让每个请求携带token,X-Token为自定义key,需根据实际情况自行修改
		config.headers['X-Token'] = getToken();
	}
	return config;
}, error => {
	// 对请求错误做些什么
	console.log(error);
	return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(
	// 对响应数据做点什么
	response => response,
	// 对响应错误做点什么
	error => {
		console.log(error);
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		});
		return Promise.reject(error);
	});


export default service