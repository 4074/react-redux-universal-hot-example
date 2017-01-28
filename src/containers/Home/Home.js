import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as isCommodityLoaded, load as loadCommodity } from 'redux/modules/commodity';
import { toggle as toggleEditor } from 'redux/modules/commodityEditor'

import { Table, Button, Modal, Upload, Icon } from 'antd'
import { CommodityEditor } from 'components'

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isCommodityLoaded(getState())) {
      promises.push(dispatch(loadCommodity()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({commodity: state.commodity}),
  {toggleEditor})
export default class Home extends Component {
  

  addCommodity() {
    this.props.toggleEditor(true)
  }

  render() {
    const { commodity } = this.props
    const styles = require('./Home.scss');

    const columns = [
      {title: 'ID', dataIndex: 'id', key: 'id'},
      {title: '名称', dataIndex: 'name', key: 'name'},
      {title: '规格', dataIndex: 'formats', key: 'formats'},
      {title: '送货时间', dataIndex: 'dates', key: 'dates'},
      {title: '滚动图', dataIndex: 'sliders', key: 'sliders'},
      {title: '详情图', dataIndex: 'images', key: 'images'},
      {title: '状态', dataIndex: 'status', key: 'status'},
      {title: '添加时间', dataIndex: 'addtime', key: 'addtime'}
    ]

    return (
      <div>
        <div className="table-operations">
          <Button type="ghost" onClick={this.addCommodity.bind(this)}>添加</Button>
        </div>
        <Table columns={columns} dataSource={commodity.data} />
        <CommodityEditor />
      </div>
    );
  }
}
