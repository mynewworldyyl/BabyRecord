import { Component , OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
/*import { PhotoLibrary } from '@ionic-native/photo-library';*/
import { DbService } from '../../service/DbService';

declare var myalbum :any;

const testData:any = {
  creationDate:'2018-09-02 02:04',
  fileName: "IMG_20180117_203604.jpg",
  height: 2432,
  id: "assets/imgs/20180118153908.jpg",
  latitude: 0,
  longitude: 0,
  photoURL: "assets/imgs/20180118153908.jpg",
  thumbnailURL: "assets/imgs/20180118153908.jpg"
  ,width: 2432
}

@Component({
  selector:'EditAlbum',
  templateUrl: 'EditAlbum.html'
})
export class EditAlbumPage  implements OnInit {

  constructor(public navCtrl: NavController,/*public photoLibrary:PhotoLibrary,*/public dbService:DbService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit(){

  }

  ngAfterViewChecked(){

  }

  queryAlbumLib(){

  }

}
