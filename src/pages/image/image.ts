import { Component ,OnInit,Input,ElementRef, ViewChild} from '@angular/core';
import { DbService } from '../../service/DbService';
import { CommonService } from '../../service/CommonService';
import { NavController } from 'ionic-angular';
import { PhotoPage } from '../photoDetail/photo';
import { TakerPage } from '../Taker/taker';
import { SysPhotoDetailPage } from '../photoDetail/sysPhotoDetail';
import { BBService } from '../../service/BBService';
import { PhotoSwipePage } from '../photoSwipe/PhotoSwipe';

@Component({
  selector: 'album-image',
  template: `
    <div *ngIf="item.address" class="card-address"  [hidden]="hiddenDesc">{{item.address}}</div>
    <div  *ngIf="item.creationDate" class="card-time" [hidden]="hiddenDesc">{{ageInfo.ageInfo}}</div>
    <div  *ngIf="item.datas" class="card-num">{{item.datas.length}}</div>
    
    <img #imageElt *ngIf="item.photoURL&&(item.photoURL.endsWith('jpg') || item.photoURL.endsWith('jpeg'))"  [src]="item.photoURL | cdvphotolibrary" />
    
    <video #videoElt *ngIf="item.photoURL && item.photoURL.endsWith('mp4')" width='320' height='320' (click)="playVideo()">
      <source [src]="item.photoURL | cdvphotolibrary" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    
    <ion-card-content class="cards-bg">
      <ion-card-title *ngIf="item.title" [hidden]="hiddenDesc">
        {{item.title}}
      </ion-card-title>
      <p *ngIf="item.desc" [hidden]="hiddenDesc">{{item.desc}} </p>
    </ion-card-content>

    <ion-row no-padding [hidden]="hiddenActBar" style="z-index: 10000">
      <ion-col text-right style="z-index: 10000">
        <button ion-button clear small  icon-start (click)="photoDetail(item,true)">
          <ion-icon name='share-alt'></ion-icon>
          编辑
        </button>
        <button ion-button clear small  icon-start (click)="openPhoto(false,item)" [hidden]="autoPlayFlag">
          <ion-icon name='share-alt'></ion-icon>
          查看
        </button>
        <button ion-button clear small  icon-start (click)="stopPlay()" [hidden]="!autoPlayFlag">
          <ion-icon name='share-alt'></ion-icon>
          停止
        </button>
      </ion-col>
    </ion-row>
  `
})
export class ImagePage implements OnInit{

  @Input('it')
  item:any={};

  @Input()
  hiddenDesc:boolean=false;

  @Input()
  hiddenActBar:boolean=false;

  @Input()
  canView:boolean=false;

  @ViewChild('imageElt') imageElt:ElementRef;

  playing:boolean=false;
  @ViewChild('videoElt') videoElt:ElementRef;

  autoPlayFlag:boolean=false;
  ageInfo:any={};

  //playing:boolean = false;
  constructor(public dbService:DbService, public commonService:CommonService,public navCtrl: NavController,public bbService:BBService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    if(this.item.creationDate){
      this.bbService.parseAge(this.item.creationDate).then(info=>{
        this.ageInfo = info;
      });
    }
    if(this.videoElt){
      this.videoElt.nativeElement.currentTime=0.01;
      this.videoElt.nativeElement.addEventListener('ended',() =>{
        this.playing=false;
        this.videoElt.nativeElement['x5-video-player-fullscreen']='';
        this.videoElt.nativeElement['webkit-playsinline']='';
        this.videoElt.nativeElement['playsinline']='';
      },false);
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

  openPhoto(autoPlay:boolean=false,item:any) {
    if(this.canView){
      //this.navCtrl.push(PhotoPage,{item,autoPlay});
      this.navCtrl.push(PhotoSwipePage,{item});
    }
  }

  photoDetail(item:any,editable:boolean) {
    let qparams = this.dbService.getAlbumDataQParams();
    this.dbService.resetAlbumData();
    console.log();
    if(qparams.sysDisabled){
      this.navCtrl.push(SysPhotoDetailPage,{ item:item,editable:editable });
    } else {
      //this.navCtrl.push(PhotoDetailPage,{ item:item,editable:editable });
      this.navCtrl.push(TakerPage,{ item:item,editable:editable });
    }
  }

}
