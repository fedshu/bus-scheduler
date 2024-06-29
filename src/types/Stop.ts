import { AbstractItem } from "./AbstractItem"
import { Time } from "./Time"

export class Stop extends AbstractItem {
  private order: number
  private time: Time[] = []

  constructor(value: string, order: number) {
    super(value)
    this.value = value || ''
    this.order = order
  }

  getOrder(): number {
    return this.order
  }

  addTime(value: string) {
    this.time.push(new Time(value))
  }

  getSortedTime(): Time[] {
    return Array.from(this.time.values())
      .sort((currTime, nextTime) => {
        const [currHour, currMinutes] = currTime.getValue().split(":").map(Number);
        const [nextHour, nextMinutes] = nextTime.getValue().split(":").map(Number);

        return currHour !== nextHour ? currHour - nextHour : currMinutes - nextMinutes
      });
  }

  getTimes(): Time[] {
    return this.time
  }
}