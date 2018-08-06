import { Component ,OnInit} from '@angular/core';
import { NavController,AlertController, NavParams } from 'ionic-angular';
import { DbService } from '../../service/DbService';
import { CommonService } from '../../service/CommonService';
import { BBService } from '../../service/BBService';

declare var myalbum :any;
declare var MediaPicker :any;

@Component({
  selector: 'taker',
  templateUrl: 'taker.html'
})
export class TakerPage implements OnInit{

  mainData:any = {
    title:'', desc:'', address:'', latitude:0, longitude:0,
    creationDate:'', albumId:'', coverId:''
  }

  mainItem:any;

  albumList:Array<any>;

  change:boolean=false;

  datas:Array<any>=[];

  deleteItem:Array<any>=[];

  //editAddress:boolean = false;

  constructor(public bbService:BBService,public navCtrl: NavController, private alertCtrl: AlertController, public dbService:DbService,
     public commonService:CommonService,params: NavParams,) {
    if(params.data && params.data.item) {
      this.mainData = params.data.item;
      this.datas = this.mainData.datas;
      if(!!this.datas && this.datas.length > 0){
        for(let i = 0; i < this.datas.length; i++){
          if(this.datas[i].id == this.mainData.coverId){
            this.mainItem = this.datas[i];
          }
        }
      }
    }else {
      this.mainData.albumId=dbService.getAlbumDataQParams().albumId;
    }

    //this.editAddress = params.data.editable;
  }

  ngOnInit() {
    this.updateAlbum();

    if(this.commonService.isPcBrowser()) {
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

  }

  createAlbum() {
    let alert = this.alertCtrl.create({
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
          handler: data => {
            console.log('Cancel clicked');
            myalbum.ui.showAlert('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.addAlbum(data);
          }
        }
      ]
    });
    this.commonService.registerBackButtonListener('alert',()=>{
      alert.dismiss();
      this.commonService.unRegisterBackButtonAction('alert');
      return true;
    });
    alert.present();
  }

  addAlbum(data){
    //this.albumList.push(data.name);
    data.dir = '';
    myalbum.db.insertTAlbum(data).then(data => {
      this.updateAlbum();
    },err=>{
      myalbum.ui.showAlert('Error');
    });
  }

  saveAlbumCluster() {
    return new Promise((reso,reje)=>{
      if(this.mainItem && this.mainItem.id){
        this.mainData.coverId = this.mainItem.id;
      }else {
        reje('封面不能为空');
      }
      let persisCd:any = {
        albumId:this.mainData.albumId,
        coverId:this.mainData.coverId,
        creationDate:this.mainData.creationDate,
        title:this.mainData.title,
        desc:this.mainData.desc,
        latitude:this.mainData.latitude,
        longitude:this.mainData.longitude,
        address:this.mainData.address,
      }
      if(this.mainData.id){
        persisCd.id = this.mainData.id;
      }
      myalbum.db.insertOrUpdate(myalbum.db.TAlbumCluster,persisCd).then((clusterItem:any)=>{
        //save TAlbumCluster success
        if(!this.mainData.id){
          this.mainData.id = clusterItem.id;
        }
        reso(this.mainData);
      },err=>{
        //save TAlbumCluster failure
        console.log(err);
        this.commonService.hideLoading();
        reje(err);
      });

    })

  }

  doSaveAlbumData(dd){
    return new Promise((reso,reje)=>{
      let saveOrUpdate = (albumFileItem:any) => {
        //save album data
        if(albumFileItem){
          dd.mediaId = albumFileItem.id+'';
          if(albumFileItem.nativeURL){
            dd.photoURL = albumFileItem.nativeURL;
          }
          dd.thumbnailURL = albumFileItem.thumbnailURL;
          dd.creationDate = albumFileItem.creationDate;
          dd.fileName = albumFileItem.fileName;
          dd.height = albumFileItem.height;
          dd.width = albumFileItem.width;
        }
        myalbum.db.insertOrUpdate(myalbum.db.TAlbumData, dd).then((albumDataItem:any) => {
          //save album data success
          reso(albumDataItem);
        },err=>{
          reje(err);
        });
      }
      if(!dd.id){
        //dd.photoURL = this.getFilePath(dd.photoURL);
        this.commonService.saveMedia(dd.photoURL,this.getAlbum().name).then((albumFileItem:any)=>{
          saveOrUpdate(albumFileItem);
        },err=>{
          reje(err);
        });
      }else{
        saveOrUpdate(null);
      }
    })
  }


