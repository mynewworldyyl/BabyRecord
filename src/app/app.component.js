"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var menu_1 = require("../pages/mainMenu/menu");
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, dbService, alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.rootPage = menu_1.MenuPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            dbService.init();
            window['ionicAlertCtrl'] = alertCtrl;
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    core_1.Component({
        templateUrl: 'app.html'
    })
], MyApp);
exports.MyApp = MyApp;
