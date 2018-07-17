const getters = {
	language: state => state.app.language,			//语言
	sidebar: state => state.app.sidebar,				//侧边栏				
	token: state => state.user.token,						//令牌 
	avatar: state => state.user.avatar,					//用户头像
  name: state => state.user.name,							//用户名称
  introduction: state => state.user.introduction,		//用户简介
  roles: state => state.user.roles,						//用户角色
  permission_routers: state => state.permission.routers,		//权限路由表
  addRouters: state => state.permission.addRouters,					//动态添加的路由表
}
export default getters