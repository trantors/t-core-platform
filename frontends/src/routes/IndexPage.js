import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1>Welcome to dva! 在这里</h1>
      <hr />
      <ul className={styles.list}>
        <a href="#users">users</a>
      </ul>
      <ul className={styles.list}>
        <a href="#pm2server">pm2 server status</a>
      </ul>
      <div>
        The new Mac Book Pro 
        It's not convenience, it's not comfortable, it's drive.' freedom to go where on one knows can, well no one even tought it is possible.
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
