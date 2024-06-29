import { BusPath, Route, SortDirection } from "@/types/Constants";

const BASE_API = 'http://localhost:3000/';

const BUS_PATH: BusPath = {
  STOP: 'stops',
};

const ROUTE: Route = {
  BUS_LINES: 'Bus Lines',
  BUS_STOPS: 'Bus Stops',
  NOT_FOUND: 'Not Found',
};

const SORT_DIRECTION: SortDirection = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

export { BASE_API, BUS_PATH, ROUTE, SORT_DIRECTION };