  /*getFilePath(purl:string){
    if(purl.indexOf('?') > 0) {
      purl = purl.substr(0,purl.indexOf('?'));
    }
    if(!purl.startsWith('file:')){
      purl = 'file:///'+purl;
    }
    return purl;
  }*/

  getAlbum(){
    if(!this.mainData.albumId){
      return null;
    }
    let album:any;
    for(let i=0; i < this.albumList.length;i++) {
      if(this.albumList[i].id ==this.mainData.albumId ){
        album = this.albumList[i];
        break;
      }
    }
    return album;
  }

  saveOrUpdate(){

    if(!this.commonService.isPcBrowser() && !this.change){
      myalbum.ui.showAlert('未选择图片或先先图片已经保存');
      //reje('未选择图片或先先图片已经保存');
      return;
    }

    if(this.mainData.albumId == 0){
      myalbum.ui.showAlert('未选择专辑');
      return;
    }

    if(/*!this.mainData.photoURL || */!this.mainItem){
      myalbum.ui.showAlert('未选择封面');
      return;
    }

    this.commonService.showLoading('保存数据');

    let albumDataIds = [];
    for(let i = 0; i < this.deleteItem.length; i++){
      albumDataIds.push(this.deleteItem[i].id);
    }

    if(albumDataIds.length > 0){
      myalbum.db.deleteAlbumClusterData(this.mainData.id,albumDataIds);
      myalbum.db.deleteById(myalbum.db.TAlbumData,albumDataIds);
    }

    this.saveAlbumData().then(() =>{
      console.log();
      this.saveAlbumCluster().then((clusterItem:any)=>{
        let cnt=0;
        for(let i = 0; i < this.datas.length; i++){
          let albumData = this.datas[i];
          myalbum.db.saveOrUpdateTAlbumClusterData({clusterId:clusterItem.id,albumDataId:albumData.id}).then((cdata:any)=>{
            //save TalbumClusterData success
            cnt++;
            if(cnt == this.datas.length){
              this.commonService.hideLoading();
            }
          },err=>{
            //save TAlbumCluster failure
            console.log(err);
            cnt++;
            if(cnt == this.datas.length){
              this.commonService.hideLoading();
              this.commonService.triggerEvent('refresh',null);
            }
          });
        }
      },err=>{
        console.log(err);
        this.commonService.hideLoading();
        myalbum.ui.showAlert('保存失败');
      })

    },err=>{
      this.commonService.hideLoading();
      myalbum.ui.showAlert('保存失败');
    });

  }


  saveAlbumData(){
    return new Promise((reso,reje)=>{
      if(!this.commonService.isPcBrowser() && !this.change){
        myalbum.ui.showAlert('未选择图片或先先图片已经保存');
        return;
      }

      let cnt = 0;
      let saveOne = (dd) => {
        this.doSaveAlbumData(dd).then((albumData:any)=>{
          if(!dd.id){
            dd.id= albumData.id;
          }
          cnt++;
          if(cnt == this.datas.length){
            reso(this.datas);
          }
        },err=>{
          console.log(err);
          reje(err);
        })
      }

      for(let i = 0; i < this.datas.length; i++){
        let dd = this.datas[i];
        saveOne(dd);
      }
    })

  }

  updateAlbum() {
    this.albumList = this.dbService.getAlbumDataQParams().albumList;
   /* this.bbService.selectTAlbum().then((albums)=>{
      this.albumList=albums;
    },(err)=>{
      this.albumList=[];
    });*/
  }

  getPhotoSource() {
    return new Promise((reso,reje)=>{
      let actionSheet = this.alertCtrl.create({
        title: '媒体源',
        buttons: [
          {
            text: '相册',
            role: 'destructive',
            handler: () => {
              reso(0);
            }
          },{
            text: '拍摄',
            handler: () => {
              reso(1);
            }
          },{
            text: '取消',
            role: 'cancel',
            handler: () => {
              reso(-1);
            }
          }
        ]
      });
      this.commonService.registerBackButtonListener('getPhotoSource',()=>{
        actionSheet.dismiss();
        this.commonService.unRegisterBackButtonAction('getPhotoSource');
        reso(-1);
        return true;
      });
      actionSheet.present();
    }
  )
}

