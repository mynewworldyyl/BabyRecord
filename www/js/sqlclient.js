
window.db = myalbum.db;

function selectAlbumData() {
  myalbum.db.executeSql('select id as coverId,desc,title,address,albumId,latitude,longitude,creationDate from TAlbumData',null,
    function(err,results){
    for(let i = 0; i < results.rows.length; i++){
      let ad = results.rows[i];
      myalbum.db.insert(myalbum.db.TAlbumCluster,ad,function(err,item){
        myalbum.db.insert(myalbum.db.TAlbumClusterData,{clusterId:item.id,albumDataId:ad.coverId},function(err,acd){
          console.log(acd);
        });
      });
    }
  })
}

function updatePhotoURL(){
  myalbum.db.executeSql('select id, photoURL from TAlbumData',null,
    function(err,results){
      for(let i = 0; i < results.rows.length; i++){
        let url = results.rows[i].photoURL;
        if(url.startsWith('cdvphotolibrary://')){
          let deUrl = decodeURIComponent(url);
          url = deUrl.split(';')[1];
          myalbum.db.executeSql('UPDATE TAlbumData SET photoURL=? WHERE id=?',[url,results.rows[i].id],function(err,result){
            console.log(result);
            if(err){
              console.log(err);
            }
          });
        }
      }
    })
}

function updateTAlbum() {
  //myalbum.db.executeSql('ALTER TABLE TAlbum RENAME TO TAlbum_BACKUP;')
  //myalbum.db.executeSql('ALTER TABLE TAlbumCluster RENAME TO TAlbumCluster_BACKUP;')
  //myalbum.db.executeSql('ALTER TABLE TAlbumData RENAME TO TAlbumData_BACKUP;')
  //myalbum.db.executeSql('ALTER TABLE TAlbumClusterData RENAME TO TAlbumClusterData_BACKUP;')

  myalbum.db.executeSql('select * from TAlbum_BACKUP  LIMIT 1',null,
    function(err,results){
      for(let i = 0; i < results.rows.length; i++){
        let ad = results.rows[i];
        let orgId = ad.id+'';
        ad.id = ad.id+'';
        ad.albumId = ad.albumId+'';
        myalbum.db.insert(myalbum.db.TAlbum,ad,function(err,item){
          myalbum.db.executeSql('UPDATE TAlbumCluster SET albumId=? WHERE albumId=?',[item.id,orgId],function(err,result){
            console.log(result);
            if(err){
              console.log(err);
            }
          });
        });
      }
    })
}

function  updateTAlbumData() {
//myalbum.db.executeSql('ALTER TABLE TAlbumData RENAME TO TAlbumData_BACKUP;')
  myalbum.db.executeSql('select * from TAlbumData_BACKUP LIMIT 1',null,
    function(err,results){
      for(let i = 0; i < results.rows.length; i++){
        let ad = results.rows[i];
        let orgId = ad.id+'';
        myalbum.db.insert(myalbum.db.TAlbumData,ad,function(err,item){

          myalbum.db.executeSql('UPDATE TAlbumClusterData SET albumDataId=? WHERE albumDataId=?',[item.id,orgId],function(err,result){
            console.log(result);
            if(err){
              console.log(err);
            }
          });

          myalbum.db.executeSql('UPDATE TAlbumCluster SET coverId=? WHERE coverId=?',[item.id,orgId],function(err,result){
            console.log(result);
            if(err){
              console.log(err);
            }
          });

        });
      }
    })
}

function updateTAlbumCluster() {
  //myalbum.db.executeSql('ALTER TABLE TAlbumCluster RENAME TO TAlbumCluster_BACKUP;')
  myalbum.db.executeSql('select * from TAlbumCluster_BACKUP  LIMIT 1',null,
    function(err,results){
      for(let i = 0; i < results.rows.length; i++){
        let ad = results.rows[i];
        let orgId = ad.id+'';
        ad.id = ad.id+'';
        myalbum.db.insert(myalbum.db.TAlbumCluster,ad,function(err,item){
          myalbum.db.executeSql('UPDATE TAlbumClusterData SET clusterId=? WHERE clusterId=?',[item.id,orgId],function(err,result){
            console.log(result);
            if(err){
              console.log(err);
            }
          });
        });
      }
    })
}

function updateTAlbumClusterData() {
  //myalbum.db.executeSql('ALTER TABLE TAlbumClusterData RENAME TO TAlbumClusterData_BACKUP;')
  myalbum.db.executeSql('select * from TAlbumClusterData_BACKUP LIMIT 1',null,
    function(err,results){
      for(let i = 0; i < results.rows.length; i++){
        let ad = results.rows[i];
        let orgId = ad.id;
        ad.id = ad.id+'';
        ad.clusterId=ad.clusterId+'';
        ad.albumDataId=ad.albumDataId+'';
        myalbum.db.insert(myalbum.db.TAlbumClusterData,{clusterId:ad.clusterId,albumDataId:ad.albumDataId},function(err,item){
          console.log(item);
          if(err){
            console.log(err);
          }
        });
      }
    })
}


function exe(sql){
  myalbum.db.executeSql(sql, params, function(err,result){
    console.log(result);
  });
}


