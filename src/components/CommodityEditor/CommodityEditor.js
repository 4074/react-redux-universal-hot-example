import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {save, toggle} from 'redux/modules/commodityEditor';

import { Modal, Upload, Icon, Button } from 'antd'

@connect(
    state => ({editor: state.commodityEditor}),
    dispatch => bindActionCreators({save, toggle}, dispatch))
export default class CommodityEditor extends Component {
  constructor(props) {
    super(props)

    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleOk() {

  }

  handleCancel() {
    this.props.toggle(false)
  }

  handleChange(event) {
    console.log(event)
  }

  handleUpload(info) {
    console.log(info)
    //cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, file.name, file, 1);
  }

  render() {
    // const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./CommodityEditor.scss');
    const { editor } = this.props

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div>
        <Modal
            visible={editor.visible}
            title={editor.title}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={editor.loading} onClick={this.handleOk}>
                提交
                </Button>
            ]}
            >
            <div className="commodity-editor">
                <Upload
                action="/upload.do"
                customRequest={this.handleUpload}
                listType="picture-card"
                fileList={editor.sliders}
                onChange={this.handleChange}
                >
                {editor.sliders.length >= 6 ? null : uploadButton}
                </Upload>
            </div>
        </Modal>
      </div>
    );
  }
}
