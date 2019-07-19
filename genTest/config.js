/**
 * @Author: 陈树鸿
 * @Date: 2019-07-18 17:55
 */
module.exports = {
  //两种模板，1是列表，2是编辑
  type:'list',
  //接口文件配置，一般来说需要列表，修改状态，删除这三个接口
  serv:{
    list:{
      url:'baiye/list'
    },
    changeStatus:{
      url:'baiye/changeStatus'
    },
    del:{
      url:'baiye/delete'
    }
  },
  //视图界面，需要查询配置，table配置，table右侧操作按钮，是否展示多选按钮，表格右上按钮列表
  view:{
    queryConfig:[
      {
        zh_name: '权益包名称',
        en_name: 'rightPackageName',
      },
      {
        zh_name: '店铺范围',
        en_name: 'area',
      },
      {
        elem_type: 'Select',
        zh_name: '权益状态',
        en_name: 'status',
      }
    ],
    columns:[
      { title: '权益包编号', dataIndex: 'rightPackageCode' },
      { title: '权益包名称', dataIndex: 'rightPackageName' },
      { title: '包含权益数量', dataIndex: 'num' },
      { title: '最大库存', dataIndex: 'maxInventory' },
      { title: '已发放库存', dataIndex: 'outInventory' },
      { title: '生效时间', dataIndex: 'startTime' },
      { title: '失效时间', dataIndex: 'endTime' },
      { title: '状态', dataIndex: 'status' },
      { title: '操作', dataIndex: 'operation', width: 200, fixed: 'right'}
    ],
    operationBtns:[
      {label:'查看'},
      {label:'屏蔽'},
      {label:'编辑'},
      {label:'删除',confirmTitle:'是否确定删除'},
    ],
    showRowSelection:true,
    gridBtn:[
      {label:'新增权益包'},
      {label:'批量展示'},
      {label:'批量屏蔽'},
      {label:'批量删除'},
    ]
  },
  //模型,暂无需要特殊配置的地方
  mod:{
  
  }
}
