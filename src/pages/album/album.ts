import { Component , OnInit} from '@angular/core';
import { PhotoDetailPage } from '../photoDetail/photoDetail';
import { SysPhotoDetailPage } from '../photoDetail/sysPhotoDetail';
/*import { PhotoLibrary } from '@ionic-native/photo-library';*/
import { DbService } from '../../service/DbService';
import { BBService } from '../../service/BBService';
import { QueryPage } from './QueryPage';
import { CommonService } from '../../service/CommonService';
import { NavController,PopoverController, NavParams } from 'ionic-angular';
import { PhotoPage } from '../photoDetail/photo';

declare var myalbum :any;

const testData:any = {
  creationDate:'2018-09-02 02:04',
  fileName: "IMG_20180117_203604.jpg",
  height: 2432,
  id: "assets/imgs/20180118153908.jpg",
  latitude: 0,
  longitude:  0,
  photoURL: "assets/imgs/20180118153908.jpg",
  thumbnailURL: "assets/imgs/20180118153908.jpg"
  ,width: 2432
}

@Component({
  selector: 'album-home',
  templateUrl: 'album.html'
})
export class AlbumPage implements OnInit {

  //hiddenOthers:boolean = false;

  init:boolean=false;

  album:any={};

  items:any = [
    {paths:['assets/imgs/20180118153908.jpg','assets/imgs/20180118153941.jpg'],title:'Good Girl',date:new Date()},
    {paths:['assets/imgs/20180118153941.jpg'],title:'Good Girl',date:new Date()},
    {paths:['assets/imgs/20180118153952.jpg'],title:'Good Girl',date:new Date()},
    {paths:['assets/imgs/20180118154030.jpg'],title:'Good Girl',date:new Date()},
    ];
  constructor(/*public photoLibrary:PhotoLibrary,*/public bbService:BBService,public dbService:DbService,
              public commonService:CommonService,public navCtrl: NavController,
              private navParams: NavParams,private popoverCtrl: PopoverController) {
    commonService.regListener('refresh',(args)=>{
      this.getAlbum().then(()=>{
        this.doRefresh(null);
      });
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit(){

  }

  ionViewDidEnter(){

  }//它的触发和ionViewDidLoad的区别在于，不管是第一次加载还是缓存加载它都会触发

  ionViewDidLoad(){

  } //当页面加载完毕时触发。它只会在新页面被创建时触发一次，如页面被缓存再一次触发，它不会有任何反应。

  ionViewWillEnter() {

  }// 当页面即将加载时会触发。

  ionViewWillLeave() {

  } //当前页面即将离场时触发

  ionViewDidLeave() {

  } //当前页面完全离场时触发

  ionViewWillUnload() {

  } //当前页面即销毁时触发

  //有返回值事件：
  ionViewCanEnter() {

    } //在一个需要授权的页面进入之前，它会触发。用于检查当前用户的资格。

  ionViewCanLeave() {

  } //在一个需要授权的页面离开之前，它会触发。用于检查当前用户的资格。

  ngAfterViewChecked(){
    //this.queryAlbumData();
  }

  getAlbum() {
    return new Promise((reso,reje)=>{
      let qparams = this.dbService.getAlbumDataQParams();
      if(qparams.sysDisabled){
        this.album = qparams.album;
        reso(null);
      } else {
        this.bbService.getAlbum().then((name:any)=>{
          this.album = name;
          reso(name);
        },(err) => {
          reje(err);
        });
      }
    });
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(QueryPage, {
      finish: ()=>{
        this.getAlbum();
        this.doRefresh(null)
      }
    });
    popover.present({
      ev: ev
    });
  }

  loadPhotoFromLocal(refresher=null,append=false,showLoading=true) {
    if(showLoading){
      this.commonService.showLoading('图片加载中');
    }
    this.dbService.queryAlbumData(refresher,append).then((items)=>{
      this.items = items;
      if(showLoading){
        this.commonService.hideLoading();
      }
    },(err) =>{
      if(showLoading){
        this.commonService.hideLoading();
      }
    });
  }

  loadSysPhotos(refresher=null,append=false,showLoading=true) {
    if(showLoading){
      this.commonService.showLoading('图片加载中');
    }

    let doLoad = () => {
      this.dbService.loadSysPhotos(refresher,append,this.commonService)
        .then((items:any)=>{
          for(let i = 0; i< items.length; i++){
            let item = items[i];
            item.photoURL = item.nativeURL;
            item.albumId=null;
            item.id=null;
          }
          this.items = items;
          if(showLoading){
            this.commonService.hideLoading();
          }
        },(err)=>{
          if(showLoading){
            this.commonService.hideLoading();
          }
          console.log(err);
        });
    }

    if(this.commonService.isPcBrowser()){
      doLoad();
    }else {
      doLoad();
     /* this.photoLibrary.requestAuthorization().then(() => {
        console.log('requestAuthorization');
        doLoad();
      });*/
    }
  }

  photoDetail(item:any,editable:boolean) {
    let qparams = this.dbService.getAlbumDataQParams();
    this.dbService.resetAlbumData();
    if(qparams.sysDisabled){
      this.navCtrl.push(SysPhotoDetailPage,{ item:item,editable:editable });
    }else {
      this.navCtrl.push(PhotoDetailPage,{ item:item,editable:editable });
    }
  }

  doInfinite(infiniteScroll) {
    let qparams = this.dbService.getAlbumDataQParams();
    if(!qparams.sysDisabled){
      this.loadPhotoFromLocal(infiniteScroll,true,false);
    }else {
      this.loadSysPhotos(infiniteScroll,true,false);
    }

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.items=[];
    let qparams = this.dbService.getAlbumDataQParams();
    this.dbService.resetAlbumData();
    if(!qparams.sysDisabled){
      this.loadPhotoFromLocal(refresher,false,false);
    }else {
      this.loadSysPhotos(refresher,false,true);
    }
  }
}
