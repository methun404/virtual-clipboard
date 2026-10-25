(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var At={},ba=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Lr={},K={};let Ai;const Ia=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];K.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};K.getSymbolTotalCodewords=function(e){return Ia[e]};K.getBCHDigit=function(n){let e=0;for(;n!==0;)e++,n>>>=1;return e};K.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');Ai=e};K.isKanjiModeEnabled=function(){return typeof Ai<"u"};K.toSJIS=function(e){return Ai(e)};var gn={};(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function e(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+t)}}n.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},n.from=function(i,s){if(n.isValid(i))return i;try{return e(i)}catch{return s}}})(gn);function Mr(){this.buffer=[],this.length=0}Mr.prototype={get:function(n){const e=Math.floor(n/8);return(this.buffer[e]>>>7-n%8&1)===1},put:function(n,e){for(let t=0;t<e;t++)this.putBit((n>>>e-t-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(n){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),n&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var Sa=Mr;function kt(n){if(!n||n<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=n,this.data=new Uint8Array(n*n),this.reservedBit=new Uint8Array(n*n)}kt.prototype.set=function(n,e,t,i){const s=n*this.size+e;this.data[s]=t,i&&(this.reservedBit[s]=!0)};kt.prototype.get=function(n,e){return this.data[n*this.size+e]};kt.prototype.xor=function(n,e,t){this.data[n*this.size+e]^=t};kt.prototype.isReserved=function(n,e){return this.reservedBit[n*this.size+e]};var Ta=kt,xr={};(function(n){const e=K.getSymbolSize;n.getRowColCoords=function(i){if(i===1)return[];const s=Math.floor(i/7)+2,r=e(i),o=r===145?26:Math.ceil((r-13)/(2*s-2))*2,a=[r-7];for(let l=1;l<s-1;l++)a[l]=a[l-1]-o;return a.push(6),a.reverse()},n.getPositions=function(i){const s=[],r=n.getRowColCoords(i),o=r.length;for(let a=0;a<o;a++)for(let l=0;l<o;l++)a===0&&l===0||a===0&&l===o-1||a===o-1&&l===0||s.push([r[a],r[l]]);return s}})(xr);var Or={};const Na=K.getSymbolSize,ws=7;Or.getPositions=function(e){const t=Na(e);return[[0,0],[t-ws,0],[0,t-ws]]};var Fr={};(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};n.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},n.from=function(s){return n.isValid(s)?parseInt(s,10):void 0},n.getPenaltyN1=function(s){const r=s.size;let o=0,a=0,l=0,c=null,h=null;for(let u=0;u<r;u++){a=l=0,c=h=null;for(let d=0;d<r;d++){let f=s.get(u,d);f===c?a++:(a>=5&&(o+=e.N1+(a-5)),c=f,a=1),f=s.get(d,u),f===h?l++:(l>=5&&(o+=e.N1+(l-5)),h=f,l=1)}a>=5&&(o+=e.N1+(a-5)),l>=5&&(o+=e.N1+(l-5))}return o},n.getPenaltyN2=function(s){const r=s.size;let o=0;for(let a=0;a<r-1;a++)for(let l=0;l<r-1;l++){const c=s.get(a,l)+s.get(a,l+1)+s.get(a+1,l)+s.get(a+1,l+1);(c===4||c===0)&&o++}return o*e.N2},n.getPenaltyN3=function(s){const r=s.size;let o=0,a=0,l=0;for(let c=0;c<r;c++){a=l=0;for(let h=0;h<r;h++)a=a<<1&2047|s.get(c,h),h>=10&&(a===1488||a===93)&&o++,l=l<<1&2047|s.get(h,c),h>=10&&(l===1488||l===93)&&o++}return o*e.N3},n.getPenaltyN4=function(s){let r=0;const o=s.data.length;for(let l=0;l<o;l++)r+=s.data[l];return Math.abs(Math.ceil(r*100/o/5)-10)*e.N4};function t(i,s,r){switch(i){case n.Patterns.PATTERN000:return(s+r)%2===0;case n.Patterns.PATTERN001:return s%2===0;case n.Patterns.PATTERN010:return r%3===0;case n.Patterns.PATTERN011:return(s+r)%3===0;case n.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(r/3))%2===0;case n.Patterns.PATTERN101:return s*r%2+s*r%3===0;case n.Patterns.PATTERN110:return(s*r%2+s*r%3)%2===0;case n.Patterns.PATTERN111:return(s*r%3+(s+r)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}n.applyMask=function(s,r){const o=r.size;for(let a=0;a<o;a++)for(let l=0;l<o;l++)r.isReserved(l,a)||r.xor(l,a,t(s,l,a))},n.getBestMask=function(s,r){const o=Object.keys(n.Patterns).length;let a=0,l=1/0;for(let c=0;c<o;c++){r(c),n.applyMask(c,s);const h=n.getPenaltyN1(s)+n.getPenaltyN2(s)+n.getPenaltyN3(s)+n.getPenaltyN4(s);n.applyMask(c,s),h<l&&(l=h,a=c)}return a}})(Fr);var _n={};const de=gn,Ft=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Bt=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];_n.getBlocksCount=function(e,t){switch(t){case de.L:return Ft[(e-1)*4+0];case de.M:return Ft[(e-1)*4+1];case de.Q:return Ft[(e-1)*4+2];case de.H:return Ft[(e-1)*4+3];default:return}};_n.getTotalCodewordsCount=function(e,t){switch(t){case de.L:return Bt[(e-1)*4+0];case de.M:return Bt[(e-1)*4+1];case de.Q:return Bt[(e-1)*4+2];case de.H:return Bt[(e-1)*4+3];default:return}};var Br={},mn={};const ht=new Uint8Array(512),Kt=new Uint8Array(256);(function(){let e=1;for(let t=0;t<255;t++)ht[t]=e,Kt[e]=t,e<<=1,e&256&&(e^=285);for(let t=255;t<512;t++)ht[t]=ht[t-255]})();mn.log=function(e){if(e<1)throw new Error("log("+e+")");return Kt[e]};mn.exp=function(e){return ht[e]};mn.mul=function(e,t){return e===0||t===0?0:ht[Kt[e]+Kt[t]]};(function(n){const e=mn;n.mul=function(i,s){const r=new Uint8Array(i.length+s.length-1);for(let o=0;o<i.length;o++)for(let a=0;a<s.length;a++)r[o+a]^=e.mul(i[o],s[a]);return r},n.mod=function(i,s){let r=new Uint8Array(i);for(;r.length-s.length>=0;){const o=r[0];for(let l=0;l<s.length;l++)r[l]^=e.mul(s[l],o);let a=0;for(;a<r.length&&r[a]===0;)a++;r=r.slice(a)}return r},n.generateECPolynomial=function(i){let s=new Uint8Array([1]);for(let r=0;r<i;r++)s=n.mul(s,new Uint8Array([1,e.exp(r)]));return s}})(Br);const Ur=Br;function ki(n){this.genPoly=void 0,this.degree=n,this.degree&&this.initialize(this.degree)}ki.prototype.initialize=function(e){this.degree=e,this.genPoly=Ur.generateECPolynomial(this.degree)};ki.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(e.length+this.degree);t.set(e);const i=Ur.mod(t,this.genPoly),s=this.degree-i.length;if(s>0){const r=new Uint8Array(this.degree);return r.set(i,s),r}return i};var Ra=ki,Wr={},Ce={},Pi={};Pi.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var ie={};const Hr="[0-9]+",Aa="[A-Z $%*+\\-./:]+";let mt="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";mt=mt.replace(/u/g,"\\u");const ka="(?:(?![A-Z0-9 $%*+\\-./:]|"+mt+`)(?:.|[\r
]))+`;ie.KANJI=new RegExp(mt,"g");ie.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");ie.BYTE=new RegExp(ka,"g");ie.NUMERIC=new RegExp(Hr,"g");ie.ALPHANUMERIC=new RegExp(Aa,"g");const Pa=new RegExp("^"+mt+"$"),Da=new RegExp("^"+Hr+"$"),La=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");ie.testKanji=function(e){return Pa.test(e)};ie.testNumeric=function(e){return Da.test(e)};ie.testAlphanumeric=function(e){return La.test(e)};(function(n){const e=Pi,t=ie;n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(r,o){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!e.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?r.ccBits[0]:o<27?r.ccBits[1]:r.ccBits[2]},n.getBestModeForData=function(r){return t.testNumeric(r)?n.NUMERIC:t.testAlphanumeric(r)?n.ALPHANUMERIC:t.testKanji(r)?n.KANJI:n.BYTE},n.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},n.isValid=function(r){return r&&r.bit&&r.ccBits};function i(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+s)}}n.from=function(r,o){if(n.isValid(r))return r;try{return i(r)}catch{return o}}})(Ce);(function(n){const e=K,t=_n,i=gn,s=Ce,r=Pi,o=7973,a=e.getBCHDigit(o);function l(d,f,p){for(let _=1;_<=40;_++)if(f<=n.getCapacity(_,p,d))return _}function c(d,f){return s.getCharCountIndicator(d,f)+4}function h(d,f){let p=0;return d.forEach(function(_){const S=c(_.mode,f);p+=S+_.getBitsLength()}),p}function u(d,f){for(let p=1;p<=40;p++)if(h(d,p)<=n.getCapacity(p,f,s.MIXED))return p}n.from=function(f,p){return r.isValid(f)?parseInt(f,10):p},n.getCapacity=function(f,p,_){if(!r.isValid(f))throw new Error("Invalid QR Code version");typeof _>"u"&&(_=s.BYTE);const S=e.getSymbolTotalCodewords(f),m=t.getTotalCodewordsCount(f,p),E=(S-m)*8;if(_===s.MIXED)return E;const y=E-c(_,f);switch(_){case s.NUMERIC:return Math.floor(y/10*3);case s.ALPHANUMERIC:return Math.floor(y/11*2);case s.KANJI:return Math.floor(y/13);case s.BYTE:default:return Math.floor(y/8)}},n.getBestVersionForData=function(f,p){let _;const S=i.from(p,i.M);if(Array.isArray(f)){if(f.length>1)return u(f,S);if(f.length===0)return 1;_=f[0]}else _=f;return l(_.mode,_.getLength(),S)},n.getEncodedBits=function(f){if(!r.isValid(f)||f<7)throw new Error("Invalid QR Code version");let p=f<<12;for(;e.getBCHDigit(p)-a>=0;)p^=o<<e.getBCHDigit(p)-a;return f<<12|p}})(Wr);var Vr={};const ei=K,$r=1335,Ma=21522,bs=ei.getBCHDigit($r);Vr.getEncodedBits=function(e,t){const i=e.bit<<3|t;let s=i<<10;for(;ei.getBCHDigit(s)-bs>=0;)s^=$r<<ei.getBCHDigit(s)-bs;return(i<<10|s)^Ma};var zr={};const xa=Ce;function He(n){this.mode=xa.NUMERIC,this.data=n.toString()}He.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};He.prototype.getLength=function(){return this.data.length};He.prototype.getBitsLength=function(){return He.getBitsLength(this.data.length)};He.prototype.write=function(e){let t,i,s;for(t=0;t+3<=this.data.length;t+=3)i=this.data.substr(t,3),s=parseInt(i,10),e.put(s,10);const r=this.data.length-t;r>0&&(i=this.data.substr(t),s=parseInt(i,10),e.put(s,r*3+1))};var Oa=He;const Fa=Ce,Mn=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Ve(n){this.mode=Fa.ALPHANUMERIC,this.data=n}Ve.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};Ve.prototype.getLength=function(){return this.data.length};Ve.prototype.getBitsLength=function(){return Ve.getBitsLength(this.data.length)};Ve.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let i=Mn.indexOf(this.data[t])*45;i+=Mn.indexOf(this.data[t+1]),e.put(i,11)}this.data.length%2&&e.put(Mn.indexOf(this.data[t]),6)};var Ba=Ve;const Ua=Ce;function $e(n){this.mode=Ua.BYTE,typeof n=="string"?this.data=new TextEncoder().encode(n):this.data=new Uint8Array(n)}$e.getBitsLength=function(e){return e*8};$e.prototype.getLength=function(){return this.data.length};$e.prototype.getBitsLength=function(){return $e.getBitsLength(this.data.length)};$e.prototype.write=function(n){for(let e=0,t=this.data.length;e<t;e++)n.put(this.data[e],8)};var Wa=$e;const Ha=Ce,Va=K;function ze(n){this.mode=Ha.KANJI,this.data=n}ze.getBitsLength=function(e){return e*13};ze.prototype.getLength=function(){return this.data.length};ze.prototype.getBitsLength=function(){return ze.getBitsLength(this.data.length)};ze.prototype.write=function(n){let e;for(e=0;e<this.data.length;e++){let t=Va.toSJIS(this.data[e]);if(t>=33088&&t<=40956)t-=33088;else if(t>=57408&&t<=60351)t-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);t=(t>>>8&255)*192+(t&255),n.put(t,13)}};var $a=ze,qr={exports:{}};(function(n){var e={single_source_shortest_paths:function(t,i,s){var r={},o={};o[i]=0;var a=e.PriorityQueue.make();a.push(i,0);for(var l,c,h,u,d,f,p,_,S;!a.empty();){l=a.pop(),c=l.value,u=l.cost,d=t[c]||{};for(h in d)d.hasOwnProperty(h)&&(f=d[h],p=u+f,_=o[h],S=typeof o[h]>"u",(S||_>p)&&(o[h]=p,a.push(h,p),r[h]=c))}if(typeof s<"u"&&typeof o[s]>"u"){var m=["Could not find a path from ",i," to ",s,"."].join("");throw new Error(m)}return r},extract_shortest_path_from_predecessor_list:function(t,i){for(var s=[],r=i;r;)s.push(r),t[r],r=t[r];return s.reverse(),s},find_path:function(t,i,s){var r=e.single_source_shortest_paths(t,i,s);return e.extract_shortest_path_from_predecessor_list(r,s)},PriorityQueue:{make:function(t){var i=e.PriorityQueue,s={},r;t=t||{};for(r in i)i.hasOwnProperty(r)&&(s[r]=i[r]);return s.queue=[],s.sorter=t.sorter||i.default_sorter,s},default_sorter:function(t,i){return t.cost-i.cost},push:function(t,i){var s={value:t,cost:i};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=e})(qr);var za=qr.exports;(function(n){const e=Ce,t=Oa,i=Ba,s=Wa,r=$a,o=ie,a=K,l=za;function c(m){return unescape(encodeURIComponent(m)).length}function h(m,E,y){const v=[];let R;for(;(R=m.exec(y))!==null;)v.push({data:R[0],index:R.index,mode:E,length:R[0].length});return v}function u(m){const E=h(o.NUMERIC,e.NUMERIC,m),y=h(o.ALPHANUMERIC,e.ALPHANUMERIC,m);let v,R;return a.isKanjiModeEnabled()?(v=h(o.BYTE,e.BYTE,m),R=h(o.KANJI,e.KANJI,m)):(v=h(o.BYTE_KANJI,e.BYTE,m),R=[]),E.concat(y,v,R).sort(function(F,Q){return F.index-Q.index}).map(function(F){return{data:F.data,mode:F.mode,length:F.length}})}function d(m,E){switch(E){case e.NUMERIC:return t.getBitsLength(m);case e.ALPHANUMERIC:return i.getBitsLength(m);case e.KANJI:return r.getBitsLength(m);case e.BYTE:return s.getBitsLength(m)}}function f(m){return m.reduce(function(E,y){const v=E.length-1>=0?E[E.length-1]:null;return v&&v.mode===y.mode?(E[E.length-1].data+=y.data,E):(E.push(y),E)},[])}function p(m){const E=[];for(let y=0;y<m.length;y++){const v=m[y];switch(v.mode){case e.NUMERIC:E.push([v,{data:v.data,mode:e.ALPHANUMERIC,length:v.length},{data:v.data,mode:e.BYTE,length:v.length}]);break;case e.ALPHANUMERIC:E.push([v,{data:v.data,mode:e.BYTE,length:v.length}]);break;case e.KANJI:E.push([v,{data:v.data,mode:e.BYTE,length:c(v.data)}]);break;case e.BYTE:E.push([{data:v.data,mode:e.BYTE,length:c(v.data)}])}}return E}function _(m,E){const y={},v={start:{}};let R=["start"];for(let L=0;L<m.length;L++){const F=m[L],Q=[];for(let he=0;he<F.length;he++){const ne=F[he],nt=""+L+he;Q.push(nt),y[nt]={node:ne,lastCount:0},v[nt]={};for(let Ln=0;Ln<R.length;Ln++){const re=R[Ln];y[re]&&y[re].node.mode===ne.mode?(v[re][nt]=d(y[re].lastCount+ne.length,ne.mode)-d(y[re].lastCount,ne.mode),y[re].lastCount+=ne.length):(y[re]&&(y[re].lastCount=ne.length),v[re][nt]=d(ne.length,ne.mode)+4+e.getCharCountIndicator(ne.mode,E))}}R=Q}for(let L=0;L<R.length;L++)v[R[L]].end=0;return{map:v,table:y}}function S(m,E){let y;const v=e.getBestModeForData(m);if(y=e.from(E,v),y!==e.BYTE&&y.bit<v.bit)throw new Error('"'+m+'" cannot be encoded with mode '+e.toString(y)+`.
 Suggested mode is: `+e.toString(v));switch(y===e.KANJI&&!a.isKanjiModeEnabled()&&(y=e.BYTE),y){case e.NUMERIC:return new t(m);case e.ALPHANUMERIC:return new i(m);case e.KANJI:return new r(m);case e.BYTE:return new s(m)}}n.fromArray=function(E){return E.reduce(function(y,v){return typeof v=="string"?y.push(S(v,null)):v.data&&y.push(S(v.data,v.mode)),y},[])},n.fromString=function(E,y){const v=u(E,a.isKanjiModeEnabled()),R=p(v),L=_(R,y),F=l.find_path(L.map,"start","end"),Q=[];for(let he=1;he<F.length-1;he++)Q.push(L.table[F[he]].node);return n.fromArray(f(Q))},n.rawSplit=function(E){return n.fromArray(u(E,a.isKanjiModeEnabled()))}})(zr);const yn=K,xn=gn,qa=Sa,Ga=Ta,ja=xr,Ka=Or,ti=Fr,ni=_n,Ya=Ra,Yt=Wr,Qa=Vr,Ja=Ce,On=zr;function Xa(n,e){const t=n.size,i=Ka.getPositions(e);for(let s=0;s<i.length;s++){const r=i[s][0],o=i[s][1];for(let a=-1;a<=7;a++)if(!(r+a<=-1||t<=r+a))for(let l=-1;l<=7;l++)o+l<=-1||t<=o+l||(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4?n.set(r+a,o+l,!0,!0):n.set(r+a,o+l,!1,!0))}}function Za(n){const e=n.size;for(let t=8;t<e-8;t++){const i=t%2===0;n.set(t,6,i,!0),n.set(6,t,i,!0)}}function el(n,e){const t=ja.getPositions(e);for(let i=0;i<t.length;i++){const s=t[i][0],r=t[i][1];for(let o=-2;o<=2;o++)for(let a=-2;a<=2;a++)o===-2||o===2||a===-2||a===2||o===0&&a===0?n.set(s+o,r+a,!0,!0):n.set(s+o,r+a,!1,!0)}}function tl(n,e){const t=n.size,i=Yt.getEncodedBits(e);let s,r,o;for(let a=0;a<18;a++)s=Math.floor(a/3),r=a%3+t-8-3,o=(i>>a&1)===1,n.set(s,r,o,!0),n.set(r,s,o,!0)}function Fn(n,e,t){const i=n.size,s=Qa.getEncodedBits(e,t);let r,o;for(r=0;r<15;r++)o=(s>>r&1)===1,r<6?n.set(r,8,o,!0):r<8?n.set(r+1,8,o,!0):n.set(i-15+r,8,o,!0),r<8?n.set(8,i-r-1,o,!0):r<9?n.set(8,15-r-1+1,o,!0):n.set(8,15-r-1,o,!0);n.set(i-8,8,1,!0)}function nl(n,e){const t=n.size;let i=-1,s=t-1,r=7,o=0;for(let a=t-1;a>0;a-=2)for(a===6&&a--;;){for(let l=0;l<2;l++)if(!n.isReserved(s,a-l)){let c=!1;o<e.length&&(c=(e[o]>>>r&1)===1),n.set(s,a-l,c),r--,r===-1&&(o++,r=7)}if(s+=i,s<0||t<=s){s-=i,i=-i;break}}}function il(n,e,t){const i=new qa;t.forEach(function(l){i.put(l.mode.bit,4),i.put(l.getLength(),Ja.getCharCountIndicator(l.mode,n)),l.write(i)});const s=yn.getSymbolTotalCodewords(n),r=ni.getTotalCodewordsCount(n,e),o=(s-r)*8;for(i.getLengthInBits()+4<=o&&i.put(0,4);i.getLengthInBits()%8!==0;)i.putBit(0);const a=(o-i.getLengthInBits())/8;for(let l=0;l<a;l++)i.put(l%2?17:236,8);return sl(i,n,e)}function sl(n,e,t){const i=yn.getSymbolTotalCodewords(e),s=ni.getTotalCodewordsCount(e,t),r=i-s,o=ni.getBlocksCount(e,t),a=i%o,l=o-a,c=Math.floor(i/o),h=Math.floor(r/o),u=h+1,d=c-h,f=new Ya(d);let p=0;const _=new Array(o),S=new Array(o);let m=0;const E=new Uint8Array(n.buffer);for(let F=0;F<o;F++){const Q=F<l?h:u;_[F]=E.slice(p,p+Q),S[F]=f.encode(_[F]),p+=Q,m=Math.max(m,Q)}const y=new Uint8Array(i);let v=0,R,L;for(R=0;R<m;R++)for(L=0;L<o;L++)R<_[L].length&&(y[v++]=_[L][R]);for(R=0;R<d;R++)for(L=0;L<o;L++)y[v++]=S[L][R];return y}function rl(n,e,t,i){let s;if(Array.isArray(n))s=On.fromArray(n);else if(typeof n=="string"){let c=e;if(!c){const h=On.rawSplit(n);c=Yt.getBestVersionForData(h,t)}s=On.fromString(n,c||40)}else throw new Error("Invalid data");const r=Yt.getBestVersionForData(s,t);if(!r)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=r;else if(e<r)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+r+`.
