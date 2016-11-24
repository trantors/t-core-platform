import React, { PropTypes } from 'react';
import { BackTop } from 'antd';
import styles from './MainLayout.less';

function Footer({ location }) {
    return (
        <div className={styles.footer}>
            <BackTop 
                visibilityHeight="50"
            />
            <strong>copyright 2016 hahaha</strong> 
        </div>

    );
}

Footer.propTypes = {
    location: PropTypes.object,
};

export default Footer;
