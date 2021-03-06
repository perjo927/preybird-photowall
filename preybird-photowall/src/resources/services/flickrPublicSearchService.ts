import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

import { FlickrService } from './flickrService.interface';
import { FlickrImage } from '../elements/flickr-image';
import { HttpClientConfig } from '../configuration/httpClientConfig';

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
        let urlTags = this.createQueryString(text);

        try {
            let response = await this.httpClient.jsonp(urlTags, 'jsonp')
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

    private createQueryString(text: string): string {
        return text.split(' ').join(',');
    }
}

