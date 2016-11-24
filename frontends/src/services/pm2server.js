import request from '../utils/request';
import qs from 'qs';

export async function query( params ) {
  console.log('service: pm2server/query');
  return request( `http://qas.zhisiyun.com:9615/?${qs.stringify(params)}` );
}