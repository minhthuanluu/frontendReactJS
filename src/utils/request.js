/**
 * Request Network Request Tool
 * More detailed api documentation: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { accountRefreshToken } from '@/services/login';
import { setAuthority } from './authority';
import { doLogout, getUserDetails } from './utils';

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data was successful.',
  202: 'A request has been queued in the background (asynchronous task).',
  204: 'Data deleted successfully.',
  400: 'There was an error in the request, and the server did not create or modify data.',
  401: 'The user does not have permissions (token, username, password error).',
  403: 'The user is authorized, but access is prohibited.',
  404: 'The request was made for a record that does not exist, and the server did not perform an operation.',
  406: 'The requested format is not available.',
  410: 'The requested resource is permanently deleted and is no longer available.',
  422: 'When creating an object, a validation error occurred.',
  500: 'A server error occurred. Please check the server.',
  502: 'Gateway error.',
  503: 'Services are unavailable and the server is temporarily overloaded or maintained.',
  504: 'Gateway timed out.',
};

/**
 * Exception handler
 */
const errorHandler = error => {
  const { response, data } = error;

  if (response && response.status) {
    let errorText = codeMessage[response.status];
    if (data.message && data.message.length) {
      errorText = data.message;
    } else if (response.statusText && response.statusText.length) {
      errorText = response.statusText;
    }
    notification.error({
      message: 'Lỗi',
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Vui lòng kiểm tra đường truyền mạng internet.',
      message: 'Lỗi kết nối mạng',
    });
  }

  throw error;
};

/**
 * Configure default parameters for request
 */
const request = extend({
  // Default error handling
  errorHandler,
  credentials: 'include', // Whether to bring cookies by default
});

// Refresh token
request.interceptors.response.use(async (response, options) => {
  if (response.status === 403) {
    if (response.url.includes('api/refresh')) {
      return doLogout();
    }

    const userDetails = await getUserDetails();
    if (userDetails.refreshToken) {
      const refreshResponse = await accountRefreshToken(userDetails.refreshToken);
      if (refreshResponse.accessToken && refreshResponse.refreshToken) {
        await setAuthority({
          ...userDetails,
          accessToken: refreshResponse.accessToken,
          refreshToken: refreshResponse.refreshToken,
        });
        return request(
          response.url.indexOf('?') > 0
            ? response.url.substring(0, response.url.indexOf('?'))
            : response.url,
          options,
        );
      }
      return doLogout();
    }
    return doLogout();
  }
  return response;
});

request.interceptors.request.use(
  async (url, config) => {
    const newConfig = { ...config };
    // Check token from localStorage before call api
    const userDetails = await getUserDetails();
    if (userDetails.accessToken) {
      newConfig.headers.Authorization = userDetails.accessToken;
    } else {
      delete newConfig.headers.Authorization;
    }
    return newConfig;
  },
  error =>
    // Do something with request error
    Promise.reject(error),
);

export default request;
