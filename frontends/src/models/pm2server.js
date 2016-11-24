import { query } from '../services/pm2server';
import { parse } from 'qs';

export default {
  namespace: 'pm2server',

  state: {
    origin: {},
    hostname: '',
    uptime: 0
  },

  subscriptions: {
    setup( { dispatch, history } ) {
      history.listen( location => {
        if ( location.pathname === '/pm2server' ) {
          dispatch( {
            type: 'query',
            payload: location.query,
          } );
        }
      } );
    },
  },

  effects: {
    'query': function* ( { payload }, { call, put } ) {
      yield put( { type: 'showLoading' } );
      const {data} = yield call(query, parse(payload));
      if (data) {
          yield put({
              type: 'querySuccess',
              payload:{
                  origin:data,
                  hostname: data.system_info.hostname,
                  uptime: data.system_info.uptime
              }
          });
      }
     },
  },

  reducers: {
    showLoading( state ) {
      return {...state, loading: true };
    },

    querySuccess( state, action ) {

      return {...state, ...action.payload, loading: false };
    },
  },

};