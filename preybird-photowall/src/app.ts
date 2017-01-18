import { autoinject } from 'aurelia-framework';

import { FlickrWindow } from './resources/elements/flickr-window.interface';
import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrApiPublic } from './resources/configuration/flickrApiPublic';

@autoinject
export class App {
  images: FlickrImage[] = [];
  searchText = '';
  title = 'My Photo Wall';
  window = <FlickrWindow>window;

  constructor(private flickrApi: FlickrApiPublic) {
    this.window.jsonFlickrFeed = (data) => {
      this.images = this.flickrApi.handle(data)
    }
  }

  async search() {
    if (this.searchText) {
      this.flickrApi.search(this.searchText);
      this.reset();
    }
  }

  private reset() {
    this.searchText = '';
    this.images = [];
  }
}