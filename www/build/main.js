webpackJsonp([0],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AlbumListPage__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__photo__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PhotoDetailPage = (function () {
    function PhotoDetailPage(navCtrl, params, menuCtrl, actionSheetCtrl, commonService, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.commonService = commonService;
        this.popoverCtrl = popoverCtrl;
        this.disabled = false;
        this.datas = [];
        this.item = params.data.item;
        this.disabled = !params.data.editable;
    }
    PhotoDetailPage.prototype.ngOnInit = function () {
        //this.disabled = true;
    };
    PhotoDetailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PhotoDetailPage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    PhotoDetailPage.prototype.openPhoto = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__photo__["a" /* PhotoPage */], { item: this.item });
    };
    PhotoDetailPage.prototype.update = function () {
        var _this = this;
        console.log('Update');
        this.disabled = true;
        myalbum.db.updateTAlbumData({ title: this.item.title, desc: this.item.desc, address: this.item.address,
            creationDate: this.item.creationDate }, this.item.id).then(function (result) {
            console.log(result);
            _this.goBack();
        }, function (err) {
            console.log(err);
            myalbum.ui.showAlert('更新失败');
            _this.goBack();
        });
    };
    PhotoDetailPage.prototype.doMove = function () {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__AlbumListPage__["a" /* AlbumListPage */], {
            albumChange: function (albumId) {
                console.log(albumId);
                _this.disabled = true;
                albumId = parseInt(albumId);
                if (albumId != _this.item.albumId) {
                    myalbum.db.updateTAlbumData({ albumId: albumId }, _this.item.id).then(function (result) {
                        console.log(result);
                        _this.goBack();
                    }, function (err) {
                        console.log(err);
                        myalbum.ui.showAlert('移动失败');
                        //this.goBack();
                    });
                }
            }
        });
        popover.present();
    };
    PhotoDetailPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: 'Edit',
                    role: 'destructive',
                    handler: function () {
                        _this.disabled = false;
                        console.log('Edit');
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        console.log('Delete');
                        _this.commonService.comfirm('删除将造成此数据永久消失并不可恢复，你确定要做此操作吗？').then(function () {
                            var filePath = _this.item.mediaId.substring(_this.item.mediaId.indexOf(';') + 1);
                            _this.commonService.deleteFile(filePath).then(function () {
                                myalbum.db.deleteTAlbumData(_this.item.id).then(function (result) {
                                    console.log(result);
                                    _this.goBack();
                                }, function (err) {
                                    console.log(err);
                                    myalbum.ui.showAlert('更新数据失败');
                                }); //end deleteTAlbumData
                            }, function (err) {
                                console.log(err);
                                myalbum.ui.showAlert('删除文件失败');
                            }); //end deleteFile
                        }, function () {
                            //用户取消删除操作
                        }); //end comfirm
                    }
                },
                {
                    text: 'Move',
                    role: 'destructive',
                    handler: function () {
                        console.log('Move');
                        _this.doMove();
                        //this.goBack();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        _this.disabled = true;
                        console.log('Cancel clicked');
                        _this.goBack();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    PhotoDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'photo-detail',template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\photoDetail\photoDetail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{item.title}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentActionSheet()"  >\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n <ion-list>\n\n   <ion-item>\n     <ion-label stacked >标题</ion-label>\n     <ion-input type="text" name="title" [(ngModel)]="item.title"  disabled="{{disabled}}"></ion-input>\n   </ion-item>\n\n   <ion-item>\n     <ion-label stacked >描述</ion-label>\n     <ion-textarea name="desc" [(ngModel)]="item.desc"  disabled="{{disabled}}"></ion-textarea>\n   </ion-item>\n\n   <ion-item>\n     <ion-label stacked >地址</ion-label>\n     <ion-input type="text" name="address" [(ngModel)]="item.address"  disabled="{{disabled}}"></ion-input>\n   </ion-item>\n\n   <ion-item>\n     <ion-label stacked >时间</ion-label>\n     <ion-input type="text" name="creationDate" [(ngModel)]="item.creationDate"  disabled="{{disabled}}"></ion-input>\n   </ion-item>\n\n   <button ion-button full [hidden]="disabled" (click)="update()">保存</button>\n\n  <!-- <ion-item>\n    &lt;!&ndash; <img *ngIf="item.photoURL"  [src]="item.photoURL | cdvphotolibrary" (click)="openPhoto()">&ndash;&gt;\n     <img *ngIf="item.photoURL && (item.mediaType==\'image\' || item.mediaType==null)"   [src]="item.photoURL | cdvphotolibrary" (click)="openPhoto()">\n     <video *ngIf="item.photoURL && item.mediaType==\'video\'" width="320" height="240" controls webkit-playsinline>\n       <source [src]="item.photoURL | cdvphotolibrary" type="video/mp4">\n       Your browser does not support the video tag.\n     </video>\n   </ion-item>-->\n\n   <ion-item *ngFor="let it of item.datas">\n     <img *ngIf="it.photoURL.endsWith(\'jpg\')|| it.photoURL.endsWith(\'jpeg\')"  [src]="it.photoURL | cdvphotolibrary"/>\n     <video  *ngIf="it.photoURL.endsWith(\'mp4\')" width="320" height="240" controls webkit-playsinline>\n       <source [src]="it.photoURL | cdvphotolibrary" type="video/mp4">\n       Your browser does not support the video tag.\n     </video>\n   </ion-item>\n\n\n </ion-list>\n\n</ion-content>\n\n\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\photoDetail\photoDetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */]])
    ], PhotoDetailPage);
    return PhotoDetailPage;
}());

//# sourceMappingURL=photoDetail.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__photoDetail_photoDetail__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PhotoPage = (function () {
    function PhotoPage(navCtrl, params, commonService, dbService) {
        this.navCtrl = navCtrl;
        this.commonService = commonService;
        this.dbService = dbService;
        this.hiddenDesc = false;
        this.index = 0;
        this.autoPlayFlag = true;
        /**
         * video prop
         */
        this.playing = false;
        this.mainItem = params.data.item;
        this.item = this.mainItem.datas[0];
        this.index = 0;
        this.autoPlayFlag = params.data.autoPlay;
    }
    PhotoPage.prototype.ngAfterViewInit = function () {
    };
    PhotoPage.prototype.ionViewWillEnter = function () {
        /*let boxHeight = this.imgBox.nativeElement.offsetHeight; //高度
         let boxWidth = this.imgBox.nativeElement.offsetWidth; //宽度
    
         let imgHeight = this.imgElt.nativeElement.offsetHeight; //高度
         let imgWidth = this.imgElt.nativeElement.offsetWidth; //宽度
    
         let top = (boxHeight-imgHeight)/2;
         if(this.imgElt) {
         this.imgElt.nativeElement.style.top = top+'px';
         }
    
         if(this.address) {
         this.address.nativeElement.style.top = (top+35)+'px';
         }
         if(this.creationDate) {
         this.creationDate.nativeElement.style.top = (top+35)+'px';
         }*/
    };
    PhotoPage.prototype._initVideoView = function () {
        if (this.item.photoURL && this.item.photoURL.endsWith('mp4') && !!this.videoElt) {
            this.videoElt.nativeElement.currentTime = 0.1;
            /*this.videoElt.nativeElement.addEventListener('ended',() =>{
              this.playing=false;
              this.videoElt.nativeElement['x5-video-player-fullscreen']='';
              this.videoElt.nativeElement['webkit-playsinline']='';
              this.videoElt.nativeElement['playsinline']='';
            },false);*/
        }
    };
    PhotoPage.prototype.ngOnInit = function () {
        var _this = this;
        var swipe1 = function (event) {
            //console.log(event);
            //向左滑
            var self = _this;
            if (event.direction == 2) {
                _this.showNext();
            }
            else if (event.direction == 4) {
                if (_this.index == 0) {
                    var it = _this.dbService.preAlbumData(_this.mainItem);
                    if (it) {
                        _this.mainItem = it;
                        _this.index = _this.mainItem.datas.length;
                        _this.item = _this.mainItem.datas[--_this.index];
                    }
                }
                else {
                    _this.item = _this.mainItem.datas[--_this.index];
                }
            }
            //this._initVideoView();
        };
        this.swipe = swipe1.bind(this);
        if (this.autoPlayFlag) {
            this.autoPlay();
        }
    };
    PhotoPage.prototype.playVideo = function () {
        this.playing = !this.playing;
        if (this.playing) {
            this.videoElt.nativeElement.play();
        }
        else {
            this.videoElt.nativeElement.pause();
        }
    };
    PhotoPage.prototype.changePlay = function () {
        if (this.autoPlayFlag) {
            this.autoPlayFlag = false;
            this.stopPlay();
        }
        else {
            this.autoPlayFlag = true;
            this.autoPlay();
        }
    };
    PhotoPage.prototype.showNext = function () {
        var _this = this;
        var next = function () {
            if (_this.mainItem) {
                _this.item = _this.mainItem.datas[++_this.index];
            }
        };
        if (this.index < this.mainItem.datas.length - 1) {
            next();
        }
        else {
            this.dbService.nextAlbumData(this.mainItem, this.commonService).then(function (it) {
                _this.mainItem = it;
                _this.index = -1;
                next();
            }, function () {
                _this.mainItem = _this.dbService.firstAlbumData();
                _this.index = -1;
                next();
            });
        }
    };
    PhotoPage.prototype.autoPlay = function () {
        var _this = this;
        this.autoPlayTimer = setInterval(function () {
            _this.showNext();
        }, 3000);
    };
    PhotoPage.prototype.stopPlay = function () {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    };
    PhotoPage.prototype.showOther = function () {
        this.hiddenDesc = !this.hiddenDesc;
    };
    PhotoPage.prototype.ionViewDidEnter = function () {
        //(<any>window).StatusBar.show();
    };
    PhotoPage.prototype.photoDetail = function (item, editable) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__photoDetail_photoDetail__["a" /* PhotoDetailPage */], { item: item, editable: editable });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('videoElt'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], PhotoPage.prototype, "videoElt", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('imgBox'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], PhotoPage.prototype, "imgBox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('imgElt'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], PhotoPage.prototype, "imgElt", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('address'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], PhotoPage.prototype, "address", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('creationDate'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], PhotoPage.prototype, "creationDate", void 0);
    PhotoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'photo',
            template: "    \n\n      <ion-card no-padding (swipe)=\"swipe($event)\">\n        \n      <div *ngIf=\"item.address\" class=\"card-address\" [hidden]=\"hiddenDesc\">{{item.address}}</div>\n      <div  *ngIf=\"item.creationDate\" class=\"card-time\" [hidden]=\"hiddenDesc\">{{item.creationDate}}</div>\n        \n      <img *ngIf=\"item.photoURL&&(item.photoURL.endsWith('jpg') || item.photoURL.endsWith('jpeg'))\"  [src]=\"item.photoURL | cdvphotolibrary\" (click)=\"changePlay(item)\" />\n        \n      <video #videoElt *ngIf=\"item.photoURL && item.photoURL.endsWith('mp4')\" width='320' height='320' (click)=\"playVideo()\"\n      (loadedmetadata)=\"_initVideoView()\" [src]=\"item.photoURL | cdvphotolibrary\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n      </video>\n        \n      <ion-card-content class=\"cards-bg\" [hidden]=\"hiddenDesc\">\n        <ion-card-title *ngIf=\"item.title && item.id!=mainItem.coverId\" >\n          {{item.title}}\n        </ion-card-title>\n        <ion-card-title *ngIf=\"item.id==mainItem.coverId\" >\n          {{mainItem.title}}\n        </ion-card-title>\n        <p *ngIf=\"item.desc && item.id!=mainItem.coverId\">{{item.desc}} </p>\n        <p *ngIf=\"item.id==mainItem.coverId\">{{mainItem.desc}} </p>\n      </ion-card-content>\n\n      <!--<ion-row no-padding [hidden]=\"true\">\n        <ion-col text-right>\n          <button ion-button clear small  icon-start (click)=\"photoDetail(item,true)\">\n            <ion-icon name='share-alt'></ion-icon>\n            \u7F16\u8F91\n          </button>\n          <button *ngIf=\"item.photoURL && (item.mediaType=='image' || item.mediaType==null)\"  ion-button clear small  icon-start (click)=\"autoPlay(item)\" [hidden]=\"!autoPlayFlag\">\n            <ion-icon name='share-alt'></ion-icon>\n            \u64AD\u653E\n          </button>\n          <button *ngIf=\"item.photoURL && (item.mediaType=='image' || item.mediaType==null)\"  ion-button clear small  icon-start (click)=\"stopPlay()\" [hidden]=\"autoPlayFlag\">\n            <ion-icon name='share-alt'></ion-icon>\n            \u505C\u6B62\n          </button>\n        </ion-col>\n      </ion-row>-->\n\n    </ion-card>\n    \n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_3__service_DbService__["a" /* DbService */]])
    ], PhotoPage);
    return PhotoPage;
}());

