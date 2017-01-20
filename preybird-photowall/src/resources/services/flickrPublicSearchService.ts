import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

import { HttpClientConfig } from '../configuration/httpClientConfig';
import { FlickrService } from './flickrService.interface';
import { FlickrImage } from '../elements/flickr-image';

@autoinject
export class FlickrPublicSearchService implements FlickrService {
    baseUrl = "https://api.flickr.com/services/feeds/photos_public.gne/?format=json&nojsoncallback=0&tags=";
    httpClient: HttpClient;

    constructor(private httpClientConfig: HttpClientConfig) {
        this.httpClient = httpClientConfig.get({
            baseUrl: this.baseUrl
        });
    }

    async search(text: string) {
        // TODO: replace whitespace with comma, for tags, massage

        try {
            let response = await this.httpClient.jsonp(text, 'jsonp')
            return;
        }
        catch (err) {
            console.log(err);
        }
    }

    handle(imageData): FlickrImage[] {
        let items = imageData.items;
        let images: FlickrImage[] = [];

        for (let i of items) {
            images.push(new FlickrImage(i.media.m, i.title))
        }
        return images;
    }
}

