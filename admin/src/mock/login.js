const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
	// 登陆成功后返回的数据
	loginByUsername: config => {	
		const { username } = JSON.parse(config.body)			//获取用户名
		return  userMap[username]						//根据用户名返回指定数据
	},
	// 用户信息
	getUserInfo: config => {
		return false
	},
	// 退出登陆后返回的数据
	logout: () => 'success'
}