`);const o=il(e,t,s),a=yn.getSymbolSize(e),l=new Ga(a);return Xa(l,e),Za(l),el(l,e),Fn(l,t,0),e>=7&&tl(l,e),nl(l,o),isNaN(i)&&(i=ti.getBestMask(l,Fn.bind(null,l,t))),ti.applyMask(i,l),Fn(l,t,i),{modules:l,version:e,errorCorrectionLevel:t,maskPattern:i,segments:s}}Lr.create=function(e,t){if(typeof e>"u"||e==="")throw new Error("No input text");let i=xn.M,s,r;return typeof t<"u"&&(i=xn.from(t.errorCorrectionLevel,xn.M),s=Yt.from(t.version),r=ti.from(t.maskPattern),t.toSJISFunc&&yn.setToSJISFunction(t.toSJISFunc)),rl(e,s,i,r)};var Gr={},Di={};(function(n){function e(t){if(typeof t=="number"&&(t=t.toString()),typeof t!="string")throw new Error("Color should be defined as hex string");let i=t.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+t);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(r){return[r,r]}))),i.length===6&&i.push("F","F");const s=parseInt(i.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+i.slice(0,6).join("")}}n.getOptions=function(i){i||(i={}),i.color||(i.color={});const s=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,r=i.width&&i.width>=21?i.width:void 0,o=i.scale||4;return{width:r,scale:r?4:o,margin:s,color:{dark:e(i.color.dark||"#000000ff"),light:e(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},n.getScale=function(i,s){return s.width&&s.width>=i+s.margin*2?s.width/(i+s.margin*2):s.scale},n.getImageWidth=function(i,s){const r=n.getScale(i,s);return Math.floor((i+s.margin*2)*r)},n.qrToImageData=function(i,s,r){const o=s.modules.size,a=s.modules.data,l=n.getScale(o,r),c=Math.floor((o+r.margin*2)*l),h=r.margin*l,u=[r.color.light,r.color.dark];for(let d=0;d<c;d++)for(let f=0;f<c;f++){let p=(d*c+f)*4,_=r.color.light;if(d>=h&&f>=h&&d<c-h&&f<c-h){const S=Math.floor((d-h)/l),m=Math.floor((f-h)/l);_=u[a[S*o+m]?1:0]}i[p++]=_.r,i[p++]=_.g,i[p++]=_.b,i[p]=_.a}}})(Di);(function(n){const e=Di;function t(s,r,o){s.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=o,r.width=o,r.style.height=o+"px",r.style.width=o+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(r,o,a){let l=a,c=o;typeof l>"u"&&(!o||!o.getContext)&&(l=o,o=void 0),o||(c=i()),l=e.getOptions(l);const h=e.getImageWidth(r.modules.size,l),u=c.getContext("2d"),d=u.createImageData(h,h);return e.qrToImageData(d.data,r,l),t(u,c,h),u.putImageData(d,0,0),c},n.renderToDataURL=function(r,o,a){let l=a;typeof l>"u"&&(!o||!o.getContext)&&(l=o,o=void 0),l||(l={});const c=n.render(r,o,l),h=l.type||"image/png",u=l.rendererOpts||{};return c.toDataURL(h,u.quality)}})(Gr);var jr={};const ol=Di;function Is(n,e){const t=n.a/255,i=e+'="'+n.hex+'"';return t<1?i+" "+e+'-opacity="'+t.toFixed(2).slice(1)+'"':i}function Bn(n,e,t){let i=n+e;return typeof t<"u"&&(i+=" "+t),i}function al(n,e,t){let i="",s=0,r=!1,o=0;for(let a=0;a<n.length;a++){const l=Math.floor(a%e),c=Math.floor(a/e);!l&&!r&&(r=!0),n[a]?(o++,a>0&&l>0&&n[a-1]||(i+=r?Bn("M",l+t,.5+c+t):Bn("m",s,0),s=0,r=!1),l+1<e&&n[a+1]||(i+=Bn("h",o),o=0)):s++}return i}jr.render=function(e,t,i){const s=ol.getOptions(t),r=e.modules.size,o=e.modules.data,a=r+s.margin*2,l=s.color.light.a?"<path "+Is(s.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",c="<path "+Is(s.color.dark,"stroke")+' d="'+al(o,r,s.margin)+'"/>',h='viewBox="0 0 '+a+" "+a+'"',d='<svg xmlns="http://www.w3.org/2000/svg" '+(s.width?'width="'+s.width+'" height="'+s.width+'" ':"")+h+' shape-rendering="crispEdges">'+l+c+`</svg>
`;return typeof i=="function"&&i(null,d),d};const ll=ba,ii=Lr,Kr=Gr,cl=jr;function Li(n,e,t,i,s){const r=[].slice.call(arguments,1),o=r.length,a=typeof r[o-1]=="function";if(!a&&!ll())throw new Error("Callback required as last argument");if(a){if(o<2)throw new Error("Too few arguments provided");o===2?(s=t,t=e,e=i=void 0):o===3&&(e.getContext&&typeof s>"u"?(s=i,i=void 0):(s=i,i=t,t=e,e=void 0))}else{if(o<1)throw new Error("Too few arguments provided");return o===1?(t=e,e=i=void 0):o===2&&!e.getContext&&(i=t,t=e,e=void 0),new Promise(function(l,c){try{const h=ii.create(t,i);l(n(h,e,i))}catch(h){c(h)}})}try{const l=ii.create(t,i);s(null,n(l,e,i))}catch(l){s(l)}}At.create=ii.create;At.toCanvas=Li.bind(null,Kr.render);At.toDataURL=Li.bind(null,Kr.renderToDataURL);At.toString=Li.bind(null,function(n,e,t){return cl.render(n,t)});var Ss={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(n,e){if(!n)throw Je(e)},Je=function(n){return new Error("Firebase Database ("+Yr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},hl=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Mi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(d=64)),i.push(t[h],t[u],t[d],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Qr(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):hl(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new ul;const d=r<<2|a>>4;if(i.push(d),c!==64){const f=a<<4&240|c>>2;if(i.push(f),u!==64){const p=c<<6&192|u;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ul extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Jr=function(n){const e=Qr(n);return Mi.encodeByteArray(e,!0)},Qt=function(n){return Jr(n).replace(/\./g,"")},si=function(n){try{return Mi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(n){return Xr(void 0,n)}function Xr(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!fl(t)||(n[t]=Xr(n[t],e[t]));return n}function fl(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl=()=>pl().__FIREBASE_DEFAULTS__,_l=()=>{if(typeof process>"u"||typeof Ss>"u")return;const n=Ss.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ml=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&si(n[1]);return e&&JSON.parse(e)},Zr=()=>{try{return gl()||_l()||ml()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},yl=n=>{var e,t;return(t=(e=Zr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Cl=n=>{const e=yl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},eo=()=>{var n;return(n=Zr())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Qt(JSON.stringify(t)),Qt(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function to(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(El())}function wl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function bl(){return Yr.NODE_ADMIN===!0}function Il(){try{return typeof indexedDB=="object"}catch{return!1}}function Sl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl="FirebaseError";class Dt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Tl,Object.setPrototypeOf(this,Dt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,no.prototype.create)}}class no{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Nl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Dt(s,a,i)}}function Nl(n,e){return n.replace(Rl,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Rl=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n){return JSON.parse(n)}function H(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=yt(si(r[0])||""),t=yt(si(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Al=function(n){const e=io(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},kl=function(n){const e=io(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function qe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ts(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Jt(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function ri(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Ns(r)&&Ns(o)){if(!ri(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Ns(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const d=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const d=(s<<5|s>>>27)+c+l+h+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Cn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,g(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},vn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(n){return n&&n._delegate?n._delegate:n}class Ct{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Pt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ol(e))try{this.getOrInitializeService({instanceIdentifier:we})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=we){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=we){return this.instances.has(e)}getOptions(e=we){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:xl(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=we){return this.component?this.component.multipleInstances?e:we:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xl(n){return n===we?void 0:n}function Ol(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ml(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(k||(k={}));const Bl={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},Ul=k.INFO,Wl={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},Hl=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Wl[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class so{constructor(e){this.name=e,this._logLevel=Ul,this._logHandler=Hl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in k))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Bl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...e),this._logHandler(this,k.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...e),this._logHandler(this,k.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,k.INFO,...e),this._logHandler(this,k.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,k.WARN,...e),this._logHandler(this,k.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...e),this._logHandler(this,k.ERROR,...e)}}const Vl=(n,e)=>e.some(t=>n instanceof t);let Rs,As;function $l(){return Rs||(Rs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zl(){return As||(As=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ro=new WeakMap,oi=new WeakMap,oo=new WeakMap,Un=new WeakMap,xi=new WeakMap;function ql(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(pe(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ro.set(t,n)}).catch(()=>{}),xi.set(e,n),e}function Gl(n){if(oi.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});oi.set(n,e)}let ai={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return oi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||oo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return pe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jl(n){ai=n(ai)}function Kl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Wn(this),e,...t);return oo.set(i,e.sort?e.sort():[e]),pe(i)}:zl().includes(n)?function(...e){return n.apply(Wn(this),e),pe(ro.get(this))}:function(...e){return pe(n.apply(Wn(this),e))}}function Yl(n){return typeof n=="function"?Kl(n):(n instanceof IDBTransaction&&Gl(n),Vl(n,$l())?new Proxy(n,ai):n)}function pe(n){if(n instanceof IDBRequest)return ql(n);if(Un.has(n))return Un.get(n);const e=Yl(n);return e!==n&&(Un.set(n,e),xi.set(e,n)),e}const Wn=n=>xi.get(n);function Ql(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=pe(o);return i&&o.addEventListener("upgradeneeded",l=>{i(pe(o.result),l.oldVersion,l.newVersion,pe(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Jl=["get","getKey","getAll","getAllKeys","count"],Xl=["put","add","delete","clear"],Hn=new Map;function ks(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Hn.get(e))return Hn.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Xl.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Jl.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Hn.set(e,r),r}jl(n=>({...n,get:(e,t,i)=>ks(e,t)||n.get(e,t,i),has:(e,t)=>!!ks(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ec(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function ec(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const li="@firebase/app",Ps="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le=new so("@firebase/app"),tc="@firebase/app-compat",nc="@firebase/analytics-compat",ic="@firebase/analytics",sc="@firebase/app-check-compat",rc="@firebase/app-check",oc="@firebase/auth",ac="@firebase/auth-compat",lc="@firebase/database",cc="@firebase/data-connect",hc="@firebase/database-compat",uc="@firebase/functions",dc="@firebase/functions-compat",fc="@firebase/installations",pc="@firebase/installations-compat",gc="@firebase/messaging",_c="@firebase/messaging-compat",mc="@firebase/performance",yc="@firebase/performance-compat",Cc="@firebase/remote-config",vc="@firebase/remote-config-compat",Ec="@firebase/storage",wc="@firebase/storage-compat",bc="@firebase/firestore",Ic="@firebase/vertexai-preview",Sc="@firebase/firestore-compat",Tc="firebase",Nc="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci="[DEFAULT]",Rc={[li]:"fire-core",[tc]:"fire-core-compat",[ic]:"fire-analytics",[nc]:"fire-analytics-compat",[rc]:"fire-app-check",[sc]:"fire-app-check-compat",[oc]:"fire-auth",[ac]:"fire-auth-compat",[lc]:"fire-rtdb",[cc]:"fire-data-connect",[hc]:"fire-rtdb-compat",[uc]:"fire-fn",[dc]:"fire-fn-compat",[fc]:"fire-iid",[pc]:"fire-iid-compat",[gc]:"fire-fcm",[_c]:"fire-fcm-compat",[mc]:"fire-perf",[yc]:"fire-perf-compat",[Cc]:"fire-rc",[vc]:"fire-rc-compat",[Ec]:"fire-gcs",[wc]:"fire-gcs-compat",[bc]:"fire-fst",[Sc]:"fire-fst-compat",[Ic]:"fire-vertex","fire-js":"fire-js",[Tc]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt=new Map,Ac=new Map,hi=new Map;function Ds(n,e){try{n.container.addComponent(e)}catch(t){le.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xt(n){const e=n.name;if(hi.has(e))return le.debug(`There were multiple attempts to register component ${e}.`),!1;hi.set(e,n);for(const t of vt.values())Ds(t,n);for(const t of Ac.values())Ds(t,n);return!0}function kc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ge=new no("app","Firebase",Pc);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ct("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ge.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc=Nc;function ao(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:ci,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw ge.create("bad-app-name",{appName:String(s)});if(t||(t=eo()),!t)throw ge.create("no-options");const r=vt.get(s);if(r){if(ri(t,r.options)&&ri(i,r.config))return r;throw ge.create("duplicate-app",{appName:s})}const o=new Fl(s);for(const l of hi.values())o.addComponent(l);const a=new Dc(t,i,o);return vt.set(s,a),a}function lo(n=ci){const e=vt.get(n);if(!e&&n===ci&&eo())return ao();if(!e)throw ge.create("no-app",{appName:n});return e}function Mc(){return Array.from(vt.values())}function Fe(n,e,t){var i;let s=(i=Rc[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),le.warn(a.join(" "));return}Xt(new Ct(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc="firebase-heartbeat-database",Oc=1,Et="firebase-heartbeat-store";let Vn=null;function co(){return Vn||(Vn=Ql(xc,Oc,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Et)}catch(t){console.warn(t)}}}}).catch(n=>{throw ge.create("idb-open",{originalErrorMessage:n.message})})),Vn}async function Fc(n){try{const t=(await co()).transaction(Et),i=await t.objectStore(Et).get(ho(n));return await t.done,i}catch(e){if(e instanceof Dt)le.warn(e.message);else{const t=ge.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});le.warn(t.message)}}}async function Ls(n,e){try{const i=(await co()).transaction(Et,"readwrite");await i.objectStore(Et).put(e,ho(n)),await i.done}catch(t){if(t instanceof Dt)le.warn(t.message);else{const i=ge.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});le.warn(i.message)}}}function ho(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc=1024,Uc=30*24*60*60*1e3;class Wc{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Vc(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ms();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Uc}),this._storage.overwrite(this._heartbeatsCache))}catch(i){le.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ms(),{heartbeatsToSend:i,unsentEntries:s}=Hc(this._heartbeatsCache.heartbeats),r=Qt(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return le.warn(t),""}}}function Ms(){return new Date().toISOString().substring(0,10)}function Hc(n,e=Bc){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),xs(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),xs(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Vc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Il()?Sl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Fc(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ls(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ls(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function xs(n){return Qt(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $c(n){Xt(new Ct("platform-logger",e=>new Zl(e),"PRIVATE")),Xt(new Ct("heartbeat",e=>new Wc(e),"PRIVATE")),Fe(li,Ps,n),Fe(li,Ps,"esm2017"),Fe("fire-js","")}$c("");var zc="firebase",qc="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Fe(zc,qc,"app");var Os={};const Fs="@firebase/database",Bs="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uo="";function Gc(n){uo=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),H(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:yt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return se(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new jc(e)}}catch{}return new Kc},Se=fo("localStorage"),Yc=fo("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be=new so("@firebase/database"),Qc=function(){let n=1;return function(){return n++}}(),po=function(n){const e=Ll(n),t=new Dl;t.update(e);const i=t.digest();return Mi.encodeByteArray(i)},Lt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Lt.apply(null,i):typeof i=="object"?e+=H(i):e+=i,e+=" "}return e};let ut=null,Us=!0;const Jc=function(n,e){g(!0,"Can't turn on custom loggers persistently."),Be.logLevel=k.VERBOSE,ut=Be.log.bind(Be)},V=function(...n){if(Us===!0&&(Us=!1,ut===null&&Yc.get("logging_enabled")===!0&&Jc()),ut){const e=Lt.apply(null,n);ut(e)}},Mt=function(n){return function(...e){V(n,...e)}},ui=function(...n){const e="FIREBASE INTERNAL ERROR: "+Lt(...n);Be.error(e)},ce=function(...n){const e=`FIREBASE FATAL ERROR: ${Lt(...n)}`;throw Be.error(e),new Error(e)},q=function(...n){const e="FIREBASE WARNING: "+Lt(...n);Be.warn(e)},Xc=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&q("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Oi=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Zc=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Ge="[MIN_NAME]",Te="[MAX_NAME]",ke=function(n,e){if(n===e)return 0;if(n===Ge||e===Te)return-1;if(e===Ge||n===Te)return 1;{const t=Ws(n),i=Ws(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},eh=function(n,e){return n===e?0:n<e?-1:1},it=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+H(e))},Fi=function(n){if(typeof n!="object"||n===null)return H(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=H(e[i]),t+=":",t+=Fi(n[e[i]]);return t+="}",t},go=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function $(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const _o=function(n){g(!Oi(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let d=parseInt(h.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},th=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},nh=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function ih(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const sh=new RegExp("^-?(0*)\\d{1,10}$"),rh=-2147483648,oh=2147483647,Ws=function(n){if(sh.test(n)){const e=Number(n);if(e>=rh&&e<=oh)return e}return null},Ze=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw q("Exception was thrown by user callback.",t),e},Math.floor(0))}},ah=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},dt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){q(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(V("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',q(e)}}class qt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}qt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi="5",mo="v",yo="s",Co="r",vo="f",Eo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wo="ls",bo="p",di="ac",Io="websocket",So="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Se.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Se.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function hh(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function No(n,e,t){g(typeof e=="string","typeof type must == string"),g(typeof t=="object","typeof params must == object");let i;if(e===Io)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===So)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);hh(n)&&(t.ns=n.namespace);const s=[];return $(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(){this.counters_={}}incrementCounter(e,t=1){se(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return dl(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n={},zn={};function Ui(n){const e=n.toString();return $n[e]||($n[e]=new uh),$n[e]}function dh(n,e){const t=n.toString();return zn[t]||(zn[t]=e()),zn[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ze(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs="start",ph="close",gh="pLPCommand",_h="pRTLPCB",Ro="id",Ao="pw",ko="ser",mh="cb",yh="seg",Ch="ts",vh="d",Eh="dframe",Po=1870,Do=30,wh=Po-Do,bh=25e3,Ih=3e4;class Oe{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Mt(e),this.stats_=Ui(t),this.urlFn=l=>(this.appCheckToken&&(l[di]=this.appCheckToken),No(t,So,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new fh(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ih)),Zc(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Wi((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Hs)this.id=a,this.password=l;else if(o===ph)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Hs]="t",i[ko]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[mh]=this.scriptTagHolder.uniqueCallbackIdentifier),i[mo]=Bi,this.transportSessionId&&(i[yo]=this.transportSessionId),this.lastSessionId&&(i[wo]=this.lastSessionId),this.applicationId&&(i[bo]=this.applicationId),this.appCheckToken&&(i[di]=this.appCheckToken),typeof location<"u"&&location.hostname&&Eo.test(location.hostname)&&(i[Co]=vo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Oe.forceAllow_=!0}static forceDisallow(){Oe.forceDisallow_=!0}static isAvailable(){return Oe.forceAllow_?!0:!Oe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!th()&&!nh()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=H(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Jr(t),s=go(i,wh);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Eh]="t",i[Ro]=e,i[Ao]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=H(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Wi{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Qc(),window[gh+this.uniqueCallbackIdentifier]=e,window[_h+this.uniqueCallbackIdentifier]=t,this.myIFrame=Wi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){V("frame writing exception"),a.stack&&V(a.stack),V(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||V("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ro]=this.myID,e[Ao]=this.myPW,e[ko]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Do+i.length<=Po;){const o=this.pendingSegs.shift();i=i+"&"+yh+s+"="+o.seg+"&"+Ch+s+"="+o.ts+"&"+vh+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(bh)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{V("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh=16384,Th=45e3;let Zt=null;typeof MozWebSocket<"u"?Zt=MozWebSocket:typeof WebSocket<"u"&&(Zt=WebSocket);class X{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Mt(this.connId),this.stats_=Ui(t),this.connURL=X.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[mo]=Bi,typeof location<"u"&&location.hostname&&Eo.test(location.hostname)&&(o[Co]=vo),t&&(o[yo]=t),i&&(o[wo]=i),s&&(o[di]=s),r&&(o[bo]=r),No(e,Io,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Se.set("previous_websocket_failure",!0);try{let i;bl(),this.mySock=new Zt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){X.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Zt!==null&&!X.forceDisallow_}static previouslyFailed(){return Se.isInMemoryStorage||Se.get("previous_websocket_failure")===!0}markConnectionHealthy(){Se.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=yt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=H(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=go(t,Sh);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Th))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}X.responsesRequiredToBeHealthy=2;X.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Oe,X]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=X&&X.isAvailable();let i=t&&!X.previouslyFailed();if(e.webSocketOnly&&(t||q("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[X];else{const s=this.transports_=[];for(const r of wt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);wt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}wt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=6e4,Rh=5e3,Ah=10*1024,kh=100*1024,qn="t",Vs="d",Ph="s",$s="r",Dh="e",zs="o",qs="a",Gs="n",js="p",Lh="h";class Mh{constructor(e,t,i,s,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Mt("c:"+this.id+":"),this.transportManager_=new wt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=dt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>kh?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Ah?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(qn in e){const t=e[qn];t===qs?this.upgradeIfSecondaryHealthy_():t===$s?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===zs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=it("t",e),i=it("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:js,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:qs,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Gs,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=it("t",e),i=it("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=it(qn,e);if(Vs in e){const i=e[Vs];if(t===Lh){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Gs){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ph?this.onConnectionShutdown_(i):t===$s?this.onReset_(i):t===Dh?ui("Server Error: "+i):t===zs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ui("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Bi!==i&&q("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),dt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Nh))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):dt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Rh))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:js,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Se.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en extends Mo{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!to()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new en}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=32,Ys=768;class N{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function T(){return new N("")}function w(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function me(n){return n.pieces_.length-n.pieceNum_}function P(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new N(n.pieces_,e)}function Hi(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function xh(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function bt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function xo(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new N(e,0)}function M(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof N)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new N(t,0)}function I(n){return n.pieceNum_>=n.pieces_.length}function G(n,e){const t=w(n),i=w(e);if(t===null)return e;if(t===i)return G(P(n),P(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Oh(n,e){const t=bt(n,0),i=bt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=ke(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Vi(n,e){if(me(n)!==me(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Y(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(me(n)>me(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Fh{constructor(e,t){this.errorPrefix_=t,this.parts_=bt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=vn(this.parts_[i]);Oo(this)}}function Bh(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=vn(e),Oo(n)}function Uh(n){const e=n.parts_.pop();n.byteLength_-=vn(e),n.parts_.length>0&&(n.byteLength_-=1)}function Oo(n){if(n.byteLength_>Ys)throw new Error(n.errorPrefix_+"has a key path longer than "+Ys+" bytes ("+n.byteLength_+").");if(n.parts_.length>Ks)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ks+") or object contains a cycle "+be(n))}function be(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i extends Mo{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new $i}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=1e3,Wh=60*5*1e3,Qs=30*1e3,Hh=1.3,Vh=3e4,$h="server_kill",Js=3;class ae extends Lo{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ae.nextPersistentConnectionId_++,this.log_=Mt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=st,this.maxReconnectDelay_=Wh,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");$i.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&en.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(H(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Pt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ae.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&se(e,"w")){const i=qe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();q(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||kl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Qs)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Al(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+H(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):ui("Unrecognized action received from server: "+H(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=st,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=st,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Vh&&(this.reconnectDelay_=st),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Hh)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ae.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?V("getToken() completed but was canceled"):(V("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new Mh(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{q(f+" ("+this.repoInfo_.toString()+")"),this.interrupt($h)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&q(u),l())}}}interrupt(e){V("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){V("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ts(this.interruptReasons_)&&(this.reconnectDelay_=st,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Fi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new N(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){V("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Js&&(this.reconnectDelay_=Qs,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){V("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Js&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+uo.replace(/\./g,"-")]=1,to()?e["framework.cordova"]=1:wl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=en.getInstance().currentlyOnline();return Ts(this.interruptReasons_)&&e}}ae.nextPersistentConnectionId_=0;ae.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new b(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new b(Ge,e),s=new b(Ge,t);return this.compare(i,s)!==0}minPost(){return b.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ut;class Fo extends En{static get __EMPTY_NODE(){return Ut}static set __EMPTY_NODE(e){Ut=e}compare(e,t){return ke(e.name,t.name)}isDefinedOn(e){throw Je("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return b.MIN}maxPost(){return new b(Te,Ut)}makePost(e,t){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new b(e,Ut)}toString(){return".key"}}const Ue=new Fo;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class U{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??U.RED,this.left=s??j.EMPTY_NODE,this.right=r??j.EMPTY_NODE}copy(e,t,i,s,r){return new U(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return j.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return j.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,U.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,U.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}U.RED=!0;U.BLACK=!1;class zh{copy(e,t,i,s,r){return this}insert(e,t,i){return new U(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class j{constructor(e,t=j.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new j(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,U.BLACK,null,null))}remove(e){return new j(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,U.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Wt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Wt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Wt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Wt(this.root_,null,this.comparator_,!0,e)}}j.EMPTY_NODE=new zh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qh(n,e){return ke(n.name,e.name)}function zi(n,e){return ke(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fi;function Gh(n){fi=n}const Bo=function(n){return typeof n=="number"?"number:"+_o(n):"string:"+n},Uo=function(n){if(n.isLeafNode()){const e=n.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&se(e,".sv"),"Priority must be a string or number.")}else g(n===fi||n.isEmpty(),"priority of unexpected type.");g(n===fi||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xs;class B{constructor(e,t=B.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Uo(this.priorityNode_)}static set __childrenNodeConstructor(e){Xs=e}static get __childrenNodeConstructor(){return Xs}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new B(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return I(e)?this:w(e)===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:B.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=w(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||me(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,B.__childrenNodeConstructor.EMPTY_NODE.updateChild(P(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Bo(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=_o(this.value_):e+=this.value_,this.lazyHash_=po(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===B.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof B.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=B.VALUE_TYPE_ORDER.indexOf(t),r=B.VALUE_TYPE_ORDER.indexOf(i);return g(s>=0,"Unknown leaf type: "+t),g(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}B.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wo,Ho;function jh(n){Wo=n}function Kh(n){Ho=n}class Yh extends En{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?ke(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return b.MIN}maxPost(){return new b(Te,new B("[PRIORITY-POST]",Ho))}makePost(e,t){const i=Wo(e);return new b(t,new B("[PRIORITY-POST]",i))}toString(){return".priority"}}const x=new Yh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=Math.log(2);class Jh{constructor(e){const t=r=>parseInt(Math.log(r)/Qh,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const tn=function(n,e,t,i){n.sort(e);const s=function(l,c){const h=c-l;let u,d;if(h===0)return null;if(h===1)return u=n[l],d=t?t(u):u,new U(d,u.node,U.BLACK,null,null);{const f=parseInt(h/2,10)+l,p=s(l,f),_=s(f+1,c);return u=n[f],d=t?t(u):u,new U(d,u.node,U.BLACK,p,_)}},r=function(l){let c=null,h=null,u=n.length;const d=function(p,_){const S=u-p,m=u;u-=p;const E=s(S+1,m),y=n[S],v=t?t(y):y;f(new U(v,y.node,_,null,E))},f=function(p){c?(c.left=p,c=p):(h=p,c=p)};for(let p=0;p<l.count;++p){const _=l.nextBitIsOne(),S=Math.pow(2,l.count-(p+1));_?d(S,U.BLACK):(d(S,U.BLACK),d(S,U.RED))}return h},o=new Jh(n.length),a=r(o);return new j(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gn;const De={};class oe{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return g(De&&x,"ChildrenNode.ts has not been loaded"),Gn=Gn||new oe({".priority":De},{".priority":x}),Gn}get(e){const t=qe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof j?t:null}hasIndex(e){return se(this.indexSet_,e.toString())}addIndex(e,t){g(e!==Ue,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(b.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=tn(i,e.getCompare()):a=De;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new oe(h,c)}addToIndexes(e,t){const i=Jt(this.indexes_,(s,r)=>{const o=qe(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),s===De)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(b.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),tn(a,o.getCompare())}else return De;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new b(e.name,a))),l.insert(e,e.node)}});return new oe(i,this.indexSet_)}removeFromIndexes(e,t){const i=Jt(this.indexes_,s=>{if(s===De)return s;{const r=t.get(e.name);return r?s.remove(new b(e.name,r)):s}});return new oe(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rt;class C{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Uo(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return rt||(rt=new C(new j(zi),null,oe.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||rt}updatePriority(e){return this.children_.isEmpty()?this:new C(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?rt:t}}getChild(e){const t=w(e);return t===null?this:this.getImmediateChild(t).getChild(P(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(g(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new b(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?rt:this.priorityNode_;return new C(s,o,r)}}updateChild(e,t){const i=w(e);if(i===null)return t;{g(w(e)!==".priority"||me(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(P(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(x,(o,a)=>{t[o]=a.val(e),i++,r&&C.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Bo(this.getPriority().val())+":"),this.forEachChild(x,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":po(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new b(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new b(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new b(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,b.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,b.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===xt?-1:0}withIndex(e){if(e===Ue||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new C(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Ue||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(x),s=t.getIterator(x);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ue?null:this.indexMap_.get(e.toString())}}C.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Xh extends C{constructor(){super(new j(zi),C.EMPTY_NODE,oe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return C.EMPTY_NODE}isEmpty(){return!1}}const xt=new Xh;Object.defineProperties(b,{MIN:{value:new b(Ge,C.EMPTY_NODE)},MAX:{value:new b(Te,xt)}});Fo.__EMPTY_NODE=C.EMPTY_NODE;B.__childrenNodeConstructor=C;Gh(xt);Kh(xt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh=!0;function W(n,e=null){if(n===null)return C.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new B(t,W(e))}if(!(n instanceof Array)&&Zh){const t=[];let i=!1;if($(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=W(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new b(o,l)))}}),t.length===0)return C.EMPTY_NODE;const r=tn(t,qh,o=>o.name,zi);if(i){const o=tn(t,x.getCompare());return new C(r,W(e),new oe({".priority":o},{".priority":x}))}else return new C(r,W(e),oe.Default)}else{let t=C.EMPTY_NODE;return $(n,(i,s)=>{if(se(n,i)&&i.substring(0,1)!=="."){const r=W(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(W(e))}}jh(W);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu extends En{constructor(e){super(),this.indexPath_=e,g(!I(e)&&w(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?ke(e.name,t.name):r}makePost(e,t){const i=W(e),s=C.EMPTY_NODE.updateChild(this.indexPath_,i);return new b(t,s)}maxPost(){const e=C.EMPTY_NODE.updateChild(this.indexPath_,xt);return new b(Te,e)}toString(){return bt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends En{compare(e,t){const i=e.node.compareTo(t.node);return i===0?ke(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return b.MIN}maxPost(){return b.MAX}makePost(e,t){const i=W(e);return new b(t,i)}toString(){return".value"}}const nu=new tu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(n){return{type:"value",snapshotNode:n}}function je(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function It(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function St(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function iu(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(It(t,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(je(t,i)):o.trackChildChange(St(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(x,(s,r)=>{t.hasChild(s)||i.trackChildChange(It(s,r))}),t.isLeafNode()||t.forEachChild(x,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(St(s,r,o))}else i.trackChildChange(je(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?C.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.indexedFilter_=new qi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Tt.getStartPost_(e),this.endPost_=Tt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new b(t,i))||(i=C.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=C.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(C.EMPTY_NODE);const r=this;return t.forEachChild(x,(o,a)=>{r.matches(new b(o,a))||(s=s.updateImmediateChild(o,C.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Tt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new b(t,i))||(i=C.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=C.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=C.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(C.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,C.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(d,f)=>u(f,d)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const l=new b(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const f=d==null?1:o(d,l);if(h&&!i.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(St(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(It(t,u));const _=a.updateImmediateChild(t,C.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(je(d.name,d.node)),_.updateImmediateChild(d.name,d.node)):_}}else return i.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(It(c.name,c.node)),r.trackChildChange(je(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,C.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=x}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ge}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Te}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===x}copy(){const e=new Gi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function ru(n){return n.loadsAllData()?new qi(n.getIndex()):n.hasLimit()?new su(n):new Tt(n)}function Zs(n){const e={};if(n.isDefault())return e;let t;if(n.index_===x?t="$priority":n.index_===nu?t="$value":n.index_===Ue?t="$key":(g(n.index_ instanceof eu,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=H(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=H(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+H(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=H(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+H(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function er(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==x&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends Lo{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Mt("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=nn.getListenId_(e,i),a={};this.listens_[o]=a;const l=Zs(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),qe(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,t){const i=nn.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Zs(e._queryParams),i=e._path.toString(),s=new Pt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Pl(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=yt(a.responseText)}catch{q("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&q("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(){this.rootNode_=C.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(){return{value:null,children:new Map}}function $o(n,e,t){if(I(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=w(e);n.children.has(i)||n.children.set(i,sn());const s=n.children.get(i);e=P(e),$o(s,e,t)}}function pi(n,e,t){n.value!==null?t(e,n.value):au(n,(i,s)=>{const r=new N(e.toString()+"/"+i);pi(s,r,t)})}function au(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&$(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=10*1e3,cu=30*1e3,hu=5*60*1e3;class uu{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new lu(e);const i=tr+(cu-tr)*Math.random();dt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;$(e,(s,r)=>{r>0&&se(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),dt(this.reportStats_.bind(this),Math.floor(Math.random()*2*hu))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Z||(Z={}));function ji(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ki(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Yi(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Z.ACK_USER_WRITE,this.source=ji()}operationForChild(e){if(I(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new N(e));return new rn(T(),t,this.revert)}}else return g(w(this.path)===e,"operationForChild called for unrelated child."),new rn(P(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t){this.source=e,this.path=t,this.type=Z.LISTEN_COMPLETE}operationForChild(e){return I(this.path)?new Nt(this.source,T()):new Nt(this.source,P(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Z.OVERWRITE}operationForChild(e){return I(this.path)?new Ne(this.source,T(),this.snap.getImmediateChild(e)):new Ne(this.source,P(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Z.MERGE}operationForChild(e){if(I(this.path)){const t=this.children.subtree(new N(e));return t.isEmpty()?null:t.value?new Ne(this.source,T(),t.value):new Ke(this.source,T(),t)}else return g(w(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ke(this.source,P(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(I(e))return this.isFullyInitialized()&&!this.filtered_;const t=w(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function fu(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(iu(o.childName,o.snapshotNode))}),ot(n,s,"child_removed",e,i,t),ot(n,s,"child_added",e,i,t),ot(n,s,"child_moved",r,i,t),ot(n,s,"child_changed",e,i,t),ot(n,s,"value",e,i,t),s}function ot(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>gu(n,a,l)),o.forEach(a=>{const l=pu(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function pu(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function gu(n,e,t){if(e.childName==null||t.childName==null)throw Je("Should only compare child_ events.");const i=new b(e.childName,e.snapshotNode),s=new b(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(n,e){return{eventCache:n,serverCache:e}}function ft(n,e,t,i){return wn(new Re(e,t,i),n.serverCache)}function zo(n,e,t,i){return wn(n.eventCache,new Re(e,t,i))}function gi(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ae(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn;const _u=()=>(jn||(jn=new j(eh)),jn);class A{constructor(e,t=_u()){this.value=e,this.children=t}static fromObject(e){let t=new A(null);return $(e,(i,s)=>{t=t.set(new N(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:T(),value:this.value};if(I(e))return null;{const i=w(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(P(e),t);return r!=null?{path:M(new N(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(I(e))return this;{const t=w(e),i=this.children.get(t);return i!==null?i.subtree(P(e)):new A(null)}}set(e,t){if(I(e))return new A(t,this.children);{const i=w(e),r=(this.children.get(i)||new A(null)).set(P(e),t),o=this.children.insert(i,r);return new A(this.value,o)}}remove(e){if(I(e))return this.children.isEmpty()?new A(null):new A(null,this.children);{const t=w(e),i=this.children.get(t);if(i){const s=i.remove(P(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new A(null):new A(this.value,r)}else return this}}get(e){if(I(e))return this.value;{const t=w(e),i=this.children.get(t);return i?i.get(P(e)):null}}setTree(e,t){if(I(e))return t;{const i=w(e),r=(this.children.get(i)||new A(null)).setTree(P(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new A(this.value,o)}}fold(e){return this.fold_(T(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(M(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,T(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(I(e))return null;{const r=w(e),o=this.children.get(r);return o?o.findOnPath_(P(e),M(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,T(),t)}foreachOnPath_(e,t,i){if(I(e))return this;{this.value&&i(t,this.value);const s=w(e),r=this.children.get(s);return r?r.foreachOnPath_(P(e),M(t,s),i):new A(null)}}foreach(e){this.foreach_(T(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(M(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e){this.writeTree_=e}static empty(){return new ee(new A(null))}}function pt(n,e,t){if(I(e))return new ee(new A(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=G(s,e);return r=r.updateChild(o,t),new ee(n.writeTree_.set(s,r))}else{const s=new A(t),r=n.writeTree_.setTree(e,s);return new ee(r)}}}function _i(n,e,t){let i=n;return $(t,(s,r)=>{i=pt(i,M(e,s),r)}),i}function nr(n,e){if(I(e))return ee.empty();{const t=n.writeTree_.setTree(e,new A(null));return new ee(t)}}function mi(n,e){return Pe(n,e)!=null}function Pe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(G(t.path,e)):null}function ir(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(x,(i,s)=>{e.push(new b(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new b(i,s.value))}),e}function _e(n,e){if(I(e))return n;{const t=Pe(n,e);return t!=null?new ee(new A(t)):new ee(n.writeTree_.subtree(e))}}function yi(n){return n.writeTree_.isEmpty()}function Ye(n,e){return qo(T(),n.writeTree_,e)}function qo(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=qo(M(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(M(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(n,e){return Yo(e,n)}function mu(n,e,t,i,s){g(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=pt(n.visibleWrites,e,t)),n.lastWriteId=i}function yu(n,e,t,i){g(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=_i(n.visibleWrites,e,t),n.lastWriteId=i}function Cu(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function vu(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);g(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Eu(a,i.path)?s=!1:Y(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return wu(n),!0;if(i.snap)n.visibleWrites=nr(n.visibleWrites,i.path);else{const a=i.children;$(a,l=>{n.visibleWrites=nr(n.visibleWrites,M(i.path,l))})}return!0}else return!1}function Eu(n,e){if(n.snap)return Y(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Y(M(n.path,t),e))return!0;return!1}function wu(n){n.visibleWrites=Go(n.allWrites,bu,T()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function bu(n){return n.visible}function Go(n,e,t){let i=ee.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)Y(t,o)?(a=G(t,o),i=pt(i,a,r.snap)):Y(o,t)&&(a=G(o,t),i=pt(i,T(),r.snap.getChild(a)));else if(r.children){if(Y(t,o))a=G(t,o),i=_i(i,a,r.children);else if(Y(o,t))if(a=G(o,t),I(a))i=_i(i,T(),r.children);else{const l=qe(r.children,w(a));if(l){const c=l.getChild(P(a));i=pt(i,T(),c)}}}else throw Je("WriteRecord should have .snap or .children")}}return i}function jo(n,e,t,i,s){if(!i&&!s){const r=Pe(n.visibleWrites,e);if(r!=null)return r;{const o=_e(n.visibleWrites,e);if(yi(o))return t;if(t==null&&!mi(o,T()))return null;{const a=t||C.EMPTY_NODE;return Ye(o,a)}}}else{const r=_e(n.visibleWrites,e);if(!s&&yi(r))return t;if(!s&&t==null&&!mi(r,T()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(Y(c.path,e)||Y(e,c.path))},a=Go(n.allWrites,o,e),l=t||C.EMPTY_NODE;return Ye(a,l)}}}function Iu(n,e,t){let i=C.EMPTY_NODE;const s=Pe(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(x,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=_e(n.visibleWrites,e);return t.forEachChild(x,(o,a)=>{const l=Ye(_e(r,new N(o)),a);i=i.updateImmediateChild(o,l)}),ir(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=_e(n.visibleWrites,e);return ir(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Su(n,e,t,i,s){g(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=M(e,t);if(mi(n.visibleWrites,r))return null;{const o=_e(n.visibleWrites,r);return yi(o)?s.getChild(t):Ye(o,s.getChild(t))}}function Tu(n,e,t,i){const s=M(e,t),r=Pe(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=_e(n.visibleWrites,s);return Ye(o,i.getNode().getImmediateChild(t))}else return null}function Nu(n,e){return Pe(n.visibleWrites,e)}function Ru(n,e,t,i,s,r,o){let a;const l=_e(n.visibleWrites,e),c=Pe(l,T());if(c!=null)a=c;else if(t!=null)a=Ye(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),d=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=d.getNext();for(;f&&h.length<s;)u(f,i)!==0&&h.push(f),f=d.getNext();return h}else return[]}function Au(){return{visibleWrites:ee.empty(),allWrites:[],lastWriteId:-1}}function on(n,e,t,i){return jo(n.writeTree,n.treePath,e,t,i)}function Ji(n,e){return Iu(n.writeTree,n.treePath,e)}function sr(n,e,t,i){return Su(n.writeTree,n.treePath,e,t,i)}function an(n,e){return Nu(n.writeTree,M(n.treePath,e))}function ku(n,e,t,i,s,r){return Ru(n.writeTree,n.treePath,e,t,i,s,r)}function Xi(n,e,t){return Tu(n.writeTree,n.treePath,e,t)}function Ko(n,e){return Yo(M(n.treePath,e),n.writeTree)}function Yo(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;g(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,St(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,It(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,je(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,St(i,e.snapshotNode,s.oldSnap));else throw Je("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Qo=new Du;class Zi{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Re(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Xi(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ae(this.viewCache_),r=ku(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(n){return{filter:n}}function Mu(n,e){g(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function xu(n,e,t,i,s){const r=new Pu;let o,a;if(t.type===Z.OVERWRITE){const c=t;c.source.fromUser?o=Ci(n,e,c.path,c.snap,i,s,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!I(c.path),o=ln(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===Z.MERGE){const c=t;c.source.fromUser?o=Fu(n,e,c.path,c.children,i,s,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=vi(n,e,c.path,c.children,i,s,a,r))}else if(t.type===Z.ACK_USER_WRITE){const c=t;c.revert?o=Wu(n,e,c.path,i,s,r):o=Bu(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===Z.LISTEN_COMPLETE)o=Uu(n,e,t.path,i,r);else throw Je("Unknown operation type: "+t.type);const l=r.getChanges();return Ou(e,o,l),{viewCache:o,changes:l}}function Ou(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=gi(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Vo(gi(e)))}}function Jo(n,e,t,i,s,r){const o=e.eventCache;if(an(i,t)!=null)return e;{let a,l;if(I(t))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ae(e),h=c instanceof C?c:C.EMPTY_NODE,u=Ji(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=on(i,Ae(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=w(t);if(c===".priority"){g(me(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=sr(i,t,h,l);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{const h=P(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=sr(i,t,o.getNode(),l);d!=null?u=o.getNode().getImmediateChild(c).updateChild(h,d):u=o.getNode().getImmediateChild(c)}else u=Xi(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,h,s,r):a=o.getNode()}}return ft(e,a,o.isFullyInitialized()||I(t),n.filter.filtersNodes())}}function ln(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(I(t))c=h.updateFullNode(l.getNode(),i,null);else if(h.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,i);c=h.updateFullNode(l.getNode(),f,null)}else{const f=w(t);if(!l.isCompleteForPath(t)&&me(t)>1)return e;const p=P(t),S=l.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?c=h.updatePriority(l.getNode(),S):c=h.updateChild(l.getNode(),f,S,p,Qo,null)}const u=zo(e,c,l.isFullyInitialized()||I(t),h.filtersNodes()),d=new Zi(s,u,r);return Jo(n,u,t,s,d,a)}function Ci(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const h=new Zi(s,e,r);if(I(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=ft(e,c,!0,n.filter.filtersNodes());else{const u=w(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=ft(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=P(t),f=a.getNode().getImmediateChild(u);let p;if(I(d))p=i;else{const _=h.getCompleteChild(u);_!=null?Hi(d)===".priority"&&_.getChild(xo(d)).isEmpty()?p=_:p=_.updateChild(d,i):p=C.EMPTY_NODE}if(f.equals(p))l=e;else{const _=n.filter.updateChild(a.getNode(),u,p,d,h,o);l=ft(e,_,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function rr(n,e){return n.eventCache.isCompleteForChild(e)}function Fu(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const h=M(t,l);rr(e,w(h))&&(a=Ci(n,a,h,c,s,r,o))}),i.foreach((l,c)=>{const h=M(t,l);rr(e,w(h))||(a=Ci(n,a,h,c,s,r,o))}),a}function or(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function vi(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;I(t)?c=i:c=new A(null).setTree(t,i);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){const f=e.serverCache.getNode().getImmediateChild(u),p=or(n,f,d);l=ln(n,l,new N(u),p,s,r,o,a)}}),c.children.inorderTraversal((u,d)=>{const f=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!f){const p=e.serverCache.getNode().getImmediateChild(u),_=or(n,p,d);l=ln(n,l,new N(u),_,s,r,o,a)}}),l}function Bu(n,e,t,i,s,r,o){if(an(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(I(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return ln(n,e,t,l.getNode().getChild(t),s,r,a,o);if(I(t)){let c=new A(null);return l.getNode().forEachChild(Ue,(h,u)=>{c=c.set(new N(h),u)}),vi(n,e,t,c,s,r,a,o)}else return e}else{let c=new A(null);return i.foreach((h,u)=>{const d=M(t,h);l.isCompleteForPath(d)&&(c=c.set(h,l.getNode().getChild(d)))}),vi(n,e,t,c,s,r,a,o)}}function Uu(n,e,t,i,s){const r=e.serverCache,o=zo(e,r.getNode(),r.isFullyInitialized()||I(t),r.isFiltered());return Jo(n,o,t,i,Qo,s)}function Wu(n,e,t,i,s,r){let o;if(an(i,t)!=null)return e;{const a=new Zi(i,e,s),l=e.eventCache.getNode();let c;if(I(t)||w(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=on(i,Ae(e));else{const u=e.serverCache.getNode();g(u instanceof C,"serverChildren would be complete if leaf node"),h=Ji(i,u)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=w(t);let u=Xi(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=n.filter.updateChild(l,h,u,P(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,C.EMPTY_NODE,P(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=on(i,Ae(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||an(i,T())!=null,ft(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new qi(i.getIndex()),r=ru(i);this.processor_=Lu(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(C.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(C.EMPTY_NODE,a.getNode(),null),h=new Re(l,o.isFullyInitialized(),s.filtersNodes()),u=new Re(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=wn(u,h),this.eventGenerator_=new du(this.query_)}get query(){return this.query_}}function Vu(n){return n.viewCache_.serverCache.getNode()}function $u(n,e){const t=Ae(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!I(e)&&!t.getImmediateChild(w(e)).isEmpty())?t.getChild(e):null}function ar(n){return n.eventRegistrations_.length===0}function zu(n,e){n.eventRegistrations_.push(e)}function lr(n,e,t){const i=[];if(t){g(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function cr(n,e,t,i){e.type===Z.MERGE&&e.source.queryId!==null&&(g(Ae(n.viewCache_),"We should always have a full cache before handling merges"),g(gi(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=xu(n.processor_,s,e,t,i);return Mu(n.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Xo(n,r.changes,r.viewCache.eventCache.getNode(),null)}function qu(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(x,(r,o)=>{i.push(je(r,o))}),t.isFullyInitialized()&&i.push(Vo(t.getNode())),Xo(n,i,t.getNode(),e)}function Xo(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return fu(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cn;class Gu{constructor(){this.views=new Map}}function ju(n){g(!cn,"__referenceConstructor has already been defined"),cn=n}function Ku(){return g(cn,"Reference.ts has not been loaded"),cn}function Yu(n){return n.views.size===0}function es(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return g(r!=null,"SyncTree gave us an op for an invalid query."),cr(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(cr(o,e,t,i));return r}}function Qu(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=on(t,s?i:null),l=!1;a?l=!0:i instanceof C?(a=Ji(t,i),l=!1):(a=C.EMPTY_NODE,l=!1);const c=wn(new Re(a,l,!1),new Re(i,s,!1));return new Hu(e,c)}return o}function Ju(n,e,t,i,s,r){const o=Qu(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),zu(o,t),qu(o,t)}function Xu(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=ye(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(lr(c,t,i)),ar(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(lr(l,t,i)),ar(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ye(n)&&r.push(new(Ku())(e._repo,e._path)),{removed:r,events:o}}function Zo(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function We(n,e){let t=null;for(const i of n.views.values())t=t||$u(i,e);return t}function ea(n,e){if(e._queryParams.loadsAllData())return bn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function ta(n,e){return ea(n,e)!=null}function ye(n){return bn(n)!=null}function bn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hn;function Zu(n){g(!hn,"__referenceConstructor has already been defined"),hn=n}function ed(){return g(hn,"Reference.ts has not been loaded"),hn}let td=1;class hr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new A(null),this.pendingWriteTree_=Au(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function na(n,e,t,i,s){return mu(n.pendingWriteTree_,e,t,i,s),s?et(n,new Ne(ji(),e,t)):[]}function nd(n,e,t,i){yu(n.pendingWriteTree_,e,t,i);const s=A.fromObject(t);return et(n,new Ke(ji(),e,s))}function fe(n,e,t=!1){const i=Cu(n.pendingWriteTree_,e);if(vu(n.pendingWriteTree_,e)){let r=new A(null);return i.snap!=null?r=r.set(T(),!0):$(i.children,o=>{r=r.set(new N(o),!0)}),et(n,new rn(i.path,r,t))}else return[]}function In(n,e,t){return et(n,new Ne(Ki(),e,t))}function id(n,e,t){const i=A.fromObject(t);return et(n,new Ke(Ki(),e,i))}function sd(n,e){return et(n,new Nt(Ki(),e))}function rd(n,e,t){const i=ns(n,t);if(i){const s=is(i),r=s.path,o=s.queryId,a=G(r,e),l=new Nt(Yi(o),a);return ss(n,r,l)}else return[]}function Ei(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ta(o,e))){const l=Xu(o,e,t,i);Yu(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const h=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(d,f)=>ye(f));if(h&&!u){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const f=ld(d);for(let p=0;p<f.length;++p){const _=f[p],S=_.query,m=ra(n,_);n.listenProvider_.startListening(gt(S),un(n,S),m.hashFn,m.onComplete)}}}!u&&c.length>0&&!i&&(h?n.listenProvider_.stopListening(gt(e),null):c.forEach(d=>{const f=n.queryToTagMap.get(Sn(d));n.listenProvider_.stopListening(gt(d),f)}))}cd(n,c)}return a}function od(n,e,t,i){const s=ns(n,i);if(s!=null){const r=is(s),o=r.path,a=r.queryId,l=G(o,e),c=new Ne(Yi(a),l,t);return ss(n,o,c)}else return[]}function ad(n,e,t,i){const s=ns(n,i);if(s){const r=is(s),o=r.path,a=r.queryId,l=G(o,e),c=A.fromObject(t),h=new Ke(Yi(a),l,c);return ss(n,o,h)}else return[]}function ur(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(d,f)=>{const p=G(d,s);r=r||We(f,p),o=o||ye(f)});let a=n.syncPointTree_.get(s);a?(o=o||ye(a),r=r||We(a,T())):(a=new Gu,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=C.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,p)=>{const _=We(p,T());_&&(r=r.updateImmediateChild(f,_))}));const c=ta(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=Sn(e);g(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const f=hd();n.queryToTagMap.set(d,f),n.tagToQueryMap.set(f,d)}const h=Qi(n.pendingWriteTree_,s);let u=Ju(a,e,t,h,r,l);if(!c&&!o&&!i){const d=ea(a,e);u=u.concat(ud(n,e,d))}return u}function ts(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=G(o,e),c=We(a,l);if(c)return c});return jo(s,e,r,t,!0)}function et(n,e){return ia(e,n.syncPointTree_,null,Qi(n.pendingWriteTree_,T()))}function ia(n,e,t,i){if(I(n.path))return sa(n,e,t,i);{const s=e.get(T());t==null&&s!=null&&(t=We(s,T()));let r=[];const o=w(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=Ko(i,o);r=r.concat(ia(a,l,c,h))}return s&&(r=r.concat(es(s,n,i,t))),r}}function sa(n,e,t,i){const s=e.get(T());t==null&&s!=null&&(t=We(s,T()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Ko(i,o),h=n.operationForChild(o);h&&(r=r.concat(sa(h,a,l,c)))}),s&&(r=r.concat(es(s,n,i,t))),r}function ra(n,e){const t=e.query,i=un(n,t);return{hashFn:()=>(Vu(e)||C.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?rd(n,t._path,i):sd(n,t._path);{const r=ih(s,t);return Ei(n,t,null,r)}}}}function un(n,e){const t=Sn(e);return n.queryToTagMap.get(t)}function Sn(n){return n._path.toString()+"$"+n._queryIdentifier}function ns(n,e){return n.tagToQueryMap.get(e)}function is(n){const e=n.indexOf("$");return g(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new N(n.substr(0,e))}}function ss(n,e,t){const i=n.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const s=Qi(n.pendingWriteTree_,e);return es(i,t,s,null)}function ld(n){return n.fold((e,t,i)=>{if(t&&ye(t))return[bn(t)];{let s=[];return t&&(s=Zo(t)),$(i,(r,o)=>{s=s.concat(o)}),s}})}function gt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(ed())(n._repo,n._path):n}function cd(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Sn(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function hd(){return td++}function ud(n,e,t){const i=e._path,s=un(n,e),r=ra(n,t),o=n.listenProvider_.startListening(gt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)g(!ye(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!I(c)&&h&&ye(h))return[bn(h).query];{let d=[];return h&&(d=d.concat(Zo(h).map(f=>f.query))),$(u,(f,p)=>{d=d.concat(p)}),d}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(gt(h),un(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new rs(t)}node(){return this.node_}}class os{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=M(this.path_,e);return new os(this.syncTree_,t)}node(){return ts(this.syncTree_,this.path_)}}const dd=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},dr=function(n,e,t){if(!n||typeof n!="object")return n;if(g(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return fd(n[".sv"],e,t);if(typeof n[".sv"]=="object")return pd(n[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},fd=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:g(!1,"Unexpected server value: "+n)}},pd=function(n,e,t){n.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const s=e.node();if(g(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},oa=function(n,e,t,i){return as(e,new os(t,n),i)},aa=function(n,e,t){return as(n,new rs(e),t)};function as(n,e,t){const i=n.getPriority().val(),s=dr(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=dr(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new B(a,W(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new B(s))),o.forEachChild(x,(a,l)=>{const c=as(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function cs(n,e){let t=e instanceof N?e:new N(e),i=n,s=w(t);for(;s!==null;){const r=qe(i.node.children,s)||{children:{},childCount:0};i=new ls(s,i,r),t=P(t),s=w(t)}return i}function tt(n){return n.node.value}function la(n,e){n.node.value=e,wi(n)}function ca(n){return n.node.childCount>0}function gd(n){return tt(n)===void 0&&!ca(n)}function Tn(n,e){$(n.node.children,(t,i)=>{e(new ls(t,n,i))})}function ha(n,e,t,i){t&&e(n),Tn(n,s=>{ha(s,e,!0)})}function _d(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Ot(n){return new N(n.parent===null?n.name:Ot(n.parent)+"/"+n.name)}function wi(n){n.parent!==null&&md(n.parent,n.name,n)}function md(n,e,t){const i=gd(t),s=se(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,wi(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,wi(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd=/[\[\].#$\/\u0000-\u001F\u007F]/,Cd=/[\[\].#$\u0000-\u001F\u007F]/,Kn=10*1024*1024,hs=function(n){return typeof n=="string"&&n.length!==0&&!yd.test(n)},ua=function(n){return typeof n=="string"&&n.length!==0&&!Cd.test(n)},vd=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ua(n)},Ed=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Oi(n)||n&&typeof n=="object"&&se(n,".sv")},da=function(n,e,t,i){i&&e===void 0||Nn(Cn(n,"value"),e,t)},Nn=function(n,e,t){const i=t instanceof N?new Fh(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+be(i));if(typeof e=="function")throw new Error(n+"contains a function "+be(i)+" with contents = "+e.toString());if(Oi(e))throw new Error(n+"contains "+e.toString()+" "+be(i));if(typeof e=="string"&&e.length>Kn/3&&vn(e)>Kn)throw new Error(n+"contains a string greater than "+Kn+" utf8 bytes "+be(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if($(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!hs(o)))throw new Error(n+" contains an invalid key ("+o+") "+be(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Bh(i,o),Nn(n,a,i),Uh(i)}),s&&r)throw new Error(n+' contains ".value" child '+be(i)+" in addition to actual children.")}},wd=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=bt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!hs(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Oh);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Y(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},bd=function(n,e,t,i){const s=Cn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];$(e,(o,a)=>{const l=new N(o);if(Nn(s,a,M(t,l)),Hi(l)===".priority"&&!Ed(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),wd(s,r)},fa=function(n,e,t,i){if(!ua(t))throw new Error(Cn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Id=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),fa(n,e,t)},us=function(n,e){if(w(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Sd=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!hs(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!vd(t))throw new Error(Cn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Rn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Vi(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function pa(n,e,t){Rn(n,t),ga(n,i=>Vi(i,e))}function te(n,e,t){Rn(n,t),ga(n,i=>Y(i,e)||Y(e,i))}function ga(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Nd(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Nd(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();ut&&V("event: "+t.toString()),Ze(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd="repo_interrupt",Ad=25;class kd{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Td,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=sn(),this.transactionQueueTree_=new ls,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Pd(n,e,t){if(n.stats_=Ui(n.repoInfo_),n.forceRestClient_||ah())n.server_=new nn(n.repoInfo_,(i,s,r,o)=>{fr(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>pr(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{H(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ae(n.repoInfo_,e,(i,s,r,o)=>{fr(n,i,s,r,o)},i=>{pr(n,i)},i=>{Dd(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=dh(n.repoInfo_,()=>new uu(n.stats_,n.server_)),n.infoData_=new ou,n.infoSyncTree_=new hr({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=In(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ds(n,"connected",!1),n.serverSyncTree_=new hr({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);te(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function _a(n){const t=n.infoData_.getNode(new N(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function An(n){return dd({timestamp:_a(n)})}function fr(n,e,t,i,s){n.dataUpdateCount++;const r=new N(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Jt(t,c=>W(c));o=ad(n.serverSyncTree_,r,l,s)}else{const l=W(t);o=od(n.serverSyncTree_,r,l,s)}else if(i){const l=Jt(t,c=>W(c));o=id(n.serverSyncTree_,r,l)}else{const l=W(t);o=In(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Qe(n,r)),te(n.eventQueue_,a,o)}function pr(n,e){ds(n,"connected",e),e===!1&&xd(n)}function Dd(n,e){$(e,(t,i)=>{ds(n,t,i)})}function ds(n,e,t){const i=new N("/.info/"+e),s=W(t);n.infoData_.updateSnapshot(i,s);const r=In(n.infoSyncTree_,i,s);te(n.eventQueue_,i,r)}function fs(n){return n.nextWriteId_++}function Ld(n,e,t,i,s){kn(n,"set",{path:e.toString(),value:t,priority:i});const r=An(n),o=W(t,i),a=ts(n.serverSyncTree_,e),l=aa(o,a,r),c=fs(n),h=na(n.serverSyncTree_,e,l,c,!0);Rn(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(d,f)=>{const p=d==="ok";p||q("set at "+e+" failed: "+d);const _=fe(n.serverSyncTree_,c,!p);te(n.eventQueue_,e,_),bi(n,s,d,f)});const u=gs(n,e);Qe(n,u),te(n.eventQueue_,u,[])}function Md(n,e,t,i){kn(n,"update",{path:e.toString(),value:t});let s=!0;const r=An(n),o={};if($(t,(a,l)=>{s=!1,o[a]=oa(M(e,a),W(l),n.serverSyncTree_,r)}),s)V("update() called with empty data.  Don't do anything."),bi(n,i,"ok",void 0);else{const a=fs(n),l=nd(n.serverSyncTree_,e,o,a);Rn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,h)=>{const u=c==="ok";u||q("update at "+e+" failed: "+c);const d=fe(n.serverSyncTree_,a,!u),f=d.length>0?Qe(n,e):e;te(n.eventQueue_,f,d),bi(n,i,c,h)}),$(t,c=>{const h=gs(n,M(e,c));Qe(n,h)}),te(n.eventQueue_,e,[])}}function xd(n){kn(n,"onDisconnectEvents");const e=An(n),t=sn();pi(n.onDisconnect_,T(),(s,r)=>{const o=oa(s,r,n.serverSyncTree_,e);$o(t,s,o)});let i=[];pi(t,T(),(s,r)=>{i=i.concat(In(n.serverSyncTree_,s,r));const o=gs(n,s);Qe(n,o)}),n.onDisconnect_=sn(),te(n.eventQueue_,T(),i)}function Od(n,e,t){let i;w(e._path)===".info"?i=ur(n.infoSyncTree_,e,t):i=ur(n.serverSyncTree_,e,t),pa(n.eventQueue_,e._path,i)}function gr(n,e,t){let i;w(e._path)===".info"?i=Ei(n.infoSyncTree_,e,t):i=Ei(n.serverSyncTree_,e,t),pa(n.eventQueue_,e._path,i)}function Fd(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Rd)}function kn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),V(t,...e)}function bi(n,e,t,i){e&&Ze(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function ma(n,e,t){return ts(n.serverSyncTree_,e,t)||C.EMPTY_NODE}function ps(n,e=n.transactionQueueTree_){if(e||Pn(n,e),tt(e)){const t=Ca(n,e);g(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Bd(n,Ot(e),t)}else ca(e)&&Tn(e,t=>{ps(n,t)})}function Bd(n,e,t){const i=t.map(c=>c.currentWriteId),s=ma(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const h=t[c];g(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=G(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{kn(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let d=0;d<t.length;d++)t[d].status=2,h=h.concat(fe(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&u.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();Pn(n,cs(n.transactionQueueTree_,e)),ps(n,n.transactionQueueTree_),te(n.eventQueue_,e,h);for(let d=0;d<u.length;d++)Ze(u[d])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{q("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Qe(n,e)}},o)}function Qe(n,e){const t=ya(n,e),i=Ot(t),s=Ca(n,t);return Ud(n,s,i),i}function Ud(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=G(t,l.path);let h=!1,u;if(g(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,s=s.concat(fe(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Ad)h=!0,u="maxretry",s=s.concat(fe(n.serverSyncTree_,l.currentWriteId,!0));else{const d=ma(n,l.path,o);l.currentInputSnapshot=d;const f=e[a].update(d.val());if(f!==void 0){Nn("transaction failed: Data returned ",f,l.path);let p=W(f);typeof f=="object"&&f!=null&&se(f,".priority")||(p=p.updatePriority(d.getPriority()));const S=l.currentWriteId,m=An(n),E=aa(p,d,m);l.currentOutputSnapshotRaw=p,l.currentOutputSnapshotResolved=E,l.currentWriteId=fs(n),o.splice(o.indexOf(S),1),s=s.concat(na(n.serverSyncTree_,l.path,E,l.currentWriteId,l.applyLocally)),s=s.concat(fe(n.serverSyncTree_,S,!0))}else h=!0,u="nodata",s=s.concat(fe(n.serverSyncTree_,l.currentWriteId,!0))}te(n.eventQueue_,t,s),s=[],h&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Pn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Ze(i[a]);ps(n,n.transactionQueueTree_)}function ya(n,e){let t,i=n.transactionQueueTree_;for(t=w(e);t!==null&&tt(i)===void 0;)i=cs(i,t),e=P(e),t=w(e);return i}function Ca(n,e){const t=[];return va(n,e,t),t.sort((i,s)=>i.order-s.order),t}function va(n,e,t){const i=tt(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Tn(e,s=>{va(n,s,t)})}function Pn(n,e){const t=tt(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,la(e,t.length>0?t:void 0)}Tn(e,i=>{Pn(n,i)})}function gs(n,e){const t=Ot(ya(n,e)),i=cs(n.transactionQueueTree_,e);return _d(i,s=>{Yn(n,s)}),Yn(n,i),ha(i,s=>{Yn(n,s)}),t}function Yn(n,e){const t=tt(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(g(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(fe(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?la(e,void 0):t.length=r+1,te(n.eventQueue_,Ot(e),s);for(let o=0;o<i.length;o++)Ze(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Hd(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):q(`Invalid query segment '${t}' in query '${n}'`)}return e}const _r=function(n,e){const t=Vd(n),i=t.namespace;t.domain==="firebase.com"&&ce(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ce("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Xc();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new To(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new N(t.pathString)}},Vd=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(s=Wd(n.substring(h,u)));const d=Hd(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),t=e.substring(p+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",$d=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=mr.charAt(t%64),t=Math.floor(t/64);g(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=mr.charAt(e[s]);return g(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+H(this.snapshot.exportVal())}}class qd{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return I(this._path)?null:Hi(this._path)}get ref(){return new ve(this._repo,this._path)}get _queryIdentifier(){const e=er(this._queryParams),t=Fi(e);return t==="{}"?"default":t}get _queryObject(){return er(this._queryParams)}isEqual(e){if(e=Xe(e),!(e instanceof _s))return!1;const t=this._repo===e._repo,i=Vi(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+xh(this._path)}}class ve extends _s{constructor(e,t){super(e,t,new Gi,!1)}get parent(){const e=xo(this._path);return e===null?null:new ve(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class dn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new N(e),i=Rt(this.ref,e);return new dn(this._node.getChild(t),i,x)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new dn(s,Rt(this.ref,i),x)))}hasChild(e){const t=new N(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ht(n,e){return n=Xe(n),n._checkNotDeleted("ref"),e!==void 0?Rt(n._root,e):n._root}function Rt(n,e){return n=Xe(n),w(n._path)===null?Id("child","path",e):fa("child","path",e),new ve(n._repo,M(n._path,e))}function jd(n,e){n=Xe(n),us("push",n._path),da("push",e,n._path,!0);const t=_a(n._repo),i=$d(t),s=Rt(n,i),r=Rt(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function yr(n){return us("remove",n._path),Ea(n,null)}function Ea(n,e){n=Xe(n),us("set",n._path),da("set",e,n._path,!1);const t=new Pt;return Ld(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Kd(n,e){bd("update",e,n._path);const t=new Pt;return Md(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}class ms{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new zd("value",this,new dn(e.snapshotNode,new ve(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new qd(this,e,t):null}matches(e){return e instanceof ms?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Yd(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(h,u)=>{gr(n._repo,n,a),l(h,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Gd(t,r||void 0),a=new ms(o);return Od(n._repo,n,a),()=>gr(n._repo,n,a)}function Qd(n,e,t,i){return Yd(n,"value",e,t,i)}ju(ve);Zu(ve);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd="FIREBASE_DATABASE_EMULATOR_HOST",Ii={};let Xd=!1;function Zd(n,e,t,i){n.repoInfo_=new To(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function ef(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ce("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),V("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=_r(r,s),a=o.repoInfo,l;typeof process<"u"&&Os&&(l=Os[Jd]),l?(r=`http://${l}?ns=${a.namespace}`,o=_r(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new ch(n.name,n.options,e);Sd("Invalid Firebase Database URL",o),I(o.path)||ce("Database URL must point to the root of a Firebase Database (not including a child path).");const h=nf(a,n,c,new lh(n.name,t));return new sf(h,n)}function tf(n,e){const t=Ii[e];(!t||t[n.key]!==n)&&ce(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Fd(n),delete t[n.key]}function nf(n,e,t,i){let s=Ii[e.name];s||(s={},Ii[e.name]=s);let r=s[n.toURLString()];return r&&ce("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new kd(n,Xd,t,i),s[n.toURLString()]=r,r}class sf{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Pd(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ve(this._repo,T())),this._rootInternal}_delete(){return this._rootInternal!==null&&(tf(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ce("Cannot call "+e+" on a deleted database.")}}function rf(n=lo(),e){const t=kc(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Cl("database");i&&of(t,...i)}return t}function of(n,e,t,i={}){n=Xe(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&ce("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&ce('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new qt(qt.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:vl(i.mockUserToken,n.app.options.projectId);r=new qt(o)}Zd(s,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){Gc(Lc),Xt(new Ct("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return ef(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Fe(Fs,Bs,n),Fe(Fs,Bs,"esm2017")}ae.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ae.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};af();class lf{constructor(){this.app=null,this.db=null,this.roomId=this.getStoredRoomId(),this.isFirebaseConnected=!1,this.activeListener=null,this.clipsRef=null,this.onClipsUpdateCallback=null,this.broadcastChannel=null,typeof window<"u"&&"BroadcastChannel"in window&&(this.broadcastChannel=new BroadcastChannel("clipsync_room_bus"),this.broadcastChannel.onmessage=e=>{e.data&&e.data.roomId===this.roomId&&this.onClipsUpdateCallback&&!this.isFirebaseConnected&&this.onClipsUpdateCallback(this.getLocalClips())}),this.init()}getStoredRoomId(){if(typeof window<"u"){const s=new URLSearchParams(window.location.search).get("room");if(s&&s.trim()){const r=s.trim().toUpperCase();return localStorage.setItem("clipsync_room_id",r),r}}const e=localStorage.getItem("clipsync_room_id");if(e&&e.trim())return e.trim();const t="CLIP-"+Math.floor(1e3+Math.random()*9e3);return localStorage.setItem("clipsync_room_id",t),t}setRoomId(e){if(!e)return;const t=e.trim().toUpperCase();this.roomId=t,localStorage.setItem("clipsync_room_id",t),this.bindRoomListener()}getFirebaseConfig(){try{const e=localStorage.getItem("clipsync_firebase_config");if(e)return JSON.parse(e)}catch(e){console.warn("Failed to parse Firebase config",e)}return null}saveFirebaseConfig(e){return localStorage.setItem("clipsync_firebase_config",JSON.stringify(e)),this.init()}resetToLocal(){localStorage.removeItem("clipsync_firebase_config"),this.isFirebaseConnected=!1,this.db=null,this.bindRoomListener()}init(){const e=this.getFirebaseConfig();if(e&&e.apiKey&&(e.databaseURL||e.projectId))try{let t;Mc().length===0?t=ao(e):t=lo(),this.app=t,this.db=rf(t),this.isFirebaseConnected=!0,console.log("[SyncService] Firebase initialized successfully")}catch(t){console.error("[SyncService] Firebase initialization error:",t),this.isFirebaseConnected=!1}else this.isFirebaseConnected=!1,console.log("[SyncService] Running in Local / In-browser relay mode");return this.bindRoomListener(),this.isFirebaseConnected}onClipsUpdate(e){this.onClipsUpdateCallback=e,this.isFirebaseConnected||e(this.getLocalClips())}bindRoomListener(){if(this.activeListener&&typeof this.activeListener=="function"&&(this.activeListener(),this.activeListener=null),this.isFirebaseConnected&&this.db)try{this.clipsRef=Ht(this.db,`rooms/${this.roomId}/clips`);const e=Qd(this.clipsRef,t=>{const i=t.val(),s=[];i&&Object.keys(i).forEach(r=>{s.push({id:r,...i[r]})}),s.sort((r,o)=>r.pinned!==o.pinned?o.pinned?1:-1:(o.timestamp||0)-(r.timestamp||0)),this.saveLocalClips(s),this.onClipsUpdateCallback&&this.onClipsUpdateCallback(s)},t=>{console.error("[SyncService] Firebase onValue error:",t),this.onClipsUpdateCallback&&this.onClipsUpdateCallback(this.getLocalClips())});this.activeListener=e;return}catch(e){console.error("[SyncService] Failed to bind Firebase listener:",e)}this.onClipsUpdateCallback&&this.onClipsUpdateCallback(this.getLocalClips())}getLocalClips(){try{const e=localStorage.getItem(`clipsync_local_${this.roomId}`);if(e)return JSON.parse(e).sort((i,s)=>i.pinned!==s.pinned?s.pinned?1:-1:(s.timestamp||0)-(i.timestamp||0))}catch{}return[]}saveLocalClips(e){try{localStorage.setItem(`clipsync_local_${this.roomId}`,JSON.stringify(e))}catch{}}async addClip(e){const t={content:e.content||"",type:e.type||"text",device:e.device||"Web",pinned:!1,timestamp:Date.now()};if(this.isFirebaseConnected&&this.db&&this.clipsRef)try{const o=jd(this.clipsRef);return await Ea(o,t),{id:o.key,...t}}catch(o){console.error("[SyncService] Failed to push to Firebase:",o)}const s={id:"loc_"+Date.now()+"_"+Math.random().toString(36).substring(2,7),...t},r=this.getLocalClips();return r.unshift(s),this.saveLocalClips(r),this.broadcastChannel&&this.broadcastChannel.postMessage({type:"ADD",roomId:this.roomId}),this.onClipsUpdateCallback&&this.onClipsUpdateCallback(r),s}async togglePin(e,t){const i=!t;if(this.isFirebaseConnected&&this.db)try{const o=Ht(this.db,`rooms/${this.roomId}/clips/${e}`);await Kd(o,{pinned:i});return}catch(o){console.error("[SyncService] Pin update failed in Firebase:",o)}const s=this.getLocalClips(),r=s.find(o=>o.id===e);r&&(r.pinned=i,this.saveLocalClips(s),this.broadcastChannel&&this.broadcastChannel.postMessage({type:"UPDATE",roomId:this.roomId}),this.onClipsUpdateCallback&&this.onClipsUpdateCallback(s))}async deleteClip(e){if(this.isFirebaseConnected&&this.db)try{const i=Ht(this.db,`rooms/${this.roomId}/clips/${e}`);await yr(i);return}catch(i){console.error("[SyncService] Delete failed in Firebase:",i)}let t=this.getLocalClips();t=t.filter(i=>i.id!==e),this.saveLocalClips(t),this.broadcastChannel&&this.broadcastChannel.postMessage({type:"DELETE",roomId:this.roomId}),this.onClipsUpdateCallback&&this.onClipsUpdateCallback(t)}async clearAll(){if(this.isFirebaseConnected&&this.db)try{const t=this.getLocalClips();for(const i of t)i.pinned||await yr(Ht(this.db,`rooms/${this.roomId}/clips/${i.id}`));return}catch(t){console.error("[SyncService] Clear failed in Firebase:",t)}let e=this.getLocalClips();e=e.filter(t=>t.pinned),this.saveLocalClips(e),this.broadcastChannel&&this.broadcastChannel.postMessage({type:"CLEAR",roomId:this.roomId}),this.onClipsUpdateCallback&&this.onClipsUpdateCallback(e)}}const O=new lf;class cf{constructor(){this.ctx=null,this.enabled=localStorage.getItem("clipsync_sound")!=="false"}init(){if(!this.ctx&&typeof window<"u"){const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}}toggle(){return this.enabled=!this.enabled,localStorage.setItem("clipsync_sound",this.enabled?"true":"false"),this.enabled&&this.playPop(),this.enabled}playPop(){if(this.enabled)try{if(this.init(),!this.ctx)return;this.ctx.state==="suspended"&&this.ctx.resume();const e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(440,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(880,this.ctx.currentTime+.08),t.gain.setValueAtTime(.12,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+.08),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.08)}catch{}}playCopyChime(){if(this.enabled)try{if(this.init(),!this.ctx)return;this.ctx.state==="suspended"&&this.ctx.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(587.33,e),t.frequency.setValueAtTime(880,e+.07),i.gain.setValueAtTime(.15,e),i.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(e+.22)}catch{}}playSyncTone(){if(this.enabled)try{if(this.init(),!this.ctx)return;this.ctx.state==="suspended"&&this.ctx.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(523.25,e),t.frequency.exponentialRampToValueAtTime(1046.5,e+.12),i.gain.setValueAtTime(.1,e),i.gain.exponentialRampToValueAtTime(.001,e+.14),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(e+.14)}catch{}}playDelete(){if(this.enabled)try{if(this.init(),!this.ctx)return;this.ctx.state==="suspended"&&this.ctx.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(110,e+.1),i.gain.setValueAtTime(.1,e),i.gain.exponentialRampToValueAtTime(.001,e+.1),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(e+.1)}catch{}}}const z=new cf;let ue=[],lt="all",_t="",Le=null;const Qn=document.getElementById("clips-list"),Cr=document.getElementById("empty-state"),vr=document.getElementById("loading-state"),Me=document.getElementById("search-input"),Vt=document.getElementById("btn-clear-search"),Er=document.querySelectorAll(".tab-btn"),hf=document.getElementById("toast-container"),uf=document.getElementById("display-room-id"),$t=document.getElementById("status-dot"),df=document.getElementById("btn-room-badge"),ff=document.getElementById("btn-pair-device"),pf=document.getElementById("btn-open-settings"),gf=document.getElementById("btn-sound-toggle"),fn=document.getElementById("sound-icon-on"),pn=document.getElementById("sound-icon-off"),Ee=document.getElementById("btn-install-pwa"),_f=document.getElementById("btn-clear-all"),mf=document.getElementById("btn-export-clips"),wr=document.getElementById("btn-quick-paste"),br=document.getElementById("btn-add-sample"),Ir=document.getElementById("btn-empty-add"),Sr=document.getElementById("btn-mobile-fab"),yf=document.getElementById("btn-open-new-clip"),ys=document.getElementById("modal-new-clip"),Cf=document.getElementById("btn-close-new-clip"),vf=document.getElementById("btn-cancel-compose"),J=document.getElementById("clip-input"),Ef=document.getElementById("btn-sync-clip"),wf=document.getElementById("char-count"),Jn=document.getElementById("detected-icon"),Xn=document.getElementById("detected-text"),bf=document.getElementById("btn-modal-paste"),Cs=document.getElementById("modal-pair"),If=document.getElementById("btn-close-pair"),Tr=document.getElementById("qr-canvas-holder"),Sf=document.getElementById("pair-room-input"),Nr=document.getElementById("btn-copy-room-link"),Rr=document.getElementById("input-custom-room"),Tf=document.getElementById("btn-switch-room"),Nf=document.getElementById("btn-random-room"),vs=document.getElementById("modal-settings"),Rf=document.getElementById("btn-close-settings"),Si=document.getElementById("firebase-json-input"),Af=document.getElementById("btn-save-firebase"),kf=document.getElementById("btn-reset-firebase"),zt=document.getElementById("settings-status-badge"),Ar=document.getElementById("settings-status-detail"),Pf=document.getElementById("btn-toggle-guide"),Df=document.getElementById("guide-content"),xe=document.getElementById("modal-confirm-clear"),Lf=document.getElementById("btn-close-confirm"),Mf=document.getElementById("btn-cancel-clear"),xf=document.getElementById("btn-execute-clear"),Of=document.getElementById("count-all"),Ff=document.getElementById("count-link"),Bf=document.getElementById("count-code"),Uf=document.getElementById("count-text"),Wf=document.getElementById("count-pinned");window.addEventListener("DOMContentLoaded",()=>{Vf(),Gf(),ct(),$f(),qf(),O.onClipsUpdate(n=>{ue=n,vr&&vr.classList.add("hidden"),Gt(),zf()})});function Es(){const n=navigator.userAgent||"";return/iPad|iPhone|iPod/.test(n)&&!window.MSStream?"iPhone":/Macintosh|Mac OS X/.test(n)?"MacBook":/Android/.test(n)?"Android":/Windows/.test(n)?"Windows PC":/Linux/.test(n)?"Linux":"Web Device"}function Hf(n){return n==="MacBook"?"💻":n==="iPhone"?"📱":n==="Android"?"🤖":n==="Windows PC"?"🖥️":"🌐"}function Vf(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(n=>{console.log("[PWA] Service Worker registered:",n.scope)}).catch(n=>{console.warn("[PWA] Service Worker registration failed:",n)}),window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),Le=n,Ee&&Ee.classList.remove("hidden")}),window.addEventListener("appinstalled",()=>{D("ClipSync installed successfully! 🚀","success"),Ee&&Ee.classList.add("hidden"),Le=null}),Ee&&Ee.addEventListener("click",async()=>{if(Le){Le.prompt();const{outcome:n}=await Le.userChoice;n==="accepted"&&console.log("[PWA] Installation accepted"),Le=null,Ee.classList.add("hidden")}else D('To install: Tap Share (⎙) -> "Add to Home Screen"',"info")})}function $f(){const n=new URLSearchParams(window.location.search),e=n.get("title"),t=n.get("text"),i=n.get("url");if(e||t||i){let s="";if(i?(s=i,t&&t!==i&&(s=t+`
`+i)):t?s=t:e&&(s=e),s.trim()){const o=Dn(s),a=Es();O.addClip({content:s.trim(),type:o,device:a}).then(()=>{z.playSyncTone(),D("Shared item added to dashboard! 📥","success")})}const r=window.location.origin+window.location.pathname+(n.has("room")?`?room=${n.get("room")}`:"");window.history.replaceState({},document.title,r)}}function Dn(n){if(!n)return"text";const e=n.trim();if(/^(https?:\/\/[^\s]+)$/i.test(e))return"link";const s=["const ","let ","var ","function","class ","import ","export ","def ","return ","console.log","<div>","<script","SELECT ","FROM ","{","}","=>","public static void","#include"].some(o=>e.includes(o)),r=(e.match(/\n/g)||[]).length>=2;return s&&(r||e.includes("{")||e.includes(";"))?"code":"text"}function Ti(n){const e=Dn(n);e==="link"?(Jn.textContent="🔗",Xn.textContent="Link"):e==="code"?(Jn.textContent="💻",Xn.textContent="Code"):(Jn.textContent="📝",Xn.textContent="Text"),wf.textContent=`${n.length} characters`}function Gt(){let n=[...ue];if(_t){const t=_t.toLowerCase();n=n.filter(i=>{const s=(i.content||"").toLowerCase().includes(t),r=(i.device||"").toLowerCase().includes(t),o=(i.type||"").toLowerCase().includes(t);return s||r||o})}if(lt==="link"?n=n.filter(t=>t.type==="link"):lt==="code"?n=n.filter(t=>t.type==="code"):lt==="text"?n=n.filter(t=>t.type==="text"):lt==="pinned"&&(n=n.filter(t=>t.pinned)),n.length===0){Qn.innerHTML="",Cr.classList.remove("hidden");return}else Cr.classList.add("hidden");const e=document.createDocumentFragment();n.forEach(t=>{const i=document.createElement("div");i.className=`clip-row ${t.pinned?"pinned":""}`,i.dataset.id=t.id,i.setAttribute("role","listitem");const s=t.type==="link"?"type-link":t.type==="code"?"type-code":"type-text",r=t.type==="link"?"🔗":t.type==="code"?"💻":"📝",o=Hf(t.device),a=Yf(t.timestamp);let l="";if(t.type==="link"){const d=t.content.trim();let f="";try{f=new URL(d).hostname}catch{f=d}l=`
        <div class="clip-title-row">
          <span class="clip-domain">${Ie(f)}</span>
        </div>
        <a href="${Ie(d)}" target="_blank" rel="noopener noreferrer" class="clip-url-text">${Ie(d)}</a>
      `}else t.type==="code"?l=`
        <div class="clip-code-block">
          <pre class="clip-code-text"><code>${Ie(t.content)}</code></pre>
        </div>
      `:l=`
        <div class="clip-plain-text">${Kf(Ie(t.content))}</div>
      `;i.innerHTML=`
      <div class="clip-main">
        <div class="clip-type-icon ${s}" title="${t.type}">
          ${r}
        </div>
        <div class="clip-details">
          ${l}
          <div class="clip-meta-bar">
            <span class="device-chip">${o} ${t.device||"Device"}</span>
            <span>•</span>
            <span class="timestamp">${a}</span>
            <span>•</span>
            <span>${(t.content||"").length} chars</span>
          </div>
        </div>
      </div>

      <div class="clip-actions-group">
        ${t.type==="link"?`
          <a href="${Ie(t.content.trim())}" target="_blank" rel="noopener noreferrer" class="btn-action-mini" title="Open URL in new tab">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        `:""}

        <button class="btn-action-mini btn-pin ${t.pinned?"active-pin":""}" title="${t.pinned?"Unpin":"Pin to top"}">
          <svg viewBox="0 0 24 24" fill="${t.pinned?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>

        <button class="btn-action-mini danger btn-delete" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        <button class="btn-action-copy">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      </div>
    `,i.querySelector(".btn-pin").addEventListener("click",()=>{z.playPop(),O.togglePin(t.id,t.pinned)}),i.querySelector(".btn-delete").addEventListener("click",()=>{z.playDelete(),i.style.opacity="0",i.style.transform="scale(0.97)",setTimeout(()=>{O.deleteClip(t.id)},140)});const u=i.querySelector(".btn-action-copy");u.addEventListener("click",()=>{wa(t.content,u)}),e.appendChild(i)}),Qn.innerHTML="",Qn.appendChild(e)}function zf(){Of.textContent=ue.length,Ff.textContent=ue.filter(n=>n.type==="link").length,Bf.textContent=ue.filter(n=>n.type==="code").length,Uf.textContent=ue.filter(n=>n.type==="text").length,Wf.textContent=ue.filter(n=>n.pinned).length}async function wa(n,e){try{if(await navigator.clipboard.writeText(n),"vibrate"in navigator&&navigator.vibrate([18]),z.playCopyChime(),e){const t=e.innerHTML;e.classList.add("copied"),e.innerHTML=`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Copied!</span>
      `,setTimeout(()=>{e.classList.remove("copied"),e.innerHTML=t},1600)}D("Copied to clipboard! 📋","success")}catch(t){console.error("Failed to copy:",t),D("Failed to copy","error")}}function qf(){yf.addEventListener("click",at),Sr&&Sr.addEventListener("click",at),Ir&&Ir.addEventListener("click",at),Cf.addEventListener("click",jt),vf.addEventListener("click",jt),J.addEventListener("input",()=>{Ti(J.value)}),bf.addEventListener("click",async()=>{try{const n=await navigator.clipboard.readText();n&&n.trim()?(J.value=n,Ti(n),J.focus(),D("Pasted from system clipboard!","info")):D("System clipboard is empty","info")}catch{D("Paste manually (permissions)","info"),J.focus()}}),wr&&wr.addEventListener("click",async()=>{try{const n=await navigator.clipboard.readText();if(n&&n.trim()){const e=Dn(n),t=Es();await O.addClip({content:n.trim(),type:e,device:t}),z.playSyncTone(),D("Clipboard item synced to dashboard! ⚡","success")}else D("System clipboard is empty","info")}catch{at(),D("Paste into input box","info")}}),Ef.addEventListener("click",kr),Me.addEventListener("input",()=>{_t=Me.value.trim(),_t.length>0?Vt.classList.remove("hidden"):Vt.classList.add("hidden"),Gt()}),Vt.addEventListener("click",()=>{Me.value="",_t="",Vt.classList.add("hidden"),Gt(),Me.focus()}),Er.forEach(n=>{n.addEventListener("click",()=>{z.playPop(),Er.forEach(e=>{e.classList.remove("active"),e.setAttribute("aria-selected","false")}),n.classList.add("active"),n.setAttribute("aria-selected","true"),lt=n.dataset.filter,Gt()})}),br&&br.addEventListener("click",()=>{z.playPop(),[{content:"https://news.ycombinator.com",type:"link",device:"MacBook"},{content:"https://github.com/trending",type:"link",device:"iPhone"},{content:`const syncStatus = {
  online: true,
  devices: ["MacBook", "iPhone", "Android"],
  latency: "< 100ms"
};`,type:"code",device:"MacBook"},{content:"Virtual clipboard manager is ready. Share any link or text from your phone and it syncs here automatically.",type:"text",device:"Android"}].forEach((e,t)=>{setTimeout(()=>{O.addClip(e)},t*80)}),D("Sample clips loaded into dashboard!","success")}),_f.addEventListener("click",()=>{z.playPop(),xe.classList.remove("hidden")}),Lf.addEventListener("click",()=>xe.classList.add("hidden")),Mf.addEventListener("click",()=>xe.classList.add("hidden")),xf.addEventListener("click",()=>{z.playDelete(),O.clearAll(),xe.classList.add("hidden"),D("Unpinned history cleared","info")}),mf.addEventListener("click",()=>{z.playPop();const n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(ue,null,2)),e=document.createElement("a");e.setAttribute("href",n),e.setAttribute("download",`clipsync-${O.roomId}.json`),document.body.appendChild(e),e.click(),e.remove(),D("Exported clipboard history JSON","success")}),gf.addEventListener("click",()=>{z.toggle()?(fn.classList.remove("hidden"),pn.classList.add("hidden"),D("Sound feedback enabled 🔔","info")):(fn.classList.add("hidden"),pn.classList.remove("hidden"),D("Sound feedback muted 🔕","info"))}),df.addEventListener("click",Pr),ff.addEventListener("click",Pr),If.addEventListener("click",Dr),Nr.addEventListener("click",()=>{const n=`${window.location.origin}${window.location.pathname}?room=${O.roomId}`;wa(n,Nr)}),Tf.addEventListener("click",()=>{const n=Rr.value.trim().toUpperCase();n&&(O.setRoomId(n),ct(),Ni(),Rr.value="",D(`Joined Room: ${n} 🔄`,"success"))}),Nf.addEventListener("click",()=>{const n="CLIP-"+Math.floor(1e3+Math.random()*9e3);O.setRoomId(n),ct(),Ni(),D(`New Room created: ${n} 🎲`,"success")}),pf.addEventListener("click",jf),Rf.addEventListener("click",Zn),Pf.addEventListener("click",()=>{Df.classList.toggle("hidden")}),Af.addEventListener("click",()=>{const n=Si.value.trim();if(!n){D("Please paste a valid Firebase configuration","error");return}try{let e;n.startsWith("{")?e=JSON.parse(n):e=Function(`"use strict"; return (${n});`)(),e&&(e.apiKey||e.databaseURL)?(O.saveFirebaseConfig(e),ct(),Ri(),D("Firebase connected successfully! ☁️","success"),setTimeout(Zn,1e3)):D("Config must contain apiKey and databaseURL","error")}catch(e){console.error(e),D("Invalid JSON format","error")}}),kf.addEventListener("click",()=>{O.resetToLocal(),Si.value="",ct(),Ri(),D("Reset to Local In-Browser Relay mode","info")}),window.addEventListener("keydown",n=>{(n.metaKey||n.ctrlKey)&&n.key.toLowerCase()==="n"&&(n.preventDefault(),at()),(n.metaKey||n.ctrlKey)&&n.key==="Enter"&&document.activeElement===J&&(n.preventDefault(),kr()),((n.metaKey||n.ctrlKey)&&n.key.toLowerCase()==="k"||n.key==="/"&&document.activeElement!==J&&document.activeElement!==Me)&&(n.preventDefault(),Me.focus()),n.key==="Escape"&&(jt(),Dr(),Zn(),xe.classList.add("hidden"))}),[ys,Cs,vs,xe].forEach(n=>{n.addEventListener("click",e=>{e.target===n&&n.classList.add("hidden")})})}function at(){z.playPop(),ys.classList.remove("hidden"),J.value="",Ti(""),setTimeout(()=>J.focus(),80)}function jt(){ys.classList.add("hidden")}function kr(){const n=J.value.trim();if(!n){J.focus();return}const e=Dn(n),t=Es();O.addClip({content:n,type:e,device:t}).then(()=>{z.playSyncTone(),jt(),D("Synced to dashboard! ⚡","success")})}function Gf(){z.enabled?(fn.classList.remove("hidden"),pn.classList.add("hidden")):(fn.classList.add("hidden"),pn.classList.remove("hidden"))}function ct(){uf.textContent=O.roomId,Sf.value=O.roomId,O.isFirebaseConnected?($t.className="status-indicator online",$t.title="Connected to Firebase Realtime Database"):($t.className="status-indicator",$t.title="Connected via Local Relay")}function Pr(){z.playPop(),Cs.classList.remove("hidden"),Ni()}function Dr(){Cs.classList.add("hidden")}function Ni(){const n=`${window.location.origin}${window.location.pathname}?room=${O.roomId}`;At.toCanvas(n,{width:160,margin:1,color:{dark:"#0B0F17",light:"#FFFFFF"}},(e,t)=>{!e&&t&&(Tr.innerHTML="",Tr.appendChild(t))})}function jf(){z.playPop(),vs.classList.remove("hidden"),Ri();const n=O.getFirebaseConfig();n&&(Si.value=JSON.stringify(n,null,2))}function Zn(){vs.classList.add("hidden")}function Ri(){O.isFirebaseConnected?(zt.textContent="☁️ Firebase Connected",zt.style.color="#34D399",Ar.textContent="Active connection to Firebase Realtime Database. All devices with this room code sync globally in real-time!"):(zt.textContent="⚡ Local Mode Active",zt.style.color="#38BDF8",Ar.textContent="Running in high-speed local relay mode. To sync across cellular networks globally, add your Firebase config.")}function D(n,e="info"){const t=document.createElement("div");t.className=`toast toast-${e}`;let i="ℹ️";e==="success"&&(i="✓"),e==="error"&&(i="✕"),t.innerHTML=`<span>${i}</span> <span>${Ie(n)}</span>`,hf.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(8px)",setTimeout(()=>t.remove(),200)},2400)}function Ie(n){return n?n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function Kf(n){const e=/(https?:\/\/[^\s]+)/g;return n.replace(e,t=>`<a href="${t}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">${t}</a>`)}function Yf(n){if(!n)return"Just now";const e=Math.floor((Date.now()-n)/1e3);if(e<10)return"Just now";if(e<60)return`${e}s ago`;const t=Math.floor(e/60);if(t<60)return`${t}m ago`;const i=Math.floor(t/60);return i<24?`${i}h ago`:`${Math.floor(i/24)}d ago`}