//# sourceMappingURL=photo.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SysPhotoDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__photo__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_DbService__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SysPhotoDetailPage = (function () {
    function SysPhotoDetailPage(navCtrl, params, menuCtrl, actionSheetCtrl, commonService, dbService) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.commonService = commonService;
        this.dbService = dbService;
        this.disabled = false;
        this.item = params.data.item;
        this.disabled = !params.data.editable;
    }
    SysPhotoDetailPage.prototype.ngOnInit = function () {
        //this.disabled = true;
        this.updateAlbum();
        this.getFileInfo();
    };
    SysPhotoDetailPage.prototype.updateAlbum = function () {
        this.albumList = this.dbService.getAlbumDataQParams().albumList;
    };
    SysPhotoDetailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SysPhotoDetailPage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    SysPhotoDetailPage.prototype.openPhoto = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__photo__["a" /* PhotoPage */], { item: this.item });
    };
    SysPhotoDetailPage.prototype.update = function () {
        var _this = this;
        if (this.item.albumId == null || this.item.albumId == '') {
            myalbum.ui.showAlert('请选择保存专辑');
            return;
        }
        console.log('Update');
        this.disabled = true;
        myalbum.db.insertTAlbumData(this.item).then(function (result) {
            console.log(result);
            _this.goBack();
        }, function (err) {
            console.log(err);
            myalbum.ui.showAlert('更新失败');
            _this.goBack();
        });
    };
    SysPhotoDetailPage.prototype.getFileInfo = function () {
        var _this = this;
        var doGetLocation = function (it) {
            _this.commonService.showLoading('取图片地址');
            if (it.longitude > 0 && it.latitude > 0) {
                _this.commonService.getLocation(it.latitude, it.longitude).then(function (address) {
                    _this.item.address = address;
                    _this.item.latitude = it.latitude;
                    _this.item.longitude = it.longitude;
                    //this.data.creationDate = item.creationDate;
                    console.log(_this.item.address);
                    _this.commonService.hideLoading();
                });
            }
            else {
                _this.commonService.hideLoading();
            }
        };
        var fileUrl = this.item.photoURL;
        this.commonService.getFileInfo(fileUrl).then(function (it) {
            console.log(it);
            _this.item.creationDate = it.creationDate;
            if (it.longitude == 0 || it.latitude == 0) {
                _this.commonService.showLoading('通过GPS取图片坐标');
                _this.commonService.getPosition().then(function (position) {
                    it.latitude = _this.item.latitude = position.latitude;
                    it.longitude = _this.item.longitude = position.longitude;
                    doGetLocation(it);
                });
            }
            else {
                doGetLocation(it);
            }
        }, function (err) {
            console.log(err);
            _this.commonService.hideLoading();
        });
    };
    SysPhotoDetailPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '保存为',
                    role: 'destructive',
                    handler: function () {
                        _this.disabled = false;
                        console.log('Edit');
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        _this.disabled = true;
                        console.log('Cancel clicked');
                        _this.goBack();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SysPhotoDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'sys-photo-detail',template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\photoDetail\sysPhotoDetail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{item.title}}</ion-title>\n   <!-- <ion-buttons end>\n      <button ion-button icon-only (click)="presentActionSheet()"  >\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>-->\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n <ion-list>\n\n   <ion-row>\n     <ion-col>\n       <ion-item>\n         <ion-label>专辑</ion-label>\n         <ion-select [(ngModel)]="item.albumId">\n           <ion-option *ngFor="let n of albumList" value="{{n.id}}">{{n.name}}</ion-option>\n         </ion-select>\n       </ion-item>\n     </ion-col>\n   </ion-row>\n\n   <ion-item>\n     <ion-label stacked >标题</ion-label>\n     <ion-input type="text" name="title" [(ngModel)]="item.title"  disabled="{{disabled}}"></ion-input>\n   </ion-item>\n\n   <ion-item>\n     <ion-label stacked >描述</ion-label>\n     <ion-textarea name="desc" [(ngModel)]="item.desc"  disabled="{{disabled}}"></ion-textarea>\n   </ion-item>\n\n   <ion-item>\n     <ion-label stacked >地址</ion-label>\n     <ion-input type="text" name="address" [(ngModel)]="item.address"  disabled="{{disabled}}"></ion-input>\n   </ion-item>\n\n   <ion-item>\n     <ion-label stacked >时间</ion-label>\n     <ion-input type="text" name="creationDate" [(ngModel)]="item.creationDate"  disabled="{{disabled}}"></ion-input>\n   </ion-item>\n\n   <button ion-button full [hidden]="disabled" (click)="update()">保存</button>\n\n   <ion-item>\n     <img *ngIf="item.photoURL && (item.mediaType==\'image\' || item.mediaType==null)"   [src]="item.photoURL | cdvphotolibrary" (click)="openPhoto()">\n     <video *ngIf="item.photoURL && item.mediaType==\'video\'" width="320" height="240" controls webkit-playsinline>\n       <source [src]="item.photoURL | cdvphotolibrary" type="video/mp4">\n       Your browser does not support the video tag.\n     </video>\n   </ion-item>\n\n </ion-list>\n\n</ion-content>\n\n\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\photoDetail\sysPhotoDetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_4__service_DbService__["a" /* DbService */]])
    ], SysPhotoDetailPage);
    return SysPhotoDetailPage;
}());

//# sourceMappingURL=sysPhotoDetail.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PAGE_SIZE = 10;
var DbService = (function () {
    function DbService() {
        this.albumDataQParams = {
            albumList: [],
            month: '',
            monthDisabled: false,
            year: '',
            yearDisabled: false,
            albumId: '',
            sysDisabled: false,
            offset: 0,
            limit: PAGE_SIZE,
            pageEnd: false,
            items: []
        };
        this.cacheItems = [];
    }
    DbService.prototype.init = function () {
    };
    DbService.prototype.deviceReady = function () {
    };
    DbService.prototype.selectAlbumLib = function (albumName, offset, size) {
        return myalbum.db.selectAlbumLib();
    };
    DbService.prototype.getAlbumDataQParams = function () {
        return this.albumDataQParams;
    };
    DbService.prototype.resetAlbumData = function () {
        this.albumDataQParams.offset = 0;
        this.albumDataQParams.limit = PAGE_SIZE;
        this.albumDataQParams.pageEnd = false;
        this.albumDataQParams.items = [];
    };
    DbService.prototype.firstAlbumData = function () {
        var items = this.getAlbumDataQParams().items;
        if (items.length > 0) {
            return items[0];
        }
    };
    DbService.prototype.nextAlbumData = function (item, commonService) {
        var _this = this;
        return new Promise(function (reso, reje) {
            var items = _this.getAlbumDataQParams().items;
            var index = -1;
            for (var i = 0; i < items.length; i++) {
                if (item.id == items[i].id) {
                    index = i;
                    break;
                }
            }
            if (index < items.length - 1) {
                reso(items[index + 1]);
            }
            else {
                if (_this.albumDataQParams.pageEnd) {
                    return reje(null);
                }
                else {
                    var qparams = _this.getAlbumDataQParams();
                    if (!qparams.sysDisabled) {
                        _this.queryAlbumData(null, true).then(function () {
                            if (index < items.length - 1) {
                                reso(items[index + 1]);
                            }
                            else {
                                reje(null);
                            }
                        });
                    }
                    else {
                        _this.loadSysPhotos(null, true, commonService).then(function () {
                            if (index < items.length - 1) {
                                reso(items[index + 1]);
                            }
                            else {
                                reje(null);
                            }
                        });
                    }
                }
            }
        });
    };
    DbService.prototype.preAlbumData = function (item) {
        var items = this.getAlbumDataQParams().items;
        for (var i = 0; i < items.length; i++) {
            if (item.id == items[i].id) {
                if (i > 0) {
                    return items[i - 1];
                }
            }
        }
        return null;
    };
    DbService.prototype.deepCopy = function (p, c) {
        var c = c || {};
        for (var i in p) {
            if (!!p[i] && typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            }
            else {
                c[i] = p[i];
            }
        }
        return c;
    };
    DbService.prototype.queryAlbumData = function (refresher, append) {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.albumDataQParams.pageEnd) {
                if (refresher) {
                    refresher.complete();
                }
                reje('node data');
                return;
            }
            if (!_this.albumDataQParams.albumId || _this.albumDataQParams.albumId == '') {
                if (refresher) {
                    refresher.complete();
                }
                reje('album ID不能为空');
                return;
            }
            if (_this.albumDataQParams.items.length > 0) {
                _this.albumDataQParams.offset += _this.albumDataQParams.limit;
            }
            var year = _this.albumDataQParams.yearDisabled ? _this.albumDataQParams.year : null;
            var month = _this.albumDataQParams.monthDisabled ? _this.albumDataQParams.month : null;
            myalbum.db.selectTAlbumData(_this.albumDataQParams.albumId, year, month, _this.albumDataQParams.offset, _this.albumDataQParams.limit).then(function (clusterItems) {
                if (clusterItems.length == 0) {
                    if (!!refresher) {
                        refresher.complete();
                    }
                    reje('无数据');
                }
                else {
                    var clusterIds = [];
                    for (var i = 0; i < clusterItems.length; i++) {
                        clusterIds.push(clusterItems[i].id);
                    }
                    myalbum.db.selectAlbumDataForCluster(clusterIds).then(function (albumDatas) {
                        var cis = [];
                        for (var i = 0; i < clusterItems.length; i++) {
                            var it = _this.deepCopy(clusterItems[i], {});
                            it.datas = [];
                            cis.push(it);
                            for (var j = 0; j < albumDatas.length; j++) {
                                if (albumDatas[j].clusterId == clusterItems[i].id) {
                                    var ad = _this.deepCopy(albumDatas[j], {});
                                    delete ad.clusterId;
                                    if (clusterItems[i].coverId != albumDatas[j].id) {
                                        it.datas.push(ad);
                                    }
                                    else {
                                        it.datas.unshift(ad);
                                    }
                                }
                            }
                        }
                        if (cis.length < _this.albumDataQParams.limit) {
                            _this.albumDataQParams.pageEnd = true;
                        }
                        if (append) {
                            for (var i = 0; i < cis.length; i++) {
                                _this.albumDataQParams.items.push(cis[i]);
                            }
                        }
                        else {
                            _this.albumDataQParams.items = cis;
                        }
                        reso(_this.albumDataQParams.items);
                        //this.commonService.hideLoading();
                        if (!!refresher) {
                            refresher.complete();
                        }
                    }, function (err) {
                        reje(err);
                    });
                }
            }, function (err) {
                reje(err);
                //this.items = [];
                //this.commonService.hideLoading();
                if (!!refresher)
                    refresher.complete();
            });
        });
    };
    DbService.prototype.loadSysPhotos = function (refresher, append, commonService) {
        var _this = this;
        return new Promise(function (reso, reje) {
            console.log('requestAuthorization');
            var qparams = _this.getAlbumDataQParams();
            var albumId = !!qparams.sysAlbumId ? qparams.sysAlbumId : null;
            if (qparams.items.length > 0) {
                qparams.offset += qparams.limit;
            }
            var year = _this.albumDataQParams.yearDisabled ? _this.albumDataQParams.year : null;
            var month = _this.albumDataQParams.monthDisabled ? _this.albumDataQParams.month : null;
            commonService.queryFileList(albumId, qparams.offset, qparams.limit, year, month)
                .then(function (items) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    item.photoURL = item.nativeURL;
                }
                if (!append) {
                    qparams.items = items;
                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        qparams.items.push(item);
                    }
                }
                if (!!refresher)
                    refresher.complete();
                reso(qparams.items);
            }, function (err) {
                if (!!refresher)
                    refresher.complete();
                console.log(err);
                reje(err);
            });
        });
    };
    DbService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DbService);
    return DbService;
}());

//# sourceMappingURL=DbService.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media_capture__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by yanxiaojun617@163.com on 01-03.
 */






/*import { PhotoLibrary,LibraryItem } from '@ionic-native/photo-library';*/

