
myalbum.db = {
  dbName: 'myalbum'
  , dbVersion: '0.0.1'
  , t_album_lib: 't_album_lib'
  ,TAlbum:'TAlbum'
  ,TAlbumData:'TAlbumData'
  ,TAlbumCluster:'TAlbumCluster'
  ,TAlbumClusterData:'TAlbumClusterData'
  ,TProfile:'TProfile'
  ,TID:'TID'
  ,entityDef : {

  TProfile:{
    //id: {type:'INTEGER', primaryKey:true,autoIncrement:true}
    id: {type:'TEXT'}
    ,module: {type:'TEXT'}
    ,key: {type:'TEXT'}
    ,val:{type:'TEXT',default:''}
    ,createdDate:{type:'DATETIME',default:'now'}
    ,updatedDate:{type:'DATETIME',default:'now'}
  },

    TID:{
       tableName: {type:'TEXT'}
      ,val: {type:'INTEGER'}
    }

    ,TAlbum : {
      id: {type:'TEXT'}
      ,name: {type:'TEXT'}
      ,desc: {type:'TEXT'}
      ,birthday:{type:'DATETIME'}
      ,headerImage:{type:'DATETIME'}
    }

    , TAlbumCluster:{
      //id: {type:'INTEGER', primaryKey:true,autoIncrement:true}
      id: {type:'TEXT'}
      ,albumId: {type:'TEXT'}
      ,coverId: {type:'TEXT'}
      ,creationDate:{type:'TEXT',default:''}
      ,title: {type:'TEXT'}
      ,desc:{type:'TEXT',default:''}
      ,latitude:{type:'DOUBLE'}
      ,longitude:{type:'DOUBLE'}
      ,address: {type:'TEXT'}
    }

    ,TAlbumClusterData:{
      //id: {type:'INTEGER', primaryKey:true,autoIncrement:true}
      //id: {type:'TEXT'}
      clusterId: {type:'TEXT'}
      ,albumDataId: {type:'TEXT'}
    }

    ,TAlbumData : {
      //id: {type:'INTEGER', primaryKey:true,autoIncrement:true}
      id: {type:'TEXT'}
      ,title: {type:'TEXT'}
      ,desc:{type:'TEXT',default:''}
      ,albumId: {type:'TEXT'}
      //id:"409279;/storage/emulated/0/Pictures/myalbum/2018-0-23-1.jpg",
      //id :"409279;assets/imgs/20180118153908.jpg",
      ,mediaId: {type:'TEXT'}
      ,fileName:{type:'TEXT'}
      ,height:{type:'INTEGER'}
      ,width:{type:'INTEGER'}
      ,latitude:{type:'DOUBLE'}
      ,longitude:{type:'DOUBLE'}
      ,photoURL: {type:'TEXT'}
      ,thumbnailURL:{type:'TEXT'}
      ,creationDate:{type:'TEXT',default:''}
      ,address: {type:'TEXT'}
      ,mediaType: {type:'TEXT',default:'image'}
    },

  }
  , entities:{}
  , db0: null
  , init: function (cb) {
    if (!window.openDatabase) {
      throw 'not support database';
    }
    var self = myalbum.db;
    self.db0 = window.openDatabase(self.dbName, self.dbVersion, 'not support database', 1*1024 * 1024);
    html5sql.database = self.db0;

    if (!self.db0) {
      throw 'open database error';
    } else {
      console.log('open database successfully');
    }

    self.db0.transaction(function (tx) {

      self.entities.TAlbum = self.define(self.TAlbum,self.entityDef.TAlbum,tx);
      /*self.dropTable(self.TAlbum,function(err,result,tx1){
       if(err) {
       console.log(err);
       return;
       }
       self.entities.TAlbum = self.define(self.TAlbum,self.entityDef.TAlbum,tx);
       },tx);*/

      self.entities.TAlbumData = self.define(self.TAlbumData,self.entityDef.TAlbumData,tx);
      /* self.dropTable(self.TAlbumData,function(err,result,tx1){
       if(err) {
       console.log(err);
       return;
       }
       self.entities.TAlbumData = self.define(self.TAlbumData,self.entityDef.TAlbumData,tx);
       },tx);*/

      self.entities.TAlbumCluster = self.define(self.TAlbumCluster,self.entityDef.TAlbumCluster,tx);
      self.entities.TAlbumClusterData = self.define(self.TAlbumClusterData,self.entityDef.TAlbumClusterData,tx);

      self.entities.TID = self.define(self.TID,self.entityDef.TID,tx);
      self.entities.TProfile = self.define(self.TProfile,self.entityDef.TProfile,tx);

      /*self.dropTable(self.TAlbumClusterData,function(err,result,tx1){
        if(err) {
          console.log(err);
          return;
        }
        self.entities.TAlbumClusterData = self.define(self.TAlbumClusterData,self.entityDef.TAlbumClusterData,tx);
      },tx);*/

    });
  }

  , addColumn: function(tableName, columnDef,cb,tx) {
    var sql = tableName + ' ADD COLUMN ' + columnDef;
    myalbum.db.alterTable(sql,cb,tx);
  }

  , alterTable: function (sql,cb,tx1) {
    var self = myalbum.db;
    var sql0 = "ALTER TABLE  "+ sql;
    self.executeSql(sql0, [], cb,tx1);
  }

  , insertAlbumLib: function (al,cb,tx1) {
    var self = myalbum.db;
    var sql =  'SELECT count(*) as total FROM t_album_lib WHERE id = ? '
    return new Promise((reso,reject)=>{
      self.query(sql,[],function(err,results,tx){
        self.query(sql,[al.id],function(err,results,tx){
          if(err) {
            reject(err);
          }else if(results && results.rows.length > 0 && results.rows[0].total > 0) {
            if(cb)
              reject('data exist');
          }else {
            self.insert('t_album_lib',al,function(err,data){
              if(err) {
                reject(err);
              }else {
                reso(data);
              }
            },tx1);
          }
        },tx1);
      },tx1);
    });
  }

  ,selectAlbumLib:function(id,typecode,tx1) {
    var self = myalbum.db;
    var sql =  'SELECT * FROM t_album_lib ';//WHERE typecode=? and id = ? AND actId=?
    return new Promise((reso,reject)=>{
      self.query(sql,[],function(err,results,tx){
        if(err) {
          reject(err);
        }else if(results && results.rows.length > 0) {
          reso(results.rows);
        }else {
          reject(err);
        }
      },tx1);
    });

  }

  ,selectAlbumDataForCluster:function(ids) {
    return new Promise((reso,reject)=>{
      if(!ids || ids.length ==0){
        reject(err);
      }
      let self = myalbum.db;
      let sql =  "SELECT ad.*,acd.clusterId FROM TAlbumClusterData acd " +
        " INNER JOIN TAlbumData ad ON acd.albumDataId=ad.id " +
        " WHERE acd.clusterId='"+ids[0]+"'";

      for(let i = 1; i < ids.length; i++){
        sql+=" OR acd.clusterId='"+ids[i]+"'";
      }

      self.query(sql,[],function(err,results,tx){
        if(err) {
          reject(err);
        }else if(results && results.rows.length > 0) {
          reso(results.rows);
        }else {
          reject(err);
        }
      });
    });

  }

  ,selectTAlbumData:function(albumId,year,month,offset,pageSize,tx) {

    let strftime = '';
    let params = [albumId];

    if(month) {
      params.push(month);
      strftime = " AND strftime('%Y-%m',creationDate)=? ";
    }else if(year) {
      strftime = " AND strftime('%Y',creationDate)=? ";
      params.push(year);
    }

    var self = myalbum.db;
    var sql =  "SELECT ac.*,ad.photoURL FROM TAlbumCluster ac " +
      " INNER JOIN TAlbumData ad ON ac.coverId=ad.id " +
      " WHERE ac.albumId=?  " + strftime;
    sql +=" ORDER BY ac.creationDate DESC  LIMIT "+pageSize+" Offset "+offset+";";
    //var sql =  "SELECT * FROM TAlbumData WHERE albumId=? AND strftime('%Y-%m',creationDate)=?  ORDER BY creationDate DESC  LIMIT "+pageSize+" Offset "+offset+";"
    return new Promise((reso,reject)=>{
      self.query(sql,params,function(err,results,tx){
        if(err) {
          reject(err);
        }else if(!!results /*&& results.rows.length > 0*/) {
          reso(results.rows);
        }else {
          reject(err);
        }
      });
    });
  }

  ,saveOrUpdateTAlbumClusterData : function (data) {
    var self = myalbum.db;
    var sql =  'SELECT count(*) as total FROM ' + ' TAlbumClusterData WHERE clusterId = ? AND albumDataId=? '
    return new Promise((reso,reject)=>{
      self.query(sql,[data.clusterId,data.albumDataId],function(err,results,tx){
          if(err) {
            reject(err);
          }else if(results && results.rows.length > 0 && results.rows[0].total > 0) {
              reject('data exist');
          }else {
            self.insert('TAlbumClusterData',data,function(err,data1){
              if(err) {
                reject(err);
              }else {
                reso(data1);
              }
            });
          }
      });
    });
  }

  ,insertOrUpdate(tableName,data){
    return new Promise((reso,reje)=>{
      if(!!data.id){
        //do update
        this.update(tableName, data,{id:data.id}, function(err,results) {
          if(err) {
            reje(err);
          }else {
            reso(results);
          }
        });
      }else {
        //do insert
        this.insert(tableName,data,function(err,data){
          if(err) {
            reje(err);
          }else {
            reso(data);
          }
        });
      }
    })
  }

  ,updateTAlbumData: function (albumData,id) {
    var self = myalbum.db;
    return new Promise((reso,reject)=>{
      self.update('TAlbumData', albumData,{id:id}, function(err,results) {
        if(err) {
          reject(err);
        }else {
          reso(results);
        }
      });
    });
  }

  ,deleteTAlbumData: function (id) {
    var self = myalbum.db;
    return self.deleteById('TAlbumData',id);
  }

  , insertTAlbum: function (data) {
    var self = myalbum.db;
    var sql =  'SELECT count(*) as total FROM TAlbum WHERE name = ? ';
    return new Promise((reso,reject)=>{
      self.query(sql,[data.name],function(err,results,tx){
        if(err) {
          reject(err);
        }else if(results && results.rows.length > 0 && results.rows[0].total > 0) {
          reject(data.name +' exist');
        }else {
          self.insert('TAlbum',data,function(err,obj){
            if(err) {
              reject(err);
            }else {
              reso(obj);
            }
          },tx);
        }
      });
    });
  }

  ,updateTAlbum: function (prop,id) {
    var self = myalbum.db;
    return new Promise((reso,reject)=>{
      self.update('TAlbum', prop,{id:id}, function(err,results) {
        if(err) {
          reject(err);
        }else {
          reject([]);
        }
      });
    });
  }

  ,selectTAlbum:function(tx) {
    return new Promise((reso,reject)=>{
      var self = myalbum.db;
      var sql =  'SELECT * FROM TAlbum ';//WHERE typecode=? and id = ? AND actId=?
      self.query(sql,[],function(err,results,tx){
        if(err) {
          reject(err);
        }else if(results && results.rows.length > 0) {
          reso(results.rows);
        }else {
          reject([]);
        }
      },tx);
    });
  },

  getUserId:function(){
    return myalbum.profile.get('user','userId');
  },

  _getId:function(id){
    if(id.length < 16){
      let len = 16-id.length;
      while(len-- > 0){
        id='0'+id;
      }
    }

    //id = myalbum.pwd.encrypt(id);
    return new Promise((reso,reje)=>{
      this.getUserId().then(uid=>{
        id = id+'@'+uid;
        if(commonService.isPcBrowser()){
          reso(myalbum.pwd.encrypt(id));
        }else {
          cordova.plugins.albumplugin.encrypt(id,(str)=>{
            reso(str);
          },err=>{
            reje(null);
          })
        }
      },err=>{
        reje(null);
      })
    })
  }

  ,getDbId:function(tableName){

    return new Promise((reso,reje)=>{
      var self = myalbum.db;
      var sql =  'SELECT * FROM TID WHERE tableName= "'+tableName+'"';//WHERE typecode=? and id = ? AND actId=?
      self.query(sql,[],function(err,results,tx){
        if(err) {
          reje(err);
        }else if(results && results.rows.length > 0) {
          let val = results.rows[0].val+1;
          self.executeSql('UPDATE TID SET val='+ val + ' WHERE tableName="'+tableName+'"',null,function(err,result){
            if(err){
              reje(err);
            }else {
              self._getId(val+'').then((id)=>reso(id),(err)=>reje(err))
            }
          }, tx);
        } else {
          let val = 1;
          self.executeSql('INSERT INTO TID(tableName,val) VALUES("'+tableName+'",1)',null,function(err,result){
            if(err){
              reje(err);
            }else {
              self._getId(val+'').then((id)=>reso(id),(err)=>reje(err))
              //reso(self._getId(val+''));
            }
          },tx);
        }
      });
    });
  }

  , insert: function (tableName,entity,cb,tx1) {

    var self = myalbum.db;

    self.getDbId(tableName).then((id)=>{
      entity.id = id;
      //entity.id = myalbum.pwd.encrypt(self._getId(entity.id+'@' + self.getUserId()),self.getUserId());
      //entity.id =self._getId(entity.id+'@' + self.getUserId());

      var sql = 'INSERT INTO ' + tableName + ' ( ';
      var valuesSql = 'values ( ';
      var valuesArray = [];

      var def = self.entityDef[tableName];

      for(var columnName in entity) {
        if(typeof def[columnName] =='undefined' && typeof def.defaultValue == 'undefined') {
          continue;
        }
        sql += columnName + ', ';
        valuesSql += '?, ';

        var value = entity[columnName];
        if(typeof value =='undefined') {
          value = def.defaultValue;
        }
        value = self._booleanToInt(value);
        valuesArray.push(value);
      }

      sql = sql.substr(0,sql.length-2);
      sql = sql + ' ) ';
      valuesSql = valuesSql.substr(0,valuesSql.length-2);
      valuesSql = valuesSql + ' ) ';
      sql = sql + valuesSql;
      self.executeSql(sql, valuesArray, function(err,result){
        if(cb) {
          //entity.mid = result.insertId;
          /*if(!!result && result.insertId){
           entity.id = result.insertId;
           }*/
          cb(null,entity);
        }
      },tx1);
    },(err)=>{
      if(cb){
        cb(err,null);
      }
    });

  }

  , deleteById: function (tableName, ids) {
    var self = myalbum.db;
    var sql = 'DELETE FROM ' + tableName + ' WHERE 1=0 '
    if(typeof ids == 'Array'){
        for(let i = 0; i < ids.length; i++){
          sql += ' OR id='+ids[i];
        }
    }else {
      sql += ' OR id='+ids;
    }
    return new Promise((reso,reje)=>{
      self.executeSql(sql, [], (err,result)=>{
        if(err){
          reje(err);
        }else {
          reso(result);
        }
      });
    })
  }

  , deleteAlbumClusterData: function (clusterId,albumItemIds) {

    var sql = 'DELETE FROM ' + this.TAlbumClusterData + ' WHERE clusterId= "'+clusterId+'" AND ( ';
    for(let i = 0; i < albumItemIds.length; i++){
      sql += ' OR albumDataId="'+albumItemIds[i]+'"';
    }
    sql += ')';

    return new Promise((reso,reje)=>{
      this.executeSql(sql, [], (err,result)=>{
        if(err){
          reje(err);
        }else {
          reso(result);
        }
      });
    })
  }


  , update: function (tableName, newValue, condigions, cb,tx1) {
    var self = myalbum.db;
    self.getTablesDef(tableName,function(err,tables){
      if(err) {
        console.log(err);
        cb(err,null);
      }else {
        if(!tables || tables.length <= 0) {
          console.log('no table to get');
          cb(err,null);
          return;
        }
        var sql = 'UPDATE ' + tableName + ' Set ';

        var table = tables[0];
        console.log(table);

        var valuesArray = [];
        let delFlag = false;

        var fields = table.fields;
        for(var i = 0; i< fields.length; i++) {
          let columnName = fields[i];
          if(newValue[columnName]) {
            delFlag=true;
            sql = sql + columnName + '=? ,';
            var value = self._booleanToInt(newValue[columnName]);
            valuesArray.push(value);
          }
        }

        if(delFlag) {
          sql = sql.substring(0,sql.length-1);
        }

        sql = sql + ' WHERE 1=1 AND ';
        for(var key in condigions) {
          sql = sql + key + '=? AND ';
          valuesArray.push(condigions[key]);
        }
        sql = sql.substr(0,sql.length-4);
        self.executeSql(sql, valuesArray, cb,tx1);
      }
    })

  }

  ,_handleMessage:function(results) {
    var msgs = [];

    if(results) {
      var rn = parseInt(results.rows.length)
      //console.log(rn);
      //console.log(JSON.stringify(results.rows));
      for (var i = 0; i < rn; i++) {
        var msg = results.rows.item(i);
        //console.log(JSON.stringify(msg));
        if(msg && typeof msg['content'] != 'undefined') {
          var m = JSON.parse(msg['content']);
          m.mid = msg['mid'];
          msgs.push(m);
        }
      }
    }else {
      console.log('no history message found');
    }
    return msgs;
  }

  , query: function (sql, params, cb,tx1) {
    myalbum.db.executeSql(sql, params, cb,tx1);
  }

  , executeSql : function(sql, values,cb,tx) {
    var self = myalbum.db;
    var func = function(tx) {
      tx.executeSql(sql, values,
        function (tx2, results) {
          self._returnMsgs(cb, results,tx2);
        },
        function (tx2, error) {
          console.log(error);
          console.log(sql);
          self._returnError(cb,sql,tx2);
        }
      );
    }
    if(tx) {
      func(tx);
    }else {
      if(!self.db0) {
        self.init();
      }
      self.db0.transaction(function (tx) {
        func(tx);
      });
    }
  }

  , _returnMsgs: function (cb, results,tx2) {
    console.log(results)
    if (cb) {
      cb(null, results,tx2);
    }
  }

  , _returnError: function (cb, error,tx2) {
    console.log(error);
    if (cb) {
      cb(error, null,tx2);
    }
    throw error;
  }

  ,_booleanToInt: function(value) {
    if(typeof value == 'boolean') {
      if(value) {
        value = 1;
      }else {
        value = 0;
      }
    }
    return value;
  }

  ,_intToBoolean: function(value) {
    return value==1;
  }

  //判断某表是否存在：表名、存在回调函数、不存在回调函数
  ,isExitTable : function (tableName, cb,tx) {
    var self = myalbum.db;
    var sql = "select * from sqlite_master where type='table' and name = '" + tableName+"'";
    var func = function(tx) {
      tx.executeSql(sql, [], function (transaction, result) {
        if (result.rows.length > 0 ) {
          cb(null,true,transaction);
        } else {
          cb(null,false,transaction);
        }
      }, function(tx,err){
        cb(err,null,tx);
      });
    }
    if(tx) {
      func(tx);
    }
    self.db0.transaction(function (tx) {
      func(tx);
    });

  }

  //删除表数据：表名，删除成功回调函数
  ,delTableData : function (tableName, callBackFun,tx1) {
    var self = myalbum.db;
    var sql = "delete from " + tableName;
    var func = function(tx) {
      tx.executeSql(sql, [], callBackFun, function(ts,err){
        self._returnError(null,err);
      });
    }
    if(tx1) {
      func(tx1);
    }else {
      self.db0.transaction(function (tx) {
        func(tx);
      });
    }
  }

  //删除表，删除成功回调函数
  ,dropTable : function (tableName, callBackFun,tx1) {
    var self = myalbum.db;
    var sql = "drop table IF EXISTS " + tableName;
    var func = function(tx) {
      tx.executeSql(sql, [], function(tx,result){
        self._returnMsgs(callBackFun,result,tx);
      }, function(tx,err){
        self._returnError(callBackFun,err,tx);
      });
    }
    if(tx1) {
      func(tx1);
    }else {
      self.db0.transaction(function (tx) {
        func(tx);
      });
    }
  }

  //修改数据库版本信息
  ,changeDBVersion : function (oldVersion, newVersion) {
    var self = myalbum.db;
    self.changeVersion(oldVersion, newVersion, null, null, null);
  }

  ,define: function(entityName,entityDef,tx) {

    if(!entityName || entityName.trim() == '') {
      throw 'entity name cannot be null';
    }

    var self = myalbum.db;

    function entityPrototype (){};
    for( var key in entityDef) {
      var dv = entityDef[key].defaultValue;
      if( dv && dv != 'undefined'){
        entityPrototype.prototype[key] = dv;
      }else {
        entityPrototype.prototype[key] = null;
      }

    }
    self.entities[entityName] = entityPrototype;

    self.isExitTable(entityName,function(err,flag,tx){
      if(err) {
        console.log(err);
        return;
      }
      if(flag==false) {
        var createSql = 'CREATE TABLE IF NOT EXISTS ' + entityName + ' ('
        for( var key in entityDef) {
          var def = entityDef[key];
          var fieldName = def.field || key;
          if(!def.type) {
            throw entityName + ' field type cannot be NULL';
          }
          createSql += fieldName + ' ' + entityDef[key].type
          if(def.primaryKey) {
            createSql += ' PRIMARY KEY ';
            if(def.autoIncrement) {
              createSql += ' AUTOINCREMENT ';
            }
          }

          if(!!def.defaultValue && def.defaultValue != 'undefined') {
            createSql += ' default ' + def.defaultValue;
          }

          createSql +=', '
        }
        createSql = createSql.substr(0,createSql.length-2);
        createSql += ' )'

        self.createTable(createSql,function(err,result){
          if(err) {
            console.log(err);
          }else {
            console.log('Create table ' + entityName + ' successfully!')
          }
        },tx);
      }else if(flag == true)  {

        self.getTablesDef(entityName,function(err,tables){
          if(err) {
            console.log(err);
          }else {

            if(!tables || tables.length <= 0) {
              console.log('no table to get');
              return;
            }
            var table = tables[0];
            console.log(table);
            var fields = table.fields;

            for( var key in entityDef) {
              var fieldName = entityDef[key].field || key;

              var found = false;
              for(var i = 0; i< fields.length; i++) {
                if(fields[i] == fieldName) {
                  found = true;
                }
              }

              if(!found) {
                if(!entityDef[key].type) {
                  throw entityName + ' field type cannot be NULL';
                }
                var alterSql = fieldName + ' ' + entityDef[key].type;
                if(!!entityDef[key].defaultValue && entityDef[key].defaultValue != 'undefined') {
                  createSql += ' default ' + entityDef[key].defaultValue;
                }
                self.addColumn(entityName,alterSql,null,null)
              }

            }
          }
        })
      }
    })
    return entityPrototype;
  }

  ,createTable:function(sql,cb,tx) {
    var self = myalbum.db;
    self.executeSql(sql,[],cb,tx);
  }

  ,getTablesDef : function (entityName,cb){
    html5sql.process("SELECT * FROM sqlite_master WHERE type='table' AND name='" + entityName + "' AND name NOT LIKE 'sqlite\\_%' escape '\\' AND name NOT LIKE '\\_%' escape '\\'"
      , function(txTables, rsTables, tables){
        if (!tables.length){
          return cb(null, []);
        }

        tables.forEach(function(table){
          var s = table.sql.split(',');
          s[0] = s[0].replace(new RegExp('create\\s+table\\s+' + table.name + '\\s*\\(', 'i'),'');
          table.fields = s.map(function(i){
            return i.trim().split(/\s/).shift();
          }).filter(function(i){
            return (i.indexOf(')') === -1)
          })
        });

        cb(null, tables)

      }, cb);
  }

}
