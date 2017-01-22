import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent } from 'aurelia-testing';

import { FlickrImage } from '../../src/resources/elements/flickr-image';

describe('Given that there is a FlickrImage', () => {   
    const component = new FlickrImage("link", "title");

    describe('When it has been initialized', () => {

        it('Then it should have a link', () => {
            expect(component.link).toBe('link');
        });
        it('And it should have a title', () => {
            expect(component.title).toBe('title');
        });
    });
});

describe('Given that there is a FlickrImage component', () => {
    
    const linkText = "link";
    const titleText = "title";

    let component;

    beforeEach(() => {
        component = StageComponent
            .withResources('resources/elements/flickr-image')
            .inView(`<flickr-image link.bind="link" title.bind="title"></flickr-image>`)
            .boundTo({ link: linkText, title: titleText })
    });

    // TODO
    describe('When the component is rendered', () => {
        it('Then it should have a link and a title', done => {
            component.create(bootstrap).then(() => {
                const element = document.querySelector('flickr-image');
                expect(element).toBeDefined();
                done();
            }).catch(e => { console.log(e.toString()) });
        });
        
    });
    
    afterEach(() => {
        component.dispose();
    });
});