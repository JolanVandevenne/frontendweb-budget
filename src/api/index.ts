import axios from 'axios';
import type { PaginatedResponse } from '../types';

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAll<T>(url: string): Promise<T> {
  const { data } = await axios.get(`${baseUrl}/${url}`);

  return data.items;
}

export async function getAllWithPaging<T>(
  url: string,
): Promise<PaginatedResponse<T>> {
  const { data } = await axios.get(`${baseUrl}/${url}`);
  return data;
}

export const deleteById = async (
  url: string,
  { arg: id }: { arg: number },
): Promise<void> => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};