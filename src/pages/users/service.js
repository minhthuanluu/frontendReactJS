import request from '@/utils/request';

export async function queryUser(params) {
  return request('/api/user/search', {
    params,
  });
}
export async function removeUser(params) {
  return request(`/api/user/${params.id}`, {
    method: 'DELETE',
    data: { ...params, method: 'delete' },
  });
}
export async function addUser(params) {
  return request('/api/user', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateUser(params) {
  return request(`/api/user/${params.id}`, {
    method: 'PUT',
    data: { ...params, method: 'update' },
  });
}
