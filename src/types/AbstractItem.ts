export abstract class AbstractItem {
  constructor(protected value: string) { }

  getValue(): string {
    return this.value
  }

  compare(self: AbstractItem): boolean {
    return self.getValue() === this.value
  }
}