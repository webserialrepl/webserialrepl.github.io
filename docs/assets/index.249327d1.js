var un=Object.defineProperty;var pn=(e,t,i)=>t in e?un(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var de=(e,t,i)=>(pn(e,typeof t!="symbol"?t+"":t,i),i);import{e as es,K as fn,a as gn}from"./monaco-editor.6e4fa376.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const m of c)if(m.type==="childList")for(const w of m.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&s(w)}).observe(document,{childList:!0,subtree:!0});function i(c){const m={};return c.integrity&&(m.integrity=c.integrity),c.referrerpolicy&&(m.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?m.credentials="include":c.crossorigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function s(c){if(c.ep)return;c.ep=!0;const m=i(c);fetch(c.href,m)}})();class mn{constructor(t,i){de(this,"device");de(this,"terminal");de(this,"selectedFile",null);de(this,"fileTreeDisplayed",!1);de(this,"files",[]);this.device=t,this.terminal=i}async initialize(){document.addEventListener("REPL_STATUS_CHANGED",async t=>{const i=document.getElementById("refreshFileList"),s=document.getElementById("saveFileButton"),c=document.getElementById("newFileButton"),m=document.getElementById("runCodeButton"),w=t,{status:r}=w.detail,n=[i,s,c,m];r==="REPL"?(console.log("<REPL> mode activated"),this.fileTreeDisplayed||await this.fileList(),n.forEach(u=>u.disabled=!1)):n.forEach(u=>u.disabled=!0)}),this.disableAllButtons()}disableAllButtons(){const t=document.getElementById("refreshFileList"),i=document.getElementById("saveFileButton"),s=document.getElementById("newFileButton"),c=document.getElementById("runCodeButton");t.disabled=!0,i.disabled=!0,s.disabled=!0,c.disabled=!0;const m=document.getElementById("file-tree");if(m)for(;m.firstChild;)m.removeChild(m.firstChild);this.fileTreeDisplayed=!1}async fileList(){const t=document.getElementById("file-tree");!t||(this.files=await this.device.getPyFileList(),t.innerHTML="",this.files.forEach(i=>{const s=document.createElement("sl-tree-item");s.textContent=i,s.value=i,t.appendChild(s)}),this.fileTreeDisplayed=!0)}fileExists(t){return this.files.includes(t)}async fileRead(t){try{const i=await this.device.readFile(t);return new TextDecoder("utf-8").decode(i)}catch(i){console.error(`Error reading file ${t}:`,i);try{this.terminal.logToTerminal(`Error reading file "${t}": ${String(i)}`,"error")}catch{}return null}}async fileWrite(t,i){const s=new TextEncoder().encode(i);try{await this.device.writeFile(t,s),console.log(`File saved: ${t}`),this.terminal.logToTerminal(`File saved successfully: ${t}`,"info")}catch(c){const m=c;console.error(`Error saving file ${this.selectedFile}:`,m),this.terminal.logToTerminal(`Error saving file "${this.selectedFile}": ${m.message}`,"error")}}}var Co={exports:{}};(function(e,t){(function(i,s){e.exports=s()})(self,()=>(()=>{var i={4567:function(w,r,n){var u=this&&this.__decorate||function(h,p,v,x){var E,y=arguments.length,k=y<3?p:x===null?x=Object.getOwnPropertyDescriptor(p,v):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")k=Reflect.decorate(h,p,v,x);else for(var T=h.length-1;T>=0;T--)(E=h[T])&&(k=(y<3?E(k):y>3?E(p,v,k):E(p,v))||k);return y>3&&k&&Object.defineProperty(p,v,k),k},g=this&&this.__param||function(h,p){return function(v,x){p(v,x,h)}};Object.defineProperty(r,"__esModule",{value:!0}),r.AccessibilityManager=void 0;const l=n(9042),f=n(6114),b=n(9924),C=n(844),S=n(5596),o=n(4725),d=n(3656);let a=r.AccessibilityManager=class extends C.Disposable{constructor(h,p){super(),this._terminal=h,this._renderService=p,this._liveRegionLineCount=0,this._charsToConsume=[],this._charsToAnnounce="",this._accessibilityContainer=document.createElement("div"),this._accessibilityContainer.classList.add("xterm-accessibility"),this._rowContainer=document.createElement("div"),this._rowContainer.setAttribute("role","list"),this._rowContainer.classList.add("xterm-accessibility-tree"),this._rowElements=[];for(let v=0;v<this._terminal.rows;v++)this._rowElements[v]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[v]);if(this._topBoundaryFocusListener=v=>this._handleBoundaryFocus(v,0),this._bottomBoundaryFocusListener=v=>this._handleBoundaryFocus(v,1),this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._refreshRowsDimensions(),this._accessibilityContainer.appendChild(this._rowContainer),this._liveRegion=document.createElement("div"),this._liveRegion.classList.add("live-region"),this._liveRegion.setAttribute("aria-live","assertive"),this._accessibilityContainer.appendChild(this._liveRegion),this._liveRegionDebouncer=this.register(new b.TimeBasedDebouncer(this._renderRows.bind(this))),!this._terminal.element)throw new Error("Cannot enable accessibility before Terminal.open");this._terminal.element.insertAdjacentElement("afterbegin",this._accessibilityContainer),this.register(this._terminal.onResize(v=>this._handleResize(v.rows))),this.register(this._terminal.onRender(v=>this._refreshRows(v.start,v.end))),this.register(this._terminal.onScroll(()=>this._refreshRows())),this.register(this._terminal.onA11yChar(v=>this._handleChar(v))),this.register(this._terminal.onLineFeed(()=>this._handleChar(`
`))),this.register(this._terminal.onA11yTab(v=>this._handleTab(v))),this.register(this._terminal.onKey(v=>this._handleKey(v.key))),this.register(this._terminal.onBlur(()=>this._clearLiveRegion())),this.register(this._renderService.onDimensionsChange(()=>this._refreshRowsDimensions())),this._screenDprMonitor=new S.ScreenDprMonitor(window),this.register(this._screenDprMonitor),this._screenDprMonitor.setListener(()=>this._refreshRowsDimensions()),this.register((0,d.addDisposableDomListener)(window,"resize",()=>this._refreshRowsDimensions())),this._refreshRows(),this.register((0,C.toDisposable)(()=>{this._accessibilityContainer.remove(),this._rowElements.length=0}))}_handleTab(h){for(let p=0;p<h;p++)this._handleChar(" ")}_handleChar(h){this._liveRegionLineCount<21&&(this._charsToConsume.length>0?this._charsToConsume.shift()!==h&&(this._charsToAnnounce+=h):this._charsToAnnounce+=h,h===`
`&&(this._liveRegionLineCount++,this._liveRegionLineCount===21&&(this._liveRegion.textContent+=l.tooMuchOutput)),f.isMac&&this._liveRegion.textContent&&this._liveRegion.textContent.length>0&&!this._liveRegion.parentNode&&setTimeout(()=>{this._accessibilityContainer.appendChild(this._liveRegion)},0))}_clearLiveRegion(){this._liveRegion.textContent="",this._liveRegionLineCount=0,f.isMac&&this._liveRegion.remove()}_handleKey(h){this._clearLiveRegion(),/\p{Control}/u.test(h)||this._charsToConsume.push(h)}_refreshRows(h,p){this._liveRegionDebouncer.refresh(h,p,this._terminal.rows)}_renderRows(h,p){const v=this._terminal.buffer,x=v.lines.length.toString();for(let E=h;E<=p;E++){const y=v.translateBufferLineToString(v.ydisp+E,!0),k=(v.ydisp+E+1).toString(),T=this._rowElements[E];T&&(y.length===0?T.innerText="\xA0":T.textContent=y,T.setAttribute("aria-posinset",k),T.setAttribute("aria-setsize",x))}this._announceCharacters()}_announceCharacters(){this._charsToAnnounce.length!==0&&(this._liveRegion.textContent+=this._charsToAnnounce,this._charsToAnnounce="")}_handleBoundaryFocus(h,p){const v=h.target,x=this._rowElements[p===0?1:this._rowElements.length-2];if(v.getAttribute("aria-posinset")===(p===0?"1":`${this._terminal.buffer.lines.length}`)||h.relatedTarget!==x)return;let E,y;if(p===0?(E=v,y=this._rowElements.pop(),this._rowContainer.removeChild(y)):(E=this._rowElements.shift(),y=v,this._rowContainer.removeChild(E)),E.removeEventListener("focus",this._topBoundaryFocusListener),y.removeEventListener("focus",this._bottomBoundaryFocusListener),p===0){const k=this._createAccessibilityTreeNode();this._rowElements.unshift(k),this._rowContainer.insertAdjacentElement("afterbegin",k)}else{const k=this._createAccessibilityTreeNode();this._rowElements.push(k),this._rowContainer.appendChild(k)}this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._terminal.scrollLines(p===0?-1:1),this._rowElements[p===0?1:this._rowElements.length-2].focus(),h.preventDefault(),h.stopImmediatePropagation()}_handleResize(h){this._rowElements[this._rowElements.length-1].removeEventListener("focus",this._bottomBoundaryFocusListener);for(let p=this._rowContainer.children.length;p<this._terminal.rows;p++)this._rowElements[p]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[p]);for(;this._rowElements.length>h;)this._rowContainer.removeChild(this._rowElements.pop());this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._refreshRowsDimensions()}_createAccessibilityTreeNode(){const h=document.createElement("div");return h.setAttribute("role","listitem"),h.tabIndex=-1,this._refreshRowDimensions(h),h}_refreshRowsDimensions(){if(this._renderService.dimensions.css.cell.height){this._accessibilityContainer.style.width=`${this._renderService.dimensions.css.canvas.width}px`,this._rowElements.length!==this._terminal.rows&&this._handleResize(this._terminal.rows);for(let h=0;h<this._terminal.rows;h++)this._refreshRowDimensions(this._rowElements[h])}}_refreshRowDimensions(h){h.style.height=`${this._renderService.dimensions.css.cell.height}px`}};r.AccessibilityManager=a=u([g(1,o.IRenderService)],a)},3614:(w,r)=>{function n(f){return f.replace(/\r?\n/g,"\r")}function u(f,b){return b?"\x1B[200~"+f+"\x1B[201~":f}function g(f,b,C,S){f=u(f=n(f),C.decPrivateModes.bracketedPasteMode&&S.rawOptions.ignoreBracketedPasteMode!==!0),C.triggerDataEvent(f,!0),b.value=""}function l(f,b,C){const S=C.getBoundingClientRect(),o=f.clientX-S.left-10,d=f.clientY-S.top-10;b.style.width="20px",b.style.height="20px",b.style.left=`${o}px`,b.style.top=`${d}px`,b.style.zIndex="1000",b.focus()}Object.defineProperty(r,"__esModule",{value:!0}),r.rightClickHandler=r.moveTextAreaUnderMouseCursor=r.paste=r.handlePasteEvent=r.copyHandler=r.bracketTextForPaste=r.prepareTextForTerminal=void 0,r.prepareTextForTerminal=n,r.bracketTextForPaste=u,r.copyHandler=function(f,b){f.clipboardData&&f.clipboardData.setData("text/plain",b.selectionText),f.preventDefault()},r.handlePasteEvent=function(f,b,C,S){f.stopPropagation(),f.clipboardData&&g(f.clipboardData.getData("text/plain"),b,C,S)},r.paste=g,r.moveTextAreaUnderMouseCursor=l,r.rightClickHandler=function(f,b,C,S,o){l(f,b,C),o&&S.rightClickSelect(f),b.value=S.selectionText,b.select()}},7239:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ColorContrastCache=void 0;const u=n(1505);r.ColorContrastCache=class{constructor(){this._color=new u.TwoKeyMap,this._css=new u.TwoKeyMap}setCss(g,l,f){this._css.set(g,l,f)}getCss(g,l){return this._css.get(g,l)}setColor(g,l,f){this._color.set(g,l,f)}getColor(g,l){return this._color.get(g,l)}clear(){this._color.clear(),this._css.clear()}}},3656:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.addDisposableDomListener=void 0,r.addDisposableDomListener=function(n,u,g,l){n.addEventListener(u,g,l);let f=!1;return{dispose:()=>{f||(f=!0,n.removeEventListener(u,g,l))}}}},6465:function(w,r,n){var u=this&&this.__decorate||function(o,d,a,h){var p,v=arguments.length,x=v<3?d:h===null?h=Object.getOwnPropertyDescriptor(d,a):h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(o,d,a,h);else for(var E=o.length-1;E>=0;E--)(p=o[E])&&(x=(v<3?p(x):v>3?p(d,a,x):p(d,a))||x);return v>3&&x&&Object.defineProperty(d,a,x),x},g=this&&this.__param||function(o,d){return function(a,h){d(a,h,o)}};Object.defineProperty(r,"__esModule",{value:!0}),r.Linkifier2=void 0;const l=n(3656),f=n(8460),b=n(844),C=n(2585);let S=r.Linkifier2=class extends b.Disposable{get currentLink(){return this._currentLink}constructor(o){super(),this._bufferService=o,this._linkProviders=[],this._linkCacheDisposables=[],this._isMouseOut=!0,this._wasResized=!1,this._activeLine=-1,this._onShowLinkUnderline=this.register(new f.EventEmitter),this.onShowLinkUnderline=this._onShowLinkUnderline.event,this._onHideLinkUnderline=this.register(new f.EventEmitter),this.onHideLinkUnderline=this._onHideLinkUnderline.event,this.register((0,b.getDisposeArrayDisposable)(this._linkCacheDisposables)),this.register((0,b.toDisposable)(()=>{this._lastMouseEvent=void 0})),this.register(this._bufferService.onResize(()=>{this._clearCurrentLink(),this._wasResized=!0}))}registerLinkProvider(o){return this._linkProviders.push(o),{dispose:()=>{const d=this._linkProviders.indexOf(o);d!==-1&&this._linkProviders.splice(d,1)}}}attachToDom(o,d,a){this._element=o,this._mouseService=d,this._renderService=a,this.register((0,l.addDisposableDomListener)(this._element,"mouseleave",()=>{this._isMouseOut=!0,this._clearCurrentLink()})),this.register((0,l.addDisposableDomListener)(this._element,"mousemove",this._handleMouseMove.bind(this))),this.register((0,l.addDisposableDomListener)(this._element,"mousedown",this._handleMouseDown.bind(this))),this.register((0,l.addDisposableDomListener)(this._element,"mouseup",this._handleMouseUp.bind(this)))}_handleMouseMove(o){if(this._lastMouseEvent=o,!this._element||!this._mouseService)return;const d=this._positionFromMouseEvent(o,this._element,this._mouseService);if(!d)return;this._isMouseOut=!1;const a=o.composedPath();for(let h=0;h<a.length;h++){const p=a[h];if(p.classList.contains("xterm"))break;if(p.classList.contains("xterm-hover"))return}this._lastBufferCell&&d.x===this._lastBufferCell.x&&d.y===this._lastBufferCell.y||(this._handleHover(d),this._lastBufferCell=d)}_handleHover(o){if(this._activeLine!==o.y||this._wasResized)return this._clearCurrentLink(),this._askForLink(o,!1),void(this._wasResized=!1);this._currentLink&&this._linkAtPosition(this._currentLink.link,o)||(this._clearCurrentLink(),this._askForLink(o,!0))}_askForLink(o,d){var a,h;this._activeProviderReplies&&d||((a=this._activeProviderReplies)===null||a===void 0||a.forEach(v=>{v==null||v.forEach(x=>{x.link.dispose&&x.link.dispose()})}),this._activeProviderReplies=new Map,this._activeLine=o.y);let p=!1;for(const[v,x]of this._linkProviders.entries())d?!((h=this._activeProviderReplies)===null||h===void 0)&&h.get(v)&&(p=this._checkLinkProviderResult(v,o,p)):x.provideLinks(o.y,E=>{var y,k;if(this._isMouseOut)return;const T=E==null?void 0:E.map(B=>({link:B}));(y=this._activeProviderReplies)===null||y===void 0||y.set(v,T),p=this._checkLinkProviderResult(v,o,p),((k=this._activeProviderReplies)===null||k===void 0?void 0:k.size)===this._linkProviders.length&&this._removeIntersectingLinks(o.y,this._activeProviderReplies)})}_removeIntersectingLinks(o,d){const a=new Set;for(let h=0;h<d.size;h++){const p=d.get(h);if(p)for(let v=0;v<p.length;v++){const x=p[v],E=x.link.range.start.y<o?0:x.link.range.start.x,y=x.link.range.end.y>o?this._bufferService.cols:x.link.range.end.x;for(let k=E;k<=y;k++){if(a.has(k)){p.splice(v--,1);break}a.add(k)}}}}_checkLinkProviderResult(o,d,a){var h;if(!this._activeProviderReplies)return a;const p=this._activeProviderReplies.get(o);let v=!1;for(let x=0;x<o;x++)this._activeProviderReplies.has(x)&&!this._activeProviderReplies.get(x)||(v=!0);if(!v&&p){const x=p.find(E=>this._linkAtPosition(E.link,d));x&&(a=!0,this._handleNewLink(x))}if(this._activeProviderReplies.size===this._linkProviders.length&&!a)for(let x=0;x<this._activeProviderReplies.size;x++){const E=(h=this._activeProviderReplies.get(x))===null||h===void 0?void 0:h.find(y=>this._linkAtPosition(y.link,d));if(E){a=!0,this._handleNewLink(E);break}}return a}_handleMouseDown(){this._mouseDownLink=this._currentLink}_handleMouseUp(o){if(!this._element||!this._mouseService||!this._currentLink)return;const d=this._positionFromMouseEvent(o,this._element,this._mouseService);d&&this._mouseDownLink===this._currentLink&&this._linkAtPosition(this._currentLink.link,d)&&this._currentLink.link.activate(o,this._currentLink.link.text)}_clearCurrentLink(o,d){this._element&&this._currentLink&&this._lastMouseEvent&&(!o||!d||this._currentLink.link.range.start.y>=o&&this._currentLink.link.range.end.y<=d)&&(this._linkLeave(this._element,this._currentLink.link,this._lastMouseEvent),this._currentLink=void 0,(0,b.disposeArray)(this._linkCacheDisposables))}_handleNewLink(o){if(!this._element||!this._lastMouseEvent||!this._mouseService)return;const d=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);d&&this._linkAtPosition(o.link,d)&&(this._currentLink=o,this._currentLink.state={decorations:{underline:o.link.decorations===void 0||o.link.decorations.underline,pointerCursor:o.link.decorations===void 0||o.link.decorations.pointerCursor},isHovered:!0},this._linkHover(this._element,o.link,this._lastMouseEvent),o.link.decorations={},Object.defineProperties(o.link.decorations,{pointerCursor:{get:()=>{var a,h;return(h=(a=this._currentLink)===null||a===void 0?void 0:a.state)===null||h===void 0?void 0:h.decorations.pointerCursor},set:a=>{var h,p;((h=this._currentLink)===null||h===void 0?void 0:h.state)&&this._currentLink.state.decorations.pointerCursor!==a&&(this._currentLink.state.decorations.pointerCursor=a,this._currentLink.state.isHovered&&((p=this._element)===null||p===void 0||p.classList.toggle("xterm-cursor-pointer",a)))}},underline:{get:()=>{var a,h;return(h=(a=this._currentLink)===null||a===void 0?void 0:a.state)===null||h===void 0?void 0:h.decorations.underline},set:a=>{var h,p,v;((h=this._currentLink)===null||h===void 0?void 0:h.state)&&((v=(p=this._currentLink)===null||p===void 0?void 0:p.state)===null||v===void 0?void 0:v.decorations.underline)!==a&&(this._currentLink.state.decorations.underline=a,this._currentLink.state.isHovered&&this._fireUnderlineEvent(o.link,a))}}}),this._renderService&&this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange(a=>{if(!this._currentLink)return;const h=a.start===0?0:a.start+1+this._bufferService.buffer.ydisp,p=this._bufferService.buffer.ydisp+1+a.end;if(this._currentLink.link.range.start.y>=h&&this._currentLink.link.range.end.y<=p&&(this._clearCurrentLink(h,p),this._lastMouseEvent&&this._element)){const v=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);v&&this._askForLink(v,!1)}})))}_linkHover(o,d,a){var h;!((h=this._currentLink)===null||h===void 0)&&h.state&&(this._currentLink.state.isHovered=!0,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(d,!0),this._currentLink.state.decorations.pointerCursor&&o.classList.add("xterm-cursor-pointer")),d.hover&&d.hover(a,d.text)}_fireUnderlineEvent(o,d){const a=o.range,h=this._bufferService.buffer.ydisp,p=this._createLinkUnderlineEvent(a.start.x-1,a.start.y-h-1,a.end.x,a.end.y-h-1,void 0);(d?this._onShowLinkUnderline:this._onHideLinkUnderline).fire(p)}_linkLeave(o,d,a){var h;!((h=this._currentLink)===null||h===void 0)&&h.state&&(this._currentLink.state.isHovered=!1,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(d,!1),this._currentLink.state.decorations.pointerCursor&&o.classList.remove("xterm-cursor-pointer")),d.leave&&d.leave(a,d.text)}_linkAtPosition(o,d){const a=o.range.start.y*this._bufferService.cols+o.range.start.x,h=o.range.end.y*this._bufferService.cols+o.range.end.x,p=d.y*this._bufferService.cols+d.x;return a<=p&&p<=h}_positionFromMouseEvent(o,d,a){const h=a.getCoords(o,d,this._bufferService.cols,this._bufferService.rows);if(h)return{x:h[0],y:h[1]+this._bufferService.buffer.ydisp}}_createLinkUnderlineEvent(o,d,a,h,p){return{x1:o,y1:d,x2:a,y2:h,cols:this._bufferService.cols,fg:p}}};r.Linkifier2=S=u([g(0,C.IBufferService)],S)},9042:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.tooMuchOutput=r.promptLabel=void 0,r.promptLabel="Terminal input",r.tooMuchOutput="Too much output to announce, navigate to rows manually to read"},3730:function(w,r,n){var u=this&&this.__decorate||function(S,o,d,a){var h,p=arguments.length,v=p<3?o:a===null?a=Object.getOwnPropertyDescriptor(o,d):a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")v=Reflect.decorate(S,o,d,a);else for(var x=S.length-1;x>=0;x--)(h=S[x])&&(v=(p<3?h(v):p>3?h(o,d,v):h(o,d))||v);return p>3&&v&&Object.defineProperty(o,d,v),v},g=this&&this.__param||function(S,o){return function(d,a){o(d,a,S)}};Object.defineProperty(r,"__esModule",{value:!0}),r.OscLinkProvider=void 0;const l=n(511),f=n(2585);let b=r.OscLinkProvider=class{constructor(S,o,d){this._bufferService=S,this._optionsService=o,this._oscLinkService=d}provideLinks(S,o){var d;const a=this._bufferService.buffer.lines.get(S-1);if(!a)return void o(void 0);const h=[],p=this._optionsService.rawOptions.linkHandler,v=new l.CellData,x=a.getTrimmedLength();let E=-1,y=-1,k=!1;for(let T=0;T<x;T++)if(y!==-1||a.hasContent(T)){if(a.loadCell(T,v),v.hasExtendedAttrs()&&v.extended.urlId){if(y===-1){y=T,E=v.extended.urlId;continue}k=v.extended.urlId!==E}else y!==-1&&(k=!0);if(k||y!==-1&&T===x-1){const B=(d=this._oscLinkService.getLinkData(E))===null||d===void 0?void 0:d.uri;if(B){const R={start:{x:y+1,y:S},end:{x:T+(k||T!==x-1?0:1),y:S}};let O=!1;if(!(p!=null&&p.allowNonHttpProtocols))try{const z=new URL(B);["http:","https:"].includes(z.protocol)||(O=!0)}catch{O=!0}O||h.push({text:B,range:R,activate:(z,F)=>p?p.activate(z,F,R):C(0,F),hover:(z,F)=>{var W;return(W=p==null?void 0:p.hover)===null||W===void 0?void 0:W.call(p,z,F,R)},leave:(z,F)=>{var W;return(W=p==null?void 0:p.leave)===null||W===void 0?void 0:W.call(p,z,F,R)}})}k=!1,v.hasExtendedAttrs()&&v.extended.urlId?(y=T,E=v.extended.urlId):(y=-1,E=-1)}}o(h)}};function C(S,o){if(confirm(`Do you want to navigate to ${o}?

WARNING: This link could potentially be dangerous`)){const d=window.open();if(d){try{d.opener=null}catch{}d.location.href=o}else console.warn("Opening link blocked as opener could not be cleared")}}r.OscLinkProvider=b=u([g(0,f.IBufferService),g(1,f.IOptionsService),g(2,f.IOscLinkService)],b)},6193:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.RenderDebouncer=void 0,r.RenderDebouncer=class{constructor(n,u){this._parentWindow=n,this._renderCallback=u,this._refreshCallbacks=[]}dispose(){this._animationFrame&&(this._parentWindow.cancelAnimationFrame(this._animationFrame),this._animationFrame=void 0)}addRefreshCallback(n){return this._refreshCallbacks.push(n),this._animationFrame||(this._animationFrame=this._parentWindow.requestAnimationFrame(()=>this._innerRefresh())),this._animationFrame}refresh(n,u,g){this._rowCount=g,n=n!==void 0?n:0,u=u!==void 0?u:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,n):n,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,u):u,this._animationFrame||(this._animationFrame=this._parentWindow.requestAnimationFrame(()=>this._innerRefresh()))}_innerRefresh(){if(this._animationFrame=void 0,this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return void this._runRefreshCallbacks();const n=Math.max(this._rowStart,0),u=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(n,u),this._runRefreshCallbacks()}_runRefreshCallbacks(){for(const n of this._refreshCallbacks)n(0);this._refreshCallbacks=[]}}},5596:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ScreenDprMonitor=void 0;const u=n(844);class g extends u.Disposable{constructor(f){super(),this._parentWindow=f,this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this.register((0,u.toDisposable)(()=>{this.clearListener()}))}setListener(f){this._listener&&this.clearListener(),this._listener=f,this._outerListener=()=>{this._listener&&(this._listener(this._parentWindow.devicePixelRatio,this._currentDevicePixelRatio),this._updateDpr())},this._updateDpr()}_updateDpr(){var f;this._outerListener&&((f=this._resolutionMediaMatchList)===null||f===void 0||f.removeListener(this._outerListener),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._resolutionMediaMatchList=this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`),this._resolutionMediaMatchList.addListener(this._outerListener))}clearListener(){this._resolutionMediaMatchList&&this._listener&&this._outerListener&&(this._resolutionMediaMatchList.removeListener(this._outerListener),this._resolutionMediaMatchList=void 0,this._listener=void 0,this._outerListener=void 0)}}r.ScreenDprMonitor=g},3236:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Terminal=void 0;const u=n(3614),g=n(3656),l=n(6465),f=n(9042),b=n(3730),C=n(1680),S=n(3107),o=n(5744),d=n(2950),a=n(1296),h=n(428),p=n(4269),v=n(5114),x=n(8934),E=n(3230),y=n(9312),k=n(4725),T=n(6731),B=n(8055),R=n(8969),O=n(8460),z=n(844),F=n(6114),W=n(8437),N=n(2584),L=n(7399),$=n(5941),M=n(9074),I=n(2585),j=n(5435),X=n(4567),se=typeof window<"u"?window.document:null;class Z extends R.CoreTerminal{get onFocus(){return this._onFocus.event}get onBlur(){return this._onBlur.event}get onA11yChar(){return this._onA11yCharEmitter.event}get onA11yTab(){return this._onA11yTabEmitter.event}get onWillOpen(){return this._onWillOpen.event}constructor(D={}){super(D),this.browser=F,this._keyDownHandled=!1,this._keyDownSeen=!1,this._keyPressHandled=!1,this._unprocessedDeadKey=!1,this._accessibilityManager=this.register(new z.MutableDisposable),this._onCursorMove=this.register(new O.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onKey=this.register(new O.EventEmitter),this.onKey=this._onKey.event,this._onRender=this.register(new O.EventEmitter),this.onRender=this._onRender.event,this._onSelectionChange=this.register(new O.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onTitleChange=this.register(new O.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onBell=this.register(new O.EventEmitter),this.onBell=this._onBell.event,this._onFocus=this.register(new O.EventEmitter),this._onBlur=this.register(new O.EventEmitter),this._onA11yCharEmitter=this.register(new O.EventEmitter),this._onA11yTabEmitter=this.register(new O.EventEmitter),this._onWillOpen=this.register(new O.EventEmitter),this._setup(),this.linkifier2=this.register(this._instantiationService.createInstance(l.Linkifier2)),this.linkifier2.registerLinkProvider(this._instantiationService.createInstance(b.OscLinkProvider)),this._decorationService=this._instantiationService.createInstance(M.DecorationService),this._instantiationService.setService(I.IDecorationService,this._decorationService),this.register(this._inputHandler.onRequestBell(()=>this._onBell.fire())),this.register(this._inputHandler.onRequestRefreshRows((P,U)=>this.refresh(P,U))),this.register(this._inputHandler.onRequestSendFocus(()=>this._reportFocus())),this.register(this._inputHandler.onRequestReset(()=>this.reset())),this.register(this._inputHandler.onRequestWindowsOptionsReport(P=>this._reportWindowsOptions(P))),this.register(this._inputHandler.onColor(P=>this._handleColorEvent(P))),this.register((0,O.forwardEvent)(this._inputHandler.onCursorMove,this._onCursorMove)),this.register((0,O.forwardEvent)(this._inputHandler.onTitleChange,this._onTitleChange)),this.register((0,O.forwardEvent)(this._inputHandler.onA11yChar,this._onA11yCharEmitter)),this.register((0,O.forwardEvent)(this._inputHandler.onA11yTab,this._onA11yTabEmitter)),this.register(this._bufferService.onResize(P=>this._afterResize(P.cols,P.rows))),this.register((0,z.toDisposable)(()=>{var P,U;this._customKeyEventHandler=void 0,(U=(P=this.element)===null||P===void 0?void 0:P.parentNode)===null||U===void 0||U.removeChild(this.element)}))}_handleColorEvent(D){if(this._themeService)for(const P of D){let U,H="";switch(P.index){case 256:U="foreground",H="10";break;case 257:U="background",H="11";break;case 258:U="cursor",H="12";break;default:U="ansi",H="4;"+P.index}switch(P.type){case 0:const re=B.color.toColorRGB(U==="ansi"?this._themeService.colors.ansi[P.index]:this._themeService.colors[U]);this.coreService.triggerDataEvent(`${N.C0.ESC}]${H};${(0,$.toRgbString)(re)}${N.C1_ESCAPED.ST}`);break;case 1:if(U==="ansi")this._themeService.modifyColors(G=>G.ansi[P.index]=B.rgba.toColor(...P.color));else{const G=U;this._themeService.modifyColors(ge=>ge[G]=B.rgba.toColor(...P.color))}break;case 2:this._themeService.restoreColor(P.index)}}}_setup(){super._setup(),this._customKeyEventHandler=void 0}get buffer(){return this.buffers.active}focus(){this.textarea&&this.textarea.focus({preventScroll:!0})}_handleScreenReaderModeOptionChange(D){D?!this._accessibilityManager.value&&this._renderService&&(this._accessibilityManager.value=this._instantiationService.createInstance(X.AccessibilityManager,this)):this._accessibilityManager.clear()}_handleTextAreaFocus(D){this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(N.C0.ESC+"[I"),this.updateCursorStyle(D),this.element.classList.add("focus"),this._showCursor(),this._onFocus.fire()}blur(){var D;return(D=this.textarea)===null||D===void 0?void 0:D.blur()}_handleTextAreaBlur(){this.textarea.value="",this.refresh(this.buffer.y,this.buffer.y),this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(N.C0.ESC+"[O"),this.element.classList.remove("focus"),this._onBlur.fire()}_syncTextArea(){if(!this.textarea||!this.buffer.isCursorInViewport||this._compositionHelper.isComposing||!this._renderService)return;const D=this.buffer.ybase+this.buffer.y,P=this.buffer.lines.get(D);if(!P)return;const U=Math.min(this.buffer.x,this.cols-1),H=this._renderService.dimensions.css.cell.height,re=P.getWidth(U),G=this._renderService.dimensions.css.cell.width*re,ge=this.buffer.y*this._renderService.dimensions.css.cell.height,Be=U*this._renderService.dimensions.css.cell.width;this.textarea.style.left=Be+"px",this.textarea.style.top=ge+"px",this.textarea.style.width=G+"px",this.textarea.style.height=H+"px",this.textarea.style.lineHeight=H+"px",this.textarea.style.zIndex="-5"}_initGlobal(){this._bindKeys(),this.register((0,g.addDisposableDomListener)(this.element,"copy",P=>{this.hasSelection()&&(0,u.copyHandler)(P,this._selectionService)}));const D=P=>(0,u.handlePasteEvent)(P,this.textarea,this.coreService,this.optionsService);this.register((0,g.addDisposableDomListener)(this.textarea,"paste",D)),this.register((0,g.addDisposableDomListener)(this.element,"paste",D)),F.isFirefox?this.register((0,g.addDisposableDomListener)(this.element,"mousedown",P=>{P.button===2&&(0,u.rightClickHandler)(P,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)})):this.register((0,g.addDisposableDomListener)(this.element,"contextmenu",P=>{(0,u.rightClickHandler)(P,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)})),F.isLinux&&this.register((0,g.addDisposableDomListener)(this.element,"auxclick",P=>{P.button===1&&(0,u.moveTextAreaUnderMouseCursor)(P,this.textarea,this.screenElement)}))}_bindKeys(){this.register((0,g.addDisposableDomListener)(this.textarea,"keyup",D=>this._keyUp(D),!0)),this.register((0,g.addDisposableDomListener)(this.textarea,"keydown",D=>this._keyDown(D),!0)),this.register((0,g.addDisposableDomListener)(this.textarea,"keypress",D=>this._keyPress(D),!0)),this.register((0,g.addDisposableDomListener)(this.textarea,"compositionstart",()=>this._compositionHelper.compositionstart())),this.register((0,g.addDisposableDomListener)(this.textarea,"compositionupdate",D=>this._compositionHelper.compositionupdate(D))),this.register((0,g.addDisposableDomListener)(this.textarea,"compositionend",()=>this._compositionHelper.compositionend())),this.register((0,g.addDisposableDomListener)(this.textarea,"input",D=>this._inputEvent(D),!0)),this.register(this.onRender(()=>this._compositionHelper.updateCompositionElements()))}open(D){var P;if(!D)throw new Error("Terminal requires a parent element.");D.isConnected||this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"),this._document=D.ownerDocument,this.element=this._document.createElement("div"),this.element.dir="ltr",this.element.classList.add("terminal"),this.element.classList.add("xterm"),D.appendChild(this.element);const U=se.createDocumentFragment();this._viewportElement=se.createElement("div"),this._viewportElement.classList.add("xterm-viewport"),U.appendChild(this._viewportElement),this._viewportScrollArea=se.createElement("div"),this._viewportScrollArea.classList.add("xterm-scroll-area"),this._viewportElement.appendChild(this._viewportScrollArea),this.screenElement=se.createElement("div"),this.screenElement.classList.add("xterm-screen"),this._helperContainer=se.createElement("div"),this._helperContainer.classList.add("xterm-helpers"),this.screenElement.appendChild(this._helperContainer),U.appendChild(this.screenElement),this.textarea=se.createElement("textarea"),this.textarea.classList.add("xterm-helper-textarea"),this.textarea.setAttribute("aria-label",f.promptLabel),F.isChromeOS||this.textarea.setAttribute("aria-multiline","false"),this.textarea.setAttribute("autocorrect","off"),this.textarea.setAttribute("autocapitalize","off"),this.textarea.setAttribute("spellcheck","false"),this.textarea.tabIndex=0,this._coreBrowserService=this._instantiationService.createInstance(v.CoreBrowserService,this.textarea,(P=this._document.defaultView)!==null&&P!==void 0?P:window),this._instantiationService.setService(k.ICoreBrowserService,this._coreBrowserService),this.register((0,g.addDisposableDomListener)(this.textarea,"focus",H=>this._handleTextAreaFocus(H))),this.register((0,g.addDisposableDomListener)(this.textarea,"blur",()=>this._handleTextAreaBlur())),this._helperContainer.appendChild(this.textarea),this._charSizeService=this._instantiationService.createInstance(h.CharSizeService,this._document,this._helperContainer),this._instantiationService.setService(k.ICharSizeService,this._charSizeService),this._themeService=this._instantiationService.createInstance(T.ThemeService),this._instantiationService.setService(k.IThemeService,this._themeService),this._characterJoinerService=this._instantiationService.createInstance(p.CharacterJoinerService),this._instantiationService.setService(k.ICharacterJoinerService,this._characterJoinerService),this._renderService=this.register(this._instantiationService.createInstance(E.RenderService,this.rows,this.screenElement)),this._instantiationService.setService(k.IRenderService,this._renderService),this.register(this._renderService.onRenderedViewportChange(H=>this._onRender.fire(H))),this.onResize(H=>this._renderService.resize(H.cols,H.rows)),this._compositionView=se.createElement("div"),this._compositionView.classList.add("composition-view"),this._compositionHelper=this._instantiationService.createInstance(d.CompositionHelper,this.textarea,this._compositionView),this._helperContainer.appendChild(this._compositionView),this.element.appendChild(U);try{this._onWillOpen.fire(this.element)}catch{}this._renderService.hasRenderer()||this._renderService.setRenderer(this._createRenderer()),this._mouseService=this._instantiationService.createInstance(x.MouseService),this._instantiationService.setService(k.IMouseService,this._mouseService),this.viewport=this._instantiationService.createInstance(C.Viewport,this._viewportElement,this._viewportScrollArea),this.viewport.onRequestScrollLines(H=>this.scrollLines(H.amount,H.suppressScrollEvent,1)),this.register(this._inputHandler.onRequestSyncScrollBar(()=>this.viewport.syncScrollArea())),this.register(this.viewport),this.register(this.onCursorMove(()=>{this._renderService.handleCursorMove(),this._syncTextArea()})),this.register(this.onResize(()=>this._renderService.handleResize(this.cols,this.rows))),this.register(this.onBlur(()=>this._renderService.handleBlur())),this.register(this.onFocus(()=>this._renderService.handleFocus())),this.register(this._renderService.onDimensionsChange(()=>this.viewport.syncScrollArea())),this._selectionService=this.register(this._instantiationService.createInstance(y.SelectionService,this.element,this.screenElement,this.linkifier2)),this._instantiationService.setService(k.ISelectionService,this._selectionService),this.register(this._selectionService.onRequestScrollLines(H=>this.scrollLines(H.amount,H.suppressScrollEvent))),this.register(this._selectionService.onSelectionChange(()=>this._onSelectionChange.fire())),this.register(this._selectionService.onRequestRedraw(H=>this._renderService.handleSelectionChanged(H.start,H.end,H.columnSelectMode))),this.register(this._selectionService.onLinuxMouseSelection(H=>{this.textarea.value=H,this.textarea.focus(),this.textarea.select()})),this.register(this._onScroll.event(H=>{this.viewport.syncScrollArea(),this._selectionService.refresh()})),this.register((0,g.addDisposableDomListener)(this._viewportElement,"scroll",()=>this._selectionService.refresh())),this.linkifier2.attachToDom(this.screenElement,this._mouseService,this._renderService),this.register(this._instantiationService.createInstance(S.BufferDecorationRenderer,this.screenElement)),this.register((0,g.addDisposableDomListener)(this.element,"mousedown",H=>this._selectionService.handleMouseDown(H))),this.coreMouseService.areMouseEventsActive?(this._selectionService.disable(),this.element.classList.add("enable-mouse-events")):this._selectionService.enable(),this.options.screenReaderMode&&(this._accessibilityManager.value=this._instantiationService.createInstance(X.AccessibilityManager,this)),this.register(this.optionsService.onSpecificOptionChange("screenReaderMode",H=>this._handleScreenReaderModeOptionChange(H))),this.options.overviewRulerWidth&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(o.OverviewRulerRenderer,this._viewportElement,this.screenElement))),this.optionsService.onSpecificOptionChange("overviewRulerWidth",H=>{!this._overviewRulerRenderer&&H&&this._viewportElement&&this.screenElement&&(this._overviewRulerRenderer=this.register(this._instantiationService.createInstance(o.OverviewRulerRenderer,this._viewportElement,this.screenElement)))}),this._charSizeService.measure(),this.refresh(0,this.rows-1),this._initGlobal(),this.bindMouse()}_createRenderer(){return this._instantiationService.createInstance(a.DomRenderer,this.element,this.screenElement,this._viewportElement,this.linkifier2)}bindMouse(){const D=this,P=this.element;function U(G){const ge=D._mouseService.getMouseReportCoords(G,D.screenElement);if(!ge)return!1;let Be,Ue;switch(G.overrideType||G.type){case"mousemove":Ue=32,G.buttons===void 0?(Be=3,G.button!==void 0&&(Be=G.button<3?G.button:3)):Be=1&G.buttons?0:4&G.buttons?1:2&G.buttons?2:3;break;case"mouseup":Ue=0,Be=G.button<3?G.button:3;break;case"mousedown":Ue=1,Be=G.button<3?G.button:3;break;case"wheel":if(D.viewport.getLinesScrolled(G)===0)return!1;Ue=G.deltaY<0?0:1,Be=4;break;default:return!1}return!(Ue===void 0||Be===void 0||Be>4)&&D.coreMouseService.triggerMouseEvent({col:ge.col,row:ge.row,x:ge.x,y:ge.y,button:Be,action:Ue,ctrl:G.ctrlKey,alt:G.altKey,shift:G.shiftKey})}const H={mouseup:null,wheel:null,mousedrag:null,mousemove:null},re={mouseup:G=>(U(G),G.buttons||(this._document.removeEventListener("mouseup",H.mouseup),H.mousedrag&&this._document.removeEventListener("mousemove",H.mousedrag)),this.cancel(G)),wheel:G=>(U(G),this.cancel(G,!0)),mousedrag:G=>{G.buttons&&U(G)},mousemove:G=>{G.buttons||U(G)}};this.register(this.coreMouseService.onProtocolChange(G=>{G?(this.optionsService.rawOptions.logLevel==="debug"&&this._logService.debug("Binding to mouse events:",this.coreMouseService.explainEvents(G)),this.element.classList.add("enable-mouse-events"),this._selectionService.disable()):(this._logService.debug("Unbinding from mouse events."),this.element.classList.remove("enable-mouse-events"),this._selectionService.enable()),8&G?H.mousemove||(P.addEventListener("mousemove",re.mousemove),H.mousemove=re.mousemove):(P.removeEventListener("mousemove",H.mousemove),H.mousemove=null),16&G?H.wheel||(P.addEventListener("wheel",re.wheel,{passive:!1}),H.wheel=re.wheel):(P.removeEventListener("wheel",H.wheel),H.wheel=null),2&G?H.mouseup||(P.addEventListener("mouseup",re.mouseup),H.mouseup=re.mouseup):(this._document.removeEventListener("mouseup",H.mouseup),P.removeEventListener("mouseup",H.mouseup),H.mouseup=null),4&G?H.mousedrag||(H.mousedrag=re.mousedrag):(this._document.removeEventListener("mousemove",H.mousedrag),H.mousedrag=null)})),this.coreMouseService.activeProtocol=this.coreMouseService.activeProtocol,this.register((0,g.addDisposableDomListener)(P,"mousedown",G=>{if(G.preventDefault(),this.focus(),this.coreMouseService.areMouseEventsActive&&!this._selectionService.shouldForceSelection(G))return U(G),H.mouseup&&this._document.addEventListener("mouseup",H.mouseup),H.mousedrag&&this._document.addEventListener("mousemove",H.mousedrag),this.cancel(G)})),this.register((0,g.addDisposableDomListener)(P,"wheel",G=>{if(!H.wheel){if(!this.buffer.hasScrollback){const ge=this.viewport.getLinesScrolled(G);if(ge===0)return;const Be=N.C0.ESC+(this.coreService.decPrivateModes.applicationCursorKeys?"O":"[")+(G.deltaY<0?"A":"B");let Ue="";for(let Gt=0;Gt<Math.abs(ge);Gt++)Ue+=Be;return this.coreService.triggerDataEvent(Ue,!0),this.cancel(G,!0)}return this.viewport.handleWheel(G)?this.cancel(G):void 0}},{passive:!1})),this.register((0,g.addDisposableDomListener)(P,"touchstart",G=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchStart(G),this.cancel(G)},{passive:!0})),this.register((0,g.addDisposableDomListener)(P,"touchmove",G=>{if(!this.coreMouseService.areMouseEventsActive)return this.viewport.handleTouchMove(G)?void 0:this.cancel(G)},{passive:!1}))}refresh(D,P){var U;(U=this._renderService)===null||U===void 0||U.refreshRows(D,P)}updateCursorStyle(D){var P;!((P=this._selectionService)===null||P===void 0)&&P.shouldColumnSelect(D)?this.element.classList.add("column-select"):this.element.classList.remove("column-select")}_showCursor(){this.coreService.isCursorInitialized||(this.coreService.isCursorInitialized=!0,this.refresh(this.buffer.y,this.buffer.y))}scrollLines(D,P,U=0){var H;U===1?(super.scrollLines(D,P,U),this.refresh(0,this.rows-1)):(H=this.viewport)===null||H===void 0||H.scrollLines(D)}paste(D){(0,u.paste)(D,this.textarea,this.coreService,this.optionsService)}attachCustomKeyEventHandler(D){this._customKeyEventHandler=D}registerLinkProvider(D){return this.linkifier2.registerLinkProvider(D)}registerCharacterJoiner(D){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");const P=this._characterJoinerService.register(D);return this.refresh(0,this.rows-1),P}deregisterCharacterJoiner(D){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");this._characterJoinerService.deregister(D)&&this.refresh(0,this.rows-1)}get markers(){return this.buffer.markers}registerMarker(D){return this.buffer.addMarker(this.buffer.ybase+this.buffer.y+D)}registerDecoration(D){return this._decorationService.registerDecoration(D)}hasSelection(){return!!this._selectionService&&this._selectionService.hasSelection}select(D,P,U){this._selectionService.setSelection(D,P,U)}getSelection(){return this._selectionService?this._selectionService.selectionText:""}getSelectionPosition(){if(this._selectionService&&this._selectionService.hasSelection)return{start:{x:this._selectionService.selectionStart[0],y:this._selectionService.selectionStart[1]},end:{x:this._selectionService.selectionEnd[0],y:this._selectionService.selectionEnd[1]}}}clearSelection(){var D;(D=this._selectionService)===null||D===void 0||D.clearSelection()}selectAll(){var D;(D=this._selectionService)===null||D===void 0||D.selectAll()}selectLines(D,P){var U;(U=this._selectionService)===null||U===void 0||U.selectLines(D,P)}_keyDown(D){if(this._keyDownHandled=!1,this._keyDownSeen=!0,this._customKeyEventHandler&&this._customKeyEventHandler(D)===!1)return!1;const P=this.browser.isMac&&this.options.macOptionIsMeta&&D.altKey;if(!P&&!this._compositionHelper.keydown(D))return this.options.scrollOnUserInput&&this.buffer.ybase!==this.buffer.ydisp&&this.scrollToBottom(),!1;P||D.key!=="Dead"&&D.key!=="AltGraph"||(this._unprocessedDeadKey=!0);const U=(0,L.evaluateKeyboardEvent)(D,this.coreService.decPrivateModes.applicationCursorKeys,this.browser.isMac,this.options.macOptionIsMeta);if(this.updateCursorStyle(D),U.type===3||U.type===2){const H=this.rows-1;return this.scrollLines(U.type===2?-H:H),this.cancel(D,!0)}return U.type===1&&this.selectAll(),!!this._isThirdLevelShift(this.browser,D)||(U.cancel&&this.cancel(D,!0),!U.key||!!(D.key&&!D.ctrlKey&&!D.altKey&&!D.metaKey&&D.key.length===1&&D.key.charCodeAt(0)>=65&&D.key.charCodeAt(0)<=90)||(this._unprocessedDeadKey?(this._unprocessedDeadKey=!1,!0):(U.key!==N.C0.ETX&&U.key!==N.C0.CR||(this.textarea.value=""),this._onKey.fire({key:U.key,domEvent:D}),this._showCursor(),this.coreService.triggerDataEvent(U.key,!0),!this.optionsService.rawOptions.screenReaderMode||D.altKey||D.ctrlKey?this.cancel(D,!0):void(this._keyDownHandled=!0))))}_isThirdLevelShift(D,P){const U=D.isMac&&!this.options.macOptionIsMeta&&P.altKey&&!P.ctrlKey&&!P.metaKey||D.isWindows&&P.altKey&&P.ctrlKey&&!P.metaKey||D.isWindows&&P.getModifierState("AltGraph");return P.type==="keypress"?U:U&&(!P.keyCode||P.keyCode>47)}_keyUp(D){this._keyDownSeen=!1,this._customKeyEventHandler&&this._customKeyEventHandler(D)===!1||(function(P){return P.keyCode===16||P.keyCode===17||P.keyCode===18}(D)||this.focus(),this.updateCursorStyle(D),this._keyPressHandled=!1)}_keyPress(D){let P;if(this._keyPressHandled=!1,this._keyDownHandled||this._customKeyEventHandler&&this._customKeyEventHandler(D)===!1)return!1;if(this.cancel(D),D.charCode)P=D.charCode;else if(D.which===null||D.which===void 0)P=D.keyCode;else{if(D.which===0||D.charCode===0)return!1;P=D.which}return!(!P||(D.altKey||D.ctrlKey||D.metaKey)&&!this._isThirdLevelShift(this.browser,D)||(P=String.fromCharCode(P),this._onKey.fire({key:P,domEvent:D}),this._showCursor(),this.coreService.triggerDataEvent(P,!0),this._keyPressHandled=!0,this._unprocessedDeadKey=!1,0))}_inputEvent(D){if(D.data&&D.inputType==="insertText"&&(!D.composed||!this._keyDownSeen)&&!this.optionsService.rawOptions.screenReaderMode){if(this._keyPressHandled)return!1;this._unprocessedDeadKey=!1;const P=D.data;return this.coreService.triggerDataEvent(P,!0),this.cancel(D),!0}return!1}resize(D,P){D!==this.cols||P!==this.rows?super.resize(D,P):this._charSizeService&&!this._charSizeService.hasValidSize&&this._charSizeService.measure()}_afterResize(D,P){var U,H;(U=this._charSizeService)===null||U===void 0||U.measure(),(H=this.viewport)===null||H===void 0||H.syncScrollArea(!0)}clear(){var D;if(this.buffer.ybase!==0||this.buffer.y!==0){this.buffer.clearAllMarkers(),this.buffer.lines.set(0,this.buffer.lines.get(this.buffer.ybase+this.buffer.y)),this.buffer.lines.length=1,this.buffer.ydisp=0,this.buffer.ybase=0,this.buffer.y=0;for(let P=1;P<this.rows;P++)this.buffer.lines.push(this.buffer.getBlankLine(W.DEFAULT_ATTR_DATA));this._onScroll.fire({position:this.buffer.ydisp,source:0}),(D=this.viewport)===null||D===void 0||D.reset(),this.refresh(0,this.rows-1)}}reset(){var D,P;this.options.rows=this.rows,this.options.cols=this.cols;const U=this._customKeyEventHandler;this._setup(),super.reset(),(D=this._selectionService)===null||D===void 0||D.reset(),this._decorationService.reset(),(P=this.viewport)===null||P===void 0||P.reset(),this._customKeyEventHandler=U,this.refresh(0,this.rows-1)}clearTextureAtlas(){var D;(D=this._renderService)===null||D===void 0||D.clearTextureAtlas()}_reportFocus(){var D;!((D=this.element)===null||D===void 0)&&D.classList.contains("focus")?this.coreService.triggerDataEvent(N.C0.ESC+"[I"):this.coreService.triggerDataEvent(N.C0.ESC+"[O")}_reportWindowsOptions(D){if(this._renderService)switch(D){case j.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:const P=this._renderService.dimensions.css.canvas.width.toFixed(0),U=this._renderService.dimensions.css.canvas.height.toFixed(0);this.coreService.triggerDataEvent(`${N.C0.ESC}[4;${U};${P}t`);break;case j.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:const H=this._renderService.dimensions.css.cell.width.toFixed(0),re=this._renderService.dimensions.css.cell.height.toFixed(0);this.coreService.triggerDataEvent(`${N.C0.ESC}[6;${re};${H}t`)}}cancel(D,P){if(this.options.cancelEvents||P)return D.preventDefault(),D.stopPropagation(),!1}}r.Terminal=Z},9924:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.TimeBasedDebouncer=void 0,r.TimeBasedDebouncer=class{constructor(n,u=1e3){this._renderCallback=n,this._debounceThresholdMS=u,this._lastRefreshMs=0,this._additionalRefreshRequested=!1}dispose(){this._refreshTimeoutID&&clearTimeout(this._refreshTimeoutID)}refresh(n,u,g){this._rowCount=g,n=n!==void 0?n:0,u=u!==void 0?u:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,n):n,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,u):u;const l=Date.now();if(l-this._lastRefreshMs>=this._debounceThresholdMS)this._lastRefreshMs=l,this._innerRefresh();else if(!this._additionalRefreshRequested){const f=l-this._lastRefreshMs,b=this._debounceThresholdMS-f;this._additionalRefreshRequested=!0,this._refreshTimeoutID=window.setTimeout(()=>{this._lastRefreshMs=Date.now(),this._innerRefresh(),this._additionalRefreshRequested=!1,this._refreshTimeoutID=void 0},b)}}_innerRefresh(){if(this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return;const n=Math.max(this._rowStart,0),u=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(n,u)}}},1680:function(w,r,n){var u=this&&this.__decorate||function(d,a,h,p){var v,x=arguments.length,E=x<3?a:p===null?p=Object.getOwnPropertyDescriptor(a,h):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")E=Reflect.decorate(d,a,h,p);else for(var y=d.length-1;y>=0;y--)(v=d[y])&&(E=(x<3?v(E):x>3?v(a,h,E):v(a,h))||E);return x>3&&E&&Object.defineProperty(a,h,E),E},g=this&&this.__param||function(d,a){return function(h,p){a(h,p,d)}};Object.defineProperty(r,"__esModule",{value:!0}),r.Viewport=void 0;const l=n(3656),f=n(4725),b=n(8460),C=n(844),S=n(2585);let o=r.Viewport=class extends C.Disposable{constructor(d,a,h,p,v,x,E,y){super(),this._viewportElement=d,this._scrollArea=a,this._bufferService=h,this._optionsService=p,this._charSizeService=v,this._renderService=x,this._coreBrowserService=E,this.scrollBarWidth=0,this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._wheelPartialScroll=0,this._refreshAnimationFrame=null,this._ignoreNextScrollEvent=!1,this._smoothScrollState={startTime:0,origin:-1,target:-1},this._onRequestScrollLines=this.register(new b.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this.scrollBarWidth=this._viewportElement.offsetWidth-this._scrollArea.offsetWidth||15,this.register((0,l.addDisposableDomListener)(this._viewportElement,"scroll",this._handleScroll.bind(this))),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate(k=>this._activeBuffer=k.activeBuffer)),this._renderDimensions=this._renderService.dimensions,this.register(this._renderService.onDimensionsChange(k=>this._renderDimensions=k)),this._handleThemeChange(y.colors),this.register(y.onChangeColors(k=>this._handleThemeChange(k))),this.register(this._optionsService.onSpecificOptionChange("scrollback",()=>this.syncScrollArea())),setTimeout(()=>this.syncScrollArea())}_handleThemeChange(d){this._viewportElement.style.backgroundColor=d.background.css}reset(){this._currentRowHeight=0,this._currentDeviceCellHeight=0,this._lastRecordedBufferLength=0,this._lastRecordedViewportHeight=0,this._lastRecordedBufferHeight=0,this._lastTouchY=0,this._lastScrollTop=0,this._coreBrowserService.window.requestAnimationFrame(()=>this.syncScrollArea())}_refresh(d){if(d)return this._innerRefresh(),void(this._refreshAnimationFrame!==null&&this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));this._refreshAnimationFrame===null&&(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._innerRefresh()))}_innerRefresh(){if(this._charSizeService.height>0){this._currentRowHeight=this._renderService.dimensions.device.cell.height/this._coreBrowserService.dpr,this._currentDeviceCellHeight=this._renderService.dimensions.device.cell.height,this._lastRecordedViewportHeight=this._viewportElement.offsetHeight;const a=Math.round(this._currentRowHeight*this._lastRecordedBufferLength)+(this._lastRecordedViewportHeight-this._renderService.dimensions.css.canvas.height);this._lastRecordedBufferHeight!==a&&(this._lastRecordedBufferHeight=a,this._scrollArea.style.height=this._lastRecordedBufferHeight+"px")}const d=this._bufferService.buffer.ydisp*this._currentRowHeight;this._viewportElement.scrollTop!==d&&(this._ignoreNextScrollEvent=!0,this._viewportElement.scrollTop=d),this._refreshAnimationFrame=null}syncScrollArea(d=!1){if(this._lastRecordedBufferLength!==this._bufferService.buffer.lines.length)return this._lastRecordedBufferLength=this._bufferService.buffer.lines.length,void this._refresh(d);this._lastRecordedViewportHeight===this._renderService.dimensions.css.canvas.height&&this._lastScrollTop===this._activeBuffer.ydisp*this._currentRowHeight&&this._renderDimensions.device.cell.height===this._currentDeviceCellHeight||this._refresh(d)}_handleScroll(d){if(this._lastScrollTop=this._viewportElement.scrollTop,!this._viewportElement.offsetParent)return;if(this._ignoreNextScrollEvent)return this._ignoreNextScrollEvent=!1,void this._onRequestScrollLines.fire({amount:0,suppressScrollEvent:!0});const a=Math.round(this._lastScrollTop/this._currentRowHeight)-this._bufferService.buffer.ydisp;this._onRequestScrollLines.fire({amount:a,suppressScrollEvent:!0})}_smoothScroll(){if(this._isDisposed||this._smoothScrollState.origin===-1||this._smoothScrollState.target===-1)return;const d=this._smoothScrollPercent();this._viewportElement.scrollTop=this._smoothScrollState.origin+Math.round(d*(this._smoothScrollState.target-this._smoothScrollState.origin)),d<1?this._coreBrowserService.window.requestAnimationFrame(()=>this._smoothScroll()):this._clearSmoothScrollState()}_smoothScrollPercent(){return this._optionsService.rawOptions.smoothScrollDuration&&this._smoothScrollState.startTime?Math.max(Math.min((Date.now()-this._smoothScrollState.startTime)/this._optionsService.rawOptions.smoothScrollDuration,1),0):1}_clearSmoothScrollState(){this._smoothScrollState.startTime=0,this._smoothScrollState.origin=-1,this._smoothScrollState.target=-1}_bubbleScroll(d,a){const h=this._viewportElement.scrollTop+this._lastRecordedViewportHeight;return!(a<0&&this._viewportElement.scrollTop!==0||a>0&&h<this._lastRecordedBufferHeight)||(d.cancelable&&d.preventDefault(),!1)}handleWheel(d){const a=this._getPixelsScrolled(d);return a!==0&&(this._optionsService.rawOptions.smoothScrollDuration?(this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target===-1?this._smoothScrollState.target=this._viewportElement.scrollTop+a:this._smoothScrollState.target+=a,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()):this._viewportElement.scrollTop+=a,this._bubbleScroll(d,a))}scrollLines(d){if(d!==0)if(this._optionsService.rawOptions.smoothScrollDuration){const a=d*this._currentRowHeight;this._smoothScrollState.startTime=Date.now(),this._smoothScrollPercent()<1?(this._smoothScrollState.origin=this._viewportElement.scrollTop,this._smoothScrollState.target=this._smoothScrollState.origin+a,this._smoothScrollState.target=Math.max(Math.min(this._smoothScrollState.target,this._viewportElement.scrollHeight),0),this._smoothScroll()):this._clearSmoothScrollState()}else this._onRequestScrollLines.fire({amount:d,suppressScrollEvent:!1})}_getPixelsScrolled(d){if(d.deltaY===0||d.shiftKey)return 0;let a=this._applyScrollModifier(d.deltaY,d);return d.deltaMode===WheelEvent.DOM_DELTA_LINE?a*=this._currentRowHeight:d.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(a*=this._currentRowHeight*this._bufferService.rows),a}getBufferElements(d,a){var h;let p,v="";const x=[],E=a!=null?a:this._bufferService.buffer.lines.length,y=this._bufferService.buffer.lines;for(let k=d;k<E;k++){const T=y.get(k);if(!T)continue;const B=(h=y.get(k+1))===null||h===void 0?void 0:h.isWrapped;if(v+=T.translateToString(!B),!B||k===y.length-1){const R=document.createElement("div");R.textContent=v,x.push(R),v.length>0&&(p=R),v=""}}return{bufferElements:x,cursorElement:p}}getLinesScrolled(d){if(d.deltaY===0||d.shiftKey)return 0;let a=this._applyScrollModifier(d.deltaY,d);return d.deltaMode===WheelEvent.DOM_DELTA_PIXEL?(a/=this._currentRowHeight+0,this._wheelPartialScroll+=a,a=Math.floor(Math.abs(this._wheelPartialScroll))*(this._wheelPartialScroll>0?1:-1),this._wheelPartialScroll%=1):d.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(a*=this._bufferService.rows),a}_applyScrollModifier(d,a){const h=this._optionsService.rawOptions.fastScrollModifier;return h==="alt"&&a.altKey||h==="ctrl"&&a.ctrlKey||h==="shift"&&a.shiftKey?d*this._optionsService.rawOptions.fastScrollSensitivity*this._optionsService.rawOptions.scrollSensitivity:d*this._optionsService.rawOptions.scrollSensitivity}handleTouchStart(d){this._lastTouchY=d.touches[0].pageY}handleTouchMove(d){const a=this._lastTouchY-d.touches[0].pageY;return this._lastTouchY=d.touches[0].pageY,a!==0&&(this._viewportElement.scrollTop+=a,this._bubbleScroll(d,a))}};r.Viewport=o=u([g(2,S.IBufferService),g(3,S.IOptionsService),g(4,f.ICharSizeService),g(5,f.IRenderService),g(6,f.ICoreBrowserService),g(7,f.IThemeService)],o)},3107:function(w,r,n){var u=this&&this.__decorate||function(o,d,a,h){var p,v=arguments.length,x=v<3?d:h===null?h=Object.getOwnPropertyDescriptor(d,a):h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(o,d,a,h);else for(var E=o.length-1;E>=0;E--)(p=o[E])&&(x=(v<3?p(x):v>3?p(d,a,x):p(d,a))||x);return v>3&&x&&Object.defineProperty(d,a,x),x},g=this&&this.__param||function(o,d){return function(a,h){d(a,h,o)}};Object.defineProperty(r,"__esModule",{value:!0}),r.BufferDecorationRenderer=void 0;const l=n(3656),f=n(4725),b=n(844),C=n(2585);let S=r.BufferDecorationRenderer=class extends b.Disposable{constructor(o,d,a,h){super(),this._screenElement=o,this._bufferService=d,this._decorationService=a,this._renderService=h,this._decorationElements=new Map,this._altBufferIsActive=!1,this._dimensionsChanged=!1,this._container=document.createElement("div"),this._container.classList.add("xterm-decoration-container"),this._screenElement.appendChild(this._container),this.register(this._renderService.onRenderedViewportChange(()=>this._doRefreshDecorations())),this.register(this._renderService.onDimensionsChange(()=>{this._dimensionsChanged=!0,this._queueRefresh()})),this.register((0,l.addDisposableDomListener)(window,"resize",()=>this._queueRefresh())),this.register(this._bufferService.buffers.onBufferActivate(()=>{this._altBufferIsActive=this._bufferService.buffer===this._bufferService.buffers.alt})),this.register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh())),this.register(this._decorationService.onDecorationRemoved(p=>this._removeDecoration(p))),this.register((0,b.toDisposable)(()=>{this._container.remove(),this._decorationElements.clear()}))}_queueRefresh(){this._animationFrame===void 0&&(this._animationFrame=this._renderService.addRefreshCallback(()=>{this._doRefreshDecorations(),this._animationFrame=void 0}))}_doRefreshDecorations(){for(const o of this._decorationService.decorations)this._renderDecoration(o);this._dimensionsChanged=!1}_renderDecoration(o){this._refreshStyle(o),this._dimensionsChanged&&this._refreshXPosition(o)}_createElement(o){var d,a;const h=document.createElement("div");h.classList.add("xterm-decoration"),h.classList.toggle("xterm-decoration-top-layer",((d=o==null?void 0:o.options)===null||d===void 0?void 0:d.layer)==="top"),h.style.width=`${Math.round((o.options.width||1)*this._renderService.dimensions.css.cell.width)}px`,h.style.height=(o.options.height||1)*this._renderService.dimensions.css.cell.height+"px",h.style.top=(o.marker.line-this._bufferService.buffers.active.ydisp)*this._renderService.dimensions.css.cell.height+"px",h.style.lineHeight=`${this._renderService.dimensions.css.cell.height}px`;const p=(a=o.options.x)!==null&&a!==void 0?a:0;return p&&p>this._bufferService.cols&&(h.style.display="none"),this._refreshXPosition(o,h),h}_refreshStyle(o){const d=o.marker.line-this._bufferService.buffers.active.ydisp;if(d<0||d>=this._bufferService.rows)o.element&&(o.element.style.display="none",o.onRenderEmitter.fire(o.element));else{let a=this._decorationElements.get(o);a||(a=this._createElement(o),o.element=a,this._decorationElements.set(o,a),this._container.appendChild(a),o.onDispose(()=>{this._decorationElements.delete(o),a.remove()})),a.style.top=d*this._renderService.dimensions.css.cell.height+"px",a.style.display=this._altBufferIsActive?"none":"block",o.onRenderEmitter.fire(a)}}_refreshXPosition(o,d=o.element){var a;if(!d)return;const h=(a=o.options.x)!==null&&a!==void 0?a:0;(o.options.anchor||"left")==="right"?d.style.right=h?h*this._renderService.dimensions.css.cell.width+"px":"":d.style.left=h?h*this._renderService.dimensions.css.cell.width+"px":""}_removeDecoration(o){var d;(d=this._decorationElements.get(o))===null||d===void 0||d.remove(),this._decorationElements.delete(o),o.dispose()}};r.BufferDecorationRenderer=S=u([g(1,C.IBufferService),g(2,C.IDecorationService),g(3,f.IRenderService)],S)},5871:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ColorZoneStore=void 0,r.ColorZoneStore=class{constructor(){this._zones=[],this._zonePool=[],this._zonePoolIndex=0,this._linePadding={full:0,left:0,center:0,right:0}}get zones(){return this._zonePool.length=Math.min(this._zonePool.length,this._zones.length),this._zones}clear(){this._zones.length=0,this._zonePoolIndex=0}addDecoration(n){if(n.options.overviewRulerOptions){for(const u of this._zones)if(u.color===n.options.overviewRulerOptions.color&&u.position===n.options.overviewRulerOptions.position){if(this._lineIntersectsZone(u,n.marker.line))return;if(this._lineAdjacentToZone(u,n.marker.line,n.options.overviewRulerOptions.position))return void this._addLineToZone(u,n.marker.line)}if(this._zonePoolIndex<this._zonePool.length)return this._zonePool[this._zonePoolIndex].color=n.options.overviewRulerOptions.color,this._zonePool[this._zonePoolIndex].position=n.options.overviewRulerOptions.position,this._zonePool[this._zonePoolIndex].startBufferLine=n.marker.line,this._zonePool[this._zonePoolIndex].endBufferLine=n.marker.line,void this._zones.push(this._zonePool[this._zonePoolIndex++]);this._zones.push({color:n.options.overviewRulerOptions.color,position:n.options.overviewRulerOptions.position,startBufferLine:n.marker.line,endBufferLine:n.marker.line}),this._zonePool.push(this._zones[this._zones.length-1]),this._zonePoolIndex++}}setPadding(n){this._linePadding=n}_lineIntersectsZone(n,u){return u>=n.startBufferLine&&u<=n.endBufferLine}_lineAdjacentToZone(n,u,g){return u>=n.startBufferLine-this._linePadding[g||"full"]&&u<=n.endBufferLine+this._linePadding[g||"full"]}_addLineToZone(n,u){n.startBufferLine=Math.min(n.startBufferLine,u),n.endBufferLine=Math.max(n.endBufferLine,u)}}},5744:function(w,r,n){var u=this&&this.__decorate||function(p,v,x,E){var y,k=arguments.length,T=k<3?v:E===null?E=Object.getOwnPropertyDescriptor(v,x):E;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")T=Reflect.decorate(p,v,x,E);else for(var B=p.length-1;B>=0;B--)(y=p[B])&&(T=(k<3?y(T):k>3?y(v,x,T):y(v,x))||T);return k>3&&T&&Object.defineProperty(v,x,T),T},g=this&&this.__param||function(p,v){return function(x,E){v(x,E,p)}};Object.defineProperty(r,"__esModule",{value:!0}),r.OverviewRulerRenderer=void 0;const l=n(5871),f=n(3656),b=n(4725),C=n(844),S=n(2585),o={full:0,left:0,center:0,right:0},d={full:0,left:0,center:0,right:0},a={full:0,left:0,center:0,right:0};let h=r.OverviewRulerRenderer=class extends C.Disposable{get _width(){return this._optionsService.options.overviewRulerWidth||0}constructor(p,v,x,E,y,k,T){var B;super(),this._viewportElement=p,this._screenElement=v,this._bufferService=x,this._decorationService=E,this._renderService=y,this._optionsService=k,this._coreBrowseService=T,this._colorZoneStore=new l.ColorZoneStore,this._shouldUpdateDimensions=!0,this._shouldUpdateAnchor=!0,this._lastKnownBufferLength=0,this._canvas=document.createElement("canvas"),this._canvas.classList.add("xterm-decoration-overview-ruler"),this._refreshCanvasDimensions(),(B=this._viewportElement.parentElement)===null||B===void 0||B.insertBefore(this._canvas,this._viewportElement);const R=this._canvas.getContext("2d");if(!R)throw new Error("Ctx cannot be null");this._ctx=R,this._registerDecorationListeners(),this._registerBufferChangeListeners(),this._registerDimensionChangeListeners(),this.register((0,C.toDisposable)(()=>{var O;(O=this._canvas)===null||O===void 0||O.remove()}))}_registerDecorationListeners(){this.register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh(void 0,!0))),this.register(this._decorationService.onDecorationRemoved(()=>this._queueRefresh(void 0,!0)))}_registerBufferChangeListeners(){this.register(this._renderService.onRenderedViewportChange(()=>this._queueRefresh())),this.register(this._bufferService.buffers.onBufferActivate(()=>{this._canvas.style.display=this._bufferService.buffer===this._bufferService.buffers.alt?"none":"block"})),this.register(this._bufferService.onScroll(()=>{this._lastKnownBufferLength!==this._bufferService.buffers.normal.lines.length&&(this._refreshDrawHeightConstants(),this._refreshColorZonePadding())}))}_registerDimensionChangeListeners(){this.register(this._renderService.onRender(()=>{this._containerHeight&&this._containerHeight===this._screenElement.clientHeight||(this._queueRefresh(!0),this._containerHeight=this._screenElement.clientHeight)})),this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth",()=>this._queueRefresh(!0))),this.register((0,f.addDisposableDomListener)(this._coreBrowseService.window,"resize",()=>this._queueRefresh(!0))),this._queueRefresh(!0)}_refreshDrawConstants(){const p=Math.floor(this._canvas.width/3),v=Math.ceil(this._canvas.width/3);d.full=this._canvas.width,d.left=p,d.center=v,d.right=p,this._refreshDrawHeightConstants(),a.full=0,a.left=0,a.center=d.left,a.right=d.left+d.center}_refreshDrawHeightConstants(){o.full=Math.round(2*this._coreBrowseService.dpr);const p=this._canvas.height/this._bufferService.buffer.lines.length,v=Math.round(Math.max(Math.min(p,12),6)*this._coreBrowseService.dpr);o.left=v,o.center=v,o.right=v}_refreshColorZonePadding(){this._colorZoneStore.setPadding({full:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*o.full),left:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*o.left),center:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*o.center),right:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*o.right)}),this._lastKnownBufferLength=this._bufferService.buffers.normal.lines.length}_refreshCanvasDimensions(){this._canvas.style.width=`${this._width}px`,this._canvas.width=Math.round(this._width*this._coreBrowseService.dpr),this._canvas.style.height=`${this._screenElement.clientHeight}px`,this._canvas.height=Math.round(this._screenElement.clientHeight*this._coreBrowseService.dpr),this._refreshDrawConstants(),this._refreshColorZonePadding()}_refreshDecorations(){this._shouldUpdateDimensions&&this._refreshCanvasDimensions(),this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._colorZoneStore.clear();for(const v of this._decorationService.decorations)this._colorZoneStore.addDecoration(v);this._ctx.lineWidth=1;const p=this._colorZoneStore.zones;for(const v of p)v.position!=="full"&&this._renderColorZone(v);for(const v of p)v.position==="full"&&this._renderColorZone(v);this._shouldUpdateDimensions=!1,this._shouldUpdateAnchor=!1}_renderColorZone(p){this._ctx.fillStyle=p.color,this._ctx.fillRect(a[p.position||"full"],Math.round((this._canvas.height-1)*(p.startBufferLine/this._bufferService.buffers.active.lines.length)-o[p.position||"full"]/2),d[p.position||"full"],Math.round((this._canvas.height-1)*((p.endBufferLine-p.startBufferLine)/this._bufferService.buffers.active.lines.length)+o[p.position||"full"]))}_queueRefresh(p,v){this._shouldUpdateDimensions=p||this._shouldUpdateDimensions,this._shouldUpdateAnchor=v||this._shouldUpdateAnchor,this._animationFrame===void 0&&(this._animationFrame=this._coreBrowseService.window.requestAnimationFrame(()=>{this._refreshDecorations(),this._animationFrame=void 0}))}};r.OverviewRulerRenderer=h=u([g(2,S.IBufferService),g(3,S.IDecorationService),g(4,b.IRenderService),g(5,S.IOptionsService),g(6,b.ICoreBrowserService)],h)},2950:function(w,r,n){var u=this&&this.__decorate||function(S,o,d,a){var h,p=arguments.length,v=p<3?o:a===null?a=Object.getOwnPropertyDescriptor(o,d):a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")v=Reflect.decorate(S,o,d,a);else for(var x=S.length-1;x>=0;x--)(h=S[x])&&(v=(p<3?h(v):p>3?h(o,d,v):h(o,d))||v);return p>3&&v&&Object.defineProperty(o,d,v),v},g=this&&this.__param||function(S,o){return function(d,a){o(d,a,S)}};Object.defineProperty(r,"__esModule",{value:!0}),r.CompositionHelper=void 0;const l=n(4725),f=n(2585),b=n(2584);let C=r.CompositionHelper=class{get isComposing(){return this._isComposing}constructor(S,o,d,a,h,p){this._textarea=S,this._compositionView=o,this._bufferService=d,this._optionsService=a,this._coreService=h,this._renderService=p,this._isComposing=!1,this._isSendingComposition=!1,this._compositionPosition={start:0,end:0},this._dataAlreadySent=""}compositionstart(){this._isComposing=!0,this._compositionPosition.start=this._textarea.value.length,this._compositionView.textContent="",this._dataAlreadySent="",this._compositionView.classList.add("active")}compositionupdate(S){this._compositionView.textContent=S.data,this.updateCompositionElements(),setTimeout(()=>{this._compositionPosition.end=this._textarea.value.length},0)}compositionend(){this._finalizeComposition(!0)}keydown(S){if(this._isComposing||this._isSendingComposition){if(S.keyCode===229||S.keyCode===16||S.keyCode===17||S.keyCode===18)return!1;this._finalizeComposition(!1)}return S.keyCode!==229||(this._handleAnyTextareaChanges(),!1)}_finalizeComposition(S){if(this._compositionView.classList.remove("active"),this._isComposing=!1,S){const o={start:this._compositionPosition.start,end:this._compositionPosition.end};this._isSendingComposition=!0,setTimeout(()=>{if(this._isSendingComposition){let d;this._isSendingComposition=!1,o.start+=this._dataAlreadySent.length,d=this._isComposing?this._textarea.value.substring(o.start,o.end):this._textarea.value.substring(o.start),d.length>0&&this._coreService.triggerDataEvent(d,!0)}},0)}else{this._isSendingComposition=!1;const o=this._textarea.value.substring(this._compositionPosition.start,this._compositionPosition.end);this._coreService.triggerDataEvent(o,!0)}}_handleAnyTextareaChanges(){const S=this._textarea.value;setTimeout(()=>{if(!this._isComposing){const o=this._textarea.value,d=o.replace(S,"");this._dataAlreadySent=d,o.length>S.length?this._coreService.triggerDataEvent(d,!0):o.length<S.length?this._coreService.triggerDataEvent(`${b.C0.DEL}`,!0):o.length===S.length&&o!==S&&this._coreService.triggerDataEvent(o,!0)}},0)}updateCompositionElements(S){if(this._isComposing){if(this._bufferService.buffer.isCursorInViewport){const o=Math.min(this._bufferService.buffer.x,this._bufferService.cols-1),d=this._renderService.dimensions.css.cell.height,a=this._bufferService.buffer.y*this._renderService.dimensions.css.cell.height,h=o*this._renderService.dimensions.css.cell.width;this._compositionView.style.left=h+"px",this._compositionView.style.top=a+"px",this._compositionView.style.height=d+"px",this._compositionView.style.lineHeight=d+"px",this._compositionView.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._compositionView.style.fontSize=this._optionsService.rawOptions.fontSize+"px";const p=this._compositionView.getBoundingClientRect();this._textarea.style.left=h+"px",this._textarea.style.top=a+"px",this._textarea.style.width=Math.max(p.width,1)+"px",this._textarea.style.height=Math.max(p.height,1)+"px",this._textarea.style.lineHeight=p.height+"px"}S||setTimeout(()=>this.updateCompositionElements(!0),0)}}};r.CompositionHelper=C=u([g(2,f.IBufferService),g(3,f.IOptionsService),g(4,f.ICoreService),g(5,l.IRenderService)],C)},9806:(w,r)=>{function n(u,g,l){const f=l.getBoundingClientRect(),b=u.getComputedStyle(l),C=parseInt(b.getPropertyValue("padding-left")),S=parseInt(b.getPropertyValue("padding-top"));return[g.clientX-f.left-C,g.clientY-f.top-S]}Object.defineProperty(r,"__esModule",{value:!0}),r.getCoords=r.getCoordsRelativeToElement=void 0,r.getCoordsRelativeToElement=n,r.getCoords=function(u,g,l,f,b,C,S,o,d){if(!C)return;const a=n(u,g,l);return a?(a[0]=Math.ceil((a[0]+(d?S/2:0))/S),a[1]=Math.ceil(a[1]/o),a[0]=Math.min(Math.max(a[0],1),f+(d?1:0)),a[1]=Math.min(Math.max(a[1],1),b),a):void 0}},9504:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.moveToCellSequence=void 0;const u=n(2584);function g(o,d,a,h){const p=o-l(o,a),v=d-l(d,a),x=Math.abs(p-v)-function(E,y,k){let T=0;const B=E-l(E,k),R=y-l(y,k);for(let O=0;O<Math.abs(B-R);O++){const z=f(E,y)==="A"?-1:1,F=k.buffer.lines.get(B+z*O);F!=null&&F.isWrapped&&T++}return T}(o,d,a);return S(x,C(f(o,d),h))}function l(o,d){let a=0,h=d.buffer.lines.get(o),p=h==null?void 0:h.isWrapped;for(;p&&o>=0&&o<d.rows;)a++,h=d.buffer.lines.get(--o),p=h==null?void 0:h.isWrapped;return a}function f(o,d){return o>d?"A":"B"}function b(o,d,a,h,p,v){let x=o,E=d,y="";for(;x!==a||E!==h;)x+=p?1:-1,p&&x>v.cols-1?(y+=v.buffer.translateBufferLineToString(E,!1,o,x),x=0,o=0,E++):!p&&x<0&&(y+=v.buffer.translateBufferLineToString(E,!1,0,o+1),x=v.cols-1,o=x,E--);return y+v.buffer.translateBufferLineToString(E,!1,o,x)}function C(o,d){const a=d?"O":"[";return u.C0.ESC+a+o}function S(o,d){o=Math.floor(o);let a="";for(let h=0;h<o;h++)a+=d;return a}r.moveToCellSequence=function(o,d,a,h){const p=a.buffer.x,v=a.buffer.y;if(!a.buffer.hasScrollback)return function(y,k,T,B,R,O){return g(k,B,R,O).length===0?"":S(b(y,k,y,k-l(k,R),!1,R).length,C("D",O))}(p,v,0,d,a,h)+g(v,d,a,h)+function(y,k,T,B,R,O){let z;z=g(k,B,R,O).length>0?B-l(B,R):k;const F=B,W=function(N,L,$,M,I,j){let X;return X=g($,M,I,j).length>0?M-l(M,I):L,N<$&&X<=M||N>=$&&X<M?"C":"D"}(y,k,T,B,R,O);return S(b(y,z,T,F,W==="C",R).length,C(W,O))}(p,v,o,d,a,h);let x;if(v===d)return x=p>o?"D":"C",S(Math.abs(p-o),C(x,h));x=v>d?"D":"C";const E=Math.abs(v-d);return S(function(y,k){return k.cols-y}(v>d?o:p,a)+(E-1)*a.cols+1+((v>d?p:o)-1),C(x,h))}},1296:function(w,r,n){var u=this&&this.__decorate||function(R,O,z,F){var W,N=arguments.length,L=N<3?O:F===null?F=Object.getOwnPropertyDescriptor(O,z):F;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")L=Reflect.decorate(R,O,z,F);else for(var $=R.length-1;$>=0;$--)(W=R[$])&&(L=(N<3?W(L):N>3?W(O,z,L):W(O,z))||L);return N>3&&L&&Object.defineProperty(O,z,L),L},g=this&&this.__param||function(R,O){return function(z,F){O(z,F,R)}};Object.defineProperty(r,"__esModule",{value:!0}),r.DomRenderer=void 0;const l=n(3787),f=n(2550),b=n(2223),C=n(6171),S=n(4725),o=n(8055),d=n(8460),a=n(844),h=n(2585),p="xterm-dom-renderer-owner-",v="xterm-rows",x="xterm-fg-",E="xterm-bg-",y="xterm-focus",k="xterm-selection";let T=1,B=r.DomRenderer=class extends a.Disposable{constructor(R,O,z,F,W,N,L,$,M,I){super(),this._element=R,this._screenElement=O,this._viewportElement=z,this._linkifier2=F,this._charSizeService=N,this._optionsService=L,this._bufferService=$,this._coreBrowserService=M,this._themeService=I,this._terminalClass=T++,this._rowElements=[],this.onRequestRedraw=this.register(new d.EventEmitter).event,this._rowContainer=document.createElement("div"),this._rowContainer.classList.add(v),this._rowContainer.style.lineHeight="normal",this._rowContainer.setAttribute("aria-hidden","true"),this._refreshRowElements(this._bufferService.cols,this._bufferService.rows),this._selectionContainer=document.createElement("div"),this._selectionContainer.classList.add(k),this._selectionContainer.setAttribute("aria-hidden","true"),this.dimensions=(0,C.createRenderDimensions)(),this._updateDimensions(),this.register(this._optionsService.onOptionChange(()=>this._handleOptionsChanged())),this.register(this._themeService.onChangeColors(j=>this._injectCss(j))),this._injectCss(this._themeService.colors),this._rowFactory=W.createInstance(l.DomRendererRowFactory,document),this._element.classList.add(p+this._terminalClass),this._screenElement.appendChild(this._rowContainer),this._screenElement.appendChild(this._selectionContainer),this.register(this._linkifier2.onShowLinkUnderline(j=>this._handleLinkHover(j))),this.register(this._linkifier2.onHideLinkUnderline(j=>this._handleLinkLeave(j))),this.register((0,a.toDisposable)(()=>{this._element.classList.remove(p+this._terminalClass),this._rowContainer.remove(),this._selectionContainer.remove(),this._widthCache.dispose(),this._themeStyleElement.remove(),this._dimensionsStyleElement.remove()})),this._widthCache=new f.WidthCache(document),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}_updateDimensions(){const R=this._coreBrowserService.dpr;this.dimensions.device.char.width=this._charSizeService.width*R,this.dimensions.device.char.height=Math.ceil(this._charSizeService.height*R),this.dimensions.device.cell.width=this.dimensions.device.char.width+Math.round(this._optionsService.rawOptions.letterSpacing),this.dimensions.device.cell.height=Math.floor(this.dimensions.device.char.height*this._optionsService.rawOptions.lineHeight),this.dimensions.device.char.left=0,this.dimensions.device.char.top=0,this.dimensions.device.canvas.width=this.dimensions.device.cell.width*this._bufferService.cols,this.dimensions.device.canvas.height=this.dimensions.device.cell.height*this._bufferService.rows,this.dimensions.css.canvas.width=Math.round(this.dimensions.device.canvas.width/R),this.dimensions.css.canvas.height=Math.round(this.dimensions.device.canvas.height/R),this.dimensions.css.cell.width=this.dimensions.css.canvas.width/this._bufferService.cols,this.dimensions.css.cell.height=this.dimensions.css.canvas.height/this._bufferService.rows;for(const z of this._rowElements)z.style.width=`${this.dimensions.css.canvas.width}px`,z.style.height=`${this.dimensions.css.cell.height}px`,z.style.lineHeight=`${this.dimensions.css.cell.height}px`,z.style.overflow="hidden";this._dimensionsStyleElement||(this._dimensionsStyleElement=document.createElement("style"),this._screenElement.appendChild(this._dimensionsStyleElement));const O=`${this._terminalSelector} .${v} span { display: inline-block; height: 100%; vertical-align: top;}`;this._dimensionsStyleElement.textContent=O,this._selectionContainer.style.height=this._viewportElement.style.height,this._screenElement.style.width=`${this.dimensions.css.canvas.width}px`,this._screenElement.style.height=`${this.dimensions.css.canvas.height}px`}_injectCss(R){this._themeStyleElement||(this._themeStyleElement=document.createElement("style"),this._screenElement.appendChild(this._themeStyleElement));let O=`${this._terminalSelector} .${v} { color: ${R.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;O+=`${this._terminalSelector} .${v} .xterm-dim { color: ${o.color.multiplyOpacity(R.foreground,.5).css};}`,O+=`${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`,O+="@keyframes blink_box_shadow_"+this._terminalClass+" { 50% {  border-bottom-style: hidden; }}",O+="@keyframes blink_block_"+this._terminalClass+` { 0% {  background-color: ${R.cursor.css};  color: ${R.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${R.cursor.css}; }}`,O+=`${this._terminalSelector} .${v}.${y} .xterm-cursor.xterm-cursor-blink:not(.xterm-cursor-block) { animation: blink_box_shadow_`+this._terminalClass+` 1s step-end infinite;}${this._terminalSelector} .${v}.${y} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: blink_block_`+this._terminalClass+` 1s step-end infinite;}${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-block { background-color: ${R.cursor.css}; color: ${R.cursorAccent.css};}${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${R.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${R.cursor.css} inset;}${this._terminalSelector} .${v} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${R.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`,O+=`${this._terminalSelector} .${k} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${k} div { position: absolute; background-color: ${R.selectionBackgroundOpaque.css};}${this._terminalSelector} .${k} div { position: absolute; background-color: ${R.selectionInactiveBackgroundOpaque.css};}`;for(const[z,F]of R.ansi.entries())O+=`${this._terminalSelector} .${x}${z} { color: ${F.css}; }${this._terminalSelector} .${x}${z}.xterm-dim { color: ${o.color.multiplyOpacity(F,.5).css}; }${this._terminalSelector} .${E}${z} { background-color: ${F.css}; }`;O+=`${this._terminalSelector} .${x}${b.INVERTED_DEFAULT_COLOR} { color: ${o.color.opaque(R.background).css}; }${this._terminalSelector} .${x}${b.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${o.color.multiplyOpacity(o.color.opaque(R.background),.5).css}; }${this._terminalSelector} .${E}${b.INVERTED_DEFAULT_COLOR} { background-color: ${R.foreground.css}; }`,this._themeStyleElement.textContent=O}_setDefaultSpacing(){const R=this.dimensions.css.cell.width-this._widthCache.get("W",!1,!1);this._rowContainer.style.letterSpacing=`${R}px`,this._rowFactory.defaultSpacing=R}handleDevicePixelRatioChange(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}_refreshRowElements(R,O){for(let z=this._rowElements.length;z<=O;z++){const F=document.createElement("div");this._rowContainer.appendChild(F),this._rowElements.push(F)}for(;this._rowElements.length>O;)this._rowContainer.removeChild(this._rowElements.pop())}handleResize(R,O){this._refreshRowElements(R,O),this._updateDimensions()}handleCharSizeChanged(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}handleBlur(){this._rowContainer.classList.remove(y)}handleFocus(){this._rowContainer.classList.add(y),this.renderRows(this._bufferService.buffer.y,this._bufferService.buffer.y)}handleSelectionChanged(R,O,z){if(this._selectionContainer.replaceChildren(),this._rowFactory.handleSelectionChanged(R,O,z),this.renderRows(0,this._bufferService.rows-1),!R||!O)return;const F=R[1]-this._bufferService.buffer.ydisp,W=O[1]-this._bufferService.buffer.ydisp,N=Math.max(F,0),L=Math.min(W,this._bufferService.rows-1);if(N>=this._bufferService.rows||L<0)return;const $=document.createDocumentFragment();if(z){const M=R[0]>O[0];$.appendChild(this._createSelectionElement(N,M?O[0]:R[0],M?R[0]:O[0],L-N+1))}else{const M=F===N?R[0]:0,I=N===W?O[0]:this._bufferService.cols;$.appendChild(this._createSelectionElement(N,M,I));const j=L-N-1;if($.appendChild(this._createSelectionElement(N+1,0,this._bufferService.cols,j)),N!==L){const X=W===L?O[0]:this._bufferService.cols;$.appendChild(this._createSelectionElement(L,0,X))}}this._selectionContainer.appendChild($)}_createSelectionElement(R,O,z,F=1){const W=document.createElement("div");return W.style.height=F*this.dimensions.css.cell.height+"px",W.style.top=R*this.dimensions.css.cell.height+"px",W.style.left=O*this.dimensions.css.cell.width+"px",W.style.width=this.dimensions.css.cell.width*(z-O)+"px",W}handleCursorMove(){}_handleOptionsChanged(){this._updateDimensions(),this._injectCss(this._themeService.colors),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}clear(){for(const R of this._rowElements)R.replaceChildren()}renderRows(R,O){const z=this._bufferService.buffer,F=z.ybase+z.y,W=Math.min(z.x,this._bufferService.cols-1),N=this._optionsService.rawOptions.cursorBlink,L=this._optionsService.rawOptions.cursorStyle,$=this._optionsService.rawOptions.cursorInactiveStyle;for(let M=R;M<=O;M++){const I=M+z.ydisp,j=this._rowElements[M],X=z.lines.get(I);if(!j||!X)break;j.replaceChildren(...this._rowFactory.createRow(X,I,I===F,L,$,W,N,this.dimensions.css.cell.width,this._widthCache,-1,-1))}}get _terminalSelector(){return`.${p}${this._terminalClass}`}_handleLinkHover(R){this._setCellUnderline(R.x1,R.x2,R.y1,R.y2,R.cols,!0)}_handleLinkLeave(R){this._setCellUnderline(R.x1,R.x2,R.y1,R.y2,R.cols,!1)}_setCellUnderline(R,O,z,F,W,N){z<0&&(R=0),F<0&&(O=0);const L=this._bufferService.rows-1;z=Math.max(Math.min(z,L),0),F=Math.max(Math.min(F,L),0),W=Math.min(W,this._bufferService.cols);const $=this._bufferService.buffer,M=$.ybase+$.y,I=Math.min($.x,W-1),j=this._optionsService.rawOptions.cursorBlink,X=this._optionsService.rawOptions.cursorStyle,se=this._optionsService.rawOptions.cursorInactiveStyle;for(let Z=z;Z<=F;++Z){const be=Z+$.ydisp,D=this._rowElements[Z],P=$.lines.get(be);if(!D||!P)break;D.replaceChildren(...this._rowFactory.createRow(P,be,be===M,X,se,I,j,this.dimensions.css.cell.width,this._widthCache,N?Z===z?R:0:-1,N?(Z===F?O:W)-1:-1))}}};r.DomRenderer=B=u([g(4,h.IInstantiationService),g(5,S.ICharSizeService),g(6,h.IOptionsService),g(7,h.IBufferService),g(8,S.ICoreBrowserService),g(9,S.IThemeService)],B)},3787:function(w,r,n){var u=this&&this.__decorate||function(x,E,y,k){var T,B=arguments.length,R=B<3?E:k===null?k=Object.getOwnPropertyDescriptor(E,y):k;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")R=Reflect.decorate(x,E,y,k);else for(var O=x.length-1;O>=0;O--)(T=x[O])&&(R=(B<3?T(R):B>3?T(E,y,R):T(E,y))||R);return B>3&&R&&Object.defineProperty(E,y,R),R},g=this&&this.__param||function(x,E){return function(y,k){E(y,k,x)}};Object.defineProperty(r,"__esModule",{value:!0}),r.DomRendererRowFactory=void 0;const l=n(2223),f=n(643),b=n(511),C=n(2585),S=n(8055),o=n(4725),d=n(4269),a=n(6171),h=n(3734);let p=r.DomRendererRowFactory=class{constructor(x,E,y,k,T,B,R){this._document=x,this._characterJoinerService=E,this._optionsService=y,this._coreBrowserService=k,this._coreService=T,this._decorationService=B,this._themeService=R,this._workCell=new b.CellData,this._columnSelectMode=!1,this.defaultSpacing=0}handleSelectionChanged(x,E,y){this._selectionStart=x,this._selectionEnd=E,this._columnSelectMode=y}createRow(x,E,y,k,T,B,R,O,z,F,W){const N=[],L=this._characterJoinerService.getJoinedCharacters(E),$=this._themeService.colors;let M,I=x.getNoBgTrimmedLength();y&&I<B+1&&(I=B+1);let j=0,X="",se=0,Z=0,be=0,D=!1,P=0,U=!1,H=0;const re=[],G=F!==-1&&W!==-1;for(let ge=0;ge<I;ge++){x.loadCell(ge,this._workCell);let Be=this._workCell.getWidth();if(Be===0)continue;let Ue=!1,Gt=ge,ne=this._workCell;if(L.length>0&&ge===L[0][0]){Ue=!0;const ye=L.shift();ne=new d.JoinedCellData(this._workCell,x.translateToString(!0,ye[0],ye[1]),ye[1]-ye[0]),Gt=ye[1]-1,Be=ne.getWidth()}const hi=this._isCellInSelection(ge,E),xs=y&&ge===B,ks=G&&ge>=F&&ge<=W;let Es=!1;this._decorationService.forEachDecorationAtCell(ge,E,void 0,ye=>{Es=!0});let ji=ne.getChars()||f.WHITESPACE_CELL_CHAR;if(ji===" "&&(ne.isUnderline()||ne.isOverline())&&(ji="\xA0"),H=Be*O-z.get(ji,ne.isBold(),ne.isItalic()),M){if(j&&(hi&&U||!hi&&!U&&ne.bg===se)&&(hi&&U&&$.selectionForeground||ne.fg===Z)&&ne.extended.ext===be&&ks===D&&H===P&&!xs&&!Ue&&!Es){X+=ji,j++;continue}j&&(M.textContent=X),M=this._document.createElement("span"),j=0,X=""}else M=this._document.createElement("span");if(se=ne.bg,Z=ne.fg,be=ne.extended.ext,D=ks,P=H,U=hi,Ue&&B>=ge&&B<=Gt&&(B=ge),!this._coreService.isCursorHidden&&xs){if(re.push("xterm-cursor"),this._coreBrowserService.isFocused)R&&re.push("xterm-cursor-blink"),re.push(k==="bar"?"xterm-cursor-bar":k==="underline"?"xterm-cursor-underline":"xterm-cursor-block");else if(T)switch(T){case"outline":re.push("xterm-cursor-outline");break;case"block":re.push("xterm-cursor-block");break;case"bar":re.push("xterm-cursor-bar");break;case"underline":re.push("xterm-cursor-underline")}}if(ne.isBold()&&re.push("xterm-bold"),ne.isItalic()&&re.push("xterm-italic"),ne.isDim()&&re.push("xterm-dim"),X=ne.isInvisible()?f.WHITESPACE_CELL_CHAR:ne.getChars()||f.WHITESPACE_CELL_CHAR,ne.isUnderline()&&(re.push(`xterm-underline-${ne.extended.underlineStyle}`),X===" "&&(X="\xA0"),!ne.isUnderlineColorDefault()))if(ne.isUnderlineColorRGB())M.style.textDecorationColor=`rgb(${h.AttributeData.toColorRGB(ne.getUnderlineColor()).join(",")})`;else{let ye=ne.getUnderlineColor();this._optionsService.rawOptions.drawBoldTextInBrightColors&&ne.isBold()&&ye<8&&(ye+=8),M.style.textDecorationColor=$.ansi[ye].css}ne.isOverline()&&(re.push("xterm-overline"),X===" "&&(X="\xA0")),ne.isStrikethrough()&&re.push("xterm-strikethrough"),ks&&(M.style.textDecoration="underline");let et=ne.getFgColor(),di=ne.getFgColorMode(),ut=ne.getBgColor(),ui=ne.getBgColorMode();const As=!!ne.isInverse();if(As){const ye=et;et=ut,ut=ye;const dn=di;di=ui,ui=dn}let xt,Ls,kt,pi=!1;switch(this._decorationService.forEachDecorationAtCell(ge,E,void 0,ye=>{ye.options.layer!=="top"&&pi||(ye.backgroundColorRGB&&(ui=50331648,ut=ye.backgroundColorRGB.rgba>>8&16777215,xt=ye.backgroundColorRGB),ye.foregroundColorRGB&&(di=50331648,et=ye.foregroundColorRGB.rgba>>8&16777215,Ls=ye.foregroundColorRGB),pi=ye.options.layer==="top")}),!pi&&hi&&(xt=this._coreBrowserService.isFocused?$.selectionBackgroundOpaque:$.selectionInactiveBackgroundOpaque,ut=xt.rgba>>8&16777215,ui=50331648,pi=!0,$.selectionForeground&&(di=50331648,et=$.selectionForeground.rgba>>8&16777215,Ls=$.selectionForeground)),pi&&re.push("xterm-decoration-top"),ui){case 16777216:case 33554432:kt=$.ansi[ut],re.push(`xterm-bg-${ut}`);break;case 50331648:kt=S.rgba.toColor(ut>>16,ut>>8&255,255&ut),this._addStyle(M,`background-color:#${v((ut>>>0).toString(16),"0",6)}`);break;default:As?(kt=$.foreground,re.push(`xterm-bg-${l.INVERTED_DEFAULT_COLOR}`)):kt=$.background}switch(xt||ne.isDim()&&(xt=S.color.multiplyOpacity(kt,.5)),di){case 16777216:case 33554432:ne.isBold()&&et<8&&this._optionsService.rawOptions.drawBoldTextInBrightColors&&(et+=8),this._applyMinimumContrast(M,kt,$.ansi[et],ne,xt,void 0)||re.push(`xterm-fg-${et}`);break;case 50331648:const ye=S.rgba.toColor(et>>16&255,et>>8&255,255&et);this._applyMinimumContrast(M,kt,ye,ne,xt,Ls)||this._addStyle(M,`color:#${v(et.toString(16),"0",6)}`);break;default:this._applyMinimumContrast(M,kt,$.foreground,ne,xt,void 0)||As&&re.push(`xterm-fg-${l.INVERTED_DEFAULT_COLOR}`)}re.length&&(M.className=re.join(" "),re.length=0),xs||Ue||Es?M.textContent=X:j++,H!==this.defaultSpacing&&(M.style.letterSpacing=`${H}px`),N.push(M),ge=Gt}return M&&j&&(M.textContent=X),N}_applyMinimumContrast(x,E,y,k,T,B){if(this._optionsService.rawOptions.minimumContrastRatio===1||(0,a.excludeFromContrastRatioDemands)(k.getCode()))return!1;const R=this._getContrastCache(k);let O;if(T||B||(O=R.getColor(E.rgba,y.rgba)),O===void 0){const z=this._optionsService.rawOptions.minimumContrastRatio/(k.isDim()?2:1);O=S.color.ensureContrastRatio(T||E,B||y,z),R.setColor((T||E).rgba,(B||y).rgba,O!=null?O:null)}return!!O&&(this._addStyle(x,`color:${O.css}`),!0)}_getContrastCache(x){return x.isDim()?this._themeService.colors.halfContrastCache:this._themeService.colors.contrastCache}_addStyle(x,E){x.setAttribute("style",`${x.getAttribute("style")||""}${E};`)}_isCellInSelection(x,E){const y=this._selectionStart,k=this._selectionEnd;return!(!y||!k)&&(this._columnSelectMode?y[0]<=k[0]?x>=y[0]&&E>=y[1]&&x<k[0]&&E<=k[1]:x<y[0]&&E>=y[1]&&x>=k[0]&&E<=k[1]:E>y[1]&&E<k[1]||y[1]===k[1]&&E===y[1]&&x>=y[0]&&x<k[0]||y[1]<k[1]&&E===k[1]&&x<k[0]||y[1]<k[1]&&E===y[1]&&x>=y[0])}};function v(x,E,y){for(;x.length<y;)x=E+x;return x}r.DomRendererRowFactory=p=u([g(1,o.ICharacterJoinerService),g(2,C.IOptionsService),g(3,o.ICoreBrowserService),g(4,C.ICoreService),g(5,C.IDecorationService),g(6,o.IThemeService)],p)},2550:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.WidthCache=void 0,r.WidthCache=class{constructor(n){this._flat=new Float32Array(256),this._font="",this._fontSize=0,this._weight="normal",this._weightBold="bold",this._measureElements=[],this._container=n.createElement("div"),this._container.style.position="absolute",this._container.style.top="-50000px",this._container.style.width="50000px",this._container.style.whiteSpace="pre",this._container.style.fontKerning="none";const u=n.createElement("span"),g=n.createElement("span");g.style.fontWeight="bold";const l=n.createElement("span");l.style.fontStyle="italic";const f=n.createElement("span");f.style.fontWeight="bold",f.style.fontStyle="italic",this._measureElements=[u,g,l,f],this._container.appendChild(u),this._container.appendChild(g),this._container.appendChild(l),this._container.appendChild(f),n.body.appendChild(this._container),this.clear()}dispose(){this._container.remove(),this._measureElements.length=0,this._holey=void 0}clear(){this._flat.fill(-9999),this._holey=new Map}setFont(n,u,g,l){n===this._font&&u===this._fontSize&&g===this._weight&&l===this._weightBold||(this._font=n,this._fontSize=u,this._weight=g,this._weightBold=l,this._container.style.fontFamily=this._font,this._container.style.fontSize=`${this._fontSize}px`,this._measureElements[0].style.fontWeight=`${g}`,this._measureElements[1].style.fontWeight=`${l}`,this._measureElements[2].style.fontWeight=`${g}`,this._measureElements[3].style.fontWeight=`${l}`,this.clear())}get(n,u,g){let l=0;if(!u&&!g&&n.length===1&&(l=n.charCodeAt(0))<256)return this._flat[l]!==-9999?this._flat[l]:this._flat[l]=this._measure(n,0);let f=n;u&&(f+="B"),g&&(f+="I");let b=this._holey.get(f);if(b===void 0){let C=0;u&&(C|=1),g&&(C|=2),b=this._measure(n,C),this._holey.set(f,b)}return b}_measure(n,u){const g=this._measureElements[u];return g.textContent=n.repeat(32),g.offsetWidth/32}}},2223:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.TEXT_BASELINE=r.DIM_OPACITY=r.INVERTED_DEFAULT_COLOR=void 0;const u=n(6114);r.INVERTED_DEFAULT_COLOR=257,r.DIM_OPACITY=.5,r.TEXT_BASELINE=u.isFirefox||u.isLegacyEdge?"bottom":"ideographic"},6171:(w,r)=>{function n(u){return 57508<=u&&u<=57558}Object.defineProperty(r,"__esModule",{value:!0}),r.createRenderDimensions=r.excludeFromContrastRatioDemands=r.isRestrictedPowerlineGlyph=r.isPowerlineGlyph=r.throwIfFalsy=void 0,r.throwIfFalsy=function(u){if(!u)throw new Error("value must not be falsy");return u},r.isPowerlineGlyph=n,r.isRestrictedPowerlineGlyph=function(u){return 57520<=u&&u<=57527},r.excludeFromContrastRatioDemands=function(u){return n(u)||function(g){return 9472<=g&&g<=9631}(u)},r.createRenderDimensions=function(){return{css:{canvas:{width:0,height:0},cell:{width:0,height:0}},device:{canvas:{width:0,height:0},cell:{width:0,height:0},char:{width:0,height:0,left:0,top:0}}}}},456:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.SelectionModel=void 0,r.SelectionModel=class{constructor(n){this._bufferService=n,this.isSelectAllActive=!1,this.selectionStartLength=0}clearSelection(){this.selectionStart=void 0,this.selectionEnd=void 0,this.isSelectAllActive=!1,this.selectionStartLength=0}get finalSelectionStart(){return this.isSelectAllActive?[0,0]:this.selectionEnd&&this.selectionStart&&this.areSelectionValuesReversed()?this.selectionEnd:this.selectionStart}get finalSelectionEnd(){if(this.isSelectAllActive)return[this._bufferService.cols,this._bufferService.buffer.ybase+this._bufferService.rows-1];if(this.selectionStart){if(!this.selectionEnd||this.areSelectionValuesReversed()){const n=this.selectionStart[0]+this.selectionStartLength;return n>this._bufferService.cols?n%this._bufferService.cols==0?[this._bufferService.cols,this.selectionStart[1]+Math.floor(n/this._bufferService.cols)-1]:[n%this._bufferService.cols,this.selectionStart[1]+Math.floor(n/this._bufferService.cols)]:[n,this.selectionStart[1]]}if(this.selectionStartLength&&this.selectionEnd[1]===this.selectionStart[1]){const n=this.selectionStart[0]+this.selectionStartLength;return n>this._bufferService.cols?[n%this._bufferService.cols,this.selectionStart[1]+Math.floor(n/this._bufferService.cols)]:[Math.max(n,this.selectionEnd[0]),this.selectionEnd[1]]}return this.selectionEnd}}areSelectionValuesReversed(){const n=this.selectionStart,u=this.selectionEnd;return!(!n||!u)&&(n[1]>u[1]||n[1]===u[1]&&n[0]>u[0])}handleTrim(n){return this.selectionStart&&(this.selectionStart[1]-=n),this.selectionEnd&&(this.selectionEnd[1]-=n),this.selectionEnd&&this.selectionEnd[1]<0?(this.clearSelection(),!0):(this.selectionStart&&this.selectionStart[1]<0&&(this.selectionStart[1]=0),!1)}}},428:function(w,r,n){var u=this&&this.__decorate||function(o,d,a,h){var p,v=arguments.length,x=v<3?d:h===null?h=Object.getOwnPropertyDescriptor(d,a):h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(o,d,a,h);else for(var E=o.length-1;E>=0;E--)(p=o[E])&&(x=(v<3?p(x):v>3?p(d,a,x):p(d,a))||x);return v>3&&x&&Object.defineProperty(d,a,x),x},g=this&&this.__param||function(o,d){return function(a,h){d(a,h,o)}};Object.defineProperty(r,"__esModule",{value:!0}),r.CharSizeService=void 0;const l=n(2585),f=n(8460),b=n(844);let C=r.CharSizeService=class extends b.Disposable{get hasValidSize(){return this.width>0&&this.height>0}constructor(o,d,a){super(),this._optionsService=a,this.width=0,this.height=0,this._onCharSizeChange=this.register(new f.EventEmitter),this.onCharSizeChange=this._onCharSizeChange.event,this._measureStrategy=new S(o,d,this._optionsService),this.register(this._optionsService.onMultipleOptionChange(["fontFamily","fontSize"],()=>this.measure()))}measure(){const o=this._measureStrategy.measure();o.width===this.width&&o.height===this.height||(this.width=o.width,this.height=o.height,this._onCharSizeChange.fire())}};r.CharSizeService=C=u([g(2,l.IOptionsService)],C);class S{constructor(d,a,h){this._document=d,this._parentElement=a,this._optionsService=h,this._result={width:0,height:0},this._measureElement=this._document.createElement("span"),this._measureElement.classList.add("xterm-char-measure-element"),this._measureElement.textContent="W".repeat(32),this._measureElement.setAttribute("aria-hidden","true"),this._measureElement.style.whiteSpace="pre",this._measureElement.style.fontKerning="none",this._parentElement.appendChild(this._measureElement)}measure(){this._measureElement.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._measureElement.style.fontSize=`${this._optionsService.rawOptions.fontSize}px`;const d={height:Number(this._measureElement.offsetHeight),width:Number(this._measureElement.offsetWidth)};return d.width!==0&&d.height!==0&&(this._result.width=d.width/32,this._result.height=Math.ceil(d.height)),this._result}}},4269:function(w,r,n){var u=this&&this.__decorate||function(d,a,h,p){var v,x=arguments.length,E=x<3?a:p===null?p=Object.getOwnPropertyDescriptor(a,h):p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")E=Reflect.decorate(d,a,h,p);else for(var y=d.length-1;y>=0;y--)(v=d[y])&&(E=(x<3?v(E):x>3?v(a,h,E):v(a,h))||E);return x>3&&E&&Object.defineProperty(a,h,E),E},g=this&&this.__param||function(d,a){return function(h,p){a(h,p,d)}};Object.defineProperty(r,"__esModule",{value:!0}),r.CharacterJoinerService=r.JoinedCellData=void 0;const l=n(3734),f=n(643),b=n(511),C=n(2585);class S extends l.AttributeData{constructor(a,h,p){super(),this.content=0,this.combinedData="",this.fg=a.fg,this.bg=a.bg,this.combinedData=h,this._width=p}isCombined(){return 2097152}getWidth(){return this._width}getChars(){return this.combinedData}getCode(){return 2097151}setFromCharData(a){throw new Error("not implemented")}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}r.JoinedCellData=S;let o=r.CharacterJoinerService=class xo{constructor(a){this._bufferService=a,this._characterJoiners=[],this._nextCharacterJoinerId=0,this._workCell=new b.CellData}register(a){const h={id:this._nextCharacterJoinerId++,handler:a};return this._characterJoiners.push(h),h.id}deregister(a){for(let h=0;h<this._characterJoiners.length;h++)if(this._characterJoiners[h].id===a)return this._characterJoiners.splice(h,1),!0;return!1}getJoinedCharacters(a){if(this._characterJoiners.length===0)return[];const h=this._bufferService.buffer.lines.get(a);if(!h||h.length===0)return[];const p=[],v=h.translateToString(!0);let x=0,E=0,y=0,k=h.getFg(0),T=h.getBg(0);for(let B=0;B<h.getTrimmedLength();B++)if(h.loadCell(B,this._workCell),this._workCell.getWidth()!==0){if(this._workCell.fg!==k||this._workCell.bg!==T){if(B-x>1){const R=this._getJoinedRanges(v,y,E,h,x);for(let O=0;O<R.length;O++)p.push(R[O])}x=B,y=E,k=this._workCell.fg,T=this._workCell.bg}E+=this._workCell.getChars().length||f.WHITESPACE_CELL_CHAR.length}if(this._bufferService.cols-x>1){const B=this._getJoinedRanges(v,y,E,h,x);for(let R=0;R<B.length;R++)p.push(B[R])}return p}_getJoinedRanges(a,h,p,v,x){const E=a.substring(h,p);let y=[];try{y=this._characterJoiners[0].handler(E)}catch(k){console.error(k)}for(let k=1;k<this._characterJoiners.length;k++)try{const T=this._characterJoiners[k].handler(E);for(let B=0;B<T.length;B++)xo._mergeRanges(y,T[B])}catch(T){console.error(T)}return this._stringRangesToCellRanges(y,v,x),y}_stringRangesToCellRanges(a,h,p){let v=0,x=!1,E=0,y=a[v];if(y){for(let k=p;k<this._bufferService.cols;k++){const T=h.getWidth(k),B=h.getString(k).length||f.WHITESPACE_CELL_CHAR.length;if(T!==0){if(!x&&y[0]<=E&&(y[0]=k,x=!0),y[1]<=E){if(y[1]=k,y=a[++v],!y)break;y[0]<=E?(y[0]=k,x=!0):x=!1}E+=B}}y&&(y[1]=this._bufferService.cols)}}static _mergeRanges(a,h){let p=!1;for(let v=0;v<a.length;v++){const x=a[v];if(p){if(h[1]<=x[0])return a[v-1][1]=h[1],a;if(h[1]<=x[1])return a[v-1][1]=Math.max(h[1],x[1]),a.splice(v,1),a;a.splice(v,1),v--}else{if(h[1]<=x[0])return a.splice(v,0,h),a;if(h[1]<=x[1])return x[0]=Math.min(h[0],x[0]),a;h[0]<x[1]&&(x[0]=Math.min(h[0],x[0]),p=!0)}}return p?a[a.length-1][1]=h[1]:a.push(h),a}};r.CharacterJoinerService=o=u([g(0,C.IBufferService)],o)},5114:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CoreBrowserService=void 0,r.CoreBrowserService=class{constructor(n,u){this._textarea=n,this.window=u,this._isFocused=!1,this._cachedIsFocused=void 0,this._textarea.addEventListener("focus",()=>this._isFocused=!0),this._textarea.addEventListener("blur",()=>this._isFocused=!1)}get dpr(){return this.window.devicePixelRatio}get isFocused(){return this._cachedIsFocused===void 0&&(this._cachedIsFocused=this._isFocused&&this._textarea.ownerDocument.hasFocus(),queueMicrotask(()=>this._cachedIsFocused=void 0)),this._cachedIsFocused}}},8934:function(w,r,n){var u=this&&this.__decorate||function(C,S,o,d){var a,h=arguments.length,p=h<3?S:d===null?d=Object.getOwnPropertyDescriptor(S,o):d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")p=Reflect.decorate(C,S,o,d);else for(var v=C.length-1;v>=0;v--)(a=C[v])&&(p=(h<3?a(p):h>3?a(S,o,p):a(S,o))||p);return h>3&&p&&Object.defineProperty(S,o,p),p},g=this&&this.__param||function(C,S){return function(o,d){S(o,d,C)}};Object.defineProperty(r,"__esModule",{value:!0}),r.MouseService=void 0;const l=n(4725),f=n(9806);let b=r.MouseService=class{constructor(C,S){this._renderService=C,this._charSizeService=S}getCoords(C,S,o,d,a){return(0,f.getCoords)(window,C,S,o,d,this._charSizeService.hasValidSize,this._renderService.dimensions.css.cell.width,this._renderService.dimensions.css.cell.height,a)}getMouseReportCoords(C,S){const o=(0,f.getCoordsRelativeToElement)(window,C,S);if(this._charSizeService.hasValidSize)return o[0]=Math.min(Math.max(o[0],0),this._renderService.dimensions.css.canvas.width-1),o[1]=Math.min(Math.max(o[1],0),this._renderService.dimensions.css.canvas.height-1),{col:Math.floor(o[0]/this._renderService.dimensions.css.cell.width),row:Math.floor(o[1]/this._renderService.dimensions.css.cell.height),x:Math.floor(o[0]),y:Math.floor(o[1])}}};r.MouseService=b=u([g(0,l.IRenderService),g(1,l.ICharSizeService)],b)},3230:function(w,r,n){var u=this&&this.__decorate||function(p,v,x,E){var y,k=arguments.length,T=k<3?v:E===null?E=Object.getOwnPropertyDescriptor(v,x):E;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")T=Reflect.decorate(p,v,x,E);else for(var B=p.length-1;B>=0;B--)(y=p[B])&&(T=(k<3?y(T):k>3?y(v,x,T):y(v,x))||T);return k>3&&T&&Object.defineProperty(v,x,T),T},g=this&&this.__param||function(p,v){return function(x,E){v(x,E,p)}};Object.defineProperty(r,"__esModule",{value:!0}),r.RenderService=void 0;const l=n(3656),f=n(6193),b=n(5596),C=n(4725),S=n(8460),o=n(844),d=n(7226),a=n(2585);let h=r.RenderService=class extends o.Disposable{get dimensions(){return this._renderer.value.dimensions}constructor(p,v,x,E,y,k,T,B){if(super(),this._rowCount=p,this._charSizeService=E,this._renderer=this.register(new o.MutableDisposable),this._pausedResizeTask=new d.DebouncedIdleTask,this._isPaused=!1,this._needsFullRefresh=!1,this._isNextRenderRedrawOnly=!0,this._needsSelectionRefresh=!1,this._canvasWidth=0,this._canvasHeight=0,this._selectionState={start:void 0,end:void 0,columnSelectMode:!1},this._onDimensionsChange=this.register(new S.EventEmitter),this.onDimensionsChange=this._onDimensionsChange.event,this._onRenderedViewportChange=this.register(new S.EventEmitter),this.onRenderedViewportChange=this._onRenderedViewportChange.event,this._onRender=this.register(new S.EventEmitter),this.onRender=this._onRender.event,this._onRefreshRequest=this.register(new S.EventEmitter),this.onRefreshRequest=this._onRefreshRequest.event,this._renderDebouncer=new f.RenderDebouncer(T.window,(R,O)=>this._renderRows(R,O)),this.register(this._renderDebouncer),this._screenDprMonitor=new b.ScreenDprMonitor(T.window),this._screenDprMonitor.setListener(()=>this.handleDevicePixelRatioChange()),this.register(this._screenDprMonitor),this.register(k.onResize(()=>this._fullRefresh())),this.register(k.buffers.onBufferActivate(()=>{var R;return(R=this._renderer.value)===null||R===void 0?void 0:R.clear()})),this.register(x.onOptionChange(()=>this._handleOptionsChanged())),this.register(this._charSizeService.onCharSizeChange(()=>this.handleCharSizeChanged())),this.register(y.onDecorationRegistered(()=>this._fullRefresh())),this.register(y.onDecorationRemoved(()=>this._fullRefresh())),this.register(x.onMultipleOptionChange(["customGlyphs","drawBoldTextInBrightColors","letterSpacing","lineHeight","fontFamily","fontSize","fontWeight","fontWeightBold","minimumContrastRatio"],()=>{this.clear(),this.handleResize(k.cols,k.rows),this._fullRefresh()})),this.register(x.onMultipleOptionChange(["cursorBlink","cursorStyle"],()=>this.refreshRows(k.buffer.y,k.buffer.y,!0))),this.register((0,l.addDisposableDomListener)(T.window,"resize",()=>this.handleDevicePixelRatioChange())),this.register(B.onChangeColors(()=>this._fullRefresh())),"IntersectionObserver"in T.window){const R=new T.window.IntersectionObserver(O=>this._handleIntersectionChange(O[O.length-1]),{threshold:0});R.observe(v),this.register({dispose:()=>R.disconnect()})}}_handleIntersectionChange(p){this._isPaused=p.isIntersecting===void 0?p.intersectionRatio===0:!p.isIntersecting,this._isPaused||this._charSizeService.hasValidSize||this._charSizeService.measure(),!this._isPaused&&this._needsFullRefresh&&(this._pausedResizeTask.flush(),this.refreshRows(0,this._rowCount-1),this._needsFullRefresh=!1)}refreshRows(p,v,x=!1){this._isPaused?this._needsFullRefresh=!0:(x||(this._isNextRenderRedrawOnly=!1),this._renderDebouncer.refresh(p,v,this._rowCount))}_renderRows(p,v){this._renderer.value&&(p=Math.min(p,this._rowCount-1),v=Math.min(v,this._rowCount-1),this._renderer.value.renderRows(p,v),this._needsSelectionRefresh&&(this._renderer.value.handleSelectionChanged(this._selectionState.start,this._selectionState.end,this._selectionState.columnSelectMode),this._needsSelectionRefresh=!1),this._isNextRenderRedrawOnly||this._onRenderedViewportChange.fire({start:p,end:v}),this._onRender.fire({start:p,end:v}),this._isNextRenderRedrawOnly=!0)}resize(p,v){this._rowCount=v,this._fireOnCanvasResize()}_handleOptionsChanged(){this._renderer.value&&(this.refreshRows(0,this._rowCount-1),this._fireOnCanvasResize())}_fireOnCanvasResize(){this._renderer.value&&(this._renderer.value.dimensions.css.canvas.width===this._canvasWidth&&this._renderer.value.dimensions.css.canvas.height===this._canvasHeight||this._onDimensionsChange.fire(this._renderer.value.dimensions))}hasRenderer(){return!!this._renderer.value}setRenderer(p){this._renderer.value=p,this._renderer.value.onRequestRedraw(v=>this.refreshRows(v.start,v.end,!0)),this._needsSelectionRefresh=!0,this._fullRefresh()}addRefreshCallback(p){return this._renderDebouncer.addRefreshCallback(p)}_fullRefresh(){this._isPaused?this._needsFullRefresh=!0:this.refreshRows(0,this._rowCount-1)}clearTextureAtlas(){var p,v;this._renderer.value&&((v=(p=this._renderer.value).clearTextureAtlas)===null||v===void 0||v.call(p),this._fullRefresh())}handleDevicePixelRatioChange(){this._charSizeService.measure(),this._renderer.value&&(this._renderer.value.handleDevicePixelRatioChange(),this.refreshRows(0,this._rowCount-1))}handleResize(p,v){this._renderer.value&&(this._isPaused?this._pausedResizeTask.set(()=>this._renderer.value.handleResize(p,v)):this._renderer.value.handleResize(p,v),this._fullRefresh())}handleCharSizeChanged(){var p;(p=this._renderer.value)===null||p===void 0||p.handleCharSizeChanged()}handleBlur(){var p;(p=this._renderer.value)===null||p===void 0||p.handleBlur()}handleFocus(){var p;(p=this._renderer.value)===null||p===void 0||p.handleFocus()}handleSelectionChanged(p,v,x){var E;this._selectionState.start=p,this._selectionState.end=v,this._selectionState.columnSelectMode=x,(E=this._renderer.value)===null||E===void 0||E.handleSelectionChanged(p,v,x)}handleCursorMove(){var p;(p=this._renderer.value)===null||p===void 0||p.handleCursorMove()}clear(){var p;(p=this._renderer.value)===null||p===void 0||p.clear()}};r.RenderService=h=u([g(2,a.IOptionsService),g(3,C.ICharSizeService),g(4,a.IDecorationService),g(5,a.IBufferService),g(6,C.ICoreBrowserService),g(7,C.IThemeService)],h)},9312:function(w,r,n){var u=this&&this.__decorate||function(y,k,T,B){var R,O=arguments.length,z=O<3?k:B===null?B=Object.getOwnPropertyDescriptor(k,T):B;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")z=Reflect.decorate(y,k,T,B);else for(var F=y.length-1;F>=0;F--)(R=y[F])&&(z=(O<3?R(z):O>3?R(k,T,z):R(k,T))||z);return O>3&&z&&Object.defineProperty(k,T,z),z},g=this&&this.__param||function(y,k){return function(T,B){k(T,B,y)}};Object.defineProperty(r,"__esModule",{value:!0}),r.SelectionService=void 0;const l=n(9806),f=n(9504),b=n(456),C=n(4725),S=n(8460),o=n(844),d=n(6114),a=n(4841),h=n(511),p=n(2585),v=String.fromCharCode(160),x=new RegExp(v,"g");let E=r.SelectionService=class extends o.Disposable{constructor(y,k,T,B,R,O,z,F,W){super(),this._element=y,this._screenElement=k,this._linkifier=T,this._bufferService=B,this._coreService=R,this._mouseService=O,this._optionsService=z,this._renderService=F,this._coreBrowserService=W,this._dragScrollAmount=0,this._enabled=!0,this._workCell=new h.CellData,this._mouseDownTimeStamp=0,this._oldHasSelection=!1,this._oldSelectionStart=void 0,this._oldSelectionEnd=void 0,this._onLinuxMouseSelection=this.register(new S.EventEmitter),this.onLinuxMouseSelection=this._onLinuxMouseSelection.event,this._onRedrawRequest=this.register(new S.EventEmitter),this.onRequestRedraw=this._onRedrawRequest.event,this._onSelectionChange=this.register(new S.EventEmitter),this.onSelectionChange=this._onSelectionChange.event,this._onRequestScrollLines=this.register(new S.EventEmitter),this.onRequestScrollLines=this._onRequestScrollLines.event,this._mouseMoveListener=N=>this._handleMouseMove(N),this._mouseUpListener=N=>this._handleMouseUp(N),this._coreService.onUserInput(()=>{this.hasSelection&&this.clearSelection()}),this._trimListener=this._bufferService.buffer.lines.onTrim(N=>this._handleTrim(N)),this.register(this._bufferService.buffers.onBufferActivate(N=>this._handleBufferActivate(N))),this.enable(),this._model=new b.SelectionModel(this._bufferService),this._activeSelectionMode=0,this.register((0,o.toDisposable)(()=>{this._removeMouseDownListeners()}))}reset(){this.clearSelection()}disable(){this.clearSelection(),this._enabled=!1}enable(){this._enabled=!0}get selectionStart(){return this._model.finalSelectionStart}get selectionEnd(){return this._model.finalSelectionEnd}get hasSelection(){const y=this._model.finalSelectionStart,k=this._model.finalSelectionEnd;return!(!y||!k||y[0]===k[0]&&y[1]===k[1])}get selectionText(){const y=this._model.finalSelectionStart,k=this._model.finalSelectionEnd;if(!y||!k)return"";const T=this._bufferService.buffer,B=[];if(this._activeSelectionMode===3){if(y[0]===k[0])return"";const R=y[0]<k[0]?y[0]:k[0],O=y[0]<k[0]?k[0]:y[0];for(let z=y[1];z<=k[1];z++){const F=T.translateBufferLineToString(z,!0,R,O);B.push(F)}}else{const R=y[1]===k[1]?k[0]:void 0;B.push(T.translateBufferLineToString(y[1],!0,y[0],R));for(let O=y[1]+1;O<=k[1]-1;O++){const z=T.lines.get(O),F=T.translateBufferLineToString(O,!0);z!=null&&z.isWrapped?B[B.length-1]+=F:B.push(F)}if(y[1]!==k[1]){const O=T.lines.get(k[1]),z=T.translateBufferLineToString(k[1],!0,0,k[0]);O&&O.isWrapped?B[B.length-1]+=z:B.push(z)}}return B.map(R=>R.replace(x," ")).join(d.isWindows?`\r
`:`
<<<<<<<< HEAD:docs/assets/index.a71393cf.js
`)}clearSelection(){this._model.clearSelection(),this._removeMouseDownListeners(),this.refresh(),this._onSelectionChange.fire()}refresh(y){this._refreshAnimationFrame||(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._refresh())),d.isLinux&&y&&this.selectionText.length&&this._onLinuxMouseSelection.fire(this.selectionText)}_refresh(){this._refreshAnimationFrame=void 0,this._onRedrawRequest.fire({start:this._model.finalSelectionStart,end:this._model.finalSelectionEnd,columnSelectMode:this._activeSelectionMode===3})}_isClickInSelection(y){const k=this._getMouseBufferCoords(y),T=this._model.finalSelectionStart,B=this._model.finalSelectionEnd;return!!(T&&B&&k)&&this._areCoordsInSelection(k,T,B)}isCellInSelection(y,k){const T=this._model.finalSelectionStart,B=this._model.finalSelectionEnd;return!(!T||!B)&&this._areCoordsInSelection([y,k],T,B)}_areCoordsInSelection(y,k,T){return y[1]>k[1]&&y[1]<T[1]||k[1]===T[1]&&y[1]===k[1]&&y[0]>=k[0]&&y[0]<T[0]||k[1]<T[1]&&y[1]===T[1]&&y[0]<T[0]||k[1]<T[1]&&y[1]===k[1]&&y[0]>=k[0]}_selectWordAtCursor(y,k){var T,B;const R=(B=(T=this._linkifier.currentLink)===null||T===void 0?void 0:T.link)===null||B===void 0?void 0:B.range;if(R)return this._model.selectionStart=[R.start.x-1,R.start.y-1],this._model.selectionStartLength=(0,a.getRangeLength)(R,this._bufferService.cols),this._model.selectionEnd=void 0,!0;const O=this._getMouseBufferCoords(y);return!!O&&(this._selectWordAt(O,k),this._model.selectionEnd=void 0,!0)}selectAll(){this._model.isSelectAllActive=!0,this.refresh(),this._onSelectionChange.fire()}selectLines(y,k){this._model.clearSelection(),y=Math.max(y,0),k=Math.min(k,this._bufferService.buffer.lines.length-1),this._model.selectionStart=[0,y],this._model.selectionEnd=[this._bufferService.cols,k],this.refresh(),this._onSelectionChange.fire()}_handleTrim(y){this._model.handleTrim(y)&&this.refresh()}_getMouseBufferCoords(y){const k=this._mouseService.getCoords(y,this._screenElement,this._bufferService.cols,this._bufferService.rows,!0);if(k)return k[0]--,k[1]--,k[1]+=this._bufferService.buffer.ydisp,k}_getMouseEventScrollAmount(y){let k=(0,l.getCoordsRelativeToElement)(this._coreBrowserService.window,y,this._screenElement)[1];const T=this._renderService.dimensions.css.canvas.height;return k>=0&&k<=T?0:(k>T&&(k-=T),k=Math.min(Math.max(k,-50),50),k/=50,k/Math.abs(k)+Math.round(14*k))}shouldForceSelection(y){return d.isMac?y.altKey&&this._optionsService.rawOptions.macOptionClickForcesSelection:y.shiftKey}handleMouseDown(y){if(this._mouseDownTimeStamp=y.timeStamp,(y.button!==2||!this.hasSelection)&&y.button===0){if(!this._enabled){if(!this.shouldForceSelection(y))return;y.stopPropagation()}y.preventDefault(),this._dragScrollAmount=0,this._enabled&&y.shiftKey?this._handleIncrementalClick(y):y.detail===1?this._handleSingleClick(y):y.detail===2?this._handleDoubleClick(y):y.detail===3&&this._handleTripleClick(y),this._addMouseDownListeners(),this.refresh(!0)}}_addMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.addEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.addEventListener("mouseup",this._mouseUpListener)),this._dragScrollIntervalTimer=this._coreBrowserService.window.setInterval(()=>this._dragScroll(),50)}_removeMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.removeEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.removeEventListener("mouseup",this._mouseUpListener)),this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer),this._dragScrollIntervalTimer=void 0}_handleIncrementalClick(y){this._model.selectionStart&&(this._model.selectionEnd=this._getMouseBufferCoords(y))}_handleSingleClick(y){if(this._model.selectionStartLength=0,this._model.isSelectAllActive=!1,this._activeSelectionMode=this.shouldColumnSelect(y)?3:0,this._model.selectionStart=this._getMouseBufferCoords(y),!this._model.selectionStart)return;this._model.selectionEnd=void 0;const k=this._bufferService.buffer.lines.get(this._model.selectionStart[1]);k&&k.length!==this._model.selectionStart[0]&&k.hasWidth(this._model.selectionStart[0])===0&&this._model.selectionStart[0]++}_handleDoubleClick(y){this._selectWordAtCursor(y,!0)&&(this._activeSelectionMode=1)}_handleTripleClick(y){const k=this._getMouseBufferCoords(y);k&&(this._activeSelectionMode=2,this._selectLineAt(k[1]))}shouldColumnSelect(y){return y.altKey&&!(d.isMac&&this._optionsService.rawOptions.macOptionClickForcesSelection)}_handleMouseMove(y){if(y.stopImmediatePropagation(),!this._model.selectionStart)return;const k=this._model.selectionEnd?[this._model.selectionEnd[0],this._model.selectionEnd[1]]:null;if(this._model.selectionEnd=this._getMouseBufferCoords(y),!this._model.selectionEnd)return void this.refresh(!0);this._activeSelectionMode===2?this._model.selectionEnd[1]<this._model.selectionStart[1]?this._model.selectionEnd[0]=0:this._model.selectionEnd[0]=this._bufferService.cols:this._activeSelectionMode===1&&this._selectToWordAt(this._model.selectionEnd),this._dragScrollAmount=this._getMouseEventScrollAmount(y),this._activeSelectionMode!==3&&(this._dragScrollAmount>0?this._model.selectionEnd[0]=this._bufferService.cols:this._dragScrollAmount<0&&(this._model.selectionEnd[0]=0));const T=this._bufferService.buffer;if(this._model.selectionEnd[1]<T.lines.length){const B=T.lines.get(this._model.selectionEnd[1]);B&&B.hasWidth(this._model.selectionEnd[0])===0&&this._model.selectionEnd[0]++}k&&k[0]===this._model.selectionEnd[0]&&k[1]===this._model.selectionEnd[1]||this.refresh(!0)}_dragScroll(){if(this._model.selectionEnd&&this._model.selectionStart&&this._dragScrollAmount){this._onRequestScrollLines.fire({amount:this._dragScrollAmount,suppressScrollEvent:!1});const y=this._bufferService.buffer;this._dragScrollAmount>0?(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=this._bufferService.cols),this._model.selectionEnd[1]=Math.min(y.ydisp+this._bufferService.rows,y.lines.length-1)):(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=0),this._model.selectionEnd[1]=y.ydisp),this.refresh()}}_handleMouseUp(y){const k=y.timeStamp-this._mouseDownTimeStamp;if(this._removeMouseDownListeners(),this.selectionText.length<=1&&k<500&&y.altKey&&this._optionsService.rawOptions.altClickMovesCursor){if(this._bufferService.buffer.ybase===this._bufferService.buffer.ydisp){const T=this._mouseService.getCoords(y,this._element,this._bufferService.cols,this._bufferService.rows,!1);if(T&&T[0]!==void 0&&T[1]!==void 0){const B=(0,f.moveToCellSequence)(T[0]-1,T[1]-1,this._bufferService,this._coreService.decPrivateModes.applicationCursorKeys);this._coreService.triggerDataEvent(B,!0)}}}else this._fireEventIfSelectionChanged()}_fireEventIfSelectionChanged(){const y=this._model.finalSelectionStart,k=this._model.finalSelectionEnd,T=!(!y||!k||y[0]===k[0]&&y[1]===k[1]);T?y&&k&&(this._oldSelectionStart&&this._oldSelectionEnd&&y[0]===this._oldSelectionStart[0]&&y[1]===this._oldSelectionStart[1]&&k[0]===this._oldSelectionEnd[0]&&k[1]===this._oldSelectionEnd[1]||this._fireOnSelectionChange(y,k,T)):this._oldHasSelection&&this._fireOnSelectionChange(y,k,T)}_fireOnSelectionChange(y,k,T){this._oldSelectionStart=y,this._oldSelectionEnd=k,this._oldHasSelection=T,this._onSelectionChange.fire()}_handleBufferActivate(y){this.clearSelection(),this._trimListener.dispose(),this._trimListener=y.activeBuffer.lines.onTrim(k=>this._handleTrim(k))}_convertViewportColToCharacterIndex(y,k){let T=k;for(let B=0;k>=B;B++){const R=y.loadCell(B,this._workCell).getChars().length;this._workCell.getWidth()===0?T--:R>1&&k!==B&&(T+=R-1)}return T}setSelection(y,k,T){this._model.clearSelection(),this._removeMouseDownListeners(),this._model.selectionStart=[y,k],this._model.selectionStartLength=T,this.refresh(),this._fireEventIfSelectionChanged()}rightClickSelect(y){this._isClickInSelection(y)||(this._selectWordAtCursor(y,!1)&&this.refresh(!0),this._fireEventIfSelectionChanged())}_getWordAt(y,k,T=!0,B=!0){if(y[0]>=this._bufferService.cols)return;const R=this._bufferService.buffer,O=R.lines.get(y[1]);if(!O)return;const z=R.translateBufferLineToString(y[1],!1);let F=this._convertViewportColToCharacterIndex(O,y[0]),V=F;const N=y[0]-F;let L=0,$=0,M=0,I=0;if(z.charAt(F)===" "){for(;F>0&&z.charAt(F-1)===" ";)F--;for(;V<z.length&&z.charAt(V+1)===" ";)V++}else{let se=y[0],Z=y[0];O.getWidth(se)===0&&(L++,se--),O.getWidth(Z)===2&&($++,Z++);const be=O.getString(Z).length;for(be>1&&(I+=be-1,V+=be-1);se>0&&F>0&&!this._isCharWordSeparator(O.loadCell(se-1,this._workCell));){O.loadCell(se-1,this._workCell);const D=this._workCell.getChars().length;this._workCell.getWidth()===0?(L++,se--):D>1&&(M+=D-1,F-=D-1),F--,se--}for(;Z<O.length&&V+1<z.length&&!this._isCharWordSeparator(O.loadCell(Z+1,this._workCell));){O.loadCell(Z+1,this._workCell);const D=this._workCell.getChars().length;this._workCell.getWidth()===2?($++,Z++):D>1&&(I+=D-1,V+=D-1),V++,Z++}}V++;let j=F+N-L+M,X=Math.min(this._bufferService.cols,V-F+L+$-M-I);if(k||z.slice(F,V).trim()!==""){if(T&&j===0&&O.getCodePoint(0)!==32){const se=R.lines.get(y[1]-1);if(se&&O.isWrapped&&se.getCodePoint(this._bufferService.cols-1)!==32){const Z=this._getWordAt([this._bufferService.cols-1,y[1]-1],!1,!0,!1);if(Z){const be=this._bufferService.cols-Z.start;j-=be,X+=be}}}if(B&&j+X===this._bufferService.cols&&O.getCodePoint(this._bufferService.cols-1)!==32){const se=R.lines.get(y[1]+1);if((se==null?void 0:se.isWrapped)&&se.getCodePoint(0)!==32){const Z=this._getWordAt([0,y[1]+1],!1,!1,!0);Z&&(X+=Z.length)}}return{start:j,length:X}}}_selectWordAt(y,k){const T=this._getWordAt(y,k);if(T){for(;T.start<0;)T.start+=this._bufferService.cols,y[1]--;this._model.selectionStart=[T.start,y[1]],this._model.selectionStartLength=T.length}}_selectToWordAt(y){const k=this._getWordAt(y,!0);if(k){let T=y[1];for(;k.start<0;)k.start+=this._bufferService.cols,T--;if(!this._model.areSelectionValuesReversed())for(;k.start+k.length>this._bufferService.cols;)k.length-=this._bufferService.cols,T++;this._model.selectionEnd=[this._model.areSelectionValuesReversed()?k.start:k.start+k.length,T]}}_isCharWordSeparator(y){return y.getWidth()!==0&&this._optionsService.rawOptions.wordSeparator.indexOf(y.getChars())>=0}_selectLineAt(y){const k=this._bufferService.buffer.getWrappedRangeForLine(y),T={start:{x:0,y:k.first},end:{x:this._bufferService.cols-1,y:k.last}};this._model.selectionStart=[0,k.first],this._model.selectionEnd=void 0,this._model.selectionStartLength=(0,a.getRangeLength)(T,this._bufferService.cols)}};r.SelectionService=E=u([g(3,p.IBufferService),g(4,p.ICoreService),g(5,C.IMouseService),g(6,p.IOptionsService),g(7,C.IRenderService),g(8,C.ICoreBrowserService)],E)},4725:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.IThemeService=r.ICharacterJoinerService=r.ISelectionService=r.IRenderService=r.IMouseService=r.ICoreBrowserService=r.ICharSizeService=void 0;const u=n(8343);r.ICharSizeService=(0,u.createDecorator)("CharSizeService"),r.ICoreBrowserService=(0,u.createDecorator)("CoreBrowserService"),r.IMouseService=(0,u.createDecorator)("MouseService"),r.IRenderService=(0,u.createDecorator)("RenderService"),r.ISelectionService=(0,u.createDecorator)("SelectionService"),r.ICharacterJoinerService=(0,u.createDecorator)("CharacterJoinerService"),r.IThemeService=(0,u.createDecorator)("ThemeService")},6731:function(S,r,n){var u=this&&this.__decorate||function(E,y,k,T){var B,R=arguments.length,O=R<3?y:T===null?T=Object.getOwnPropertyDescriptor(y,k):T;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")O=Reflect.decorate(E,y,k,T);else for(var z=E.length-1;z>=0;z--)(B=E[z])&&(O=(R<3?B(O):R>3?B(y,k,O):B(y,k))||O);return R>3&&O&&Object.defineProperty(y,k,O),O},g=this&&this.__param||function(E,y){return function(k,T){y(k,T,E)}};Object.defineProperty(r,"__esModule",{value:!0}),r.ThemeService=r.DEFAULT_ANSI_COLORS=void 0;const l=n(7239),f=n(8055),b=n(8460),C=n(844),w=n(2585),o=f.css.toColor("#ffffff"),d=f.css.toColor("#000000"),a=f.css.toColor("#ffffff"),c=f.css.toColor("#000000"),p={css:"rgba(255, 255, 255, 0.3)",rgba:4294967117};r.DEFAULT_ANSI_COLORS=Object.freeze((()=>{const E=[f.css.toColor("#2e3436"),f.css.toColor("#cc0000"),f.css.toColor("#4e9a06"),f.css.toColor("#c4a000"),f.css.toColor("#3465a4"),f.css.toColor("#75507b"),f.css.toColor("#06989a"),f.css.toColor("#d3d7cf"),f.css.toColor("#555753"),f.css.toColor("#ef2929"),f.css.toColor("#8ae234"),f.css.toColor("#fce94f"),f.css.toColor("#729fcf"),f.css.toColor("#ad7fa8"),f.css.toColor("#34e2e2"),f.css.toColor("#eeeeec")],y=[0,95,135,175,215,255];for(let k=0;k<216;k++){const T=y[k/36%6|0],B=y[k/6%6|0],R=y[k%6];E.push({css:f.channels.toCss(T,B,R),rgba:f.channels.toRgba(T,B,R)})}for(let k=0;k<24;k++){const T=8+10*k;E.push({css:f.channels.toCss(T,T,T),rgba:f.channels.toRgba(T,T,T)})}return E})());let v=r.ThemeService=class extends C.Disposable{get colors(){return this._colors}constructor(E){super(),this._optionsService=E,this._contrastCache=new l.ColorContrastCache,this._halfContrastCache=new l.ColorContrastCache,this._onChangeColors=this.register(new b.EventEmitter),this.onChangeColors=this._onChangeColors.event,this._colors={foreground:o,background:d,cursor:a,cursorAccent:c,selectionForeground:void 0,selectionBackgroundTransparent:p,selectionBackgroundOpaque:f.color.blend(d,p),selectionInactiveBackgroundTransparent:p,selectionInactiveBackgroundOpaque:f.color.blend(d,p),ansi:r.DEFAULT_ANSI_COLORS.slice(),contrastCache:this._contrastCache,halfContrastCache:this._halfContrastCache},this._updateRestoreColors(),this._setTheme(this._optionsService.rawOptions.theme),this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio",()=>this._contrastCache.clear())),this.register(this._optionsService.onSpecificOptionChange("theme",()=>this._setTheme(this._optionsService.rawOptions.theme)))}_setTheme(E={}){const y=this._colors;if(y.foreground=x(E.foreground,o),y.background=x(E.background,d),y.cursor=x(E.cursor,a),y.cursorAccent=x(E.cursorAccent,c),y.selectionBackgroundTransparent=x(E.selectionBackground,p),y.selectionBackgroundOpaque=f.color.blend(y.background,y.selectionBackgroundTransparent),y.selectionInactiveBackgroundTransparent=x(E.selectionInactiveBackground,y.selectionBackgroundTransparent),y.selectionInactiveBackgroundOpaque=f.color.blend(y.background,y.selectionInactiveBackgroundTransparent),y.selectionForeground=E.selectionForeground?x(E.selectionForeground,f.NULL_COLOR):void 0,y.selectionForeground===f.NULL_COLOR&&(y.selectionForeground=void 0),f.color.isOpaque(y.selectionBackgroundTransparent)&&(y.selectionBackgroundTransparent=f.color.opacity(y.selectionBackgroundTransparent,.3)),f.color.isOpaque(y.selectionInactiveBackgroundTransparent)&&(y.selectionInactiveBackgroundTransparent=f.color.opacity(y.selectionInactiveBackgroundTransparent,.3)),y.ansi=r.DEFAULT_ANSI_COLORS.slice(),y.ansi[0]=x(E.black,r.DEFAULT_ANSI_COLORS[0]),y.ansi[1]=x(E.red,r.DEFAULT_ANSI_COLORS[1]),y.ansi[2]=x(E.green,r.DEFAULT_ANSI_COLORS[2]),y.ansi[3]=x(E.yellow,r.DEFAULT_ANSI_COLORS[3]),y.ansi[4]=x(E.blue,r.DEFAULT_ANSI_COLORS[4]),y.ansi[5]=x(E.magenta,r.DEFAULT_ANSI_COLORS[5]),y.ansi[6]=x(E.cyan,r.DEFAULT_ANSI_COLORS[6]),y.ansi[7]=x(E.white,r.DEFAULT_ANSI_COLORS[7]),y.ansi[8]=x(E.brightBlack,r.DEFAULT_ANSI_COLORS[8]),y.ansi[9]=x(E.brightRed,r.DEFAULT_ANSI_COLORS[9]),y.ansi[10]=x(E.brightGreen,r.DEFAULT_ANSI_COLORS[10]),y.ansi[11]=x(E.brightYellow,r.DEFAULT_ANSI_COLORS[11]),y.ansi[12]=x(E.brightBlue,r.DEFAULT_ANSI_COLORS[12]),y.ansi[13]=x(E.brightMagenta,r.DEFAULT_ANSI_COLORS[13]),y.ansi[14]=x(E.brightCyan,r.DEFAULT_ANSI_COLORS[14]),y.ansi[15]=x(E.brightWhite,r.DEFAULT_ANSI_COLORS[15]),E.extendedAnsi){const k=Math.min(y.ansi.length-16,E.extendedAnsi.length);for(let T=0;T<k;T++)y.ansi[T+16]=x(E.extendedAnsi[T],r.DEFAULT_ANSI_COLORS[T+16])}this._contrastCache.clear(),this._halfContrastCache.clear(),this._updateRestoreColors(),this._onChangeColors.fire(this.colors)}restoreColor(E){this._restoreColor(E),this._onChangeColors.fire(this.colors)}_restoreColor(E){if(E!==void 0)switch(E){case 256:this._colors.foreground=this._restoreColors.foreground;break;case 257:this._colors.background=this._restoreColors.background;break;case 258:this._colors.cursor=this._restoreColors.cursor;break;default:this._colors.ansi[E]=this._restoreColors.ansi[E]}else for(let y=0;y<this._restoreColors.ansi.length;++y)this._colors.ansi[y]=this._restoreColors.ansi[y]}modifyColors(E){E(this._colors),this._onChangeColors.fire(this.colors)}_updateRestoreColors(){this._restoreColors={foreground:this._colors.foreground,background:this._colors.background,cursor:this._colors.cursor,ansi:this._colors.ansi.slice()}}};function x(E,y){if(E!==void 0)try{return f.css.toColor(E)}catch{}return y}r.ThemeService=v=u([g(0,w.IOptionsService)],v)},6349:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CircularList=void 0;const u=n(8460),g=n(844);class l extends g.Disposable{constructor(b){super(),this._maxLength=b,this.onDeleteEmitter=this.register(new u.EventEmitter),this.onDelete=this.onDeleteEmitter.event,this.onInsertEmitter=this.register(new u.EventEmitter),this.onInsert=this.onInsertEmitter.event,this.onTrimEmitter=this.register(new u.EventEmitter),this.onTrim=this.onTrimEmitter.event,this._array=new Array(this._maxLength),this._startIndex=0,this._length=0}get maxLength(){return this._maxLength}set maxLength(b){if(this._maxLength===b)return;const C=new Array(b);for(let w=0;w<Math.min(b,this.length);w++)C[w]=this._array[this._getCyclicIndex(w)];this._array=C,this._maxLength=b,this._startIndex=0}get length(){return this._length}set length(b){if(b>this._length)for(let C=this._length;C<b;C++)this._array[C]=void 0;this._length=b}get(b){return this._array[this._getCyclicIndex(b)]}set(b,C){this._array[this._getCyclicIndex(b)]=C}push(b){this._array[this._getCyclicIndex(this._length)]=b,this._length===this._maxLength?(this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1)):this._length++}recycle(){if(this._length!==this._maxLength)throw new Error("Can only recycle when the buffer is full");return this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1),this._array[this._getCyclicIndex(this._length-1)]}get isFull(){return this._length===this._maxLength}pop(){return this._array[this._getCyclicIndex(this._length---1)]}splice(b,C,...w){if(C){for(let o=b;o<this._length-C;o++)this._array[this._getCyclicIndex(o)]=this._array[this._getCyclicIndex(o+C)];this._length-=C,this.onDeleteEmitter.fire({index:b,amount:C})}for(let o=this._length-1;o>=b;o--)this._array[this._getCyclicIndex(o+w.length)]=this._array[this._getCyclicIndex(o)];for(let o=0;o<w.length;o++)this._array[this._getCyclicIndex(b+o)]=w[o];if(w.length&&this.onInsertEmitter.fire({index:b,amount:w.length}),this._length+w.length>this._maxLength){const o=this._length+w.length-this._maxLength;this._startIndex+=o,this._length=this._maxLength,this.onTrimEmitter.fire(o)}else this._length+=w.length}trimStart(b){b>this._length&&(b=this._length),this._startIndex+=b,this._length-=b,this.onTrimEmitter.fire(b)}shiftElements(b,C,w){if(!(C<=0)){if(b<0||b>=this._length)throw new Error("start argument out of range");if(b+w<0)throw new Error("Cannot shift elements in list beyond index 0");if(w>0){for(let d=C-1;d>=0;d--)this.set(b+d+w,this.get(b+d));const o=b+C+w-this._length;if(o>0)for(this._length+=o;this._length>this._maxLength;)this._length--,this._startIndex++,this.onTrimEmitter.fire(1)}else for(let o=0;o<C;o++)this.set(b+o+w,this.get(b+o))}}_getCyclicIndex(b){return(this._startIndex+b)%this._maxLength}}r.CircularList=l},1439:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.clone=void 0,r.clone=function n(u,g=5){if(typeof u!="object")return u;const l=Array.isArray(u)?[]:{};for(const f in u)l[f]=g<=1?u[f]:u[f]&&n(u[f],g-1);return l}},8055:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.contrastRatio=r.toPaddedHex=r.rgba=r.rgb=r.css=r.color=r.channels=r.NULL_COLOR=void 0;const u=n(6114);let g=0,l=0,f=0,b=0;var C,w,o,d,a;function c(v){const x=v.toString(16);return x.length<2?"0"+x:x}function p(v,x){return v<x?(x+.05)/(v+.05):(v+.05)/(x+.05)}r.NULL_COLOR={css:"#00000000",rgba:0},function(v){v.toCss=function(x,E,y,k){return k!==void 0?`#${c(x)}${c(E)}${c(y)}${c(k)}`:`#${c(x)}${c(E)}${c(y)}`},v.toRgba=function(x,E,y,k=255){return(x<<24|E<<16|y<<8|k)>>>0}}(C||(r.channels=C={})),function(v){function x(E,y){return b=Math.round(255*y),[g,l,f]=a.toChannels(E.rgba),{css:C.toCss(g,l,f,b),rgba:C.toRgba(g,l,f,b)}}v.blend=function(E,y){if(b=(255&y.rgba)/255,b===1)return{css:y.css,rgba:y.rgba};const k=y.rgba>>24&255,T=y.rgba>>16&255,B=y.rgba>>8&255,R=E.rgba>>24&255,O=E.rgba>>16&255,z=E.rgba>>8&255;return g=R+Math.round((k-R)*b),l=O+Math.round((T-O)*b),f=z+Math.round((B-z)*b),{css:C.toCss(g,l,f),rgba:C.toRgba(g,l,f)}},v.isOpaque=function(E){return(255&E.rgba)==255},v.ensureContrastRatio=function(E,y,k){const T=a.ensureContrastRatio(E.rgba,y.rgba,k);if(T)return a.toColor(T>>24&255,T>>16&255,T>>8&255)},v.opaque=function(E){const y=(255|E.rgba)>>>0;return[g,l,f]=a.toChannels(y),{css:C.toCss(g,l,f),rgba:y}},v.opacity=x,v.multiplyOpacity=function(E,y){return b=255&E.rgba,x(E,b*y/255)},v.toColorRGB=function(E){return[E.rgba>>24&255,E.rgba>>16&255,E.rgba>>8&255]}}(w||(r.color=w={})),function(v){let x,E;if(!u.isNode){const y=document.createElement("canvas");y.width=1,y.height=1;const k=y.getContext("2d",{willReadFrequently:!0});k&&(x=k,x.globalCompositeOperation="copy",E=x.createLinearGradient(0,0,1,1))}v.toColor=function(y){if(y.match(/#[\da-f]{3,8}/i))switch(y.length){case 4:return g=parseInt(y.slice(1,2).repeat(2),16),l=parseInt(y.slice(2,3).repeat(2),16),f=parseInt(y.slice(3,4).repeat(2),16),a.toColor(g,l,f);case 5:return g=parseInt(y.slice(1,2).repeat(2),16),l=parseInt(y.slice(2,3).repeat(2),16),f=parseInt(y.slice(3,4).repeat(2),16),b=parseInt(y.slice(4,5).repeat(2),16),a.toColor(g,l,f,b);case 7:return{css:y,rgba:(parseInt(y.slice(1),16)<<8|255)>>>0};case 9:return{css:y,rgba:parseInt(y.slice(1),16)>>>0}}const k=y.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);if(k)return g=parseInt(k[1]),l=parseInt(k[2]),f=parseInt(k[3]),b=Math.round(255*(k[5]===void 0?1:parseFloat(k[5]))),a.toColor(g,l,f,b);if(!x||!E)throw new Error("css.toColor: Unsupported css format");if(x.fillStyle=E,x.fillStyle=y,typeof x.fillStyle!="string")throw new Error("css.toColor: Unsupported css format");if(x.fillRect(0,0,1,1),[g,l,f,b]=x.getImageData(0,0,1,1).data,b!==255)throw new Error("css.toColor: Unsupported css format");return{rgba:C.toRgba(g,l,f,b),css:y}}}(o||(r.css=o={})),function(v){function x(E,y,k){const T=E/255,B=y/255,R=k/255;return .2126*(T<=.03928?T/12.92:Math.pow((T+.055)/1.055,2.4))+.7152*(B<=.03928?B/12.92:Math.pow((B+.055)/1.055,2.4))+.0722*(R<=.03928?R/12.92:Math.pow((R+.055)/1.055,2.4))}v.relativeLuminance=function(E){return x(E>>16&255,E>>8&255,255&E)},v.relativeLuminance2=x}(d||(r.rgb=d={})),function(v){function x(y,k,T){const B=y>>24&255,R=y>>16&255,O=y>>8&255;let z=k>>24&255,F=k>>16&255,V=k>>8&255,N=p(d.relativeLuminance2(z,F,V),d.relativeLuminance2(B,R,O));for(;N<T&&(z>0||F>0||V>0);)z-=Math.max(0,Math.ceil(.1*z)),F-=Math.max(0,Math.ceil(.1*F)),V-=Math.max(0,Math.ceil(.1*V)),N=p(d.relativeLuminance2(z,F,V),d.relativeLuminance2(B,R,O));return(z<<24|F<<16|V<<8|255)>>>0}function E(y,k,T){const B=y>>24&255,R=y>>16&255,O=y>>8&255;let z=k>>24&255,F=k>>16&255,V=k>>8&255,N=p(d.relativeLuminance2(z,F,V),d.relativeLuminance2(B,R,O));for(;N<T&&(z<255||F<255||V<255);)z=Math.min(255,z+Math.ceil(.1*(255-z))),F=Math.min(255,F+Math.ceil(.1*(255-F))),V=Math.min(255,V+Math.ceil(.1*(255-V))),N=p(d.relativeLuminance2(z,F,V),d.relativeLuminance2(B,R,O));return(z<<24|F<<16|V<<8|255)>>>0}v.ensureContrastRatio=function(y,k,T){const B=d.relativeLuminance(y>>8),R=d.relativeLuminance(k>>8);if(p(B,R)<T){if(R<B){const F=x(y,k,T),V=p(B,d.relativeLuminance(F>>8));if(V<T){const N=E(y,k,T);return V>p(B,d.relativeLuminance(N>>8))?F:N}return F}const O=E(y,k,T),z=p(B,d.relativeLuminance(O>>8));if(z<T){const F=x(y,k,T);return z>p(B,d.relativeLuminance(F>>8))?O:F}return O}},v.reduceLuminance=x,v.increaseLuminance=E,v.toChannels=function(y){return[y>>24&255,y>>16&255,y>>8&255,255&y]},v.toColor=function(y,k,T,B){return{css:C.toCss(y,k,T,B),rgba:C.toRgba(y,k,T,B)}}}(a||(r.rgba=a={})),r.toPaddedHex=c,r.contrastRatio=p},8969:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CoreTerminal=void 0;const u=n(844),g=n(2585),l=n(4348),f=n(7866),b=n(744),C=n(7302),w=n(6975),o=n(8460),d=n(1753),a=n(1480),c=n(7994),p=n(9282),v=n(5435),x=n(5981),E=n(2660);let y=!1;class k extends u.Disposable{get onScroll(){return this._onScrollApi||(this._onScrollApi=this.register(new o.EventEmitter),this._onScroll.event(B=>{var R;(R=this._onScrollApi)===null||R===void 0||R.fire(B.position)})),this._onScrollApi.event}get cols(){return this._bufferService.cols}get rows(){return this._bufferService.rows}get buffers(){return this._bufferService.buffers}get options(){return this.optionsService.options}set options(B){for(const R in B)this.optionsService.options[R]=B[R]}constructor(B){super(),this._windowsWrappingHeuristics=this.register(new u.MutableDisposable),this._onBinary=this.register(new o.EventEmitter),this.onBinary=this._onBinary.event,this._onData=this.register(new o.EventEmitter),this.onData=this._onData.event,this._onLineFeed=this.register(new o.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onResize=this.register(new o.EventEmitter),this.onResize=this._onResize.event,this._onWriteParsed=this.register(new o.EventEmitter),this.onWriteParsed=this._onWriteParsed.event,this._onScroll=this.register(new o.EventEmitter),this._instantiationService=new l.InstantiationService,this.optionsService=this.register(new C.OptionsService(B)),this._instantiationService.setService(g.IOptionsService,this.optionsService),this._bufferService=this.register(this._instantiationService.createInstance(b.BufferService)),this._instantiationService.setService(g.IBufferService,this._bufferService),this._logService=this.register(this._instantiationService.createInstance(f.LogService)),this._instantiationService.setService(g.ILogService,this._logService),this.coreService=this.register(this._instantiationService.createInstance(w.CoreService)),this._instantiationService.setService(g.ICoreService,this.coreService),this.coreMouseService=this.register(this._instantiationService.createInstance(d.CoreMouseService)),this._instantiationService.setService(g.ICoreMouseService,this.coreMouseService),this.unicodeService=this.register(this._instantiationService.createInstance(a.UnicodeService)),this._instantiationService.setService(g.IUnicodeService,this.unicodeService),this._charsetService=this._instantiationService.createInstance(c.CharsetService),this._instantiationService.setService(g.ICharsetService,this._charsetService),this._oscLinkService=this._instantiationService.createInstance(E.OscLinkService),this._instantiationService.setService(g.IOscLinkService,this._oscLinkService),this._inputHandler=this.register(new v.InputHandler(this._bufferService,this._charsetService,this.coreService,this._logService,this.optionsService,this._oscLinkService,this.coreMouseService,this.unicodeService)),this.register((0,o.forwardEvent)(this._inputHandler.onLineFeed,this._onLineFeed)),this.register(this._inputHandler),this.register((0,o.forwardEvent)(this._bufferService.onResize,this._onResize)),this.register((0,o.forwardEvent)(this.coreService.onData,this._onData)),this.register((0,o.forwardEvent)(this.coreService.onBinary,this._onBinary)),this.register(this.coreService.onRequestScrollToBottom(()=>this.scrollToBottom())),this.register(this.coreService.onUserInput(()=>this._writeBuffer.handleUserInput())),this.register(this.optionsService.onMultipleOptionChange(["windowsMode","windowsPty"],()=>this._handleWindowsPtyOptionChange())),this.register(this._bufferService.onScroll(R=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)})),this.register(this._inputHandler.onScroll(R=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)})),this._writeBuffer=this.register(new x.WriteBuffer((R,O)=>this._inputHandler.parse(R,O))),this.register((0,o.forwardEvent)(this._writeBuffer.onWriteParsed,this._onWriteParsed))}write(B,R){this._writeBuffer.write(B,R)}writeSync(B,R){this._logService.logLevel<=g.LogLevelEnum.WARN&&!y&&(this._logService.warn("writeSync is unreliable and will be removed soon."),y=!0),this._writeBuffer.writeSync(B,R)}resize(B,R){isNaN(B)||isNaN(R)||(B=Math.max(B,b.MINIMUM_COLS),R=Math.max(R,b.MINIMUM_ROWS),this._bufferService.resize(B,R))}scroll(B,R=!1){this._bufferService.scroll(B,R)}scrollLines(B,R,O){this._bufferService.scrollLines(B,R,O)}scrollPages(B){this.scrollLines(B*(this.rows-1))}scrollToTop(){this.scrollLines(-this._bufferService.buffer.ydisp)}scrollToBottom(){this.scrollLines(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp)}scrollToLine(B){const R=B-this._bufferService.buffer.ydisp;R!==0&&this.scrollLines(R)}registerEscHandler(B,R){return this._inputHandler.registerEscHandler(B,R)}registerDcsHandler(B,R){return this._inputHandler.registerDcsHandler(B,R)}registerCsiHandler(B,R){return this._inputHandler.registerCsiHandler(B,R)}registerOscHandler(B,R){return this._inputHandler.registerOscHandler(B,R)}_setup(){this._handleWindowsPtyOptionChange()}reset(){this._inputHandler.reset(),this._bufferService.reset(),this._charsetService.reset(),this.coreService.reset(),this.coreMouseService.reset()}_handleWindowsPtyOptionChange(){let B=!1;const R=this.optionsService.rawOptions.windowsPty;R&&R.buildNumber!==void 0&&R.buildNumber!==void 0?B=R.backend==="conpty"&&R.buildNumber<21376:this.optionsService.rawOptions.windowsMode&&(B=!0),B?this._enableWindowsWrappingHeuristics():this._windowsWrappingHeuristics.clear()}_enableWindowsWrappingHeuristics(){if(!this._windowsWrappingHeuristics.value){const B=[];B.push(this.onLineFeed(p.updateWindowsModeWrappedState.bind(null,this._bufferService))),B.push(this.registerCsiHandler({final:"H"},()=>((0,p.updateWindowsModeWrappedState)(this._bufferService),!1))),this._windowsWrappingHeuristics.value=(0,u.toDisposable)(()=>{for(const R of B)R.dispose()})}}}r.CoreTerminal=k},8460:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.forwardEvent=r.EventEmitter=void 0,r.EventEmitter=class{constructor(){this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=n=>(this._listeners.push(n),{dispose:()=>{if(!this._disposed){for(let u=0;u<this._listeners.length;u++)if(this._listeners[u]===n)return void this._listeners.splice(u,1)}}})),this._event}fire(n,u){const g=[];for(let l=0;l<this._listeners.length;l++)g.push(this._listeners[l]);for(let l=0;l<g.length;l++)g[l].call(void 0,n,u)}dispose(){this.clearListeners(),this._disposed=!0}clearListeners(){this._listeners&&(this._listeners.length=0)}},r.forwardEvent=function(n,u){return n(g=>u.fire(g))}},5435:function(S,r,n){var u=this&&this.__decorate||function(N,L,$,M){var I,j=arguments.length,X=j<3?L:M===null?M=Object.getOwnPropertyDescriptor(L,$):M;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")X=Reflect.decorate(N,L,$,M);else for(var se=N.length-1;se>=0;se--)(I=N[se])&&(X=(j<3?I(X):j>3?I(L,$,X):I(L,$))||X);return j>3&&X&&Object.defineProperty(L,$,X),X},g=this&&this.__param||function(N,L){return function($,M){L($,M,N)}};Object.defineProperty(r,"__esModule",{value:!0}),r.InputHandler=r.WindowsOptionsReportType=void 0;const l=n(2584),f=n(7116),b=n(2015),C=n(844),w=n(482),o=n(8437),d=n(8460),a=n(643),c=n(511),p=n(3734),v=n(2585),x=n(6242),E=n(6351),y=n(5941),k={"(":0,")":1,"*":2,"+":3,"-":1,".":2},T=131072;function B(N,L){if(N>24)return L.setWinLines||!1;switch(N){case 1:return!!L.restoreWin;case 2:return!!L.minimizeWin;case 3:return!!L.setWinPosition;case 4:return!!L.setWinSizePixels;case 5:return!!L.raiseWin;case 6:return!!L.lowerWin;case 7:return!!L.refreshWin;case 8:return!!L.setWinSizeChars;case 9:return!!L.maximizeWin;case 10:return!!L.fullscreenWin;case 11:return!!L.getWinState;case 13:return!!L.getWinPosition;case 14:return!!L.getWinSizePixels;case 15:return!!L.getScreenSizePixels;case 16:return!!L.getCellSizePixels;case 18:return!!L.getWinSizeChars;case 19:return!!L.getScreenSizeChars;case 20:return!!L.getIconTitle;case 21:return!!L.getWinTitle;case 22:return!!L.pushTitle;case 23:return!!L.popTitle;case 24:return!!L.setWinLines}return!1}var R;(function(N){N[N.GET_WIN_SIZE_PIXELS=0]="GET_WIN_SIZE_PIXELS",N[N.GET_CELL_SIZE_PIXELS=1]="GET_CELL_SIZE_PIXELS"})(R||(r.WindowsOptionsReportType=R={}));let O=0;class z extends C.Disposable{getAttrData(){return this._curAttrData}constructor(L,$,M,I,j,X,se,Z,be=new b.EscapeSequenceParser){super(),this._bufferService=L,this._charsetService=$,this._coreService=M,this._logService=I,this._optionsService=j,this._oscLinkService=X,this._coreMouseService=se,this._unicodeService=Z,this._parser=be,this._parseBuffer=new Uint32Array(4096),this._stringDecoder=new w.StringToUtf32,this._utf8Decoder=new w.Utf8ToUtf32,this._workCell=new c.CellData,this._windowTitle="",this._iconName="",this._windowTitleStack=[],this._iconNameStack=[],this._curAttrData=o.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=o.DEFAULT_ATTR_DATA.clone(),this._onRequestBell=this.register(new d.EventEmitter),this.onRequestBell=this._onRequestBell.event,this._onRequestRefreshRows=this.register(new d.EventEmitter),this.onRequestRefreshRows=this._onRequestRefreshRows.event,this._onRequestReset=this.register(new d.EventEmitter),this.onRequestReset=this._onRequestReset.event,this._onRequestSendFocus=this.register(new d.EventEmitter),this.onRequestSendFocus=this._onRequestSendFocus.event,this._onRequestSyncScrollBar=this.register(new d.EventEmitter),this.onRequestSyncScrollBar=this._onRequestSyncScrollBar.event,this._onRequestWindowsOptionsReport=this.register(new d.EventEmitter),this.onRequestWindowsOptionsReport=this._onRequestWindowsOptionsReport.event,this._onA11yChar=this.register(new d.EventEmitter),this.onA11yChar=this._onA11yChar.event,this._onA11yTab=this.register(new d.EventEmitter),this.onA11yTab=this._onA11yTab.event,this._onCursorMove=this.register(new d.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onLineFeed=this.register(new d.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onScroll=this.register(new d.EventEmitter),this.onScroll=this._onScroll.event,this._onTitleChange=this.register(new d.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onColor=this.register(new d.EventEmitter),this.onColor=this._onColor.event,this._parseStack={paused:!1,cursorStartX:0,cursorStartY:0,decodedLength:0,position:0},this._specialColors=[256,257,258],this.register(this._parser),this._dirtyRowTracker=new F(this._bufferService),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate(D=>this._activeBuffer=D.activeBuffer)),this._parser.setCsiHandlerFallback((D,P)=>{this._logService.debug("Unknown CSI code: ",{identifier:this._parser.identToString(D),params:P.toArray()})}),this._parser.setEscHandlerFallback(D=>{this._logService.debug("Unknown ESC code: ",{identifier:this._parser.identToString(D)})}),this._parser.setExecuteHandlerFallback(D=>{this._logService.debug("Unknown EXECUTE code: ",{code:D})}),this._parser.setOscHandlerFallback((D,P,U)=>{this._logService.debug("Unknown OSC code: ",{identifier:D,action:P,data:U})}),this._parser.setDcsHandlerFallback((D,P,U)=>{P==="HOOK"&&(U=U.toArray()),this._logService.debug("Unknown DCS code: ",{identifier:this._parser.identToString(D),action:P,payload:U})}),this._parser.setPrintHandler((D,P,U)=>this.print(D,P,U)),this._parser.registerCsiHandler({final:"@"},D=>this.insertChars(D)),this._parser.registerCsiHandler({intermediates:" ",final:"@"},D=>this.scrollLeft(D)),this._parser.registerCsiHandler({final:"A"},D=>this.cursorUp(D)),this._parser.registerCsiHandler({intermediates:" ",final:"A"},D=>this.scrollRight(D)),this._parser.registerCsiHandler({final:"B"},D=>this.cursorDown(D)),this._parser.registerCsiHandler({final:"C"},D=>this.cursorForward(D)),this._parser.registerCsiHandler({final:"D"},D=>this.cursorBackward(D)),this._parser.registerCsiHandler({final:"E"},D=>this.cursorNextLine(D)),this._parser.registerCsiHandler({final:"F"},D=>this.cursorPrecedingLine(D)),this._parser.registerCsiHandler({final:"G"},D=>this.cursorCharAbsolute(D)),this._parser.registerCsiHandler({final:"H"},D=>this.cursorPosition(D)),this._parser.registerCsiHandler({final:"I"},D=>this.cursorForwardTab(D)),this._parser.registerCsiHandler({final:"J"},D=>this.eraseInDisplay(D,!1)),this._parser.registerCsiHandler({prefix:"?",final:"J"},D=>this.eraseInDisplay(D,!0)),this._parser.registerCsiHandler({final:"K"},D=>this.eraseInLine(D,!1)),this._parser.registerCsiHandler({prefix:"?",final:"K"},D=>this.eraseInLine(D,!0)),this._parser.registerCsiHandler({final:"L"},D=>this.insertLines(D)),this._parser.registerCsiHandler({final:"M"},D=>this.deleteLines(D)),this._parser.registerCsiHandler({final:"P"},D=>this.deleteChars(D)),this._parser.registerCsiHandler({final:"S"},D=>this.scrollUp(D)),this._parser.registerCsiHandler({final:"T"},D=>this.scrollDown(D)),this._parser.registerCsiHandler({final:"X"},D=>this.eraseChars(D)),this._parser.registerCsiHandler({final:"Z"},D=>this.cursorBackwardTab(D)),this._parser.registerCsiHandler({final:"`"},D=>this.charPosAbsolute(D)),this._parser.registerCsiHandler({final:"a"},D=>this.hPositionRelative(D)),this._parser.registerCsiHandler({final:"b"},D=>this.repeatPrecedingCharacter(D)),this._parser.registerCsiHandler({final:"c"},D=>this.sendDeviceAttributesPrimary(D)),this._parser.registerCsiHandler({prefix:">",final:"c"},D=>this.sendDeviceAttributesSecondary(D)),this._parser.registerCsiHandler({final:"d"},D=>this.linePosAbsolute(D)),this._parser.registerCsiHandler({final:"e"},D=>this.vPositionRelative(D)),this._parser.registerCsiHandler({final:"f"},D=>this.hVPosition(D)),this._parser.registerCsiHandler({final:"g"},D=>this.tabClear(D)),this._parser.registerCsiHandler({final:"h"},D=>this.setMode(D)),this._parser.registerCsiHandler({prefix:"?",final:"h"},D=>this.setModePrivate(D)),this._parser.registerCsiHandler({final:"l"},D=>this.resetMode(D)),this._parser.registerCsiHandler({prefix:"?",final:"l"},D=>this.resetModePrivate(D)),this._parser.registerCsiHandler({final:"m"},D=>this.charAttributes(D)),this._parser.registerCsiHandler({final:"n"},D=>this.deviceStatus(D)),this._parser.registerCsiHandler({prefix:"?",final:"n"},D=>this.deviceStatusPrivate(D)),this._parser.registerCsiHandler({intermediates:"!",final:"p"},D=>this.softReset(D)),this._parser.registerCsiHandler({intermediates:" ",final:"q"},D=>this.setCursorStyle(D)),this._parser.registerCsiHandler({final:"r"},D=>this.setScrollRegion(D)),this._parser.registerCsiHandler({final:"s"},D=>this.saveCursor(D)),this._parser.registerCsiHandler({final:"t"},D=>this.windowOptions(D)),this._parser.registerCsiHandler({final:"u"},D=>this.restoreCursor(D)),this._parser.registerCsiHandler({intermediates:"'",final:"}"},D=>this.insertColumns(D)),this._parser.registerCsiHandler({intermediates:"'",final:"~"},D=>this.deleteColumns(D)),this._parser.registerCsiHandler({intermediates:'"',final:"q"},D=>this.selectProtected(D)),this._parser.registerCsiHandler({intermediates:"$",final:"p"},D=>this.requestMode(D,!0)),this._parser.registerCsiHandler({prefix:"?",intermediates:"$",final:"p"},D=>this.requestMode(D,!1)),this._parser.setExecuteHandler(l.C0.BEL,()=>this.bell()),this._parser.setExecuteHandler(l.C0.LF,()=>this.lineFeed()),this._parser.setExecuteHandler(l.C0.VT,()=>this.lineFeed()),this._parser.setExecuteHandler(l.C0.FF,()=>this.lineFeed()),this._parser.setExecuteHandler(l.C0.CR,()=>this.carriageReturn()),this._parser.setExecuteHandler(l.C0.BS,()=>this.backspace()),this._parser.setExecuteHandler(l.C0.HT,()=>this.tab()),this._parser.setExecuteHandler(l.C0.SO,()=>this.shiftOut()),this._parser.setExecuteHandler(l.C0.SI,()=>this.shiftIn()),this._parser.setExecuteHandler(l.C1.IND,()=>this.index()),this._parser.setExecuteHandler(l.C1.NEL,()=>this.nextLine()),this._parser.setExecuteHandler(l.C1.HTS,()=>this.tabSet()),this._parser.registerOscHandler(0,new x.OscHandler(D=>(this.setTitle(D),this.setIconName(D),!0))),this._parser.registerOscHandler(1,new x.OscHandler(D=>this.setIconName(D))),this._parser.registerOscHandler(2,new x.OscHandler(D=>this.setTitle(D))),this._parser.registerOscHandler(4,new x.OscHandler(D=>this.setOrReportIndexedColor(D))),this._parser.registerOscHandler(8,new x.OscHandler(D=>this.setHyperlink(D))),this._parser.registerOscHandler(10,new x.OscHandler(D=>this.setOrReportFgColor(D))),this._parser.registerOscHandler(11,new x.OscHandler(D=>this.setOrReportBgColor(D))),this._parser.registerOscHandler(12,new x.OscHandler(D=>this.setOrReportCursorColor(D))),this._parser.registerOscHandler(104,new x.OscHandler(D=>this.restoreIndexedColor(D))),this._parser.registerOscHandler(110,new x.OscHandler(D=>this.restoreFgColor(D))),this._parser.registerOscHandler(111,new x.OscHandler(D=>this.restoreBgColor(D))),this._parser.registerOscHandler(112,new x.OscHandler(D=>this.restoreCursorColor(D))),this._parser.registerEscHandler({final:"7"},()=>this.saveCursor()),this._parser.registerEscHandler({final:"8"},()=>this.restoreCursor()),this._parser.registerEscHandler({final:"D"},()=>this.index()),this._parser.registerEscHandler({final:"E"},()=>this.nextLine()),this._parser.registerEscHandler({final:"H"},()=>this.tabSet()),this._parser.registerEscHandler({final:"M"},()=>this.reverseIndex()),this._parser.registerEscHandler({final:"="},()=>this.keypadApplicationMode()),this._parser.registerEscHandler({final:">"},()=>this.keypadNumericMode()),this._parser.registerEscHandler({final:"c"},()=>this.fullReset()),this._parser.registerEscHandler({final:"n"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"o"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"|"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"}"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"~"},()=>this.setgLevel(1)),this._parser.registerEscHandler({intermediates:"%",final:"@"},()=>this.selectDefaultCharset()),this._parser.registerEscHandler({intermediates:"%",final:"G"},()=>this.selectDefaultCharset());for(const D in f.CHARSETS)this._parser.registerEscHandler({intermediates:"(",final:D},()=>this.selectCharset("("+D)),this._parser.registerEscHandler({intermediates:")",final:D},()=>this.selectCharset(")"+D)),this._parser.registerEscHandler({intermediates:"*",final:D},()=>this.selectCharset("*"+D)),this._parser.registerEscHandler({intermediates:"+",final:D},()=>this.selectCharset("+"+D)),this._parser.registerEscHandler({intermediates:"-",final:D},()=>this.selectCharset("-"+D)),this._parser.registerEscHandler({intermediates:".",final:D},()=>this.selectCharset("."+D)),this._parser.registerEscHandler({intermediates:"/",final:D},()=>this.selectCharset("/"+D));this._parser.registerEscHandler({intermediates:"#",final:"8"},()=>this.screenAlignmentPattern()),this._parser.setErrorHandler(D=>(this._logService.error("Parsing error: ",D),D)),this._parser.registerDcsHandler({intermediates:"$",final:"q"},new E.DcsHandler((D,P)=>this.requestStatusString(D,P)))}_preserveStack(L,$,M,I){this._parseStack.paused=!0,this._parseStack.cursorStartX=L,this._parseStack.cursorStartY=$,this._parseStack.decodedLength=M,this._parseStack.position=I}_logSlowResolvingAsync(L){this._logService.logLevel<=v.LogLevelEnum.WARN&&Promise.race([L,new Promise(($,M)=>setTimeout(()=>M("#SLOW_TIMEOUT"),5e3))]).catch($=>{if($!=="#SLOW_TIMEOUT")throw $;console.warn("async parser handler taking longer than 5000 ms")})}_getCurrentLinkId(){return this._curAttrData.extended.urlId}parse(L,$){let M,I=this._activeBuffer.x,j=this._activeBuffer.y,X=0;const se=this._parseStack.paused;if(se){if(M=this._parser.parse(this._parseBuffer,this._parseStack.decodedLength,$))return this._logSlowResolvingAsync(M),M;I=this._parseStack.cursorStartX,j=this._parseStack.cursorStartY,this._parseStack.paused=!1,L.length>T&&(X=this._parseStack.position+T)}if(this._logService.logLevel<=v.LogLevelEnum.DEBUG&&this._logService.debug("parsing data"+(typeof L=="string"?` "${L}"`:` "${Array.prototype.map.call(L,Z=>String.fromCharCode(Z)).join("")}"`),typeof L=="string"?L.split("").map(Z=>Z.charCodeAt(0)):L),this._parseBuffer.length<L.length&&this._parseBuffer.length<T&&(this._parseBuffer=new Uint32Array(Math.min(L.length,T))),se||this._dirtyRowTracker.clearRange(),L.length>T)for(let Z=X;Z<L.length;Z+=T){const be=Z+T<L.length?Z+T:L.length,D=typeof L=="string"?this._stringDecoder.decode(L.substring(Z,be),this._parseBuffer):this._utf8Decoder.decode(L.subarray(Z,be),this._parseBuffer);if(M=this._parser.parse(this._parseBuffer,D))return this._preserveStack(I,j,D,Z),this._logSlowResolvingAsync(M),M}else if(!se){const Z=typeof L=="string"?this._stringDecoder.decode(L,this._parseBuffer):this._utf8Decoder.decode(L,this._parseBuffer);if(M=this._parser.parse(this._parseBuffer,Z))return this._preserveStack(I,j,Z,0),this._logSlowResolvingAsync(M),M}this._activeBuffer.x===I&&this._activeBuffer.y===j||this._onCursorMove.fire(),this._onRequestRefreshRows.fire(this._dirtyRowTracker.start,this._dirtyRowTracker.end)}print(L,$,M){let I,j;const X=this._charsetService.charset,se=this._optionsService.rawOptions.screenReaderMode,Z=this._bufferService.cols,be=this._coreService.decPrivateModes.wraparound,D=this._coreService.modes.insertMode,P=this._curAttrData;let U=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._activeBuffer.x&&M-$>0&&U.getWidth(this._activeBuffer.x-1)===2&&U.setCellFromCodePoint(this._activeBuffer.x-1,0,1,P.fg,P.bg,P.extended);for(let H=$;H<M;++H){if(I=L[H],j=this._unicodeService.wcwidth(I),I<127&&X){const re=X[String.fromCharCode(I)];re&&(I=re.charCodeAt(0))}if(se&&this._onA11yChar.fire((0,w.stringFromCodePoint)(I)),this._getCurrentLinkId()&&this._oscLinkService.addLineToLink(this._getCurrentLinkId(),this._activeBuffer.ybase+this._activeBuffer.y),j||!this._activeBuffer.x){if(this._activeBuffer.x+j-1>=Z){if(be){for(;this._activeBuffer.x<Z;)U.setCellFromCodePoint(this._activeBuffer.x++,0,1,P.fg,P.bg,P.extended);this._activeBuffer.x=0,this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData(),!0)):(this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!0),U=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y)}else if(this._activeBuffer.x=Z-1,j===2)continue}if(D&&(U.insertCells(this._activeBuffer.x,j,this._activeBuffer.getNullCell(P),P),U.getWidth(Z-1)===2&&U.setCellFromCodePoint(Z-1,a.NULL_CELL_CODE,a.NULL_CELL_WIDTH,P.fg,P.bg,P.extended)),U.setCellFromCodePoint(this._activeBuffer.x++,I,j,P.fg,P.bg,P.extended),j>0)for(;--j;)U.setCellFromCodePoint(this._activeBuffer.x++,0,0,P.fg,P.bg,P.extended)}else U.getWidth(this._activeBuffer.x-1)?U.addCodepointToCell(this._activeBuffer.x-1,I):U.addCodepointToCell(this._activeBuffer.x-2,I)}M-$>0&&(U.loadCell(this._activeBuffer.x-1,this._workCell),this._workCell.getWidth()===2||this._workCell.getCode()>65535?this._parser.precedingCodepoint=0:this._workCell.isCombined()?this._parser.precedingCodepoint=this._workCell.getChars().charCodeAt(0):this._parser.precedingCodepoint=this._workCell.content),this._activeBuffer.x<Z&&M-$>0&&U.getWidth(this._activeBuffer.x)===0&&!U.hasContent(this._activeBuffer.x)&&U.setCellFromCodePoint(this._activeBuffer.x,0,1,P.fg,P.bg,P.extended),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}registerCsiHandler(L,$){return L.final!=="t"||L.prefix||L.intermediates?this._parser.registerCsiHandler(L,$):this._parser.registerCsiHandler(L,M=>!B(M.params[0],this._optionsService.rawOptions.windowOptions)||$(M))}registerDcsHandler(L,$){return this._parser.registerDcsHandler(L,new E.DcsHandler($))}registerEscHandler(L,$){return this._parser.registerEscHandler(L,$)}registerOscHandler(L,$){return this._parser.registerOscHandler(L,new x.OscHandler($))}bell(){return this._onRequestBell.fire(),!0}lineFeed(){return this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._optionsService.rawOptions.convertEol&&(this._activeBuffer.x=0),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows?this._activeBuffer.y=this._bufferService.rows-1:this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.x>=this._bufferService.cols&&this._activeBuffer.x--,this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._onLineFeed.fire(),!0}carriageReturn(){return this._activeBuffer.x=0,!0}backspace(){var L;if(!this._coreService.decPrivateModes.reverseWraparound)return this._restrictCursor(),this._activeBuffer.x>0&&this._activeBuffer.x--,!0;if(this._restrictCursor(this._bufferService.cols),this._activeBuffer.x>0)this._activeBuffer.x--;else if(this._activeBuffer.x===0&&this._activeBuffer.y>this._activeBuffer.scrollTop&&this._activeBuffer.y<=this._activeBuffer.scrollBottom&&((L=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y))===null||L===void 0?void 0:L.isWrapped)){this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.y--,this._activeBuffer.x=this._bufferService.cols-1;const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);$.hasWidth(this._activeBuffer.x)&&!$.hasContent(this._activeBuffer.x)&&this._activeBuffer.x--}return this._restrictCursor(),!0}tab(){if(this._activeBuffer.x>=this._bufferService.cols)return!0;const L=this._activeBuffer.x;return this._activeBuffer.x=this._activeBuffer.nextStop(),this._optionsService.rawOptions.screenReaderMode&&this._onA11yTab.fire(this._activeBuffer.x-L),!0}shiftOut(){return this._charsetService.setgLevel(1),!0}shiftIn(){return this._charsetService.setgLevel(0),!0}_restrictCursor(L=this._bufferService.cols-1){this._activeBuffer.x=Math.min(L,Math.max(0,this._activeBuffer.x)),this._activeBuffer.y=this._coreService.decPrivateModes.origin?Math.min(this._activeBuffer.scrollBottom,Math.max(this._activeBuffer.scrollTop,this._activeBuffer.y)):Math.min(this._bufferService.rows-1,Math.max(0,this._activeBuffer.y)),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_setCursor(L,$){this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._coreService.decPrivateModes.origin?(this._activeBuffer.x=L,this._activeBuffer.y=this._activeBuffer.scrollTop+$):(this._activeBuffer.x=L,this._activeBuffer.y=$),this._restrictCursor(),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_moveCursor(L,$){this._restrictCursor(),this._setCursor(this._activeBuffer.x+L,this._activeBuffer.y+$)}cursorUp(L){const $=this._activeBuffer.y-this._activeBuffer.scrollTop;return $>=0?this._moveCursor(0,-Math.min($,L.params[0]||1)):this._moveCursor(0,-(L.params[0]||1)),!0}cursorDown(L){const $=this._activeBuffer.scrollBottom-this._activeBuffer.y;return $>=0?this._moveCursor(0,Math.min($,L.params[0]||1)):this._moveCursor(0,L.params[0]||1),!0}cursorForward(L){return this._moveCursor(L.params[0]||1,0),!0}cursorBackward(L){return this._moveCursor(-(L.params[0]||1),0),!0}cursorNextLine(L){return this.cursorDown(L),this._activeBuffer.x=0,!0}cursorPrecedingLine(L){return this.cursorUp(L),this._activeBuffer.x=0,!0}cursorCharAbsolute(L){return this._setCursor((L.params[0]||1)-1,this._activeBuffer.y),!0}cursorPosition(L){return this._setCursor(L.length>=2?(L.params[1]||1)-1:0,(L.params[0]||1)-1),!0}charPosAbsolute(L){return this._setCursor((L.params[0]||1)-1,this._activeBuffer.y),!0}hPositionRelative(L){return this._moveCursor(L.params[0]||1,0),!0}linePosAbsolute(L){return this._setCursor(this._activeBuffer.x,(L.params[0]||1)-1),!0}vPositionRelative(L){return this._moveCursor(0,L.params[0]||1),!0}hVPosition(L){return this.cursorPosition(L),!0}tabClear(L){const $=L.params[0];return $===0?delete this._activeBuffer.tabs[this._activeBuffer.x]:$===3&&(this._activeBuffer.tabs={}),!0}cursorForwardTab(L){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let $=L.params[0]||1;for(;$--;)this._activeBuffer.x=this._activeBuffer.nextStop();return!0}cursorBackwardTab(L){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let $=L.params[0]||1;for(;$--;)this._activeBuffer.x=this._activeBuffer.prevStop();return!0}selectProtected(L){const $=L.params[0];return $===1&&(this._curAttrData.bg|=536870912),$!==2&&$!==0||(this._curAttrData.bg&=-536870913),!0}_eraseInBufferLine(L,$,M,I=!1,j=!1){const X=this._activeBuffer.lines.get(this._activeBuffer.ybase+L);X.replaceCells($,M,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData(),j),I&&(X.isWrapped=!1)}_resetBufferLine(L,$=!1){const M=this._activeBuffer.lines.get(this._activeBuffer.ybase+L);M&&(M.fill(this._activeBuffer.getNullCell(this._eraseAttrData()),$),this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase+L),M.isWrapped=!1)}eraseInDisplay(L,$=!1){let M;switch(this._restrictCursor(this._bufferService.cols),L.params[0]){case 0:for(M=this._activeBuffer.y,this._dirtyRowTracker.markDirty(M),this._eraseInBufferLine(M++,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,$);M<this._bufferService.rows;M++)this._resetBufferLine(M,$);this._dirtyRowTracker.markDirty(M);break;case 1:for(M=this._activeBuffer.y,this._dirtyRowTracker.markDirty(M),this._eraseInBufferLine(M,0,this._activeBuffer.x+1,!0,$),this._activeBuffer.x+1>=this._bufferService.cols&&(this._activeBuffer.lines.get(M+1).isWrapped=!1);M--;)this._resetBufferLine(M,$);this._dirtyRowTracker.markDirty(0);break;case 2:for(M=this._bufferService.rows,this._dirtyRowTracker.markDirty(M-1);M--;)this._resetBufferLine(M,$);this._dirtyRowTracker.markDirty(0);break;case 3:const I=this._activeBuffer.lines.length-this._bufferService.rows;I>0&&(this._activeBuffer.lines.trimStart(I),this._activeBuffer.ybase=Math.max(this._activeBuffer.ybase-I,0),this._activeBuffer.ydisp=Math.max(this._activeBuffer.ydisp-I,0),this._onScroll.fire(0))}return!0}eraseInLine(L,$=!1){switch(this._restrictCursor(this._bufferService.cols),L.params[0]){case 0:this._eraseInBufferLine(this._activeBuffer.y,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,$);break;case 1:this._eraseInBufferLine(this._activeBuffer.y,0,this._activeBuffer.x+1,!1,$);break;case 2:this._eraseInBufferLine(this._activeBuffer.y,0,this._bufferService.cols,!0,$)}return this._dirtyRowTracker.markDirty(this._activeBuffer.y),!0}insertLines(L){this._restrictCursor();let $=L.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const M=this._activeBuffer.ybase+this._activeBuffer.y,I=this._bufferService.rows-1-this._activeBuffer.scrollBottom,j=this._bufferService.rows-1+this._activeBuffer.ybase-I+1;for(;$--;)this._activeBuffer.lines.splice(j-1,1),this._activeBuffer.lines.splice(M,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}deleteLines(L){this._restrictCursor();let $=L.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const M=this._activeBuffer.ybase+this._activeBuffer.y;let I;for(I=this._bufferService.rows-1-this._activeBuffer.scrollBottom,I=this._bufferService.rows-1+this._activeBuffer.ybase-I;$--;)this._activeBuffer.lines.splice(M,1),this._activeBuffer.lines.splice(I,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}insertChars(L){this._restrictCursor();const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return $&&($.insertCells(this._activeBuffer.x,L.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}deleteChars(L){this._restrictCursor();const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return $&&($.deleteCells(this._activeBuffer.x,L.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}scrollUp(L){let $=L.params[0]||1;for(;$--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollDown(L){let $=L.params[0]||1;for(;$--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,0,this._activeBuffer.getBlankLine(o.DEFAULT_ATTR_DATA));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollLeft(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.deleteCells(0,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollRight(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.insertCells(0,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}insertColumns(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.insertCells(this._activeBuffer.x,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}deleteColumns(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.deleteCells(this._activeBuffer.x,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}eraseChars(L){this._restrictCursor();const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return $&&($.replaceCells(this._activeBuffer.x,this._activeBuffer.x+(L.params[0]||1),this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}repeatPrecedingCharacter(L){if(!this._parser.precedingCodepoint)return!0;const $=L.params[0]||1,M=new Uint32Array($);for(let I=0;I<$;++I)M[I]=this._parser.precedingCodepoint;return this.print(M,0,M.length),!0}sendDeviceAttributesPrimary(L){return L.params[0]>0||(this._is("xterm")||this._is("rxvt-unicode")||this._is("screen")?this._coreService.triggerDataEvent(l.C0.ESC+"[?1;2c"):this._is("linux")&&this._coreService.triggerDataEvent(l.C0.ESC+"[?6c")),!0}sendDeviceAttributesSecondary(L){return L.params[0]>0||(this._is("xterm")?this._coreService.triggerDataEvent(l.C0.ESC+"[>0;276;0c"):this._is("rxvt-unicode")?this._coreService.triggerDataEvent(l.C0.ESC+"[>85;95;0c"):this._is("linux")?this._coreService.triggerDataEvent(L.params[0]+"c"):this._is("screen")&&this._coreService.triggerDataEvent(l.C0.ESC+"[>83;40003;0c")),!0}_is(L){return(this._optionsService.rawOptions.termName+"").indexOf(L)===0}setMode(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 4:this._coreService.modes.insertMode=!0;break;case 20:this._optionsService.options.convertEol=!0}return!0}setModePrivate(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!0;break;case 2:this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),this._charsetService.setgCharset(1,f.DEFAULT_CHARSET),this._charsetService.setgCharset(2,f.DEFAULT_CHARSET),this._charsetService.setgCharset(3,f.DEFAULT_CHARSET);break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(132,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!0,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!0;break;case 12:this._optionsService.options.cursorBlink=!0;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!0;break;case 66:this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire();break;case 9:this._coreMouseService.activeProtocol="X10";break;case 1e3:this._coreMouseService.activeProtocol="VT200";break;case 1002:this._coreMouseService.activeProtocol="DRAG";break;case 1003:this._coreMouseService.activeProtocol="ANY";break;case 1004:this._coreService.decPrivateModes.sendFocus=!0,this._onRequestSendFocus.fire();break;case 1005:this._logService.debug("DECSET 1005 not supported (see #2507)");break;case 1006:this._coreMouseService.activeEncoding="SGR";break;case 1015:this._logService.debug("DECSET 1015 not supported (see #2507)");break;case 1016:this._coreMouseService.activeEncoding="SGR_PIXELS";break;case 25:this._coreService.isCursorHidden=!1;break;case 1048:this.saveCursor();break;case 1049:this.saveCursor();case 47:case 1047:this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!0}return!0}resetMode(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 4:this._coreService.modes.insertMode=!1;break;case 20:this._optionsService.options.convertEol=!1}return!0}resetModePrivate(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!1;break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(80,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!1,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!1;break;case 12:this._optionsService.options.cursorBlink=!1;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!1;break;case 66:this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire();break;case 9:case 1e3:case 1002:case 1003:this._coreMouseService.activeProtocol="NONE";break;case 1004:this._coreService.decPrivateModes.sendFocus=!1;break;case 1005:this._logService.debug("DECRST 1005 not supported (see #2507)");break;case 1006:case 1016:this._coreMouseService.activeEncoding="DEFAULT";break;case 1015:this._logService.debug("DECRST 1015 not supported (see #2507)");break;case 25:this._coreService.isCursorHidden=!0;break;case 1048:this.restoreCursor();break;case 1049:case 47:case 1047:this._bufferService.buffers.activateNormalBuffer(),L.params[$]===1049&&this.restoreCursor(),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!1}return!0}requestMode(L,$){const M=this._coreService.decPrivateModes,{activeProtocol:I,activeEncoding:j}=this._coreMouseService,X=this._coreService,{buffers:se,cols:Z}=this._bufferService,{active:be,alt:D}=se,P=this._optionsService.rawOptions,U=fe=>fe?1:2,H=L.params[0];return re=H,G=$?H===2?4:H===4?U(X.modes.insertMode):H===12?3:H===20?U(P.convertEol):0:H===1?U(M.applicationCursorKeys):H===3?P.windowOptions.setWinLines?Z===80?2:Z===132?1:0:0:H===6?U(M.origin):H===7?U(M.wraparound):H===8?3:H===9?U(I==="X10"):H===12?U(P.cursorBlink):H===25?U(!X.isCursorHidden):H===45?U(M.reverseWraparound):H===66?U(M.applicationKeypad):H===67?4:H===1e3?U(I==="VT200"):H===1002?U(I==="DRAG"):H===1003?U(I==="ANY"):H===1004?U(M.sendFocus):H===1005?4:H===1006?U(j==="SGR"):H===1015?4:H===1016?U(j==="SGR_PIXELS"):H===1048?1:H===47||H===1047||H===1049?U(be===D):H===2004?U(M.bracketedPasteMode):0,X.triggerDataEvent(`${l.C0.ESC}[${$?"":"?"}${re};${G}$y`),!0;var re,G}_updateAttrColor(L,$,M,I,j){return $===2?(L|=50331648,L&=-16777216,L|=p.AttributeData.fromColorRGB([M,I,j])):$===5&&(L&=-50331904,L|=33554432|255&M),L}_extractColor(L,$,M){const I=[0,0,-1,0,0,0];let j=0,X=0;do{if(I[X+j]=L.params[$+X],L.hasSubParams($+X)){const se=L.getSubParams($+X);let Z=0;do I[1]===5&&(j=1),I[X+Z+1+j]=se[Z];while(++Z<se.length&&Z+X+1+j<I.length);break}if(I[1]===5&&X+j>=2||I[1]===2&&X+j>=5)break;I[1]&&(j=1)}while(++X+$<L.length&&X+j<I.length);for(let se=2;se<I.length;++se)I[se]===-1&&(I[se]=0);switch(I[0]){case 38:M.fg=this._updateAttrColor(M.fg,I[1],I[3],I[4],I[5]);break;case 48:M.bg=this._updateAttrColor(M.bg,I[1],I[3],I[4],I[5]);break;case 58:M.extended=M.extended.clone(),M.extended.underlineColor=this._updateAttrColor(M.extended.underlineColor,I[1],I[3],I[4],I[5])}return X}_processUnderline(L,$){$.extended=$.extended.clone(),(!~L||L>5)&&(L=1),$.extended.underlineStyle=L,$.fg|=268435456,L===0&&($.fg&=-268435457),$.updateExtended()}_processSGR0(L){L.fg=o.DEFAULT_ATTR_DATA.fg,L.bg=o.DEFAULT_ATTR_DATA.bg,L.extended=L.extended.clone(),L.extended.underlineStyle=0,L.extended.underlineColor&=-67108864,L.updateExtended()}charAttributes(L){if(L.length===1&&L.params[0]===0)return this._processSGR0(this._curAttrData),!0;const $=L.length;let M;const I=this._curAttrData;for(let j=0;j<$;j++)M=L.params[j],M>=30&&M<=37?(I.fg&=-50331904,I.fg|=16777216|M-30):M>=40&&M<=47?(I.bg&=-50331904,I.bg|=16777216|M-40):M>=90&&M<=97?(I.fg&=-50331904,I.fg|=16777224|M-90):M>=100&&M<=107?(I.bg&=-50331904,I.bg|=16777224|M-100):M===0?this._processSGR0(I):M===1?I.fg|=134217728:M===3?I.bg|=67108864:M===4?(I.fg|=268435456,this._processUnderline(L.hasSubParams(j)?L.getSubParams(j)[0]:1,I)):M===5?I.fg|=536870912:M===7?I.fg|=67108864:M===8?I.fg|=1073741824:M===9?I.fg|=2147483648:M===2?I.bg|=134217728:M===21?this._processUnderline(2,I):M===22?(I.fg&=-134217729,I.bg&=-134217729):M===23?I.bg&=-67108865:M===24?(I.fg&=-268435457,this._processUnderline(0,I)):M===25?I.fg&=-536870913:M===27?I.fg&=-67108865:M===28?I.fg&=-1073741825:M===29?I.fg&=2147483647:M===39?(I.fg&=-67108864,I.fg|=16777215&o.DEFAULT_ATTR_DATA.fg):M===49?(I.bg&=-67108864,I.bg|=16777215&o.DEFAULT_ATTR_DATA.bg):M===38||M===48||M===58?j+=this._extractColor(L,j,I):M===53?I.bg|=1073741824:M===55?I.bg&=-1073741825:M===59?(I.extended=I.extended.clone(),I.extended.underlineColor=-1,I.updateExtended()):M===100?(I.fg&=-67108864,I.fg|=16777215&o.DEFAULT_ATTR_DATA.fg,I.bg&=-67108864,I.bg|=16777215&o.DEFAULT_ATTR_DATA.bg):this._logService.debug("Unknown SGR attribute: %d.",M);return!0}deviceStatus(L){switch(L.params[0]){case 5:this._coreService.triggerDataEvent(`${l.C0.ESC}[0n`);break;case 6:const $=this._activeBuffer.y+1,M=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${l.C0.ESC}[${$};${M}R`)}return!0}deviceStatusPrivate(L){if(L.params[0]===6){const $=this._activeBuffer.y+1,M=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${l.C0.ESC}[?${$};${M}R`)}return!0}softReset(L){return this._coreService.isCursorHidden=!1,this._onRequestSyncScrollBar.fire(),this._activeBuffer.scrollTop=0,this._activeBuffer.scrollBottom=this._bufferService.rows-1,this._curAttrData=o.DEFAULT_ATTR_DATA.clone(),this._coreService.reset(),this._charsetService.reset(),this._activeBuffer.savedX=0,this._activeBuffer.savedY=this._activeBuffer.ybase,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,this._coreService.decPrivateModes.origin=!1,!0}setCursorStyle(L){const $=L.params[0]||1;switch($){case 1:case 2:this._optionsService.options.cursorStyle="block";break;case 3:case 4:this._optionsService.options.cursorStyle="underline";break;case 5:case 6:this._optionsService.options.cursorStyle="bar"}const M=$%2==1;return this._optionsService.options.cursorBlink=M,!0}setScrollRegion(L){const $=L.params[0]||1;let M;return(L.length<2||(M=L.params[1])>this._bufferService.rows||M===0)&&(M=this._bufferService.rows),M>$&&(this._activeBuffer.scrollTop=$-1,this._activeBuffer.scrollBottom=M-1,this._setCursor(0,0)),!0}windowOptions(L){if(!B(L.params[0],this._optionsService.rawOptions.windowOptions))return!0;const $=L.length>1?L.params[1]:0;switch(L.params[0]){case 14:$!==2&&this._onRequestWindowsOptionsReport.fire(R.GET_WIN_SIZE_PIXELS);break;case 16:this._onRequestWindowsOptionsReport.fire(R.GET_CELL_SIZE_PIXELS);break;case 18:this._bufferService&&this._coreService.triggerDataEvent(`${l.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);break;case 22:$!==0&&$!==2||(this._windowTitleStack.push(this._windowTitle),this._windowTitleStack.length>10&&this._windowTitleStack.shift()),$!==0&&$!==1||(this._iconNameStack.push(this._iconName),this._iconNameStack.length>10&&this._iconNameStack.shift());break;case 23:$!==0&&$!==2||this._windowTitleStack.length&&this.setTitle(this._windowTitleStack.pop()),$!==0&&$!==1||this._iconNameStack.length&&this.setIconName(this._iconNameStack.pop())}return!0}saveCursor(L){return this._activeBuffer.savedX=this._activeBuffer.x,this._activeBuffer.savedY=this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,!0}restoreCursor(L){return this._activeBuffer.x=this._activeBuffer.savedX||0,this._activeBuffer.y=Math.max(this._activeBuffer.savedY-this._activeBuffer.ybase,0),this._curAttrData.fg=this._activeBuffer.savedCurAttrData.fg,this._curAttrData.bg=this._activeBuffer.savedCurAttrData.bg,this._charsetService.charset=this._savedCharset,this._activeBuffer.savedCharset&&(this._charsetService.charset=this._activeBuffer.savedCharset),this._restrictCursor(),!0}setTitle(L){return this._windowTitle=L,this._onTitleChange.fire(L),!0}setIconName(L){return this._iconName=L,!0}setOrReportIndexedColor(L){const $=[],M=L.split(";");for(;M.length>1;){const I=M.shift(),j=M.shift();if(/^\d+$/.exec(I)){const X=parseInt(I);if(V(X))if(j==="?")$.push({type:0,index:X});else{const se=(0,y.parseColor)(j);se&&$.push({type:1,index:X,color:se})}}}return $.length&&this._onColor.fire($),!0}setHyperlink(L){const $=L.split(";");return!($.length<2)&&($[1]?this._createHyperlink($[0],$[1]):!$[0]&&this._finishHyperlink())}_createHyperlink(L,$){this._getCurrentLinkId()&&this._finishHyperlink();const M=L.split(":");let I;const j=M.findIndex(X=>X.startsWith("id="));return j!==-1&&(I=M[j].slice(3)||void 0),this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=this._oscLinkService.registerLink({id:I,uri:$}),this._curAttrData.updateExtended(),!0}_finishHyperlink(){return this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=0,this._curAttrData.updateExtended(),!0}_setOrReportSpecialColor(L,$){const M=L.split(";");for(let I=0;I<M.length&&!($>=this._specialColors.length);++I,++$)if(M[I]==="?")this._onColor.fire([{type:0,index:this._specialColors[$]}]);else{const j=(0,y.parseColor)(M[I]);j&&this._onColor.fire([{type:1,index:this._specialColors[$],color:j}])}return!0}setOrReportFgColor(L){return this._setOrReportSpecialColor(L,0)}setOrReportBgColor(L){return this._setOrReportSpecialColor(L,1)}setOrReportCursorColor(L){return this._setOrReportSpecialColor(L,2)}restoreIndexedColor(L){if(!L)return this._onColor.fire([{type:2}]),!0;const $=[],M=L.split(";");for(let I=0;I<M.length;++I)if(/^\d+$/.exec(M[I])){const j=parseInt(M[I]);V(j)&&$.push({type:2,index:j})}return $.length&&this._onColor.fire($),!0}restoreFgColor(L){return this._onColor.fire([{type:2,index:256}]),!0}restoreBgColor(L){return this._onColor.fire([{type:2,index:257}]),!0}restoreCursorColor(L){return this._onColor.fire([{type:2,index:258}]),!0}nextLine(){return this._activeBuffer.x=0,this.index(),!0}keypadApplicationMode(){return this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire(),!0}keypadNumericMode(){return this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire(),!0}selectDefaultCharset(){return this._charsetService.setgLevel(0),this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),!0}selectCharset(L){return L.length!==2?(this.selectDefaultCharset(),!0):(L[0]==="/"||this._charsetService.setgCharset(k[L[0]],f.CHARSETS[L[1]]||f.DEFAULT_CHARSET),!0)}index(){return this._restrictCursor(),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._restrictCursor(),!0}tabSet(){return this._activeBuffer.tabs[this._activeBuffer.x]=!0,!0}reverseIndex(){if(this._restrictCursor(),this._activeBuffer.y===this._activeBuffer.scrollTop){const L=this._activeBuffer.scrollBottom-this._activeBuffer.scrollTop;this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase+this._activeBuffer.y,L,1),this._activeBuffer.lines.set(this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.getBlankLine(this._eraseAttrData())),this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom)}else this._activeBuffer.y--,this._restrictCursor();return!0}fullReset(){return this._parser.reset(),this._onRequestReset.fire(),!0}reset(){this._curAttrData=o.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=o.DEFAULT_ATTR_DATA.clone()}_eraseAttrData(){return this._eraseAttrDataInternal.bg&=-67108864,this._eraseAttrDataInternal.bg|=67108863&this._curAttrData.bg,this._eraseAttrDataInternal}setgLevel(L){return this._charsetService.setgLevel(L),!0}screenAlignmentPattern(){const L=new c.CellData;L.content=4194304|"E".charCodeAt(0),L.fg=this._curAttrData.fg,L.bg=this._curAttrData.bg,this._setCursor(0,0);for(let $=0;$<this._bufferService.rows;++$){const M=this._activeBuffer.ybase+this._activeBuffer.y+$,I=this._activeBuffer.lines.get(M);I&&(I.fill(L),I.isWrapped=!1)}return this._dirtyRowTracker.markAllDirty(),this._setCursor(0,0),!0}requestStatusString(L,$){const M=this._bufferService.buffer,I=this._optionsService.rawOptions;return(j=>(this._coreService.triggerDataEvent(`${l.C0.ESC}${j}${l.C0.ESC}\\`),!0))(L==='"q'?`P1$r${this._curAttrData.isProtected()?1:0}"q`:L==='"p'?'P1$r61;1"p':L==="r"?`P1$r${M.scrollTop+1};${M.scrollBottom+1}r`:L==="m"?"P1$r0m":L===" q"?`P1$r${{block:2,underline:4,bar:6}[I.cursorStyle]-(I.cursorBlink?1:0)} q`:"P0$r")}markRangeDirty(L,$){this._dirtyRowTracker.markRangeDirty(L,$)}}r.InputHandler=z;let F=class{constructor(N){this._bufferService=N,this.clearRange()}clearRange(){this.start=this._bufferService.buffer.y,this.end=this._bufferService.buffer.y}markDirty(N){N<this.start?this.start=N:N>this.end&&(this.end=N)}markRangeDirty(N,L){N>L&&(O=N,N=L,L=O),N<this.start&&(this.start=N),L>this.end&&(this.end=L)}markAllDirty(){this.markRangeDirty(0,this._bufferService.rows-1)}};function V(N){return 0<=N&&N<256}F=u([g(0,v.IBufferService)],F)},844:(S,r)=>{function n(u){for(const g of u)g.dispose();u.length=0}Object.defineProperty(r,"__esModule",{value:!0}),r.getDisposeArrayDisposable=r.disposeArray=r.toDisposable=r.MutableDisposable=r.Disposable=void 0,r.Disposable=class{constructor(){this._disposables=[],this._isDisposed=!1}dispose(){this._isDisposed=!0;for(const u of this._disposables)u.dispose();this._disposables.length=0}register(u){return this._disposables.push(u),u}unregister(u){const g=this._disposables.indexOf(u);g!==-1&&this._disposables.splice(g,1)}},r.MutableDisposable=class{constructor(){this._isDisposed=!1}get value(){return this._isDisposed?void 0:this._value}set value(u){var g;this._isDisposed||u===this._value||((g=this._value)===null||g===void 0||g.dispose(),this._value=u)}clear(){this.value=void 0}dispose(){var u;this._isDisposed=!0,(u=this._value)===null||u===void 0||u.dispose(),this._value=void 0}},r.toDisposable=function(u){return{dispose:u}},r.disposeArray=n,r.getDisposeArrayDisposable=function(u){return{dispose:()=>n(u)}}},1505:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.FourKeyMap=r.TwoKeyMap=void 0;class n{constructor(){this._data={}}set(g,l,f){this._data[g]||(this._data[g]={}),this._data[g][l]=f}get(g,l){return this._data[g]?this._data[g][l]:void 0}clear(){this._data={}}}r.TwoKeyMap=n,r.FourKeyMap=class{constructor(){this._data=new n}set(u,g,l,f,b){this._data.get(u,g)||this._data.set(u,g,new n),this._data.get(u,g).set(l,f,b)}get(u,g,l,f){var b;return(b=this._data.get(u,g))===null||b===void 0?void 0:b.get(l,f)}clear(){this._data.clear()}}},6114:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.isChromeOS=r.isLinux=r.isWindows=r.isIphone=r.isIpad=r.isMac=r.getSafariVersion=r.isSafari=r.isLegacyEdge=r.isFirefox=r.isNode=void 0,r.isNode=typeof navigator>"u";const n=r.isNode?"node":navigator.userAgent,u=r.isNode?"node":navigator.platform;r.isFirefox=n.includes("Firefox"),r.isLegacyEdge=n.includes("Edge"),r.isSafari=/^((?!chrome|android).)*safari/i.test(n),r.getSafariVersion=function(){if(!r.isSafari)return 0;const g=n.match(/Version\/(\d+)/);return g===null||g.length<2?0:parseInt(g[1])},r.isMac=["Macintosh","MacIntel","MacPPC","Mac68K"].includes(u),r.isIpad=u==="iPad",r.isIphone=u==="iPhone",r.isWindows=["Windows","Win16","Win32","WinCE"].includes(u),r.isLinux=u.indexOf("Linux")>=0,r.isChromeOS=/\bCrOS\b/.test(n)},6106:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.SortedList=void 0;let n=0;r.SortedList=class{constructor(u){this._getKey=u,this._array=[]}clear(){this._array.length=0}insert(u){this._array.length!==0?(n=this._search(this._getKey(u)),this._array.splice(n,0,u)):this._array.push(u)}delete(u){if(this._array.length===0)return!1;const g=this._getKey(u);if(g===void 0||(n=this._search(g),n===-1)||this._getKey(this._array[n])!==g)return!1;do if(this._array[n]===u)return this._array.splice(n,1),!0;while(++n<this._array.length&&this._getKey(this._array[n])===g);return!1}*getKeyIterator(u){if(this._array.length!==0&&(n=this._search(u),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===u))do yield this._array[n];while(++n<this._array.length&&this._getKey(this._array[n])===u)}forEachByKey(u,g){if(this._array.length!==0&&(n=this._search(u),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===u))do g(this._array[n]);while(++n<this._array.length&&this._getKey(this._array[n])===u)}values(){return[...this._array].values()}_search(u){let g=0,l=this._array.length-1;for(;l>=g;){let f=g+l>>1;const b=this._getKey(this._array[f]);if(b>u)l=f-1;else{if(!(b<u)){for(;f>0&&this._getKey(this._array[f-1])===u;)f--;return f}g=f+1}}return g}}},7226:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DebouncedIdleTask=r.IdleTaskQueue=r.PriorityTaskQueue=void 0;const u=n(6114);class g{constructor(){this._tasks=[],this._i=0}enqueue(b){this._tasks.push(b),this._start()}flush(){for(;this._i<this._tasks.length;)this._tasks[this._i]()||this._i++;this.clear()}clear(){this._idleCallback&&(this._cancelCallback(this._idleCallback),this._idleCallback=void 0),this._i=0,this._tasks.length=0}_start(){this._idleCallback||(this._idleCallback=this._requestCallback(this._process.bind(this)))}_process(b){this._idleCallback=void 0;let C=0,w=0,o=b.timeRemaining(),d=0;for(;this._i<this._tasks.length;){if(C=Date.now(),this._tasks[this._i]()||this._i++,C=Math.max(1,Date.now()-C),w=Math.max(C,w),d=b.timeRemaining(),1.5*w>d)return o-C<-20&&console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(o-C))}ms`),void this._start();o=d}this.clear()}}class l extends g{_requestCallback(b){return setTimeout(()=>b(this._createDeadline(16)))}_cancelCallback(b){clearTimeout(b)}_createDeadline(b){const C=Date.now()+b;return{timeRemaining:()=>Math.max(0,C-Date.now())}}}r.PriorityTaskQueue=l,r.IdleTaskQueue=!u.isNode&&"requestIdleCallback"in window?class extends g{_requestCallback(f){return requestIdleCallback(f)}_cancelCallback(f){cancelIdleCallback(f)}}:l,r.DebouncedIdleTask=class{constructor(){this._queue=new r.IdleTaskQueue}set(f){this._queue.clear(),this._queue.enqueue(f)}flush(){this._queue.flush()}}},9282:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.updateWindowsModeWrappedState=void 0;const u=n(643);r.updateWindowsModeWrappedState=function(g){const l=g.buffer.lines.get(g.buffer.ybase+g.buffer.y-1),f=l==null?void 0:l.get(g.cols-1),b=g.buffer.lines.get(g.buffer.ybase+g.buffer.y);b&&f&&(b.isWrapped=f[u.CHAR_DATA_CODE_INDEX]!==u.NULL_CELL_CODE&&f[u.CHAR_DATA_CODE_INDEX]!==u.WHITESPACE_CELL_CODE)}},3734:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ExtendedAttrs=r.AttributeData=void 0;class n{constructor(){this.fg=0,this.bg=0,this.extended=new u}static toColorRGB(l){return[l>>>16&255,l>>>8&255,255&l]}static fromColorRGB(l){return(255&l[0])<<16|(255&l[1])<<8|255&l[2]}clone(){const l=new n;return l.fg=this.fg,l.bg=this.bg,l.extended=this.extended.clone(),l}isInverse(){return 67108864&this.fg}isBold(){return 134217728&this.fg}isUnderline(){return this.hasExtendedAttrs()&&this.extended.underlineStyle!==0?1:268435456&this.fg}isBlink(){return 536870912&this.fg}isInvisible(){return 1073741824&this.fg}isItalic(){return 67108864&this.bg}isDim(){return 134217728&this.bg}isStrikethrough(){return 2147483648&this.fg}isProtected(){return 536870912&this.bg}isOverline(){return 1073741824&this.bg}getFgColorMode(){return 50331648&this.fg}getBgColorMode(){return 50331648&this.bg}isFgRGB(){return(50331648&this.fg)==50331648}isBgRGB(){return(50331648&this.bg)==50331648}isFgPalette(){return(50331648&this.fg)==16777216||(50331648&this.fg)==33554432}isBgPalette(){return(50331648&this.bg)==16777216||(50331648&this.bg)==33554432}isFgDefault(){return(50331648&this.fg)==0}isBgDefault(){return(50331648&this.bg)==0}isAttributeDefault(){return this.fg===0&&this.bg===0}getFgColor(){switch(50331648&this.fg){case 16777216:case 33554432:return 255&this.fg;case 50331648:return 16777215&this.fg;default:return-1}}getBgColor(){switch(50331648&this.bg){case 16777216:case 33554432:return 255&this.bg;case 50331648:return 16777215&this.bg;default:return-1}}hasExtendedAttrs(){return 268435456&this.bg}updateExtended(){this.extended.isEmpty()?this.bg&=-268435457:this.bg|=268435456}getUnderlineColor(){if(268435456&this.bg&&~this.extended.underlineColor)switch(50331648&this.extended.underlineColor){case 16777216:case 33554432:return 255&this.extended.underlineColor;case 50331648:return 16777215&this.extended.underlineColor;default:return this.getFgColor()}return this.getFgColor()}getUnderlineColorMode(){return 268435456&this.bg&&~this.extended.underlineColor?50331648&this.extended.underlineColor:this.getFgColorMode()}isUnderlineColorRGB(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==50331648:this.isFgRGB()}isUnderlineColorPalette(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==16777216||(50331648&this.extended.underlineColor)==33554432:this.isFgPalette()}isUnderlineColorDefault(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==0:this.isFgDefault()}getUnderlineStyle(){return 268435456&this.fg?268435456&this.bg?this.extended.underlineStyle:1:0}}r.AttributeData=n;class u{get ext(){return this._urlId?-469762049&this._ext|this.underlineStyle<<26:this._ext}set ext(l){this._ext=l}get underlineStyle(){return this._urlId?5:(469762048&this._ext)>>26}set underlineStyle(l){this._ext&=-469762049,this._ext|=l<<26&469762048}get underlineColor(){return 67108863&this._ext}set underlineColor(l){this._ext&=-67108864,this._ext|=67108863&l}get urlId(){return this._urlId}set urlId(l){this._urlId=l}constructor(l=0,f=0){this._ext=0,this._urlId=0,this._ext=l,this._urlId=f}clone(){return new u(this._ext,this._urlId)}isEmpty(){return this.underlineStyle===0&&this._urlId===0}}r.ExtendedAttrs=u},9092:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Buffer=r.MAX_BUFFER_SIZE=void 0;const u=n(6349),g=n(7226),l=n(3734),f=n(8437),b=n(4634),C=n(511),w=n(643),o=n(4863),d=n(7116);r.MAX_BUFFER_SIZE=4294967295,r.Buffer=class{constructor(a,c,p){this._hasScrollback=a,this._optionsService=c,this._bufferService=p,this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.tabs={},this.savedY=0,this.savedX=0,this.savedCurAttrData=f.DEFAULT_ATTR_DATA.clone(),this.savedCharset=d.DEFAULT_CHARSET,this.markers=[],this._nullCell=C.CellData.fromCharData([0,w.NULL_CELL_CHAR,w.NULL_CELL_WIDTH,w.NULL_CELL_CODE]),this._whitespaceCell=C.CellData.fromCharData([0,w.WHITESPACE_CELL_CHAR,w.WHITESPACE_CELL_WIDTH,w.WHITESPACE_CELL_CODE]),this._isClearing=!1,this._memoryCleanupQueue=new g.IdleTaskQueue,this._memoryCleanupPosition=0,this._cols=this._bufferService.cols,this._rows=this._bufferService.rows,this.lines=new u.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}getNullCell(a){return a?(this._nullCell.fg=a.fg,this._nullCell.bg=a.bg,this._nullCell.extended=a.extended):(this._nullCell.fg=0,this._nullCell.bg=0,this._nullCell.extended=new l.ExtendedAttrs),this._nullCell}getWhitespaceCell(a){return a?(this._whitespaceCell.fg=a.fg,this._whitespaceCell.bg=a.bg,this._whitespaceCell.extended=a.extended):(this._whitespaceCell.fg=0,this._whitespaceCell.bg=0,this._whitespaceCell.extended=new l.ExtendedAttrs),this._whitespaceCell}getBlankLine(a,c){return new f.BufferLine(this._bufferService.cols,this.getNullCell(a),c)}get hasScrollback(){return this._hasScrollback&&this.lines.maxLength>this._rows}get isCursorInViewport(){const a=this.ybase+this.y-this.ydisp;return a>=0&&a<this._rows}_getCorrectBufferLength(a){if(!this._hasScrollback)return a;const c=a+this._optionsService.rawOptions.scrollback;return c>r.MAX_BUFFER_SIZE?r.MAX_BUFFER_SIZE:c}fillViewportRows(a){if(this.lines.length===0){a===void 0&&(a=f.DEFAULT_ATTR_DATA);let c=this._rows;for(;c--;)this.lines.push(this.getBlankLine(a))}}clear(){this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.lines=new u.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}resize(a,c){const p=this.getNullCell(f.DEFAULT_ATTR_DATA);let v=0;const x=this._getCorrectBufferLength(c);if(x>this.lines.maxLength&&(this.lines.maxLength=x),this.lines.length>0){if(this._cols<a)for(let y=0;y<this.lines.length;y++)v+=+this.lines.get(y).resize(a,p);let E=0;if(this._rows<c)for(let y=this._rows;y<c;y++)this.lines.length<c+this.ybase&&(this._optionsService.rawOptions.windowsMode||this._optionsService.rawOptions.windowsPty.backend!==void 0||this._optionsService.rawOptions.windowsPty.buildNumber!==void 0?this.lines.push(new f.BufferLine(a,p)):this.ybase>0&&this.lines.length<=this.ybase+this.y+E+1?(this.ybase--,E++,this.ydisp>0&&this.ydisp--):this.lines.push(new f.BufferLine(a,p)));else for(let y=this._rows;y>c;y--)this.lines.length>c+this.ybase&&(this.lines.length>this.ybase+this.y+1?this.lines.pop():(this.ybase++,this.ydisp++));if(x<this.lines.maxLength){const y=this.lines.length-x;y>0&&(this.lines.trimStart(y),this.ybase=Math.max(this.ybase-y,0),this.ydisp=Math.max(this.ydisp-y,0),this.savedY=Math.max(this.savedY-y,0)),this.lines.maxLength=x}this.x=Math.min(this.x,a-1),this.y=Math.min(this.y,c-1),E&&(this.y+=E),this.savedX=Math.min(this.savedX,a-1),this.scrollTop=0}if(this.scrollBottom=c-1,this._isReflowEnabled&&(this._reflow(a,c),this._cols>a))for(let E=0;E<this.lines.length;E++)v+=+this.lines.get(E).resize(a,p);this._cols=a,this._rows=c,this._memoryCleanupQueue.clear(),v>.1*this.lines.length&&(this._memoryCleanupPosition=0,this._memoryCleanupQueue.enqueue(()=>this._batchedMemoryCleanup()))}_batchedMemoryCleanup(){let a=!0;this._memoryCleanupPosition>=this.lines.length&&(this._memoryCleanupPosition=0,a=!1);let c=0;for(;this._memoryCleanupPosition<this.lines.length;)if(c+=this.lines.get(this._memoryCleanupPosition++).cleanupMemory(),c>100)return!0;return a}get _isReflowEnabled(){const a=this._optionsService.rawOptions.windowsPty;return a&&a.buildNumber?this._hasScrollback&&a.backend==="conpty"&&a.buildNumber>=21376:this._hasScrollback&&!this._optionsService.rawOptions.windowsMode}_reflow(a,c){this._cols!==a&&(a>this._cols?this._reflowLarger(a,c):this._reflowSmaller(a,c))}_reflowLarger(a,c){const p=(0,b.reflowLargerGetLinesToRemove)(this.lines,this._cols,a,this.ybase+this.y,this.getNullCell(f.DEFAULT_ATTR_DATA));if(p.length>0){const v=(0,b.reflowLargerCreateNewLayout)(this.lines,p);(0,b.reflowLargerApplyNewLayout)(this.lines,v.layout),this._reflowLargerAdjustViewport(a,c,v.countRemoved)}}_reflowLargerAdjustViewport(a,c,p){const v=this.getNullCell(f.DEFAULT_ATTR_DATA);let x=p;for(;x-- >0;)this.ybase===0?(this.y>0&&this.y--,this.lines.length<c&&this.lines.push(new f.BufferLine(a,v))):(this.ydisp===this.ybase&&this.ydisp--,this.ybase--);this.savedY=Math.max(this.savedY-p,0)}_reflowSmaller(a,c){const p=this.getNullCell(f.DEFAULT_ATTR_DATA),v=[];let x=0;for(let E=this.lines.length-1;E>=0;E--){let y=this.lines.get(E);if(!y||!y.isWrapped&&y.getTrimmedLength()<=a)continue;const k=[y];for(;y.isWrapped&&E>0;)y=this.lines.get(--E),k.unshift(y);const T=this.ybase+this.y;if(T>=E&&T<E+k.length)continue;const B=k[k.length-1].getTrimmedLength(),R=(0,b.reflowSmallerGetNewLineLengths)(k,this._cols,a),O=R.length-k.length;let z;z=this.ybase===0&&this.y!==this.lines.length-1?Math.max(0,this.y-this.lines.maxLength+O):Math.max(0,this.lines.length-this.lines.maxLength+O);const F=[];for(let I=0;I<O;I++){const j=this.getBlankLine(f.DEFAULT_ATTR_DATA,!0);F.push(j)}F.length>0&&(v.push({start:E+k.length+x,newLines:F}),x+=F.length),k.push(...F);let V=R.length-1,N=R[V];N===0&&(V--,N=R[V]);let L=k.length-O-1,$=B;for(;L>=0;){const I=Math.min($,N);if(k[V]===void 0)break;if(k[V].copyCellsFrom(k[L],$-I,N-I,I,!0),N-=I,N===0&&(V--,N=R[V]),$-=I,$===0){L--;const j=Math.max(L,0);$=(0,b.getWrappedLineTrimmedLength)(k,j,this._cols)}}for(let I=0;I<k.length;I++)R[I]<a&&k[I].setCell(R[I],p);let M=O-z;for(;M-- >0;)this.ybase===0?this.y<c-1?(this.y++,this.lines.pop()):(this.ybase++,this.ydisp++):this.ybase<Math.min(this.lines.maxLength,this.lines.length+x)-c&&(this.ybase===this.ydisp&&this.ydisp++,this.ybase++);this.savedY=Math.min(this.savedY+O,this.ybase+c-1)}if(v.length>0){const E=[],y=[];for(let V=0;V<this.lines.length;V++)y.push(this.lines.get(V));const k=this.lines.length;let T=k-1,B=0,R=v[B];this.lines.length=Math.min(this.lines.maxLength,this.lines.length+x);let O=0;for(let V=Math.min(this.lines.maxLength-1,k+x-1);V>=0;V--)if(R&&R.start>T+O){for(let N=R.newLines.length-1;N>=0;N--)this.lines.set(V--,R.newLines[N]);V++,E.push({index:T+1,amount:R.newLines.length}),O+=R.newLines.length,R=v[++B]}else this.lines.set(V,y[T--]);let z=0;for(let V=E.length-1;V>=0;V--)E[V].index+=z,this.lines.onInsertEmitter.fire(E[V]),z+=E[V].amount;const F=Math.max(0,k+x-this.lines.maxLength);F>0&&this.lines.onTrimEmitter.fire(F)}}translateBufferLineToString(a,c,p=0,v){const x=this.lines.get(a);return x?x.translateToString(c,p,v):""}getWrappedRangeForLine(a){let c=a,p=a;for(;c>0&&this.lines.get(c).isWrapped;)c--;for(;p+1<this.lines.length&&this.lines.get(p+1).isWrapped;)p++;return{first:c,last:p}}setupTabStops(a){for(a!=null?this.tabs[a]||(a=this.prevStop(a)):(this.tabs={},a=0);a<this._cols;a+=this._optionsService.rawOptions.tabStopWidth)this.tabs[a]=!0}prevStop(a){for(a==null&&(a=this.x);!this.tabs[--a]&&a>0;);return a>=this._cols?this._cols-1:a<0?0:a}nextStop(a){for(a==null&&(a=this.x);!this.tabs[++a]&&a<this._cols;);return a>=this._cols?this._cols-1:a<0?0:a}clearMarkers(a){this._isClearing=!0;for(let c=0;c<this.markers.length;c++)this.markers[c].line===a&&(this.markers[c].dispose(),this.markers.splice(c--,1));this._isClearing=!1}clearAllMarkers(){this._isClearing=!0;for(let a=0;a<this.markers.length;a++)this.markers[a].dispose(),this.markers.splice(a--,1);this._isClearing=!1}addMarker(a){const c=new o.Marker(a);return this.markers.push(c),c.register(this.lines.onTrim(p=>{c.line-=p,c.line<0&&c.dispose()})),c.register(this.lines.onInsert(p=>{c.line>=p.index&&(c.line+=p.amount)})),c.register(this.lines.onDelete(p=>{c.line>=p.index&&c.line<p.index+p.amount&&c.dispose(),c.line>p.index&&(c.line-=p.amount)})),c.register(c.onDispose(()=>this._removeMarker(c))),c}_removeMarker(a){this._isClearing||this.markers.splice(this.markers.indexOf(a),1)}}},8437:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferLine=r.DEFAULT_ATTR_DATA=void 0;const u=n(3734),g=n(511),l=n(643),f=n(482);r.DEFAULT_ATTR_DATA=Object.freeze(new u.AttributeData);let b=0;class C{constructor(o,d,a=!1){this.isWrapped=a,this._combined={},this._extendedAttrs={},this._data=new Uint32Array(3*o);const c=d||g.CellData.fromCharData([0,l.NULL_CELL_CHAR,l.NULL_CELL_WIDTH,l.NULL_CELL_CODE]);for(let p=0;p<o;++p)this.setCell(p,c);this.length=o}get(o){const d=this._data[3*o+0],a=2097151&d;return[this._data[3*o+1],2097152&d?this._combined[o]:a?(0,f.stringFromCodePoint)(a):"",d>>22,2097152&d?this._combined[o].charCodeAt(this._combined[o].length-1):a]}set(o,d){this._data[3*o+1]=d[l.CHAR_DATA_ATTR_INDEX],d[l.CHAR_DATA_CHAR_INDEX].length>1?(this._combined[o]=d[1],this._data[3*o+0]=2097152|o|d[l.CHAR_DATA_WIDTH_INDEX]<<22):this._data[3*o+0]=d[l.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|d[l.CHAR_DATA_WIDTH_INDEX]<<22}getWidth(o){return this._data[3*o+0]>>22}hasWidth(o){return 12582912&this._data[3*o+0]}getFg(o){return this._data[3*o+1]}getBg(o){return this._data[3*o+2]}hasContent(o){return 4194303&this._data[3*o+0]}getCodePoint(o){const d=this._data[3*o+0];return 2097152&d?this._combined[o].charCodeAt(this._combined[o].length-1):2097151&d}isCombined(o){return 2097152&this._data[3*o+0]}getString(o){const d=this._data[3*o+0];return 2097152&d?this._combined[o]:2097151&d?(0,f.stringFromCodePoint)(2097151&d):""}isProtected(o){return 536870912&this._data[3*o+2]}loadCell(o,d){return b=3*o,d.content=this._data[b+0],d.fg=this._data[b+1],d.bg=this._data[b+2],2097152&d.content&&(d.combinedData=this._combined[o]),268435456&d.bg&&(d.extended=this._extendedAttrs[o]),d}setCell(o,d){2097152&d.content&&(this._combined[o]=d.combinedData),268435456&d.bg&&(this._extendedAttrs[o]=d.extended),this._data[3*o+0]=d.content,this._data[3*o+1]=d.fg,this._data[3*o+2]=d.bg}setCellFromCodePoint(o,d,a,c,p,v){268435456&p&&(this._extendedAttrs[o]=v),this._data[3*o+0]=d|a<<22,this._data[3*o+1]=c,this._data[3*o+2]=p}addCodepointToCell(o,d){let a=this._data[3*o+0];2097152&a?this._combined[o]+=(0,f.stringFromCodePoint)(d):(2097151&a?(this._combined[o]=(0,f.stringFromCodePoint)(2097151&a)+(0,f.stringFromCodePoint)(d),a&=-2097152,a|=2097152):a=d|4194304,this._data[3*o+0]=a)}insertCells(o,d,a,c){if((o%=this.length)&&this.getWidth(o-1)===2&&this.setCellFromCodePoint(o-1,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs),d<this.length-o){const p=new g.CellData;for(let v=this.length-o-d-1;v>=0;--v)this.setCell(o+d+v,this.loadCell(o+v,p));for(let v=0;v<d;++v)this.setCell(o+v,a)}else for(let p=o;p<this.length;++p)this.setCell(p,a);this.getWidth(this.length-1)===2&&this.setCellFromCodePoint(this.length-1,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs)}deleteCells(o,d,a,c){if(o%=this.length,d<this.length-o){const p=new g.CellData;for(let v=0;v<this.length-o-d;++v)this.setCell(o+v,this.loadCell(o+d+v,p));for(let v=this.length-d;v<this.length;++v)this.setCell(v,a)}else for(let p=o;p<this.length;++p)this.setCell(p,a);o&&this.getWidth(o-1)===2&&this.setCellFromCodePoint(o-1,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs),this.getWidth(o)!==0||this.hasContent(o)||this.setCellFromCodePoint(o,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs)}replaceCells(o,d,a,c,p=!1){if(p)for(o&&this.getWidth(o-1)===2&&!this.isProtected(o-1)&&this.setCellFromCodePoint(o-1,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs),d<this.length&&this.getWidth(d-1)===2&&!this.isProtected(d)&&this.setCellFromCodePoint(d,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs);o<d&&o<this.length;)this.isProtected(o)||this.setCell(o,a),o++;else for(o&&this.getWidth(o-1)===2&&this.setCellFromCodePoint(o-1,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs),d<this.length&&this.getWidth(d-1)===2&&this.setCellFromCodePoint(d,0,1,(c==null?void 0:c.fg)||0,(c==null?void 0:c.bg)||0,(c==null?void 0:c.extended)||new u.ExtendedAttrs);o<d&&o<this.length;)this.setCell(o++,a)}resize(o,d){if(o===this.length)return 4*this._data.length*2<this._data.buffer.byteLength;const a=3*o;if(o>this.length){if(this._data.buffer.byteLength>=4*a)this._data=new Uint32Array(this._data.buffer,0,a);else{const c=new Uint32Array(a);c.set(this._data),this._data=c}for(let c=this.length;c<o;++c)this.setCell(c,d)}else{this._data=this._data.subarray(0,a);const c=Object.keys(this._combined);for(let v=0;v<c.length;v++){const x=parseInt(c[v],10);x>=o&&delete this._combined[x]}const p=Object.keys(this._extendedAttrs);for(let v=0;v<p.length;v++){const x=parseInt(p[v],10);x>=o&&delete this._extendedAttrs[x]}}return this.length=o,4*a*2<this._data.buffer.byteLength}cleanupMemory(){if(4*this._data.length*2<this._data.buffer.byteLength){const o=new Uint32Array(this._data.length);return o.set(this._data),this._data=o,1}return 0}fill(o,d=!1){if(d)for(let a=0;a<this.length;++a)this.isProtected(a)||this.setCell(a,o);else{this._combined={},this._extendedAttrs={};for(let a=0;a<this.length;++a)this.setCell(a,o)}}copyFrom(o){this.length!==o.length?this._data=new Uint32Array(o._data):this._data.set(o._data),this.length=o.length,this._combined={};for(const d in o._combined)this._combined[d]=o._combined[d];this._extendedAttrs={};for(const d in o._extendedAttrs)this._extendedAttrs[d]=o._extendedAttrs[d];this.isWrapped=o.isWrapped}clone(){const o=new C(0);o._data=new Uint32Array(this._data),o.length=this.length;for(const d in this._combined)o._combined[d]=this._combined[d];for(const d in this._extendedAttrs)o._extendedAttrs[d]=this._extendedAttrs[d];return o.isWrapped=this.isWrapped,o}getTrimmedLength(){for(let o=this.length-1;o>=0;--o)if(4194303&this._data[3*o+0])return o+(this._data[3*o+0]>>22);return 0}getNoBgTrimmedLength(){for(let o=this.length-1;o>=0;--o)if(4194303&this._data[3*o+0]||50331648&this._data[3*o+2])return o+(this._data[3*o+0]>>22);return 0}copyCellsFrom(o,d,a,c,p){const v=o._data;if(p)for(let E=c-1;E>=0;E--){for(let y=0;y<3;y++)this._data[3*(a+E)+y]=v[3*(d+E)+y];268435456&v[3*(d+E)+2]&&(this._extendedAttrs[a+E]=o._extendedAttrs[d+E])}else for(let E=0;E<c;E++){for(let y=0;y<3;y++)this._data[3*(a+E)+y]=v[3*(d+E)+y];268435456&v[3*(d+E)+2]&&(this._extendedAttrs[a+E]=o._extendedAttrs[d+E])}const x=Object.keys(o._combined);for(let E=0;E<x.length;E++){const y=parseInt(x[E],10);y>=d&&(this._combined[y-d+a]=o._combined[y])}}translateToString(o=!1,d=0,a=this.length){o&&(a=Math.min(a,this.getTrimmedLength()));let c="";for(;d<a;){const p=this._data[3*d+0],v=2097151&p;c+=2097152&p?this._combined[d]:v?(0,f.stringFromCodePoint)(v):l.WHITESPACE_CELL_CHAR,d+=p>>22||1}return c}}r.BufferLine=C},4841:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.getRangeLength=void 0,r.getRangeLength=function(n,u){if(n.start.y>n.end.y)throw new Error(`Buffer range end (${n.end.x}, ${n.end.y}) cannot be before start (${n.start.x}, ${n.start.y})`);return u*(n.end.y-n.start.y)+(n.end.x-n.start.x+1)}},4634:(S,r)=>{function n(u,g,l){if(g===u.length-1)return u[g].getTrimmedLength();const f=!u[g].hasContent(l-1)&&u[g].getWidth(l-1)===1,b=u[g+1].getWidth(0)===2;return f&&b?l-1:l}Object.defineProperty(r,"__esModule",{value:!0}),r.getWrappedLineTrimmedLength=r.reflowSmallerGetNewLineLengths=r.reflowLargerApplyNewLayout=r.reflowLargerCreateNewLayout=r.reflowLargerGetLinesToRemove=void 0,r.reflowLargerGetLinesToRemove=function(u,g,l,f,b){const C=[];for(let w=0;w<u.length-1;w++){let o=w,d=u.get(++o);if(!d.isWrapped)continue;const a=[u.get(w)];for(;o<u.length&&d.isWrapped;)a.push(d),d=u.get(++o);if(f>=w&&f<o){w+=a.length-1;continue}let c=0,p=n(a,c,g),v=1,x=0;for(;v<a.length;){const y=n(a,v,g),k=y-x,T=l-p,B=Math.min(k,T);a[c].copyCellsFrom(a[v],x,p,B,!1),p+=B,p===l&&(c++,p=0),x+=B,x===y&&(v++,x=0),p===0&&c!==0&&a[c-1].getWidth(l-1)===2&&(a[c].copyCellsFrom(a[c-1],l-1,p++,1,!1),a[c-1].setCell(l-1,b))}a[c].replaceCells(p,l,b);let E=0;for(let y=a.length-1;y>0&&(y>c||a[y].getTrimmedLength()===0);y--)E++;E>0&&(C.push(w+a.length-E),C.push(E)),w+=a.length-1}return C},r.reflowLargerCreateNewLayout=function(u,g){const l=[];let f=0,b=g[f],C=0;for(let w=0;w<u.length;w++)if(b===w){const o=g[++f];u.onDeleteEmitter.fire({index:w-C,amount:o}),w+=o-1,C+=o,b=g[++f]}else l.push(w);return{layout:l,countRemoved:C}},r.reflowLargerApplyNewLayout=function(u,g){const l=[];for(let f=0;f<g.length;f++)l.push(u.get(g[f]));for(let f=0;f<l.length;f++)u.set(f,l[f]);u.length=g.length},r.reflowSmallerGetNewLineLengths=function(u,g,l){const f=[],b=u.map((d,a)=>n(u,a,g)).reduce((d,a)=>d+a);let C=0,w=0,o=0;for(;o<b;){if(b-o<l){f.push(b-o);break}C+=l;const d=n(u,w,g);C>d&&(C-=d,w++);const a=u[w].getWidth(C-1)===2;a&&C--;const c=a?l-1:l;f.push(c),o+=c}return f},r.getWrappedLineTrimmedLength=n},5295:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferSet=void 0;const u=n(8460),g=n(844),l=n(9092);class f extends g.Disposable{constructor(C,w){super(),this._optionsService=C,this._bufferService=w,this._onBufferActivate=this.register(new u.EventEmitter),this.onBufferActivate=this._onBufferActivate.event,this.reset(),this.register(this._optionsService.onSpecificOptionChange("scrollback",()=>this.resize(this._bufferService.cols,this._bufferService.rows))),this.register(this._optionsService.onSpecificOptionChange("tabStopWidth",()=>this.setupTabStops()))}reset(){this._normal=new l.Buffer(!0,this._optionsService,this._bufferService),this._normal.fillViewportRows(),this._alt=new l.Buffer(!1,this._optionsService,this._bufferService),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}),this.setupTabStops()}get alt(){return this._alt}get active(){return this._activeBuffer}get normal(){return this._normal}activateNormalBuffer(){this._activeBuffer!==this._normal&&(this._normal.x=this._alt.x,this._normal.y=this._alt.y,this._alt.clearAllMarkers(),this._alt.clear(),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}))}activateAltBuffer(C){this._activeBuffer!==this._alt&&(this._alt.fillViewportRows(C),this._alt.x=this._normal.x,this._alt.y=this._normal.y,this._activeBuffer=this._alt,this._onBufferActivate.fire({activeBuffer:this._alt,inactiveBuffer:this._normal}))}resize(C,w){this._normal.resize(C,w),this._alt.resize(C,w),this.setupTabStops(C)}setupTabStops(C){this._normal.setupTabStops(C),this._alt.setupTabStops(C)}}r.BufferSet=f},511:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CellData=void 0;const u=n(482),g=n(643),l=n(3734);class f extends l.AttributeData{constructor(){super(...arguments),this.content=0,this.fg=0,this.bg=0,this.extended=new l.ExtendedAttrs,this.combinedData=""}static fromCharData(C){const w=new f;return w.setFromCharData(C),w}isCombined(){return 2097152&this.content}getWidth(){return this.content>>22}getChars(){return 2097152&this.content?this.combinedData:2097151&this.content?(0,u.stringFromCodePoint)(2097151&this.content):""}getCode(){return this.isCombined()?this.combinedData.charCodeAt(this.combinedData.length-1):2097151&this.content}setFromCharData(C){this.fg=C[g.CHAR_DATA_ATTR_INDEX],this.bg=0;let w=!1;if(C[g.CHAR_DATA_CHAR_INDEX].length>2)w=!0;else if(C[g.CHAR_DATA_CHAR_INDEX].length===2){const o=C[g.CHAR_DATA_CHAR_INDEX].charCodeAt(0);if(55296<=o&&o<=56319){const d=C[g.CHAR_DATA_CHAR_INDEX].charCodeAt(1);56320<=d&&d<=57343?this.content=1024*(o-55296)+d-56320+65536|C[g.CHAR_DATA_WIDTH_INDEX]<<22:w=!0}else w=!0}else this.content=C[g.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|C[g.CHAR_DATA_WIDTH_INDEX]<<22;w&&(this.combinedData=C[g.CHAR_DATA_CHAR_INDEX],this.content=2097152|C[g.CHAR_DATA_WIDTH_INDEX]<<22)}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}r.CellData=f},643:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.WHITESPACE_CELL_CODE=r.WHITESPACE_CELL_WIDTH=r.WHITESPACE_CELL_CHAR=r.NULL_CELL_CODE=r.NULL_CELL_WIDTH=r.NULL_CELL_CHAR=r.CHAR_DATA_CODE_INDEX=r.CHAR_DATA_WIDTH_INDEX=r.CHAR_DATA_CHAR_INDEX=r.CHAR_DATA_ATTR_INDEX=r.DEFAULT_EXT=r.DEFAULT_ATTR=r.DEFAULT_COLOR=void 0,r.DEFAULT_COLOR=0,r.DEFAULT_ATTR=256|r.DEFAULT_COLOR<<9,r.DEFAULT_EXT=0,r.CHAR_DATA_ATTR_INDEX=0,r.CHAR_DATA_CHAR_INDEX=1,r.CHAR_DATA_WIDTH_INDEX=2,r.CHAR_DATA_CODE_INDEX=3,r.NULL_CELL_CHAR="",r.NULL_CELL_WIDTH=1,r.NULL_CELL_CODE=0,r.WHITESPACE_CELL_CHAR=" ",r.WHITESPACE_CELL_WIDTH=1,r.WHITESPACE_CELL_CODE=32},4863:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Marker=void 0;const u=n(8460),g=n(844);class l{get id(){return this._id}constructor(b){this.line=b,this.isDisposed=!1,this._disposables=[],this._id=l._nextId++,this._onDispose=this.register(new u.EventEmitter),this.onDispose=this._onDispose.event}dispose(){this.isDisposed||(this.isDisposed=!0,this.line=-1,this._onDispose.fire(),(0,g.disposeArray)(this._disposables),this._disposables.length=0)}register(b){return this._disposables.push(b),b}}r.Marker=l,l._nextId=1},7116:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_CHARSET=r.CHARSETS=void 0,r.CHARSETS={},r.DEFAULT_CHARSET=r.CHARSETS.B,r.CHARSETS[0]={"`":"\u25C6",a:"\u2592",b:"\u2409",c:"\u240C",d:"\u240D",e:"\u240A",f:"\xB0",g:"\xB1",h:"\u2424",i:"\u240B",j:"\u2518",k:"\u2510",l:"\u250C",m:"\u2514",n:"\u253C",o:"\u23BA",p:"\u23BB",q:"\u2500",r:"\u23BC",s:"\u23BD",t:"\u251C",u:"\u2524",v:"\u2534",w:"\u252C",x:"\u2502",y:"\u2264",z:"\u2265","{":"\u03C0","|":"\u2260","}":"\xA3","~":"\xB7"},r.CHARSETS.A={"#":"\xA3"},r.CHARSETS.B=void 0,r.CHARSETS[4]={"#":"\xA3","@":"\xBE","[":"ij","\\":"\xBD","]":"|","{":"\xA8","|":"f","}":"\xBC","~":"\xB4"},r.CHARSETS.C=r.CHARSETS[5]={"[":"\xC4","\\":"\xD6","]":"\xC5","^":"\xDC","`":"\xE9","{":"\xE4","|":"\xF6","}":"\xE5","~":"\xFC"},r.CHARSETS.R={"#":"\xA3","@":"\xE0","[":"\xB0","\\":"\xE7","]":"\xA7","{":"\xE9","|":"\xF9","}":"\xE8","~":"\xA8"},r.CHARSETS.Q={"@":"\xE0","[":"\xE2","\\":"\xE7","]":"\xEA","^":"\xEE","`":"\xF4","{":"\xE9","|":"\xF9","}":"\xE8","~":"\xFB"},r.CHARSETS.K={"@":"\xA7","[":"\xC4","\\":"\xD6","]":"\xDC","{":"\xE4","|":"\xF6","}":"\xFC","~":"\xDF"},r.CHARSETS.Y={"#":"\xA3","@":"\xA7","[":"\xB0","\\":"\xE7","]":"\xE9","`":"\xF9","{":"\xE0","|":"\xF2","}":"\xE8","~":"\xEC"},r.CHARSETS.E=r.CHARSETS[6]={"@":"\xC4","[":"\xC6","\\":"\xD8","]":"\xC5","^":"\xDC","`":"\xE4","{":"\xE6","|":"\xF8","}":"\xE5","~":"\xFC"},r.CHARSETS.Z={"#":"\xA3","@":"\xA7","[":"\xA1","\\":"\xD1","]":"\xBF","{":"\xB0","|":"\xF1","}":"\xE7"},r.CHARSETS.H=r.CHARSETS[7]={"@":"\xC9","[":"\xC4","\\":"\xD6","]":"\xC5","^":"\xDC","`":"\xE9","{":"\xE4","|":"\xF6","}":"\xE5","~":"\xFC"},r.CHARSETS["="]={"#":"\xF9","@":"\xE0","[":"\xE9","\\":"\xE7","]":"\xEA","^":"\xEE",_:"\xE8","`":"\xF4","{":"\xE4","|":"\xF6","}":"\xFC","~":"\xFB"}},2584:(S,r)=>{var n,u,g;Object.defineProperty(r,"__esModule",{value:!0}),r.C1_ESCAPED=r.C1=r.C0=void 0,function(l){l.NUL="\0",l.SOH="",l.STX="",l.ETX="",l.EOT="",l.ENQ="",l.ACK="",l.BEL="\x07",l.BS="\b",l.HT="	",l.LF=`
`,l.VT="\v",l.FF="\f",l.CR="\r",l.SO="",l.SI="",l.DLE="",l.DC1="",l.DC2="",l.DC3="",l.DC4="",l.NAK="",l.SYN="",l.ETB="",l.CAN="",l.EM="",l.SUB="",l.ESC="\x1B",l.FS="",l.GS="",l.RS="",l.US="",l.SP=" ",l.DEL="\x7F"}(n||(r.C0=n={})),function(l){l.PAD="\x80",l.HOP="\x81",l.BPH="\x82",l.NBH="\x83",l.IND="\x84",l.NEL="\x85",l.SSA="\x86",l.ESA="\x87",l.HTS="\x88",l.HTJ="\x89",l.VTS="\x8A",l.PLD="\x8B",l.PLU="\x8C",l.RI="\x8D",l.SS2="\x8E",l.SS3="\x8F",l.DCS="\x90",l.PU1="\x91",l.PU2="\x92",l.STS="\x93",l.CCH="\x94",l.MW="\x95",l.SPA="\x96",l.EPA="\x97",l.SOS="\x98",l.SGCI="\x99",l.SCI="\x9A",l.CSI="\x9B",l.ST="\x9C",l.OSC="\x9D",l.PM="\x9E",l.APC="\x9F"}(u||(r.C1=u={})),function(l){l.ST=`${n.ESC}\\`}(g||(r.C1_ESCAPED=g={}))},7399:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.evaluateKeyboardEvent=void 0;const u=n(2584),g={48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],186:[";",":"],187:["=","+"],188:[",","<"],189:["-","_"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"']};r.evaluateKeyboardEvent=function(l,f,b,C){const w={type:0,cancel:!1,key:void 0},o=(l.shiftKey?1:0)|(l.altKey?2:0)|(l.ctrlKey?4:0)|(l.metaKey?8:0);switch(l.keyCode){case 0:l.key==="UIKeyInputUpArrow"?w.key=f?u.C0.ESC+"OA":u.C0.ESC+"[A":l.key==="UIKeyInputLeftArrow"?w.key=f?u.C0.ESC+"OD":u.C0.ESC+"[D":l.key==="UIKeyInputRightArrow"?w.key=f?u.C0.ESC+"OC":u.C0.ESC+"[C":l.key==="UIKeyInputDownArrow"&&(w.key=f?u.C0.ESC+"OB":u.C0.ESC+"[B");break;case 8:if(l.altKey){w.key=u.C0.ESC+u.C0.DEL;break}w.key=u.C0.DEL;break;case 9:if(l.shiftKey){w.key=u.C0.ESC+"[Z";break}w.key=u.C0.HT,w.cancel=!0;break;case 13:w.key=l.altKey?u.C0.ESC+u.C0.CR:u.C0.CR,w.cancel=!0;break;case 27:w.key=u.C0.ESC,l.altKey&&(w.key=u.C0.ESC+u.C0.ESC),w.cancel=!0;break;case 37:if(l.metaKey)break;o?(w.key=u.C0.ESC+"[1;"+(o+1)+"D",w.key===u.C0.ESC+"[1;3D"&&(w.key=u.C0.ESC+(b?"b":"[1;5D"))):w.key=f?u.C0.ESC+"OD":u.C0.ESC+"[D";break;case 39:if(l.metaKey)break;o?(w.key=u.C0.ESC+"[1;"+(o+1)+"C",w.key===u.C0.ESC+"[1;3C"&&(w.key=u.C0.ESC+(b?"f":"[1;5C"))):w.key=f?u.C0.ESC+"OC":u.C0.ESC+"[C";break;case 38:if(l.metaKey)break;o?(w.key=u.C0.ESC+"[1;"+(o+1)+"A",b||w.key!==u.C0.ESC+"[1;3A"||(w.key=u.C0.ESC+"[1;5A")):w.key=f?u.C0.ESC+"OA":u.C0.ESC+"[A";break;case 40:if(l.metaKey)break;o?(w.key=u.C0.ESC+"[1;"+(o+1)+"B",b||w.key!==u.C0.ESC+"[1;3B"||(w.key=u.C0.ESC+"[1;5B")):w.key=f?u.C0.ESC+"OB":u.C0.ESC+"[B";break;case 45:l.shiftKey||l.ctrlKey||(w.key=u.C0.ESC+"[2~");break;case 46:w.key=o?u.C0.ESC+"[3;"+(o+1)+"~":u.C0.ESC+"[3~";break;case 36:w.key=o?u.C0.ESC+"[1;"+(o+1)+"H":f?u.C0.ESC+"OH":u.C0.ESC+"[H";break;case 35:w.key=o?u.C0.ESC+"[1;"+(o+1)+"F":f?u.C0.ESC+"OF":u.C0.ESC+"[F";break;case 33:l.shiftKey?w.type=2:l.ctrlKey?w.key=u.C0.ESC+"[5;"+(o+1)+"~":w.key=u.C0.ESC+"[5~";break;case 34:l.shiftKey?w.type=3:l.ctrlKey?w.key=u.C0.ESC+"[6;"+(o+1)+"~":w.key=u.C0.ESC+"[6~";break;case 112:w.key=o?u.C0.ESC+"[1;"+(o+1)+"P":u.C0.ESC+"OP";break;case 113:w.key=o?u.C0.ESC+"[1;"+(o+1)+"Q":u.C0.ESC+"OQ";break;case 114:w.key=o?u.C0.ESC+"[1;"+(o+1)+"R":u.C0.ESC+"OR";break;case 115:w.key=o?u.C0.ESC+"[1;"+(o+1)+"S":u.C0.ESC+"OS";break;case 116:w.key=o?u.C0.ESC+"[15;"+(o+1)+"~":u.C0.ESC+"[15~";break;case 117:w.key=o?u.C0.ESC+"[17;"+(o+1)+"~":u.C0.ESC+"[17~";break;case 118:w.key=o?u.C0.ESC+"[18;"+(o+1)+"~":u.C0.ESC+"[18~";break;case 119:w.key=o?u.C0.ESC+"[19;"+(o+1)+"~":u.C0.ESC+"[19~";break;case 120:w.key=o?u.C0.ESC+"[20;"+(o+1)+"~":u.C0.ESC+"[20~";break;case 121:w.key=o?u.C0.ESC+"[21;"+(o+1)+"~":u.C0.ESC+"[21~";break;case 122:w.key=o?u.C0.ESC+"[23;"+(o+1)+"~":u.C0.ESC+"[23~";break;case 123:w.key=o?u.C0.ESC+"[24;"+(o+1)+"~":u.C0.ESC+"[24~";break;default:if(!l.ctrlKey||l.shiftKey||l.altKey||l.metaKey)if(b&&!C||!l.altKey||l.metaKey)!b||l.altKey||l.ctrlKey||l.shiftKey||!l.metaKey?l.key&&!l.ctrlKey&&!l.altKey&&!l.metaKey&&l.keyCode>=48&&l.key.length===1?w.key=l.key:l.key&&l.ctrlKey&&(l.key==="_"&&(w.key=u.C0.US),l.key==="@"&&(w.key=u.C0.NUL)):l.keyCode===65&&(w.type=1);else{const d=g[l.keyCode],a=d==null?void 0:d[l.shiftKey?1:0];if(a)w.key=u.C0.ESC+a;else if(l.keyCode>=65&&l.keyCode<=90){const c=l.ctrlKey?l.keyCode-64:l.keyCode+32;let p=String.fromCharCode(c);l.shiftKey&&(p=p.toUpperCase()),w.key=u.C0.ESC+p}else if(l.keyCode===32)w.key=u.C0.ESC+(l.ctrlKey?u.C0.NUL:" ");else if(l.key==="Dead"&&l.code.startsWith("Key")){let c=l.code.slice(3,4);l.shiftKey||(c=c.toLowerCase()),w.key=u.C0.ESC+c,w.cancel=!0}}else l.keyCode>=65&&l.keyCode<=90?w.key=String.fromCharCode(l.keyCode-64):l.keyCode===32?w.key=u.C0.NUL:l.keyCode>=51&&l.keyCode<=55?w.key=String.fromCharCode(l.keyCode-51+27):l.keyCode===56?w.key=u.C0.DEL:l.keyCode===219?w.key=u.C0.ESC:l.keyCode===220?w.key=u.C0.FS:l.keyCode===221&&(w.key=u.C0.GS)}return w}},482:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Utf8ToUtf32=r.StringToUtf32=r.utf32ToString=r.stringFromCodePoint=void 0,r.stringFromCodePoint=function(n){return n>65535?(n-=65536,String.fromCharCode(55296+(n>>10))+String.fromCharCode(n%1024+56320)):String.fromCharCode(n)},r.utf32ToString=function(n,u=0,g=n.length){let l="";for(let f=u;f<g;++f){let b=n[f];b>65535?(b-=65536,l+=String.fromCharCode(55296+(b>>10))+String.fromCharCode(b%1024+56320)):l+=String.fromCharCode(b)}return l},r.StringToUtf32=class{constructor(){this._interim=0}clear(){this._interim=0}decode(n,u){const g=n.length;if(!g)return 0;let l=0,f=0;if(this._interim){const b=n.charCodeAt(f++);56320<=b&&b<=57343?u[l++]=1024*(this._interim-55296)+b-56320+65536:(u[l++]=this._interim,u[l++]=b),this._interim=0}for(let b=f;b<g;++b){const C=n.charCodeAt(b);if(55296<=C&&C<=56319){if(++b>=g)return this._interim=C,l;const w=n.charCodeAt(b);56320<=w&&w<=57343?u[l++]=1024*(C-55296)+w-56320+65536:(u[l++]=C,u[l++]=w)}else C!==65279&&(u[l++]=C)}return l}},r.Utf8ToUtf32=class{constructor(){this.interim=new Uint8Array(3)}clear(){this.interim.fill(0)}decode(n,u){const g=n.length;if(!g)return 0;let l,f,b,C,w=0,o=0,d=0;if(this.interim[0]){let p=!1,v=this.interim[0];v&=(224&v)==192?31:(240&v)==224?15:7;let x,E=0;for(;(x=63&this.interim[++E])&&E<4;)v<<=6,v|=x;const y=(224&this.interim[0])==192?2:(240&this.interim[0])==224?3:4,k=y-E;for(;d<k;){if(d>=g)return 0;if(x=n[d++],(192&x)!=128){d--,p=!0;break}this.interim[E++]=x,v<<=6,v|=63&x}p||(y===2?v<128?d--:u[w++]=v:y===3?v<2048||v>=55296&&v<=57343||v===65279||(u[w++]=v):v<65536||v>1114111||(u[w++]=v)),this.interim.fill(0)}const a=g-4;let c=d;for(;c<g;){for(;!(!(c<a)||128&(l=n[c])||128&(f=n[c+1])||128&(b=n[c+2])||128&(C=n[c+3]));)u[w++]=l,u[w++]=f,u[w++]=b,u[w++]=C,c+=4;if(l=n[c++],l<128)u[w++]=l;else if((224&l)==192){if(c>=g)return this.interim[0]=l,w;if(f=n[c++],(192&f)!=128){c--;continue}if(o=(31&l)<<6|63&f,o<128){c--;continue}u[w++]=o}else if((240&l)==224){if(c>=g)return this.interim[0]=l,w;if(f=n[c++],(192&f)!=128){c--;continue}if(c>=g)return this.interim[0]=l,this.interim[1]=f,w;if(b=n[c++],(192&b)!=128){c--;continue}if(o=(15&l)<<12|(63&f)<<6|63&b,o<2048||o>=55296&&o<=57343||o===65279)continue;u[w++]=o}else if((248&l)==240){if(c>=g)return this.interim[0]=l,w;if(f=n[c++],(192&f)!=128){c--;continue}if(c>=g)return this.interim[0]=l,this.interim[1]=f,w;if(b=n[c++],(192&b)!=128){c--;continue}if(c>=g)return this.interim[0]=l,this.interim[1]=f,this.interim[2]=b,w;if(C=n[c++],(192&C)!=128){c--;continue}if(o=(7&l)<<18|(63&f)<<12|(63&b)<<6|63&C,o<65536||o>1114111)continue;u[w++]=o}}return w}}},225:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.UnicodeV6=void 0;const n=[[768,879],[1155,1158],[1160,1161],[1425,1469],[1471,1471],[1473,1474],[1476,1477],[1479,1479],[1536,1539],[1552,1557],[1611,1630],[1648,1648],[1750,1764],[1767,1768],[1770,1773],[1807,1807],[1809,1809],[1840,1866],[1958,1968],[2027,2035],[2305,2306],[2364,2364],[2369,2376],[2381,2381],[2385,2388],[2402,2403],[2433,2433],[2492,2492],[2497,2500],[2509,2509],[2530,2531],[2561,2562],[2620,2620],[2625,2626],[2631,2632],[2635,2637],[2672,2673],[2689,2690],[2748,2748],[2753,2757],[2759,2760],[2765,2765],[2786,2787],[2817,2817],[2876,2876],[2879,2879],[2881,2883],[2893,2893],[2902,2902],[2946,2946],[3008,3008],[3021,3021],[3134,3136],[3142,3144],[3146,3149],[3157,3158],[3260,3260],[3263,3263],[3270,3270],[3276,3277],[3298,3299],[3393,3395],[3405,3405],[3530,3530],[3538,3540],[3542,3542],[3633,3633],[3636,3642],[3655,3662],[3761,3761],[3764,3769],[3771,3772],[3784,3789],[3864,3865],[3893,3893],[3895,3895],[3897,3897],[3953,3966],[3968,3972],[3974,3975],[3984,3991],[3993,4028],[4038,4038],[4141,4144],[4146,4146],[4150,4151],[4153,4153],[4184,4185],[4448,4607],[4959,4959],[5906,5908],[5938,5940],[5970,5971],[6002,6003],[6068,6069],[6071,6077],[6086,6086],[6089,6099],[6109,6109],[6155,6157],[6313,6313],[6432,6434],[6439,6440],[6450,6450],[6457,6459],[6679,6680],[6912,6915],[6964,6964],[6966,6970],[6972,6972],[6978,6978],[7019,7027],[7616,7626],[7678,7679],[8203,8207],[8234,8238],[8288,8291],[8298,8303],[8400,8431],[12330,12335],[12441,12442],[43014,43014],[43019,43019],[43045,43046],[64286,64286],[65024,65039],[65056,65059],[65279,65279],[65529,65531]],u=[[68097,68099],[68101,68102],[68108,68111],[68152,68154],[68159,68159],[119143,119145],[119155,119170],[119173,119179],[119210,119213],[119362,119364],[917505,917505],[917536,917631],[917760,917999]];let g;r.UnicodeV6=class{constructor(){if(this.version="6",!g){g=new Uint8Array(65536),g.fill(1),g[0]=0,g.fill(0,1,32),g.fill(0,127,160),g.fill(2,4352,4448),g[9001]=2,g[9002]=2,g.fill(2,11904,42192),g[12351]=1,g.fill(2,44032,55204),g.fill(2,63744,64256),g.fill(2,65040,65050),g.fill(2,65072,65136),g.fill(2,65280,65377),g.fill(2,65504,65511);for(let l=0;l<n.length;++l)g.fill(0,n[l][0],n[l][1]+1)}}wcwidth(l){return l<32?0:l<127?1:l<65536?g[l]:function(f,b){let C,w=0,o=b.length-1;if(f<b[0][0]||f>b[o][1])return!1;for(;o>=w;)if(C=w+o>>1,f>b[C][1])w=C+1;else{if(!(f<b[C][0]))return!0;o=C-1}return!1}(l,u)?0:l>=131072&&l<=196605||l>=196608&&l<=262141?2:1}}},5981:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.WriteBuffer=void 0;const u=n(8460),g=n(844);class l extends g.Disposable{constructor(b){super(),this._action=b,this._writeBuffer=[],this._callbacks=[],this._pendingData=0,this._bufferOffset=0,this._isSyncWriting=!1,this._syncCalls=0,this._didUserInput=!1,this._onWriteParsed=this.register(new u.EventEmitter),this.onWriteParsed=this._onWriteParsed.event}handleUserInput(){this._didUserInput=!0}writeSync(b,C){if(C!==void 0&&this._syncCalls>C)return void(this._syncCalls=0);if(this._pendingData+=b.length,this._writeBuffer.push(b),this._callbacks.push(void 0),this._syncCalls++,this._isSyncWriting)return;let w;for(this._isSyncWriting=!0;w=this._writeBuffer.shift();){this._action(w);const o=this._callbacks.shift();o&&o()}this._pendingData=0,this._bufferOffset=2147483647,this._isSyncWriting=!1,this._syncCalls=0}write(b,C){if(this._pendingData>5e7)throw new Error("write data discarded, use flow control to avoid losing data");if(!this._writeBuffer.length){if(this._bufferOffset=0,this._didUserInput)return this._didUserInput=!1,this._pendingData+=b.length,this._writeBuffer.push(b),this._callbacks.push(C),void this._innerWrite();setTimeout(()=>this._innerWrite())}this._pendingData+=b.length,this._writeBuffer.push(b),this._callbacks.push(C)}_innerWrite(b=0,C=!0){const w=b||Date.now();for(;this._writeBuffer.length>this._bufferOffset;){const o=this._writeBuffer[this._bufferOffset],d=this._action(o,C);if(d){const c=p=>Date.now()-w>=12?setTimeout(()=>this._innerWrite(0,p)):this._innerWrite(w,p);return void d.catch(p=>(queueMicrotask(()=>{throw p}),Promise.resolve(!1))).then(c)}const a=this._callbacks[this._bufferOffset];if(a&&a(),this._bufferOffset++,this._pendingData-=o.length,Date.now()-w>=12)break}this._writeBuffer.length>this._bufferOffset?(this._bufferOffset>50&&(this._writeBuffer=this._writeBuffer.slice(this._bufferOffset),this._callbacks=this._callbacks.slice(this._bufferOffset),this._bufferOffset=0),setTimeout(()=>this._innerWrite())):(this._writeBuffer.length=0,this._callbacks.length=0,this._pendingData=0,this._bufferOffset=0),this._onWriteParsed.fire()}}r.WriteBuffer=l},5941:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.toRgbString=r.parseColor=void 0;const n=/^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/,u=/^[\da-f]+$/;function g(l,f){const b=l.toString(16),C=b.length<2?"0"+b:b;switch(f){case 4:return b[0];case 8:return C;case 12:return(C+C).slice(0,3);default:return C+C}}r.parseColor=function(l){if(!l)return;let f=l.toLowerCase();if(f.indexOf("rgb:")===0){f=f.slice(4);const b=n.exec(f);if(b){const C=b[1]?15:b[4]?255:b[7]?4095:65535;return[Math.round(parseInt(b[1]||b[4]||b[7]||b[10],16)/C*255),Math.round(parseInt(b[2]||b[5]||b[8]||b[11],16)/C*255),Math.round(parseInt(b[3]||b[6]||b[9]||b[12],16)/C*255)]}}else if(f.indexOf("#")===0&&(f=f.slice(1),u.exec(f)&&[3,6,9,12].includes(f.length))){const b=f.length/3,C=[0,0,0];for(let w=0;w<3;++w){const o=parseInt(f.slice(b*w,b*w+b),16);C[w]=b===1?o<<4:b===2?o:b===3?o>>4:o>>8}return C}},r.toRgbString=function(l,f=16){const[b,C,w]=l;return`rgb:${g(b,f)}/${g(C,f)}/${g(w,f)}`}},5770:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.PAYLOAD_LIMIT=void 0,r.PAYLOAD_LIMIT=1e7},6351:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DcsHandler=r.DcsParser=void 0;const u=n(482),g=n(8742),l=n(5770),f=[];r.DcsParser=class{constructor(){this._handlers=Object.create(null),this._active=f,this._ident=0,this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=f}registerHandler(C,w){this._handlers[C]===void 0&&(this._handlers[C]=[]);const o=this._handlers[C];return o.push(w),{dispose:()=>{const d=o.indexOf(w);d!==-1&&o.splice(d,1)}}}clearHandler(C){this._handlers[C]&&delete this._handlers[C]}setHandlerFallback(C){this._handlerFb=C}reset(){if(this._active.length)for(let C=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;C>=0;--C)this._active[C].unhook(!1);this._stack.paused=!1,this._active=f,this._ident=0}hook(C,w){if(this.reset(),this._ident=C,this._active=this._handlers[C]||f,this._active.length)for(let o=this._active.length-1;o>=0;o--)this._active[o].hook(w);else this._handlerFb(this._ident,"HOOK",w)}put(C,w,o){if(this._active.length)for(let d=this._active.length-1;d>=0;d--)this._active[d].put(C,w,o);else this._handlerFb(this._ident,"PUT",(0,u.utf32ToString)(C,w,o))}unhook(C,w=!0){if(this._active.length){let o=!1,d=this._active.length-1,a=!1;if(this._stack.paused&&(d=this._stack.loopPosition-1,o=w,a=this._stack.fallThrough,this._stack.paused=!1),!a&&o===!1){for(;d>=0&&(o=this._active[d].unhook(C),o!==!0);d--)if(o instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=d,this._stack.fallThrough=!1,o;d--}for(;d>=0;d--)if(o=this._active[d].unhook(!1),o instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=d,this._stack.fallThrough=!0,o}else this._handlerFb(this._ident,"UNHOOK",C);this._active=f,this._ident=0}};const b=new g.Params;b.addParam(0),r.DcsHandler=class{constructor(C){this._handler=C,this._data="",this._params=b,this._hitLimit=!1}hook(C){this._params=C.length>1||C.params[0]?C.clone():b,this._data="",this._hitLimit=!1}put(C,w,o){this._hitLimit||(this._data+=(0,u.utf32ToString)(C,w,o),this._data.length>l.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}unhook(C){let w=!1;if(this._hitLimit)w=!1;else if(C&&(w=this._handler(this._data,this._params),w instanceof Promise))return w.then(o=>(this._params=b,this._data="",this._hitLimit=!1,o));return this._params=b,this._data="",this._hitLimit=!1,w}}},2015:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.EscapeSequenceParser=r.VT500_TRANSITION_TABLE=r.TransitionTable=void 0;const u=n(844),g=n(8742),l=n(6242),f=n(6351);class b{constructor(d){this.table=new Uint8Array(d)}setDefault(d,a){this.table.fill(d<<4|a)}add(d,a,c,p){this.table[a<<8|d]=c<<4|p}addMany(d,a,c,p){for(let v=0;v<d.length;v++)this.table[a<<8|d[v]]=c<<4|p}}r.TransitionTable=b;const C=160;r.VT500_TRANSITION_TABLE=function(){const o=new b(4095),d=Array.apply(null,Array(256)).map((E,y)=>y),a=(E,y)=>d.slice(E,y),c=a(32,127),p=a(0,24);p.push(25),p.push.apply(p,a(28,32));const v=a(0,14);let x;for(x in o.setDefault(1,0),o.addMany(c,0,2,0),v)o.addMany([24,26,153,154],x,3,0),o.addMany(a(128,144),x,3,0),o.addMany(a(144,152),x,3,0),o.add(156,x,0,0),o.add(27,x,11,1),o.add(157,x,4,8),o.addMany([152,158,159],x,0,7),o.add(155,x,11,3),o.add(144,x,11,9);return o.addMany(p,0,3,0),o.addMany(p,1,3,1),o.add(127,1,0,1),o.addMany(p,8,0,8),o.addMany(p,3,3,3),o.add(127,3,0,3),o.addMany(p,4,3,4),o.add(127,4,0,4),o.addMany(p,6,3,6),o.addMany(p,5,3,5),o.add(127,5,0,5),o.addMany(p,2,3,2),o.add(127,2,0,2),o.add(93,1,4,8),o.addMany(c,8,5,8),o.add(127,8,5,8),o.addMany([156,27,24,26,7],8,6,0),o.addMany(a(28,32),8,0,8),o.addMany([88,94,95],1,0,7),o.addMany(c,7,0,7),o.addMany(p,7,0,7),o.add(156,7,0,0),o.add(127,7,0,7),o.add(91,1,11,3),o.addMany(a(64,127),3,7,0),o.addMany(a(48,60),3,8,4),o.addMany([60,61,62,63],3,9,4),o.addMany(a(48,60),4,8,4),o.addMany(a(64,127),4,7,0),o.addMany([60,61,62,63],4,0,6),o.addMany(a(32,64),6,0,6),o.add(127,6,0,6),o.addMany(a(64,127),6,0,0),o.addMany(a(32,48),3,9,5),o.addMany(a(32,48),5,9,5),o.addMany(a(48,64),5,0,6),o.addMany(a(64,127),5,7,0),o.addMany(a(32,48),4,9,5),o.addMany(a(32,48),1,9,2),o.addMany(a(32,48),2,9,2),o.addMany(a(48,127),2,10,0),o.addMany(a(48,80),1,10,0),o.addMany(a(81,88),1,10,0),o.addMany([89,90,92],1,10,0),o.addMany(a(96,127),1,10,0),o.add(80,1,11,9),o.addMany(p,9,0,9),o.add(127,9,0,9),o.addMany(a(28,32),9,0,9),o.addMany(a(32,48),9,9,12),o.addMany(a(48,60),9,8,10),o.addMany([60,61,62,63],9,9,10),o.addMany(p,11,0,11),o.addMany(a(32,128),11,0,11),o.addMany(a(28,32),11,0,11),o.addMany(p,10,0,10),o.add(127,10,0,10),o.addMany(a(28,32),10,0,10),o.addMany(a(48,60),10,8,10),o.addMany([60,61,62,63],10,0,11),o.addMany(a(32,48),10,9,12),o.addMany(p,12,0,12),o.add(127,12,0,12),o.addMany(a(28,32),12,0,12),o.addMany(a(32,48),12,9,12),o.addMany(a(48,64),12,0,11),o.addMany(a(64,127),12,12,13),o.addMany(a(64,127),10,12,13),o.addMany(a(64,127),9,12,13),o.addMany(p,13,13,13),o.addMany(c,13,13,13),o.add(127,13,0,13),o.addMany([27,156,24,26],13,14,0),o.add(C,0,2,0),o.add(C,8,5,8),o.add(C,6,0,6),o.add(C,11,0,11),o.add(C,13,13,13),o}();class w extends u.Disposable{constructor(d=r.VT500_TRANSITION_TABLE){super(),this._transitions=d,this._parseStack={state:0,handlers:[],handlerPos:0,transition:0,chunkPos:0},this.initialState=0,this.currentState=this.initialState,this._params=new g.Params,this._params.addParam(0),this._collect=0,this.precedingCodepoint=0,this._printHandlerFb=(a,c,p)=>{},this._executeHandlerFb=a=>{},this._csiHandlerFb=(a,c)=>{},this._escHandlerFb=a=>{},this._errorHandlerFb=a=>a,this._printHandler=this._printHandlerFb,this._executeHandlers=Object.create(null),this._csiHandlers=Object.create(null),this._escHandlers=Object.create(null),this.register((0,u.toDisposable)(()=>{this._csiHandlers=Object.create(null),this._executeHandlers=Object.create(null),this._escHandlers=Object.create(null)})),this._oscParser=this.register(new l.OscParser),this._dcsParser=this.register(new f.DcsParser),this._errorHandler=this._errorHandlerFb,this.registerEscHandler({final:"\\"},()=>!0)}_identifier(d,a=[64,126]){let c=0;if(d.prefix){if(d.prefix.length>1)throw new Error("only one byte as prefix supported");if(c=d.prefix.charCodeAt(0),c&&60>c||c>63)throw new Error("prefix must be in range 0x3c .. 0x3f")}if(d.intermediates){if(d.intermediates.length>2)throw new Error("only two bytes as intermediates are supported");for(let v=0;v<d.intermediates.length;++v){const x=d.intermediates.charCodeAt(v);if(32>x||x>47)throw new Error("intermediate must be in range 0x20 .. 0x2f");c<<=8,c|=x}}if(d.final.length!==1)throw new Error("final must be a single byte");const p=d.final.charCodeAt(0);if(a[0]>p||p>a[1])throw new Error(`final must be in range ${a[0]} .. ${a[1]}`);return c<<=8,c|=p,c}identToString(d){const a=[];for(;d;)a.push(String.fromCharCode(255&d)),d>>=8;return a.reverse().join("")}setPrintHandler(d){this._printHandler=d}clearPrintHandler(){this._printHandler=this._printHandlerFb}registerEscHandler(d,a){const c=this._identifier(d,[48,126]);this._escHandlers[c]===void 0&&(this._escHandlers[c]=[]);const p=this._escHandlers[c];return p.push(a),{dispose:()=>{const v=p.indexOf(a);v!==-1&&p.splice(v,1)}}}clearEscHandler(d){this._escHandlers[this._identifier(d,[48,126])]&&delete this._escHandlers[this._identifier(d,[48,126])]}setEscHandlerFallback(d){this._escHandlerFb=d}setExecuteHandler(d,a){this._executeHandlers[d.charCodeAt(0)]=a}clearExecuteHandler(d){this._executeHandlers[d.charCodeAt(0)]&&delete this._executeHandlers[d.charCodeAt(0)]}setExecuteHandlerFallback(d){this._executeHandlerFb=d}registerCsiHandler(d,a){const c=this._identifier(d);this._csiHandlers[c]===void 0&&(this._csiHandlers[c]=[]);const p=this._csiHandlers[c];return p.push(a),{dispose:()=>{const v=p.indexOf(a);v!==-1&&p.splice(v,1)}}}clearCsiHandler(d){this._csiHandlers[this._identifier(d)]&&delete this._csiHandlers[this._identifier(d)]}setCsiHandlerFallback(d){this._csiHandlerFb=d}registerDcsHandler(d,a){return this._dcsParser.registerHandler(this._identifier(d),a)}clearDcsHandler(d){this._dcsParser.clearHandler(this._identifier(d))}setDcsHandlerFallback(d){this._dcsParser.setHandlerFallback(d)}registerOscHandler(d,a){return this._oscParser.registerHandler(d,a)}clearOscHandler(d){this._oscParser.clearHandler(d)}setOscHandlerFallback(d){this._oscParser.setHandlerFallback(d)}setErrorHandler(d){this._errorHandler=d}clearErrorHandler(){this._errorHandler=this._errorHandlerFb}reset(){this.currentState=this.initialState,this._oscParser.reset(),this._dcsParser.reset(),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingCodepoint=0,this._parseStack.state!==0&&(this._parseStack.state=2,this._parseStack.handlers=[])}_preserveStack(d,a,c,p,v){this._parseStack.state=d,this._parseStack.handlers=a,this._parseStack.handlerPos=c,this._parseStack.transition=p,this._parseStack.chunkPos=v}parse(d,a,c){let p,v=0,x=0,E=0;if(this._parseStack.state)if(this._parseStack.state===2)this._parseStack.state=0,E=this._parseStack.chunkPos+1;else{if(c===void 0||this._parseStack.state===1)throw this._parseStack.state=1,new Error("improper continuation due to previous async handler, giving up parsing");const y=this._parseStack.handlers;let k=this._parseStack.handlerPos-1;switch(this._parseStack.state){case 3:if(c===!1&&k>-1){for(;k>=0&&(p=y[k](this._params),p!==!0);k--)if(p instanceof Promise)return this._parseStack.handlerPos=k,p}this._parseStack.handlers=[];break;case 4:if(c===!1&&k>-1){for(;k>=0&&(p=y[k](),p!==!0);k--)if(p instanceof Promise)return this._parseStack.handlerPos=k,p}this._parseStack.handlers=[];break;case 6:if(v=d[this._parseStack.chunkPos],p=this._dcsParser.unhook(v!==24&&v!==26,c),p)return p;v===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0;break;case 5:if(v=d[this._parseStack.chunkPos],p=this._oscParser.end(v!==24&&v!==26,c),p)return p;v===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0}this._parseStack.state=0,E=this._parseStack.chunkPos+1,this.precedingCodepoint=0,this.currentState=15&this._parseStack.transition}for(let y=E;y<a;++y){switch(v=d[y],x=this._transitions.table[this.currentState<<8|(v<160?v:C)],x>>4){case 2:for(let O=y+1;;++O){if(O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}if(++O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}if(++O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}if(++O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}}break;case 3:this._executeHandlers[v]?this._executeHandlers[v]():this._executeHandlerFb(v),this.precedingCodepoint=0;break;case 0:break;case 1:if(this._errorHandler({position:y,code:v,currentState:this.currentState,collect:this._collect,params:this._params,abort:!1}).abort)return;break;case 7:const k=this._csiHandlers[this._collect<<8|v];let T=k?k.length-1:-1;for(;T>=0&&(p=k[T](this._params),p!==!0);T--)if(p instanceof Promise)return this._preserveStack(3,k,T,x,y),p;T<0&&this._csiHandlerFb(this._collect<<8|v,this._params),this.precedingCodepoint=0;break;case 8:do switch(v){case 59:this._params.addParam(0);break;case 58:this._params.addSubParam(-1);break;default:this._params.addDigit(v-48)}while(++y<a&&(v=d[y])>47&&v<60);y--;break;case 9:this._collect<<=8,this._collect|=v;break;case 10:const B=this._escHandlers[this._collect<<8|v];let R=B?B.length-1:-1;for(;R>=0&&(p=B[R](),p!==!0);R--)if(p instanceof Promise)return this._preserveStack(4,B,R,x,y),p;R<0&&this._escHandlerFb(this._collect<<8|v),this.precedingCodepoint=0;break;case 11:this._params.reset(),this._params.addParam(0),this._collect=0;break;case 12:this._dcsParser.hook(this._collect<<8|v,this._params);break;case 13:for(let O=y+1;;++O)if(O>=a||(v=d[O])===24||v===26||v===27||v>127&&v<C){this._dcsParser.put(d,y,O),y=O-1;break}break;case 14:if(p=this._dcsParser.unhook(v!==24&&v!==26),p)return this._preserveStack(6,[],0,x,y),p;v===27&&(x|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingCodepoint=0;break;case 4:this._oscParser.start();break;case 5:for(let O=y+1;;O++)if(O>=a||(v=d[O])<32||v>127&&v<C){this._oscParser.put(d,y,O),y=O-1;break}break;case 6:if(p=this._oscParser.end(v!==24&&v!==26),p)return this._preserveStack(5,[],0,x,y),p;v===27&&(x|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingCodepoint=0}this.currentState=15&x}}}r.EscapeSequenceParser=w},6242:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.OscHandler=r.OscParser=void 0;const u=n(5770),g=n(482),l=[];r.OscParser=class{constructor(){this._state=0,this._active=l,this._id=-1,this._handlers=Object.create(null),this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}registerHandler(f,b){this._handlers[f]===void 0&&(this._handlers[f]=[]);const C=this._handlers[f];return C.push(b),{dispose:()=>{const w=C.indexOf(b);w!==-1&&C.splice(w,1)}}}clearHandler(f){this._handlers[f]&&delete this._handlers[f]}setHandlerFallback(f){this._handlerFb=f}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=l}reset(){if(this._state===2)for(let f=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;f>=0;--f)this._active[f].end(!1);this._stack.paused=!1,this._active=l,this._id=-1,this._state=0}_start(){if(this._active=this._handlers[this._id]||l,this._active.length)for(let f=this._active.length-1;f>=0;f--)this._active[f].start();else this._handlerFb(this._id,"START")}_put(f,b,C){if(this._active.length)for(let w=this._active.length-1;w>=0;w--)this._active[w].put(f,b,C);else this._handlerFb(this._id,"PUT",(0,g.utf32ToString)(f,b,C))}start(){this.reset(),this._state=1}put(f,b,C){if(this._state!==3){if(this._state===1)for(;b<C;){const w=f[b++];if(w===59){this._state=2,this._start();break}if(w<48||57<w)return void(this._state=3);this._id===-1&&(this._id=0),this._id=10*this._id+w-48}this._state===2&&C-b>0&&this._put(f,b,C)}}end(f,b=!0){if(this._state!==0){if(this._state!==3)if(this._state===1&&this._start(),this._active.length){let C=!1,w=this._active.length-1,o=!1;if(this._stack.paused&&(w=this._stack.loopPosition-1,C=b,o=this._stack.fallThrough,this._stack.paused=!1),!o&&C===!1){for(;w>=0&&(C=this._active[w].end(f),C!==!0);w--)if(C instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=w,this._stack.fallThrough=!1,C;w--}for(;w>=0;w--)if(C=this._active[w].end(!1),C instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=w,this._stack.fallThrough=!0,C}else this._handlerFb(this._id,"END",f);this._active=l,this._id=-1,this._state=0}}},r.OscHandler=class{constructor(f){this._handler=f,this._data="",this._hitLimit=!1}start(){this._data="",this._hitLimit=!1}put(f,b,C){this._hitLimit||(this._data+=(0,g.utf32ToString)(f,b,C),this._data.length>u.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}end(f){let b=!1;if(this._hitLimit)b=!1;else if(f&&(b=this._handler(this._data),b instanceof Promise))return b.then(C=>(this._data="",this._hitLimit=!1,C));return this._data="",this._hitLimit=!1,b}}},8742:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Params=void 0;const n=2147483647;class u{static fromArray(l){const f=new u;if(!l.length)return f;for(let b=Array.isArray(l[0])?1:0;b<l.length;++b){const C=l[b];if(Array.isArray(C))for(let w=0;w<C.length;++w)f.addSubParam(C[w]);else f.addParam(C)}return f}constructor(l=32,f=32){if(this.maxLength=l,this.maxSubParamsLength=f,f>256)throw new Error("maxSubParamsLength must not be greater than 256");this.params=new Int32Array(l),this.length=0,this._subParams=new Int32Array(f),this._subParamsLength=0,this._subParamsIdx=new Uint16Array(l),this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}clone(){const l=new u(this.maxLength,this.maxSubParamsLength);return l.params.set(this.params),l.length=this.length,l._subParams.set(this._subParams),l._subParamsLength=this._subParamsLength,l._subParamsIdx.set(this._subParamsIdx),l._rejectDigits=this._rejectDigits,l._rejectSubDigits=this._rejectSubDigits,l._digitIsSub=this._digitIsSub,l}toArray(){const l=[];for(let f=0;f<this.length;++f){l.push(this.params[f]);const b=this._subParamsIdx[f]>>8,C=255&this._subParamsIdx[f];C-b>0&&l.push(Array.prototype.slice.call(this._subParams,b,C))}return l}reset(){this.length=0,this._subParamsLength=0,this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}addParam(l){if(this._digitIsSub=!1,this.length>=this.maxLength)this._rejectDigits=!0;else{if(l<-1)throw new Error("values lesser than -1 are not allowed");this._subParamsIdx[this.length]=this._subParamsLength<<8|this._subParamsLength,this.params[this.length++]=l>n?n:l}}addSubParam(l){if(this._digitIsSub=!0,this.length)if(this._rejectDigits||this._subParamsLength>=this.maxSubParamsLength)this._rejectSubDigits=!0;else{if(l<-1)throw new Error("values lesser than -1 are not allowed");this._subParams[this._subParamsLength++]=l>n?n:l,this._subParamsIdx[this.length-1]++}}hasSubParams(l){return(255&this._subParamsIdx[l])-(this._subParamsIdx[l]>>8)>0}getSubParams(l){const f=this._subParamsIdx[l]>>8,b=255&this._subParamsIdx[l];return b-f>0?this._subParams.subarray(f,b):null}getSubParamsAll(){const l={};for(let f=0;f<this.length;++f){const b=this._subParamsIdx[f]>>8,C=255&this._subParamsIdx[f];C-b>0&&(l[f]=this._subParams.slice(b,C))}return l}addDigit(l){let f;if(this._rejectDigits||!(f=this._digitIsSub?this._subParamsLength:this.length)||this._digitIsSub&&this._rejectSubDigits)return;const b=this._digitIsSub?this._subParams:this.params,C=b[f-1];b[f-1]=~C?Math.min(10*C+l,n):l}}r.Params=u},5741:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.AddonManager=void 0,r.AddonManager=class{constructor(){this._addons=[]}dispose(){for(let n=this._addons.length-1;n>=0;n--)this._addons[n].instance.dispose()}loadAddon(n,u){const g={instance:u,dispose:u.dispose,isDisposed:!1};this._addons.push(g),u.dispose=()=>this._wrappedAddonDispose(g),u.activate(n)}_wrappedAddonDispose(n){if(n.isDisposed)return;let u=-1;for(let g=0;g<this._addons.length;g++)if(this._addons[g]===n){u=g;break}if(u===-1)throw new Error("Could not dispose an addon that has not been loaded");n.isDisposed=!0,n.dispose.apply(n.instance),this._addons.splice(u,1)}}},8771:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferApiView=void 0;const u=n(3785),g=n(511);r.BufferApiView=class{constructor(l,f){this._buffer=l,this.type=f}init(l){return this._buffer=l,this}get cursorY(){return this._buffer.y}get cursorX(){return this._buffer.x}get viewportY(){return this._buffer.ydisp}get baseY(){return this._buffer.ybase}get length(){return this._buffer.lines.length}getLine(l){const f=this._buffer.lines.get(l);if(f)return new u.BufferLineApiView(f)}getNullCell(){return new g.CellData}}},3785:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferLineApiView=void 0;const u=n(511);r.BufferLineApiView=class{constructor(g){this._line=g}get isWrapped(){return this._line.isWrapped}get length(){return this._line.length}getCell(g,l){if(!(g<0||g>=this._line.length))return l?(this._line.loadCell(g,l),l):this._line.loadCell(g,new u.CellData)}translateToString(g,l,f){return this._line.translateToString(g,l,f)}}},8285:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferNamespaceApi=void 0;const u=n(8771),g=n(8460),l=n(844);class f extends l.Disposable{constructor(C){super(),this._core=C,this._onBufferChange=this.register(new g.EventEmitter),this.onBufferChange=this._onBufferChange.event,this._normal=new u.BufferApiView(this._core.buffers.normal,"normal"),this._alternate=new u.BufferApiView(this._core.buffers.alt,"alternate"),this._core.buffers.onBufferActivate(()=>this._onBufferChange.fire(this.active))}get active(){if(this._core.buffers.active===this._core.buffers.normal)return this.normal;if(this._core.buffers.active===this._core.buffers.alt)return this.alternate;throw new Error("Active buffer is neither normal nor alternate")}get normal(){return this._normal.init(this._core.buffers.normal)}get alternate(){return this._alternate.init(this._core.buffers.alt)}}r.BufferNamespaceApi=f},7975:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ParserApi=void 0,r.ParserApi=class{constructor(n){this._core=n}registerCsiHandler(n,u){return this._core.registerCsiHandler(n,g=>u(g.toArray()))}addCsiHandler(n,u){return this.registerCsiHandler(n,u)}registerDcsHandler(n,u){return this._core.registerDcsHandler(n,(g,l)=>u(g,l.toArray()))}addDcsHandler(n,u){return this.registerDcsHandler(n,u)}registerEscHandler(n,u){return this._core.registerEscHandler(n,u)}addEscHandler(n,u){return this.registerEscHandler(n,u)}registerOscHandler(n,u){return this._core.registerOscHandler(n,u)}addOscHandler(n,u){return this.registerOscHandler(n,u)}}},7090:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.UnicodeApi=void 0,r.UnicodeApi=class{constructor(n){this._core=n}register(n){this._core.unicodeService.register(n)}get versions(){return this._core.unicodeService.versions}get activeVersion(){return this._core.unicodeService.activeVersion}set activeVersion(n){this._core.unicodeService.activeVersion=n}}},744:function(S,r,n){var u=this&&this.__decorate||function(o,d,a,c){var p,v=arguments.length,x=v<3?d:c===null?c=Object.getOwnPropertyDescriptor(d,a):c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(o,d,a,c);else for(var E=o.length-1;E>=0;E--)(p=o[E])&&(x=(v<3?p(x):v>3?p(d,a,x):p(d,a))||x);return v>3&&x&&Object.defineProperty(d,a,x),x},g=this&&this.__param||function(o,d){return function(a,c){d(a,c,o)}};Object.defineProperty(r,"__esModule",{value:!0}),r.BufferService=r.MINIMUM_ROWS=r.MINIMUM_COLS=void 0;const l=n(8460),f=n(844),b=n(5295),C=n(2585);r.MINIMUM_COLS=2,r.MINIMUM_ROWS=1;let w=r.BufferService=class extends f.Disposable{get buffer(){return this.buffers.active}constructor(o){super(),this.isUserScrolling=!1,this._onResize=this.register(new l.EventEmitter),this.onResize=this._onResize.event,this._onScroll=this.register(new l.EventEmitter),this.onScroll=this._onScroll.event,this.cols=Math.max(o.rawOptions.cols||0,r.MINIMUM_COLS),this.rows=Math.max(o.rawOptions.rows||0,r.MINIMUM_ROWS),this.buffers=this.register(new b.BufferSet(o,this))}resize(o,d){this.cols=o,this.rows=d,this.buffers.resize(o,d),this._onResize.fire({cols:o,rows:d})}reset(){this.buffers.reset(),this.isUserScrolling=!1}scroll(o,d=!1){const a=this.buffer;let c;c=this._cachedBlankLine,c&&c.length===this.cols&&c.getFg(0)===o.fg&&c.getBg(0)===o.bg||(c=a.getBlankLine(o,d),this._cachedBlankLine=c),c.isWrapped=d;const p=a.ybase+a.scrollTop,v=a.ybase+a.scrollBottom;if(a.scrollTop===0){const x=a.lines.isFull;v===a.lines.length-1?x?a.lines.recycle().copyFrom(c):a.lines.push(c.clone()):a.lines.splice(v+1,0,c.clone()),x?this.isUserScrolling&&(a.ydisp=Math.max(a.ydisp-1,0)):(a.ybase++,this.isUserScrolling||a.ydisp++)}else{const x=v-p+1;a.lines.shiftElements(p+1,x-1,-1),a.lines.set(v,c.clone())}this.isUserScrolling||(a.ydisp=a.ybase),this._onScroll.fire(a.ydisp)}scrollLines(o,d,a){const c=this.buffer;if(o<0){if(c.ydisp===0)return;this.isUserScrolling=!0}else o+c.ydisp>=c.ybase&&(this.isUserScrolling=!1);const p=c.ydisp;c.ydisp=Math.max(Math.min(c.ydisp+o,c.ybase),0),p!==c.ydisp&&(d||this._onScroll.fire(c.ydisp))}};r.BufferService=w=u([g(0,C.IOptionsService)],w)},7994:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CharsetService=void 0,r.CharsetService=class{constructor(){this.glevel=0,this._charsets=[]}reset(){this.charset=void 0,this._charsets=[],this.glevel=0}setgLevel(n){this.glevel=n,this.charset=this._charsets[n]}setgCharset(n,u){this._charsets[n]=u,this.glevel===n&&(this.charset=u)}}},1753:function(S,r,n){var u=this&&this.__decorate||function(c,p,v,x){var E,y=arguments.length,k=y<3?p:x===null?x=Object.getOwnPropertyDescriptor(p,v):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")k=Reflect.decorate(c,p,v,x);else for(var T=c.length-1;T>=0;T--)(E=c[T])&&(k=(y<3?E(k):y>3?E(p,v,k):E(p,v))||k);return y>3&&k&&Object.defineProperty(p,v,k),k},g=this&&this.__param||function(c,p){return function(v,x){p(v,x,c)}};Object.defineProperty(r,"__esModule",{value:!0}),r.CoreMouseService=void 0;const l=n(2585),f=n(8460),b=n(844),C={NONE:{events:0,restrict:()=>!1},X10:{events:1,restrict:c=>c.button!==4&&c.action===1&&(c.ctrl=!1,c.alt=!1,c.shift=!1,!0)},VT200:{events:19,restrict:c=>c.action!==32},DRAG:{events:23,restrict:c=>c.action!==32||c.button!==3},ANY:{events:31,restrict:c=>!0}};function w(c,p){let v=(c.ctrl?16:0)|(c.shift?4:0)|(c.alt?8:0);return c.button===4?(v|=64,v|=c.action):(v|=3&c.button,4&c.button&&(v|=64),8&c.button&&(v|=128),c.action===32?v|=32:c.action!==0||p||(v|=3)),v}const o=String.fromCharCode,d={DEFAULT:c=>{const p=[w(c,!1)+32,c.col+32,c.row+32];return p[0]>255||p[1]>255||p[2]>255?"":`\x1B[M${o(p[0])}${o(p[1])}${o(p[2])}`},SGR:c=>{const p=c.action===0&&c.button!==4?"m":"M";return`\x1B[<${w(c,!0)};${c.col};${c.row}${p}`},SGR_PIXELS:c=>{const p=c.action===0&&c.button!==4?"m":"M";return`\x1B[<${w(c,!0)};${c.x};${c.y}${p}`}};let a=r.CoreMouseService=class extends b.Disposable{constructor(c,p){super(),this._bufferService=c,this._coreService=p,this._protocols={},this._encodings={},this._activeProtocol="",this._activeEncoding="",this._lastEvent=null,this._onProtocolChange=this.register(new f.EventEmitter),this.onProtocolChange=this._onProtocolChange.event;for(const v of Object.keys(C))this.addProtocol(v,C[v]);for(const v of Object.keys(d))this.addEncoding(v,d[v]);this.reset()}addProtocol(c,p){this._protocols[c]=p}addEncoding(c,p){this._encodings[c]=p}get activeProtocol(){return this._activeProtocol}get areMouseEventsActive(){return this._protocols[this._activeProtocol].events!==0}set activeProtocol(c){if(!this._protocols[c])throw new Error(`unknown protocol "${c}"`);this._activeProtocol=c,this._onProtocolChange.fire(this._protocols[c].events)}get activeEncoding(){return this._activeEncoding}set activeEncoding(c){if(!this._encodings[c])throw new Error(`unknown encoding "${c}"`);this._activeEncoding=c}reset(){this.activeProtocol="NONE",this.activeEncoding="DEFAULT",this._lastEvent=null}triggerMouseEvent(c){if(c.col<0||c.col>=this._bufferService.cols||c.row<0||c.row>=this._bufferService.rows||c.button===4&&c.action===32||c.button===3&&c.action!==32||c.button!==4&&(c.action===2||c.action===3)||(c.col++,c.row++,c.action===32&&this._lastEvent&&this._equalEvents(this._lastEvent,c,this._activeEncoding==="SGR_PIXELS"))||!this._protocols[this._activeProtocol].restrict(c))return!1;const p=this._encodings[this._activeEncoding](c);return p&&(this._activeEncoding==="DEFAULT"?this._coreService.triggerBinaryEvent(p):this._coreService.triggerDataEvent(p,!0)),this._lastEvent=c,!0}explainEvents(c){return{down:!!(1&c),up:!!(2&c),drag:!!(4&c),move:!!(8&c),wheel:!!(16&c)}}_equalEvents(c,p,v){if(v){if(c.x!==p.x||c.y!==p.y)return!1}else if(c.col!==p.col||c.row!==p.row)return!1;return c.button===p.button&&c.action===p.action&&c.ctrl===p.ctrl&&c.alt===p.alt&&c.shift===p.shift}};r.CoreMouseService=a=u([g(0,l.IBufferService),g(1,l.ICoreService)],a)},6975:function(S,r,n){var u=this&&this.__decorate||function(a,c,p,v){var x,E=arguments.length,y=E<3?c:v===null?v=Object.getOwnPropertyDescriptor(c,p):v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")y=Reflect.decorate(a,c,p,v);else for(var k=a.length-1;k>=0;k--)(x=a[k])&&(y=(E<3?x(y):E>3?x(c,p,y):x(c,p))||y);return E>3&&y&&Object.defineProperty(c,p,y),y},g=this&&this.__param||function(a,c){return function(p,v){c(p,v,a)}};Object.defineProperty(r,"__esModule",{value:!0}),r.CoreService=void 0;const l=n(1439),f=n(8460),b=n(844),C=n(2585),w=Object.freeze({insertMode:!1}),o=Object.freeze({applicationCursorKeys:!1,applicationKeypad:!1,bracketedPasteMode:!1,origin:!1,reverseWraparound:!1,sendFocus:!1,wraparound:!0});let d=r.CoreService=class extends b.Disposable{constructor(a,c,p){super(),this._bufferService=a,this._logService=c,this._optionsService=p,this.isCursorInitialized=!1,this.isCursorHidden=!1,this._onData=this.register(new f.EventEmitter),this.onData=this._onData.event,this._onUserInput=this.register(new f.EventEmitter),this.onUserInput=this._onUserInput.event,this._onBinary=this.register(new f.EventEmitter),this.onBinary=this._onBinary.event,this._onRequestScrollToBottom=this.register(new f.EventEmitter),this.onRequestScrollToBottom=this._onRequestScrollToBottom.event,this.modes=(0,l.clone)(w),this.decPrivateModes=(0,l.clone)(o)}reset(){this.modes=(0,l.clone)(w),this.decPrivateModes=(0,l.clone)(o)}triggerDataEvent(a,c=!1){if(this._optionsService.rawOptions.disableStdin)return;const p=this._bufferService.buffer;c&&this._optionsService.rawOptions.scrollOnUserInput&&p.ybase!==p.ydisp&&this._onRequestScrollToBottom.fire(),c&&this._onUserInput.fire(),this._logService.debug(`sending data "${a}"`,()=>a.split("").map(v=>v.charCodeAt(0))),this._onData.fire(a)}triggerBinaryEvent(a){this._optionsService.rawOptions.disableStdin||(this._logService.debug(`sending binary "${a}"`,()=>a.split("").map(c=>c.charCodeAt(0))),this._onBinary.fire(a))}};r.CoreService=d=u([g(0,C.IBufferService),g(1,C.ILogService),g(2,C.IOptionsService)],d)},9074:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DecorationService=void 0;const u=n(8055),g=n(8460),l=n(844),f=n(6106);let b=0,C=0;class w extends l.Disposable{get decorations(){return this._decorations.values()}constructor(){super(),this._decorations=new f.SortedList(a=>a==null?void 0:a.marker.line),this._onDecorationRegistered=this.register(new g.EventEmitter),this.onDecorationRegistered=this._onDecorationRegistered.event,this._onDecorationRemoved=this.register(new g.EventEmitter),this.onDecorationRemoved=this._onDecorationRemoved.event,this.register((0,l.toDisposable)(()=>this.reset()))}registerDecoration(a){if(a.marker.isDisposed)return;const c=new o(a);if(c){const p=c.marker.onDispose(()=>c.dispose());c.onDispose(()=>{c&&(this._decorations.delete(c)&&this._onDecorationRemoved.fire(c),p.dispose())}),this._decorations.insert(c),this._onDecorationRegistered.fire(c)}return c}reset(){for(const a of this._decorations.values())a.dispose();this._decorations.clear()}*getDecorationsAtCell(a,c,p){var v,x,E;let y=0,k=0;for(const T of this._decorations.getKeyIterator(c))y=(v=T.options.x)!==null&&v!==void 0?v:0,k=y+((x=T.options.width)!==null&&x!==void 0?x:1),a>=y&&a<k&&(!p||((E=T.options.layer)!==null&&E!==void 0?E:"bottom")===p)&&(yield T)}forEachDecorationAtCell(a,c,p,v){this._decorations.forEachByKey(c,x=>{var E,y,k;b=(E=x.options.x)!==null&&E!==void 0?E:0,C=b+((y=x.options.width)!==null&&y!==void 0?y:1),a>=b&&a<C&&(!p||((k=x.options.layer)!==null&&k!==void 0?k:"bottom")===p)&&v(x)})}}r.DecorationService=w;class o extends l.Disposable{get isDisposed(){return this._isDisposed}get backgroundColorRGB(){return this._cachedBg===null&&(this.options.backgroundColor?this._cachedBg=u.css.toColor(this.options.backgroundColor):this._cachedBg=void 0),this._cachedBg}get foregroundColorRGB(){return this._cachedFg===null&&(this.options.foregroundColor?this._cachedFg=u.css.toColor(this.options.foregroundColor):this._cachedFg=void 0),this._cachedFg}constructor(a){super(),this.options=a,this.onRenderEmitter=this.register(new g.EventEmitter),this.onRender=this.onRenderEmitter.event,this._onDispose=this.register(new g.EventEmitter),this.onDispose=this._onDispose.event,this._cachedBg=null,this._cachedFg=null,this.marker=a.marker,this.options.overviewRulerOptions&&!this.options.overviewRulerOptions.position&&(this.options.overviewRulerOptions.position="full")}dispose(){this._onDispose.fire(),super.dispose()}}},4348:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.InstantiationService=r.ServiceCollection=void 0;const u=n(2585),g=n(8343);class l{constructor(...b){this._entries=new Map;for(const[C,w]of b)this.set(C,w)}set(b,C){const w=this._entries.get(b);return this._entries.set(b,C),w}forEach(b){for(const[C,w]of this._entries.entries())b(C,w)}has(b){return this._entries.has(b)}get(b){return this._entries.get(b)}}r.ServiceCollection=l,r.InstantiationService=class{constructor(){this._services=new l,this._services.set(u.IInstantiationService,this)}setService(f,b){this._services.set(f,b)}getService(f){return this._services.get(f)}createInstance(f,...b){const C=(0,g.getServiceDependencies)(f).sort((d,a)=>d.index-a.index),w=[];for(const d of C){const a=this._services.get(d.id);if(!a)throw new Error(`[createInstance] ${f.name} depends on UNKNOWN service ${d.id}.`);w.push(a)}const o=C.length>0?C[0].index:b.length;if(b.length!==o)throw new Error(`[createInstance] First service dependency of ${f.name} at position ${o+1} conflicts with ${b.length} static arguments`);return new f(...b,...w)}}},7866:function(S,r,n){var u=this&&this.__decorate||function(o,d,a,c){var p,v=arguments.length,x=v<3?d:c===null?c=Object.getOwnPropertyDescriptor(d,a):c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(o,d,a,c);else for(var E=o.length-1;E>=0;E--)(p=o[E])&&(x=(v<3?p(x):v>3?p(d,a,x):p(d,a))||x);return v>3&&x&&Object.defineProperty(d,a,x),x},g=this&&this.__param||function(o,d){return function(a,c){d(a,c,o)}};Object.defineProperty(r,"__esModule",{value:!0}),r.traceCall=r.setTraceLogger=r.LogService=void 0;const l=n(844),f=n(2585),b={trace:f.LogLevelEnum.TRACE,debug:f.LogLevelEnum.DEBUG,info:f.LogLevelEnum.INFO,warn:f.LogLevelEnum.WARN,error:f.LogLevelEnum.ERROR,off:f.LogLevelEnum.OFF};let C,w=r.LogService=class extends l.Disposable{get logLevel(){return this._logLevel}constructor(o){super(),this._optionsService=o,this._logLevel=f.LogLevelEnum.OFF,this._updateLogLevel(),this.register(this._optionsService.onSpecificOptionChange("logLevel",()=>this._updateLogLevel())),C=this}_updateLogLevel(){this._logLevel=b[this._optionsService.rawOptions.logLevel]}_evalLazyOptionalParams(o){for(let d=0;d<o.length;d++)typeof o[d]=="function"&&(o[d]=o[d]())}_log(o,d,a){this._evalLazyOptionalParams(a),o.call(console,(this._optionsService.options.logger?"":"xterm.js: ")+d,...a)}trace(o,...d){var a,c;this._logLevel<=f.LogLevelEnum.TRACE&&this._log((c=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.trace.bind(this._optionsService.options.logger))!==null&&c!==void 0?c:console.log,o,d)}debug(o,...d){var a,c;this._logLevel<=f.LogLevelEnum.DEBUG&&this._log((c=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.debug.bind(this._optionsService.options.logger))!==null&&c!==void 0?c:console.log,o,d)}info(o,...d){var a,c;this._logLevel<=f.LogLevelEnum.INFO&&this._log((c=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.info.bind(this._optionsService.options.logger))!==null&&c!==void 0?c:console.info,o,d)}warn(o,...d){var a,c;this._logLevel<=f.LogLevelEnum.WARN&&this._log((c=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.warn.bind(this._optionsService.options.logger))!==null&&c!==void 0?c:console.warn,o,d)}error(o,...d){var a,c;this._logLevel<=f.LogLevelEnum.ERROR&&this._log((c=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.error.bind(this._optionsService.options.logger))!==null&&c!==void 0?c:console.error,o,d)}};r.LogService=w=u([g(0,f.IOptionsService)],w),r.setTraceLogger=function(o){C=o},r.traceCall=function(o,d,a){if(typeof a.value!="function")throw new Error("not supported");const c=a.value;a.value=function(...p){if(C.logLevel!==f.LogLevelEnum.TRACE)return c.apply(this,p);C.trace(`GlyphRenderer#${c.name}(${p.map(x=>JSON.stringify(x)).join(", ")})`);const v=c.apply(this,p);return C.trace(`GlyphRenderer#${c.name} return`,v),v}}},7302:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.OptionsService=r.DEFAULT_OPTIONS=void 0;const u=n(8460),g=n(844),l=n(6114);r.DEFAULT_OPTIONS={cols:80,rows:24,cursorBlink:!1,cursorStyle:"block",cursorWidth:1,cursorInactiveStyle:"outline",customGlyphs:!0,drawBoldTextInBrightColors:!0,fastScrollModifier:"alt",fastScrollSensitivity:5,fontFamily:"courier-new, courier, monospace",fontSize:15,fontWeight:"normal",fontWeightBold:"bold",ignoreBracketedPasteMode:!1,lineHeight:1,letterSpacing:0,linkHandler:null,logLevel:"info",logger:null,scrollback:1e3,scrollOnUserInput:!0,scrollSensitivity:1,screenReaderMode:!1,smoothScrollDuration:0,macOptionIsMeta:!1,macOptionClickForcesSelection:!1,minimumContrastRatio:1,disableStdin:!1,allowProposedApi:!1,allowTransparency:!1,tabStopWidth:8,theme:{},rightClickSelectsWord:l.isMac,windowOptions:{},windowsMode:!1,windowsPty:{},wordSeparator:" ()[]{}',\"`",altClickMovesCursor:!0,convertEol:!1,termName:"xterm",cancelEvents:!1,overviewRulerWidth:0};const f=["normal","bold","100","200","300","400","500","600","700","800","900"];class b extends g.Disposable{constructor(w){super(),this._onOptionChange=this.register(new u.EventEmitter),this.onOptionChange=this._onOptionChange.event;const o=Object.assign({},r.DEFAULT_OPTIONS);for(const d in w)if(d in o)try{const a=w[d];o[d]=this._sanitizeAndValidateOption(d,a)}catch(a){console.error(a)}this.rawOptions=o,this.options=Object.assign({},o),this._setupOptions()}onSpecificOptionChange(w,o){return this.onOptionChange(d=>{d===w&&o(this.rawOptions[w])})}onMultipleOptionChange(w,o){return this.onOptionChange(d=>{w.indexOf(d)!==-1&&o()})}_setupOptions(){const w=d=>{if(!(d in r.DEFAULT_OPTIONS))throw new Error(`No option with key "${d}"`);return this.rawOptions[d]},o=(d,a)=>{if(!(d in r.DEFAULT_OPTIONS))throw new Error(`No option with key "${d}"`);a=this._sanitizeAndValidateOption(d,a),this.rawOptions[d]!==a&&(this.rawOptions[d]=a,this._onOptionChange.fire(d))};for(const d in this.rawOptions){const a={get:w.bind(this,d),set:o.bind(this,d)};Object.defineProperty(this.options,d,a)}}_sanitizeAndValidateOption(w,o){switch(w){case"cursorStyle":if(o||(o=r.DEFAULT_OPTIONS[w]),!function(d){return d==="block"||d==="underline"||d==="bar"}(o))throw new Error(`"${o}" is not a valid value for ${w}`);break;case"wordSeparator":o||(o=r.DEFAULT_OPTIONS[w]);break;case"fontWeight":case"fontWeightBold":if(typeof o=="number"&&1<=o&&o<=1e3)break;o=f.includes(o)?o:r.DEFAULT_OPTIONS[w];break;case"cursorWidth":o=Math.floor(o);case"lineHeight":case"tabStopWidth":if(o<1)throw new Error(`${w} cannot be less than 1, value: ${o}`);break;case"minimumContrastRatio":o=Math.max(1,Math.min(21,Math.round(10*o)/10));break;case"scrollback":if((o=Math.min(o,4294967295))<0)throw new Error(`${w} cannot be less than 0, value: ${o}`);break;case"fastScrollSensitivity":case"scrollSensitivity":if(o<=0)throw new Error(`${w} cannot be less than or equal to 0, value: ${o}`);break;case"rows":case"cols":if(!o&&o!==0)throw new Error(`${w} must be numeric, value: ${o}`);break;case"windowsPty":o=o!=null?o:{}}return o}}r.OptionsService=b},2660:function(S,r,n){var u=this&&this.__decorate||function(b,C,w,o){var d,a=arguments.length,c=a<3?C:o===null?o=Object.getOwnPropertyDescriptor(C,w):o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(b,C,w,o);else for(var p=b.length-1;p>=0;p--)(d=b[p])&&(c=(a<3?d(c):a>3?d(C,w,c):d(C,w))||c);return a>3&&c&&Object.defineProperty(C,w,c),c},g=this&&this.__param||function(b,C){return function(w,o){C(w,o,b)}};Object.defineProperty(r,"__esModule",{value:!0}),r.OscLinkService=void 0;const l=n(2585);let f=r.OscLinkService=class{constructor(b){this._bufferService=b,this._nextId=1,this._entriesWithId=new Map,this._dataByLinkId=new Map}registerLink(b){const C=this._bufferService.buffer;if(b.id===void 0){const p=C.addMarker(C.ybase+C.y),v={data:b,id:this._nextId++,lines:[p]};return p.onDispose(()=>this._removeMarkerFromLink(v,p)),this._dataByLinkId.set(v.id,v),v.id}const w=b,o=this._getEntryIdKey(w),d=this._entriesWithId.get(o);if(d)return this.addLineToLink(d.id,C.ybase+C.y),d.id;const a=C.addMarker(C.ybase+C.y),c={id:this._nextId++,key:this._getEntryIdKey(w),data:w,lines:[a]};return a.onDispose(()=>this._removeMarkerFromLink(c,a)),this._entriesWithId.set(c.key,c),this._dataByLinkId.set(c.id,c),c.id}addLineToLink(b,C){const w=this._dataByLinkId.get(b);if(w&&w.lines.every(o=>o.line!==C)){const o=this._bufferService.buffer.addMarker(C);w.lines.push(o),o.onDispose(()=>this._removeMarkerFromLink(w,o))}}getLinkData(b){var C;return(C=this._dataByLinkId.get(b))===null||C===void 0?void 0:C.data}_getEntryIdKey(b){return`${b.id};;${b.uri}`}_removeMarkerFromLink(b,C){const w=b.lines.indexOf(C);w!==-1&&(b.lines.splice(w,1),b.lines.length===0&&(b.data.id!==void 0&&this._entriesWithId.delete(b.key),this._dataByLinkId.delete(b.id)))}};r.OscLinkService=f=u([g(0,l.IBufferService)],f)},8343:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.createDecorator=r.getServiceDependencies=r.serviceRegistry=void 0;const n="di$target",u="di$dependencies";r.serviceRegistry=new Map,r.getServiceDependencies=function(g){return g[u]||[]},r.createDecorator=function(g){if(r.serviceRegistry.has(g))return r.serviceRegistry.get(g);const l=function(f,b,C){if(arguments.length!==3)throw new Error("@IServiceName-decorator can only be used to decorate a parameter");(function(w,o,d){o[n]===o?o[u].push({id:w,index:d}):(o[u]=[{id:w,index:d}],o[n]=o)})(l,f,C)};return l.toString=()=>g,r.serviceRegistry.set(g,l),l}},2585:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.IDecorationService=r.IUnicodeService=r.IOscLinkService=r.IOptionsService=r.ILogService=r.LogLevelEnum=r.IInstantiationService=r.ICharsetService=r.ICoreService=r.ICoreMouseService=r.IBufferService=void 0;const u=n(8343);var g;r.IBufferService=(0,u.createDecorator)("BufferService"),r.ICoreMouseService=(0,u.createDecorator)("CoreMouseService"),r.ICoreService=(0,u.createDecorator)("CoreService"),r.ICharsetService=(0,u.createDecorator)("CharsetService"),r.IInstantiationService=(0,u.createDecorator)("InstantiationService"),function(l){l[l.TRACE=0]="TRACE",l[l.DEBUG=1]="DEBUG",l[l.INFO=2]="INFO",l[l.WARN=3]="WARN",l[l.ERROR=4]="ERROR",l[l.OFF=5]="OFF"}(g||(r.LogLevelEnum=g={})),r.ILogService=(0,u.createDecorator)("LogService"),r.IOptionsService=(0,u.createDecorator)("OptionsService"),r.IOscLinkService=(0,u.createDecorator)("OscLinkService"),r.IUnicodeService=(0,u.createDecorator)("UnicodeService"),r.IDecorationService=(0,u.createDecorator)("DecorationService")},1480:(S,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.UnicodeService=void 0;const u=n(8460),g=n(225);r.UnicodeService=class{constructor(){this._providers=Object.create(null),this._active="",this._onChange=new u.EventEmitter,this.onChange=this._onChange.event;const l=new g.UnicodeV6;this.register(l),this._active=l.version,this._activeProvider=l}dispose(){this._onChange.dispose()}get versions(){return Object.keys(this._providers)}get activeVersion(){return this._active}set activeVersion(l){if(!this._providers[l])throw new Error(`unknown Unicode version "${l}"`);this._active=l,this._activeProvider=this._providers[l],this._onChange.fire(l)}register(l){this._providers[l.version]=l}wcwidth(l){return this._activeProvider.wcwidth(l)}getStringCellWidth(l){let f=0;const b=l.length;for(let C=0;C<b;++C){let w=l.charCodeAt(C);if(55296<=w&&w<=56319){if(++C>=b)return f+this.wcwidth(w);const o=l.charCodeAt(C);56320<=o&&o<=57343?w=1024*(w-55296)+o-56320+65536:f+=this.wcwidth(o)}f+=this.wcwidth(w)}return f}}}},s={};function h(S){var r=s[S];if(r!==void 0)return r.exports;var n=s[S]={exports:{}};return i[S].call(n.exports,n,n.exports,h),n.exports}var m={};return(()=>{var S=m;Object.defineProperty(S,"__esModule",{value:!0}),S.Terminal=void 0;const r=h(9042),n=h(3236),u=h(844),g=h(5741),l=h(8285),f=h(7975),b=h(7090),C=["cols","rows"];class w extends u.Disposable{constructor(d){super(),this._core=this.register(new n.Terminal(d)),this._addonManager=this.register(new g.AddonManager),this._publicOptions=Object.assign({},this._core.options);const a=p=>this._core.options[p],c=(p,v)=>{this._checkReadonlyOptions(p),this._core.options[p]=v};for(const p in this._core.options){const v={get:a.bind(this,p),set:c.bind(this,p)};Object.defineProperty(this._publicOptions,p,v)}}_checkReadonlyOptions(d){if(C.includes(d))throw new Error(`Option "${d}" can only be set in the constructor`)}_checkProposedApi(){if(!this._core.optionsService.rawOptions.allowProposedApi)throw new Error("You must set the allowProposedApi option to true to use proposed API")}get onBell(){return this._core.onBell}get onBinary(){return this._core.onBinary}get onCursorMove(){return this._core.onCursorMove}get onData(){return this._core.onData}get onKey(){return this._core.onKey}get onLineFeed(){return this._core.onLineFeed}get onRender(){return this._core.onRender}get onResize(){return this._core.onResize}get onScroll(){return this._core.onScroll}get onSelectionChange(){return this._core.onSelectionChange}get onTitleChange(){return this._core.onTitleChange}get onWriteParsed(){return this._core.onWriteParsed}get element(){return this._core.element}get parser(){return this._parser||(this._parser=new f.ParserApi(this._core)),this._parser}get unicode(){return this._checkProposedApi(),new b.UnicodeApi(this._core)}get textarea(){return this._core.textarea}get rows(){return this._core.rows}get cols(){return this._core.cols}get buffer(){return this._buffer||(this._buffer=this.register(new l.BufferNamespaceApi(this._core))),this._buffer}get markers(){return this._checkProposedApi(),this._core.markers}get modes(){const d=this._core.coreService.decPrivateModes;let a="none";switch(this._core.coreMouseService.activeProtocol){case"X10":a="x10";break;case"VT200":a="vt200";break;case"DRAG":a="drag";break;case"ANY":a="any"}return{applicationCursorKeysMode:d.applicationCursorKeys,applicationKeypadMode:d.applicationKeypad,bracketedPasteMode:d.bracketedPasteMode,insertMode:this._core.coreService.modes.insertMode,mouseTrackingMode:a,originMode:d.origin,reverseWraparoundMode:d.reverseWraparound,sendFocusMode:d.sendFocus,wraparoundMode:d.wraparound}}get options(){return this._publicOptions}set options(d){for(const a in d)this._publicOptions[a]=d[a]}blur(){this._core.blur()}focus(){this._core.focus()}resize(d,a){this._verifyIntegers(d,a),this._core.resize(d,a)}open(d){this._core.open(d)}attachCustomKeyEventHandler(d){this._core.attachCustomKeyEventHandler(d)}registerLinkProvider(d){return this._core.registerLinkProvider(d)}registerCharacterJoiner(d){return this._checkProposedApi(),this._core.registerCharacterJoiner(d)}deregisterCharacterJoiner(d){this._checkProposedApi(),this._core.deregisterCharacterJoiner(d)}registerMarker(d=0){return this._verifyIntegers(d),this._core.registerMarker(d)}registerDecoration(d){var a,c,p;return this._checkProposedApi(),this._verifyPositiveIntegers((a=d.x)!==null&&a!==void 0?a:0,(c=d.width)!==null&&c!==void 0?c:0,(p=d.height)!==null&&p!==void 0?p:0),this._core.registerDecoration(d)}hasSelection(){return this._core.hasSelection()}select(d,a,c){this._verifyIntegers(d,a,c),this._core.select(d,a,c)}getSelection(){return this._core.getSelection()}getSelectionPosition(){return this._core.getSelectionPosition()}clearSelection(){this._core.clearSelection()}selectAll(){this._core.selectAll()}selectLines(d,a){this._verifyIntegers(d,a),this._core.selectLines(d,a)}dispose(){super.dispose()}scrollLines(d){this._verifyIntegers(d),this._core.scrollLines(d)}scrollPages(d){this._verifyIntegers(d),this._core.scrollPages(d)}scrollToTop(){this._core.scrollToTop()}scrollToBottom(){this._core.scrollToBottom()}scrollToLine(d){this._verifyIntegers(d),this._core.scrollToLine(d)}clear(){this._core.clear()}write(d,a){this._core.write(d,a)}writeln(d,a){this._core.write(d),this._core.write(`\r
`,a)}paste(d){this._core.paste(d)}refresh(d,a){this._verifyIntegers(d,a),this._core.refresh(d,a)}reset(){this._core.reset()}clearTextureAtlas(){this._core.clearTextureAtlas()}loadAddon(d){this._addonManager.loadAddon(this,d)}static get strings(){return r}_verifyIntegers(...d){for(const a of d)if(a===1/0||isNaN(a)||a%1!=0)throw new Error("This API only accepts integers")}_verifyPositiveIntegers(...d){for(const a of d)if(a&&(a===1/0||isNaN(a)||a%1!=0||a<0))throw new Error("This API only accepts positive integers")}}S.Terminal=w})(),m})())})(So);var xo={exports:{}};(function(e,t){(function(i,s){e.exports=s()})(self,function(){return(()=>{var i={6:(S,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.LinkComputer=r.WebLinkProvider=void 0,r.WebLinkProvider=class{constructor(u,g,l,f={}){this._terminal=u,this._regex=g,this._handler=l,this._options=f}provideLinks(u,g){const l=n.computeLink(u,this._regex,this._terminal,this._handler);g(this._addCallbacks(l))}_addCallbacks(u){return u.map(g=>(g.leave=this._options.leave,g.hover=(l,f)=>{if(this._options.hover){const{range:b}=g;this._options.hover(l,f,b)}},g))}};class n{static computeLink(g,l,f,b){const C=new RegExp(l.source,(l.flags||"")+"g"),[w,o]=n._getWindowedLineStrings(g-1,f),d=w.join("");let a;const c=[];for(;a=C.exec(d);){const p=a[0];try{const T=new URL(p),B=decodeURI(T.toString());if(p!==B&&p+"/"!==B)continue}catch{continue}const[v,x]=n._mapStrIdx(f,o,0,a.index),[E,y]=n._mapStrIdx(f,v,x,p.length);if(v===-1||x===-1||E===-1||y===-1)continue;const k={start:{x:x+1,y:v+1},end:{x:y,y:E+1}};c.push({range:k,text:p,activate:b})}return c}static _getWindowedLineStrings(g,l){let f,b=g,C=g,w=0,o="";const d=[];if(f=l.buffer.active.getLine(g)){const a=f.translateToString(!0);if(f.isWrapped&&a[0]!==" "){for(w=0;(f=l.buffer.active.getLine(--b))&&w<2048&&(o=f.translateToString(!0),w+=o.length,d.push(o),f.isWrapped&&o.indexOf(" ")===-1););d.reverse()}for(d.push(a),w=0;(f=l.buffer.active.getLine(++C))&&f.isWrapped&&w<2048&&(o=f.translateToString(!0),w+=o.length,d.push(o),o.indexOf(" ")===-1););}return[d,b]}static _mapStrIdx(g,l,f,b){const C=g.buffer.active,w=C.getNullCell();let o=f;for(;b;){const d=C.getLine(l);if(!d)return[-1,-1];for(let a=o;a<d.length;++a){d.getCell(a,w);const c=w.getChars();if(w.getWidth()&&(b-=c.length||1,a===d.length-1&&c==="")){const p=C.getLine(l+1);p&&p.isWrapped&&(p.getCell(0,w),w.getWidth()===2&&(b+=1))}if(b<0)return[l,a]}l++,o=0}return[l,o]}}r.LinkComputer=n}},s={};function h(S){var r=s[S];if(r!==void 0)return r.exports;var n=s[S]={exports:{}};return i[S](n,n.exports,h),n.exports}var m={};return(()=>{var S=m;Object.defineProperty(S,"__esModule",{value:!0}),S.WebLinksAddon=void 0;const r=h(6),n=/https?:[/]{2}[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>]/;function u(g,l){const f=window.open();if(f){try{f.opener=null}catch{}f.location.href=l}else console.warn("Opening link blocked as opener could not be cleared")}S.WebLinksAddon=class{constructor(g=u,l={}){this._handler=g,this._options=l}activate(g){this._terminal=g;const l=this._options,f=l.urlRegex||n;this._linkProvider=this._terminal.registerLinkProvider(new r.WebLinkProvider(this._terminal,f,this._handler,l))}dispose(){var g;(g=this._linkProvider)===null||g===void 0||g.dispose()}}})(),m})()})})(xo);class mn extends So.exports.Terminal{constructor(i,s,h){super(i);me(this,"fitAddon");me(this,"device");this.fitAddon=s,this.loadAddon(this.fitAddon),this.loadAddon(new xo.exports.WebLinksAddon),this.device=h,this.onData(async m=>{try{m==="\x7F"||m==="\b"?(this.write("\b \b"),console.log("Backspace sent to device")):m==="\x1B[D"?this.write("\x1B[D"):m==="\x1B[C"&&this.write("\x1B[C"),await this.device.writeDevice(m)}catch(S){console.error("Error writing to device:",S)}})}async initialize(){const i=document.getElementById("terminal");i&&(i.style.height="170px",this.open(i),this.fitAddon.fit()),window.addEventListener("resize",()=>{this.fitAddon.fit()}),document.getElementById("download").addEventListener("click",()=>{this.downloadContents()}),document.getElementById("clear").addEventListener("click",()=>{this.clear()})}downloadContents(){if(this.rows===0){console.log("No output yet");return}this.selectAll();const i=this.getSelection();this.clearSelection();const s=URL.createObjectURL(new Blob([i],{type:"text/plain"})),h=document.createElement("a");h.download=`terminal_content_${new Date().getTime()}.txt`,h.href=s,h.click()}logToTerminal(i,s="info"){s==="error"?this.write(`\x1B[31m${i}\x1B[0m\r
`):this.write(`\x1B[32m${i}\x1B[0m\r
`)}}var ko={exports:{}};(function(e,t){(function(i,s){e.exports=s()})(self,function(){return(()=>{var i={};return(()=>{var s=i;Object.defineProperty(s,"__esModule",{value:!0}),s.FitAddon=void 0,s.FitAddon=class{constructor(){}activate(h){this._terminal=h}dispose(){}fit(){const h=this.proposeDimensions();if(!h||!this._terminal||isNaN(h.cols)||isNaN(h.rows))return;const m=this._terminal._core;this._terminal.rows===h.rows&&this._terminal.cols===h.cols||(m._renderService.clear(),this._terminal.resize(h.cols,h.rows))}proposeDimensions(){if(!this._terminal||!this._terminal.element||!this._terminal.element.parentElement)return;const h=this._terminal._core,m=h._renderService.dimensions;if(m.css.cell.width===0||m.css.cell.height===0)return;const S=this._terminal.options.scrollback===0?0:h.viewport.scrollBarWidth,r=window.getComputedStyle(this._terminal.element.parentElement),n=parseInt(r.getPropertyValue("height")),u=Math.max(0,parseInt(r.getPropertyValue("width"))),g=window.getComputedStyle(this._terminal.element),l=n-(parseInt(g.getPropertyValue("padding-top"))+parseInt(g.getPropertyValue("padding-bottom"))),f=u-(parseInt(g.getPropertyValue("padding-right"))+parseInt(g.getPropertyValue("padding-left")))-S;return{cols:Math.max(2,Math.floor(f/m.css.cell.width)),rows:Math.max(1,Math.floor(l/m.css.cell.height))}}}})(),i})()})})(ko);const vn=new TextEncoder;new TextDecoder;function wt(e){console.log(e)}const us=class{constructor(t=null){me(this,"connectButton");me(this,"serialPort");me(this,"serialReader",null);me(this,"serialWriter",null);me(this,"reading",!1);me(this,"terminalOutputCallback",null);me(this,"isTerminalOutput",!1);me(this,"leftoverData","");me(this,"replStatus",null);me(this,"onDisconnect",t=>{wt("\u30C7\u30D0\u30A4\u30B9\u5207\u65AD\u691C\u51FA"),this.cleanup()});this.terminalOutputCallback=t}async initialize(){this.connectButton=document.getElementById("connect"),this.connectButton&&(this.connectButton.disabled=!1,this.connectButton.addEventListener("click",async()=>{this.serialPort?await this.disconnect():await this.connect()}))}setUiDisconnected(){this.serialPort=void 0,console.log("<DISCONNECTED>"),this.connectButton&&(this.connectButton.textContent="\u305B\u3064\u305E\u304F",this.connectButton.classList.add("button-default")),document.dispatchEvent(new CustomEvent(us.EVENT_DISCONNECTED))}async cleanup(){var t,i;try{await this.stopReadLoop()}catch{}try{this.serialPort&&((i=(t=this.serialPort).removeEventListener)==null||i.call(t,"disconnect",this.onDisconnect),await this.serialPort.close())}catch(s){wt(`\u30AF\u30ED\u30FC\u30BA\u6642\u30A8\u30E9\u30FC: ${s}`)}finally{this.serialPort=void 0,this.setUiDisconnected()}}async disconnect(){await this.cleanup(),wt("\u624B\u52D5\u3067\u5207\u65AD\u3057\u307E\u3057\u305F")}async connect(){var t;this.reading=!1,this.isTerminalOutput=!1,this.leftoverData="",this.replStatus=null;try{const i=await navigator.serial.requestPort();this.serialPort=i;const s=115200;await i.open({baudRate:s}),await new Promise(h=>setTimeout(h,300)),console.log("<CONNECTED>",i),this.isTerminalOutput=!0,this.startReadLoop(!1,3),(t=i.addEventListener)==null||t.call(i,"disconnect",this.onDisconnect),this.connectButton&&(this.connectButton.textContent="\u305B\u3064\u3060\u3093",this.connectButton.classList.remove("button-default")),document.dispatchEvent(new CustomEvent(us.EVENT_CONNECTED))}catch(i){i instanceof Error&&console.error(`<ERROR: ${i.message}>`),this.setUiDisconnected()}}async stopReadLoop(){if(this.reading=!1,this.serialReader){try{await this.serialReader.cancel()}catch{}try{this.serialReader.releaseLock()}catch{}this.serialReader=null}}async resetReader(){this.stopReadLoop(),console.log("stopReadLoop called")}async streamRead(){const t=this.serialReader;if(!t)throw new Error("Reader is not available.");const{value:i,done:s}=await t.read();return console.log("Received chunk:",i==null?void 0:i.length,s),{value:i,done:s}}updateStatus(t){this.replStatus!==t&&(this.replStatus=t,console.log(`Status changed to: ${t}`),document.dispatchEvent(new CustomEvent("REPL_STATUS_CHANGED",{detail:{status:t}})))}getStatus(){return this.replStatus}setTerminalOutputEnabled(t){this.isTerminalOutput=t}async send(t){var i;if(!((i=this.serialPort)!=null&&i.writable)){wt("\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093\uFF08\u672A\u63A5\u7D9A\uFF09");return}try{const s=this.serialPort.writable.getWriter(),h=vn.encode(t);await s.write(h),await s.close(),s.releaseLock(),wt(`TX(${h.length}B): ${JSON.stringify(t)}`)}catch(s){wt(`\u9001\u4FE1\u30A8\u30E9\u30FC: ${s}`)}}async sendControl(t){var i;if(!((i=this.serialPort)!=null&&i.writable)){wt("\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093\uFF08\u672A\u63A5\u7D9A\uFF09");return}try{let s=this.serialWriter;s||(s=this.serialPort.writable.getWriter());const h=new Uint8Array([t]);await s.write(h),await s.close(),s.releaseLock(),s=null,wt(`TX control: 0x${t.toString(16).padStart(2,"0")}`)}catch(s){wt(`\u9001\u4FE1\u30A8\u30E9\u30FC: ${s}`)}}async startReadLoop(t=!1,i){var m;let s=this.leftoverData;this.leftoverData="";const h=1e4;if(!((m=this.serialPort)!=null&&m.readable))return console.error("serialPort.readable is not available"),"";this.serialReader||(this.serialReader=this.serialPort.readable.getReader()),this.reading=!0,console.log("\u53D7\u4FE1\u30EB\u30FC\u30D7\u958B\u59CB ",this.isTerminalOutput),i&&(console.log("Ctrl \u9001\u4FE1",i),await this.sendControl(i));try{for(;this.reading;){const{value:S,done:r}=await this.streamRead();if(r&&console.log("Stream closed",this.isTerminalOutput),r)break;const n=new TextDecoder("utf-8").decode(S);if(s+=n,s.slice(-6).includes(">>>")?(console.log("<REPL> prompt detected."),this.updateStatus("REPL")):(console.log("!REPL prompt NOT detected."),this.updateStatus("RUNNING")),this.isTerminalOutput&&this.terminalOutputCallback){const g=n.replace(/[^\x20-\x7E\u3000-\u9FFF\uFF00-\uFFEF\r\n]/g,"");this.terminalOutputCallback(g)}if(!t&&s.length>h&&(s=s.slice(s.length-h),console.error("Result size exceeded maximum limit. Trimming...")),t&&s.includes(t)){const[g,l]=s.split(t);s=g,this.leftoverData=l,console.log("Target string found, processing complete.");break}}}catch(S){console.error("Error processing reader data:",S)}return s}};let zt=us;me(zt,"EVENT_CONNECTED","serialport-connected"),me(zt,"EVENT_DISCONNECTED","serialport-disconnected");class _n{constructor(t){me(this,"serial");this.serial=t}async startReadLoop(t){return await this.serial.startReadLoop(t,!1)}async resetReader(){await this.serial.resetReader()}async enterRawMode(){this.serial.getStatus()!=="REPL"&&console.error("Not in REPL mode. Exiting..."),console.log("Entering RAW mode..."),this.serial.setTerminalOutputEnabled(!1),await this.serial.sendControl(1)}async exitRawMode(){this.serial.setTerminalOutputEnabled(!0),await this.serial.sendControl(2)}async executeCommand(t){console.log("executeCommand:",t);try{await this.enterRawMode(),await this.write(t),await this.serial.sendControl(4)}catch(i){console.error("Error executing command:",i)}finally{await this.exitRawMode()}}async sendCommand(t){console.log("sendCommand:",t);try{await this.write(t)}catch(i){console.error("Error executing sendCommand:",i)}}async writeFile(t,i){console.log("writeFile:",t);try{await this.enterRawMode(),await this.write(`with open("${t}", "wb") as f:\r`);const s=JSON.stringify(Array.from(i));await this.write(`  f.write(bytes(${s}))\r`),await this.serial.sendControl(4),console.log("Verifying written file...");const h=await this.readFile(t);if(!this.verifyContent(i,h))throw new Error("File verification failed: Written content does not match.");console.log("File verification succeeded.")}catch(s){const h=s;throw console.error("Error writing file:",h.message),new Error(`Failed to write file "${t}": ${h.message}`)}finally{}}verifyContent(t,i){if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s]!==i[s])return!1;return!0}async readFile(t){var s;console.log("readFile:",t);let i=new Uint8Array;try{await this.resetReader(),await this.enterRawMode(),await this.write(`with open("${t}", "rb") as f:\r`),await this.write("  import ubinascii\r"),await this.write("  print(ubinascii.hexlify(f.read()).decode())\r"),await this.serial.sendControl(4),await this.startReadLoop(">OK");const h=await this.startReadLoop("");this.startReadLoop(!1),i=new Uint8Array(((s=h.match(/.{1,2}/g))==null?void 0:s.map(S=>parseInt(S,16)))||[])}catch(h){console.error("Error reading file:",h)}finally{await this.exitRawMode()}return i}async getPyFileList(){console.log("getPyFileList");try{await this.resetReader(),await this.enterRawMode(),await this.write("import os\r"),await this.write("print(os.listdir())\r"),await this.serial.sendControl(4),console.log("Command sent:");const t=await this.startReadLoop(">OK");console.log("Skip:",t);const i=await this.startReadLoop("");return this.startReadLoop(!1),console.log("Received content:",i),await this.exitRawMode(),i.replace(/[\[\]'\s]/g,"").split(",").filter(h=>h.endsWith(".py")||h.endsWith(".txt"))}catch(t){return console.error("Error fetching file list:",t),[]}}async write(t){await this.serial.send(t)}async writeDevice(t){this.write(t)}}function bn(){return new Worker(""+new URL("editor.worker.efe3cf27.js",import.meta.url).href)}function yn(){return new Worker(""+new URL("json.worker.15dd1f87.js",import.meta.url).href)}function wn(){return new Worker(""+new URL("ts.worker.56a3bd1b.js",import.meta.url).href)}var Eo=Object.defineProperty,Sn=Object.defineProperties,Cn=Object.getOwnPropertyDescriptor,xn=Object.getOwnPropertyDescriptors,xr=Object.getOwnPropertySymbols,kn=Object.prototype.hasOwnProperty,En=Object.prototype.propertyIsEnumerable,Ls=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),ir=e=>{throw TypeError(e)},kr=(e,t,i)=>t in e?Eo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,Ct=(e,t)=>{for(var i in t||(t={}))kn.call(t,i)&&kr(e,i,t[i]);if(xr)for(var i of xr(t))En.call(t,i)&&kr(e,i,t[i]);return e},Oi=(e,t)=>Sn(e,xn(t)),_=(e,t,i,s)=>{for(var h=s>1?void 0:s?Cn(t,i):t,m=e.length-1,S;m>=0;m--)(S=e[m])&&(h=(s?S(t,i,h):S(h))||h);return s&&h&&Eo(t,i,h),h},Ao=(e,t,i)=>t.has(e)||ir("Cannot "+i),An=(e,t,i)=>(Ao(e,t,"read from private field"),i?i.call(e):t.get(e)),Ln=(e,t,i)=>t.has(e)?ir("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),Dn=(e,t,i,s)=>(Ao(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),Tn=function(e,t){this[0]=e,this[1]=t},Rn=e=>{var t=e[Ls("asyncIterator")],i=!1,s,h={};return t==null?(t=e[Ls("iterator")](),s=m=>h[m]=S=>t[m](S)):(t=t.call(e),s=m=>h[m]=S=>{if(i){if(i=!1,m==="throw")throw S;return S}return i=!0,{done:!1,value:new Tn(new Promise(r=>{var n=t[m](S);n instanceof Object||ir("Object expected"),r(n)}),1)}}),h[Ls("iterator")]=()=>h,s("next"),"throw"in t?s("throw"):h.throw=m=>{throw m},"return"in t&&s("return"),h},fi=new WeakMap,gi=new WeakMap,mi=new WeakMap,Ds=new WeakSet,qi=new WeakMap,xt=class{constructor(e,t){this.handleFormData=i=>{const s=this.options.disabled(this.host),h=this.options.name(this.host),m=this.options.value(this.host),S=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!s&&!S&&typeof h=="string"&&h.length>0&&typeof m<"u"&&(Array.isArray(m)?m.forEach(r=>{i.formData.append(h,r.toString())}):i.formData.append(h,m.toString()))},this.handleFormSubmit=i=>{var s;const h=this.options.disabled(this.host),m=this.options.reportValidity;this.form&&!this.form.noValidate&&((s=fi.get(this.form))==null||s.forEach(S=>{this.setUserInteracted(S,!0)})),this.form&&!this.form.noValidate&&!h&&!m(this.host)&&(i.preventDefault(),i.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),qi.set(this.host,[])},this.handleInteraction=i=>{const s=qi.get(this.host);s.includes(i.type)||s.push(i.type),s.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const s of i)if(typeof s.checkValidity=="function"&&!s.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const s of i)if(typeof s.reportValidity=="function"&&!s.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=Ct({form:i=>{const s=i.form;if(s){const m=i.getRootNode().querySelector(`#${s}`);if(m)return m}return i.closest("form")},name:i=>i.name,value:i=>i.value,defaultValue:i=>i.defaultValue,disabled:i=>{var s;return(s=i.disabled)!=null?s:!1},reportValidity:i=>typeof i.reportValidity=="function"?i.reportValidity():!0,checkValidity:i=>typeof i.checkValidity=="function"?i.checkValidity():!0,setValue:(i,s)=>i.value=s,assumeInteractionOn:["sl-input"]},t)}hostConnected(){const e=this.options.form(this.host);e&&this.attachForm(e),qi.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),qi.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){const e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,fi.has(this.form)?fi.get(this.form).add(this.host):fi.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),gi.has(this.form)||(gi.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),mi.has(this.form)||(mi.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const e=fi.get(this.form);!e||(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),gi.has(this.form)&&(this.form.reportValidity=gi.get(this.form),gi.delete(this.form)),mi.has(this.form)&&(this.form.checkValidity=mi.get(this.form),mi.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?Ds.add(e):Ds.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){const i=document.createElement("button");i.type=e,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",t&&(i.name=t.name,i.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(s=>{t.hasAttribute(s)&&i.setAttribute(s,t.getAttribute(s))})),this.form.append(i),i.click(),i.remove()}}getForm(){var e;return(e=this.form)!=null?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){const t=this.host,i=Boolean(Ds.has(t)),s=Boolean(t.required);t.toggleAttribute("data-required",s),t.toggleAttribute("data-optional",!s),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&i),t.toggleAttribute("data-user-valid",e&&i)}updateValidity(){const e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){const t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||e==null||e.preventDefault()}},ps=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),$n=Object.freeze(Oi(Ct({},ps),{valid:!1,valueMissing:!0})),Bn=Object.freeze(Oi(Ct({},ps),{valid:!1,customError:!0}));/**
========
`)}clearSelection(){this._model.clearSelection(),this._removeMouseDownListeners(),this.refresh(),this._onSelectionChange.fire()}refresh(y){this._refreshAnimationFrame||(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._refresh())),d.isLinux&&y&&this.selectionText.length&&this._onLinuxMouseSelection.fire(this.selectionText)}_refresh(){this._refreshAnimationFrame=void 0,this._onRedrawRequest.fire({start:this._model.finalSelectionStart,end:this._model.finalSelectionEnd,columnSelectMode:this._activeSelectionMode===3})}_isClickInSelection(y){const k=this._getMouseBufferCoords(y),T=this._model.finalSelectionStart,B=this._model.finalSelectionEnd;return!!(T&&B&&k)&&this._areCoordsInSelection(k,T,B)}isCellInSelection(y,k){const T=this._model.finalSelectionStart,B=this._model.finalSelectionEnd;return!(!T||!B)&&this._areCoordsInSelection([y,k],T,B)}_areCoordsInSelection(y,k,T){return y[1]>k[1]&&y[1]<T[1]||k[1]===T[1]&&y[1]===k[1]&&y[0]>=k[0]&&y[0]<T[0]||k[1]<T[1]&&y[1]===T[1]&&y[0]<T[0]||k[1]<T[1]&&y[1]===k[1]&&y[0]>=k[0]}_selectWordAtCursor(y,k){var T,B;const R=(B=(T=this._linkifier.currentLink)===null||T===void 0?void 0:T.link)===null||B===void 0?void 0:B.range;if(R)return this._model.selectionStart=[R.start.x-1,R.start.y-1],this._model.selectionStartLength=(0,a.getRangeLength)(R,this._bufferService.cols),this._model.selectionEnd=void 0,!0;const O=this._getMouseBufferCoords(y);return!!O&&(this._selectWordAt(O,k),this._model.selectionEnd=void 0,!0)}selectAll(){this._model.isSelectAllActive=!0,this.refresh(),this._onSelectionChange.fire()}selectLines(y,k){this._model.clearSelection(),y=Math.max(y,0),k=Math.min(k,this._bufferService.buffer.lines.length-1),this._model.selectionStart=[0,y],this._model.selectionEnd=[this._bufferService.cols,k],this.refresh(),this._onSelectionChange.fire()}_handleTrim(y){this._model.handleTrim(y)&&this.refresh()}_getMouseBufferCoords(y){const k=this._mouseService.getCoords(y,this._screenElement,this._bufferService.cols,this._bufferService.rows,!0);if(k)return k[0]--,k[1]--,k[1]+=this._bufferService.buffer.ydisp,k}_getMouseEventScrollAmount(y){let k=(0,l.getCoordsRelativeToElement)(this._coreBrowserService.window,y,this._screenElement)[1];const T=this._renderService.dimensions.css.canvas.height;return k>=0&&k<=T?0:(k>T&&(k-=T),k=Math.min(Math.max(k,-50),50),k/=50,k/Math.abs(k)+Math.round(14*k))}shouldForceSelection(y){return d.isMac?y.altKey&&this._optionsService.rawOptions.macOptionClickForcesSelection:y.shiftKey}handleMouseDown(y){if(this._mouseDownTimeStamp=y.timeStamp,(y.button!==2||!this.hasSelection)&&y.button===0){if(!this._enabled){if(!this.shouldForceSelection(y))return;y.stopPropagation()}y.preventDefault(),this._dragScrollAmount=0,this._enabled&&y.shiftKey?this._handleIncrementalClick(y):y.detail===1?this._handleSingleClick(y):y.detail===2?this._handleDoubleClick(y):y.detail===3&&this._handleTripleClick(y),this._addMouseDownListeners(),this.refresh(!0)}}_addMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.addEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.addEventListener("mouseup",this._mouseUpListener)),this._dragScrollIntervalTimer=this._coreBrowserService.window.setInterval(()=>this._dragScroll(),50)}_removeMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.removeEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.removeEventListener("mouseup",this._mouseUpListener)),this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer),this._dragScrollIntervalTimer=void 0}_handleIncrementalClick(y){this._model.selectionStart&&(this._model.selectionEnd=this._getMouseBufferCoords(y))}_handleSingleClick(y){if(this._model.selectionStartLength=0,this._model.isSelectAllActive=!1,this._activeSelectionMode=this.shouldColumnSelect(y)?3:0,this._model.selectionStart=this._getMouseBufferCoords(y),!this._model.selectionStart)return;this._model.selectionEnd=void 0;const k=this._bufferService.buffer.lines.get(this._model.selectionStart[1]);k&&k.length!==this._model.selectionStart[0]&&k.hasWidth(this._model.selectionStart[0])===0&&this._model.selectionStart[0]++}_handleDoubleClick(y){this._selectWordAtCursor(y,!0)&&(this._activeSelectionMode=1)}_handleTripleClick(y){const k=this._getMouseBufferCoords(y);k&&(this._activeSelectionMode=2,this._selectLineAt(k[1]))}shouldColumnSelect(y){return y.altKey&&!(d.isMac&&this._optionsService.rawOptions.macOptionClickForcesSelection)}_handleMouseMove(y){if(y.stopImmediatePropagation(),!this._model.selectionStart)return;const k=this._model.selectionEnd?[this._model.selectionEnd[0],this._model.selectionEnd[1]]:null;if(this._model.selectionEnd=this._getMouseBufferCoords(y),!this._model.selectionEnd)return void this.refresh(!0);this._activeSelectionMode===2?this._model.selectionEnd[1]<this._model.selectionStart[1]?this._model.selectionEnd[0]=0:this._model.selectionEnd[0]=this._bufferService.cols:this._activeSelectionMode===1&&this._selectToWordAt(this._model.selectionEnd),this._dragScrollAmount=this._getMouseEventScrollAmount(y),this._activeSelectionMode!==3&&(this._dragScrollAmount>0?this._model.selectionEnd[0]=this._bufferService.cols:this._dragScrollAmount<0&&(this._model.selectionEnd[0]=0));const T=this._bufferService.buffer;if(this._model.selectionEnd[1]<T.lines.length){const B=T.lines.get(this._model.selectionEnd[1]);B&&B.hasWidth(this._model.selectionEnd[0])===0&&this._model.selectionEnd[0]++}k&&k[0]===this._model.selectionEnd[0]&&k[1]===this._model.selectionEnd[1]||this.refresh(!0)}_dragScroll(){if(this._model.selectionEnd&&this._model.selectionStart&&this._dragScrollAmount){this._onRequestScrollLines.fire({amount:this._dragScrollAmount,suppressScrollEvent:!1});const y=this._bufferService.buffer;this._dragScrollAmount>0?(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=this._bufferService.cols),this._model.selectionEnd[1]=Math.min(y.ydisp+this._bufferService.rows,y.lines.length-1)):(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=0),this._model.selectionEnd[1]=y.ydisp),this.refresh()}}_handleMouseUp(y){const k=y.timeStamp-this._mouseDownTimeStamp;if(this._removeMouseDownListeners(),this.selectionText.length<=1&&k<500&&y.altKey&&this._optionsService.rawOptions.altClickMovesCursor){if(this._bufferService.buffer.ybase===this._bufferService.buffer.ydisp){const T=this._mouseService.getCoords(y,this._element,this._bufferService.cols,this._bufferService.rows,!1);if(T&&T[0]!==void 0&&T[1]!==void 0){const B=(0,f.moveToCellSequence)(T[0]-1,T[1]-1,this._bufferService,this._coreService.decPrivateModes.applicationCursorKeys);this._coreService.triggerDataEvent(B,!0)}}}else this._fireEventIfSelectionChanged()}_fireEventIfSelectionChanged(){const y=this._model.finalSelectionStart,k=this._model.finalSelectionEnd,T=!(!y||!k||y[0]===k[0]&&y[1]===k[1]);T?y&&k&&(this._oldSelectionStart&&this._oldSelectionEnd&&y[0]===this._oldSelectionStart[0]&&y[1]===this._oldSelectionStart[1]&&k[0]===this._oldSelectionEnd[0]&&k[1]===this._oldSelectionEnd[1]||this._fireOnSelectionChange(y,k,T)):this._oldHasSelection&&this._fireOnSelectionChange(y,k,T)}_fireOnSelectionChange(y,k,T){this._oldSelectionStart=y,this._oldSelectionEnd=k,this._oldHasSelection=T,this._onSelectionChange.fire()}_handleBufferActivate(y){this.clearSelection(),this._trimListener.dispose(),this._trimListener=y.activeBuffer.lines.onTrim(k=>this._handleTrim(k))}_convertViewportColToCharacterIndex(y,k){let T=k;for(let B=0;k>=B;B++){const R=y.loadCell(B,this._workCell).getChars().length;this._workCell.getWidth()===0?T--:R>1&&k!==B&&(T+=R-1)}return T}setSelection(y,k,T){this._model.clearSelection(),this._removeMouseDownListeners(),this._model.selectionStart=[y,k],this._model.selectionStartLength=T,this.refresh(),this._fireEventIfSelectionChanged()}rightClickSelect(y){this._isClickInSelection(y)||(this._selectWordAtCursor(y,!1)&&this.refresh(!0),this._fireEventIfSelectionChanged())}_getWordAt(y,k,T=!0,B=!0){if(y[0]>=this._bufferService.cols)return;const R=this._bufferService.buffer,O=R.lines.get(y[1]);if(!O)return;const z=R.translateBufferLineToString(y[1],!1);let F=this._convertViewportColToCharacterIndex(O,y[0]),W=F;const N=y[0]-F;let L=0,$=0,M=0,I=0;if(z.charAt(F)===" "){for(;F>0&&z.charAt(F-1)===" ";)F--;for(;W<z.length&&z.charAt(W+1)===" ";)W++}else{let se=y[0],Z=y[0];O.getWidth(se)===0&&(L++,se--),O.getWidth(Z)===2&&($++,Z++);const be=O.getString(Z).length;for(be>1&&(I+=be-1,W+=be-1);se>0&&F>0&&!this._isCharWordSeparator(O.loadCell(se-1,this._workCell));){O.loadCell(se-1,this._workCell);const D=this._workCell.getChars().length;this._workCell.getWidth()===0?(L++,se--):D>1&&(M+=D-1,F-=D-1),F--,se--}for(;Z<O.length&&W+1<z.length&&!this._isCharWordSeparator(O.loadCell(Z+1,this._workCell));){O.loadCell(Z+1,this._workCell);const D=this._workCell.getChars().length;this._workCell.getWidth()===2?($++,Z++):D>1&&(I+=D-1,W+=D-1),W++,Z++}}W++;let j=F+N-L+M,X=Math.min(this._bufferService.cols,W-F+L+$-M-I);if(k||z.slice(F,W).trim()!==""){if(T&&j===0&&O.getCodePoint(0)!==32){const se=R.lines.get(y[1]-1);if(se&&O.isWrapped&&se.getCodePoint(this._bufferService.cols-1)!==32){const Z=this._getWordAt([this._bufferService.cols-1,y[1]-1],!1,!0,!1);if(Z){const be=this._bufferService.cols-Z.start;j-=be,X+=be}}}if(B&&j+X===this._bufferService.cols&&O.getCodePoint(this._bufferService.cols-1)!==32){const se=R.lines.get(y[1]+1);if((se==null?void 0:se.isWrapped)&&se.getCodePoint(0)!==32){const Z=this._getWordAt([0,y[1]+1],!1,!1,!0);Z&&(X+=Z.length)}}return{start:j,length:X}}}_selectWordAt(y,k){const T=this._getWordAt(y,k);if(T){for(;T.start<0;)T.start+=this._bufferService.cols,y[1]--;this._model.selectionStart=[T.start,y[1]],this._model.selectionStartLength=T.length}}_selectToWordAt(y){const k=this._getWordAt(y,!0);if(k){let T=y[1];for(;k.start<0;)k.start+=this._bufferService.cols,T--;if(!this._model.areSelectionValuesReversed())for(;k.start+k.length>this._bufferService.cols;)k.length-=this._bufferService.cols,T++;this._model.selectionEnd=[this._model.areSelectionValuesReversed()?k.start:k.start+k.length,T]}}_isCharWordSeparator(y){return y.getWidth()!==0&&this._optionsService.rawOptions.wordSeparator.indexOf(y.getChars())>=0}_selectLineAt(y){const k=this._bufferService.buffer.getWrappedRangeForLine(y),T={start:{x:0,y:k.first},end:{x:this._bufferService.cols-1,y:k.last}};this._model.selectionStart=[0,k.first],this._model.selectionEnd=void 0,this._model.selectionStartLength=(0,a.getRangeLength)(T,this._bufferService.cols)}};r.SelectionService=E=u([g(3,p.IBufferService),g(4,p.ICoreService),g(5,C.IMouseService),g(6,p.IOptionsService),g(7,C.IRenderService),g(8,C.ICoreBrowserService)],E)},4725:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.IThemeService=r.ICharacterJoinerService=r.ISelectionService=r.IRenderService=r.IMouseService=r.ICoreBrowserService=r.ICharSizeService=void 0;const u=n(8343);r.ICharSizeService=(0,u.createDecorator)("CharSizeService"),r.ICoreBrowserService=(0,u.createDecorator)("CoreBrowserService"),r.IMouseService=(0,u.createDecorator)("MouseService"),r.IRenderService=(0,u.createDecorator)("RenderService"),r.ISelectionService=(0,u.createDecorator)("SelectionService"),r.ICharacterJoinerService=(0,u.createDecorator)("CharacterJoinerService"),r.IThemeService=(0,u.createDecorator)("ThemeService")},6731:function(w,r,n){var u=this&&this.__decorate||function(E,y,k,T){var B,R=arguments.length,O=R<3?y:T===null?T=Object.getOwnPropertyDescriptor(y,k):T;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")O=Reflect.decorate(E,y,k,T);else for(var z=E.length-1;z>=0;z--)(B=E[z])&&(O=(R<3?B(O):R>3?B(y,k,O):B(y,k))||O);return R>3&&O&&Object.defineProperty(y,k,O),O},g=this&&this.__param||function(E,y){return function(k,T){y(k,T,E)}};Object.defineProperty(r,"__esModule",{value:!0}),r.ThemeService=r.DEFAULT_ANSI_COLORS=void 0;const l=n(7239),f=n(8055),b=n(8460),C=n(844),S=n(2585),o=f.css.toColor("#ffffff"),d=f.css.toColor("#000000"),a=f.css.toColor("#ffffff"),h=f.css.toColor("#000000"),p={css:"rgba(255, 255, 255, 0.3)",rgba:4294967117};r.DEFAULT_ANSI_COLORS=Object.freeze((()=>{const E=[f.css.toColor("#2e3436"),f.css.toColor("#cc0000"),f.css.toColor("#4e9a06"),f.css.toColor("#c4a000"),f.css.toColor("#3465a4"),f.css.toColor("#75507b"),f.css.toColor("#06989a"),f.css.toColor("#d3d7cf"),f.css.toColor("#555753"),f.css.toColor("#ef2929"),f.css.toColor("#8ae234"),f.css.toColor("#fce94f"),f.css.toColor("#729fcf"),f.css.toColor("#ad7fa8"),f.css.toColor("#34e2e2"),f.css.toColor("#eeeeec")],y=[0,95,135,175,215,255];for(let k=0;k<216;k++){const T=y[k/36%6|0],B=y[k/6%6|0],R=y[k%6];E.push({css:f.channels.toCss(T,B,R),rgba:f.channels.toRgba(T,B,R)})}for(let k=0;k<24;k++){const T=8+10*k;E.push({css:f.channels.toCss(T,T,T),rgba:f.channels.toRgba(T,T,T)})}return E})());let v=r.ThemeService=class extends C.Disposable{get colors(){return this._colors}constructor(E){super(),this._optionsService=E,this._contrastCache=new l.ColorContrastCache,this._halfContrastCache=new l.ColorContrastCache,this._onChangeColors=this.register(new b.EventEmitter),this.onChangeColors=this._onChangeColors.event,this._colors={foreground:o,background:d,cursor:a,cursorAccent:h,selectionForeground:void 0,selectionBackgroundTransparent:p,selectionBackgroundOpaque:f.color.blend(d,p),selectionInactiveBackgroundTransparent:p,selectionInactiveBackgroundOpaque:f.color.blend(d,p),ansi:r.DEFAULT_ANSI_COLORS.slice(),contrastCache:this._contrastCache,halfContrastCache:this._halfContrastCache},this._updateRestoreColors(),this._setTheme(this._optionsService.rawOptions.theme),this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio",()=>this._contrastCache.clear())),this.register(this._optionsService.onSpecificOptionChange("theme",()=>this._setTheme(this._optionsService.rawOptions.theme)))}_setTheme(E={}){const y=this._colors;if(y.foreground=x(E.foreground,o),y.background=x(E.background,d),y.cursor=x(E.cursor,a),y.cursorAccent=x(E.cursorAccent,h),y.selectionBackgroundTransparent=x(E.selectionBackground,p),y.selectionBackgroundOpaque=f.color.blend(y.background,y.selectionBackgroundTransparent),y.selectionInactiveBackgroundTransparent=x(E.selectionInactiveBackground,y.selectionBackgroundTransparent),y.selectionInactiveBackgroundOpaque=f.color.blend(y.background,y.selectionInactiveBackgroundTransparent),y.selectionForeground=E.selectionForeground?x(E.selectionForeground,f.NULL_COLOR):void 0,y.selectionForeground===f.NULL_COLOR&&(y.selectionForeground=void 0),f.color.isOpaque(y.selectionBackgroundTransparent)&&(y.selectionBackgroundTransparent=f.color.opacity(y.selectionBackgroundTransparent,.3)),f.color.isOpaque(y.selectionInactiveBackgroundTransparent)&&(y.selectionInactiveBackgroundTransparent=f.color.opacity(y.selectionInactiveBackgroundTransparent,.3)),y.ansi=r.DEFAULT_ANSI_COLORS.slice(),y.ansi[0]=x(E.black,r.DEFAULT_ANSI_COLORS[0]),y.ansi[1]=x(E.red,r.DEFAULT_ANSI_COLORS[1]),y.ansi[2]=x(E.green,r.DEFAULT_ANSI_COLORS[2]),y.ansi[3]=x(E.yellow,r.DEFAULT_ANSI_COLORS[3]),y.ansi[4]=x(E.blue,r.DEFAULT_ANSI_COLORS[4]),y.ansi[5]=x(E.magenta,r.DEFAULT_ANSI_COLORS[5]),y.ansi[6]=x(E.cyan,r.DEFAULT_ANSI_COLORS[6]),y.ansi[7]=x(E.white,r.DEFAULT_ANSI_COLORS[7]),y.ansi[8]=x(E.brightBlack,r.DEFAULT_ANSI_COLORS[8]),y.ansi[9]=x(E.brightRed,r.DEFAULT_ANSI_COLORS[9]),y.ansi[10]=x(E.brightGreen,r.DEFAULT_ANSI_COLORS[10]),y.ansi[11]=x(E.brightYellow,r.DEFAULT_ANSI_COLORS[11]),y.ansi[12]=x(E.brightBlue,r.DEFAULT_ANSI_COLORS[12]),y.ansi[13]=x(E.brightMagenta,r.DEFAULT_ANSI_COLORS[13]),y.ansi[14]=x(E.brightCyan,r.DEFAULT_ANSI_COLORS[14]),y.ansi[15]=x(E.brightWhite,r.DEFAULT_ANSI_COLORS[15]),E.extendedAnsi){const k=Math.min(y.ansi.length-16,E.extendedAnsi.length);for(let T=0;T<k;T++)y.ansi[T+16]=x(E.extendedAnsi[T],r.DEFAULT_ANSI_COLORS[T+16])}this._contrastCache.clear(),this._halfContrastCache.clear(),this._updateRestoreColors(),this._onChangeColors.fire(this.colors)}restoreColor(E){this._restoreColor(E),this._onChangeColors.fire(this.colors)}_restoreColor(E){if(E!==void 0)switch(E){case 256:this._colors.foreground=this._restoreColors.foreground;break;case 257:this._colors.background=this._restoreColors.background;break;case 258:this._colors.cursor=this._restoreColors.cursor;break;default:this._colors.ansi[E]=this._restoreColors.ansi[E]}else for(let y=0;y<this._restoreColors.ansi.length;++y)this._colors.ansi[y]=this._restoreColors.ansi[y]}modifyColors(E){E(this._colors),this._onChangeColors.fire(this.colors)}_updateRestoreColors(){this._restoreColors={foreground:this._colors.foreground,background:this._colors.background,cursor:this._colors.cursor,ansi:this._colors.ansi.slice()}}};function x(E,y){if(E!==void 0)try{return f.css.toColor(E)}catch{}return y}r.ThemeService=v=u([g(0,S.IOptionsService)],v)},6349:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CircularList=void 0;const u=n(8460),g=n(844);class l extends g.Disposable{constructor(b){super(),this._maxLength=b,this.onDeleteEmitter=this.register(new u.EventEmitter),this.onDelete=this.onDeleteEmitter.event,this.onInsertEmitter=this.register(new u.EventEmitter),this.onInsert=this.onInsertEmitter.event,this.onTrimEmitter=this.register(new u.EventEmitter),this.onTrim=this.onTrimEmitter.event,this._array=new Array(this._maxLength),this._startIndex=0,this._length=0}get maxLength(){return this._maxLength}set maxLength(b){if(this._maxLength===b)return;const C=new Array(b);for(let S=0;S<Math.min(b,this.length);S++)C[S]=this._array[this._getCyclicIndex(S)];this._array=C,this._maxLength=b,this._startIndex=0}get length(){return this._length}set length(b){if(b>this._length)for(let C=this._length;C<b;C++)this._array[C]=void 0;this._length=b}get(b){return this._array[this._getCyclicIndex(b)]}set(b,C){this._array[this._getCyclicIndex(b)]=C}push(b){this._array[this._getCyclicIndex(this._length)]=b,this._length===this._maxLength?(this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1)):this._length++}recycle(){if(this._length!==this._maxLength)throw new Error("Can only recycle when the buffer is full");return this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1),this._array[this._getCyclicIndex(this._length-1)]}get isFull(){return this._length===this._maxLength}pop(){return this._array[this._getCyclicIndex(this._length---1)]}splice(b,C,...S){if(C){for(let o=b;o<this._length-C;o++)this._array[this._getCyclicIndex(o)]=this._array[this._getCyclicIndex(o+C)];this._length-=C,this.onDeleteEmitter.fire({index:b,amount:C})}for(let o=this._length-1;o>=b;o--)this._array[this._getCyclicIndex(o+S.length)]=this._array[this._getCyclicIndex(o)];for(let o=0;o<S.length;o++)this._array[this._getCyclicIndex(b+o)]=S[o];if(S.length&&this.onInsertEmitter.fire({index:b,amount:S.length}),this._length+S.length>this._maxLength){const o=this._length+S.length-this._maxLength;this._startIndex+=o,this._length=this._maxLength,this.onTrimEmitter.fire(o)}else this._length+=S.length}trimStart(b){b>this._length&&(b=this._length),this._startIndex+=b,this._length-=b,this.onTrimEmitter.fire(b)}shiftElements(b,C,S){if(!(C<=0)){if(b<0||b>=this._length)throw new Error("start argument out of range");if(b+S<0)throw new Error("Cannot shift elements in list beyond index 0");if(S>0){for(let d=C-1;d>=0;d--)this.set(b+d+S,this.get(b+d));const o=b+C+S-this._length;if(o>0)for(this._length+=o;this._length>this._maxLength;)this._length--,this._startIndex++,this.onTrimEmitter.fire(1)}else for(let o=0;o<C;o++)this.set(b+o+S,this.get(b+o))}}_getCyclicIndex(b){return(this._startIndex+b)%this._maxLength}}r.CircularList=l},1439:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.clone=void 0,r.clone=function n(u,g=5){if(typeof u!="object")return u;const l=Array.isArray(u)?[]:{};for(const f in u)l[f]=g<=1?u[f]:u[f]&&n(u[f],g-1);return l}},8055:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.contrastRatio=r.toPaddedHex=r.rgba=r.rgb=r.css=r.color=r.channels=r.NULL_COLOR=void 0;const u=n(6114);let g=0,l=0,f=0,b=0;var C,S,o,d,a;function h(v){const x=v.toString(16);return x.length<2?"0"+x:x}function p(v,x){return v<x?(x+.05)/(v+.05):(v+.05)/(x+.05)}r.NULL_COLOR={css:"#00000000",rgba:0},function(v){v.toCss=function(x,E,y,k){return k!==void 0?`#${h(x)}${h(E)}${h(y)}${h(k)}`:`#${h(x)}${h(E)}${h(y)}`},v.toRgba=function(x,E,y,k=255){return(x<<24|E<<16|y<<8|k)>>>0}}(C||(r.channels=C={})),function(v){function x(E,y){return b=Math.round(255*y),[g,l,f]=a.toChannels(E.rgba),{css:C.toCss(g,l,f,b),rgba:C.toRgba(g,l,f,b)}}v.blend=function(E,y){if(b=(255&y.rgba)/255,b===1)return{css:y.css,rgba:y.rgba};const k=y.rgba>>24&255,T=y.rgba>>16&255,B=y.rgba>>8&255,R=E.rgba>>24&255,O=E.rgba>>16&255,z=E.rgba>>8&255;return g=R+Math.round((k-R)*b),l=O+Math.round((T-O)*b),f=z+Math.round((B-z)*b),{css:C.toCss(g,l,f),rgba:C.toRgba(g,l,f)}},v.isOpaque=function(E){return(255&E.rgba)==255},v.ensureContrastRatio=function(E,y,k){const T=a.ensureContrastRatio(E.rgba,y.rgba,k);if(T)return a.toColor(T>>24&255,T>>16&255,T>>8&255)},v.opaque=function(E){const y=(255|E.rgba)>>>0;return[g,l,f]=a.toChannels(y),{css:C.toCss(g,l,f),rgba:y}},v.opacity=x,v.multiplyOpacity=function(E,y){return b=255&E.rgba,x(E,b*y/255)},v.toColorRGB=function(E){return[E.rgba>>24&255,E.rgba>>16&255,E.rgba>>8&255]}}(S||(r.color=S={})),function(v){let x,E;if(!u.isNode){const y=document.createElement("canvas");y.width=1,y.height=1;const k=y.getContext("2d",{willReadFrequently:!0});k&&(x=k,x.globalCompositeOperation="copy",E=x.createLinearGradient(0,0,1,1))}v.toColor=function(y){if(y.match(/#[\da-f]{3,8}/i))switch(y.length){case 4:return g=parseInt(y.slice(1,2).repeat(2),16),l=parseInt(y.slice(2,3).repeat(2),16),f=parseInt(y.slice(3,4).repeat(2),16),a.toColor(g,l,f);case 5:return g=parseInt(y.slice(1,2).repeat(2),16),l=parseInt(y.slice(2,3).repeat(2),16),f=parseInt(y.slice(3,4).repeat(2),16),b=parseInt(y.slice(4,5).repeat(2),16),a.toColor(g,l,f,b);case 7:return{css:y,rgba:(parseInt(y.slice(1),16)<<8|255)>>>0};case 9:return{css:y,rgba:parseInt(y.slice(1),16)>>>0}}const k=y.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);if(k)return g=parseInt(k[1]),l=parseInt(k[2]),f=parseInt(k[3]),b=Math.round(255*(k[5]===void 0?1:parseFloat(k[5]))),a.toColor(g,l,f,b);if(!x||!E)throw new Error("css.toColor: Unsupported css format");if(x.fillStyle=E,x.fillStyle=y,typeof x.fillStyle!="string")throw new Error("css.toColor: Unsupported css format");if(x.fillRect(0,0,1,1),[g,l,f,b]=x.getImageData(0,0,1,1).data,b!==255)throw new Error("css.toColor: Unsupported css format");return{rgba:C.toRgba(g,l,f,b),css:y}}}(o||(r.css=o={})),function(v){function x(E,y,k){const T=E/255,B=y/255,R=k/255;return .2126*(T<=.03928?T/12.92:Math.pow((T+.055)/1.055,2.4))+.7152*(B<=.03928?B/12.92:Math.pow((B+.055)/1.055,2.4))+.0722*(R<=.03928?R/12.92:Math.pow((R+.055)/1.055,2.4))}v.relativeLuminance=function(E){return x(E>>16&255,E>>8&255,255&E)},v.relativeLuminance2=x}(d||(r.rgb=d={})),function(v){function x(y,k,T){const B=y>>24&255,R=y>>16&255,O=y>>8&255;let z=k>>24&255,F=k>>16&255,W=k>>8&255,N=p(d.relativeLuminance2(z,F,W),d.relativeLuminance2(B,R,O));for(;N<T&&(z>0||F>0||W>0);)z-=Math.max(0,Math.ceil(.1*z)),F-=Math.max(0,Math.ceil(.1*F)),W-=Math.max(0,Math.ceil(.1*W)),N=p(d.relativeLuminance2(z,F,W),d.relativeLuminance2(B,R,O));return(z<<24|F<<16|W<<8|255)>>>0}function E(y,k,T){const B=y>>24&255,R=y>>16&255,O=y>>8&255;let z=k>>24&255,F=k>>16&255,W=k>>8&255,N=p(d.relativeLuminance2(z,F,W),d.relativeLuminance2(B,R,O));for(;N<T&&(z<255||F<255||W<255);)z=Math.min(255,z+Math.ceil(.1*(255-z))),F=Math.min(255,F+Math.ceil(.1*(255-F))),W=Math.min(255,W+Math.ceil(.1*(255-W))),N=p(d.relativeLuminance2(z,F,W),d.relativeLuminance2(B,R,O));return(z<<24|F<<16|W<<8|255)>>>0}v.ensureContrastRatio=function(y,k,T){const B=d.relativeLuminance(y>>8),R=d.relativeLuminance(k>>8);if(p(B,R)<T){if(R<B){const F=x(y,k,T),W=p(B,d.relativeLuminance(F>>8));if(W<T){const N=E(y,k,T);return W>p(B,d.relativeLuminance(N>>8))?F:N}return F}const O=E(y,k,T),z=p(B,d.relativeLuminance(O>>8));if(z<T){const F=x(y,k,T);return z>p(B,d.relativeLuminance(F>>8))?O:F}return O}},v.reduceLuminance=x,v.increaseLuminance=E,v.toChannels=function(y){return[y>>24&255,y>>16&255,y>>8&255,255&y]},v.toColor=function(y,k,T,B){return{css:C.toCss(y,k,T,B),rgba:C.toRgba(y,k,T,B)}}}(a||(r.rgba=a={})),r.toPaddedHex=h,r.contrastRatio=p},8969:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CoreTerminal=void 0;const u=n(844),g=n(2585),l=n(4348),f=n(7866),b=n(744),C=n(7302),S=n(6975),o=n(8460),d=n(1753),a=n(1480),h=n(7994),p=n(9282),v=n(5435),x=n(5981),E=n(2660);let y=!1;class k extends u.Disposable{get onScroll(){return this._onScrollApi||(this._onScrollApi=this.register(new o.EventEmitter),this._onScroll.event(B=>{var R;(R=this._onScrollApi)===null||R===void 0||R.fire(B.position)})),this._onScrollApi.event}get cols(){return this._bufferService.cols}get rows(){return this._bufferService.rows}get buffers(){return this._bufferService.buffers}get options(){return this.optionsService.options}set options(B){for(const R in B)this.optionsService.options[R]=B[R]}constructor(B){super(),this._windowsWrappingHeuristics=this.register(new u.MutableDisposable),this._onBinary=this.register(new o.EventEmitter),this.onBinary=this._onBinary.event,this._onData=this.register(new o.EventEmitter),this.onData=this._onData.event,this._onLineFeed=this.register(new o.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onResize=this.register(new o.EventEmitter),this.onResize=this._onResize.event,this._onWriteParsed=this.register(new o.EventEmitter),this.onWriteParsed=this._onWriteParsed.event,this._onScroll=this.register(new o.EventEmitter),this._instantiationService=new l.InstantiationService,this.optionsService=this.register(new C.OptionsService(B)),this._instantiationService.setService(g.IOptionsService,this.optionsService),this._bufferService=this.register(this._instantiationService.createInstance(b.BufferService)),this._instantiationService.setService(g.IBufferService,this._bufferService),this._logService=this.register(this._instantiationService.createInstance(f.LogService)),this._instantiationService.setService(g.ILogService,this._logService),this.coreService=this.register(this._instantiationService.createInstance(S.CoreService)),this._instantiationService.setService(g.ICoreService,this.coreService),this.coreMouseService=this.register(this._instantiationService.createInstance(d.CoreMouseService)),this._instantiationService.setService(g.ICoreMouseService,this.coreMouseService),this.unicodeService=this.register(this._instantiationService.createInstance(a.UnicodeService)),this._instantiationService.setService(g.IUnicodeService,this.unicodeService),this._charsetService=this._instantiationService.createInstance(h.CharsetService),this._instantiationService.setService(g.ICharsetService,this._charsetService),this._oscLinkService=this._instantiationService.createInstance(E.OscLinkService),this._instantiationService.setService(g.IOscLinkService,this._oscLinkService),this._inputHandler=this.register(new v.InputHandler(this._bufferService,this._charsetService,this.coreService,this._logService,this.optionsService,this._oscLinkService,this.coreMouseService,this.unicodeService)),this.register((0,o.forwardEvent)(this._inputHandler.onLineFeed,this._onLineFeed)),this.register(this._inputHandler),this.register((0,o.forwardEvent)(this._bufferService.onResize,this._onResize)),this.register((0,o.forwardEvent)(this.coreService.onData,this._onData)),this.register((0,o.forwardEvent)(this.coreService.onBinary,this._onBinary)),this.register(this.coreService.onRequestScrollToBottom(()=>this.scrollToBottom())),this.register(this.coreService.onUserInput(()=>this._writeBuffer.handleUserInput())),this.register(this.optionsService.onMultipleOptionChange(["windowsMode","windowsPty"],()=>this._handleWindowsPtyOptionChange())),this.register(this._bufferService.onScroll(R=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)})),this.register(this._inputHandler.onScroll(R=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp,source:0}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)})),this._writeBuffer=this.register(new x.WriteBuffer((R,O)=>this._inputHandler.parse(R,O))),this.register((0,o.forwardEvent)(this._writeBuffer.onWriteParsed,this._onWriteParsed))}write(B,R){this._writeBuffer.write(B,R)}writeSync(B,R){this._logService.logLevel<=g.LogLevelEnum.WARN&&!y&&(this._logService.warn("writeSync is unreliable and will be removed soon."),y=!0),this._writeBuffer.writeSync(B,R)}resize(B,R){isNaN(B)||isNaN(R)||(B=Math.max(B,b.MINIMUM_COLS),R=Math.max(R,b.MINIMUM_ROWS),this._bufferService.resize(B,R))}scroll(B,R=!1){this._bufferService.scroll(B,R)}scrollLines(B,R,O){this._bufferService.scrollLines(B,R,O)}scrollPages(B){this.scrollLines(B*(this.rows-1))}scrollToTop(){this.scrollLines(-this._bufferService.buffer.ydisp)}scrollToBottom(){this.scrollLines(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp)}scrollToLine(B){const R=B-this._bufferService.buffer.ydisp;R!==0&&this.scrollLines(R)}registerEscHandler(B,R){return this._inputHandler.registerEscHandler(B,R)}registerDcsHandler(B,R){return this._inputHandler.registerDcsHandler(B,R)}registerCsiHandler(B,R){return this._inputHandler.registerCsiHandler(B,R)}registerOscHandler(B,R){return this._inputHandler.registerOscHandler(B,R)}_setup(){this._handleWindowsPtyOptionChange()}reset(){this._inputHandler.reset(),this._bufferService.reset(),this._charsetService.reset(),this.coreService.reset(),this.coreMouseService.reset()}_handleWindowsPtyOptionChange(){let B=!1;const R=this.optionsService.rawOptions.windowsPty;R&&R.buildNumber!==void 0&&R.buildNumber!==void 0?B=R.backend==="conpty"&&R.buildNumber<21376:this.optionsService.rawOptions.windowsMode&&(B=!0),B?this._enableWindowsWrappingHeuristics():this._windowsWrappingHeuristics.clear()}_enableWindowsWrappingHeuristics(){if(!this._windowsWrappingHeuristics.value){const B=[];B.push(this.onLineFeed(p.updateWindowsModeWrappedState.bind(null,this._bufferService))),B.push(this.registerCsiHandler({final:"H"},()=>((0,p.updateWindowsModeWrappedState)(this._bufferService),!1))),this._windowsWrappingHeuristics.value=(0,u.toDisposable)(()=>{for(const R of B)R.dispose()})}}}r.CoreTerminal=k},8460:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.forwardEvent=r.EventEmitter=void 0,r.EventEmitter=class{constructor(){this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=n=>(this._listeners.push(n),{dispose:()=>{if(!this._disposed){for(let u=0;u<this._listeners.length;u++)if(this._listeners[u]===n)return void this._listeners.splice(u,1)}}})),this._event}fire(n,u){const g=[];for(let l=0;l<this._listeners.length;l++)g.push(this._listeners[l]);for(let l=0;l<g.length;l++)g[l].call(void 0,n,u)}dispose(){this.clearListeners(),this._disposed=!0}clearListeners(){this._listeners&&(this._listeners.length=0)}},r.forwardEvent=function(n,u){return n(g=>u.fire(g))}},5435:function(w,r,n){var u=this&&this.__decorate||function(N,L,$,M){var I,j=arguments.length,X=j<3?L:M===null?M=Object.getOwnPropertyDescriptor(L,$):M;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")X=Reflect.decorate(N,L,$,M);else for(var se=N.length-1;se>=0;se--)(I=N[se])&&(X=(j<3?I(X):j>3?I(L,$,X):I(L,$))||X);return j>3&&X&&Object.defineProperty(L,$,X),X},g=this&&this.__param||function(N,L){return function($,M){L($,M,N)}};Object.defineProperty(r,"__esModule",{value:!0}),r.InputHandler=r.WindowsOptionsReportType=void 0;const l=n(2584),f=n(7116),b=n(2015),C=n(844),S=n(482),o=n(8437),d=n(8460),a=n(643),h=n(511),p=n(3734),v=n(2585),x=n(6242),E=n(6351),y=n(5941),k={"(":0,")":1,"*":2,"+":3,"-":1,".":2},T=131072;function B(N,L){if(N>24)return L.setWinLines||!1;switch(N){case 1:return!!L.restoreWin;case 2:return!!L.minimizeWin;case 3:return!!L.setWinPosition;case 4:return!!L.setWinSizePixels;case 5:return!!L.raiseWin;case 6:return!!L.lowerWin;case 7:return!!L.refreshWin;case 8:return!!L.setWinSizeChars;case 9:return!!L.maximizeWin;case 10:return!!L.fullscreenWin;case 11:return!!L.getWinState;case 13:return!!L.getWinPosition;case 14:return!!L.getWinSizePixels;case 15:return!!L.getScreenSizePixels;case 16:return!!L.getCellSizePixels;case 18:return!!L.getWinSizeChars;case 19:return!!L.getScreenSizeChars;case 20:return!!L.getIconTitle;case 21:return!!L.getWinTitle;case 22:return!!L.pushTitle;case 23:return!!L.popTitle;case 24:return!!L.setWinLines}return!1}var R;(function(N){N[N.GET_WIN_SIZE_PIXELS=0]="GET_WIN_SIZE_PIXELS",N[N.GET_CELL_SIZE_PIXELS=1]="GET_CELL_SIZE_PIXELS"})(R||(r.WindowsOptionsReportType=R={}));let O=0;class z extends C.Disposable{getAttrData(){return this._curAttrData}constructor(L,$,M,I,j,X,se,Z,be=new b.EscapeSequenceParser){super(),this._bufferService=L,this._charsetService=$,this._coreService=M,this._logService=I,this._optionsService=j,this._oscLinkService=X,this._coreMouseService=se,this._unicodeService=Z,this._parser=be,this._parseBuffer=new Uint32Array(4096),this._stringDecoder=new S.StringToUtf32,this._utf8Decoder=new S.Utf8ToUtf32,this._workCell=new h.CellData,this._windowTitle="",this._iconName="",this._windowTitleStack=[],this._iconNameStack=[],this._curAttrData=o.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=o.DEFAULT_ATTR_DATA.clone(),this._onRequestBell=this.register(new d.EventEmitter),this.onRequestBell=this._onRequestBell.event,this._onRequestRefreshRows=this.register(new d.EventEmitter),this.onRequestRefreshRows=this._onRequestRefreshRows.event,this._onRequestReset=this.register(new d.EventEmitter),this.onRequestReset=this._onRequestReset.event,this._onRequestSendFocus=this.register(new d.EventEmitter),this.onRequestSendFocus=this._onRequestSendFocus.event,this._onRequestSyncScrollBar=this.register(new d.EventEmitter),this.onRequestSyncScrollBar=this._onRequestSyncScrollBar.event,this._onRequestWindowsOptionsReport=this.register(new d.EventEmitter),this.onRequestWindowsOptionsReport=this._onRequestWindowsOptionsReport.event,this._onA11yChar=this.register(new d.EventEmitter),this.onA11yChar=this._onA11yChar.event,this._onA11yTab=this.register(new d.EventEmitter),this.onA11yTab=this._onA11yTab.event,this._onCursorMove=this.register(new d.EventEmitter),this.onCursorMove=this._onCursorMove.event,this._onLineFeed=this.register(new d.EventEmitter),this.onLineFeed=this._onLineFeed.event,this._onScroll=this.register(new d.EventEmitter),this.onScroll=this._onScroll.event,this._onTitleChange=this.register(new d.EventEmitter),this.onTitleChange=this._onTitleChange.event,this._onColor=this.register(new d.EventEmitter),this.onColor=this._onColor.event,this._parseStack={paused:!1,cursorStartX:0,cursorStartY:0,decodedLength:0,position:0},this._specialColors=[256,257,258],this.register(this._parser),this._dirtyRowTracker=new F(this._bufferService),this._activeBuffer=this._bufferService.buffer,this.register(this._bufferService.buffers.onBufferActivate(D=>this._activeBuffer=D.activeBuffer)),this._parser.setCsiHandlerFallback((D,P)=>{this._logService.debug("Unknown CSI code: ",{identifier:this._parser.identToString(D),params:P.toArray()})}),this._parser.setEscHandlerFallback(D=>{this._logService.debug("Unknown ESC code: ",{identifier:this._parser.identToString(D)})}),this._parser.setExecuteHandlerFallback(D=>{this._logService.debug("Unknown EXECUTE code: ",{code:D})}),this._parser.setOscHandlerFallback((D,P,U)=>{this._logService.debug("Unknown OSC code: ",{identifier:D,action:P,data:U})}),this._parser.setDcsHandlerFallback((D,P,U)=>{P==="HOOK"&&(U=U.toArray()),this._logService.debug("Unknown DCS code: ",{identifier:this._parser.identToString(D),action:P,payload:U})}),this._parser.setPrintHandler((D,P,U)=>this.print(D,P,U)),this._parser.registerCsiHandler({final:"@"},D=>this.insertChars(D)),this._parser.registerCsiHandler({intermediates:" ",final:"@"},D=>this.scrollLeft(D)),this._parser.registerCsiHandler({final:"A"},D=>this.cursorUp(D)),this._parser.registerCsiHandler({intermediates:" ",final:"A"},D=>this.scrollRight(D)),this._parser.registerCsiHandler({final:"B"},D=>this.cursorDown(D)),this._parser.registerCsiHandler({final:"C"},D=>this.cursorForward(D)),this._parser.registerCsiHandler({final:"D"},D=>this.cursorBackward(D)),this._parser.registerCsiHandler({final:"E"},D=>this.cursorNextLine(D)),this._parser.registerCsiHandler({final:"F"},D=>this.cursorPrecedingLine(D)),this._parser.registerCsiHandler({final:"G"},D=>this.cursorCharAbsolute(D)),this._parser.registerCsiHandler({final:"H"},D=>this.cursorPosition(D)),this._parser.registerCsiHandler({final:"I"},D=>this.cursorForwardTab(D)),this._parser.registerCsiHandler({final:"J"},D=>this.eraseInDisplay(D,!1)),this._parser.registerCsiHandler({prefix:"?",final:"J"},D=>this.eraseInDisplay(D,!0)),this._parser.registerCsiHandler({final:"K"},D=>this.eraseInLine(D,!1)),this._parser.registerCsiHandler({prefix:"?",final:"K"},D=>this.eraseInLine(D,!0)),this._parser.registerCsiHandler({final:"L"},D=>this.insertLines(D)),this._parser.registerCsiHandler({final:"M"},D=>this.deleteLines(D)),this._parser.registerCsiHandler({final:"P"},D=>this.deleteChars(D)),this._parser.registerCsiHandler({final:"S"},D=>this.scrollUp(D)),this._parser.registerCsiHandler({final:"T"},D=>this.scrollDown(D)),this._parser.registerCsiHandler({final:"X"},D=>this.eraseChars(D)),this._parser.registerCsiHandler({final:"Z"},D=>this.cursorBackwardTab(D)),this._parser.registerCsiHandler({final:"`"},D=>this.charPosAbsolute(D)),this._parser.registerCsiHandler({final:"a"},D=>this.hPositionRelative(D)),this._parser.registerCsiHandler({final:"b"},D=>this.repeatPrecedingCharacter(D)),this._parser.registerCsiHandler({final:"c"},D=>this.sendDeviceAttributesPrimary(D)),this._parser.registerCsiHandler({prefix:">",final:"c"},D=>this.sendDeviceAttributesSecondary(D)),this._parser.registerCsiHandler({final:"d"},D=>this.linePosAbsolute(D)),this._parser.registerCsiHandler({final:"e"},D=>this.vPositionRelative(D)),this._parser.registerCsiHandler({final:"f"},D=>this.hVPosition(D)),this._parser.registerCsiHandler({final:"g"},D=>this.tabClear(D)),this._parser.registerCsiHandler({final:"h"},D=>this.setMode(D)),this._parser.registerCsiHandler({prefix:"?",final:"h"},D=>this.setModePrivate(D)),this._parser.registerCsiHandler({final:"l"},D=>this.resetMode(D)),this._parser.registerCsiHandler({prefix:"?",final:"l"},D=>this.resetModePrivate(D)),this._parser.registerCsiHandler({final:"m"},D=>this.charAttributes(D)),this._parser.registerCsiHandler({final:"n"},D=>this.deviceStatus(D)),this._parser.registerCsiHandler({prefix:"?",final:"n"},D=>this.deviceStatusPrivate(D)),this._parser.registerCsiHandler({intermediates:"!",final:"p"},D=>this.softReset(D)),this._parser.registerCsiHandler({intermediates:" ",final:"q"},D=>this.setCursorStyle(D)),this._parser.registerCsiHandler({final:"r"},D=>this.setScrollRegion(D)),this._parser.registerCsiHandler({final:"s"},D=>this.saveCursor(D)),this._parser.registerCsiHandler({final:"t"},D=>this.windowOptions(D)),this._parser.registerCsiHandler({final:"u"},D=>this.restoreCursor(D)),this._parser.registerCsiHandler({intermediates:"'",final:"}"},D=>this.insertColumns(D)),this._parser.registerCsiHandler({intermediates:"'",final:"~"},D=>this.deleteColumns(D)),this._parser.registerCsiHandler({intermediates:'"',final:"q"},D=>this.selectProtected(D)),this._parser.registerCsiHandler({intermediates:"$",final:"p"},D=>this.requestMode(D,!0)),this._parser.registerCsiHandler({prefix:"?",intermediates:"$",final:"p"},D=>this.requestMode(D,!1)),this._parser.setExecuteHandler(l.C0.BEL,()=>this.bell()),this._parser.setExecuteHandler(l.C0.LF,()=>this.lineFeed()),this._parser.setExecuteHandler(l.C0.VT,()=>this.lineFeed()),this._parser.setExecuteHandler(l.C0.FF,()=>this.lineFeed()),this._parser.setExecuteHandler(l.C0.CR,()=>this.carriageReturn()),this._parser.setExecuteHandler(l.C0.BS,()=>this.backspace()),this._parser.setExecuteHandler(l.C0.HT,()=>this.tab()),this._parser.setExecuteHandler(l.C0.SO,()=>this.shiftOut()),this._parser.setExecuteHandler(l.C0.SI,()=>this.shiftIn()),this._parser.setExecuteHandler(l.C1.IND,()=>this.index()),this._parser.setExecuteHandler(l.C1.NEL,()=>this.nextLine()),this._parser.setExecuteHandler(l.C1.HTS,()=>this.tabSet()),this._parser.registerOscHandler(0,new x.OscHandler(D=>(this.setTitle(D),this.setIconName(D),!0))),this._parser.registerOscHandler(1,new x.OscHandler(D=>this.setIconName(D))),this._parser.registerOscHandler(2,new x.OscHandler(D=>this.setTitle(D))),this._parser.registerOscHandler(4,new x.OscHandler(D=>this.setOrReportIndexedColor(D))),this._parser.registerOscHandler(8,new x.OscHandler(D=>this.setHyperlink(D))),this._parser.registerOscHandler(10,new x.OscHandler(D=>this.setOrReportFgColor(D))),this._parser.registerOscHandler(11,new x.OscHandler(D=>this.setOrReportBgColor(D))),this._parser.registerOscHandler(12,new x.OscHandler(D=>this.setOrReportCursorColor(D))),this._parser.registerOscHandler(104,new x.OscHandler(D=>this.restoreIndexedColor(D))),this._parser.registerOscHandler(110,new x.OscHandler(D=>this.restoreFgColor(D))),this._parser.registerOscHandler(111,new x.OscHandler(D=>this.restoreBgColor(D))),this._parser.registerOscHandler(112,new x.OscHandler(D=>this.restoreCursorColor(D))),this._parser.registerEscHandler({final:"7"},()=>this.saveCursor()),this._parser.registerEscHandler({final:"8"},()=>this.restoreCursor()),this._parser.registerEscHandler({final:"D"},()=>this.index()),this._parser.registerEscHandler({final:"E"},()=>this.nextLine()),this._parser.registerEscHandler({final:"H"},()=>this.tabSet()),this._parser.registerEscHandler({final:"M"},()=>this.reverseIndex()),this._parser.registerEscHandler({final:"="},()=>this.keypadApplicationMode()),this._parser.registerEscHandler({final:">"},()=>this.keypadNumericMode()),this._parser.registerEscHandler({final:"c"},()=>this.fullReset()),this._parser.registerEscHandler({final:"n"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"o"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"|"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"}"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"~"},()=>this.setgLevel(1)),this._parser.registerEscHandler({intermediates:"%",final:"@"},()=>this.selectDefaultCharset()),this._parser.registerEscHandler({intermediates:"%",final:"G"},()=>this.selectDefaultCharset());for(const D in f.CHARSETS)this._parser.registerEscHandler({intermediates:"(",final:D},()=>this.selectCharset("("+D)),this._parser.registerEscHandler({intermediates:")",final:D},()=>this.selectCharset(")"+D)),this._parser.registerEscHandler({intermediates:"*",final:D},()=>this.selectCharset("*"+D)),this._parser.registerEscHandler({intermediates:"+",final:D},()=>this.selectCharset("+"+D)),this._parser.registerEscHandler({intermediates:"-",final:D},()=>this.selectCharset("-"+D)),this._parser.registerEscHandler({intermediates:".",final:D},()=>this.selectCharset("."+D)),this._parser.registerEscHandler({intermediates:"/",final:D},()=>this.selectCharset("/"+D));this._parser.registerEscHandler({intermediates:"#",final:"8"},()=>this.screenAlignmentPattern()),this._parser.setErrorHandler(D=>(this._logService.error("Parsing error: ",D),D)),this._parser.registerDcsHandler({intermediates:"$",final:"q"},new E.DcsHandler((D,P)=>this.requestStatusString(D,P)))}_preserveStack(L,$,M,I){this._parseStack.paused=!0,this._parseStack.cursorStartX=L,this._parseStack.cursorStartY=$,this._parseStack.decodedLength=M,this._parseStack.position=I}_logSlowResolvingAsync(L){this._logService.logLevel<=v.LogLevelEnum.WARN&&Promise.race([L,new Promise(($,M)=>setTimeout(()=>M("#SLOW_TIMEOUT"),5e3))]).catch($=>{if($!=="#SLOW_TIMEOUT")throw $;console.warn("async parser handler taking longer than 5000 ms")})}_getCurrentLinkId(){return this._curAttrData.extended.urlId}parse(L,$){let M,I=this._activeBuffer.x,j=this._activeBuffer.y,X=0;const se=this._parseStack.paused;if(se){if(M=this._parser.parse(this._parseBuffer,this._parseStack.decodedLength,$))return this._logSlowResolvingAsync(M),M;I=this._parseStack.cursorStartX,j=this._parseStack.cursorStartY,this._parseStack.paused=!1,L.length>T&&(X=this._parseStack.position+T)}if(this._logService.logLevel<=v.LogLevelEnum.DEBUG&&this._logService.debug("parsing data"+(typeof L=="string"?` "${L}"`:` "${Array.prototype.map.call(L,Z=>String.fromCharCode(Z)).join("")}"`),typeof L=="string"?L.split("").map(Z=>Z.charCodeAt(0)):L),this._parseBuffer.length<L.length&&this._parseBuffer.length<T&&(this._parseBuffer=new Uint32Array(Math.min(L.length,T))),se||this._dirtyRowTracker.clearRange(),L.length>T)for(let Z=X;Z<L.length;Z+=T){const be=Z+T<L.length?Z+T:L.length,D=typeof L=="string"?this._stringDecoder.decode(L.substring(Z,be),this._parseBuffer):this._utf8Decoder.decode(L.subarray(Z,be),this._parseBuffer);if(M=this._parser.parse(this._parseBuffer,D))return this._preserveStack(I,j,D,Z),this._logSlowResolvingAsync(M),M}else if(!se){const Z=typeof L=="string"?this._stringDecoder.decode(L,this._parseBuffer):this._utf8Decoder.decode(L,this._parseBuffer);if(M=this._parser.parse(this._parseBuffer,Z))return this._preserveStack(I,j,Z,0),this._logSlowResolvingAsync(M),M}this._activeBuffer.x===I&&this._activeBuffer.y===j||this._onCursorMove.fire(),this._onRequestRefreshRows.fire(this._dirtyRowTracker.start,this._dirtyRowTracker.end)}print(L,$,M){let I,j;const X=this._charsetService.charset,se=this._optionsService.rawOptions.screenReaderMode,Z=this._bufferService.cols,be=this._coreService.decPrivateModes.wraparound,D=this._coreService.modes.insertMode,P=this._curAttrData;let U=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._activeBuffer.x&&M-$>0&&U.getWidth(this._activeBuffer.x-1)===2&&U.setCellFromCodePoint(this._activeBuffer.x-1,0,1,P.fg,P.bg,P.extended);for(let H=$;H<M;++H){if(I=L[H],j=this._unicodeService.wcwidth(I),I<127&&X){const re=X[String.fromCharCode(I)];re&&(I=re.charCodeAt(0))}if(se&&this._onA11yChar.fire((0,S.stringFromCodePoint)(I)),this._getCurrentLinkId()&&this._oscLinkService.addLineToLink(this._getCurrentLinkId(),this._activeBuffer.ybase+this._activeBuffer.y),j||!this._activeBuffer.x){if(this._activeBuffer.x+j-1>=Z){if(be){for(;this._activeBuffer.x<Z;)U.setCellFromCodePoint(this._activeBuffer.x++,0,1,P.fg,P.bg,P.extended);this._activeBuffer.x=0,this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData(),!0)):(this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!0),U=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y)}else if(this._activeBuffer.x=Z-1,j===2)continue}if(D&&(U.insertCells(this._activeBuffer.x,j,this._activeBuffer.getNullCell(P),P),U.getWidth(Z-1)===2&&U.setCellFromCodePoint(Z-1,a.NULL_CELL_CODE,a.NULL_CELL_WIDTH,P.fg,P.bg,P.extended)),U.setCellFromCodePoint(this._activeBuffer.x++,I,j,P.fg,P.bg,P.extended),j>0)for(;--j;)U.setCellFromCodePoint(this._activeBuffer.x++,0,0,P.fg,P.bg,P.extended)}else U.getWidth(this._activeBuffer.x-1)?U.addCodepointToCell(this._activeBuffer.x-1,I):U.addCodepointToCell(this._activeBuffer.x-2,I)}M-$>0&&(U.loadCell(this._activeBuffer.x-1,this._workCell),this._workCell.getWidth()===2||this._workCell.getCode()>65535?this._parser.precedingCodepoint=0:this._workCell.isCombined()?this._parser.precedingCodepoint=this._workCell.getChars().charCodeAt(0):this._parser.precedingCodepoint=this._workCell.content),this._activeBuffer.x<Z&&M-$>0&&U.getWidth(this._activeBuffer.x)===0&&!U.hasContent(this._activeBuffer.x)&&U.setCellFromCodePoint(this._activeBuffer.x,0,1,P.fg,P.bg,P.extended),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}registerCsiHandler(L,$){return L.final!=="t"||L.prefix||L.intermediates?this._parser.registerCsiHandler(L,$):this._parser.registerCsiHandler(L,M=>!B(M.params[0],this._optionsService.rawOptions.windowOptions)||$(M))}registerDcsHandler(L,$){return this._parser.registerDcsHandler(L,new E.DcsHandler($))}registerEscHandler(L,$){return this._parser.registerEscHandler(L,$)}registerOscHandler(L,$){return this._parser.registerOscHandler(L,new x.OscHandler($))}bell(){return this._onRequestBell.fire(),!0}lineFeed(){return this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._optionsService.rawOptions.convertEol&&(this._activeBuffer.x=0),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows?this._activeBuffer.y=this._bufferService.rows-1:this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.x>=this._bufferService.cols&&this._activeBuffer.x--,this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._onLineFeed.fire(),!0}carriageReturn(){return this._activeBuffer.x=0,!0}backspace(){var L;if(!this._coreService.decPrivateModes.reverseWraparound)return this._restrictCursor(),this._activeBuffer.x>0&&this._activeBuffer.x--,!0;if(this._restrictCursor(this._bufferService.cols),this._activeBuffer.x>0)this._activeBuffer.x--;else if(this._activeBuffer.x===0&&this._activeBuffer.y>this._activeBuffer.scrollTop&&this._activeBuffer.y<=this._activeBuffer.scrollBottom&&((L=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y))===null||L===void 0?void 0:L.isWrapped)){this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.y--,this._activeBuffer.x=this._bufferService.cols-1;const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);$.hasWidth(this._activeBuffer.x)&&!$.hasContent(this._activeBuffer.x)&&this._activeBuffer.x--}return this._restrictCursor(),!0}tab(){if(this._activeBuffer.x>=this._bufferService.cols)return!0;const L=this._activeBuffer.x;return this._activeBuffer.x=this._activeBuffer.nextStop(),this._optionsService.rawOptions.screenReaderMode&&this._onA11yTab.fire(this._activeBuffer.x-L),!0}shiftOut(){return this._charsetService.setgLevel(1),!0}shiftIn(){return this._charsetService.setgLevel(0),!0}_restrictCursor(L=this._bufferService.cols-1){this._activeBuffer.x=Math.min(L,Math.max(0,this._activeBuffer.x)),this._activeBuffer.y=this._coreService.decPrivateModes.origin?Math.min(this._activeBuffer.scrollBottom,Math.max(this._activeBuffer.scrollTop,this._activeBuffer.y)):Math.min(this._bufferService.rows-1,Math.max(0,this._activeBuffer.y)),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_setCursor(L,$){this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._coreService.decPrivateModes.origin?(this._activeBuffer.x=L,this._activeBuffer.y=this._activeBuffer.scrollTop+$):(this._activeBuffer.x=L,this._activeBuffer.y=$),this._restrictCursor(),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_moveCursor(L,$){this._restrictCursor(),this._setCursor(this._activeBuffer.x+L,this._activeBuffer.y+$)}cursorUp(L){const $=this._activeBuffer.y-this._activeBuffer.scrollTop;return $>=0?this._moveCursor(0,-Math.min($,L.params[0]||1)):this._moveCursor(0,-(L.params[0]||1)),!0}cursorDown(L){const $=this._activeBuffer.scrollBottom-this._activeBuffer.y;return $>=0?this._moveCursor(0,Math.min($,L.params[0]||1)):this._moveCursor(0,L.params[0]||1),!0}cursorForward(L){return this._moveCursor(L.params[0]||1,0),!0}cursorBackward(L){return this._moveCursor(-(L.params[0]||1),0),!0}cursorNextLine(L){return this.cursorDown(L),this._activeBuffer.x=0,!0}cursorPrecedingLine(L){return this.cursorUp(L),this._activeBuffer.x=0,!0}cursorCharAbsolute(L){return this._setCursor((L.params[0]||1)-1,this._activeBuffer.y),!0}cursorPosition(L){return this._setCursor(L.length>=2?(L.params[1]||1)-1:0,(L.params[0]||1)-1),!0}charPosAbsolute(L){return this._setCursor((L.params[0]||1)-1,this._activeBuffer.y),!0}hPositionRelative(L){return this._moveCursor(L.params[0]||1,0),!0}linePosAbsolute(L){return this._setCursor(this._activeBuffer.x,(L.params[0]||1)-1),!0}vPositionRelative(L){return this._moveCursor(0,L.params[0]||1),!0}hVPosition(L){return this.cursorPosition(L),!0}tabClear(L){const $=L.params[0];return $===0?delete this._activeBuffer.tabs[this._activeBuffer.x]:$===3&&(this._activeBuffer.tabs={}),!0}cursorForwardTab(L){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let $=L.params[0]||1;for(;$--;)this._activeBuffer.x=this._activeBuffer.nextStop();return!0}cursorBackwardTab(L){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let $=L.params[0]||1;for(;$--;)this._activeBuffer.x=this._activeBuffer.prevStop();return!0}selectProtected(L){const $=L.params[0];return $===1&&(this._curAttrData.bg|=536870912),$!==2&&$!==0||(this._curAttrData.bg&=-536870913),!0}_eraseInBufferLine(L,$,M,I=!1,j=!1){const X=this._activeBuffer.lines.get(this._activeBuffer.ybase+L);X.replaceCells($,M,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData(),j),I&&(X.isWrapped=!1)}_resetBufferLine(L,$=!1){const M=this._activeBuffer.lines.get(this._activeBuffer.ybase+L);M&&(M.fill(this._activeBuffer.getNullCell(this._eraseAttrData()),$),this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase+L),M.isWrapped=!1)}eraseInDisplay(L,$=!1){let M;switch(this._restrictCursor(this._bufferService.cols),L.params[0]){case 0:for(M=this._activeBuffer.y,this._dirtyRowTracker.markDirty(M),this._eraseInBufferLine(M++,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,$);M<this._bufferService.rows;M++)this._resetBufferLine(M,$);this._dirtyRowTracker.markDirty(M);break;case 1:for(M=this._activeBuffer.y,this._dirtyRowTracker.markDirty(M),this._eraseInBufferLine(M,0,this._activeBuffer.x+1,!0,$),this._activeBuffer.x+1>=this._bufferService.cols&&(this._activeBuffer.lines.get(M+1).isWrapped=!1);M--;)this._resetBufferLine(M,$);this._dirtyRowTracker.markDirty(0);break;case 2:for(M=this._bufferService.rows,this._dirtyRowTracker.markDirty(M-1);M--;)this._resetBufferLine(M,$);this._dirtyRowTracker.markDirty(0);break;case 3:const I=this._activeBuffer.lines.length-this._bufferService.rows;I>0&&(this._activeBuffer.lines.trimStart(I),this._activeBuffer.ybase=Math.max(this._activeBuffer.ybase-I,0),this._activeBuffer.ydisp=Math.max(this._activeBuffer.ydisp-I,0),this._onScroll.fire(0))}return!0}eraseInLine(L,$=!1){switch(this._restrictCursor(this._bufferService.cols),L.params[0]){case 0:this._eraseInBufferLine(this._activeBuffer.y,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,$);break;case 1:this._eraseInBufferLine(this._activeBuffer.y,0,this._activeBuffer.x+1,!1,$);break;case 2:this._eraseInBufferLine(this._activeBuffer.y,0,this._bufferService.cols,!0,$)}return this._dirtyRowTracker.markDirty(this._activeBuffer.y),!0}insertLines(L){this._restrictCursor();let $=L.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const M=this._activeBuffer.ybase+this._activeBuffer.y,I=this._bufferService.rows-1-this._activeBuffer.scrollBottom,j=this._bufferService.rows-1+this._activeBuffer.ybase-I+1;for(;$--;)this._activeBuffer.lines.splice(j-1,1),this._activeBuffer.lines.splice(M,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}deleteLines(L){this._restrictCursor();let $=L.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const M=this._activeBuffer.ybase+this._activeBuffer.y;let I;for(I=this._bufferService.rows-1-this._activeBuffer.scrollBottom,I=this._bufferService.rows-1+this._activeBuffer.ybase-I;$--;)this._activeBuffer.lines.splice(M,1),this._activeBuffer.lines.splice(I,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}insertChars(L){this._restrictCursor();const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return $&&($.insertCells(this._activeBuffer.x,L.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}deleteChars(L){this._restrictCursor();const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return $&&($.deleteCells(this._activeBuffer.x,L.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}scrollUp(L){let $=L.params[0]||1;for(;$--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollDown(L){let $=L.params[0]||1;for(;$--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,0,this._activeBuffer.getBlankLine(o.DEFAULT_ATTR_DATA));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollLeft(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.deleteCells(0,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollRight(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.insertCells(0,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}insertColumns(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.insertCells(this._activeBuffer.x,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}deleteColumns(L){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;const $=L.params[0]||1;for(let M=this._activeBuffer.scrollTop;M<=this._activeBuffer.scrollBottom;++M){const I=this._activeBuffer.lines.get(this._activeBuffer.ybase+M);I.deleteCells(this._activeBuffer.x,$,this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),I.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}eraseChars(L){this._restrictCursor();const $=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return $&&($.replaceCells(this._activeBuffer.x,this._activeBuffer.x+(L.params[0]||1),this._activeBuffer.getNullCell(this._eraseAttrData()),this._eraseAttrData()),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}repeatPrecedingCharacter(L){if(!this._parser.precedingCodepoint)return!0;const $=L.params[0]||1,M=new Uint32Array($);for(let I=0;I<$;++I)M[I]=this._parser.precedingCodepoint;return this.print(M,0,M.length),!0}sendDeviceAttributesPrimary(L){return L.params[0]>0||(this._is("xterm")||this._is("rxvt-unicode")||this._is("screen")?this._coreService.triggerDataEvent(l.C0.ESC+"[?1;2c"):this._is("linux")&&this._coreService.triggerDataEvent(l.C0.ESC+"[?6c")),!0}sendDeviceAttributesSecondary(L){return L.params[0]>0||(this._is("xterm")?this._coreService.triggerDataEvent(l.C0.ESC+"[>0;276;0c"):this._is("rxvt-unicode")?this._coreService.triggerDataEvent(l.C0.ESC+"[>85;95;0c"):this._is("linux")?this._coreService.triggerDataEvent(L.params[0]+"c"):this._is("screen")&&this._coreService.triggerDataEvent(l.C0.ESC+"[>83;40003;0c")),!0}_is(L){return(this._optionsService.rawOptions.termName+"").indexOf(L)===0}setMode(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 4:this._coreService.modes.insertMode=!0;break;case 20:this._optionsService.options.convertEol=!0}return!0}setModePrivate(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!0;break;case 2:this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),this._charsetService.setgCharset(1,f.DEFAULT_CHARSET),this._charsetService.setgCharset(2,f.DEFAULT_CHARSET),this._charsetService.setgCharset(3,f.DEFAULT_CHARSET);break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(132,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!0,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!0;break;case 12:this._optionsService.options.cursorBlink=!0;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!0;break;case 66:this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire();break;case 9:this._coreMouseService.activeProtocol="X10";break;case 1e3:this._coreMouseService.activeProtocol="VT200";break;case 1002:this._coreMouseService.activeProtocol="DRAG";break;case 1003:this._coreMouseService.activeProtocol="ANY";break;case 1004:this._coreService.decPrivateModes.sendFocus=!0,this._onRequestSendFocus.fire();break;case 1005:this._logService.debug("DECSET 1005 not supported (see #2507)");break;case 1006:this._coreMouseService.activeEncoding="SGR";break;case 1015:this._logService.debug("DECSET 1015 not supported (see #2507)");break;case 1016:this._coreMouseService.activeEncoding="SGR_PIXELS";break;case 25:this._coreService.isCursorHidden=!1;break;case 1048:this.saveCursor();break;case 1049:this.saveCursor();case 47:case 1047:this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!0}return!0}resetMode(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 4:this._coreService.modes.insertMode=!1;break;case 20:this._optionsService.options.convertEol=!1}return!0}resetModePrivate(L){for(let $=0;$<L.length;$++)switch(L.params[$]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!1;break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(80,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!1,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!1;break;case 12:this._optionsService.options.cursorBlink=!1;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!1;break;case 66:this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire();break;case 9:case 1e3:case 1002:case 1003:this._coreMouseService.activeProtocol="NONE";break;case 1004:this._coreService.decPrivateModes.sendFocus=!1;break;case 1005:this._logService.debug("DECRST 1005 not supported (see #2507)");break;case 1006:case 1016:this._coreMouseService.activeEncoding="DEFAULT";break;case 1015:this._logService.debug("DECRST 1015 not supported (see #2507)");break;case 25:this._coreService.isCursorHidden=!0;break;case 1048:this.restoreCursor();break;case 1049:case 47:case 1047:this._bufferService.buffers.activateNormalBuffer(),L.params[$]===1049&&this.restoreCursor(),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(0,this._bufferService.rows-1),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!1}return!0}requestMode(L,$){const M=this._coreService.decPrivateModes,{activeProtocol:I,activeEncoding:j}=this._coreMouseService,X=this._coreService,{buffers:se,cols:Z}=this._bufferService,{active:be,alt:D}=se,P=this._optionsService.rawOptions,U=ge=>ge?1:2,H=L.params[0];return re=H,G=$?H===2?4:H===4?U(X.modes.insertMode):H===12?3:H===20?U(P.convertEol):0:H===1?U(M.applicationCursorKeys):H===3?P.windowOptions.setWinLines?Z===80?2:Z===132?1:0:0:H===6?U(M.origin):H===7?U(M.wraparound):H===8?3:H===9?U(I==="X10"):H===12?U(P.cursorBlink):H===25?U(!X.isCursorHidden):H===45?U(M.reverseWraparound):H===66?U(M.applicationKeypad):H===67?4:H===1e3?U(I==="VT200"):H===1002?U(I==="DRAG"):H===1003?U(I==="ANY"):H===1004?U(M.sendFocus):H===1005?4:H===1006?U(j==="SGR"):H===1015?4:H===1016?U(j==="SGR_PIXELS"):H===1048?1:H===47||H===1047||H===1049?U(be===D):H===2004?U(M.bracketedPasteMode):0,X.triggerDataEvent(`${l.C0.ESC}[${$?"":"?"}${re};${G}$y`),!0;var re,G}_updateAttrColor(L,$,M,I,j){return $===2?(L|=50331648,L&=-16777216,L|=p.AttributeData.fromColorRGB([M,I,j])):$===5&&(L&=-50331904,L|=33554432|255&M),L}_extractColor(L,$,M){const I=[0,0,-1,0,0,0];let j=0,X=0;do{if(I[X+j]=L.params[$+X],L.hasSubParams($+X)){const se=L.getSubParams($+X);let Z=0;do I[1]===5&&(j=1),I[X+Z+1+j]=se[Z];while(++Z<se.length&&Z+X+1+j<I.length);break}if(I[1]===5&&X+j>=2||I[1]===2&&X+j>=5)break;I[1]&&(j=1)}while(++X+$<L.length&&X+j<I.length);for(let se=2;se<I.length;++se)I[se]===-1&&(I[se]=0);switch(I[0]){case 38:M.fg=this._updateAttrColor(M.fg,I[1],I[3],I[4],I[5]);break;case 48:M.bg=this._updateAttrColor(M.bg,I[1],I[3],I[4],I[5]);break;case 58:M.extended=M.extended.clone(),M.extended.underlineColor=this._updateAttrColor(M.extended.underlineColor,I[1],I[3],I[4],I[5])}return X}_processUnderline(L,$){$.extended=$.extended.clone(),(!~L||L>5)&&(L=1),$.extended.underlineStyle=L,$.fg|=268435456,L===0&&($.fg&=-268435457),$.updateExtended()}_processSGR0(L){L.fg=o.DEFAULT_ATTR_DATA.fg,L.bg=o.DEFAULT_ATTR_DATA.bg,L.extended=L.extended.clone(),L.extended.underlineStyle=0,L.extended.underlineColor&=-67108864,L.updateExtended()}charAttributes(L){if(L.length===1&&L.params[0]===0)return this._processSGR0(this._curAttrData),!0;const $=L.length;let M;const I=this._curAttrData;for(let j=0;j<$;j++)M=L.params[j],M>=30&&M<=37?(I.fg&=-50331904,I.fg|=16777216|M-30):M>=40&&M<=47?(I.bg&=-50331904,I.bg|=16777216|M-40):M>=90&&M<=97?(I.fg&=-50331904,I.fg|=16777224|M-90):M>=100&&M<=107?(I.bg&=-50331904,I.bg|=16777224|M-100):M===0?this._processSGR0(I):M===1?I.fg|=134217728:M===3?I.bg|=67108864:M===4?(I.fg|=268435456,this._processUnderline(L.hasSubParams(j)?L.getSubParams(j)[0]:1,I)):M===5?I.fg|=536870912:M===7?I.fg|=67108864:M===8?I.fg|=1073741824:M===9?I.fg|=2147483648:M===2?I.bg|=134217728:M===21?this._processUnderline(2,I):M===22?(I.fg&=-134217729,I.bg&=-134217729):M===23?I.bg&=-67108865:M===24?(I.fg&=-268435457,this._processUnderline(0,I)):M===25?I.fg&=-536870913:M===27?I.fg&=-67108865:M===28?I.fg&=-1073741825:M===29?I.fg&=2147483647:M===39?(I.fg&=-67108864,I.fg|=16777215&o.DEFAULT_ATTR_DATA.fg):M===49?(I.bg&=-67108864,I.bg|=16777215&o.DEFAULT_ATTR_DATA.bg):M===38||M===48||M===58?j+=this._extractColor(L,j,I):M===53?I.bg|=1073741824:M===55?I.bg&=-1073741825:M===59?(I.extended=I.extended.clone(),I.extended.underlineColor=-1,I.updateExtended()):M===100?(I.fg&=-67108864,I.fg|=16777215&o.DEFAULT_ATTR_DATA.fg,I.bg&=-67108864,I.bg|=16777215&o.DEFAULT_ATTR_DATA.bg):this._logService.debug("Unknown SGR attribute: %d.",M);return!0}deviceStatus(L){switch(L.params[0]){case 5:this._coreService.triggerDataEvent(`${l.C0.ESC}[0n`);break;case 6:const $=this._activeBuffer.y+1,M=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${l.C0.ESC}[${$};${M}R`)}return!0}deviceStatusPrivate(L){if(L.params[0]===6){const $=this._activeBuffer.y+1,M=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${l.C0.ESC}[?${$};${M}R`)}return!0}softReset(L){return this._coreService.isCursorHidden=!1,this._onRequestSyncScrollBar.fire(),this._activeBuffer.scrollTop=0,this._activeBuffer.scrollBottom=this._bufferService.rows-1,this._curAttrData=o.DEFAULT_ATTR_DATA.clone(),this._coreService.reset(),this._charsetService.reset(),this._activeBuffer.savedX=0,this._activeBuffer.savedY=this._activeBuffer.ybase,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,this._coreService.decPrivateModes.origin=!1,!0}setCursorStyle(L){const $=L.params[0]||1;switch($){case 1:case 2:this._optionsService.options.cursorStyle="block";break;case 3:case 4:this._optionsService.options.cursorStyle="underline";break;case 5:case 6:this._optionsService.options.cursorStyle="bar"}const M=$%2==1;return this._optionsService.options.cursorBlink=M,!0}setScrollRegion(L){const $=L.params[0]||1;let M;return(L.length<2||(M=L.params[1])>this._bufferService.rows||M===0)&&(M=this._bufferService.rows),M>$&&(this._activeBuffer.scrollTop=$-1,this._activeBuffer.scrollBottom=M-1,this._setCursor(0,0)),!0}windowOptions(L){if(!B(L.params[0],this._optionsService.rawOptions.windowOptions))return!0;const $=L.length>1?L.params[1]:0;switch(L.params[0]){case 14:$!==2&&this._onRequestWindowsOptionsReport.fire(R.GET_WIN_SIZE_PIXELS);break;case 16:this._onRequestWindowsOptionsReport.fire(R.GET_CELL_SIZE_PIXELS);break;case 18:this._bufferService&&this._coreService.triggerDataEvent(`${l.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);break;case 22:$!==0&&$!==2||(this._windowTitleStack.push(this._windowTitle),this._windowTitleStack.length>10&&this._windowTitleStack.shift()),$!==0&&$!==1||(this._iconNameStack.push(this._iconName),this._iconNameStack.length>10&&this._iconNameStack.shift());break;case 23:$!==0&&$!==2||this._windowTitleStack.length&&this.setTitle(this._windowTitleStack.pop()),$!==0&&$!==1||this._iconNameStack.length&&this.setIconName(this._iconNameStack.pop())}return!0}saveCursor(L){return this._activeBuffer.savedX=this._activeBuffer.x,this._activeBuffer.savedY=this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,!0}restoreCursor(L){return this._activeBuffer.x=this._activeBuffer.savedX||0,this._activeBuffer.y=Math.max(this._activeBuffer.savedY-this._activeBuffer.ybase,0),this._curAttrData.fg=this._activeBuffer.savedCurAttrData.fg,this._curAttrData.bg=this._activeBuffer.savedCurAttrData.bg,this._charsetService.charset=this._savedCharset,this._activeBuffer.savedCharset&&(this._charsetService.charset=this._activeBuffer.savedCharset),this._restrictCursor(),!0}setTitle(L){return this._windowTitle=L,this._onTitleChange.fire(L),!0}setIconName(L){return this._iconName=L,!0}setOrReportIndexedColor(L){const $=[],M=L.split(";");for(;M.length>1;){const I=M.shift(),j=M.shift();if(/^\d+$/.exec(I)){const X=parseInt(I);if(W(X))if(j==="?")$.push({type:0,index:X});else{const se=(0,y.parseColor)(j);se&&$.push({type:1,index:X,color:se})}}}return $.length&&this._onColor.fire($),!0}setHyperlink(L){const $=L.split(";");return!($.length<2)&&($[1]?this._createHyperlink($[0],$[1]):!$[0]&&this._finishHyperlink())}_createHyperlink(L,$){this._getCurrentLinkId()&&this._finishHyperlink();const M=L.split(":");let I;const j=M.findIndex(X=>X.startsWith("id="));return j!==-1&&(I=M[j].slice(3)||void 0),this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=this._oscLinkService.registerLink({id:I,uri:$}),this._curAttrData.updateExtended(),!0}_finishHyperlink(){return this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=0,this._curAttrData.updateExtended(),!0}_setOrReportSpecialColor(L,$){const M=L.split(";");for(let I=0;I<M.length&&!($>=this._specialColors.length);++I,++$)if(M[I]==="?")this._onColor.fire([{type:0,index:this._specialColors[$]}]);else{const j=(0,y.parseColor)(M[I]);j&&this._onColor.fire([{type:1,index:this._specialColors[$],color:j}])}return!0}setOrReportFgColor(L){return this._setOrReportSpecialColor(L,0)}setOrReportBgColor(L){return this._setOrReportSpecialColor(L,1)}setOrReportCursorColor(L){return this._setOrReportSpecialColor(L,2)}restoreIndexedColor(L){if(!L)return this._onColor.fire([{type:2}]),!0;const $=[],M=L.split(";");for(let I=0;I<M.length;++I)if(/^\d+$/.exec(M[I])){const j=parseInt(M[I]);W(j)&&$.push({type:2,index:j})}return $.length&&this._onColor.fire($),!0}restoreFgColor(L){return this._onColor.fire([{type:2,index:256}]),!0}restoreBgColor(L){return this._onColor.fire([{type:2,index:257}]),!0}restoreCursorColor(L){return this._onColor.fire([{type:2,index:258}]),!0}nextLine(){return this._activeBuffer.x=0,this.index(),!0}keypadApplicationMode(){return this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire(),!0}keypadNumericMode(){return this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire(),!0}selectDefaultCharset(){return this._charsetService.setgLevel(0),this._charsetService.setgCharset(0,f.DEFAULT_CHARSET),!0}selectCharset(L){return L.length!==2?(this.selectDefaultCharset(),!0):(L[0]==="/"||this._charsetService.setgCharset(k[L[0]],f.CHARSETS[L[1]]||f.DEFAULT_CHARSET),!0)}index(){return this._restrictCursor(),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._restrictCursor(),!0}tabSet(){return this._activeBuffer.tabs[this._activeBuffer.x]=!0,!0}reverseIndex(){if(this._restrictCursor(),this._activeBuffer.y===this._activeBuffer.scrollTop){const L=this._activeBuffer.scrollBottom-this._activeBuffer.scrollTop;this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase+this._activeBuffer.y,L,1),this._activeBuffer.lines.set(this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.getBlankLine(this._eraseAttrData())),this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom)}else this._activeBuffer.y--,this._restrictCursor();return!0}fullReset(){return this._parser.reset(),this._onRequestReset.fire(),!0}reset(){this._curAttrData=o.DEFAULT_ATTR_DATA.clone(),this._eraseAttrDataInternal=o.DEFAULT_ATTR_DATA.clone()}_eraseAttrData(){return this._eraseAttrDataInternal.bg&=-67108864,this._eraseAttrDataInternal.bg|=67108863&this._curAttrData.bg,this._eraseAttrDataInternal}setgLevel(L){return this._charsetService.setgLevel(L),!0}screenAlignmentPattern(){const L=new h.CellData;L.content=4194304|"E".charCodeAt(0),L.fg=this._curAttrData.fg,L.bg=this._curAttrData.bg,this._setCursor(0,0);for(let $=0;$<this._bufferService.rows;++$){const M=this._activeBuffer.ybase+this._activeBuffer.y+$,I=this._activeBuffer.lines.get(M);I&&(I.fill(L),I.isWrapped=!1)}return this._dirtyRowTracker.markAllDirty(),this._setCursor(0,0),!0}requestStatusString(L,$){const M=this._bufferService.buffer,I=this._optionsService.rawOptions;return(j=>(this._coreService.triggerDataEvent(`${l.C0.ESC}${j}${l.C0.ESC}\\`),!0))(L==='"q'?`P1$r${this._curAttrData.isProtected()?1:0}"q`:L==='"p'?'P1$r61;1"p':L==="r"?`P1$r${M.scrollTop+1};${M.scrollBottom+1}r`:L==="m"?"P1$r0m":L===" q"?`P1$r${{block:2,underline:4,bar:6}[I.cursorStyle]-(I.cursorBlink?1:0)} q`:"P0$r")}markRangeDirty(L,$){this._dirtyRowTracker.markRangeDirty(L,$)}}r.InputHandler=z;let F=class{constructor(N){this._bufferService=N,this.clearRange()}clearRange(){this.start=this._bufferService.buffer.y,this.end=this._bufferService.buffer.y}markDirty(N){N<this.start?this.start=N:N>this.end&&(this.end=N)}markRangeDirty(N,L){N>L&&(O=N,N=L,L=O),N<this.start&&(this.start=N),L>this.end&&(this.end=L)}markAllDirty(){this.markRangeDirty(0,this._bufferService.rows-1)}};function W(N){return 0<=N&&N<256}F=u([g(0,v.IBufferService)],F)},844:(w,r)=>{function n(u){for(const g of u)g.dispose();u.length=0}Object.defineProperty(r,"__esModule",{value:!0}),r.getDisposeArrayDisposable=r.disposeArray=r.toDisposable=r.MutableDisposable=r.Disposable=void 0,r.Disposable=class{constructor(){this._disposables=[],this._isDisposed=!1}dispose(){this._isDisposed=!0;for(const u of this._disposables)u.dispose();this._disposables.length=0}register(u){return this._disposables.push(u),u}unregister(u){const g=this._disposables.indexOf(u);g!==-1&&this._disposables.splice(g,1)}},r.MutableDisposable=class{constructor(){this._isDisposed=!1}get value(){return this._isDisposed?void 0:this._value}set value(u){var g;this._isDisposed||u===this._value||((g=this._value)===null||g===void 0||g.dispose(),this._value=u)}clear(){this.value=void 0}dispose(){var u;this._isDisposed=!0,(u=this._value)===null||u===void 0||u.dispose(),this._value=void 0}},r.toDisposable=function(u){return{dispose:u}},r.disposeArray=n,r.getDisposeArrayDisposable=function(u){return{dispose:()=>n(u)}}},1505:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.FourKeyMap=r.TwoKeyMap=void 0;class n{constructor(){this._data={}}set(g,l,f){this._data[g]||(this._data[g]={}),this._data[g][l]=f}get(g,l){return this._data[g]?this._data[g][l]:void 0}clear(){this._data={}}}r.TwoKeyMap=n,r.FourKeyMap=class{constructor(){this._data=new n}set(u,g,l,f,b){this._data.get(u,g)||this._data.set(u,g,new n),this._data.get(u,g).set(l,f,b)}get(u,g,l,f){var b;return(b=this._data.get(u,g))===null||b===void 0?void 0:b.get(l,f)}clear(){this._data.clear()}}},6114:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.isChromeOS=r.isLinux=r.isWindows=r.isIphone=r.isIpad=r.isMac=r.getSafariVersion=r.isSafari=r.isLegacyEdge=r.isFirefox=r.isNode=void 0,r.isNode=typeof navigator>"u";const n=r.isNode?"node":navigator.userAgent,u=r.isNode?"node":navigator.platform;r.isFirefox=n.includes("Firefox"),r.isLegacyEdge=n.includes("Edge"),r.isSafari=/^((?!chrome|android).)*safari/i.test(n),r.getSafariVersion=function(){if(!r.isSafari)return 0;const g=n.match(/Version\/(\d+)/);return g===null||g.length<2?0:parseInt(g[1])},r.isMac=["Macintosh","MacIntel","MacPPC","Mac68K"].includes(u),r.isIpad=u==="iPad",r.isIphone=u==="iPhone",r.isWindows=["Windows","Win16","Win32","WinCE"].includes(u),r.isLinux=u.indexOf("Linux")>=0,r.isChromeOS=/\bCrOS\b/.test(n)},6106:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.SortedList=void 0;let n=0;r.SortedList=class{constructor(u){this._getKey=u,this._array=[]}clear(){this._array.length=0}insert(u){this._array.length!==0?(n=this._search(this._getKey(u)),this._array.splice(n,0,u)):this._array.push(u)}delete(u){if(this._array.length===0)return!1;const g=this._getKey(u);if(g===void 0||(n=this._search(g),n===-1)||this._getKey(this._array[n])!==g)return!1;do if(this._array[n]===u)return this._array.splice(n,1),!0;while(++n<this._array.length&&this._getKey(this._array[n])===g);return!1}*getKeyIterator(u){if(this._array.length!==0&&(n=this._search(u),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===u))do yield this._array[n];while(++n<this._array.length&&this._getKey(this._array[n])===u)}forEachByKey(u,g){if(this._array.length!==0&&(n=this._search(u),!(n<0||n>=this._array.length)&&this._getKey(this._array[n])===u))do g(this._array[n]);while(++n<this._array.length&&this._getKey(this._array[n])===u)}values(){return[...this._array].values()}_search(u){let g=0,l=this._array.length-1;for(;l>=g;){let f=g+l>>1;const b=this._getKey(this._array[f]);if(b>u)l=f-1;else{if(!(b<u)){for(;f>0&&this._getKey(this._array[f-1])===u;)f--;return f}g=f+1}}return g}}},7226:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DebouncedIdleTask=r.IdleTaskQueue=r.PriorityTaskQueue=void 0;const u=n(6114);class g{constructor(){this._tasks=[],this._i=0}enqueue(b){this._tasks.push(b),this._start()}flush(){for(;this._i<this._tasks.length;)this._tasks[this._i]()||this._i++;this.clear()}clear(){this._idleCallback&&(this._cancelCallback(this._idleCallback),this._idleCallback=void 0),this._i=0,this._tasks.length=0}_start(){this._idleCallback||(this._idleCallback=this._requestCallback(this._process.bind(this)))}_process(b){this._idleCallback=void 0;let C=0,S=0,o=b.timeRemaining(),d=0;for(;this._i<this._tasks.length;){if(C=Date.now(),this._tasks[this._i]()||this._i++,C=Math.max(1,Date.now()-C),S=Math.max(C,S),d=b.timeRemaining(),1.5*S>d)return o-C<-20&&console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(o-C))}ms`),void this._start();o=d}this.clear()}}class l extends g{_requestCallback(b){return setTimeout(()=>b(this._createDeadline(16)))}_cancelCallback(b){clearTimeout(b)}_createDeadline(b){const C=Date.now()+b;return{timeRemaining:()=>Math.max(0,C-Date.now())}}}r.PriorityTaskQueue=l,r.IdleTaskQueue=!u.isNode&&"requestIdleCallback"in window?class extends g{_requestCallback(f){return requestIdleCallback(f)}_cancelCallback(f){cancelIdleCallback(f)}}:l,r.DebouncedIdleTask=class{constructor(){this._queue=new r.IdleTaskQueue}set(f){this._queue.clear(),this._queue.enqueue(f)}flush(){this._queue.flush()}}},9282:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.updateWindowsModeWrappedState=void 0;const u=n(643);r.updateWindowsModeWrappedState=function(g){const l=g.buffer.lines.get(g.buffer.ybase+g.buffer.y-1),f=l==null?void 0:l.get(g.cols-1),b=g.buffer.lines.get(g.buffer.ybase+g.buffer.y);b&&f&&(b.isWrapped=f[u.CHAR_DATA_CODE_INDEX]!==u.NULL_CELL_CODE&&f[u.CHAR_DATA_CODE_INDEX]!==u.WHITESPACE_CELL_CODE)}},3734:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ExtendedAttrs=r.AttributeData=void 0;class n{constructor(){this.fg=0,this.bg=0,this.extended=new u}static toColorRGB(l){return[l>>>16&255,l>>>8&255,255&l]}static fromColorRGB(l){return(255&l[0])<<16|(255&l[1])<<8|255&l[2]}clone(){const l=new n;return l.fg=this.fg,l.bg=this.bg,l.extended=this.extended.clone(),l}isInverse(){return 67108864&this.fg}isBold(){return 134217728&this.fg}isUnderline(){return this.hasExtendedAttrs()&&this.extended.underlineStyle!==0?1:268435456&this.fg}isBlink(){return 536870912&this.fg}isInvisible(){return 1073741824&this.fg}isItalic(){return 67108864&this.bg}isDim(){return 134217728&this.bg}isStrikethrough(){return 2147483648&this.fg}isProtected(){return 536870912&this.bg}isOverline(){return 1073741824&this.bg}getFgColorMode(){return 50331648&this.fg}getBgColorMode(){return 50331648&this.bg}isFgRGB(){return(50331648&this.fg)==50331648}isBgRGB(){return(50331648&this.bg)==50331648}isFgPalette(){return(50331648&this.fg)==16777216||(50331648&this.fg)==33554432}isBgPalette(){return(50331648&this.bg)==16777216||(50331648&this.bg)==33554432}isFgDefault(){return(50331648&this.fg)==0}isBgDefault(){return(50331648&this.bg)==0}isAttributeDefault(){return this.fg===0&&this.bg===0}getFgColor(){switch(50331648&this.fg){case 16777216:case 33554432:return 255&this.fg;case 50331648:return 16777215&this.fg;default:return-1}}getBgColor(){switch(50331648&this.bg){case 16777216:case 33554432:return 255&this.bg;case 50331648:return 16777215&this.bg;default:return-1}}hasExtendedAttrs(){return 268435456&this.bg}updateExtended(){this.extended.isEmpty()?this.bg&=-268435457:this.bg|=268435456}getUnderlineColor(){if(268435456&this.bg&&~this.extended.underlineColor)switch(50331648&this.extended.underlineColor){case 16777216:case 33554432:return 255&this.extended.underlineColor;case 50331648:return 16777215&this.extended.underlineColor;default:return this.getFgColor()}return this.getFgColor()}getUnderlineColorMode(){return 268435456&this.bg&&~this.extended.underlineColor?50331648&this.extended.underlineColor:this.getFgColorMode()}isUnderlineColorRGB(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==50331648:this.isFgRGB()}isUnderlineColorPalette(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==16777216||(50331648&this.extended.underlineColor)==33554432:this.isFgPalette()}isUnderlineColorDefault(){return 268435456&this.bg&&~this.extended.underlineColor?(50331648&this.extended.underlineColor)==0:this.isFgDefault()}getUnderlineStyle(){return 268435456&this.fg?268435456&this.bg?this.extended.underlineStyle:1:0}}r.AttributeData=n;class u{get ext(){return this._urlId?-469762049&this._ext|this.underlineStyle<<26:this._ext}set ext(l){this._ext=l}get underlineStyle(){return this._urlId?5:(469762048&this._ext)>>26}set underlineStyle(l){this._ext&=-469762049,this._ext|=l<<26&469762048}get underlineColor(){return 67108863&this._ext}set underlineColor(l){this._ext&=-67108864,this._ext|=67108863&l}get urlId(){return this._urlId}set urlId(l){this._urlId=l}constructor(l=0,f=0){this._ext=0,this._urlId=0,this._ext=l,this._urlId=f}clone(){return new u(this._ext,this._urlId)}isEmpty(){return this.underlineStyle===0&&this._urlId===0}}r.ExtendedAttrs=u},9092:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Buffer=r.MAX_BUFFER_SIZE=void 0;const u=n(6349),g=n(7226),l=n(3734),f=n(8437),b=n(4634),C=n(511),S=n(643),o=n(4863),d=n(7116);r.MAX_BUFFER_SIZE=4294967295,r.Buffer=class{constructor(a,h,p){this._hasScrollback=a,this._optionsService=h,this._bufferService=p,this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.tabs={},this.savedY=0,this.savedX=0,this.savedCurAttrData=f.DEFAULT_ATTR_DATA.clone(),this.savedCharset=d.DEFAULT_CHARSET,this.markers=[],this._nullCell=C.CellData.fromCharData([0,S.NULL_CELL_CHAR,S.NULL_CELL_WIDTH,S.NULL_CELL_CODE]),this._whitespaceCell=C.CellData.fromCharData([0,S.WHITESPACE_CELL_CHAR,S.WHITESPACE_CELL_WIDTH,S.WHITESPACE_CELL_CODE]),this._isClearing=!1,this._memoryCleanupQueue=new g.IdleTaskQueue,this._memoryCleanupPosition=0,this._cols=this._bufferService.cols,this._rows=this._bufferService.rows,this.lines=new u.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}getNullCell(a){return a?(this._nullCell.fg=a.fg,this._nullCell.bg=a.bg,this._nullCell.extended=a.extended):(this._nullCell.fg=0,this._nullCell.bg=0,this._nullCell.extended=new l.ExtendedAttrs),this._nullCell}getWhitespaceCell(a){return a?(this._whitespaceCell.fg=a.fg,this._whitespaceCell.bg=a.bg,this._whitespaceCell.extended=a.extended):(this._whitespaceCell.fg=0,this._whitespaceCell.bg=0,this._whitespaceCell.extended=new l.ExtendedAttrs),this._whitespaceCell}getBlankLine(a,h){return new f.BufferLine(this._bufferService.cols,this.getNullCell(a),h)}get hasScrollback(){return this._hasScrollback&&this.lines.maxLength>this._rows}get isCursorInViewport(){const a=this.ybase+this.y-this.ydisp;return a>=0&&a<this._rows}_getCorrectBufferLength(a){if(!this._hasScrollback)return a;const h=a+this._optionsService.rawOptions.scrollback;return h>r.MAX_BUFFER_SIZE?r.MAX_BUFFER_SIZE:h}fillViewportRows(a){if(this.lines.length===0){a===void 0&&(a=f.DEFAULT_ATTR_DATA);let h=this._rows;for(;h--;)this.lines.push(this.getBlankLine(a))}}clear(){this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.lines=new u.CircularList(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}resize(a,h){const p=this.getNullCell(f.DEFAULT_ATTR_DATA);let v=0;const x=this._getCorrectBufferLength(h);if(x>this.lines.maxLength&&(this.lines.maxLength=x),this.lines.length>0){if(this._cols<a)for(let y=0;y<this.lines.length;y++)v+=+this.lines.get(y).resize(a,p);let E=0;if(this._rows<h)for(let y=this._rows;y<h;y++)this.lines.length<h+this.ybase&&(this._optionsService.rawOptions.windowsMode||this._optionsService.rawOptions.windowsPty.backend!==void 0||this._optionsService.rawOptions.windowsPty.buildNumber!==void 0?this.lines.push(new f.BufferLine(a,p)):this.ybase>0&&this.lines.length<=this.ybase+this.y+E+1?(this.ybase--,E++,this.ydisp>0&&this.ydisp--):this.lines.push(new f.BufferLine(a,p)));else for(let y=this._rows;y>h;y--)this.lines.length>h+this.ybase&&(this.lines.length>this.ybase+this.y+1?this.lines.pop():(this.ybase++,this.ydisp++));if(x<this.lines.maxLength){const y=this.lines.length-x;y>0&&(this.lines.trimStart(y),this.ybase=Math.max(this.ybase-y,0),this.ydisp=Math.max(this.ydisp-y,0),this.savedY=Math.max(this.savedY-y,0)),this.lines.maxLength=x}this.x=Math.min(this.x,a-1),this.y=Math.min(this.y,h-1),E&&(this.y+=E),this.savedX=Math.min(this.savedX,a-1),this.scrollTop=0}if(this.scrollBottom=h-1,this._isReflowEnabled&&(this._reflow(a,h),this._cols>a))for(let E=0;E<this.lines.length;E++)v+=+this.lines.get(E).resize(a,p);this._cols=a,this._rows=h,this._memoryCleanupQueue.clear(),v>.1*this.lines.length&&(this._memoryCleanupPosition=0,this._memoryCleanupQueue.enqueue(()=>this._batchedMemoryCleanup()))}_batchedMemoryCleanup(){let a=!0;this._memoryCleanupPosition>=this.lines.length&&(this._memoryCleanupPosition=0,a=!1);let h=0;for(;this._memoryCleanupPosition<this.lines.length;)if(h+=this.lines.get(this._memoryCleanupPosition++).cleanupMemory(),h>100)return!0;return a}get _isReflowEnabled(){const a=this._optionsService.rawOptions.windowsPty;return a&&a.buildNumber?this._hasScrollback&&a.backend==="conpty"&&a.buildNumber>=21376:this._hasScrollback&&!this._optionsService.rawOptions.windowsMode}_reflow(a,h){this._cols!==a&&(a>this._cols?this._reflowLarger(a,h):this._reflowSmaller(a,h))}_reflowLarger(a,h){const p=(0,b.reflowLargerGetLinesToRemove)(this.lines,this._cols,a,this.ybase+this.y,this.getNullCell(f.DEFAULT_ATTR_DATA));if(p.length>0){const v=(0,b.reflowLargerCreateNewLayout)(this.lines,p);(0,b.reflowLargerApplyNewLayout)(this.lines,v.layout),this._reflowLargerAdjustViewport(a,h,v.countRemoved)}}_reflowLargerAdjustViewport(a,h,p){const v=this.getNullCell(f.DEFAULT_ATTR_DATA);let x=p;for(;x-- >0;)this.ybase===0?(this.y>0&&this.y--,this.lines.length<h&&this.lines.push(new f.BufferLine(a,v))):(this.ydisp===this.ybase&&this.ydisp--,this.ybase--);this.savedY=Math.max(this.savedY-p,0)}_reflowSmaller(a,h){const p=this.getNullCell(f.DEFAULT_ATTR_DATA),v=[];let x=0;for(let E=this.lines.length-1;E>=0;E--){let y=this.lines.get(E);if(!y||!y.isWrapped&&y.getTrimmedLength()<=a)continue;const k=[y];for(;y.isWrapped&&E>0;)y=this.lines.get(--E),k.unshift(y);const T=this.ybase+this.y;if(T>=E&&T<E+k.length)continue;const B=k[k.length-1].getTrimmedLength(),R=(0,b.reflowSmallerGetNewLineLengths)(k,this._cols,a),O=R.length-k.length;let z;z=this.ybase===0&&this.y!==this.lines.length-1?Math.max(0,this.y-this.lines.maxLength+O):Math.max(0,this.lines.length-this.lines.maxLength+O);const F=[];for(let I=0;I<O;I++){const j=this.getBlankLine(f.DEFAULT_ATTR_DATA,!0);F.push(j)}F.length>0&&(v.push({start:E+k.length+x,newLines:F}),x+=F.length),k.push(...F);let W=R.length-1,N=R[W];N===0&&(W--,N=R[W]);let L=k.length-O-1,$=B;for(;L>=0;){const I=Math.min($,N);if(k[W]===void 0)break;if(k[W].copyCellsFrom(k[L],$-I,N-I,I,!0),N-=I,N===0&&(W--,N=R[W]),$-=I,$===0){L--;const j=Math.max(L,0);$=(0,b.getWrappedLineTrimmedLength)(k,j,this._cols)}}for(let I=0;I<k.length;I++)R[I]<a&&k[I].setCell(R[I],p);let M=O-z;for(;M-- >0;)this.ybase===0?this.y<h-1?(this.y++,this.lines.pop()):(this.ybase++,this.ydisp++):this.ybase<Math.min(this.lines.maxLength,this.lines.length+x)-h&&(this.ybase===this.ydisp&&this.ydisp++,this.ybase++);this.savedY=Math.min(this.savedY+O,this.ybase+h-1)}if(v.length>0){const E=[],y=[];for(let W=0;W<this.lines.length;W++)y.push(this.lines.get(W));const k=this.lines.length;let T=k-1,B=0,R=v[B];this.lines.length=Math.min(this.lines.maxLength,this.lines.length+x);let O=0;for(let W=Math.min(this.lines.maxLength-1,k+x-1);W>=0;W--)if(R&&R.start>T+O){for(let N=R.newLines.length-1;N>=0;N--)this.lines.set(W--,R.newLines[N]);W++,E.push({index:T+1,amount:R.newLines.length}),O+=R.newLines.length,R=v[++B]}else this.lines.set(W,y[T--]);let z=0;for(let W=E.length-1;W>=0;W--)E[W].index+=z,this.lines.onInsertEmitter.fire(E[W]),z+=E[W].amount;const F=Math.max(0,k+x-this.lines.maxLength);F>0&&this.lines.onTrimEmitter.fire(F)}}translateBufferLineToString(a,h,p=0,v){const x=this.lines.get(a);return x?x.translateToString(h,p,v):""}getWrappedRangeForLine(a){let h=a,p=a;for(;h>0&&this.lines.get(h).isWrapped;)h--;for(;p+1<this.lines.length&&this.lines.get(p+1).isWrapped;)p++;return{first:h,last:p}}setupTabStops(a){for(a!=null?this.tabs[a]||(a=this.prevStop(a)):(this.tabs={},a=0);a<this._cols;a+=this._optionsService.rawOptions.tabStopWidth)this.tabs[a]=!0}prevStop(a){for(a==null&&(a=this.x);!this.tabs[--a]&&a>0;);return a>=this._cols?this._cols-1:a<0?0:a}nextStop(a){for(a==null&&(a=this.x);!this.tabs[++a]&&a<this._cols;);return a>=this._cols?this._cols-1:a<0?0:a}clearMarkers(a){this._isClearing=!0;for(let h=0;h<this.markers.length;h++)this.markers[h].line===a&&(this.markers[h].dispose(),this.markers.splice(h--,1));this._isClearing=!1}clearAllMarkers(){this._isClearing=!0;for(let a=0;a<this.markers.length;a++)this.markers[a].dispose(),this.markers.splice(a--,1);this._isClearing=!1}addMarker(a){const h=new o.Marker(a);return this.markers.push(h),h.register(this.lines.onTrim(p=>{h.line-=p,h.line<0&&h.dispose()})),h.register(this.lines.onInsert(p=>{h.line>=p.index&&(h.line+=p.amount)})),h.register(this.lines.onDelete(p=>{h.line>=p.index&&h.line<p.index+p.amount&&h.dispose(),h.line>p.index&&(h.line-=p.amount)})),h.register(h.onDispose(()=>this._removeMarker(h))),h}_removeMarker(a){this._isClearing||this.markers.splice(this.markers.indexOf(a),1)}}},8437:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferLine=r.DEFAULT_ATTR_DATA=void 0;const u=n(3734),g=n(511),l=n(643),f=n(482);r.DEFAULT_ATTR_DATA=Object.freeze(new u.AttributeData);let b=0;class C{constructor(o,d,a=!1){this.isWrapped=a,this._combined={},this._extendedAttrs={},this._data=new Uint32Array(3*o);const h=d||g.CellData.fromCharData([0,l.NULL_CELL_CHAR,l.NULL_CELL_WIDTH,l.NULL_CELL_CODE]);for(let p=0;p<o;++p)this.setCell(p,h);this.length=o}get(o){const d=this._data[3*o+0],a=2097151&d;return[this._data[3*o+1],2097152&d?this._combined[o]:a?(0,f.stringFromCodePoint)(a):"",d>>22,2097152&d?this._combined[o].charCodeAt(this._combined[o].length-1):a]}set(o,d){this._data[3*o+1]=d[l.CHAR_DATA_ATTR_INDEX],d[l.CHAR_DATA_CHAR_INDEX].length>1?(this._combined[o]=d[1],this._data[3*o+0]=2097152|o|d[l.CHAR_DATA_WIDTH_INDEX]<<22):this._data[3*o+0]=d[l.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|d[l.CHAR_DATA_WIDTH_INDEX]<<22}getWidth(o){return this._data[3*o+0]>>22}hasWidth(o){return 12582912&this._data[3*o+0]}getFg(o){return this._data[3*o+1]}getBg(o){return this._data[3*o+2]}hasContent(o){return 4194303&this._data[3*o+0]}getCodePoint(o){const d=this._data[3*o+0];return 2097152&d?this._combined[o].charCodeAt(this._combined[o].length-1):2097151&d}isCombined(o){return 2097152&this._data[3*o+0]}getString(o){const d=this._data[3*o+0];return 2097152&d?this._combined[o]:2097151&d?(0,f.stringFromCodePoint)(2097151&d):""}isProtected(o){return 536870912&this._data[3*o+2]}loadCell(o,d){return b=3*o,d.content=this._data[b+0],d.fg=this._data[b+1],d.bg=this._data[b+2],2097152&d.content&&(d.combinedData=this._combined[o]),268435456&d.bg&&(d.extended=this._extendedAttrs[o]),d}setCell(o,d){2097152&d.content&&(this._combined[o]=d.combinedData),268435456&d.bg&&(this._extendedAttrs[o]=d.extended),this._data[3*o+0]=d.content,this._data[3*o+1]=d.fg,this._data[3*o+2]=d.bg}setCellFromCodePoint(o,d,a,h,p,v){268435456&p&&(this._extendedAttrs[o]=v),this._data[3*o+0]=d|a<<22,this._data[3*o+1]=h,this._data[3*o+2]=p}addCodepointToCell(o,d){let a=this._data[3*o+0];2097152&a?this._combined[o]+=(0,f.stringFromCodePoint)(d):(2097151&a?(this._combined[o]=(0,f.stringFromCodePoint)(2097151&a)+(0,f.stringFromCodePoint)(d),a&=-2097152,a|=2097152):a=d|4194304,this._data[3*o+0]=a)}insertCells(o,d,a,h){if((o%=this.length)&&this.getWidth(o-1)===2&&this.setCellFromCodePoint(o-1,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs),d<this.length-o){const p=new g.CellData;for(let v=this.length-o-d-1;v>=0;--v)this.setCell(o+d+v,this.loadCell(o+v,p));for(let v=0;v<d;++v)this.setCell(o+v,a)}else for(let p=o;p<this.length;++p)this.setCell(p,a);this.getWidth(this.length-1)===2&&this.setCellFromCodePoint(this.length-1,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs)}deleteCells(o,d,a,h){if(o%=this.length,d<this.length-o){const p=new g.CellData;for(let v=0;v<this.length-o-d;++v)this.setCell(o+v,this.loadCell(o+d+v,p));for(let v=this.length-d;v<this.length;++v)this.setCell(v,a)}else for(let p=o;p<this.length;++p)this.setCell(p,a);o&&this.getWidth(o-1)===2&&this.setCellFromCodePoint(o-1,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs),this.getWidth(o)!==0||this.hasContent(o)||this.setCellFromCodePoint(o,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs)}replaceCells(o,d,a,h,p=!1){if(p)for(o&&this.getWidth(o-1)===2&&!this.isProtected(o-1)&&this.setCellFromCodePoint(o-1,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs),d<this.length&&this.getWidth(d-1)===2&&!this.isProtected(d)&&this.setCellFromCodePoint(d,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs);o<d&&o<this.length;)this.isProtected(o)||this.setCell(o,a),o++;else for(o&&this.getWidth(o-1)===2&&this.setCellFromCodePoint(o-1,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs),d<this.length&&this.getWidth(d-1)===2&&this.setCellFromCodePoint(d,0,1,(h==null?void 0:h.fg)||0,(h==null?void 0:h.bg)||0,(h==null?void 0:h.extended)||new u.ExtendedAttrs);o<d&&o<this.length;)this.setCell(o++,a)}resize(o,d){if(o===this.length)return 4*this._data.length*2<this._data.buffer.byteLength;const a=3*o;if(o>this.length){if(this._data.buffer.byteLength>=4*a)this._data=new Uint32Array(this._data.buffer,0,a);else{const h=new Uint32Array(a);h.set(this._data),this._data=h}for(let h=this.length;h<o;++h)this.setCell(h,d)}else{this._data=this._data.subarray(0,a);const h=Object.keys(this._combined);for(let v=0;v<h.length;v++){const x=parseInt(h[v],10);x>=o&&delete this._combined[x]}const p=Object.keys(this._extendedAttrs);for(let v=0;v<p.length;v++){const x=parseInt(p[v],10);x>=o&&delete this._extendedAttrs[x]}}return this.length=o,4*a*2<this._data.buffer.byteLength}cleanupMemory(){if(4*this._data.length*2<this._data.buffer.byteLength){const o=new Uint32Array(this._data.length);return o.set(this._data),this._data=o,1}return 0}fill(o,d=!1){if(d)for(let a=0;a<this.length;++a)this.isProtected(a)||this.setCell(a,o);else{this._combined={},this._extendedAttrs={};for(let a=0;a<this.length;++a)this.setCell(a,o)}}copyFrom(o){this.length!==o.length?this._data=new Uint32Array(o._data):this._data.set(o._data),this.length=o.length,this._combined={};for(const d in o._combined)this._combined[d]=o._combined[d];this._extendedAttrs={};for(const d in o._extendedAttrs)this._extendedAttrs[d]=o._extendedAttrs[d];this.isWrapped=o.isWrapped}clone(){const o=new C(0);o._data=new Uint32Array(this._data),o.length=this.length;for(const d in this._combined)o._combined[d]=this._combined[d];for(const d in this._extendedAttrs)o._extendedAttrs[d]=this._extendedAttrs[d];return o.isWrapped=this.isWrapped,o}getTrimmedLength(){for(let o=this.length-1;o>=0;--o)if(4194303&this._data[3*o+0])return o+(this._data[3*o+0]>>22);return 0}getNoBgTrimmedLength(){for(let o=this.length-1;o>=0;--o)if(4194303&this._data[3*o+0]||50331648&this._data[3*o+2])return o+(this._data[3*o+0]>>22);return 0}copyCellsFrom(o,d,a,h,p){const v=o._data;if(p)for(let E=h-1;E>=0;E--){for(let y=0;y<3;y++)this._data[3*(a+E)+y]=v[3*(d+E)+y];268435456&v[3*(d+E)+2]&&(this._extendedAttrs[a+E]=o._extendedAttrs[d+E])}else for(let E=0;E<h;E++){for(let y=0;y<3;y++)this._data[3*(a+E)+y]=v[3*(d+E)+y];268435456&v[3*(d+E)+2]&&(this._extendedAttrs[a+E]=o._extendedAttrs[d+E])}const x=Object.keys(o._combined);for(let E=0;E<x.length;E++){const y=parseInt(x[E],10);y>=d&&(this._combined[y-d+a]=o._combined[y])}}translateToString(o=!1,d=0,a=this.length){o&&(a=Math.min(a,this.getTrimmedLength()));let h="";for(;d<a;){const p=this._data[3*d+0],v=2097151&p;h+=2097152&p?this._combined[d]:v?(0,f.stringFromCodePoint)(v):l.WHITESPACE_CELL_CHAR,d+=p>>22||1}return h}}r.BufferLine=C},4841:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.getRangeLength=void 0,r.getRangeLength=function(n,u){if(n.start.y>n.end.y)throw new Error(`Buffer range end (${n.end.x}, ${n.end.y}) cannot be before start (${n.start.x}, ${n.start.y})`);return u*(n.end.y-n.start.y)+(n.end.x-n.start.x+1)}},4634:(w,r)=>{function n(u,g,l){if(g===u.length-1)return u[g].getTrimmedLength();const f=!u[g].hasContent(l-1)&&u[g].getWidth(l-1)===1,b=u[g+1].getWidth(0)===2;return f&&b?l-1:l}Object.defineProperty(r,"__esModule",{value:!0}),r.getWrappedLineTrimmedLength=r.reflowSmallerGetNewLineLengths=r.reflowLargerApplyNewLayout=r.reflowLargerCreateNewLayout=r.reflowLargerGetLinesToRemove=void 0,r.reflowLargerGetLinesToRemove=function(u,g,l,f,b){const C=[];for(let S=0;S<u.length-1;S++){let o=S,d=u.get(++o);if(!d.isWrapped)continue;const a=[u.get(S)];for(;o<u.length&&d.isWrapped;)a.push(d),d=u.get(++o);if(f>=S&&f<o){S+=a.length-1;continue}let h=0,p=n(a,h,g),v=1,x=0;for(;v<a.length;){const y=n(a,v,g),k=y-x,T=l-p,B=Math.min(k,T);a[h].copyCellsFrom(a[v],x,p,B,!1),p+=B,p===l&&(h++,p=0),x+=B,x===y&&(v++,x=0),p===0&&h!==0&&a[h-1].getWidth(l-1)===2&&(a[h].copyCellsFrom(a[h-1],l-1,p++,1,!1),a[h-1].setCell(l-1,b))}a[h].replaceCells(p,l,b);let E=0;for(let y=a.length-1;y>0&&(y>h||a[y].getTrimmedLength()===0);y--)E++;E>0&&(C.push(S+a.length-E),C.push(E)),S+=a.length-1}return C},r.reflowLargerCreateNewLayout=function(u,g){const l=[];let f=0,b=g[f],C=0;for(let S=0;S<u.length;S++)if(b===S){const o=g[++f];u.onDeleteEmitter.fire({index:S-C,amount:o}),S+=o-1,C+=o,b=g[++f]}else l.push(S);return{layout:l,countRemoved:C}},r.reflowLargerApplyNewLayout=function(u,g){const l=[];for(let f=0;f<g.length;f++)l.push(u.get(g[f]));for(let f=0;f<l.length;f++)u.set(f,l[f]);u.length=g.length},r.reflowSmallerGetNewLineLengths=function(u,g,l){const f=[],b=u.map((d,a)=>n(u,a,g)).reduce((d,a)=>d+a);let C=0,S=0,o=0;for(;o<b;){if(b-o<l){f.push(b-o);break}C+=l;const d=n(u,S,g);C>d&&(C-=d,S++);const a=u[S].getWidth(C-1)===2;a&&C--;const h=a?l-1:l;f.push(h),o+=h}return f},r.getWrappedLineTrimmedLength=n},5295:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferSet=void 0;const u=n(8460),g=n(844),l=n(9092);class f extends g.Disposable{constructor(C,S){super(),this._optionsService=C,this._bufferService=S,this._onBufferActivate=this.register(new u.EventEmitter),this.onBufferActivate=this._onBufferActivate.event,this.reset(),this.register(this._optionsService.onSpecificOptionChange("scrollback",()=>this.resize(this._bufferService.cols,this._bufferService.rows))),this.register(this._optionsService.onSpecificOptionChange("tabStopWidth",()=>this.setupTabStops()))}reset(){this._normal=new l.Buffer(!0,this._optionsService,this._bufferService),this._normal.fillViewportRows(),this._alt=new l.Buffer(!1,this._optionsService,this._bufferService),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}),this.setupTabStops()}get alt(){return this._alt}get active(){return this._activeBuffer}get normal(){return this._normal}activateNormalBuffer(){this._activeBuffer!==this._normal&&(this._normal.x=this._alt.x,this._normal.y=this._alt.y,this._alt.clearAllMarkers(),this._alt.clear(),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}))}activateAltBuffer(C){this._activeBuffer!==this._alt&&(this._alt.fillViewportRows(C),this._alt.x=this._normal.x,this._alt.y=this._normal.y,this._activeBuffer=this._alt,this._onBufferActivate.fire({activeBuffer:this._alt,inactiveBuffer:this._normal}))}resize(C,S){this._normal.resize(C,S),this._alt.resize(C,S),this.setupTabStops(C)}setupTabStops(C){this._normal.setupTabStops(C),this._alt.setupTabStops(C)}}r.BufferSet=f},511:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CellData=void 0;const u=n(482),g=n(643),l=n(3734);class f extends l.AttributeData{constructor(){super(...arguments),this.content=0,this.fg=0,this.bg=0,this.extended=new l.ExtendedAttrs,this.combinedData=""}static fromCharData(C){const S=new f;return S.setFromCharData(C),S}isCombined(){return 2097152&this.content}getWidth(){return this.content>>22}getChars(){return 2097152&this.content?this.combinedData:2097151&this.content?(0,u.stringFromCodePoint)(2097151&this.content):""}getCode(){return this.isCombined()?this.combinedData.charCodeAt(this.combinedData.length-1):2097151&this.content}setFromCharData(C){this.fg=C[g.CHAR_DATA_ATTR_INDEX],this.bg=0;let S=!1;if(C[g.CHAR_DATA_CHAR_INDEX].length>2)S=!0;else if(C[g.CHAR_DATA_CHAR_INDEX].length===2){const o=C[g.CHAR_DATA_CHAR_INDEX].charCodeAt(0);if(55296<=o&&o<=56319){const d=C[g.CHAR_DATA_CHAR_INDEX].charCodeAt(1);56320<=d&&d<=57343?this.content=1024*(o-55296)+d-56320+65536|C[g.CHAR_DATA_WIDTH_INDEX]<<22:S=!0}else S=!0}else this.content=C[g.CHAR_DATA_CHAR_INDEX].charCodeAt(0)|C[g.CHAR_DATA_WIDTH_INDEX]<<22;S&&(this.combinedData=C[g.CHAR_DATA_CHAR_INDEX],this.content=2097152|C[g.CHAR_DATA_WIDTH_INDEX]<<22)}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}}r.CellData=f},643:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.WHITESPACE_CELL_CODE=r.WHITESPACE_CELL_WIDTH=r.WHITESPACE_CELL_CHAR=r.NULL_CELL_CODE=r.NULL_CELL_WIDTH=r.NULL_CELL_CHAR=r.CHAR_DATA_CODE_INDEX=r.CHAR_DATA_WIDTH_INDEX=r.CHAR_DATA_CHAR_INDEX=r.CHAR_DATA_ATTR_INDEX=r.DEFAULT_EXT=r.DEFAULT_ATTR=r.DEFAULT_COLOR=void 0,r.DEFAULT_COLOR=0,r.DEFAULT_ATTR=256|r.DEFAULT_COLOR<<9,r.DEFAULT_EXT=0,r.CHAR_DATA_ATTR_INDEX=0,r.CHAR_DATA_CHAR_INDEX=1,r.CHAR_DATA_WIDTH_INDEX=2,r.CHAR_DATA_CODE_INDEX=3,r.NULL_CELL_CHAR="",r.NULL_CELL_WIDTH=1,r.NULL_CELL_CODE=0,r.WHITESPACE_CELL_CHAR=" ",r.WHITESPACE_CELL_WIDTH=1,r.WHITESPACE_CELL_CODE=32},4863:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Marker=void 0;const u=n(8460),g=n(844);class l{get id(){return this._id}constructor(b){this.line=b,this.isDisposed=!1,this._disposables=[],this._id=l._nextId++,this._onDispose=this.register(new u.EventEmitter),this.onDispose=this._onDispose.event}dispose(){this.isDisposed||(this.isDisposed=!0,this.line=-1,this._onDispose.fire(),(0,g.disposeArray)(this._disposables),this._disposables.length=0)}register(b){return this._disposables.push(b),b}}r.Marker=l,l._nextId=1},7116:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_CHARSET=r.CHARSETS=void 0,r.CHARSETS={},r.DEFAULT_CHARSET=r.CHARSETS.B,r.CHARSETS[0]={"`":"\u25C6",a:"\u2592",b:"\u2409",c:"\u240C",d:"\u240D",e:"\u240A",f:"\xB0",g:"\xB1",h:"\u2424",i:"\u240B",j:"\u2518",k:"\u2510",l:"\u250C",m:"\u2514",n:"\u253C",o:"\u23BA",p:"\u23BB",q:"\u2500",r:"\u23BC",s:"\u23BD",t:"\u251C",u:"\u2524",v:"\u2534",w:"\u252C",x:"\u2502",y:"\u2264",z:"\u2265","{":"\u03C0","|":"\u2260","}":"\xA3","~":"\xB7"},r.CHARSETS.A={"#":"\xA3"},r.CHARSETS.B=void 0,r.CHARSETS[4]={"#":"\xA3","@":"\xBE","[":"ij","\\":"\xBD","]":"|","{":"\xA8","|":"f","}":"\xBC","~":"\xB4"},r.CHARSETS.C=r.CHARSETS[5]={"[":"\xC4","\\":"\xD6","]":"\xC5","^":"\xDC","`":"\xE9","{":"\xE4","|":"\xF6","}":"\xE5","~":"\xFC"},r.CHARSETS.R={"#":"\xA3","@":"\xE0","[":"\xB0","\\":"\xE7","]":"\xA7","{":"\xE9","|":"\xF9","}":"\xE8","~":"\xA8"},r.CHARSETS.Q={"@":"\xE0","[":"\xE2","\\":"\xE7","]":"\xEA","^":"\xEE","`":"\xF4","{":"\xE9","|":"\xF9","}":"\xE8","~":"\xFB"},r.CHARSETS.K={"@":"\xA7","[":"\xC4","\\":"\xD6","]":"\xDC","{":"\xE4","|":"\xF6","}":"\xFC","~":"\xDF"},r.CHARSETS.Y={"#":"\xA3","@":"\xA7","[":"\xB0","\\":"\xE7","]":"\xE9","`":"\xF9","{":"\xE0","|":"\xF2","}":"\xE8","~":"\xEC"},r.CHARSETS.E=r.CHARSETS[6]={"@":"\xC4","[":"\xC6","\\":"\xD8","]":"\xC5","^":"\xDC","`":"\xE4","{":"\xE6","|":"\xF8","}":"\xE5","~":"\xFC"},r.CHARSETS.Z={"#":"\xA3","@":"\xA7","[":"\xA1","\\":"\xD1","]":"\xBF","{":"\xB0","|":"\xF1","}":"\xE7"},r.CHARSETS.H=r.CHARSETS[7]={"@":"\xC9","[":"\xC4","\\":"\xD6","]":"\xC5","^":"\xDC","`":"\xE9","{":"\xE4","|":"\xF6","}":"\xE5","~":"\xFC"},r.CHARSETS["="]={"#":"\xF9","@":"\xE0","[":"\xE9","\\":"\xE7","]":"\xEA","^":"\xEE",_:"\xE8","`":"\xF4","{":"\xE4","|":"\xF6","}":"\xFC","~":"\xFB"}},2584:(w,r)=>{var n,u,g;Object.defineProperty(r,"__esModule",{value:!0}),r.C1_ESCAPED=r.C1=r.C0=void 0,function(l){l.NUL="\0",l.SOH="",l.STX="",l.ETX="",l.EOT="",l.ENQ="",l.ACK="",l.BEL="\x07",l.BS="\b",l.HT="	",l.LF=`
`,l.VT="\v",l.FF="\f",l.CR="\r",l.SO="",l.SI="",l.DLE="",l.DC1="",l.DC2="",l.DC3="",l.DC4="",l.NAK="",l.SYN="",l.ETB="",l.CAN="",l.EM="",l.SUB="",l.ESC="\x1B",l.FS="",l.GS="",l.RS="",l.US="",l.SP=" ",l.DEL="\x7F"}(n||(r.C0=n={})),function(l){l.PAD="\x80",l.HOP="\x81",l.BPH="\x82",l.NBH="\x83",l.IND="\x84",l.NEL="\x85",l.SSA="\x86",l.ESA="\x87",l.HTS="\x88",l.HTJ="\x89",l.VTS="\x8A",l.PLD="\x8B",l.PLU="\x8C",l.RI="\x8D",l.SS2="\x8E",l.SS3="\x8F",l.DCS="\x90",l.PU1="\x91",l.PU2="\x92",l.STS="\x93",l.CCH="\x94",l.MW="\x95",l.SPA="\x96",l.EPA="\x97",l.SOS="\x98",l.SGCI="\x99",l.SCI="\x9A",l.CSI="\x9B",l.ST="\x9C",l.OSC="\x9D",l.PM="\x9E",l.APC="\x9F"}(u||(r.C1=u={})),function(l){l.ST=`${n.ESC}\\`}(g||(r.C1_ESCAPED=g={}))},7399:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.evaluateKeyboardEvent=void 0;const u=n(2584),g={48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],186:[";",":"],187:["=","+"],188:[",","<"],189:["-","_"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"']};r.evaluateKeyboardEvent=function(l,f,b,C){const S={type:0,cancel:!1,key:void 0},o=(l.shiftKey?1:0)|(l.altKey?2:0)|(l.ctrlKey?4:0)|(l.metaKey?8:0);switch(l.keyCode){case 0:l.key==="UIKeyInputUpArrow"?S.key=f?u.C0.ESC+"OA":u.C0.ESC+"[A":l.key==="UIKeyInputLeftArrow"?S.key=f?u.C0.ESC+"OD":u.C0.ESC+"[D":l.key==="UIKeyInputRightArrow"?S.key=f?u.C0.ESC+"OC":u.C0.ESC+"[C":l.key==="UIKeyInputDownArrow"&&(S.key=f?u.C0.ESC+"OB":u.C0.ESC+"[B");break;case 8:if(l.altKey){S.key=u.C0.ESC+u.C0.DEL;break}S.key=u.C0.DEL;break;case 9:if(l.shiftKey){S.key=u.C0.ESC+"[Z";break}S.key=u.C0.HT,S.cancel=!0;break;case 13:S.key=l.altKey?u.C0.ESC+u.C0.CR:u.C0.CR,S.cancel=!0;break;case 27:S.key=u.C0.ESC,l.altKey&&(S.key=u.C0.ESC+u.C0.ESC),S.cancel=!0;break;case 37:if(l.metaKey)break;o?(S.key=u.C0.ESC+"[1;"+(o+1)+"D",S.key===u.C0.ESC+"[1;3D"&&(S.key=u.C0.ESC+(b?"b":"[1;5D"))):S.key=f?u.C0.ESC+"OD":u.C0.ESC+"[D";break;case 39:if(l.metaKey)break;o?(S.key=u.C0.ESC+"[1;"+(o+1)+"C",S.key===u.C0.ESC+"[1;3C"&&(S.key=u.C0.ESC+(b?"f":"[1;5C"))):S.key=f?u.C0.ESC+"OC":u.C0.ESC+"[C";break;case 38:if(l.metaKey)break;o?(S.key=u.C0.ESC+"[1;"+(o+1)+"A",b||S.key!==u.C0.ESC+"[1;3A"||(S.key=u.C0.ESC+"[1;5A")):S.key=f?u.C0.ESC+"OA":u.C0.ESC+"[A";break;case 40:if(l.metaKey)break;o?(S.key=u.C0.ESC+"[1;"+(o+1)+"B",b||S.key!==u.C0.ESC+"[1;3B"||(S.key=u.C0.ESC+"[1;5B")):S.key=f?u.C0.ESC+"OB":u.C0.ESC+"[B";break;case 45:l.shiftKey||l.ctrlKey||(S.key=u.C0.ESC+"[2~");break;case 46:S.key=o?u.C0.ESC+"[3;"+(o+1)+"~":u.C0.ESC+"[3~";break;case 36:S.key=o?u.C0.ESC+"[1;"+(o+1)+"H":f?u.C0.ESC+"OH":u.C0.ESC+"[H";break;case 35:S.key=o?u.C0.ESC+"[1;"+(o+1)+"F":f?u.C0.ESC+"OF":u.C0.ESC+"[F";break;case 33:l.shiftKey?S.type=2:l.ctrlKey?S.key=u.C0.ESC+"[5;"+(o+1)+"~":S.key=u.C0.ESC+"[5~";break;case 34:l.shiftKey?S.type=3:l.ctrlKey?S.key=u.C0.ESC+"[6;"+(o+1)+"~":S.key=u.C0.ESC+"[6~";break;case 112:S.key=o?u.C0.ESC+"[1;"+(o+1)+"P":u.C0.ESC+"OP";break;case 113:S.key=o?u.C0.ESC+"[1;"+(o+1)+"Q":u.C0.ESC+"OQ";break;case 114:S.key=o?u.C0.ESC+"[1;"+(o+1)+"R":u.C0.ESC+"OR";break;case 115:S.key=o?u.C0.ESC+"[1;"+(o+1)+"S":u.C0.ESC+"OS";break;case 116:S.key=o?u.C0.ESC+"[15;"+(o+1)+"~":u.C0.ESC+"[15~";break;case 117:S.key=o?u.C0.ESC+"[17;"+(o+1)+"~":u.C0.ESC+"[17~";break;case 118:S.key=o?u.C0.ESC+"[18;"+(o+1)+"~":u.C0.ESC+"[18~";break;case 119:S.key=o?u.C0.ESC+"[19;"+(o+1)+"~":u.C0.ESC+"[19~";break;case 120:S.key=o?u.C0.ESC+"[20;"+(o+1)+"~":u.C0.ESC+"[20~";break;case 121:S.key=o?u.C0.ESC+"[21;"+(o+1)+"~":u.C0.ESC+"[21~";break;case 122:S.key=o?u.C0.ESC+"[23;"+(o+1)+"~":u.C0.ESC+"[23~";break;case 123:S.key=o?u.C0.ESC+"[24;"+(o+1)+"~":u.C0.ESC+"[24~";break;default:if(!l.ctrlKey||l.shiftKey||l.altKey||l.metaKey)if(b&&!C||!l.altKey||l.metaKey)!b||l.altKey||l.ctrlKey||l.shiftKey||!l.metaKey?l.key&&!l.ctrlKey&&!l.altKey&&!l.metaKey&&l.keyCode>=48&&l.key.length===1?S.key=l.key:l.key&&l.ctrlKey&&(l.key==="_"&&(S.key=u.C0.US),l.key==="@"&&(S.key=u.C0.NUL)):l.keyCode===65&&(S.type=1);else{const d=g[l.keyCode],a=d==null?void 0:d[l.shiftKey?1:0];if(a)S.key=u.C0.ESC+a;else if(l.keyCode>=65&&l.keyCode<=90){const h=l.ctrlKey?l.keyCode-64:l.keyCode+32;let p=String.fromCharCode(h);l.shiftKey&&(p=p.toUpperCase()),S.key=u.C0.ESC+p}else if(l.keyCode===32)S.key=u.C0.ESC+(l.ctrlKey?u.C0.NUL:" ");else if(l.key==="Dead"&&l.code.startsWith("Key")){let h=l.code.slice(3,4);l.shiftKey||(h=h.toLowerCase()),S.key=u.C0.ESC+h,S.cancel=!0}}else l.keyCode>=65&&l.keyCode<=90?S.key=String.fromCharCode(l.keyCode-64):l.keyCode===32?S.key=u.C0.NUL:l.keyCode>=51&&l.keyCode<=55?S.key=String.fromCharCode(l.keyCode-51+27):l.keyCode===56?S.key=u.C0.DEL:l.keyCode===219?S.key=u.C0.ESC:l.keyCode===220?S.key=u.C0.FS:l.keyCode===221&&(S.key=u.C0.GS)}return S}},482:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Utf8ToUtf32=r.StringToUtf32=r.utf32ToString=r.stringFromCodePoint=void 0,r.stringFromCodePoint=function(n){return n>65535?(n-=65536,String.fromCharCode(55296+(n>>10))+String.fromCharCode(n%1024+56320)):String.fromCharCode(n)},r.utf32ToString=function(n,u=0,g=n.length){let l="";for(let f=u;f<g;++f){let b=n[f];b>65535?(b-=65536,l+=String.fromCharCode(55296+(b>>10))+String.fromCharCode(b%1024+56320)):l+=String.fromCharCode(b)}return l},r.StringToUtf32=class{constructor(){this._interim=0}clear(){this._interim=0}decode(n,u){const g=n.length;if(!g)return 0;let l=0,f=0;if(this._interim){const b=n.charCodeAt(f++);56320<=b&&b<=57343?u[l++]=1024*(this._interim-55296)+b-56320+65536:(u[l++]=this._interim,u[l++]=b),this._interim=0}for(let b=f;b<g;++b){const C=n.charCodeAt(b);if(55296<=C&&C<=56319){if(++b>=g)return this._interim=C,l;const S=n.charCodeAt(b);56320<=S&&S<=57343?u[l++]=1024*(C-55296)+S-56320+65536:(u[l++]=C,u[l++]=S)}else C!==65279&&(u[l++]=C)}return l}},r.Utf8ToUtf32=class{constructor(){this.interim=new Uint8Array(3)}clear(){this.interim.fill(0)}decode(n,u){const g=n.length;if(!g)return 0;let l,f,b,C,S=0,o=0,d=0;if(this.interim[0]){let p=!1,v=this.interim[0];v&=(224&v)==192?31:(240&v)==224?15:7;let x,E=0;for(;(x=63&this.interim[++E])&&E<4;)v<<=6,v|=x;const y=(224&this.interim[0])==192?2:(240&this.interim[0])==224?3:4,k=y-E;for(;d<k;){if(d>=g)return 0;if(x=n[d++],(192&x)!=128){d--,p=!0;break}this.interim[E++]=x,v<<=6,v|=63&x}p||(y===2?v<128?d--:u[S++]=v:y===3?v<2048||v>=55296&&v<=57343||v===65279||(u[S++]=v):v<65536||v>1114111||(u[S++]=v)),this.interim.fill(0)}const a=g-4;let h=d;for(;h<g;){for(;!(!(h<a)||128&(l=n[h])||128&(f=n[h+1])||128&(b=n[h+2])||128&(C=n[h+3]));)u[S++]=l,u[S++]=f,u[S++]=b,u[S++]=C,h+=4;if(l=n[h++],l<128)u[S++]=l;else if((224&l)==192){if(h>=g)return this.interim[0]=l,S;if(f=n[h++],(192&f)!=128){h--;continue}if(o=(31&l)<<6|63&f,o<128){h--;continue}u[S++]=o}else if((240&l)==224){if(h>=g)return this.interim[0]=l,S;if(f=n[h++],(192&f)!=128){h--;continue}if(h>=g)return this.interim[0]=l,this.interim[1]=f,S;if(b=n[h++],(192&b)!=128){h--;continue}if(o=(15&l)<<12|(63&f)<<6|63&b,o<2048||o>=55296&&o<=57343||o===65279)continue;u[S++]=o}else if((248&l)==240){if(h>=g)return this.interim[0]=l,S;if(f=n[h++],(192&f)!=128){h--;continue}if(h>=g)return this.interim[0]=l,this.interim[1]=f,S;if(b=n[h++],(192&b)!=128){h--;continue}if(h>=g)return this.interim[0]=l,this.interim[1]=f,this.interim[2]=b,S;if(C=n[h++],(192&C)!=128){h--;continue}if(o=(7&l)<<18|(63&f)<<12|(63&b)<<6|63&C,o<65536||o>1114111)continue;u[S++]=o}}return S}}},225:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.UnicodeV6=void 0;const n=[[768,879],[1155,1158],[1160,1161],[1425,1469],[1471,1471],[1473,1474],[1476,1477],[1479,1479],[1536,1539],[1552,1557],[1611,1630],[1648,1648],[1750,1764],[1767,1768],[1770,1773],[1807,1807],[1809,1809],[1840,1866],[1958,1968],[2027,2035],[2305,2306],[2364,2364],[2369,2376],[2381,2381],[2385,2388],[2402,2403],[2433,2433],[2492,2492],[2497,2500],[2509,2509],[2530,2531],[2561,2562],[2620,2620],[2625,2626],[2631,2632],[2635,2637],[2672,2673],[2689,2690],[2748,2748],[2753,2757],[2759,2760],[2765,2765],[2786,2787],[2817,2817],[2876,2876],[2879,2879],[2881,2883],[2893,2893],[2902,2902],[2946,2946],[3008,3008],[3021,3021],[3134,3136],[3142,3144],[3146,3149],[3157,3158],[3260,3260],[3263,3263],[3270,3270],[3276,3277],[3298,3299],[3393,3395],[3405,3405],[3530,3530],[3538,3540],[3542,3542],[3633,3633],[3636,3642],[3655,3662],[3761,3761],[3764,3769],[3771,3772],[3784,3789],[3864,3865],[3893,3893],[3895,3895],[3897,3897],[3953,3966],[3968,3972],[3974,3975],[3984,3991],[3993,4028],[4038,4038],[4141,4144],[4146,4146],[4150,4151],[4153,4153],[4184,4185],[4448,4607],[4959,4959],[5906,5908],[5938,5940],[5970,5971],[6002,6003],[6068,6069],[6071,6077],[6086,6086],[6089,6099],[6109,6109],[6155,6157],[6313,6313],[6432,6434],[6439,6440],[6450,6450],[6457,6459],[6679,6680],[6912,6915],[6964,6964],[6966,6970],[6972,6972],[6978,6978],[7019,7027],[7616,7626],[7678,7679],[8203,8207],[8234,8238],[8288,8291],[8298,8303],[8400,8431],[12330,12335],[12441,12442],[43014,43014],[43019,43019],[43045,43046],[64286,64286],[65024,65039],[65056,65059],[65279,65279],[65529,65531]],u=[[68097,68099],[68101,68102],[68108,68111],[68152,68154],[68159,68159],[119143,119145],[119155,119170],[119173,119179],[119210,119213],[119362,119364],[917505,917505],[917536,917631],[917760,917999]];let g;r.UnicodeV6=class{constructor(){if(this.version="6",!g){g=new Uint8Array(65536),g.fill(1),g[0]=0,g.fill(0,1,32),g.fill(0,127,160),g.fill(2,4352,4448),g[9001]=2,g[9002]=2,g.fill(2,11904,42192),g[12351]=1,g.fill(2,44032,55204),g.fill(2,63744,64256),g.fill(2,65040,65050),g.fill(2,65072,65136),g.fill(2,65280,65377),g.fill(2,65504,65511);for(let l=0;l<n.length;++l)g.fill(0,n[l][0],n[l][1]+1)}}wcwidth(l){return l<32?0:l<127?1:l<65536?g[l]:function(f,b){let C,S=0,o=b.length-1;if(f<b[0][0]||f>b[o][1])return!1;for(;o>=S;)if(C=S+o>>1,f>b[C][1])S=C+1;else{if(!(f<b[C][0]))return!0;o=C-1}return!1}(l,u)?0:l>=131072&&l<=196605||l>=196608&&l<=262141?2:1}}},5981:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.WriteBuffer=void 0;const u=n(8460),g=n(844);class l extends g.Disposable{constructor(b){super(),this._action=b,this._writeBuffer=[],this._callbacks=[],this._pendingData=0,this._bufferOffset=0,this._isSyncWriting=!1,this._syncCalls=0,this._didUserInput=!1,this._onWriteParsed=this.register(new u.EventEmitter),this.onWriteParsed=this._onWriteParsed.event}handleUserInput(){this._didUserInput=!0}writeSync(b,C){if(C!==void 0&&this._syncCalls>C)return void(this._syncCalls=0);if(this._pendingData+=b.length,this._writeBuffer.push(b),this._callbacks.push(void 0),this._syncCalls++,this._isSyncWriting)return;let S;for(this._isSyncWriting=!0;S=this._writeBuffer.shift();){this._action(S);const o=this._callbacks.shift();o&&o()}this._pendingData=0,this._bufferOffset=2147483647,this._isSyncWriting=!1,this._syncCalls=0}write(b,C){if(this._pendingData>5e7)throw new Error("write data discarded, use flow control to avoid losing data");if(!this._writeBuffer.length){if(this._bufferOffset=0,this._didUserInput)return this._didUserInput=!1,this._pendingData+=b.length,this._writeBuffer.push(b),this._callbacks.push(C),void this._innerWrite();setTimeout(()=>this._innerWrite())}this._pendingData+=b.length,this._writeBuffer.push(b),this._callbacks.push(C)}_innerWrite(b=0,C=!0){const S=b||Date.now();for(;this._writeBuffer.length>this._bufferOffset;){const o=this._writeBuffer[this._bufferOffset],d=this._action(o,C);if(d){const h=p=>Date.now()-S>=12?setTimeout(()=>this._innerWrite(0,p)):this._innerWrite(S,p);return void d.catch(p=>(queueMicrotask(()=>{throw p}),Promise.resolve(!1))).then(h)}const a=this._callbacks[this._bufferOffset];if(a&&a(),this._bufferOffset++,this._pendingData-=o.length,Date.now()-S>=12)break}this._writeBuffer.length>this._bufferOffset?(this._bufferOffset>50&&(this._writeBuffer=this._writeBuffer.slice(this._bufferOffset),this._callbacks=this._callbacks.slice(this._bufferOffset),this._bufferOffset=0),setTimeout(()=>this._innerWrite())):(this._writeBuffer.length=0,this._callbacks.length=0,this._pendingData=0,this._bufferOffset=0),this._onWriteParsed.fire()}}r.WriteBuffer=l},5941:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.toRgbString=r.parseColor=void 0;const n=/^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/,u=/^[\da-f]+$/;function g(l,f){const b=l.toString(16),C=b.length<2?"0"+b:b;switch(f){case 4:return b[0];case 8:return C;case 12:return(C+C).slice(0,3);default:return C+C}}r.parseColor=function(l){if(!l)return;let f=l.toLowerCase();if(f.indexOf("rgb:")===0){f=f.slice(4);const b=n.exec(f);if(b){const C=b[1]?15:b[4]?255:b[7]?4095:65535;return[Math.round(parseInt(b[1]||b[4]||b[7]||b[10],16)/C*255),Math.round(parseInt(b[2]||b[5]||b[8]||b[11],16)/C*255),Math.round(parseInt(b[3]||b[6]||b[9]||b[12],16)/C*255)]}}else if(f.indexOf("#")===0&&(f=f.slice(1),u.exec(f)&&[3,6,9,12].includes(f.length))){const b=f.length/3,C=[0,0,0];for(let S=0;S<3;++S){const o=parseInt(f.slice(b*S,b*S+b),16);C[S]=b===1?o<<4:b===2?o:b===3?o>>4:o>>8}return C}},r.toRgbString=function(l,f=16){const[b,C,S]=l;return`rgb:${g(b,f)}/${g(C,f)}/${g(S,f)}`}},5770:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.PAYLOAD_LIMIT=void 0,r.PAYLOAD_LIMIT=1e7},6351:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DcsHandler=r.DcsParser=void 0;const u=n(482),g=n(8742),l=n(5770),f=[];r.DcsParser=class{constructor(){this._handlers=Object.create(null),this._active=f,this._ident=0,this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=f}registerHandler(C,S){this._handlers[C]===void 0&&(this._handlers[C]=[]);const o=this._handlers[C];return o.push(S),{dispose:()=>{const d=o.indexOf(S);d!==-1&&o.splice(d,1)}}}clearHandler(C){this._handlers[C]&&delete this._handlers[C]}setHandlerFallback(C){this._handlerFb=C}reset(){if(this._active.length)for(let C=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;C>=0;--C)this._active[C].unhook(!1);this._stack.paused=!1,this._active=f,this._ident=0}hook(C,S){if(this.reset(),this._ident=C,this._active=this._handlers[C]||f,this._active.length)for(let o=this._active.length-1;o>=0;o--)this._active[o].hook(S);else this._handlerFb(this._ident,"HOOK",S)}put(C,S,o){if(this._active.length)for(let d=this._active.length-1;d>=0;d--)this._active[d].put(C,S,o);else this._handlerFb(this._ident,"PUT",(0,u.utf32ToString)(C,S,o))}unhook(C,S=!0){if(this._active.length){let o=!1,d=this._active.length-1,a=!1;if(this._stack.paused&&(d=this._stack.loopPosition-1,o=S,a=this._stack.fallThrough,this._stack.paused=!1),!a&&o===!1){for(;d>=0&&(o=this._active[d].unhook(C),o!==!0);d--)if(o instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=d,this._stack.fallThrough=!1,o;d--}for(;d>=0;d--)if(o=this._active[d].unhook(!1),o instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=d,this._stack.fallThrough=!0,o}else this._handlerFb(this._ident,"UNHOOK",C);this._active=f,this._ident=0}};const b=new g.Params;b.addParam(0),r.DcsHandler=class{constructor(C){this._handler=C,this._data="",this._params=b,this._hitLimit=!1}hook(C){this._params=C.length>1||C.params[0]?C.clone():b,this._data="",this._hitLimit=!1}put(C,S,o){this._hitLimit||(this._data+=(0,u.utf32ToString)(C,S,o),this._data.length>l.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}unhook(C){let S=!1;if(this._hitLimit)S=!1;else if(C&&(S=this._handler(this._data,this._params),S instanceof Promise))return S.then(o=>(this._params=b,this._data="",this._hitLimit=!1,o));return this._params=b,this._data="",this._hitLimit=!1,S}}},2015:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.EscapeSequenceParser=r.VT500_TRANSITION_TABLE=r.TransitionTable=void 0;const u=n(844),g=n(8742),l=n(6242),f=n(6351);class b{constructor(d){this.table=new Uint8Array(d)}setDefault(d,a){this.table.fill(d<<4|a)}add(d,a,h,p){this.table[a<<8|d]=h<<4|p}addMany(d,a,h,p){for(let v=0;v<d.length;v++)this.table[a<<8|d[v]]=h<<4|p}}r.TransitionTable=b;const C=160;r.VT500_TRANSITION_TABLE=function(){const o=new b(4095),d=Array.apply(null,Array(256)).map((E,y)=>y),a=(E,y)=>d.slice(E,y),h=a(32,127),p=a(0,24);p.push(25),p.push.apply(p,a(28,32));const v=a(0,14);let x;for(x in o.setDefault(1,0),o.addMany(h,0,2,0),v)o.addMany([24,26,153,154],x,3,0),o.addMany(a(128,144),x,3,0),o.addMany(a(144,152),x,3,0),o.add(156,x,0,0),o.add(27,x,11,1),o.add(157,x,4,8),o.addMany([152,158,159],x,0,7),o.add(155,x,11,3),o.add(144,x,11,9);return o.addMany(p,0,3,0),o.addMany(p,1,3,1),o.add(127,1,0,1),o.addMany(p,8,0,8),o.addMany(p,3,3,3),o.add(127,3,0,3),o.addMany(p,4,3,4),o.add(127,4,0,4),o.addMany(p,6,3,6),o.addMany(p,5,3,5),o.add(127,5,0,5),o.addMany(p,2,3,2),o.add(127,2,0,2),o.add(93,1,4,8),o.addMany(h,8,5,8),o.add(127,8,5,8),o.addMany([156,27,24,26,7],8,6,0),o.addMany(a(28,32),8,0,8),o.addMany([88,94,95],1,0,7),o.addMany(h,7,0,7),o.addMany(p,7,0,7),o.add(156,7,0,0),o.add(127,7,0,7),o.add(91,1,11,3),o.addMany(a(64,127),3,7,0),o.addMany(a(48,60),3,8,4),o.addMany([60,61,62,63],3,9,4),o.addMany(a(48,60),4,8,4),o.addMany(a(64,127),4,7,0),o.addMany([60,61,62,63],4,0,6),o.addMany(a(32,64),6,0,6),o.add(127,6,0,6),o.addMany(a(64,127),6,0,0),o.addMany(a(32,48),3,9,5),o.addMany(a(32,48),5,9,5),o.addMany(a(48,64),5,0,6),o.addMany(a(64,127),5,7,0),o.addMany(a(32,48),4,9,5),o.addMany(a(32,48),1,9,2),o.addMany(a(32,48),2,9,2),o.addMany(a(48,127),2,10,0),o.addMany(a(48,80),1,10,0),o.addMany(a(81,88),1,10,0),o.addMany([89,90,92],1,10,0),o.addMany(a(96,127),1,10,0),o.add(80,1,11,9),o.addMany(p,9,0,9),o.add(127,9,0,9),o.addMany(a(28,32),9,0,9),o.addMany(a(32,48),9,9,12),o.addMany(a(48,60),9,8,10),o.addMany([60,61,62,63],9,9,10),o.addMany(p,11,0,11),o.addMany(a(32,128),11,0,11),o.addMany(a(28,32),11,0,11),o.addMany(p,10,0,10),o.add(127,10,0,10),o.addMany(a(28,32),10,0,10),o.addMany(a(48,60),10,8,10),o.addMany([60,61,62,63],10,0,11),o.addMany(a(32,48),10,9,12),o.addMany(p,12,0,12),o.add(127,12,0,12),o.addMany(a(28,32),12,0,12),o.addMany(a(32,48),12,9,12),o.addMany(a(48,64),12,0,11),o.addMany(a(64,127),12,12,13),o.addMany(a(64,127),10,12,13),o.addMany(a(64,127),9,12,13),o.addMany(p,13,13,13),o.addMany(h,13,13,13),o.add(127,13,0,13),o.addMany([27,156,24,26],13,14,0),o.add(C,0,2,0),o.add(C,8,5,8),o.add(C,6,0,6),o.add(C,11,0,11),o.add(C,13,13,13),o}();class S extends u.Disposable{constructor(d=r.VT500_TRANSITION_TABLE){super(),this._transitions=d,this._parseStack={state:0,handlers:[],handlerPos:0,transition:0,chunkPos:0},this.initialState=0,this.currentState=this.initialState,this._params=new g.Params,this._params.addParam(0),this._collect=0,this.precedingCodepoint=0,this._printHandlerFb=(a,h,p)=>{},this._executeHandlerFb=a=>{},this._csiHandlerFb=(a,h)=>{},this._escHandlerFb=a=>{},this._errorHandlerFb=a=>a,this._printHandler=this._printHandlerFb,this._executeHandlers=Object.create(null),this._csiHandlers=Object.create(null),this._escHandlers=Object.create(null),this.register((0,u.toDisposable)(()=>{this._csiHandlers=Object.create(null),this._executeHandlers=Object.create(null),this._escHandlers=Object.create(null)})),this._oscParser=this.register(new l.OscParser),this._dcsParser=this.register(new f.DcsParser),this._errorHandler=this._errorHandlerFb,this.registerEscHandler({final:"\\"},()=>!0)}_identifier(d,a=[64,126]){let h=0;if(d.prefix){if(d.prefix.length>1)throw new Error("only one byte as prefix supported");if(h=d.prefix.charCodeAt(0),h&&60>h||h>63)throw new Error("prefix must be in range 0x3c .. 0x3f")}if(d.intermediates){if(d.intermediates.length>2)throw new Error("only two bytes as intermediates are supported");for(let v=0;v<d.intermediates.length;++v){const x=d.intermediates.charCodeAt(v);if(32>x||x>47)throw new Error("intermediate must be in range 0x20 .. 0x2f");h<<=8,h|=x}}if(d.final.length!==1)throw new Error("final must be a single byte");const p=d.final.charCodeAt(0);if(a[0]>p||p>a[1])throw new Error(`final must be in range ${a[0]} .. ${a[1]}`);return h<<=8,h|=p,h}identToString(d){const a=[];for(;d;)a.push(String.fromCharCode(255&d)),d>>=8;return a.reverse().join("")}setPrintHandler(d){this._printHandler=d}clearPrintHandler(){this._printHandler=this._printHandlerFb}registerEscHandler(d,a){const h=this._identifier(d,[48,126]);this._escHandlers[h]===void 0&&(this._escHandlers[h]=[]);const p=this._escHandlers[h];return p.push(a),{dispose:()=>{const v=p.indexOf(a);v!==-1&&p.splice(v,1)}}}clearEscHandler(d){this._escHandlers[this._identifier(d,[48,126])]&&delete this._escHandlers[this._identifier(d,[48,126])]}setEscHandlerFallback(d){this._escHandlerFb=d}setExecuteHandler(d,a){this._executeHandlers[d.charCodeAt(0)]=a}clearExecuteHandler(d){this._executeHandlers[d.charCodeAt(0)]&&delete this._executeHandlers[d.charCodeAt(0)]}setExecuteHandlerFallback(d){this._executeHandlerFb=d}registerCsiHandler(d,a){const h=this._identifier(d);this._csiHandlers[h]===void 0&&(this._csiHandlers[h]=[]);const p=this._csiHandlers[h];return p.push(a),{dispose:()=>{const v=p.indexOf(a);v!==-1&&p.splice(v,1)}}}clearCsiHandler(d){this._csiHandlers[this._identifier(d)]&&delete this._csiHandlers[this._identifier(d)]}setCsiHandlerFallback(d){this._csiHandlerFb=d}registerDcsHandler(d,a){return this._dcsParser.registerHandler(this._identifier(d),a)}clearDcsHandler(d){this._dcsParser.clearHandler(this._identifier(d))}setDcsHandlerFallback(d){this._dcsParser.setHandlerFallback(d)}registerOscHandler(d,a){return this._oscParser.registerHandler(d,a)}clearOscHandler(d){this._oscParser.clearHandler(d)}setOscHandlerFallback(d){this._oscParser.setHandlerFallback(d)}setErrorHandler(d){this._errorHandler=d}clearErrorHandler(){this._errorHandler=this._errorHandlerFb}reset(){this.currentState=this.initialState,this._oscParser.reset(),this._dcsParser.reset(),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingCodepoint=0,this._parseStack.state!==0&&(this._parseStack.state=2,this._parseStack.handlers=[])}_preserveStack(d,a,h,p,v){this._parseStack.state=d,this._parseStack.handlers=a,this._parseStack.handlerPos=h,this._parseStack.transition=p,this._parseStack.chunkPos=v}parse(d,a,h){let p,v=0,x=0,E=0;if(this._parseStack.state)if(this._parseStack.state===2)this._parseStack.state=0,E=this._parseStack.chunkPos+1;else{if(h===void 0||this._parseStack.state===1)throw this._parseStack.state=1,new Error("improper continuation due to previous async handler, giving up parsing");const y=this._parseStack.handlers;let k=this._parseStack.handlerPos-1;switch(this._parseStack.state){case 3:if(h===!1&&k>-1){for(;k>=0&&(p=y[k](this._params),p!==!0);k--)if(p instanceof Promise)return this._parseStack.handlerPos=k,p}this._parseStack.handlers=[];break;case 4:if(h===!1&&k>-1){for(;k>=0&&(p=y[k](),p!==!0);k--)if(p instanceof Promise)return this._parseStack.handlerPos=k,p}this._parseStack.handlers=[];break;case 6:if(v=d[this._parseStack.chunkPos],p=this._dcsParser.unhook(v!==24&&v!==26,h),p)return p;v===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0;break;case 5:if(v=d[this._parseStack.chunkPos],p=this._oscParser.end(v!==24&&v!==26,h),p)return p;v===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0}this._parseStack.state=0,E=this._parseStack.chunkPos+1,this.precedingCodepoint=0,this.currentState=15&this._parseStack.transition}for(let y=E;y<a;++y){switch(v=d[y],x=this._transitions.table[this.currentState<<8|(v<160?v:C)],x>>4){case 2:for(let O=y+1;;++O){if(O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}if(++O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}if(++O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}if(++O>=a||(v=d[O])<32||v>126&&v<C){this._printHandler(d,y,O),y=O-1;break}}break;case 3:this._executeHandlers[v]?this._executeHandlers[v]():this._executeHandlerFb(v),this.precedingCodepoint=0;break;case 0:break;case 1:if(this._errorHandler({position:y,code:v,currentState:this.currentState,collect:this._collect,params:this._params,abort:!1}).abort)return;break;case 7:const k=this._csiHandlers[this._collect<<8|v];let T=k?k.length-1:-1;for(;T>=0&&(p=k[T](this._params),p!==!0);T--)if(p instanceof Promise)return this._preserveStack(3,k,T,x,y),p;T<0&&this._csiHandlerFb(this._collect<<8|v,this._params),this.precedingCodepoint=0;break;case 8:do switch(v){case 59:this._params.addParam(0);break;case 58:this._params.addSubParam(-1);break;default:this._params.addDigit(v-48)}while(++y<a&&(v=d[y])>47&&v<60);y--;break;case 9:this._collect<<=8,this._collect|=v;break;case 10:const B=this._escHandlers[this._collect<<8|v];let R=B?B.length-1:-1;for(;R>=0&&(p=B[R](),p!==!0);R--)if(p instanceof Promise)return this._preserveStack(4,B,R,x,y),p;R<0&&this._escHandlerFb(this._collect<<8|v),this.precedingCodepoint=0;break;case 11:this._params.reset(),this._params.addParam(0),this._collect=0;break;case 12:this._dcsParser.hook(this._collect<<8|v,this._params);break;case 13:for(let O=y+1;;++O)if(O>=a||(v=d[O])===24||v===26||v===27||v>127&&v<C){this._dcsParser.put(d,y,O),y=O-1;break}break;case 14:if(p=this._dcsParser.unhook(v!==24&&v!==26),p)return this._preserveStack(6,[],0,x,y),p;v===27&&(x|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingCodepoint=0;break;case 4:this._oscParser.start();break;case 5:for(let O=y+1;;O++)if(O>=a||(v=d[O])<32||v>127&&v<C){this._oscParser.put(d,y,O),y=O-1;break}break;case 6:if(p=this._oscParser.end(v!==24&&v!==26),p)return this._preserveStack(5,[],0,x,y),p;v===27&&(x|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingCodepoint=0}this.currentState=15&x}}}r.EscapeSequenceParser=S},6242:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.OscHandler=r.OscParser=void 0;const u=n(5770),g=n(482),l=[];r.OscParser=class{constructor(){this._state=0,this._active=l,this._id=-1,this._handlers=Object.create(null),this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}registerHandler(f,b){this._handlers[f]===void 0&&(this._handlers[f]=[]);const C=this._handlers[f];return C.push(b),{dispose:()=>{const S=C.indexOf(b);S!==-1&&C.splice(S,1)}}}clearHandler(f){this._handlers[f]&&delete this._handlers[f]}setHandlerFallback(f){this._handlerFb=f}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=l}reset(){if(this._state===2)for(let f=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;f>=0;--f)this._active[f].end(!1);this._stack.paused=!1,this._active=l,this._id=-1,this._state=0}_start(){if(this._active=this._handlers[this._id]||l,this._active.length)for(let f=this._active.length-1;f>=0;f--)this._active[f].start();else this._handlerFb(this._id,"START")}_put(f,b,C){if(this._active.length)for(let S=this._active.length-1;S>=0;S--)this._active[S].put(f,b,C);else this._handlerFb(this._id,"PUT",(0,g.utf32ToString)(f,b,C))}start(){this.reset(),this._state=1}put(f,b,C){if(this._state!==3){if(this._state===1)for(;b<C;){const S=f[b++];if(S===59){this._state=2,this._start();break}if(S<48||57<S)return void(this._state=3);this._id===-1&&(this._id=0),this._id=10*this._id+S-48}this._state===2&&C-b>0&&this._put(f,b,C)}}end(f,b=!0){if(this._state!==0){if(this._state!==3)if(this._state===1&&this._start(),this._active.length){let C=!1,S=this._active.length-1,o=!1;if(this._stack.paused&&(S=this._stack.loopPosition-1,C=b,o=this._stack.fallThrough,this._stack.paused=!1),!o&&C===!1){for(;S>=0&&(C=this._active[S].end(f),C!==!0);S--)if(C instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=S,this._stack.fallThrough=!1,C;S--}for(;S>=0;S--)if(C=this._active[S].end(!1),C instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=S,this._stack.fallThrough=!0,C}else this._handlerFb(this._id,"END",f);this._active=l,this._id=-1,this._state=0}}},r.OscHandler=class{constructor(f){this._handler=f,this._data="",this._hitLimit=!1}start(){this._data="",this._hitLimit=!1}put(f,b,C){this._hitLimit||(this._data+=(0,g.utf32ToString)(f,b,C),this._data.length>u.PAYLOAD_LIMIT&&(this._data="",this._hitLimit=!0))}end(f){let b=!1;if(this._hitLimit)b=!1;else if(f&&(b=this._handler(this._data),b instanceof Promise))return b.then(C=>(this._data="",this._hitLimit=!1,C));return this._data="",this._hitLimit=!1,b}}},8742:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Params=void 0;const n=2147483647;class u{static fromArray(l){const f=new u;if(!l.length)return f;for(let b=Array.isArray(l[0])?1:0;b<l.length;++b){const C=l[b];if(Array.isArray(C))for(let S=0;S<C.length;++S)f.addSubParam(C[S]);else f.addParam(C)}return f}constructor(l=32,f=32){if(this.maxLength=l,this.maxSubParamsLength=f,f>256)throw new Error("maxSubParamsLength must not be greater than 256");this.params=new Int32Array(l),this.length=0,this._subParams=new Int32Array(f),this._subParamsLength=0,this._subParamsIdx=new Uint16Array(l),this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}clone(){const l=new u(this.maxLength,this.maxSubParamsLength);return l.params.set(this.params),l.length=this.length,l._subParams.set(this._subParams),l._subParamsLength=this._subParamsLength,l._subParamsIdx.set(this._subParamsIdx),l._rejectDigits=this._rejectDigits,l._rejectSubDigits=this._rejectSubDigits,l._digitIsSub=this._digitIsSub,l}toArray(){const l=[];for(let f=0;f<this.length;++f){l.push(this.params[f]);const b=this._subParamsIdx[f]>>8,C=255&this._subParamsIdx[f];C-b>0&&l.push(Array.prototype.slice.call(this._subParams,b,C))}return l}reset(){this.length=0,this._subParamsLength=0,this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}addParam(l){if(this._digitIsSub=!1,this.length>=this.maxLength)this._rejectDigits=!0;else{if(l<-1)throw new Error("values lesser than -1 are not allowed");this._subParamsIdx[this.length]=this._subParamsLength<<8|this._subParamsLength,this.params[this.length++]=l>n?n:l}}addSubParam(l){if(this._digitIsSub=!0,this.length)if(this._rejectDigits||this._subParamsLength>=this.maxSubParamsLength)this._rejectSubDigits=!0;else{if(l<-1)throw new Error("values lesser than -1 are not allowed");this._subParams[this._subParamsLength++]=l>n?n:l,this._subParamsIdx[this.length-1]++}}hasSubParams(l){return(255&this._subParamsIdx[l])-(this._subParamsIdx[l]>>8)>0}getSubParams(l){const f=this._subParamsIdx[l]>>8,b=255&this._subParamsIdx[l];return b-f>0?this._subParams.subarray(f,b):null}getSubParamsAll(){const l={};for(let f=0;f<this.length;++f){const b=this._subParamsIdx[f]>>8,C=255&this._subParamsIdx[f];C-b>0&&(l[f]=this._subParams.slice(b,C))}return l}addDigit(l){let f;if(this._rejectDigits||!(f=this._digitIsSub?this._subParamsLength:this.length)||this._digitIsSub&&this._rejectSubDigits)return;const b=this._digitIsSub?this._subParams:this.params,C=b[f-1];b[f-1]=~C?Math.min(10*C+l,n):l}}r.Params=u},5741:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.AddonManager=void 0,r.AddonManager=class{constructor(){this._addons=[]}dispose(){for(let n=this._addons.length-1;n>=0;n--)this._addons[n].instance.dispose()}loadAddon(n,u){const g={instance:u,dispose:u.dispose,isDisposed:!1};this._addons.push(g),u.dispose=()=>this._wrappedAddonDispose(g),u.activate(n)}_wrappedAddonDispose(n){if(n.isDisposed)return;let u=-1;for(let g=0;g<this._addons.length;g++)if(this._addons[g]===n){u=g;break}if(u===-1)throw new Error("Could not dispose an addon that has not been loaded");n.isDisposed=!0,n.dispose.apply(n.instance),this._addons.splice(u,1)}}},8771:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferApiView=void 0;const u=n(3785),g=n(511);r.BufferApiView=class{constructor(l,f){this._buffer=l,this.type=f}init(l){return this._buffer=l,this}get cursorY(){return this._buffer.y}get cursorX(){return this._buffer.x}get viewportY(){return this._buffer.ydisp}get baseY(){return this._buffer.ybase}get length(){return this._buffer.lines.length}getLine(l){const f=this._buffer.lines.get(l);if(f)return new u.BufferLineApiView(f)}getNullCell(){return new g.CellData}}},3785:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferLineApiView=void 0;const u=n(511);r.BufferLineApiView=class{constructor(g){this._line=g}get isWrapped(){return this._line.isWrapped}get length(){return this._line.length}getCell(g,l){if(!(g<0||g>=this._line.length))return l?(this._line.loadCell(g,l),l):this._line.loadCell(g,new u.CellData)}translateToString(g,l,f){return this._line.translateToString(g,l,f)}}},8285:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BufferNamespaceApi=void 0;const u=n(8771),g=n(8460),l=n(844);class f extends l.Disposable{constructor(C){super(),this._core=C,this._onBufferChange=this.register(new g.EventEmitter),this.onBufferChange=this._onBufferChange.event,this._normal=new u.BufferApiView(this._core.buffers.normal,"normal"),this._alternate=new u.BufferApiView(this._core.buffers.alt,"alternate"),this._core.buffers.onBufferActivate(()=>this._onBufferChange.fire(this.active))}get active(){if(this._core.buffers.active===this._core.buffers.normal)return this.normal;if(this._core.buffers.active===this._core.buffers.alt)return this.alternate;throw new Error("Active buffer is neither normal nor alternate")}get normal(){return this._normal.init(this._core.buffers.normal)}get alternate(){return this._alternate.init(this._core.buffers.alt)}}r.BufferNamespaceApi=f},7975:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.ParserApi=void 0,r.ParserApi=class{constructor(n){this._core=n}registerCsiHandler(n,u){return this._core.registerCsiHandler(n,g=>u(g.toArray()))}addCsiHandler(n,u){return this.registerCsiHandler(n,u)}registerDcsHandler(n,u){return this._core.registerDcsHandler(n,(g,l)=>u(g,l.toArray()))}addDcsHandler(n,u){return this.registerDcsHandler(n,u)}registerEscHandler(n,u){return this._core.registerEscHandler(n,u)}addEscHandler(n,u){return this.registerEscHandler(n,u)}registerOscHandler(n,u){return this._core.registerOscHandler(n,u)}addOscHandler(n,u){return this.registerOscHandler(n,u)}}},7090:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.UnicodeApi=void 0,r.UnicodeApi=class{constructor(n){this._core=n}register(n){this._core.unicodeService.register(n)}get versions(){return this._core.unicodeService.versions}get activeVersion(){return this._core.unicodeService.activeVersion}set activeVersion(n){this._core.unicodeService.activeVersion=n}}},744:function(w,r,n){var u=this&&this.__decorate||function(o,d,a,h){var p,v=arguments.length,x=v<3?d:h===null?h=Object.getOwnPropertyDescriptor(d,a):h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(o,d,a,h);else for(var E=o.length-1;E>=0;E--)(p=o[E])&&(x=(v<3?p(x):v>3?p(d,a,x):p(d,a))||x);return v>3&&x&&Object.defineProperty(d,a,x),x},g=this&&this.__param||function(o,d){return function(a,h){d(a,h,o)}};Object.defineProperty(r,"__esModule",{value:!0}),r.BufferService=r.MINIMUM_ROWS=r.MINIMUM_COLS=void 0;const l=n(8460),f=n(844),b=n(5295),C=n(2585);r.MINIMUM_COLS=2,r.MINIMUM_ROWS=1;let S=r.BufferService=class extends f.Disposable{get buffer(){return this.buffers.active}constructor(o){super(),this.isUserScrolling=!1,this._onResize=this.register(new l.EventEmitter),this.onResize=this._onResize.event,this._onScroll=this.register(new l.EventEmitter),this.onScroll=this._onScroll.event,this.cols=Math.max(o.rawOptions.cols||0,r.MINIMUM_COLS),this.rows=Math.max(o.rawOptions.rows||0,r.MINIMUM_ROWS),this.buffers=this.register(new b.BufferSet(o,this))}resize(o,d){this.cols=o,this.rows=d,this.buffers.resize(o,d),this._onResize.fire({cols:o,rows:d})}reset(){this.buffers.reset(),this.isUserScrolling=!1}scroll(o,d=!1){const a=this.buffer;let h;h=this._cachedBlankLine,h&&h.length===this.cols&&h.getFg(0)===o.fg&&h.getBg(0)===o.bg||(h=a.getBlankLine(o,d),this._cachedBlankLine=h),h.isWrapped=d;const p=a.ybase+a.scrollTop,v=a.ybase+a.scrollBottom;if(a.scrollTop===0){const x=a.lines.isFull;v===a.lines.length-1?x?a.lines.recycle().copyFrom(h):a.lines.push(h.clone()):a.lines.splice(v+1,0,h.clone()),x?this.isUserScrolling&&(a.ydisp=Math.max(a.ydisp-1,0)):(a.ybase++,this.isUserScrolling||a.ydisp++)}else{const x=v-p+1;a.lines.shiftElements(p+1,x-1,-1),a.lines.set(v,h.clone())}this.isUserScrolling||(a.ydisp=a.ybase),this._onScroll.fire(a.ydisp)}scrollLines(o,d,a){const h=this.buffer;if(o<0){if(h.ydisp===0)return;this.isUserScrolling=!0}else o+h.ydisp>=h.ybase&&(this.isUserScrolling=!1);const p=h.ydisp;h.ydisp=Math.max(Math.min(h.ydisp+o,h.ybase),0),p!==h.ydisp&&(d||this._onScroll.fire(h.ydisp))}};r.BufferService=S=u([g(0,C.IOptionsService)],S)},7994:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.CharsetService=void 0,r.CharsetService=class{constructor(){this.glevel=0,this._charsets=[]}reset(){this.charset=void 0,this._charsets=[],this.glevel=0}setgLevel(n){this.glevel=n,this.charset=this._charsets[n]}setgCharset(n,u){this._charsets[n]=u,this.glevel===n&&(this.charset=u)}}},1753:function(w,r,n){var u=this&&this.__decorate||function(h,p,v,x){var E,y=arguments.length,k=y<3?p:x===null?x=Object.getOwnPropertyDescriptor(p,v):x;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")k=Reflect.decorate(h,p,v,x);else for(var T=h.length-1;T>=0;T--)(E=h[T])&&(k=(y<3?E(k):y>3?E(p,v,k):E(p,v))||k);return y>3&&k&&Object.defineProperty(p,v,k),k},g=this&&this.__param||function(h,p){return function(v,x){p(v,x,h)}};Object.defineProperty(r,"__esModule",{value:!0}),r.CoreMouseService=void 0;const l=n(2585),f=n(8460),b=n(844),C={NONE:{events:0,restrict:()=>!1},X10:{events:1,restrict:h=>h.button!==4&&h.action===1&&(h.ctrl=!1,h.alt=!1,h.shift=!1,!0)},VT200:{events:19,restrict:h=>h.action!==32},DRAG:{events:23,restrict:h=>h.action!==32||h.button!==3},ANY:{events:31,restrict:h=>!0}};function S(h,p){let v=(h.ctrl?16:0)|(h.shift?4:0)|(h.alt?8:0);return h.button===4?(v|=64,v|=h.action):(v|=3&h.button,4&h.button&&(v|=64),8&h.button&&(v|=128),h.action===32?v|=32:h.action!==0||p||(v|=3)),v}const o=String.fromCharCode,d={DEFAULT:h=>{const p=[S(h,!1)+32,h.col+32,h.row+32];return p[0]>255||p[1]>255||p[2]>255?"":`\x1B[M${o(p[0])}${o(p[1])}${o(p[2])}`},SGR:h=>{const p=h.action===0&&h.button!==4?"m":"M";return`\x1B[<${S(h,!0)};${h.col};${h.row}${p}`},SGR_PIXELS:h=>{const p=h.action===0&&h.button!==4?"m":"M";return`\x1B[<${S(h,!0)};${h.x};${h.y}${p}`}};let a=r.CoreMouseService=class extends b.Disposable{constructor(h,p){super(),this._bufferService=h,this._coreService=p,this._protocols={},this._encodings={},this._activeProtocol="",this._activeEncoding="",this._lastEvent=null,this._onProtocolChange=this.register(new f.EventEmitter),this.onProtocolChange=this._onProtocolChange.event;for(const v of Object.keys(C))this.addProtocol(v,C[v]);for(const v of Object.keys(d))this.addEncoding(v,d[v]);this.reset()}addProtocol(h,p){this._protocols[h]=p}addEncoding(h,p){this._encodings[h]=p}get activeProtocol(){return this._activeProtocol}get areMouseEventsActive(){return this._protocols[this._activeProtocol].events!==0}set activeProtocol(h){if(!this._protocols[h])throw new Error(`unknown protocol "${h}"`);this._activeProtocol=h,this._onProtocolChange.fire(this._protocols[h].events)}get activeEncoding(){return this._activeEncoding}set activeEncoding(h){if(!this._encodings[h])throw new Error(`unknown encoding "${h}"`);this._activeEncoding=h}reset(){this.activeProtocol="NONE",this.activeEncoding="DEFAULT",this._lastEvent=null}triggerMouseEvent(h){if(h.col<0||h.col>=this._bufferService.cols||h.row<0||h.row>=this._bufferService.rows||h.button===4&&h.action===32||h.button===3&&h.action!==32||h.button!==4&&(h.action===2||h.action===3)||(h.col++,h.row++,h.action===32&&this._lastEvent&&this._equalEvents(this._lastEvent,h,this._activeEncoding==="SGR_PIXELS"))||!this._protocols[this._activeProtocol].restrict(h))return!1;const p=this._encodings[this._activeEncoding](h);return p&&(this._activeEncoding==="DEFAULT"?this._coreService.triggerBinaryEvent(p):this._coreService.triggerDataEvent(p,!0)),this._lastEvent=h,!0}explainEvents(h){return{down:!!(1&h),up:!!(2&h),drag:!!(4&h),move:!!(8&h),wheel:!!(16&h)}}_equalEvents(h,p,v){if(v){if(h.x!==p.x||h.y!==p.y)return!1}else if(h.col!==p.col||h.row!==p.row)return!1;return h.button===p.button&&h.action===p.action&&h.ctrl===p.ctrl&&h.alt===p.alt&&h.shift===p.shift}};r.CoreMouseService=a=u([g(0,l.IBufferService),g(1,l.ICoreService)],a)},6975:function(w,r,n){var u=this&&this.__decorate||function(a,h,p,v){var x,E=arguments.length,y=E<3?h:v===null?v=Object.getOwnPropertyDescriptor(h,p):v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")y=Reflect.decorate(a,h,p,v);else for(var k=a.length-1;k>=0;k--)(x=a[k])&&(y=(E<3?x(y):E>3?x(h,p,y):x(h,p))||y);return E>3&&y&&Object.defineProperty(h,p,y),y},g=this&&this.__param||function(a,h){return function(p,v){h(p,v,a)}};Object.defineProperty(r,"__esModule",{value:!0}),r.CoreService=void 0;const l=n(1439),f=n(8460),b=n(844),C=n(2585),S=Object.freeze({insertMode:!1}),o=Object.freeze({applicationCursorKeys:!1,applicationKeypad:!1,bracketedPasteMode:!1,origin:!1,reverseWraparound:!1,sendFocus:!1,wraparound:!0});let d=r.CoreService=class extends b.Disposable{constructor(a,h,p){super(),this._bufferService=a,this._logService=h,this._optionsService=p,this.isCursorInitialized=!1,this.isCursorHidden=!1,this._onData=this.register(new f.EventEmitter),this.onData=this._onData.event,this._onUserInput=this.register(new f.EventEmitter),this.onUserInput=this._onUserInput.event,this._onBinary=this.register(new f.EventEmitter),this.onBinary=this._onBinary.event,this._onRequestScrollToBottom=this.register(new f.EventEmitter),this.onRequestScrollToBottom=this._onRequestScrollToBottom.event,this.modes=(0,l.clone)(S),this.decPrivateModes=(0,l.clone)(o)}reset(){this.modes=(0,l.clone)(S),this.decPrivateModes=(0,l.clone)(o)}triggerDataEvent(a,h=!1){if(this._optionsService.rawOptions.disableStdin)return;const p=this._bufferService.buffer;h&&this._optionsService.rawOptions.scrollOnUserInput&&p.ybase!==p.ydisp&&this._onRequestScrollToBottom.fire(),h&&this._onUserInput.fire(),this._logService.debug(`sending data "${a}"`,()=>a.split("").map(v=>v.charCodeAt(0))),this._onData.fire(a)}triggerBinaryEvent(a){this._optionsService.rawOptions.disableStdin||(this._logService.debug(`sending binary "${a}"`,()=>a.split("").map(h=>h.charCodeAt(0))),this._onBinary.fire(a))}};r.CoreService=d=u([g(0,C.IBufferService),g(1,C.ILogService),g(2,C.IOptionsService)],d)},9074:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.DecorationService=void 0;const u=n(8055),g=n(8460),l=n(844),f=n(6106);let b=0,C=0;class S extends l.Disposable{get decorations(){return this._decorations.values()}constructor(){super(),this._decorations=new f.SortedList(a=>a==null?void 0:a.marker.line),this._onDecorationRegistered=this.register(new g.EventEmitter),this.onDecorationRegistered=this._onDecorationRegistered.event,this._onDecorationRemoved=this.register(new g.EventEmitter),this.onDecorationRemoved=this._onDecorationRemoved.event,this.register((0,l.toDisposable)(()=>this.reset()))}registerDecoration(a){if(a.marker.isDisposed)return;const h=new o(a);if(h){const p=h.marker.onDispose(()=>h.dispose());h.onDispose(()=>{h&&(this._decorations.delete(h)&&this._onDecorationRemoved.fire(h),p.dispose())}),this._decorations.insert(h),this._onDecorationRegistered.fire(h)}return h}reset(){for(const a of this._decorations.values())a.dispose();this._decorations.clear()}*getDecorationsAtCell(a,h,p){var v,x,E;let y=0,k=0;for(const T of this._decorations.getKeyIterator(h))y=(v=T.options.x)!==null&&v!==void 0?v:0,k=y+((x=T.options.width)!==null&&x!==void 0?x:1),a>=y&&a<k&&(!p||((E=T.options.layer)!==null&&E!==void 0?E:"bottom")===p)&&(yield T)}forEachDecorationAtCell(a,h,p,v){this._decorations.forEachByKey(h,x=>{var E,y,k;b=(E=x.options.x)!==null&&E!==void 0?E:0,C=b+((y=x.options.width)!==null&&y!==void 0?y:1),a>=b&&a<C&&(!p||((k=x.options.layer)!==null&&k!==void 0?k:"bottom")===p)&&v(x)})}}r.DecorationService=S;class o extends l.Disposable{get isDisposed(){return this._isDisposed}get backgroundColorRGB(){return this._cachedBg===null&&(this.options.backgroundColor?this._cachedBg=u.css.toColor(this.options.backgroundColor):this._cachedBg=void 0),this._cachedBg}get foregroundColorRGB(){return this._cachedFg===null&&(this.options.foregroundColor?this._cachedFg=u.css.toColor(this.options.foregroundColor):this._cachedFg=void 0),this._cachedFg}constructor(a){super(),this.options=a,this.onRenderEmitter=this.register(new g.EventEmitter),this.onRender=this.onRenderEmitter.event,this._onDispose=this.register(new g.EventEmitter),this.onDispose=this._onDispose.event,this._cachedBg=null,this._cachedFg=null,this.marker=a.marker,this.options.overviewRulerOptions&&!this.options.overviewRulerOptions.position&&(this.options.overviewRulerOptions.position="full")}dispose(){this._onDispose.fire(),super.dispose()}}},4348:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.InstantiationService=r.ServiceCollection=void 0;const u=n(2585),g=n(8343);class l{constructor(...b){this._entries=new Map;for(const[C,S]of b)this.set(C,S)}set(b,C){const S=this._entries.get(b);return this._entries.set(b,C),S}forEach(b){for(const[C,S]of this._entries.entries())b(C,S)}has(b){return this._entries.has(b)}get(b){return this._entries.get(b)}}r.ServiceCollection=l,r.InstantiationService=class{constructor(){this._services=new l,this._services.set(u.IInstantiationService,this)}setService(f,b){this._services.set(f,b)}getService(f){return this._services.get(f)}createInstance(f,...b){const C=(0,g.getServiceDependencies)(f).sort((d,a)=>d.index-a.index),S=[];for(const d of C){const a=this._services.get(d.id);if(!a)throw new Error(`[createInstance] ${f.name} depends on UNKNOWN service ${d.id}.`);S.push(a)}const o=C.length>0?C[0].index:b.length;if(b.length!==o)throw new Error(`[createInstance] First service dependency of ${f.name} at position ${o+1} conflicts with ${b.length} static arguments`);return new f(...b,...S)}}},7866:function(w,r,n){var u=this&&this.__decorate||function(o,d,a,h){var p,v=arguments.length,x=v<3?d:h===null?h=Object.getOwnPropertyDescriptor(d,a):h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")x=Reflect.decorate(o,d,a,h);else for(var E=o.length-1;E>=0;E--)(p=o[E])&&(x=(v<3?p(x):v>3?p(d,a,x):p(d,a))||x);return v>3&&x&&Object.defineProperty(d,a,x),x},g=this&&this.__param||function(o,d){return function(a,h){d(a,h,o)}};Object.defineProperty(r,"__esModule",{value:!0}),r.traceCall=r.setTraceLogger=r.LogService=void 0;const l=n(844),f=n(2585),b={trace:f.LogLevelEnum.TRACE,debug:f.LogLevelEnum.DEBUG,info:f.LogLevelEnum.INFO,warn:f.LogLevelEnum.WARN,error:f.LogLevelEnum.ERROR,off:f.LogLevelEnum.OFF};let C,S=r.LogService=class extends l.Disposable{get logLevel(){return this._logLevel}constructor(o){super(),this._optionsService=o,this._logLevel=f.LogLevelEnum.OFF,this._updateLogLevel(),this.register(this._optionsService.onSpecificOptionChange("logLevel",()=>this._updateLogLevel())),C=this}_updateLogLevel(){this._logLevel=b[this._optionsService.rawOptions.logLevel]}_evalLazyOptionalParams(o){for(let d=0;d<o.length;d++)typeof o[d]=="function"&&(o[d]=o[d]())}_log(o,d,a){this._evalLazyOptionalParams(a),o.call(console,(this._optionsService.options.logger?"":"xterm.js: ")+d,...a)}trace(o,...d){var a,h;this._logLevel<=f.LogLevelEnum.TRACE&&this._log((h=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.trace.bind(this._optionsService.options.logger))!==null&&h!==void 0?h:console.log,o,d)}debug(o,...d){var a,h;this._logLevel<=f.LogLevelEnum.DEBUG&&this._log((h=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.debug.bind(this._optionsService.options.logger))!==null&&h!==void 0?h:console.log,o,d)}info(o,...d){var a,h;this._logLevel<=f.LogLevelEnum.INFO&&this._log((h=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.info.bind(this._optionsService.options.logger))!==null&&h!==void 0?h:console.info,o,d)}warn(o,...d){var a,h;this._logLevel<=f.LogLevelEnum.WARN&&this._log((h=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.warn.bind(this._optionsService.options.logger))!==null&&h!==void 0?h:console.warn,o,d)}error(o,...d){var a,h;this._logLevel<=f.LogLevelEnum.ERROR&&this._log((h=(a=this._optionsService.options.logger)===null||a===void 0?void 0:a.error.bind(this._optionsService.options.logger))!==null&&h!==void 0?h:console.error,o,d)}};r.LogService=S=u([g(0,f.IOptionsService)],S),r.setTraceLogger=function(o){C=o},r.traceCall=function(o,d,a){if(typeof a.value!="function")throw new Error("not supported");const h=a.value;a.value=function(...p){if(C.logLevel!==f.LogLevelEnum.TRACE)return h.apply(this,p);C.trace(`GlyphRenderer#${h.name}(${p.map(x=>JSON.stringify(x)).join(", ")})`);const v=h.apply(this,p);return C.trace(`GlyphRenderer#${h.name} return`,v),v}}},7302:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.OptionsService=r.DEFAULT_OPTIONS=void 0;const u=n(8460),g=n(844),l=n(6114);r.DEFAULT_OPTIONS={cols:80,rows:24,cursorBlink:!1,cursorStyle:"block",cursorWidth:1,cursorInactiveStyle:"outline",customGlyphs:!0,drawBoldTextInBrightColors:!0,fastScrollModifier:"alt",fastScrollSensitivity:5,fontFamily:"courier-new, courier, monospace",fontSize:15,fontWeight:"normal",fontWeightBold:"bold",ignoreBracketedPasteMode:!1,lineHeight:1,letterSpacing:0,linkHandler:null,logLevel:"info",logger:null,scrollback:1e3,scrollOnUserInput:!0,scrollSensitivity:1,screenReaderMode:!1,smoothScrollDuration:0,macOptionIsMeta:!1,macOptionClickForcesSelection:!1,minimumContrastRatio:1,disableStdin:!1,allowProposedApi:!1,allowTransparency:!1,tabStopWidth:8,theme:{},rightClickSelectsWord:l.isMac,windowOptions:{},windowsMode:!1,windowsPty:{},wordSeparator:" ()[]{}',\"`",altClickMovesCursor:!0,convertEol:!1,termName:"xterm",cancelEvents:!1,overviewRulerWidth:0};const f=["normal","bold","100","200","300","400","500","600","700","800","900"];class b extends g.Disposable{constructor(S){super(),this._onOptionChange=this.register(new u.EventEmitter),this.onOptionChange=this._onOptionChange.event;const o=Object.assign({},r.DEFAULT_OPTIONS);for(const d in S)if(d in o)try{const a=S[d];o[d]=this._sanitizeAndValidateOption(d,a)}catch(a){console.error(a)}this.rawOptions=o,this.options=Object.assign({},o),this._setupOptions()}onSpecificOptionChange(S,o){return this.onOptionChange(d=>{d===S&&o(this.rawOptions[S])})}onMultipleOptionChange(S,o){return this.onOptionChange(d=>{S.indexOf(d)!==-1&&o()})}_setupOptions(){const S=d=>{if(!(d in r.DEFAULT_OPTIONS))throw new Error(`No option with key "${d}"`);return this.rawOptions[d]},o=(d,a)=>{if(!(d in r.DEFAULT_OPTIONS))throw new Error(`No option with key "${d}"`);a=this._sanitizeAndValidateOption(d,a),this.rawOptions[d]!==a&&(this.rawOptions[d]=a,this._onOptionChange.fire(d))};for(const d in this.rawOptions){const a={get:S.bind(this,d),set:o.bind(this,d)};Object.defineProperty(this.options,d,a)}}_sanitizeAndValidateOption(S,o){switch(S){case"cursorStyle":if(o||(o=r.DEFAULT_OPTIONS[S]),!function(d){return d==="block"||d==="underline"||d==="bar"}(o))throw new Error(`"${o}" is not a valid value for ${S}`);break;case"wordSeparator":o||(o=r.DEFAULT_OPTIONS[S]);break;case"fontWeight":case"fontWeightBold":if(typeof o=="number"&&1<=o&&o<=1e3)break;o=f.includes(o)?o:r.DEFAULT_OPTIONS[S];break;case"cursorWidth":o=Math.floor(o);case"lineHeight":case"tabStopWidth":if(o<1)throw new Error(`${S} cannot be less than 1, value: ${o}`);break;case"minimumContrastRatio":o=Math.max(1,Math.min(21,Math.round(10*o)/10));break;case"scrollback":if((o=Math.min(o,4294967295))<0)throw new Error(`${S} cannot be less than 0, value: ${o}`);break;case"fastScrollSensitivity":case"scrollSensitivity":if(o<=0)throw new Error(`${S} cannot be less than or equal to 0, value: ${o}`);break;case"rows":case"cols":if(!o&&o!==0)throw new Error(`${S} must be numeric, value: ${o}`);break;case"windowsPty":o=o!=null?o:{}}return o}}r.OptionsService=b},2660:function(w,r,n){var u=this&&this.__decorate||function(b,C,S,o){var d,a=arguments.length,h=a<3?C:o===null?o=Object.getOwnPropertyDescriptor(C,S):o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")h=Reflect.decorate(b,C,S,o);else for(var p=b.length-1;p>=0;p--)(d=b[p])&&(h=(a<3?d(h):a>3?d(C,S,h):d(C,S))||h);return a>3&&h&&Object.defineProperty(C,S,h),h},g=this&&this.__param||function(b,C){return function(S,o){C(S,o,b)}};Object.defineProperty(r,"__esModule",{value:!0}),r.OscLinkService=void 0;const l=n(2585);let f=r.OscLinkService=class{constructor(b){this._bufferService=b,this._nextId=1,this._entriesWithId=new Map,this._dataByLinkId=new Map}registerLink(b){const C=this._bufferService.buffer;if(b.id===void 0){const p=C.addMarker(C.ybase+C.y),v={data:b,id:this._nextId++,lines:[p]};return p.onDispose(()=>this._removeMarkerFromLink(v,p)),this._dataByLinkId.set(v.id,v),v.id}const S=b,o=this._getEntryIdKey(S),d=this._entriesWithId.get(o);if(d)return this.addLineToLink(d.id,C.ybase+C.y),d.id;const a=C.addMarker(C.ybase+C.y),h={id:this._nextId++,key:this._getEntryIdKey(S),data:S,lines:[a]};return a.onDispose(()=>this._removeMarkerFromLink(h,a)),this._entriesWithId.set(h.key,h),this._dataByLinkId.set(h.id,h),h.id}addLineToLink(b,C){const S=this._dataByLinkId.get(b);if(S&&S.lines.every(o=>o.line!==C)){const o=this._bufferService.buffer.addMarker(C);S.lines.push(o),o.onDispose(()=>this._removeMarkerFromLink(S,o))}}getLinkData(b){var C;return(C=this._dataByLinkId.get(b))===null||C===void 0?void 0:C.data}_getEntryIdKey(b){return`${b.id};;${b.uri}`}_removeMarkerFromLink(b,C){const S=b.lines.indexOf(C);S!==-1&&(b.lines.splice(S,1),b.lines.length===0&&(b.data.id!==void 0&&this._entriesWithId.delete(b.key),this._dataByLinkId.delete(b.id)))}};r.OscLinkService=f=u([g(0,l.IBufferService)],f)},8343:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.createDecorator=r.getServiceDependencies=r.serviceRegistry=void 0;const n="di$target",u="di$dependencies";r.serviceRegistry=new Map,r.getServiceDependencies=function(g){return g[u]||[]},r.createDecorator=function(g){if(r.serviceRegistry.has(g))return r.serviceRegistry.get(g);const l=function(f,b,C){if(arguments.length!==3)throw new Error("@IServiceName-decorator can only be used to decorate a parameter");(function(S,o,d){o[n]===o?o[u].push({id:S,index:d}):(o[u]=[{id:S,index:d}],o[n]=o)})(l,f,C)};return l.toString=()=>g,r.serviceRegistry.set(g,l),l}},2585:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.IDecorationService=r.IUnicodeService=r.IOscLinkService=r.IOptionsService=r.ILogService=r.LogLevelEnum=r.IInstantiationService=r.ICharsetService=r.ICoreService=r.ICoreMouseService=r.IBufferService=void 0;const u=n(8343);var g;r.IBufferService=(0,u.createDecorator)("BufferService"),r.ICoreMouseService=(0,u.createDecorator)("CoreMouseService"),r.ICoreService=(0,u.createDecorator)("CoreService"),r.ICharsetService=(0,u.createDecorator)("CharsetService"),r.IInstantiationService=(0,u.createDecorator)("InstantiationService"),function(l){l[l.TRACE=0]="TRACE",l[l.DEBUG=1]="DEBUG",l[l.INFO=2]="INFO",l[l.WARN=3]="WARN",l[l.ERROR=4]="ERROR",l[l.OFF=5]="OFF"}(g||(r.LogLevelEnum=g={})),r.ILogService=(0,u.createDecorator)("LogService"),r.IOptionsService=(0,u.createDecorator)("OptionsService"),r.IOscLinkService=(0,u.createDecorator)("OscLinkService"),r.IUnicodeService=(0,u.createDecorator)("UnicodeService"),r.IDecorationService=(0,u.createDecorator)("DecorationService")},1480:(w,r,n)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.UnicodeService=void 0;const u=n(8460),g=n(225);r.UnicodeService=class{constructor(){this._providers=Object.create(null),this._active="",this._onChange=new u.EventEmitter,this.onChange=this._onChange.event;const l=new g.UnicodeV6;this.register(l),this._active=l.version,this._activeProvider=l}dispose(){this._onChange.dispose()}get versions(){return Object.keys(this._providers)}get activeVersion(){return this._active}set activeVersion(l){if(!this._providers[l])throw new Error(`unknown Unicode version "${l}"`);this._active=l,this._activeProvider=this._providers[l],this._onChange.fire(l)}register(l){this._providers[l.version]=l}wcwidth(l){return this._activeProvider.wcwidth(l)}getStringCellWidth(l){let f=0;const b=l.length;for(let C=0;C<b;++C){let S=l.charCodeAt(C);if(55296<=S&&S<=56319){if(++C>=b)return f+this.wcwidth(S);const o=l.charCodeAt(C);56320<=o&&o<=57343?S=1024*(S-55296)+o-56320+65536:f+=this.wcwidth(o)}f+=this.wcwidth(S)}return f}}}},s={};function c(w){var r=s[w];if(r!==void 0)return r.exports;var n=s[w]={exports:{}};return i[w].call(n.exports,n,n.exports,c),n.exports}var m={};return(()=>{var w=m;Object.defineProperty(w,"__esModule",{value:!0}),w.Terminal=void 0;const r=c(9042),n=c(3236),u=c(844),g=c(5741),l=c(8285),f=c(7975),b=c(7090),C=["cols","rows"];class S extends u.Disposable{constructor(d){super(),this._core=this.register(new n.Terminal(d)),this._addonManager=this.register(new g.AddonManager),this._publicOptions=Object.assign({},this._core.options);const a=p=>this._core.options[p],h=(p,v)=>{this._checkReadonlyOptions(p),this._core.options[p]=v};for(const p in this._core.options){const v={get:a.bind(this,p),set:h.bind(this,p)};Object.defineProperty(this._publicOptions,p,v)}}_checkReadonlyOptions(d){if(C.includes(d))throw new Error(`Option "${d}" can only be set in the constructor`)}_checkProposedApi(){if(!this._core.optionsService.rawOptions.allowProposedApi)throw new Error("You must set the allowProposedApi option to true to use proposed API")}get onBell(){return this._core.onBell}get onBinary(){return this._core.onBinary}get onCursorMove(){return this._core.onCursorMove}get onData(){return this._core.onData}get onKey(){return this._core.onKey}get onLineFeed(){return this._core.onLineFeed}get onRender(){return this._core.onRender}get onResize(){return this._core.onResize}get onScroll(){return this._core.onScroll}get onSelectionChange(){return this._core.onSelectionChange}get onTitleChange(){return this._core.onTitleChange}get onWriteParsed(){return this._core.onWriteParsed}get element(){return this._core.element}get parser(){return this._parser||(this._parser=new f.ParserApi(this._core)),this._parser}get unicode(){return this._checkProposedApi(),new b.UnicodeApi(this._core)}get textarea(){return this._core.textarea}get rows(){return this._core.rows}get cols(){return this._core.cols}get buffer(){return this._buffer||(this._buffer=this.register(new l.BufferNamespaceApi(this._core))),this._buffer}get markers(){return this._checkProposedApi(),this._core.markers}get modes(){const d=this._core.coreService.decPrivateModes;let a="none";switch(this._core.coreMouseService.activeProtocol){case"X10":a="x10";break;case"VT200":a="vt200";break;case"DRAG":a="drag";break;case"ANY":a="any"}return{applicationCursorKeysMode:d.applicationCursorKeys,applicationKeypadMode:d.applicationKeypad,bracketedPasteMode:d.bracketedPasteMode,insertMode:this._core.coreService.modes.insertMode,mouseTrackingMode:a,originMode:d.origin,reverseWraparoundMode:d.reverseWraparound,sendFocusMode:d.sendFocus,wraparoundMode:d.wraparound}}get options(){return this._publicOptions}set options(d){for(const a in d)this._publicOptions[a]=d[a]}blur(){this._core.blur()}focus(){this._core.focus()}resize(d,a){this._verifyIntegers(d,a),this._core.resize(d,a)}open(d){this._core.open(d)}attachCustomKeyEventHandler(d){this._core.attachCustomKeyEventHandler(d)}registerLinkProvider(d){return this._core.registerLinkProvider(d)}registerCharacterJoiner(d){return this._checkProposedApi(),this._core.registerCharacterJoiner(d)}deregisterCharacterJoiner(d){this._checkProposedApi(),this._core.deregisterCharacterJoiner(d)}registerMarker(d=0){return this._verifyIntegers(d),this._core.registerMarker(d)}registerDecoration(d){var a,h,p;return this._checkProposedApi(),this._verifyPositiveIntegers((a=d.x)!==null&&a!==void 0?a:0,(h=d.width)!==null&&h!==void 0?h:0,(p=d.height)!==null&&p!==void 0?p:0),this._core.registerDecoration(d)}hasSelection(){return this._core.hasSelection()}select(d,a,h){this._verifyIntegers(d,a,h),this._core.select(d,a,h)}getSelection(){return this._core.getSelection()}getSelectionPosition(){return this._core.getSelectionPosition()}clearSelection(){this._core.clearSelection()}selectAll(){this._core.selectAll()}selectLines(d,a){this._verifyIntegers(d,a),this._core.selectLines(d,a)}dispose(){super.dispose()}scrollLines(d){this._verifyIntegers(d),this._core.scrollLines(d)}scrollPages(d){this._verifyIntegers(d),this._core.scrollPages(d)}scrollToTop(){this._core.scrollToTop()}scrollToBottom(){this._core.scrollToBottom()}scrollToLine(d){this._verifyIntegers(d),this._core.scrollToLine(d)}clear(){this._core.clear()}write(d,a){this._core.write(d,a)}writeln(d,a){this._core.write(d),this._core.write(`\r
`,a)}paste(d){this._core.paste(d)}refresh(d,a){this._verifyIntegers(d,a),this._core.refresh(d,a)}reset(){this._core.reset()}clearTextureAtlas(){this._core.clearTextureAtlas()}loadAddon(d){this._addonManager.loadAddon(this,d)}static get strings(){return r}_verifyIntegers(...d){for(const a of d)if(a===1/0||isNaN(a)||a%1!=0)throw new Error("This API only accepts integers")}_verifyPositiveIntegers(...d){for(const a of d)if(a&&(a===1/0||isNaN(a)||a%1!=0||a<0))throw new Error("This API only accepts positive integers")}}w.Terminal=S})(),m})())})(Co);var ko={exports:{}};(function(e,t){(function(i,s){e.exports=s()})(self,function(){return(()=>{var i={6:(w,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.LinkComputer=r.WebLinkProvider=void 0,r.WebLinkProvider=class{constructor(u,g,l,f={}){this._terminal=u,this._regex=g,this._handler=l,this._options=f}provideLinks(u,g){const l=n.computeLink(u,this._regex,this._terminal,this._handler);g(this._addCallbacks(l))}_addCallbacks(u){return u.map(g=>(g.leave=this._options.leave,g.hover=(l,f)=>{if(this._options.hover){const{range:b}=g;this._options.hover(l,f,b)}},g))}};class n{static computeLink(g,l,f,b){const C=new RegExp(l.source,(l.flags||"")+"g"),[S,o]=n._getWindowedLineStrings(g-1,f),d=S.join("");let a;const h=[];for(;a=C.exec(d);){const p=a[0];try{const T=new URL(p),B=decodeURI(T.toString());if(p!==B&&p+"/"!==B)continue}catch{continue}const[v,x]=n._mapStrIdx(f,o,0,a.index),[E,y]=n._mapStrIdx(f,v,x,p.length);if(v===-1||x===-1||E===-1||y===-1)continue;const k={start:{x:x+1,y:v+1},end:{x:y,y:E+1}};h.push({range:k,text:p,activate:b})}return h}static _getWindowedLineStrings(g,l){let f,b=g,C=g,S=0,o="";const d=[];if(f=l.buffer.active.getLine(g)){const a=f.translateToString(!0);if(f.isWrapped&&a[0]!==" "){for(S=0;(f=l.buffer.active.getLine(--b))&&S<2048&&(o=f.translateToString(!0),S+=o.length,d.push(o),f.isWrapped&&o.indexOf(" ")===-1););d.reverse()}for(d.push(a),S=0;(f=l.buffer.active.getLine(++C))&&f.isWrapped&&S<2048&&(o=f.translateToString(!0),S+=o.length,d.push(o),o.indexOf(" ")===-1););}return[d,b]}static _mapStrIdx(g,l,f,b){const C=g.buffer.active,S=C.getNullCell();let o=f;for(;b;){const d=C.getLine(l);if(!d)return[-1,-1];for(let a=o;a<d.length;++a){d.getCell(a,S);const h=S.getChars();if(S.getWidth()&&(b-=h.length||1,a===d.length-1&&h==="")){const p=C.getLine(l+1);p&&p.isWrapped&&(p.getCell(0,S),S.getWidth()===2&&(b+=1))}if(b<0)return[l,a]}l++,o=0}return[l,o]}}r.LinkComputer=n}},s={};function c(w){var r=s[w];if(r!==void 0)return r.exports;var n=s[w]={exports:{}};return i[w](n,n.exports,c),n.exports}var m={};return(()=>{var w=m;Object.defineProperty(w,"__esModule",{value:!0}),w.WebLinksAddon=void 0;const r=c(6),n=/https?:[/]{2}[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>]/;function u(g,l){const f=window.open();if(f){try{f.opener=null}catch{}f.location.href=l}else console.warn("Opening link blocked as opener could not be cleared")}w.WebLinksAddon=class{constructor(g=u,l={}){this._handler=g,this._options=l}activate(g){this._terminal=g;const l=this._options,f=l.urlRegex||n;this._linkProvider=this._terminal.registerLinkProvider(new r.WebLinkProvider(this._terminal,f,this._handler,l))}dispose(){var g;(g=this._linkProvider)===null||g===void 0||g.dispose()}}})(),m})()})})(ko);class vn extends Co.exports.Terminal{constructor(i,s,c){super(i);de(this,"fitAddon");de(this,"device");this.fitAddon=s,this.loadAddon(this.fitAddon),this.loadAddon(new ko.exports.WebLinksAddon),this.device=c,this.onData(async m=>{try{await this.device.writeDevice(m),console.log("Data sent to device:",m)}catch(w){console.error("Error writing to device:",w)}})}async initialize(){const i=document.getElementById("terminal");i&&(i.style.height="240px",this.open(i),this.fitAddon.fit()),window.addEventListener("resize",()=>{this.fitAddon.fit()}),document.getElementById("download").addEventListener("click",()=>{this.downloadContents()}),document.getElementById("clear").addEventListener("click",()=>{this.clear()})}downloadContents(){if(this.rows===0){console.log("No output yet");return}this.selectAll();const i=this.getSelection();this.clearSelection();const s=URL.createObjectURL(new Blob([i],{type:"text/plain"})),c=document.createElement("a");c.download=`terminal_content_${new Date().getTime()}.txt`,c.href=s,c.click()}logToTerminal(i,s="info"){s==="error"?this.write(`\x1B[31m${i}\x1B[0m\r
`):this.write(`\x1B[32m${i}\x1B[0m\r
`)}}var Eo={exports:{}};(function(e,t){(function(i,s){e.exports=s()})(self,function(){return(()=>{var i={};return(()=>{var s=i;Object.defineProperty(s,"__esModule",{value:!0}),s.FitAddon=void 0,s.FitAddon=class{constructor(){}activate(c){this._terminal=c}dispose(){}fit(){const c=this.proposeDimensions();if(!c||!this._terminal||isNaN(c.cols)||isNaN(c.rows))return;const m=this._terminal._core;this._terminal.rows===c.rows&&this._terminal.cols===c.cols||(m._renderService.clear(),this._terminal.resize(c.cols,c.rows))}proposeDimensions(){if(!this._terminal||!this._terminal.element||!this._terminal.element.parentElement)return;const c=this._terminal._core,m=c._renderService.dimensions;if(m.css.cell.width===0||m.css.cell.height===0)return;const w=this._terminal.options.scrollback===0?0:c.viewport.scrollBarWidth,r=window.getComputedStyle(this._terminal.element.parentElement),n=parseInt(r.getPropertyValue("height")),u=Math.max(0,parseInt(r.getPropertyValue("width"))),g=window.getComputedStyle(this._terminal.element),l=n-(parseInt(g.getPropertyValue("padding-top"))+parseInt(g.getPropertyValue("padding-bottom"))),f=u-(parseInt(g.getPropertyValue("padding-right"))+parseInt(g.getPropertyValue("padding-left")))-w;return{cols:Math.max(2,Math.floor(f/m.css.cell.width)),rows:Math.max(1,Math.floor(l/m.css.cell.height))}}}})(),i})()})})(Eo);const _n=new TextEncoder;new TextDecoder;const qi=1e4;function Yt(e){console.log(e)}const ps=class{constructor(t=null){de(this,"connectButton");de(this,"serialPort");de(this,"serialReader",null);de(this,"serialWriter",null);de(this,"reading",!1);de(this,"backgroundLoopRunning",!1);de(this,"receiveBuffer","");de(this,"lastTrimLogAt",null);de(this,"receiveBufferTrimmed",!1);de(this,"waiters",[]);de(this,"terminalOutputCallback",null);de(this,"isTerminalOutput",!1);de(this,"leftoverData","");de(this,"replStatus",null);de(this,"onDisconnect",t=>{Yt("\u30C7\u30D0\u30A4\u30B9\u5207\u65AD\u691C\u51FA"),this.cleanup()});this.terminalOutputCallback=t}consumeTrimFlag(){const t=this.receiveBufferTrimmed;return this.receiveBufferTrimmed=!1,t}async initialize(){this.connectButton=document.getElementById("connect"),this.connectButton&&(this.connectButton.disabled=!1,this.connectButton.addEventListener("click",async()=>{this.serialPort?await this.disconnect():await this.connect()}))}setUiDisconnected(){this.serialPort=void 0,console.log("<DISCONNECTED>"),this.connectButton&&(this.connectButton.textContent="\u305B\u3064\u305E\u304F",this.connectButton.classList.add("button-default")),document.dispatchEvent(new CustomEvent(ps.EVENT_DISCONNECTED))}async cleanup(){var t,i;try{await this.stopReadLoop()}catch{}try{this.serialPort&&((i=(t=this.serialPort).removeEventListener)==null||i.call(t,"disconnect",this.onDisconnect),await this.serialPort.close())}catch(s){console.error(`\u30AF\u30ED\u30FC\u30BA\u6642\u30A8\u30E9\u30FC: ${s}`)}finally{this.serialPort=void 0,this.setUiDisconnected()}}async disconnect(){await this.cleanup(),Yt("\u624B\u52D5\u3067\u5207\u65AD\u3057\u307E\u3057\u305F")}async disconnectFromPort(){console.log("Disconnecting from port...");const t=this.serialPort;this.serialPort=void 0;try{if(this.serialReader&&(await this.serialReader.cancel(),this.serialReader.releaseLock(),this.serialReader=null),this.serialWriter){try{this.serialWriter.releaseLock()}catch{}this.serialWriter=null}t&&await t.close()}catch(i){console.error(i)}this.setUiDisconnected()}async connect(){var t;this.reading=!1,this.isTerminalOutput=!1,this.leftoverData="",this.replStatus=null;try{const i=await navigator.serial.requestPort();this.serialPort=i;const s=115200;await i.open({baudRate:s}),await new Promise(c=>setTimeout(c,300)),console.log("<CONNECTED>",i),this.isTerminalOutput=!0;try{if(i.setSignals)try{console.log("[INFO] ESP32: sending reset signals (RTS/DTR)"),await i.setSignals({dataTerminalReady:!1,requestToSend:!0}),await new Promise(c=>setTimeout(c,100)),await i.setSignals({dataTerminalReady:!0,requestToSend:!1}),await new Promise(c=>setTimeout(c,500)),console.log("[INFO] Reset signals sent")}catch(c){console.warn("[WARN] setSignals failed or not supported:",c)}console.log("[INFO] Sending multiple CTRL-C to enter REPL");try{for(let c=0;c<3;c++)await this.sendControl(3),await new Promise(m=>setTimeout(m,100));console.log("[INFO] CTRL-C sequence sent")}catch(c){console.warn("[WARN] Failed to send CTRL-C sequence:",c)}this.startReadLoop(!1,void 0);try{const c=this.startReadLoop(">>>",void 0,{maxSize:512});await Promise.race([c,new Promise((m,w)=>setTimeout(()=>w(new Error("REPL wait timeout")),5e3))]),console.log("[SUCCESS] REPL prompt detected")}catch(c){console.warn("[WARN] REPL prompt not detected within timeout:",c)}}catch(c){console.error("[ERROR] REPL initialization sequence failed:",c)}(t=i.addEventListener)==null||t.call(i,"disconnect",this.onDisconnect),this.connectButton&&(this.connectButton.textContent="\u305B\u3064\u3060\u3093",this.connectButton.classList.remove("button-default")),document.dispatchEvent(new CustomEvent(ps.EVENT_CONNECTED))}catch(i){i instanceof Error&&console.error(`<ERROR: ${i.message}>`),this.setUiDisconnected()}}async stopReadLoop(){if(this.reading=!1,this.serialReader){try{await this.serialReader.cancel()}catch{}try{this.serialReader.releaseLock()}catch{}this.serialReader=null}}async resetReader(){await this.stopReadLoop(),console.log("stopReadLoop called")}async streamRead(){const t=this.serialReader;if(!t)throw new Error("Reader is not available.");const{value:i,done:s}=await t.read();return{value:i,done:s}}updateStatus(t){this.replStatus!==t&&(this.replStatus=t,console.log(`Status changed to: ${t}`),document.dispatchEvent(new CustomEvent("REPL_STATUS_CHANGED",{detail:{status:t}})))}getStatus(){return this.replStatus}setTerminalOutputEnabled(t){this.isTerminalOutput=t}async send(t){var i;if(!((i=this.serialPort)!=null&&i.writable)){Yt("\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093\uFF08\u672A\u63A5\u7D9A\uFF09");return}try{const s=this.serialPort.writable.getWriter(),c=_n.encode(t);await s.write(c);try{s.releaseLock()}catch{}Yt(`TX(${c.length}B): ${JSON.stringify(t)}`)}catch(s){console.error(`\u9001\u4FE1\u30A8\u30E9\u30FC: ${s}`)}}async sendControl(t){var i;if(!((i=this.serialPort)!=null&&i.writable)){Yt("\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093\uFF08\u672A\u63A5\u7D9A\uFF09");return}try{const s=this.serialPort.writable.getWriter(),c=new Uint8Array([t]);await s.write(c);try{s.releaseLock()}catch{}Yt(`TX control: 0x${t.toString(16).padStart(2,"0")}`)}catch(s){console.error(`\u9001\u4FE1\u30A8\u30E9\u30FC: ${s}`)}}async startReadLoop(t=!1,i,s){return i&&(console.log("Ctrl \u9001\u4FE1",i),await this.sendControl(i)),this.backgroundLoopRunning||this.startBackgroundLoop().catch(c=>console.error("Background loop error:",c)),t===!1?"":await new Promise((c,m)=>{var r;const w=(r=s==null?void 0:s.maxSize)!=null?r:qi;this.waiters.push({target:t,resolve:c,reject:m,maxSize:w})})}async startBackgroundLoop(){var t;if(!this.backgroundLoopRunning){if(!((t=this.serialPort)!=null&&t.readable)){console.error("serialPort.readable is not available for background loop");return}this.serialReader||(this.serialReader=this.serialPort.readable.getReader()),this.backgroundLoopRunning=!0,this.reading=!0,console.log("\u53D7\u4FE1\u30D0\u30C3\u30AF\u30B0\u30E9\u30A6\u30F3\u30C9\u30EB\u30FC\u30D7\u958B\u59CB",this.isTerminalOutput);try{for(;this.reading;){const{value:i,done:s}=await this.streamRead();if(s){console.log("Stream closed",this.isTerminalOutput);break}if(!i)continue;const c=new TextDecoder("utf-8").decode(i);if(this.waiters.length>0?this.receiveBuffer+=c:this.receiveBuffer=(this.receiveBuffer+c).slice(-512),this.receiveBuffer.slice(-6).includes(">>>")?this.updateStatus("REPL"):this.updateStatus("RUNNING"),this.isTerminalOutput&&this.terminalOutputCallback){const n=c.replace(/[^\x20-\x7E\u3000-\u9FFF\uFF00-\uFFEF\r\n]/g,"");this.terminalOutputCallback(n)}let w=!0;for(;w;){w=!1;let n=-1,u=-1;for(let g=0;g<this.waiters.length;g++){const l=this.waiters[g],f=this.receiveBuffer.indexOf(l.target);f>=0&&(n===-1||f<n)&&(n=f,u=g)}if(u>=0){const g=this.waiters.splice(u,1)[0],l=n,f=this.receiveBuffer.slice(0,l),b=this.receiveBuffer.slice(l+g.target.length);this.receiveBuffer="",this.leftoverData=b;try{g.resolve(f)}catch(C){g.reject(C)}w=!0}}let r=qi;if(this.waiters.length>0&&(r=this.waiters.reduce((n,u)=>{var g;return Math.max(n,(g=u.maxSize)!=null?g:qi)},qi)),this.receiveBuffer.length>r){this.receiveBufferTrimmed=!0,this.receiveBuffer=this.receiveBuffer.slice(this.receiveBuffer.length-r);const n=Date.now();(!this.lastTrimLogAt||n-this.lastTrimLogAt>5e3)&&(this.lastTrimLogAt=n,console.warn("Receive buffer exceeded maximum limit. Trimming..."))}}}catch(i){console.error("Error processing reader data in background loop:",i)}finally{for(this.backgroundLoopRunning=!1,this.reading=!1;this.waiters.length;)this.waiters.shift().reject(new Error("Background loop terminated before target found"));try{if(this.serialReader){try{await this.serialReader.cancel()}catch{}try{this.serialReader.releaseLock()}catch{}this.serialReader=null}}catch(i){console.error("Error cleaning up reader:",i)}}}}};let Pt=ps;de(Pt,"EVENT_CONNECTED","serialport-connected"),de(Pt,"EVENT_DISCONNECTED","serialport-disconnected");class bn{constructor(t){de(this,"serial");this.serial=t}async startReadLoop(t,i){return await this.serial.startReadLoop(t,!1,i)}async resetReader(){await this.serial.resetReader()}async enterRawMode(){this.serial.getStatus()!=="REPL"&&console.error("Not in REPL mode. Exiting..."),console.log("Entering RAW mode..."),this.serial.setTerminalOutputEnabled(!1),await this.serial.sendControl(1)}async exitRawMode(){this.serial.setTerminalOutputEnabled(!0),await this.serial.sendControl(2)}async executeCommand(t){console.log("executeCommand:",t);try{await this.enterRawMode(),await this.write(t),await this.serial.sendControl(4)}catch(i){console.error("Error executing command:",i)}finally{await this.exitRawMode()}}async sendCommand(t){console.log("sendCommand:",t);try{await this.write(t)}catch(i){console.error("Error executing sendCommand:",i)}}async writeFile(t,i){console.log("writeFile:",t);try{await this.enterRawMode(),await this.write(`with open("${t}", "wb") as f:\r`);const s=JSON.stringify(Array.from(i));await this.write(`  f.write(bytes(${s}))\r`),await this.serial.sendControl(4),console.log("Verifying written file...");const c=await this.readFile(t);if(!this.verifyContent(i,c))throw new Error("File verification failed: Written content does not match.");console.log("File verification succeeded.")}catch(s){const c=s;throw console.error("Error writing file:",c.message),new Error(`Failed to write file "${t}": ${c.message}`)}finally{}}verifyContent(t,i){if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s]!==i[s])return!1;return!0}async readFile(t){console.log("readFile:",t);let i=new Uint8Array;try{await this.resetReader(),await this.enterRawMode(),await this.write(`with open("${t}", "rb") as f:\r`),await this.write("  import ubinascii\r"),await this.write("  print(ubinascii.hexlify(f.read()).decode())\r"),await this.serial.sendControl(4),await this.startReadLoop(">OK");const s=await this.startReadLoop("",{maxSize:5e5});this.startReadLoop(!1);try{if(this.serial.consumeTrimFlag())throw new Error("Receive buffer trimmed during read; data may be incomplete")}catch(w){throw w}if(!s)throw new Error("No data received from device");if(!/^[0-9a-fA-F\s]*$/.test(s))throw new Error("Received non-hex data from device");const c=s.replace(/\s+/g,"").match(/.{1,2}/g)||[];return i=new Uint8Array(c.map(w=>parseInt(w,16))),i}catch(s){throw console.error("Error reading file:",s),s}finally{await this.exitRawMode()}}async getPyFileList(){console.log("getPyFileList");try{await this.resetReader(),await this.enterRawMode(),await this.write("import os\r"),await this.write("print(os.listdir())\r"),await this.serial.sendControl(4),console.log("Command sent:");const t=await this.startReadLoop(">OK");console.log("Skip:",t);const i=await this.startReadLoop("");return this.startReadLoop(!1),console.log("Received content:",i),await this.exitRawMode(),i.replace(/[\[\]'\s]/g,"").split(",").filter(c=>c.endsWith(".py")||c.endsWith(".txt"))}catch(t){return console.error("Error fetching file list:",t),[]}}async write(t){await this.serial.send(t)}async writeDevice(t){this.write(t)}}function yn(){return new Worker(""+new URL("editor.worker.efe3cf27.js",import.meta.url).href)}function wn(){return new Worker(""+new URL("json.worker.15dd1f87.js",import.meta.url).href)}function Sn(){return new Worker(""+new URL("ts.worker.56a3bd1b.js",import.meta.url).href)}var Ao=Object.defineProperty,Cn=Object.defineProperties,xn=Object.getOwnPropertyDescriptor,kn=Object.getOwnPropertyDescriptors,kr=Object.getOwnPropertySymbols,En=Object.prototype.hasOwnProperty,An=Object.prototype.propertyIsEnumerable,Ds=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),sr=e=>{throw TypeError(e)},Er=(e,t,i)=>t in e?Ao(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,St=(e,t)=>{for(var i in t||(t={}))En.call(t,i)&&Er(e,i,t[i]);if(kr)for(var i of kr(t))An.call(t,i)&&Er(e,i,t[i]);return e},Oi=(e,t)=>Cn(e,kn(t)),_=(e,t,i,s)=>{for(var c=s>1?void 0:s?xn(t,i):t,m=e.length-1,w;m>=0;m--)(w=e[m])&&(c=(s?w(t,i,c):w(c))||c);return s&&c&&Ao(t,i,c),c},Lo=(e,t,i)=>t.has(e)||sr("Cannot "+i),Ln=(e,t,i)=>(Lo(e,t,"read from private field"),i?i.call(e):t.get(e)),Dn=(e,t,i)=>t.has(e)?sr("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),Tn=(e,t,i,s)=>(Lo(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),Rn=function(e,t){this[0]=e,this[1]=t},$n=e=>{var t=e[Ds("asyncIterator")],i=!1,s,c={};return t==null?(t=e[Ds("iterator")](),s=m=>c[m]=w=>t[m](w)):(t=t.call(e),s=m=>c[m]=w=>{if(i){if(i=!1,m==="throw")throw w;return w}return i=!0,{done:!1,value:new Rn(new Promise(r=>{var n=t[m](w);n instanceof Object||sr("Object expected"),r(n)}),1)}}),c[Ds("iterator")]=()=>c,s("next"),"throw"in t?s("throw"):c.throw=m=>{throw m},"return"in t&&s("return"),c},fi=new WeakMap,gi=new WeakMap,mi=new WeakMap,Ts=new WeakSet,Ki=new WeakMap,Ct=class{constructor(e,t){this.handleFormData=i=>{const s=this.options.disabled(this.host),c=this.options.name(this.host),m=this.options.value(this.host),w=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!s&&!w&&typeof c=="string"&&c.length>0&&typeof m<"u"&&(Array.isArray(m)?m.forEach(r=>{i.formData.append(c,r.toString())}):i.formData.append(c,m.toString()))},this.handleFormSubmit=i=>{var s;const c=this.options.disabled(this.host),m=this.options.reportValidity;this.form&&!this.form.noValidate&&((s=fi.get(this.form))==null||s.forEach(w=>{this.setUserInteracted(w,!0)})),this.form&&!this.form.noValidate&&!c&&!m(this.host)&&(i.preventDefault(),i.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Ki.set(this.host,[])},this.handleInteraction=i=>{const s=Ki.get(this.host);s.includes(i.type)||s.push(i.type),s.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const s of i)if(typeof s.checkValidity=="function"&&!s.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const s of i)if(typeof s.reportValidity=="function"&&!s.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=St({form:i=>{const s=i.form;if(s){const m=i.getRootNode().querySelector(`#${s}`);if(m)return m}return i.closest("form")},name:i=>i.name,value:i=>i.value,defaultValue:i=>i.defaultValue,disabled:i=>{var s;return(s=i.disabled)!=null?s:!1},reportValidity:i=>typeof i.reportValidity=="function"?i.reportValidity():!0,checkValidity:i=>typeof i.checkValidity=="function"?i.checkValidity():!0,setValue:(i,s)=>i.value=s,assumeInteractionOn:["sl-input"]},t)}hostConnected(){const e=this.options.form(this.host);e&&this.attachForm(e),Ki.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Ki.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){const e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,fi.has(this.form)?fi.get(this.form).add(this.host):fi.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),gi.has(this.form)||(gi.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),mi.has(this.form)||(mi.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const e=fi.get(this.form);!e||(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),gi.has(this.form)&&(this.form.reportValidity=gi.get(this.form),gi.delete(this.form)),mi.has(this.form)&&(this.form.checkValidity=mi.get(this.form),mi.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?Ts.add(e):Ts.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){const i=document.createElement("button");i.type=e,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",t&&(i.name=t.name,i.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(s=>{t.hasAttribute(s)&&i.setAttribute(s,t.getAttribute(s))})),this.form.append(i),i.click(),i.remove()}}getForm(){var e;return(e=this.form)!=null?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){const t=this.host,i=Boolean(Ts.has(t)),s=Boolean(t.required);t.toggleAttribute("data-required",s),t.toggleAttribute("data-optional",!s),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&i),t.toggleAttribute("data-user-valid",e&&i)}updateValidity(){const e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){const t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||e==null||e.preventDefault()}},fs=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),Bn=Object.freeze(Oi(St({},fs),{valid:!1,valueMissing:!0})),On=Object.freeze(Oi(St({},fs),{valid:!1,customError:!0}));/**
>>>>>>>> 50e43e82bba6e38441caa9e51b4d77f2e4af9941:docs/assets/index.249327d1.js
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ts=globalThis,rr=ts.ShadowRoot&&(ts.ShadyCSS===void 0||ts.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,or=Symbol(),Ar=new WeakMap;class Do{constructor(t,i,s){if(this._$cssResult$=!0,s!==or)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(rr&&t===void 0){const s=i!==void 0&&i.length===1;s&&(t=Ar.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ar.set(i,t))}return t}toString(){return this.cssText}}const Mn=e=>new Do(typeof e=="string"?e:e+"",void 0,or),Q=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((s,c,m)=>s+(w=>{if(w._$cssResult$===!0)return w.cssText;if(typeof w=="number")return w;throw Error("Value passed to 'css' function must be a 'css' function result: "+w+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(c)+e[m+1],e[0]);return new Do(i,e,or)},In=(e,t)=>{if(rr)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const s=document.createElement("style"),c=ts.litNonce;c!==void 0&&s.setAttribute("nonce",c),s.textContent=i.cssText,e.appendChild(s)}},Lr=rr?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return Mn(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Pn,defineProperty:zn,getOwnPropertyDescriptor:Fn,getOwnPropertyNames:Hn,getOwnPropertySymbols:Nn,getPrototypeOf:Un}=Object,Lt=globalThis,Dr=Lt.trustedTypes,Wn=Dr?Dr.emptyScript:"",Rs=Lt.reactiveElementPolyfillSupport,wi=(e,t)=>e,ei={toAttribute(e,t){switch(t){case Boolean:e=e?Wn:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},nr=(e,t)=>!Pn(e,t),Tr={attribute:!0,type:String,converter:ei,reflect:!1,useDefault:!1,hasChanged:nr};var lo,co;(lo=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(co=Lt.litPropertyMetadata)!=null||(Lt.litPropertyMetadata=new WeakMap);class Jt extends HTMLElement{static addInitializer(t){var i;this._$Ei(),((i=this.l)!=null?i:this.l=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Tr){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),c=this.getPropertyDescriptor(t,s,i);c!==void 0&&zn(this.prototype,t,c)}}static getPropertyDescriptor(t,i,s){var w;const{get:c,set:m}=(w=Fn(this.prototype,t))!=null?w:{get(){return this[i]},set(r){this[i]=r}};return{get:c,set(r){const n=c==null?void 0:c.call(this);m==null||m.call(this,r),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){var i;return(i=this.elementProperties.get(t))!=null?i:Tr}static _$Ei(){if(this.hasOwnProperty(wi("elementProperties")))return;const t=Un(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(wi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(wi("properties"))){const i=this.properties,s=[...Hn(i),...Nn(i)];for(const c of s)this.createProperty(c,i[c])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[s,c]of i)this.elementProperties.set(s,c)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const c=this._$Eu(i,s);c!==void 0&&this._$Eh.set(c,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const c of s)i.unshift(Lr(c))}else t!==void 0&&i.push(Lr(t));return i}static _$Eu(t,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(i=>i(this))}addController(t){var i,s;((i=this._$EO)!=null?i:this._$EO=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)==null||s.call(t))}removeController(t){var i;(i=this._$EO)==null||i.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){var i;const t=(i=this.shadowRoot)!=null?i:this.attachShadow(this.constructor.shadowRootOptions);return In(t,this.constructor.elementStyles),t}connectedCallback(){var t,i;(t=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(i=this._$EO)==null||i.forEach(s=>{var c;return(c=s.hostConnected)==null?void 0:c.call(s)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostDisconnected)==null?void 0:s.call(i)})}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){var m;const s=this.constructor.elementProperties.get(t),c=this.constructor._$Eu(t,s);if(c!==void 0&&s.reflect===!0){const w=(((m=s.converter)==null?void 0:m.toAttribute)!==void 0?s.converter:ei).toAttribute(i,s.type);this._$Em=t,w==null?this.removeAttribute(c):this.setAttribute(c,w),this._$Em=null}}_$AK(t,i){var m,w,r;const s=this.constructor,c=s._$Eh.get(t);if(c!==void 0&&this._$Em!==c){const n=s.getPropertyOptions(c),u=typeof n.converter=="function"?{fromAttribute:n.converter}:((m=n.converter)==null?void 0:m.fromAttribute)!==void 0?n.converter:ei;this._$Em=c;const g=u.fromAttribute(i,n.type);this[c]=(r=g!=null?g:(w=this._$Ej)==null?void 0:w.get(c))!=null?r:g,this._$Em=null}}requestUpdate(t,i,s){var c,m;if(t!==void 0){const w=this.constructor,r=this[t];if(s!=null||(s=w.getPropertyOptions(t)),!(((c=s.hasChanged)!=null?c:nr)(r,i)||s.useDefault&&s.reflect&&r===((m=this._$Ej)==null?void 0:m.get(t))&&!this.hasAttribute(w._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:c,wrapped:m},w){var r,n,u;s&&!((r=this._$Ej)!=null?r:this._$Ej=new Map).has(t)&&(this._$Ej.set(t,(n=w!=null?w:i)!=null?n:this[t]),m!==!0||w!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),c===!0&&this._$Em!==t&&((u=this._$Eq)!=null?u:this._$Eq=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s,c;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((s=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[w,r]of this._$Ep)this[w]=r;this._$Ep=void 0}const m=this.constructor.elementProperties;if(m.size>0)for(const[w,r]of m){const{wrapped:n}=r,u=this[w];n!==!0||this._$AL.has(w)||u===void 0||this.C(w,void 0,r,u)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(c=this._$EO)==null||c.forEach(m=>{var w;return(w=m.hostUpdate)==null?void 0:w.call(m)}),this.update(i)):this._$EM()}catch(m){throw t=!1,this._$EM(),m}t&&this._$AE(i)}willUpdate(t){}_$AE(t){var i;(i=this._$EO)==null||i.forEach(s=>{var c;return(c=s.hostUpdated)==null?void 0:c.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}}var ho;Jt.elementStyles=[],Jt.shadowRootOptions={mode:"open"},Jt[wi("elementProperties")]=new Map,Jt[wi("finalized")]=new Map,Rs==null||Rs({ReactiveElement:Jt}),((ho=Lt.reactiveElementVersions)!=null?ho:Lt.reactiveElementVersions=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Si=globalThis,os=Si.trustedTypes,Rr=os?os.createPolicy("lit-html",{createHTML:e=>e}):void 0,To="$lit$",Et=`lit$${Math.random().toFixed(9).slice(2)}$`,Ro="?"+Et,Vn=`<${Ro}>`,Nt=document,Ti=()=>Nt.createComment(""),Ri=e=>e===null||typeof e!="object"&&typeof e!="function",ar=Array.isArray,jn=e=>ar(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",$s=`[ 	
\f\r]`,vi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$r=/-->/g,Br=/>/g,Ot=RegExp(`>|${$s}(?:([^\\s"'>=/]+)(${$s}*=${$s}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Or=/'/g,Mr=/"/g,$o=/^(?:script|style|textarea|title)$/i,qn=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=qn(1),Ke=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),Ir=new WeakMap,zt=Nt.createTreeWalker(Nt,129);function Bo(e,t){if(!ar(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Rr!==void 0?Rr.createHTML(t):t}const Kn=(e,t)=>{const i=e.length-1,s=[];let c,m=t===2?"<svg>":t===3?"<math>":"",w=vi;for(let r=0;r<i;r++){const n=e[r];let u,g,l=-1,f=0;for(;f<n.length&&(w.lastIndex=f,g=w.exec(n),g!==null);)f=w.lastIndex,w===vi?g[1]==="!--"?w=$r:g[1]!==void 0?w=Br:g[2]!==void 0?($o.test(g[2])&&(c=RegExp("</"+g[2],"g")),w=Ot):g[3]!==void 0&&(w=Ot):w===Ot?g[0]===">"?(w=c!=null?c:vi,l=-1):g[1]===void 0?l=-2:(l=w.lastIndex-g[2].length,u=g[1],w=g[3]===void 0?Ot:g[3]==='"'?Mr:Or):w===Mr||w===Or?w=Ot:w===$r||w===Br?w=vi:(w=Ot,c=void 0);const b=w===Ot&&e[r+1].startsWith("/>")?" ":"";m+=w===vi?n+Vn:l>=0?(s.push(u),n.slice(0,l)+To+n.slice(l)+Et+b):n+Et+(l===-2?r:b)}return[Bo(e,m+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class $i{constructor({strings:t,_$litType$:i},s){let c;this.parts=[];let m=0,w=0;const r=t.length-1,n=this.parts,[u,g]=Kn(t,i);if(this.el=$i.createElement(u,s),zt.currentNode=this.el.content,i===2||i===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(c=zt.nextNode())!==null&&n.length<r;){if(c.nodeType===1){if(c.hasAttributes())for(const l of c.getAttributeNames())if(l.endsWith(To)){const f=g[w++],b=c.getAttribute(l).split(Et),C=/([.?@])?(.*)/.exec(f);n.push({type:1,index:m,name:C[2],strings:b,ctor:C[1]==="."?Gn:C[1]==="?"?Yn:C[1]==="@"?Jn:gs}),c.removeAttribute(l)}else l.startsWith(Et)&&(n.push({type:6,index:m}),c.removeAttribute(l));if($o.test(c.tagName)){const l=c.textContent.split(Et),f=l.length-1;if(f>0){c.textContent=os?os.emptyScript:"";for(let b=0;b<f;b++)c.append(l[b],Ti()),zt.nextNode(),n.push({type:2,index:++m});c.append(l[f],Ti())}}}else if(c.nodeType===8)if(c.data===Ro)n.push({type:2,index:m});else{let l=-1;for(;(l=c.data.indexOf(Et,l+1))!==-1;)n.push({type:7,index:m}),l+=Et.length-1}m++}}static createElement(t,i){const s=Nt.createElement("template");return s.innerHTML=t,s}}function ti(e,t,i=e,s){var w,r,n;if(t===Ke)return t;let c=s!==void 0?(w=i._$Co)==null?void 0:w[s]:i._$Cl;const m=Ri(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==m&&((r=c==null?void 0:c._$AO)==null||r.call(c,!1),m===void 0?c=void 0:(c=new m(e),c._$AT(e,i,s)),s!==void 0?((n=i._$Co)!=null?n:i._$Co=[])[s]=c:i._$Cl=c),c!==void 0&&(t=ti(e,c._$AS(e,t.values),c,s)),t}class Xn{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var u;const{el:{content:i},parts:s}=this._$AD,c=((u=t==null?void 0:t.creationScope)!=null?u:Nt).importNode(i,!0);zt.currentNode=c;let m=zt.nextNode(),w=0,r=0,n=s[0];for(;n!==void 0;){if(w===n.index){let g;n.type===2?g=new Mi(m,m.nextSibling,this,t):n.type===1?g=new n.ctor(m,n.name,n.strings,this,t):n.type===6&&(g=new Zn(m,this,t)),this._$AV.push(g),n=s[++r]}w!==(n==null?void 0:n.index)&&(m=zt.nextNode(),w++)}return zt.currentNode=Nt,c}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class Mi{get _$AU(){var t,i;return(i=(t=this._$AM)==null?void 0:t._$AU)!=null?i:this._$Cv}constructor(t,i,s,c){var m;this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=c,this._$Cv=(m=c==null?void 0:c.isConnected)!=null?m:!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=ti(this,t,i),Ri(t)?t===ve||t==null||t===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):t!==this._$AH&&t!==Ke&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):jn(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ve&&Ri(this._$AH)?this._$AA.nextSibling.data=t:this.T(Nt.createTextNode(t)),this._$AH=t}$(t){var m;const{values:i,_$litType$:s}=t,c=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=$i.createElement(Bo(s.h,s.h[0]),this.options)),s);if(((m=this._$AH)==null?void 0:m._$AD)===c)this._$AH.p(i);else{const w=new Xn(c,this),r=w.u(this.options);w.p(i),this.T(r),this._$AH=w}}_$AC(t){let i=Ir.get(t.strings);return i===void 0&&Ir.set(t.strings,i=new $i(t)),i}k(t){ar(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,c=0;for(const m of t)c===i.length?i.push(s=new Mi(this.O(Ti()),this.O(Ti()),this,this.options)):s=i[c],s._$AI(m),c++;c<i.length&&(this._$AR(s&&s._$AB.nextSibling,c),i.length=c)}_$AR(t=this._$AA.nextSibling,i){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,i);t!==this._$AB;){const c=t.nextSibling;t.remove(),t=c}}setConnected(t){var i;this._$AM===void 0&&(this._$Cv=t,(i=this._$AP)==null||i.call(this,t))}}class gs{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,c,m){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=t,this.name=i,this._$AM=c,this.options=m,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ve}_$AI(t,i=this,s,c){const m=this.strings;let w=!1;if(m===void 0)t=ti(this,t,i,0),w=!Ri(t)||t!==this._$AH&&t!==Ke,w&&(this._$AH=t);else{const r=t;let n,u;for(t=m[0],n=0;n<m.length-1;n++)u=ti(this,r[s+n],i,n),u===Ke&&(u=this._$AH[n]),w||(w=!Ri(u)||u!==this._$AH[n]),u===ve?t=ve:t!==ve&&(t+=(u!=null?u:"")+m[n+1]),this._$AH[n]=u}w&&!c&&this.j(t)}j(t){t===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class Gn extends gs{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ve?void 0:t}}class Yn extends gs{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ve)}}class Jn extends gs{constructor(t,i,s,c,m){super(t,i,s,c,m),this.type=5}_$AI(t,i=this){var w;if((t=(w=ti(this,t,i,0))!=null?w:ve)===Ke)return;const s=this._$AH,c=t===ve&&s!==ve||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,m=t!==ve&&(s===ve||c);c&&this.element.removeEventListener(this.name,this,s),m&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;typeof this._$AH=="function"?this._$AH.call((s=(i=this.options)==null?void 0:i.host)!=null?s:this.element,t):this._$AH.handleEvent(t)}}class Zn{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){ti(this,t)}}const Bs=Si.litHtmlPolyfillSupport;var uo;Bs==null||Bs($i,Mi),((uo=Si.litHtmlVersions)!=null?uo:Si.litHtmlVersions=[]).push("3.3.1");const Qn=(e,t,i)=>{var m,w;const s=(m=i==null?void 0:i.renderBefore)!=null?m:t;let c=s._$litPart$;if(c===void 0){const r=(w=i==null?void 0:i.renderBefore)!=null?w:null;s._$litPart$=c=new Mi(t.insertBefore(Ti(),r),r,void 0,i!=null?i:{})}return c._$AI(e),c};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht=globalThis;class Ci extends Jt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i,s;const t=super.createRenderRoot();return(s=(i=this.renderOptions).renderBefore)!=null||(i.renderBefore=t.firstChild),t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qn(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ke}}var po;Ci._$litElement$=!0,Ci.finalized=!0,(po=Ht.litElementHydrateSupport)==null||po.call(Ht,{LitElement:Ci});const Os=Ht.litElementPolyfillSupport;Os==null||Os({LitElement:Ci});var fo;((fo=Ht.litElementVersions)!=null?fo:Ht.litElementVersions=[]).push("4.2.1");var ea=Q`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,ta=Q`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,si=(e="value")=>(t,i)=>{const s=t.constructor,c=s.prototype.attributeChangedCallback;s.prototype.attributeChangedCallback=function(m,w,r){var n;const u=s.getPropertyOptions(e),g=typeof u.attribute=="string"?u.attribute:e;if(m===g){const l=u.converter||ei,b=(typeof l=="function"?l:(n=l==null?void 0:l.fromAttribute)!=null?n:ei.fromAttribute)(r,u.type);this[e]!==b&&(this[i]=b)}c.call(this,m,w,r)}},Vt=Q`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,Ne=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=i=>{const s=i.target;(this.slotNames.includes("[default]")&&!s.name||s.name&&this.slotNames.includes(s.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===e.ELEMENT_NODE){const t=e;if(t.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function ia(e){if(!e)return"";const t=e.assignedNodes({flatten:!0});let i="";return[...t].forEach(s=>{s.nodeType===Node.TEXT_NODE&&(i+=s.textContent)}),i}var Ws="";function Pr(e){Ws=e}function sa(e=""){if(!Ws){const t=[...document.getElementsByTagName("script")],i=t.find(s=>s.hasAttribute("data-shoelace"));if(i)Pr(i.getAttribute("data-shoelace"));else{const s=t.find(m=>/shoelace(\.min)?\.js($|\?)/.test(m.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(m.src));let c="";s&&(c=s.getAttribute("src")),Pr(c.split("/").slice(0,-1).join("/"))}}return Ws.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}var ra={name:"default",resolver:e=>sa(`assets/icons/${e}.svg`)},oa=ra,zr={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},na={name:"system",resolver:e=>e in zr?`data:image/svg+xml,${encodeURIComponent(zr[e])}`:""},aa=na,la=[oa,aa],Vs=[];function ca(e){Vs.push(e)}function ha(e){Vs=Vs.filter(t=>t!==e)}function Fr(e){return la.find(t=>t.name===e)}var da=Q`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function q(e,t){const i=St({waitUntilFirstUpdate:!1},t);return(s,c)=>{const{update:m}=s,w=Array.isArray(e)?e:[e];s.update=function(r){w.forEach(n=>{const u=n;if(r.has(u)){const g=r.get(u),l=this[u];g!==l&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[c](g,l)}}),m.call(this,r)}}}var ie=Q`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ua={attribute:!0,type:String,converter:ei,reflect:!1,hasChanged:nr},pa=(e=ua,t,i)=>{const{kind:s,metadata:c}=i;let m=globalThis.litPropertyMetadata.get(c);if(m===void 0&&globalThis.litPropertyMetadata.set(c,m=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),m.set(i.name,e),s==="accessor"){const{name:w}=i;return{set(r){const n=t.get.call(this);t.set.call(this,r),this.requestUpdate(w,n,e)},init(r){return r!==void 0&&this.C(w,void 0,e,r),r}}}if(s==="setter"){const{name:w}=i;return function(r){const n=this[w];t.call(this,r),this.requestUpdate(w,n,e)}}throw Error("Unsupported decorator location: "+s)};function A(e){return(t,i)=>typeof i=="object"?pa(e,t,i):((s,c,m)=>{const w=c.hasOwnProperty(m);return c.constructor.createProperty(m,s),w?Object.getOwnPropertyDescriptor(c,m):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ee(e){return A({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ii(e){return(t,i)=>{const s=typeof t=="function"?t:t[i];Object.assign(s,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const js=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function K(e,t){return(i,s,c)=>{const m=w=>{var r,n;return(n=(r=w.renderRoot)==null?void 0:r.querySelector(e))!=null?n:null};if(t){const{get:w,set:r}=typeof s=="object"?i:c!=null?c:(()=>{const n=Symbol();return{get(){return this[n]},set(u){this[n]=u}}})();return js(i,s,{get(){let n=w.call(this);return n===void 0&&(n=m(this),(n!==null||this.hasUpdated)&&r.call(this,n)),n}})}return js(i,s,{get(){return m(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function fa(e){return(t,i)=>js(t,i,{async get(){var s,c;return await this.updateComplete,(c=(s=this.renderRoot)==null?void 0:s.querySelector(e))!=null?c:null}})}var is,J=class extends Ci{constructor(){super(),Dn(this,is,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){const i=new CustomEvent(e,St({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(i),i}static define(e,t=this,i={}){const s=customElements.get(e);if(!s){try{customElements.define(e,t,i)}catch{customElements.define(e,class extends t{},i)}return}let c=" (unknown version)",m=c;"version"in t&&t.version&&(c=" v"+t.version),"version"in s&&s.version&&(m=" v"+s.version),!(c&&m&&c===m)&&console.warn(`Attempted to register <${e}>${c}, but <${e}>${m} has already been registered.`)}attributeChangedCallback(e,t,i){Ln(this,is)||(this.constructor.elementProperties.forEach((s,c)=>{s.reflect&&this[c]!=null&&this.initialReflectedProperties.set(c,this[c])}),Tn(this,is,!0)),super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&this[i]==null&&(this[i]=t)})}};is=new WeakMap;J.version="2.20.1";J.dependencies={};_([A()],J.prototype,"dir",2);_([A()],J.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ga=(e,t)=>t===void 0?(e==null?void 0:e._$litType$)!==void 0:(e==null?void 0:e._$litType$)===t,Oo=e=>e.strings===void 0,ma={},va=(e,t=ma)=>e._$AH=t;var _i=Symbol(),Xi=Symbol(),Ms,Is=new Map,me=class extends J{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(e,t){var i;let s;if(t!=null&&t.spriteSheet)return this.svg=V`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(s=await fetch(e,{mode:"cors"}),!s.ok)return s.status===410?_i:Xi}catch{return Xi}try{const c=document.createElement("div");c.innerHTML=await s.text();const m=c.firstElementChild;if(((i=m==null?void 0:m.tagName)==null?void 0:i.toLowerCase())!=="svg")return _i;Ms||(Ms=new DOMParser);const r=Ms.parseFromString(m.outerHTML,"text/html").body.querySelector("svg");return r?(r.part.add("svg"),document.adoptNode(r)):_i}catch{return _i}}connectedCallback(){super.connectedCallback(),ca(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),ha(this)}getIconSource(){const e=Fr(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var e;const{url:t,fromLibrary:i}=this.getIconSource(),s=i?Fr(this.library):void 0;if(!t){this.svg=null;return}let c=Is.get(t);if(c||(c=this.resolveIcon(t,s),Is.set(t,c)),!this.initialRender)return;const m=await c;if(m===Xi&&Is.delete(t),t===this.getIconSource().url){if(ga(m)){if(this.svg=m,s){await this.updateComplete;const w=this.shadowRoot.querySelector("[part='svg']");typeof s.mutator=="function"&&w&&s.mutator(w)}return}switch(m){case Xi:case _i:this.svg=null,this.emit("sl-error");break;default:this.svg=m.cloneNode(!0),(e=s==null?void 0:s.mutator)==null||e.call(s,this.svg),this.emit("sl-load")}}}render(){return this.svg}};me.styles=[ie,da];_([ee()],me.prototype,"svg",2);_([A({reflect:!0})],me.prototype,"name",2);_([A()],me.prototype,"src",2);_([A()],me.prototype,"label",2);_([A({reflect:!0})],me.prototype,"library",2);_([q("label")],me.prototype,"handleLabelChange",1);_([q(["name","src","library"])],me.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pi=e=>(...t)=>({_$litDirective$:e,values:t});class zi{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=Pi(class extends zi{constructor(e){var t;if(super(e),e.type!==pt.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var s,c;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(m=>m!=="")));for(const m in t)t[m]&&!((s=this.nt)!=null&&s.has(m))&&this.st.add(m);return this.render(t)}const i=e.element.classList;for(const m of this.st)m in t||(i.remove(m),this.st.delete(m));for(const m in t){const w=!!t[m];w===this.st.has(m)||((c=this.nt)==null?void 0:c.has(m))||(w?(i.add(m),this.st.add(m)):(i.remove(m),this.st.delete(m)))}return Ke}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=e=>e!=null?e:ve;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=Pi(class extends zi{constructor(e){if(super(e),e.type!==pt.PROPERTY&&e.type!==pt.ATTRIBUTE&&e.type!==pt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Oo(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ke||t===ve)return t;const i=e.element,s=e.name;if(e.type===pt.PROPERTY){if(t===i[s])return Ke}else if(e.type===pt.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(s))return Ke}else if(e.type===pt.ATTRIBUTE&&i.getAttribute(s)===t+"")return Ke;return va(e),t}});var Le=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new Ne(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("help-text"),t=this.helpText?!0:!!e;return V`
      <div
        class=${te({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${te({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${Y(this.value)}
            .indeterminate=${Ut(this.indeterminate)}
            .checked=${Ut(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?V`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?V`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Le.styles=[ie,Vt,ta];Le.dependencies={"sl-icon":me};_([K('input[type="checkbox"]')],Le.prototype,"input",2);_([ee()],Le.prototype,"hasFocus",2);_([A()],Le.prototype,"title",2);_([A()],Le.prototype,"name",2);_([A()],Le.prototype,"value",2);_([A({reflect:!0})],Le.prototype,"size",2);_([A({type:Boolean,reflect:!0})],Le.prototype,"disabled",2);_([A({type:Boolean,reflect:!0})],Le.prototype,"checked",2);_([A({type:Boolean,reflect:!0})],Le.prototype,"indeterminate",2);_([si("checked")],Le.prototype,"defaultChecked",2);_([A({reflect:!0})],Le.prototype,"form",2);_([A({type:Boolean,reflect:!0})],Le.prototype,"required",2);_([A({attribute:"help-text"})],Le.prototype,"helpText",2);_([q("disabled",{waitUntilFirstUpdate:!0})],Le.prototype,"handleDisabledChange",1);_([q(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],Le.prototype,"handleStateChange",1);var _a=Q`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;const qs=new Set,Zt=new Map;let It,lr="ltr",cr="en";const Mo=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Mo){const e=new MutationObserver(Po);lr=document.documentElement.dir||"ltr",cr=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Io(...e){e.map(t=>{const i=t.$code.toLowerCase();Zt.has(i)?Zt.set(i,Object.assign(Object.assign({},Zt.get(i)),t)):Zt.set(i,t),It||(It=t)}),Po()}function Po(){Mo&&(lr=document.documentElement.dir||"ltr",cr=document.documentElement.lang||navigator.language),[...qs.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}class ba{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){qs.add(this.host)}hostDisconnected(){qs.delete(this.host)}dir(){return`${this.host.dir||lr}`.toLowerCase()}lang(){return`${this.host.lang||cr}`.toLowerCase()}getTranslationData(t){var i,s;const c=new Intl.Locale(t.replace(/_/g,"-")),m=c==null?void 0:c.language.toLowerCase(),w=(s=(i=c==null?void 0:c.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&s!==void 0?s:"",r=Zt.get(`${m}-${w}`),n=Zt.get(m);return{locale:c,language:m,region:w,primary:r,secondary:n}}exists(t,i){var s;const{primary:c,secondary:m}=this.getTranslationData((s=i.lang)!==null&&s!==void 0?s:this.lang());return i=Object.assign({includeFallback:!1},i),!!(c&&c[t]||m&&m[t]||i.includeFallback&&It&&It[t])}term(t,...i){const{primary:s,secondary:c}=this.getTranslationData(this.lang());let m;if(s&&s[t])m=s[t];else if(c&&c[t])m=c[t];else if(It&&It[t])m=It[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof m=="function"?m(...i):m}date(t,i){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),i).format(t)}number(t,i){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),i).format(t)}relativeTime(t,i,s){return new Intl.RelativeTimeFormat(this.lang(),s).format(t,i)}}var zo={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};Io(zo);var ya=zo,ce=class extends ba{};Io(ya);var Fi=class extends J{constructor(){super(...arguments),this.localize=new ce(this)}render(){return V`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Fi.styles=[ie,_a];var Fo=new Map,wa=new WeakMap;function Sa(e){return e!=null?e:{keyframes:[],options:{duration:0}}}function Hr(e,t){return t.toLowerCase()==="rtl"?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function ue(e,t){Fo.set(e,Sa(t))}function _e(e,t,i){const s=wa.get(e);if(s!=null&&s[t])return Hr(s[t],i.dir);const c=Fo.get(t);return c?Hr(c,i.dir):{keyframes:[],options:{duration:0}}}function Ce(e,t,i){return new Promise(s=>{if((i==null?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const c=e.animate(t,Oi(St({},i),{duration:Ks()?0:i.duration}));c.addEventListener("cancel",s,{once:!0}),c.addEventListener("finish",s,{once:!0})})}function Nr(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?parseFloat(e)*1e3:parseFloat(e)}function Ks(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ae(e){return Promise.all(e.getAnimations().map(t=>new Promise(i=>{t.cancel(),requestAnimationFrame(i)})))}function ns(e,t){return e.map(i=>Oi(St({},i),{height:i.height==="auto"?`${t}px`:i.height}))}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ur(e,t,i){return e?t(e):i==null?void 0:i(e)}var xe=class Xs extends J{constructor(){super(...arguments),this.localize=new ce(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&t.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await Ae(this.childrenContainer);const{keyframes:t,options:i}=_e(this,"tree-item.collapse",{dir:this.localize.dir()});await Ce(this.childrenContainer,ns(t,this.childrenContainer.scrollHeight),i),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}isNestedItem(){const t=this.parentElement;return!!t&&Xs.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.emit("sl-expand"),await Ae(this.childrenContainer),this.childrenContainer.hidden=!1;const{keyframes:t,options:i}=_e(this,"tree-item.expand",{dir:this.localize.dir()});await Ce(this.childrenContainer,ns(t,this.childrenContainer.scrollHeight),i),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(i=>Xs.isTreeItem(i)&&(t||!i.disabled)):[]}render(){const t=this.localize.dir()==="rtl",i=!this.loading&&(!this.isLeaf||this.lazy);return V`
      <div
        part="base"
        class="${te({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":i,"tree-item--rtl":this.localize.dir()==="rtl"})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${te({"tree-item__expand-button":!0,"tree-item__expand-button--visible":i})}
            aria-hidden="true"
          >
            ${Ur(this.loading,()=>V` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${Ur(this.selectable,()=>V`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${Ut(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};xe.styles=[ie,ea];xe.dependencies={"sl-checkbox":Le,"sl-icon":me,"sl-spinner":Fi};_([ee()],xe.prototype,"indeterminate",2);_([ee()],xe.prototype,"isLeaf",2);_([ee()],xe.prototype,"loading",2);_([ee()],xe.prototype,"selectable",2);_([A({type:Boolean,reflect:!0})],xe.prototype,"expanded",2);_([A({type:Boolean,reflect:!0})],xe.prototype,"selected",2);_([A({type:Boolean,reflect:!0})],xe.prototype,"disabled",2);_([A({type:Boolean,reflect:!0})],xe.prototype,"lazy",2);_([K("slot:not([name])")],xe.prototype,"defaultSlot",2);_([K("slot[name=children]")],xe.prototype,"childrenSlot",2);_([K(".tree-item__item")],xe.prototype,"itemElement",2);_([K(".tree-item__children")],xe.prototype,"childrenContainer",2);_([K(".tree-item__expand-button slot")],xe.prototype,"expandButtonSlot",2);_([q("loading",{waitUntilFirstUpdate:!0})],xe.prototype,"handleLoadingChange",1);_([q("disabled")],xe.prototype,"handleDisabledChange",1);_([q("selected")],xe.prototype,"handleSelectedChange",1);_([q("expanded",{waitUntilFirstUpdate:!0})],xe.prototype,"handleExpandedChange",1);_([q("expanded",{waitUntilFirstUpdate:!0})],xe.prototype,"handleExpandAnimation",1);_([q("lazy",{waitUntilFirstUpdate:!0})],xe.prototype,"handleLazyChange",1);var xi=xe;ue("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});ue("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});xi.define("sl-tree-item");var Ca=Q`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,xa=Q`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const Dt=Math.min,qe=Math.max,as=Math.round,Gi=Math.floor,ft=e=>({x:e,y:e}),ka={left:"right",right:"left",bottom:"top",top:"bottom"},Ea={start:"end",end:"start"};function Gs(e,t,i){return qe(e,Dt(t,i))}function ri(e,t){return typeof e=="function"?e(t):e}function Tt(e){return e.split("-")[0]}function oi(e){return e.split("-")[1]}function Ho(e){return e==="x"?"y":"x"}function hr(e){return e==="y"?"height":"width"}const Aa=new Set(["top","bottom"]);function wt(e){return Aa.has(Tt(e))?"y":"x"}function dr(e){return Ho(wt(e))}function La(e,t,i){i===void 0&&(i=!1);const s=oi(e),c=dr(e),m=hr(c);let w=c==="x"?s===(i?"end":"start")?"right":"left":s==="start"?"bottom":"top";return t.reference[m]>t.floating[m]&&(w=ls(w)),[w,ls(w)]}function Da(e){const t=ls(e);return[Ys(e),t,Ys(t)]}function Ys(e){return e.replace(/start|end/g,t=>Ea[t])}const Wr=["left","right"],Vr=["right","left"],Ta=["top","bottom"],Ra=["bottom","top"];function $a(e,t,i){switch(e){case"top":case"bottom":return i?t?Vr:Wr:t?Wr:Vr;case"left":case"right":return t?Ta:Ra;default:return[]}}function Ba(e,t,i,s){const c=oi(e);let m=$a(Tt(e),i==="start",s);return c&&(m=m.map(w=>w+"-"+c),t&&(m=m.concat(m.map(Ys)))),m}function ls(e){return e.replace(/left|right|bottom|top/g,t=>ka[t])}function Oa(e){return{top:0,right:0,bottom:0,left:0,...e}}function No(e){return typeof e!="number"?Oa(e):{top:e,right:e,bottom:e,left:e}}function cs(e){const{x:t,y:i,width:s,height:c}=e;return{width:s,height:c,top:i,left:t,right:t+s,bottom:i+c,x:t,y:i}}function jr(e,t,i){let{reference:s,floating:c}=e;const m=wt(t),w=dr(t),r=hr(w),n=Tt(t),u=m==="y",g=s.x+s.width/2-c.width/2,l=s.y+s.height/2-c.height/2,f=s[r]/2-c[r]/2;let b;switch(n){case"top":b={x:g,y:s.y-c.height};break;case"bottom":b={x:g,y:s.y+s.height};break;case"right":b={x:s.x+s.width,y:l};break;case"left":b={x:s.x-c.width,y:l};break;default:b={x:s.x,y:s.y}}switch(oi(t)){case"start":b[w]-=f*(i&&u?-1:1);break;case"end":b[w]+=f*(i&&u?-1:1);break}return b}const Ma=async(e,t,i)=>{const{placement:s="bottom",strategy:c="absolute",middleware:m=[],platform:w}=i,r=m.filter(Boolean),n=await(w.isRTL==null?void 0:w.isRTL(t));let u=await w.getElementRects({reference:e,floating:t,strategy:c}),{x:g,y:l}=jr(u,s,n),f=s,b={},C=0;for(let S=0;S<r.length;S++){const{name:o,fn:d}=r[S],{x:a,y:h,data:p,reset:v}=await d({x:g,y:l,initialPlacement:s,placement:f,strategy:c,middlewareData:b,rects:u,platform:w,elements:{reference:e,floating:t}});g=a!=null?a:g,l=h!=null?h:l,b={...b,[o]:{...b[o],...p}},v&&C<=50&&(C++,typeof v=="object"&&(v.placement&&(f=v.placement),v.rects&&(u=v.rects===!0?await w.getElementRects({reference:e,floating:t,strategy:c}):v.rects),{x:g,y:l}=jr(u,f,n)),S=-1)}return{x:g,y:l,placement:f,strategy:c,middlewareData:b}};async function ur(e,t){var i;t===void 0&&(t={});const{x:s,y:c,platform:m,rects:w,elements:r,strategy:n}=e,{boundary:u="clippingAncestors",rootBoundary:g="viewport",elementContext:l="floating",altBoundary:f=!1,padding:b=0}=ri(t,e),C=No(b),o=r[f?l==="floating"?"reference":"floating":l],d=cs(await m.getClippingRect({element:(i=await(m.isElement==null?void 0:m.isElement(o)))==null||i?o:o.contextElement||await(m.getDocumentElement==null?void 0:m.getDocumentElement(r.floating)),boundary:u,rootBoundary:g,strategy:n})),a=l==="floating"?{x:s,y:c,width:w.floating.width,height:w.floating.height}:w.reference,h=await(m.getOffsetParent==null?void 0:m.getOffsetParent(r.floating)),p=await(m.isElement==null?void 0:m.isElement(h))?await(m.getScale==null?void 0:m.getScale(h))||{x:1,y:1}:{x:1,y:1},v=cs(m.convertOffsetParentRelativeRectToViewportRelativeRect?await m.convertOffsetParentRelativeRectToViewportRelativeRect({elements:r,rect:a,offsetParent:h,strategy:n}):a);return{top:(d.top-v.top+C.top)/p.y,bottom:(v.bottom-d.bottom+C.bottom)/p.y,left:(d.left-v.left+C.left)/p.x,right:(v.right-d.right+C.right)/p.x}}const Ia=e=>({name:"arrow",options:e,async fn(t){const{x:i,y:s,placement:c,rects:m,platform:w,elements:r,middlewareData:n}=t,{element:u,padding:g=0}=ri(e,t)||{};if(u==null)return{};const l=No(g),f={x:i,y:s},b=dr(c),C=hr(b),S=await w.getDimensions(u),o=b==="y",d=o?"top":"left",a=o?"bottom":"right",h=o?"clientHeight":"clientWidth",p=m.reference[C]+m.reference[b]-f[b]-m.floating[C],v=f[b]-m.reference[b],x=await(w.getOffsetParent==null?void 0:w.getOffsetParent(u));let E=x?x[h]:0;(!E||!await(w.isElement==null?void 0:w.isElement(x)))&&(E=r.floating[h]||m.floating[C]);const y=p/2-v/2,k=E/2-S[C]/2-1,T=Dt(l[d],k),B=Dt(l[a],k),R=T,O=E-S[C]-B,z=E/2-S[C]/2+y,F=Gs(R,z,O),W=!n.arrow&&oi(c)!=null&&z!==F&&m.reference[C]/2-(z<R?T:B)-S[C]/2<0,N=W?z<R?z-R:z-O:0;return{[b]:f[b]+N,data:{[b]:F,centerOffset:z-F-N,...W&&{alignmentOffset:N}},reset:W}}});const Pa=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var i,s;const{placement:c,middlewareData:m,rects:w,initialPlacement:r,platform:n,elements:u}=t,{mainAxis:g=!0,crossAxis:l=!0,fallbackPlacements:f,fallbackStrategy:b="bestFit",fallbackAxisSideDirection:C="none",flipAlignment:S=!0,...o}=ri(e,t);if((i=m.arrow)!=null&&i.alignmentOffset)return{};const d=Tt(c),a=wt(r),h=Tt(r)===r,p=await(n.isRTL==null?void 0:n.isRTL(u.floating)),v=f||(h||!S?[ls(r)]:Da(r)),x=C!=="none";!f&&x&&v.push(...Ba(r,S,C,p));const E=[r,...v],y=await ur(t,o),k=[];let T=((s=m.flip)==null?void 0:s.overflows)||[];if(g&&k.push(y[d]),l){const z=La(c,w,p);k.push(y[z[0]],y[z[1]])}if(T=[...T,{placement:c,overflows:k}],!k.every(z=>z<=0)){var B,R;const z=(((B=m.flip)==null?void 0:B.index)||0)+1,F=E[z];if(F&&(!(l==="alignment"?a!==wt(F):!1)||T.every(L=>wt(L.placement)===a?L.overflows[0]>0:!0)))return{data:{index:z,overflows:T},reset:{placement:F}};let W=(R=T.filter(N=>N.overflows[0]<=0).sort((N,L)=>N.overflows[1]-L.overflows[1])[0])==null?void 0:R.placement;if(!W)switch(b){case"bestFit":{var O;const N=(O=T.filter(L=>{if(x){const $=wt(L.placement);return $===a||$==="y"}return!0}).map(L=>[L.placement,L.overflows.filter($=>$>0).reduce(($,M)=>$+M,0)]).sort((L,$)=>L[1]-$[1])[0])==null?void 0:O[0];N&&(W=N);break}case"initialPlacement":W=r;break}if(c!==W)return{reset:{placement:W}}}return{}}}};const za=new Set(["left","top"]);async function Fa(e,t){const{placement:i,platform:s,elements:c}=e,m=await(s.isRTL==null?void 0:s.isRTL(c.floating)),w=Tt(i),r=oi(i),n=wt(i)==="y",u=za.has(w)?-1:1,g=m&&n?-1:1,l=ri(t,e);let{mainAxis:f,crossAxis:b,alignmentAxis:C}=typeof l=="number"?{mainAxis:l,crossAxis:0,alignmentAxis:null}:{mainAxis:l.mainAxis||0,crossAxis:l.crossAxis||0,alignmentAxis:l.alignmentAxis};return r&&typeof C=="number"&&(b=r==="end"?C*-1:C),n?{x:b*g,y:f*u}:{x:f*u,y:b*g}}const Ha=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var i,s;const{x:c,y:m,placement:w,middlewareData:r}=t,n=await Fa(t,e);return w===((i=r.offset)==null?void 0:i.placement)&&(s=r.arrow)!=null&&s.alignmentOffset?{}:{x:c+n.x,y:m+n.y,data:{...n,placement:w}}}}},Na=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:i,y:s,placement:c}=t,{mainAxis:m=!0,crossAxis:w=!1,limiter:r={fn:o=>{let{x:d,y:a}=o;return{x:d,y:a}}},...n}=ri(e,t),u={x:i,y:s},g=await ur(t,n),l=wt(Tt(c)),f=Ho(l);let b=u[f],C=u[l];if(m){const o=f==="y"?"top":"left",d=f==="y"?"bottom":"right",a=b+g[o],h=b-g[d];b=Gs(a,b,h)}if(w){const o=l==="y"?"top":"left",d=l==="y"?"bottom":"right",a=C+g[o],h=C-g[d];C=Gs(a,C,h)}const S=r.fn({...t,[f]:b,[l]:C});return{...S,data:{x:S.x-i,y:S.y-s,enabled:{[f]:m,[l]:w}}}}}};const Ua=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var i,s;const{placement:c,rects:m,platform:w,elements:r}=t,{apply:n=()=>{},...u}=ri(e,t),g=await ur(t,u),l=Tt(c),f=oi(c),b=wt(c)==="y",{width:C,height:S}=m.floating;let o,d;l==="top"||l==="bottom"?(o=l,d=f===(await(w.isRTL==null?void 0:w.isRTL(r.floating))?"start":"end")?"left":"right"):(d=l,o=f==="end"?"top":"bottom");const a=S-g.top-g.bottom,h=C-g.left-g.right,p=Dt(S-g[o],a),v=Dt(C-g[d],h),x=!t.middlewareData.shift;let E=p,y=v;if((i=t.middlewareData.shift)!=null&&i.enabled.x&&(y=h),(s=t.middlewareData.shift)!=null&&s.enabled.y&&(E=a),x&&!f){const T=qe(g.left,0),B=qe(g.right,0),R=qe(g.top,0),O=qe(g.bottom,0);b?y=C-2*(T!==0||B!==0?T+B:qe(g.left,g.right)):E=S-2*(R!==0||O!==0?R+O:qe(g.top,g.bottom))}await n({...t,availableWidth:y,availableHeight:E});const k=await w.getDimensions(r.floating);return C!==k.width||S!==k.height?{reset:{rects:!0}}:{}}}};function ms(){return typeof window<"u"}function ni(e){return Uo(e)?(e.nodeName||"").toLowerCase():"#document"}function Xe(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function mt(e){var t;return(t=(Uo(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Uo(e){return ms()?e instanceof Node||e instanceof Xe(e).Node:!1}function rt(e){return ms()?e instanceof Element||e instanceof Xe(e).Element:!1}function gt(e){return ms()?e instanceof HTMLElement||e instanceof Xe(e).HTMLElement:!1}function qr(e){return!ms()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Xe(e).ShadowRoot}const Wa=new Set(["inline","contents"]);function Hi(e){const{overflow:t,overflowX:i,overflowY:s,display:c}=ot(e);return/auto|scroll|overlay|hidden|clip/.test(t+s+i)&&!Wa.has(c)}const Va=new Set(["table","td","th"]);function ja(e){return Va.has(ni(e))}const qa=[":popover-open",":modal"];function vs(e){return qa.some(t=>{try{return e.matches(t)}catch{return!1}})}const Ka=["transform","translate","scale","rotate","perspective"],Xa=["transform","translate","scale","rotate","perspective","filter"],Ga=["paint","layout","strict","content"];function _s(e){const t=pr(),i=rt(e)?ot(e):e;return Ka.some(s=>i[s]?i[s]!=="none":!1)||(i.containerType?i.containerType!=="normal":!1)||!t&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!t&&(i.filter?i.filter!=="none":!1)||Xa.some(s=>(i.willChange||"").includes(s))||Ga.some(s=>(i.contain||"").includes(s))}function Ya(e){let t=Rt(e);for(;gt(t)&&!ii(t);){if(_s(t))return t;if(vs(t))return null;t=Rt(t)}return null}function pr(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Ja=new Set(["html","body","#document"]);function ii(e){return Ja.has(ni(e))}function ot(e){return Xe(e).getComputedStyle(e)}function bs(e){return rt(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Rt(e){if(ni(e)==="html")return e;const t=e.assignedSlot||e.parentNode||qr(e)&&e.host||mt(e);return qr(t)?t.host:t}function Wo(e){const t=Rt(e);return ii(t)?e.ownerDocument?e.ownerDocument.body:e.body:gt(t)&&Hi(t)?t:Wo(t)}function Bi(e,t,i){var s;t===void 0&&(t=[]),i===void 0&&(i=!0);const c=Wo(e),m=c===((s=e.ownerDocument)==null?void 0:s.body),w=Xe(c);if(m){const r=Js(w);return t.concat(w,w.visualViewport||[],Hi(c)?c:[],r&&i?Bi(r):[])}return t.concat(c,Bi(c,[],i))}function Js(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Vo(e){const t=ot(e);let i=parseFloat(t.width)||0,s=parseFloat(t.height)||0;const c=gt(e),m=c?e.offsetWidth:i,w=c?e.offsetHeight:s,r=as(i)!==m||as(s)!==w;return r&&(i=m,s=w),{width:i,height:s,$:r}}function fr(e){return rt(e)?e:e.contextElement}function Qt(e){const t=fr(e);if(!gt(t))return ft(1);const i=t.getBoundingClientRect(),{width:s,height:c,$:m}=Vo(t);let w=(m?as(i.width):i.width)/s,r=(m?as(i.height):i.height)/c;return(!w||!Number.isFinite(w))&&(w=1),(!r||!Number.isFinite(r))&&(r=1),{x:w,y:r}}const Za=ft(0);function jo(e){const t=Xe(e);return!pr()||!t.visualViewport?Za:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Qa(e,t,i){return t===void 0&&(t=!1),!i||t&&i!==Xe(e)?!1:t}function Wt(e,t,i,s){t===void 0&&(t=!1),i===void 0&&(i=!1);const c=e.getBoundingClientRect(),m=fr(e);let w=ft(1);t&&(s?rt(s)&&(w=Qt(s)):w=Qt(e));const r=Qa(m,i,s)?jo(m):ft(0);let n=(c.left+r.x)/w.x,u=(c.top+r.y)/w.y,g=c.width/w.x,l=c.height/w.y;if(m){const f=Xe(m),b=s&&rt(s)?Xe(s):s;let C=f,S=Js(C);for(;S&&s&&b!==C;){const o=Qt(S),d=S.getBoundingClientRect(),a=ot(S),h=d.left+(S.clientLeft+parseFloat(a.paddingLeft))*o.x,p=d.top+(S.clientTop+parseFloat(a.paddingTop))*o.y;n*=o.x,u*=o.y,g*=o.x,l*=o.y,n+=h,u+=p,C=Xe(S),S=Js(C)}}return cs({width:g,height:l,x:n,y:u})}function gr(e,t){const i=bs(e).scrollLeft;return t?t.left+i:Wt(mt(e)).left+i}function qo(e,t,i){i===void 0&&(i=!1);const s=e.getBoundingClientRect(),c=s.left+t.scrollLeft-(i?0:gr(e,s)),m=s.top+t.scrollTop;return{x:c,y:m}}function el(e){let{elements:t,rect:i,offsetParent:s,strategy:c}=e;const m=c==="fixed",w=mt(s),r=t?vs(t.floating):!1;if(s===w||r&&m)return i;let n={scrollLeft:0,scrollTop:0},u=ft(1);const g=ft(0),l=gt(s);if((l||!l&&!m)&&((ni(s)!=="body"||Hi(w))&&(n=bs(s)),gt(s))){const b=Wt(s);u=Qt(s),g.x=b.x+s.clientLeft,g.y=b.y+s.clientTop}const f=w&&!l&&!m?qo(w,n,!0):ft(0);return{width:i.width*u.x,height:i.height*u.y,x:i.x*u.x-n.scrollLeft*u.x+g.x+f.x,y:i.y*u.y-n.scrollTop*u.y+g.y+f.y}}function tl(e){return Array.from(e.getClientRects())}function il(e){const t=mt(e),i=bs(e),s=e.ownerDocument.body,c=qe(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),m=qe(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight);let w=-i.scrollLeft+gr(e);const r=-i.scrollTop;return ot(s).direction==="rtl"&&(w+=qe(t.clientWidth,s.clientWidth)-c),{width:c,height:m,x:w,y:r}}function sl(e,t){const i=Xe(e),s=mt(e),c=i.visualViewport;let m=s.clientWidth,w=s.clientHeight,r=0,n=0;if(c){m=c.width,w=c.height;const u=pr();(!u||u&&t==="fixed")&&(r=c.offsetLeft,n=c.offsetTop)}return{width:m,height:w,x:r,y:n}}const rl=new Set(["absolute","fixed"]);function ol(e,t){const i=Wt(e,!0,t==="fixed"),s=i.top+e.clientTop,c=i.left+e.clientLeft,m=gt(e)?Qt(e):ft(1),w=e.clientWidth*m.x,r=e.clientHeight*m.y,n=c*m.x,u=s*m.y;return{width:w,height:r,x:n,y:u}}function Kr(e,t,i){let s;if(t==="viewport")s=sl(e,i);else if(t==="document")s=il(mt(e));else if(rt(t))s=ol(t,i);else{const c=jo(e);s={x:t.x-c.x,y:t.y-c.y,width:t.width,height:t.height}}return cs(s)}function Ko(e,t){const i=Rt(e);return i===t||!rt(i)||ii(i)?!1:ot(i).position==="fixed"||Ko(i,t)}function nl(e,t){const i=t.get(e);if(i)return i;let s=Bi(e,[],!1).filter(r=>rt(r)&&ni(r)!=="body"),c=null;const m=ot(e).position==="fixed";let w=m?Rt(e):e;for(;rt(w)&&!ii(w);){const r=ot(w),n=_s(w);!n&&r.position==="fixed"&&(c=null),(m?!n&&!c:!n&&r.position==="static"&&!!c&&rl.has(c.position)||Hi(w)&&!n&&Ko(e,w))?s=s.filter(g=>g!==w):c=r,w=Rt(w)}return t.set(e,s),s}function al(e){let{element:t,boundary:i,rootBoundary:s,strategy:c}=e;const w=[...i==="clippingAncestors"?vs(t)?[]:nl(t,this._c):[].concat(i),s],r=w[0],n=w.reduce((u,g)=>{const l=Kr(t,g,c);return u.top=qe(l.top,u.top),u.right=Dt(l.right,u.right),u.bottom=Dt(l.bottom,u.bottom),u.left=qe(l.left,u.left),u},Kr(t,r,c));return{width:n.right-n.left,height:n.bottom-n.top,x:n.left,y:n.top}}function ll(e){const{width:t,height:i}=Vo(e);return{width:t,height:i}}function cl(e,t,i){const s=gt(t),c=mt(t),m=i==="fixed",w=Wt(e,!0,m,t);let r={scrollLeft:0,scrollTop:0};const n=ft(0);function u(){n.x=gr(c)}if(s||!s&&!m)if((ni(t)!=="body"||Hi(c))&&(r=bs(t)),s){const b=Wt(t,!0,m,t);n.x=b.x+t.clientLeft,n.y=b.y+t.clientTop}else c&&u();m&&!s&&c&&u();const g=c&&!s&&!m?qo(c,r):ft(0),l=w.left+r.scrollLeft-n.x-g.x,f=w.top+r.scrollTop-n.y-g.y;return{x:l,y:f,width:w.width,height:w.height}}function Ps(e){return ot(e).position==="static"}function Xr(e,t){if(!gt(e)||ot(e).position==="fixed")return null;if(t)return t(e);let i=e.offsetParent;return mt(e)===i&&(i=i.ownerDocument.body),i}function Xo(e,t){const i=Xe(e);if(vs(e))return i;if(!gt(e)){let c=Rt(e);for(;c&&!ii(c);){if(rt(c)&&!Ps(c))return c;c=Rt(c)}return i}let s=Xr(e,t);for(;s&&ja(s)&&Ps(s);)s=Xr(s,t);return s&&ii(s)&&Ps(s)&&!_s(s)?i:s||Ya(e)||i}const hl=async function(e){const t=this.getOffsetParent||Xo,i=this.getDimensions,s=await i(e.floating);return{reference:cl(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:s.width,height:s.height}}};function dl(e){return ot(e).direction==="rtl"}const ss={convertOffsetParentRelativeRectToViewportRelativeRect:el,getDocumentElement:mt,getClippingRect:al,getOffsetParent:Xo,getElementRects:hl,getClientRects:tl,getDimensions:ll,getScale:Qt,isElement:rt,isRTL:dl};function Go(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function ul(e,t){let i=null,s;const c=mt(e);function m(){var r;clearTimeout(s),(r=i)==null||r.disconnect(),i=null}function w(r,n){r===void 0&&(r=!1),n===void 0&&(n=1),m();const u=e.getBoundingClientRect(),{left:g,top:l,width:f,height:b}=u;if(r||t(),!f||!b)return;const C=Gi(l),S=Gi(c.clientWidth-(g+f)),o=Gi(c.clientHeight-(l+b)),d=Gi(g),h={rootMargin:-C+"px "+-S+"px "+-o+"px "+-d+"px",threshold:qe(0,Dt(1,n))||1};let p=!0;function v(x){const E=x[0].intersectionRatio;if(E!==n){if(!p)return w();E?w(!1,E):s=setTimeout(()=>{w(!1,1e-7)},1e3)}E===1&&!Go(u,e.getBoundingClientRect())&&w(),p=!1}try{i=new IntersectionObserver(v,{...h,root:c.ownerDocument})}catch{i=new IntersectionObserver(v,h)}i.observe(e)}return w(!0),m}function pl(e,t,i,s){s===void 0&&(s={});const{ancestorScroll:c=!0,ancestorResize:m=!0,elementResize:w=typeof ResizeObserver=="function",layoutShift:r=typeof IntersectionObserver=="function",animationFrame:n=!1}=s,u=fr(e),g=c||m?[...u?Bi(u):[],...Bi(t)]:[];g.forEach(d=>{c&&d.addEventListener("scroll",i,{passive:!0}),m&&d.addEventListener("resize",i)});const l=u&&r?ul(u,i):null;let f=-1,b=null;w&&(b=new ResizeObserver(d=>{let[a]=d;a&&a.target===u&&b&&(b.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var h;(h=b)==null||h.observe(t)})),i()}),u&&!n&&b.observe(u),b.observe(t));let C,S=n?Wt(e):null;n&&o();function o(){const d=Wt(e);S&&!Go(S,d)&&i(),S=d,C=requestAnimationFrame(o)}return i(),()=>{var d;g.forEach(a=>{c&&a.removeEventListener("scroll",i),m&&a.removeEventListener("resize",i)}),l==null||l(),(d=b)==null||d.disconnect(),b=null,n&&cancelAnimationFrame(C)}}const fl=Ha,gl=Na,ml=Pa,Gr=Ua,vl=Ia,_l=(e,t,i)=>{const s=new Map,c={platform:ss,...i},m={...c.platform,_c:s};return Ma(e,t,{...c,platform:m})};function bl(e){return yl(e)}function zs(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function yl(e){for(let t=e;t;t=zs(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=zs(e);t;t=zs(t)){if(!(t instanceof Element))continue;const i=getComputedStyle(t);if(i.display!=="contents"&&(i.position!=="static"||_s(i)||t.tagName==="BODY"))return t}return null}function wl(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e.contextElement instanceof Element:!0)}var pe=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let s=0,c=0,m=0,w=0,r=0,n=0,u=0,g=0;i?e.top<t.top?(s=e.left,c=e.bottom,m=e.right,w=e.bottom,r=t.left,n=t.top,u=t.right,g=t.top):(s=t.left,c=t.bottom,m=t.right,w=t.bottom,r=e.left,n=e.top,u=e.right,g=e.top):e.left<t.left?(s=e.right,c=e.top,m=t.left,w=t.top,r=e.right,n=e.bottom,u=t.left,g=t.bottom):(s=t.right,c=t.top,m=e.left,w=e.top,r=t.right,n=t.bottom,u=e.left,g=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${s}px`),this.style.setProperty("--hover-bridge-top-left-y",`${c}px`),this.style.setProperty("--hover-bridge-top-right-x",`${m}px`),this.style.setProperty("--hover-bridge-top-right-y",`${w}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||wl(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=pl(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl)return;const e=[fl({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Gr({apply:({rects:i})=>{const s=this.sync==="width"||this.sync==="both",c=this.sync==="height"||this.sync==="both";this.popup.style.width=s?`${i.reference.width}px`:"",this.popup.style.height=c?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&e.push(ml({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(gl({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(Gr({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:s})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${s}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(vl({element:this.arrowEl,padding:this.arrowPadding}));const t=this.strategy==="absolute"?i=>ss.getOffsetParent(i,bl):ss.getOffsetParent;_l(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:Oi(St({},ss),{getOffsetParent:t})}).then(({x:i,y:s,middlewareData:c,placement:m})=>{const w=this.localize.dir()==="rtl",r={top:"bottom",right:"left",bottom:"top",left:"right"}[m.split("-")[0]];if(this.setAttribute("data-current-placement",m),Object.assign(this.popup.style,{left:`${i}px`,top:`${s}px`}),this.arrow){const n=c.arrow.x,u=c.arrow.y;let g="",l="",f="",b="";if(this.arrowPlacement==="start"){const C=typeof n=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";g=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",l=w?C:"",b=w?"":C}else if(this.arrowPlacement==="end"){const C=typeof n=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";l=w?"":C,b=w?C:"",f=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(b=typeof n=="number"?"calc(50% - var(--arrow-size-diagonal))":"",g=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(b=typeof n=="number"?`${n}px`:"",g=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:g,right:l,bottom:f,left:b,[r]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return V`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${te({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${te({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?V`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};pe.styles=[ie,xa];_([K(".popup")],pe.prototype,"popup",2);_([K(".popup__arrow")],pe.prototype,"arrowEl",2);_([A()],pe.prototype,"anchor",2);_([A({type:Boolean,reflect:!0})],pe.prototype,"active",2);_([A({reflect:!0})],pe.prototype,"placement",2);_([A({reflect:!0})],pe.prototype,"strategy",2);_([A({type:Number})],pe.prototype,"distance",2);_([A({type:Number})],pe.prototype,"skidding",2);_([A({type:Boolean})],pe.prototype,"arrow",2);_([A({attribute:"arrow-placement"})],pe.prototype,"arrowPlacement",2);_([A({attribute:"arrow-padding",type:Number})],pe.prototype,"arrowPadding",2);_([A({type:Boolean})],pe.prototype,"flip",2);_([A({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],pe.prototype,"flipFallbackPlacements",2);_([A({attribute:"flip-fallback-strategy"})],pe.prototype,"flipFallbackStrategy",2);_([A({type:Object})],pe.prototype,"flipBoundary",2);_([A({attribute:"flip-padding",type:Number})],pe.prototype,"flipPadding",2);_([A({type:Boolean})],pe.prototype,"shift",2);_([A({type:Object})],pe.prototype,"shiftBoundary",2);_([A({attribute:"shift-padding",type:Number})],pe.prototype,"shiftPadding",2);_([A({attribute:"auto-size"})],pe.prototype,"autoSize",2);_([A()],pe.prototype,"sync",2);_([A({type:Object})],pe.prototype,"autoSizeBoundary",2);_([A({attribute:"auto-size-padding",type:Number})],pe.prototype,"autoSizePadding",2);_([A({attribute:"hover-bridge",type:Boolean})],pe.prototype,"hoverBridge",2);function He(e,t){return new Promise(i=>{function s(c){c.target===e&&(e.removeEventListener(t,s),i())}e.addEventListener(t,s)})}var Te=class extends J{constructor(){super(),this.localize=new ce(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{e.key==="Escape"&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const e=Nr(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const e=Nr(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Ae(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:i,options:s}=_e(this,"tooltip.show",{dir:this.localize.dir()});await Ce(this.popup.popup,i,s),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Ae(this.body);const{keyframes:i,options:s}=_e(this,"tooltip.hide",{dir:this.localize.dir()});await Ce(this.popup.popup,i,s),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,He(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,He(this,"sl-after-hide")}render(){return V`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${te({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};Te.styles=[ie,Ca];Te.dependencies={"sl-popup":pe};_([K("slot:not([name])")],Te.prototype,"defaultSlot",2);_([K(".tooltip__body")],Te.prototype,"body",2);_([K("sl-popup")],Te.prototype,"popup",2);_([A()],Te.prototype,"content",2);_([A()],Te.prototype,"placement",2);_([A({type:Boolean,reflect:!0})],Te.prototype,"disabled",2);_([A({type:Number})],Te.prototype,"distance",2);_([A({type:Boolean,reflect:!0})],Te.prototype,"open",2);_([A({type:Number})],Te.prototype,"skidding",2);_([A()],Te.prototype,"trigger",2);_([A({type:Boolean})],Te.prototype,"hoist",2);_([q("open",{waitUntilFirstUpdate:!0})],Te.prototype,"handleOpenChange",1);_([q(["content","distance","hoist","placement","skidding"])],Te.prototype,"handleOptionsChange",1);_([q("disabled")],Te.prototype,"handleDisabledChange",1);ue("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});ue("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});Te.define("sl-tooltip");var Sl=Q`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;function Ee(e,t,i){const s=c=>Object.is(c,-0)?0:c;return e<t?s(t):e>i?s(i):s(e)}function Yr(e,t=!1){function i(m){const w=m.getChildrenItems({includeDisabled:!1});if(w.length){const r=w.every(u=>u.selected),n=w.every(u=>!u.selected&&!u.indeterminate);m.selected=r,m.indeterminate=!r&&!n}}function s(m){const w=m.parentElement;xi.isTreeItem(w)&&(i(w),s(w))}function c(m){for(const w of m.getChildrenItems())w.selected=t?m.selected||w.selected:!w.disabled&&m.selected,c(w);t&&i(m)}c(e),s(e)}var jt=class extends J{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new ce(this),this.initTreeItem=e=>{e.selectable=this.selection==="multiple",["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(t=>{const i=e.querySelector(`[slot="${t}-icon"]`),s=this.getExpandButtonIcon(t);!s||(i===null?e.append(s):i.hasAttribute("data-default")&&i.replaceWith(s))})},this.handleTreeChanged=e=>{for(const t of e){const i=[...t.addedNodes].filter(xi.isTreeItem),s=[...t.removedNodes].filter(xi.isTreeItem);i.forEach(this.initTreeItem),this.lastFocusedItem&&s.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{const t=e.relatedTarget;(!t||!this.contains(t))&&(this.tabIndex=0)},this.handleFocusIn=e=>{const t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),xi.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect()}getExpandButtonIcon(e){const i=(e==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(i){const s=i.cloneNode(!0);return[s,...s.querySelectorAll("[id]")].forEach(c=>c.removeAttribute("id")),s.setAttribute("data-default",""),s.slot=`${e}-icon`,s}return null}selectItem(e){const t=[...this.selectedItems];if(this.selection==="multiple")e.selected=!e.selected,e.lazy&&(e.expanded=!0),Yr(e);else if(this.selection==="single"||e.isLeaf){const s=this.getAllTreeItems();for(const c of s)c.selected=c===e}else this.selection==="leaf"&&(e.expanded=!e.expanded);const i=this.selectedItems;(t.length!==i.length||i.some(s=>!t.includes(s)))&&Promise.all(i.map(s=>s.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:i}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(e){e==null||e.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(c=>{var m;return["input","textarea"].includes((m=c==null?void 0:c.tagName)==null?void 0:m.toLowerCase())}))return;const t=this.getFocusableItems(),i=this.localize.dir()==="ltr",s=this.localize.dir()==="rtl";if(t.length>0){e.preventDefault();const c=t.findIndex(n=>n.matches(":focus")),m=t[c],w=n=>{const u=t[Ee(n,0,t.length-1)];this.focusItem(u)},r=n=>{m.expanded=n};e.key==="ArrowDown"?w(c+1):e.key==="ArrowUp"?w(c-1):i&&e.key==="ArrowRight"||s&&e.key==="ArrowLeft"?!m||m.disabled||m.expanded||m.isLeaf&&!m.lazy?w(c+1):r(!0):i&&e.key==="ArrowLeft"||s&&e.key==="ArrowRight"?!m||m.disabled||m.isLeaf||!m.expanded?w(c-1):r(!1):e.key==="Home"?w(0):e.key==="End"?w(t.length-1):(e.key==="Enter"||e.key===" ")&&(m.disabled||this.selectItem(m))}}handleClick(e){const t=e.target,i=t.closest("sl-tree-item"),s=e.composedPath().some(c=>{var m;return(m=c==null?void 0:c.classList)==null?void 0:m.contains("tree-item__expand-button")});!i||i.disabled||t!==this.clickTarget||(s?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){const e=this.selection==="multiple",t=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(const i of t)i.selectable=e;e&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(i=>Yr(i,!0)))}get selectedItems(){const e=this.getAllTreeItems(),t=i=>i.selected;return e.filter(t)}getFocusableItems(){const e=this.getAllTreeItems(),t=new Set;return e.filter(i=>{var s;if(i.disabled)return!1;const c=(s=i.parentElement)==null?void 0:s.closest("[role=treeitem]");return c&&(!c.expanded||c.loading||t.has(c))&&t.add(i),!t.has(i)})}render(){return V`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};jt.styles=[ie,Sl];_([K("slot:not([name])")],jt.prototype,"defaultSlot",2);_([K("slot[name=expand-icon]")],jt.prototype,"expandedIconSlot",2);_([K("slot[name=collapse-icon]")],jt.prototype,"collapsedIconSlot",2);_([A()],jt.prototype,"selection",2);_([q("selection")],jt.prototype,"handleSelectionChange",1);jt.define("sl-tree");var Cl=Q`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,mr=class extends J{render(){return V` <slot></slot> `}};mr.styles=[ie,Cl];mr.define("sl-visually-hidden");var xl=Q`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,kl=0,Ni=class extends J{constructor(){super(...arguments),this.attrId=++kl,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return V`
      <slot
        part="base"
        class=${te({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};Ni.styles=[ie,xl];_([A({reflect:!0})],Ni.prototype,"name",2);_([A({type:Boolean,reflect:!0})],Ni.prototype,"active",2);_([q("active")],Ni.prototype,"handleActiveChange",1);Ni.define("sl-tab-panel");var El=Q`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,Al=Q`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yo=Symbol.for(""),Ll=e=>{if((e==null?void 0:e.r)===Yo)return e==null?void 0:e._$litStatic$},hs=(e,...t)=>({_$litStatic$:t.reduce((i,s,c)=>i+(m=>{if(m._$litStatic$!==void 0)return m._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${m}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(s)+e[c+1],e[0]),r:Yo}),Jr=new Map,Dl=e=>(t,...i)=>{const s=i.length;let c,m;const w=[],r=[];let n,u=0,g=!1;for(;u<s;){for(n=t[u];u<s&&(m=i[u],(c=Ll(m))!==void 0);)n+=c+t[++u],g=!0;u!==s&&r.push(m),w.push(n),u++}if(u===s&&w.push(t[s]),g){const l=w.join("$$lit$$");(t=Jr.get(l))===void 0&&(w.raw=w,Jr.set(l,t=w)),i=r}return e(t,...i)},ki=Dl(V);var De=class extends J{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){const e=!!this.href,t=e?hs`a`:hs`button`;return ki`
      <${t}
        part="base"
        class=${te({"icon-button":!0,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${Y(e?void 0:this.disabled)}
        type=${Y(e?void 0:"button")}
        href=${Y(e?this.href:void 0)}
        target=${Y(e?this.target:void 0)}
        download=${Y(e?this.download:void 0)}
        rel=${Y(e&&this.target?"noreferrer noopener":void 0)}
        role=${Y(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${Y(this.name)}
          library=${Y(this.library)}
          src=${Y(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};De.styles=[ie,Al];De.dependencies={"sl-icon":me};_([K(".icon-button")],De.prototype,"button",2);_([ee()],De.prototype,"hasFocus",2);_([A()],De.prototype,"name",2);_([A()],De.prototype,"library",2);_([A()],De.prototype,"src",2);_([A()],De.prototype,"href",2);_([A()],De.prototype,"target",2);_([A()],De.prototype,"download",2);_([A()],De.prototype,"label",2);_([A({type:Boolean,reflect:!0})],De.prototype,"disabled",2);var $t=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return V`
      <span
        part="base"
        class=${te({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?V`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};$t.styles=[ie,El];$t.dependencies={"sl-icon-button":De};_([A({reflect:!0})],$t.prototype,"variant",2);_([A({reflect:!0})],$t.prototype,"size",2);_([A({type:Boolean,reflect:!0})],$t.prototype,"pill",2);_([A({type:Boolean})],$t.prototype,"removable",2);$t.define("sl-tag");var Tl=Q`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`,he=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ne(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){var e;super.disconnectedCallback(),this.input&&((e=this.resizeObserver)==null||e.unobserve(this.input))}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=""}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){if(e){typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,i="none"){this.input.setSelectionRange(e,t,i)}setRangeText(e,t,i,s="preserve"){const c=t!=null?t:this.input.selectionStart,m=i!=null?i:this.input.selectionEnd;this.input.setRangeText(e,c,m,s),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,s=this.helpText?!0:!!t;return V`
      <div
        part="form-control"
        class=${te({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${te({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${Y(this.name)}
              .value=${Ut(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Y(this.placeholder)}
              rows=${Y(this.rows)}
              minlength=${Y(this.minlength)}
              maxlength=${Y(this.maxlength)}
              autocapitalize=${Y(this.autocapitalize)}
              autocorrect=${Y(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${Y(this.spellcheck)}
              enterkeyhint=${Y(this.enterkeyhint)}
              inputmode=${Y(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize!=="auto"}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};he.styles=[ie,Vt,Tl];_([K(".textarea__control")],he.prototype,"input",2);_([K(".textarea__size-adjuster")],he.prototype,"sizeAdjuster",2);_([ee()],he.prototype,"hasFocus",2);_([A()],he.prototype,"title",2);_([A()],he.prototype,"name",2);_([A()],he.prototype,"value",2);_([A({reflect:!0})],he.prototype,"size",2);_([A({type:Boolean,reflect:!0})],he.prototype,"filled",2);_([A()],he.prototype,"label",2);_([A({attribute:"help-text"})],he.prototype,"helpText",2);_([A()],he.prototype,"placeholder",2);_([A({type:Number})],he.prototype,"rows",2);_([A()],he.prototype,"resize",2);_([A({type:Boolean,reflect:!0})],he.prototype,"disabled",2);_([A({type:Boolean,reflect:!0})],he.prototype,"readonly",2);_([A({reflect:!0})],he.prototype,"form",2);_([A({type:Boolean,reflect:!0})],he.prototype,"required",2);_([A({type:Number})],he.prototype,"minlength",2);_([A({type:Number})],he.prototype,"maxlength",2);_([A()],he.prototype,"autocapitalize",2);_([A()],he.prototype,"autocorrect",2);_([A()],he.prototype,"autocomplete",2);_([A({type:Boolean})],he.prototype,"autofocus",2);_([A()],he.prototype,"enterkeyhint",2);_([A({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],he.prototype,"spellcheck",2);_([A()],he.prototype,"inputmode",2);_([si()],he.prototype,"defaultValue",2);_([q("disabled",{waitUntilFirstUpdate:!0})],he.prototype,"handleDisabledChange",1);_([q("rows",{waitUntilFirstUpdate:!0})],he.prototype,"handleRowsChange",1);_([q("value",{waitUntilFirstUpdate:!0})],he.prototype,"handleValueChange",1);he.define("sl-textarea");var Rl=Q`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,$l=0,nt=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.attrId=++$l,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(e){e.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,V`
      <div
        part="base"
        class=${te({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?V`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};nt.styles=[ie,Rl];nt.dependencies={"sl-icon-button":De};_([K(".tab")],nt.prototype,"tab",2);_([A({reflect:!0})],nt.prototype,"panel",2);_([A({type:Boolean,reflect:!0})],nt.prototype,"active",2);_([A({type:Boolean,reflect:!0})],nt.prototype,"closable",2);_([A({type:Boolean,reflect:!0})],nt.prototype,"disabled",2);_([A({type:Number,reflect:!0})],nt.prototype,"tabIndex",2);_([q("active")],nt.prototype,"handleActiveChange",1);_([q("disabled")],nt.prototype,"handleDisabledChange",1);nt.define("sl-tab");var Bl=Q`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,Ol=Q`
  :host {
    display: contents;
  }
`,Ui=class extends J{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit("sl-resize",{detail:{entries:e}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const e=this.shadowRoot.querySelector("slot");if(e!==null){const t=e.assignedElements({flatten:!0});this.observedElements.forEach(i=>this.resizeObserver.unobserve(i)),this.observedElements=[],t.forEach(i=>{this.resizeObserver.observe(i),this.observedElements.push(i)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return V` <slot @slotchange=${this.handleSlotChange}></slot> `}};Ui.styles=[ie,Ol];_([A({type:Boolean,reflect:!0})],Ui.prototype,"disabled",2);_([q("disabled",{waitUntilFirstUpdate:!0})],Ui.prototype,"handleDisabledChange",1);function Ml(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var Zs=new Set;function Il(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}function Pl(){const e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}function Ei(e){if(Zs.add(e),!document.documentElement.classList.contains("sl-scroll-lock")){const t=Il()+Pl();let i=getComputedStyle(document.documentElement).scrollbarGutter;(!i||i==="auto")&&(i="stable"),t<2&&(i=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",i),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function Ai(e){Zs.delete(e),Zs.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function Qs(e,t,i="vertical",s="smooth"){const c=Ml(e,t),m=c.top+t.scrollTop,w=c.left+t.scrollLeft,r=t.scrollLeft,n=t.scrollLeft+t.offsetWidth,u=t.scrollTop,g=t.scrollTop+t.offsetHeight;(i==="horizontal"||i==="both")&&(w<r?t.scrollTo({left:w,behavior:s}):w+e.clientWidth>n&&t.scrollTo({left:w-t.offsetWidth+e.clientWidth,behavior:s})),(i==="vertical"||i==="both")&&(m<u?t.scrollTo({top:m,behavior:s}):m+e.clientHeight>g&&t.scrollTo({top:m-t.offsetHeight+e.clientHeight,behavior:s}))}var Me=class extends J{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new ce(this),this.hasScrollControls=!1,this.shouldHideScrollStartButton=!1,this.shouldHideScrollEndButton=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1,this.fixedScrollControls=!1,this.scrollOffset=1}connectedCallback(){const e=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{const i=t.filter(({target:s})=>{if(s===this)return!0;if(s.closest("sl-tab-group")!==this)return!1;const c=s.tagName.toLowerCase();return c==="sl-tab"||c==="sl-tab-panel"});if(i.length!==0){if(i.some(s=>!["aria-labelledby","aria-controls"].includes(s.attributeName))&&setTimeout(()=>this.setAriaLabels()),i.some(s=>s.attributeName==="disabled"))this.syncTabsAndPanels();else if(i.some(s=>s.attributeName==="active")){const c=i.filter(m=>m.attributeName==="active"&&m.target.tagName.toLowerCase()==="sl-tab").map(m=>m.target).find(m=>m.active);c&&this.setActiveTab(c)}}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,attributeFilter:["active","disabled","name","panel"],childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),e.then(()=>{new IntersectionObserver((i,s)=>{var c;i[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((c=this.getActiveTab())!=null?c:this.tabs[0],{emitEvents:!1}),s.unobserve(i[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect(),this.nav&&((t=this.resizeObserver)==null||t.unobserve(this.nav))}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(e=>e.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){const i=e.target.closest("sl-tab");(i==null?void 0:i.closest("sl-tab-group"))===this&&i!==null&&this.setActiveTab(i,{scrollBehavior:"smooth"})}handleKeyDown(e){const i=e.target.closest("sl-tab");if((i==null?void 0:i.closest("sl-tab-group"))===this&&(["Enter"," "].includes(e.key)&&i!==null&&(this.setActiveTab(i,{scrollBehavior:"smooth"}),e.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))){const c=this.tabs.find(r=>r.matches(":focus")),m=this.localize.dir()==="rtl";let w=null;if((c==null?void 0:c.tagName.toLowerCase())==="sl-tab"){if(e.key==="Home")w=this.focusableTabs[0];else if(e.key==="End")w=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&e.key===(m?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&e.key==="ArrowUp"){const r=this.tabs.findIndex(n=>n===c);w=this.findNextFocusableTab(r,"backward")}else if(["top","bottom"].includes(this.placement)&&e.key===(m?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&e.key==="ArrowDown"){const r=this.tabs.findIndex(n=>n===c);w=this.findNextFocusableTab(r,"forward")}if(!w)return;w.tabIndex=0,w.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(w,{scrollBehavior:"smooth"}):this.tabs.forEach(r=>{r.tabIndex=r===w?0:-1}),["top","bottom"].includes(this.placement)&&Qs(w,this.nav,"horizontal"),e.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(e,t){if(t=St({emitEvents:!0,scrollBehavior:"auto"},t),e!==this.activeTab&&!e.disabled){const i=this.activeTab;this.activeTab=e,this.tabs.forEach(s=>{s.active=s===this.activeTab,s.tabIndex=s===this.activeTab?0:-1}),this.panels.forEach(s=>{var c;return s.active=s.name===((c=this.activeTab)==null?void 0:c.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Qs(this.activeTab,this.nav,"horizontal",t.scrollBehavior),t.emitEvents&&(i&&this.emit("sl-tab-hide",{detail:{name:i.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(e=>{const t=this.panels.find(i=>i.name===e.panel);t&&(e.setAttribute("aria-controls",t.getAttribute("id")),t.setAttribute("aria-labelledby",e.getAttribute("id")))})}repositionIndicator(){const e=this.getActiveTab();if(!e)return;const t=e.clientWidth,i=e.clientHeight,s=this.localize.dir()==="rtl",c=this.getAllTabs(),w=c.slice(0,c.indexOf(e)).reduce((r,n)=>({left:r.left+n.clientWidth,top:r.top+n.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${t}px`,this.indicator.style.height="auto",this.indicator.style.translate=s?`${-1*w.left}px`:`${w.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${i}px`,this.indicator.style.translate=`0 ${w.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(e,t){let i=null;const s=t==="forward"?1:-1;let c=e+s;for(;e<this.tabs.length;){if(i=this.tabs[c]||null,i===null){t==="forward"?i=this.focusableTabs[0]:i=this.focusableTabs[this.focusableTabs.length-1];break}if(!i.disabled)break;c+=s}return i}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd())}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return this.localize.dir()==="rtl"?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons()}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(e){const t=this.tabs.find(i=>i.panel===e);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}render(){const e=this.localize.dir()==="rtl";return V`
      <div
        part="base"
        class=${te({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?V`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${te({"tab-group__scroll-button":!0,"tab-group__scroll-button--start":!0,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${e?"chevron-right":"chevron-left"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?V`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${te({"tab-group__scroll-button":!0,"tab-group__scroll-button--end":!0,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${e?"chevron-left":"chevron-right"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};Me.styles=[ie,Bl];Me.dependencies={"sl-icon-button":De,"sl-resize-observer":Ui};_([K(".tab-group")],Me.prototype,"tabGroup",2);_([K(".tab-group__body")],Me.prototype,"body",2);_([K(".tab-group__nav")],Me.prototype,"nav",2);_([K(".tab-group__indicator")],Me.prototype,"indicator",2);_([ee()],Me.prototype,"hasScrollControls",2);_([ee()],Me.prototype,"shouldHideScrollStartButton",2);_([ee()],Me.prototype,"shouldHideScrollEndButton",2);_([A()],Me.prototype,"placement",2);_([A()],Me.prototype,"activation",2);_([A({attribute:"no-scroll-controls",type:Boolean})],Me.prototype,"noScrollControls",2);_([A({attribute:"fixed-scroll-controls",type:Boolean})],Me.prototype,"fixedScrollControls",2);_([Ii({passive:!0})],Me.prototype,"updateScrollButtons",1);_([q("noScrollControls",{waitUntilFirstUpdate:!0})],Me.prototype,"updateScrollControls",1);_([q("placement",{waitUntilFirstUpdate:!0})],Me.prototype,"syncIndicator",1);Me.define("sl-tab-group");var zl=Q`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,vr=class extends J{constructor(){super(...arguments),this.effect="none"}render(){return V`
      <div
        part="base"
        class=${te({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};vr.styles=[ie,zl];_([A()],vr.prototype,"effect",2);vr.define("sl-skeleton");var Fl=Q`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function Li(e,t){function i(c){const m=e.getBoundingClientRect(),w=e.ownerDocument.defaultView,r=m.left+w.scrollX,n=m.top+w.scrollY,u=c.pageX-r,g=c.pageY-n;t!=null&&t.onMove&&t.onMove(u,g)}function s(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",s),t!=null&&t.onStop&&t.onStop()}document.addEventListener("pointermove",i,{passive:!0}),document.addEventListener("pointerup",s),(t==null?void 0:t.initialEvent)instanceof PointerEvent&&i(t.initialEvent)}var Zr=()=>null,Ge=class extends J{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new ce(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=!1,this.disabled=!1,this.snapValue="",this.snapFunction=Zr,this.snapThreshold=12}toSnapFunction(e){const t=e.split(" ");return({pos:i,size:s,snapThreshold:c,isRtl:m,vertical:w})=>{let r=i,n=Number.POSITIVE_INFINITY;return t.forEach(u=>{let g;if(u.startsWith("repeat(")){const f=e.substring(7,e.length-1),b=f.endsWith("%"),C=Number.parseFloat(f),S=b?s*(C/100):C;g=Math.round((m&&!w?s-i:i)/S)*S}else u.endsWith("%")?g=s*(Number.parseFloat(u)/100):g=Number.parseFloat(u);m&&!w&&(g=s-g);const l=Math.abs(i-g);l<=c&&l<n&&(r=g,n=l)}),r}}set snap(e){this.snapValue=e!=null?e:"",e?this.snapFunction=typeof e=="string"?this.toSnapFunction(e):e:this.snapFunction=Zr}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this)}detectSize(){const{width:e,height:t}=this.getBoundingClientRect();this.size=this.vertical?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){const t=this.localize.dir()==="rtl";this.disabled||(e.cancelable&&e.preventDefault(),Li(this,{onMove:(i,s)=>{var c;let m=this.vertical?s:i;this.primary==="end"&&(m=this.size-m),m=(c=this.snapFunction({pos:m,size:this.size,snapThreshold:this.snapThreshold,isRtl:t,vertical:this.vertical}))!=null?c:m,this.position=Ee(this.pixelsToPercentage(m),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(e.key)){let t=this.position;const i=(e.shiftKey?10:1)*(this.primary==="end"?-1:1);if(e.preventDefault(),(e.key==="ArrowLeft"&&!this.vertical||e.key==="ArrowUp"&&this.vertical)&&(t-=i),(e.key==="ArrowRight"&&!this.vertical||e.key==="ArrowDown"&&this.vertical)&&(t+=i),e.key==="Home"&&(t=this.primary==="end"?100:0),e.key==="End"&&(t=this.primary==="end"?0:100),e.key==="Enter")if(this.isCollapsed)t=this.positionBeforeCollapsing,this.isCollapsed=!1;else{const s=this.position;t=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=s})}this.position=Ee(t,0,100)}}handleResize(e){const{width:t,height:i}=e[0].contentRect;this.size=this.vertical?i:t,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){const e=this.vertical?"gridTemplateRows":"gridTemplateColumns",t=this.vertical?"gridTemplateColumns":"gridTemplateRows",i=this.localize.dir()==="rtl",s=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,c="auto";return this.primary==="end"?i&&!this.vertical?this.style[e]=`${s} var(--divider-width) ${c}`:this.style[e]=`${c} var(--divider-width) ${s}`:i&&!this.vertical?this.style[e]=`${c} var(--divider-width) ${s}`:this.style[e]=`${s} var(--divider-width) ${c}`,this.style[t]="",V`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${Y(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};Ge.styles=[ie,Fl];_([K(".divider")],Ge.prototype,"divider",2);_([A({type:Number,reflect:!0})],Ge.prototype,"position",2);_([A({attribute:"position-in-pixels",type:Number})],Ge.prototype,"positionInPixels",2);_([A({type:Boolean,reflect:!0})],Ge.prototype,"vertical",2);_([A({type:Boolean,reflect:!0})],Ge.prototype,"disabled",2);_([A()],Ge.prototype,"primary",2);_([A({reflect:!0})],Ge.prototype,"snap",1);_([A({type:Number,attribute:"snap-threshold"})],Ge.prototype,"snapThreshold",2);_([q("position")],Ge.prototype,"handlePositionChange",1);_([q("positionInPixels")],Ge.prototype,"handlePositionInPixelsChange",1);_([q("vertical")],Ge.prototype,"handleVerticalChange",1);Ge.define("sl-split-panel");var Hl=Q`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,ze=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasSlotController=new Ne(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(e){e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("help-text"),t=this.helpText?!0:!!e;return V`
      <div
        class=${te({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":t})}
      >
        <label
          part="base"
          class=${te({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${Y(this.value)}
            .checked=${Ut(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${t?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ze.styles=[ie,Vt,Hl];_([K('input[type="checkbox"]')],ze.prototype,"input",2);_([ee()],ze.prototype,"hasFocus",2);_([A()],ze.prototype,"title",2);_([A()],ze.prototype,"name",2);_([A()],ze.prototype,"value",2);_([A({reflect:!0})],ze.prototype,"size",2);_([A({type:Boolean,reflect:!0})],ze.prototype,"disabled",2);_([A({type:Boolean,reflect:!0})],ze.prototype,"checked",2);_([si("checked")],ze.prototype,"defaultChecked",2);_([A({reflect:!0})],ze.prototype,"form",2);_([A({type:Boolean,reflect:!0})],ze.prototype,"required",2);_([A({attribute:"help-text"})],ze.prototype,"helpText",2);_([q("checked",{waitUntilFirstUpdate:!0})],ze.prototype,"handleCheckedChange",1);_([q("disabled",{waitUntilFirstUpdate:!0})],ze.prototype,"handleDisabledChange",1);ze.define("sl-switch");Ui.define("sl-resize-observer");var Nl=Q`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class er extends zi{constructor(t){if(super(t),this.it=ve,t.type!==pt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ve||t==null)return this._t=void 0,this.it=t;if(t===Ke)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}er.directiveName="unsafeHTML",er.resultType=1;const rs=Pi(er);var ae=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ne(this,"help-text","label"),this.localize=new ce(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=!1,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=e=>V`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${t=>this.handleTagRemove(t,e)}
      >
        ${e.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{const t=e.target,i=t.closest(".select__clear")!==null,s=t.closest("sl-icon-button")!==null;if(!(i||s)){if(e.key==="Escape"&&this.open&&!this.closeWatcher&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){const c=this.getAllOptions(),m=c.indexOf(this.currentOption);let w=Math.max(0,m);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(w=m+1,w>c.length-1&&(w=0)):e.key==="ArrowUp"?(w=m-1,w<0&&(w=c.length-1)):e.key==="Home"?w=0:e.key==="End"&&(w=c.length-1),this.setCurrentOption(c[w])}if(e.key&&e.key.length===1||e.key==="Backspace"){const c=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(const m of c)if(m.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(m);break}}}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()}}get value(){return this._value}set value(e){this.multiple?e=Array.isArray(e)?e:e.split(" "):e=Array.isArray(e)?e.join(" "):e,this._value!==e&&(this.valueHasChanged=!0,this._value=e)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=!1}addOpenListeners(){var e;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var e;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(e=this.closeWatcher)==null||e.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(e){const i=e.composedPath().some(s=>s instanceof Element&&s.tagName.toLowerCase()==="sl-icon-button");this.disabled||i||(e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(e){e.key!=="Tab"&&(e.stopPropagation(),this.handleDocumentKeyDown(e))}handleClearClick(e){e.stopPropagation(),this.valueHasChanged=!0,this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){const i=e.target.closest("sl-option"),s=this.value;i&&!i.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(i):this.setSelectedOptions(i),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==s&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());const e=this.getAllOptions(),t=this.valueHasChanged?this.value:this.defaultValue,i=Array.isArray(t)?t:[t],s=[];e.forEach(c=>s.push(c.value)),this.setSelectedOptions(e.filter(c=>i.includes(c.value)))}handleTagRemove(e,t){e.stopPropagation(),this.valueHasChanged=!0,this.disabled||(this.toggleOptionSelection(t,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(e){this.getAllOptions().forEach(i=>{i.current=!1,i.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus())}setSelectedOptions(e){const t=this.getAllOptions(),i=Array.isArray(e)?e:[e];t.forEach(s=>s.selected=!1),i.length&&i.forEach(s=>s.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}selectionChanged(){var e,t,i;const s=this.getAllOptions();this.selectedOptions=s.filter(m=>m.selected);const c=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(m=>m.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const m=this.selectedOptions[0];this.value=(e=m==null?void 0:m.value)!=null?e:"",this.displayLabel=(i=(t=m==null?void 0:m.getTextLabel)==null?void 0:t.call(m))!=null?i:""}this.valueHasChanged=c,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){const i=this.getTag(e,t);return V`<div @sl-remove=${s=>this.handleTagRemove(s,e)}>
          ${typeof i=="string"?rs(i):i}
        </div>`}else if(t===this.maxOptionsVisible)return V`<sl-tag size=${this.size}>+${this.selectedOptions.length-t}</sl-tag>`;return V``})}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e==="value"){const s=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=s}}handleValueChange(){if(!this.valueHasChanged){const i=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=i}const e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(e.filter(i=>t.includes(i.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Ae(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:e,options:t}=_e(this,"select.show",{dir:this.localize.dir()});await Ce(this.popup.popup,e,t),this.currentOption&&Qs(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Ae(this);const{keyframes:e,options:t}=_e(this,"select.hide",{dir:this.localize.dir()});await Ce(this.popup.popup,e,t),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,He(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,He(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(e){this.valueInput.setCustomValidity(e),this.formControlController.updateValidity()}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,s=this.helpText?!0:!!t,c=this.clearable&&!this.disabled&&this.value.length>0,m=this.placeholder&&this.value&&this.value.length<=0;return V`
      <div
        part="form-control"
        class=${te({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${te({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":m,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?V`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${c?V`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ae.styles=[ie,Vt,Nl];ae.dependencies={"sl-icon":me,"sl-popup":pe,"sl-tag":$t};_([K(".select")],ae.prototype,"popup",2);_([K(".select__combobox")],ae.prototype,"combobox",2);_([K(".select__display-input")],ae.prototype,"displayInput",2);_([K(".select__value-input")],ae.prototype,"valueInput",2);_([K(".select__listbox")],ae.prototype,"listbox",2);_([ee()],ae.prototype,"hasFocus",2);_([ee()],ae.prototype,"displayLabel",2);_([ee()],ae.prototype,"currentOption",2);_([ee()],ae.prototype,"selectedOptions",2);_([ee()],ae.prototype,"valueHasChanged",2);_([A()],ae.prototype,"name",2);_([ee()],ae.prototype,"value",1);_([A({attribute:"value"})],ae.prototype,"defaultValue",2);_([A({reflect:!0})],ae.prototype,"size",2);_([A()],ae.prototype,"placeholder",2);_([A({type:Boolean,reflect:!0})],ae.prototype,"multiple",2);_([A({attribute:"max-options-visible",type:Number})],ae.prototype,"maxOptionsVisible",2);_([A({type:Boolean,reflect:!0})],ae.prototype,"disabled",2);_([A({type:Boolean})],ae.prototype,"clearable",2);_([A({type:Boolean,reflect:!0})],ae.prototype,"open",2);_([A({type:Boolean})],ae.prototype,"hoist",2);_([A({type:Boolean,reflect:!0})],ae.prototype,"filled",2);_([A({type:Boolean,reflect:!0})],ae.prototype,"pill",2);_([A()],ae.prototype,"label",2);_([A({reflect:!0})],ae.prototype,"placement",2);_([A({attribute:"help-text"})],ae.prototype,"helpText",2);_([A({reflect:!0})],ae.prototype,"form",2);_([A({type:Boolean,reflect:!0})],ae.prototype,"required",2);_([A()],ae.prototype,"getTag",2);_([q("disabled",{waitUntilFirstUpdate:!0})],ae.prototype,"handleDisabledChange",1);_([q(["defaultValue","value"],{waitUntilFirstUpdate:!0})],ae.prototype,"handleValueChange",1);_([q("open",{waitUntilFirstUpdate:!0})],ae.prototype,"handleOpenChange",1);ue("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});ue("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});ae.define("sl-select");Fi.define("sl-spinner");var Ul=Q`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,we=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this),this.hasSlotController=new Ne(this,"help-text","label"),this.localize=new ce(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=e=>e.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(e){this.input.style.setProperty("--percent",`${e*100}%`)}syncTooltip(e){if(this.output!==null){const t=this.input.offsetWidth,i=this.output.offsetWidth,s=getComputedStyle(this.input).getPropertyValue("--thumb-size"),c=this.localize.dir()==="rtl",m=t*e;if(c){const w=`${t-m}px + ${e} * ${s}`;this.output.style.translate=`calc((${w} - ${i/2}px - ${s} / 2))`}else{const w=`${m}px - ${e} * ${s}`;this.output.style.translate=`calc(${w} - ${i/2}px + ${s} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),this.tooltip!=="none"&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(e))}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}focus(e){this.input.focus(e)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,s=this.helpText?!0:!!t;return V`
      <div
        part="form-control"
        class=${te({"form-control":!0,"form-control--medium":!0,"form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${te({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${Y(this.name)}
              ?disabled=${this.disabled}
              min=${Y(this.min)}
              max=${Y(this.max)}
              step=${Y(this.step)}
              .value=${Ut(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?V`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};we.styles=[ie,Vt,Ul];_([K(".range__control")],we.prototype,"input",2);_([K(".range__tooltip")],we.prototype,"output",2);_([ee()],we.prototype,"hasFocus",2);_([ee()],we.prototype,"hasTooltip",2);_([A()],we.prototype,"title",2);_([A()],we.prototype,"name",2);_([A({type:Number})],we.prototype,"value",2);_([A()],we.prototype,"label",2);_([A({attribute:"help-text"})],we.prototype,"helpText",2);_([A({type:Boolean,reflect:!0})],we.prototype,"disabled",2);_([A({type:Number})],we.prototype,"min",2);_([A({type:Number})],we.prototype,"max",2);_([A({type:Number})],we.prototype,"step",2);_([A()],we.prototype,"tooltip",2);_([A({attribute:!1})],we.prototype,"tooltipFormatter",2);_([A({reflect:!0})],we.prototype,"form",2);_([si()],we.prototype,"defaultValue",2);_([Ii({passive:!0})],we.prototype,"handleThumbDragStart",1);_([q("value",{waitUntilFirstUpdate:!0})],we.prototype,"handleValueChange",1);_([q("disabled",{waitUntilFirstUpdate:!0})],we.prototype,"handleDisabledChange",1);_([q("hasTooltip",{waitUntilFirstUpdate:!0})],we.prototype,"syncRange",1);we.define("sl-range");var Wl=Q`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jo="important",Vl=" !"+Jo,We=Pi(class extends zi{constructor(e){var t;if(super(e),e.type!==pt.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const s=e[i];return s==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?i.removeProperty(s):i[s]=null);for(const s in t){const c=t[s];if(c!=null){this.ft.add(s);const m=typeof c=="string"&&c.endsWith(Vl);s.includes("-")||m?i.setProperty(s,m?c.slice(0,-11):c,m?Jo:""):i[s]=c}}return Ke}});var Fe=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(e){return this.getValueFromXCoordinate(e.clientX)}getValueFromTouchPosition(e){return this.getValueFromXCoordinate(e.touches[0].clientX)}getValueFromXCoordinate(e){const t=this.localize.dir()==="rtl",{left:i,right:s,width:c}=this.rating.getBoundingClientRect(),m=t?this.roundToPrecision((s-e)/c*this.max,this.precision):this.roundToPrecision((e-i)/c*this.max,this.precision);return Ee(m,0,this.max)}handleClick(e){this.disabled||(this.setValue(this.getValueFromMousePosition(e)),this.emit("sl-change"))}setValue(e){this.disabled||this.readonly||(this.value=e===this.value?0:e,this.isHovering=!1)}handleKeyDown(e){const t=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl",s=this.value;if(!(this.disabled||this.readonly)){if(e.key==="ArrowDown"||t&&e.key==="ArrowLeft"||i&&e.key==="ArrowRight"){const c=e.shiftKey?1:this.precision;this.value=Math.max(0,this.value-c),e.preventDefault()}if(e.key==="ArrowUp"||t&&e.key==="ArrowRight"||i&&e.key==="ArrowLeft"){const c=e.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+c),e.preventDefault()}e.key==="Home"&&(this.value=0,e.preventDefault()),e.key==="End"&&(this.value=this.max,e.preventDefault()),this.value!==s&&this.emit("sl-change")}}handleMouseEnter(e){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(e)}handleMouseMove(e){this.hoverValue=this.getValueFromMousePosition(e)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(e){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(e),e.preventDefault()}handleTouchMove(e){this.hoverValue=this.getValueFromTouchPosition(e)}handleTouchEnd(e){this.isHovering=!1,this.setValue(this.hoverValue),this.emit("sl-change"),e.preventDefault()}roundToPrecision(e,t=.5){const i=1/t;return Math.ceil(e*i)/i}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(e){this.rating.focus(e)}blur(){this.rating.blur()}render(){const e=this.localize.dir()==="rtl",t=Array.from(Array(this.max).keys());let i=0;return this.disabled||this.readonly?i=this.value:i=this.isHovering?this.hoverValue:this.value,V`
      <div
        part="base"
        class=${te({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":e})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${t.map(s=>i>s&&i<s+1?V`
                <span
                  class=${te({rating__symbol:!0,"rating__partial-symbol-container":!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===s+1})}
                  role="presentation"
                >
                  <div
                    style=${We({clipPath:e?`inset(0 ${(i-s)*100}% 0 0)`:`inset(0 0 0 ${(i-s)*100}%)`})}
                  >
                    ${rs(this.getSymbol(s+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${We({clipPath:e?`inset(0 0 0 ${100-(i-s)*100}%)`:`inset(0 ${100-(i-s)*100}% 0 0)`})}
                  >
                    ${rs(this.getSymbol(s+1))}
                  </div>
                </span>
              `:V`
              <span
                class=${te({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===s+1,"rating__symbol--active":i>=s+1})}
                role="presentation"
              >
                ${rs(this.getSymbol(s+1))}
              </span>
            `)}
        </span>
      </div>
    `}};Fe.styles=[ie,Wl];Fe.dependencies={"sl-icon":me};_([K(".rating")],Fe.prototype,"rating",2);_([ee()],Fe.prototype,"hoverValue",2);_([ee()],Fe.prototype,"isHovering",2);_([A()],Fe.prototype,"label",2);_([A({type:Number})],Fe.prototype,"value",2);_([A({type:Number})],Fe.prototype,"max",2);_([A({type:Number})],Fe.prototype,"precision",2);_([A({type:Boolean,reflect:!0})],Fe.prototype,"readonly",2);_([A({type:Boolean,reflect:!0})],Fe.prototype,"disabled",2);_([A()],Fe.prototype,"getSymbol",2);_([Ii({passive:!0})],Fe.prototype,"handleTouchMove",1);_([q("hoverValue")],Fe.prototype,"handleHoverValueChange",1);_([q("isHovering")],Fe.prototype,"handleIsHoveringChange",1);Fe.define("sl-rating");var jl=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],qt=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const e=new Date,t=new Date(this.date);if(isNaN(t.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const i=t.getTime()-e.getTime(),{unit:s,value:c}=jl.find(m=>Math.abs(i)<m.max);if(this.isoTime=t.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(i/c),s,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let m;s==="minute"?m=Yi("second"):s==="hour"?m=Yi("minute"):s==="day"?m=Yi("hour"):m=Yi("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),m)}return V` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};_([ee()],qt.prototype,"isoTime",2);_([ee()],qt.prototype,"relativeTime",2);_([A()],qt.prototype,"date",2);_([A()],qt.prototype,"format",2);_([A()],qt.prototype,"numeric",2);_([A({type:Boolean})],qt.prototype,"sync",2);function Yi(e){const i={second:1e3,minute:6e4,hour:36e5,day:864e5}[e];return i-Date.now()%i}qt.define("sl-relative-time");var Zo=Q`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,ql=Q`
  ${Zo}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`,at=class extends J{constructor(){super(...arguments),this.hasSlotController=new Ne(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){return ki`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${te({button:!0,"button--default":!0,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${Y(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};at.styles=[ie,ql];_([K(".button")],at.prototype,"input",2);_([K(".hidden-input")],at.prototype,"hiddenInput",2);_([ee()],at.prototype,"hasFocus",2);_([A({type:Boolean,reflect:!0})],at.prototype,"checked",2);_([A()],at.prototype,"value",2);_([A({type:Boolean,reflect:!0})],at.prototype,"disabled",2);_([A({reflect:!0})],at.prototype,"size",2);_([A({type:Boolean,reflect:!0})],at.prototype,"pill",2);_([q("disabled",{waitUntilFirstUpdate:!0})],at.prototype,"handleDisabledChange",1);at.define("sl-radio-button");var Kl=Q`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,Xl=Q`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,Kt=class extends J{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(e){const t=bi(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(e){const t=bi(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(e){const t=bi(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(e){const t=bi(e.target);t==null||t.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})];e.forEach(t=>{const i=e.indexOf(t),s=bi(t);s&&(s.toggleAttribute("data-sl-button-group__button",!0),s.toggleAttribute("data-sl-button-group__button--first",i===0),s.toggleAttribute("data-sl-button-group__button--inner",i>0&&i<e.length-1),s.toggleAttribute("data-sl-button-group__button--last",i===e.length-1),s.toggleAttribute("data-sl-button-group__button--radio",s.tagName.toLowerCase()==="sl-radio-button"))})}render(){return V`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Kt.styles=[ie,Xl];_([K("slot")],Kt.prototype,"defaultSlot",2);_([ee()],Kt.prototype,"disableRole",2);_([A()],Kt.prototype,"label",2);function bi(e){var t;const i="sl-button, sl-radio-button";return(t=e.closest(i))!=null?t:e.querySelector(i)}var Ie=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this),this.hasSlotController=new Ne(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){const e=this.required&&!this.value;return this.customValidityMessage!==""?On:e?Bn:fs}get validationMessage(){const e=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:e?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(e){const t=e.target.closest("sl-radio, sl-radio-button"),i=this.getAllRadios(),s=this.value;!t||t.disabled||(this.value=t.value,i.forEach(c=>c.checked=c===t),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(e){var t;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))return;const i=this.getAllRadios().filter(r=>!r.disabled),s=(t=i.find(r=>r.checked))!=null?t:i[0],c=e.key===" "?0:["ArrowUp","ArrowLeft"].includes(e.key)?-1:1,m=this.value;let w=i.indexOf(s)+c;w<0&&(w=i.length-1),w>i.length-1&&(w=0),this.getAllRadios().forEach(r=>{r.checked=!1,this.hasButtonGroup||r.setAttribute("tabindex","-1")}),this.value=i[w].value,i[w].checked=!0,this.hasButtonGroup?i[w].shadowRoot.querySelector("button").focus():(i[w].setAttribute("tabindex","0"),i[w].focus()),this.value!==m&&(this.emit("sl-change"),this.emit("sl-input")),e.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}async syncRadioElements(){var e,t;const i=this.getAllRadios();if(await Promise.all(i.map(async s=>{await s.updateComplete,s.checked=s.value===this.value,s.size=this.size})),this.hasButtonGroup=i.some(s=>s.tagName.toLowerCase()==="sl-radio-button"),i.length>0&&!i.some(s=>s.checked))if(this.hasButtonGroup){const s=(e=i[0].shadowRoot)==null?void 0:e.querySelector("button");s&&s.setAttribute("tabindex","0")}else i[0].setAttribute("tabindex","0");if(this.hasButtonGroup){const s=(t=this.shadowRoot)==null?void 0:t.querySelector("sl-button-group");s&&(s.disableRole=!0)}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios())}updateCheckedRadio(){this.getAllRadios().forEach(t=>t.checked=t.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const e=this.required&&!this.value,t=this.customValidityMessage!=="";return e||t?(this.formControlController.emitInvalidEvent(),!1):!0}getForm(){return this.formControlController.getForm()}reportValidity(){const e=this.validity.valid;return this.errorMessage=this.customValidityMessage||e?"":this.validationInput.validationMessage,this.formControlController.setValidity(e),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),e||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),e}setCustomValidity(e=""){this.customValidityMessage=e,this.errorMessage=e,this.validationInput.setCustomValidity(e),this.formControlController.updateValidity()}focus(e){const t=this.getAllRadios(),i=t.find(m=>m.checked),s=t.find(m=>!m.disabled),c=i||s;c&&c.focus(e)}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,s=this.helpText?!0:!!t,c=V`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return V`
      <fieldset
        part="form-control"
        class=${te({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":!0,"form-control--has-label":i,"form-control--has-help-text":s})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?V`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${c}
                </sl-button-group>
              `:c}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};Ie.styles=[ie,Vt,Kl];Ie.dependencies={"sl-button-group":Kt};_([K("slot:not([name])")],Ie.prototype,"defaultSlot",2);_([K(".radio-group__validation-input")],Ie.prototype,"validationInput",2);_([ee()],Ie.prototype,"hasButtonGroup",2);_([ee()],Ie.prototype,"errorMessage",2);_([ee()],Ie.prototype,"defaultValue",2);_([A()],Ie.prototype,"label",2);_([A({attribute:"help-text"})],Ie.prototype,"helpText",2);_([A()],Ie.prototype,"name",2);_([A({reflect:!0})],Ie.prototype,"value",2);_([A({reflect:!0})],Ie.prototype,"size",2);_([A({reflect:!0})],Ie.prototype,"form",2);_([A({type:Boolean,reflect:!0})],Ie.prototype,"required",2);_([q("size",{waitUntilFirstUpdate:!0})],Ie.prototype,"handleSizeChange",1);_([q("value")],Ie.prototype,"handleValueChange",1);Ie.define("sl-radio-group");var Gl=Q`
  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-width: var(--track-width);
    --indicator-color: var(--sl-color-primary-600);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`,ai=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.value=0,this.label=""}updated(e){if(super.updated(e),e.has("value")){const t=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),i=2*Math.PI*t,s=i-this.value/100*i;this.indicatorOffset=`${s}px`}}render(){return V`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <slot id="label" part="label" class="progress-ring__label"></slot>
      </div>
    `}};ai.styles=[ie,Gl];_([K(".progress-ring__indicator")],ai.prototype,"indicator",2);_([ee()],ai.prototype,"indicatorOffset",2);_([A({type:Number,reflect:!0})],ai.prototype,"value",2);_([A()],ai.prototype,"label",2);ai.define("sl-progress-ring");var Yl=Q`
  :host {
    display: inline-block;
  }
`;let Qo=null;class en{}en.render=function(e,t){Qo(e,t)};self.QrCreator=en;(function(e){function t(r,n,u,g){var l={},f=e(u,n);f.u(r),f.J(),g=g||0;var b=f.h(),C=f.h()+2*g;return l.text=r,l.level=n,l.version=u,l.O=C,l.a=function(S,o){return S-=g,o-=g,0>S||S>=b||0>o||o>=b?!1:f.a(S,o)},l}function i(r,n,u,g,l,f,b,C,S,o){function d(a,h,p,v,x,E,y){a?(r.lineTo(h+E,p+y),r.arcTo(h,p,v,x,f)):r.lineTo(h,p)}b?r.moveTo(n+f,u):r.moveTo(n,u),d(C,g,u,g,l,-f,0),d(S,g,l,n,l,0,-f),d(o,n,l,n,u,f,0),d(b,n,u,g,u,0,f)}function s(r,n,u,g,l,f,b,C,S,o){function d(a,h,p,v){r.moveTo(a+p,h),r.lineTo(a,h),r.lineTo(a,h+v),r.arcTo(a,h,a+p,h,f)}b&&d(n,u,f,f),C&&d(g,u,-f,f),S&&d(g,l,-f,-f),o&&d(n,l,f,-f)}function c(r,n){var u=n.fill;if(typeof u=="string")r.fillStyle=u;else{var g=u.type,l=u.colorStops;if(u=u.position.map(b=>Math.round(b*n.size)),g==="linear-gradient")var f=r.createLinearGradient.apply(r,u);else if(g==="radial-gradient")f=r.createRadialGradient.apply(r,u);else throw Error("Unsupported fill");l.forEach(([b,C])=>{f.addColorStop(b,C)}),r.fillStyle=f}}function m(r,n){e:{var u=n.text,g=n.v,l=n.N,f=n.K,b=n.P;for(l=Math.max(1,l||1),f=Math.min(40,f||40);l<=f;l+=1)try{var C=t(u,g,l,b);break e}catch{}C=void 0}if(!C)return null;for(u=r.getContext("2d"),n.background&&(u.fillStyle=n.background,u.fillRect(n.left,n.top,n.size,n.size)),g=C.O,f=n.size/g,u.beginPath(),b=0;b<g;b+=1)for(l=0;l<g;l+=1){var S=u,o=n.left+l*f,d=n.top+b*f,a=b,h=l,p=C.a,v=o+f,x=d+f,E=a-1,y=a+1,k=h-1,T=h+1,B=Math.floor(Math.min(.5,Math.max(0,n.R))*f),R=p(a,h),O=p(E,k),z=p(E,h);E=p(E,T);var F=p(a,T);T=p(y,T),h=p(y,h),y=p(y,k),a=p(a,k),o=Math.round(o),d=Math.round(d),v=Math.round(v),x=Math.round(x),R?i(S,o,d,v,x,B,!z&&!a,!z&&!F,!h&&!F,!h&&!a):s(S,o,d,v,x,B,z&&a&&O,z&&F&&E,h&&F&&T,h&&a&&y)}return c(u,n),u.fill(),r}var w={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Qo=function(r,n){var u={};Object.assign(u,w,r),u.N=u.minVersion,u.K=u.maxVersion,u.v=u.ecLevel,u.left=u.left,u.top=u.top,u.size=u.size,u.fill=u.fill,u.background=u.background,u.text=u.text,u.R=u.radius,u.P=u.quiet,n instanceof HTMLCanvasElement?((n.width!==u.size||n.height!==u.size)&&(n.width=u.size,n.height=u.size),n.getContext("2d").clearRect(0,0,n.width,n.height),m(n,u)):(r=document.createElement("canvas"),r.width=u.size,r.height=u.size,u=m(r,u),n.appendChild(u))}})(function(){function e(n){var u=i.s(n);return{S:function(){return 4},b:function(){return u.length},write:function(g){for(var l=0;l<u.length;l+=1)g.put(u[l],8)}}}function t(){var n=[],u=0,g={B:function(){return n},c:function(l){return(n[Math.floor(l/8)]>>>7-l%8&1)==1},put:function(l,f){for(var b=0;b<f;b+=1)g.m((l>>>f-b-1&1)==1)},f:function(){return u},m:function(l){var f=Math.floor(u/8);n.length<=f&&n.push(0),l&&(n[f]|=128>>>u%8),u+=1}};return g}function i(n,u){function g(a,h){for(var p=-1;7>=p;p+=1)if(!(-1>=a+p||C<=a+p))for(var v=-1;7>=v;v+=1)-1>=h+v||C<=h+v||(b[a+p][h+v]=0<=p&&6>=p&&(v==0||v==6)||0<=v&&6>=v&&(p==0||p==6)||2<=p&&4>=p&&2<=v&&4>=v)}function l(a,h){for(var p=C=4*n+17,v=Array(p),x=0;x<p;x+=1){v[x]=Array(p);for(var E=0;E<p;E+=1)v[x][E]=null}for(b=v,g(0,0),g(C-7,0),g(0,C-7),p=m.G(n),v=0;v<p.length;v+=1)for(x=0;x<p.length;x+=1){E=p[v];var y=p[x];if(b[E][y]==null)for(var k=-2;2>=k;k+=1)for(var T=-2;2>=T;T+=1)b[E+k][y+T]=k==-2||k==2||T==-2||T==2||k==0&&T==0}for(p=8;p<C-8;p+=1)b[p][6]==null&&(b[p][6]=p%2==0);for(p=8;p<C-8;p+=1)b[6][p]==null&&(b[6][p]=p%2==0);for(p=m.w(f<<3|h),v=0;15>v;v+=1)x=!a&&(p>>v&1)==1,b[6>v?v:8>v?v+1:C-15+v][8]=x,b[8][8>v?C-v-1:9>v?15-v:14-v]=x;if(b[C-8][8]=!a,7<=n){for(p=m.A(n),v=0;18>v;v+=1)x=!a&&(p>>v&1)==1,b[Math.floor(v/3)][v%3+C-8-3]=x;for(v=0;18>v;v+=1)x=!a&&(p>>v&1)==1,b[v%3+C-8-3][Math.floor(v/3)]=x}if(S==null){for(a=r.I(n,f),p=t(),v=0;v<o.length;v+=1)x=o[v],p.put(4,4),p.put(x.b(),m.f(4,n)),x.write(p);for(v=x=0;v<a.length;v+=1)x+=a[v].j;if(p.f()>8*x)throw Error("code length overflow. ("+p.f()+">"+8*x+")");for(p.f()+4<=8*x&&p.put(0,4);p.f()%8!=0;)p.m(!1);for(;!(p.f()>=8*x)&&(p.put(236,8),!(p.f()>=8*x));)p.put(17,8);var B=0;for(x=v=0,E=Array(a.length),y=Array(a.length),k=0;k<a.length;k+=1){var R=a[k].j,O=a[k].o-R;for(v=Math.max(v,R),x=Math.max(x,O),E[k]=Array(R),T=0;T<E[k].length;T+=1)E[k][T]=255&p.B()[T+B];for(B+=R,T=m.C(O),R=s(E[k],T.b()-1).l(T),y[k]=Array(T.b()-1),T=0;T<y[k].length;T+=1)O=T+R.b()-y[k].length,y[k][T]=0<=O?R.c(O):0}for(T=p=0;T<a.length;T+=1)p+=a[T].o;for(p=Array(p),T=B=0;T<v;T+=1)for(k=0;k<a.length;k+=1)T<E[k].length&&(p[B]=E[k][T],B+=1);for(T=0;T<x;T+=1)for(k=0;k<a.length;k+=1)T<y[k].length&&(p[B]=y[k][T],B+=1);S=p}for(a=S,p=-1,v=C-1,x=7,E=0,h=m.F(h),y=C-1;0<y;y-=2)for(y==6&&--y;;){for(k=0;2>k;k+=1)b[v][y-k]==null&&(T=!1,E<a.length&&(T=(a[E]>>>x&1)==1),h(v,y-k)&&(T=!T),b[v][y-k]=T,--x,x==-1&&(E+=1,x=7));if(v+=p,0>v||C<=v){v-=p,p=-p;break}}}var f=c[u],b=null,C=0,S=null,o=[],d={u:function(a){a=e(a),o.push(a),S=null},a:function(a,h){if(0>a||C<=a||0>h||C<=h)throw Error(a+","+h);return b[a][h]},h:function(){return C},J:function(){for(var a=0,h=0,p=0;8>p;p+=1){l(!0,p);var v=m.D(d);(p==0||a>v)&&(a=v,h=p)}l(!1,h)}};return d}function s(n,u){if(typeof n.length>"u")throw Error(n.length+"/"+u);var g=function(){for(var f=0;f<n.length&&n[f]==0;)f+=1;for(var b=Array(n.length-f+u),C=0;C<n.length-f;C+=1)b[C]=n[C+f];return b}(),l={c:function(f){return g[f]},b:function(){return g.length},multiply:function(f){for(var b=Array(l.b()+f.b()-1),C=0;C<l.b();C+=1)for(var S=0;S<f.b();S+=1)b[C+S]^=w.i(w.g(l.c(C))+w.g(f.c(S)));return s(b,0)},l:function(f){if(0>l.b()-f.b())return l;for(var b=w.g(l.c(0))-w.g(f.c(0)),C=Array(l.b()),S=0;S<l.b();S+=1)C[S]=l.c(S);for(S=0;S<f.b();S+=1)C[S]^=w.i(w.g(f.c(S))+b);return s(C,0).l(f)}};return l}i.s=function(n){for(var u=[],g=0;g<n.length;g++){var l=n.charCodeAt(g);128>l?u.push(l):2048>l?u.push(192|l>>6,128|l&63):55296>l||57344<=l?u.push(224|l>>12,128|l>>6&63,128|l&63):(g++,l=65536+((l&1023)<<10|n.charCodeAt(g)&1023),u.push(240|l>>18,128|l>>12&63,128|l>>6&63,128|l&63))}return u};var c={L:1,M:0,Q:3,H:2},m=function(){function n(l){for(var f=0;l!=0;)f+=1,l>>>=1;return f}var u=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],g={w:function(l){for(var f=l<<10;0<=n(f)-n(1335);)f^=1335<<n(f)-n(1335);return(l<<10|f)^21522},A:function(l){for(var f=l<<12;0<=n(f)-n(7973);)f^=7973<<n(f)-n(7973);return l<<12|f},G:function(l){return u[l-1]},F:function(l){switch(l){case 0:return function(f,b){return(f+b)%2==0};case 1:return function(f){return f%2==0};case 2:return function(f,b){return b%3==0};case 3:return function(f,b){return(f+b)%3==0};case 4:return function(f,b){return(Math.floor(f/2)+Math.floor(b/3))%2==0};case 5:return function(f,b){return f*b%2+f*b%3==0};case 6:return function(f,b){return(f*b%2+f*b%3)%2==0};case 7:return function(f,b){return(f*b%3+(f+b)%2)%2==0};default:throw Error("bad maskPattern:"+l)}},C:function(l){for(var f=s([1],0),b=0;b<l;b+=1)f=f.multiply(s([1,w.i(b)],0));return f},f:function(l,f){if(l!=4||1>f||40<f)throw Error("mode: "+l+"; type: "+f);return 10>f?8:16},D:function(l){for(var f=l.h(),b=0,C=0;C<f;C+=1)for(var S=0;S<f;S+=1){for(var o=0,d=l.a(C,S),a=-1;1>=a;a+=1)if(!(0>C+a||f<=C+a))for(var h=-1;1>=h;h+=1)0>S+h||f<=S+h||(a!=0||h!=0)&&d==l.a(C+a,S+h)&&(o+=1);5<o&&(b+=3+o-5)}for(C=0;C<f-1;C+=1)for(S=0;S<f-1;S+=1)o=0,l.a(C,S)&&(o+=1),l.a(C+1,S)&&(o+=1),l.a(C,S+1)&&(o+=1),l.a(C+1,S+1)&&(o+=1),(o==0||o==4)&&(b+=3);for(C=0;C<f;C+=1)for(S=0;S<f-6;S+=1)l.a(C,S)&&!l.a(C,S+1)&&l.a(C,S+2)&&l.a(C,S+3)&&l.a(C,S+4)&&!l.a(C,S+5)&&l.a(C,S+6)&&(b+=40);for(S=0;S<f;S+=1)for(C=0;C<f-6;C+=1)l.a(C,S)&&!l.a(C+1,S)&&l.a(C+2,S)&&l.a(C+3,S)&&l.a(C+4,S)&&!l.a(C+5,S)&&l.a(C+6,S)&&(b+=40);for(S=o=0;S<f;S+=1)for(C=0;C<f;C+=1)l.a(C,S)&&(o+=1);return b+=Math.abs(100*o/f/f-50)/5*10}};return g}(),w=function(){for(var n=Array(256),u=Array(256),g=0;8>g;g+=1)n[g]=1<<g;for(g=8;256>g;g+=1)n[g]=n[g-4]^n[g-5]^n[g-6]^n[g-8];for(g=0;255>g;g+=1)u[n[g]]=g;return{g:function(l){if(1>l)throw Error("glog("+l+")");return u[l]},i:function(l){for(;0>l;)l+=255;for(;256<=l;)l-=255;return n[l]}}}(),r=function(){function n(l,f){switch(f){case c.L:return u[4*(l-1)];case c.M:return u[4*(l-1)+1];case c.Q:return u[4*(l-1)+2];case c.H:return u[4*(l-1)+3]}}var u=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],g={I:function(l,f){var b=n(l,f);if(typeof b>"u")throw Error("bad rs block @ typeNumber:"+l+"/errorCorrectLevel:"+f);l=b.length/3,f=[];for(var C=0;C<l;C+=1)for(var S=b[3*C],o=b[3*C+1],d=b[3*C+2],a=0;a<S;a+=1){var h=d,p={};p.o=o,p.j=h,f.push(p)}return f}};return g}();return i}());const Jl=QrCreator;var lt=class extends J{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){!this.hasUpdated||Jl.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:this.size*2},this.canvas)}render(){var e;return V`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((e=this.label)==null?void 0:e.length)>0?this.label:this.value}
        style=${We({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};lt.styles=[ie,Yl];_([K("canvas")],lt.prototype,"canvas",2);_([A()],lt.prototype,"value",2);_([A()],lt.prototype,"label",2);_([A({type:Number})],lt.prototype,"size",2);_([A()],lt.prototype,"fill",2);_([A()],lt.prototype,"background",2);_([A({type:Number})],lt.prototype,"radius",2);_([A({attribute:"error-correction"})],lt.prototype,"errorCorrection",2);_([q(["background","errorCorrection","fill","radius","size","value"])],lt.prototype,"generate",1);lt.define("sl-qr-code");var Zl=Q`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`,vt=class extends J{constructor(){super(),this.checked=!1,this.hasFocus=!1,this.size="medium",this.disabled=!1,this.handleBlur=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=!0)},this.handleFocus=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return V`
      <span
        part="base"
        class=${te({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":this.size==="small","radio--medium":this.size==="medium","radio--large":this.size==="large"})}
      >
        <span part="${`control${this.checked?" control--checked":""}`}" class="radio__control">
          ${this.checked?V` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};vt.styles=[ie,Zl];vt.dependencies={"sl-icon":me};_([ee()],vt.prototype,"checked",2);_([ee()],vt.prototype,"hasFocus",2);_([A()],vt.prototype,"value",2);_([A({reflect:!0})],vt.prototype,"size",2);_([A({type:Boolean,reflect:!0})],vt.prototype,"disabled",2);_([q("checked")],vt.prototype,"handleCheckedChange",1);_([q("disabled",{waitUntilFirstUpdate:!0})],vt.prototype,"handleDisabledChange",1);vt.define("sl-radio");var Ql=Q`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,it=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.isInitialized=!1,this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{const e=this.closest("sl-select");e&&e.handleDefaultSlotChange()}):this.isInitialized=!0}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const e=this.childNodes;let t="";return[...e].forEach(i=>{i.nodeType===Node.ELEMENT_NODE&&(i.hasAttribute("slot")||(t+=i.textContent)),i.nodeType===Node.TEXT_NODE&&(t+=i.textContent)}),t.trim()}render(){return V`
      <div
        part="base"
        class=${te({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};it.styles=[ie,Ql];it.dependencies={"sl-icon":me};_([K(".option__label")],it.prototype,"defaultSlot",2);_([ee()],it.prototype,"current",2);_([ee()],it.prototype,"selected",2);_([ee()],it.prototype,"hasHover",2);_([A({reflect:!0})],it.prototype,"value",2);_([A({type:Boolean,reflect:!0})],it.prototype,"disabled",2);_([q("disabled")],it.prototype,"handleDisabledChange",1);_([q("selected")],it.prototype,"handleSelectedChange",1);_([q("value")],it.prototype,"handleValueChange",1);it.define("sl-option");pe.define("sl-popup");var ec=Q`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`,Wi=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return V`
      <div
        part="base"
        class=${te({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":this.localize.dir()==="rtl"})}
        role="progressbar"
        title=${Y(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${We({width:`${this.value}%`})}>
          ${this.indeterminate?"":V` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};Wi.styles=[ie,ec];_([A({type:Number,reflect:!0})],Wi.prototype,"value",2);_([A({type:Boolean,reflect:!0})],Wi.prototype,"indeterminate",2);_([A()],Wi.prototype,"label",2);Wi.define("sl-progress-bar");var tc=Q`
  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
    -webkit-user-select: none;
  }
`,tn=class extends J{render(){return V` <slot part="base" class="menu-label"></slot> `}};tn.styles=[ie,tc];tn.define("sl-menu-label");var ic=Q`
  :host {
    display: contents;
  }
`,_t=class extends J{constructor(){super(...arguments),this.attrOldValue=!1,this.charData=!1,this.charDataOldValue=!1,this.childList=!1,this.disabled=!1,this.handleMutation=e=>{this.emit("sl-mutation",{detail:{mutationList:e}})}}connectedCallback(){super.connectedCallback(),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){const e=typeof this.attr=="string"&&this.attr.length>0,t=e&&this.attr!=="*"?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:!0,childList:this.childList,attributes:e,attributeFilter:t,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch{}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return V` <slot></slot> `}};_t.styles=[ie,ic];_([A({reflect:!0})],_t.prototype,"attr",2);_([A({attribute:"attr-old-value",type:Boolean,reflect:!0})],_t.prototype,"attrOldValue",2);_([A({attribute:"char-data",type:Boolean,reflect:!0})],_t.prototype,"charData",2);_([A({attribute:"char-data-old-value",type:Boolean,reflect:!0})],_t.prototype,"charDataOldValue",2);_([A({attribute:"child-list",type:Boolean,reflect:!0})],_t.prototype,"childList",2);_([A({type:Boolean,reflect:!0})],_t.prototype,"disabled",2);_([q("disabled")],_t.prototype,"handleDisabledChange",1);_([q("attr",{waitUntilFirstUpdate:!0}),q("attr-old-value",{waitUntilFirstUpdate:!0}),q("char-data",{waitUntilFirstUpdate:!0}),q("char-data-old-value",{waitUntilFirstUpdate:!0}),q("childList",{waitUntilFirstUpdate:!0})],_t.prototype,"handleChange",1);_t.define("sl-mutation-observer");var sc=Q`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,oe=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ne(this,"help-text","label"),this.localize=new ce(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var e;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((e=this.input)==null?void 0:e.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value}get valueAsNumber(){var e;return this.__numberInput.value=this.value,((e=this.input)==null?void 0:e.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleKeyDown(e){const t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!t&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,i="none"){this.input.setSelectionRange(e,t,i)}setRangeText(e,t,i,s="preserve"){const c=t!=null?t:this.input.selectionStart,m=i!=null?i:this.input.selectionEnd;this.input.setRangeText(e,c,m,s),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,s=this.helpText?!0:!!t,m=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return V`
      <div
        part="form-control"
        class=${te({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${te({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${Y(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Y(this.placeholder)}
              minlength=${Y(this.minlength)}
              maxlength=${Y(this.maxlength)}
              min=${Y(this.min)}
              max=${Y(this.max)}
              step=${Y(this.step)}
              .value=${Ut(this.value)}
              autocapitalize=${Y(this.autocapitalize)}
              autocomplete=${Y(this.autocomplete)}
              autocorrect=${Y(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${Y(this.pattern)}
              enterkeyhint=${Y(this.enterkeyhint)}
              inputmode=${Y(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${m?V`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?V`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?V`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:V`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};oe.styles=[ie,Vt,sc];oe.dependencies={"sl-icon":me};_([K(".input__control")],oe.prototype,"input",2);_([ee()],oe.prototype,"hasFocus",2);_([A()],oe.prototype,"title",2);_([A({reflect:!0})],oe.prototype,"type",2);_([A()],oe.prototype,"name",2);_([A()],oe.prototype,"value",2);_([si()],oe.prototype,"defaultValue",2);_([A({reflect:!0})],oe.prototype,"size",2);_([A({type:Boolean,reflect:!0})],oe.prototype,"filled",2);_([A({type:Boolean,reflect:!0})],oe.prototype,"pill",2);_([A()],oe.prototype,"label",2);_([A({attribute:"help-text"})],oe.prototype,"helpText",2);_([A({type:Boolean})],oe.prototype,"clearable",2);_([A({type:Boolean,reflect:!0})],oe.prototype,"disabled",2);_([A()],oe.prototype,"placeholder",2);_([A({type:Boolean,reflect:!0})],oe.prototype,"readonly",2);_([A({attribute:"password-toggle",type:Boolean})],oe.prototype,"passwordToggle",2);_([A({attribute:"password-visible",type:Boolean})],oe.prototype,"passwordVisible",2);_([A({attribute:"no-spin-buttons",type:Boolean})],oe.prototype,"noSpinButtons",2);_([A({reflect:!0})],oe.prototype,"form",2);_([A({type:Boolean,reflect:!0})],oe.prototype,"required",2);_([A()],oe.prototype,"pattern",2);_([A({type:Number})],oe.prototype,"minlength",2);_([A({type:Number})],oe.prototype,"maxlength",2);_([A()],oe.prototype,"min",2);_([A()],oe.prototype,"max",2);_([A()],oe.prototype,"step",2);_([A()],oe.prototype,"autocapitalize",2);_([A()],oe.prototype,"autocorrect",2);_([A()],oe.prototype,"autocomplete",2);_([A({type:Boolean})],oe.prototype,"autofocus",2);_([A()],oe.prototype,"enterkeyhint",2);_([A({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],oe.prototype,"spellcheck",2);_([A()],oe.prototype,"inputmode",2);_([q("disabled",{waitUntilFirstUpdate:!0})],oe.prototype,"handleDisabledChange",1);_([q("step",{waitUntilFirstUpdate:!0})],oe.prototype,"handleStepChange",1);_([q("value",{waitUntilFirstUpdate:!0})],oe.prototype,"handleValueChange",1);oe.define("sl-input");var rc=Q`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,_r=class extends J{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(e){const t=["menuitem","menuitemcheckbox"],i=e.composedPath(),s=i.find(r=>{var n;return t.includes(((n=r==null?void 0:r.getAttribute)==null?void 0:n.call(r,"role"))||"")});if(!s||i.find(r=>{var n;return((n=r==null?void 0:r.getAttribute)==null?void 0:n.call(r,"role"))==="menu"})!==this)return;const w=s;w.type==="checkbox"&&(w.checked=!w.checked),this.emit("sl-select",{detail:{item:w}})}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){const t=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),t==null||t.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const t=this.getAllItems(),i=this.getCurrentItem();let s=i?t.indexOf(i):0;t.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?s++:e.key==="ArrowUp"?s--:e.key==="Home"?s=0:e.key==="End"&&(s=t.length-1),s<0&&(s=t.length-1),s>t.length-1&&(s=0),this.setCurrentItem(t[s]),t[s].focus())}}handleMouseDown(e){const t=e.target;this.isMenuItem(t)&&this.setCurrentItem(t)}handleSlotChange(){const e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0])}isMenuItem(e){var t;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((t=e.getAttribute("role"))!=null?t:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(i=>{i.setAttribute("tabindex",i===e?"0":"-1")})}render(){return V`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};_r.styles=[ie,rc];_([K("slot")],_r.prototype,"defaultSlot",2);_r.define("sl-menu");var oc=Q`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Di=(e,t)=>{var s;const i=e._$AN;if(i===void 0)return!1;for(const c of i)(s=c._$AO)==null||s.call(c,t,!1),Di(c,t);return!0},ds=e=>{let t,i;do{if((t=e._$AM)===void 0)break;i=t._$AN,i.delete(e),e=t}while((i==null?void 0:i.size)===0)},sn=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),lc(t)}};function nc(e){this._$AN!==void 0?(ds(this),this._$AM=e,sn(this)):this._$AM=e}function ac(e,t=!1,i=0){const s=this._$AH,c=this._$AN;if(c!==void 0&&c.size!==0)if(t)if(Array.isArray(s))for(let m=i;m<s.length;m++)Di(s[m],!1),ds(s[m]);else s!=null&&(Di(s,!1),ds(s));else Di(this,e)}const lc=e=>{var t,i;e.type==pt.CHILD&&((t=e._$AP)!=null||(e._$AP=ac),(i=e._$AQ)!=null||(e._$AQ=nc))};class cc extends zi{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,s){super._$AT(t,i,s),sn(this),this.isConnected=t._$AU}_$AO(t,i=!0){var s,c;t!==this.isConnected&&(this.isConnected=t,t?(s=this.reconnected)==null||s.call(this):(c=this.disconnected)==null||c.call(this)),i&&(Di(this,t),ds(this))}setValue(t){if(Oo(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hc=()=>new dc;class dc{}const Fs=new WeakMap,uc=Pi(class extends cc{render(e){return ve}update(e,[t]){var s;const i=t!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=(s=e.options)==null?void 0:s.host,this.rt(this.ct=e.element)),ve}rt(e){var t;if(this.isConnected||(e=void 0),typeof this.G=="function"){const i=(t=this.ht)!=null?t:globalThis;let s=Fs.get(i);s===void 0&&(s=new WeakMap,Fs.set(i,s)),s.get(this.G)!==void 0&&this.G.call(this.ht,void 0),s.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t,i;return typeof this.G=="function"?(t=Fs.get((e=this.ht)!=null?e:globalThis))==null?void 0:t.get(this.G):(i=this.G)==null?void 0:i.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var pc=class{constructor(e,t){this.popupRef=hc(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=i=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${i.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${i.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=i=>{switch(i.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":i.target!==this.host&&(i.preventDefault(),i.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(i);break}},this.handleClick=i=>{var s;i.target===this.host?(i.preventDefault(),i.stopPropagation()):i.target instanceof Element&&(i.target.tagName==="sl-menu-item"||((s=i.target.role)==null?void 0:s.startsWith("menuitem")))&&this.disableSubmenu()},this.handleFocusOut=i=>{i.relatedTarget&&i.relatedTarget instanceof Element&&this.host.contains(i.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=i=>{i.stopPropagation()},this.handlePopupReposition=()=>{const i=this.host.renderRoot.querySelector("slot[name='submenu']"),s=i==null?void 0:i.assignedElements({flatten:!0}).filter(u=>u.localName==="sl-menu")[0],c=getComputedStyle(this.host).direction==="rtl";if(!s)return;const{left:m,top:w,width:r,height:n}=s.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${c?m+r:m}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${w}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${c?m+r:m}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${w+n}px`)},(this.host=e).addController(this),this.hasSlotController=t}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(e){const t=this.host.renderRoot.querySelector("slot[name='submenu']");if(!t){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let i=null;for(const s of t.assignedElements())if(i=s.querySelectorAll("sl-menu-item, [role^='menuitem']"),i.length!==0)break;if(!(!i||i.length===0)){i[0].setAttribute("tabindex","0");for(let s=1;s!==i.length;++s)i[s].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?i[0]instanceof HTMLElement&&i[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{i[0]instanceof HTMLElement&&i[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate())}enableSubmenu(e=!0){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;const t=this.host.parentElement.computedStyleMap(),s=["padding-top","border-top-width","margin-top"].reduce((c,m)=>{var w;const r=(w=t.get(m))!=null?w:new CSSUnitValue(0,"px"),u=(r instanceof CSSUnitValue?r:new CSSUnitValue(0,"px")).to("px");return c-u.value},0);this.skidding=s}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?V`
      <sl-popup
        ${uc(this.popupRef)}
        placement=${e?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:V` <slot name="submenu" hidden></slot> `}},Ye=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new Ne(this,"submenu"),this.submenuController=new pc(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleMouseOver=e=>{this.focus(),e.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return ia(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const e=this.localize.dir()==="rtl",t=this.submenuController.isExpanded();return V`
      <div
        id="anchor"
        part="base"
        class=${te({"menu-item":!0,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":t})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!t}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${e?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?V` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};Ye.styles=[ie,oc];Ye.dependencies={"sl-icon":me,"sl-popup":pe,"sl-spinner":Fi};_([K("slot:not([name])")],Ye.prototype,"defaultSlot",2);_([K(".menu-item")],Ye.prototype,"menuItem",2);_([A()],Ye.prototype,"type",2);_([A({type:Boolean,reflect:!0})],Ye.prototype,"checked",2);_([A()],Ye.prototype,"value",2);_([A({type:Boolean,reflect:!0})],Ye.prototype,"loading",2);_([A({type:Boolean,reflect:!0})],Ye.prototype,"disabled",2);_([q("checked")],Ye.prototype,"handleCheckedChange",1);_([q("disabled")],Ye.prototype,"handleDisabledChange",1);_([q("type")],Ye.prototype,"handleTypeChange",1);Ye.define("sl-menu-item");var fc=Q`
  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    display: block;
    pointer-events: none;
  }

  .image-comparer__before::slotted(img),
  .image-comparer__after::slotted(img),
  .image-comparer__before::slotted(svg),
  .image-comparer__after::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    translate: calc(var(--divider-width) / -2);
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-700);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`,Xt=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.position=50}handleDrag(e){const{width:t}=this.base.getBoundingClientRect(),i=this.localize.dir()==="rtl";e.preventDefault(),Li(this.base,{onMove:s=>{this.position=parseFloat(Ee(s/t*100,0,100).toFixed(2)),i&&(this.position=100-this.position)},initialEvent:e})}handleKeyDown(e){const t=this.localize.dir()==="ltr",i=this.localize.dir()==="rtl";if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){const s=e.shiftKey?10:1;let c=this.position;e.preventDefault(),(t&&e.key==="ArrowLeft"||i&&e.key==="ArrowRight")&&(c-=s),(t&&e.key==="ArrowRight"||i&&e.key==="ArrowLeft")&&(c+=s),e.key==="Home"&&(c=0),e.key==="End"&&(c=100),c=Ee(c,0,100),this.position=c}}handlePositionChange(){this.emit("sl-change")}render(){const e=this.localize.dir()==="rtl";return V`
      <div
        part="base"
        id="image-comparer"
        class=${te({"image-comparer":!0,"image-comparer--rtl":e})}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${We({clipPath:e?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${We({left:e?`${100-this.position}%`:`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle">
              <sl-icon library="system" name="grip-vertical"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};Xt.styles=[ie,fc];Xt.scopedElement={"sl-icon":me};_([K(".image-comparer")],Xt.prototype,"base",2);_([K(".image-comparer__handle")],Xt.prototype,"handle",2);_([A({type:Number,reflect:!0})],Xt.prototype,"position",2);_([q("position",{waitUntilFirstUpdate:!0})],Xt.prototype,"handlePositionChange",1);Xt.define("sl-image-comparer");var gc=Q`
  :host {
    display: block;
  }
`,Hs=new Map;function mc(e,t="cors"){const i=Hs.get(e);if(i!==void 0)return Promise.resolve(i);const s=fetch(e,{mode:t}).then(async c=>{const m={ok:c.ok,status:c.status,html:await c.text()};return Hs.set(e,m),m});return Hs.set(e,s),s}var li=class extends J{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(e){const t=document.createElement("script");[...e.attributes].forEach(i=>t.setAttribute(i.name,i.value)),t.textContent=e.textContent,e.parentNode.replaceChild(t,e)}async handleSrcChange(){try{const e=this.src,t=await mc(e,this.mode);if(e!==this.src)return;if(!t.ok){this.emit("sl-error",{detail:{status:t.status}});return}this.innerHTML=t.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(i=>this.executeScript(i)),this.emit("sl-load")}catch{this.emit("sl-error",{detail:{status:-1}})}}render(){return V`<slot></slot>`}};li.styles=[ie,gc];_([A()],li.prototype,"src",2);_([A()],li.prototype,"mode",2);_([A({attribute:"allow-scripts",type:Boolean})],li.prototype,"allowScripts",2);_([q("src")],li.prototype,"handleSrcChange",1);li.define("sl-include");me.define("sl-icon");De.define("sl-icon-button");var ys=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const e=["","kilo","mega","giga","tera"],t=["","kilo","mega","giga","tera","peta"],i=this.unit==="bit"?e:t,s=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),i.length-1)),c=i[s]+this.unit,m=parseFloat((this.value/Math.pow(1e3,s)).toPrecision(3));return this.localize.number(m,{style:"unit",unit:c,unitDisplay:this.display})}};_([A({type:Number})],ys.prototype,"value",2);_([A()],ys.prototype,"unit",2);_([A()],ys.prototype,"display",2);ys.define("sl-format-bytes");var Je=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.date=new Date,this.hourFormat="auto"}render(){const e=new Date(this.date),t=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(!isNaN(e.getMilliseconds()))return V`
      <time datetime=${e.toISOString()}>
        ${this.localize.date(e,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:t})}
      </time>
    `}};_([A()],Je.prototype,"date",2);_([A()],Je.prototype,"weekday",2);_([A()],Je.prototype,"era",2);_([A()],Je.prototype,"year",2);_([A()],Je.prototype,"month",2);_([A()],Je.prototype,"day",2);_([A()],Je.prototype,"hour",2);_([A()],Je.prototype,"minute",2);_([A()],Je.prototype,"second",2);_([A({attribute:"time-zone-name"})],Je.prototype,"timeZoneName",2);_([A({attribute:"time-zone"})],Je.prototype,"timeZone",2);_([A({attribute:"hour-format"})],Je.prototype,"hourFormat",2);Je.define("sl-format-date");var ct=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};_([A({type:Number})],ct.prototype,"value",2);_([A()],ct.prototype,"type",2);_([A({attribute:"no-grouping",type:Boolean})],ct.prototype,"noGrouping",2);_([A()],ct.prototype,"currency",2);_([A({attribute:"currency-display"})],ct.prototype,"currencyDisplay",2);_([A({attribute:"minimum-integer-digits",type:Number})],ct.prototype,"minimumIntegerDigits",2);_([A({attribute:"minimum-fraction-digits",type:Number})],ct.prototype,"minimumFractionDigits",2);_([A({attribute:"maximum-fraction-digits",type:Number})],ct.prototype,"maximumFractionDigits",2);_([A({attribute:"minimum-significant-digits",type:Number})],ct.prototype,"minimumSignificantDigits",2);_([A({attribute:"maximum-significant-digits",type:Number})],ct.prototype,"maximumSignificantDigits",2);ct.define("sl-format-number");var vc=Q`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,ws=class extends J{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};ws.styles=[ie,vc];_([A({type:Boolean,reflect:!0})],ws.prototype,"vertical",2);_([q("vertical")],ws.prototype,"handleVerticalChange",1);ws.define("sl-divider");var _c=Q`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;function*br(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*$n(br(e.shadowRoot.activeElement))))}function rn(){return[...br()].pop()}var Qr=new WeakMap;function on(e){let t=Qr.get(e);return t||(t=window.getComputedStyle(e,null),Qr.set(e,t)),t}function bc(e){if(typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=on(e);return t.visibility!=="hidden"&&t.display!=="none"}function yc(e){const t=on(e),{overflowY:i,overflowX:s}=t;return i==="scroll"||s==="scroll"?!0:i!=="auto"||s!=="auto"?!1:e.scrollHeight>e.clientHeight&&i==="auto"||e.scrollWidth>e.clientWidth&&s==="auto"}function wc(e){const t=e.tagName.toLowerCase(),i=Number(e.getAttribute("tabindex"));if(e.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||e.hasAttribute("disabled")||e.closest("[inert]"))return!1;if(t==="input"&&e.getAttribute("type")==="radio"){const m=e.getRootNode(),w=`input[type='radio'][name="${e.getAttribute("name")}"]`,r=m.querySelector(`${w}:checked`);return r?r===e:m.querySelector(w)===e}return bc(e)?(t==="audio"||t==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:yc(e):!1}function Sc(e){var t,i;const s=tr(e),c=(t=s[0])!=null?t:null,m=(i=s[s.length-1])!=null?i:null;return{start:c,end:m}}function Cc(e,t){var i;return((i=e.getRootNode({composed:!0}))==null?void 0:i.host)!==t}function tr(e){const t=new WeakMap,i=[];function s(c){if(c instanceof Element){if(c.hasAttribute("inert")||c.closest("[inert]")||t.has(c))return;t.set(c,!0),!i.includes(c)&&wc(c)&&i.push(c),c instanceof HTMLSlotElement&&Cc(c,e)&&c.assignedElements({flatten:!0}).forEach(m=>{s(m)}),c.shadowRoot!==null&&c.shadowRoot.mode==="open"&&s(c.shadowRoot)}for(const m of c.children)s(m)}return s(e),i.sort((c,m)=>{const w=Number(c.getAttribute("tabindex"))||0;return(Number(m.getAttribute("tabindex"))||0)-w})}var yi=[],nn=class{constructor(e){this.tabDirection="forward",this.handleFocusIn=()=>{!this.isActive()||this.checkFocus()},this.handleKeyDown=t=>{var i;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const s=rn();if(this.previousFocus=s,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const c=tr(this.element);let m=c.findIndex(r=>r===s);this.previousFocus=this.currentFocus;const w=this.tabDirection==="forward"?1:-1;for(;;){m+w>=c.length?m=0:m+w<0?m=c.length-1:m+=w,this.previousFocus=this.currentFocus;const r=c[m];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||r&&this.possiblyHasTabbableChildren(r))return;t.preventDefault(),this.currentFocus=r,(i=this.currentFocus)==null||i.focus({preventScroll:!1});const n=[...br()];if(n.includes(this.currentFocus)||!n.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){yi.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){yi=yi.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return yi[yi.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=tr(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],s=this.tabDirection==="forward"?t:i;typeof(s==null?void 0:s.focus)=="function"&&(this.currentFocus=s,s.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}},yr=e=>{var t;const{activeElement:i}=document;i&&e.contains(i)&&((t=document.activeElement)==null||t.blur())};function eo(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Ze=class extends J{constructor(){super(...arguments),this.hasSlotController=new Ne(this,"footer"),this.localize=new ce(this),this.modal=new nn(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=e=>{this.contained||e.key==="Escape"&&this.modal.isActive()&&this.open&&(e.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),Ei(this)))}disconnectedCallback(){super.disconnectedCallback(),Ai(this),this.removeOpenListeners()}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const i=_e(this,"drawer.denyClose",{dir:this.localize.dir()});Ce(this.panel,i.keyframes,i.options);return}this.hide()}addOpenListeners(){var e;"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var e;document.removeEventListener("keydown",this.handleDocumentKeyDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),Ei(this));const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([Ae(this.drawer),Ae(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=_e(this,`drawer.show${eo(this.placement)}`,{dir:this.localize.dir()}),i=_e(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([Ce(this.panel,t.keyframes,t.options),Ce(this.overlay,i.keyframes,i.options)]),this.emit("sl-after-show")}else{yr(this),this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),Ai(this)),await Promise.all([Ae(this.drawer),Ae(this.overlay)]);const e=_e(this,`drawer.hide${eo(this.placement)}`,{dir:this.localize.dir()}),t=_e(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([Ce(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),Ce(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;const i=this.originalTrigger;typeof(i==null?void 0:i.focus)=="function"&&setTimeout(()=>i.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),Ei(this)),this.open&&this.contained&&(this.modal.deactivate(),Ai(this))}async show(){if(!this.open)return this.open=!0,He(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,He(this,"sl-after-hide")}render(){return V`
      <div
        part="base"
        class=${te({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":this.localize.dir()==="rtl","drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Y(this.noHeader?this.label:void 0)}
          aria-labelledby=${Y(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":V`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Ze.styles=[ie,_c];Ze.dependencies={"sl-icon-button":De};_([K(".drawer")],Ze.prototype,"drawer",2);_([K(".drawer__panel")],Ze.prototype,"panel",2);_([K(".drawer__overlay")],Ze.prototype,"overlay",2);_([A({type:Boolean,reflect:!0})],Ze.prototype,"open",2);_([A({reflect:!0})],Ze.prototype,"label",2);_([A({reflect:!0})],Ze.prototype,"placement",2);_([A({type:Boolean,reflect:!0})],Ze.prototype,"contained",2);_([A({attribute:"no-header",type:Boolean,reflect:!0})],Ze.prototype,"noHeader",2);_([q("open",{waitUntilFirstUpdate:!0})],Ze.prototype,"handleOpenChange",1);_([q("contained",{waitUntilFirstUpdate:!0})],Ze.prototype,"handleNoModalChange",1);ue("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});ue("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}});ue("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});ue("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}});ue("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});ue("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}});ue("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});ue("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}});ue("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}});ue("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});ue("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});Ze.define("sl-drawer");var xc=Q`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,Pe=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=e=>{var t;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((t=document.activeElement)==null?void 0:t.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}const i=(s,c)=>{if(!s)return null;const m=s.closest(c);if(m)return m;const w=s.getRootNode();return w instanceof ShadowRoot?i(w.host,c):null};setTimeout(()=>{var s;const c=((s=this.containingElement)==null?void 0:s.getRootNode())instanceof ShadowRoot?rn():document.activeElement;(!this.containingElement||i(c,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=e=>{const t=e.target;!this.stayOpenOnSelect&&t.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const e=this.trigger.assignedElements({flatten:!0})[0];typeof(e==null?void 0:e.focus)=="function"&&e.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}const t=this.getMenu();if(t){const i=t.getAllItems(),s=i[0],c=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),i.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(t.setCurrentItem(s),s.focus()),(e.key==="ArrowUp"||e.key==="End")&&(t.setCurrentItem(c),c.focus())}))}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find(s=>Sc(s).start);let i;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":i=t.button;break;default:i=t}i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,He(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,He(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Ae(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:e,options:t}=_e(this,"dropdown.show",{dir:this.localize.dir()});await Ce(this.popup.popup,e,t),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Ae(this);const{keyframes:e,options:t}=_e(this,"dropdown.hide",{dir:this.localize.dir()});await Ce(this.popup.popup,e,t),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return V`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${Y(this.sync?this.sync:void 0)}
        class=${te({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};Pe.styles=[ie,xc];Pe.dependencies={"sl-popup":pe};_([K(".dropdown")],Pe.prototype,"popup",2);_([K(".dropdown__trigger")],Pe.prototype,"trigger",2);_([K(".dropdown__panel")],Pe.prototype,"panel",2);_([A({type:Boolean,reflect:!0})],Pe.prototype,"open",2);_([A({reflect:!0})],Pe.prototype,"placement",2);_([A({type:Boolean,reflect:!0})],Pe.prototype,"disabled",2);_([A({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],Pe.prototype,"stayOpenOnSelect",2);_([A({attribute:!1})],Pe.prototype,"containingElement",2);_([A({type:Number})],Pe.prototype,"distance",2);_([A({type:Number})],Pe.prototype,"skidding",2);_([A({type:Boolean})],Pe.prototype,"hoist",2);_([A({reflect:!0})],Pe.prototype,"sync",2);_([q("open",{waitUntilFirstUpdate:!0})],Pe.prototype,"handleOpenChange",1);ue("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});ue("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});Pe.define("sl-dropdown");var kc=Q`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,Re=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let e=this.value;if(this.from){const t=this.getRootNode(),i=this.from.includes("."),s=this.from.includes("[")&&this.from.includes("]");let c=this.from,m="";i?[c,m]=this.from.trim().split("."):s&&([c,m]=this.from.trim().replace(/\]$/,"").split("["));const w="getElementById"in t?t.getElementById(c):null;w?s?e=w.getAttribute(m)||"":i?e=w[m]||"":e=w.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(!e)this.showStatus("error"),this.emit("sl-error");else try{await navigator.clipboard.writeText(e),this.showStatus("success"),this.emit("sl-copy",{detail:{value:e}})}catch{this.showStatus("error"),this.emit("sl-error")}}async showStatus(e){const t=this.copyLabel||this.localize.term("copy"),i=this.successLabel||this.localize.term("copied"),s=this.errorLabel||this.localize.term("error"),c=e==="success"?this.successIcon:this.errorIcon,m=_e(this,"copy.in",{dir:"ltr"}),w=_e(this,"copy.out",{dir:"ltr"});this.tooltip.content=e==="success"?i:s,await this.copyIcon.animate(w.keyframes,w.options).finished,this.copyIcon.hidden=!0,this.status=e,c.hidden=!1,await c.animate(m.keyframes,m.options).finished,setTimeout(async()=>{await c.animate(w.keyframes,w.options).finished,c.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(m.keyframes,m.options).finished,this.tooltip.content=t,this.isCopying=!1},this.feedbackDuration)}render(){const e=this.copyLabel||this.localize.term("copy");return V`
      <sl-tooltip
        class=${te({"copy-button":!0,"copy-button--success":this.status==="success","copy-button--error":this.status==="error"})}
        content=${e}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};Re.styles=[ie,kc];Re.dependencies={"sl-icon":me,"sl-tooltip":Te};_([K('slot[name="copy-icon"]')],Re.prototype,"copyIcon",2);_([K('slot[name="success-icon"]')],Re.prototype,"successIcon",2);_([K('slot[name="error-icon"]')],Re.prototype,"errorIcon",2);_([K("sl-tooltip")],Re.prototype,"tooltip",2);_([ee()],Re.prototype,"isCopying",2);_([ee()],Re.prototype,"status",2);_([A()],Re.prototype,"value",2);_([A()],Re.prototype,"from",2);_([A({type:Boolean,reflect:!0})],Re.prototype,"disabled",2);_([A({attribute:"copy-label"})],Re.prototype,"copyLabel",2);_([A({attribute:"success-label"})],Re.prototype,"successLabel",2);_([A({attribute:"error-label"})],Re.prototype,"errorLabel",2);_([A({attribute:"feedback-duration",type:Number})],Re.prototype,"feedbackDuration",2);_([A({attribute:"tooltip-placement"})],Re.prototype,"tooltipPlacement",2);_([A({type:Boolean})],Re.prototype,"hoist",2);ue("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}});ue("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}});Re.define("sl-copy-button");var Ec=Q`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`,ht=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(const t of e)t.type==="attributes"&&t.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.detailsObserver)==null||e.disconnect()}handleSummaryClick(e){e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await Ae(this.body);const{keyframes:t,options:i}=_e(this,"details.show",{dir:this.localize.dir()});await Ce(this.body,ns(t,this.body.scrollHeight),i),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await Ae(this.body);const{keyframes:t,options:i}=_e(this,"details.hide",{dir:this.localize.dir()});await Ce(this.body,ns(t,this.body.scrollHeight),i),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,He(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,He(this,"sl-after-hide")}render(){const e=this.localize.dir()==="rtl";return V`
      <details
        part="base"
        class=${te({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":e})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};ht.styles=[ie,Ec];ht.dependencies={"sl-icon":me};_([K(".details")],ht.prototype,"details",2);_([K(".details__header")],ht.prototype,"header",2);_([K(".details__body")],ht.prototype,"body",2);_([K(".details__expand-icon-slot")],ht.prototype,"expandIconSlot",2);_([A({type:Boolean,reflect:!0})],ht.prototype,"open",2);_([A()],ht.prototype,"summary",2);_([A({type:Boolean,reflect:!0})],ht.prototype,"disabled",2);_([q("open",{waitUntilFirstUpdate:!0})],ht.prototype,"handleOpenChange",1);ue("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});ue("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});ht.define("sl-details");var Ac=Q`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,bt=class extends J{constructor(){super(...arguments),this.hasSlotController=new Ne(this,"footer"),this.localize=new ce(this),this.modal=new nn(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.modal.isActive()&&this.open&&(e.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Ei(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),Ai(this),this.removeOpenListeners()}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const i=_e(this,"dialog.denyClose",{dir:this.localize.dir()});Ce(this.panel,i.keyframes,i.options);return}this.hide()}addOpenListeners(){var e;"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var e;(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Ei(this);const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([Ae(this.dialog),Ae(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=_e(this,"dialog.show",{dir:this.localize.dir()}),i=_e(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Ce(this.panel,t.keyframes,t.options),Ce(this.overlay,i.keyframes,i.options)]),this.emit("sl-after-show")}else{yr(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([Ae(this.dialog),Ae(this.overlay)]);const e=_e(this,"dialog.hide",{dir:this.localize.dir()}),t=_e(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Ce(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),Ce(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,Ai(this);const i=this.originalTrigger;typeof(i==null?void 0:i.focus)=="function"&&setTimeout(()=>i.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,He(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,He(this,"sl-after-hide")}render(){return V`
      <div
        part="base"
        class=${te({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Y(this.noHeader?this.label:void 0)}
          aria-labelledby=${Y(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":V`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};bt.styles=[ie,Ac];bt.dependencies={"sl-icon-button":De};_([K(".dialog")],bt.prototype,"dialog",2);_([K(".dialog__panel")],bt.prototype,"panel",2);_([K(".dialog__overlay")],bt.prototype,"overlay",2);_([A({type:Boolean,reflect:!0})],bt.prototype,"open",2);_([A({reflect:!0})],bt.prototype,"label",2);_([A({attribute:"no-header",type:Boolean,reflect:!0})],bt.prototype,"noHeader",2);_([q("open",{waitUntilFirstUpdate:!0})],bt.prototype,"handleOpenChange",1);ue("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});ue("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});ue("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});ue("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});ue("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});bt.define("sl-dialog");Le.define("sl-checkbox");var Lc=Q`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,fe=class extends J{constructor(){super(...arguments),this.formControlController=new Ct(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Ne(this,"[default]","prefix","suffix"),this.localize=new ce(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:fs}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity())}render(){const e=this.isLink(),t=e?hs`a`:hs`button`;return ki`
      <${t}
        part="base"
        class=${te({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${Y(e?void 0:this.disabled)}
        type=${Y(e?void 0:this.type)}
        title=${this.title}
        name=${Y(e?void 0:this.name)}
        value=${Y(e?void 0:this.value)}
        href=${Y(e&&!this.disabled?this.href:void 0)}
        target=${Y(e?this.target:void 0)}
        download=${Y(e?this.download:void 0)}
        rel=${Y(e?this.rel:void 0)}
        role=${Y(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?ki` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?ki`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${t}>
    `}};fe.styles=[ie,Zo];fe.dependencies={"sl-icon":me,"sl-spinner":Fi};_([K(".button")],fe.prototype,"button",2);_([ee()],fe.prototype,"hasFocus",2);_([ee()],fe.prototype,"invalid",2);_([A()],fe.prototype,"title",2);_([A({reflect:!0})],fe.prototype,"variant",2);_([A({reflect:!0})],fe.prototype,"size",2);_([A({type:Boolean,reflect:!0})],fe.prototype,"caret",2);_([A({type:Boolean,reflect:!0})],fe.prototype,"disabled",2);_([A({type:Boolean,reflect:!0})],fe.prototype,"loading",2);_([A({type:Boolean,reflect:!0})],fe.prototype,"outline",2);_([A({type:Boolean,reflect:!0})],fe.prototype,"pill",2);_([A({type:Boolean,reflect:!0})],fe.prototype,"circle",2);_([A()],fe.prototype,"type",2);_([A()],fe.prototype,"name",2);_([A()],fe.prototype,"value",2);_([A()],fe.prototype,"href",2);_([A()],fe.prototype,"target",2);_([A()],fe.prototype,"rel",2);_([A()],fe.prototype,"download",2);_([A()],fe.prototype,"form",2);_([A({attribute:"formaction"})],fe.prototype,"formAction",2);_([A({attribute:"formenctype"})],fe.prototype,"formEnctype",2);_([A({attribute:"formmethod"})],fe.prototype,"formMethod",2);_([A({attribute:"formnovalidate",type:Boolean})],fe.prototype,"formNoValidate",2);_([A({attribute:"formtarget"})],fe.prototype,"formTarget",2);_([q("disabled",{waitUntilFirstUpdate:!0})],fe.prototype,"handleDisabledChange",1);function Oe(e,t){Dc(e)&&(e="100%");const i=Tc(e);return e=t===360?e:Math.min(t,Math.max(0,parseFloat(e))),i&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:(t===360?e=(e<0?e%t+t:e%t)/parseFloat(String(t)):e=e%t/parseFloat(String(t)),e)}function Ji(e){return Math.min(1,Math.max(0,e))}function Dc(e){return typeof e=="string"&&e.indexOf(".")!==-1&&parseFloat(e)===1}function Tc(e){return typeof e=="string"&&e.indexOf("%")!==-1}function an(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function Zi(e){return Number(e)<=1?`${Number(e)*100}%`:e}function Ft(e){return e.length===1?"0"+e:String(e)}function Rc(e,t,i){return{r:Oe(e,255)*255,g:Oe(t,255)*255,b:Oe(i,255)*255}}function to(e,t,i){e=Oe(e,255),t=Oe(t,255),i=Oe(i,255);const s=Math.max(e,t,i),c=Math.min(e,t,i);let m=0,w=0;const r=(s+c)/2;if(s===c)w=0,m=0;else{const n=s-c;switch(w=r>.5?n/(2-s-c):n/(s+c),s){case e:m=(t-i)/n+(t<i?6:0);break;case t:m=(i-e)/n+2;break;case i:m=(e-t)/n+4;break}m/=6}return{h:m,s:w,l:r}}function Ns(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+(t-e)*(6*i):i<1/2?t:i<2/3?e+(t-e)*(2/3-i)*6:e}function $c(e,t,i){let s,c,m;if(e=Oe(e,360),t=Oe(t,100),i=Oe(i,100),t===0)c=i,m=i,s=i;else{const w=i<.5?i*(1+t):i+t-i*t,r=2*i-w;s=Ns(r,w,e+1/3),c=Ns(r,w,e),m=Ns(r,w,e-1/3)}return{r:s*255,g:c*255,b:m*255}}function io(e,t,i){e=Oe(e,255),t=Oe(t,255),i=Oe(i,255);const s=Math.max(e,t,i),c=Math.min(e,t,i);let m=0;const w=s,r=s-c,n=s===0?0:r/s;if(s===c)m=0;else{switch(s){case e:m=(t-i)/r+(t<i?6:0);break;case t:m=(i-e)/r+2;break;case i:m=(e-t)/r+4;break}m/=6}return{h:m,s:n,v:w}}function Bc(e,t,i){e=Oe(e,360)*6,t=Oe(t,100),i=Oe(i,100);const s=Math.floor(e),c=e-s,m=i*(1-t),w=i*(1-c*t),r=i*(1-(1-c)*t),n=s%6,u=[i,w,m,m,r,i][n],g=[r,i,i,w,m,m][n],l=[m,m,r,i,i,w][n];return{r:u*255,g:g*255,b:l*255}}function so(e,t,i,s){const c=[Ft(Math.round(e).toString(16)),Ft(Math.round(t).toString(16)),Ft(Math.round(i).toString(16))];return s&&c[0].startsWith(c[0].charAt(1))&&c[1].startsWith(c[1].charAt(1))&&c[2].startsWith(c[2].charAt(1))?c[0].charAt(0)+c[1].charAt(0)+c[2].charAt(0):c.join("")}function Oc(e,t,i,s,c){const m=[Ft(Math.round(e).toString(16)),Ft(Math.round(t).toString(16)),Ft(Math.round(i).toString(16)),Ft(Ic(s))];return c&&m[0].startsWith(m[0].charAt(1))&&m[1].startsWith(m[1].charAt(1))&&m[2].startsWith(m[2].charAt(1))&&m[3].startsWith(m[3].charAt(1))?m[0].charAt(0)+m[1].charAt(0)+m[2].charAt(0)+m[3].charAt(0):m.join("")}function Mc(e,t,i,s){const c=e/100,m=t/100,w=i/100,r=s/100,n=255*(1-c)*(1-r),u=255*(1-m)*(1-r),g=255*(1-w)*(1-r);return{r:n,g:u,b:g}}function ro(e,t,i){let s=1-e/255,c=1-t/255,m=1-i/255,w=Math.min(s,c,m);return w===1?(s=0,c=0,m=0):(s=(s-w)/(1-w)*100,c=(c-w)/(1-w)*100,m=(m-w)/(1-w)*100),w*=100,{c:Math.round(s),m:Math.round(c),y:Math.round(m),k:Math.round(w)}}function Ic(e){return Math.round(parseFloat(e)*255).toString(16)}function oo(e){return je(e)/255}function je(e){return parseInt(e,16)}function Pc(e){return{r:e>>16,g:(e&65280)>>8,b:e&255}}const ir={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function zc(e){let t={r:0,g:0,b:0},i=1,s=null,c=null,m=null,w=!1,r=!1;return typeof e=="string"&&(e=Nc(e)),typeof e=="object"&&(Ve(e.r)&&Ve(e.g)&&Ve(e.b)?(t=Rc(e.r,e.g,e.b),w=!0,r=String(e.r).substr(-1)==="%"?"prgb":"rgb"):Ve(e.h)&&Ve(e.s)&&Ve(e.v)?(s=Zi(e.s),c=Zi(e.v),t=Bc(e.h,s,c),w=!0,r="hsv"):Ve(e.h)&&Ve(e.s)&&Ve(e.l)?(s=Zi(e.s),m=Zi(e.l),t=$c(e.h,s,m),w=!0,r="hsl"):Ve(e.c)&&Ve(e.m)&&Ve(e.y)&&Ve(e.k)&&(t=Mc(e.c,e.m,e.y,e.k),w=!0,r="cmyk"),Object.prototype.hasOwnProperty.call(e,"a")&&(i=e.a)),i=an(i),{ok:w,format:e.format||r,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:i}}const Fc="[-\\+]?\\d+%?",Hc="[-\\+]?\\d*\\.\\d+%?",At="(?:"+Hc+")|(?:"+Fc+")",Us="[\\s|\\(]+("+At+")[,|\\s]+("+At+")[,|\\s]+("+At+")\\s*\\)?",Qi="[\\s|\\(]+("+At+")[,|\\s]+("+At+")[,|\\s]+("+At+")[,|\\s]+("+At+")\\s*\\)?",tt={CSS_UNIT:new RegExp(At),rgb:new RegExp("rgb"+Us),rgba:new RegExp("rgba"+Qi),hsl:new RegExp("hsl"+Us),hsla:new RegExp("hsla"+Qi),hsv:new RegExp("hsv"+Us),hsva:new RegExp("hsva"+Qi),cmyk:new RegExp("cmyk"+Qi),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Nc(e){if(e=e.trim().toLowerCase(),e.length===0)return!1;let t=!1;if(ir[e])e=ir[e],t=!0;else if(e==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let i=tt.rgb.exec(e);return i?{r:i[1],g:i[2],b:i[3]}:(i=tt.rgba.exec(e),i?{r:i[1],g:i[2],b:i[3],a:i[4]}:(i=tt.hsl.exec(e),i?{h:i[1],s:i[2],l:i[3]}:(i=tt.hsla.exec(e),i?{h:i[1],s:i[2],l:i[3],a:i[4]}:(i=tt.hsv.exec(e),i?{h:i[1],s:i[2],v:i[3]}:(i=tt.hsva.exec(e),i?{h:i[1],s:i[2],v:i[3],a:i[4]}:(i=tt.cmyk.exec(e),i?{c:i[1],m:i[2],y:i[3],k:i[4]}:(i=tt.hex8.exec(e),i?{r:je(i[1]),g:je(i[2]),b:je(i[3]),a:oo(i[4]),format:t?"name":"hex8"}:(i=tt.hex6.exec(e),i?{r:je(i[1]),g:je(i[2]),b:je(i[3]),format:t?"name":"hex"}:(i=tt.hex4.exec(e),i?{r:je(i[1]+i[1]),g:je(i[2]+i[2]),b:je(i[3]+i[3]),a:oo(i[4]+i[4]),format:t?"name":"hex8"}:(i=tt.hex3.exec(e),i?{r:je(i[1]+i[1]),g:je(i[2]+i[2]),b:je(i[3]+i[3]),format:t?"name":"hex"}:!1))))))))))}function Ve(e){return typeof e=="number"?!Number.isNaN(e):tt.CSS_UNIT.test(e)}class Se{constructor(t="",i={}){var c;if(t instanceof Se)return t;typeof t=="number"&&(t=Pc(t)),this.originalInput=t;const s=zc(t);this.originalInput=t,this.r=s.r,this.g=s.g,this.b=s.b,this.a=s.a,this.roundA=Math.round(100*this.a)/100,this.format=(c=i.format)!=null?c:s.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=s.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const t=this.toRgb();return(t.r*299+t.g*587+t.b*114)/1e3}getLuminance(){const t=this.toRgb();let i,s,c;const m=t.r/255,w=t.g/255,r=t.b/255;return m<=.03928?i=m/12.92:i=Math.pow((m+.055)/1.055,2.4),w<=.03928?s=w/12.92:s=Math.pow((w+.055)/1.055,2.4),r<=.03928?c=r/12.92:c=Math.pow((r+.055)/1.055,2.4),.2126*i+.7152*s+.0722*c}getAlpha(){return this.a}setAlpha(t){return this.a=an(t),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:t}=this.toHsl();return t===0}toHsv(){const t=io(this.r,this.g,this.b);return{h:t.h*360,s:t.s,v:t.v,a:this.a}}toHsvString(){const t=io(this.r,this.g,this.b),i=Math.round(t.h*360),s=Math.round(t.s*100),c=Math.round(t.v*100);return this.a===1?`hsv(${i}, ${s}%, ${c}%)`:`hsva(${i}, ${s}%, ${c}%, ${this.roundA})`}toHsl(){const t=to(this.r,this.g,this.b);return{h:t.h*360,s:t.s,l:t.l,a:this.a}}toHslString(){const t=to(this.r,this.g,this.b),i=Math.round(t.h*360),s=Math.round(t.s*100),c=Math.round(t.l*100);return this.a===1?`hsl(${i}, ${s}%, ${c}%)`:`hsla(${i}, ${s}%, ${c}%, ${this.roundA})`}toHex(t=!1){return so(this.r,this.g,this.b,t)}toHexString(t=!1){return"#"+this.toHex(t)}toHex8(t=!1){return Oc(this.r,this.g,this.b,this.a,t)}toHex8String(t=!1){return"#"+this.toHex8(t)}toHexShortString(t=!1){return this.a===1?this.toHexString(t):this.toHex8String(t)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const t=Math.round(this.r),i=Math.round(this.g),s=Math.round(this.b);return this.a===1?`rgb(${t}, ${i}, ${s})`:`rgba(${t}, ${i}, ${s}, ${this.roundA})`}toPercentageRgb(){const t=i=>`${Math.round(Oe(i,255)*100)}%`;return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}}toPercentageRgbString(){const t=i=>Math.round(Oe(i,255)*100);return this.a===1?`rgb(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%)`:`rgba(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%, ${this.roundA})`}toCmyk(){return{...ro(this.r,this.g,this.b)}}toCmykString(){const{c:t,m:i,y:s,k:c}=ro(this.r,this.g,this.b);return`cmyk(${t}, ${i}, ${s}, ${c})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const t="#"+so(this.r,this.g,this.b,!1);for(const[i,s]of Object.entries(ir))if(t===s)return i;return!1}toString(t){const i=Boolean(t);t=t!=null?t:this.format;let s=!1;const c=this.a<1&&this.a>=0;return!i&&c&&(t.startsWith("hex")||t==="name")?t==="name"&&this.a===0?this.toName():this.toRgbString():(t==="rgb"&&(s=this.toRgbString()),t==="prgb"&&(s=this.toPercentageRgbString()),(t==="hex"||t==="hex6")&&(s=this.toHexString()),t==="hex3"&&(s=this.toHexString(!0)),t==="hex4"&&(s=this.toHex8String(!0)),t==="hex8"&&(s=this.toHex8String()),t==="name"&&(s=this.toName()),t==="hsl"&&(s=this.toHslString()),t==="hsv"&&(s=this.toHsvString()),t==="cmyk"&&(s=this.toCmykString()),s||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new Se(this.toString())}lighten(t=10){const i=this.toHsl();return i.l+=t/100,i.l=Ji(i.l),new Se(i)}brighten(t=10){const i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(255*-(t/100)))),i.g=Math.max(0,Math.min(255,i.g-Math.round(255*-(t/100)))),i.b=Math.max(0,Math.min(255,i.b-Math.round(255*-(t/100)))),new Se(i)}darken(t=10){const i=this.toHsl();return i.l-=t/100,i.l=Ji(i.l),new Se(i)}tint(t=10){return this.mix("white",t)}shade(t=10){return this.mix("black",t)}desaturate(t=10){const i=this.toHsl();return i.s-=t/100,i.s=Ji(i.s),new Se(i)}saturate(t=10){const i=this.toHsl();return i.s+=t/100,i.s=Ji(i.s),new Se(i)}greyscale(){return this.desaturate(100)}spin(t){const i=this.toHsl(),s=(i.h+t)%360;return i.h=s<0?360+s:s,new Se(i)}mix(t,i=50){const s=this.toRgb(),c=new Se(t).toRgb(),m=i/100,w={r:(c.r-s.r)*m+s.r,g:(c.g-s.g)*m+s.g,b:(c.b-s.b)*m+s.b,a:(c.a-s.a)*m+s.a};return new Se(w)}analogous(t=6,i=30){const s=this.toHsl(),c=360/i,m=[this];for(s.h=(s.h-(c*t>>1)+720)%360;--t;)s.h=(s.h+c)%360,m.push(new Se(s));return m}complement(){const t=this.toHsl();return t.h=(t.h+180)%360,new Se(t)}monochromatic(t=6){const i=this.toHsv(),{h:s}=i,{s:c}=i;let{v:m}=i;const w=[],r=1/t;for(;t--;)w.push(new Se({h:s,s:c,v:m})),m=(m+r)%1;return w}splitcomplement(){const t=this.toHsl(),{h:i}=t;return[this,new Se({h:(i+72)%360,s:t.s,l:t.l}),new Se({h:(i+216)%360,s:t.s,l:t.l})]}onBackground(t){const i=this.toRgb(),s=new Se(t).toRgb(),c=i.a+s.a*(1-i.a);return new Se({r:(i.r*i.a+s.r*s.a*(1-i.a))/c,g:(i.g*i.a+s.g*s.a*(1-i.a))/c,b:(i.b*i.a+s.b*s.a*(1-i.a))/c,a:c})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(t){const i=this.toHsl(),{h:s}=i,c=[this],m=360/t;for(let w=1;w<t;w++)c.push(new Se({h:(s+w*m)%360,s:i.s,l:i.l}));return c}equals(t){const i=new Se(t);return this.format==="cmyk"||i.format==="cmyk"?this.toCmykString()===i.toCmykString():this.toRgbString()===i.toRgbString()}}var no="EyeDropper"in window,le=class extends J{constructor(){super(),this.formControlController=new Ct(this),this.isSafeValue=!1,this.localize=new ce(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!1,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.form="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){const e=["hex","rgb","hsl","hsv"],t=(e.indexOf(this.format)+1)%e.length;this.format=e[t],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),i=t.querySelector(".color-picker__slider-handle"),{width:s}=t.getBoundingClientRect();let c=this.value,m=this.value;i.focus(),e.preventDefault(),Li(t,{onMove:w=>{this.alpha=Ee(w/s*100,0,100),this.syncValues(),this.value!==m&&(m=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==c&&(c=this.value,this.emit("sl-change"))},initialEvent:e})}handleHueDrag(e){const t=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),i=t.querySelector(".color-picker__slider-handle"),{width:s}=t.getBoundingClientRect();let c=this.value,m=this.value;i.focus(),e.preventDefault(),Li(t,{onMove:w=>{this.hue=Ee(w/s*360,0,360),this.syncValues(),this.value!==m&&(m=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==c&&(c=this.value,this.emit("sl-change"))},initialEvent:e})}handleGridDrag(e){const t=this.shadowRoot.querySelector(".color-picker__grid"),i=t.querySelector(".color-picker__grid-handle"),{width:s,height:c}=t.getBoundingClientRect();let m=this.value,w=this.value;i.focus(),e.preventDefault(),this.isDraggingGridHandle=!0,Li(t,{onMove:(r,n)=>{this.saturation=Ee(r/s*100,0,100),this.brightness=Ee(100-n/c*100,0,100),this.syncValues(),this.value!==w&&(w=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==m&&(m=this.value,this.emit("sl-change"))},initialEvent:e})}handleAlphaKeyDown(e){const t=e.shiftKey?10:1,i=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.alpha=Ee(this.alpha-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.alpha=Ee(this.alpha+t,0,100),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.alpha=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.alpha=100,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(e){const t=e.shiftKey?10:1,i=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.hue=Ee(this.hue-t,0,360),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.hue=Ee(this.hue+t,0,360),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.hue=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.hue=360,this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(e){const t=e.shiftKey?10:1,i=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.saturation=Ee(this.saturation-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.saturation=Ee(this.saturation+t,0,100),this.syncValues()),e.key==="ArrowUp"&&(e.preventDefault(),this.brightness=Ee(this.brightness+t,0,100),this.syncValues()),e.key==="ArrowDown"&&(e.preventDefault(),this.brightness=Ee(this.brightness-t,0,100),this.syncValues()),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(e){const t=e.target,i=this.value;e.stopPropagation(),this.input.value?(this.setColor(t.value),t.value=this.value):this.value="",this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(e){this.formControlController.updateValidity(),e.stopPropagation()}handleInputKeyDown(e){if(e.key==="Enter"){const t=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==t&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleTouchMove(e){e.preventDefault()}parseColor(e){const t=new Se(e);if(!t.isValid)return null;const i=t.toHsl(),s={h:i.h,s:i.s*100,l:i.l*100,a:i.a},c=t.toRgb(),m=t.toHexString(),w=t.toHex8String(),r=t.toHsv(),n={h:r.h,s:r.s*100,v:r.v*100,a:r.a};return{hsl:{h:s.h,s:s.s,l:s.l,string:this.setLetterCase(`hsl(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.l)}%)`)},hsla:{h:s.h,s:s.s,l:s.l,a:s.a,string:this.setLetterCase(`hsla(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.l)}%, ${s.a.toFixed(2).toString()})`)},hsv:{h:n.h,s:n.s,v:n.v,string:this.setLetterCase(`hsv(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.v)}%)`)},hsva:{h:n.h,s:n.s,v:n.v,a:n.a,string:this.setLetterCase(`hsva(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.v)}%, ${n.a.toFixed(2).toString()})`)},rgb:{r:c.r,g:c.g,b:c.b,string:this.setLetterCase(`rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`)},rgba:{r:c.r,g:c.g,b:c.b,a:c.a,string:this.setLetterCase(`rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${c.a.toFixed(2).toString()})`)},hex:this.setLetterCase(m),hexa:this.setLetterCase(w)}}setColor(e){const t=this.parseColor(e);return t===null?!1:(this.hue=t.hsva.h,this.saturation=t.hsva.s,this.brightness=t.hsva.v,this.alpha=this.opacity?t.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(e){return typeof e!="string"?"":this.uppercase?e.toUpperCase():e.toLowerCase()}async syncValues(){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);e!==null&&(this.format==="hsl"?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?e.hsva.string:e.hsv.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!no)return;new EyeDropper().open().then(t=>{const i=this.value;this.setColor(t.sRGBHex),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(e){const t=this.value;this.disabled||(this.setColor(e),this.value!==t&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(e,t,i,s=100){const c=new Se(`hsva(${e}, ${t}%, ${i}%, ${s/100})`);return c.isValid?c.toHex8String():""}stopNestedEventPropagation(e){e.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(e,t){if(this.isEmpty=!t,t||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const i=this.parseColor(t);i!==null?(this.inputValue=this.value,this.hue=i.hsva.h,this.saturation=i.hsva.s,this.brightness=i.hsva.v,this.alpha=i.hsva.a*100,this.syncValues()):this.inputValue=e!=null?e:""}}focus(e){this.inline?this.base.focus(e):this.trigger.focus(e)}blur(){var e;const t=this.inline?this.base:this.trigger;this.hasFocus&&(t.focus({preventScroll:!0}),t.blur()),(e=this.dropdown)!=null&&e.open&&this.dropdown.hide()}getFormattedValue(e="hex"){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(t===null)return"";switch(e){case"hex":return t.hex;case"hexa":return t.hexa;case"rgb":return t.rgb.string;case"rgba":return t.rgba.string;case"hsl":return t.hsl.string;case"hsla":return t.hsla.string;case"hsv":return t.hsv.string;case"hsva":return t.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.inline&&!this.validity.valid?(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:!0}),this.disabled||this.formControlController.emitInvalidEvent(),!1):this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.saturation,t=100-this.brightness,i=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(c=>c.trim()!==""),s=V`
      <div
        part="base"
        class=${te({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?V`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${We({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${te({"color-picker__grid-handle":!0,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${We({top:`${t}%`,left:`${e}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${Y(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${We({left:`${this.hue===0?0:100/(360/this.hue)}%`})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${Y(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?V`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${We({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${We({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${Y(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${We({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":V`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${no?V`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${i.length>0?V`
              <div part="swatches" class="color-picker__swatches">
                ${i.map(c=>{const m=this.parseColor(c);return m?V`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${Y(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${c}
                      @click=${()=>this.selectSwatch(c)}
                      @keydown=${w=>!this.disabled&&w.key==="Enter"&&this.setColor(m.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${We({backgroundColor:m.hexa})}
                      ></div>
                    </div>
                  `:(console.error(`Unable to parse swatch color: "${c}"`,this),"")})}
              </div>
            `:""}
      </div>
    `;return this.inline?s:V`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${te({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":this.size==="small","color-dropdown__trigger--medium":this.size==="medium","color-dropdown__trigger--large":this.size==="large","color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":!0})}
          style=${We({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${s}
      </sl-dropdown>
    `}};le.styles=[ie,Lc];le.dependencies={"sl-button-group":Kt,"sl-button":fe,"sl-dropdown":Pe,"sl-icon":me,"sl-input":oe,"sl-visually-hidden":mr};_([K('[part~="base"]')],le.prototype,"base",2);_([K('[part~="input"]')],le.prototype,"input",2);_([K(".color-dropdown")],le.prototype,"dropdown",2);_([K('[part~="preview"]')],le.prototype,"previewButton",2);_([K('[part~="trigger"]')],le.prototype,"trigger",2);_([ee()],le.prototype,"hasFocus",2);_([ee()],le.prototype,"isDraggingGridHandle",2);_([ee()],le.prototype,"isEmpty",2);_([ee()],le.prototype,"inputValue",2);_([ee()],le.prototype,"hue",2);_([ee()],le.prototype,"saturation",2);_([ee()],le.prototype,"brightness",2);_([ee()],le.prototype,"alpha",2);_([A()],le.prototype,"value",2);_([si()],le.prototype,"defaultValue",2);_([A()],le.prototype,"label",2);_([A()],le.prototype,"format",2);_([A({type:Boolean,reflect:!0})],le.prototype,"inline",2);_([A({reflect:!0})],le.prototype,"size",2);_([A({attribute:"no-format-toggle",type:Boolean})],le.prototype,"noFormatToggle",2);_([A()],le.prototype,"name",2);_([A({type:Boolean,reflect:!0})],le.prototype,"disabled",2);_([A({type:Boolean})],le.prototype,"hoist",2);_([A({type:Boolean})],le.prototype,"opacity",2);_([A({type:Boolean})],le.prototype,"uppercase",2);_([A()],le.prototype,"swatches",2);_([A({reflect:!0})],le.prototype,"form",2);_([A({type:Boolean,reflect:!0})],le.prototype,"required",2);_([Ii({passive:!1})],le.prototype,"handleTouchMove",1);_([q("format",{waitUntilFirstUpdate:!0})],le.prototype,"handleFormatChange",1);_([q("opacity",{waitUntilFirstUpdate:!0})],le.prototype,"handleOpacityChange",1);_([q("value")],le.prototype,"handleValueChange",1);le.define("sl-color-picker");var Uc=Q`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,ln=class extends J{constructor(){super(...arguments),this.hasSlotController=new Ne(this,"footer","header","image")}render(){return V`
      <div
        part="base"
        class=${te({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};ln.styles=[ie,Uc];ln.define("sl-card");var Wc=class{constructor(e,t){this.timerId=0,this.activeInteractions=0,this.paused=!1,this.stopped=!0,this.pause=()=>{this.activeInteractions++||(this.paused=!0,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=!1,this.host.requestUpdate())},e.addController(this),this.host=e,this.tickCallback=t}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:!0}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(e){this.stop(),this.stopped=!1,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},e)}stop(){clearInterval(this.timerId),this.stopped=!0,this.host.requestUpdate()}},Vc=Q`
  :host {
    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--sl-spacing-medium);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--sl-border-radius-small);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .carousel__slides--dragging {
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-small);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    padding: 0;
    margin: 0;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-700);
    transform: scale(1.2);
  }

  /* Focus styles */
  .carousel__slides:focus-visible,
  .carousel__navigation-button:focus-visible,
  .carousel__pagination-item:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*jc(e,t){if(e!==void 0){let i=0;for(const s of e)yield t(s,i++)}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*qc(e,t,i=1){const s=t===void 0?0:e;t!=null||(t=e);for(let c=s;i>0?c<t:t<c;c+=i)yield c}var ke=class extends J{constructor(){super(...arguments),this.loop=!1,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new Wc(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new ce(this),this.pendingSlideChange=!1,this.handleMouseDrag=e=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0,this.dragStartPosition=[e.clientX,e.clientY]),this.scrollContainer.scrollBy({left:-e.movementX,top:-e.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const e=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});const t=e.scrollLeft,i=e.scrollTop;e.style.removeProperty("scroll-snap-type"),e.style.setProperty("overflow","hidden");const s=e.scrollLeft,c=e.scrollTop;e.style.removeProperty("overflow"),e.style.setProperty("scroll-snap-type","none"),e.scrollTo({left:t,top:i,behavior:"instant"}),requestAnimationFrame(async()=>{(t!==s||i!==c)&&(e.scrollTo({left:s,top:c,behavior:Ks()?"auto":"smooth"}),await He(e,"scrollend")),e.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=e=>{e.some(i=>[...i.addedNodes,...i.removedNodes].some(s=>this.isCarouselItem(s)&&!s.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.mutationObserver)==null||e.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}willUpdate(e){(e.has("slidesPerMove")||e.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const e=this.getSlides().length,{slidesPerPage:t,slidesPerMove:i,loop:s}=this,c=s?e/i:(e-t)/i+1;return Math.ceil(c)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:e=!0}={}){return[...this.children].filter(t=>this.isCarouselItem(t)&&(!e||!t.hasAttribute("data-clone")))}handleClick(e){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const t=Math.abs(this.dragStartPosition[0]-e.clientX),i=Math.abs(this.dragStartPosition[1]-e.clientY);Math.sqrt(t*t+i*i)>=10&&e.preventDefault()}}handleKeyDown(e){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){const t=e.target,i=this.localize.dir()==="rtl",s=t.closest('[part~="pagination-item"]')!==null,c=e.key==="ArrowDown"||!i&&e.key==="ArrowRight"||i&&e.key==="ArrowLeft",m=e.key==="ArrowUp"||!i&&e.key==="ArrowLeft"||i&&e.key==="ArrowRight";e.preventDefault(),m&&this.previous(),c&&this.next(),e.key==="Home"&&this.goToSlide(0),e.key==="End"&&this.goToSlide(this.getSlides().length-1),s&&this.updateComplete.then(()=>{var w;const r=(w=this.shadowRoot)==null?void 0:w.querySelector('[part~="pagination-item--active"]');r&&r.focus()})}}handleMouseDragStart(e){this.mouseDragging&&e.button===0&&(e.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const e=new IntersectionObserver(t=>{e.disconnect();for(const r of t){const n=r.target;n.toggleAttribute("inert",!r.isIntersecting),n.classList.toggle("--in-view",r.isIntersecting),n.setAttribute("aria-hidden",r.isIntersecting?"false":"true")}const i=t.find(r=>r.isIntersecting);if(!i)return;const s=this.getSlides({excludeClones:!1}),c=this.getSlides().length,m=s.indexOf(i.target),w=this.loop?m-this.slidesPerPage:m;if(this.activeSlide=(Math.ceil(w/this.slidesPerMove)*this.slidesPerMove+c)%c,!this.scrolling&&this.loop&&i.target.hasAttribute("data-clone")){const r=Number(i.target.getAttribute("data-clone"));this.goToSlide(r,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(t=>{e.observe(t)})}handleScrollEnd(){!this.scrolling||this.dragging||(this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides())}isCarouselItem(e){return e instanceof Element&&e.tagName.toLowerCase()==="sl-carousel-item"}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((e,t)=>{e.classList.remove("--in-view"),e.classList.remove("--is-active"),e.setAttribute("role","group"),e.setAttribute("aria-label",this.localize.term("slideNum",t+1)),this.pagination&&(e.setAttribute("id",`slide-${t+1}`),e.setAttribute("role","tabpanel"),e.removeAttribute("aria-label"),e.setAttribute("aria-labelledby",`tab-${t+1}`)),e.hasAttribute("data-clone")&&e.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const e=this.getSlides(),t=this.slidesPerPage,i=e.slice(-t),s=e.slice(0,t);i.reverse().forEach((c,m)=>{const w=c.cloneNode(!0);w.setAttribute("data-clone",String(e.length-m-1)),this.prepend(w)}),s.forEach((c,m)=>{const w=c.cloneNode(!0);w.setAttribute("data-clone",String(m)),this.append(w)})}handleSlideChange(){const e=this.getSlides();e.forEach((t,i)=>{t.classList.toggle("--is-active",i===this.activeSlide)}),this.hasUpdated&&this.emit("sl-slide-change",{detail:{index:this.activeSlide,slide:e[this.activeSlide]}})}updateSlidesSnap(){const e=this.getSlides(),t=this.slidesPerMove;e.forEach((i,s)=>{(s+t)%t===0?i.style.removeProperty("scroll-snap-align"):i.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(e="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,e)}next(e="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,e)}goToSlide(e,t="smooth"){const{slidesPerPage:i,loop:s}=this,c=this.getSlides(),m=this.getSlides({excludeClones:!1});if(!c.length)return;const w=s?(e+c.length)%c.length:Ee(e,0,c.length-i);this.activeSlide=w;const r=this.localize.dir()==="rtl",n=Ee(e+(s?i:0)+(r?i-1:0),0,m.length-1),u=m[n];this.scrollToSlide(u,Ks()?"auto":t)}scrollToSlide(e,t="smooth"){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const i=this.scrollContainer,s=i.getBoundingClientRect(),c=e.getBoundingClientRect(),m=c.left-s.left,w=c.top-s.top;m||w?(this.pendingSlideChange=!0,i.scrollTo({left:m+i.scrollLeft,top:w+i.scrollTop,behavior:t})):this.pendingSlideChange=!1})}render(){const{slidesPerMove:e,scrolling:t}=this,i=this.getPageCount(),s=this.getCurrentPage(),c=this.canScrollPrev(),m=this.canScrollNext(),w=this.localize.dir()==="ltr";return V`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${te({carousel__slides:!0,"carousel__slides--horizontal":this.orientation==="horizontal","carousel__slides--vertical":this.orientation==="vertical","carousel__slides--dragging":this.dragging})}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${t?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleClick}
        >
          <slot></slot>
        </div>

        ${this.navigation?V`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${te({"carousel__navigation-button":!0,"carousel__navigation-button--previous":!0,"carousel__navigation-button--disabled":!c})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${c?"false":"true"}"
                  @click=${c?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${w?"chevron-left":"chevron-right"}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${te({"carousel__navigation-button":!0,"carousel__navigation-button--next":!0,"carousel__navigation-button--disabled":!m})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${m?"false":"true"}"
                  @click=${m?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${w?"chevron-right":"chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?V`
              <div part="pagination" role="tablist" class="carousel__pagination">
                ${jc(qc(i),r=>{const n=r===s;return V`
                    <button
                      part="pagination-item ${n?"pagination-item--active":""}"
                      class="${te({"carousel__pagination-item":!0,"carousel__pagination-item--active":n})}"
                      role="tab"
                      id="tab-${r+1}"
                      aria-controls="slide-${r+1}"
                      aria-selected="${n?"true":"false"}"
                      aria-label="${n?this.localize.term("slideNum",r+1):this.localize.term("goToSlide",r+1,i)}"
                      tabindex=${n?"0":"-1"}
                      @click=${()=>this.goToSlide(r*e)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:""}
      </div>
    `}};ke.styles=[ie,Vc];ke.dependencies={"sl-icon":me};_([A({type:Boolean,reflect:!0})],ke.prototype,"loop",2);_([A({type:Boolean,reflect:!0})],ke.prototype,"navigation",2);_([A({type:Boolean,reflect:!0})],ke.prototype,"pagination",2);_([A({type:Boolean,reflect:!0})],ke.prototype,"autoplay",2);_([A({type:Number,attribute:"autoplay-interval"})],ke.prototype,"autoplayInterval",2);_([A({type:Number,attribute:"slides-per-page"})],ke.prototype,"slidesPerPage",2);_([A({type:Number,attribute:"slides-per-move"})],ke.prototype,"slidesPerMove",2);_([A()],ke.prototype,"orientation",2);_([A({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],ke.prototype,"mouseDragging",2);_([K(".carousel__slides")],ke.prototype,"scrollContainer",2);_([K(".carousel__pagination")],ke.prototype,"paginationContainer",2);_([ee()],ke.prototype,"activeSlide",2);_([ee()],ke.prototype,"scrolling",2);_([ee()],ke.prototype,"dragging",2);_([Ii({passive:!0})],ke.prototype,"handleScroll",1);_([q("loop",{waitUntilFirstUpdate:!0}),q("slidesPerPage",{waitUntilFirstUpdate:!0})],ke.prototype,"initializeSlides",1);_([q("activeSlide")],ke.prototype,"handleSlideChange",1);_([q("slidesPerMove")],ke.prototype,"updateSlidesSnap",1);_([q("autoplay")],ke.prototype,"handleAutoplayChange",1);ke.define("sl-carousel");var Kc=(e,t)=>{let i=0;return function(...s){window.clearTimeout(i),i=window.setTimeout(()=>{e.call(this,...s)},t)}},ao=(e,t,i)=>{const s=e[t];e[t]=function(...c){s.call(this,...c),i.call(this,s,...c)}};(()=>{if(typeof window>"u")return;if(!("onscrollend"in window)){const t=new Set,i=new WeakMap,s=m=>{for(const w of m.changedTouches)t.add(w.identifier)},c=m=>{for(const w of m.changedTouches)t.delete(w.identifier)};document.addEventListener("touchstart",s,!0),document.addEventListener("touchend",c,!0),document.addEventListener("touchcancel",c,!0),ao(EventTarget.prototype,"addEventListener",function(m,w){if(w!=="scrollend")return;const r=Kc(()=>{t.size?r():this.dispatchEvent(new Event("scrollend"))},100);m.call(this,"scroll",r,{passive:!0}),i.set(this,r)}),ao(EventTarget.prototype,"removeEventListener",function(m,w){if(w!=="scrollend")return;const r=i.get(this);r&&m.call(this,"scroll",r,{passive:!0})})}})();var Xc=Q`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`,cn=class extends J{connectedCallback(){super.connectedCallback()}render(){return V` <slot></slot> `}};cn.styles=[ie,Xc];cn.define("sl-carousel-item");var Gc=Q`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`,Bt=class extends J{constructor(){super(...arguments),this.hasSlotController=new Ne(this,"prefix","suffix"),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){const e=this.defaultSlot.assignedElements({flatten:!0}).filter(t=>t.tagName.toLowerCase()==="sl-dropdown").length>0;if(this.href){this.renderType="link";return}if(e){this.renderType="dropdown";return}this.renderType="button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return V`
      <div
        part="base"
        class=${te({"breadcrumb-item":!0,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${this.renderType==="link"?V`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${Y(this.target?this.target:void 0)}"
                rel=${Y(this.target?this.rel:void 0)}
              >
                <slot @slotchange=${this.handleSlotChange}></slot>
              </a>
            `:""}
        ${this.renderType==="button"?V`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            `:""}
        ${this.renderType==="dropdown"?V`
              <div part="label" class="breadcrumb-item__label breadcrumb-item__label--drop-down">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            `:""}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};Bt.styles=[ie,Gc];_([K("slot:not([name])")],Bt.prototype,"defaultSlot",2);_([ee()],Bt.prototype,"renderType",2);_([A()],Bt.prototype,"href",2);_([A()],Bt.prototype,"target",2);_([A()],Bt.prototype,"rel",2);_([q("href",{waitUntilFirstUpdate:!0})],Bt.prototype,"hrefChanged",1);Bt.define("sl-breadcrumb-item");Kt.define("sl-button-group");var Yc=Q`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,yt=class extends J{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const e=V`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let t=V``;return this.initials?t=V`<div part="initials" class="avatar__initials">${this.initials}</div>`:t=V`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,V`
      <div
        part="base"
        class=${te({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?e:t}
      </div>
    `}};yt.styles=[ie,Yc];yt.dependencies={"sl-icon":me};_([ee()],yt.prototype,"hasError",2);_([A()],yt.prototype,"image",2);_([A()],yt.prototype,"label",2);_([A()],yt.prototype,"initials",2);_([A()],yt.prototype,"loading",2);_([A({reflect:!0})],yt.prototype,"shape",2);_([q("image")],yt.prototype,"handleImageChange",1);yt.define("sl-avatar");var Jc=Q`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,ci=class extends J{constructor(){super(...arguments),this.localize=new ce(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const t=this.separatorSlot.assignedElements({flatten:!0})[0].cloneNode(!0);return[t,...t.querySelectorAll("[id]")].forEach(i=>i.removeAttribute("id")),t.setAttribute("data-default",""),t.slot="separator",t}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>t.tagName.toLowerCase()==="sl-breadcrumb-item");e.forEach((t,i)=>{const s=t.querySelector('[slot="separator"]');s===null?t.append(this.getSeparator()):s.hasAttribute("data-default")&&s.replaceWith(this.getSeparator()),i===e.length-1?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),V`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <sl-icon name=${this.localize.dir()==="rtl"?"chevron-left":"chevron-right"} library="system"></sl-icon>
        </slot>
      </span>
    `}};ci.styles=[ie,Jc];ci.dependencies={"sl-icon":me};_([K("slot")],ci.prototype,"defaultSlot",2);_([K('slot[name="separator"]')],ci.prototype,"separatorSlot",2);_([A()],ci.prototype,"label",2);ci.define("sl-breadcrumb");fe.define("sl-button");var Zc=Q`
  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);

    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }

  :host([play]) slot[name='play-icon'],
  :host(:not([play])) slot[name='pause-icon'] {
    display: none;
  }
`,dt=class extends J{constructor(){super(...arguments),this.isLoaded=!1}handleClick(){this.play=!this.play}handleLoad(){const e=document.createElement("canvas"),{width:t,height:i}=this.animatedImage;e.width=t,e.height=i,e.getContext("2d").drawImage(this.animatedImage,0,0,t,i),this.frozenFrame=e.toDataURL("image/gif"),this.isLoaded||(this.emit("sl-load"),this.isLoaded=!0)}handleError(){this.emit("sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=!1}render(){return V`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?V`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                <slot name="play-icon"><sl-icon name="play-fill" library="system"></sl-icon></slot>
                <slot name="pause-icon"><sl-icon name="pause-fill" library="system"></sl-icon></slot>
              </div>
            `:""}
      </div>
    `}};dt.styles=[ie,Zc];dt.dependencies={"sl-icon":me};_([K(".animated-image__animated")],dt.prototype,"animatedImage",2);_([ee()],dt.prototype,"frozenFrame",2);_([ee()],dt.prototype,"isLoaded",2);_([A()],dt.prototype,"src",2);_([A()],dt.prototype,"alt",2);_([A({type:Boolean,reflect:!0})],dt.prototype,"play",2);_([q("play",{waitUntilFirstUpdate:!0})],dt.prototype,"handlePlayChange",1);_([q("src")],dt.prototype,"handleSrcChange",1);dt.define("sl-animated-image");var Qc=Q`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,Vi=class extends J{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return V`
      <span
        part="base"
        class=${te({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};Vi.styles=[ie,Qc];_([A({reflect:!0})],Vi.prototype,"variant",2);_([A({type:Boolean,reflect:!0})],Vi.prototype,"pill",2);_([A({type:Boolean,reflect:!0})],Vi.prototype,"pulse",2);Vi.define("sl-badge");var eh=Q`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,Qe=class Mt extends J{constructor(){super(...arguments),this.hasSlotController=new Ne(this,"icon","suffix"),this.localize=new ce(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}static get toastStack(){return this.currentToastStack||(this.currentToastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"})),this.currentToastStack}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100))}pauseAutoHide(){var t;(t=this.countdownAnimation)==null||t.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var t;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.remainingTime),this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100),(t=this.countdownAnimation)==null||t.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement:t}=this,i="100%",s="0";this.countdownAnimation=t.animate([{width:i},{width:s}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await Ae(this.base),this.base.hidden=!1;const{keyframes:t,options:i}=_e(this,"alert.show",{dir:this.localize.dir()});await Ce(this.base,t,i),this.emit("sl-after-show")}else{yr(this),this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await Ae(this.base);const{keyframes:t,options:i}=_e(this,"alert.hide",{dir:this.localize.dir()});await Ce(this.base,t,i),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,He(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,He(this,"sl-after-hide")}async toast(){return new Promise(t=>{this.handleCountdownChange(),Mt.toastStack.parentElement===null&&document.body.append(Mt.toastStack),Mt.toastStack.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{Mt.toastStack.removeChild(this),t(),Mt.toastStack.querySelector("sl-alert")===null&&Mt.toastStack.remove()},{once:!0})})}render(){return V`
      <div
        part="base"
        class=${te({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?V`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?V`
              <div
                class=${te({alert__countdown:!0,"alert__countdown--ltr":this.countdown==="ltr"})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};Qe.styles=[ie,eh];Qe.dependencies={"sl-icon-button":De};_([K('[part~="base"]')],Qe.prototype,"base",2);_([K(".alert__countdown-elapsed")],Qe.prototype,"countdownElement",2);_([A({type:Boolean,reflect:!0})],Qe.prototype,"open",2);_([A({type:Boolean,reflect:!0})],Qe.prototype,"closable",2);_([A({reflect:!0})],Qe.prototype,"variant",2);_([A({type:Number})],Qe.prototype,"duration",2);_([A({type:String,reflect:!0})],Qe.prototype,"countdown",2);_([ee()],Qe.prototype,"remainingTime",2);_([q("open",{waitUntilFirstUpdate:!0})],Qe.prototype,"handleOpenChange",1);_([q("duration")],Qe.prototype,"handleDurationChange",1);var th=Qe;ue("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});ue("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});th.define("sl-alert");const ih=[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],sh=[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],rh=[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],oh=[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],nh=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],ah=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],lh=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],ch=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],hh=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],dh=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],uh=[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],ph=[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],fh=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],gh=[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],mh=[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],vh=[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],_h=[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],bh=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],yh=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],wh=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],Sh=[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],Ch=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],xh=[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],kh=[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Eh=[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Ah=[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],Lh=[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],Dh=[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],Th=[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],Rh=[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],$h=[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],Bh=[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],Oh=[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Mh=[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Ih=[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Ph=[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],zh=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Fh=[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Hh=[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Nh=[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Uh=[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Wh=[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Vh=[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],jh=[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],qh=[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],Kh=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],Xh=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],Gh=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],Yh=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],Jh=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],Zh=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],Qh=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],ed=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],td=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],id=[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],sd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],rd=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],od=[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg)`,easing:"ease-out"},{offset:.5,transform:`perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg)`,easing:"ease-in"},{offset:.8,transform:`perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg)`,easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],nd=[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],ad=[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],ld=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],cd=[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],hd=[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],dd=[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],ud=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],pd=[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],fd=[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],gd=[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],md=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],vd=[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],_d=[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],bd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],yd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],wd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Sd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],Cd=[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],xd=[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],kd=[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Ed=[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Ad=[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],Ld=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],Dd=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],Td=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],Rd=[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],$d=[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],Bd=[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],Od=[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],Md=[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],Id=[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],Pd=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zd=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Fd=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Hd=[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Nd=[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],Ud=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],Wd=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],Vd=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],jd=[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],hn={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},qd=Object.freeze(Object.defineProperty({__proto__:null,easings:hn,bounce:ih,flash:sh,headShake:rh,heartBeat:oh,jello:nh,pulse:ah,rubberBand:lh,shake:ch,shakeX:hh,shakeY:dh,swing:uh,tada:ph,wobble:fh,backInDown:gh,backInLeft:mh,backInRight:vh,backInUp:_h,backOutDown:bh,backOutLeft:yh,backOutRight:wh,backOutUp:Sh,bounceIn:Ch,bounceInDown:xh,bounceInLeft:kh,bounceInRight:Eh,bounceInUp:Ah,bounceOut:Lh,bounceOutDown:Dh,bounceOutLeft:Th,bounceOutRight:Rh,bounceOutUp:$h,fadeIn:Bh,fadeInBottomLeft:Oh,fadeInBottomRight:Mh,fadeInDown:Ih,fadeInDownBig:Ph,fadeInLeft:zh,fadeInLeftBig:Fh,fadeInRight:Hh,fadeInRightBig:Nh,fadeInTopLeft:Uh,fadeInTopRight:Wh,fadeInUp:Vh,fadeInUpBig:jh,fadeOut:qh,fadeOutBottomLeft:Kh,fadeOutBottomRight:Xh,fadeOutDown:Gh,fadeOutDownBig:Yh,fadeOutLeft:Jh,fadeOutLeftBig:Zh,fadeOutRight:Qh,fadeOutRightBig:ed,fadeOutTopLeft:td,fadeOutTopRight:id,fadeOutUp:sd,fadeOutUpBig:rd,flip:od,flipInX:nd,flipInY:ad,flipOutX:ld,flipOutY:cd,lightSpeedInLeft:hd,lightSpeedInRight:dd,lightSpeedOutLeft:ud,lightSpeedOutRight:pd,rotateIn:fd,rotateInDownLeft:gd,rotateInDownRight:md,rotateInUpLeft:vd,rotateInUpRight:_d,rotateOut:bd,rotateOutDownLeft:yd,rotateOutDownRight:wd,rotateOutUpLeft:Sd,rotateOutUpRight:Cd,slideInDown:xd,slideInLeft:kd,slideInRight:Ed,slideInUp:Ad,slideOutDown:Ld,slideOutLeft:Dd,slideOutRight:Td,slideOutUp:Rd,hinge:$d,jackInTheBox:Bd,rollIn:Od,rollOut:Md,zoomIn:Id,zoomInDown:Pd,zoomInLeft:zd,zoomInRight:Fd,zoomInUp:Hd,zoomOut:Nd,zoomOutDown:Ud,zoomOutLeft:Wd,zoomOutRight:Vd,zoomOutUp:jd},Symbol.toStringTag,{value:"Module"}));var Kd=Q`
  :host {
    display: contents;
  }
<<<<<<<< HEAD:docs/assets/index.a71393cf.js
`,$e=class extends J{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-finish")},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-cancel")}}get currentTime(){var e,t;return(t=(e=this.animation)==null?void 0:e.currentTime)!=null?t:0}set currentTime(e){this.animation&&(this.animation.currentTime=e)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var e,t;const i=(e=cn[this.easing])!=null?e:this.easing,s=(t=this.keyframes)!=null?t:jd[this.name],m=(await this.defaultSlot).assignedElements()[0];return!m||!s?!1:(this.destroyAnimation(),this.animation=m.animate(s,{delay:this.delay,direction:this.direction,duration:this.duration,easing:i,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.emit("sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){!this.hasUpdated||this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.emit("sl-start")),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){var e;(e=this.animation)==null||e.cancel()}finish(){var e;(e=this.animation)==null||e.finish()}render(){return W` <slot @slotchange=${this.handleSlotChange}></slot> `}};$e.styles=[ie,qd];_([pa("slot")],$e.prototype,"defaultSlot",2);_([A()],$e.prototype,"name",2);_([A({type:Boolean,reflect:!0})],$e.prototype,"play",2);_([A({type:Number})],$e.prototype,"delay",2);_([A()],$e.prototype,"direction",2);_([A({type:Number})],$e.prototype,"duration",2);_([A()],$e.prototype,"easing",2);_([A({attribute:"end-delay",type:Number})],$e.prototype,"endDelay",2);_([A()],$e.prototype,"fill",2);_([A({type:Number})],$e.prototype,"iterations",2);_([A({attribute:"iteration-start",type:Number})],$e.prototype,"iterationStart",2);_([A({attribute:!1})],$e.prototype,"keyframes",2);_([A({attribute:"playback-rate",type:Number})],$e.prototype,"playbackRate",2);_([q(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],$e.prototype,"handleAnimationChange",1);_([q("play")],$e.prototype,"handlePlayChange",1);_([q("playbackRate")],$e.prototype,"handlePlaybackRateChange",1);$e.define("sl-animation");class Kd{constructor(){me(this,"listeners",{})}on(t,i){var s,h;((h=(s=this.listeners)[t])!=null?h:s[t]=[]).push(i)}emit(t){var i;(i=this.listeners[t])==null||i.forEach(s=>s())}}class Xd{constructor(t,i,s){me(this,"tabs",[]);me(this,"activeIndex",0);me(this,"emp_model",Qi.createModel("","python"));this.tabBar=t,this.editor=i,this.filemgr=s,this.editor.onDidChangeModelContent(()=>{if(this.activeIndex<0||this.activeIndex>=this.tabs.length)return;const h=this.tabs[this.activeIndex];h.dispname.startsWith("*")||(h.dispname="*"+h.name,this.render())})}async addContentTab(t){if(t!=="<\u7121\u984C>"){for(const h of this.tabs)if(h.name===t){console.warn(`Tab with name "${t}" already exists.`);return}}this.tabs.push({name:t,dispname:t,model:this.emp_model}),this.activeIndex=this.tabs.length-1,this.editor.setModel(this.emp_model),this.render();var i="";try{i=await this.filemgr.fileRead(t)}catch(h){i=`# ${Date.now()}.py : ${h}`,console.warn(i)}const s=Qi.createModel(i,"python");s.setEOL(Qi.EndOfLineSequence.LF),this.tabs[this.activeIndex].model=s,this.editor.setModel(s),this.render()}switchTab(t){this.activeIndex=t,this.editor.setModel(this.tabs[t].model),this.render()}render(){this.tabBar.innerHTML="",this.tabs.forEach((t,i)=>{const s=document.createElement("div");s.textContent=t.dispname,s.className="tab"+(i===this.activeIndex?" active":"");const h=document.createElement("span");h.textContent=" \xD7",h.style.marginLeft="4px",h.style.cursor="pointer",h.onclick=async m=>{if(m.stopPropagation(),!t.dispname.startsWith("*")){this.closeTab(i);return}if(window.confirm("\u5909\u66F4\u3092\u4FDD\u5B58\u305B\u305A\u306B\u9589\u3058\u3066\u3082\u826F\u3044\u3067\u3059\u304B\uFF1F")){this.closeTab(i);return}},s.appendChild(h),s.onclick=()=>this.switchTab(i),this.tabBar.appendChild(s)})}closeTab(t){this.tabs.splice(t,1),this.tabs.length===0?(this.editor.setModel(null),this.activeIndex=-1):(this.activeIndex>=this.tabs.length&&(this.activeIndex=this.tabs.length-1),this.editor.setModel(this.tabs[this.activeIndex].model)),this.render()}newfilename(t){const i=prompt("\u65B0\u3057\u3044\u30D5\u30A1\u30A4\u30EB\u540D\u3092\u5165\u529B\uFF1A",`${t}`);if(!i)return console.log("File copy canceled"),null;const s=i.includes(".")?i:`${i}.py`;return this.filemgr.fileExists(s)?(alert(`\u30D5\u30A1\u30A4\u30EB\u540D "${s}" \u306F\u3059\u3067\u306B\u5B58\u5728\u3057\u307E\u3059\u3002\u5225\u306E\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002`),null):s}async saveCurrentTab(){if(this.activeIndex<0||this.activeIndex>=this.tabs.length){console.warn("No active tab to save");return}var t=this.tabs[this.activeIndex].name;if(t==="<\u7121\u984C>"){if(t=this.newfilename(""),t==null)return;this.tabs[this.activeIndex].name=t}const i=this.tabs[this.activeIndex].model.getValue();await this.filemgr.fileWrite(t,i),this.tabs[this.activeIndex].dispname=t,this.render(),this.filemgr.fileList()}}self.MonacoEnvironment={getWorker:function(e,t){return t==="json"?new yn:t==="typescript"||t==="javascript"?new wn:new bn}};document.addEventListener("DOMContentLoaded",()=>{const e=document.createElement("div");e.textContent=`Build Number: ${135}`,e.style.position="absolute",e.style.bottom="10px",e.style.right="10px",e.style.backgroundColor="rgba(0, 0, 0, 0.7)",e.style.color="white",e.style.padding="5px 10px",e.style.borderRadius="5px",document.body.appendChild(e)});const ds=new zt(Gd),yr=new _n(ds),wr=new mn({scrollback:1e3},new ko.exports.FitAddon,yr);async function Gd(e){await new Promise(t=>{wr.write(e,t)})}const Sr=Qi.create(document.getElementById("editor"),{value:"",language:"python",theme:"vs-dark"}),ws=new gn(yr,wr);async function Yd(){await ds.initialize(),await wr.initialize(),await ws.initialize()}Yd();const st=new Kd,Cr=new Xd(document.getElementById("tab-bar"),Sr,ws);var fo;(fo=document.getElementById("new-file"))==null||fo.addEventListener("click",()=>st.emit("new"));var go;(go=document.getElementById("save-file"))==null||go.addEventListener("click",()=>st.emit("save"));var mo;(mo=document.getElementById("run-script"))==null||mo.addEventListener("click",()=>st.emit("run"));st.on("new",()=>Cr.addContentTab("<\u7121\u984C>"));st.on("save",()=>Cr.saveCurrentTab());st.on("run",async()=>{await yr.executeCommand(Sr.getValue())});st.on("list",async()=>{await ws.fileList()});var vo;(vo=document.getElementById("newFileButton"))==null||vo.addEventListener("click",()=>st.emit("new"));var _o;(_o=document.getElementById("saveFileButton"))==null||_o.addEventListener("click",()=>st.emit("save"));Sr.addCommand(pn.CtrlCmd|fn.KeyS,()=>st.emit("save"));var bo;(bo=document.getElementById("file-tree"))==null||bo.addEventListener("sl-selection-change",async e=>{var i;const t=(i=e.detail.selection[0])==null?void 0:i.textContent;!t||Cr.addContentTab(t)});var yo;(yo=document.getElementById("refreshFileList"))==null||yo.addEventListener("click",()=>st.emit("list"));var wo;(wo=document.getElementById("runCodeButton"))==null||wo.addEventListener("click",()=>st.emit("run"));const Ss=document.getElementById("stopButton");Ss.addEventListener("click",async()=>{await ds.sendControl(3),await ds.sendControl(2)});document.addEventListener(zt.EVENT_CONNECTED,()=>{console.log("<Connected> event"),Ss.disabled=!1});document.addEventListener(zt.EVENT_DISCONNECTED,()=>{Ss.disabled=!0,ws.disableAllButtons()});Ss.disabled=!0;
========
`,$e=class extends J{constructor(){super(...arguments),this.hasStarted=!1,this.name="none",this.play=!1,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-finish")},this.handleAnimationCancel=()=>{this.play=!1,this.hasStarted=!1,this.emit("sl-cancel")}}get currentTime(){var e,t;return(t=(e=this.animation)==null?void 0:e.currentTime)!=null?t:0}set currentTime(e){this.animation&&(this.animation.currentTime=e)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var e,t;const i=(e=hn[this.easing])!=null?e:this.easing,s=(t=this.keyframes)!=null?t:qd[this.name],m=(await this.defaultSlot).assignedElements()[0];return!m||!s?!1:(this.destroyAnimation(),this.animation=m.animate(s,{delay:this.delay,direction:this.direction,duration:this.duration,easing:i,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=!0,this.emit("sl-start")):this.animation.pause(),!0)}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=!1)}handleAnimationChange(){!this.hasUpdated||this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=!0,this.emit("sl-start")),this.play?this.animation.play():this.animation.pause(),!0):!1}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){var e;(e=this.animation)==null||e.cancel()}finish(){var e;(e=this.animation)==null||e.finish()}render(){return V` <slot @slotchange=${this.handleSlotChange}></slot> `}};$e.styles=[ie,Kd];_([fa("slot")],$e.prototype,"defaultSlot",2);_([A()],$e.prototype,"name",2);_([A({type:Boolean,reflect:!0})],$e.prototype,"play",2);_([A({type:Number})],$e.prototype,"delay",2);_([A()],$e.prototype,"direction",2);_([A({type:Number})],$e.prototype,"duration",2);_([A()],$e.prototype,"easing",2);_([A({attribute:"end-delay",type:Number})],$e.prototype,"endDelay",2);_([A()],$e.prototype,"fill",2);_([A({type:Number})],$e.prototype,"iterations",2);_([A({attribute:"iteration-start",type:Number})],$e.prototype,"iterationStart",2);_([A({attribute:!1})],$e.prototype,"keyframes",2);_([A({attribute:"playback-rate",type:Number})],$e.prototype,"playbackRate",2);_([q(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],$e.prototype,"handleAnimationChange",1);_([q("play")],$e.prototype,"handlePlayChange",1);_([q("playbackRate")],$e.prototype,"handlePlaybackRateChange",1);$e.define("sl-animation");class Xd{constructor(){de(this,"listeners",{})}on(t,i){var s,c;((c=(s=this.listeners)[t])!=null?c:s[t]=[]).push(i)}emit(t){var i;(i=this.listeners[t])==null||i.forEach(s=>s())}}class Gd{constructor(t,i,s){de(this,"tabs",[]);de(this,"activeIndex",0);de(this,"emp_model",es.createModel("","python"));this.tabBar=t,this.editor=i,this.filemgr=s,this.editor.onDidChangeModelContent(()=>{if(this.activeIndex<0||this.activeIndex>=this.tabs.length)return;const c=this.tabs[this.activeIndex];c.dispname.startsWith("*")||(c.dispname="*"+c.name,this.render())})}async addContentTab(t){if(t!=="<\u7121\u984C>"){for(const c of this.tabs)if(c.name===t){console.warn(`Tab with name "${t}" already exists.`);return}}this.tabs.push({name:t,dispname:t,model:this.emp_model}),this.activeIndex=this.tabs.length-1,this.editor.setModel(this.emp_model),this.render();var i="";try{const c=await this.filemgr.fileRead(t);i=c==null?"":c}catch(c){i="",console.warn(`Failed to read file ${t}:`,c)}const s=es.createModel(i,"python");s.setEOL(es.EndOfLineSequence.LF),this.tabs[this.activeIndex].model=s,this.editor.setModel(s),this.render()}switchTab(t){this.activeIndex=t,this.editor.setModel(this.tabs[t].model),this.render()}render(){this.tabBar.innerHTML="",this.tabs.forEach((t,i)=>{const s=document.createElement("div");s.textContent=t.dispname,s.className="tab"+(i===this.activeIndex?" active":"");const c=document.createElement("span");c.textContent=" \xD7",c.style.marginLeft="4px",c.style.cursor="pointer",c.onclick=async m=>{if(m.stopPropagation(),!t.dispname.startsWith("*")){this.closeTab(i);return}if(window.confirm("\u5909\u66F4\u3092\u4FDD\u5B58\u305B\u305A\u306B\u9589\u3058\u3066\u3082\u826F\u3044\u3067\u3059\u304B\uFF1F")){this.closeTab(i);return}},s.appendChild(c),s.onclick=()=>this.switchTab(i),this.tabBar.appendChild(s)})}closeTab(t){this.tabs.splice(t,1),this.tabs.length===0?(this.editor.setModel(null),this.activeIndex=-1):(this.activeIndex>=this.tabs.length&&(this.activeIndex=this.tabs.length-1),this.editor.setModel(this.tabs[this.activeIndex].model)),this.render()}newfilename(t){const i=prompt("\u65B0\u3057\u3044\u30D5\u30A1\u30A4\u30EB\u540D\u3092\u5165\u529B\uFF1A",`${t}`);if(!i)return console.log("File copy canceled"),null;const s=i.includes(".")?i:`${i}.py`;return this.filemgr.fileExists(s)?(alert(`\u30D5\u30A1\u30A4\u30EB\u540D "${s}" \u306F\u3059\u3067\u306B\u5B58\u5728\u3057\u307E\u3059\u3002\u5225\u306E\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002`),null):s}async saveCurrentTab(){if(this.activeIndex<0||this.activeIndex>=this.tabs.length){console.warn("No active tab to save");return}var t=this.tabs[this.activeIndex].name;if(t==="<\u7121\u984C>"){if(t=this.newfilename(""),t==null)return;this.tabs[this.activeIndex].name=t}const i=this.tabs[this.activeIndex].model.getValue();await this.filemgr.fileWrite(t,i),this.tabs[this.activeIndex].dispname=t,this.render(),this.filemgr.fileList()}}self.MonacoEnvironment={getWorker:function(e,t){return t==="json"?new wn:t==="typescript"||t==="javascript"?new Sn:new yn}};document.addEventListener("DOMContentLoaded",()=>{const e=document.createElement("div");e.textContent=`Build Number: ${145}`,e.style.position="absolute",e.style.bottom="10px",e.style.right="calc(10px + 2ch)",e.style.backgroundColor="rgba(0, 0, 0, 0.7)",e.style.color="white",e.style.padding="5px 10px",e.style.borderRadius="5px",document.body.appendChild(e)});const us=new Pt(Yd),wr=new bn(us),Sr=new vn({scrollback:1e3},new Eo.exports.FitAddon,wr);async function Yd(e){await new Promise(t=>{Sr.write(e,t)})}const Cr=es.create(document.getElementById("editor"),{value:"",language:"python",theme:"vs-dark"}),Ss=new mn(wr,Sr);async function Jd(){await us.initialize(),await Sr.initialize(),await Ss.initialize()}Jd();const st=new Xd,xr=new Gd(document.getElementById("tab-bar"),Cr,Ss);var go;(go=document.getElementById("new-file"))==null||go.addEventListener("click",()=>st.emit("new"));var mo;(mo=document.getElementById("save-file"))==null||mo.addEventListener("click",()=>st.emit("save"));var vo;(vo=document.getElementById("run-script"))==null||vo.addEventListener("click",()=>st.emit("run"));st.on("new",()=>xr.addContentTab("<\u7121\u984C>"));st.on("save",()=>xr.saveCurrentTab());st.on("run",async()=>{await wr.executeCommand(Cr.getValue())});st.on("list",async()=>{await Ss.fileList()});var _o;(_o=document.getElementById("newFileButton"))==null||_o.addEventListener("click",()=>st.emit("new"));var bo;(bo=document.getElementById("saveFileButton"))==null||bo.addEventListener("click",()=>st.emit("save"));Cr.addCommand(fn.CtrlCmd|gn.KeyS,()=>st.emit("save"));var yo;(yo=document.getElementById("file-tree"))==null||yo.addEventListener("sl-selection-change",async e=>{var i;const t=(i=e.detail.selection[0])==null?void 0:i.textContent;!t||xr.addContentTab(t)});var wo;(wo=document.getElementById("refreshFileList"))==null||wo.addEventListener("click",()=>st.emit("list"));var So;(So=document.getElementById("runCodeButton"))==null||So.addEventListener("click",()=>st.emit("run"));const Cs=document.getElementById("stopButton");Cs.addEventListener("click",async()=>{await us.sendControl(3),await us.sendControl(2)});document.addEventListener(Pt.EVENT_CONNECTED,()=>{console.log("<Connected> event"),Cs.disabled=!1});document.addEventListener(Pt.EVENT_DISCONNECTED,()=>{Cs.disabled=!0,Ss.disableAllButtons()});Cs.disabled=!0;
>>>>>>>> 50e43e82bba6e38441caa9e51b4d77f2e4af9941:docs/assets/index.249327d1.js
