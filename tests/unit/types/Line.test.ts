import { Line } from '@/types/Line'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Line', () => {
  let line: Line

  beforeEach(() => {
    line = new Line(1)
  })

  it('should create a Line with the correct number', () => {
    expect(line.getNumber()).toBe(1)
  })

  it('should add a stop and retrieve it', () => {
    line.addStop('Station A', 1, '10:00')
    const stops = line.getStops()
    expect(stops).toHaveLength(1)
    expect(stops[0].getValue()).toBe('Station A')
    expect(stops[0].getOrder()).toBe(1)
    expect(stops[0].getTimes()).toEqual([{ value: '10:00' }])
  })

  it('should add multiple times to the same stop', () => {
    line.addStop('Station B', 1, '11:00')
    line.addStop('Station B', 1, '12:00')
    const stops = line.getStops()
    expect(stops).toHaveLength(1)
    expect(stops[0].getTimes()).toEqual([{ value: '11:00' }, { value: '12:00' }])
  })
})