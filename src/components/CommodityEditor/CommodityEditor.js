import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {save, toggle} from 'redux/modules/commodityEditor'
import { load as loadCommodity } from 'redux/modules/commodity'

import { Modal, Upload, Icon, Button, Input, message } from 'antd'

@connect(
    state => ({editor: state.commodityEditor}),
    dispatch => bindActionCreators({save, toggle, loadCommodity}, dispatch))
export default class CommodityEditor extends Component {
  constructor(props) {
    super(props)

    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    name: '',
    sliders: '',
    formats: '',
    prices: '',
    images: ''
  }

  componentDidMount() {
    // const CosCloud = require('./cos-js-sdk-v4')
    // const config = {
    //     appid: '1251334503',
    //     bucket: 'zhide',
    //     secretid: 'AKIDWD0gGj5GF2e4J5vacS6nJe4MScicYq9N',
    //     secretkey: 'DESZZO1UdkgV8Zt7nQs8C4kHsJrMgomh',
    //     host: 'zhide-1251334503.cosgz.myqcloud.com'
    // }
    // const cos = new CosCloud({
    //     appid: config.appid,// APPID 必填参数
    //     bucket: config.bucket,//bucketName 必填参数
    //     region: 'gz',//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
    //     getAppSign: function (cb) {//获取签名 必填参数
    //       cb('mYfJvtehIIGg1tzS2kH2HRJgu1ZhPTEyNTEzMzQ1MDMmaz1BS0lEV0QwZ0dqNUdGMmU0SjV2YWNTNm5KZTRNU2NpY1lxOU4mZT0xNDkzNzEwNTczJnQ9MTQ4NTkzNDU3MyZyPTE1NzUyMTE1MTImZj0mYj16aGlkZQ')
    //     },
    //     getAppSignOnce: function (cb) {//单次签名，必填参数，参考上面的注释即可
    //         cb('')
    //     }
    // })

    // cos.getFolderList(function(){}, function(){}, config.bucket, '');
  }

  componentDidUpdate(prevProps) {
    const prevEditor = prevProps.editor
    const { editor } = this.props
    if(prevEditor.loading && !editor.loading) {
      this.props.loadCommodity()
    }
  }

  handleOk() {
    if (!this.state.name) {
      return message.error('参数不足，无法提交')
    }
    console.log(this.state)
    this.props.save(this.state)
  }

  handleCancel() {
    this.props.toggle(false)
  }

  handleChange(event) {
    const target = event.target

    let value = {}
    value[target.name] = target.value
    this.setState(value)
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
            loading={editor.loading}
            footer={[
                <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={editor.loading} onClick={this.handleOk}>
                提交
                </Button>
            ]}
            >
            <div className="commodity-editor">
                <Input placeholder="标题" name="name" onChange={this.handleChange} />
                <Input className="mt-10" name="sliders" onChange={this.handleChange} type="textarea" placeholder="展示图片" autosize={{ minRows: 2, maxRows: 6 }} />
                <Input className="mt-10" name="formats" onChange={this.handleChange} type="textarea" placeholder="规格" autosize={{ minRows: 2, maxRows: 4 }} />
                <Input className="mt-10" name="prices" onChange={this.handleChange} type="textarea" placeholder="价格" autosize={{ minRows: 2, maxRows: 4 }} />
                <Input className="mt-10" name="images" onChange={this.handleChange} type="textarea" placeholder="详情图片" autosize={{ minRows: 2, maxRows: 6 }} />
            </div>
        </Modal>
      </div>
    );
  }
}
