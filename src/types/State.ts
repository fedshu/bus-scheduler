import { sortStops } from "@/utils";
import { IApiResponse } from "./IApiResponse";
import { Line } from "./Line";
import { Stop } from "./Stop";

export class State {
  busLines: Map<number, Line> = new Map()

  isLoading = false
  error = null

  updateBusLinesByApiResponse(data: IApiResponse[]) {
    this.clearLines();

    data.forEach(element => {
      this.addApiResponseItem(element)
    });
  }

  filterStopsByString(searchString: string): Stop[] {
    return this.getAllUniqueStops().filter(
      (item: Stop) => item.getValue().toLowerCase().includes(searchString.toLowerCase())
    )
  }

  getAllUniqueStops(): Stop[] {
    const tempMap = new Map()

    Array.from(this.busLines.values()).flatMap(
      (value: Line) => value.getStops()).forEach((item) => {
        if (!tempMap.has(item.getValue())) {
          tempMap.set(item.getValue(), item)
        }
      })

    return Array.from(tempMap.values())
  }

  getAllLines(): Line[] {
    return this.getAllLinesByAscendingOrder()
  }

  getAllLinesByAscendingOrder(): Line[] {
    return Array.from(this.busLines.values()).sort((a, b) => a.getNumber() - b.getNumber())
  }

  getSortedStopsByValue(direction: string): Stop[] {
    return sortStops(this.getAllUniqueStops(), direction)
  }

  private addApiResponseItem(item: IApiResponse) {
    if (!this.busLines.has(item.line)) {
      const newLine = new Line(item.line)
      newLine.addStop(item.stop, item.order, item.time)

      this.busLines.set(item.line, newLine)
    } else {
      this.busLines.get(item.line)?.addStop(item.stop, item.order, item.time)
    }
  }

  private clearLines() {
    this.busLines = new Map();
  }
}