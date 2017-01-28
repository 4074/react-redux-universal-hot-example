import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { Menu } from 'antd'

const Item = Menu.Item

export default class Header extends Component {

    render() {
        require('./Header.scss')
        return (
            <div className="header">
                <div className="logo"><h3>管理后台</h3></div>
                <div className="menu">
                    <Menu mode="horizontal" selectedKeys={["commodity"]}>
                        <Item key="commodity">
                            <a href="#">商品管理</a>
                        </Item>
                    </Menu>
                </div>
            </div>
        )
    }

}
