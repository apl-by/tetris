(this.webpackJsonptetris=this.webpackJsonptetris||[]).push([[0],{130:function(e,t,c){},131:function(e,t,c){},132:function(e,t,c){},133:function(e,t,c){},134:function(e,t,c){},135:function(e,t,c){},136:function(e,t,c){},137:function(e,t,c){},138:function(e,t,c){},139:function(e,t,c){},140:function(e,t,c){"use strict";c.r(t);var n=c(1),o=c.n(n),r=c(49),a=c.n(r),i=(c(55),c(4)),s=c(2),l=(c(56),c(57),c(6)),u=c.n(l),f=c(0);function h(e){var t=e.state,c=e.match,n=u()("block",{block_active:t&&!c,block_matched:c});return Object(f.jsx)("li",{className:n})}var b=Object(n.memo)(h),d=c(50),j=c(19),m={I:{base:{cells:[13,14,15,16],checkLeft:[12],checkRight:[17],checkBottom:[23,24,25,26]},left:{cells:[-6,4,14,24],checkLeft:[-7,3,13,23],checkRight:[-5,5,15,25],checkBottom:[34]},reverse:{cells:[13,14,15,16],checkLeft:[12],checkRight:[17],checkBottom:[23,24,25,26]},right:{cells:[-6,4,14,24],checkLeft:[-7,3,13,23],checkRight:[-5,5,15,25],checkBottom:[34]}},O:{base:{cells:[4,5,14,15],checkLeft:[3,13],checkRight:[6,16],checkBottom:[24,25]},left:{cells:[4,5,14,15],checkLeft:[3,13],checkRight:[6,16],checkBottom:[24,25]},reverse:{cells:[4,5,14,15],checkLeft:[3,13],checkRight:[6,16],checkBottom:[24,25]},right:{cells:[4,5,14,15],checkLeft:[3,13],checkRight:[6,16],checkBottom:[24,25]}},L:{base:{cells:[6,14,15,16],checkLeft:[5,13],checkRight:[7,17],checkBottom:[24,25,26]},left:{cells:[4,5,15,25],checkLeft:[3,14,24],checkRight:[6,16,26],checkBottom:[14,35]},reverse:{cells:[4,5,6,14],checkLeft:[3,13],checkRight:[7,15],checkBottom:[15,16,24]},right:{cells:[4,14,24,25],checkLeft:[3,13,23],checkRight:[5,15,26],checkBottom:[34,35]}},J:{base:{cells:[4,14,15,16],checkLeft:[3,13],checkRight:[5,17],checkBottom:[24,25,26]},left:{cells:[5,15,24,25],checkLeft:[4,14,23],checkRight:[6,16,26],checkBottom:[34,35]},reverse:{cells:[4,5,6,16],checkLeft:[3,15],checkRight:[7,17],checkBottom:[14,15,26]},right:{cells:[4,5,14,24],checkLeft:[3,13,23],checkRight:[6,15,25],checkBottom:[15,34]}},S:{base:{cells:[5,6,14,15],checkLeft:[4,13],checkRight:[7,16],checkBottom:[16,24,25]},left:{cells:[4,14,15,25],checkLeft:[3,13,24],checkRight:[5,16,26],checkBottom:[24,35]},reverse:{cells:[5,6,14,15],checkLeft:[4,13],checkRight:[7,16],checkBottom:[16,24,25]},right:{cells:[4,14,15,25],checkLeft:[3,13,24],checkRight:[5,16,26],checkBottom:[24,35]}},Z:{base:{cells:[4,5,15,16],checkLeft:[3,14],checkRight:[6,17],checkBottom:[14,25,26]},left:{cells:[6,15,16,25],checkLeft:[5,14,24],checkRight:[7,17,26],checkBottom:[26,35]},reverse:{cells:[4,5,15,16],checkLeft:[3,14],checkRight:[6,17],checkBottom:[14,25,26]},right:{cells:[6,15,16,25],checkLeft:[5,14,24],checkRight:[7,17,26],checkBottom:[26,35]}},T:{base:{cells:[5,14,15,16],checkLeft:[4,13],checkRight:[6,17],checkBottom:[24,25,26]},left:{cells:[5,14,15,25],checkLeft:[4,13,24],checkRight:[6,16,26],checkBottom:[24,35]},reverse:{cells:[4,5,6,15],checkLeft:[3,14],checkRight:[7,16],checkBottom:[14,16,25]},right:{cells:[5,15,16,25],checkLeft:[4,14,24],checkRight:[6,17,26],checkBottom:[26,35]}}},v={1:{lev:1,speed:850,point:{1:40,2:100,3:300,4:900}},2:{lev:2,speed:760,point:{1:80,2:200,3:600,4:1800}},3:{lev:3,speed:670,point:{1:120,2:300,3:900,4:2700}},4:{lev:4,speed:580,point:{1:160,2:400,3:1200,4:3600}},5:{lev:5,speed:500,point:{1:200,2:500,3:1500,4:4500}},6:{lev:6,speed:410,point:{1:240,2:600,3:1800,4:5400}},7:{lev:7,speed:350,point:{1:280,2:700,3:2100,4:6300}},8:{lev:8,speed:290,point:{1:320,2:800,3:2400,4:7200}},9:{lev:9,speed:250,point:{1:360,2:900,3:2700,4:8100}},10:{lev:10,speed:200,point:{1:400,2:1e3,3:3e3,4:9e3}},11:{lev:11,speed:180,point:{1:440,2:1100,3:3300,4:9900}},12:{lev:12,speed:150,point:{1:480,2:1200,3:3600,4:10800}},13:{lev:13,speed:130,point:{1:520,2:1300,3:3900,4:11700}},14:{lev:14,speed:110,point:{1:560,2:1400,3:4200,4:12600}},15:{lev:15,speed:90,point:{1:600,2:1500,3:4500,4:13500}},16:{lev:16,speed:70,point:{1:640,2:1600,3:4800,4:14400}},17:{lev:17,speed:65,point:{1:680,2:1700,3:5100,4:15300}},18:{lev:18,speed:60,point:{1:720,2:1800,3:5400,4:16200}},19:{lev:19,speed:55,point:{1:760,2:1900,3:5700,4:17100}},20:{lev:20,speed:45,point:{1:800,2:2100,3:6300,4:18900}},21:{lev:21,speed:30,point:{1:3333,2:7777,3:77777,4:777777}}},p=["I","O","L","J","S","Z","T"],O=[3,4,5,6,13,14,15,16],k={left:["ArrowLeft","a","A"],right:["ArrowRight","d","D"],down:["ArrowDown","s","S"],turn:["ArrowUp","w","W"]},g="https://github.com/apl-by/tetris",x=c(7),y=c.n(x),S=function(){for(var e={},t=10;t<210;t++)e["".concat(t)]={isActive:!1,match:!1,id:t};return e},_=function(e){if(e.all.length<2){var t=new Array(2).fill(p).flat(),c=[].concat(Object(j.a)(e.all),Object(j.a)(function(e){for(var t=Object(j.a)(e),c=t.length-1;c>0;c--){var n=Math.floor(Math.random()*(c+1)),o=[t[n],t[c]];t[c]=o[0],t[n]=o[1]}return t}(t)));return{all:c.slice(1),current:c[0],next:c[1]}}return{all:e.all.slice(1),current:e.all[0],next:e.all[1]}},w=function(e,t){var c=y()(t);return m["".concat(e)].base.cells.forEach((function(e){c["".concat(e)].isActive=!0})),c},A=function(e,t,c,n){var o=c.position,r=c.x+c.y,a=m["".concat(t)]["".concat(o)]["".concat(n)].map((function(e){return e+r}));return!a.some((function(e){return e>209}))&&(("checkLeft"!==n||!a.some((function(e){return e<0?String(e).match(/-\d?1$/):String(e).match(/9$/)})))&&(("checkRight"!==n||!a.some((function(e){return e<0?String(e).match(/-\d?0$/):String(e).match(/0$/)})))&&!a.some((function(t){return!(t<10)&&!0===e["".concat(t)].isActive}))))},L=function(e){var t={playArea:e.playArea,playAreaNoPiece:e.playAreaNoPiece,statArea:e.statArea,statAreaNoPiece:e.statAreaNoPiece,pieces:e.pieces,piecePosition:e.piecePosition,score:e.score,recordScore:e.recordScore,lines:e.lines,level:e.level};localStorage.setItem("saved-game",JSON.stringify(t))};c(130);var N=function(e){var t=e.children;return Object(f.jsx)("main",{className:"main",children:t})},R=(c(131),c(132),c(133),c(3));c(134);var B=function(e){var t=e.text,c=e.mix,n=u()("title",Object(R.a)({},"".concat(c),c));return Object(f.jsx)("p",{className:n,children:t})};var E=function(e){var t=e.field,c=e.isPause,n=e.isStarted,o=e.isEnd;return Object(f.jsxs)("div",{className:"play-area",children:[Object(f.jsx)("ul",{className:"play-area__list",children:Object.entries(t).map((function(e){var t=Object(s.a)(e,2),c=(t[0],t[1]);return Object(f.jsx)(b,{state:c.isActive,match:c.match},c.id)}))}),c&&Object(f.jsxs)("div",{className:"play-area__cover",children:[n&&Object(f.jsx)(B,{text:"\u041f\u0430\u0443\u0437\u0430",mix:"play-area__pause"}),!n&&!o&&Object(f.jsx)(B,{text:"\u0416\u043c\u0438\n\u0441\u0442\u0430\u0440\u0442",mix:"play-area__start"}),o&&Object(f.jsx)(B,{text:"\u041a\u043e\u043d\u0435\u0446\n\u0438\u0433\u0440\u044b",mix:"play-area__end"})]})]})};c(135);var P=function(e){var t=e.statFild,c=e.score,n=e.lines,o=e.level,r=e.record;return Object(f.jsxs)("div",{className:"game-stat",children:[Object(f.jsx)("h2",{className:"game-stat__title",children:"\u041e\u0447\u043a\u0438:"}),Object(f.jsx)("p",{className:"game-stat__value",children:c}),Object(f.jsx)("h2",{className:"game-stat__title",children:"\u041b\u0438\u043d\u0438\u0438:"}),Object(f.jsx)("p",{className:"game-stat__value",children:n}),Object(f.jsx)("h2",{className:"game-stat__title",children:"\u0423\u0440\u043e\u0432\u0435\u043d\u044c:"}),Object(f.jsx)("p",{className:"game-stat__value",children:o}),Object(f.jsx)("h2",{className:"game-stat__title",children:"\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f:"}),Object(f.jsx)("ul",{className:"game-stat__list",children:Object.entries(t).map((function(e){var t=Object(s.a)(e,2),c=(t[0],t[1]);return Object(f.jsx)(b,{state:c.isActive,match:c.match},c.id)}))}),Object(f.jsx)("h2",{className:"game-stat__title",children:"\u0420\u0435\u043a\u043e\u0440\u0434:"}),Object(f.jsx)("p",{className:"game-stat__value",children:r})]})};var C=function(e){var t=e.field,c=e.statFild,n=e.score,o=e.lines,r=e.level,a=e.isPause,i=e.isStarted,s=e.isEnd,l=e.record;return Object(f.jsxs)("div",{className:"container",children:[Object(f.jsx)("h1",{className:"container__title",children:"\u0422\u0435\u0442\u0440\u0438\u0441"}),Object(f.jsxs)("div",{className:"screen",children:[Object(f.jsx)(E,{field:t,isPause:a,isStarted:i,isEnd:s}),Object(f.jsx)(P,{statFild:c,score:n,lines:o,level:r,record:l})]})]})};c(136),c(137);var D=function(e){var t,c=e.type,n=e.ariaLabel,o=e.modSize,r=e.modColor,a=e.modShadow,i=e.mix,s=e.onDown,l=e.onUp,h=u()("btn",(t={},Object(R.a)(t,"btn_size_".concat(o),o),Object(R.a)(t,"btn_color_".concat(r),r),Object(R.a)(t,"btn_shadow_".concat(a),a),t),Object(R.a)({},"".concat(i),i));return Object(f.jsx)("button",{className:h,type:c,"aria-label":n,onMouseDown:s,onMouseUp:l,onTouchStart:s,onTouchEnd:l})};var T=function(e){var t=e.onDown,c=e.onUp,n=e.pressedKey,o=e.isTablet,r=""===n?null:["restart","pause"].includes(n)?"reverse-s":"reverse-m";return Object(f.jsxs)("div",{className:"control-panel",children:[Object(f.jsxs)("div",{className:"control-panel__main",children:[Object(f.jsx)(D,{type:"button",ariaLabel:"\u0432\u043b\u0435\u0432\u043e",modSize:o?"mobile":"m",modColor:"yellow",modShadow:"left"===n?r:null,mix:"control-panel__left",onDown:function(){return t("left")},onUp:function(){return c()}}),Object(f.jsx)(D,{type:"button",ariaLabel:"\u0432\u043d\u0438\u0437",modSize:o?"mobile":"m",modColor:"yellow",modShadow:"down"===n?r:null,mix:"control-panel__down",onDown:function(){return t("down")},onUp:function(){return c()}}),Object(f.jsx)(D,{type:"button",ariaLabel:"\u043f\u043e\u0432\u0435\u0440\u043d\u0443\u0442\u044c",modSize:o?"mobile":"m",modColor:"yellow",modShadow:"turn"===n?r:null,mix:"control-panel__up",onDown:function(){return t("turn")},onUp:function(){return c()}}),Object(f.jsx)(D,{type:"button",ariaLabel:"\u0432\u043f\u0440\u0430\u0432\u043e",modSize:o?"mobile":"m",modColor:"yellow",modShadow:"right"===n?r:null,mix:"control-panel__right",onDown:function(){return t("right")},onUp:function(){return c()}})]}),Object(f.jsxs)("div",{className:"control-panel__top",children:[Object(f.jsx)(D,{type:"button",ariaLabel:"\u043a\u043d\u043e\u043f\u043a\u0430 \u0441\u0431\u0440\u043e\u0441\u0438\u0442\u044c",modSize:"s",modColor:"red",modShadow:"restart"===n?r:null,mix:"control-panel__small-btn",onDown:function(){return t("restart")},onUp:function(){return c()}}),Object(f.jsx)(D,{type:"button",ariaLabel:"\u043a\u043d\u043e\u043f\u043a\u0430 \u043f\u0430\u0443\u0437\u0430/\u0441\u0442\u0430\u0440\u0442",modSize:"s",modColor:"green",modShadow:"pause"===n?r:null,mix:"control-panel__small-btn",onDown:function(){return t("pause")},onUp:function(){return c()}}),Object(f.jsx)(D,{type:"button",ariaLabel:"\u043a\u043d\u043e\u043f\u043a\u0430 \u0443\u0440\u043e\u043d\u0438\u0442\u044c",modSize:o?"mobile":"l",modColor:"yellow",modShadow:"drop"===n?r:null,mix:"control-panel__drop",onDown:function(){return t("drop")},onUp:function(){return c()}})]})]})};c(138);var U=function(e){var t=e.link,c=e.iconAlt,n=e.icon,o=e.mix,r=u()("link",Object(R.a)({},"".concat(o),o));return Object(f.jsxs)("a",{href:t,target:"_blank",rel:"noreferrer",className:r,children:[Object(f.jsx)("img",{src:n,alt:c,className:"link__icon"})," Github"]})},F=c.p+"static/media/github_icon.0f101c29.svg";var z=function(e){var t=e.field,c=e.statFild,n=e.score,o=e.lines,r=e.level,a=e.isPause,i=e.isStarted,s=e.isEnd,l=e.record,u=e.onDown,h=e.onUp,b=e.pressedKey,d=e.isTablet;return Object(f.jsxs)("section",{className:"brick-game",children:[d&&Object(f.jsx)(U,{link:g,icon:F,iconAlt:"\u0438\u043a\u043e\u043d\u043a\u0430 github",mix:"brick-game__link"}),Object(f.jsx)(C,{field:t,statFild:c,score:n,lines:o,level:r,isPause:a,isStarted:i,isEnd:s,record:l}),Object(f.jsx)(T,{onDown:u,onUp:h,pressedKey:b,isTablet:d})]})};c(139);var $=function(){var e=Object(n.useState)(2021),t=Object(s.a)(e,2),c=t[0],o=t[1];return Object(n.useEffect)((function(){var e=(new Date).getFullYear();e>2021&&o("2021-".concat(e))}),[]),Object(f.jsxs)("footer",{className:"footer",children:[Object(f.jsxs)("p",{className:"footer__copyright",children:["\xa9 ",c,' "\u041f\u0440\u043e\u0435\u043a\u0442 - \u0442\u0435\u0442\u0440\u0438\u0441"']}),Object(f.jsx)(U,{link:g,icon:F,iconAlt:"\u0438\u043a\u043e\u043d\u043a\u0430 github"})]})};var I=function(){var e=Object(n.useState)({}),t=Object(s.a)(e,2),c=t[0],o=t[1],r=Object(n.useState)({}),a=Object(s.a)(r,2),l=a[0],u=a[1],h=Object(n.useState)({}),b=Object(s.a)(h,2),j=b[0],p=b[1],g=Object(n.useState)({}),x=Object(s.a)(g,2),R=x[0],B=x[1],E=Object(n.useState)({all:[],current:"",next:""}),P=Object(s.a)(E,2),C=P[0],D=P[1],T=Object(n.useState)({position:"base",x:0,y:0}),U=Object(s.a)(T,2),F=U[0],I=U[1],J=Object(n.useState)(!1),M=Object(s.a)(J,2),K=M[0],W=M[1],Z=Object(n.useState)(!1),q=Object(s.a)(Z,2),G=q[0],Q=q[1],Y=Object(n.useState)(!1),H=Object(s.a)(Y,2),V=H[0],X=H[1],ee=Object(n.useState)(!1),te=Object(s.a)(ee,2),ce=te[0],ne=te[1],oe=Object(n.useState)(!0),re=Object(s.a)(oe,2),ae=re[0],ie=re[1],se=Object(n.useState)(""),le=Object(s.a)(se,2),ue=le[0],fe=le[1],he=Object(n.useState)(!1),be=Object(s.a)(he,2),de=be[0],je=be[1],me=Object(n.useState)(0),ve=Object(s.a)(me,2),pe=ve[0],Oe=ve[1],ke=Object(n.useState)(0),ge=Object(s.a)(ke,2),xe=ge[0],ye=ge[1],Se=Object(n.useState)(0),_e=Object(s.a)(Se,2),we=_e[0],Ae=_e[1],Le=Object(n.useState)(0),Ne=Object(s.a)(Le,2),Re=Ne[0],Be=Ne[1],Ee=Object(n.useState)(v[1]),Pe=Object(s.a)(Ee,2),Ce=Pe[0],De=Pe[1],Te=Object(n.useState)(!1),Ue=Object(s.a)(Te,2),Fe=Ue[0],ze=Ue[1],$e=Object(n.useState)(!1),Ie=Object(s.a)($e,2),Je=Ie[0],Me=Ie[1],Ke=Object(n.useState)(0),We=Object(s.a)(Ke,2),Ze=We[0],qe=We[1],Ge=Object(n.useState)(!1),Qe=Object(s.a)(Ge,2),Ye=Qe[0],He=Qe[1],Ve=Object(n.useState)(!1),Xe=Object(s.a)(Ve,2),et=Xe[0],tt=Xe[1];console.log(Ze);var ct=Object(d.useMediaQuery)({query:"(max-width: 768px)"}),nt=Object(n.useCallback)((function(){L({playArea:c,playAreaNoPiece:l,statArea:j,statAreaNoPiece:R,pieces:C,piecePosition:F,score:xe,recordScore:we,lines:Re,level:Ce})}),[c,l,j,R,C,F,xe,we,Re,Ce]);Object(n.useLayoutEffect)((function(){if(localStorage.getItem("saved-game")){var e=JSON.parse(localStorage.getItem("saved-game"));return o(e.playArea),u(e.playAreaNoPiece),p(e.statArea),B(e.statAreaNoPiece),D(e.pieces),I(e.piecePosition),ye(e.score),Ae(e.recordScore),Be(e.lines),void De(e.level)}var t=S(),c=function(){for(var e={},t=O,c=0;c<8;c++){var n=t.splice(0,1);e["".concat(n)]={isActive:!1,id:n}}return e}();o(t),u(t),p(c),B(c)}),[]),Object(n.useEffect)((function(){return document.addEventListener("keyup",dt),document.addEventListener("keydown",bt),function(){document.removeEventListener("keydown",bt),document.removeEventListener("keyup",dt)}})),Object(n.useEffect)((function(){C.current&&!et&&o(function(e,t,c){var n=y()(e),o=c.position,r=c.x+c.y;return m["".concat(t)]["".concat(o)].cells.map((function(e){return e+r})).forEach((function(e){e<10||(n["".concat(e)].isActive=!0)})),n}(l,C.current,F))}),[l,C,F,et]);var ot=Object(n.useCallback)((function(e,t){fe(""),u(e),I({position:"base",x:0,y:0});var c=_(t);p(w(c.next,R)),D(c),W(!1),nt()}),[R,nt]);Object(n.useEffect)((function(){if(G)if(0!==F.y){var e=c,t=function(e){for(var t=y()(e),c={},n=0,o=function(e){for(var o=0,r=0,a=0;a<10&&(!o||!r);a++)t["".concat(e+a)].isActive?o++:r++;if(10===o&&(n++,c["match".concat(n)]={rowStartCell:e,cells:Array.from({length:10},(function(t,c){return e+c}))}),!o)return"break"},r=200;r>=10&&n<4&&"break"!==o(r);r-=10);return c}(e),n=Object.keys(t).length;if(n){o(function(e,t){var c=y()(e);return Object.values(t).map((function(e){return e.cells})).flat().forEach((function(e){return c["".concat(e)].match=!0})),c}(e,t));var r=function(e,t){for(var c=y()(e),n=Object.values(t).map((function(e){return e.rowStartCell})),o=[],r=n[0];r>10;r-=10)o.push(r);var a=o.filter((function(e){return!n.includes(e)})),i=!1;return o.forEach((function(e){if(!i){for(var t=a.splice(0,1),n=0,o=0;o<10;o++)c["".concat(e+o)].isActive&&n++,c["".concat(e+o)].isActive=c["".concat(+t+o)].isActive,c["".concat(e+o)].match=c["".concat(+t+o)].match;n||(i=!0)}})),c}(e,t),a=Re+n;return setTimeout((function(){o(r),ye(function(e,t,c){return e+v[c].point[t]}(xe,n,Ce.lev)),Be(a),String(a).startsWith(String(Ce.lev))&&1!==a&&De(v[Ce.lev+1]),ot(r,C)}),600),void Q(!1)}ot(e,C),Q(!1)}else Me(!0)}),[G,c,C,ot,Ce,xe,Re,F]),Object(n.useEffect)((function(){if(Je&&!Ye&&!et){if(Ze>=40)return D({all:[],current:"",next:""}),p(R),W(!1),ie(!0),L({playArea:c,playAreaNoPiece:c,statArea:R,statAreaNoPiece:R,pieces:{all:[],current:"",next:""},piecePosition:{position:"base",x:0,y:0},score:0,recordScore:we,lines:0,level:v[1]}),void(xe>we&&Ae(xe));He(!0);var e=Ze<20?200-10*Ze:10+10*(Ze-20);o(Ze<20?function(e,t){for(var c=y()(e),n=0;n<10;n++)c["".concat(t+n)].isActive=!0;return c}(c,e):function(e,t){for(var c=y()(e),n=0;n<10;n++)c["".concat(t+n)].isActive=!1;return c}(c,e)),qe(Ze+1),setTimeout((function(){return He(!1)}),40)}}),[Je,Ze,Ye,c,R,et,we,xe]);var rt=Object(n.useCallback)((function(){if(!(ae||K||Je)){var e=function(e){var t=Object(i.a)({},e);return t.position="base"===t.position?"left":"left"===t.position?"reverse":"reverse"===t.position?"right":"base",t}(F);(function(e,t,c){var n=c.position,o=c.x+c.y,r=m["".concat(t)]["".concat(n)].cells.map((function(e){return e+o}));return!r.some((function(e){return e>209}))&&(!r.some((function(e){return e<0?String(e).match(/-\d?1$/):String(e).match(/9$/)}))||!r.some((function(e){return e<0?String(e).match(/-\d?0$/):String(e).match(/0$/)})))&&!r.some((function(t){return!(t<10)&&!0===e["".concat(t)].isActive}))})(l,C.current,e)&&I(e)}}),[ae,K,F,l,C,Je]),at=Object(n.useCallback)((function(){ae||K||Je||A(l,C.current,F,"checkLeft")&&I(Object(i.a)(Object(i.a)({},F),{},{x:F.x-1}))}),[ae,K,F,l,C,Je]),it=Object(n.useCallback)((function(){ae||K||Je||A(l,C.current,F,"checkRight")&&I(Object(i.a)(Object(i.a)({},F),{},{x:F.x+1}))}),[ae,K,F,l,C,Je]),st=Object(n.useCallback)((function(e){ae||K||Je||G||("down"===e&&ze(!0),A(l,C.current,F,"checkBottom")?I(Object(i.a)(Object(i.a)({},F),{},{y:F.y+10})):(Q(!0),W(!0)))}),[ae,K,F,l,C,Je,G]),lt=function(){if(!(ae||K||Je||G)){var e=function(e,t,c){for(var n=c.position,o=c.x,r=c.y,a=o+r,s=m["".concat(t)]["".concat(n)].checkBottom.map((function(e){return e+a})),l=r;l<190&&!s.some((function(t){return t>209||!0===e["".concat(t)].isActive}));)l+=10,s.forEach((function(e,t,c){return c[t]=e+10}));return Object(i.a)(Object(i.a)({},c),{},{y:l})}(l,C.current,F);I(e),setTimeout((function(){Q(!0),W(!0)}),0)}},ut=function(){var e=_(C);p(w(e.next,R)),D(e),ie(!1),tt(!1)},ft=function(){if(Je)return ht();C.current?ie(!ae):ut(),fe("pause")};Object(n.useEffect)((function(){Object.keys(k).includes(ue)&&!de&&(je(!0),pe>=1&&("left"===ue?at():"right"===ue?it():"down"===ue?st():rt()),setTimeout((function(){return je(!1)}),pe<1&&"turn"!==ue||"turn"===ue?170:50),pe<1&&Oe(pe+1))}),[ue,at,it,st,de,pe,rt]),Object(n.useEffect)((function(){ce||ae||K||Je||(ne(!0),ze(!1),setTimeout((function(){return X(!0)}),Ce.speed))}),[ce,ae,Ce,K,Je]),Object(n.useEffect)((function(){if(V&&"down"!==ue){if(Fe||G)return X(!1),void ne(!1);st(),X(!1),ne(!1)}}),[V,st,ue,Fe,G]);var ht=function(){var e=S();tt(!0),Q(!1),o(e),u(e),p(R),D({all:[],current:"",next:""}),I({position:"base",x:0,y:0}),ye(0),Be(0),De(v[1]),qe(0),Me(!1),ut()},bt=function(e){var t;if(ae||e.preventDefault(),!K)if("p"!==e.key&&"P"!==e.key||ue){if(("r"===e.key||"R"===e.key)&&!ue)return fe("restart"),void ht();if(!(Je||ae||(null===(t=k[ue])||void 0===t?void 0:t.includes(e.key))))return"ArrowUp"===e.key||"w"===e.key?(rt(),void fe("turn")):"ArrowLeft"===e.key||"a"===e.key?(at(),void fe("left")):"ArrowRight"===e.key||"d"===e.key?(it(),void fe("right")):"ArrowDown"===e.key||"s"===e.key?(st("down"),void fe("down")):"Control"===e.key||"x"===e.key?(lt(),void fe("drop")):void 0}else ft()},dt=function(e){fe(""),Oe(0)};return Object(f.jsxs)("div",{className:"app",children:[Object(f.jsx)(N,{children:Object(f.jsx)(z,{field:c||{},statFild:j||{},score:xe,lines:Re,level:Ce.lev,isPause:ae,isStarted:C.current,isEnd:Je,record:we,onDown:function(e){"turn"===e?rt():"left"===e?at():"right"===e?it():"down"===e?st("down"):"drop"===e?lt():"restart"===e?ht():ft(),fe(e)},onUp:function(){fe(""),0!==Oe&&Oe(0)},pressedKey:ue,isTablet:ct})}),!ct&&Object(f.jsx)($,{})]})},J=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,141)).then((function(t){var c=t.getCLS,n=t.getFID,o=t.getFCP,r=t.getLCP,a=t.getTTFB;c(e),n(e),o(e),r(e),a(e)}))};a.a.render(Object(f.jsx)(o.a.StrictMode,{children:Object(f.jsx)(I,{})}),document.getElementById("root")),J()},55:function(e,t,c){},56:function(e,t,c){},57:function(e,t,c){}},[[140,1,2]]]);
//# sourceMappingURL=main.9c9dfc6d.chunk.js.map