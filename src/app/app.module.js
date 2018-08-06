"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ionic_angular_1 = require("ionic-angular");
var app_component_1 = require("./app.component");
var about_1 = require("../pages/about/about");
var menu_1 = require("../pages/mainMenu/menu");
var taker_1 = require("../pages/Taker/taker");
var album_1 = require("../pages/album/album");
var tabs_1 = require("../pages/tabs/tabs");
var test_1 = require("../pages/test/test");
var photoDetail_1 = require("../pages/photoDetail/photoDetail");
var DbService_1 = require("../service/DbService");
var EditAlbum_1 = require("../pages/EditAlbum/EditAlbum");
var CommonService_1 = require("../service/CommonService");
var status_bar_1 = require("@ionic-native/status-bar");
var splash_screen_1 = require("@ionic-native/splash-screen");
var photo_library_1 = require("@ionic-native/photo-library");
var storage_1 = require("@ionic/storage");
var camera_1 = require("@ionic-native/camera");
var cdvphotolibrary_pipe_1 = require("../pipe/cdvphotolibrary.pipe");
var geolocation_1 = require("@ionic-native/geolocation");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.MyApp,
            about_1.AboutPage,
            test_1.TestPage,
            taker_1.TakerPage,
            album_1.AlbumPage,
            tabs_1.TabsPage,
            photoDetail_1.PhotoDetailPage,
            EditAlbum_1.EditAlbumPage,
            cdvphotolibrary_pipe_1.CDVPhotoLibraryPipe,
            menu_1.MenuPage
        ],
        imports: [
            platform_browser_1.BrowserModule,
            ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp),
            storage_1.IonicStorageModule.forRoot({
                name: '__MyAlbum',
                driverOrder: ['indexeddb', 'sqlite', 'websql']
            })
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [
            app_component_1.MyApp,
            test_1.TestPage,
            about_1.AboutPage,
            taker_1.TakerPage,
            album_1.AlbumPage,
            tabs_1.TabsPage,
            photoDetail_1.PhotoDetailPage,
            menu_1.MenuPage
        ],
        providers: [
            status_bar_1.StatusBar,
            splash_screen_1.SplashScreen,
            photo_library_1.PhotoLibrary,
            DbService_1.DbService,
            CommonService_1.CommonService,
            camera_1.Camera,
            geolocation_1.Geolocation,
            { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
