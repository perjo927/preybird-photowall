import { App } from '../../src/app';
import { HttpClient } from 'aurelia-fetch-client';

// TODO
describe('Given that there is an app component', () => {
  let http = new HttpClient();

  describe('When the component is rendered', () => {
    it('Then it should says hello', () => {
      expect(new App().title).toBe('My Photo Wall');
    });
  });
});