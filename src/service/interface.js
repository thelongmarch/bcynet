const newfixURL = '/xbg/';
 
const DI = {  
  /* *********************注册登录************************************ */
   // 注册之后获取手机号验证码
   getPhoneCode: newfixURL + 'user/getPhoneCode',   
   // 登录
   login: newfixURL + 'user/login',   
   // 登出
   logout: newfixURL + 'user/logout',   
   // 注册
   regist: newfixURL + 'user/regist',   
   // 企业注册
   registEnterprise: newfixURL + 'user/registEnterprise',   
  /* ********************************************************* */
}

export default DI
