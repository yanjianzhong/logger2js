/*
 * logger2js V1.0.7, logger.js
 *
 * Based on code initially developed by: yanjianzhong, <yjz_ok@163.com> www.piesat.cn
 * 
 * See http://code.taobao.org/p/kingfishers/ for more info.
 *
 * You are free to use this in any way you want, in case you find this useful or working for you.
 *
 */

void function(_w){
    if(_w.k_core_loaded) return;//避免重复加载
    var ks=["logger.js","logger-base.js","logger-core.js"];//资源列表
	var sTags = document.getElementsByTagName("script"),script = sTags[sTags.length-1],ts;
	var path = script.src.substr(0,script.src.indexOf(ks[0]));
	script.setAttribute("ltag","logger")
    //动态日志开启
    var dyMode = location.search.match(new RegExp("[\?\&]mode=([^\&]+)","i"));
    if(dyMode != null && dyMode.length==2 && dyMode[1] == "logger"){ script.setAttribute("enabled","true");}
    
    var enabled =((script.getAttribute("enabled")=="false")?false:true);
    var popup =((script.getAttribute("popup")=="true")?true:false);
    document.write('<SCRIPT type="text/javascript" ltag="logger" src="'+path+ks[1]+'"><\/SCRIPT>');
    _w.$alert=function(){}
    if(enabled){
		if(popup){//弹出窗口
			var iLeft = (_w.screen.availWidth-610);
			_w.loggerMsgs = new Array();
			_w.loggerWindow = _w.open('','loggerWindow',"width=600,height=300,left="+iLeft+",top=0,scrollbars=no,resizable=no");
			if (!_w.loggerWindow) _w.loggerWindow = _w.open("Debugger.html","loggerWindow","width=600,height=300,left="+iLeft+",top=0,scrollbars=no,resizable=no");
			else if (!_w.loggerWindow.location.href.match(/Debugger.html$/)) _w.loggerWindow.location.href = "Debugger.html";
			if (!_w.loggerWindow) return;
			if (!_w.loggerWindow.oDbg) _w.loggerWindow.oDbg = this;
			_w.k_core_loaded = true;
			_w.oDbg = this;
			if (_w.oDbg.loggerWindow.popMsgs) setTimeout("oDbg.loggerWindow.popMsgs();",16);
			_w.$alert=function(msg,color){
				  if (!_w.k_core_loaded) return;
				  if(typeof(_w.loggerWindow.oDbg)=="unknown") return;
				  if (!_w.loggerWindow.oDbg || _w.loggerWindow.oDbg != this) _w.loggerWindow.oDbg = this;
				  _w.loggerMsgs.push({m:msg,c:color}); // add to queue
			}
		}else{
		    if(/*@cc_on!@*/false){//MS-Internet Explorer
	        	ts = script.outerHTML;
	        }else{
	        	var attr,attrs = script.attributes,strarr=["<SCRIPT"];
	            for(var i=0,len=attrs.length;i<len;i++){
	                attr = attrs[i];
	                if(attr.specified) {
	                    strarr[strarr.length]= attr.name+'="'+attr.value+'"';
	                }
	            }
	            ts = strarr.join(" ")+"><\/SCRIPT>";
	        }
	        document.write(ts.replace(ks[0],ks[2]));
		}
    }
    _w.k_core_loaded = true;
}(window);

