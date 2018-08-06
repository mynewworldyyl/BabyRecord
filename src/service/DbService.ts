import { Injectable } from '@angular/core';

declare var myalbum :any;

const PAGE_SIZE:number=10;

@Injectable()
export class DbService {

  albumDataQParams:any={
    albumList:[],
    month:'',
    monthDisabled:false,
    year:'',
    yearDisabled:false,
    albumId:'',
    sysDisabled:false,
    offset:0,
    limit:PAGE_SIZE,
    pageEnd:false,
    items:[]
  }

  cacheItems:any = [
   /* {paths:['assets/imgs/20180118153908.jpg','assets/imgs/20180118153941.jpg'],title:'Good Girl',date:new Date()},
    {paths:['assets/imgs/20180118153941.jpg'],title:'Good Girl',date:new Date()},
    {paths:['assets/imgs/20180118153952.jpg'],title:'Good Girl',date:new Date()},
    {paths:['assets/imgs/20180118154030.jpg'],title:'Good Girl',date:new Date()},*/
    ];
  constructor() {

  }

  init() {

  }

  deviceReady(){

  }

  selectAlbumLib(albumName,offset,size) {
    return myalbum.db.selectAlbumLib();
  }

  getAlbumDataQParams() {
    return this.albumDataQParams;
  }

  resetAlbumData() {
    this.albumDataQParams.offset=0;
    this.albumDataQParams.limit=PAGE_SIZE;
    this.albumDataQParams.pageEnd = false;
    this.albumDataQParams.items=[];
  }

  firstAlbumData() {
    let items = this.getAlbumDataQParams().items;
    if(items.length >0){
      return items[0];
    }
  }

  nextAlbumData(item:any,commonService:any) {
    return new Promise((reso,reje)=>{
      let items = this.getAlbumDataQParams().items;
      let index = -1;
      for(let i = 0; i < items.length; i++){
        if(item.id == items[i].id ) {
          index = i;
          break;
        }
      }
      if(index < items.length-1){
        reso(items[index+1])
      } else {
        if(this.albumDataQParams.pageEnd) {
          return reje(null);
        }else {
          let qparams = this.getAlbumDataQParams();
          if(!qparams.sysDisabled){
            this.queryAlbumData(null,true).then(()=>{
              if(index < items.length-1){
                reso(items[index+1])
              }else {
                reje(null);
              }
            });
          }else {
            this.loadSysPhotos(null,true,commonService).then(()=>{
              if(index < items.length-1){
                reso(items[index+1])
              }else {
                reje(null);
              }
            });
          }
        }
      }
    })

  }

  preAlbumData(item:any) {
    let items = this.getAlbumDataQParams().items;
    for(let i = 0; i < items.length; i++){
      if(item.id == items[i].id ) {
        if(i > 0){
          return items[i-1];
        }
      }
    }
    return null;
  }

  deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
      if (!!p[i] && typeof p[i] === 'object') {
        c[i] = (p[i].constructor === Array) ? [] : {};
        this.deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
    return c;
  }

  queryAlbumData(refresher,append) {

    return  new Promise((reso,reje)=>{
      if(this.albumDataQParams.pageEnd) {
        if(refresher){
          refresher.complete();
        }
        reje('node data');
        return;
      }

      if(!this.albumDataQParams.albumId || this.albumDataQParams.albumId == '') {
        if(refresher){
          refresher.complete();
        }
        reje('album ID不能为空');
        return;
      }

      if(this.albumDataQParams.items.length > 0){
        this.albumDataQParams.offset += this.albumDataQParams.limit;
      }

      let year = this.albumDataQParams.yearDisabled?this.albumDataQParams.year:null;
      let month = this.albumDataQParams.monthDisabled?this.albumDataQParams.month:null;

      myalbum.db.selectTAlbumData(this.albumDataQParams.albumId,year,month,
        this.albumDataQParams.offset,this.albumDataQParams.limit).then((clusterItems)=>{

        if(clusterItems.length == 0){
          if(!!refresher){
            refresher.complete();
          }
          reje('无数据');
        }else {
          let clusterIds = [];
          for(let i = 0; i < clusterItems.length; i++) {
            clusterIds.push(clusterItems[i].id);
          }
          myalbum.db.selectAlbumDataForCluster(clusterIds).then(albumDatas=>{
            let cis = [];
            for(let i = 0; i < clusterItems.length; i++) {
              let it = this.deepCopy(clusterItems[i],{});
              it.datas = [];
              cis.push(it);
              for(let j = 0; j < albumDatas.length; j++) {
                  if(albumDatas[j].clusterId == clusterItems[i].id){
                    let ad = this.deepCopy(albumDatas[j],{});
                    delete ad.clusterId;
                    if(clusterItems[i].coverId != albumDatas[j].id){
                      it.datas.push(ad);
                    }else {
                      it.datas.unshift(ad);
                    }
                  }
              }
            }

            if(cis.length < this.albumDataQParams.limit) {
              this.albumDataQParams.pageEnd = true;
            }
            if(append){
              for(let i = 0; i < cis.length; i++) {
                this.albumDataQParams.items.push(cis[i]);
              }
            }else {
              this.albumDataQParams.items=cis;
            }
            reso(this.albumDataQParams.items);
            //this.commonService.hideLoading();
            if(!!refresher){
              refresher.complete();
            }
          },err=>{
            reje(err);
          })

        }

      },(err)=>{
        reje(err);
        //this.items = [];
        //this.commonService.hideLoading();
        if(!!refresher)
          refresher.complete();
      });
    })
  }

  loadSysPhotos(refresher,append,commonService) {

   return new Promise((reso,reje) => {
     console.log('requestAuthorization');
     let qparams = this.getAlbumDataQParams();
     let albumId = !!qparams.sysAlbumId?qparams.sysAlbumId:null;
     if(qparams.items.length > 0){
       qparams.offset += qparams.limit;
     }
     let year = this.albumDataQParams.yearDisabled?this.albumDataQParams.year:null;
     let month = this.albumDataQParams.monthDisabled?this.albumDataQParams.month:null;

     commonService.queryFileList(albumId,qparams.offset,qparams.limit,year,month)
       .then((items:any)=>{
         for(let i = 0; i< items.length; i++){
           let item = items[i];
           item.photoURL = item.nativeURL;
         }
         if(!append){
           qparams.items = items;
         }else {
           for(let i = 0; i< items.length; i++){
             let item = items[i];
             qparams.items.push(item);
           }
         }
         if(!!refresher)
           refresher.complete();
         reso( qparams.items)
       },(err)=>{
         if(!!refresher)
           refresher.complete();
         console.log(err);
         reje(err);
       });
   })

  }

}
