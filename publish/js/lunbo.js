"use strict";function animate(i,e,t,n){t=t||1e3;var r={},o=window.getComputedStyle(i);for(var h in e){var s=o[h];r[h]=parseInt(s)}var a={};for(var h in e)a[h]=e[h]-r[h];var l=t/20,c=0,d=setInterval(function(){for(var t in c++,e)i.style[t]="opacity"===t?r[t]+c*a[t]/l:r[t]+c*a[t]/l+"px";if(l<=c){for(var t in clearInterval(d),e)i.style[t]="opacity"===t?e[t]:e[t]+"px";n&&n()}},20)}if(!window.animate)throw new Error("Banner需要依赖animate");function Banner(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1e3;this.dom=t,this.imgArr=i,this.btns=document.createElement("div"),this.imgUL=document.createElement("ul"),this.cirUL=document.createElement("ul"),this.leftBtn=document.createElement("div"),this.rightBtn=document.createElement("div"),this.cirsArr=[],this.lisArr=[],this.imgEleArr=[],this.idx=0,this.lock=!0,this.width=t.clientWidth,this.height=t.clientHeight,this.timer=null,this.duration=e,this.init()}Banner.prototype.init=function(){this.upTree(),this.create(),this.render(),this.change(),this.bindEvent(),this.autoLoop()},Banner.prototype.create=function(){this.createImgList(),this.createCirsList()},Banner.prototype.createImgList=function(){for(var t=0;t<this.imgArr.length;t++){var i=document.createElement("li"),e=new Image;e.src=this.imgArr[t],this.imgEleArr.push(e),i.appendChild(e),this.lisArr.push(i),this.imgUL.appendChild(i)}var n=this.imgUL.firstElementChild.cloneNode(!0);this.imgEleArr.push(n.firstElementChild),this.lisArr.push(n),this.imgUL.appendChild(n)},Banner.prototype.createCirsList=function(){for(var t=0;t<this.imgArr.length;t++){var i=document.createElement("li");this.cirUL.appendChild(i),this.cirsArr.push(i)}},Banner.prototype.renderBtn=function(){var t={position:"absolute",top:"35%",height:"30%",width:"100%"};for(var i in t)this.btns.style[i]=t[i];var e={width:"10%",height:"100%",fontSize:.09*this.height+"px",lineHeight:.3*this.height+"px",textAlign:"center",color:"white",cursor:"pointer",fontWeight:"bold",backgroundColor:"rgba(0,0,0,.3)"};for(var i in e)this.leftBtn.style[i]=e[i],this.rightBtn.style[i]=e[i];this.leftBtn.style.float="left",this.rightBtn.style.float="right",this.leftBtn.innerHTML="&lt;",this.rightBtn.innerHTML="&gt;"},Banner.prototype.appendBtn=function(){this.btns.appendChild(this.leftBtn),this.btns.appendChild(this.rightBtn)},Banner.prototype.renderCirs=function(){var t={position:"absolute",bottom:"5%",left:"25%",right:"25%",display:"flex",justifyContent:"space-between",alignItems:"center",listStyle:"none"};for(var i in t)this.cirUL.style[i]=t[i];var e={width:.07*this.height+"px",height:.07*this.height+"px",borderRadius:"50%",backgroundColor:"red",cursor:"pointer"};this.cirsArr.forEach(function(t){for(var i in e)t.style[i]=e[i]})},Banner.prototype.render=function(){this.renderImg(),this.renderBtn(),this.renderCirs(),this.renderContainer()},Banner.prototype.renderContainer=function(){this.dom.style.position="relative",this.dom.style.overflow="hidden"},Banner.prototype.renderImg=function(){var i=this;this.lisArr.forEach(function(t){t.style.float="left",t.style.width=i.width+"px",t.style.height=i.height+"px"}),this.imgEleArr.forEach(function(t){t.style.width=i.width+"px",t.style.height=i.height+"px"});var t={position:"absolute",top:"0",left:"0",width:(this.imgArr.length+1)*this.width+"px",height:this.height+"px"};for(var e in t)this.imgUL.style[e]=t[e]},Banner.prototype.upTree=function(){this.dom.appendChild(this.imgUL),this.appendBtn()},Banner.prototype.change=function(){for(var t=0;t<this.cirsArr.length;t++)this.cirsArr[t].style.backgroundColor="red";this.cirsArr[this.idx].style.backgroundColor="orange"},Banner.prototype.bindEvent=function(){this.bindLeft(),this.bindRight(),this.bindCirs(),this.bindEnter(),this.bindLeave()},Banner.prototype.bindLeft=function(){var t=this;this.leftBtn.onclick=function(){console.log("点击到左按钮了"),t.lock&&(t.lock=!1,t.idx--,t.idx<0&&(t.imgUL.style.left=-t.imgArr.length*t.width+"px",t.idx=t.imgArr.length,t.idx--),animate(t.imgUL,{left:-t.idx*t.width},t.duration,function(){t.lock=!0,t.change()}))}},Banner.prototype.bindRight=function(){var t=this;this.rightBtn.onclick=function(){t.lock&&(t.lock=!1,t.idx++,animate(t.imgUL,{left:-t.idx*t.width},t.duration,function(){t.idx>=t.imgArr.length&&(t.imgUL.style.left=0,t.idx=0),t.lock=!0,t.change()}))}},Banner.prototype.bindCirs=function(){var e=this;this.cirsArr.forEach(function(t,i){t.onclick=function(){console.log("我是第"+i+"个小圆点"),e.lock&&(e.lock=!1,e.idx=i,animate(e.imgUL,{left:-e.idx*e.width},e.duration,function(){e.lock=!0,e.change()}))}})},Banner.prototype.autoLoop=function(){var t=this;this.timer=setInterval(function(){t.rightBtn.onclick()},this.duration+5e3)},Banner.prototype.bindEnter=function(){var t=this;this.dom.onmouseenter=function(){t.dom.appendChild(t.btns)}},Banner.prototype.bindLeave=function(){var t=this;this.dom.onmouseleave=function(){t.dom.removeChild(t.btns)}};