import { FlickrApi } from './flickrApi.interface';

export class FlickrApiPublicConfig implements FlickrApi{
    baseUrl: string;

    constructor() {
        this.baseUrl = "https://api.flickr.com/services/feeds/photos_public.gne/?format=json&nojsoncallback=0&tags=";
    }

    get() {
        return this.baseUrl;
    }
}

export class FlickrApiAppKeyConfig implements FlickrApi{
    baseUrl: string;

    constructor() {
        this.baseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad1eaebc00afa46613c77ea08f77870d&format=json&nojsoncallback=1&tags=";
    }

    get() {
        return this.baseUrl;
    }
}