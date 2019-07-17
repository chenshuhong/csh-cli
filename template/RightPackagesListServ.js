import config from 'config/Config'

/**
 * @Author: 陈树鸿
 * @Date: 2019-07-17 19:37
 */
export default class  {
  static getList(params){
    return request({
      url: 'memberCard/account/page',
      method: 'GET',
      data: params,
      app: config.icdpApp
    })
  }
}
