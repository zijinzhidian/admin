import Mock from 'mockjs'

const List = []
const count = 20

for (let i=0; i<count; i++) {
	List.push(Mock.mock({
		order_no: '@guid()',											//随机生成GUID
		username: '@name()',											//随机生成一个名字
		timestamp: +Mock.Random.date('T'),				//随机生成一个时间戳
		price: '@float(1000, 1500, 0, 2)',				//随机生成一个浮点数,参数依次为:整数部分最小值、整数部分最大值、小数部分位数最小值、小数部分位数最大值
		'status|1': ['success', 'pending']				//'name|1':array 从属性值array中随机选取1个元素,最为最终值
	}))
}

export default {
	getList: () => {
		return {
			total: List.length,
			items: List
		}
	}
}


/*Mock.mock(template)


*/