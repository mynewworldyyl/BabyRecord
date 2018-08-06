"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TakerPage = (function () {
    function TakerPage(navCtrl, alertCtrl, dbService, commonService, photoLibrary, geolocation) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.dbService = dbService;
        this.commonService = commonService;
        this.photoLibrary = photoLibrary;
        this.geolocation = geolocation;
        this.DefaultPic = 'assets/imgs/20180118153952.jpg';
        this.change = false;
        this.pictureUrl = this.DefaultPic;
        this.data = { albumId: '', title: '', desc: '', mediaId: '', subPath: '' };
    }
    TakerPage.prototype.ngOnInit = function () {
        this.updateAlbum();
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
    TakerPage.prototype.saveAlbumData = function () {
        var _this = this;
        if (!this.commonService.isPcBrowser() && !this.change) {
            myalbum.ui.showAlert('未选择图片或先先图片已经保存');
            return;
        }
        var album;
        for (var i = 0; i < this.albumList.length; i++) {
            if (this.albumList[i].id == this.data.albumId) {
                album = this.albumList[i];
                break;
            }
        }
        var purl = this.pictureUrl;
        if (purl.indexOf('?') > 0) {
            purl = purl.substr(0, purl.indexOf('?'));
        }
        if (this.commonService.isPcBrowser()) {
            this.photoLibrary.saveImage = function () {
                var item = {
                    creationDate: new Date(),
                    fileName: "20180118153908.jpg",
                    height: 400,
                    width: 400,
                    //id:"409279;/storage/emulated/0/Pictures/myalbum/2018-0-23-1.jpg",
                    id: "409279;assets/imgs/20180118153908.jpg",
                    /*  latitude:22.5839424133301,
                      longitude:113.879081726074,*/
                    latitude: 0,
                    longitude: 0,
                    //photoURL:"assets/imgs/20180118153908.jpg",
                    //photoURL:"assets/imgs/20180118153941.jpg",
                    photoURL: "assets/imgs/20180118154000.jpg",
                    //photoURL:"assets/imgs/20180118153908.jpg",
                    thumbnailURL: "cdvphotolibrary://thumbnail?photoId=409279%3B%2Fstorage%2Femulated%2F0%2FPictures%2Fmyalbum%2F2018-0-23-1.jpg&width=512&height=384&quality=0.5",
                };
                return new Promise(function (reso, reje) {
                    reso(item);
                });
            };
        }
        var filePath = purl;
        if (!filePath.startsWith('file:')) {
            filePath = 'file:///' + purl;
        }
        this.commonService.showLoading('保存图片');
        this.photoLibrary.saveImage(filePath, album.name, {}).then(function (item) {
            console.log(item);
            _this.data.mediaId = item.id;
            _this.data.photoURL = item.photoURL;
            _this.data.thumbnailURL = item.thumbnailURL;
            _this.data.creationDate = item.creationDate;
            _this.data.fileName = item.fileName;
            _this.data.height = item.height;
            _this.data.width = item.width;
            _this.data.latitude = item.latitude;
            _this.data.longitude = item.longitude;
            var self = _this;
            var doSaveAlbum = function () {
                myalbum.db.insertTAlbumData(self.data).then(function (data) {
                    myalbum.ui.showAlert('Save successfully');
                    self.change = false;
                    _this.commonService.hideLoading();
                }, function (err) {
                    myalbum.ui.showAlert('Error');
                    console.log(err);
                    _this.commonService.hideLoading();
                    throw err;
                });
            };
            var doGetLocation = function () {
                _this.commonService.showLoading('取图片地址');
                if (item.longitude > 0 && item.latitude > 0) {
                    _this.getLocation(item.latitude, item.longitude).then(function (address) {
                        _this.data.address = address;
                        console.log(self.data.address);
                        doSaveAlbum();
                    });
                }
                else {
                    doSaveAlbum();
                }
            };
            if (item.longitude == 0 || item.latitude == 0) {
                _this.commonService.showLoading('通过GPS取图片坐标');
                _this.getPosition().then(function (position) {
                    item.latitude = _this.data.latitude = position.latitude;
                    item.longitude = _this.data.longitude = position.longitude;
                    doGetLocation();
                });
            }
            else {
                doGetLocation();
            }
        }, function (err) {
            _this.commonService.hideLoading();
            myalbum.ui.showAlert('Save album error');
            console.log(err);
        });
    };
    TakerPage.prototype.getLocation = function (latitude, longitude) {
        return new Promise(function (reso, reje) {
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
                });
            });
        });
    };
    TakerPage.prototype.getPosition = function () {
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
                /*navigator.geolocation.getCurrentPosition((position)=>{
                    var coords = position.coords;
                    reso(coords);
                  }, (error)=>{
                    switch(error.code) {
                      case error.TIMEOUT:
                        myalbum.ui.showAlert("A timeout occured! Please try again!");
                        break;
                      case error.POSITION_UNAVAILABLE:
                        myalbum.ui.showAlert('We can\'t detect your location. Sorry!');
                        break;
                      case error.PERMISSION_DENIED:
                        myalbum.ui.showAlert('Please allow geolocation access for this to work.');
                        break;
                      default:
                        myalbum.ui.showAlert('An unknown error occured!');
                        break;
                    }
                    reje(null);
                  },{
                    // 指示浏览器获取高精度的位置，默认为false
                    enableHighAccuracy: true,
                    // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                    timeout: 5000,
                    // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                    maximumAge: 3000
                  });*/
                /* }).catch(err => {
                   console.log('permissions weren\'t granted')
                   reje(null);
                 });*/
            }
            else {
                reje(null);
            }
        });
    };
    TakerPage.prototype.updateAlbum = function () {
        var _this = this;
        myalbum.db.selectTAlbum().then(function (albums) {
            _this.albumList = albums;
        }, function (err) {
            _this.albumList = [];
        });
    };
    TakerPage.prototype.getPhotoSource = function () {
        var _this = this;
        return new Promise(function (reso, reje) {
            var actionSheet = _this.alertCtrl.create({
                title: 'Source',
                buttons: [
                    {
                        text: '相册',
                        role: 'destructive',
                        handler: function () {
                            reso(0);
                        }
                    }, {
                        text: '拍照',
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
            actionSheet.present();
        });
    };
    TakerPage.prototype.takePhoto = function (event) {
        var _this = this;
        //1拍照,0从图库选择
        var options = {
            targetWidth: -1,
            targetHeight: -1,
            mediaType: 0
        };
        this.getPhotoSource().then(function (type) {
            if (type == 1) {
                _this.commonService.getPictureByCamera(options).then(function (fileUrl) {
                    console.log(fileUrl);
                    //event.target.src = fileUrl;
                    _this.pictureUrl = fileUrl;
                    _this.change = true;
                });
            }
            else if (type == 0) {
                _this.commonService.getPictureByPhotoLibrary(options).then(function (fileUrl) {
                    //event.target.src = fileUrl;
                    console.log(fileUrl);
                    _this.pictureUrl = fileUrl;
                    _this.change = true;
                });
            }
        });
    };
    return TakerPage;
}());
TakerPage = __decorate([
    core_1.Component({
        selector: 'taker',
        templateUrl: 'taker.html'
    })
], TakerPage);
exports.TakerPage = TakerPage;
