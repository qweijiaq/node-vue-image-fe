import axios from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import { io } from 'socket.io-client';
import { API_BASE_URL } from './app.config';

/**
 * HTTP 客户端
 */
export const apiHttpClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * 设置本地存储
 */
export const setStorages = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取本地存储
 */
export const getStorages = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

/**
 * 处理地址查询符
 */
export const queryStringProcess = (queryStringObject: StringifiableRecord) => {
  Object.keys(queryStringObject).forEach((key) => {
    if (queryStringObject[key] === undefined || queryStringObject[key] === '') {
      delete queryStringObject[key];
    }
  });

  return queryString.stringify(queryStringObject);
};

/**
 * Socket
 */
export const socket = io(API_BASE_URL);
