import { IApiResponse } from '@/types/IApiResponse';
import { State } from '@/types/State';
import { describe, it, expect, beforeEach } from 'vitest';

describe('State', () => {
  let state: State;

  beforeEach(() => {
    state = new State();
  });

  describe('updateBusLinesByApiResponse', () => {
    it('should clear existing lines and add new ones', () => {
      const mockApiResponse: IApiResponse[] = [
        { line: 1, stop: 'Stop A', order: 1, time: '10:00' },
        { line: 2, stop: 'Stop B', order: 1, time: '11:00' },
      ];

      state.updateBusLinesByApiResponse(mockApiResponse);

      expect(state.busLines.size).toBe(2);
      expect(state.busLines.get(1)).toBeDefined();
      expect(state.busLines.get(2)).toBeDefined();
    });
  });

  describe('filterStopsByString', () => {
    it('should return filtered stops based on search string', () => {
      const mockApiResponse: IApiResponse[] = [
        { line: 1, stop: 'Central Station', order: 1, time: '10:00' },
        { line: 1, stop: 'Downtown', order: 2, time: '10:15' },
        { line: 2, stop: 'Airport', order: 1, time: '11:00' },
      ];

      state.updateBusLinesByApiResponse(mockApiResponse);

      const filteredStops = state.filterStopsByString('down');

      expect(filteredStops.length).toBe(1);
      expect(filteredStops[0].getValue()).toBe('Downtown');
    });
  });

  describe('getAllUniqueStops', () => {
    it('should return all stops from all lines', () => {
      const mockApiResponse: IApiResponse[] = [
        { line: 1, stop: 'Stop A', order: 1, time: '10:00' },
        { line: 1, stop: 'Stop B', order: 2, time: '10:15' },
        { line: 2, stop: 'Stop C', order: 1, time: '11:00' },
      ];

      state.updateBusLinesByApiResponse(mockApiResponse);

      const allStops = state.getAllUniqueStops();

      expect(allStops.length).toBe(3);
      expect(allStops.map(stop => stop.getValue())).toEqual(['Stop A', 'Stop B', 'Stop C']);
    });
  });

  describe('addApiResponseItem', () => {
    it('should add a new line if it doesn\'t exist', () => {
      const mockItem: IApiResponse = { line: 1, stop: 'New Stop', order: 1, time: '12:00' };

      state['addApiResponseItem'](mockItem);

      expect(state.busLines.size).toBe(1);
      expect(state.busLines.get(1)).toBeDefined();
    });

    it('should add a stop to an existing line', () => {
      const mockItem1: IApiResponse = { line: 1, stop: 'Stop A', order: 1, time: '12:00' };
      const mockItem2: IApiResponse = { line: 1, stop: 'Stop B', order: 2, time: '12:15' };

      state['addApiResponseItem'](mockItem1);
      state['addApiResponseItem'](mockItem2);

      expect(state.busLines.size).toBe(1);
      const line = state.busLines.get(1);
      expect(line?.getStops().length).toBe(2);
    });
  });

  describe('clearLines', () => {
    it('should clear all bus lines', () => {
      const mockItem: IApiResponse = { line: 1, stop: 'Stop A', order: 1, time: '12:00' };
      state['addApiResponseItem'](mockItem);

      expect(state.busLines.size).toBe(1);

      state['clearLines']();

      expect(state.busLines.size).toBe(0);
    });
  });
});