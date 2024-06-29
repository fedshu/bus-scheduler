import { AbstractItem } from "./AbstractItem"

export class Time extends AbstractItem {
  constructor(value: string) {
    super(value)
    this.value = value || ''
  }
}