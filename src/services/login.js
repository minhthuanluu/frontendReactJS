import request from '@/utils/request';

export async function accountLogin(params) {
  return request('/api/v2/login', {
    method: 'POST',
    data: params,
  });
}

export async function accountRefreshToken(refreshToken) {
  return request(`/api/refresh?refreshToken=${refreshToken}`, {
    method: 'POST',
    data: {},
  });
}
