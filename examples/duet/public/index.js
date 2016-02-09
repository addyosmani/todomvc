(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function SingleThread(){this.worker={},this.self={postMessage:messenger(this.worker)},this.worker.postMessage=messenger(this.self)}function messenger(e){return function(s){setTimeout(function(){"function"==typeof e.onmessage&&e.onmessage({data:s})},0)}}module.exports=SingleThread;


},{}],2:[function(require,module,exports){
function appThread(e,a,r){function t(a){var r,t,n;r=d(a),t=vdom.diff(l,r),n=serialize(t),l=r,domEvent.cycleHandlers(),e.postMessage({type:"DOM_PATCH",data:n})}function n(e,a,r){if(d)throw new Error("tried to initialise app more than once");d=e,l=vdom.h("div"),t(a()),a(t),u=r,o(m)}function i(e){m=e,a(n)}function o(e){var a,t;"function"==typeof u&&(r.isHashRouter?(t=e.split("#"),t.length>1&&(t.shift(),a=hashMatch("#".concat(t.join("#"))))):(a=pathnameMatch(e),a.length||(a="/")),a&&u(a))}function s(e){var a=domEvent.getHandler(e.handlerKey);null!=a&&a(e)}function c(e){var a=localStorage.getHandler(e.handlerKey);null!=a&&a(e)}function h(e,a){switch(e){case"READY":i(a);break;case"LOCATION":o(a);break;case"DOM_EVENT":s(a);break;case"LOCAL_STORAGE":c(a)}}var l,d,u,m;return e.onmessage=msg(h,r.isDebug&&"USER"),e.postMessage.bind(e)}var vdom=require("virtual-dom"),serialize=require("vdom-serialized-patch/serialize"),pathnameMatch=require("pathname-match"),hashMatch=require("hash-match"),msg=require("./msg"),domEvent=require("./domEvent"),localStorage=require("./localStorage");module.exports=appThread;


},{"./domEvent":5,"./localStorage":8,"./msg":10,"hash-match":36,"pathname-match":46,"vdom-serialized-patch/serialize":64,"virtual-dom":68}],3:[function(require,module,exports){
function init(e){"function"!=typeof post&&(post=e,flush())}function flush(){if("function"==typeof post)for(;queue.length;)post({type:"CSS",data:queue.shift()})}function css(){var e,s;return e=slice.call(arguments),s=csjs.apply(null,e),queue.push(csjs.getCss(s)),flush(),s}var extend=require("xtend/mutable"),csjs=require("csjs"),slice=Array.prototype.slice,queue=[],post;module.exports=extend(css,{init:init});


},{"csjs":23,"xtend/mutable":103}],4:[function(require,module,exports){
function domFor(e){return hyperx(hyperstyles(vdom.h,e))}var extend=require("xtend/mutable"),vdom=require("virtual-dom"),hyperstyles=require("hyperstyles"),hyperx=require("hyperx"),dom=hyperx(vdom.h);module.exports=extend(dom,{domFor:domFor});


},{"hyperstyles":37,"hyperx":39,"virtual-dom":68,"xtend/mutable":103}],5:[function(require,module,exports){
function domEvent(e,n,r){var t;return t=nextHandlerKey++,nextHandlers[t]=function(t){n(e,{event:t.eventData,form:t.formData,custom:r})},t}function forModel(e,n){return domEvent(this,e,n)}function getHandler(e){return currentHandlers[e]}function cycleHandlers(){currentHandlers=nextHandlers,nextHandlers={},nextHandlerKey=0}var extend=require("xtend/mutable"),domEventNames=require("./domEventNames"),nextHandlerKey=0,currentHandlers={},nextHandlers={};module.exports=extend(domEvent,{domEventNames:domEventNames,forModel:forModel,getHandler:getHandler,cycleHandlers:cycleHandlers});


},{"./domEventNames":6,"xtend/mutable":103}],6:[function(require,module,exports){
module.exports=["animationend","animationiteration","animationstart","transitionend","abort","beforeinput","blur","click","compositionend","compositionstart","compositionupdate","dblclick","error","focus","focusin","focusout","input","keydown","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","resize","scroll","select","unload","wheel","DOMContentLoaded","afterprint","afterscriptexecute","autocomplete","autocompleteerror","beforeprint","beforescriptexecute","beforeunload","cancel","canplay","canplaythrough","change","close","connect","contextmenu","durationchange","emptied","error","hashchange","invalid","languagechange","loadeddata","loadedmetadata","loadend","loadstart","message","offline","online","open","pagehide","pageshow","play","playing","popstate","progress","readystatechange","reset","seeked","seeking","select","show","sort","stalled","storage","submit","suspend","timeupdate","toggle","volumechange","waiting","drag","dragend","dragenter","dragexit","dragleave","dragover","dragstart","drop","gotpointercapture","lostpointercapture","pointercancel","pointerdown","pointerenter","pointerleave","pointermove","pointerout","pointerover","pointerup","selectionchange","selectstart","touchcancel","touchend","touchmove","touchstart"];


},{}],7:[function(require,module,exports){
(function (global){
function duet(e,r,o){function l(e){localStorage.init(e),css.init(e)}var a;if(o="object"==typeof o&&null!==o&&o||{},!o.forceSingleThread){if(WORKER_ENABLED)return userThread(new global.Worker(PATHNAME),r,o);if(IN_WORKER_CONTEXT)return l(appThread(global.self,e,o))}a=new SingleThread,userThread(a.worker,r,o),l(appThread(a.self,e,o))}var extend=require("xtend/mutable"),userThread=require("./userThread"),appThread=require("./appThread"),SingleThread=require("./SingleThread"),dom=require("./dom"),domEvent=require("./domEvent"),model=require("./model"),localStorage=require("./localStorage"),css=require("./css"),router=require("./router"),WORKER_ENABLED=!(global!==global.window||!global.URL||!global.Worker),IN_WORKER_CONTEXT=!(global!==global.self||!global.location),PATHNAME=WORKER_ENABLED&&function(){var e,r;return e=global.document.getElementsByTagName("script"),r=e[e.length-1].src,new global.URL(r).pathname}();module.exports=extend(duet,{dom:dom,domFor:dom.domFor,domEvent:domEvent,event:domEvent,ev:domEvent,model:model,modelFor:model.modelFor,struct:model.struct,varhash:model.varhash,value:model.value,localStorage:localStorage,css:css,router:router});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./SingleThread":1,"./appThread":2,"./css":3,"./dom":4,"./domEvent":5,"./localStorage":8,"./model":9,"./router":11,"./userThread":12,"xtend/mutable":103}],8:[function(require,module,exports){
function init(e){"function"!=typeof post&&(post=e,flush())}function flush(){if("function"==typeof post)for(;queue.length;)post({type:"LOCAL_STORAGE",data:queue.shift()})}function getHandler(e){return handlers[e]}function localStorage(e,t){var n;return"function"==typeof t?(n=nextHandlerKey++,handlers[n]=function(e){t(e.value)},queue.push({handlerKey:n,key:e}),flush(),n):(queue.push({key:e,value:t}),void flush())}var extend=require("xtend/mutable"),nextHandlerKey=0,handlers={},queue=[],post;module.exports=extend(localStorage,{init:init,getHandler:getHandler});


},{"xtend/mutable":103}],9:[function(require,module,exports){
function modelFor(e){var r;if(null==e.__MODEL_REFERENCE__)throw new Error("__MODEL_REFERENCE__ not found on state");if(r=models[e.__MODEL_REFERENCE__],null==r)throw new Error("__MODEL_REFERENCE__ is invalid");return r}function model(e){var r;if(e="object"==typeof e?e:{},null!=e.__MODEL_REFERENCE__)throw new Error('"__MODEL_REFERENCE__" is a reserved key');if(e.__MODEL_REFERENCE__=models.length,null!=e.event)throw new Error('"event" is a reserved key');return r=struct(e),r.event=forModel,r.ev=forModel,models.push(r),r}var extend=require("xtend/mutable"),struct=require("observ-struct"),varhash=require("observ-varhash"),value=require("observ"),forModel=require("./domEvent").forModel,models=[];module.exports=extend(model,{struct:struct,varhash:varhash,value:value,modelFor:modelFor});


},{"./domEvent":5,"observ":45,"observ-struct":41,"observ-varhash":43,"xtend/mutable":103}],10:[function(require,module,exports){
function msg(a,t){return function(e){return t&&console.debug(t+"::"+e.data.type,e.data.data),a(e.data.type,e.data.data)}}var console=require("console");module.exports=msg;


},{"console":15}],11:[function(require,module,exports){
module.exports=require("wayfarer");


},{"wayfarer":99}],12:[function(require,module,exports){
function userThread(e,t,a){function n(t,a){function n(e,t){var n=a[t];return t.charAt(0)!==t.charAt(0).toLowerCase()||"number"!=typeof n&&"string"!=typeof n&&"boolean"!=typeof n||(e[t]=n),e}var o,r,s;o=a.target.dataset[t],"string"==typeof o&&(r=Object.keys(a.constructor.prototype).reduce(n,{}),s=getFormData(a.target),new RegExp("\\b"+t+"\\b").test(a.target.dataset["default"])||a.preventDefault(),e.postMessage({type:"DOM_EVENT",data:{handlerKey:o,eventName:t,eventData:r,formData:s}}))}function o(e){m[e]=n.bind(null,e),f.addEventListener(e,m[e])}function r(e){f.removeEventListener(e,m[e]),delete m[e]}function s(e){function t(e){Object.keys(e.dataset).forEach(a)}function a(e){domEventNames.indexOf(e)>-1&&s.indexOf(e)<0&&s.push(e)}function n(e){s.indexOf(e)>-1&&null==m[e]?o(e):s.indexOf(e)<0&&null!=m[e]&&r(e)}var s;patch(f,e),s=[],concat.apply(f,f.querySelectorAll("*")).forEach(t),domEventNames.forEach(n)}function c(e){window.requestAnimationFrame(s.bind(null,e))}function i(t){return t.value?void localStorage.setItem(t.key,t.value):e.postMessage({type:"LOCAL_STORAGE",data:{handlerKey:t.handlerKey,value:localStorage.getItem(t.key)}})}function u(e){insertCSS(e)}function d(e,t){switch(e){case"DOM_PATCH":c(t);break;case"LOCAL_STORAGE":i(t);break;case"CSS":u(t)}}var l,f,m;if(l=document.querySelector(t),null==l)throw new Error("selector did not match an element");f=document.createElement("div"),l.insertBefore(f,l.firstChild),m={},window.onclick=function(t){"a"===t.target.localName&&void 0!==t.target.href&&window.location.host===t.target.host&&(t.preventDefault(),e.postMessage({type:"LOCATION",data:t.target.href}),window.history.pushState({},null,t.target.href))},window.onpopstate=function(){e.postMessage({type:"LOCATION",data:document.location.href})},e.onmessage=msg(d,a.isDebug&&"APP"),e.postMessage({type:"READY",data:document.location.href})}var insertCSS=require("insert-css"),getFormData=require("form-data-set/element"),patch=require("vdom-serialized-patch/patch"),concat=Array.prototype.concat,slice=Array.prototype.slice,msg=require("./msg"),domEventNames=require("./domEvent").domEventNames;module.exports=userThread;


},{"./domEvent":5,"./msg":10,"form-data-set/element":33,"insert-css":40,"vdom-serialized-patch/patch":63}],13:[function(require,module,exports){
function replacer(t,e){return util.isUndefined(e)?""+e:util.isNumber(e)&&!isFinite(e)?e.toString():util.isFunction(e)||util.isRegExp(e)?e.toString():e}function truncate(t,e){return util.isString(t)?t.length<e?t:t.slice(0,e):t}function getMessage(t){return truncate(JSON.stringify(t.actual,replacer),128)+" "+t.operator+" "+truncate(JSON.stringify(t.expected,replacer),128)}function fail(t,e,r,i,s){throw new assert.AssertionError({message:r,actual:t,expected:e,operator:i,stackStartFunction:s})}function ok(t,e){t||fail(t,!0,e,"==",assert.ok)}function _deepEqual(t,e){if(t===e)return!0;if(util.isBuffer(t)&&util.isBuffer(e)){if(t.length!=e.length)return!1;for(var r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}return util.isDate(t)&&util.isDate(e)?t.getTime()===e.getTime():util.isRegExp(t)&&util.isRegExp(e)?t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase:util.isObject(t)||util.isObject(e)?objEquiv(t,e):t==e}function isArguments(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function objEquiv(t,e){if(util.isNullOrUndefined(t)||util.isNullOrUndefined(e))return!1;if(t.prototype!==e.prototype)return!1;if(util.isPrimitive(t)||util.isPrimitive(e))return t===e;var r=isArguments(t),i=isArguments(e);if(r&&!i||!r&&i)return!1;if(r)return t=pSlice.call(t),e=pSlice.call(e),_deepEqual(t,e);var s,n,a=objectKeys(t),u=objectKeys(e);if(a.length!=u.length)return!1;for(a.sort(),u.sort(),n=a.length-1;n>=0;n--)if(a[n]!=u[n])return!1;for(n=a.length-1;n>=0;n--)if(s=a[n],!_deepEqual(t[s],e[s]))return!1;return!0}function expectedException(t,e){return t&&e?"[object RegExp]"==Object.prototype.toString.call(e)?e.test(t):t instanceof e?!0:e.call({},t)===!0?!0:!1:!1}function _throws(t,e,r,i){var s;util.isString(r)&&(i=r,r=null);try{e()}catch(n){s=n}if(i=(r&&r.name?" ("+r.name+").":".")+(i?" "+i:"."),t&&!s&&fail(s,r,"Missing expected exception"+i),!t&&expectedException(s,r)&&fail(s,r,"Got unwanted exception"+i),t&&s&&r&&!expectedException(s,r)||!t&&s)throw s}var util=require("util/"),pSlice=Array.prototype.slice,hasOwn=Object.prototype.hasOwnProperty,assert=module.exports=ok;assert.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=getMessage(this),this.generatedMessage=!0);var e=t.stackStartFunction||fail;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var r=new Error;if(r.stack){var i=r.stack,s=e.name,n=i.indexOf("\n"+s);if(n>=0){var a=i.indexOf("\n",n+1);i=i.substring(a+1)}this.stack=i}}},util.inherits(assert.AssertionError,Error),assert.fail=fail,assert.ok=ok,assert.equal=function(t,e,r){t!=e&&fail(t,e,r,"==",assert.equal)},assert.notEqual=function(t,e,r){t==e&&fail(t,e,r,"!=",assert.notEqual)},assert.deepEqual=function(t,e,r){_deepEqual(t,e)||fail(t,e,r,"deepEqual",assert.deepEqual)},assert.notDeepEqual=function(t,e,r){_deepEqual(t,e)&&fail(t,e,r,"notDeepEqual",assert.notDeepEqual)},assert.strictEqual=function(t,e,r){t!==e&&fail(t,e,r,"===",assert.strictEqual)},assert.notStrictEqual=function(t,e,r){t===e&&fail(t,e,r,"!==",assert.notStrictEqual)},assert["throws"]=function(t,e,r){_throws.apply(this,[!0].concat(pSlice.call(arguments)))},assert.doesNotThrow=function(t,e){_throws.apply(this,[!1].concat(pSlice.call(arguments)))},assert.ifError=function(t){if(t)throw t};var objectKeys=Object.keys||function(t){var e=[];for(var r in t)hasOwn.call(t,r)&&e.push(r);return e};


},{"util/":20}],14:[function(require,module,exports){



},{}],15:[function(require,module,exports){
(function (global){
function log(){}function info(){console.log.apply(console,arguments)}function warn(){console.log.apply(console,arguments)}function error(){console.warn.apply(console,arguments)}function time(o){times[o]=now()}function timeEnd(o){var e=times[o];if(!e)throw new Error("No such label: "+o);var n=now()-e;console.log(o+": "+n+"ms")}function trace(){var o=new Error;o.name="Trace",o.message=util.format.apply(null,arguments),console.error(o.stack)}function dir(o){console.log(util.inspect(o)+"\n")}function consoleAssert(o){if(!o){var e=slice.call(arguments,1);assert.ok(!1,util.format.apply(null,e))}}var util=require("util"),assert=require("assert"),now=require("date-now"),slice=Array.prototype.slice,console,times={};console="undefined"!=typeof global&&global.console?global.console:"undefined"!=typeof window&&window.console?window.console:{};for(var functions=[[log,"log"],[info,"info"],[warn,"warn"],[error,"error"],[time,"time"],[timeEnd,"timeEnd"],[trace,"trace"],[dir,"dir"],[consoleAssert,"assert"]],i=0;i<functions.length;i++){var tuple=functions[i],f=tuple[0],name=tuple[1];console[name]||(console[name]=f)}module.exports=console;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"assert":13,"date-now":16,"util":20}],16:[function(require,module,exports){
function now(){return(new Date).getTime()}module.exports=now;


},{}],17:[function(require,module,exports){
"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};


},{}],18:[function(require,module,exports){
function drainQueue(){if(!draining){draining=!0;for(var e,o=queue.length;o;){e=queue,queue=[];for(var r=-1;++r<o;)e[r]();o=queue.length}draining=!1}}function noop(){}var process=module.exports={},queue=[],draining=!1;process.nextTick=function(e){queue.push(e),draining||setTimeout(drainQueue,0)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};


},{}],19:[function(require,module,exports){
module.exports=function(o){return o&&"object"==typeof o&&"function"==typeof o.copy&&"function"==typeof o.fill&&"function"==typeof o.readUInt8};


},{}],20:[function(require,module,exports){
(function (process,global){
function inspect(e,r){var t={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(t.depth=arguments[2]),arguments.length>=4&&(t.colors=arguments[3]),isBoolean(r)?t.showHidden=r:r&&exports._extend(t,r),isUndefined(t.showHidden)&&(t.showHidden=!1),isUndefined(t.depth)&&(t.depth=2),isUndefined(t.colors)&&(t.colors=!1),isUndefined(t.customInspect)&&(t.customInspect=!0),t.colors&&(t.stylize=stylizeWithColor),formatValue(t,e,t.depth)}function stylizeWithColor(e,r){var t=inspect.styles[r];return t?"["+inspect.colors[t][0]+"m"+e+"["+inspect.colors[t][1]+"m":e}function stylizeNoColor(e,r){return e}function arrayToHash(e){var r={};return e.forEach(function(e,t){r[e]=!0}),r}function formatValue(e,r,t){if(e.customInspect&&r&&isFunction(r.inspect)&&r.inspect!==exports.inspect&&(!r.constructor||r.constructor.prototype!==r)){var n=r.inspect(t,e);return isString(n)||(n=formatValue(e,n,t)),n}var i=formatPrimitive(e,r);if(i)return i;var o=Object.keys(r),s=arrayToHash(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(r)),isError(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return formatError(r);if(0===o.length){if(isFunction(r)){var u=r.name?": "+r.name:"";return e.stylize("[Function"+u+"]","special")}if(isRegExp(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(isDate(r))return e.stylize(Date.prototype.toString.call(r),"date");if(isError(r))return formatError(r)}var a="",c=!1,l=["{","}"];if(isArray(r)&&(c=!0,l=["[","]"]),isFunction(r)){var p=r.name?": "+r.name:"";a=" [Function"+p+"]"}if(isRegExp(r)&&(a=" "+RegExp.prototype.toString.call(r)),isDate(r)&&(a=" "+Date.prototype.toUTCString.call(r)),isError(r)&&(a=" "+formatError(r)),0===o.length&&(!c||0==r.length))return l[0]+a+l[1];if(0>t)return isRegExp(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special");e.seen.push(r);var f;return f=c?formatArray(e,r,t,s,o):o.map(function(n){return formatProperty(e,r,t,s,n,c)}),e.seen.pop(),reduceToSingleString(f,a,l)}function formatPrimitive(e,r){if(isUndefined(r))return e.stylize("undefined","undefined");if(isString(r)){var t="'"+JSON.stringify(r).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(t,"string")}return isNumber(r)?e.stylize(""+r,"number"):isBoolean(r)?e.stylize(""+r,"boolean"):isNull(r)?e.stylize("null","null"):void 0}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatArray(e,r,t,n,i){for(var o=[],s=0,u=r.length;u>s;++s)hasOwnProperty(r,String(s))?o.push(formatProperty(e,r,t,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(formatProperty(e,r,t,n,i,!0))}),o}function formatProperty(e,r,t,n,i,o){var s,u,a;if(a=Object.getOwnPropertyDescriptor(r,i)||{value:r[i]},a.get?u=a.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):a.set&&(u=e.stylize("[Setter]","special")),hasOwnProperty(n,i)||(s="["+i+"]"),u||(e.seen.indexOf(a.value)<0?(u=isNull(t)?formatValue(e,a.value,null):formatValue(e,a.value,t-1),u.indexOf("\n")>-1&&(u=o?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special")),isUndefined(s)){if(o&&i.match(/^\d+$/))return u;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+u}function reduceToSingleString(e,r,t){var n=0,i=e.reduce(function(e,r){return n++,r.indexOf("\n")>=0&&n++,e+r.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?t[0]+(""===r?"":r+"\n ")+" "+e.join(",\n  ")+" "+t[1]:t[0]+r+" "+e.join(", ")+" "+t[1]}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return 10>e?"0"+e.toString(10):e.toString(10)}function timestamp(){var e=new Date,r=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":");return[e.getDate(),months[e.getMonth()],r].join(" ")}function hasOwnProperty(e,r){return Object.prototype.hasOwnProperty.call(e,r)}var formatRegExp=/%[sdj%]/g;exports.format=function(e){if(!isString(e)){for(var r=[],t=0;t<arguments.length;t++)r.push(inspect(arguments[t]));return r.join(" ")}for(var t=1,n=arguments,i=n.length,o=String(e).replace(formatRegExp,function(e){if("%%"===e)return"%";if(t>=i)return e;switch(e){case"%s":return String(n[t++]);case"%d":return Number(n[t++]);case"%j":try{return JSON.stringify(n[t++])}catch(r){return"[Circular]"}default:return e}}),s=n[t];i>t;s=n[++t])o+=isNull(s)||!isObject(s)?" "+s:" "+inspect(s);return o},exports.deprecate=function(e,r){function t(){if(!n){if(process.throwDeprecation)throw new Error(r);process.traceDeprecation?console.trace(r):console.error(r),n=!0}return e.apply(this,arguments)}if(isUndefined(global.process))return function(){return exports.deprecate(e,r).apply(this,arguments)};if(process.noDeprecation===!0)return e;var n=!1;return t};var debugs={},debugEnviron;exports.debuglog=function(e){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!debugs[e])if(new RegExp("\\b"+e+"\\b","i").test(debugEnviron)){var r=process.pid;debugs[e]=function(){var t=exports.format.apply(exports,arguments);console.error("%s %d: %s",e,r,t)}}else debugs[e]=function(){};return debugs[e]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=require("./support/isBuffer");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=require("inherits"),exports._extend=function(e,r){if(!r||!isObject(r))return e;for(var t=Object.keys(r),n=t.length;n--;)e[t[n]]=r[t[n]];return e};


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":19,"_process":18,"inherits":17}],21:[function(require,module,exports){
"use strict";module.exports=require("./lib/csjs");


},{"./lib/csjs":26}],22:[function(require,module,exports){
"use strict";module.exports=require("./lib/get-css");


},{"./lib/get-css":29}],23:[function(require,module,exports){
"use strict";module.exports=require("./csjs"),module.exports.csjs=module.exports,module.exports.getCss=require("./get-css");


},{"./csjs":21,"./get-css":22}],24:[function(require,module,exports){
"use strict";var CHARS="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";module.exports=function(r){if(0===r)return"0";for(var t="";r>0;)t=CHARS[r%62]+t,r=Math.floor(r/62);return t};


},{}],25:[function(require,module,exports){
"use strict";function makeComposition(e,o,i){var n=e.join(" ");return Object.create(Composition.prototype,{classNames:{value:Object.freeze(e),configurable:!1,writable:!1,enumerable:!0},unscoped:{value:Object.freeze(o),configurable:!1,writable:!1,enumerable:!0},className:{value:n,configurable:!1,writable:!1,enumerable:!0},selector:{value:e.map(function(e){return i?e:"."+e}).join(", "),configurable:!1,writable:!1,enumerable:!0},toString:{value:function(){return n},configurable:!1,writeable:!1,enumerable:!1}})}function isComposition(e){return e instanceof Composition}function Composition(){}module.exports={makeComposition:makeComposition,isComposition:isComposition};


},{}],26:[function(require,module,exports){
"use strict";function selectorize(e){return isComposition(e)?e.selector:e}function joiner(e,s){return e.map(function(e,o){return o!==s.length?e+s[o]:e}).join("")}var extractExtends=require("./css-extract-extends"),isComposition=require("./composition").isComposition,makeComposition=require("./composition").makeComposition,scopify=require("./scopeify"),cssKey=require("./css-symbol");module.exports=function(e){var s=Array.prototype.slice.call(arguments,1),o=joiner(e,s.map(selectorize)),i=s.reduce(function(e,s){return isComposition(s)&&s.classNames.forEach(function(o,i){e[o]=s.unscoped[i]}),e},{}),r=scopify(o,i),t=Object.assign({},r.classes,r.keyframes),n=extractExtends(r.css,t),c=n.extensions,u=Object.keys(t).reduce(function(e,s){var o=i[t[s]]?i[t[s]]:t[s],n=Boolean(r.keyframes[s]);return e[o]=c[s]?c[s]:makeComposition([s],[o],n),e},{});return u[cssKey]=n.css,u};


},{"./composition":25,"./css-extract-extends":27,"./css-symbol":28,"./scopeify":32}],27:[function(require,module,exports){
"use strict";function splitter(s){return s.split(",").map(getClassName)}function getClassName(s){var t=s.trim();return"."===t[0]?t.substr(1):t}function getClassChain(s){function t(s){return Object.keys(s).forEach(function(e){n[e]||(n[e]=!0,o.push(e),t(s[e]))})}var n={},o=[];return t(s),o}var makeComposition=require("./composition").makeComposition,regex=/(.*?)(\s+?)(extends\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;module.exports=function(s,t){function n(s,t){var n=getClassName(t[1]),o=t[3],e=t[4],i=t.index+t[1].length+t[2].length,r=o.length+e.length;s.css=s.css.slice(0,i)+s.css.slice(i+r);var c=splitter(e);return c.forEach(function(t){s.compositions[n]||(s.compositions[n]={}),s.compositions[t]||(s.compositions[t]={}),s.compositions[n][t]=s.compositions[t]}),s}for(var o,e=[];o=regex.exec(s);)e.unshift(o);var i=e.reduce(n,{css:s,compositions:{}}),r=Object.keys(i.compositions).reduce(function(s,n){var o=i.compositions[n],e=getClassChain(o);if(e.length){var r=[n].concat(e),c=r.map(function(s){return t[s]?t[s]:s});s[n]=makeComposition(r,c)}return s},{});return{css:i.css,extensions:r}};


},{"./composition":25}],28:[function(require,module,exports){
"use strict";module.exports=Symbol("css");


},{}],29:[function(require,module,exports){
"use strict";var cssKey=require("./css-symbol");module.exports=function(s){return s[cssKey]};


},{"./css-symbol":28}],30:[function(require,module,exports){
"use strict";module.exports=function(r){for(var t=5381,e=r.length;e;)t=33*t^r.charCodeAt(--e);return t>>>0};


},{}],31:[function(require,module,exports){
"use strict";var encode=require("./base62-encode"),hash=require("./hash-string");module.exports=function(e){var r=encode(hash(e));return function(e){return e+"_"+r}};


},{"./base62-encode":24,"./hash-string":30}],32:[function(require,module,exports){
"use strict";function scopify(e,s){function r(e,r){function n(c,n,t){var f=s[t]?t:a(t);return e[r][f]=t,n+f}var t=c[r];return{css:e.css.replace(t,n),keyframes:e.keyframes,classes:e.classes}}var a=fileScoper(e),c={classes:classRegex,keyframes:keyframesRegex},n=Object.keys(c).reduce(r,{css:e,keyframes:{},classes:{}});return replaceAnimations(n)}function replaceAnimations(e){var s=Object.keys(e.keyframes).reduce(function(s,r){return s[e.keyframes[r]]=r,s},{}),r=Object.keys(s);if(r.length){var a="((?:animation|animation-name)\\s*:[^};]*)("+r.join("|")+")",c=new RegExp(a,"g"),n=e.css.replace(c,function(e,r,a){return r+s[a]});return{css:n,keyframes:e.keyframes,classes:e.classes}}return e}var fileScoper=require("./scoped-name"),classRegex=/(\.)(?!\d)([^\s\.,{\[>+~#:]*)(?![^{]*})/g,keyframesRegex=/(@\S*keyframes\s*)([^{\s]*)/g;module.exports=scopify;


},{"./scoped-name":31}],33:[function(require,module,exports){
function buildElems(a){var e={};return a.name&&(e[a.name]=a),walk(a,function(a){a.name&&(e[a.name]=a)}),e}function getFormData(a){var e=buildElems(a);return FormData(e)}var walk=require("dom-walk"),FormData=require("./index.js");module.exports=getFormData;


},{"./index.js":34,"dom-walk":35}],34:[function(require,module,exports){
function FormData(e){return Object.keys(e).reduce(function(t,r){var n=e[r];return t[r]=valueOfElement(n),t},{})}function valueOfElement(e){if("function"==typeof e)return e();if(containsRadio(e)){var t=toList(e),r=t.filter(function(e){return e.checked})[0]||null;return r?r.value:null}return Array.isArray(e)?e.map(valueOfElement).filter(filterNull):void 0===e.tagName&&void 0===e.nodeType?FormData(e):"INPUT"===e.tagName&&isChecked(e)?e.hasAttribute("value")?e.checked?e.value:null:e.checked:"INPUT"===e.tagName?e.value:"TEXTAREA"===e.tagName?e.value:"SELECT"===e.tagName?e.value:void 0}function isChecked(e){return"checkbox"===e.type||"radio"===e.type}function containsRadio(e){if(e.tagName||e.nodeType)return!1;var t=toList(e);return t.some(function(e){return"INPUT"===e.tagName&&"radio"===e.type})}function toList(e){return Array.isArray(e)?e:Object.keys(e).map(prop,e)}function prop(e){return this[e]}function filterNull(e){return null!==e}module.exports=FormData;


},{}],35:[function(require,module,exports){
function iterativelyWalk(l,e){"length"in l||(l=[l]),l=slice.call(l);for(;l.length;){var i=l.shift(),t=e(i);if(t)return t;i.childNodes&&i.childNodes.length&&(l=slice.call(i.childNodes).concat(l))}}var slice=Array.prototype.slice;module.exports=iterativelyWalk;


},{}],36:[function(require,module,exports){
module.exports=function(e,r){var l=r||"/";return 0===e.length?l:(e=e.replace("#",""),e=e.replace(/\/$/,""),0!=e.indexOf("/")&&(e="/"+e),"/"==l?e:e.replace(l,""))};


},{}],37:[function(require,module,exports){
function hyperstyles(r,t){if("function"!=typeof r)throw new Error("Expected a hyperscript-compatible function as the first argument.");return"object"!=typeof t?function(t){if("object"!=typeof t)throw new Error("Expected a CSS Modules-compatible styles object as the first argument.");return wrap(r,t)}:wrap(r,t)}function wrap(r,t){return function(){return r.apply(null,transform(t,slice.call(arguments)))}}var transform=require("./transform"),slice=Array.prototype.slice;module.exports=hyperstyles;


},{"./transform":38}],38:[function(require,module,exports){
function isNotProps(t){return null==t||isString(t)||"number"==typeof t||"function"==typeof t||isArray(t)||isObject(t)&&(t.hasOwnProperty("$$typeof")||t.hasOwnProperty("type")&&t.hasOwnProperty("version")||"undefined"!=typeof Node&&t instanceof Node)}function transform(t,r){var e,n;for(e=[],isString(r[0])&&(n=r[0].match(CLASS_SELECTOR),n&&(e.push.apply(e,n.map(toClass)),r[0]=r[0].replace(CLASS_SELECTOR,""))),isObject(r[1])&&r[1].styleName&&(e.push.apply(e,r[1].styleName.split(" ")),delete r[1].styleName),e.length&&(isNotProps(r[1])&&(null==r[1]?null==r[2]?r.splice(1,0,{}):r[1]={}:r.splice(1,0,{})),r[1].className=e.reduce(function(r,e){if(!t[e])throw new Error('"'+e+"\" doesn't exist");return r+=(r.length?" ":"")+t[e]},r[1].className||""));r.length&&void 0===r[r.length-1];)r.pop();return r}var toString=Object.prototype.toString,isString=function(t){return"string"==typeof t},isArray=Array.isArray||function(t){return"[object Array]"==toString.call(t)},isObject=function(t){return null!=t&&"object"==typeof t&&!isArray(t)},toClass=function(t){return t.substring(1,t.length)},CLASS_SELECTOR=/\.([a-zA-Z0-9\u007F-\uFFFF_:-]+)/g;module.exports=transform;


},{}],39:[function(require,module,exports){
function quot(T){return T===ATTR_VALUE_SQ||T===ATTR_VALUE_DQ}function has(T,A){return hasOwn.call(T,A)}function selfClosing(T){return closeRE.test(T)}var VAR=0,TEXT=1,OPEN=2,CLOSE=3,ATTR=4,ATTR_KEY=5,ATTR_KEY_W=6,ATTR_VALUE_W=7,ATTR_VALUE=8,ATTR_VALUE_SQ=9,ATTR_VALUE_DQ=10;module.exports=function(T,A){function e(T){return"function"==typeof T?T:"string"==typeof T?T:T&&"object"==typeof T?T:t("",T)}A||(A={});var t=A.concat||function(T,A){return String(T)+String(A)};return function(A){function E(T){var A=[];_===ATTR_VALUE_W&&(_=ATTR);for(var e=0;e<T.length;e++){var t=T.charAt(e);_===TEXT&&"<"===t?(n.length&&A.push([TEXT,n]),n="",_=OPEN):">"!==t||quot(_)?_===TEXT?n+=t:_===OPEN&&/\s/.test(t)?(A.push([OPEN,n]),n="",_=ATTR):_===OPEN?n+=t:_===ATTR&&/[\w-]/.test(t)?(_=ATTR_KEY,n=t):_===ATTR_KEY&&/\s/.test(t)?(A.push([ATTR_KEY,n]),n="",_=ATTR_KEY_W):_===ATTR_KEY&&"="===t?(A.push([ATTR_KEY,n]),n="",_=ATTR_VALUE_W):_===ATTR_KEY?n+=t:_===ATTR_KEY_W&&"="===t?_=ATTR_VALUE_W:_!==ATTR_KEY_W||/\s/.test(t)?_===ATTR_VALUE_W&&'"'===t?_=ATTR_VALUE_DQ:_===ATTR_VALUE_W&&"'"===t?_=ATTR_VALUE_SQ:_===ATTR_VALUE_DQ&&'"'===t?(A.push([ATTR_VALUE,n]),n="",_=ATTR):_===ATTR_VALUE_SQ&&"'"===t?(A.push([ATTR_VALUE,n]),n="",_=ATTR):_!==ATTR_VALUE_W||/\s/.test(t)?_===ATTR_VALUE&&/\s/.test(t)?(A.push([ATTR_VALUE,n]),n="",_=ATTR):(_===ATTR_VALUE||_===ATTR_VALUE_SQ||_===ATTR_VALUE_DQ)&&(n+=t):(_=ATTR_VALUE,e--):(_=ATTR,e--):(_===OPEN?A.push([OPEN,n]):_===ATTR_KEY?A.push([ATTR_KEY,n]):_===ATTR_VALUE&&n.length&&A.push([ATTR_VALUE,n]),A.push([CLOSE]),n="",_=TEXT)}return _===TEXT&&n.length?(A.push([TEXT,n]),n=""):_===ATTR_VALUE&&n.length?(A.push([ATTR_VALUE,n]),n=""):_===ATTR_VALUE_DQ&&n.length?(A.push([ATTR_VALUE,n]),n=""):_===ATTR_VALUE_SQ&&n.length?(A.push([ATTR_VALUE,n]),n=""):_===ATTR_KEY&&(A.push([ATTR_KEY,n]),n=""),A}for(var _=TEXT,n="",R=arguments.length,s=[],r=0;r<A.length;r++)if(R-1>r){var h=arguments[r+1],l=E(A[r]),u=_;u===ATTR_VALUE_DQ&&(u=ATTR_VALUE),u===ATTR_VALUE_SQ&&(u=ATTR_VALUE),u===ATTR_VALUE_W&&(u=ATTR_VALUE),u===ATTR&&(u=ATTR_KEY),l.push([VAR,u,h]),s.push.apply(s,l)}else s.push.apply(s,E(A[r]));for(var o=[null,{},[]],p=[[o,-1]],r=0;r<s.length;r++){var V=p[p.length-1][0],l=s[r],a=l[0];if(a===OPEN&&/^\//.test(l[1])){var i=p[p.length-1][1];p.length>1&&(p.pop(),p[p.length-1][0][2][i]=T(V[0],V[1],V[2].length?V[2]:void 0))}else if(a===OPEN){var L=[l[1],{},[]];V[2].push(L),p.push([L,V[2].length-1])}else if(a===ATTR_KEY||a===VAR&&l[1]===ATTR_KEY){for(var f,U="";r<s.length;r++)if(s[r][0]===ATTR_KEY)U=t(U,s[r][1]);else{if(s[r][0]!==VAR||s[r][1]!==ATTR_KEY)break;if("object"!=typeof s[r][2]||U)U=t(U,s[r][2]);else for(f in s[r][2])s[r][2].hasOwnProperty(f)&&!V[1][f]&&(V[1][f]=s[r][2][f])}for(;r<s.length;r++)if(s[r][0]===ATTR_VALUE)V[1][U]?V[1][U]=t(V[1][U],s[r][1]):V[1][U]=e(s[r][1]);else{if(s[r][0]!==VAR||s[r][1]!==ATTR_VALUE){r--;break}V[1][U]?V[1][U]=t(V[1][U],s[r][2]):V[1][U]=e(s[r][2])}}else if(a===ATTR_KEY)V[1][l[1]]=!0;else if(a===VAR&&l[1]===ATTR_KEY)V[1][l[2]]=!0;else if(a===CLOSE){if(selfClosing(V[0])&&p.length){var i=p[p.length-1][1];p.pop(),p[p.length-1][0][2][i]=T(V[0],V[1],V[2].length?V[2]:void 0)}}else if(a===VAR&&l[1]===TEXT)void 0===l[2]||null===l[2]?l[2]="":l[2]||(l[2]=t("",l[2])),Array.isArray(l[2][0])?V[2].push.apply(V[2],l[2]):V[2].push(l[2]);else{if(a!==TEXT)throw new Error("unhandled: "+a);V[2].push(l[1])}}if(o[2].length>1&&/^\s*$/.test(o[2][0])&&o[2].shift(),o[2].length>2||2===o[2].length&&/\S/.test(o[2][1]))throw new Error("multiple root elements must be wrapped in an enclosing tag");return o[2][0]}};var hasOwn=Object.prototype.hasOwnProperty,closeRE=RegExp("^("+["area","base","basefont","bgsound","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"].join("|")+")(?:[.#][a-zA-Z0-9-￿_:-]+)*$");


},{}],40:[function(require,module,exports){
var inserted={};module.exports=function(e,t){if(!inserted[e]){inserted[e]=!0;var n=document.createElement("style");n.setAttribute("type","text/css"),"textContent"in n?n.textContent=e:n.styleSheet.cssText=e;var s=document.getElementsByTagName("head")[0];t&&t.prepend?s.insertBefore(n,s.childNodes[0]):s.appendChild(n)}};


},{}],41:[function(require,module,exports){
function setNonEnumerable(e,t,r){Object.defineProperty(e,t,{value:r,writable:!0,configurable:!0,enumerable:!1})}function ObservStruct(e){var t=Object.keys(e),r={},n=NO_TRANSACTION,o=NO_TRANSACTION;t.forEach(function(t){if(blackList.hasOwnProperty(t))throw new Error("cannot create an observ-struct with a key named '"+t+"'.\n"+blackList[t]);var n=e[t];r[t]="function"==typeof n?n():n});var s=Observ(r);t.forEach(function(t){var r=e[t];s[t]=r,"function"==typeof r&&r(function(e){if(o!==e){var r=extend(s());r[t]=e;var i={};i[t]=e&&e._diff?e._diff:e,setNonEnumerable(r,"_diff",i),n=r,s.set(r),n=NO_TRANSACTION}})});var i=s.set;return s.set=function(e){if(n===e)return i(e);var t=extend(e);setNonEnumerable(t,"_diff",e),i(t)},s(function(r){n!==r&&t.forEach(function(t){var n=e[t],s=r[t];"function"==typeof n&&n()!==s&&(o=s,n.set(r[t]),o=NO_TRANSACTION)})}),s._type="observ-struct",s._version="5",s}var Observ=require("observ"),extend=require("xtend"),blackList={length:"Clashes with `Function.prototype.length`.\n",name:"Clashes with `Function.prototype.name`.\n",_diff:"_diff is reserved key of observ-struct.\n",_type:"_type is reserved key of observ-struct.\n",_version:"_version is reserved key of observ-struct.\n"},NO_TRANSACTION={};module.exports=ObservStruct;


},{"observ":45,"xtend":42}],42:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var n=arguments[e];for(var t in n)n.hasOwnProperty(t)&&(r[t]=n[t])}return r}module.exports=extend;


},{}],43:[function(require,module,exports){
function ObservVarhash(e,r){function t(e,t){if(checkKey(e),void 0===t)throw new Error("cannot varhash.put(key, undefined).");var n=isFn(t)?t:r(t,e),i=extend(this());return i[e]=isFn(n)?n():n,isFn(this._removeListeners[e])&&this._removeListeners[e](),this._removeListeners[e]=isFn(n)?n(s(this,e)):null,setNonEnumerable(i,"_diff",diff(e,i[e])),this[e]=n,o=i,u(i),o=NO_TRANSACTION,this}function n(e){var r=extend(this());return isFn(this._removeListeners[e])&&this._removeListeners[e](),delete this._removeListeners[e],delete r[e],delete this[e],setNonEnumerable(r,"_diff",diff(e,void 0)),u(r),this}function s(e,r){return function(t){if(a!==t){var n=extend(e());n[r]=t,setNonEnumerable(n,"_diff",diff(r,t)),o=n,e.set(n),o=NO_TRANSACTION}}}r=r||function(e){return e};var i={},o=NO_TRANSACTION,a=NO_TRANSACTION,f=Observ(i);setNonEnumerable(f,"_removeListeners",{}),setNonEnumerable(f,"get",get.bind(f)),setNonEnumerable(f,"put",t.bind(f)),setNonEnumerable(f,"delete",n.bind(f));for(var v in e)f[v]=isFn(e[v])?e[v]:r(e[v],v),isFn(f[v])&&(f._removeListeners[v]=f[v](s(f,v)));var u=f.set;f.set=function(e){if(o===e)return u(e);var r=extend(e);setNonEnumerable(r,"_diff",e),u(r)},setNonEnumerable(f,"set",f.set);var h={};for(v in e){var d=f[v];checkKey(v),h[v]=isFn(d)?d():d}return f.set(h),f(function(r){if(o!==r)for(var t in e){var n=e[t],s=r[t];isFn(n)&&n()!==r[t]&&(a=s,n.set(r[t]),a=NO_TRANSACTION)}}),f}function get(e){return this[e]}function diff(e,r){var t={};return t[e]=r&&r._diff?r._diff:r,t}function isFn(e){return"function"==typeof e}function setNonEnumerable(e,r,t){Object.defineProperty(e,r,{value:t,writable:!0,configurable:!0,enumerable:!1})}function checkKey(e){if(blacklist[e])throw new Error("cannot create an observ-varhash with key `"+e+"`. "+blacklist[e])}var Observ=require("observ"),extend=require("xtend"),NO_TRANSACTION={};module.exports=ObservVarhash;var blacklist={name:"Clashes with `Function.prototype.name`.",get:"get is a reserved key of observ-varhash method",put:"put is a reserved key of observ-varhash method","delete":"delete is a reserved key of observ-varhash method",_diff:"_diff is a reserved key of observ-varhash method",_removeListeners:"_removeListeners is a reserved key of observ-varhash"};


},{"observ":45,"xtend":44}],44:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var n=arguments[e];for(var t in n)n.hasOwnProperty(t)&&(r[t]=n[t])}return r}module.exports=extend;


},{}],45:[function(require,module,exports){
function Observable(n){function e(e){return e?(u.push(e),function(){u.splice(u.indexOf(e),1)}):n}var u=[];return n=void 0===n?null:n,e.set=function(e){n=e,u.forEach(function(n){n(e)})},e}module.exports=Observable;


},{}],46:[function(require,module,exports){
function match(e){return assert.equal(typeof e,"string"),e.trim().replace(/[\?|#].*$/,"").replace(/^(?:https?\:)\/\//,"").replace(/^(?:[\w+(?:-\w+)+.])+(?:[\:0-9]{4,5})?/,"").replace(/\/$/,"")}const assert=require("assert");module.exports=match;


},{"assert":13}],47:[function(require,module,exports){
function applyProperties(t,e,r){for(var o in e){var i=e[o];void 0===i?removeProperty(t,o,r):isSoftSetHook(i)?(removeProperty(t,o,i,r),t[o]=i.value):isObject(i)?patchObject(t,e,r,o,i):t[o]=i}}function removeProperty(t,e,r){if(r){var o=r[e];if("attributes"===e)for(var i in o)t.removeAttribute(i);else if("style"===e)for(var v in o)t.style[v]="";else"string"==typeof o?t[e]="":t[e]=null}}function patchObject(t,e,r,o,i){var v=r?r[o]:void 0;if("attributes"!==o){if(v&&isObject(v)&&getPrototype(v)!==getPrototype(i))return void(t[o]=i);isObject(t[o])||(t[o]={});var s="style"===o?"":void 0;for(var p in i){var f=i[p];t[o][p]=void 0===f?s:f}}else for(var a in i){var n=i[a];void 0===n?t.removeAttribute(a):t.setAttribute(a,n)}}function getPrototype(t){return Object.getPrototypeOf?Object.getPrototypeOf(t):t.__proto__||t.constructor.prototype}var isObject=require("./isObject"),isSoftSetHook=require("./isSoftSetHook");module.exports=applyProperties;


},{"./isObject":51,"./isSoftSetHook":52}],48:[function(require,module,exports){
function createElement(e){var r=document;if(isVText(e))return r.createTextNode(e.x);if(!isVNode(e))return null;var t=e.n?r.createElementNS(e.n,e.tn):r.createElement(e.tn),n=e.p;applyProperties(t,n);var i=e.c;if(i)for(var a=0;a<i.length;a++){var l=createElement(i[a]);l&&t.appendChild(l)}return t}var applyProperties=require("./applyProperties"),isVText=require("./isVText"),isVNode=require("./isVNode");module.exports=createElement;


},{"./applyProperties":47,"./isVNode":53,"./isVText":54}],49:[function(require,module,exports){
function domIndex(n,e,r,i){return r&&0!==r.length?(r.sort(ascending),recurse(n,e,r,i,0)):{}}function recurse(n,e,r,i,t){if(i=i||{},n){indexInRange(r,t,t)&&(i[t]=n);var u=e[0];if(u)for(var d=n.childNodes,o=0;o<u.length;o++){t+=1;var f=u[o]||noChild,a=t+(f[1]||0);indexInRange(r,t,a)&&recurse(d[o],f,r,i,t),t=a}}return i}function indexInRange(n,e,r){if(0===n.length)return!1;for(var i,t,u=0,d=n.length-1;d>=u;){if(i=(d+u)/2>>0,t=n[i],u===d)return t>=e&&r>=t;if(e>t)u=i+1;else{if(!(t>r))return!0;d=i-1}}return!1}function ascending(n,e){return n>e?1:-1}var noChild={};module.exports=domIndex;


},{}],50:[function(require,module,exports){
function patch(e,c){return patchRecursive(e,c)}var patchRecursive=require("./patchRecursive");module.exports=patch;


},{"./patchRecursive":56}],51:[function(require,module,exports){
"use strict";module.exports=function(t){return"object"==typeof t&&null!==t};


},{}],52:[function(require,module,exports){
function isSoftSetHook(o){return o&&"object"==typeof o&&"undefined"!=typeof o.value}module.exports=isSoftSetHook;


},{}],53:[function(require,module,exports){
function isVirtualNode(e){return e&&e.t===types.VirtualNode}module.exports=isVirtualNode;var types=require("./types");


},{"./types":57}],54:[function(require,module,exports){
function isVirtualText(e){return e&&e.t===types.VirtualTree}module.exports=isVirtualText;var types=require("./types");


},{"./types":57}],55:[function(require,module,exports){
function applyPatch(e,r){var t=e[0],n=e[1],a=e[2];switch(t){case patchTypes.REMOVE:return removeNode(r);case patchTypes.INSERT:return insertNode(r,n);case patchTypes.VTEXT:return stringPatch(r,n);case patchTypes.VNODE:return vNodePatch(r,n);case patchTypes.ORDER:return reorderChildren(r,n),r;case patchTypes.PROPS:return applyProperties(r,n,a.p),r;default:return r}}function removeNode(e){var r=e.parentNode;return r&&r.removeChild(e),null}function insertNode(e,r){var t=render(r);return e&&e.appendChild(t),e}function stringPatch(e,r){var t;if(3===e.nodeType)e.replaceData(0,e.length,r.x),t=e;else{var n=e.parentNode;t=render(r),n&&t!==e&&n.replaceChild(t,e)}return t}function vNodePatch(e,r){var t=e.parentNode,n=render(r);return t&&n!==e&&t.replaceChild(n,e),n}function reorderChildren(e,r){for(var t,n,a,p=e.childNodes,o={},c=0;c<r.removes.length;c++)n=r.removes[c],t=p[n.from],n.key&&(o[n.key]=t),e.removeChild(t);for(var s=p.length,i=0;i<r.inserts.length;i++)a=r.inserts[i],t=o[a.key],e.insertBefore(t,a.to>=s++?null:p[a.to])}var applyProperties=require("./applyProperties"),patchTypes=require("../patchTypes"),render=require("./createElement");module.exports=applyPatch;


},{"../patchTypes":58,"./applyProperties":47,"./createElement":48}],56:[function(require,module,exports){
function patchRecursive(r,e){var t=patchIndices(e);if(0===t.length)return r;for(var a=domIndex(r,e.a,t),n=0;n<t.length;n++){var c=t[n];r=applyPatch(r,a[c],e[c])}return r}function applyPatch(r,e,t){if(!e)return r;for(var a,n=0;n<t.length;n++)a=patchOp(t[n],e),e===r&&(r=a);return r}function patchIndices(r){var e=[];for(var t in r)"a"!==t&&e.push(Number(t));return e}var domIndex=require("./domIndex"),patchOp=require("./patchOp");module.exports=patchRecursive;


},{"./domIndex":49,"./patchOp":55}],57:[function(require,module,exports){
module.exports={VirtualTree:1,VirtualPatch:2,VirtualNode:3,SoftSetHook:4};


},{}],58:[function(require,module,exports){
module.exports={NONE:0,VTEXT:1,VNODE:2,WIDGET:3,PROPS:4,ORDER:5,INSERT:6,REMOVE:7,THUNK:8};


},{}],59:[function(require,module,exports){
function serializeCurrentNode(r){var e=r.children;if(!e)return null;for(var a=e.length,t=new Array(a),i=-1;++i<a;)t[i]=serializeCurrentNode(e[i]);return r.count?[t,r.count]:[t]}function serializeVirtualPatchOrPatches(r){if(Array.isArray(r)){for(var e=r.length,a=new Array(e),t=-1;++t<e;)a[t]=serializeVirtualPatch(r[t]);return a}return[serializeVirtualPatch(r)]}function serializeVirtualPatch(r){var e=r.type,a=[e,toJson(r.patch)];return e===patchTypes.PROPS&&a.push({p:r.vNode.properties}),a}var patchTypes=require("../patchTypes"),toJson=require("vdom-as-json/toJson");module.exports=function(r){var e=serializeCurrentNode(r.a),a={a:e};for(var t in r)"a"!==t&&(a[t]=serializeVirtualPatchOrPatches(r[t]));return a};


},{"../patchTypes":58,"vdom-as-json/toJson":62}],60:[function(require,module,exports){
"use strict";function arrayToJson(t){for(var o=t.length,e=-1,n=new Array(o);++e<o;)n[e]=toJson(t[e]);return n}function plainObjectToJson(t){var o={};for(var e in t){var n=t[e];o[e]="undefined"!=typeof n?toJson(n):n}return o}function virtualNodeToJson(t){var o={t:types.VirtualNode,tn:t.tagName};return Object.keys(t.properties).length&&(o.p=plainObjectToJson(t.properties)),t.children.length&&(o.c=arrayToJson(t.children)),t.key&&(o.k=t.key),t.namespace&&(o.n=t.namespace),o}function virtualTextToJson(t){return{t:types.VirtualTree,x:t.text}}function virtualPatchToJson(t){var o={t:types.VirtualPatch,pt:t.type};return t.vNode&&(o.v=toJson(t.vNode)),t.patch&&(o.p=toJson(t.patch)),o}function softSetHookToJson(t){return{t:types.SoftSetHook,value:t.value}}function objectToJson(t){return"patch"in t&&"number"==typeof t.type?virtualPatchToJson(t):"VirtualNode"===t.type?virtualNodeToJson(t):"VirtualText"===t.type?virtualTextToJson(t):t instanceof SoftSetHook?softSetHookToJson(t):plainObjectToJson(t)}function toJson(t){var o=typeof t;switch(o){case"string":case"boolean":case"number":return t}return Array.isArray(t)?arrayToJson(t):t?objectToJson(t):null}var types=require("./types"),SoftSetHook=require("virtual-dom/virtual-hyperscript/hooks/soft-set-hook");module.exports=toJson;


},{"./types":61,"virtual-dom/virtual-hyperscript/hooks/soft-set-hook":84}],61:[function(require,module,exports){
module.exports={VirtualTree:1,VirtualPatch:2,VirtualNode:3,SoftSetHook:4};


},{}],62:[function(require,module,exports){
"use strict";module.exports=require("./lib/toJson");


},{"./lib/toJson":60}],63:[function(require,module,exports){
module.exports=require("./lib/patch");


},{"./lib/patch":50}],64:[function(require,module,exports){
module.exports=require("./lib/serialize");


},{"./lib/serialize":59}],65:[function(require,module,exports){
var createElement=require("./vdom/create-element.js");module.exports=createElement;


},{"./vdom/create-element.js":78}],66:[function(require,module,exports){
var diff=require("./vtree/diff.js");module.exports=diff;


},{"./vtree/diff.js":98}],67:[function(require,module,exports){
var h=require("./virtual-hyperscript/index.js");module.exports=h;


},{"./virtual-hyperscript/index.js":85}],68:[function(require,module,exports){
var diff=require("./diff.js"),patch=require("./patch.js"),h=require("./h.js"),create=require("./create-element.js"),VNode=require("./vnode/vnode.js"),VText=require("./vnode/vtext.js");module.exports={diff:diff,patch:patch,h:h,create:create,VNode:VNode,VText:VText};


},{"./create-element.js":65,"./diff.js":66,"./h.js":67,"./patch.js":76,"./vnode/vnode.js":94,"./vnode/vtext.js":96}],69:[function(require,module,exports){
module.exports=function(e){var t,n=String.prototype.split,l=/()??/.exec("")[1]===e;return t=function(t,r,i){if("[object RegExp]"!==Object.prototype.toString.call(r))return n.call(t,r,i);var s,g,o,p,c=[],u=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.extended?"x":"")+(r.sticky?"y":""),x=0,r=new RegExp(r.source,u+"g");for(t+="",l||(s=new RegExp("^"+r.source+"$(?!\\s)",u)),i=i===e?-1>>>0:i>>>0;(g=r.exec(t))&&(o=g.index+g[0].length,!(o>x&&(c.push(t.slice(x,g.index)),!l&&g.length>1&&g[0].replace(s,function(){for(var t=1;t<arguments.length-2;t++)arguments[t]===e&&(g[t]=e)}),g.length>1&&g.index<t.length&&Array.prototype.push.apply(c,g.slice(1)),p=g[0].length,x=o,c.length>=i)));)r.lastIndex===g.index&&r.lastIndex++;return x===t.length?(p||!r.test(""))&&c.push(""):c.push(t.slice(x)),c.length>i?c.slice(0,i):c}}();


},{}],70:[function(require,module,exports){
"use strict";function EvStore(e){var r=e[hashKey];return r||(r=e[hashKey]={}),r}var OneVersionConstraint=require("individual/one-version"),MY_VERSION="7";OneVersionConstraint("ev-store",MY_VERSION);var hashKey="__EV_STORE_KEY@"+MY_VERSION;module.exports=EvStore;


},{"individual/one-version":72}],71:[function(require,module,exports){
(function (global){
"use strict";function Individual(o,n){return o in root?root[o]:(root[o]=n,n)}var root="undefined"!=typeof window?window:"undefined"!=typeof global?global:{};module.exports=Individual;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],72:[function(require,module,exports){
"use strict";function OneVersion(n,e,i){var r="__INDIVIDUAL_ONE_VERSION_"+n,o=r+"_ENFORCE_SINGLETON",a=Individual(o,e);if(a!==e)throw new Error("Can only have one copy of "+n+".\nYou already have version "+a+" installed.\nThis means you cannot install version "+e);return Individual(r,i)}var Individual=require("./index.js");module.exports=OneVersion;


},{"./index.js":71}],73:[function(require,module,exports){
(function (global){
var topLevel="undefined"!=typeof global?global:"undefined"!=typeof window?window:{},minDoc=require("min-document");if("undefined"!=typeof document)module.exports=document;else{var doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"];doccy||(doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"]=minDoc),module.exports=doccy}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":14}],74:[function(require,module,exports){
"use strict";module.exports=function(t){return"object"==typeof t&&null!==t};


},{}],75:[function(require,module,exports){
function isArray(r){return"[object Array]"===toString.call(r)}var nativeIsArray=Array.isArray,toString=Object.prototype.toString;module.exports=nativeIsArray||isArray;


},{}],76:[function(require,module,exports){
var patch=require("./vdom/patch.js");module.exports=patch;


},{"./vdom/patch.js":81}],77:[function(require,module,exports){
function applyProperties(o,t,e){for(var r in t){var i=t[r];void 0===i?removeProperty(o,r,i,e):isHook(i)?(removeProperty(o,r,i,e),i.hook&&i.hook(o,r,e?e[r]:void 0)):isObject(i)?patchObject(o,t,e,r,i):o[r]=i}}function removeProperty(o,t,e,r){if(r){var i=r[t];if(isHook(i))i.unhook&&i.unhook(o,t,e);else if("attributes"===t)for(var v in i)o.removeAttribute(v);else if("style"===t)for(var s in i)o.style[s]="";else"string"==typeof i?o[t]="":o[t]=null}}function patchObject(o,t,e,r,i){var v=e?e[r]:void 0;if("attributes"!==r){if(v&&isObject(v)&&getPrototype(v)!==getPrototype(i))return void(o[r]=i);isObject(o[r])||(o[r]={});var s="style"===r?"":void 0;for(var n in i){var p=i[n];o[r][n]=void 0===p?s:p}}else for(var c in i){var u=i[c];void 0===u?o.removeAttribute(c):o.setAttribute(c,u)}}function getPrototype(o){return Object.getPrototypeOf?Object.getPrototypeOf(o):o.__proto__?o.__proto__:o.constructor?o.constructor.prototype:void 0}var isObject=require("is-object"),isHook=require("../vnode/is-vhook.js");module.exports=applyProperties;


},{"../vnode/is-vhook.js":89,"is-object":74}],78:[function(require,module,exports){
function createElement(e,r){var t=r?r.document||document:document,n=r?r.warn:null;if(e=handleThunk(e).a,isWidget(e))return e.init();if(isVText(e))return t.createTextNode(e.text);if(!isVNode(e))return n&&n("Item is not a valid virtual dom node",e),null;var i=null===e.namespace?t.createElement(e.tagName):t.createElementNS(e.namespace,e.tagName),a=e.properties;applyProperties(i,a);for(var d=e.children,l=0;l<d.length;l++){var o=createElement(d[l],r);o&&i.appendChild(o)}return i}var document=require("global/document"),applyProperties=require("./apply-properties"),isVNode=require("../vnode/is-vnode.js"),isVText=require("../vnode/is-vtext.js"),isWidget=require("../vnode/is-widget.js"),handleThunk=require("../vnode/handle-thunk.js");module.exports=createElement;


},{"../vnode/handle-thunk.js":87,"../vnode/is-vnode.js":90,"../vnode/is-vtext.js":91,"../vnode/is-widget.js":92,"./apply-properties":77,"global/document":73}],79:[function(require,module,exports){
function domIndex(n,e,r,i){return r&&0!==r.length?(r.sort(ascending),recurse(n,e,r,i,0)):{}}function recurse(n,e,r,i,t){if(i=i||{},n){indexInRange(r,t,t)&&(i[t]=n);var d=e.children;if(d)for(var u=n.childNodes,o=0;o<e.children.length;o++){t+=1;var c=d[o]||noChild,f=t+(c.count||0);indexInRange(r,t,f)&&recurse(u[o],c,r,i,t),t=f}}return i}function indexInRange(n,e,r){if(0===n.length)return!1;for(var i,t,d=0,u=n.length-1;u>=d;){if(i=(u+d)/2>>0,t=n[i],d===u)return t>=e&&r>=t;if(e>t)d=i+1;else{if(!(t>r))return!0;u=i-1}}return!1}function ascending(n,e){return n>e?1:-1}var noChild={};module.exports=domIndex;


},{}],80:[function(require,module,exports){
function applyPatch(e,r,t){var a=e.type,n=e.vNode,o=e.patch;switch(a){case VPatch.REMOVE:return removeNode(r,n);case VPatch.INSERT:return insertNode(r,o,t);case VPatch.VTEXT:return stringPatch(r,n,o,t);case VPatch.WIDGET:return widgetPatch(r,n,o,t);case VPatch.VNODE:return vNodePatch(r,n,o,t);case VPatch.ORDER:return reorderChildren(r,o),r;case VPatch.PROPS:return applyProperties(r,o,n.properties),r;case VPatch.THUNK:return replaceRoot(r,t.patch(r,o,t));default:return r}}function removeNode(e,r){var t=e.parentNode;return t&&t.removeChild(e),destroyWidget(e,r),null}function insertNode(e,r,t){var a=t.render(r,t);return e&&e.appendChild(a),e}function stringPatch(e,r,t,a){var n;if(3===e.nodeType)e.replaceData(0,e.length,t.text),n=e;else{var o=e.parentNode;n=a.render(t,a),o&&n!==e&&o.replaceChild(n,e)}return n}function widgetPatch(e,r,t,a){var n,o=updateWidget(r,t);n=o?t.update(r,e)||e:a.render(t,a);var d=e.parentNode;return d&&n!==e&&d.replaceChild(n,e),o||destroyWidget(e,r),n}function vNodePatch(e,r,t,a){var n=e.parentNode,o=a.render(t,a);return n&&o!==e&&n.replaceChild(o,e),o}function destroyWidget(e,r){"function"==typeof r.destroy&&isWidget(r)&&r.destroy(e)}function reorderChildren(e,r){for(var t,a,n,o=e.childNodes,d={},i=0;i<r.removes.length;i++)a=r.removes[i],t=o[a.from],a.key&&(d[a.key]=t),e.removeChild(t);for(var c=o.length,p=0;p<r.inserts.length;p++)n=r.inserts[p],t=d[n.key],e.insertBefore(t,n.to>=c++?null:o[n.to])}function replaceRoot(e,r){return e&&r&&e!==r&&e.parentNode&&e.parentNode.replaceChild(r,e),r}var applyProperties=require("./apply-properties"),isWidget=require("../vnode/is-widget.js"),VPatch=require("../vnode/vpatch.js"),updateWidget=require("./update-widget");module.exports=applyPatch;


},{"../vnode/is-widget.js":92,"../vnode/vpatch.js":95,"./apply-properties":77,"./update-widget":82}],81:[function(require,module,exports){
function patch(r,e,t){return t=t||{},t.patch=t.patch&&t.patch!==patch?t.patch:patchRecursive,t.render=t.render||render,t.patch(r,e,t)}function patchRecursive(r,e,t){var a=patchIndices(e);if(0===a.length)return r;var n=domIndex(r,e.a,a),c=r.ownerDocument;t.document||c===document||(t.document=c);for(var p=0;p<a.length;p++){var u=a[p];r=applyPatch(r,n[u],e[u],t)}return r}function applyPatch(r,e,t,a){if(!e)return r;var n;if(isArray(t))for(var c=0;c<t.length;c++)n=patchOp(t[c],e,a),e===r&&(r=n);else n=patchOp(t,e,a),e===r&&(r=n);return r}function patchIndices(r){var e=[];for(var t in r)"a"!==t&&e.push(Number(t));return e}var document=require("global/document"),isArray=require("x-is-array"),render=require("./create-element"),domIndex=require("./dom-index"),patchOp=require("./patch-op");module.exports=patch;


},{"./create-element":78,"./dom-index":79,"./patch-op":80,"global/document":73,"x-is-array":75}],82:[function(require,module,exports){
function updateWidget(i,e){return isWidget(i)&&isWidget(e)?"name"in i&&"name"in e?i.id===e.id:i.init===e.init:!1}var isWidget=require("../vnode/is-widget.js");module.exports=updateWidget;


},{"../vnode/is-widget.js":92}],83:[function(require,module,exports){
"use strict";function EvHook(o){return this instanceof EvHook?void(this.value=o):new EvHook(o)}var EvStore=require("ev-store");module.exports=EvHook,EvHook.prototype.hook=function(o,t){var e=EvStore(o),r=t.substr(3);e[r]=this.value},EvHook.prototype.unhook=function(o,t){var e=EvStore(o),r=t.substr(3);e[r]=void 0};


},{"ev-store":70}],84:[function(require,module,exports){
"use strict";function SoftSetHook(o){return this instanceof SoftSetHook?void(this.value=o):new SoftSetHook(o)}module.exports=SoftSetHook,SoftSetHook.prototype.hook=function(o,t){o[t]!==this.value&&(o[t]=this.value)};


},{}],85:[function(require,module,exports){
"use strict";function h(e,r,i){var t,n,o,s,a=[];return!i&&isChildren(r)&&(i=r,n={}),n=n||r||{},t=parseTag(e,n),n.hasOwnProperty("key")&&(o=n.key,n.key=void 0),n.hasOwnProperty("namespace")&&(s=n.namespace,n.namespace=void 0),"INPUT"!==t||s||!n.hasOwnProperty("value")||void 0===n.value||isHook(n.value)||(n.value=softSetHook(n.value)),transformProperties(n),void 0!==i&&null!==i&&addChild(i,a,t,n),new VNode(t,n,a,o,s)}function addChild(e,r,i,t){if("string"==typeof e)r.push(new VText(e));else if("number"==typeof e)r.push(new VText(String(e)));else if(isChild(e))r.push(e);else{if(!isArray(e)){if(null===e||void 0===e)return;throw UnexpectedVirtualElement({foreignObject:e,parentVnode:{tagName:i,properties:t}})}for(var n=0;n<e.length;n++)addChild(e[n],r,i,t)}}function transformProperties(e){for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];if(isHook(i))continue;"ev-"===r.substr(0,3)&&(e[r]=evHook(i))}}function isChild(e){return isVNode(e)||isVText(e)||isWidget(e)||isVThunk(e)}function isChildren(e){return"string"==typeof e||isArray(e)||isChild(e)}function UnexpectedVirtualElement(e){var r=new Error;return r.type="virtual-hyperscript.unexpected.virtual-element",r.message="Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / VWidget / string but:\ngot:\n"+errorString(e.foreignObject)+".\nThe parent vnode is:\n"+errorString(e.parentVnode),r.foreignObject=e.foreignObject,r.parentVnode=e.parentVnode,r}function errorString(e){try{return JSON.stringify(e,null,"    ")}catch(r){return String(e)}}var isArray=require("x-is-array"),VNode=require("../vnode/vnode.js"),VText=require("../vnode/vtext.js"),isVNode=require("../vnode/is-vnode"),isVText=require("../vnode/is-vtext"),isWidget=require("../vnode/is-widget"),isHook=require("../vnode/is-vhook"),isVThunk=require("../vnode/is-thunk"),parseTag=require("./parse-tag.js"),softSetHook=require("./hooks/soft-set-hook.js"),evHook=require("./hooks/ev-hook.js");module.exports=h;


},{"../vnode/is-thunk":88,"../vnode/is-vhook":89,"../vnode/is-vnode":90,"../vnode/is-vtext":91,"../vnode/is-widget":92,"../vnode/vnode.js":94,"../vnode/vtext.js":96,"./hooks/ev-hook.js":83,"./hooks/soft-set-hook.js":84,"./parse-tag.js":86,"x-is-array":75}],86:[function(require,module,exports){
"use strict";function parseTag(s,a){if(!s)return"DIV";var t=!a.hasOwnProperty("id"),e=split(s,classIdSplit),r=null;notClassId.test(e[1])&&(r="DIV");var l,n,i,p;for(p=0;p<e.length;p++)n=e[p],n&&(i=n.charAt(0),r?"."===i?(l=l||[],l.push(n.substring(1,n.length))):"#"===i&&t&&(a.id=n.substring(1,n.length)):r=n);return l&&(a.className&&l.push(a.className),a.className=l.join(" ")),a.namespace?r:r.toUpperCase()}var split=require("browser-split"),classIdSplit=/([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/,notClassId=/^\.|#/;module.exports=parseTag;


},{"browser-split":69}],87:[function(require,module,exports){
function handleThunk(e,n){var r=e,i=n;return isThunk(n)&&(i=renderThunk(n,e)),isThunk(e)&&(r=renderThunk(e,null)),{a:r,b:i}}function renderThunk(e,n){var r=e.vnode;if(r||(r=e.vnode=e.render(n)),!(isVNode(r)||isVText(r)||isWidget(r)))throw new Error("thunk did not return a valid node");return r}var isVNode=require("./is-vnode"),isVText=require("./is-vtext"),isWidget=require("./is-widget"),isThunk=require("./is-thunk");module.exports=handleThunk;


},{"./is-thunk":88,"./is-vnode":90,"./is-vtext":91,"./is-widget":92}],88:[function(require,module,exports){
function isThunk(n){return n&&"Thunk"===n.type}module.exports=isThunk;


},{}],89:[function(require,module,exports){
function isHook(o){return o&&("function"==typeof o.hook&&!o.hasOwnProperty("hook")||"function"==typeof o.unhook&&!o.hasOwnProperty("unhook"))}module.exports=isHook;


},{}],90:[function(require,module,exports){
function isVirtualNode(e){return e&&"VirtualNode"===e.type&&e.version===version}var version=require("./version");module.exports=isVirtualNode;


},{"./version":93}],91:[function(require,module,exports){
function isVirtualText(e){return e&&"VirtualText"===e.type&&e.version===version}var version=require("./version");module.exports=isVirtualText;


},{"./version":93}],92:[function(require,module,exports){
function isWidget(e){return e&&"Widget"===e.type}module.exports=isWidget;


},{}],93:[function(require,module,exports){
module.exports="2";


},{}],94:[function(require,module,exports){
function VirtualNode(e,i,o,s,r){this.tagName=e,this.properties=i||noProperties,this.children=o||noChildren,this.key=null!=s?String(s):void 0,this.namespace="string"==typeof r?r:null;var t,n=o&&o.length||0,h=0,a=!1,d=!1,u=!1;for(var k in i)if(i.hasOwnProperty(k)){var l=i[k];isVHook(l)&&l.unhook&&(t||(t={}),t[k]=l)}for(var p=0;n>p;p++){var v=o[p];isVNode(v)?(h+=v.count||0,!a&&v.hasWidgets&&(a=!0),!d&&v.hasThunks&&(d=!0),u||!v.hooks&&!v.descendantHooks||(u=!0)):!a&&isWidget(v)?"function"==typeof v.destroy&&(a=!0):!d&&isThunk(v)&&(d=!0)}this.count=n+h,this.hasWidgets=a,this.hasThunks=d,this.hooks=t,this.descendantHooks=u}var version=require("./version"),isVNode=require("./is-vnode"),isWidget=require("./is-widget"),isThunk=require("./is-thunk"),isVHook=require("./is-vhook");module.exports=VirtualNode;var noProperties={},noChildren=[];VirtualNode.prototype.version=version,VirtualNode.prototype.type="VirtualNode";


},{"./is-thunk":88,"./is-vhook":89,"./is-vnode":90,"./is-widget":92,"./version":93}],95:[function(require,module,exports){
function VirtualPatch(t,a,r){this.type=Number(t),this.vNode=a,this.patch=r}var version=require("./version");VirtualPatch.NONE=0,VirtualPatch.VTEXT=1,VirtualPatch.VNODE=2,VirtualPatch.WIDGET=3,VirtualPatch.PROPS=4,VirtualPatch.ORDER=5,VirtualPatch.INSERT=6,VirtualPatch.REMOVE=7,VirtualPatch.THUNK=8,module.exports=VirtualPatch,VirtualPatch.prototype.version=version,VirtualPatch.prototype.type="VirtualPatch";


},{"./version":93}],96:[function(require,module,exports){
function VirtualText(t){this.text=String(t)}var version=require("./version");module.exports=VirtualText,VirtualText.prototype.version=version,VirtualText.prototype.type="VirtualText";


},{"./version":93}],97:[function(require,module,exports){
function diffProps(o,t){var e;for(var r in o){r in t||(e=e||{},e[r]=void 0);var i=o[r],f=t[r];if(i!==f)if(isObject(i)&&isObject(f))if(getPrototype(f)!==getPrototype(i))e=e||{},e[r]=f;else if(isHook(f))e=e||{},e[r]=f;else{var s=diffProps(i,f);s&&(e=e||{},e[r]=s)}else e=e||{},e[r]=f}for(var n in t)n in o||(e=e||{},e[n]=t[n]);return e}function getPrototype(o){return Object.getPrototypeOf?Object.getPrototypeOf(o):o.__proto__?o.__proto__:o.constructor?o.constructor.prototype:void 0}var isObject=require("is-object"),isHook=require("../vnode/is-vhook");module.exports=diffProps;


},{"../vnode/is-vhook":89,"is-object":74}],98:[function(require,module,exports){
function diff(e,n){var t={a:e};return walk(e,n,t,0),t}function walk(e,n,t,r){if(e!==n){var h=t[r],a=!1;if(isThunk(e)||isThunk(n))thunks(e,n,t,r);else if(null==n)isWidget(e)||(clearState(e,t,r),h=t[r]),h=appendPatch(h,new VPatch(VPatch.REMOVE,e,n));else if(isVNode(n))if(isVNode(e))if(e.tagName===n.tagName&&e.namespace===n.namespace&&e.key===n.key){var i=diffProps(e.properties,n.properties);i&&(h=appendPatch(h,new VPatch(VPatch.PROPS,e,i))),h=diffChildren(e,n,t,h,r)}else h=appendPatch(h,new VPatch(VPatch.VNODE,e,n)),a=!0;else h=appendPatch(h,new VPatch(VPatch.VNODE,e,n)),a=!0;else isVText(n)?isVText(e)?e.text!==n.text&&(h=appendPatch(h,new VPatch(VPatch.VTEXT,e,n))):(h=appendPatch(h,new VPatch(VPatch.VTEXT,e,n)),a=!0):isWidget(n)&&(isWidget(e)||(a=!0),h=appendPatch(h,new VPatch(VPatch.WIDGET,e,n)));h&&(t[r]=h),a&&clearState(e,t,r)}}function diffChildren(e,n,t,r,h){for(var a=e.children,i=reorder(a,n.children),s=i.children,o=a.length,u=s.length,c=o>u?o:u,d=0;c>d;d++){var l=a[d],f=s[d];h+=1,l?walk(l,f,t,h):f&&(r=appendPatch(r,new VPatch(VPatch.INSERT,null,f))),isVNode(l)&&l.count&&(h+=l.count)}return i.moves&&(r=appendPatch(r,new VPatch(VPatch.ORDER,e,i.moves))),r}function clearState(e,n,t){unhook(e,n,t),destroyWidgets(e,n,t)}function destroyWidgets(e,n,t){if(isWidget(e))"function"==typeof e.destroy&&(n[t]=appendPatch(n[t],new VPatch(VPatch.REMOVE,e,null)));else if(isVNode(e)&&(e.hasWidgets||e.hasThunks))for(var r=e.children,h=r.length,a=0;h>a;a++){var i=r[a];t+=1,destroyWidgets(i,n,t),isVNode(i)&&i.count&&(t+=i.count)}else isThunk(e)&&thunks(e,null,n,t)}function thunks(e,n,t,r){var h=handleThunk(e,n),a=diff(h.a,h.b);hasPatches(a)&&(t[r]=new VPatch(VPatch.THUNK,null,a))}function hasPatches(e){for(var n in e)if("a"!==n)return!0;return!1}function unhook(e,n,t){if(isVNode(e)){if(e.hooks&&(n[t]=appendPatch(n[t],new VPatch(VPatch.PROPS,e,undefinedKeys(e.hooks)))),e.descendantHooks||e.hasThunks)for(var r=e.children,h=r.length,a=0;h>a;a++){var i=r[a];t+=1,unhook(i,n,t),isVNode(i)&&i.count&&(t+=i.count)}}else isThunk(e)&&thunks(e,null,n,t)}function undefinedKeys(e){var n={};for(var t in e)n[t]=void 0;return n}function reorder(e,n){var t=keyIndex(n),r=t.keys,h=t.free;if(h.length===n.length)return{children:n,moves:null};var a=keyIndex(e),i=a.keys,s=a.free;if(s.length===e.length)return{children:n,moves:null};for(var o=[],u=0,c=h.length,d=0,l=0;l<e.length;l++){var f,k=e[l];k.key?r.hasOwnProperty(k.key)?(f=r[k.key],o.push(n[f])):(f=l-d++,o.push(null)):c>u?(f=h[u++],o.push(n[f])):(f=l-d++,o.push(null))}for(var p=u>=h.length?n.length:h[u],P=0;P<n.length;P++){var v=n[P];v.key?i.hasOwnProperty(v.key)||o.push(v):P>=p&&o.push(v)}for(var y,V=o.slice(),g=0,T=[],m=[],w=0;w<n.length;){var N=n[w];for(y=V[g];null===y&&V.length;)T.push(remove(V,g,null)),y=V[g];y&&y.key===N.key?(g++,w++):N.key?(y&&y.key&&r[y.key]!==w+1?(T.push(remove(V,g,y.key)),y=V[g],y&&y.key===N.key?g++:m.push({key:N.key,to:w})):m.push({key:N.key,to:w}),w++):y&&y.key&&T.push(remove(V,g,y.key))}for(;g<V.length;)y=V[g],T.push(remove(V,g,y&&y.key));return T.length!==d||m.length?{children:o,moves:{removes:T,inserts:m}}:{children:o,moves:null}}function remove(e,n,t){return e.splice(n,1),{from:n,key:t}}function keyIndex(e){for(var n={},t=[],r=e.length,h=0;r>h;h++){var a=e[h];a.key?n[a.key]=h:t.push(h)}return{keys:n,free:t}}function appendPatch(e,n){return e?(isArray(e)?e.push(n):e=[e,n],e):n}var isArray=require("x-is-array"),VPatch=require("../vnode/vpatch"),isVNode=require("../vnode/is-vnode"),isVText=require("../vnode/is-vtext"),isWidget=require("../vnode/is-widget"),isThunk=require("../vnode/is-thunk"),handleThunk=require("../vnode/handle-thunk"),diffProps=require("./diff-props");module.exports=diff;


},{"../vnode/handle-thunk":87,"../vnode/is-thunk":88,"../vnode/is-vnode":90,"../vnode/is-vtext":91,"../vnode/is-widget":92,"../vnode/vpatch":95,"./diff-props":97,"x-is-array":75}],99:[function(require,module,exports){
function Wayfarer(e){function r(e,r){if(assert.equal(typeof e,"string"),assert.equal(typeof r,"function"),e=e||"/",r&&r._wayfarer&&r._trie)n.mount(e,r._trie.trie);else{const a=n.create(e);a.cb=r}return t}function t(e){assert.notEqual(e,void 0,"'route' must be defined");const r=sliced(arguments),t=n.match(e);if(t&&t.cb)return r[0]=t.params,t.cb.apply(null,r);const i=n.match(a);if(i&&i.cb)return r[0]=i.params,i.cb.apply(null,r);throw new Error("route '"+e+"' did not match")}if(!(this instanceof Wayfarer))return new Wayfarer(e);const a=(e||"").replace(/^\//,""),n=trie();return t._trie=n,t.emit=t,t.on=r,t._wayfarer=!0,t}const assert=require("assert"),sliced=require("sliced"),trie=require("./trie");module.exports=Wayfarer;


},{"./trie":101,"assert":13,"sliced":100}],100:[function(require,module,exports){
module.exports=function(r,t,e){var n=[],o=r.length;if(0===o)return n;var a=0>t?Math.max(0,t+o):t||0;for(void 0!==e&&(o=0>e?e+o:e);o-- >a;)n[o-a]=r[o];return n};


},{}],101:[function(require,module,exports){
function Trie(){return this instanceof Trie?void(this.trie={nodes:{}}):new Trie}const mutate=require("xtend/mutable"),assert=require("assert"),xtend=require("xtend");module.exports=Trie,Trie.prototype.create=function(e){assert.equal(typeof e,"string","route should be a string");const t=e.replace(/^\//,"").split("/");return function n(e,t,s){const o=s[e];if(void 0===o)return t;var r=null;return/^:/.test(o)?(t.nodes[":"]||(r={nodes:{}},t.nodes[":"]=r),t.name=o.replace(/^:/,"")):t.nodes[o]||(r={nodes:{}},t.nodes[o]=r),n(e+1,r,s)}(0,this.trie,t)},Trie.prototype.match=function(e){assert.equal(typeof e,"string","route should be a string");const t=e.replace(/^\//,"").split("/"),n={};var s=function o(e,s){if(void 0!==s){const r=t[e];return void 0===r?s:s.nodes[r]?o(e+1,s.nodes[r]):s.name?(n[s.name]=r,o(e+1,s.nodes[":"])):o(e+1)}}(0,this.trie);return s?(s=xtend(s),s.params=n,s):void 0},Trie.prototype.mount=function(e,t){assert.equal(typeof e,"string","route should be a string"),assert.equal(typeof t,"object","trie should be a object");const n=e.replace(/^\//,"").split("/");var s=null,o=null;if(1===n.length)o=n[0],s=this.create(o);else{const r=n.splice(0,n.length-1),i=r.join("/");o=n[0],s=this.create(i)}mutate(s.nodes,t.nodes),t.name&&(s.name=t.name),s.nodes[""]&&(Object.keys(s.nodes[""]).forEach(function(e){"nodes"!==e&&(s[e]=s.nodes[""][e])}),mutate(s.nodes,s.nodes[""].nodes),delete s.nodes[""].nodes)};


},{"assert":13,"xtend":102,"xtend/mutable":103}],102:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;


},{}],103:[function(require,module,exports){
function extend(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;


},{}],104:[function(require,module,exports){
"use strict";function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var _templateObject=_taggedTemplateLiteral(["\n        <footer.footer className=",'>\n            <span className="todo-count"></span>\n            <ul.filters>\n                <li><a className=',' href="/#/">All</a></li>\n                <li><a className=',' href="/#/active">Active</a></li>\n                <li><a className=',' href="/#/completed">Completed</a></li>\n            </ul>\n            <button className='," dataset=",">Clear completed</button>\n        </footer>\n    "],["\n        <footer.footer className=",'>\n            <span className="todo-count"></span>\n            <ul.filters>\n                <li><a className=',' href="/#/">All</a></li>\n                <li><a className=',' href="/#/active">Active</a></li>\n                <li><a className=',' href="/#/completed">Completed</a></li>\n            </ul>\n            <button className='," dataset=",">Clear completed</button>\n        </footer>\n    "]),_require=require("duet"),dom=_require.dom,modelFor=_require.modelFor;module.exports=function(e){var t=modelFor(e),l=Object.keys(e.todos),a=function(t){return e.filter===t?"selected":""},o=function(e){l.forEach(function(t){e.todos.get(t).completed&&e.todos["delete"](t)})},n=l.reduce(function(t,l){return e.todos[l].completed?t+1:t},0);return dom(_templateObject,l.length?"":"hidden",a("all"),a("active"),a("completed"),"clear-completed"+(n?"":" hidden"),{click:t.ev(o)})};


},{"duet":7}],105:[function(require,module,exports){
"use strict";function _taggedTemplateLiteral(e,o){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(o)}}))}var _templateObject=_taggedTemplateLiteral(['\n        <header.header>\n            <h1>todos</h1>\n            <input className="new-todo"\n                name="new-todo"\n                value=',"\n                dataset=",'\n                placeholder="What needs to be done?"\n                autofocus>\n        </header>\n    '],['\n        <header.header>\n            <h1>todos</h1>\n            <input className="new-todo"\n                name="new-todo"\n                value=',"\n                dataset=",'\n                placeholder="What needs to be done?"\n                autofocus>\n        </header>\n    ']),_require=require("duet"),dom=_require.dom,modelFor=_require.modelFor,_require2=require("../utils"),uuid=_require2.uuid,ENTER_KEY=13,onKeydown=function(e,o){var t;o.event.keyCode===ENTER_KEY&&(t=o.form["new-todo"].trim(),t&&(e.todos.put(uuid(),{title:t,completed:!1}),e.newTodo.set("")))};module.exports=function(e){var o=modelFor(e);return dom(_templateObject,e.newTodo,{keydown:o.ev(onKeydown),"default":"keydown"})};


},{"../utils":111,"duet":7}],106:[function(require,module,exports){
"use strict";function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var _templateObject=_taggedTemplateLiteral(["\n            <li className="," key=",'>\n                <div.view>\n                    <input.toggle type="checkbox"\n                        key=',"\n                        checked=","\n                        dataset=",">\n                    <label dataset=",">","</label>\n                    <button.destroy dataset=",'></button>\n                </div>\n                <input.edit\n                    name="title"\n                    value=',"\n                    dataset=",">\n            </li>\n        "],["\n            <li className="," key=",'>\n                <div.view>\n                    <input.toggle type="checkbox"\n                        key=',"\n                        checked=","\n                        dataset=",">\n                    <label dataset=",">","</label>\n                    <button.destroy dataset=",'></button>\n                </div>\n                <input.edit\n                    name="title"\n                    value=',"\n                    dataset=",">\n            </li>\n        "]),_templateObject2=_taggedTemplateLiteral(["\n        <section.main className=",'>\n            <input className="toggle-all" type="checkbox"\n                key=',"\n                checked=","\n                dataset=",'>\n            <label htmlFor="toggle-all">Mark all as complete</label>\n            <ul className="todo-list">\n                ',"\n            </ul>\n        </section>\n    "],["\n        <section.main className=",'>\n            <input className="toggle-all" type="checkbox"\n                key=',"\n                checked=","\n                dataset=",'>\n            <label htmlFor="toggle-all">Mark all as complete</label>\n            <ul className="todo-list">\n                ',"\n            </ul>\n        </section>\n    "]),_require=require("duet"),dom=_require.dom,modelFor=_require.modelFor,_require2=require("../utils"),extend=_require2.extend,_require3=require("duet/node_modules/virtual-dom"),create=_require3.create,ENTER_KEY=13,ESCAPE_KEY=27;module.exports=function(e){var t=modelFor(e),n=Object.keys(e.todos),o=function(t){var o=Object.keys(t().todos).reduce(function(t,n){return e.todos[n].completed?t:t+1},0);n.forEach(function(e){var n=t.todos.get(e);t.todos.put(e,extend(n,{completed:o>0}))})},l=function(e,t){var n=t.custom,o=e.todos.get(n);e.todos.put(n,extend(o,{completed:!o.completed}))},a=function(e,t){e.editing.set(t.custom)},d=function(e,t){e.todos["delete"](t.custom)},c=function(e,t){var n=t.custom,o=void 0,l=void 0;return t.event.keyCode===ESCAPE_KEY?void e.editing.set(null):void(t.event.keyCode===ENTER_KEY&&(o=t.form.title,l=e.todos.get(n),console.log(o),e.todos.put(n,extend(l,{title:o})),e.editing.set(null)))},i=function(e){e.editing.set(null)},r=n.reduce(function(t,n){return e.todos[n].completed?t:t+1},0),u=(n.length-r,n.filter(function(t){var n=e.todos[t];switch(e.filter){case"completed":return n.completed;case"active":return!n.completed;default:return!0}})),s=function(n){var o=e.todos[n];return dom(_templateObject,e.editing===n?"editing":"","todo--"+n,"toggle--"+n+(o.completed?"--checked":""),o.completed?"checked":"",{change:t.ev(l,n)},{dblclick:t.ev(a,n)},o.title,{click:t.ev(d,n)},o.title,{keydown:t.ev(c,n),focusout:t.ev(i),"default":"keydown"})};return dom(_templateObject2,n.length?"":"hidden","toggle-all"+(0===r?"--checked":""),0===r?"checked":"",{change:t.ev(o)},u.map(s))};


},{"../utils":111,"duet":7,"duet/node_modules/virtual-dom":68}],107:[function(require,module,exports){
"use strict";var _require=require("./utils"),store=_require.store,view=require("./view"),createModel=require("./model"),createRouter=require("./router");module.exports=function(e){store("todos-duet",function(r){var t=createModel(r),o=createRouter(t);e(view,t,o)})};


},{"./model":109,"./router":110,"./utils":111,"./view":112}],108:[function(require,module,exports){
"use strict";var duet=require("duet"),app=require("./app");duet(app,".todoapp",{isDebug:!0,isHashRouter:!0});


},{"./app":107,"duet":7}],109:[function(require,module,exports){
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_require=require("duet"),model=_require.model,value=_require.value,varhash=_require.varhash,_require2=require("./utils"),store=_require2.store,Todo=function(e,o){var t=e.title,r=e.completed;return{title:t,completed:r}};module.exports=function(e){var o=null!=e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))&&e||{},t=model({todos:varhash(o,Todo),newTodo:value(""),editing:value(null),filter:value("all")});return t.todos(function(e){store("todos-duet",e)}),t};


},{"./utils":111,"duet":7}],110:[function(require,module,exports){
"use strict";var _require=require("duet"),router=_require.router;module.exports=function(e){var r=function(r){e.filter.set(r)};return router().on("/",r.bind(null,"all")).on("/active",r.bind(null,"active")).on("/completed",r.bind(null,"completed"))};


},{"duet":7}],111:[function(require,module,exports){
"use strict";var _require=require("duet"),localStorage=_require.localStorage,uuid=function r(){for(var r="",e=0;32>e;e++){var t=16*Math.random()|0;(8===e||12===e||16===e||20===e)&&(r+="-"),r+=(12===e?4:16===e?3&t|8:t).toString(16)}return r},store=function(r,e){return"function"==typeof e?localStorage(r,function(r){e(r&&JSON.parse(r)||[])}):localStorage(r,JSON.stringify(e))},hasOwnProperty=Object.prototype.hasOwnProperty,extend=function(){for(var r=arguments.length,e=Array(r),t=0;r>t;t++)e[t]=arguments[t];for(var o={},n=0;n<e.length;n++){var a=e[n];for(var u in a)hasOwnProperty.call(a,u)&&(o[u]=a[u])}return o};module.exports={uuid:uuid,store:store,extend:extend};


},{"duet":7}],112:[function(require,module,exports){
"use strict";function _taggedTemplateLiteral(e,r){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}var _templateObject=_taggedTemplateLiteral(["\n        <div>\n            ","\n            ","\n            ","\n        </div>\n    "],["\n        <div>\n            ","\n            ","\n            ","\n        </div>\n    "]),_require=require("duet"),dom=_require.dom,Header=require("./Header"),Main=require("./Main"),Footer=require("./Footer");module.exports=function(e){return dom(_templateObject,Header(e),Main(e),Footer(e))};


},{"./Footer":104,"./Header":105,"./Main":106,"duet":7}]},{},[108]);
