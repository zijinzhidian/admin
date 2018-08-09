/**
 * 将get请求的url的请求参数包装成对象
 */
export function param2Obj(url) {
  const search = url.split('?')[1]     //split()以某分隔符将字符串分割成数组
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * 限制方法多次调用(防止抖动)
 * @param {Function} func 需要限制调用的方法
 * @param {Number} wait 方法调用的时间间隔(毫秒)
 * @param {Boolean} immediate 设置方法在开启定时器时调用,还是在开启定时器wait毫秒后调用
 * @return 闭包返回的函数
 */
export function debounce(func, wait, immediate) {
	/*
	timeout:定时器对象
	args:传入的参数(数组)
	context:window对象
	timestamp:调用方法时的时间戳
	result:调用方法后的结果
	*/
	let timeout, args, context, timestamp, result

	const later = function() {
		// 距上一次触发时间间隔
		const last = +new Date() - timestamp
		// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function(...args) {
		context = this					
		timestamp = +new Date()	
		// 如果定时器不存在,重新设定定时器
		if (!timeout) {
			timeout = setTimeout(later, wait)
		}
		// 如果immediate===true且未开始计时,调用此方法
		if (immediate && !timeout) {
			result = func.apply(context, args)
			context = args = null    //调用完成后置为空 
		}
		return result
	}
}


/**
 * 日期时间格式化
 * @param  {Number or Object} time    时间戳或Date对象
 * @param  {String} cFormat 格式化
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0) return null			//如果参数个数为0,返回空

	const format = cFormat ||	'{y}-{m}-{d} {h}:{i}:{s}'	
	let date
	
	// 判断time是时间戳还是时间对象Date
	if (typeof(time) === 'object') {
		date = time
	} else {
		if (('' + time).length === 10) {				//如果时间戳以秒为单位,换为毫秒
			time = parseInt(time) * 1000
		}  
		date = new Date(time)			//时间戳转时间对象
	}

	// 时间格式化
	const formatObj = {
		y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()				//星期
	}

	const time_tr = format.replace(/{(y|m|d|h|i|s|a)}/g, (result, key) => {
		let value = formatObj[key]
		if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_tr
}