
myalbum.media = {
    MediaType:{
        Camera:0
        ,Album:1
    }
}

/**
 {
     quality : 75,
     destinationType : Camera.DestinationType.DATA_URL,
     sourceType : Camera.PictureSourceType.CAMERA,
     allowEdit : true,
     encodingType: Camera.EncodingType.JPEG,
     targetWidth: 100,
     targetHeight: 100,
     popoverOptions: CameraPopoverOptions,
     saveToPhotoAlbum: false
 };

 Camera.DestinationType = {
              DATA_URL : 0,      // Return image as base64-encoded string
              FILE_URI : 1,      // Return image file URI
              NATIVE_URI : 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
          };
 Camera.PictureSourceType = {
              PHOTOLIBRARY : 0,
              CAMERA : 1,
              SAVEDPHOTOALBUM : 2
          };

 * @param successCb
 * @param errCb
 * @param opts
 */
myalbum.media.picture = {

    getPicture : function(opts,successCb,errCb) {
        // Take picture using device camera and retrieve image as base64-encoded string
        if(typeof opts == 'undefined') {
            opts = {};
        }

        if(typeof opts.destinationType == 'undefined') {
            opts.destinationType = navigator.camera.DestinationType.DATA_URL;
        }

        if(typeof opts.quality == 'undefined') {
            opts.quality = 100;
        }

        if(typeof opts.sourceType == 'undefined') {
            opts.sourceType = navigator.camera.PictureSourceType.PHOTOLIBRARY;
        }

        if(!errCb) {
            errCb = function(msg){
                console.log(msg);
            };
        }
        //successCb('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAA7ADQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+Y77HZ6W0ouGkZIcSYjl1czxfZC9529MZxnoTyQcV+1f/AAT2/wCCVfxn/bMlHjWLQdc8NeBp9Z02W/8AEelw2d9f3mnXlq5vPsY8TjTbDQr7B5/s7+0uCOc5NfnT+yD+zX47/af/AGpfhl8GPBmiafqHiDx54tt9B8P6drBvPsEVtZ/YrzxF4/1ezsyR/wAIr8ONEA1HV/7Oz007JHjj/hXBP+pD8APgN4T/AGe/hpoPww8IQRmDw/pei6fqGrSWohuNeuLO2IW7Iz6855PI6AEnwsppPEc1WrhVbS9nra810bfS+/vXSfwtH7Dm+Y0eHsry5Uf+RrjY8yytL3crSbvsravVpu+sopNJyPyM8C/8EtPiT8FT4f0L9lDSfg/8BpfCehXyxfErxvpX/C6PiXd6lq9pZWmrXVraXl94Z0HQ77Uryzuj/oH9o6TtIOTrh1gnKb/gkT8DNKsfGPxW/bO+H3w//az+I2r6pca1qHjLX/D32ADk2ln/AKLj/Q7DTrC0tOeQPtZGTolfvqdhiC/vNmCPL7fe9euP6cZ7VyHijSYtb0yXTrmW3a3kiuMp9jJ/i1DHAOOnTvy3Ug5+upzqpSppu2+l7PWWvW3V3Vra7e8fHZXxTmKxWGoYpf7KpJ330Tm39pN7KS8pOKdnc/zQv+Ckn7XvjnSvHfif4CaB4Ok+Anw48EXYtPA/wx8L6reeHfDXhy48OeYBd2d6DqY/5Al1dHgaaeSM5319Zf8ABEn/AILo/HL4J/G/4SfsZ/tXeO4/Gf7P3xO8Y23gjwf8VPHmotqvi34TeIvEVstl4e+yfEK91E6f/wAK51PWgBq/h7xIP+KV/tbTtZBPgm/8XFv0Z/4LA/sAeDYfM+LHinwLb+IfBU32i21rUtKtP+JvZ3P/ABM7xbbVxj/jy4zo/Of7X6ngZ/jK+K/h/wAO/B3xtJpPhzV4vE3wx8UfutKtdY/taw17R9QFqbz7Lq+SDZa7p19e3R0jxCMn+19JJzyxroqVZYi1NbPo2ld3npotnZJdb3u3aLf6dxBlWExGXYfFVMSvqtl32Up2avJpppWet0rJNrU/2D9St7tr2Z4wmZCHl2nUsecS+/8A1p39AOue4ySGJK/Jz/giN8evH37Qv/BNn4G+K/iB4j1Dxt4o8JTeMfhVeeMLiK4v9X8S6d8OfFWoeGvDWs+IryVt8+v3vhu00l9Tc8GXbzkGis1jWtFKH3Ppfz839+7Py3+zo/8AQXH/AMDfn/e9PvfbX8UP+DYT4G6RrHxm/aO/aSvbaKzm+F2gW/wp8OT3Fpd5tPEHxEI8SXd2Ptx+wj+zNG8EWmfbxD1LCv6Pfih+1J8Vfgr8fLPwfex+FviT8LtblgtYb7Sxa6P8QvANw1paE215aOP7D1vQwAGBvyNWJYhixUV+f3/BFv8AYo0PXP8AglFJpeq63418BTftZeM/iT8VrrxD4C8V3nhD4l6Rp17rN74a8PHSPEVkBf2N8ND8I6UTnOBgnnGfX/2Y/wDgjlbfBD4ip4o8VfHD4kePtF0S/wDEV+b3xZ411fxT40+IX9raudYs/wDhbmrayv8Ap194bsbo+H9I5/5BNrpoyTgn57LcPVpZdhlReqs7Nq71krvfS17ap7u72X2Kx/BeOzbPc14lxT5MFliy3K8q97V3fLytT0UVG84u6fNOyUVLm+hP2iP+Cht/8LtMkPgv4Tar8QNXmtfNtLeTUBpVgLi7ZxZm8u73/lx+2rg+gY9cZNb4R/tZftFeJNHi1P4qeA/hn4Ym1O1trqHw/wCHNf1jVdWs7gkgWl2Wb+z7LjPcnIOTuANdr+19+x7p3x78H+Lfh74d1y4+G93rujT6L/wkXhOLSYdW0/FtL9ku9Iuzu+w63pgORnnBHfr+JHwa/wCCOHxp+FPh6DwRpn7Tnxw8L6xo3ji/8Uf8Lbm8SDWviF4i077KRaeC9Xuto0/7Dhf7R0nUQCfC3/EzyGOv7j7NGhiqVTDKk/rl0tVLZczV2nbyvq2ukm22fZZFgvDDMcqw7+rLBYvS7/tVt3u7WVm07py63acUk2r/AKw/tMaPH8fvgr408L69oH9nyanYGK1gkuhf28GoWjP9k1S0u++RdDrkgMck45/ztP8AgpJ+xv4v+B0GneOl+0t4QHiPWPCNxp15Mf8Al01jUc6racD/AJfR39xyAc/6Ofgz4VeLfAHgOHRvHvj6X4l63Z2H+n67BaWmk+d/on+mXVppNjkWNjizH/Ev5/3ucH+Yv/gtV+yh8RfjH8CPhL4e+Gnhu8uPEXivxJ8QvHl1A8nkfZ7f/hIvFd3a/a7vGebG9szg89DkH5jzY/GPDRlUte7vqm1a813vf5rVrs2/fw2DwmYZU8rwj+uuy/sqVrXa5u73a5Vforq1rn2V/wAG3vjK0+Fv/BPDX/DWoeK9aNrcftC+Pte0O3a3Lm00vWPAnwmupYt2Rnz9XGrX/t9qUHJAJK53/gmPrfxD/wCCdP7Ivgz4A/Ejwa//AAk2q31z8U7mfSGN7p9zbeONK0Oe2kt7nI3rAmnmy6f8uw5J5JWP9s5V/LU/q/8Acfl+OrPgJ8FZgp1LYO653b3Y7c1bu7/yvXXe+tz9+f8AgmP418OTf8E2f2K9WsJ4002z/Z4+GeiibzP351nw74fHhrV7XAGeda0a6GPrkHJNY/7Vvxr/AGu/CnhLwd4r+Cnw20rxN4Wv/Fuo2HxFijubyfxno/gNdK1sWereEdIswTf63/bloucH/kFXmm8kgk/Bf/BEnxneTf8ABLT4JweJdTktJfC114xlgj1CW0+36X4V8X+Ita8YaSbwWRNgb7VLLVbTUcZwPtYySS275f8A24fix/wUG1/U9b1iw/ac+Ff7KvwKsbq40DwDLc2HinVPGvxH1n7LfXl5d3p0Z1OiaHp2LqwwCTi06E4DdtFUsPgHSelktdFHlvO+ras3d7O6skm0mz0+AeAKub8RvFUsNlVnmi0zSMnlVuafwqPM20nsk1ZzbunUk/0R/ZY/af8A2nPFPiCy0j41/CKPwjr2l+KJ7W58ZaZqFrfeEtY8GXebzSRdi9J1DQ/G4+1Wmnat4d5/tTVrbUtaBwTX3H4z+LWn6vdz2dpJuuYpRFLeRgjybnLDknHP8weRkAn+Z39mb4//ALcfg7xt4f03xXN4P/aR+Emq6oo8U/FLwHNq2h69oOnXdqRaXX9k3rH+29D+23V0R7nqe/7Q6Gpf/SbNvLtLu6t7qWbNncDN5asDxZHn7oHJz8wJHGS8FmGF9l7Klhl9butN1LWSTWradm7Pe2tm0fqfFXhtlWVZzisfH+yv5f8AhLva3NJ235bLl2V1aVov3bL1TxP4lvX8P6vanf8Aar+IWn7vtkuPXB4uhk+69Tknyv4pfCvTfHVs9lf+Hhrw8L/DC+8D2dlJdiC4m/4SNtQ8N6xdfaz/AMeNj9is7v1PzEckZr0zSrO286a41O8+0y2f+pt/K8/ycFidVxjPOT34I6kZr8cv+Csv/BU7xt+xhrvwc+CvwB/4Rr/hafjjw58Q/jT491HxBa2c8Hhb4RfDrwp4sOk2oGtH+w9D1v4j+KLC6/snUfEX/En0sWuohiW8QKa4cZifac0aur0actW9X5+7fRJLo2m4tXfzuGq/2dicPisGm1guVv3raXkt7WWmqSSb0s+blmvtTRNV+EX7N3g3wL8Gfi3qK6z4s8GeF4NPFxACXtdAGsa1/wAI1plwd4+bTNGWytLUY401LDnIJJXxr/wQx+FHi/8AbW/Yq8R/te/tX31z8R/ix+0D8ffiZ40vPEuuPommqfDukaX4J+H/AId0vQNKCGz0jwxpVj4L+yaBpGkY0bS7BU03TgIoDRWaweXNJ/VHsvsN783VO32fxer5Xf4yfHuZupUbxKu5yfxK+s62+u793v131Of1j48aX/wTr+Dfwk03xmiaP8K/i/fz6z4k8S/2haW8Hwx8O2g0jw34Iu9I0iywfsOo/wBqWlhq+nc/8Tf+0dazgkn9KPCvx0/ZT+JnwA0w+MdM8J/E618S33k2mnanLpOqm0uhpZsibX7ccX3GdQGoE5/0wnOVDH8rf+C0Pg7w1L+xt4CkOmhH0nwr4BvNNaG7v7c2d1oFhJqmizQeRdR7H06//wBLt+3m8uGXivxR/Ym1zW7b9lr9kTXo9X1KTVPEVh45u9cubq+urxNTuYPjz8StBhmu7W8muLWR00nTbKwB8gfuII8gybpDy53meIyaTxtBpu1knva7V9dE9u+l+up+u+HmUZJxpWwvCmNlmOXVlJZn/aOW1KcJOWlouLknf3rNaxs3fmSs/wCuTQNM+D1h4caz+HXh3T/B9lH9l+02WhxWluIbb5gT9lsiQMgA85IwcDJNc/oPxT8NeFybIeILcw29+P3Xmgfxah3z+J6jk8/Kc/lv8IfFPiPVfDOnR6jrWoXaGLTMrNcOR/y07Aj0H6ccc+w+Kba3Gi6fMIk82e7PnSY+eTDXo+Zs56E9D3PUkk/E1OL6mKpTnLDr3VFNe73notdmpa9dndtXf7q/CjD5P9b9vmLxnw2coST3m+rtF6aNXfndtv7T+IP7XvhHwto1xeQ3vnPZbfOueZ/NydQxpWP8TwOpzX8Ovxs/aV1b4/ftAf8ABRT9orxob3xDfz/Cuy/Z5+G72+uaRBPpE/jjVbPwJpNsPD+uMf7b8LEJqw1ZNOydLbVdN1oM5YatX9A/7WN3daD+z98QL3R7ibT7p/Der7p7eR1c/vNQte7Ef6j910+733c1/FR8PdY1K91nS9PurgTW2q/G/wAK3WpBoLbzrySa11VZYp7tYRdPZyAnfp5m+wEksbYsST38MYjEZ28Tia80vqmZpWd3zK8Htrd3lFu72Tj2kfhHivSwHD9fAZRhMLaGJu5TTdub343s5a7X7/Dq7Nv/AFlv+CffwwsfgR+xD+zB8KLOx1SOLwj8HPAdg7aVCTFPctoNnPdz3f8AxNtPxqD3Mkv235Ln98OdV1I51OYr7T+H2i6ZF8Ovh5DFbmOKHwN4QiijjuLpESNdBs9qqqzgYH5+pNFfqftcJ/z4l9/r/f8A6vtoj+XZWc5vXWTe7W8qvRPT/gve2v8A/9k=');
        navigator.camera.getPicture(successCb, errCb, opts);
    }

  ,getJpgPicture:function(successCb,errCb,type) {
    var self = this;
    var opts = {
      //destinationType : navigator.camera.DestinationType.DATA_URL,
      destinationType : navigator.camera.DestinationType.FILE_URI,
      //destinationType : navigator.camera.DestinationType.NATIVE_URI,
      //sourceType : navigator.camera.PictureSourceType.CAMERA,
      allowEdit : true,
      quality : 100,
      encodingType: Camera.EncodingType.JPEG,
      //targetWidth: 200,
      //targetHeight: 200,
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      mediaType : navigator.camera.MediaType.PICTURE,
      saveToPhotoAlbum : false
    };

    if(typeof type != 'undefined') {
      if(type == 0) {
        opts.sourceType=navigator.camera.PictureSourceType.CAMERA;
      }else {
        opts.sourceType=navigator.camera.PictureSourceType.PHOTOLIBRARY;
      }
      self.getPicture(opts,successCb,errCb);
    }else {
      var pupopId = '#albumOrCameraMenuDialog';

      var func = function(elt){
        type = $(elt.target).val();
        type = parseInt(type);
        $(pupopId).popup( "close" );
        if(type == 0) {
          opts.sourceType=navigator.camera.PictureSourceType.CAMERA;
        }else {
          opts.sourceType=navigator.camera.PictureSourceType.PHOTOLIBRARY;
        }
        //$.mobile.back();
        self.getPicture(opts,successCb,errCb);
      }
      $(pupopId +' #radio-choice-1').unbind('click').click(func);
      $(pupopId +' #radio-choice-2').unbind('click').click(func);
      $(pupopId).popup( 'open', {transition:'fade', positionTo:'window'});
    }

    //$(pupopId).page('open',{transition:'fade'});
    //$.mobile.changePage(pupopId,{transition:'fade'});
  }

    //type = 0, camera
    //type = 1, album
    ,getBase64Picture:function(successCb,errCb,type) {
        var self = this;
        var opts = {
            destinationType : navigator.camera.DestinationType.DATA_URL,
            //sourceType : navigator.camera.PictureSourceType.CAMERA,
            allowEdit : true,
            quality : 100,
            encodingType: Camera.EncodingType.JPEG,
            //targetWidth: 200,
            //targetHeight: 200,
            //popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            mediaType : navigator.camera.MediaType.PICTURE,
            saveToPhotoAlbum : false
        };

        if(typeof type != 'undefined') {
            if(type == 0) {
                opts.sourceType=navigator.camera.PictureSourceType.CAMERA;
            }else {
                opts.sourceType=navigator.camera.PictureSourceType.PHOTOLIBRARY;
            }
            self.getPicture(opts,successCb,errCb);
        }else {
            var pupopId = '#albumOrCameraMenuDialog';

            var func = function(elt){
                type = $(elt.target).val();
                type = parseInt(type);
                $(pupopId).popup( "close" );
                if(type == 0) {
                    opts.sourceType=navigator.camera.PictureSourceType.CAMERA;
                }else {
                    opts.sourceType=navigator.camera.PictureSourceType.PHOTOLIBRARY;
                }
                //$.mobile.back();
                self.getPicture(opts,successCb,errCb);
            }
            $(pupopId +' #radio-choice-1').unbind('click').click(func);
            $(pupopId +' #radio-choice-2').unbind('click').click(func);
            $(pupopId).popup( 'open', {transition:'fade', positionTo:'window'});
        }

        //$(pupopId).page('open',{transition:'fade'});
        //$.mobile.changePage(pupopId,{transition:'fade'});
    }

    //aLink,imgId,width,height,loc,cb
    ,selectOnePicture: function(opts) {
        var self = this;
        if(!opts.aLink) {
            myalbum.ui.showAlert('连接无效');
            return;
        }

        if(!opts.imgId) {
            opts.imgId = '';
        }

        if(!opts.width) {
            opts.width = 100;
        }

        if(!opts.height) {
            opts.height = 100;
        }

        if(typeof opts.loc  == 'undefined') {
            opts.loc = true;
        }

        //type = 0, camera
        //type = 1, album
        self.getBase64Picture(function(imageData){
            var dataSrc = 'data:image/jpeg;base64,' + imageData;
            var pos = null;
            var uploadFunc = function() {
                myalbum.urls.uploadBase64Picture(dataSrc,'jpeg',function(err,data1){
                    if(err) {
                        myalbum.ui.showAlert('头像上传失败');
                        return;
                    }
                    var url = myalbum.urls.FILE_SERVER  + data1.url;
                    data1.base64Data = dataSrc;
                    var img = $('<img id="' +opts.imgId+ '" src="'+url+'&width='+opts.width+'&height=' + opts.height +'">')
                        .jqmData('iconUrl',data1.url);
                    if(pos) {
                        img.jqmData('pos',pos);
                    }
                    $(opts.aLink).empty().append(img);
                    if(opts.cb) {
                        opts.cb(null,data1)
                    }
                },pos);
            }
            if(opts.loc) {
                myalbum.map.curAMapPosition(function(err,position){
                    if(err){
                        myalbum.ui.showAlert('获取位置信息失败');
                    }
                    pos = position;
                    uploadFunc();
                })
            }else{
                uploadFunc();
            }

        },function(err,data){
            if(err) {
                myalbum.ui.showAlert("获取图片错误");
            }
        });
    }
}
