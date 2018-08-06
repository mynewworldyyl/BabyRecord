import { Component ,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonService } from '../../service/CommonService';

import { RotateImagePage } from '../../pages/rotateImage/RotateImage';

declare var myalbum :any;
declare var cordova:any;
declare var MediaPicker :any;
declare var PhotoSwipe,PhotoSwipeUI_Default;

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          Test
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding>

      <button ion-item menuClose  detail-none (click)="rotateImage()">
        <ion-icon name='rotateImage'></ion-icon>
        RotateImage
      </button>
      
      <ion-list radio-group [(ngModel)]="relationship">
        <ion-item>
          <ion-label>Friends</ion-label>
          <ion-radio value="friends" checked></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Family</ion-label>
          <ion-radio value="family"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Enemies</ion-label>
          <ion-radio value="enemies" [disabled]="isDisabled"></ion-radio>
        </ion-item>
      </ion-list>
      
      <ion-list>
        <ion-item>
          <ion-note item-start>
            Left Note
          </ion-note>
          My Item
          <ion-note item-end>
            Right Note
          </ion-note>
        </ion-item>
      </ion-list>
      
      <ion-grid>
        <ion-row>
          <ion-col col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3>
            This column will be 12 columns wide by default,
            9 columns at the small breakpoint,
            6 at the medium breakpoint, 4 at large, and 3 at xl.
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3>
            This column will be 12 columns wide by default,
            9 columns at the small breakpoint,
            6 at the medium breakpoint, 4 at large, and 3 at xl.
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-icon name="heart"></ion-icon>                    <!-- active -->
      <ion-icon name="heart" isActive="false"></ion-icon>  <!-- inactive -->


      <ion-list inset>
        <ion-item>
          <ion-label fixed>fixed</ion-label>
          <ion-input type="text" value=""></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>floating</ion-label>
          <ion-input type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label stacked>stacked</ion-label>
          <ion-input type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>inline</ion-label>
          <ion-input type="VerifyCode"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="text" placeholder="placeholder"></ion-input>
        </ion-item>
      </ion-list>


      <ion-item-group>
        <ion-item-divider color="light">A</ion-item-divider>
        <ion-item>Angola</ion-item>
        <ion-item>Argentina</ion-item>
        <ion-item-divider color="light">B</ion-item-divider>
        <ion-item>aaa</ion-item>
        <ion-item>bbgb</ion-item>
      </ion-item-group>

      <ion-list>
        <ion-list-header>
          Action
        </ion-list-header>
        <ion-item>Terminator II</ion-item>
        <ion-item>The Empire Strikes Back</ion-item>
        <ion-item>Blade Runner</ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>Today</ion-list-header>
        <ion-item>
          <ion-thumbnail item-start>
            <img src="/assets/imgs/20180118153908.jpg">
          </ion-thumbnail>
          <h2>Finn</h2>
          <p>I've had a pretty messed up day. If we just...</p>
          <ion-note item-end>3:43 pm</ion-note>
        </ion-item>
        <ion-list-header>Yesterday</ion-list-header>
        <ion-item>
          <ion-thumbnail item-start>
            <img src="/assets/imgs/20180118154000.jpg">
          </ion-thumbnail>
          <h2>Finn</h2>
          <h3>Don't Know What To Do!</h3>
          <ion-note item-end>3:43 pm</ion-note>
        </ion-item>
      </ion-list>

      <ion-item>
        <ion-label>Date</ion-label>
        <ion-datetime displayFormat="YYYY/MM" [(ngModel)]="myDate"></ion-datetime>
      </ion-item>
      <button ion-item menuClose  detail-none (click)="hello()">
        <ion-icon name='camera'></ion-icon>
        call native method
      </button>

      <button ion-item menuClose  detail-none (click)="captureImpage()">
        <ion-icon name='camera'></ion-icon>
        Capture Impage
      </button>

      <button ion-item menuClose  detail-none (click)="captureAudio()">
        <ion-icon name='camera'></ion-icon>
        Capture Audio
      </button>

      <button ion-item menuClose  detail-none (click)="captureVideo()">
        <ion-icon name='camera'></ion-icon>
        Capture Video
      </button>

      <button ion-item menuClose  detail-none (click)="selectMedia()">
        <ion-icon name='camera'></ion-icon>
       SelectMedia
      </button>

      <button ion-item menuClose  detail-none (click)="photoSwipe()">
        <ion-icon name='photoSwipe'></ion-icon>
        PhotoSwipe
      </button>

     
      

      <div class="pswp" tabindex="-1" role="page" aria-hidden="true">

        <!-- Background of PhotoSwipe. 
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

          <!-- Container that holds slides. 
              PhotoSwipe keeps only 3 of them in the DOM to save memory.
              Don't modify these 3 pswp__item elements, data is added later on. -->
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>

          <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
          <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

              <!--  Controls are self-explanatory. Order can be changed. -->

              <div class="pswp__counter"></div>

              <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

              <button class="pswp__button pswp__button--share" title="Share"></button>

              <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

              <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
              <!-- element will get class pswp__preloader--active when preloader is running -->
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>

          </div>

        </div>

      </div>
      
    </ion-content>
  `
})
export class TestPage implements  OnInit{

  isDisabled:boolean = true;

  constructor(public navCtrl: NavController,public commonService:CommonService,) {

  }

  ngOnInit() {
    //myalbum.ui.showAlert(this.commonService.isPcBrowser());
    //cordova.plugins.albumplugin
  }

  hello() {
    cordova.plugins.albumplugin.fileInfo('/storage/emulated/0/Pictures/myalbum/2018-0-25-10.jpg',function(result){
      console.log(result);
    },function(err){
      console.log(err);
    });
  }

  captureImpage(){
    this.commonService.captureImage().then((images)=>{
        console.log(images);
    },(err)=>{
      console.log(err);
    })
  }

  captureAudio(){
    this.commonService.captureAudio().then((images)=>{
      console.log(images);
    },(err)=>{
      console.log(err);
    })
  }

  captureVideo(){
    this.commonService.captureVideo().then((images)=>{
      console.log(images);
    },(err)=>{
      console.log(err);
    })
  }

  selectMedia(){
    var args={ 'showThumbnail':true,
      'selectMode':101,//101=PICKER_IMAGE_VIDEO , 100=PICKER_IMAGE , 102=PICKER_VIDEO
      'maxSelectCount':12, //default 40 (Optional)
      'maxSelectSize':188743680,//188743680=180M (Optional)
    };

    MediaPicker.getMedias(args,function(dataArray){
      //dataArray [{mediaType: "image",rotate: 90, path:'/storage/emulated/0/DCIM/Camera/20170808_145202.jpg' thumbnailBase64: '9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEB'}]
      for(var i=0; i<dataArray.length; i++){
       console.log(dataArray[i]);
      }
    },function(err){
      console.log(err);
    })
  }

  photoSwipe(){
    var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
    var items = [
      {
        src: 'assets/imgs/20180118153952.jpg',
        w: 600,
        h: 400
      },
      {
        src: 'assets/imgs/20180118153941.jpg',
        w: 1200,
        h: 900
      }
      ,
      {
        src: 'assets/imgs/20180118154009.jpg',
        w: 1200,
        h: 900
      }
      ,
      {
        src: 'assets/imgs/20180118154017.jpg',
        w: 1200,
        h: 900
      }
    ];

// define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: 0 // start at first slide
    };

// Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }


  rotateImage(){
    let imgItems=[
      {url:'assets/imgs/20180118153908.jpg', w:180, h:180},
      {url:'assets/imgs/20180118153941.jpg', w:180, h:180},
      {url:'assets/imgs/20180118154000.jpg',w:180,h:180},
      {url:'assets/imgs/20180118154009.jpg', w:180,h:180},
      {url:'assets/imgs/20180118154017.jpg',w:180,h:180},
      {url:'assets/imgs/20180118154023.jpg',w:180, h:180},
      /*{url:'assets/imgs/8.jpg',w:180,h:180},
      {url:'assets/imgs/10.jpg',w:180, h:180},
      {url:'assets/imgs/11.jpg', w:180, h:180},
      {url:'assets/imgs/12.jpg', w:180,h:180},
      {url:'assets/imgs/13.jpg',w:180,h:180 },
      {url:'assets/imgs/14.jpg', w:180, h:180},*/
    ];

    this.navCtrl.push(RotateImagePage,{item:{datas:imgItems}});

  }
}

