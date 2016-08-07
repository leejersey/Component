window.onload=function(){
	var bar=document.getElementById("bar");
	var disp=document.getElementById("disp");
	var slide=document.getElementById("slide");
	var article=document.getElementById("article");
	var bDrag=false;
	var gapY;
	slide.onmousedown=function(ev){
		var e=ev||event;
		bDrag=true;
		gapY=e.clientY-slide.offsetTop;
	}
	document.onmousemove=function(ev){
		var e=ev||event;
		if(!bDrag)return;
		var l=e.clientY-gapY;
		changeTop(l);
		return false;
	}
	document.onmouseup=function(){
		bDrag=false;
		return false;
	}
	disp.onmousewheel=function(ev){
		wheelMove(ev);
		}
	disp.addEventListener("DOMMouseScroll",function(e){
		wheelMove(e);
	})
	function changeTop(l){
		if(l<0){
			l=0;
		}else if(l>bar.offsetHeight-slide.offsetHeight){
			l=bar.offsetHeight-slide.offsetHeight;
		}
		slide.style.top=l+"px";
		var scale=l/(bar.offsetHeight-slide.offsetHeight);
		article.style.top=-scale*(article.offsetHeight-disp.offsetHeight)+"px";
	}
	function wheelMove(e){
		var e=e||event;
		var eCode=(e.wheelDelta)?(e.wheelDelta>0):(e.detail<0);
		var l;
		if(eCode){
			 l=slide.offsetTop-10;}else{
			 l=slide.offsetTop+10;
			}
		changeTop(l);
		e.preventDefault&&e.preventDefault();
		return false;
	}
}
