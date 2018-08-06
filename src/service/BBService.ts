import { Injectable } from '@angular/core';
import { DbService } from './DbService';

declare var myalbum :any;

@Injectable()
export class BBService {

  ageYear:number=0;
  ageMonth:number=0;
  ageDay:number=0;

  ageWeek:number=0;

  album:any;

  constructor(private dbService: DbService,) {

  }

  deviceReady(){
    this.getAlbum();
  }

  _updateAlbum() {

    return new Promise((reso,reje) =>{

      let queryParams = this.dbService.getAlbumDataQParams();
      let doUpdate = ()=>{
        myalbum.db.selectTAlbum().then((albums)=>{
          queryParams.albumList=albums;
          this.getAlbum();
          reso(albums);
        },(err)=>{
          queryParams.albumList=[];
          reje([]);
        });
      }

      myalbum.profile.get('defaultAlbumId').then((albumId)=>{
        queryParams.albumId=albumId;
        doUpdate();
      },err=>{
        console.log(err);
        doUpdate();
      })
    }
  )
  }

  getAlbum() {
    return new Promise((reso,reje)=>{
      let queryParams = this.dbService.getAlbumDataQParams();
      let getName = () => {
        if(!!queryParams.albumId && queryParams.albumId != null){
          for(let i = 0; i < queryParams.albumList.length; i++){
            if(queryParams.albumList[i].id == queryParams.albumId ) {
              queryParams.album = queryParams.albumList[i];
              break;
            }
          }
        }else if(queryParams.albumList.length > 0){
          queryParams.albumId = queryParams.albumList[0].id;
          queryParams.album = queryParams.albumList[0];
        }else {
          queryParams.albumId = '';
          queryParams.album = null;
        }
        if(queryParams.album){
          this.album = queryParams.album;
          this._parseBabyAge(myalbum.dateUtils.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'));
        }
        reso(queryParams.album);
      }

      if(queryParams.albumList.length == 0) {
        this._updateAlbum().then(()=>{
          getName();
        },() =>{
          reje('');
        })
      }else {
        getName();
      }
    })
  }

  _parseBabyAge(endStr) {
    let beginStr = this.album.birthday;
    let result = myalbum.dateUtils.parseAge(beginStr, endStr);
    this.ageYear = result.ageYear;
    this.ageMonth = result.ageMonth;
    this.ageDay = result.ageDay;
    this.ageWeek = result.ageWeek;
    this.album.ageInfo = result.ageInfo;

  }

  parseAge(endStr) {
    return new Promise((reso,reje) =>{
      if(this.album){
        let result = '';
        if(this.album.birthday){
          let beginStr = this.album.birthday;
          result = myalbum.dateUtils.parseAge(beginStr, endStr);
        }
        reso(result);
      }else {
        this.getAlbum().then(()=>{
          let beginStr = this.album.birthday;
          let result = myalbum.dateUtils.parseAge(beginStr, endStr);
          reso(result);
        })
      }
    })


  }

}
