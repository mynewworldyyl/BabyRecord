"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DbService = (function () {
    function DbService() {
        this.cacheItems = [
            { paths: ['assets/imgs/20180118153908.jpg', 'assets/imgs/20180118153941.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118153941.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118153952.jpg'], title: 'Good Girl', date: new Date() },
            { paths: ['assets/imgs/20180118154030.jpg'], title: 'Good Girl', date: new Date() },
        ];
    }
    DbService.prototype.selectAlbumLib = function (albumName, offset, size) {
        return new Promise(function (reso, reje) {
            myalbum.db.selectAlbumLib().then(function (result) {
                reso(result);
            }, function (err) {
                reje(err);
            });
        });
    };
    DbService.prototype.init = function () {
    };
    return DbService;
}());
DbService = __decorate([
    core_1.Injectable()
], DbService);
exports.DbService = DbService;
