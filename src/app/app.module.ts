import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/mainMenu/menu';
import { TakerPage } from '../pages/Taker/taker';
import { AlbumPage } from '../pages/album/album';
import { TabsPage } from '../pages/tabs/tabs';
import { TestPage } from '../pages/test/test';
import { PhotoDetailPage } from '../pages/photoDetail/photoDetail';
import { SysPhotoDetailPage } from '../pages/photoDetail/sysPhotoDetail';
import { PhotoPage } from '../pages/photoDetail/photo';
import { DbService } from '../service/DbService';
import { BBService } from '../service/BBService';
import { EditAlbumPage } from '../pages/EditAlbum/EditAlbum';
import { CommonService } from '../service/CommonService';
import { QueryPage } from '../pages/album/QueryPage';
import { AlbumListPage } from '../pages/photoDetail/AlbumListPage';
import { VideoPage } from '../pages/video/video';
import { ImagePage } from '../pages/image/image';
import { PhotoSwipePage } from '../pages/photoSwipe/PhotoSwipe';
import { RotateImagePage } from '../pages/rotateImage/RotateImage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/*import { PhotoLibrary } from '@ionic-native/photo-library';*/
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { CDVPhotoLibraryPipe } from '../pipe/cdvphotolibrary.pipe';
import { Geolocation } from '@ionic-native/geolocation';
import { MediaCapture} from '@ionic-native/media-capture';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TestPage,
    TakerPage,
    AlbumPage,
    TabsPage,
    PhotoDetailPage,
    EditAlbumPage,
    CDVPhotoLibraryPipe,
    MenuPage,
    QueryPage,
    AlbumListPage,
    PhotoPage,
    SysPhotoDetailPage,
    VideoPage,
    ImagePage,
    PhotoSwipePage,
    RotateImagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '', // 配置返回按钮的文字
      backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标
    }),
    IonicStorageModule.forRoot({
      name: '__MyAlbum',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TestPage,
    AboutPage,
    TakerPage,
    AlbumPage,
    TabsPage,
    PhotoDetailPage,
    MenuPage,
    QueryPage,
    AlbumListPage,
    PhotoPage,
    SysPhotoDetailPage,
    VideoPage,
    ImagePage,
    PhotoSwipePage,
    RotateImagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    /*PhotoLibrary,*/
    DbService,
    BBService,
    CommonService,
    Camera,
    Geolocation,
    MediaCapture,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
