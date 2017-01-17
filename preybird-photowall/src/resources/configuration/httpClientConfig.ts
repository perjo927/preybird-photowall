import { HttpClient } from 'aurelia-http-client';
import { ClientConfig } from './clientConfig.interface';
import { autoinject } from 'aurelia-framework';

@autoinject
export class HttpClientConfig implements ClientConfig {
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) { 
        // wtf autoinject
         this.httpClient = new HttpClient();
    }

    get(options: any) {
        this.httpClient.configure(config => {
            config
                .withBaseUrl(options.baseUrl)
                .withInterceptor({
                    request(request) {
                        console.log(`Requesting ${request.baseUrl} ${request.url}`);
                        return request;
                    },
                    response(response) {
                        console.log(`Received ${response.statusCode} ${response.statusText}`);
                        return response;
                    }
                });
        });

        return this.httpClient;
    }
}
