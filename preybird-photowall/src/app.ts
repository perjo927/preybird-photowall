import { autoinject } from 'aurelia-framework';

import { ArrayShifter } from './resources/utilities/arrayShifter';
import { FlickrWindow } from './resources/elements/flickr-window.interface';
import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrPublicSearchService } from './resources/services/flickrPublicSearchService';
import { SearchForm } from './resources/elements/search-form';

@autoinject
export class App {
  private imageBuffer = new Array<FlickrImage>();  
  imagesToShow = new Array<FlickrImage>();

  searchForm: SearchForm;
  searchText = '';

  title = 'My Photo Wall';
  window = <FlickrWindow>window;


  constructor(
    private flickrService: FlickrPublicSearchService,
    private arrayShifter: ArrayShifter
  ) {

    this.searchForm = new SearchForm(this.flickrService);

    // Needed for handling jsonp requests for public API
    this.window.jsonFlickrFeed = (data) => {
      this.imageBuffer = this.flickrService.handle(data)
      this.switchImages();
    }
  }

  search() {
    if (this.searchText) {
      this.arrayShifter.reset()
      this.searchForm.search(this.searchText);
      this.resetSearch();
    }
  }

  private resetSearch() {
    this.searchText = '';
    this.imageBuffer, this.imagesToShow = [];
  }

  private switchImages() {
    this.arrayShifter.shift(this.imagesToShow, this.imageBuffer);
  }
}