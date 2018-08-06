import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NavController, NavParams ,MenuController,ActionSheetController,PopoverController  } from 'ionic-angular';
import { CommonService } from '../../service/CommonService';
import { AlbumListPage } from './AlbumListPage';
import { DbService } from '../../service/DbService';
import {PhotoDetailPage} from '../photoDetail/photoDetail';

declare var myalbum :any;

@Component({

  selector:'photo',
  template:`    

      <ion-card no-padding (swipe)="swipe($event)">
        
      <div *ngIf="item.address" class="card-address" [hidden]="hiddenDesc">{{item.address}}</div>
      <div  *ngIf="item.creationDate" class="card-time" [hidden]="hiddenDesc">{{item.creationDate}}</div>
        
      <img *ngIf="item.photoURL&&(item.photoURL.endsWith('jpg') || item.photoURL.endsWith('jpeg'))"  [src]="item.photoURL | cdvphotolibrary" (click)="changePlay(item)" />
        
      <video #videoElt *ngIf="item.photoURL && item.photoURL.endsWith('mp4')" width='320' height='320' (click)="playVideo()"
      (loadedmetadata)="_initVideoView()" [src]="item.photoURL | cdvphotolibrary" type="video/mp4">
        Your browser does not support the video tag.
      </video>
        
      <ion-card-content class="cards-bg" [hidden]="hiddenDesc">
        <ion-card-title *ngIf="item.title && item.id!=mainItem.coverId" >
          {{item.title}}
        </ion-card-title>
        <ion-card-title *ngIf="item.id==mainItem.coverId" >
          {{mainItem.title}}
        </ion-card-title>
        <p *ngIf="item.desc && item.id!=mainItem.coverId">{{item.desc}} </p>
        <p *ngIf="item.id==mainItem.coverId">{{mainItem.desc}} </p>
      </ion-card-content>

      <!--<ion-row no-padding [hidden]="true">
        <ion-col text-right>
          <button ion-button clear small  icon-start (click)="photoDetail(item,true)">
            <ion-icon name='share-alt'></ion-icon>
            编辑
          </button>
          <button *ngIf="item.photoURL && (item.mediaType=='image' || item.mediaType==null)"  ion-button clear small  icon-start (click)="autoPlay(item)" [hidden]="!autoPlayFlag">
            <ion-icon name='share-alt'></ion-icon>
            播放
          </button>
          <button *ngIf="item.photoURL && (item.mediaType=='image' || item.mediaType==null)"  ion-button clear small  icon-start (click)="stopPlay()" [hidden]="autoPlayFlag">
            <ion-icon name='share-alt'></ion-icon>
            停止
          </button>
        </ion-col>
      </ion-row>-->

    </ion-card>
    
  `
})
export class PhotoPage implements OnInit{

  hiddenDesc:boolean=false;

  item:any;
  mainItem:any;
  index:number=0;

  swipe:Function;

  autoPlayTimer:any;
  autoPlayFlag:boolean = true;


  /**
   * video prop
   */
  playing:boolean=false;
  @ViewChild('videoElt') videoElt:ElementRef;

  @ViewChild('imgBox') imgBox:ElementRef;
  @ViewChild('imgElt') imgElt:ElementRef;

  @ViewChild('address') address:ElementRef;
  @ViewChild('creationDate') creationDate:ElementRef;

  constructor(public navCtrl: NavController,params: NavParams,public commonService:CommonService,public dbService:DbService) {
    this.mainItem = params.data.item;
    this.item = this.mainItem.datas[0];
    this.index=0;
    this.autoPlayFlag = params.data.autoPlay;
  }

  ngAfterViewInit(){

  }

  ionViewWillEnter(){

    /*let boxHeight = this.imgBox.nativeElement.offsetHeight; //高度
     let boxWidth = this.imgBox.nativeElement.offsetWidth; //宽度

     let imgHeight = this.imgElt.nativeElement.offsetHeight; //高度
     let imgWidth = this.imgElt.nativeElement.offsetWidth; //宽度

     let top = (boxHeight-imgHeight)/2;
     if(this.imgElt) {
     this.imgElt.nativeElement.style.top = top+'px';
     }

     if(this.address) {
     this.address.nativeElement.style.top = (top+35)+'px';
     }
     if(this.creationDate) {
     this.creationDate.nativeElement.style.top = (top+35)+'px';
     }*/

  }

  _initVideoView() {
    if(this.item.photoURL && this.item.photoURL.endsWith('mp4') && !!this.videoElt){
      this.videoElt.nativeElement.currentTime=0.1;
      /*this.videoElt.nativeElement.addEventListener('ended',() =>{
        this.playing=false;
        this.videoElt.nativeElement['x5-video-player-fullscreen']='';
        this.videoElt.nativeElement['webkit-playsinline']='';
        this.videoElt.nativeElement['playsinline']='';
      },false);*/
    }

  }

  ngOnInit() {

   let swipe1 = (event)=>{
      //console.log(event);
      //向左滑
      let self = this;
      if(event.direction==2){
        this.showNext();
      }else if(event.direction==4){
        if(this.index == 0){
          let it = this.dbService.preAlbumData(this.mainItem);
          if(it) {
            this.mainItem = it;
            this.index = this.mainItem.datas.length;
            this.item = this.mainItem.datas[--this.index];
          }
        }else {
          this.item = this.mainItem.datas[--this.index];
        }
      }
     //this._initVideoView();
    }

    this.swipe = swipe1.bind(this);

    if(this.autoPlayFlag){
      this.autoPlay();
    }

  }

  playVideo(){
    this.playing=!this.playing;
    if(this.playing){
      this.videoElt.nativeElement.play();
    } else {
      this.videoElt.nativeElement.pause();
    }
  }

  changePlay(){
    if(this.autoPlayFlag){
      this.autoPlayFlag=false;
      this.stopPlay();
    }else {
      this.autoPlayFlag=true;
      this.autoPlay();
    }
  }

  showNext() {

    let next = ()=>{
      if(this.mainItem) {
        this.item = this.mainItem.datas[++this.index];
      }
    }

    if(this.index < this.mainItem.datas.length-1) {
        next();
    } else {
      this.dbService.nextAlbumData(this.mainItem,this.commonService).then((it:any)=>{
        this.mainItem=it;
        this.index=-1;
        next();
      },()=>{
        this.mainItem= this.dbService.firstAlbumData();
        this.index=-1;
        next();
      });
    }
  }

  autoPlay(){
    this.autoPlayTimer = setInterval(()=>{
      this.showNext();
    },3000);
  }

  stopPlay(){
    if(this.autoPlayTimer){
       clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  showOther(){
    this.hiddenDesc = !this.hiddenDesc;
  }


  ionViewDidEnter(){
    //(<any>window).StatusBar.show();

  }

  photoDetail(item:any,editable:boolean) {
    this.navCtrl.push(PhotoDetailPage,{ item:item,editable:editable });
  }


}
