const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isPro ? 'http://www.huibohehe.com/crmApi/' : '/api/crmApi/'   
  //  api 是虚拟的！！  是会被替换的！！  '/api/crmApi/  会被替换为 http-.com/crmApi/a.php
}