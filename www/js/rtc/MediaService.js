techgy =  typeof techgy == 'undefined'? {}:techgy;
techgy.va =  typeof techgy.va == 'undefined'? {}:techgy.va;

navigator.getUMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia;

techgy.va.Constans = {
	    OFFER: 'offer',
	    ANSWER: 'answer',
	    CANDIDATE: 'candidate',
	    GET_MEDIA_STATUS: 'mediaStatus',
	    GET_MEDIA_SUCCESS: 'success',
	    GET_MEDIA_FAILURE: 'failure',
	    USING: 'using',
		CAMERA_MODEL_VIDEO : "video",
	    CAMERA_MODEL_AUDIO : "audio",
	    CAMERA_MODEL_SCREEN : "screen",
	    CAMERA_MODEL : "cameraModel"
        ,WebRTC:'WebRTC'
        ,INVITE: 'invite'
        ,STOP: 'stop'
        ,RESP_INVITE: 'respInvite'
};

techgy.va.MediaService = function() {
    this.contexts = {};
    this.isRunint = false;
}

techgy.va.MediaService.screenConfiguration = {
	    audio: false,
	    video: {
		    mandatory: {
		        chromeMediaSource: 'screen',
		        maxWidth: 200,
		        maxHeight: 400,
		        minAspectRatio: 1.77
		    },
		    optional: []
	}
};

techgy.va.MediaService.videoConstraints = {
        video : true,
        audio : true
 };

techgy.va.MediaService.audioConstraints = {
        video : false,
        audio : true
 };

