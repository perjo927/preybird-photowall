import { HttpClient } from 'aurelia-fetch-client';
import { ClientConfig } from './clientConfig.interface';
import { autoinject } from 'aurelia-framework';

@autoinject
export class HttpClientConfig implements ClientConfig {
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    get(options: any) {
        this.httpClient.configure(config => {
            config
                .withBaseUrl(options.baseUrl)
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
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

        return this.httpClient;
    }
}