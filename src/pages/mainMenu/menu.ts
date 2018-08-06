import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';

import { AboutPage } from '../about/about';
import { TakerPage } from '../Taker/taker';
import { AlbumPage } from '../album/album';
import { TestPage } from '../test/test';

@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {

  album = AlbumPage;
  taker = TakerPage;
  test = TestPage;
  about = AboutPage;

  constructor(public navCtrl: NavController) {

  }

  openPage(page){
    this.navCtrl.push(page,{});
  }

}
