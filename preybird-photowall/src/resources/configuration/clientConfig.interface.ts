import { HttpClient } from 'aurelia-http-client';
import { HttpClient as FetchClient } from 'aurelia-fetch-client';

export interface ClientConfig {
    httpClient: HttpClient|FetchClient

    get(options: any): HttpClient|FetchClient;
}