/*Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}*/
var CommonService = (function () {
    function CommonService(/*public photoLibrary:PhotoLibrary,*/ toastCtrl, loadingCtrl, camera, plt, alertCtrl, geolocation, mediaCapture, imagePicker) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.plt = plt;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.mediaCapture = mediaCapture;
        this.imagePicker = imagePicker;
        this.MediaTypeImage = 'image';
        this.MediaTypeVideo = 'video';
        this.MediaTypeAudio = 'audio';
        this.backButtonListeners = new Map();
        this.eventListener = new Map();
        /**
         * 统一调用此方法显示提示信息
         * @param message 信息内容
         * @param duration 显示时长
         */
        this.showToast = function (message, duration) {
            if (message === void 0) { message = '操作完成'; }
            if (duration === void 0) { duration = 2500; }
            _this.toast = _this.toastCtrl.create({
                message: message,
                duration: duration,
                position: 'top',
                showCloseButton: true,
                closeButtonText: '关闭'
            });
            _this.toast.present();
        };
        /**
         * 关闭信息提示框
         */
        this.hideToast = function () {
            _this.toast.dismissAll();
        };
        /**
         * 统一调用此方法显示loading
         * @param content 显示的内容
         */
        this.showLoading = function (content) {
            if (content === void 0) { content = ''; }
            _this.loading = _this.loadingCtrl.create({
                content: content
            });
            _this.loading.present();
            setTimeout(function () {
                _this.hideLoading();
            }, 1000 * 10);
        };
        /**
         * 关闭loading
         */
        this.hideLoading = function () {
            if (_this.loading) {
                _this.loading.dismissAll();
            }
        };
        /**
         * 使用cordova-plugin-camera获取照片的base64
         * @param options
         * @return {Promise<T>}
         */
        this.getPicture = function (options) {
            return new Promise(function (resolve, reject) {
                _this.camera.getPicture(Object.assign({
                    //sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
                    destinationType: _this.camera.DestinationType.NATIVE_URI,
                    quality: 100,
                    allowEdit: false,
                    encodingType: _this.camera.EncodingType.JPEG,
                    //targetWidth: 800,//缩放图像的宽度（像素）
                    //targetHeight: 800,//缩放图像的高度（像素）
                    saveToPhotoAlbum: false,
                    correctOrientation: false //设置摄像机拍摄的图像是否为正确的方向
                }, options)).then(function (imageData) {
                    resolve(imageData);
                }, function (err) {
                    console.log(err);
                    err == 20 ? _this.showToast('没有权限,请在设置中开启权限') : reject(err);
                });
            });
            /* return new Promise((resolve, reject) => {
               resolve('assets/imgs/20180118153908.jpg');
             });*/
        };
        /**
         * 通过图库获取照片
         * @param options
         * @return {Promise<T>}
         */
        /*getPictureByPhotoLibrary = (options = {}) => {
          return new Promise((resolve,reje) => {
            if(this.isPcBrowser()) {
              resolve( this._pcTestTake(this.MediaTypeImage))
            } else {
              this.getPicture(Object.assign({
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                saveToPhotoAlbum: false
              }, options)).then(imageBase64 => {
                resolve({fullPath:imageBase64});
              }).catch(err => {
                String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
                reje(err);
              });
            }
      
      
          });
        };*/
        /**
         * 通过拍照获取照片
         * @param options
         * @return {Promise<T>}
         */
        this.getPictureByCamera = function (options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve) {
                _this.getPicture(Object.assign({
                    sourceType: _this.camera.PictureSourceType.CAMERA,
                    saveToPhotoAlbum: false,
                }, options)).then(function (imageBase64) {
                    resolve(imageBase64);
                }).catch(function (err) {
                    String(err).indexOf('cancel') != -1 ? _this.showToast('取消拍照', 1500) : _this.showToast('获取照片失败');
                });
            });
        };
        this.getFileInfo = function (fileUrl) {
            return new Promise(function (resolve, reje) {
                if (_this.isPcBrowser()) {
                    resolve(_this._pcTestTake(_this.MediaTypeImage));
                }
                else {
                    cordova.plugins.albumplugin.fileInfo(fileUrl, function (item) {
                        //console.log(item);
                        if (item.longitude == 0 || item.latitude == 0) {
                            _this.showLoading('查询位置信息');
                            item.fullPath = fileUrl;
                            _this.getPosition().then(function (position) {
                                item.latitude = position.latitude;
                                item.longitude = position.longitude;
                                _this.getLocation(position.latitude, position.longitude).then(function (address) {
                                    item.address = address;
                                    resolve(item);
                                }, function (err) {
                                    reje(err);
                                });
                            }, function (err) {
                                reje(err);
                            });
                        }
                        else {
                            _this.getLocation(item.latitude, item.longitude).then(function (address) {
                                item.address = address;
                                resolve(item);
                            }, function (err) {
                                reje(err);
                            });
                        }
                    }, function (err) {
                        console.log(err);
                        reje(err);
                    });
                }
            });
        };
        this.queryFileList = function (albumId, offset, limit, year, month) {
            return new Promise(function (resolve, reje) {
                if (_this.isPcBrowser()) {
                    resolve([{
                            creationDate: "2018-01-24T19:38:28.000Z",
                            latitude: 22.583942413330078,
                            longitude: 113.87908172607422,
                            nativeURL: 'assets/imgs/logo.png'
                        }]);
                }
                else {
                    cordova.plugins.albumplugin.queryFileList(albumId, offset, limit, year, month, function (items) {
                        resolve(items);
                    }, function (err) {
                        console.log(err);
                        reje(err);
                    });
                }
            });
        };
        this.deleteFile = function (fileUrl) {
            return new Promise(function (resolve, reje) {
                if (_this.isPcBrowser()) {
                    resolve(1);
                }
                else {
                    cordova.plugins.albumplugin.deleteFile(fileUrl, function (result) {
                        //console.log(item);
                        resolve(result);
                    }, function (err) {
                        reje(err);
                    });
                }
            });
        };
        this.__failCb = function (err, reje) {
            reje(err);
            _this.hideLoading();
        };
        /*this.plt.ready().then(() => {
    
        });*/
    }
    CommonService.prototype.deviceReady = function () {
        console.log('deviceready IN CommonService');
        document.addEventListener("pause", function () {
            console.log('pause');
        }, false);
        document.addEventListener("resume", function () {
            console.log('resume');
        }, false);
        document.addEventListener("menubutton", function () {
            console.log('menubutton');
        }, false);
        this.triggerEvent('refresh', []);
    };
    CommonService.prototype.triggerEvent = function (evt, args) {
        var lis = this.eventListener.get(evt);
        if (!lis) {
            return;
        }
        lis.forEach(function (fnt) {
            fnt(args);
        });
    };
    CommonService.prototype.regListener = function (evt, fnt) {
        var lis = this.eventListener.get(evt);
        if (!lis) {
            lis = new Set();
            this.eventListener.set(evt, lis);
        }
        lis.add(fnt);
    };
    CommonService.prototype.unRegListener = function (evt, fnt) {
        var lis = this.eventListener.get(evt);
        if (!lis) {
            return;
        }
        lis.delete(fnt);
    };
    CommonService.prototype.triggerBackButtonAction = function () {
        var flag = false;
        this.backButtonListeners.forEach(function (fnt) {
            flag = fnt();
        });
        return flag;
    };
    CommonService.prototype.registerBackButtonListener = function (key, listener) {
        this.backButtonListeners.set(key, listener);
    };
    CommonService.prototype.unRegisterBackButtonAction = function (key) {
        this.backButtonListeners.delete(key);
    };
    CommonService.prototype.isPcBrowser = function () {
        /*let u = window.navigator.userAgent, app = window.navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        //var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    
        return !(isAndroid /!*|| isIOS*!/)*/
        return !this.plt.is('android');
    };
    CommonService.prototype.formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    CommonService.prototype._pcTestTake = function (mediaType) {
        if (this.isPcBrowser()) {
            var mediaFile = 'assets/imgs/20180227_003.amr';
            if (mediaType == this.MediaTypeVideo) {
                mediaFile = 'assets/imgs/e6e8a3deaa49e336d7e11d87bdad3402.mp4';
            }
            else if (mediaType == this.MediaTypeImage) {
                mediaFile = 'assets/imgs/20180118153908.jpg';
            } /*else {
              mediaFile = 'assets/imgs/20180227_003.amr';
            }*/
            return {
                creationDate: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                fileName: mediaFile,
                height: 400,
                width: 400,
                //id:"409279;/storage/emulated/0/Pictures/myalbum/2018-0-23-1.jpg",
                //id:mediaFile,
                latitude: 22.5839424133301,
                longitude: 113.879081726074,
                /*latitude:0,
                longitude:0,*/
                //photoURL:"assets/imgs/20180118153908.jpg",
                fullPath: mediaFile,
                photoURL: mediaFile,
                //photoURL:"assets/imgs/logo.png",
                //photoURL:"assets/imgs/20180118153908.jpg",
                address: '广东省，深圳市，宝安区，西乡，宝民二路，143号,青春庭园E405',
                thumbnailURL: "cdvphotolibrary://thumbnail?photoId=409279%3B%2Fstorage%2Femulated%2F0%2FPictures%2Fmyalbum%2F2018-0-23-1.jpg&width=512&height=384&quality=0.5",
            };
        }
    };
    CommonService.prototype.loadSysAlbums = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.isPcBrowser()) {
                reso([{
                        title: "sys1",
                        id: 1,
                    }, {
                        title: "sys2",
                        id: 2,
                    }]);
            }
            else {
                /*this.photoLibrary.requestAuthorization().then(() => {
                  this.photoLibrary.getAlbums().then(albumItems => {
                    reso(albumItems);
                  },(err)=>{
                    console.log(err);
                    reje(err);
                  })
                },(err)=>{
                  console.log(err);
                  reje(err);
                });*/
            }
        });
    };
    CommonService.prototype.comfirm = function (desc) {
        var _this = this;
        return new Promise(function (reso, reje) {
            var actionSheet = _this.alertCtrl.create({
                title: desc,
                buttons: [
                    {
                        text: '确定',
                        role: 'destructive',
                        handler: function () {
                            reso(0);
                        }
                    }, {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                            reje(-1);
                        }
                    }
                ]
            });
            actionSheet.present();
        });
    };
    CommonService.prototype.getPosition = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (window.navigator.geolocation) {
                //this.photoLibrary.requestAuthorization().then(() => {
                _this.geolocation.getCurrentPosition({
                    // 指示浏览器获取高精度的位置，默认为false
                    enableHighAccuracy: true,
                    // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                    timeout: 1000000,
                    // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                    maximumAge: 1000000
                }).then(function (position) {
                    // resp.coords.latitude
                    // resp.coords.longitude
                    var coords = position.coords;
                    reso(coords);
                }).catch(function (error) {
                    console.log('Error getting location', error);
                    reje(null);
                });
            }
            else {
                reje(null);
            }
        });
    };
    CommonService.prototype.getLocation = function (latitude, longitude) {
        /**
         'https://api.map.baidu.com/api?v=2.0&ak=dKqGUl2S27pplI6xMSas11AB'
         (function(){
         window.HOST_TYPE = "2";
         window.BMap_loadScriptTime = (new Date).getTime();
         document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=2.0&ak=dKqGUl2S27pplI6xMSas11AB&services=&t=20180201111639">
         </script>');})();
         */
        return new Promise(function (reso, reje) {
            myalbum.ui.loadJS('https://api.map.baidu.com/getscript?v=2.0&ak=dKqGUl2S27pplI6xMSas11AB&services=&t=20180201111639')
                .then(function () {
                var myGeo = new BMap.Geocoder();
                var gpsPoint = new BMap.Point(longitude, latitude);
                var convertor = new BMap.Convertor();
                var pointArr = [];
                pointArr.push(gpsPoint);
                convertor.translate(pointArr, 1, 5, function (baiduPoints) {
                    myGeo.getLocation(baiduPoints.points[0], function (rs) {
                        var addComp = rs.addressComponents;
                        var address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                        console.log(address);
                        reso(address);
                    }, function (err) {
                        reje(err);
                    });
                }, function (err) {
                    reje(err);
                });
            }, function (err) {
                reje(err);
            });
        });
    };
    CommonService.prototype.getImages = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.isPcBrowser()) {
                reso([_this._pcTestTake(_this.MediaTypeImage)]);
            }
            else {
                var options = { maximumImagesCount: 3, outputType: 2 };
                _this.imagePicker.getPictures(options).then(function (results) {
                    var cnt = 0;
                    var datas = [];
                    for (var i = 0; i < results.length; i++) {
                        _this.__getPositionAndLocation({ fullPath: results[i] }, function (dd) {
                            datas.push(dd);
                            cnt++;
                            if (cnt == results.length) {
                                reso(datas);
                                _this.hideLoading();
                            }
                        }, function (err) {
                            reje(err);
                        });
                    }
                }, function (err) {
                    _this.__failCb(err, reje);
                });
            }
        });
    };
    /**
     end:0
     fullPath:"file:///storage/emulated/0/Pictures/1519700351935.jpg"
     lastModified:null
     lastModifiedDate:1519700358000
     localURL:"cdvfile://localhost/sdcard/Pictures/1519700351935.jpg"
     name:"1519700351935.jpg"
     size:2086992
     start:0
     type:"image/jpeg"
     * @returns {Promise<T>}
     */
    CommonService.prototype.captureImage = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.isPcBrowser()) {
                reso(_this._pcTestTake(_this.MediaTypeImage));
            }
            else {
                var options = { limit: 1 };
                _this.mediaCapture.captureImage(options)
                    .then(function (data) {
                    _this.__getPositionAndLocation(data[0], reso, reje);
                }, function (err) {
                    _this.__failCb(err, reje);
                });
            }
        });
    };
    CommonService.prototype.__getPositionAndLocation = function (data, reso, reje) {
        var _this = this;
        var result = data;
        result.creationDate = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.showLoading('收集位置信息');
        if (!!data.fullPath && (data.fullPath.endsWith('jpg') || data.fullPath.endsWith('jpeg') || data.fullPath.endsWith('mp4'))) {
            this.getFileInfo(data.fullPath).then(function (it) {
                result.creationDate = it.creationDate;
                result.latitude = it.latitude;
                result.longitude = it.longitude;
                result.address = it.address;
                _this.hideLoading();
                reso(result);
            }, function (err) {
                console.log(err);
                _this.hideLoading();
                reje(err);
            });
        }
        else {
            this.getPosition().then(function (position) {
                result.latitude = position.latitude;
                result.longitude = position.longitude;
                _this.getLocation(position.latitude, position.longitude).then(function (address) {
                    result.address = address;
                    reso(result);
                    _this.hideLoading();
                }, function (err) {
                    _this.__failCb(err, reje);
                });
            }, function (err) {
                _this.__failCb(err, reje);
            });
        }
    };
    /**
     end:0
     fullPath:"file:///storage/emulated/0/Recordings/20180227_001.amr"
     lastModified:null
     lastModifiedDate:1519700265000
     localURL:"cdvfile://localhost/sdcard/Recordings/20180227_001.amr"
     name:"20180227_001.amr"
     size:9414
     start:0
     type:"audio/amr"
     * @returns {Promise<T>}
     */
    CommonService.prototype.captureAudio = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.isPcBrowser()) {
                _this._pcTestTake(_this.MediaTypeAudio);
            }
            else {
                var options = { limit: 1 };
                _this.mediaCapture.captureAudio(options)
                    .then(function (data) {
                    _this.__getPositionAndLocation(data[0], reso, reje);
                }, function (err) {
                    _this.__failCb(err, reje);
                });
            }
        });
    };
    /**
     * end:0
     fullPath:"file:///storage/4962-1CDC/DCIM/Camera/VID_20180227_105851.mp4"
     lastModified:null
     lastModifiedDate:1519700331000
     localURL:"cdvfile://localhost/root/storage/4962-1CDC/DCIM/Camera/VID_20180227_105851.mp4"
     name:"VID_20180227_105851.mp4"
     size:8686386
     start:0
     type:"video/mp4"
     * @returns {Promise<T>}
     */
    CommonService.prototype.captureVideo = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.isPcBrowser()) {
                reso(_this._pcTestTake(_this.MediaTypeVideo));
            }
            else {
                var options = { limit: 1 };
                _this.mediaCapture.captureVideo(options)
                    .then(function (data) {
                    _this.__getPositionAndLocation(data[0], reso, reje);
                }, function (err) {
                    _this.__failCb(err, reje);
                });
            }
        });
    };
    CommonService.prototype.saveMedia = function (mediaFile, albumName) {
        /* return new Promise((reso,reje)=>{
           if(mediaFile.endsWith('.jpg') || mediaFile.endsWith('.jpeg')) {
             this.photoLibrary.saveImage(mediaFile, albumName, {}).then((item:LibraryItem) => {
               reso(item);
             },err => {
               reje(err);
             });
           }else if(mediaFile.endsWith('.mp4')) {
             this.photoLibrary.saveVideo(mediaFile, albumName).then(() => {
               reso(mediaFile);
             },err => {
               reje(err);
             });
           }
         });*/
        return this.getFileInfo(mediaFile);
    };
    CommonService.prototype.selectMedia = function () {
        var _this = this;
        var args = { 'showThumbnail': true,
            'selectMode': 101,
            'maxSelectCount': 10,
            'maxSelectSize': 188743680 //188743680=180M (Optional)
        };
        return new Promise(function (reso, reje) {
            if (_this.isPcBrowser()) {
                reso([_this._pcTestTake(_this.MediaTypeImage)]);
            }
            else {
                MediaPicker.getMedias(args, function (results) {
                    //dataArray [{mediaType: "image",rotate: 90, path:'/storage/emulated/0/DCIM/Camera/20170808_145202.jpg' thumbnailBase64: '9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEB'}]
                    var cnt = 0;
                    var datas = [];
                    for (var i = 0; i < results.length; i++) {
                        var item = results[i];
                        _this.__getPositionAndLocation({ fullPath: item.path }, function (dd) {
                            dd.thumbnailURL = item.thumbnailBase64;
                            datas.push(dd);
                            cnt++;
                            if (cnt == results.length) {
                                reso(datas);
                            }
                        }, function (err) {
                            reje(err);
                        });
                    }
                }, function (err) {
                    _this.__failCb(err, reje);
                });
            }
        });
    };
    CommonService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */]])
    ], CommonService);
    return CommonService;
}());

