import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController,NavController } from 'ionic-angular';
import { CommonService } from '../service/CommonService';

import { MenuPage } from '../pages/mainMenu/menu';

import { DbService } from '../service/DbService';
import { AboutPage } from '../pages/about/about';
import { TakerPage } from '../pages/Taker/taker';
import { AlbumPage } from '../pages/album/album';
import { TestPage } from '../pages/test/test';
import { BBService } from '../service/BBService';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  album = AlbumPage;
  taker = TakerPage;
  test = TestPage;
  about = AboutPage;

  backButtonPressed:boolean=false;
  @ViewChild('rootNav') nav: NavController

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,dbService:DbService,
              public alertCtrl: AlertController,public commonService:CommonService,public bbService:BBService,) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //dbService.init();
      this.registerBackButtonAction();//注册返回按键事件
      window['ionicAlertCtrl']=alertCtrl;
      window['commonService']=commonService;
      commonService.deviceReady();
      dbService.deviceReady();
      bbService.deviceReady();
    });
  }

  ngAfterViewInit(){
    this.commonService.nav=this.nav;
  }

  openPage(page){
    this.nav.push(page,{});
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;
      if(this.commonService.triggerBackButtonAction()){

      } else if(this.nav.canGoBack()){
        this.nav.pop();
      }else {
        //此处if是rootPage为登录页的情况，else是rootPage为TabsPage（如果不需要判断登录页的情况直接用else内的代码即可）
        if(page instanceof AlbumPage) {
          this.showExit();
        }
      }
    }, 1);
  }


  //双击退出提示框
  showExit() {
    let prompt = this.alertCtrl.create({
      title: '确定退出？',
      message: "你是否确定退出当前应用？",
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.platform.exitApp();
          }
        },
        {
          text: '取消',
          handler: data => {

          }
        }
      ]
    });
    prompt.present();
  }

}
