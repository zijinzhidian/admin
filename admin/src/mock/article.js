import Mock from 'mockjs'
import { param2Obj } from '@/utils'


const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
	List.push(Mock.mock({
		id: '@increment',												//递增的ID
		timestamp: +Mock.Random.date('T'),			
		author: '@first',												//随机英文名
		reviewer: '@first',									
		title: '@title(5, 10)',									//随机生成一个单词字数在[5, 10]之间的标题
		content: baseContent,
		content_short: '我是测试数据',
		forecast: '@float(0, 100, 2, 2)',
		importance: '@integer(1, 3)',						//随机[1, 3]之间的整数
		'type|1': ['CN', 'US', 'JP', 'EU'],
		'status|1': ['published', 'draft', 'deleted'],
		display_time: '@datetime',								//随机的日期时间
		comment_disabled: true,
		pageviews: '@integer(300, 5000)',
		image_uri,
		platforms: ['a-platform']
	}))
}


export default {
	getList: config => {
		const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

		// 数据过滤
		let mockList = List.filter(item => {
			if (importance && item.importance !== +importance) return false
			if (type && item.type !== type) return false
			if (title && item.title.indexOf(title) < 0) return false
			return true
		})

		// 排序('+id'为正序,'-id'为倒序)
		if (sort === '-id') {
			mockList = mockList.reverse()
		}

		// 分页过滤数据
		const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

		return {
			total: mockList.length,
			items: pageList
		}
	}
}