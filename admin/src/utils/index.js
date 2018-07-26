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