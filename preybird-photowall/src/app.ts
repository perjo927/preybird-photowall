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


  search() {
    if (this.searchText) {
      // TODO: replace whitespace with comma
      // Tags
      let urlTags = this.searchText;

      // Fetch
      // TODO: typescript await
      this.http.fetch(urlTags)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let items = data.items;
          console.log(items);

          // TODO: 
          // Process data
          for (let i of items) {
            this.images.push(new FlickrImage(i.media.m, i.title))
          }
        })
        .catch(error => console.log(error));

      // Reset
      this.searchText = '';
    }
  }
}