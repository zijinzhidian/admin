const getters = {
	language: state => state.app.language,			//语言
	token: state => state.user.token,						//令牌 
	avatar: state => state.user.avatar,					//用户头像
  name: state => state.user.name,							//用户名称
  introduction: state => state.user.introduction,		//用户简介
  roles: state => state.user.roles,						//用户角色
}
export default getters