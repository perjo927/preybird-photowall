define('resources/utilities/arrayShifter',["require", "exports"], function (require, exports) {
    "use strict";
    var ArrayShifter = (function () {
        function ArrayShifter(arrayLimit, interval) {
            if (arrayLimit === void 0) { arrayLimit = 6; }
            if (interval === void 0) { interval = 2500; }
            this.arrayLimit = arrayLimit;
            this.interval = interval;
        }
        Object.defineProperty(ArrayShifter.prototype, "intervalLength", {
            set: function (interval) {
                this.interval = interval;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayShifter.prototype, "arraySize", {
            set: function (arrayLimit) {
                this.arrayLimit = arrayLimit;
            },
            enumerable: true,
            configurable: true
        });
        ArrayShifter.prototype.shift = function (array, buffer) {
            var _this = this;
            var arrayLength = array.length;
            var bufferLength = buffer.length;
            var newItems;
            if (arrayLength === 0) {
                var chunkSize = (bufferLength > this.arrayLimit) ? this.arrayLimit : bufferLength;
                newItems = buffer.splice(0, chunkSize);
                array.unshift.apply(array, newItems);
            }
            this.intervalReference = setInterval(function () {
                if (bufferLength > 0) {
                    newItems = buffer.splice(0, 1);
                    array.unshift.apply(array, newItems);
                    array.pop();
                }
                else {
                    _this.reset();
                }
                arrayLength = array.length;
                bufferLength = buffer.length;
            }, this.interval);
        };
        ArrayShifter.prototype.reset = function () {
            clearInterval(this.intervalReference);
        };
        return ArrayShifter;
    }());
    exports.ArrayShifter = ArrayShifter;
});

define('resources/elements/flickr-window.interface',["require", "exports"], function (require, exports) {
    "use strict";
});

define('resources/elements/image.interface',["require", "exports"], function (require, exports) {
    "use strict";
});

define('resources/elements/flickr-image',["require", "exports"], function (require, exports) {
    "use strict";
    var FlickrImage = (function () {
        function FlickrImage(link, title) {
            this.link = link;
            this.title = title;
            this.linkBig = link;
        }
        return FlickrImage;
    }());
    exports.FlickrImage = FlickrImage;
});

define('resources/services/flickrService.interface',["require", "exports"], function (require, exports) {
    "use strict";
});

define('resources/configuration/clientConfig.interface',["require", "exports"], function (require, exports) {
    "use strict";
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
define('resources/configuration/httpClientConfig',["require", "exports", "aurelia-framework", "aurelia-http-client"], function (require, exports, aurelia_framework_1, aurelia_http_client_1) {
    "use strict";
    var HttpClientConfig = (function () {
        function HttpClientConfig(httpClient) {
            this.httpClient = httpClient;
        }
        HttpClientConfig.prototype.get = function (options) {
            this.httpClient.configure(function (config) {
                config
                    .withBaseUrl(options.baseUrl)
                    .withInterceptor({
                    request: function (request) {
                        console.log("Requesting " + request.baseUrl + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        console.log("Received " + response.statusCode + " " + response.statusText);
                        return response;
                    }
                });
            });
            return this.httpClient;
        };
        return HttpClientConfig;
    }());
    HttpClientConfig = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_http_client_1.HttpClient])
    ], HttpClientConfig);
    exports.HttpClientConfig = HttpClientConfig;
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('resources/services/flickrPublicSearchService',["require", "exports", "aurelia-framework", "../elements/flickr-image", "../configuration/httpClientConfig"], function (require, exports, aurelia_framework_1, flickr_image_1, httpClientConfig_1) {
    "use strict";
    var FlickrPublicSearchService = (function () {
        function FlickrPublicSearchService(httpClientConfig) {
            this.httpClientConfig = httpClientConfig;
            this.baseUrl = "https://api.flickr.com/services/feeds/photos_public.gne/?format=json&nojsoncallback=0&tags=";
            this.httpClient = httpClientConfig.get({
                baseUrl: this.baseUrl
            });
        }
        FlickrPublicSearchService.prototype.search = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                var urlTags, response, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            urlTags = this.createQueryString(text);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.httpClient.jsonp(urlTags, 'jsonp')];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/];
                        case 3:
                            err_1 = _a.sent();
                            console.log(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        FlickrPublicSearchService.prototype.handle = function (imageData) {
            var items = imageData.items;
            var images = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var i = items_1[_i];
                images.push(new flickr_image_1.FlickrImage(i.media.m, i.title));
            }
            return images;
        };
        FlickrPublicSearchService.prototype.createQueryString = function (text) {
            return text.split(' ').join(',');
        };
        return FlickrPublicSearchService;
    }());
    FlickrPublicSearchService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [httpClientConfig_1.HttpClientConfig])
    ], FlickrPublicSearchService);
    exports.FlickrPublicSearchService = FlickrPublicSearchService;
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
define('resources/elements/search-form',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var SearchForm = (function () {
        function SearchForm(searchService) {
            var _this = this;
            this.searchService = searchService;
            this.search = function (text) {
                if (text) {
                    _this.searchService.search(text);
                }
            };
        }
        return SearchForm;
    }());
    SearchForm = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Object])
    ], SearchForm);
    exports.SearchForm = SearchForm;
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
define('app',["require", "exports", "aurelia-framework", "./resources/utilities/arrayShifter", "./resources/services/flickrPublicSearchService", "./resources/elements/search-form"], function (require, exports, aurelia_framework_1, arrayShifter_1, flickrPublicSearchService_1, search_form_1) {
    "use strict";
    var App = (function () {
        function App(flickrService, arrayShifter) {
            var _this = this;
            this.flickrService = flickrService;
            this.arrayShifter = arrayShifter;
            this.imageBuffer = new Array();
            this.imagesToShow = new Array();
            this.searchText = '';
            this.title = 'My Photo Wall';
            this.window = window;
            this.searchForm = new search_form_1.SearchForm(this.flickrService);
            this.window.jsonFlickrFeed = function (data) {
                _this.imageBuffer = _this.flickrService.handle(data);
                _this.switchImages();
            };
        }
        App.prototype.search = function () {
            if (this.searchText) {
                this.arrayShifter.reset();
                this.searchForm.search(this.searchText);
                this.resetSearch();
            }
        };
        App.prototype.switchImages = function () {
            this.arrayShifter.shift(this.imagesToShow, this.imageBuffer);
        };
        App.prototype.resetSearch = function () {
            this.searchText = '';
            this.imageBuffer, this.imagesToShow = [];
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [flickrPublicSearchService_1.FlickrPublicSearchService,
            arrayShifter_1.ArrayShifter])
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/configuration/fetchClientConfig',["require", "exports", "aurelia-fetch-client", "aurelia-framework"], function (require, exports, aurelia_fetch_client_1, aurelia_framework_1) {
    "use strict";
    var HttpClientConfig = (function () {
        function HttpClientConfig(httpClient) {
            this.httpClient = httpClient;
        }
        HttpClientConfig.prototype.get = function (options) {
            this.httpClient.configure(function (config) {
                config
                    .withBaseUrl(options.baseUrl)
                    .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
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
            return this.httpClient;
        };
        return HttpClientConfig;
    }());
    HttpClientConfig = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], HttpClientConfig);
    exports.HttpClientConfig = HttpClientConfig;
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('resources/services/flickrPhotosSearchService',["require", "exports", "aurelia-framework", "../configuration/fetchClientConfig"], function (require, exports, aurelia_framework_1, fetchClientConfig_1) {
    "use strict";
    var FlickrPhotosSearchService = (function () {
        function FlickrPhotosSearchService(httpClientConfig) {
            this.httpClientConfig = httpClientConfig;
            this.baseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=108af4c065183c8377da15b6eeedd94a&format=json&nojsoncallback=1&text=";
            this.httpClient = httpClientConfig.get({
                baseUrl: this.baseUrl
            });
        }
        FlickrPhotosSearchService.prototype.search = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                var fetchOptions, response, data, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            fetchOptions = {
                                method: 'GET',
                                mode: 'cors',
                                cache: 'default'
                            };
                            return [4 /*yield*/, this.httpClient.fetch(text, fetchOptions)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            console.log(data);
                            return [2 /*return*/];
                        case 3:
                            err_1 = _a.sent();
                            console.log(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        FlickrPhotosSearchService.prototype.handle = function (imageData) {
            throw new Error("Not implemented");
        };
        return FlickrPhotosSearchService;
    }());
    FlickrPhotosSearchService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [fetchClientConfig_1.HttpClientConfig])
    ], FlickrPhotosSearchService);
    exports.FlickrPhotosSearchService = FlickrPhotosSearchService;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=./styles/main.css></require><require from=./resources/elements/flickr-image.html></require><require from=./resources/elements/search-form.html></require><require from=./resources/elements/grid-view.html></require><h1>${title}</h1><search-form search.call=search() text.two-way=searchText>Go</search-form><grid-view><div class=col repeat.for=\"image of imagesToShow\"><flickr-image class=\"${ $last ? 'fade-out' : ''}\" link.bind=image.link linkbig.bind=image.linkBig title.bind=image.title></flickr-image></div></grid-view></template>"; });
define('text!resources/elements/flickr-image.html', ['module'], function(module) { module.exports = "<template bindable=\"link, linkBig, title\"><require from=../../styles/image.css></require><picture><source srcset=${linkBig} media=\"(min-width: 600px)\"><img src=${link} alt=${title}></picture><h5>${title}</h5></template>"; });
define('text!styles/image.css', ['module'], function(module) { module.exports = "@keyframes fadein {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes fadeout {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0); }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0); }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0); }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0); } }\n\nflickr-image {\n  display: block;\n  text-align: center; }\n\n.fade-out {\n  animation: fadeout cubic-bezier(0.895, 0.03, 0.685, 0.22) 2.8s; }\n\npicture {\n  animation: fadein ease-in 1s; }\n\nimg {\n  max-height: 175px;\n  max-width: 175px;\n  border: 5px solid white;\n  box-shadow: 0px 0px 2px black; }\n\nh5 {\n  margin-top: 0;\n  text-align: center; }\n\n@media screen and (min-width: 1000px) {\n  img {\n    max-height: 250px;\n    max-width: 250px; } }\n\n@media screen and (max-width: 600px) {\n  img {\n    max-height: 250px;\n    max-width: 250px; } }\n"; });
define('text!resources/elements/grid-view.html', ['module'], function(module) { module.exports = "<template><div class=flex><slot></slot></div></template>"; });
define('text!resources/elements/search-form.html', ['module'], function(module) { module.exports = "<template bindable=\"search, text\"><form submit.trigger=search() class=search><input type=text placeholder=Search value.two-way=text><button type=submit><slot></slot></button></form></template>"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Open+Sans|Pacifico\");\n.flex {\n  display: flex;\n  flex-direction: row;\n  flex-flow: wrap;\n  justify-content: space-between;\n  align-items: baseline; }\n  .flex .col {\n    width: 32%;\n    padding: 20px; }\n\n@media screen and (max-width: 600px) {\n  .flex {\n    display: block; }\n    .flex .col {\n      width: 100%;\n      margin: 0 0 10px 0; } }\n\n@keyframes fadein {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes fadeout {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0); }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0); }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0); }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0); } }\n\n* {\n  box-sizing: border-box; }\n\nbody {\n  padding: 20px; }\n\nbody, input {\n  font-family: \"Open Sans\", sans-serif;\n  color: darkgray; }\n\nh1 {\n  animation: shake 1s;\n  font-family: \"Pacifico\", cursive;\n  color: mediumvioletred;\n  text-align: center; }\n\nform.search {\n  text-align: center; }\n  form.search input, form.search button {\n    border-radius: 3px; }\n  form.search input {\n    width: 150px;\n    border: 2px solid lightgray; }\n  form.search button {\n    margin-left: 5px;\n    border: 2px solid darkgray;\n    font-family: \"Open Sans\", sans-serif;\n    font-weight: bold;\n    width: 70px;\n    animation: shake 1s;\n    animation-delay: 1s; }\n"; });
//# sourceMappingURL=app-bundle.js.map