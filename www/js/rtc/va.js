techgy =  typeof techgy == 'undefined'? {}:techgy;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

window.RTCPeerConnection = window.webkitRTCPeerConnection 
    || window.mozRTCPeerConnection || window.msRTCPeerConnection

    
techgy.va =  {

	sigalChannel : {
        notify:function(data) {
            if(!data) {
                data = {};
            }
            data.to = techgy.va.reAn,
            data.from = techgy.va.myAn,
            xrf.wsk.emit(techgy.va.Constants.WebRTC,data);
        }
        ,onMessage:function(msg) {
            techgy.va.onMessage(msg);
        }
    }

    ,localMeidiaState: null

    ,step:''

    ,video:false

    //对方账号
    ,reAn :  null

    //自身账号
    ,myAn :  null

    //是否是主动方
    ,isCaller :  false

    //对方视频UIt the vedio control
    ,remotePanel :  null

    //己方视频UI
    ,localPanel :  null

    //己方视频流
    ,localStream_ :  null

    //对方视频流
    ,remoteStream_ :  null

    ,peer_  :  null

    ,configuration :  {
       iceServers: [
                     {url: "stun:23.21.150.121"},
                     {url: "stun:stun.l.google.com:19302"},
                     {url: "turn:numb.viagenie.ca", credential: "webrtcdemo", username: "louis%40mozilla.com"}
       ]
    }

    ,mediaConstraints :  {
        optional: [],
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        }
    }

    ,hIncStep :  80

    ,vIncStep :  60
    
    /**
     * 打开两个窗口，
     * localPanel: 本地视频窗口 net.cmty.ui.core.video.Video实例
     * remotePanel: 对方视频窗口 net.cmty.ui.core.video.Video实例
     * isCaller ： 是否是主叫方
     * optDoc Document
     */
    ,createPeeer :  function() {
    	var self = this;
        self.peer = new RTCPeerConnection(this.configuration);
    	
    	 // send any ice candidates to the other peer
        self.peer.onicecandidate = function (evt) {
            self.sigalChannel.notify({
                type:techgy.va.Constants.CANDIDATE,
                candidate: evt.candidate
            });
        };
        
        // once remote stream arrives, show it in the remote video element
        this.peer.onaddstream = function (evt) {
            //与对方连接建立
            self.remoteStream_ = evt.stream;
            if(!self.remoteStream_) {
                //对方视频不可用
                xrf.ui.showAlert('fail to get remote stream');
            } else {
                if(self.remotePanel) {
                    self.remotePanel.src = window.URL.createObjectURL(self.remoteStream_);
                }
            }
        };
    }

    ,getUserMedia:function(cb) {
        var self = this;
        navigator.getUserMedia({
            video : self.video,
            audio : true
        }, function(stream){
            self.localStream_ = stream;
            if(self.peer) {
                //for caller to execute
                self.peer.addStream(stream);
            }
            if(self.localPanel){
                self.localPanel.src = window.URL.createObjectURL(self.localStream_);
            }
            if(cb) {
                cb(null,true);
            }
        }, function(error) {
            console.log(error);
            if(cb) {
                cb(error,false);
            }
            self.localMeidiaState="Failure";
        });
    }

    ,onMessage :  function(msg) {
        if(!msg) {
            throw 'receive error message';
        }
        var self = this;
        switch(msg.type) {
            case techgy.va.Constants.OFFER: {
            	 //被叫收到Offer之后，才能创建连接
                self.createPeeer();
                try{
                	//设置主动方信息到本地
                    self.peer.setRemoteDescription(new RTCSessionDescription(msg.sdp));//12
                }catch(e){
                    console.log("setRemoteDescription error.",e.message);
                    throw e;
                }
                //给主动方一个应答，并告诉对本地信息
                self.peer.createAnswer(function(desc){
                    self.peer.setLocalDescription(desc);
                    //被叫方发应答
                    self.sigalChannel.notify({
                        type:techgy.va.Constants.ANSWER,
                        sdp: desc
                    });
                });
                if(self.localStream_) {
                    //for 被动方执行
                    self.peer.addStream(self.localStream_);
                }
                break;
            }  
            case techgy.va.Constants.ANSWER: {
                //主动方收到应答
                //主动方接受到对方信息，并设置到本地
                try{
                    self.peer.setRemoteDescription(new RTCSessionDescription(msg.sdp));//12
                }catch(e){
                    console.log("setRemoteDescription error.",e.message);
                    throw e;
                }
                if(self.localStream_) {
                    //for 主动方执行
                    self.peer.addStream(self.localStream_);
                }
                break;
            }
            case techgy.va.Constants.CANDIDATE: {
            	//交换彼此IP，端口等等连接信息，以建立一个端对端连接
                try{
                    if(msg.candidate) {
                        self.peer.addIceCandidate(new RTCIceCandidate(msg.candidate));
                    }     
                }catch(e) {
                    console.log(e);
                }   
                break;
            }
            case techgy.va.Constants.RESP_INVITE: {
                if(!msg.accept) {
                    xrf.ui.showAlert(msg.reason);
                    return;
                }
                self.reAn = msg.from;
                self.createPeeer();
                self.peer.createOffer(function(desc) {
                    self.peer.setLocalDescription(desc);
                    //主叫者给Offer对方
                    self.sigalChannel.notify({
                        type:techgy.va.Constants.OFFER,
                        sdp: desc
                    });
                });
                break;
            }
            case techgy.va.Constants.INVITE: {
                var self = this;
                self.reAn = msg.from;
                self.myAn = xrf.uc.curUser.data.actId;
                self.isCaller = false;
                self.video=msg.video;

                msg.type = techgy.va.Constants.RESP_INVITE;
                msg.accept=true;
                msg.reason='';

                self.openCall(self.video,function(err,success){
                    if(success) {
                        self.getUserMedia(function(e,suc){
                            if(e) {
                                msg.reason='对方多媒体设备不可用';
                            }
                            //msg.reAn = self.myAn;
                            self.sigalChannel.notify(msg);
                        });
                    }
                });
                break;
            }
        }     
    }

    ,call: function(inputId,audioPlayerId) {

        var mobile = $(inputId).val();
        if(!mobile || mobile.trim() == '') {
            xrf.ui.showAlert('你输入号码不能为空');
            return ;
        }

        var self = this;
        self.myAn = xrf.uc.curUser.data.actId;
        self.isCaller = true;
        self.localPanel = audioPlayerId;

        self.getUserMedia(function(err,succtss){
            var msg = {
                type:techgy.va.Constants.INVITE,
                mobile:mobile,
                video:self.video
            }
            if(err) {
                msg.reason='对方多媒体设备不可用';
            }
            self.sigalChannel.notify(msg);
        });
    }

    ,openCall: function(video,cb) {
        this.remotePanel = document.getElementById('#autioPlayerId');
        var func = function() {
            this.video = video;
            $.mobile.changePage('#contactSomeonePage', { transition: 'flip' });
            if(cb) {
                cb(null,true);
            }
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

    ,Constants:{
        WebRTC:'WebRTC',
        INVITE: 'invite',
        RESP_INVITE: 'respInvite',
        OFFER: 'offer',
        ANSWER: 'answer',
        CANDIDATE: 'candidate',
        SDP:'sdp',
        END: 'end',
        GET_MEDIA_STATUS: 'media_status',
        GET_MEDIA_SUCCESS: 'success',
        GET_MEDIA_FAILURE: 'failure'

    }
}

