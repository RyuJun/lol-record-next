import axios, { AxiosRequestConfig } from 'axios';
import merge from 'lodash/merge';
import { REQUESTS_OPERATION } from '../utils/common.constants';
import { IMutationProps } from '../utils/common.type';

const apiBase = function (defaultConfig: AxiosRequestConfig) {
  const api = axios.create(defaultConfig);

  function configure(config: AxiosRequestConfig): AxiosRequestConfig {
    return merge(api.defaults, config);
  }

  async function get<T>(url: string, config?: any): Promise<T> {
    const response = await api.get(url, { ...config });
    return response.data as T;
  }
  async function authGet<T>(url: string, Authorization: string, config?: any): Promise<T> {
    if (!Authorization) throw new Error('토큰값이 없습니다.');
    const response = await api.get(url, merge(config, { headers: { Authorization } }));
    return response.data as T;
  }

  async function mutation(config: IMutationProps) {
    const { operation, data, headers, url } = config;

    switch (operation) {
      case REQUESTS_OPERATION.PATCH:
        return await api.patch(url, data);
      case REQUESTS_OPERATION.POST:
        return await api.post(url, { data }, { headers });
      case REQUESTS_OPERATION.DELETE:
        return await api.delete(url, { headers, data });
      default:
        break;
    }
  }

  return { configure, get, authGet, mutation, api };
};

export default apiBase;
