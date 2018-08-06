import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { TakerPage } from '../Taker/taker';
import { AlbumPage } from '../album/album';
import { TestPage } from '../test/test';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlbumPage;
  tab4Root = TestPage;
  tab2Root = AboutPage;
  tab3Root = TakerPage;

  constructor() {

  }
}
