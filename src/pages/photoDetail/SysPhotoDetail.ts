import { Component,OnInit } from '@angular/core';
import { NavController, NavParams ,MenuController,ActionSheetController  } from 'ionic-angular';
import { CommonService } from '../../service/CommonService';
import { PhotoPage } from './photo';
import { DbService } from '../../service/DbService';

declare var myalbum :any;

@Component({
  selector: 'sys-photo-detail',
  templateUrl: 'sysPhotoDetail.html'
})
export class SysPhotoDetailPage implements OnInit{

  item:any;

  albumList:Array<any>;

  disabled:boolean=false;

  constructor(public navCtrl: NavController,params: NavParams,public menuCtrl: MenuController,
              public actionSheetCtrl: ActionSheetController,public commonService:CommonService
              , public dbService:DbService) {
    this.item = params.data.item;
    this.disabled=!params.data.editable;
  }

  ngOnInit() {
    //this.disabled = true;
    this.updateAlbum();
    this.getFileInfo();
  }

  updateAlbum() {
    this.albumList=this.dbService.getAlbumDataQParams().albumList;
  }

  goBack() {
    this.navCtrl.pop();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  openPhoto() {
    this.navCtrl.push(PhotoPage,{item:this.item})
  }

  update() {
    if(this.item.albumId == null || this.item.albumId == ''){
      myalbum.ui.showAlert('请选择保存专辑');
      return;
    }
    console.log('Update');
    this.disabled=true;
    myalbum.db.insertTAlbumData(this.item).then((result)=>{
      console.log(result);
      this.goBack();
    },(err)=>{
      console.log(err);
      myalbum.ui.showAlert('更新失败');
      this.goBack();
    });
  }

  getFileInfo() {

    let doGetLocation = (it:any)=>{
      this.commonService.showLoading('取图片地址');
      if(it.longitude>0 && it.latitude>0) {
        this.commonService.getLocation(it.latitude,it.longitude).then((address)=>{
          this.item.address = address;
          this.item.latitude = it.latitude;
          this.item.longitude = it.longitude;
          //this.data.creationDate = item.creationDate;
          console.log(this.item.address);
          this.commonService.hideLoading();
        })
      }else {
        this.commonService.hideLoading();
      }
    };

    let fileUrl = this.item.photoURL;
    this.commonService.getFileInfo(fileUrl).then((it:any)=>{
      console.log(it);
      this.item.creationDate = it.creationDate;
      if(it.longitude == 0 || it.latitude==0) {
        this.commonService.showLoading('通过GPS取图片坐标');
        this.commonService.getPosition().then((position:any)=>{
          it.latitude=this.item.latitude = position.latitude;
          it.longitude=this.item.longitude = position.longitude;
          doGetLocation(it);
        })
      } else  {
        doGetLocation(it);
      }
    },(err)=>{
      console.log(err);
      this.commonService.hideLoading();
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '保存为',
          role: 'destructive',
          handler: () => {
            this.disabled=false;
            console.log('Edit');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            this.disabled=true;
            console.log('Cancel clicked');
            this.goBack();
          }
        }
      ]
    });

    actionSheet.present();
  }
}
