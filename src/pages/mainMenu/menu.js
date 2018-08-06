"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/*import {NavController} from 'ionic-angular';*/
var about_1 = require("../about/about");
var taker_1 = require("../Taker/taker");
var album_1 = require("../album/album");
var test_1 = require("../test/test");
var MenuPage = (function () {
    function MenuPage() {
        this.album = album_1.AlbumPage;
        this.taker = taker_1.TakerPage;
        this.test = test_1.TestPage;
        this.about = about_1.AboutPage;
    }
    MenuPage.prototype.openPage = function (page) {
        //this.navCtrl.push(page,{});
    };
    return MenuPage;
}());
MenuPage = __decorate([
    core_1.Component({
        templateUrl: 'menu.html'
    })
], MenuPage);
exports.MenuPage = MenuPage;
