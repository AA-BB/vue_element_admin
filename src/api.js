// 登录
//export const LOGIN = '/api/v1/admin/login';
export const LOGIN='/api/v1/admin/login';
export const LOGINOUT = '/api/v1/admin/logout';
export const changepassword = '/api/v1/admin/check_old_pwd';
export const QUERY_ACCOUNT = '/api/v1/admin/list';
export const SUBMIT_FORM='/api/v1/admin/add';
export const OPTION_FORM='/api/v1/admin/logs';

export const MEMBER_FORM='/api/v1/user/list';
// 重置密码
export const RESET_PASSWORD='/api/v1/admin/resetting';
// 停用賬號
export const STOP_ACCOUNT='/api/v1/admin/forbidden';
// 啟用管理員賬號
export const START_ACCOUNT='/api/v1/admin/enable';
// 版本列表
export const VERSION_RELEASE='/api/v1/version/list';
export const VERSION_ADD='/api/v1/version/add_update';


// 订单管理
export const ORDER_MANAGE='/api/v1/order/list';
// 订单详情
export const ORDER_DES='/api/v1/order/detail';
// 订单统计
export const ORDER_STATIS='/api/v1/order/statistic';
// 用户统计
export const MEMBER_STATIS='/api/v1/user/statistic';
export const MEMBER_STATISLIST='/api/v1/user/daily_statistic';
// 禁用用户
export const MEMBER_STOP='/api/v1/user/disable';
// 启用用户
export const MEMBER_START='/api/v1/user/enable';
// 订单LIEBIAO
export const ORDER_LIST='/api/v1/order/daily_statistic';
// banner管理
export const BANNER_MANAGE='/api/v1/banner/list';
// 編輯banner
export const BANNER_EDIT='/api/v1/banner/add_update';
// banner删除
export const BANNER_DELE='/api/v1/banner/delete';
// 文章管理
export const ARTICLE_MANAGE='/api/v1/article/list';
// 優惠券管理
export const DISCOUNT_MANAGE='/api/v1/coupon/list';
export const STARTDISSACCOUNT='/api/v1/coupon/on';
export const STOPDISSACCOUNT='/api/v1/coupon/off';
export const RELEASEDISSCOUNT='/api/v1/coupon/grant';
export const EDITDISSCOUNT='/api/v1/coupon/add_update';
export const ADDDISSCOUNT='/api/v1/coupon/add_update';
// 兌換碼管理
export const REDCODE_MANAGE='/api/v1/code/list';
export const SHENGCHENG_REDCODE='/api/v1/code/generate';
export const ADDREDCODE='/api/v1/code/add_update';
export const GENERORDER='/api/v1/code/generate_list';
export const CHANGECODEORDER='/api/v1/code/record_list';
// 商品管理
export const GOODS_MANAGE='/api/v1/product/list';
// 編輯商品
export const EDIT_GOODS='/api/v1/product/add_update';
// 商品上架
export const UP_GOODS='/api/v1/product/on';
// 商品下架
export const DOWN_GOODS='/api/v1/product/off';
// 商品删除
export const DELETE_GOODS='/api/v1/product/delete';
// 游戏管理
export const GAME_MANAGE='/api/v1/game/list';
 export const ADDGAME_MANAGE='/api/v1/game/add_update';
 //export const GAME_MANAGE='http://192.168.1.102:7006/api/v1/game/list';
