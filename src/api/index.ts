import axios from 'axios';

const baseUrl = 'http://localhost:9000/api';

export async function getAll<T>(url: string): Promise<T> {
  const { data } = await axios.get(`${baseUrl}/${url}`);

  return data.items;
}
