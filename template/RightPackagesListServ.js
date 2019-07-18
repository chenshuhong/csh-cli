import config from 'config/Config'
import request from 'utils/request'

/**
 * @Author: 陈树鸿
 * @Date: 2019-07-17 19:37
 */

/**
 * 列表
 * @param params
 * @returns {Promise<*>}
 */
export async function getList(params) {
  return request({
    url: 'memberRightPackages/page',
    method: 'GET',
    data: params,
    app: config.icdpApp,
  })
}

/**
 * 修改状态
 * @param params
 * @returns {Promise<*>}
 */
export async function changeStatus(params) {
  return request({
    url: `memberRightPackages/update/${params.id}/status/${params.status}`,
    method: 'PUT',
    data: params,
    app: config.imkApp
  });
}

/**
 * 删除
 * @param params
 * @returns {Promise<*>}
 */
export async function deletePackages(params){
  return request({
    url: `memberRightPackages/delete/${params.id}`,
    method: 'DELETE',
    data: params,
    app: config.imkApp
  });
}
