import { autoinject } from 'aurelia-framework';

import { FlickrWindow } from './resources/elements/flickr-window.interface';
import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrPublicSearchService } from './resources/services/flickrPublicSearchService';

@autoinject
export class App {
  images: FlickrImage[] = [];
  searchText = '';
  title = 'My Photo Wall';
  window = <FlickrWindow>window;

  constructor(private flickrService: FlickrPublicSearchService) {
    this.window.jsonFlickrFeed = (data) => {
      this.images = this.flickrService.handle(data)
    }
  }

  async search() {
    if (this.searchText) {
      this.flickrService.search(this.searchText);
      this.reset();
    }
  }

  private reset() {
    this.searchText = '';
    this.images = [];
  }
}