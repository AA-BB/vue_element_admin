



/**
 *  ❶ baseURL
 *  ❷ headers
 *  ❸ URL:{
         ❶ 接口地址1
         ❷ 接口地址2
         ❸ 接口地址3
         ❹ ...
      }
 * **/

export default{
  baseURL:'http://pro2test.zjyckj.com.cn:8090/',        // 测试环境服务器



  /** URL **/
  // ❶ 登录接口
  login:'api/ums/user/login/password',

  // ❷ 数据统计图接口
  statistics:'http://114.55.53.54:8699/ycWatch/watch/ch',

  // ❸ 佛文、佛乐、诵经管理 => 数据列表接口
  manageList: 'http://192.168.1.12:7001/api/v1/admin/query_accounts',

  // ❹ 佛文、佛乐管理 => 佛文、佛乐列表 => 类型选择接口
  // statisticsList: 'api/cihang/buddhistResourceManage/resLst',

  // ❺ 佛乐、佛乐、诵经管理>佛乐、佛乐、经文列表  => 删除接口
  delRow:'api/cihang/buddhistResourceManage/del',

  // ❻ 佛乐、诵经管理>佛乐、佛乐、经文列表  => 编辑接口
  saveEdit:'api/cihang/buddhistResourceManage/edit',

  // ❼ 佛文、佛乐、诵经管理 => 佛文、佛乐、经文列表 => 分页条接口
  // statisticsList: 'api/cihang/buddhistResourceManage/resLst',

  // ❽ 佛乐、诵经管理 => 添加 => 文件上传接口
  //文件上传地址
  region:'oss-cn-hangzhou.aliyuncs.com',
  uploadEndPoint:'http://oss-cn-hangzhou.aliyuncs.com',
  bucket:'yckj-tmp',
  //上传通行码请求地址
  uploadPassCode:'/api/ums/systemUploadConfig/system/type',

  // ❾ 佛文、佛乐、诵经管理 => 添加佛文 => 表单提交接口
  submit:'api/cihang/buddhistResourceManage/add'

}
