import React, { Component } from 'react';
import { NoticeBar } from 'antd-mobile';

export default class App extends Component {
  componentDidMount () {
    document.title = '这是首页';
  }

  render () {
    return (
      <div className="container">
        sfsfsfsffs<br />
        <a href="order.html">收银台111</a>
        <NoticeBar>Link demo for `actionText`.</NoticeBar>
      </div>
    );
  }
}
