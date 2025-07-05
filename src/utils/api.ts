import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 用户相关
export function loginUser(nickname: string) {
  return api.post('/user/login', { nickname });
}
export function fetchUserInfo() {
  return api.get('/user/info');
}

// 会话相关
export function fetchSessions() {
  return api.get('/session/list');
}
export function createSession(name: string) {
  return api.post('/session/create', { name });
}
export function deleteSession(id: string) {
  return api.post('/session/delete', { id });
}

// 资源相关
export function fetchResources() {
  return api.get('/resource/list');
}
export function uploadResource(formData: FormData) {
  return api.post('/resource/upload', formData);
}
export function deleteResource(id: string) {
  return api.post('/resource/delete', { id });
}

export default api; 