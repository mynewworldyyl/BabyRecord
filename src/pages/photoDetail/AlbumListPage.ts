import { Component, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, NavParams,ViewController } from 'ionic-angular';
import { DbService } from '../../service/DbService';

@Component({
  template: `
    <ion-list class="popover-page">
      <ion-item>
        <ion-label>Album</ion-label>
        <ion-select [(ngModel)]="albumId" >
          <ion-option *ngFor="let n of albumList" value="{{n.id}}">{{n.name}}</ion-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <button ion-button full  (click)="changeAlbum()">确定</button>
  `
})
export class AlbumListPage {

  albumList:any=[];
  albumId:number;
  data:any;
  constructor(private navParams: NavParams, public dbService:DbService,public viewCtrl: ViewController) {
    this.data = this.navParams.data;
  }

  ngOnInit() {
    this.updateAlbum();
  }

  changeAlbum() {
    this.data.albumChange(this.albumId);
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  updateAlbum() {
    this.albumList=this.dbService.getAlbumDataQParams().albumList;
  }

}