//# sourceMappingURL=CommonService.js.map

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 161;

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_DbService__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlbumListPage = (function () {
    function AlbumListPage(navParams, dbService, viewCtrl) {
        this.navParams = navParams;
        this.dbService = dbService;
        this.viewCtrl = viewCtrl;
        this.albumList = [];
        this.data = this.navParams.data;
    }
    AlbumListPage.prototype.ngOnInit = function () {
        this.updateAlbum();
    };
    AlbumListPage.prototype.changeAlbum = function () {
        this.data.albumChange(this.albumId);
        this.close();
    };
    AlbumListPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    AlbumListPage.prototype.updateAlbum = function () {
        this.albumList = this.dbService.getAlbumDataQParams().albumList;
    };
    AlbumListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "\n    <ion-list class=\"popover-page\">\n      <ion-item>\n        <ion-label>Album</ion-label>\n        <ion-select [(ngModel)]=\"albumId\" >\n          <ion-option *ngFor=\"let n of albumList\" value=\"{{n.id}}\">{{n.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n    <button ion-button full  (click)=\"changeAlbum()\">\u786E\u5B9A</button>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_DbService__["a" /* DbService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], AlbumListPage);
    return AlbumListPage;
}());

//# sourceMappingURL=AlbumListPage.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_BBService__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var QueryPage = (function () {
    function QueryPage(navParams, dbService, viewCtrl, commonService, bbService) {
        this.navParams = navParams;
        this.dbService = dbService;
        this.viewCtrl = viewCtrl;
        this.commonService = commonService;
        this.bbService = bbService;
        this.albumList = [];
        this.sysAlbumList = [];
        this.monthDisabled = false;
        this.yearDisabled = true;
        this.sysDisabled = true;
    }
    QueryPage.prototype.ngOnInit = function () {
        this.updateAlbum();
        this.params = this.dbService.getAlbumDataQParams();
        this.albumList = this.params.albumList;
        this.monthDisabled = this.params.monthDisabled;
        this.yearDisabled = this.params.yearDisabled;
        this.sysDisabled = this.params.sysDisabled;
    };
    QueryPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    QueryPage.prototype.finish = function () {
        this.close();
        this.params.monthDisabled = this.monthDisabled;
        this.params.yearDisabled = this.yearDisabled;
        this.params.sysDisabled = this.sysDisabled;
        if (this.params.sysDisabled) {
            for (var i = 0; i < this.sysAlbumList.length; i++) {
                if (this.sysAlbumList[i].id == this.params.sysAlbumId) {
                    this.params.albumName = this.sysAlbumList[i].title;
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < this.albumList.length; i++) {
                if (this.albumList[i].id == this.params.albumId) {
                    this.params.album = this.albumList[i].name;
                    break;
                }
            }
        }
        this.navParams.data.finish();
    };
    QueryPage.prototype.updateAlbum = function () {
        var _this = this;
        this.commonService.loadSysAlbums().then(function (items) {
            console.log(items);
            var al = [];
            for (var i = 0; i < items.length; i++) {
                var sysn = items[i];
                al.push(sysn);
            }
            _this.sysAlbumList = al;
        });
    };
    QueryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "    \n      <ion-list  class=\"popover-page\">\n\n        <ion-item>\n          <ion-label>\u7CFB\u7EDF\u4E13\u8F91</ion-label>\n          <ion-toggle [(ngModel)]=\"sysDisabled\"></ion-toggle>\n        </ion-item>\n        <ion-item >\n          <ion-label>\u5B9D\u5B9D\u540D\u79F0</ion-label>\n          <ion-select [(ngModel)]=\"params.albumId\" [disabled]=\"sysDisabled\">\n            <ion-option *ngFor=\"let n of albumList\" value=\"{{n.id}}\">{{n.name}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item >\n          <ion-label>\u7CFB\u7EDF\u4E13\u8F91</ion-label>\n          <ion-select [(ngModel)]=\"params.sysAlbumId\" [disabled]=\"!sysDisabled\">\n            <ion-option *ngFor=\"let n of sysAlbumList\" value=\"{{n.id}}\">{{n.title}}</ion-option>\n          </ion-select>\n        </ion-item>\n        \n        <ion-item>\n          <ion-label>\u6309\u5E74</ion-label>\n          <ion-toggle [(ngModel)]=\"yearDisabled\" [disabled]=\"monthDisabled\"></ion-toggle>\n        </ion-item>\n        <ion-item>\n          <ion-label>\u5E74</ion-label>\n          <ion-datetime displayFormat=\"YYYY\" [(ngModel)]=\"params.year\" [disabled]=\"!yearDisabled\"></ion-datetime>\n        </ion-item>\n\n        <ion-item>\n          <ion-label>\u6309\u6708</ion-label>\n          <ion-toggle [(ngModel)]=\"monthDisabled\" [disabled]=\"yearDisabled\"></ion-toggle>\n        </ion-item>\n        <ion-item >\n          <ion-label>\u6708</ion-label>\n          <ion-datetime displayFormat=\"YYYY-MM\" [(ngModel)]=\"params.month\" [disabled]=\"!monthDisabled\"></ion-datetime>\n        </ion-item>\n        <button ion-button full (click)=\"finish()\">\u5B8C\u6210</button>\n       <!-- <button ion-button full (click)=\"clear()\">\u6E05\u9664</button>-->\n      </ion-list>\n    \n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_DbService__["a" /* DbService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__service_CommonService__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_4__service_BBService__["a" /* BBService */]])
    ], QueryPage);
    return QueryPage;
}());

//# sourceMappingURL=QueryPage.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RotateImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_gestures_gesture__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var changeVal = 0;
var RotateImagePage = (function () {
    function RotateImagePage(navCtrl, params, commonService, dbService) {
        this.navCtrl = navCtrl;
        this.commonService = commonService;
        this.dbService = dbService;
        this.indexPiece = 0;
        this.deg = 0;
        this.transforZ = 0;
        this.startX = 0;
        this.startY = 0;
        this._cacMoveDeg = function (s) {
            var xishu = 1;
            if (s < 0) {
                xishu = -1;
            }
            s = Math.abs(s / 3);
            this.ang += xishu * 2 * Math.asin(s / 2 / (this.transforZ)) * 180 / Math.PI;
            return this.ang;
        };
        this._cacMoveDeg1 = function (s) {
            var xishu = 1;
            if (s < 0) {
                xishu = -1;
            }
            s = Math.abs(s);
            this.ang += xishu * Math.atan(s / 2 / (this.transforZ)) * 180 / Math.PI;
            return this.ang;
        };
        this._cacDeg = function () {
            this.deg = 360 / this.items.length;
        };
        this._maxWidth = function () {
            var val = this.items[0].w;
            for (var i = 1; i < this.items.length; i++) {
                this.items[i].w > val ? this.items[i].w : val;
            }
            return val;
        };
        this._maxHeight = function () {
            var val = this.items[0].h;
            for (var i = 1; i < this.items.length; i++) {
                this.items[i].h > val ? this.items[i].h : val;
            }
            return val;
        };
        this._calTranslateZ = function () {
            this.deg = 360 / this.items.length;
            var maxWidth = this._maxWidth();
            //this.transforZ = changeVal + (1 / Math.tan((this.deg / 2) * (Math.PI / 180))) * (maxWidth / 2);
            this.transforZ = (maxWidth / 2) / (Math.sin((this.deg / 2) * (Math.PI / 180)));
        };
        this.mainItem = params.data.item;
        this.items = this.mainItem.datas;
        this.indexPiece = 0;
        this.ang = 0;
    }
    RotateImagePage.prototype.setStyles = function (it, j) {
        var val = {
            width: it.w + 'px',
            height: it.h + 'px',
            transform: 'rotateY(' + j * this.deg + 'deg) translateZ(' + this.transforZ + 'px)'
        };
        return val;
    };
    RotateImagePage.prototype.ngOnInit = function () {
        this._cacDeg();
        this._calTranslateZ();
        this.eleContainer.nativeElement.style.width = this._maxWidth() + 'px';
        this.eleContainer.nativeElement.style.height = this._maxHeight() + 'px';
    };
    RotateImagePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var _slideElement = this.eleContainer.nativeElement;
        var _slideGesture = new __WEBPACK_IMPORTED_MODULE_4_ionic_angular_gestures_gesture__["a" /* Gesture */](_slideElement);
        _slideGesture.listen();
        _slideGesture.on('panleft', function (ev) {
            var ang = _this._cacMoveDeg(-ev.distance);
            _this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
        });
        _slideGesture.on('panright', function (ev) {
            var ang = _this._cacMoveDeg(ev.distance);
            _this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
        });
    };
    RotateImagePage.prototype.clickRotate = function (e) {
        //this._transform("rotateY("+ (-1 * this.deg * ++this.indexPiece) +"deg)"+' translate(-50%,-50%)');
    };
    RotateImagePage.prototype.swipe = function (evt) {
        var distance = evt.distance;
        //向左滑
        if (evt.direction == 2) {
            var ang = this._cacMoveDeg(-distance);
            this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
        }
        else if (evt.direction == 4) {
            var ang = this._cacMoveDeg(distance);
            this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
        }
    };
    RotateImagePage.prototype._transform = function (value) {
        this.eleContainer.nativeElement.style['transform'] = value;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('stage'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], RotateImagePage.prototype, "eleStage", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('container'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], RotateImagePage.prototype, "eleContainer", void 0);
    RotateImagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'Rotate-Image',
            template: "\n    <div #stage class=\"stage_area\">\n      <div #container class=\"container\" (click)=\"clickRotate($event)\">\n        <img *ngFor=\"let it of items;let j=index\"\n             src=\"{{it.url}}\" class=\"piece\"\n             [ngStyle]=\"setStyles(it,j)\"/>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_1__service_DbService__["a" /* DbService */]])
    ], RotateImagePage);
    return RotateImagePage;
}());

//# sourceMappingURL=RotateImage.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoSwipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PhotoSwipePage = (function () {
    function PhotoSwipePage(navCtrl, params, commonService, dbService) {
        this.navCtrl = navCtrl;
        this.commonService = commonService;
        this.dbService = dbService;
        this.hiddenDesc = false;
        this.index = 0;
        this.mainItem = params.data.item;
        this.items = this.mainItem.datas;
        this.index = 0;
    }
    PhotoSwipePage.prototype.ngOnInit = function () {
        this.photoSwipe();
    };
    PhotoSwipePage.prototype.photoSwipe = function () {
        var _this = this;
        var pswpElement = document.querySelectorAll('.pswp')[0];
        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: 0,
            loop: false,
            history: false,
            closeEl: false,
            captionEl: true,
            fullscreenEl: false,
            zoomEl: true,
            shareEl: false,
            counterEl: true,
            arrowEl: true,
            preloaderEl: true,
        };
        // build items array
        var its = [];
        for (var i = 0; i < this.items.length; i++) {
            var it = this.items[i];
            if (it.photoURL && (it.photoURL.endsWith('jpg') || it.photoURL.endsWith('jpeg'))) {
                var tt = {};
                tt.src = it.photoURL;
                if (it.width) {
                    tt.w = it.width;
                }
                if (it.height) {
                    tt.h = it.height;
                }
                it.html = '<h3>' + it.title + '</h3>';
                it.html += '<p>' + it.desc + '</p>';
                its.push(tt);
            }
        }
        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, its, options);
        gallery.listen('gettingData', function (index, item) {
            var it = _this.items[index];
            item.html = '<div>Dynamically generated HTML ' + '测试描述' + '</div>';
        });
        gallery.listen('close', function (sl, args) {
            _this.navCtrl.pop();
        });
        gallery.init();
    };
    PhotoSwipePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'Photo-Swipe',
            template: "\n    <div class=\"pswp\" tabindex=\"-1\" role=\"page\" aria-hidden=\"true\">\n      <!-- Background of PhotoSwipe. \n           It's a separate element as animating opacity is faster than rgba(). -->\n      <div class=\"pswp__bg\"></div>\n      <!-- Slides wrapper with overflow:hidden. -->\n      <div class=\"pswp__scroll-wrap\">\n        <!-- Container that holds slides. \n            PhotoSwipe keeps only 3 of them in the DOM to save memory.\n            Don't modify these 3 pswp__item elements, data is added later on. -->\n        <div class=\"pswp__container\">\n          <div class=\"pswp__item\"></div>\n          <div class=\"pswp__item\"></div>\n          <div class=\"pswp__item\"></div>\n        </div>\n        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n        <div class=\"pswp__ui pswp__ui--hidden\">\n          <div class=\"pswp__top-bar\">\n            <!--  Controls are self-explanatory. Order can be changed. -->\n            <div class=\"pswp__counter\"></div>\n            <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n            <button class=\"pswp__button pswp__button--share\" title=\"Share\"></button>\n            <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\n            <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n\n            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\n            <!-- element will get class pswp__preloader--active when preloader is running -->\n            <div class=\"pswp__preloader\">\n              <div class=\"pswp__preloader__icn\">\n                <div class=\"pswp__preloader__cut\">\n                  <div class=\"pswp__preloader__donut\"></div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\n            <div class=\"pswp__share-tooltip\"></div>\n          </div>\n          <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">\n          </button>\n          <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">\n          </button>\n          <div class=\"pswp__caption\">\n            <div class=\"pswp__caption__center\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_1__service_DbService__["a" /* DbService */]])
    ], PhotoSwipePage);
    return PhotoSwipePage;
}());

