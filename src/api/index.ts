import { BASE_API } from '@/constans';
import axios, { AxiosResponse } from 'axios'

export function get<T>(path: string): Promise<AxiosResponse<T>> {
  return axios.get<T>(`${BASE_API}${path}`);
}