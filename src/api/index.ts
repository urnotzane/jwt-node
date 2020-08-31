/**
 * 基于mlz-axios的Http模块
 * 默认配置：
 * {
 *   timeout: 5000;
 *   withCredentials: true;
 *   validateStatus: status => status >= 200 && status < 599;
 * }
 * 详细用法请见：https://github.com/juicecube/mlz-axios
 */

import Http from '@mlz/axios';
import axios from 'axios';
import { Modal } from 'antd';
import { local } from './base-url';

const cancelStore = axios.CancelToken.source();

// 请求拦截
Http.setReqInterceptor(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.cancelToken = cancelStore.token;
    return config;
  },
  (error) => error,
);
// 设置全局响应拦截
Http.setResInterceptor(
  (res) => {
    if (res.status === 401) {
      cancelStore.cancel();
      Modal.error({
        title: '登录失效，请重新登录',
        visible: true,
        onOk: () => window.location.href = `/`,
      });
    }
    return res;
  },
  (error) => {
    if (error.response && error.response.data) {
      console.log(error);
      throw new Error('');
    }
  },
);

export const localApi = new Http(local);
