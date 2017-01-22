import { App } from '../../src/app';
import { ArrayShifter } from '../../src/resources/utilities/arrayShifter';
import { FlickrPublicSearchService } from '../../src/resources/services/flickrPublicSearchService';
import { HttpClient } from 'aurelia-http-client';
import { HttpClientConfig } from '../../src/resources/configuration/httpClientConfig';

describe('Given that there is an app', () => {
  let app = new App(
    new FlickrPublicSearchService(new HttpClientConfig(new HttpClient())),
    new ArrayShifter()
  );

  describe('When the component is initialized', () => {
    it('Then it should have a title', () => {
      expect(app.title).toBe('My Photo Wall');
    });

    it('And it should have an empty search text', () => {
      expect(app.searchText).toBe('');
    });

    it('And it should have an images array', () => {
      expect(app.imagesToShow.length).toBe(0);
    });

    it('And it should have a search form', () => {
      expect(app.searchForm).toBeDefined();
    });
  });

  describe('When the search method is called', () => {

    beforeEach(() => {
      app.searchForm.search = () => { };
      spyOn(app.searchForm, 'search');

      app.searchText = "per";
      app.search();
    });

    it('Then the search text should be reset', () => {
      expect(app.searchText).toBe('');
    });

    it('And searchForm.search should have been called', () => {
      expect(app.searchForm.search).toHaveBeenCalled();
    });

    it('And searchForm.search should have been called with "per"', () => {
      expect(app.searchForm.search).toHaveBeenCalledWith('per');
    });
  });
});