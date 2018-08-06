myalbum = {}

/**
 * 加解密字符串
 * @author helijun
 * @return {[type]}   [description]
 */
myalbum.pwd = {
    init: function(){
      var self = myalbum.pwd;
    },

    options: {
      defaultPwd: 'helijun'
    },

    //加密
    encrypt: function(str, pwd){
      var self = this;

      if(!str) return '';

      str = encodeURIComponent(str);

      pwd = encodeURIComponent(pwd || self.options.defaultPwd);

      var prand = '';
      for(var i = 0; i < pwd.length; i ++) {
        prand += pwd.charCodeAt(i).toString();
      }

      var sPos = Math.floor(prand.length / 5),
        mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) +
          prand.charAt(sPos * 4) + prand.charAt(sPos * 5)),
        incr = Math.ceil(pwd.length / 2),
        modu = Math.pow(2, 31) - 1;

      if(mult < 2) return '';

      var salt = Math.round(Math.random() * 1000000000) % 100000000;
      prand += salt;

      while(prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) +
        parseInt(prand.substring(10, prand.length))).toString();
      }

      prand = (mult * prand + incr) % modu;

      var encChr = '',encStr = '';
      for(var i = 0, len = str.length; i < len; i += 1) {
        encChr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
        if(encChr < 16) {
          encStr += '0' + encChr.toString(16);
        }else{
          encStr += encChr.toString(16);
        }
        prand = (mult * prand + incr) % modu;
      }

      salt = salt.toString(16);
      while(salt.length < 8) {
        salt = '0' + salt;
      }
      encStr += salt;

      return encStr;
    },

    //解密
    decrypt: function(str, pwd){
      var self = this;

      if(str == '') return '';

      pwd = encodeURIComponent(pwd || self.options.defaultPwd);

      if(str == undefined || str.length < 8) {
        return '';
      }

      var prand = '';
      for(var i = 0; i < pwd.length; i++) {
        prand += pwd.charCodeAt(i).toString();
      }

      var sPos = Math.floor(prand.length / 5),
        mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) +
          prand.charAt(sPos * 4) + prand.charAt(sPos * 5)),
        incr = Math.round(pwd.length / 2),
        modu = Math.pow(2, 31) - 1,
        salt = parseInt(str.substring(str.length - 8, str.length), 16);

      str = str.substring(0, str.length - 8);
      prand += salt;

      while(prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) +
        parseInt(prand.substring(10, prand.length))).toString();
      }
      prand = (mult * prand + incr) % modu;

      var encChr = '',encStr = '';
      for(var i = 0, len = str.length; i < len; i += 2) {
        encChr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
        encStr += String.fromCharCode(encChr);
        prand = (mult * prand + incr) % modu;
      }

      return decodeURIComponent(encStr);
    },

    render: function(){
      var self = this;
    }
  }




String.prototype.startWith=function(str){
  var reg=new RegExp("^"+str);
  return reg.test(this);
}

String.prototype.endWith=function(str){
  var reg=new RegExp(str+"$");
  return reg.test(this);
}

Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

