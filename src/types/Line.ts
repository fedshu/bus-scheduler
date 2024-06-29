import { Stop } from "./Stop"
import { sortStops } from '@/utils'

export class Line {
  private number: number
  private stops: Map<string, Stop> = new Map()

  constructor(number: number) {
    this.number = number
  }

  getStops(): Stop[] {
    return Array.from(this.stops.values())
  }

  getNumber(): number {
    return this.number
  }

  getSortedStopsByValue(direction: string): Stop[] {
    return sortStops(this.getStops(), direction)
  }

  addStop(stop: string, order: number, time: string) {
    if (!this.stops.has(stop)) {
      const newStop = new Stop(stop, order)
      newStop.addTime(time)

      this.stops.set(stop, newStop)
    } else {
      this.stops.get(stop)?.addTime(time)
    }
  }
}