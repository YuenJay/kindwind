
var $Class = function(contentId){
	this._core = $(contentId);
	$(document).bind("contextmenu",function(){return false;});
	$(document).bind("selectstart",function(){return false;});
	this.url = "/class/$1";
	this._doc = ".document";
	this._code = ".keyboard";
	this.input=1;
	this.line=90;
	this.wpm=0;
	this.accuracy=0;
	this.mytext="";
	this.back=0;
	this.mode=!1;
	this.errorWord = [];
	return this;
}

$Class.prototype = {
	start:function(){
		this._start = this.now();
	},
	setName:function(name){
		this.msg(1,name);
	},
	setEndTime:function(n){
		this._end = n;
		this.msg(3,n);
	},
	setColorBlindMode:function(t){
		this.mode = !!t;
	},
	getResult:function(){
		return {
			wpm:this.wpm,
			accuracy:this.accuracy,
			text:this.mytext,
			errorWord:this.errorWord
		}
	},
	over:function(){
			this._over = !0;
			clearInterval(this.timeHandle);
			this.jj();
			console.log(this.getResult());
	},
	len:function(s) {
	    return s.replace(/[^\x00-\xff]/g, "..").length;
	},
	now:function() {
	    return new Date().getTime();
	},
	time:function(){
		return (this.now() - this._start) /1000;
	},
	sub:function(str,start,end) {
	 	var startLen=0;
	 	var result="";
	    var chineseRegex = /[^\x00-\xff]/g;
	    for(var i=0;i<str.length;i++){
	    	var s = str[i];
	    	startLen += s.match(chineseRegex) != null?2:1;
	        if (startLen>end){
	        	continue;
	        }
	        if (startLen>start){
	        	result += s;
	        }
	    }
		return result;

	},
	msg:function(n,text){
		$("#title>span:eq(" + (n-1) + ")").text(text);
	},
	jj:function(){
			if (this.inputChinese){
				return;
			}
			var time = parseInt(this.time());
			this.msg(2,time);
			var o = $(".over");
			var l = "";
			var w = 0;
			l += o.text().replace("\n","");
			l += $(".Jay").val();
			this.wpm = parseInt((l.length/time)*60);
			this.msg(4,this.wpm);
			for(var i=0;i<l.length;i++){
				if (this._text[i] != l[i]){
					w++;
				}
			}
			this.msg(6,w);
			if (this._over){
				this.accuracy = parseInt(((this._text.length-w)/this._text.length)*100);
			}else{
				this.accuracy = parseInt(((l.length-w)/l.length)*100);
			}
			if (!isNaN(this.accuracy)){
				this.msg(7,this.accuracy);
			}
			this.mytext = l;
			if (time > this._end - 1 && !this._over){
				$(".Jay").parent().append($(".Jay").val());
				$(".Jay").val('').hide();
				this.over();
			}
	},
	Load:function(docName){
		var me = this;
		documentUrl = me.url.replace('$1',docName)+me._doc;
		keyboardUrl = me.url.replace('$1',docName)+me._code;
		me.text = $.ajax({url:documentUrl,async:false}).responseText.replace(/(\n|\r\n)/ig,"<br/>");
		me.code = JSON.parse($.ajax({url:keyboardUrl,async:false}).responseText);
		this.msg(5,this.text.replace("<br/>","").length);
		var array = this.format_text(this.text.split("<br/>"));
		this._text = this.text.replace(/<br\/>/g,"");
		var r = "";
		for(var i=0;i<array.length;i++){
			r += "<div class=layer><div class=line>"+array[i]+"</div><div class=over></div></div>";
		}
		me._array = array;
		me.timeHandle = setInterval(function(){
			me.jj();
			console.log("111");
		}, 1000);
		me._core.html(r);
		$(".over:first").html("<input type=text autocomplete=off name=class class=Jay />");
		$(".Jay").focus();
		$(".Jay").bind({
			"blur":function(){
				$(".Jay").focus();
			},
			"compositionstart":function(){
                me.inputChinese = true;
            },
            "compositionend":function(){
                me.inputChinese = false;
            },
            "keydown":function(e){
				if (me.inputChinese){
					return;
				}
				if (e.keyCode == 8){
					var l = $(".over").text().replace("\n","") + $(this).val();
					me.errorWord.push(me._text[l.length-1]);
					me.back ++;
					me.msg(8,me.back);
				}
            },
  			"keyup":function(e){
				if (me.inputChinese){
					return;
				}
				if (e.keyCode == 32){
					$(this).val($(this).val().replace(/\s/g,"　"));
				}
				var layer = $(this).parent().prev().text();
				var jay = $(this).val();
				var t = "";
				var l = $(".over").text().replace("\n","") + jay;
				if (l.length < me.code.length){
						me.msg(9,me._text[l.length]);
					if (typeof me.code[l.length]['py'] != 'undefined'){
						me.msg(10,me.code[l.length]['py']);
						me.msg(11,me.code[l.length]['wb']);
					}else{
						me.msg(10,'');
						me.msg(11,'');
					}
				}
				for (var i=0;i<layer.length;i++){
					if (jay[i]){
						if (me.mode){
							t += "<font color="+(layer[i]==jay[i]?"blue":"orange")+">"+layer[i]+"</font>";
						}else{
							t += "<font color="+(layer[i]==jay[i]?"green":"red")+">"+layer[i]+"</font>";
						}
					}else{
						t += layer[i];
					}
				}
				$(this).parent().prev().html(t);
				var tmpString='';
				if ((jay.length>=layer.length && e.keyCode == 13) || jay.indexOf(layer) == 0){
					tmpString = jay.indexOf(layer) == 0?layer:jay;
					if (me.input<me._array.length){
						$(this).parent().append("<span>"+tmpString+"</span>");
						$(this).parent().parent().next().find(".over").append($(this));
						me.input++;
						$(this).val(jay.replace(layer,""));
						if (e.keyCode == 13){
							$(this).val("");
						}
						$(this).focus();
					}else{
						$(this).parent().append("<span>"+tmpString+"</span>");
						$(this).val("");
						$(this).hide();
						me.over();
					}
				}
			},
			"copy":function(){
				return false;
			},
			"paste":function(){
				return false;
			},
			"cut":function(){
				return false;
			}});
	},
	format_text:function(textArray){
		var TA = [];
		for (var d in textArray){
			var L = textArray[d];
			var ll = this.len(L);
			var ii = Math.ceil(ll/this.line);
			for (var i =0;i<ii;i++){
				TA.push(this.sub(L,i*this.line,(i+1)*this.line));
			}
		}
		return TA;
	}
}

$(function(){
	var n = new $Class("#content");
	n.Load('test');
	// n.setColorBlindMode(!0); //色盲模式
	n.setEndTime(100);
	n.setName("Coder.Jay");
    n.start();

});