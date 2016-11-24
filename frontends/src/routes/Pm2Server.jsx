import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Pm2Server.less';
import ServerDataTree from '../components/Pm2Server/ServerDataTree'; 

function Pm2Server({location, dispatch, serverdata}) {

}

Pm2Server.propTypes = {
    serverdata: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ serverdata}) {
    return { serverdata };
}

export default connect(mapStateToProps)(Pm2Server);