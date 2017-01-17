// import { FlickrWindow } from './app';
import { HttpClientConfig } from './resources/configuration/httpClientConfig';
//import { HttpClientConfig } from './resources/configuration/httpClientConfig';
import { autoinject } from 'aurelia-framework';
import { FlickrImage } from './resources/elements/flickr-image';
import { FlickrApiPublicConfig } from './resources/configuration/flickrApiConfig';
// import { FlickrApiAppKeyConfig } from './flickrApiConfig';
import { FlickrApi } from './resources/configuration/flickrApi.interface';
import { HttpClient } from 'aurelia-http-client';

// export class FlickrWindow extends Window {
//   jsonFlickrFeed(rsp) {
//     console.log(rsp)
//       if (rsp.stat != "ok") {
//         // something broke!
//         return;
//       }
//       console.log(rsp)
//   }
// }

    window.jsonFlickrFeed = function jsonFlickrFeed(rsp) {
      console.log(rsp)
      if (rsp.stat != "ok") {
        // something broke!
        return;
      }
      console.log(rsp)
    }


@autoinject
export class App {
  images: FlickrImage[] = [];
  searchText = '';
  title = 'My Photo Wall';
  flickrApiConfig: FlickrApi;
  // window : Window;
  http: HttpClient;

  constructor(private httpClientConfig: HttpClientConfig, flickrApiConfig: FlickrApiPublicConfig) {
    // this.window = new Window();
    
    let http = httpClientConfig.get({
      baseUrl: flickrApiConfig.get()
    });
    //Better handling
    // window.jsonFlickrFeed = function jsonFlickrFeed(rsp) {
    //   console.log(rsp)
    //   if (rsp.stat != "ok") {
    //     // something broke!
    //     return;
    //   }
    //   console.log(rsp)
    // }
  }

  async apiKeySearch() {
    // Fetch api key
    // Inject search method through interface
  }

  async search() {
    if (this.searchText) {
      this.images = [];
      // TODO: replace whitespace with comma
      // Tags
      let urlTags = this.searchText;

      // Fetch
      try {
        var fetchOptions = {
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        };

        let response = await this.http.jsonp(urlTags, 'jsonp')
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

      // Reset
      this.searchText = '';
    }
  }
}