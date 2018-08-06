"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by yanxiaojun617@163.com on 01-03.
 */
var core_1 = require("@angular/core");
var CommonService = (function () {
    function CommonService(toastCtrl, loadingCtrl, camera) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
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
                _this.loading.dismiss();
            }, 30000);
        };
        /**
         * 关闭loading
         */
        this.hideLoading = function () {
            _this.loading.dismissAll();
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
        this.getPictureByPhotoLibrary = function (options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve) {
                _this.getPicture(Object.assign({
                    sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY
                }, options)).then(function (imageBase64) {
                    resolve(imageBase64);
                }).catch(function (err) {
                    String(err).indexOf('cancel') != -1 ? _this.showToast('取消选择图片', 1500) : _this.showToast('获取        照片失败');
                });
            });
        };
        /**
         * 通过拍照获取照片
         * @param options
         * @return {Promise<T>}
         */
        this.getPictureByCamera = function (options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve) {
                _this.getPicture(Object.assign({
                    sourceType: _this.camera.PictureSourceType.CAMERA
                }, options)).then(function (imageBase64) {
                    resolve(imageBase64);
                }).catch(function (err) {
                    String(err).indexOf('cancel') != -1 ? _this.showToast('取消拍照', 1500) : _this.showToast('获取照片失败');
                });
            });
        };
    }
    CommonService.prototype.isPcBrowser = function () {
        var u = window.navigator.userAgent, app = window.navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        //var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return !(isAndroid /*|| isIOS*/);
    };
    return CommonService;
}());
CommonService = __decorate([
    core_1.Injectable()
], CommonService);
exports.CommonService = CommonService;
