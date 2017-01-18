import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

import { HttpClientConfig } from './fetchClientConfig';
import { FlickrApi } from './flickrApi.interface';
import { FlickrImage } from './../elements/flickr-image';

@autoinject
export class FlickrApiPhotosSearch implements FlickrApi {
    baseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=108af4c065183c8377da15b6eeedd94a&format=json&nojsoncallback=1&text=";
    httpClient: HttpClient;

    constructor(private httpClientConfig: HttpClientConfig) {
        this.httpClient = httpClientConfig.get({
            baseUrl: this.baseUrl
        });
    }

    async search(text: string) {
        try {
            var fetchOptions = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            let response = await this.httpClient.fetch(text, fetchOptions);
            let data = await response.json();
            console.log(data);

            return;
        }
        catch (err) {
            console.log(err);
        }
    }

    handle(imageData): FlickrImage[] {
        throw new Error("Not implemented");
    }
}