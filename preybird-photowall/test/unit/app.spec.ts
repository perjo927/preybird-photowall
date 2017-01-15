import { App } from '../../src/app';

describe('Given that there is an app', () => {
  describe('Given that there is an app', () => {
    it('Then it should says hello', () => {
      expect(new App().message).toBe('Hello World!');
    });
  });
});
