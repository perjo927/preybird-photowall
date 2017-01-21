import { autoinject } from 'aurelia-framework';

import { FlickrWindow } from './resources/elements/flickr-window.interface';
import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrPublicSearchService } from './resources/services/flickrPublicSearchService';
import { SearchForm } from './resources/elements/search-form';

@autoinject
export class App {
  images: FlickrImage[] = [];
  searchForm: SearchForm;
  searchText = ''; 
  title = 'My Photo Wall';
  window = <FlickrWindow>window;

  constructor(private flickrService: FlickrPublicSearchService) {
    // TODO: setInterval(() => this.blabla(), 10000);
    this.searchForm = new SearchForm(this.flickrService);

    // Handle jsonp requests for public API
    this.window.jsonFlickrFeed = (data) => {
      this.images = this.flickrService.handle(data)
    }
  }


  search() {
    if (this.searchText) {
      this.searchForm.search(this.searchText);
      this.reset();
    }        
  }

  private reset() {
    this.searchText = '';
    this.images = [];
  }
}