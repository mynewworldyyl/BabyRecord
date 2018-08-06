"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testData = {
    creationDate: '2018-09-02 02:04',
    fileName: "IMG_20180117_203604.jpg",
    height: 2432,
    id: "assets/imgs/20180118153908.jpg",
    latitude: 0,
    longitude: 0,
    photoURL: "assets/imgs/20180118153908.jpg",
    thumbnailURL: "assets/imgs/20180118153908.jpg",
    width: 2432
};
var EditAlbumPage = (function () {
    function EditAlbumPage(navCtrl, photoLibrary, dbService) {
        this.navCtrl = navCtrl;
        this.photoLibrary = photoLibrary;
        this.dbService = dbService;
    }
    EditAlbumPage.prototype.ngOnInit = function () {
    };
    EditAlbumPage.prototype.ngAfterViewInit = function () {
    };
    EditAlbumPage.prototype.ngAfterViewChecked = function () {
    };
    EditAlbumPage.prototype.queryAlbumLib = function () {
    };
    return EditAlbumPage;
}());
EditAlbumPage = __decorate([
    core_1.Component({
        templateUrl: 'EditAlbum.html'
    })
], EditAlbumPage);
exports.EditAlbumPage = EditAlbumPage;
