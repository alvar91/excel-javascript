import {createStore} from './createStore';

describe('TEST', () => {
  test('test', () => {
    const store = createStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
