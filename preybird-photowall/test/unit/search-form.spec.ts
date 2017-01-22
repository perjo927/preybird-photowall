import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent } from 'aurelia-testing';

import { SearchForm } from '../../src/resources/elements/search-form';

describe('Given that there is a search form', () => {
    const searchService = {
        search: (text: string) => ""
    };
    const component = new SearchForm(searchService);

    describe('When the search method is called', () => {
        beforeEach(() => {
            spyOn(component.searchService, 'search');
            component.search("per");
        });
        it('Then it should have called the search service', () => {
            expect(component.searchService.search).toHaveBeenCalled();
        });
        it('And it should have called the search service with "per"', () => {
            expect(component.searchService.search).toHaveBeenCalledWith('per');
        });
    });
});

describe('Given that there is a search component', () => {
    const searchService = {
        search: (text: string) => ""
    };
    const searchModel = new SearchForm(searchService);
    const search = () => { searchModel.search('foo') };
    const buttonText = "Go";

    let component;

    beforeEach(() => {
        component = StageComponent
            .withResources('resources/elements/search-form')
            .inView(`<search-form search.call="search" text.two-way="text">${buttonText}</search-form>`)
            .boundTo({ search: search })
            .boundTo({ text: 'Per' });
    });

    describe('When the component is rendered', () => {
        it('Then it should have a button with projected text', done => {
            component.create(bootstrap).then(() => {
                const element = document.querySelector('button');
                expect(element.innerHTML).toMatch('Go');
                done();
            }).catch(e => { console.log(e.toString()) });
        });
    });
    
    afterEach(() => {
        component.dispose();
    });
});