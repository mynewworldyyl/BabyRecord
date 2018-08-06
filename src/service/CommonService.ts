/**
 * Created by yanxiaojun617@163.com on 01-03.
 */
import {Injectable,ViewChild} from '@angular/core';
import {NavController,ToastController, LoadingController,AlertController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
/*import { PhotoLibrary,LibraryItem } from '@ionic-native/photo-library';*/
import { ImagePicker } from '@ionic-native/image-picker';
declare var cordova:any;
declare var BMap :any;
declare var MediaPicker :any;
declare var myalbum :any;

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



@Injectable()
export class CommonService {

   nav: NavController

   MediaTypeImage:string = 'image';
   MediaTypeVideo:string = 'video';
   MediaTypeAudio:string = 'audio';

  private toast;
  private loading;

  backButtonListeners:Map<string,Function> = new Map();

  eventListener:Map<string,Set<Function>> = new Map();

  constructor(/*public photoLibrary:PhotoLibrary,*/private toastCtrl: ToastController, private loadingCtrl: LoadingController,
              private camera: Camera,public plt: Platform,private alertCtrl: AlertController,private geolocation:Geolocation
  ,private mediaCapture: MediaCapture,private imagePicker: ImagePicker) {
    /*this.plt.ready().then(() => {

    });*/
  }

  deviceReady(){
    console.log('deviceready IN CommonService');
    document.addEventListener("pause", ()=>{
      console.log('pause');
    }, false);
    document.addEventListener("resume", ()=>{
      console.log('resume');
    }, false);
    document.addEventListener("menubutton", ()=>{
      console.log('menubutton');
    }, false);
    this.triggerEvent('refresh',[]);
  }

  triggerEvent(evt:string,args:any){
    let lis = this.eventListener.get(evt);
    if(!lis) {
     return;
    }
    lis.forEach((fnt)=>{
      fnt(args);
    })
  }

  regListener(evt:string,fnt:Function){
      let lis = this.eventListener.get(evt);
      if(!lis) {
        lis = new Set<Function>();
        this.eventListener.set(evt,lis);
      }
      lis.add(fnt);
  }

  unRegListener(evt:string,fnt:Function){
    let lis = this.eventListener.get(evt);
    if(!lis) {
     return;
    }
    lis.delete(fnt);
  }

  triggerBackButtonAction() {
    let flag = false;
    this.backButtonListeners.forEach((fnt)=>{
      flag = fnt();
    })
    return flag;
  }

  registerBackButtonListener(key:string,listener:Function) {
    this.backButtonListeners.set(key,listener);
  }
  unRegisterBackButtonAction(key:string) {
    this.backButtonListeners.delete(key);
  }

  isPcBrowser() {
    /*let u = window.navigator.userAgent, app = window.navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    //var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    return !(isAndroid /!*|| isIOS*!/)*/
    return !this.plt.is('android');
  }

  formatDate(date,fmt){
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast = (message: string = '操作完成', duration: number = 2500) => {
    this.toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: '关闭'
    });
    this.toast.present();
  };

  /**
   * 关闭信息提示框
   */
  hideToast = () => {
    this.toast.dismissAll()
  };

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading = (content: string = '') => {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
    setTimeout(() => {//最长显示20秒
      this.hideLoading();
    }, 1000*10);
  };

  /**
   * 关闭loading
   */
  hideLoading = () => {
    if(this.loading){
      this.loading.dismissAll();
    }
  };

  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture = (options) => {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(Object.assign({
        //sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
        destinationType: this.camera.DestinationType.NATIVE_URI,//返回值格式,DATA_URL:base64,FILE_URI:图片路径,NATIVE_URI
        quality: 100,//保存的图像质量，范围为0 - 100
        allowEdit: false,//选择图片前是否允许编辑
        encodingType: this.camera.EncodingType.JPEG,
        //targetWidth: 800,//缩放图像的宽度（像素）
        //targetHeight: 800,//缩放图像的高度（像素）
        saveToPhotoAlbum: false,//是否保存到相册
        correctOrientation: false//设置摄像机拍摄的图像是否为正确的方向
      }, options)).then((imageData) => {
        resolve(imageData);
      }, (err) => {
        console.log(err);
        err == 20 ? this.showToast('没有权限,请在设置中开启权限') : reject(err);
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
  getPictureByCamera = (options = {}) => {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: false,
      }, options)).then(imageBase64 => {
        resolve(imageBase64);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
      });
    });
  };

  getFileInfo = (fileUrl:string) => {
    return new Promise((resolve,reje) => {
      if(this.isPcBrowser()) {
        resolve( this._pcTestTake(this.MediaTypeImage))
      } else {
        cordova.plugins.albumplugin.fileInfo(fileUrl,(item)=>{
          //console.log(item);
          if(item.longitude == 0 || item.latitude==0) {
            this.showLoading('查询位置信息');
            item.fullPath = fileUrl;
            this.getPosition().then((position:any)=>{
              item.latitude= position.latitude;
              item.longitude= position.longitude;
             this.getLocation(position.latitude,position.longitude).then((address)=>{
               item.address=address;
               resolve(item);
             },(err) =>{
               reje(err);
             })
            },(err) =>{
              reje(err);
            })
          } else  {
            this.getLocation(item.latitude,item.longitude).then((address)=>{
              item.address=address;
              resolve(item);
            },(err) =>{
              reje(err);
            })
          }
        },(err)=>{
          console.log(err);
          reje(err);
        });
      }
    });
  };

  queryFileList = (albumId,offset,limit,year,month) => {
    return new Promise((resolve,reje) => {
      if(this.isPcBrowser()) {
        resolve([{
          creationDate: "2018-01-24T19:38:28.000Z",
          latitude:22.583942413330078,
          longitude: 113.87908172607422,
          nativeURL:'assets/imgs/logo.png'
        }]);
      } else {
        cordova.plugins.albumplugin.queryFileList(albumId,offset,limit,year,month,(items)=>{
          resolve(items);
        },(err)=>{
          console.log(err);
          reje(err);
        });
      }
    });
  };

  _pcTestTake(mediaType) {
    if(this.isPcBrowser()) {
      let mediaFile = 'assets/imgs/20180227_003.amr';

      if(mediaType == this.MediaTypeVideo){
        mediaFile = 'assets/imgs/e6e8a3deaa49e336d7e11d87bdad3402.mp4';
      }else if(mediaType == this.MediaTypeImage){
        mediaFile = 'assets/imgs/20180118153908.jpg';
      }/*else {
        mediaFile = 'assets/imgs/20180227_003.amr';
      }*/
      return {
        creationDate:this.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
        fileName:mediaFile,
        height:400,
        width:400,
        //id:"409279;/storage/emulated/0/Pictures/myalbum/2018-0-23-1.jpg",
        //id:mediaFile,
          latitude:22.5839424133301,
         longitude:113.879081726074,
        /*latitude:0,
        longitude:0,*/
        //photoURL:"assets/imgs/20180118153908.jpg",
        fullPath:mediaFile,
        photoURL:mediaFile,
        //photoURL:"assets/imgs/logo.png",
        //photoURL:"assets/imgs/20180118153908.jpg",
        address:'广东省，深圳市，宝安区，西乡，宝民二路，143号,青春庭园E405',
        thumbnailURL:"cdvphotolibrary://thumbnail?photoId=409279%3B%2Fstorage%2Femulated%2F0%2FPictures%2Fmyalbum%2F2018-0-23-1.jpg&width=512&height=384&quality=0.5",
      };
    }
  }

  loadSysAlbums() {

    return new Promise((reso,reje)=> {
      if(this.isPcBrowser()) {
        reso( [ {
          title: "sys1",
          id:1,
        }, {
          title: "sys2",
          id:2,
        }]
       )
      } else {
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
    })
  }

  deleteFile = (fileUrl:string) => {
    return new Promise((resolve,reje) => {
      if(this.isPcBrowser()) {
        resolve(1)
      } else {
        cordova.plugins.albumplugin.deleteFile(fileUrl,(result)=>{
          //console.log(item);
          resolve(result);
        },(err)=>{
          reje(err);
        });
      }
    });
  };

  comfirm(desc) {
    return new Promise((reso,reje)=>{
        let actionSheet = this.alertCtrl.create({
          title: desc,
          buttons: [
            {
              text: '确定',
              role: 'destructive',
              handler: () => {
                reso(0);
              }
            },{
              text: '取消',
              role: 'cancel',
              handler: () => {
                reje(-1);
              }
            }
          ]
        });
        actionSheet.present();
      }
    )
  }

  getPosition(){
    return new Promise((reso,reje)=>{
      if (window.navigator.geolocation) {
        //this.photoLibrary.requestAuthorization().then(() => {
        this.geolocation.getCurrentPosition({
          // 指示浏览器获取高精度的位置，默认为false
          enableHighAccuracy:true,
          // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          timeout: 1000000,
          // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
          maximumAge: 1000000
        }).then((position) => {
          // resp.coords.latitude
          // resp.coords.longitude
          var coords = position.coords;
          reso(coords);
        }).catch((error) => {
          console.log('Error getting location', error);
          reje(null);
        });
      }else{
        reje(null);
      }
    })

  }

  getLocation(latitude,longitude){
    /**
     'https://api.map.baidu.com/api?v=2.0&ak=dKqGUl2S27pplI6xMSas11AB'
     (function(){
     window.HOST_TYPE = "2";
     window.BMap_loadScriptTime = (new Date).getTime();
     document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=2.0&ak=dKqGUl2S27pplI6xMSas11AB&services=&t=20180201111639">
     </script>');})();
     */
    return new Promise((reso,reje)=> {
      myalbum.ui.loadJS('https://api.map.baidu.com/getscript?v=2.0&ak=dKqGUl2S27pplI6xMSas11AB&services=&t=20180201111639')
        .then(()=>{
          let myGeo = new BMap.Geocoder();
          let gpsPoint = new BMap.Point(longitude,latitude);
          let convertor = new BMap.Convertor();
          let pointArr = [];
          pointArr.push(gpsPoint);
          convertor.translate(pointArr, 1, 5,  (baiduPoints) => {
            myGeo.getLocation(baiduPoints.points[0],  (rs) => {
              let addComp = rs.addressComponents;
              let address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
              console.log(address);
              reso(address);
            },err=>{
              reje(err);
            });
          },err=>{
            reje(err);
          })
        },(err)=>{
          reje(err);
        });

    })
  }

  getImages() {
    return new Promise((reso, reje) => {

      if(this.isPcBrowser()){
        reso([this._pcTestTake(this.MediaTypeImage)]);
      }else {
        let options = {maximumImagesCount:3,outputType:2};
        this.imagePicker.getPictures(options).then( (results: MediaFile[]) => {
            let cnt = 0;
            let datas = [];
            for (var i = 0; i < results.length; i++) {
              this.__getPositionAndLocation({fullPath:results[i]},dd=>{
                datas.push(dd);
                cnt++;
                if(cnt == results.length){
                  reso(datas);
                  this.hideLoading();
                }
              },err=>{
                reje(err);
              });
            }
          },
          err=>{
            this.__failCb(err,reje);
          });
      }
    })
  }

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
  captureImage() {
    return new Promise((reso, reje) => {

      if(this.isPcBrowser()){
        reso(this._pcTestTake(this.MediaTypeImage));
       }else {
        let options: CaptureImageOptions = { limit: 1 };
        this.mediaCapture.captureImage(options)
          .then(
            (data: MediaFile[]) => {
              this.__getPositionAndLocation(data[0],reso,reje);
            },
            err=>{
              this.__failCb(err,reje);
            }
          );
      }
    })
  }

  __failCb=(err:any,reje) => {
    reje(err);
    this.hideLoading();
  }

  __getPositionAndLocation(data:any,reso,reje) {
    let result = data;
    result.creationDate = this.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
    this.showLoading('收集位置信息');
    if(!!data.fullPath&& (data.fullPath.endsWith('jpg') ||data.fullPath.endsWith('jpeg') || data.fullPath.endsWith('mp4') )) {
      this.getFileInfo(data.fullPath).then((it:any)=>{
        result.creationDate = it.creationDate;
        result.latitude = it.latitude;
        result.longitude = it.longitude;
        result.address = it.address;
        this.hideLoading();
        reso(result);
      },(err)=>{
        console.log(err);
        this.hideLoading();
        reje(err);
      });
    } else {
      this.getPosition().then((position:any)=>{
        result.latitude = position.latitude;
        result.longitude = position.longitude;
        this.getLocation(position.latitude,position.longitude).then(address=>{
          result.address = address;
          reso(result);
          this.hideLoading();
        },err=>{
          this.__failCb(err,reje);
        });
      },err=>{
        this.__failCb(err,reje);
      });
    }


  }
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
  captureAudio() {
    return new Promise((reso, reje) => {
      if(this.isPcBrowser()){
         this._pcTestTake(this.MediaTypeAudio);
       }else {
        let options: CaptureImageOptions = { limit: 1 };
        this.mediaCapture.captureAudio(options)
          .then(
            (data: MediaFile[]) => {
              this.__getPositionAndLocation(data[0],reso,reje);
            },
            err=>{
              this.__failCb(err,reje);
            }
          );
      }

    })
  }

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
  captureVideo() {
    return new Promise((reso, reje) => {
      if(this.isPcBrowser()){
        reso(this._pcTestTake(this.MediaTypeVideo));
      }else {
        let options: CaptureImageOptions = { limit: 1 };
        this.mediaCapture.captureVideo(options)
          .then(
            (data: MediaFile[]) => {
              this.__getPositionAndLocation(data[0],reso,reje);
            },
            err=>{
              this.__failCb(err,reje);
            }
          );
      }

    })
  }

  saveMedia(mediaFile:string,albumName) {
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

  }

  selectMedia(){
    var args={ 'showThumbnail':true,
      'selectMode':101,//101=PICKER_IMAGE_VIDEO , 100=PICKER_IMAGE , 102=PICKER_VIDEO
      'maxSelectCount':10, //default 40 (Optional)
      'maxSelectSize':188743680//188743680=180M (Optional)
    };

    return new Promise((reso,reje)=>{

      if(this.isPcBrowser()){
        reso([this._pcTestTake(this.MediaTypeImage)]);
      }else {
        MediaPicker.getMedias(args,results=>{
          //dataArray [{mediaType: "image",rotate: 90, path:'/storage/emulated/0/DCIM/Camera/20170808_145202.jpg' thumbnailBase64: '9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEB'}]
          let cnt = 0;
          let datas = [];
          for (var i = 0; i < results.length; i++) {
            var item = results[i];
            this.__getPositionAndLocation({fullPath:item.path},dd=>{
              dd.thumbnailURL=item.thumbnailBase64;
              datas.push(dd);
              cnt++;
              if(cnt == results.length){
                reso(datas);
              }
            },err=>{
              reje(err);
            });
          }
        },err=>{
          this.__failCb(err,reje);
      })

      }
  })

  }

}