//# sourceMappingURL=PhotoSwipe.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(237);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_mainMenu_menu__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_Taker_taker__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_album_album__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_test_test__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_photoDetail_photoDetail__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_photoDetail_sysPhotoDetail__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_photoDetail_photo__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__service_BBService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_EditAlbum_EditAlbum__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_album_QueryPage__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_photoDetail_AlbumListPage__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_video_video__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_image_image__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_photoSwipe_PhotoSwipe__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_rotateImage_RotateImage__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_storage__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_camera__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pipe_cdvphotolibrary_pipe__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_media_capture__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_image_picker__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























/*import { PhotoLibrary } from '@ionic-native/photo-library';*/






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_Taker_taker__["a" /* TakerPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_album_album__["a" /* AlbumPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_photoDetail_photoDetail__["a" /* PhotoDetailPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_EditAlbum_EditAlbum__["a" /* EditAlbumPage */],
                __WEBPACK_IMPORTED_MODULE_27__pipe_cdvphotolibrary_pipe__["a" /* CDVPhotoLibraryPipe */],
                __WEBPACK_IMPORTED_MODULE_5__pages_mainMenu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_album_QueryPage__["a" /* QueryPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_photoDetail_AlbumListPage__["a" /* AlbumListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_photoDetail_photo__["a" /* PhotoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_photoDetail_sysPhotoDetail__["a" /* SysPhotoDetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_image_image__["a" /* ImagePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_photoSwipe_PhotoSwipe__["a" /* PhotoSwipePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_rotateImage_RotateImage__["a" /* RotateImagePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_25__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__MyAlbum',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_Taker_taker__["a" /* TakerPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_album_album__["a" /* AlbumPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_photoDetail_photoDetail__["a" /* PhotoDetailPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_mainMenu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_album_QueryPage__["a" /* QueryPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_photoDetail_AlbumListPage__["a" /* AlbumListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_photoDetail_photo__["a" /* PhotoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_photoDetail_sysPhotoDetail__["a" /* SysPhotoDetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_image_image__["a" /* ImagePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_photoSwipe_PhotoSwipe__["a" /* PhotoSwipePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_rotateImage_RotateImage__["a" /* RotateImagePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_splash_screen__["a" /* SplashScreen */],
                /*PhotoLibrary,*/
                __WEBPACK_IMPORTED_MODULE_13__service_DbService__["a" /* DbService */],
                __WEBPACK_IMPORTED_MODULE_14__service_BBService__["a" /* BBService */],
                __WEBPACK_IMPORTED_MODULE_16__service_CommonService__["a" /* CommonService */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_media_capture__["a" /* MediaCapture */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_image_picker__["a" /* ImagePicker */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_about__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Taker_taker__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_album_album__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_test_test__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_BBService__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, dbService, alertCtrl, commonService, bbService) {
        var _this = this;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.commonService = commonService;
        this.bbService = bbService;
        this.album = __WEBPACK_IMPORTED_MODULE_8__pages_album_album__["a" /* AlbumPage */];
        this.taker = __WEBPACK_IMPORTED_MODULE_7__pages_Taker_taker__["a" /* TakerPage */];
        this.test = __WEBPACK_IMPORTED_MODULE_9__pages_test_test__["a" /* TestPage */];
        this.about = __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */];
        this.backButtonPressed = false;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            //dbService.init();
            _this.registerBackButtonAction(); //注册返回按键事件
            window['ionicAlertCtrl'] = alertCtrl;
            window['commonService'] = commonService;
            commonService.deviceReady();
            dbService.deviceReady();
            bbService.deviceReady();
        });
    }
    MyApp.prototype.ngAfterViewInit = function () {
        this.commonService.nav = this.nav;
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.push(page, {});
    };
    MyApp.prototype.registerBackButtonAction = function () {
        var _this = this;
        this.platform.registerBackButtonAction(function () {
            var activeVC = _this.nav.getActive();
            var page = activeVC.instance;
            if (_this.commonService.triggerBackButtonAction()) {
            }
            else if (_this.nav.canGoBack()) {
                _this.nav.pop();
            }
            else {
                //此处if是rootPage为登录页的情况，else是rootPage为TabsPage（如果不需要判断登录页的情况直接用else内的代码即可）
                if (page instanceof __WEBPACK_IMPORTED_MODULE_8__pages_album_album__["a" /* AlbumPage */]) {
                    _this.showExit();
                }
            }
        }, 1);
    };
    //双击退出提示框
    MyApp.prototype.showExit = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '确定退出？',
            message: "你是否确定退出当前应用？",
            buttons: [
                {
                    text: '确定',
                    handler: function (data) {
                        _this.platform.exitApp();
                    }
                },
                {
                    text: '取消',
                    handler: function (data) {
                    }
                }
            ]
        });
        prompt.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('rootNav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\app\app.html"*/'<ion-menu [content]="content" id="mainMenu">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Main Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item menuClose  detail-none (click)="openPage(taker)">\n        <ion-icon name=\'camera\'></ion-icon>\n        Taker\n      </button>\n      <button ion-item  menuClose    detail-none (click)="openPage(map)">\n        <ion-icon name=\'map\'></ion-icon>\n        Map\n      </button>\n      <button ion-item  menuClose    detail-none (click)="openPage(notepad)">\n        <ion-icon name=\'document\'></ion-icon>\n        Notepad\n      </button>\n      <button ion-item  menuClose    detail-none (click)="openPage(setting)">\n        <ion-icon name=\'hammer\'></ion-icon>\n        Setting\n      </button>\n      <button ion-item   menuClose   detail-none (click)="openPage(test)">\n        <ion-icon name=\'analytics\'></ion-icon>\n        Test\n      </button>\n      <button ion-item  menuClose   detail-none (click)="openPage(about)">\n        <ion-icon name=\'baseball\'></ion-icon>\n        About\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav #rootNav [root]="album" #content swipeBackEnabled="true"></ion-nav>\n\n\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__service_DbService__["a" /* DbService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__service_CommonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_10__service_BBService__["a" /* BBService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Taker_taker__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__album_album__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test_test__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MenuPage = (function () {
    function MenuPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.album = __WEBPACK_IMPORTED_MODULE_4__album_album__["a" /* AlbumPage */];
        this.taker = __WEBPACK_IMPORTED_MODULE_3__Taker_taker__["a" /* TakerPage */];
        this.test = __WEBPACK_IMPORTED_MODULE_5__test_test__["a" /* TestPage */];
        this.about = __WEBPACK_IMPORTED_MODULE_2__about_about__["a" /* AboutPage */];
    }
    MenuPage.prototype.openPage = function (page) {
        this.navCtrl.push(page, {});
    };
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\mainMenu\menu.html"*/'<ion-menu [content]="content" id="mainMenu">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Main Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item menuClose  detail-none (click)="openPage(taker)">\n        <ion-icon name=\'camera\'></ion-icon>\n        Taker\n      </button>\n      <button ion-item  menuClose    detail-none (click)="openPage(map)">\n        <ion-icon name=\'map\'></ion-icon>\n        Map\n      </button>\n      <button ion-item  menuClose    detail-none (click)="openPage(notepad)">\n        <ion-icon name=\'document\'></ion-icon>\n        Notepad\n      </button>\n      <button ion-item  menuClose    detail-none (click)="openPage(setting)">\n        <ion-icon name=\'hammer\'></ion-icon>\n        Setting\n      </button>\n      <button ion-item   menuClose   detail-none (click)="openPage(test)">\n        <ion-icon name=\'analytics\'></ion-icon>\n        Test\n      </button>\n      <button ion-item  menuClose   detail-none (click)="openPage(about)">\n        <ion-icon name=\'baseball\'></ion-icon>\n        About\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="album" #content swipeBackEnabled="true"></ion-nav>\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\mainMenu\menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Taker_taker__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__album_album__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test_test__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__album_album__["a" /* AlbumPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__test_test__["a" /* TestPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__Taker_taker__["a" /* TakerPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Album" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Taker" tabIcon="contacts"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Test" tabIcon="star"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n\n\n</ion-tabs>\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditAlbumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_DbService__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*import { PhotoLibrary } from '@ionic-native/photo-library';*/

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
    function EditAlbumPage(navCtrl, /*public photoLibrary:PhotoLibrary,*/ dbService) {
        this.navCtrl = navCtrl;
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
    EditAlbumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'EditAlbum',template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\EditAlbum\EditAlbum.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Edit Album</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n\n</ion-content>\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\EditAlbum\EditAlbum.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__service_DbService__["a" /* DbService */]])
    ], EditAlbumPage);
    return EditAlbumPage;
}());

