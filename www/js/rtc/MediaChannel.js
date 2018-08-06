techgy =  typeof techgy == 'undefined'? {}:techgy;
techgy.va =  typeof techgy.va == 'undefined'? {}:techgy.va;

techgy.va.MediaChannel = function(params) {
    
	if(!params.singnalChannel){
		throw 'singnalChannel cannot be null, ID: ' + params.id;
	}
	
	this.singnalChannel = params.singnalChannel;
	
	if(!params.gotStream){
		throw 'streamListener cannot be null, ID: ' + params.id;
	}
	
	this.gotStream = params.gotStream;
	
	if(params.isCaller == null || typeof params.isCaller == 'undefined') {
	    throw 'isOffer cannot be NULL, ID: ' + params.id;
	}
	
	this.id = params.id;
	
	 //是否是主动方
    this.isOffer = params.isCaller;
    
    this.localStream = params.localStream;
    //对方视频流
    this.remoteStream = null;
	
	if(params.screen) {
		//屏幕共享
		this.screen_ = params.screen;
	}
	
    this.peer = null;
    
    this.sdpReady = false;

    if(this.isOffer) {
        this.createOfferPeer();
    }
};


techgy.va.MediaChannel.prototype.gotRemoteStreamEnded = function(remoteMediaStream) {
	
};

techgy.va.MediaChannel.prototype.sendicecandidate = function (candidate) {
	this.singnalChannel.sendMessage({
        'type':techgy.va.Constans.CANDIDATE,
        "candidate": candidate,
        'toMobile': this.id
    });
};

//if(stream) video.src = webkitURL.createObjectURL(stream);
techgy.va.MediaChannel.prototype.gotremotetream = function (remoteStream) {
	//与对方连接建立
	if(!remoteStream) {
		 console.log('got error stream');
		return;
	}
	
    this.remoteStream = remoteStream;
    if(this.gotStream) {
    	this.gotStream(remoteStream);
    }
    //this.remoteUrl = window.URL.createObjectURL(this.remoteStream );    
};

/**
 * sdp.type === 'offer'
 * sdp.sdp
 */
techgy.va.MediaChannel.prototype.sendSDP = function(sdp) {
   	//主叫者给Offer对方
	var type = this.isOffer ? 'offer' : 'answer';
   	this.singnalChannel.sendMessage({
           'type':type,
           "sdp": sdp.sdp,
           'toMobile': this.id
    });
   	this.sdpReady = true;
};

techgy.va.MediaChannel.prototype.createOfferPeer = function() {
	this.peer = RTCPeerConnection({
	    attachStream	: this.localStream,
	    onICE     		: xrf.utils.bind(this,this.sendicecandidate),
	    onRemoteStream  	: xrf.utils.bind(this,this.gotremotetream),
	    onRemoteStreamEnded: xrf.utils.bind(this,this.gotRemoteStreamEnded),
	    onOfferSDP    	: xrf.utils.bind(this,this.sendSDP)
	});
};

techgy.va.MediaChannel.prototype.createAnswerPeer = function(msg) {
	this.peer = RTCPeerConnection({
	    attachStream	   : this.localStream,
	    onICE     		   : xrf.utils.bind(this,this.sendicecandidate),
	    onRemoteStream     : xrf.utils.bind(this,this.gotremotetream),
	    onRemoteStreamEnded: xrf.utils.bind(this,this.gotRemoteStreamEnded),
	    offerSDP    	   : {type: 'offer',sdp: msg.sdp},
	    onAnswerSDP      : xrf.utils.bind(this,this.sendSDP)
	});
};

techgy.va.MediaChannel.prototype.doAddCandidate_ = function (msg) {
	this.peer.addICE({
	    sdpMLineIndex: msg.candidate.sdpMLineIndex,
	    candidate    : msg.candidate.candidate
	});
}

techgy.va.MediaChannel.prototype.addCandidate_ = function (msg) {
	//交换彼此IP，端口等等连接信息，以建立一个端对端连接
	if(this.sdpReady) {
		this.doAddCandidate_(msg);
	} else {
		setTimeout(xrf.utils.bind(this,function(){
			this.doAddCandidate_(msg);
		}),2000);
	}
};


techgy.va.MediaChannel.prototype.onMessage = function (msg) {
    if(!msg) {
        alert('error');
        throw 'receive error message';
    }
    if(msg.sdp) {
    	if(this.isOffer) {
    		this.peer.addAnswerSDP({
    			'sdp': msg.sdp,
    			'type' : 'answer',
                toMobile:this.id
    		});
    	}else {
    		this.createAnswerPeer(msg);
    	}
    }else if(msg.candidate) {
    	this.addCandidate_(msg);
    }
};

techgy.va.MediaChannel.prototype.close = function() {
    
    if(this.peer) {
    	if(this.localStream) {
    		this.peer.peer.close();
    	}
    	this.peer = null;
    }
    
    this.singnalChannel=null;
    
    this.localStream = null;
    
	//屏幕共享
	this.screen_ = null;
	 //是否是主动方
    this.isOffer = null;
    
	//对方视频UIt the vedio control
    this.localStream = null;
    //对方视频流
    this.remoteStream = null;
    this.peer = null;
}



