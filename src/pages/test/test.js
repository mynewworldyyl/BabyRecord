"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TestPage = (function () {
    function TestPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return TestPage;
}());
TestPage = __decorate([
    core_1.Component({
        template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\n          Test\n        </ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content padding>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3>\n            This column will be 12 columns wide by default,\n            9 columns at the small breakpoint,\n            6 at the medium breakpoint, 4 at large, and 3 at xl.\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3>\n            This column will be 12 columns wide by default,\n            9 columns at the small breakpoint,\n            6 at the medium breakpoint, 4 at large, and 3 at xl.\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <ion-icon name=\"heart\"></ion-icon>                    <!-- active -->\n      <ion-icon name=\"heart\" isActive=\"false\"></ion-icon>  <!-- inactive -->\n\n\n      <ion-list inset>\n        <ion-item>\n          <ion-label fixed>fixed</ion-label>\n          <ion-input type=\"text\" value=\"\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>floating</ion-label>\n          <ion-input type=\"password\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked>stacked</ion-label>\n          <ion-input type=\"text\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label>inline</ion-label>\n          <ion-input type=\"VerifyCode\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-input type=\"text\" placeholder=\"placeholder\"></ion-input>\n        </ion-item>\n      </ion-list>\n\n\n      <ion-item-group>\n        <ion-item-divider color=\"light\">A</ion-item-divider>\n        <ion-item>Angola</ion-item>\n        <ion-item>Argentina</ion-item>\n        <ion-item-divider color=\"light\">B</ion-item-divider>\n        <ion-item>aaa</ion-item>\n        <ion-item>bbgb</ion-item>\n      </ion-item-group>\n\n      <ion-list>\n        <ion-list-header>\n          Action\n        </ion-list-header>\n        <ion-item>Terminator II</ion-item>\n        <ion-item>The Empire Strikes Back</ion-item>\n        <ion-item>Blade Runner</ion-item>\n      </ion-list>\n\n      <ion-list>\n        <ion-list-header>Today</ion-list-header>\n        <ion-item>\n          <ion-thumbnail item-start>\n            <img src=\"/assets/imgs/20180118153908.jpg\">\n          </ion-thumbnail>\n          <h2>Finn</h2>\n          <p>I've had a pretty messed up day. If we just...</p>\n          <ion-note item-end>3:43 pm</ion-note>\n        </ion-item>\n        <ion-list-header>Yesterday</ion-list-header>\n        <ion-item>\n          <ion-thumbnail item-start>\n            <img src=\"/assets/imgs/20180118154000.jpg\">\n          </ion-thumbnail>\n          <h2>Finn</h2>\n          <h3>Don't Know What To Do!</h3>\n          <ion-note item-end>3:43 pm</ion-note>\n        </ion-item>\n      </ion-list>\n\n    </ion-content>\n  "
    })
], TestPage);
exports.TestPage = TestPage;
