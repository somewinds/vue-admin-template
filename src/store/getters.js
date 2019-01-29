const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers, // 基于固定路由，结合动态权限路由后的用户完整路由
  addRouters: state => state.permission.addRouters
}
export default getters
