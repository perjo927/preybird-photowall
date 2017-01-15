import { FlickrImage } from './resources/elements/flickr-image';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';


@autoinject
export class App {
  images: FlickrImage[] = [];
  searchText = '';
  title = 'My Photo Wall';

  constructor(private http: HttpClient) {

    // TODO: fetch from httpclientconfig.json
    http.configure(config => {
      config
        .withBaseUrl("https://api.flickr.com/services/feeds/photos_public.gne/?format=json&nojsoncallback=1&tags=")
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch',
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }


  async search() {
    if (this.searchText) {
      this.images = [];
      // TODO: replace whitespace with comma
      // Tags
      let urlTags = this.searchText;

      // Fetch
      try {
        let response = await this.http.fetch(urlTags);
        let data = await response.json();

        let items = data.items;

          // TODO: 
          // Process data
          for (let i of items) {
            this.images.push(new FlickrImage(i.media.m, i.title))
          }
      }
      catch (err) {
        console.log(err);
      }      

      // Reset
      this.searchText = '';
    }
  }
}