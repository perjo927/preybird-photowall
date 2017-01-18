import { autoinject } from 'aurelia-framework';


import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrApiPublic } from './resources/configuration/flickrApiPublic';
// import { FlickrApiPhotosSearch } from './resources/configuration/flickrApiPhotosSearch';

// import { FlickrWindow } from './app';
// TOOD
export interface FlickrWindow extends Window {
  jsonFlickrFeed(rsp):any;
}


@autoinject
export class App {
  images: FlickrImage[] = [];
  searchText = '';
  title = 'My Photo Wall';
  window : FlickrWindow;
  

  constructor(private flickrApi: FlickrApiPublic) {
    this.window = <FlickrWindow>window //as FlickrWindow;
    
    //Better handling, only valid if Public API
    this.window.jsonFlickrFeed = (rsp) => {
      console.log(rsp, this.title)
      if (rsp.stat != "ok") {
        console.log(rsp.stat)
        return;
      }
      console.log(rsp, this.title)
    }
  }

  async search() {
    if (this.searchText) {

      this.flickrApi.search(this.searchText);

      this.reset();

      // Fetch
      try {
        // var fetchOptions = {
        //   method: 'GET',
        //   mode: 'cors',
        //   cache: 'default'
        // };

        
        // console.log(response);
        // let response = await this.http.fetch(urlTags, fetchOptions); 
        // let data = await response;//.json();

        // let items = data.items;

        // TODO: 
        // Process data, use base handler
        // for (let i of items) {
        //   this.images.push(new FlickrImage(i.media.m, i.title))
        // }
      }
      catch (err) {
        console.log(err);
      }

      
    }
  }

  private reset() {
    // Reset
      this.searchText = '';
      this.images = []; // TODO: reset
      
  }
}