import { Component, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, NavParams,ViewController } from 'ionic-angular';
import { DbService } from '../../service/DbService';
import { CommonService } from '../../service/CommonService';
import { BBService } from '../../service/BBService';
@Component({
  template: `    
      <ion-list  class="popover-page">

        <ion-item>
          <ion-label>系统专辑</ion-label>
          <ion-toggle [(ngModel)]="sysDisabled"></ion-toggle>
        </ion-item>
        <ion-item >
          <ion-label>宝宝名称</ion-label>
          <ion-select [(ngModel)]="params.albumId" [disabled]="sysDisabled">
            <ion-option *ngFor="let n of albumList" value="{{n.id}}">{{n.name}}</ion-option>
          </ion-select>
        </ion-item>
        <ion-item >
          <ion-label>系统专辑</ion-label>
          <ion-select [(ngModel)]="params.sysAlbumId" [disabled]="!sysDisabled">
            <ion-option *ngFor="let n of sysAlbumList" value="{{n.id}}">{{n.title}}</ion-option>
          </ion-select>
        </ion-item>
        
        <ion-item>
          <ion-label>按年</ion-label>
          <ion-toggle [(ngModel)]="yearDisabled" [disabled]="monthDisabled"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>年</ion-label>
          <ion-datetime displayFormat="YYYY" [(ngModel)]="params.year" [disabled]="!yearDisabled"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label>按月</ion-label>
          <ion-toggle [(ngModel)]="monthDisabled" [disabled]="yearDisabled"></ion-toggle>
        </ion-item>
        <ion-item >
          <ion-label>月</ion-label>
          <ion-datetime displayFormat="YYYY-MM" [(ngModel)]="params.month" [disabled]="!monthDisabled"></ion-datetime>
        </ion-item>
        <button ion-button full (click)="finish()">完成</button>
       <!-- <button ion-button full (click)="clear()">清除</button>-->
      </ion-list>
    
  `
})
export class QueryPage {

  albumList:any=[];
  sysAlbumList:any=[];
  params:any;

  monthDisabled:boolean=false;
  yearDisabled:boolean=true;

  sysDisabled:boolean=true;

  constructor(private navParams: NavParams, public dbService:DbService,public viewCtrl: ViewController,public commonService:CommonService
    ,public bbService:BBService) {

  }

  ngOnInit() {
    this.updateAlbum();
    this.params = this.dbService.getAlbumDataQParams();
    this.albumList = this.params.albumList;
    this.monthDisabled = this.params.monthDisabled;
    this.yearDisabled = this.params.yearDisabled;
    this.sysDisabled = this.params.sysDisabled;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  finish(){
    this.close();
    this.params.monthDisabled = this.monthDisabled;
    this.params.yearDisabled = this.yearDisabled;
    this.params.sysDisabled = this.sysDisabled;

    if(this.params.sysDisabled){
      for(let i=0; i < this.sysAlbumList.length;i++) {
        if(this.sysAlbumList[i].id == this.params.sysAlbumId){
          this.params.albumName=this.sysAlbumList[i].title;
          break;
        }
      }
    } else {
      for(let i=0; i < this.albumList.length;i++) {
        if(this.albumList[i].id == this.params.albumId){
          this.params.album=this.albumList[i].name;
          break;
        }
      }
    }

    this.navParams.data.finish();
  }

  updateAlbum() {
    this.commonService.loadSysAlbums().then((items:any) =>{
      console.log(items);
      let al = [];
      for(let i = 0; i < items.length; i++){
        let sysn = items[i];
        al.push(sysn);
      }
      this.sysAlbumList=al;
    })
  }

}

