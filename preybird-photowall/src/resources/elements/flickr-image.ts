import { Image } from "./image.interface"

export class FlickrImage implements Image {   
    linkBig: string;

    constructor (public link: string, public title: string) {
        this.linkBig = link;
    }
}