import { autoinject } from 'aurelia-framework';

@autoinject
export class SearchForm {

    constructor(private searchService: any) {}

    search = (text: string) => {
        if (text) {
            this.searchService.search(text);
        }
    }
}