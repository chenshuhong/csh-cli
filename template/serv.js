import config from 'config/Config'
import request from 'utils/request'

/**
 * 列表
 * @param params
 * @returns {Promise<*>}
 */
export async function getList(params) {
  return request({
    url: 'listUrl',
    method: 'GET',
    data: params,
    app: config.imkApp,
  })
}

/**
 * 修改状态
 * @param params
 * @returns {Promise<*>}
 */
export async function changeStatus(params) {
  return request({
    url: `changeStatusUrl`,
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
export async function deleteListItem(params){
  return request({
    url: `deleteUrl`,
    method: 'DELETE',
    data: params,
    app: config.imkApp
  });
}
