"use strict";(self["webpackChunkvalentine"]=self["webpackChunkvalentine"]||[]).push([[443],{7644:function(t,s,i){i.r(s),i.d(s,{default:function(){return C}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"success"},[s("canvas",{ref:"fireworks",attrs:{id:"fireworks"}},[t._v("浏览器不支持canvas")]),s("div",{ref:"starsBox",attrs:{id:"starsBox"}}),s("div",{staticClass:"content"},[t._v(" 往后余生，惟愿是你。余生还很漫长，我愿和你一起走下去。 ")])])},a=[],o=(i(7658),window.innerWidth),r=window.innerHeight,h={x:window.innerWidth/2,y:0},n="",l="",d=[],p=[],c=200;function f(t,s){n=t,l=s,n.width=o,n.height=r,setInterval(y,800),setInterval(u,20)}function y(){v(h.x)}function v(t){if(p.length<10){var s=new w(t);s.explosionColor=10*Math.floor(360*Math.random()/10),s.vel.y=-3*Math.random()-4,s.vel.x=2*Math.random()-1,s.size=8,s.shrink=.999,s.gravity=.01,p.push(s)}}function u(){o!==window.innerWidth&&(n.width=o=window.innerWidth),r!==window.innerHeight&&(n.height=r=window.innerHeight),l.fillStyle="rgba(0, 0, 0, 0.05)",l.fillRect(0,0,o,r);for(var t=[],s=0;s<p.length;s++){p[s].update(),p[s].render(l);var i=Math.sqrt(Math.pow(h.x-p[s].pos.x,2)+Math.pow(h.y-p[s].pos.y,2)),e=p[s].pos.y<2*r/3&&100*Math.random()<=1;p[s].pos.y<r/5||p[s].vel.y>=0||i<50||e?p[s].explode():t.push(p[s])}p=t;for(var a=[],f=0;f<d.length;f++)d[f].update(),d[f].exists()&&(d[f].render(l),a.push(d[s]));d=a;while(d.length>c)d.shift()}function x(t){this.pos={x:t?t.x:0,y:t?t.y:0},this.vel={x:0,y:0},this.shrink=.97,this.size=2,this.resistance=1,this.gravity=0,this.flick=!1,this.alpha=1,this.fade=0,this.color=0}function w(t){x.apply(this,[{x:t,y:r}]),this.explosionColor=0}x.prototype.update=function(){this.vel.x*=this.resistance,this.vel.y*=this.resistance,this.vel.y+=this.gravity,this.pos.x+=this.vel.x,this.pos.y+=this.vel.y,this.size*=this.shrink,this.alpha-=this.fade},x.prototype.render=function(t){if(this.exists()){t.save(),t.globalCompositeOperation="lighter";var s=this.pos.x,i=this.pos.y,e=this.size/2,a=t.createRadialGradient(s,i,.1,s,i,e);a.addColorStop(.1,"rgba(255,255,255,"+this.alpha+")"),a.addColorStop(.8,"hsla("+this.color+", 100%, 50%, "+this.alpha+")"),a.addColorStop(1,"hsla("+this.color+", 100%, 50%, 0.1)"),t.fillStyle=a,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.flick?Math.random()*this.size:this.size,0,2*Math.PI,!0),t.closePath(),t.fill(),t.restore()}},x.prototype.exists=function(){return this.alpha>=.1&&this.size>=1},w.prototype=new x,w.prototype.constructor=w,w.prototype.explode=function(){for(var t=10*Math.random()+80,s=0;s<t;s++){var i=new x(this.pos),e=Math.random()*Math.PI*2,a=15*Math.cos(Math.random()*Math.PI/2);i.vel.x=Math.cos(e)*a,i.vel.y=Math.sin(e)*a,i.size=10,i.gravity=.2,i.resistance=4.92,i.shrink=.05*Math.random()+.93,i.flick=!0,i.color=this.explosionColor,d.push(i)}},w.prototype.render=function(t){if(this.exists()){t.save(),t.globalCompositeOperation="lighter";var s=this.pos.x,i=this.pos.y,e=this.size/2,a=t.createRadialGradient(s,i,.1,s,i,e);a.addColorStop(.1,"rgba(255, 255, 255 ,"+this.alpha+")"),a.addColorStop(1,"rgba(0, 0, 0, "+this.alpha+")"),t.fillStyle=a,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.flick?Math.random()*this.size/2+this.size/2:this.size,0,2*Math.PI,!0),t.closePath(),t.fill(),t.restore()}};var m={name:"Success",comments:{},data(){return{cols:["#f5d76e","#f7ca18","#f4d03f","#ececec","#ecf0f1","#a2ded0"],starts:250,domData:"",interValId:null,canvas:"",context:""}},mounted(){this.setStarts(),this.SCREEN_WIDTH=window.innerWidth,this.SCREEN_HEIGHT=window.innerHeight,this.mousePos={x:window.innerWidth/2,y:0},this.canvas=this.$refs.fireworks,this.context=this.canvas.getContext("2d"),this.particles=[],this.rockets=[],this.MAX_PARTICLES=200,this.colorCode=0,f(this.canvas,this.context)},methods:{setStarts(){for(var t=this,s=0;s<=this.starts;s++){var i=3*Math.random(),e=this.cols[parseInt(4*Math.random())];let t='<span style=" width: '+i+"px; height: "+i+"px; top: "+100*Math.random()+"%; left: "+100*Math.random()+"%; background: "+e+"; box-shadow: 0 0 "+10*Math.random()+"px"+e+';"></span>';this.domData=this.domData+t}this.$refs.starsBox.innerHTML=this.domData,setTimeout((function(){Array.from(t.$refs.starsBox.children).forEach((t=>{t.style.top=100*Math.random()+"%",t.style.left=100*Math.random()+"%",t.style.position="absolute",t.style.display="inline-block",t.style.borderRadius="100%",t.style.transition="100s linear"}))}),1),this.changeStar()},changeStar(){this.interValId||(this.interValId=setInterval(this.setStart,1e5))},setstart(){Array.from(this.$refs.starsBox.children).forEach(((t,s)=>{t.style.top=100*Math.random()+"%",t.style.left=100*Math.random()+"%",t.style.position="absolute",t.style.display="inline-block",t.style.width="auto",t.style.borderRadius="100%",t.style.transition="100s linear"}))}},destroyed(){clearInterval()}},M=m,g=i(3736),k=(0,g.Z)(M,e,a,!1,null,"a388aa32",null),C=k.exports}}]);
//# sourceMappingURL=about.3e728d13.js.map