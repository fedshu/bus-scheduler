type BusPath = {
  STOP: string;
};

type Route = {
  BUS_LINES: string;
  BUS_STOPS: string;
  NOT_FOUND: string;
};

type SortDirection = {
  ASCENDING: 'ascending';
  DESCENDING: 'descending';
};

export { BusPath, Route, SortDirection }