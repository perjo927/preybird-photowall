import { HttpClient as FetchClient } from 'aurelia-fetch-client';
import { HttpClient } from 'aurelia-http-client';

import { FlickrImage } from './flickr-image';

export interface FlickrService {
    baseUrl: string
    httpClient: HttpClient|FetchClient

    search(text: string): any
    handle(data: any): FlickrImage[]
}