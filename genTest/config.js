/**
 * @Author: 陈树鸿
 * @Date: 2019-07-18 17:55
 */
module.exports = {
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
  view:{
    queryConfig:[
      {
        zh_name: '权益包名称',
        en_name: 'rightPackageName',
      },
      {
        elem_type: 'Input',
        zh_name: '店铺范围',
        en_name: 'area',
      },
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
      {label:'删除',isConfirm:true,confirmTitle:'是否确定删除'},
    ],
    showRowSelection:true,
    gridBtn:[
      {label:'新增权益包'},
      {label:'批量展示'},
      {label:'批量屏蔽'},
      {label:'批量删除'},
    ]
  }
}
