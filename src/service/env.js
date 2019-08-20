/**
 * 本地开发用代理转发
 * 线上版本用 baseUrl
 * routerMode: 路由模式
 *发版的时候的使用路径
 */
let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.85.73:8761'
} else {
  // was测试机
  // baseUrl = 'http://10.14.126.59:9080';
  // 连生产的测试机
  // baseUrl = 'http://10.6.18.159:8080';
  // 测试机
  // baseUrl = 'http://192.168.31.100:8083';
  // 本地
  baseUrl = 'http://47.99.208.154:8812'
  // was生产机
  // baseUrl = 'http://fbi.paic.com.cn';
}
export default baseUrl
