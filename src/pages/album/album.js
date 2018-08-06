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
var PAGE_SIZE = 10;
var AlbumPage = (function () {
    function AlbumPage(photoLibrary, dbService, commonService) {
        this.photoLibrary = photoLibrary;
        this.dbService = dbService;
        this.commonService = commonService;
        this.defaultAlbum = 1;
        this.init = false;
        this.offset = 0;
        this.limit = PAGE_SIZE;
        this.pageEnd = false;
        this.items = [
            { paths: ['assets/imgs/20180118153908.jpg', 'assets/imgs/20180118153941.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118153941.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118153952.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118154030.jpg'], title: 'Good Girl', date: new Date() },
        ];
    }
    AlbumPage.prototype.ngOnInit = function () {
        this.updateAlbum();
    };
    AlbumPage.prototype.ngAfterViewInit = function () {
        if (typeof myalbum != 'undefined') {
            this.queryAlbumData();
        }
    };
    AlbumPage.prototype.ngAfterViewChecked = function () {
        //this.queryAlbumData();
    };
    AlbumPage.prototype.updateAlbum = function () {
        var _this = this;
        myalbum.db.selectTAlbum().then(function (albums) {
            _this.albumList = albums;
        }, function (err) {
            _this.albumList = [];
        });
    };
    AlbumPage.prototype.queryAlbumData = function (refresher) {
        if (refresher === void 0) { refresher = null; }
        this.offset = 0;
        this.limit = PAGE_SIZE;
        this.pageEnd = false;
        this.loadPhotoFromLocal(refresher);
    };
    AlbumPage.prototype.loadPhotoFromLocal = function (refresher, append) {
        var _this = this;
        if (refresher === void 0) { refresher = null; }
        if (append === void 0) { append = false; }
        this.commonService.showLoading('图片加载中');
        myalbum.db.selectTAlbumData(this.defaultAlbum, this.offset, this.limit).then(function (result) {
            if (result.length < _this.limit) {
                _this.pageEnd = true;
            }
            if (append) {
                for (var i = 0; i < result.length; i++) {
                    _this.items.push(result[i]);
                }
            }
            else {
                _this.items = [];
                for (var i = 0; i < result.length; i++) {
                    _this.items.push(result[i]);
                }
            }
            _this.commonService.hideLoading();
            if (!!refresher)
                refresher.complete();
        }, function (err) {
            //this.items = [];
            _this.commonService.hideLoading();
            if (!!refresher)
                refresher.complete();
        });
    };
    AlbumPage.prototype.loadPhotos = function () {
        var _this = this;
        this.photoLibrary.requestAuthorization().then(function () {
            _this.photoLibrary.getLibrary().subscribe({
                next: function (library) {
                    library.forEach(function (libraryItem) {
                        //myalbum.db.insertAlbumLib(libraryItem);
                    });
                },
                error: function (err) { console.log('could not get photos'); },
                complete: function () { console.log('done getting photos'); }
            });
        })
            .catch(function (err) { return console.log('permissions weren\'t granted'); });
    };
    AlbumPage.prototype.photoDetail = function (item) {
        //this.loadPhotos();
        //this.dbService.sayHello();
        //myalbum.db.dropTable('t_album_lib');
        //myalbum.db.insertAlbumLib(testData);
        //this.navCtrl.push(PhotoDetailPage,{item});
    };
    AlbumPage.prototype.doInfinite = function (infiniteScroll) {
        if (this.pageEnd) {
            infiniteScroll.complete();
            return;
        }
        this.offset += this.limit;
        this.loadPhotoFromLocal(infiniteScroll, true);
    };
    AlbumPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.queryAlbumData(refresher);
    };
    return AlbumPage;
}());
AlbumPage = __decorate([
    core_1.Component({
        selector: 'album-home',
        templateUrl: 'album.html'
    })
], AlbumPage);
exports.AlbumPage = AlbumPage;