  takePhoto() {
    //1拍照,0从图库选择
    var data:any = {};
    this.getPhotoSource().then(type =>{

      let successGetPicture = (item) => {
        console.log(item);
        //event.target.src = fileUrl;
        this.change=true;

        data.creationDate = item.creationDate;
        data.latitude = item.latitude;
        data.longitude = item.longitude;
        data.address = item.address;
        data.photoURL = item.fullPath;
        this.change = true;

        if(type == 1) {
          //拍照
          this.datas.push(data);
        } else if(type == 0) {
          //图库取得图片
          //去除重复图片
          let cnt = 0;
          let images:Array<any>= item;
          for(let i = 0; i < images.length;i++){
            let flag = false;
            for(let j = 0; j < this.datas.length;j++){
              if(this.datas[j].photoURL == images[i].fullPath){
                flag = true;
                cnt++;
                break;
              }
            }

            if(!flag){
              flag = false;
              images[i].photoURL = images[i].fullPath;
              this.datas.push(images[i]);
            }

          }
          if(cnt > 0){
            myalbum.ui.showAlert(cnt + '个重复文件，已自动去重');
          }
        } else if(type == 2) {
          //视频
          this.datas.push(data);
        }else if(type == 3) {
          //音频
          this.datas.push(data);
        }

        if(!this.mainItem && this.datas.length > 0){
          this.__setFirstPage(this.datas[0]);
        }

      }

      if (type == 1) {
        //this.commonService.getPictureByCamera(options).then(successGetPicture);
        this.commonService.captureImage().then(successGetPicture);
      } else if(type == 0) {
        //this.commonService.getImages().then(successGetPicture);
        this.commonService.selectMedia().then(successGetPicture);
      }else if(type == 2) {
        this.commonService.captureVideo().then(successGetPicture);
      }else if(type == 3) {
        this.commonService.captureAudio().then(successGetPicture);
      }
    })
  }

  __setFirstPage(item:any) {
    this.mainItem = item;
    this.mainData.creationDate = item.creationDate;
    this.mainData.latitude = item.latitude;
    this.mainData.longitude = item.longitude;
    this.mainData.address = item.address;
    //this.mainData.photoURL = item.photoURL;
    if(!!item.title){
      this.mainData.title = item.title;
    }
    if(!!item.desc){
      this.mainData.desc = item.desc;
    }
    if(!!item.id){
      this.mainData.coverId = item.id;
    }
    this.change=true;
  }

  __deleteItem(item:any) {
    if(item == this.mainItem || this.datas.length == 1){
      myalbum.ui.showAlert('封面不能删除');
      return;
    }
    if(item.id){
      this.deleteItem.push(item);
    }
    for (var i = 0; i < this.datas.length; i++) {
      if (this.datas[i] == item) {
        this.datas.splice(i,1);
        break;
      }
    }
    this.change=true;
  }

  setAsFirstPage(evt,item) {
    let takeAsFirstPage = this.alertCtrl.create({
      title: '设置为',
      buttons: [
        {
          text: '封面',
          handler: () => {
            this.__setFirstPage(item);
            console.log(evt);
          }
        },{
          text: '删除',
          handler: () => {
            this.__deleteItem(item);
            console.log(evt);
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log(evt);
          }
        }
      ]
    });
    this.commonService.registerBackButtonListener('setAsFirstPage',()=>{
      takeAsFirstPage.dismiss();
      this.commonService.unRegisterBackButtonAction('setAsFirstPage');
      return true;
    });
    takeAsFirstPage.present();
  }

  deleteCluster(){
    let albumDataIds = [];
    for(let i = 0; i < this.datas.length; i++){
      albumDataIds.push(this.datas[i].id);
    }

    myalbum.db.deleteAlbumClusterData(this.mainData.id,albumDataIds);
    myalbum.db.deleteById(myalbum.db.TAlbumData,albumDataIds);
    myalbum.db.deleteById(myalbum.db.TAlbumCluster,this.mainData.id);

    this.navCtrl.pop();
  }

  mainMenu() {
    let mm = this.alertCtrl.create({
      title: '操作',
      buttons: [
        {
          text: '保存',
          handler: () => {
           this.saveOrUpdate();
          }
        },{
          text: '删除',
          handler: () => {
            this.deleteCluster();
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    this.commonService.registerBackButtonListener('mainMenu',()=>{
      mm.dismiss();
      this.commonService.unRegisterBackButtonAction('mainMenu');
      return true;
    });
    mm.present();
  }

}
