import { action, observable, runInAction, useStrict } from 'mobx'
import { cloneDeep } from 'lodash'
// 引入Serv
import {getList,changeStatus,deletePackages} from './RightPackagesListServ';
import { message } from 'antd'

/**
 * @Author: 陈树鸿
 * @Date: 2019-07-17 19:11
 */
// 严格模式
useStrict(true);
const state = {
  filters: {},   //搜索条件
  tableData: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    dataSource: [],
  },
  selectedRowKeys:[],
  loading: false
}

class RightPackagesMgntListMod{
  // 监视状态
  @observable state = cloneDeep(state)
  
  @action
  getList = async (payload) =>{
    //如果没有传页码则默认取state中的
    const { tableData, filters } = this.state;
    let params = {
      pageNum: tableData.pageNum,
      pageSize: tableData.pageSize,
      ...filters,
      ...payload
    };
    console.log('请求参数:', params);
    this.state.loading = true;
    try{
      const { data, resultCode, resultMsg } = await getList(params);
      if ('' + resultCode === '0') {
        runInAction(() => {
          this.state.tableData = {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            total: data.total,
            dataSource: data.list,
          }
        })
      }
      runInAction(() => {
        this.state.loading = false;
      })
    }catch (e) {
      console.log(e)
      runInAction(() => {
        this.state.loading = false;
      })
    }
  }
  
  //初始化数据
  @action
  resetData = () => {
    this.state = cloneDeep(state);
  }
  
  //设置数据
  @action
  updateStore = (payload) => {
    this.state = {
      ...this.state,
      ...payload
    };
  }
  
  //批量修改数据
  @action
  changeStatus = async (payload) =>{
    let { selectedRowKeys } = this.state;
    let { resultCode, data } = await changeStatus({
      id: payload.id ? payload.id : selectedRowKeys.join(','),
      status: payload.status
    })
    runInAction(()=>{
      if(resultCode+'' === '0'){
        message.success(`${payload.status === 1 ? '启用' : '禁用'}成功`);
        this.state.selectedRowKeys = [];
        this.getList();
      }
    })
  }
  
  @action
  deletePackages = async (payload) =>{
    let { selectedRowKeys } = this.state;
    let { resultCode, data } = await deletePackages({
      id: payload.id ? payload.id : selectedRowKeys.join(',')
    })
    runInAction(()=>{
      if(resultCode+'' === '0'){
        message.success(`删除成功`);
        this.state.selectedRowKeys = [];
        this.getList();
      }
    })
  }
}

const rightPackagesListMod = new RightPackagesMgntListMod()
export default rightPackagesListMod;
