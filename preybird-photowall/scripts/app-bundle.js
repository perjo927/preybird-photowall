define('resources/elements/todo',["require", "exports"], function (require, exports) {
    "use strict";
    var Todo = (function () {
        function Todo(description) {
            this.description = description;
            this.done = false;
        }
        return Todo;
    }());
    exports.Todo = Todo;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "./resources/elements/flickr-image", "aurelia-framework", "aurelia-fetch-client"], function (require, exports, flickr_image_1, aurelia_framework_1, aurelia_fetch_client_1) {
    "use strict";
    var App = (function () {
        function App(http) {
            this.http = http;
            this.images = [];
            this.searchText = '';
            this.title = 'My Photo Wall';
            http.configure(function (config) {
                config
                    .withBaseUrl("https://api.flickr.com/services/feeds/photos_public.gne/?format=json&nojsoncallback=1&tags=")
                    .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch',
                    }
                })
                    .withInterceptor({
                    request: function (request) {
                        console.log("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        console.log("Received " + response.status + " " + response.url);
                        return response;
                    }
                });
            });
        }
        App.prototype.search = function () {
            var _this = this;
            if (this.searchText) {
                var urlTags = this.searchText;
                this.http.fetch(urlTags)
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                    var items = data.items;
                    console.log(items);
                    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                        var i = items_1[_i];
                        _this.images.push(new flickr_image_1.FlickrImage(i.media.m, i.title));
                    }
                })
                    .catch(function (error) { return console.log(error); });
                this.searchText = '';
            }
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], App);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('resources/elements/image',["require", "exports"], function (require, exports) {
    "use strict";
    var FlickrImage = (function () {
        function FlickrImage(link, title) {
            this.link = link;
            this.title = title;
            console.log(link, title);
        }
        return FlickrImage;
    }());
    exports.FlickrImage = FlickrImage;
});

define('resources/elements/flickr-image',["require", "exports"], function (require, exports) {
    "use strict";
    var FlickrImage = (function () {
        function FlickrImage(link, title) {
            this.link = link;
            this.title = title;
            console.log(link, title);
        }
        return FlickrImage;
    }());
    exports.FlickrImage = FlickrImage;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=./styles/main.css></require><require from=./resources/elements/flickr-image.html></require><h1>${title}</h1><form submit.trigger=search()><input type=text value.bind=searchText><button type=Search>Search</button></form><ul><li repeat.for=\"image of images\"><flickr-image link.bind=image.link title.bind=image.title></flickr-image></li><li></li></ul></template>"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "h1 {\n  color: green; }\n"; });
define('text!resources/elements/image.html', ['module'], function(module) { module.exports = "<template bindable=\"link, title\">hello</template>"; });
define('text!resources/elements/flickr-image.html', ['module'], function(module) { module.exports = "<template bindable=\"link, title\"><h4>${title}</h4><picture><img src=${link} alt=${title}></picture></template>"; });
//# sourceMappingURL=app-bundle.js.map