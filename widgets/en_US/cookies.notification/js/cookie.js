(function(){if(window.hasCookieConsent)return;window.hasCookieConsent=true;var OPTIONS_VARIABLE='cookieconsent_options';var OPTIONS_UPDATER='update_cookieconsent_options';var DISMISSED_COOKIE='cookieconsent_dismissed';var THEME_BUCKET_PATH='//github.com/joniibra/webdev/tree/blogger/widgets/en_US/cookies.notification/css/';if(document.cookie.indexOf(DISMISSED_COOKIE)>-1){return;}if(typeof String.prototype.trim!=='function'){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};}var Util={isArray:function(obj){var proto=Object.prototype.toString.call(obj);return proto=='[object Array]';},isObject:function(obj){return Object.prototype.toString.call(obj)=='[object Object]';},each:function(arr,callback,context,force){if(Util.isObject(arr)&&!force){for(var key in arr){if(arr.hasOwnProperty(key)){callback.call(context,arr[key],key,arr);}}}else{for(var i=0,ii=arr.length;i<ii;i++){callback.call(context,arr[i],i,arr);}}},merge:function(obj1,obj2){if(!obj1)return;Util.each(obj2,function(val,key){if(Util.isObject(val)&&Util.isObject(obj1[key])){Util.merge(obj1[key],val);}else{obj1[key]=val;}})},bind:function(func,context){return function(){return func.apply(context,arguments);};},queryObject:function(object,query){var queryPart;var i=0;var head=object;query=query.split('.');while((queryPart=query[i++])&&head.hasOwnProperty(queryPart)&&(head=head[queryPart])){if(i===query.length)return head;}return null;},setCookie:function(name,value,expiryDays,domain,path){expiryDays=expiryDays||365;var exdate=new Date();exdate.setDate(exdate.getDate()+expiryDays);var cookie=[name+'='+value,'expires='+exdate.toUTCString(),'path='+path||'/'];if(domain){cookie.push('domain='+domain);}document.cookie=cookie.join(';');},addEventListener:function(el,event,eventListener){if(el.addEventListener){el.addEventListener(event,eventListener);}else{el.attachEvent('on'+event,eventListener);}}};var DomBuilder=(function(){var eventAttribute='data-cc-event';var conditionAttribute='data-cc-if';var addEventListener=function(el,event,eventListener){if(Util.isArray(event)){return Util.each(event,function(ev){addEventListener(el,ev,eventListener);});}if(el.addEventListener){el.addEventListener(event,eventListener);}else{el.attachEvent('on'+event,eventListener);}};var insertReplacements=function(htmlStr,scope){return htmlStr.replace(/\{\{(.*?)\}\}/g,function(_match,sub){var tokens=sub.split('||');var value;while(token=tokens.shift()){token=token.trim();if(token[0]==='"')return token.slice(1,token.length-1);value=Util.queryObject(scope,token);if(value)return value;}return'';});};var buildDom=function(htmlStr){var container=document.createElement('div');container.innerHTML=htmlStr;return container.children[0];};var applyToElementsWithAttribute=function(dom,attribute,func){var els=dom.parentNode.querySelectorAll('['+attribute+']');Util.each(els,function(element){var attributeVal=element.getAttribute(attribute);func(element,attributeVal);},window,true);};var applyEvents=function(dom,scope){applyToElementsWithAttribute(dom,eventAttribute,function(element,attributeVal){var parts=attributeVal.split(':');var listener=Util.queryObject(scope,parts[1]);addEventListener(element,parts[0],Util.bind(listener,scope));});};var applyConditionals=function(dom,scope){applyToElementsWithAttribute(dom,conditionAttribute,function(element,attributeVal){var value=Util.queryObject(scope,attributeVal);if(!value){element.parentNode.removeChild(element);}});};return{build:function(htmlStr,scope){if(Util.isArray(htmlStr))htmlStr=htmlStr.join('');htmlStr=insertReplacements(htmlStr,scope);var dom=buildDom(htmlStr);applyEvents(dom,scope);applyConditionals(dom,scope);return dom;}};})();var cookieconsent={options:{message:'This website uses cookies to ensure you get the best experience on our website. ',dismiss:'Got it!',learnMore:'More info',link:null,container:null,theme:'light-floating',domain:null,path:'/',expiryDays:365,markup:['<div class="cc_banner-wrapper {{containerClasses}}">','<div class="cc_banner cc_container cc_container--open">','<a href="#null" data-cc-event="click:dismiss" target="_blank" class="cc_btn cc_btn_accept_all">{{options.dismiss}}</a>','<p class="cc_message">{{options.message}} <a data-cc-if="options.link" class="cc_more_info" href="{{options.link || "#null"}}">{{options.learnMore}}</a></p>','<a class="cc_logo" target="_blank" href="//www.youtube.com/joniibra?sub_confirmation=1">Cookie Consent plugin for the EU cookie law</a>','</div>','</div>']},init:function(){var options=window[OPTIONS_VARIABLE];if(options)this.setOptions(options);this.setContainer();if(this.options.theme){this.loadTheme(this.render);}else{this.render();}},setOptionsOnTheFly:function(options){this.setOptions(options);this.render();},setOptions:function(options){Util.merge(this.options,options);},setContainer:function(){if(this.options.container){this.container=document.querySelector(this.options.container);}else{this.container=document.body;}this.containerClasses='';if(navigator.appVersion.indexOf('MSIE 8')>-1){this.containerClasses+=' cc_ie8'}},loadTheme:function(callback){var theme=this.options.theme;if(theme.indexOf('.css')===-1){theme=THEME_BUCKET_PATH+theme+'.css';}var link=document.createElement('link');link.rel='stylesheet';link.type='text/css';link.href=theme;var loaded=false;link.onload=Util.bind(function(){if(!loaded&&callback){callback.call(this);loaded=true;}},this);document.getElementsByTagName("head")[0].appendChild(link);},render:function(){if(this.element&&this.element.parentNode){this.element.parentNode.removeChild(this.element);delete this.element;}this.element=DomBuilder.build(this.options.markup,this);if(!this.container.firstChild){this.container.appendChild(this.element);}else{this.container.insertBefore(this.element,this.container.firstChild);}},dismiss:function(evt){evt.preventDefault&&evt.preventDefault();evt.returnValue=false;this.setDismissedCookie();this.container.removeChild(this.element);},setDismissedCookie:function(){Util.setCookie(DISMISSED_COOKIE,'yes',this.options.expiryDays,this.options.domain,this.options.path);}};var init;var initialized=false;(init=function(){if(!initialized&&document.readyState=='complete'){cookieconsent.init();initialized=true;window[OPTIONS_UPDATER]=Util.bind(cookieconsent.setOptionsOnTheFly,cookieconsent);}})();Util.addEventListener(document,'readystatechange',init);})();