//# sourceMappingURL=EditAlbum.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VideoPage = (function () {
    function VideoPage(dbService, commonService) {
        this.dbService = dbService;
        this.commonService = commonService;
        this.item = {};
        this.autoPlayFlag = false;
        this.playing = false;
    }
    VideoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.videoElt.nativeElement.currentTime = 0.01;
        this.videoElt.nativeElement.addEventListener('ended', function () {
            _this.playing = false;
            _this.videoElt.nativeElement['x5-video-player-fullscreen'] = '';
            _this.videoElt.nativeElement['webkit-playsinline'] = '';
            _this.videoElt.nativeElement['playsinline'] = '';
        }, false);
    };
    VideoPage.prototype.doClickAction = function () {
        this.playing = !this.playing;
        if (this.playing) {
            this.videoElt.nativeElement.play();
        }
        else {
            this.videoElt.nativeElement.pause();
        }
    };
    VideoPage.prototype.fullPlay = function () {
        this.videoElt.nativeElement['x5-video-player-fullscreen'] = 'true';
        this.videoElt.nativeElement['webkit-playsinline'] = 'true';
        this.videoElt.nativeElement['playsinline'] = 'true';
        if (!this.playing) {
            this.playing = true;
            this.videoElt.nativeElement.play();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('it'),
        __metadata("design:type", Object)
    ], VideoPage.prototype, "item", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('autoPlayFlag'),
        __metadata("design:type", Boolean)
    ], VideoPage.prototype, "autoPlayFlag", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('videoElt'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], VideoPage.prototype, "videoElt", void 0);
    VideoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'album-video',
            template: "\n   \n    <div *ngIf=\"item.address\" class=\"card-address\">{{item.address}}</div>\n    <div  *ngIf=\"item.creationDate\" class=\"card-time\">{{item.creationDate}}</div>\n    \n    <video #videoElt (click)=\"doClickAction()\" width='320' height='320'>\n      <source [src]=\"item.photoURL | cdvphotolibrary\" type=\"video/mp4\">\n      Your browser does not support the video tag.\n    </video>\n\n    <ion-card-content class=\"cards-bg\">\n      <ion-card-title *ngIf=\"item.title\" >\n        {{item.title}}\n      </ion-card-title>\n      <p *ngIf=\"item.desc\">{{item.desc}} </p>\n    </ion-card-content>\n\n    <ion-row no-padding [hidden]=\"hiddenActBar\">\n      <ion-col text-right>\n        <button ion-button clear small  icon-start (click)=\"photoDetail(item,true)\">\n          <ion-icon name='share-alt'></ion-icon>\n          \u7F16\u8F91\n        </button>\n        <button ion-button clear small  icon-start (click)=\"fullPlay()\" [hidden]=\"autoPlayFlag\">\n          <ion-icon name='share-alt'></ion-icon>\n          \u64AD\u653E\n        </button>\n      </ion-col>\n    </ion-row>\n    \n   \n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_DbService__["a" /* DbService */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */]])
    ], VideoPage);
    return VideoPage;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Taker_taker__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__photoDetail_sysPhotoDetail__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_BBService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__photoSwipe_PhotoSwipe__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ImagePage = (function () {
    //playing:boolean = false;
    function ImagePage(dbService, commonService, navCtrl, bbService) {
        this.dbService = dbService;
        this.commonService = commonService;
        this.navCtrl = navCtrl;
        this.bbService = bbService;
        this.item = {};
        this.hiddenDesc = false;
        this.hiddenActBar = false;
        this.canView = false;
        this.playing = false;
        this.autoPlayFlag = false;
        this.ageInfo = {};
    }
    ImagePage.prototype.ngOnInit = function () {
    };
    ImagePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.item.creationDate) {
            this.bbService.parseAge(this.item.creationDate).then(function (info) {
                _this.ageInfo = info;
            });
        }
        if (this.videoElt) {
            this.videoElt.nativeElement.currentTime = 0.01;
            this.videoElt.nativeElement.addEventListener('ended', function () {
                _this.playing = false;
                _this.videoElt.nativeElement['x5-video-player-fullscreen'] = '';
                _this.videoElt.nativeElement['webkit-playsinline'] = '';
                _this.videoElt.nativeElement['playsinline'] = '';
            }, false);
        }
    };
    ImagePage.prototype.playVideo = function () {
        this.playing = !this.playing;
        if (this.playing) {
            this.videoElt.nativeElement.play();
        }
        else {
            this.videoElt.nativeElement.pause();
        }
    };
    ImagePage.prototype.openPhoto = function (autoPlay, item) {
        if (autoPlay === void 0) { autoPlay = false; }
        if (this.canView) {
            //this.navCtrl.push(PhotoPage,{item,autoPlay});
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__photoSwipe_PhotoSwipe__["a" /* PhotoSwipePage */], { item: item });
        }
    };
    ImagePage.prototype.photoDetail = function (item, editable) {
        var qparams = this.dbService.getAlbumDataQParams();
        this.dbService.resetAlbumData();
        console.log();
        if (qparams.sysDisabled) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__photoDetail_sysPhotoDetail__["a" /* SysPhotoDetailPage */], { item: item, editable: editable });
        }
        else {
            //this.navCtrl.push(PhotoDetailPage,{ item:item,editable:editable });
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__Taker_taker__["a" /* TakerPage */], { item: item, editable: editable });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('it'),
        __metadata("design:type", Object)
    ], ImagePage.prototype, "item", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], ImagePage.prototype, "hiddenDesc", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], ImagePage.prototype, "hiddenActBar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], ImagePage.prototype, "canView", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('imageElt'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ImagePage.prototype, "imageElt", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('videoElt'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ImagePage.prototype, "videoElt", void 0);
    ImagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'album-image',
            template: "\n    <div *ngIf=\"item.address\" class=\"card-address\"  [hidden]=\"hiddenDesc\">{{item.address}}</div>\n    <div  *ngIf=\"item.creationDate\" class=\"card-time\" [hidden]=\"hiddenDesc\">{{ageInfo.ageInfo}}</div>\n    <div  *ngIf=\"item.datas\" class=\"card-num\">{{item.datas.length}}</div>\n    \n    <img #imageElt *ngIf=\"item.photoURL&&(item.photoURL.endsWith('jpg') || item.photoURL.endsWith('jpeg'))\"  [src]=\"item.photoURL | cdvphotolibrary\" />\n    \n    <video #videoElt *ngIf=\"item.photoURL && item.photoURL.endsWith('mp4')\" width='320' height='320' (click)=\"playVideo()\">\n      <source [src]=\"item.photoURL | cdvphotolibrary\" type=\"video/mp4\">\n      Your browser does not support the video tag.\n    </video>\n    \n    <ion-card-content class=\"cards-bg\">\n      <ion-card-title *ngIf=\"item.title\" [hidden]=\"hiddenDesc\">\n        {{item.title}}\n      </ion-card-title>\n      <p *ngIf=\"item.desc\" [hidden]=\"hiddenDesc\">{{item.desc}} </p>\n    </ion-card-content>\n\n    <ion-row no-padding [hidden]=\"hiddenActBar\" style=\"z-index: 10000\">\n      <ion-col text-right style=\"z-index: 10000\">\n        <button ion-button clear small  icon-start (click)=\"photoDetail(item,true)\">\n          <ion-icon name='share-alt'></ion-icon>\n          \u7F16\u8F91\n        </button>\n        <button ion-button clear small  icon-start (click)=\"openPhoto(false,item)\" [hidden]=\"autoPlayFlag\">\n          <ion-icon name='share-alt'></ion-icon>\n          \u67E5\u770B\n        </button>\n        <button ion-button clear small  icon-start (click)=\"stopPlay()\" [hidden]=\"!autoPlayFlag\">\n          <ion-icon name='share-alt'></ion-icon>\n          \u505C\u6B62\n        </button>\n      </ion-col>\n    </ion-row>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_DbService__["a" /* DbService */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__service_BBService__["a" /* BBService */]])
    ], ImagePage);
    return ImagePage;
}());

//# sourceMappingURL=image.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CDVPhotoLibraryPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CDVPhotoLibraryPipe = (function () {
    function CDVPhotoLibraryPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    CDVPhotoLibraryPipe.prototype.transform = function (url) {
        var val = url.startsWith('cdvphotolibrary://') ? this.sanitizer.bypassSecurityTrustUrl(url) : url;
        return val;
    };
    CDVPhotoLibraryPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'cdvphotolibrary' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], CDVPhotoLibraryPipe);
    return CDVPhotoLibraryPipe;
}());

//# sourceMappingURL=cdvphotolibrary.pipe.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BBService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DbService__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BBService = (function () {
    function BBService(dbService) {
        this.dbService = dbService;
        this.ageYear = 0;
        this.ageMonth = 0;
        this.ageDay = 0;
        this.ageWeek = 0;
    }
    BBService.prototype.deviceReady = function () {
        this.getAlbum();
    };
    BBService.prototype._updateAlbum = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            var queryParams = _this.dbService.getAlbumDataQParams();
            var doUpdate = function () {
                myalbum.db.selectTAlbum().then(function (albums) {
                    queryParams.albumList = albums;
                    _this.getAlbum();
                    reso(albums);
                }, function (err) {
                    queryParams.albumList = [];
                    reje([]);
                });
            };
            myalbum.profile.get('defaultAlbumId').then(function (albumId) {
                queryParams.albumId = albumId;
                doUpdate();
            }, function (err) {
                console.log(err);
                doUpdate();
            });
        });
    };
    BBService.prototype.getAlbum = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            var queryParams = _this.dbService.getAlbumDataQParams();
            var getName = function () {
                if (!!queryParams.albumId && queryParams.albumId != null) {
                    for (var i = 0; i < queryParams.albumList.length; i++) {
                        if (queryParams.albumList[i].id == queryParams.albumId) {
                            queryParams.album = queryParams.albumList[i];
                            break;
                        }
                    }
                }
                else if (queryParams.albumList.length > 0) {
                    queryParams.albumId = queryParams.albumList[0].id;
                    queryParams.album = queryParams.albumList[0];
                }
                else {
                    queryParams.albumId = '';
                    queryParams.album = null;
                }
                if (queryParams.album) {
                    _this.album = queryParams.album;
                    _this._parseBabyAge(myalbum.dateUtils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'));
                }
                reso(queryParams.album);
            };
            if (queryParams.albumList.length == 0) {
                _this._updateAlbum().then(function () {
                    getName();
                }, function () {
                    reje('');
                });
            }
            else {
                getName();
            }
        });
    };
    BBService.prototype._parseBabyAge = function (endStr) {
        var beginStr = this.album.birthday;
        var result = myalbum.dateUtils.parseAge(beginStr, endStr);
        this.ageYear = result.ageYear;
        this.ageMonth = result.ageMonth;
        this.ageDay = result.ageDay;
        this.ageWeek = result.ageWeek;
        this.album.ageInfo = result.ageInfo;
    };
    BBService.prototype.parseAge = function (endStr) {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.album) {
                var result = '';
                if (_this.album.birthday) {
                    var beginStr = _this.album.birthday;
                    result = myalbum.dateUtils.parseAge(beginStr, endStr);
                }
                reso(result);
            }
            else {
                _this.getAlbum().then(function () {
                    var beginStr = _this.album.birthday;
                    var result = myalbum.dateUtils.parseAge(beginStr, endStr);
                    reso(result);
                });
            }
        });
    };
    BBService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__DbService__["a" /* DbService */]])
    ], BBService);
    return BBService;
}());