myalbum.ui = {
  showAlert:function(msg) {
    //alert(msg);
    let alert = window.ionicAlertCtrl.create({
      title: 'Info',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  },

  loadJS:function(jsUrl){
    return new Promise((reso,reje)=>{
      let elt = document.getElementById(jsUrl);
      if(elt){
        reso();
      }else {
        if(jsUrl.startsWith('https://api.map.baidu.com')){
          window.HOST_TYPE = "2";
          window.BMap_loadScriptTime = (new Date).getTime();
        }
        let oHead = document.getElementsByTagName('HEAD').item(0);
        let oScript= document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src=jsUrl;
        oScript.id=jsUrl;
        oScript.onload = function() {
          console.log('Finish load JS: ' + jsUrl);
          reso(true);
        };
        oHead.appendChild( oScript);
      }
    })
  },

 mobilecheck:function() {
  var check = false;
  (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

}

myalbum.profile = {
  DEFAULT_MODULE:'_DEFAULT',
  proCache:new Map(),

  _getCache:function(mod, key){
    let val = null;
    let modMap = this.proCache.get(mod);
    if(!!modMap){
      val = modMap.get(key);
    }else {
      modMap = new Map();
      this.proCache.set(mod,modMap);
    }
    return val;
  },

  _deleteCache:function(mod, key){
    let modMap = this.proCache.get(mod);
    if(!modMap){
      let val = modMap.get(key);
      if(!!val){
        modMap.delete(key);
      }
    }
  },

  _setCache:function(mod, key,val){
    let modMap = this.proCache.get(mod);
    if(!modMap){
      modMap = new Map();
      this.proCache.set(mod,modMap);
    }
    modMap.set(key,val);
  },

  get: function (mod, key) {
    let self = this;
    return new Promise((reso, reje) => {
      if(typeof mod == 'undefined'){
        reje('module or key cannot be null');
      }
      if(typeof key == 'undefined'){
        key = mod;
        mod = self.DEFAULT_MODULE;
      }

      let val = self._getCache(mod,key);
      if(!!val){
        reso(val);
      } else {
        let sql = 'SELECT * FROM TProfile WHERE module=? AND key=?';
        myalbum.db.executeSql(sql, [mod, key], (err, results) => {
          if (err) {
            reje(err);
          } else if (results && results.rows.length > 0) {
            val = results.rows[0].val;
            self._setCache(mod,key,val);
            reso(val);
          } else {
            reje(null);
          }
        })
      }
    });
  },

  set: function (mod, key,val) {
    let self = this;
    let args = arguments;
    return new Promise((reso, reje) => {
      if(args.length < 2){
        reje('key and val cannot be null');
      }
      if(args.length == 2){
        val = key;
        key = mod;
        mod = self.DEFAULT_MODULE;
      }

      self.get(mod,key).then(pro=>{
        myalbum.db.update('TProfile', {val:val},{mod:mod,key:key}, (err, results) => {
          if (err) {
            reje(err);
          } else {
            self._setCache(mod,key,val);
            reso(results);
          }
        })
      },err=>{
        myalbum.db.insert('TProfile', {module:mod, key:key,val:val,updatedDate:new Date(),createdDate:new Date()}, (err, results) => {
          if (err) {
            reje(err);
          } else {
            self._setCache(mod,key,val);
            reso(results);
          }
        })
      })
    });
  },

  delete:function(mod,key){
    let self = this;
    return new Promise((reso, reje) => {
      if(typeof mod == 'undefined'){
        reje('module or key cannot be null');
      }
      if(typeof key == 'undefined'){
        key = mod;
        mod = self.DEFAULT_MODULE;
      }

      let sql = 'DELETE  FROM TProfile WHERE module=? AND key=?';
      myalbum.db.executeSql(sql, [mod, key], (err, results) => {
        if (err) {
          reje(err);
        } else {
          self._deleteCache(mod,key);
          reso(results);
        }
      })
    });
  },

}


myalbum.dateUtils = {
  parseAge:function(beginStr, endStr) {
    var reg = new RegExp(
      /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})(\s)(\d{1,2})(:)(\d{1,2})(:{0,1})(\d{0,2})$/);
    var beginArr = beginStr.match(reg);
    var endArr = endStr.match(reg);

    let result = {ageYear:0, ageMonth:0, ageDay:0, ageWeek:0,ageInfo:''};

    result.ageDay = endArr[4] - beginArr[4];
    if (result.ageDay < 0) {
      result.ageMonth = -1;
      result.ageDay = 30 + result.ageDay;
    }

    result.ageMonth = result.ageMonth + (endArr[3] - beginArr[3]);
    if (result.ageMonth < 0) {
      result.ageYear = -1;
      result.ageMonth = 12 + result.ageMonth;
    }

    result.ageYear = result.ageYear + (endArr[1] - beginArr[1]);

    var yearString = result.ageYear > 0 ? result.ageYear + "岁" : "";
    var mnthString = result.ageMonth > 0 ? result.ageMonth + "个月" : "";
    var dayString = result.ageDay > 0 ? result.ageDay + "天" : "";

    /*
     * 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 那么如果天等于0
     天小于3天 取小时
     * 例如出生2天 就取 48小时
     */
    let showResult = "";
    if (result.ageYear >= 1) {
      showResult = yearString + mnthString+dayString;
    } else {
      if (result.ageMonth >= 1) {
        showResult = result.ageDay > 0 ? mnthString + dayString : mnthString;
      } else {
        var begDate = new Date(beginArr[1], beginArr[3] - 1,
          beginArr[4], beginArr[6], beginArr[8], beginArr[10]);
        var endDate = new Date(endArr[1], endArr[3] - 1, endArr[4],
          endArr[6], endArr[8], endArr[10]);

        var between = (endDate.getTime() - begDate.getTime()) / 1000;
        result.ageDay = Math.floor(between / (24 * 3600));
        var hours = Math.floor(between / 3600 - (result.ageDay * 24));
        var dayString = result.ageDay > 0 ? result.ageDay + "天" : "";
        showResult = result.ageDay >= 3 ? dayString : result.ageDay * 24 + hours + "小时";
      }
    }
    result.ageInfo = showResult;
    return result;
  },

  formatDate : function(date,fmt){
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
}



