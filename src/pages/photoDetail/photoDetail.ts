import { Component,OnInit } from '@angular/core';
import { NavController, NavParams ,MenuController,ActionSheetController,PopoverController  } from 'ionic-angular';
import { CommonService } from '../../service/CommonService';
import { AlbumListPage } from './AlbumListPage';
import { PhotoPage } from './photo';

declare var myalbum :any;

@Component({
  selector: 'photo-detail',
  templateUrl: 'photoDetail.html'
})
export class PhotoDetailPage implements OnInit{

  item:any;

  disabled:boolean=false;

  datas:Array<any>=[];

  constructor(public navCtrl: NavController,params: NavParams,public menuCtrl: MenuController,
              public actionSheetCtrl: ActionSheetController,public commonService:CommonService
              ,private popoverCtrl: PopoverController) {
    this.item = params.data.item;
    this.disabled = !params.data.editable;
  }

  ngOnInit() {
    //this.disabled = true;
  }

  goBack() {
    this.navCtrl.pop();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  openPhoto() {
    this.navCtrl.push(PhotoPage,{item:this.item})
  }

  update() {
    console.log('Update');
    this.disabled=true;
    myalbum.db.updateTAlbumData({title:this.item.title,desc:this.item.desc,address:this.item.address
        ,creationDate:this.item.creationDate},
      this.item.id).then((result)=>{
      console.log(result);
      this.goBack();
    },(err)=>{
      console.log(err);
      myalbum.ui.showAlert('更新失败');
      this.goBack();
    });

  }

  doMove() {
    let popover = this.popoverCtrl.create(AlbumListPage, {
      albumChange: (albumId)=>{
        console.log(albumId);
        this.disabled=true;
        albumId=parseInt(albumId);
        if(albumId!=this.item.albumId) {
          myalbum.db.updateTAlbumData({albumId:albumId},
            this.item.id).then((result)=>{
            console.log(result);
            this.goBack();
          },(err)=>{
            console.log(err);
            myalbum.ui.showAlert('移动失败');
            //this.goBack();
          });
        }
      }
    });
    popover.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Edit',
          role: 'destructive',
          handler: () => {
            this.disabled=false;
            console.log('Edit');
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete');
            this.commonService.comfirm('删除将造成此数据永久消失并不可恢复，你确定要做此操作吗？').then(()=>{

              let filePath = this.item.mediaId.substring(this.item.mediaId.indexOf(';')+1);
              this.commonService.deleteFile(filePath).then(() => {
                myalbum.db.deleteTAlbumData(this.item.id).then((result)=>{
                  console.log(result);
                  this.goBack();
                },(err)=>{
                  console.log(err);
                  myalbum.ui.showAlert('更新数据失败');
                });//end deleteTAlbumData
              },(err) => {
                console.log(err);
                myalbum.ui.showAlert('删除文件失败');
              });//end deleteFile

            },() =>{
              //用户取消删除操作
            });//end comfirm
          }
        },
        {
          text: 'Move',
          role: 'destructive',
          handler: () => {
            console.log('Move');
            this.doMove();
            //this.goBack();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.disabled=true;
            console.log('Cancel clicked');
            this.goBack();
          }
        }
      ]
    });

    actionSheet.present();
  }
}
