import { autoinject } from 'aurelia-framework';


import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrApiPublic } from './resources/configuration/flickrApiPublic';
// import { FlickrApiPhotosSearch } from './resources/configuration/flickrApiPhotosSearch';

// import { FlickrWindow } from './app';
// TOOD
export interface FlickrWindow extends Window {
  jsonFlickrFeed(rsp): any;
}


@autoinject
export class App {
  images: FlickrImage[] = [];
  searchText = '';
  title = 'My Photo Wall';
  window: FlickrWindow;


  constructor(private flickrApi: FlickrApiPublic) {
    this.window = <FlickrWindow>window;

    //Better handling, only valid if Public API
    this.window.jsonFlickrFeed = (data) => {
      console.log(data)
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
    // Reset
    this.searchText = '';
    this.images = []; // TODO: reset
  }
}