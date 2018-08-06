import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {DbService} from '../../service/DbService';
import {CommonService} from '../../service/CommonService';
import {NavController, NavParams} from 'ionic-angular';
import {Gesture} from 'ionic-angular/gestures/gesture';

declare var PhotoSwipe, PhotoSwipeUI_Default;


const changeVal = 0;

@Component({
  selector: 'Rotate-Image',
  template: `
    <div #stage class="stage_area">
      <div #container class="container" (click)="clickRotate($event)">
        <img *ngFor="let it of items;let j=index"
             src="{{it.url}}" class="piece"
             [ngStyle]="setStyles(it,j)"/>
      </div>
    </div>
  `
})
export class RotateImagePage implements OnInit {

  mainItem: any;
  items: any;
  ang: number;
  indexPiece: number = 0;
  deg: number = 0;
  transforZ: number = 0;

  startX: number = 0;
  startY: number = 0;

  @ViewChild('stage') eleStage: ElementRef;
  @ViewChild('container') eleContainer: ElementRef;

  constructor(public navCtrl: NavController, params: NavParams, public commonService: CommonService, public dbService: DbService) {
    this.mainItem = params.data.item;
    this.items = this.mainItem.datas;
    this.indexPiece = 0;
    this.ang = 0;
  }

  setStyles(it, j) {
    let val = {
      width: it.w + 'px',
      height: it.h + 'px',
      transform: 'rotateY(' + j * this.deg + 'deg) translateZ(' + this.transforZ + 'px)'
    }
    return val;
  }

  ngOnInit() {
    this._cacDeg();
    this._calTranslateZ();
    this.eleContainer.nativeElement.style.width = this._maxWidth() + 'px';
    this.eleContainer.nativeElement.style.height = this._maxHeight() + 'px';
  }

  ionViewWillEnter() {
    let _slideElement = this.eleContainer.nativeElement;
    let _slideGesture = new Gesture(_slideElement);
    _slideGesture.listen();
    _slideGesture.on('panleft', (ev) => {
      let ang = this._cacMoveDeg(-ev.distance);
      this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
    });
    _slideGesture.on('panright', (ev) => {
      let ang = this._cacMoveDeg(ev.distance);
      this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
    });
  }

  clickRotate(e) {
    //this._transform("rotateY("+ (-1 * this.deg * ++this.indexPiece) +"deg)"+' translate(-50%,-50%)');

  }

  swipe(evt) {
    let distance = evt.distance;
    //向左滑
    if (evt.direction == 2) {
      let ang = this._cacMoveDeg(-distance);
      this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
    } else if (evt.direction == 4) {
      let ang = this._cacMoveDeg(distance);
      this._transform("rotateY(" + ang + "deg)  translate(-50%,-50%)");
    }
  }

  _transform(value: string) {
    this.eleContainer.nativeElement.style['transform'] = value;
  }

  _cacMoveDeg = function (s) {

    let xishu = 1;
    if (s < 0) {
      xishu = -1
    }
    s = Math.abs(s/3);
    this.ang += xishu * 2 * Math.asin(s / 2 / (this.transforZ)) * 180 / Math.PI;
    return this.ang;
  }

  _cacMoveDeg1 = function (s) {

    let xishu = 1;
    if (s < 0) {
      xishu = -1
    }
    s = Math.abs(s);
    this.ang += xishu * Math.atan(s / 2 / (this.transforZ)) * 180 / Math.PI
    return this.ang;
  }

  _cacDeg = function () {
    this.deg = 360 / this.items.length;
  }

  _maxWidth = function () {
    let val = this.items[0].w;
    for (let i = 1; i < this.items.length; i++) {
      this.items[i].w > val ? this.items[i].w : val;
    }
    return val;
  }

  _maxHeight = function () {
    let val = this.items[0].h;
    for (let i = 1; i < this.items.length; i++) {
      this.items[i].h > val ? this.items[i].h : val;
    }
    return val;
  }

  _calTranslateZ = function () {
    this.deg = 360 / this.items.length;
    let maxWidth = this._maxWidth();
    //this.transforZ = changeVal + (1 / Math.tan((this.deg / 2) * (Math.PI / 180))) * (maxWidth / 2);
    this.transforZ =(maxWidth/2)/(Math.sin((this.deg/2)*(Math.PI/180)));
  }


}
