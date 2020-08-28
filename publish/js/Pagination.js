"use strict";function Pagination(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,s=3<arguments.length&&void 0!==arguments[3]?arguments[3]:10;this.dom=t,this.dataArr=e,this.currentPage=n,this.dataNumber=s,this.total=Math.ceil(this.dataArr.length/this.dataNumber),this.firstBtn=document.createElement("button"),this.prevBtn=document.createElement("button"),this.numberArea=document.createElement("div"),this.nextBtn=document.createElement("button"),this.lastBtn=document.createElement("button"),this.input=document.createElement("input"),this.redirectBtn=document.createElement("button"),this.operateArea=document.createElement("div"),this.displayArea=document.createElement("div"),this.init()}Pagination.prototype={constructor:Pagination,init:function(){this.render(),this.renderNumberArea(),this.bindEvent()},render:function(){this.operateArea.style.display="flex",this.operateArea.style.height="10%",this.firstBtn.innerHTML="首页",this.firstBtn.style.flex="1",this.prevBtn.innerHTML="上一页",this.prevBtn.style.flex="1",this.numberArea.style.flex="8",this.nextBtn.innerHTML="下一页",this.nextBtn.style.flex="1",this.lastBtn.innerHTML="尾页",this.lastBtn.style.flex="1",this.input.style.width="0",this.input.style.flex="1",this.redirectBtn.innerHTML="跳转",this.redirectBtn.style.flex="1",this.operateArea.appendChild(this.firstBtn),this.operateArea.appendChild(this.prevBtn),this.operateArea.appendChild(this.numberArea),this.operateArea.appendChild(this.nextBtn),this.operateArea.appendChild(this.lastBtn),this.operateArea.appendChild(this.input),this.operateArea.appendChild(this.redirectBtn),this.numberArea.style.display="flex",this.numberArea.style.alignItems="center",this.numberArea.style.textAlign="center",this.dom.appendChild(this.displayArea),this.displayArea.appendChild(this.operateArea),this.displayArea.style.height="90%"},renderNumberArea:function(){var t="";if(10<this.total)if(this.currentPage<4){for(var e=0;e<5;e++)t+="<span style='flex:1; "+(e===this.currentPage?"color: red":"")+"'  >"+(e+1)+"</span>";t+="<span style='flex:1'>...</span>",t+="<span style='flex: 1'>"+(this.total-1)+"</span>",t+="<span style='flex: 1'>"+this.total+"</span>"}else if(4===this.currentPage){for(e=0;e<7;e++)t+="<span style='flex:1; "+(e===this.currentPage?"color: red":"")+"'  >"+(e+1)+"</span>";t+="<span style='flex:1'>...</span>",t+="<span style='flex: 1'>"+(this.total-1)+"</span>",t+="<span style='flex: 1'>"+this.total+"</span>"}else if(this.currentPage===this.total-5){t+="<span style='flex: 1'>1</span>",t+="<span style='flex: 1'>2</span>",t+="<span style='flex:1'>...</span>";for(e=this.total-7;e<this.total;e++)t+="<span style='flex:1; "+(e===this.currentPage?"color: red":"")+"'  >"+(e+1)+"</span>"}else if(this.currentPage>this.total-5){t+="<span style='flex: 1'>1</span>",t+="<span style='flex: 1'>2</span>",t+="<span style='flex:1'>...</span>";for(e=this.total-5;e<this.total;e++)t+="<span style='flex:1; "+(e===this.currentPage?"color: red":"")+"'  >"+(e+1)+"</span>"}else{t+="<span style='flex: 1'>1</span>",t+="<span style='flex: 1'>2</span>",t+="<span style='flex:1'>...</span>";for(e=this.currentPage-2;e<=this.currentPage+2;e++)t+="<span style='flex:1; "+(e===this.currentPage?"color: red":"")+"'  >"+(e+1)+"</span>";t+="<span style='flex:1'>...</span>",t+="<span style='flex: 1'>"+(this.total-1)+"</span>",t+="<span style='flex: 1'>"+this.total+"</span>"}else for(e=0;e<this.total;e++)t+="<span style='flex:1; "+(e===this.currentPage?"color: red":"")+"'  >"+(e+1)+"</span>";this.numberArea.innerHTML=t},display:function(t){var e=(this.construct=t)(this.dataArr.slice(this.currentPage*this.dataNumber,this.currentPage*this.dataNumber+this.dataNumber));this.displayArea.innerHTML=e},bindEvent:function(){var e=this;this.firstBtn.onclick=function(){e.currentPage=0,e.renderNumberArea(),e.display(e.construct)},this.prevBtn.onclick=function(){e.currentPage?(e.currentPage--,e.renderNumberArea(),e.display(e.construct)):alert("已经是第一页了")},this.numberArea.onclick=function(t){"..."!=t.target.innerHTML&&(e.currentPage=+t.target.innerHTML-1,e.renderNumberArea(),e.display(e.construct))},this.nextBtn.onclick=function(){e.currentPage!==e.total-1?(e.currentPage++,e.renderNumberArea(),e.display(e.construct)):alert("已经是最后一页了")},this.lastBtn.onclick=function(){e.currentPage=e.total-1,e.renderNumberArea(),e.display(e.construct)},this.redirectBtn.onclick=function(){var t=+e.input.value;!isNaN(t)&&0<t&&t<=e.total?(e.currentPage=t-1,e.renderNumberArea(),e.display(e.construct)):alert("请输入1~"+e.total+"之间的数字")}}};