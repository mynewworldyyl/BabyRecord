import { Component ,OnInit,Input,ElementRef, ViewChild} from '@angular/core';
import { DbService } from '../../service/DbService';
import { CommonService } from '../../service/CommonService';
import { NavController,NavParams } from 'ionic-angular';

declare var PhotoSwipe,PhotoSwipeUI_Default;
@Component({
  selector: 'Photo-Swipe',
  template: `
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
  `
})
export class PhotoSwipePage implements OnInit{

  hiddenDesc:boolean=false;

  items:any;
  mainItem:any;
  index:number=0;

  constructor(public navCtrl: NavController,params: NavParams,public commonService:CommonService,public dbService:DbService) {
    this.mainItem = params.data.item;
    this.items = this.mainItem.datas;
    this.index=0;
  }

  ngOnInit(){
    this.photoSwipe();
  }

  photoSwipe(){
    let pswpElement = document.querySelectorAll('.pswp')[0];


// define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: 0 ,// start at first slide
      loop:false,
      history:false,

      closeEl:false,
      captionEl: true,
      fullscreenEl: false,
      zoomEl: true,
      shareEl: false,
      counterEl: true,
      arrowEl: true,
      preloaderEl: true,

    };

    // build items array
    let its:Array<any> = [];
    for(let i=0; i < this.items.length ;i ++){
      let it = this.items[i];
      if(it.photoURL&&(it.photoURL.endsWith('jpg') || it.photoURL.endsWith('jpeg'))){
        let tt:any = {};
        tt.src = it.photoURL;
        if(it.width){
          tt.w = it.width;
        }
        if(it.height){
          tt.h = it.height;
        }
        it.html = '<h3>' + it.title + '</h3>';
        it.html += '<p>' + it.desc + '</p>';

        its.push(tt);
      }
    }

   // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, its, options);
    gallery.listen('gettingData', (index, item) => {
      let it = this.items[index];
      item.html = '<div>Dynamically generated HTML ' + '测试描述' + '</div>';
    });
    gallery.listen('close', (sl,args) => {
      this.navCtrl.pop();
    });
    gallery.init();
    }

}