//# sourceMappingURL=BBService.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TakerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_BBService__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TakerPage = (function () {
    //editAddress:boolean = false;
    function TakerPage(bbService, navCtrl, alertCtrl, dbService, commonService, params) {
        this.bbService = bbService;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.dbService = dbService;
        this.commonService = commonService;
        this.mainData = {
            title: '', desc: '', address: '', latitude: 0, longitude: 0,
            creationDate: '', albumId: '', coverId: ''
        };
        this.change = false;
        this.datas = [];
        this.deleteItem = [];
        if (params.data && params.data.item) {
            this.mainData = params.data.item;
            this.datas = this.mainData.datas;
            if (!!this.datas && this.datas.length > 0) {
                for (var i = 0; i < this.datas.length; i++) {
                    if (this.datas[i].id == this.mainData.coverId) {
                        this.mainItem = this.datas[i];
                    }
                }
            }
        }
        else {
            this.mainData.albumId = dbService.getAlbumDataQParams().albumId;
        }
        //this.editAddress = params.data.editable;
    }
    TakerPage.prototype.ngOnInit = function () {
        this.updateAlbum();
        if (this.commonService.isPcBrowser()) {
            /*this.photoLibrary.saveImage = function() {
              let item:any = {
                creationDate:new Date(),//self.commonService.formatDate(,'yyyy-MM-dd hh:mm:ss'),
                fileName:"20180118153908.jpg",
                height:400,
                width:400,
                //id:"409279;/storage/emulated/0/Pictures/myalbum/2018-0-23-1.jpg",
                id:"409279;assets/imgs/logo.png",
                /!*  latitude:22.5839424133301,
                 longitude:113.879081726074,*!/
                latitude:0,
                longitude:0,
                //photoURL:"assets/imgs/20180118153908.jpg",
                //photoURL:"assets/imgs/20180118153941.jpg",
                //photoURL:"assets/imgs/logo.png",
                photoURL:"assets/imgs/20180118153908.jpg",
      
                thumbnailURL:"cdvphotolibrary://thumbnail?photoId=409279%3B%2Fstorage%2Femulated%2F0%2FPictures%2Fmyalbum%2F2018-0-23-1.jpg&width=512&height=384&quality=0.5",
              }
              return new Promise(function(r,re){
                r(item);
              });
            }*/
        }
    };
    TakerPage.prototype.createAlbum = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Create Album',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Album Name'
                },
                {
                    name: 'desc',
                    placeholder: 'my album'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                        myalbum.ui.showAlert('Cancel clicked');
                    }
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        _this.addAlbum(data);
                    }
                }
            ]
        });
        this.commonService.registerBackButtonListener('alert', function () {
            alert.dismiss();
            _this.commonService.unRegisterBackButtonAction('alert');
            return true;
        });
        alert.present();
    };
    TakerPage.prototype.addAlbum = function (data) {
        var _this = this;
        //this.albumList.push(data.name);
        data.dir = '';
        myalbum.db.insertTAlbum(data).then(function (data) {
            _this.updateAlbum();
        }, function (err) {
            myalbum.ui.showAlert('Error');
        });
    };
    TakerPage.prototype.saveAlbumCluster = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (_this.mainItem && _this.mainItem.id) {
                _this.mainData.coverId = _this.mainItem.id;
            }
            else {
                reje('封面不能为空');
            }
            var persisCd = {
                albumId: _this.mainData.albumId,
                coverId: _this.mainData.coverId,
                creationDate: _this.mainData.creationDate,
                title: _this.mainData.title,
                desc: _this.mainData.desc,
                latitude: _this.mainData.latitude,
                longitude: _this.mainData.longitude,
                address: _this.mainData.address,
            };
            if (_this.mainData.id) {
                persisCd.id = _this.mainData.id;
            }
            myalbum.db.insertOrUpdate(myalbum.db.TAlbumCluster, persisCd).then(function (clusterItem) {
                //save TAlbumCluster success
                if (!_this.mainData.id) {
                    _this.mainData.id = clusterItem.id;
                }
                reso(_this.mainData);
            }, function (err) {
                //save TAlbumCluster failure
                console.log(err);
                _this.commonService.hideLoading();
                reje(err);
            });
        });
    };
    TakerPage.prototype.doSaveAlbumData = function (dd) {
        var _this = this;
        return new Promise(function (reso, reje) {
            var saveOrUpdate = function (albumFileItem) {
                //save album data
                if (albumFileItem) {
                    dd.mediaId = albumFileItem.id + '';
                    if (albumFileItem.nativeURL) {
                        dd.photoURL = albumFileItem.nativeURL;
                    }
                    dd.thumbnailURL = albumFileItem.thumbnailURL;
                    dd.creationDate = albumFileItem.creationDate;
                    dd.fileName = albumFileItem.fileName;
                    dd.height = albumFileItem.height;
                    dd.width = albumFileItem.width;
                }
                myalbum.db.insertOrUpdate(myalbum.db.TAlbumData, dd).then(function (albumDataItem) {
                    //save album data success
                    reso(albumDataItem);
                }, function (err) {
                    reje(err);
                });
            };
            if (!dd.id) {
                //dd.photoURL = this.getFilePath(dd.photoURL);
                _this.commonService.saveMedia(dd.photoURL, _this.getAlbum().name).then(function (albumFileItem) {
                    saveOrUpdate(albumFileItem);
                }, function (err) {
                    reje(err);
                });
            }
            else {
                saveOrUpdate(null);
            }
        });
    };
    /*getFilePath(purl:string){
      if(purl.indexOf('?') > 0) {
        purl = purl.substr(0,purl.indexOf('?'));
      }
      if(!purl.startsWith('file:')){
        purl = 'file:///'+purl;
      }
      return purl;
    }*/
    TakerPage.prototype.getAlbum = function () {
        if (!this.mainData.albumId) {
            return null;
        }
        var album;
        for (var i = 0; i < this.albumList.length; i++) {
            if (this.albumList[i].id == this.mainData.albumId) {
                album = this.albumList[i];
                break;
            }
        }
        return album;
    };
    TakerPage.prototype.saveOrUpdate = function () {
        var _this = this;
        if (!this.commonService.isPcBrowser() && !this.change) {
            myalbum.ui.showAlert('未选择图片或先先图片已经保存');
            //reje('未选择图片或先先图片已经保存');
            return;
        }
        if (this.mainData.albumId == 0) {
            myalbum.ui.showAlert('未选择专辑');
            return;
        }
        if (!this.mainItem) {
            myalbum.ui.showAlert('未选择封面');
            return;
        }
        this.commonService.showLoading('保存数据');
        var albumDataIds = [];
        for (var i = 0; i < this.deleteItem.length; i++) {
            albumDataIds.push(this.deleteItem[i].id);
        }
        if (albumDataIds.length > 0) {
            myalbum.db.deleteAlbumClusterData(this.mainData.id, albumDataIds);
            myalbum.db.deleteById(myalbum.db.TAlbumData, albumDataIds);
        }
        this.saveAlbumData().then(function () {
            console.log();
            _this.saveAlbumCluster().then(function (clusterItem) {
                var cnt = 0;
                for (var i = 0; i < _this.datas.length; i++) {
                    var albumData = _this.datas[i];
                    myalbum.db.saveOrUpdateTAlbumClusterData({ clusterId: clusterItem.id, albumDataId: albumData.id }).then(function (cdata) {
                        //save TalbumClusterData success
                        cnt++;
                        if (cnt == _this.datas.length) {
                            _this.commonService.hideLoading();
                        }
                    }, function (err) {
                        //save TAlbumCluster failure
                        console.log(err);
                        cnt++;
                        if (cnt == _this.datas.length) {
                            _this.commonService.hideLoading();
                            _this.commonService.triggerEvent('refresh', null);
                        }
                    });
                }
            }, function (err) {
                console.log(err);
                _this.commonService.hideLoading();
                myalbum.ui.showAlert('保存失败');
            });
        }, function (err) {
            _this.commonService.hideLoading();
            myalbum.ui.showAlert('保存失败');
        });
    };
    TakerPage.prototype.saveAlbumData = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            if (!_this.commonService.isPcBrowser() && !_this.change) {
                myalbum.ui.showAlert('未选择图片或先先图片已经保存');
                return;
            }
            var cnt = 0;
            var saveOne = function (dd) {
                _this.doSaveAlbumData(dd).then(function (albumData) {
                    if (!dd.id) {
                        dd.id = albumData.id;
                    }
                    cnt++;
                    if (cnt == _this.datas.length) {
                        reso(_this.datas);
                    }
                }, function (err) {
                    console.log(err);
                    reje(err);
                });
            };
            for (var i = 0; i < _this.datas.length; i++) {
                var dd = _this.datas[i];
                saveOne(dd);
            }
        });
    };
    TakerPage.prototype.updateAlbum = function () {
        this.albumList = this.dbService.getAlbumDataQParams().albumList;
        /* this.bbService.selectTAlbum().then((albums)=>{
           this.albumList=albums;
         },(err)=>{
           this.albumList=[];
         });*/
    };
    TakerPage.prototype.getPhotoSource = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            var actionSheet = _this.alertCtrl.create({
                title: '媒体源',
                buttons: [
                    {
                        text: '相册',
                        role: 'destructive',
                        handler: function () {
                            reso(0);
                        }
                    }, {
                        text: '拍摄',
                        handler: function () {
                            reso(1);
                        }
                    }, {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                            reso(-1);
                        }
                    }
                ]
            });
            _this.commonService.registerBackButtonListener('getPhotoSource', function () {
                actionSheet.dismiss();
                _this.commonService.unRegisterBackButtonAction('getPhotoSource');
                reso(-1);
                return true;
            });
            actionSheet.present();
        });
    };
    TakerPage.prototype.takePhoto = function () {
        var _this = this;
        //1拍照,0从图库选择
        var data = {};
        this.getPhotoSource().then(function (type) {
            var successGetPicture = function (item) {
                console.log(item);
                //event.target.src = fileUrl;
                _this.change = true;
                data.creationDate = item.creationDate;
                data.latitude = item.latitude;
                data.longitude = item.longitude;
                data.address = item.address;
                data.photoURL = item.fullPath;
                _this.change = true;
                if (type == 1) {
                    //拍照
                    _this.datas.push(data);
                }
                else if (type == 0) {
                    //图库取得图片
                    //去除重复图片
                    var cnt = 0;
                    var images = item;
                    for (var i = 0; i < images.length; i++) {
                        var flag = false;
                        for (var j = 0; j < _this.datas.length; j++) {
                            if (_this.datas[j].photoURL == images[i].fullPath) {
                                flag = true;
                                cnt++;
                                break;
                            }
                        }
                        if (!flag) {
                            flag = false;
                            images[i].photoURL = images[i].fullPath;
                            _this.datas.push(images[i]);
                        }
                    }
                    if (cnt > 0) {
                        myalbum.ui.showAlert(cnt + '个重复文件，已自动去重');
                    }
                }
                else if (type == 2) {
                    //视频
                    _this.datas.push(data);
                }
                else if (type == 3) {
                    //音频
                    _this.datas.push(data);
                }
                if (!_this.mainItem && _this.datas.length > 0) {
                    _this.__setFirstPage(_this.datas[0]);
                }
            };
            if (type == 1) {
                //this.commonService.getPictureByCamera(options).then(successGetPicture);
                _this.commonService.captureImage().then(successGetPicture);
            }
            else if (type == 0) {
                //this.commonService.getImages().then(successGetPicture);
                _this.commonService.selectMedia().then(successGetPicture);
            }
            else if (type == 2) {
                _this.commonService.captureVideo().then(successGetPicture);
            }
            else if (type == 3) {
                _this.commonService.captureAudio().then(successGetPicture);
            }
        });
    };
    TakerPage.prototype.__setFirstPage = function (item) {
        this.mainItem = item;
        this.mainData.creationDate = item.creationDate;
        this.mainData.latitude = item.latitude;
        this.mainData.longitude = item.longitude;
        this.mainData.address = item.address;
        //this.mainData.photoURL = item.photoURL;
        if (!!item.title) {
            this.mainData.title = item.title;
        }
        if (!!item.desc) {
            this.mainData.desc = item.desc;
        }
        if (!!item.id) {
            this.mainData.coverId = item.id;
        }
        this.change = true;
    };
    TakerPage.prototype.__deleteItem = function (item) {
        if (item == this.mainItem || this.datas.length == 1) {
            myalbum.ui.showAlert('封面不能删除');
            return;
        }
        if (item.id) {
            this.deleteItem.push(item);
        }
        for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i] == item) {
                this.datas.splice(i, 1);
                break;
            }
        }
        this.change = true;
    };
    TakerPage.prototype.setAsFirstPage = function (evt, item) {
        var _this = this;
        var takeAsFirstPage = this.alertCtrl.create({
            title: '设置为',
            buttons: [
                {
                    text: '封面',
                    handler: function () {
                        _this.__setFirstPage(item);
                        console.log(evt);
                    }
                }, {
                    text: '删除',
                    handler: function () {
                        _this.__deleteItem(item);
                        console.log(evt);
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log(evt);
                    }
                }
            ]
        });
        this.commonService.registerBackButtonListener('setAsFirstPage', function () {
            takeAsFirstPage.dismiss();
            _this.commonService.unRegisterBackButtonAction('setAsFirstPage');
            return true;
        });
        takeAsFirstPage.present();
    };
    TakerPage.prototype.deleteCluster = function () {
        var albumDataIds = [];
        for (var i = 0; i < this.datas.length; i++) {
            albumDataIds.push(this.datas[i].id);
        }
        myalbum.db.deleteAlbumClusterData(this.mainData.id, albumDataIds);
        myalbum.db.deleteById(myalbum.db.TAlbumData, albumDataIds);
        myalbum.db.deleteById(myalbum.db.TAlbumCluster, this.mainData.id);
        this.navCtrl.pop();
    };
    TakerPage.prototype.mainMenu = function () {
        var _this = this;
        var mm = this.alertCtrl.create({
            title: '操作',
            buttons: [
                {
                    text: '保存',
                    handler: function () {
                        _this.saveOrUpdate();
                    }
                }, {
                    text: '删除',
                    handler: function () {
                        _this.deleteCluster();
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        this.commonService.registerBackButtonListener('mainMenu', function () {
            mm.dismiss();
            _this.commonService.unRegisterBackButtonAction('mainMenu');
            return true;
        });
        mm.present();
    };
    TakerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'taker',template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\Taker\taker.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Taker\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="mainMenu()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n  <ion-list>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>专辑</ion-label>\n          <ion-select [(ngModel)]="mainData.albumId">\n            <ion-option *ngFor="let n of albumList" value="{{n.id}}">{{n.name}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <button (click)="createAlbum(\'larger\')" ion-item detail-none class="text-button text-larger">新建</button>\n      </ion-col>\n    </ion-row>\n\n    <ion-item>\n      <ion-label stacked>标题</ion-label>\n      <ion-input type="text" name="title" [(ngModel)]="mainData.title" (change)="change=true"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>描述</ion-label>\n      <ion-textarea name="desc" [(ngModel)]="mainData.desc" (change)="change=true"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>地址</ion-label>\n      <ion-input type="text" name="address" [(ngModel)]="mainData.address" (change)="change=true"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>时间</ion-label>\n      <ion-input type="text" name="creationDate" [(ngModel)]="mainData.creationDate" (change)="change=true"></ion-input>\n    </ion-item>\n\n    <!--<ion-item>\n      <button ion-button color="secondary" outline (click)="takePhoto(true)">封面</button>\n    </ion-item>\n    <ion-item>\n        <img *ngIf="mainData.photoURL.endsWith(\'jpg\')|| mainData.photoURL.endsWith(\'jpeg\')"  [src]="mainData.photoURL | cdvphotolibrary"/>\n        <video  *ngIf="mainData.photoURL.endsWith(\'mp4\')" width="320" height="240" controls webkit-playsinline>\n          <source [src]="mainData.photoURL | cdvphotolibrary" type="video/mp4">\n          Your browser does not support the video tag.\n        </video>\n    </ion-item>-->\n\n    <ion-item>\n      <button ion-button color="secondary" outline (click)="takePhoto()">媒体</button>\n    </ion-item>\n\n    <ion-item *ngFor="let item of datas" (click)="setAsFirstPage($event,item)">\n        <album-image *ngIf="item.photoURL.endsWith(\'jpg\')|| item.photoURL.endsWith(\'jpeg\')" [it]="item"\n                     [hiddenDesc]="false" [hiddenActBar]="true" [canView]="false"></album-image>\n        <!--<img *ngIf="item.photoURL.endsWith(\'jpg\')|| item.photoURL.endsWith(\'jpeg\')"  [src]="item.photoURL | cdvphotolibrary"/>-->\n        <video  *ngIf="item.photoURL.endsWith(\'mp4\')" width="320" height="240" controls webkit-playsinline>\n          <source [src]="item.photoURL | cdvphotolibrary" type="video/mp4">\n          Your browser does not support the video tag.\n        </video>\n    </ion-item>\n\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\Taker\taker.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__service_BBService__["a" /* BBService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__service_DbService__["a" /* DbService */],
            __WEBPACK_IMPORTED_MODULE_3__service_CommonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], TakerPage);
    return TakerPage;
}());

//# sourceMappingURL=taker.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__photoDetail_photoDetail__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__photoDetail_sysPhotoDetail__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_DbService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_BBService__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__QueryPage__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*import { PhotoLibrary } from '@ionic-native/photo-library';*/





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
var AlbumPage = (function () {
    function AlbumPage(/*public photoLibrary:PhotoLibrary,*/ bbService, dbService, commonService, navCtrl, navParams, popoverCtrl) {
        var _this = this;
        this.bbService = bbService;
        this.dbService = dbService;
        this.commonService = commonService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        //hiddenOthers:boolean = false;
        this.init = false;
        this.album = {};
        this.items = [
            { paths: ['assets/imgs/20180118153908.jpg', 'assets/imgs/20180118153941.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118153941.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118153952.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118154030.jpg'], title: 'Good Girl', date: new Date() },
        ];
        commonService.regListener('refresh', function (args) {
            _this.getAlbum().then(function () {
                _this.doRefresh(null);
            });
        });
    }
    AlbumPage.prototype.ngOnInit = function () {
    };
    AlbumPage.prototype.ngAfterViewInit = function () {
    };
    AlbumPage.prototype.ionViewDidEnter = function () {
    }; //它的触发和ionViewDidLoad的区别在于，不管是第一次加载还是缓存加载它都会触发
    AlbumPage.prototype.ionViewDidLoad = function () {
    }; //当页面加载完毕时触发。它只会在新页面被创建时触发一次，如页面被缓存再一次触发，它不会有任何反应。
    AlbumPage.prototype.ionViewWillEnter = function () {
    }; // 当页面即将加载时会触发。
    AlbumPage.prototype.ionViewWillLeave = function () {
    }; //当前页面即将离场时触发
    AlbumPage.prototype.ionViewDidLeave = function () {
    }; //当前页面完全离场时触发
    AlbumPage.prototype.ionViewWillUnload = function () {
    }; //当前页面即销毁时触发
    //有返回值事件：
    AlbumPage.prototype.ionViewCanEnter = function () {
    }; //在一个需要授权的页面进入之前，它会触发。用于检查当前用户的资格。
    AlbumPage.prototype.ionViewCanLeave = function () {
    }; //在一个需要授权的页面离开之前，它会触发。用于检查当前用户的资格。
    AlbumPage.prototype.ngAfterViewChecked = function () {
        //this.queryAlbumData();
    };
    AlbumPage.prototype.getAlbum = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            var qparams = _this.dbService.getAlbumDataQParams();
            if (qparams.sysDisabled) {
                _this.album = qparams.album;
                reso(null);
            }
            else {
                _this.bbService.getAlbum().then(function (name) {
                    _this.album = name;
                    reso(name);
                }, function (err) {
                    reje(err);
                });
            }
        });
    };
    AlbumPage.prototype.presentPopover = function (ev) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__QueryPage__["a" /* QueryPage */], {
            finish: function () {
                _this.getAlbum();
                _this.doRefresh(null);
            }
        });
        popover.present({
            ev: ev
        });
    };
    AlbumPage.prototype.loadPhotoFromLocal = function (refresher, append, showLoading) {
        var _this = this;
        if (refresher === void 0) { refresher = null; }
        if (append === void 0) { append = false; }
        if (showLoading === void 0) { showLoading = true; }
        if (showLoading) {
            this.commonService.showLoading('图片加载中');
        }
        this.dbService.queryAlbumData(refresher, append).then(function (items) {
            _this.items = items;
            if (showLoading) {
                _this.commonService.hideLoading();
            }
        }, function (err) {
            if (showLoading) {
                _this.commonService.hideLoading();
            }
        });
    };
    AlbumPage.prototype.loadSysPhotos = function (refresher, append, showLoading) {
        var _this = this;
        if (refresher === void 0) { refresher = null; }
        if (append === void 0) { append = false; }
        if (showLoading === void 0) { showLoading = true; }
        if (showLoading) {
            this.commonService.showLoading('图片加载中');
        }
        var doLoad = function () {
            _this.dbService.loadSysPhotos(refresher, append, _this.commonService)
                .then(function (items) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    item.photoURL = item.nativeURL;
                    item.albumId = null;
                    item.id = null;
                }
                _this.items = items;
                if (showLoading) {
                    _this.commonService.hideLoading();
                }
            }, function (err) {
                if (showLoading) {
                    _this.commonService.hideLoading();
                }
                console.log(err);
            });
        };
        if (this.commonService.isPcBrowser()) {
            doLoad();
        }
        else {
            doLoad();
            /* this.photoLibrary.requestAuthorization().then(() => {
               console.log('requestAuthorization');
               doLoad();
             });*/
        }
    };
    AlbumPage.prototype.photoDetail = function (item, editable) {
        var qparams = this.dbService.getAlbumDataQParams();
        this.dbService.resetAlbumData();
        if (qparams.sysDisabled) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__photoDetail_sysPhotoDetail__["a" /* SysPhotoDetailPage */], { item: item, editable: editable });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__photoDetail_photoDetail__["a" /* PhotoDetailPage */], { item: item, editable: editable });
        }
    };
    AlbumPage.prototype.doInfinite = function (infiniteScroll) {
        var qparams = this.dbService.getAlbumDataQParams();
        if (!qparams.sysDisabled) {
            this.loadPhotoFromLocal(infiniteScroll, true, false);
        }
        else {
            this.loadSysPhotos(infiniteScroll, true, false);
        }
    };
    AlbumPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.items = [];
        var qparams = this.dbService.getAlbumDataQParams();
        this.dbService.resetAlbumData();
        if (!qparams.sysDisabled) {
            this.loadPhotoFromLocal(refresher, false, false);
        }
        else {
            this.loadSysPhotos(refresher, false, true);
        }
    };
    AlbumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'album-home',template:/*ion-inline-start:"D:\opensource\ionic\new-ionic3-angular4\src\pages\album\album.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      {{album.name+\', \'+ album.ageInfo }}\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentPopover($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n      pullingText="Pull to refresh..."\n      refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let item of items" no-padding >\n   <!-- <album-video *ngIf="item.photoURL&&item.photoURL.endsWith(\'mp4\')" [it]="item" [autoPlayFlag]="false"></album-video>-->\n    <album-image  [canView]="true" [it]="item" [hiddenDesc]="false" [hiddenActBar]="false"></album-image>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"D:\opensource\ionic\new-ionic3-angular4\src\pages\album\album.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__service_BBService__["a" /* BBService */], __WEBPACK_IMPORTED_MODULE_3__service_DbService__["a" /* DbService */],
            __WEBPACK_IMPORTED_MODULE_6__service_CommonService__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* PopoverController */]])
    ], AlbumPage);
    return AlbumPage;
}());

