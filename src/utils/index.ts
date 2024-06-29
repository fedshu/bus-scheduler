import { SORT_DIRECTION } from "@/constans";
import { Stop } from "@/types/Stop";

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function sortStops(stops: Stop[], direction: string): Stop[] {
  return stops.sort((a: Stop, b: Stop) => {
    if (direction === SORT_DIRECTION.ASCENDING) {
      return a.getValue().localeCompare(b.getValue());
    } else {
      return b.getValue().localeCompare(a.getValue());
    }
  });
}