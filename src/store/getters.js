// 从各modules中映射出参数，这样就不需要从state中获取了，可以通过getters快速获取
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 从user映射出token
  user: state => state.user.user, // 从user映射出user
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers, // 基于固定路由，结合动态权限路由后的用户完整路由
  authed_urls: state => state.permission.authed_urls, //
  addRouters: state => state.permission.addRouters
}
export default getters
