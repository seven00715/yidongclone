const USE_TOKEN = 'hm-m-91-token'

// 定义三个方法进行token的存,取,删

// 读取用户信息
export function getToken () {
  return JSON.parse(localStorage.getItem(USE_TOKEN) || '{}') // 短路表达式  USE_TOKEN没有默认为空
}
// 设置用户信息
export function setToken (use) {
  return localStorage.setItem(USE_TOKEN, JSON.stringify(use))
}
// 移除用户信息
export function removeToken () {
  return localStorage.removeItem(USE_TOKEN)
}
