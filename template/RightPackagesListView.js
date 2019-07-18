/**
 * @Author: 陈树鸿
 * @Date: 2019-07-17 16:19
 */
import React from 'react'
import { Button, Card, Form } from 'antd'
import Page from 'widget/Page/Page'
import Query from 'widget/Query'
import Grid from 'widget/Grid/GridView'
import { get } from 'lodash'
import AuthBtns from 'widget/AuthBtns'
import { inject, observer } from 'mobx-react'
import styles from './RightPackagesListStyle.less'

// 在视图注入module层数据
@inject('RightPackagesMgntListMod')
@observer
class RightPackagesListView extends React.Component{
  
  // 构造函数，组件的实例创建时，最先执行
  constructor(props) {
    super(props);
    // 注入的Mod
    this.stores = this.props.RightPackagesMgntListMod;
    this.state = {}
  }
  
  // 已插入真实DOM
  componentDidMount() {
    this.stores.resetData();
    this.stores.getList();
  }
  
  //查询列表
  queryConfig = [
    {
      elem_type: 'Input',
      zh_name: '权益包名称',
      en_name: 'rightPackageName',
    },
    {
      elem_type: 'Input',
      zh_name: '店铺范围',
      en_name: 'area',
    },
    {
      elem_type: 'Select',
      zh_name: '权益状态',
      en_name: 'status',
      options: [
        { label: '全部', value: 'all' },
        { label: '展示', value: '1' },
        { label: '屏蔽', value: '2' },
      ]
    }
  ]
  
  //状态
  statusMap = {
    '1': '展示', '2': '屏蔽',
  };
  
  columns = [
    { title: '权益包编号', dataIndex: 'rightPackageCode' },
    { title: '权益包名称', dataIndex: 'rightPackageName' },
    { title: '包含权益数量', dataIndex: 'num' },
    { title: '最大库存', dataIndex: 'maxInventory' },
    { title: '已发放库存', dataIndex: 'outInventory' },
    { title: '生效时间', dataIndex: 'startTime' },
    { title: '失效时间', dataIndex: 'endTime' },
    { title: '状态', dataIndex: 'status', render: text => get(this.statusMap, text, '-') },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <AuthBtns
          record={record}
          isCutLine
          action={[
            {
              label: '查看',
              click: () => {
                console.log('点击了查看')
              }
            },
            {
              label:get(this.statusMap, record['status'], '-'),
              isConfirm:record['status'] === '2',
              confirmTitle:'屏蔽此规则?',
              click: (prop) => {
                console.log('点击了屏蔽/展示',prop)
                if (record['status'] === '2') {
                  this.stores.changeStatus({id:record.id,status: 1})
                }else {
                  this.stores.changeStatus({id:record.id,status: 2})
                }
              }
            },
            {
              label:'编辑',
              click: () => {
                console.log('点击了编辑')
              }
            },
            {
              label:'删除',
              isConfirm:true,
              confirmTitle:'删除此规则?',
              click: () => {
                console.log('点击了删除')
                this.stores.deletePackages({id:record.id})
              }
            },
          ]}
        />
      )
    },
  ]
  
  
  //重置
  onReset = () => {
    this.stores.updateStore({
      filters: {}
    });
    //请求页面
    this.stores.getList({ pageNum: 1 });
  }
  
  //搜索
  onSearch = (filters) => {
    this.stores.updateStore({
      filters: filters
    });
    //请求页面
    this.stores.getList({ pageNum: 1 });
  }
  
  render(){
    const { tableData, loading,selectedRowKeys } = this.stores.state;
    return (
      <Page>
        <Query
          queryConfig={this.queryConfig}
          onSearch={this.onSearch}
          onReset={this.onReset}
        />
        <Card title="权益包列表" extra={(
          <div className={styles.btnGroup}>
            <Button type="primary" onClick={()=>{console.log('新增权益包')}} >新增权益包</Button>
            <Button type="primary" onClick={()=>{ this.stores.changeStatus({status: 1})}} disabled={selectedRowKeys.length === 0}>批量展示</Button>
            <Button type="primary" onClick={()=>{ this.stores.changeStatus({status: 2})}} disabled={selectedRowKeys.length === 0}>批量屏蔽</Button>
            <Button type="primary" onClick={()=>{ this.stores.deletePackages({})}} disabled={selectedRowKeys.length === 0}>批量删除</Button>
          </div>
        )}>
          <Grid
            data={{ columns: this.columns, ...tableData }}
            scroll={{ x: 'max-content' }}
            pageChange={(pageNum, pageSize) => {
              this.stores.getList({ pageNum, pageSize })
            }}
            isDisplayOrder={true}
            loading={loading}
            rowSelection={{
              selectedRowKeys,
              onChange:(selectedRowKeys, selectedRows)=>{
                this.stores.updateStore({
                  selectedRowKeys
                })
              }
            }}
          />
        </Card>
      </Page>
    )
  }
}

export default Form.create()(RightPackagesListView)
