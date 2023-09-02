/**
 * 应用名字
 */
export const APP_NAME = process.env.VUE_APP_APP_NAME;

/**
 * 服务接口基本地址
 */
export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

// 每页内容数量
export const POSTS_PER_PAGE = parseInt(
  process.env.VUE_APP_API_POSTS_PER_PAGE,
  10,
);

// 每页评论数量
export const COMMENTS_PER_PAGE = parseInt(
  process.env.VUE_APP_API_COMMENTS_PER_PAGE,
  10,
);

// 微信登录
export const WEIXIN_WEBSITE_APP_ID = process.env.VUE_APP_WEIXIN_WEBSITE_APP_ID;
export const WEIXIN_LOGIN_REDIRECT_URI =
  process.env.VUE_APP_WEIXIN_LOGIN_REDIRECT_URI;
export const WEIXIN_LOGIN_CUSTOM_STYLE =
  process.env.VUE_APP_WEIXIN_LOGIN_CUSTOM_STYLE;

// 订阅
export const STANDARD_SUBSCRIPTION_COLOR =
  process.env['VUE_APP_STANDARD_SUBSCRIPTION_COLOR'] || '#43a047';
export const PRO_SUBSCRIPTION_COLOR =
  process.env['VUE_APP_PRO_SUBSCRIPTION_COLOR'] || '#6e64ef';
