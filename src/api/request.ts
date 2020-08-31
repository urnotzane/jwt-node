import { LoginParams } from './../../types/request';
import { localApi } from './index';

export const loginApi = async(params:LoginParams) => await localApi.post('/login', params);

export const pageNumApi = async() => await localApi.get('/page-num');