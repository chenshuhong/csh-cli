/**
 * @Author: 陈树鸿
 * @Date: 2019-07-17 16:19
 */
import React from 'react'
import { Card, Form } from 'antd'
import Page from 'widget/Page/Page'
import Query from 'widget/Query'
import Grid from 'widget/Grid/GridView'
import { get } from 'lodash'
import AuthBtns from 'widget/AuthBtns'
import { inject, observer } from 'mobx-react'
import style from './RightPackagesListStyle.less'

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
      elem_type: 'Select',
      zh_name: '权益状态',
      en_name: 'status',
      options: [
        { label: '全部', value: 'all' },
        { label: '启用', value: '1' },
        { label: '禁用', value: '2' },
      ]
    }
  ]

  //状态
  statusMap = {
    '1': '启用', '2': '禁用',
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
      width: 150,
      fixed: 'right',
      render: (text, record) => (
        <AuthBtns
          record={record}
          isCutLine
          action={[
            {
              label: '查看',
              click: () => {}
            },
            {
              label:'屏蔽',
              isConfirm:true,
              click: () => {}
            },
            {
              label:'编辑',
              click: () => {}
            },
            {
              label:'删除',
              isConfirm:true,
              click: () => {}
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
    const { tableData, loading } = this.stores.state;
    return (
      <Page>
        <Query
          queryConfig={this.queryConfig}
          onSearch={this.onSearch}
          onReset={this.onReset}
        />
        <Card>
          <Grid
            data={{ columns: this.columns, ...tableData }}
            scroll={{ x: 'max-content' }}
            pageChange={(pageNum, pageSize) => {
              this.stores.getList({ pageNum, pageSize })
            }}
            isDisplayOrder={true}
            loading={loading}
          />
        </Card>
      </Page>
    )
  }
}

export default Form.create()(RightPackagesListView)
