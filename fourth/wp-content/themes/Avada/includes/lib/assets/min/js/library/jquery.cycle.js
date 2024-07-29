!function(e,t){"use strict";function n(t){e.fn.cycle.debug&&i()}function i(){window.console&&console.log}function c(t,n,i){var c=e(t).data("cycle.opts");if(c){var s=!!t.cyclePause;s&&c.paused?c.paused(t,c,n,i):!s&&c.resumed&&c.resumed(t,c,n,i)}}function s(t,n){if(!e.support.opacity&&n.cleartype&&t.style.filter)try{t.style.removeAttribute("filter")}catch(e){}}function o(i,c,s,l){var a=c.$cont[0],f=i[c.currSlide],u=i[c.nextSlide];if(s&&c.busy&&c.manualTrump&&(n(),e(i).stop(!0,!0),c.busy=0,clearTimeout(a.cycleTimeout)),c.busy)n();else if(a.cycleStop==c.stopCount&&(0!==a.cycleTimeout||s))if(s||a.cyclePause||c.bounce||!(c.autostop&&--c.countdown<=0||c.nowrap&&!c.random&&c.nextSlide<c.currSlide)){var h,d=!1;if(!s&&a.cyclePause||c.nextSlide==c.currSlide)y();else{d=!0;var p=c.fx;f.cycleH=f.cycleH||e(f).height(),f.cycleW=f.cycleW||e(f).width(),u.cycleH=u.cycleH||e(u).height(),u.cycleW=u.cycleW||e(u).width(),c.multiFx&&(l&&(c.lastFx===t||++c.lastFx>=c.fxs.length)?c.lastFx=0:!l&&(c.lastFx===t||--c.lastFx<0)&&(c.lastFx=c.fxs.length-1),p=c.fxs[c.lastFx]),c.oneTimeFx&&(p=c.oneTimeFx,c.oneTimeFx=null),e.fn.cycle.resetState(c,p),c.before.length&&e.each(c.before,function(e,t){a.cycleStop==c.stopCount&&t.apply(u,[f,u,c,l])});var m=function(){c.busy=0,e.each(c.after,function(e,t){a.cycleStop==c.stopCount&&t.apply(u,[f,u,c,l])}),a.cycleStop||y()};n((c.currSlide,c.nextSlide)),c.busy=1,c.fxFn?c.fxFn(f,u,c,m,l,s&&c.fastOnEvent):e.isFunction(e.fn.cycle[c.fx])?e.fn.cycle[c.fx](f,u,c,m,l,s&&c.fastOnEvent):e.fn.cycle.custom(f,u,c,m,l,s&&c.fastOnEvent)}if(d||c.nextSlide==c.currSlide)c.lastSlide=c.currSlide,c.random?(c.currSlide=c.nextSlide,++c.randomIndex==i.length&&(c.randomIndex=0,c.randomMap.sort(function(e,t){return Math.random()-.5})),c.nextSlide=c.randomMap[c.randomIndex],c.nextSlide==c.currSlide&&(c.nextSlide=c.currSlide==c.slideCount-1?0:c.currSlide+1)):c.backwards?(h=c.nextSlide-1<0)&&c.bounce?(c.backwards=!c.backwards,c.nextSlide=1,c.currSlide=0):(c.nextSlide=h?i.length-1:c.nextSlide-1,c.currSlide=h?0:c.nextSlide+1):(h=c.nextSlide+1==i.length)&&c.bounce?(c.backwards=!c.backwards,c.nextSlide=i.length-2,c.currSlide=i.length-1):(c.nextSlide=h?0:c.nextSlide+1,c.currSlide=h?i.length-1:c.nextSlide-1);d&&c.pager&&c.updateActivePagerLink(c.pager,c.currSlide,c.activePagerClass)}else c.end&&c.end(c);function y(){var e=0;c.timeout;c.timeout&&!c.continuous?(e=r(i[c.currSlide],i[c.nextSlide],c,l),"shuffle"==c.fx&&(e-=c.speedOut)):c.continuous&&a.cyclePause&&(e=10),e>0&&(a.cycleTimeout=setTimeout(function(){o(i,c,0,!c.backwards)},e))}}function r(e,t,i,c){if(i.timeoutFn){for(var s=i.timeoutFn.call(e,e,t,i,c);"none"!=i.fx&&s-i.speed<250;)s+=i.speed;if(n(i.speed),!1!==s)return s}return i.timeout}function l(t,n){var i=n?1:-1,c=t.elements,s=t.$cont[0],r=s.cycleTimeout;if(r&&(clearTimeout(r),s.cycleTimeout=0),t.random&&i<0)t.randomIndex--,-2==--t.randomIndex?t.randomIndex=c.length-2:-1==t.randomIndex&&(t.randomIndex=c.length-1),t.nextSlide=t.randomMap[t.randomIndex];else if(t.random)t.nextSlide=t.randomMap[t.randomIndex];else if(t.nextSlide=t.currSlide+i,t.nextSlide<0){if(t.nowrap)return!1;t.nextSlide=c.length-1}else if(t.nextSlide>=c.length){if(t.nowrap)return!1;t.nextSlide=0}var l=t.onPrevNextEvent||t.prevNextClick;return e.isFunction(l)&&l(i>0,t.nextSlide,c[t.nextSlide]),o(c,t,1,n),!1}function a(t){function i(e){return(e=parseInt(e,10).toString(16)).length<2?"0"+e:e}n(),t.each(function(){e(this).css("background-color",function(t){for(;t&&"html"!=t.nodeName.toLowerCase();t=t.parentNode){var n=e.css(t,"background-color");if(n&&n.indexOf("rgb")>=0){var c=n.match(/\d+/g);return"#"+i(c[0])+i(c[1])+i(c[2])}if(n&&"transparent"!=n)return n}return"#ffffff"}(this))})}e.expr[":"].paused=function(e){return e.cyclePause},e.fn.cycle=function(f,u){var h={s:this.selector,c:this.context};return 0===this.length&&"stop"!=f?!e.isReady&&h.s?(i(),e(function(){e(h.s,h.c).cycle(f,u)}),this):(i(e.isReady),this):this.each(function(){var d=function(n,s,r){n.cycleStop===t&&(n.cycleStop=0);s!==t&&null!==s||(s={});if(s.constructor==String){switch(s){case"destroy":case"stop":var l=e(n).data("cycle.opts");return!!l&&(n.cycleStop++,n.cycleTimeout&&clearTimeout(n.cycleTimeout),n.cycleTimeout=0,l.elements&&e(l.elements).stop(),e(n).removeData("cycle.opts"),"destroy"==s&&function(t,n){n.next&&e(n.next).unbind(n.prevNextEvent);n.prev&&e(n.prev).unbind(n.prevNextEvent);(n.pager||n.pagerAnchorBuilder)&&e.each(n.pagerAnchors||[],function(){this.unbind().remove()});n.pagerAnchors=null,e(t).unbind("mouseenter.cycle mouseleave.cycle"),n.destroy&&n.destroy(n)}(n,l),!1);case"toggle":return n.cyclePause=1===n.cyclePause?0:1,f(n.cyclePause,r,n),c(n),!1;case"pause":return n.cyclePause=1,c(n),!1;case"resume":return n.cyclePause=0,f(!1,r,n),c(n),!1;case"prev":case"next":return(l=e(n).data("cycle.opts"))?("string"==typeof r&&(l.oneTimeFx=r),e.fn.cycle[s](l),!1):(i(),!1);default:s={fx:s}}return s}if(s.constructor==Number){var a=s;return(s=e(n).data("cycle.opts"))?a<0||a>=s.elements.length?(i(),!1):(s.nextSlide=a,n.cycleTimeout&&(clearTimeout(n.cycleTimeout),n.cycleTimeout=0),"string"==typeof r&&(s.oneTimeFx=r),o(s.elements,s,1,a>=s.currSlide),!1):(i(),!1)}return s;function f(t,n,c){if(!t&&!0===n){var s=e(c).data("cycle.opts");if(!s)return i(),!1;c.cycleTimeout&&(clearTimeout(c.cycleTimeout),c.cycleTimeout=0),o(s.elements,s,1,!s.backwards)}}}(this,f,u);if(!1!==d){d.updateActivePagerLink=d.updateActivePagerLink||e.fn.cycle.updateActivePagerLink,this.cycleTimeout&&clearTimeout(this.cycleTimeout),this.cycleTimeout=this.cyclePause=0,this.cycleStop=0;var p=e(this),m=d.slideExpr?e(d.slideExpr,this):p.children(),y=m.get();if(y.length<2)i(y.length);else{var g=function(r,f,u,h,d){var p,m=e.extend({},e.fn.cycle.defaults,h||{},e.metadata?r.metadata():e.meta?r.data():{}),y=e.isFunction(r.data)?r.data(m.metaAttr):null;y&&(m=e.extend(m,y));m.autostop&&(m.countdown=m.autostopCount||u.length);var g=r[0];r.data("cycle.opts",m),m.$cont=r,m.stopCount=g.cycleStop,m.elements=u,m.before=m.before?[m.before]:[],m.after=m.after?[m.after]:[],!e.support.opacity&&m.cleartype&&m.after.push(function(){s(this,m)});m.continuous&&m.after.push(function(){o(u,m,0,!m.backwards)});(function(t){t.original={before:[],after:[]},t.original.cssBefore=e.extend({},t.cssBefore),t.original.cssAfter=e.extend({},t.cssAfter),t.original.animIn=e.extend({},t.animIn),t.original.animOut=e.extend({},t.animOut),e.each(t.before,function(){t.original.before.push(this)}),e.each(t.after,function(){t.original.after.push(this)})})(m),e.support.opacity||!m.cleartype||m.cleartypeNoBg||a(f);"static"==r.css("position")&&r.css("position","relative");m.width&&r.width(m.width);m.height&&"auto"!=m.height&&r.height(m.height);m.startingSlide!==t?(m.startingSlide=parseInt(m.startingSlide,10),m.startingSlide>=u.length||m.startSlide<0?m.startingSlide=0:p=!0):m.backwards?m.startingSlide=u.length-1:m.startingSlide=0;if(m.random){m.randomMap=[];for(var x=0;x<u.length;x++)m.randomMap.push(x);if(m.randomMap.sort(function(e,t){return Math.random()-.5}),p)for(var v=0;v<u.length;v++)m.startingSlide==m.randomMap[v]&&(m.randomIndex=v);else m.randomIndex=1,m.startingSlide=m.randomMap[1]}else m.startingSlide>=u.length&&(m.startingSlide=0);m.currSlide=m.startingSlide||0;var w=m.startingSlide;f.css({position:"absolute",top:0,left:0}).hide().each(function(t){var n;n=m.backwards?w?t<=w?u.length+(t-w):w-t:u.length-t:w?t>=w?u.length-(t-w):w-t:u.length-t,e(this).css("z-index",n)}),e(u[w]).css("opacity",1).show(),s(u[w],m),m.fit&&(m.aspect?f.each(function(){var t=e(this),n=!0===m.aspect?t.width()/t.height():m.aspect;m.width&&t.width()!=m.width&&(t.width(m.width),t.height(m.width/n)),m.height&&t.height()<m.height&&(t.height(m.height),t.width(m.height*n))}):(m.width&&f.width(m.width),m.height&&"auto"!=m.height&&f.height(m.height)));!m.center||m.fit&&!m.aspect||f.each(function(){var t=e(this);t.css({"margin-left":m.width?(m.width-t.width())/2+"px":0,"margin-top":m.height?(m.height-t.height())/2+"px":0})});!m.center||m.fit||m.slideResize||f.each(function(){var t=e(this);t.css({"margin-left":m.width?(m.width-t.width())/2+"px":0,"margin-top":m.height?(m.height-t.height())/2+"px":0})});if((m.containerResize||m.containerResizeHeight)&&r.innerHeight()<1){for(var S=0,b=0,B=0;B<u.length;B++){var I=e(u[B]),O=I[0],F=I.outerWidth(),A=I.outerHeight();F||(F=O.offsetWidth||O.width||I.attr("width")),A||(A=O.offsetHeight||O.height||I.attr("height")),S=F>S?F:S,b=A>b?A:b}m.containerResize&&S>0&&b>0&&r.animate({width:S+"px",height:b+"px"}),m.containerResizeHeight&&b>0&&r.animate({height:b+"px"})}var H=!1;m.pause&&r.bind("mouseenter.cycle",function(){H=!0,this.cyclePause++,c(g,!0)}).bind("mouseleave.cycle",function(){H&&this.cyclePause--,c(g,!0)});if(!1===function(t){var c,s,o=e.fn.cycle.transitions;if(t.fx.indexOf(",")>0){for(t.multiFx=!0,t.fxs=t.fx.replace(/\s*/g,"").split(","),c=0;c<t.fxs.length;c++){var r=t.fxs[c];(s=o[r])&&o.hasOwnProperty(r)&&e.isFunction(s)||(i(),t.fxs.splice(c,1),c--)}if(!t.fxs.length)return i(),!1}else if("all"==t.fx)for(var l in t.multiFx=!0,t.fxs=[],o)o.hasOwnProperty(l)&&(s=o[l],o.hasOwnProperty(l)&&e.isFunction(s)&&t.fxs.push(l));if(t.multiFx&&t.randomizeEffects){var a=Math.floor(20*Math.random())+30;for(c=0;c<a;c++){var f=Math.floor(Math.random()*t.fxs.length);t.fxs.push(t.fxs.splice(f,1)[0])}n(0,t.fxs)}return!0}(m))return!1;var T=!1;if(h.requeueAttempts=h.requeueAttempts||0,f.each(function(){var t=e(this);if(this.cycleH=m.fit&&m.height?m.height:t.height()||this.offsetHeight||this.height||t.attr("height")||0,this.cycleW=m.fit&&m.width?m.width:t.width()||this.offsetWidth||this.width||t.attr("width")||0,t.is("img")&&0===this.cycleH&&0===this.cycleW&&!this.complete){if(d.s&&m.requeueOnImageNotLoaded&&++h.requeueAttempts<100)return i(h.requeueAttempts,this.src,this.cycleW,this.cycleH),setTimeout(function(){e(d.s,d.c).cycle(h)},m.requeueTimeout),T=!0,!1;i(this.src,this.cycleW,this.cycleH)}return!0}),T)return!1;if(m.cssBefore=m.cssBefore||{},m.cssAfter=m.cssAfter||{},m.cssFirst=m.cssFirst||{},m.animIn=m.animIn||{},m.animOut=m.animOut||{},f.not(":eq("+w+")").css(m.cssBefore),e(f[w]).css(m.cssFirst),m.timeout){m.timeout=parseInt(m.timeout,10),m.speed.constructor==String&&(m.speed=e.fx.speeds[m.speed]||parseInt(m.speed,10)),m.sync||(m.speed=m.speed/2);for(var R="none"==m.fx?0:"shuffle"==m.fx?500:250;m.timeout-m.speed<R;)m.timeout+=m.speed}m.easing&&(m.easeIn=m.easeOut=m.easing);m.speedIn||(m.speedIn=m.speed);m.speedOut||(m.speedOut=m.speed);m.slideCount=u.length,m.currSlide=m.lastSlide=w,m.random?(++m.randomIndex==u.length&&(m.randomIndex=0),m.nextSlide=m.randomMap[m.randomIndex]):m.backwards?m.nextSlide=0===m.startingSlide?u.length-1:m.startingSlide-1:m.nextSlide=m.startingSlide>=u.length-1?0:m.startingSlide+1;if(!m.multiFx){var k=e.fn.cycle.transitions[m.fx];if(e.isFunction(k))k(r,f,m);else if("custom"!=m.fx&&!m.multiFx)return i(m.fx),!1}var P=f[w];m.skipInitializationCallbacks||(m.before.length&&m.before[0].apply(P,[P,P,m,!0]),m.after.length&&m.after[0].apply(P,[P,P,m,!0]));m.next&&e(m.next).bind(m.prevNextEvent,function(){return l(m,1)});m.prev&&e(m.prev).bind(m.prevNextEvent,function(){return l(m,0)});(m.pager||m.pagerAnchorBuilder)&&function(t,n){var i=e(n.pager);e.each(t,function(c,s){e.fn.cycle.createPagerAnchor(c,s,i,t,n)}),n.updateActivePagerLink(n.pager,n.startingSlide,n.activePagerClass)}(u,m);return function(t,n){t.addSlide=function(i,c){var s=e(i),o=s[0];t.autostopCount||t.countdown++,n[c?"unshift":"push"](o),t.els&&t.els[c?"unshift":"push"](o),t.slideCount=n.length,t.random&&(t.randomMap.push(t.slideCount-1),t.randomMap.sort(function(e,t){return Math.random()-.5})),s.css("position","absolute"),s[c?"prependTo":"appendTo"](t.$cont),c&&(t.currSlide++,t.nextSlide++),e.support.opacity||!t.cleartype||t.cleartypeNoBg||a(s),t.fit&&t.width&&s.width(t.width),t.fit&&t.height&&"auto"!=t.height&&s.height(t.height),o.cycleH=t.fit&&t.height?t.height:s.height(),o.cycleW=t.fit&&t.width?t.width:s.width(),s.css(t.cssBefore),(t.pager||t.pagerAnchorBuilder)&&e.fn.cycle.createPagerAnchor(n.length-1,o,e(t.pager),n,t),e.isFunction(t.onAddSlide)?t.onAddSlide(s):s.hide()}}(m,u),m}(p,m,y,d,h);if(!1!==g){var x=g.continuous?10:r(y[g.currSlide],y[g.nextSlide],g,!g.backwards);x&&((x+=g.delay||0)<10&&(x=10),n(),this.cycleTimeout=setTimeout(function(){o(y,g,0,!d.backwards)},x))}}}})},e.fn.cycle.resetState=function(t,n){n=n||t.fx,t.before=[],t.after=[],t.cssBefore=e.extend({},t.original.cssBefore),t.cssAfter=e.extend({},t.original.cssAfter),t.animIn=e.extend({},t.original.animIn),t.animOut=e.extend({},t.original.animOut),t.fxFn=null,e.each(t.original.before,function(){t.before.push(this)}),e.each(t.original.after,function(){t.after.push(this)});var i=e.fn.cycle.transitions[n];e.isFunction(i)&&i(t.$cont,e(t.elements),t)},e.fn.cycle.updateActivePagerLink=function(t,n,i){e(t).each(function(){e(this).children().removeClass(i).eq(n).addClass(i)})},e.fn.cycle.next=function(e){l(e,1)},e.fn.cycle.prev=function(e){l(e,0)},e.fn.cycle.createPagerAnchor=function(t,i,s,r,l){var a;if(e.isFunction(l.pagerAnchorBuilder)?(a=l.pagerAnchorBuilder(t,i),n()):a='<a href="#" aria-label="pagination"></a>',a){var f=e(a);if(0===f.parents("body").length){var u=[];s.length>1?(s.each(function(){var t=f.clone(!0);e(this).append(t),u.push(t[0])}),f=e(u)):f.appendTo(s)}l.pagerAnchors=l.pagerAnchors||[],l.pagerAnchors.push(f);var h=function(n){n.preventDefault(),l.nextSlide=t;var i=l.$cont[0],c=i.cycleTimeout;c&&(clearTimeout(c),i.cycleTimeout=0);var s=l.onPagerEvent||l.pagerClick;e.isFunction(s)&&s(l.nextSlide,r[l.nextSlide]),o(r,l,1,l.currSlide<t)};/mouseenter|mouseover/i.test(l.pagerEvent)?f.hover(h,function(){}):f.bind(l.pagerEvent,h),/^click/.test(l.pagerEvent)||l.allowPagerClickBubble||f.bind("click.cycle",function(){return!1});var d=l.$cont[0],p=!1;l.pauseOnPagerHover&&f.hover(function(){p=!0,d.cyclePause++,c(d,!0,!0)},function(){p&&d.cyclePause--,c(d,!0,!0)})}},e.fn.cycle.hopsFromLast=function(e,t){var n=e.lastSlide,i=e.currSlide;return t?i>n?i-n:e.slideCount-n:i<n?n-i:n+e.slideCount-i},e.fn.cycle.commonReset=function(t,n,i,c,s,o){e(i.elements).not(t).hide(),void 0===i.cssBefore.opacity&&(i.cssBefore.opacity=1),i.cssBefore.display="block",i.slideResize&&!1!==c&&n.cycleW>0&&(i.cssBefore.width=n.cycleW),i.slideResize&&!1!==s&&n.cycleH>0&&(i.cssBefore.height=n.cycleH),i.cssAfter=i.cssAfter||{},i.cssAfter.display="none",e(t).css("zIndex",i.slideCount+(!0===o?1:0)),e(n).css("zIndex",i.slideCount+(!0===o?0:1))},e.fn.cycle.custom=function(t,n,i,c,s,o){var r=e(t),l=e(n),a=i.speedIn,f=i.speedOut,u=i.easeIn,h=i.easeOut,d=i.animInDelay,p=i.animOutDelay;l.css(i.cssBefore),o&&(a=f="number"==typeof o?o:1,u=h=null);var m=function(){l.delay(d).animate(i.animIn,a,u,function(){c()})};r.delay(p).animate(i.animOut,f,h,function(){r.css(i.cssAfter),i.sync||m()}),i.sync&&m()},e.fn.cycle.transitions={fade:function(t,n,i){n.not(":eq("+i.currSlide+")").css("opacity",0),i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i),i.cssBefore.opacity=0}),i.animIn={opacity:1},i.animOut={opacity:0},i.cssBefore={top:0,left:0}}},e.fn.cycle.ver=function(){return"3.0.3"},e.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:!1,animIn:null,animInDelay:0,animOut:null,animOutDelay:0,aspect:!1,autostop:0,autostopCount:0,backwards:!1,before:null,center:null,cleartype:!e.support.opacity,cleartypeNoBg:!1,containerResize:1,containerResizeHeight:0,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:!0,metaAttr:"cycle",next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:!0,requeueTimeout:250,rev:0,shuffle:null,skipInitializationCallbacks:!1,slideExpr:null,slideResize:1,speed:1e3,speedIn:null,speedOut:null,startingSlide:t,sync:1,timeout:4e3,timeoutFn:null,updateActivePagerLink:null,width:null}}(jQuery),function(e){"use strict";e.fn.cycle.transitions.none=function(t,n,i){i.fxFn=function(t,n,i,c){e(n).show(),e(t).hide(),c()}},e.fn.cycle.transitions.fadeout=function(t,n,i){n.not(":eq("+i.currSlide+")").css({display:"block",opacity:1}),i.before.push(function(t,n,i,c,s,o){e(t).css("zIndex",i.slideCount+(!0!==o?1:0)),e(n).css("zIndex",i.slideCount+(!0!==o?0:1))}),i.animIn.opacity=1,i.animOut.opacity=0,i.cssBefore.opacity=1,i.cssBefore.display="block",i.cssAfter.zIndex=0},e.fn.cycle.transitions.scrollUp=function(t,n,i){t.css("overflow","hidden"),i.before.push(e.fn.cycle.commonReset);var c=t.height();i.cssBefore.top=c,i.cssBefore.left=0,i.cssFirst.top=0,i.animIn.top=0,i.animOut.top=-c},e.fn.cycle.transitions.scrollDown=function(t,n,i){t.css("overflow","hidden"),i.before.push(e.fn.cycle.commonReset);var c=t.height();i.cssFirst.top=0,i.cssBefore.top=-c,i.cssBefore.left=0,i.animIn.top=0,i.animOut.top=c},e.fn.cycle.transitions.scrollLeft=function(t,n,i){t.css("overflow","hidden"),i.before.push(e.fn.cycle.commonReset);var c=t.width();i.cssFirst.left=0,i.cssBefore.left=c,i.cssBefore.top=0,i.animIn.left=0,i.animOut.left=0-c},e.fn.cycle.transitions.scrollRight=function(t,n,i){t.css("overflow","hidden"),i.before.push(e.fn.cycle.commonReset);var c=t.width();i.cssFirst.left=0,i.cssBefore.left=-c,i.cssBefore.top=0,i.animIn.left=0,i.animOut.left=c},e.fn.cycle.transitions.scrollHorz=function(t,n,i){t.css("overflow","hidden").width(),i.before.push(function(t,n,i,c){i.rev&&(c=!c),e.fn.cycle.commonReset(t,n,i),i.cssBefore.left=c?n.cycleW-1:1-n.cycleW,i.animOut.left=c?-t.cycleW:t.cycleW}),i.cssFirst.left=0,i.cssBefore.top=0,i.animIn.left=0,i.animOut.top=0},e.fn.cycle.transitions.scrollVert=function(t,n,i){t.css("overflow","hidden"),i.before.push(function(t,n,i,c){i.rev&&(c=!c),e.fn.cycle.commonReset(t,n,i),i.cssBefore.top=c?1-n.cycleH:n.cycleH-1,i.animOut.top=c?t.cycleH:-t.cycleH}),i.cssFirst.top=0,i.cssBefore.left=0,i.animIn.top=0,i.animOut.left=0},e.fn.cycle.transitions.slideX=function(t,n,i){i.before.push(function(t,n,i){e(i.elements).not(t).hide(),e.fn.cycle.commonReset(t,n,i,!1,!0),i.animIn.width=n.cycleW}),i.cssBefore.left=0,i.cssBefore.top=0,i.cssBefore.width=0,i.animIn.width="show",i.animOut.width=0},e.fn.cycle.transitions.slideY=function(t,n,i){i.before.push(function(t,n,i){e(i.elements).not(t).hide(),e.fn.cycle.commonReset(t,n,i,!0,!1),i.animIn.height=n.cycleH}),i.cssBefore.left=0,i.cssBefore.top=0,i.cssBefore.height=0,i.animIn.height="show",i.animOut.height=0},e.fn.cycle.transitions.shuffle=function(t,n,i){var c,s=t.css("overflow","visible").width();for(n.css({left:0,top:0}),i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!0,!0,!0)}),i.speedAdjusted||(i.speed=i.speed/2,i.speedAdjusted=!0),i.random=0,i.shuffle=i.shuffle||{left:-s,top:15},i.els=[],c=0;c<n.length;c++)i.els.push(n[c]);for(c=0;c<i.currSlide;c++)i.els.push(i.els.shift());i.fxFn=function(t,n,i,c,s){i.rev&&(s=!s);var o=e(s?t:n);e(n).css(i.cssBefore);var r=i.slideCount;o.animate(i.shuffle,i.speedIn,i.easeIn,function(){for(var n=e.fn.cycle.hopsFromLast(i,s),l=0;l<n;l++)s?i.els.push(i.els.shift()):i.els.unshift(i.els.pop());if(s)for(var a=0,f=i.els.length;a<f;a++)e(i.els[a]).css("z-index",f-a+r);else{var u=e(t).css("z-index");o.css("z-index",parseInt(u,10)+1+r)}o.animate({left:0,top:0},i.speedOut,i.easeOut,function(){e(s?this:t).hide(),c&&c()})})},e.extend(i.cssBefore,{display:"block",opacity:1,top:0,left:0})},e.fn.cycle.transitions.turnUp=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!0,!1),i.cssBefore.top=n.cycleH,i.animIn.height=n.cycleH,i.animOut.width=n.cycleW}),i.cssFirst.top=0,i.cssBefore.left=0,i.cssBefore.height=0,i.animIn.top=0,i.animOut.height=0},e.fn.cycle.transitions.turnDown=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!0,!1),i.animIn.height=n.cycleH,i.animOut.top=t.cycleH}),i.cssFirst.top=0,i.cssBefore.left=0,i.cssBefore.top=0,i.cssBefore.height=0,i.animOut.height=0},e.fn.cycle.transitions.turnLeft=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!1,!0),i.cssBefore.left=n.cycleW,i.animIn.width=n.cycleW}),i.cssBefore.top=0,i.cssBefore.width=0,i.animIn.left=0,i.animOut.width=0},e.fn.cycle.transitions.turnRight=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!1,!0),i.animIn.width=n.cycleW,i.animOut.left=t.cycleW}),e.extend(i.cssBefore,{top:0,left:0,width:0}),i.animIn.left=0,i.animOut.width=0},e.fn.cycle.transitions.zoom=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!1,!1,!0),i.cssBefore.top=n.cycleH/2,i.cssBefore.left=n.cycleW/2,e.extend(i.animIn,{top:0,left:0,width:n.cycleW,height:n.cycleH}),e.extend(i.animOut,{width:0,height:0,top:t.cycleH/2,left:t.cycleW/2})}),i.cssFirst.top=0,i.cssFirst.left=0,i.cssBefore.width=0,i.cssBefore.height=0},e.fn.cycle.transitions.fadeZoom=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!1,!1),i.cssBefore.left=n.cycleW/2,i.cssBefore.top=n.cycleH/2,e.extend(i.animIn,{top:0,left:0,width:n.cycleW,height:n.cycleH})}),i.cssBefore.width=0,i.cssBefore.height=0,i.animOut.opacity=0},e.fn.cycle.transitions.blindX=function(t,n,i){var c=t.css("overflow","hidden").width();i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i),i.animIn.width=n.cycleW,i.animOut.left=t.cycleW}),i.cssBefore.left=c,i.cssBefore.top=0,i.animIn.left=0,i.animOut.left=c},e.fn.cycle.transitions.blindY=function(t,n,i){var c=t.css("overflow","hidden").height();i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i),i.animIn.height=n.cycleH,i.animOut.top=t.cycleH}),i.cssBefore.top=c,i.cssBefore.left=0,i.animIn.top=0,i.animOut.top=c},e.fn.cycle.transitions.blindZ=function(t,n,i){var c=t.css("overflow","hidden").height(),s=t.width();i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i),i.animIn.height=n.cycleH,i.animOut.top=t.cycleH}),i.cssBefore.top=c,i.cssBefore.left=s,i.animIn.top=0,i.animIn.left=0,i.animOut.top=c,i.animOut.left=s},e.fn.cycle.transitions.growX=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!1,!0),i.cssBefore.left=this.cycleW/2,i.animIn.left=0,i.animIn.width=this.cycleW,i.animOut.left=0}),i.cssBefore.top=0,i.cssBefore.width=0},e.fn.cycle.transitions.growY=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!0,!1),i.cssBefore.top=this.cycleH/2,i.animIn.top=0,i.animIn.height=this.cycleH,i.animOut.top=0}),i.cssBefore.height=0,i.cssBefore.left=0},e.fn.cycle.transitions.curtainX=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!1,!0,!0),i.cssBefore.left=n.cycleW/2,i.animIn.left=0,i.animIn.width=this.cycleW,i.animOut.left=t.cycleW/2,i.animOut.width=0}),i.cssBefore.top=0,i.cssBefore.width=0},e.fn.cycle.transitions.curtainY=function(t,n,i){i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!0,!1,!0),i.cssBefore.top=n.cycleH/2,i.animIn.top=0,i.animIn.height=n.cycleH,i.animOut.top=t.cycleH/2,i.animOut.height=0}),i.cssBefore.height=0,i.cssBefore.left=0},e.fn.cycle.transitions.cover=function(t,n,i){var c=i.direction||"left",s=t.css("overflow","hidden").width(),o=t.height();i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i),i.cssAfter.display="","right"==c?i.cssBefore.left=-s:"up"==c?i.cssBefore.top=o:"down"==c?i.cssBefore.top=-o:i.cssBefore.left=s}),i.animIn.left=0,i.animIn.top=0,i.cssBefore.top=0,i.cssBefore.left=0},e.fn.cycle.transitions.uncover=function(t,n,i){var c=i.direction||"left",s=t.css("overflow","hidden").width(),o=t.height();i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!0,!0,!0),"right"==c?i.animOut.left=s:"up"==c?i.animOut.top=-o:"down"==c?i.animOut.top=o:i.animOut.left=-s}),i.animIn.left=0,i.animIn.top=0,i.cssBefore.top=0,i.cssBefore.left=0},e.fn.cycle.transitions.toss=function(t,n,i){var c=t.css("overflow","visible").width(),s=t.height();i.before.push(function(t,n,i){e.fn.cycle.commonReset(t,n,i,!0,!0,!0),i.animOut.left||i.animOut.top?i.animOut.opacity=0:e.extend(i.animOut,{left:2*c,top:-s/2,opacity:0})}),i.cssBefore.left=0,i.cssBefore.top=0,i.animIn.left=0},e.fn.cycle.transitions.wipe=function(t,n,i){var c,s=t.css("overflow","hidden").width(),o=t.height();if(i.cssBefore=i.cssBefore||{},i.clip)if(/l2r/.test(i.clip))c="rect(0px 0px "+o+"px 0px)";else if(/r2l/.test(i.clip))c="rect(0px "+s+"px "+o+"px "+s+"px)";else if(/t2b/.test(i.clip))c="rect(0px "+s+"px 0px 0px)";else if(/b2t/.test(i.clip))c="rect("+o+"px "+s+"px "+o+"px 0px)";else if(/zoom/.test(i.clip)){var r=parseInt(o/2,10),l=parseInt(s/2,10);c="rect("+r+"px "+l+"px "+r+"px "+l+"px)"}i.cssBefore.clip=i.cssBefore.clip||c||"rect(0px 0px 0px 0px)";var a=i.cssBefore.clip.match(/(\d+)/g),f=parseInt(a[0],10),u=parseInt(a[1],10),h=parseInt(a[2],10),d=parseInt(a[3],10);i.before.push(function(t,n,i){if(t!=n){var c=e(t),r=e(n);e.fn.cycle.commonReset(t,n,i,!0,!0,!1),i.cssAfter.display="block";var l=1,a=parseInt(i.speedIn/13,10)-1;!function e(){var t=f?f-parseInt(l*(f/a),10):0,n=d?d-parseInt(l*(d/a),10):0,i=h<o?h+parseInt(l*((o-h)/a||1),10):o,p=u<s?u+parseInt(l*((s-u)/a||1),10):s;r.css({clip:"rect("+t+"px "+p+"px "+i+"px "+n+"px)"}),l++<=a?setTimeout(e,13):c.css("display","none")}()}}),e.extend(i.cssBefore,{display:"block",opacity:1,top:0,left:0}),i.animIn={left:0},i.animOut={left:0}}}(jQuery);