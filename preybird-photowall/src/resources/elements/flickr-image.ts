export interface Image {
    link: string
    title: string
}

export class FlickrImage implements Image {   
    constructor (public link: string, public title: string) {
        console.log(link, title);
    }
}