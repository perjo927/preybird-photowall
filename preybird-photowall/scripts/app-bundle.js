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
            return __awaiter(this, void 0, void 0, function () {
                var urlTags, response, data, items, _i, items_1, i, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.searchText) return [3 /*break*/, 6];
                            this.images = [];
                            urlTags = this.searchText;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.http.fetch(urlTags)];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            data = _a.sent();
                            items = data.items;
                            for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                                i = items_1[_i];
                                this.images.push(new flickr_image_1.FlickrImage(i.media.m, i.title));
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            console.log(err_1);
                            return [3 /*break*/, 5];
                        case 5:
                            this.searchText = '';
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
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

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=./styles/main.css></require><require from=./resources/elements/flickr-image.html></require><h1>${title}</h1><form submit.trigger=search()><input type=text value.bind=searchText><button type=Search>Search</button></form><ul><li repeat.for=\"image of images\"><flickr-image link.bind=image.link title.bind=image.title></flickr-image></li><li></li></ul></template>"; });
define('text!resources/elements/flickr-image.html', ['module'], function(module) { module.exports = "<template bindable=\"link, title\"><h4>${title}</h4><picture><img src=${link} alt=${title}></picture></template>"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "h1 {\n  color: green; }\n"; });
//# sourceMappingURL=app-bundle.js.map