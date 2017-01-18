import { HttpClient as FetchClient } from 'aurelia-fetch-client';
import { HttpClient } from 'aurelia-http-client';
import { FlickrImage } from '../elements/flickr-image';

export interface FlickrApi {
    baseUrl: string
    httpClient: HttpClient|FetchClient

    search(text: string): any
}