import type { ApiResponse } from '../types/api';

function authHeaders(): Record<string, string> {
  const token = window.localStorage.getItem('kpm.authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function jsonHeaders(init?: RequestInit): Record<string, string> {
  return init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' };
}

async function readApiPayload<T>(response: Response): Promise<ApiResponse<T> | null> {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  return (await response.json()) as ApiResponse<T>;
}

function apiErrorMessage(response: Response, payload: ApiResponse<unknown> | null): string {
  if (payload?.message) return payload.message;
  if (payload?.code) return payload.code;
  return `${response.status} ${response.statusText}`;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { ...jsonHeaders(init), ...authHeaders(), ...(init?.headers ?? {}) },
  });
  const payload = await readApiPayload<T>(response);
  if (!response.ok) {
    throw new Error(apiErrorMessage(response, payload));
  }
  if (!payload) {
    throw new Error('接口未返回标准 JSON 响应');
  }
  if (!payload.success) {
    throw new Error(payload.message || payload.code);
  }
  return payload.data;
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body?: unknown) => request<T>(url, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  postForm: <T>(url: string, body: FormData) => request<T>(url, { method: 'POST', body }),
  put: <T>(url: string, body?: unknown) => request<T>(url, { method: 'PUT', body: JSON.stringify(body ?? {}) }),
  delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
};