//export const ADDGAME_MANAGE='http://192.168.1.102:7006/api/v1/game/add_update';
export const GAMECLASS_MANAGE="/api/v1/game_class/first_list";
export const GAME_UP='/api/v1/game/on';
export const GAME_DOWN='/api/v1/game/off';
export const DELETE_GAME='/api/v1/game/delete';
// 编辑分类
export const EDITCLASSMANAGE="/api/v1/game_class/add_update_first";
export const SECOND_CLASS='/api/v1/game_class/second_list_by_first';
// 添加二级分类
export const ADDSECOND_CLASS="/api/v1/game_class/add_update_second";
export const DELE_SECOND="/api/v1/game_class/delete";
// 游戏上传文件
export const GAME_UPLOAD='/api/v1/game/upload';
// 查询所有分类
export const ALL_CLASS = '/api/v1/game_class/has_second';
//export const ALL_CLASS = 'http://192.168.1.102:7006/api/v1/game_class/has_second';
// 查询一级分类
// export const FIRST_CLASS = 'http://192.168.1.12:7006/api/v1/game_class/has_second_on_sale';
// 查询二级分类
// export const SECOND_CLASSES = 'http://192.168.1.12:7006/api/v1/game_class/second_names_by_first';
// 广告列表
export const ADVERMENT='/api/v1/ad/list';
// 添加广告
export const ADVERADD='/api/v1/ad/add';
// 广告下架
export const ADVERDOWN='/api/v1/ad/off';
// 广告上架
export const ADVERUP='/api/v1/ad/on';
// 删除广告
export const ADVERDELE='/api/v1/ad/delete';
// 其他设置
export const OTHERSET='/api/v1/admin/setting';
export const OTHERSETLOOK='/api/v1/admin/setting_list';
// 会员管理详情
export const MEMBERDETAIL='/api/v1/user/detail'
export const CODEDETAIL='/api/v1/user/coupon';
// 添加编辑权限
export const ADDEDITLIMIT="/api/v1/admin/set_permission";
// 下载
export const VERSIONDOWNLOAD='/api/v1/version/download';
// 商务合作
export const BUSSINESS='/api/v1/business/list';
export const DAOCHU='/api/v1/code/excel';
export const DELERECORD='/api/v1/code/batch_delete';
export const FIRSTMESSAGE='/api/v1/admin/statistic';
//权限
export const LimitSearch = '/api/v1/admin/permission_list';
// 添加文章
export const AddArticle='/api/v1/article/add_update';
// 添加审核人
export  const Examine='/api/v1/admin/enable_admins';
// 文章删除
export const deleArticle='/api/v1/article/delete';
//文章详情
export const detailArticle='/api/v1/article/detail';
// 用户反馈
export const userBack='/api/v1/feedback/list';
export const userBackDes='/api/v1/feedback/detail';
export const userBackDo='/api/v1/feedback/handle';

export const bussinessHandle='/api/v1/business/handle';
export const getCode='/api/v1/admin/sms';
export const memberType='/api/v1/user/types';
export const shenhe='/api/v1/article/approval';
export const tuikuan='/api/v1/order/refund';
// 渠道商选择】
export const qudao='/api/v1/admin/channels';
export const region="/api/v1/game/dispatch_region";
// 扫码版商品


// // 登录
// export const LOGIN = '/api/v1/admin/login';
// //export const LOGIN='http://192.168.1.102:7001/api/v1/admin/login';
// export const LOGINOUT = '/api/v1/admin/logout';
// export const changepassword = '/api/v1/admin/check_old_pwd';
// export const QUERY_ACCOUNT = '/api/v1/admin/list';
// export const SUBMIT_FORM='/api/v1/admin/add';
// export const OPTION_FORM='/api/v1/admin/logs';

// export const MEMBER_FORM='http://testjiasu.api.ispeed.cn/api/v1/user/list';
// // 重置密码
// export const RESET_PASSWORD='http://testjiasu.api.ispeed.cn/api/v1/admin/resetting';
// // 停用賬號
// export const STOP_ACCOUNT='http://testjiasu.api.ispeed.cn/api/v1/admin/forbidden';
// // 啟用管理員賬號
// export const START_ACCOUNT='http://testjiasu.api.ispeed.cn/api/v1/admin/enable';
// // 版本列表
// export const VERSION_RELEASE='http://testjiasu.api.ispeed.cn/api/v1/version/list';
// export const VERSION_ADD='http://testjiasu.api.ispeed.cn/api/v1/version/add_update';


