import { Component ,OnInit,Input,ElementRef, ViewChild} from '@angular/core';
import { DbService } from '../../service/DbService';
import { CommonService } from '../../service/CommonService';

@Component({
  selector: 'album-video',
  template: `
   
    <div *ngIf="item.address" class="card-address">{{item.address}}</div>
    <div  *ngIf="item.creationDate" class="card-time">{{item.creationDate}}</div>
    
    <video #videoElt (click)="doClickAction()" width='320' height='320'>
      <source [src]="item.photoURL | cdvphotolibrary" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <ion-card-content class="cards-bg">
      <ion-card-title *ngIf="item.title" >
        {{item.title}}
      </ion-card-title>
      <p *ngIf="item.desc">{{item.desc}} </p>
    </ion-card-content>

    <ion-row no-padding [hidden]="hiddenActBar">
      <ion-col text-right>
        <button ion-button clear small  icon-start (click)="photoDetail(item,true)">
          <ion-icon name='share-alt'></ion-icon>
          编辑
        </button>
        <button ion-button clear small  icon-start (click)="fullPlay()" [hidden]="autoPlayFlag">
          <ion-icon name='share-alt'></ion-icon>
          播放
        </button>
      </ion-col>
    </ion-row>
    
   
  `
})
export class VideoPage implements OnInit{

  @Input('it')
  item:any={};

  @Input('autoPlayFlag')
  autoPlayFlag:boolean=false;

  @ViewChild('videoElt') videoElt:ElementRef;

  playing:boolean = false;
  constructor(public dbService:DbService, public commonService:CommonService) {

  }

  ngOnInit() {
    this.videoElt.nativeElement.currentTime=0.01;
    this.videoElt.nativeElement.addEventListener('ended',() =>{
      this.playing=false;
      this.videoElt.nativeElement['x5-video-player-fullscreen']='';
      this.videoElt.nativeElement['webkit-playsinline']='';
      this.videoElt.nativeElement['playsinline']='';
    },false);
  }

  doClickAction(){
    this.playing=!this.playing;
    if(this.playing){
      this.videoElt.nativeElement.play();
    } else {
      this.videoElt.nativeElement.pause();
    }
  }

  fullPlay(){
    this.videoElt.nativeElement['x5-video-player-fullscreen']='true';
    this.videoElt.nativeElement['webkit-playsinline']='true';
    this.videoElt.nativeElement['playsinline']='true';

    if(!this.playing){
      this.playing=true;
      this.videoElt.nativeElement.play();
    }
  }

}