techgy.va.MediaService.prototype = {
		
    createContext : function(id) {
        if(!id) {
            throw "id cannot be null";
        }

        if(this.contexts[id]) {
            this.destroyContext(id);
            //throw "context exist: " + id;
        }
        this.contexts[id] = {fromMobile:xrf.uc.curUser.data.mobile,toMobile:id
            ,from: xrf.uc.curUser.data.actId,to:null };
        return this.contexts[id];
    },

    sendMessage : function(msg) {
        if(!msg.type) {
            throw 'message type cannot be null';
        }
        if(!msg.toMobile) {
            throw 'To Mobile cannot be null';
        }
        var cxt = this.getContext_(msg.toMobile);
        if(!cxt) {
            throw 'Context is null';
        }

        msg.fromMobile=cxt.fromMobile;
        msg.to=cxt.to;
        msg.from=cxt.from;

        xrf.wsk.emit(techgy.va.Constans.WebRTC, msg);
     },

     onMessage : function(msg) {
        if(!msg.from) {
            throw "id cannot be null";
        }
         var self = this;
         if(msg.reason && msg.reason != '') {
             console.log(msg.reason);
         }
         if(msg.sdp || msg.candidate) {
             var ctx = this.getContext_(msg.fromMobile);
             if(!ctx.channel) {
                 throw "Channel is not open";
             }
             ctx.channel.onMessage(msg);
         } else {
             var cxt = self.contexts[msg.fromMobile] ? self.contexts[msg.fromMobile]
                 :self.createContext(msg.fromMobile);
             cxt.to = msg.from;
             switch(msg.type) {
                 case techgy.va.Constans.RESP_INVITE: {
                     if(!msg.accept) {
                         xrf.ui.showAlert(msg.reason);
                         self.destroyContext(msg.fromMobile);
                         return;
                     } else {
                         cxt.reMediaStatu = msg.mediaStatu;
                         if(!cxt.myMediaStatu && !cxt.reMediaStatu) {
                             xrf.ui.showAlert('双方媒体设备不可用');
                             self.destroyContext(msg.fromMobile);
                         } else {
                             self.createMediaChannel(msg.fromMobile);
                         }
                     }
                     break;
                 }
                 case techgy.va.Constans.INVITE: {
                     var playerId = null;
                     if(msg.video) {
                         playerId = '#videoPlayerId';
                     }else {
                         playerId = '#autioPlayerId';
                     }
                     cxt.isCaller = false;
                     cxt.video = msg.video;
                     cxt.remotePanel = $(playerId);
                     cxt.remotePanel.parent().css({display:'block'})
                     cxt.reMediaStatu = msg.mediaStatu;
                     cxt.myMediaStatu = true;

                     msg.type = techgy.va.Constans.RESP_INVITE;
                     msg.accept = true;
                     msg.reason = '';
                     msg.mediaStatu = true;
                     msg.toMobile = msg.fromMobile;

                     if(this.isRuning) {
                         msg.accept = false;
                         msg.mediaStatu = false;
                         msg.reason='对方设备正在使用中';
                         console.log('我方多媒体设备正在使用中');
                         self.sendMessage(msg);
                         self.destroyContext(msg.fromMobile);
                         return;
                     }

                     this.isRuning = true;

                     self.openAnswer(msg.toMobile,function(err,success){
                         if(err) {
                             msg.accept = false;
                             msg.reason='对方拒绝你的通话请求';
                             self.sendMessage(msg);
                             self.destroyContext(msg.fromMobile);
                             console.log('你拒绝对方的通话请求');
                             return;
                         } else {
                             if(cxt.video) {
                                 cxt.cameraModel = techgy.va.Constans.CAMERA_MODEL_VIDEO
                             }else {
                                 cxt.cameraModel = techgy.va.Constans.CAMERA_MODEL_AUDIO
                             }
                             self.openCamera(cxt.cameraModel
                             ,function(e,stream){
                                 if(e) {
                                     cxt.myMediaStatu = false;
                                     msg.mediaStatu = false;
                                     msg.reason='对方多媒体设备不可用';
                                     if(!cxt.reMediaStatu) {
                                         msg.accept = false;
                                         msg.reason='双方多媒体设备不可用';
                                         self.sendMessage(msg);
                                         self.destroyContext(msg.fromMobile);
                                         return;
                                     }
                                 }

                                 cxt.localStream = stream;
                                 cxt.localUrl = window.URL.createObjectURL(stream);

                                 self.createMediaChannel(msg.fromMobile,
                                     function(error,success){
                                         if(error) {
                                             msg.accept = false;
                                             msg.reason='对方多媒体设备不可用';
                                         }
                                         self.sendMessage(msg);
                                    });
                             });
                         }
                     });
                     break;
                 }
                 case techgy.va.Constans.STOP: {
                     xrf.ui.showAlert('对方中断对话');
                     this.stopCall(msg.fromMobile,true);
                     break;
                 }
             }
         }
    },

    createMediaChannel : function(mobile,cb) {
        if(!mobile) {
            throw "id cannot be null";
        }
        var self = this;
        var cxt = self.getContext_(mobile);
        var params = {};
        params.localStream = cxt.localStream;
        params.singnalChannel = this;
        params.isCaller = cxt.isCaller;
        params.id = mobile;

        params.gotStream = function(remoteStream) {
            cxt.remoteStream = remoteStream;
            cxt.remoteUrl = window.URL.createObjectURL(remoteStream);
            if(cxt.remotePanel) {
                cxt.remotePanel.attr('src',cxt.remoteUrl);
            }
        };
        cxt.channel = new techgy.va.MediaChannel(params);
        if(cb) {
            cb(null,true);
        }
    },

    getContext_ : function(id) {
        var cxt = this.contexts[id];
        if(!cxt) {
            throw "Context is not init: " + id;
        }
        return cxt;
    },
    	
    openCamera : function(cameraModel,cb) {

        if(typeof cameraModel == 'undefined'){
            throw "CameraModel cannot be null";
        }
        var self = this;

        var constraint = null;
        if(cameraModel ===  techgy.va.Constans.CAMERA_MODEL_VIDEO) {
            constraint =techgy.va.MediaService.videoConstraints;
        } else if(cameraModel ===  techgy.va.Constans.CAMERA_MODEL_SCREEN) {
            constraint =techgy.va.MediaService.screenConfiguration;
        } else if(cameraModel ===  techgy.va.Constans.CAMERA_MODEL_AUDIO) {
            constraint =techgy.va.MediaService.audioConstraints;
        } else {
            throw "camera model not support : " + cameraModel;
        }

        var succeFunc = function(localStream){
            var mediaStatu = null;
            if(!localStream) {
                mediaStatu = techgy.va.Constans.GET_MEDIA_FAILURE;
            }else {
                mediaStatu = techgy.va.Constans.GET_MEDIA_SUCCESS;
            }
            if(cb) {
                cb(null,localStream);
            }
        };

        var failFunc = function(error) {
            //本地视频不可用，但还是可以看对方视频
            console.log(error);
            if(cb) {
                cb(error,null);
            }
        };
        navigator.getUMedia(constraint, succeFunc, failFunc);
    }

    ,startCall: function(video) {

        var inputId = '#contactSomeonePage #callMobileNum';

        var mobile = $(inputId).val();
        if(!mobile || mobile.trim() == '') {
            xrf.ui.showAlert('你输入号码不能为空');
            return ;
        }
        var self = this;
        var cxt = self.createContext(mobile);
        cxt.isCaller = true;
        cxt.video = video;

        var playerId = null;
        if(video) {
            playerId = '#videoPlayerId';
        }else {
            playerId = '#autioPlayerId';
        }

        cxt.remotePanel = $(playerId);
        cxt.remotePanel.parent().show();
        $('#contactSomeonePage #voiceMode').parent().show();

        if(cxt.video) {
            cxt.cameraModel = techgy.va.Constans.CAMERA_MODEL_VIDEO
        }else {
            cxt.cameraModel = techgy.va.Constans.CAMERA_MODEL_AUDIO
        }

        self.openCamera(cxt.cameraModel
        ,function(err,stream){
            cxt.localStream = stream;
            cxt.localUrl = window.URL.createObjectURL(stream);
            cxt.myMediaStatu = true;
            var msg = {
                type:techgy.va.Constans.INVITE,
                toMobile:mobile,
                fromMobile:xrf.uc.curUser.data.mobile,
                video:cxt.video,
                from:xrf.uc.curUser.data.actId,
                to:null
            }
            if(err) {
                cxt.myMediaStatu = false;
                msg.reason='对方多媒体设备不可用';
                msg.mediaStatu=cxt.myMediaStatu;
            }
            $('#contactSomeonePage #callAction').unbind('click').click(function(){
                self.stopCall(cxt.toMobile,false);
            }).val('挂断');
            self.sendMessage(msg);
        });
    }

    ,stopCall:function(mobile,isPositive) {
        if(!isPositive) {
            var cxt = this.contexts[mobile];
            if(!cxt) {
                return;
            }
            if(!cxt.hasNotify) {
                var msg = {
                    type:techgy.va.Constans.STOP,
                    toMobile:mobile
                }
                this.sendMessage(msg);
                cxt.hasNotify=true;
            }
        }
        this.destroyContext(mobile);
        $.mobile.back();
    }

    ,openCaller: function(video,mobile) {
        if(this.isRuning) {
            xrf.ui.showAlert('设备正在使用中');
            return ;
        }
        this.isRuning = true;
        var self = this;
        var panelId = '#contactSomeonePage';

        var func = function() {
            $.mobile.changePage(panelId, { transition: 'flip' });
            if(mobile) {
                var inputId = panelId + ' #callMobileNum';
                $(inputId).val(mobile);
                techgy.va.ms.startCall(video);
            }else {
                $(panelId + ' #callAction').unbind('click').click(function(){
                    techgy.va.ms.startCall(video);
                }).css({width:'95%' }).val('拨打');
            }
            $(panelId + ' #rejectAction').parent().hide();
        }
        if(xrf.uc.isLogin()) {
            func();
        } else {
            xrf.uc.doLogin(function(err,data){
                if(!err) {
                    func();
                }else {
                    xrf.ui.showAlert('未登录用户不能拨打电话');
                }
            });
        }
    }

    ,openAnswer: function(mobile,cb) {

        if(!cb) {
            throw 'offer call back function cannot be null';
        }
        var self = this;
        var inputId = '#contactSomeonePage #callMobileNum';
        $(inputId).val(mobile);
        var func = function() {
            var panelId = '#contactSomeonePage';
            var callAction = $(panelId + ' #callAction');
            var rejectAction = $(panelId + ' #rejectAction');

            callAction.unbind('click').click(function(){
                callAction.val('挂断').unbind('click').click(function(){
                    self.stopCall(mobile,false);
                });
                rejectAction.parent().hide();
                if(cb){
                    cb(null,true);
                }
            }).css({width:'95%' }).val('接受');

            rejectAction.parent().show();
            rejectAction.val('拒绝')
            .unbind('click').click(function(){
                if(cb){
                    cb('拒绝',false);
                }
                $.mobile.back();
            });
            $.mobile.changePage(panelId, { transition: 'flip' });
            $(panelId + ' #voiceMode').parent().show();
        }
        if(xrf.uc.isLogin()) {
            func();
        } else {
            xrf.uc.doLogin(function(err,data){
                if(!err) {
                    func();
                }else {
                    xrf.ui.showAlert('未登录用户不能拨打电话');
                }
            });
        }
    }

    ,changeVoiceMode:function(elt) {
        var btn = $(elt);
        if(btn.jqmData('voiceMode')== AudioToggle.SPEAKER) {
            AudioToggle.setAudioMode(AudioToggle.EARPIECE);
            $('#contactSomeonePage #voiceMode').jqmData('voiceMode',AudioToggle.EARPIECE)
            btn.text('扬声器');
        }else {
            AudioToggle.setAudioMode(AudioToggle.SPEAKER);
            $('#contactSomeonePage #voiceMode').jqmData('voiceMode',AudioToggle.SPEAKER)
            btn.text('听筒');
        }
    }

    ,closeCamera : function(motile) {
        if(!motile) {
            throw "id cannot be null";
        }

        try{
            var cxt = this.getContext_(motile);
            if(!cxt) {
                return;
            }
        }catch(err){
            return;
        }

        if(cxt.localStream) {
            cxt.localStream.stop();
            cxt.localStream = null;
            cxt.localUrl = null;
        }
    }

    ,destroyContext : function(motile) {
        if(!motile) {
           for(var key in this.contexts) {
               this.destroyContext(key);
           }
            return;
        }
        $('#contactSomeonePage #voiceMode').parent().hide();

        this.closeCamera(motile);

        var id = motile;
        var cxt = this.contexts[id];
        if(!cxt) {
            return;
        }

        if(cxt.remotePanel){
            cxt.remotePanel.attr('src',"");
            cxt.remotePanel.parent().css({display:'none'})
        }

        if(cxt.localPanel){
            cxt.localPanel.attr('src',"");
            cxt.localPanel.parent().css({display:'none'})
        }

        if(cxt.remoteUrl){
            cxt.remoteUrl.src = null;
        }

        var localStream = cxt.localStream;
        if(localStream) {
            localStream.stop();
        }

        var channel = cxt.channel;
        if(channel) {
            channel.close();
        }
        this.isRuning = false;
        delete this.contexts[id];
    }
};

techgy.va.ms = new techgy.va.MediaService();


