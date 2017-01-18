import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

import { HttpClientConfig } from './httpClientConfig';
import { FlickrApi } from './flickrApi.interface';

@autoinject
export class FlickrApiPublic implements FlickrApi {
    baseUrl = "https://api.flickr.com/services/feeds/photos_public.gne/?format=json&nojsoncallback=0&tags=";
    httpClient: HttpClient;

    constructor(private httpClientConfig: HttpClientConfig) {
        this.httpClient = httpClientConfig.get({
            baseUrl: this.baseUrl
        });
    }

    async search(text: string) {
        // TODO: replace whitespace with comma, for tags, massage
        let urlTags = text;

        // Fetch
        try {


            let response = await this.httpClient.jsonp(urlTags, 'jsonp')
            console.log(response);
            // let response = await this.http.fetch(urlTags, fetchOptions); 
            // let data = await response;//.json();

            // let items = data.items;

            // TODO: 
            // Process data, use base handler
            // for (let i of items) {
            //   this.images.push(new FlickrImage(i.media.m, i.title))
            // }
            
            return [];
        }
        catch (err) {
            console.log(err);
        }
    }
}