// // 订单管理
// export const ORDER_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/order/list';
// // 订单详情
// export const ORDER_DES='http://testjiasu.api.ispeed.cn/api/v1/order/detail';
// // 订单统计
// export const ORDER_STATIS='http://testjiasu.api.ispeed.cn/api/v1/order/statistic';
// // 用户统计
// export const MEMBER_STATIS='http://testjiasu.api.ispeed.cn/api/v1/user/statistic';
// export const MEMBER_STATISLIST='http://testjiasu.api.ispeed.cn/api/v1/user/daily_statistic';
// // 禁用用户
// export const MEMBER_STOP='http://testjiasu.api.ispeed.cn/api/v1/user/disable';
// // 启用用户
// export const MEMBER_START='http://testjiasu.api.ispeed.cn/api/v1/user/enable';
// // 订单LIEBIAO
// export const ORDER_LIST='http://testjiasu.api.ispeed.cn/api/v1/order/daily_statistic';
// // banner管理
// export const BANNER_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/banner/list';
// // 編輯banner
// export const BANNER_EDIT='http://testjiasu.api.ispeed.cn/api/v1/banner/add_update';
// // banner删除
// export const BANNER_DELE='http://testjiasu.api.ispeed.cn/api/v1/banner/delete';
// // 文章管理
// export const ARTICLE_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/article/list';
// // 優惠券管理
// export const DISCOUNT_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/coupon/list';
// export const STARTDISSACCOUNT='http://testjiasu.api.ispeed.cn/api/v1/coupon/on';
// export const STOPDISSACCOUNT='http://testjiasu.api.ispeed.cn/api/v1/coupon/off';
// export const RELEASEDISSCOUNT='http://testjiasu.api.ispeed.cn/api/v1/coupon/grant';
// export const EDITDISSCOUNT='http://testjiasu.api.ispeed.cn/api/v1/coupon/add_update';
// export const ADDDISSCOUNT='http://testjiasu.api.ispeed.cn/api/v1/coupon/add_update';
// // 兌換碼管理
// export const REDCODE_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/code/list';
// export const SHENGCHENG_REDCODE='http://testjiasu.api.ispeed.cn/api/v1/code/generate';
// export const ADDREDCODE='http://testjiasu.api.ispeed.cn/api/v1/code/add_update';
// export const GENERORDER='http://testjiasu.api.ispeed.cn/api/v1/code/generate_list';
// export const CHANGECODEORDER='http://testjiasu.api.ispeed.cn/api/v1/code/record_list';
// // 商品管理
// export const GOODS_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/product/list';
// // 編輯商品
// export const EDIT_GOODS='http://testjiasu.api.ispeed.cn/api/v1/product/add_update';
// // 商品上架
// export const UP_GOODS='http://testjiasu.api.ispeed.cn/api/v1/product/on';
// // 商品下架
// export const DOWN_GOODS='http://testjiasu.api.ispeed.cn/api/v1/product/off';
// // 商品删除
// export const DELETE_GOODS='http://testjiasu.api.ispeed.cn/api/v1/product/delete';
// // 游戏管理
// export const GAME_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/game/list';
//  export const ADDGAME_MANAGE='http://testjiasu.api.ispeed.cn/api/v1/game/add_update';
//  //export const GAME_MANAGE='http://192.168.1.102:7006/api/v1/game/list';
// //export const ADDGAME_MANAGE='http://192.168.1.102:7006/api/v1/game/add_update';
// export const GAMECLASS_MANAGE="http://testjiasu.api.ispeed.cn/api/v1/game_class/first_list";
// export const GAME_UP='http://testjiasu.api.ispeed.cn/api/v1/game/on';
// export const GAME_DOWN='http://testjiasu.api.ispeed.cn/api/v1/game/off';
// export const DELETE_GAME='http://testjiasu.api.ispeed.cn/api/v1/game/delete';
// // 编辑分类
// export const EDITCLASSMANAGE="http://testjiasu.api.ispeed.cn/api/v1/game_class/add_update_first";
// export const SECOND_CLASS='http://testjiasu.api.ispeed.cn/api/v1/game_class/second_list_by_first';
// // 添加二级分类
// export const ADDSECOND_CLASS="http://testjiasu.api.ispeed.cn/api/v1/game_class/add_update_second";
// export const DELE_SECOND="http://testjiasu.api.ispeed.cn/api/v1/game_class/delete";
// // 游戏上传文件
// export const GAME_UPLOAD='http://testjiasu.api.ispeed.cn/api/v1/game/upload';
// // 查询所有分类
// export const ALL_CLASS = 'http://testjiasu.api.ispeed.cn/api/v1/game_class/has_second';
// //export const ALL_CLASS = 'http://192.168.1.102:7006/api/v1/game_class/has_second';
// // 查询一级分类
// // export const FIRST_CLASS = 'http://192.168.1.12:7006/api/v1/game_class/has_second_on_sale';
// // 查询二级分类
// // export const SECOND_CLASSES = 'http://192.168.1.12:7006/api/v1/game_class/second_names_by_first';
// // 广告列表
// export const ADVERMENT='http://testjiasu.api.ispeed.cn/api/v1/ad/list';
// // 添加广告
// export const ADVERADD='http://testjiasu.api.ispeed.cn/api/v1/ad/add';
// // 广告下架
// export const ADVERDOWN='http://testjiasu.api.ispeed.cn/api/v1/ad/off';
// // 广告上架
// export const ADVERUP='http://testjiasu.api.ispeed.cn/api/v1/ad/on';
// // 删除广告
// export const ADVERDELE='http://testjiasu.api.ispeed.cn/api/v1/ad/delete';
// // 其他设置
// export const OTHERSET='http://testjiasu.api.ispeed.cn/api/v1/admin/setting';
// export const OTHERSETLOOK='http://testjiasu.api.ispeed.cn/api/v1/admin/setting_list';
// // 会员管理详情
// export const MEMBERDETAIL='http://testjiasu.api.ispeed.cn/api/v1/user/detail'
// export const CODEDETAIL='http://testjiasu.api.ispeed.cn/api/v1/user/coupon';
// // 添加编辑权限
// export const ADDEDITLIMIT="http://testjiasu.api.ispeed.cn/api/v1/admin/set_permission";
// // 下载
// export const VERSIONDOWNLOAD='http://testjiasu.api.ispeed.cn/api/v1/version/download';
// // 商务合作
// export const BUSSINESS='http://testjiasu.api.ispeed.cn/api/v1/business/list';
// export const DAOCHU='http://testjiasu.api.ispeed.cn/api/v1/code/excel';
// export const DELERECORD='http://testjiasu.api.ispeed.cn/api/v1/code/batch_delete';
// export const FIRSTMESSAGE='http://testjiasu.api.ispeed.cn/api/v1/admin/statistic';
// //权限
// export const LimitSearch = 'http://testjiasu.api.ispeed.cn/api/v1/admin/permission_list';
// // 添加文章
// export const AddArticle='http://testjiasu.api.ispeed.cn/api/v1/article/add_update';
// // 添加审核人
// export  const Examine='http://testjiasu.api.ispeed.cn/api/v1/admin/enable_admins';
// // 文章删除
// export const deleArticle='http://testjiasu.api.ispeed.cn/api/v1/article/delete';
// //文章详情
// export const detailArticle='http://testjiasu.api.ispeed.cn/api/v1/article/detail';
// // 用户反馈
// export const userBack='http://testjiasu.api.ispeed.cn/api/v1/feedback/list';
// export const userBackDes='http://testjiasu.api.ispeed.cn/api/v1/feedback/detail';
// export const userBackDo='http://testjiasu.api.ispeed.cn/api/v1/feedback/handle';

// export const bussinessHandle='http://testjiasu.api.ispeed.cn/api/v1/business/handle';
// export const getCode='http://testjiasu.api.ispeed.cn/api/v1/user/gw/sms';
// export const memberType='http://testjiasu.api.ispeed.cn/api/v1/user/types';
// export const shenhe='http://testjiasu.api.ispeed.cn/api/v1/article/approval';
// export const tuikuan='http://testjiasu.api.ispeed.cn/api/v1/order/refund'




















