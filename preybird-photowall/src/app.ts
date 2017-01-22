import { autoinject } from 'aurelia-framework';

import { FlickrWindow } from './resources/elements/flickr-window.interface';
import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrPublicSearchService } from './resources/services/flickrPublicSearchService';
import { SearchForm } from './resources/elements/search-form';

@autoinject
export class App {
  imageBuffer: FlickrImage[] = [];
  imagesToShow: FlickrImage[] = [];
  imagesLimit = 6;
  intervalReference: number; //
  interval = 2500;
  searchForm: SearchForm;
  searchText = '';
  title = 'My Photo Wall';
  window = <FlickrWindow>window;


  constructor(private flickrService: FlickrPublicSearchService) {
    this.searchForm = new SearchForm(this.flickrService);

    // Handle jsonp requests for public API
    this.window.jsonFlickrFeed = (data) => {
      this.imageBuffer = this.flickrService.handle(data)
      this.setTimer();
    }
  }

  search() {
    if (this.searchText) {
      this.resetTimer()
      this.searchForm.search(this.searchText);
      this.resetSearch();
    }
  }

  private resetSearch() {
    this.searchText = '';
    this.imageBuffer, this.imagesToShow = [];
  }

  private resetTimer() {
    clearInterval(this.intervalReference);
  }

  private setTimer() {
    let bufferLength = this.imageBuffer.length;
    let imagesLength = this.imagesToShow.length;
    let newImages: FlickrImage[];

    if (imagesLength === 0) {
      let chunkSize = (bufferLength > this.imagesLimit) ? this.imagesLimit : bufferLength;
      newImages = this.imageBuffer.splice(0, chunkSize);
      this.imagesToShow.unshift(...newImages);
    }

    this.intervalReference = setInterval(() => {
      if (bufferLength > 0) {
        newImages = this.imageBuffer.splice(0, 1);
        this.imagesToShow.unshift(...newImages);
        this.imagesToShow.pop();
      } else {
        this.resetTimer();
      }

      imagesLength = this.imagesToShow.length;
      bufferLength = this.imageBuffer.length;

    }, this.interval);
  }
}