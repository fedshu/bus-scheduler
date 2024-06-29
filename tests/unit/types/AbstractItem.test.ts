import { AbstractItem } from '@/types/AbstractItem';
import { describe, it, expect } from 'vitest';

class ConcreteValue extends AbstractItem {
  // A concrete implementation of AbstractItem since it cannot be instantiated directly
  constructor(value: string) {
    super(value);
  }
}

describe('AbstractItem', () => {
  it('should return the correct value from getValue', () => {
    const value = 'test';
    const instance = new ConcreteValue(value);
    expect(instance.getValue()).toBe(value);
  });

  it('should compare correctly when values are the same', () => {
    const value = 'test';
    const instance1 = new ConcreteValue(value);
    const instance2 = new ConcreteValue(value);
    expect(instance1.compare(instance2)).toBe(true);
  });

  it('should compare correctly when values are different', () => {
    const instance1 = new ConcreteValue('test1');
    const instance2 = new ConcreteValue('test2');
    expect(instance1.compare(instance2)).toBe(false);
  });
});