import { get } from "@/api";
import { AxiosResponse } from 'axios'
import { IApiResponse } from "@/types/IApiResponse";
import { BUS_PATH } from "@/constans";

function getStops(): Promise<AxiosResponse<IApiResponse[]>> {
  return get<IApiResponse[]>(BUS_PATH.STOP)
}

export { getStops }