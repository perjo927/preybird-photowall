import { FlickrImage } from './../elements/flickr-image';
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

            // ?? //

            return [];
        }
        catch (err) {
            console.log(err);
        }
    }

    handle(imageData): FlickrImage[] {
        let items = imageData.items;
        let images: FlickrImage[] = [];

        // TODO: 
        //Process data, use base handler
        for (let i of items) {
            images.push(new FlickrImage(i.media.m, i.title))
        }
        return images;
    }
}

