// src/api/index.ts
import axiosRoot from 'axios'; 
import { JWT_TOKEN_KEY } from '@/contexts/auth'; 
import type { PaginatedResponse } from '../types';

const baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) {
  throw new Error('VITE_API_URL environment variable is not set');
}

const axios = axiosRoot.create({
  baseURL: baseUrl,
  timeout: 10_000,
});


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem(JWT_TOKEN_KEY);
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export async function getAll<T>(url: string): Promise<T[]> {
  const { data } = await axios.get(url); 
  return data.items;
}

export async function getAllWithPaging<T>(
  url: string,
): Promise<PaginatedResponse<T>> {
  const { data } = await axios.get(url);
  return data;
}


export async function getById<T>(url: string): Promise<T> {
  const { data } = await axios.get(url);
  return data;
}

export const deleteById = async (
  url: string,
  { arg: id }: { arg: number },
): Promise<void> => {
  await axios.delete(`${url}/${id}`);
};

export const updateById = async (
  url: string,
  { arg: { id, ...data } }: { arg: { id?: number } & Record<string, unknown> },
) => {
  await axios.put(`${url}/${id}`, data);
};


export async function save(
  url: string,
  { arg: { id, ...data } }: { arg: { id?: number } & Record<string, unknown> },
): Promise<void> {
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${url}/${id ?? ''}`,
    data,
  });
}


export const post = async <T, U>(url: string, { arg }: { arg: T }): Promise<U> => {
  const { data } = await axios.post(url, arg);
  return data;
};