//# sourceMappingURL=album.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_CommonService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_rotateImage_RotateImage__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TestPage = (function () {
    function TestPage(navCtrl, commonService) {
        this.navCtrl = navCtrl;
        this.commonService = commonService;
        this.isDisabled = true;
    }
    TestPage.prototype.ngOnInit = function () {
        //myalbum.ui.showAlert(this.commonService.isPcBrowser());
        //cordova.plugins.albumplugin
    };
    TestPage.prototype.hello = function () {
        cordova.plugins.albumplugin.fileInfo('/storage/emulated/0/Pictures/myalbum/2018-0-25-10.jpg', function (result) {
            console.log(result);
        }, function (err) {
            console.log(err);
        });
    };
    TestPage.prototype.captureImpage = function () {
        this.commonService.captureImage().then(function (images) {
            console.log(images);
        }, function (err) {
            console.log(err);
        });
    };
    TestPage.prototype.captureAudio = function () {
        this.commonService.captureAudio().then(function (images) {
            console.log(images);
        }, function (err) {
            console.log(err);
        });
    };
    TestPage.prototype.captureVideo = function () {
        this.commonService.captureVideo().then(function (images) {
            console.log(images);
        }, function (err) {
            console.log(err);
        });
    };
    TestPage.prototype.selectMedia = function () {
        var args = { 'showThumbnail': true,
            'selectMode': 101,
            'maxSelectCount': 12,
            'maxSelectSize': 188743680,
        };
        MediaPicker.getMedias(args, function (dataArray) {
            //dataArray [{mediaType: "image",rotate: 90, path:'/storage/emulated/0/DCIM/Camera/20170808_145202.jpg' thumbnailBase64: '9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEB'}]
            for (var i = 0; i < dataArray.length; i++) {
                console.log(dataArray[i]);
            }
        }, function (err) {
            console.log(err);
        });
    };
    TestPage.prototype.photoSwipe = function () {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        // build items array
        var items = [
            {
                src: 'assets/imgs/20180118153952.jpg',
                w: 600,
                h: 400
            },
            {
                src: 'assets/imgs/20180118153941.jpg',
                w: 1200,
                h: 900
            },
            {
                src: 'assets/imgs/20180118154009.jpg',
                w: 1200,
                h: 900
            },
            {
                src: 'assets/imgs/20180118154017.jpg',
                w: 1200,
                h: 900
            }
        ];
        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: 0 // start at first slide
        };
        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    TestPage.prototype.rotateImage = function () {
        var imgItems = [
            { url: 'assets/imgs/20180118153908.jpg', w: 180, h: 180 },
            { url: 'assets/imgs/20180118153941.jpg', w: 180, h: 180 },
            { url: 'assets/imgs/20180118154000.jpg', w: 180, h: 180 },
            { url: 'assets/imgs/20180118154009.jpg', w: 180, h: 180 },
            { url: 'assets/imgs/20180118154017.jpg', w: 180, h: 180 },
            { url: 'assets/imgs/20180118154023.jpg', w: 180, h: 180 },
        ];
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_rotateImage_RotateImage__["a" /* RotateImagePage */], { item: { datas: imgItems } });
    };
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\n          Test\n        </ion-title>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content padding>\n\n      <button ion-item menuClose  detail-none (click)=\"rotateImage()\">\n        <ion-icon name='rotateImage'></ion-icon>\n        RotateImage\n      </button>\n      \n      <ion-list radio-group [(ngModel)]=\"relationship\">\n        <ion-item>\n          <ion-label>Friends</ion-label>\n          <ion-radio value=\"friends\" checked></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Family</ion-label>\n          <ion-radio value=\"family\"></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Enemies</ion-label>\n          <ion-radio value=\"enemies\" [disabled]=\"isDisabled\"></ion-radio>\n        </ion-item>\n      </ion-list>\n      \n      <ion-list>\n        <ion-item>\n          <ion-note item-start>\n            Left Note\n          </ion-note>\n          My Item\n          <ion-note item-end>\n            Right Note\n          </ion-note>\n        </ion-item>\n      </ion-list>\n      \n      <ion-grid>\n        <ion-row>\n          <ion-col col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3>\n            This column will be 12 columns wide by default,\n            9 columns at the small breakpoint,\n            6 at the medium breakpoint, 4 at large, and 3 at xl.\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3>\n            This column will be 12 columns wide by default,\n            9 columns at the small breakpoint,\n            6 at the medium breakpoint, 4 at large, and 3 at xl.\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <ion-icon name=\"heart\"></ion-icon>                    <!-- active -->\n      <ion-icon name=\"heart\" isActive=\"false\"></ion-icon>  <!-- inactive -->\n\n\n      <ion-list inset>\n        <ion-item>\n          <ion-label fixed>fixed</ion-label>\n          <ion-input type=\"text\" value=\"\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>floating</ion-label>\n          <ion-input type=\"password\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked>stacked</ion-label>\n          <ion-input type=\"text\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label>inline</ion-label>\n          <ion-input type=\"VerifyCode\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-input type=\"text\" placeholder=\"placeholder\"></ion-input>\n        </ion-item>\n      </ion-list>\n\n\n      <ion-item-group>\n        <ion-item-divider color=\"light\">A</ion-item-divider>\n        <ion-item>Angola</ion-item>\n        <ion-item>Argentina</ion-item>\n        <ion-item-divider color=\"light\">B</ion-item-divider>\n        <ion-item>aaa</ion-item>\n        <ion-item>bbgb</ion-item>\n      </ion-item-group>\n\n      <ion-list>\n        <ion-list-header>\n          Action\n        </ion-list-header>\n        <ion-item>Terminator II</ion-item>\n        <ion-item>The Empire Strikes Back</ion-item>\n        <ion-item>Blade Runner</ion-item>\n      </ion-list>\n\n      <ion-list>\n        <ion-list-header>Today</ion-list-header>\n        <ion-item>\n          <ion-thumbnail item-start>\n            <img src=\"/assets/imgs/20180118153908.jpg\">\n          </ion-thumbnail>\n          <h2>Finn</h2>\n          <p>I've had a pretty messed up day. If we just...</p>\n          <ion-note item-end>3:43 pm</ion-note>\n        </ion-item>\n        <ion-list-header>Yesterday</ion-list-header>\n        <ion-item>\n          <ion-thumbnail item-start>\n            <img src=\"/assets/imgs/20180118154000.jpg\">\n          </ion-thumbnail>\n          <h2>Finn</h2>\n          <h3>Don't Know What To Do!</h3>\n          <ion-note item-end>3:43 pm</ion-note>\n        </ion-item>\n      </ion-list>\n\n      <ion-item>\n        <ion-label>Date</ion-label>\n        <ion-datetime displayFormat=\"YYYY/MM\" [(ngModel)]=\"myDate\"></ion-datetime>\n      </ion-item>\n      <button ion-item menuClose  detail-none (click)=\"hello()\">\n        <ion-icon name='camera'></ion-icon>\n        call native method\n      </button>\n\n      <button ion-item menuClose  detail-none (click)=\"captureImpage()\">\n        <ion-icon name='camera'></ion-icon>\n        Capture Impage\n      </button>\n\n      <button ion-item menuClose  detail-none (click)=\"captureAudio()\">\n        <ion-icon name='camera'></ion-icon>\n        Capture Audio\n      </button>\n\n      <button ion-item menuClose  detail-none (click)=\"captureVideo()\">\n        <ion-icon name='camera'></ion-icon>\n        Capture Video\n      </button>\n\n      <button ion-item menuClose  detail-none (click)=\"selectMedia()\">\n        <ion-icon name='camera'></ion-icon>\n       SelectMedia\n      </button>\n\n      <button ion-item menuClose  detail-none (click)=\"photoSwipe()\">\n        <ion-icon name='photoSwipe'></ion-icon>\n        PhotoSwipe\n      </button>\n\n     \n      \n\n      <div class=\"pswp\" tabindex=\"-1\" role=\"page\" aria-hidden=\"true\">\n\n        <!-- Background of PhotoSwipe. \n             It's a separate element as animating opacity is faster than rgba(). -->\n        <div class=\"pswp__bg\"></div>\n\n        <!-- Slides wrapper with overflow:hidden. -->\n        <div class=\"pswp__scroll-wrap\">\n\n          <!-- Container that holds slides. \n              PhotoSwipe keeps only 3 of them in the DOM to save memory.\n              Don't modify these 3 pswp__item elements, data is added later on. -->\n          <div class=\"pswp__container\">\n            <div class=\"pswp__item\"></div>\n            <div class=\"pswp__item\"></div>\n            <div class=\"pswp__item\"></div>\n          </div>\n\n          <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n          <div class=\"pswp__ui pswp__ui--hidden\">\n\n            <div class=\"pswp__top-bar\">\n\n              <!--  Controls are self-explanatory. Order can be changed. -->\n\n              <div class=\"pswp__counter\"></div>\n\n              <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n\n              <button class=\"pswp__button pswp__button--share\" title=\"Share\"></button>\n\n              <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\n\n              <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n\n              <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\n              <!-- element will get class pswp__preloader--active when preloader is running -->\n              <div class=\"pswp__preloader\">\n                <div class=\"pswp__preloader__icn\">\n                  <div class=\"pswp__preloader__cut\">\n                    <div class=\"pswp__preloader__donut\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\n              <div class=\"pswp__share-tooltip\"></div>\n            </div>\n\n            <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">\n            </button>\n\n            <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">\n            </button>\n\n            <div class=\"pswp__caption\">\n              <div class=\"pswp__caption__center\"></div>\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n      \n    </ion-content>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__service_CommonService__["a" /* CommonService */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map