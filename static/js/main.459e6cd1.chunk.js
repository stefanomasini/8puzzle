(this.webpackJsonp8puzzle=this.webpackJsonp8puzzle||[]).push([[0],{14:function(e,t,r){},16:function(e,t,r){},18:function(e,t,r){"use strict";r.r(t);var n=r(2),a=r.n(n),c=r(9),o=r.n(c),s=(r(14),r(4)),i=r(6),u=r(7),l=r(3),d=r.n(l),b=r(1),h=(r(16),r(0)),f=d.a.mark(O),v=d.a.mark(S),p=d.a.mark(y),x=d.a.mark(C),k=d.a.mark(E);function w(e,t,r){for(var n=[],a=0,c=0;c<t;c+=1){for(var o=[],s=0;s<e;s+=1)o.push(r[a]),a+=1;n.push(o)}return n}function g(e,t){for(var r=[],n=1,a=0;a<t;a+=1)for(var c=0;c<e;c+=1)r.push(a<t-1||c<e-1?n:null),n+=1;return r}function m(e){var t=function(e){for(var t=0;t<e.length;t+=1)for(var r=0;r<e[t].length;r+=1)if(null===e[t][r]){var n=[];return r>0&&n.push({r:t,c:r-1,dir:"right"}),r<e[t].length-1&&n.push({r:t,c:r+1,dir:"left"}),t>0&&n.push({r:t-1,c:r,dir:"down"}),t<e.length-1&&n.push({r:t+1,c:r,dir:"up"}),n}}(e),r=t[Math.floor(Math.random()*t.length)];return j(e,r.r,r.c,r.dir)}function j(e,t,r,n){var a=e.map((function(e){return e.map((function(e){return e}))})),c=a[t][r];return a[t][r]=null,"up"===n&&(a[t-1][r]=c),"down"===n&&(a[t+1][r]=c),"left"===n&&(a[t][r-1]=c),"right"===n&&(a[t][r+1]=c),a}function O(e){var t,r,n,a,c,o,s,i,u,l,h,v,p,x,k,w,g,m,j,O,M,R,N,V,B,U,z,T,F,I,q,D,J,L,G,H,X,A;return d.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:console.log("Start solving"),t=new P(e),r=Object(b.a)(t.board.iterateSolvedCoords()),d.prev=3,r.s();case 5:if((n=r.n()).done){d.next=237;break}if(a=n.value,c=a.coord,o=a.expectedValue,!(c.value!==o||c.lastOfRow(2)&&!c.lastRow(1)&&c.right.value!==o+1||c.lastRow(2)&&!c.lastOfRow(1)&&c.down.value!==o+t.board.width)){d.next=234;break}if(console.log("Solving piece ".concat(o)),!c.lastRow(2)&&!c.lastRow(1)){d.next=134;break}if(!c.lastOfRow(2)){d.next=38;break}case 11:if(c.value===o&&c.right.value===o+1&&c.down.value===o+t.board.width){d.next=35;break}if(null!==c.value){d.next=17;break}return d.next=15,t.board.move(c.right,"left");case 15:d.next=33;break;case 17:if(null!==c.right.value){d.next=22;break}return d.next=20,t.board.move(c.right.down,"up");case 20:d.next=33;break;case 22:if(null!==c.right.down.value){d.next=27;break}return d.next=25,t.board.move(c.down,"right");case 25:d.next=33;break;case 27:if(null!==c.down.value){d.next=32;break}return d.next=30,t.board.move(c,"down");case 30:d.next=33;break;case 32:throw new Error("Unexpected position of empty ".concat(t.board.find(null).key));case 33:d.next=11;break;case 35:return d.abrupt("return");case 38:if(c.value===o+t.board.width){d.next=56;break}s=Object(b.a)(C(t,t.board.find(o+t.board.width),c)),d.prev=40,s.s();case 42:if((i=s.n()).done){d.next=48;break}return u=i.value,d.next=46,u;case 46:d.next=42;break;case 48:d.next=53;break;case 50:d.prev=50,d.t0=d.catch(40),s.e(d.t0);case 53:return d.prev=53,s.f(),d.finish(53);case 56:if(!((l=t.board.find(o)).c<=c.c+1)){d.next=93;break}h=Object(b.a)(C(t,l,t.board.coord(l.r,c.c+2))),d.prev=59,h.s();case 61:if((v=h.n()).done){d.next=67;break}return p=v.value,d.next=65,p;case 65:d.next=61;break;case 67:d.next=72;break;case 69:d.prev=69,d.t1=d.catch(59),h.e(d.t1);case 72:return d.prev=72,h.f(),d.finish(72);case 75:if(c.value===o+t.board.width){d.next=93;break}x=Object(b.a)(C(t,t.board.find(o+t.board.width),c)),d.prev=77,x.s();case 79:if((k=x.n()).done){d.next=85;break}return w=k.value,d.next=83,w;case 83:d.next=79;break;case 85:d.next=90;break;case 87:d.prev=87,d.t2=d.catch(77),x.e(d.t2);case 90:return d.prev=90,x.f(),d.finish(90);case 93:if(c.right.value===o){d.next=111;break}g=Object(b.a)(C(t.protect(c),t.board.find(o),c.right)),d.prev=95,g.s();case 97:if((m=g.n()).done){d.next=103;break}return j=m.value,d.next=101,j;case 101:d.next=97;break;case 103:d.next=108;break;case 105:d.prev=105,d.t3=d.catch(95),g.e(d.t3);case 108:return d.prev=108,g.f(),d.finish(108);case 111:O=Object(b.a)(E(t.protect(c).protect(c.right),t.board.find(null),c.down)),d.prev=112,O.s();case 114:if((M=O.n()).done){d.next=120;break}return R=M.value,d.next=118,R;case 118:d.next=114;break;case 120:d.next=125;break;case 122:d.prev=122,d.t4=d.catch(112),O.e(d.t4);case 125:return d.prev=125,O.f(),d.finish(125);case 128:return d.next=130,t.board.move(c,"down");case 130:return d.next=132,t.board.move(c.right,"left");case 132:d.next=234;break;case 134:if(!(c.lastOfRow(2)&&c.value!==o+1||c.right.lastOfRow(1)&&c.right.value!==o+1)){d.next=154;break}console.log("Move last value piece to second-last position"),N=Object(b.a)(C(t,t.board.find(o+1),c)),d.prev=137,N.s();case 139:if((V=N.n()).done){d.next=145;break}return B=V.value,d.next=143,B;case 143:d.next=139;break;case 145:d.next=150;break;case 147:d.prev=147,d.t5=d.catch(137),N.e(d.t5);case 150:return d.prev=150,N.f(),d.finish(150);case 153:t=t.protect(c);case 154:if(!c.lastOfRow(2)||c.value!==o+1){d.next=214;break}if(c.right.value!==o){d.next=176;break}console.log("Special case: last 2 row pieces are inverted"),U=Object(b.a)(S(t,c)),d.prev=158,U.s();case 160:if((z=U.n()).done){d.next=166;break}return T=z.value,d.next=164,T;case 164:d.next=160;break;case 166:d.next=171;break;case 168:d.prev=168,d.t6=d.catch(158),U.e(d.t6);case 171:return d.prev=171,U.f(),d.finish(171);case 174:d.next=212;break;case 176:console.log("Move second-last piece below the current position"),F=Object(b.a)(C(t,t.board.find(o),c.down)),d.prev=178,F.s();case 180:if((I=F.n()).done){d.next=186;break}return q=I.value,d.next=184,q;case 184:d.next=180;break;case 186:d.next=191;break;case 188:d.prev=188,d.t7=d.catch(178),F.e(d.t7);case 191:return d.prev=191,F.f(),d.finish(191);case 194:console.log("done"),D=Object(b.a)(y(t,c)),d.prev=196,D.s();case 198:if((J=D.n()).done){d.next=204;break}return L=J.value,d.next=202,L;case 202:d.next=198;break;case 204:d.next=209;break;case 206:d.prev=206,d.t8=d.catch(196),D.e(d.t8);case 209:return d.prev=209,D.f(),d.finish(209);case 212:d.next=232;break;case 214:G=t.board.find(o),H=Object(b.a)(C(t,G,c)),d.prev=216,H.s();case 218:if((X=H.n()).done){d.next=224;break}return A=X.value,d.next=222,A;case 222:d.next=218;break;case 224:d.next=229;break;case 226:d.prev=226,d.t9=d.catch(216),H.e(d.t9);case 229:return d.prev=229,H.f(),d.finish(229);case 232:if(c.value===o){d.next=234;break}throw new Error("Unexpected unsolved step");case 234:t=t.protect(c);case 235:d.next=5;break;case 237:d.next=242;break;case 239:d.prev=239,d.t10=d.catch(3),r.e(d.t10);case 242:return d.prev=242,r.f(),d.finish(242);case 245:case"end":return d.stop()}}),f,null,[[3,239,242,245],[40,50,53,56],[59,69,72,75],[77,87,90,93],[95,105,108,111],[112,122,125,128],[137,147,150,153],[158,168,171,174],[178,188,191,194],[196,206,209,212],[216,226,229,232]])}function S(e,t){var r,n,a,c,o,s,i;return d.a.wrap((function(u){for(;;)switch(u.prev=u.next){case 0:r=e.board.find(null),n=Object(b.a)(E(e.protect(t).protect(t.right),r,t.down)),u.prev=2,n.s();case 4:if((a=n.n()).done){u.next=10;break}return c=a.value,u.next=8,c;case 8:u.next=4;break;case 10:u.next=15;break;case 12:u.prev=12,u.t0=u.catch(2),n.e(u.t0);case 15:return u.prev=15,n.f(),u.finish(15);case 18:return u.next=20,e.board.move(t.down.right,"left");case 20:return u.next=22,e.board.move(t.right,"down");case 22:return u.next=24,e.board.move(t,"right");case 24:return u.next=26,e.board.move(t.down,"up");case 26:return u.next=28,e.board.move(t.down.right,"left");case 28:return u.next=30,e.board.move(t.down.down.right,"up");case 30:return u.next=32,e.board.move(t.down.down,"right");case 32:return u.next=34,e.board.move(t.down,"down");case 34:return u.next=36,e.board.move(t.down.right,"left");case 36:return u.next=38,e.board.move(t.right,"down");case 38:return u.next=40,e.board.move(t,"right");case 40:return u.next=42,e.board.move(t.down,"up");case 42:return u.next=44,e.board.move(t.down.right,"left");case 44:return u.next=46,e.board.move(t.right,"down");case 46:return u.next=48,e.board.move(t,"right");case 48:return u.next=50,e.board.move(t.down,"up");case 50:return u.next=52,e.board.move(t.down.down,"up");case 52:o=Object(b.a)(y(e,t)),u.prev=53,o.s();case 55:if((s=o.n()).done){u.next=61;break}return i=s.value,u.next=59,i;case 59:u.next=55;break;case 61:u.next=66;break;case 63:u.prev=63,u.t1=u.catch(53),o.e(u.t1);case 66:return u.prev=66,o.f(),u.finish(66);case 69:case"end":return u.stop()}}),v,null,[[2,12,15,18],[53,63,66,69]])}function y(e,t){var r,n,a;return d.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:r=Object(b.a)(E(e.protect(t).protect(t.right).protect(t.down),e.board.find(null),t.down.down)),c.prev=1,r.s();case 3:if((n=r.n()).done){c.next=9;break}return a=n.value,c.next=7,a;case 7:c.next=3;break;case 9:c.next=14;break;case 11:c.prev=11,c.t0=c.catch(1),r.e(c.t0);case 14:return c.prev=14,r.f(),c.finish(14);case 17:return c.next=19,e.board.move(t.down.down.right,"left");case 19:return c.next=21,e.board.move(t.down.right,"down");case 21:return c.next=23,e.board.move(t.right,"down");case 23:return c.next=25,e.board.move(t,"right");case 25:return c.next=27,e.board.move(t.down,"up");case 27:case"end":return c.stop()}}),p,null,[[1,11,14,17]])}function C(e,t,r){var n,a,c,o,s,i,u,l,h,f,v,p,k,w,g;return d.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:if(!t.isSame(r)){d.next=2;break}return d.abrupt("return");case 2:if(n=e.board.find(null),(a=t.r>r.r&&!t.up.isProtected(e)?t.up:t.c>r.c&&!t.left.isProtected(e)?t.left:t.right).insideBoard&&!a.isProtected(e)){d.next=6;break}throw new Error("No possible destination coords for empty");case 6:c=Object(b.a)(E(e.protect(t),n,a)),d.prev=7,c.s();case 9:if((o=c.n()).done){d.next=15;break}return s=o.value,d.next=13,s;case 13:d.next=9;break;case 15:d.next=20;break;case 17:d.prev=17,d.t0=d.catch(7),c.e(d.t0);case 20:return d.prev=20,c.f(),d.finish(20);case 23:if(!t.isSame(r)){d.next=26;break}return d.abrupt("break",111);case 26:if(n=e.board.find(null),i=t.possibleMove()){d.next=30;break}throw new Error("Unexpected: no possible move");case 30:if(!(t.c>r.c)){d.next=56;break}if("left"===i){d.next=51;break}u=Object(b.a)(E(e.protect(t),n,t.left)),d.prev=33,u.s();case 35:if((l=u.n()).done){d.next=41;break}return h=l.value,d.next=39,h;case 39:d.next=35;break;case 41:d.next=46;break;case 43:d.prev=43,d.t1=d.catch(33),u.e(d.t1);case 46:return d.prev=46,u.f(),d.finish(46);case 49:if("left"===t.possibleMove()){d.next=51;break}throw new Error("Unexpected: should have made left move possible");case 51:return d.next=53,e.board.move(t,"left");case 53:t=t.left,d.next=109;break;case 56:if(!(t.c<r.c)){d.next=82;break}if("right"===i){d.next=77;break}f=Object(b.a)(E(e.protect(t),n,t.right)),d.prev=59,f.s();case 61:if((v=f.n()).done){d.next=67;break}return p=v.value,d.next=65,p;case 65:d.next=61;break;case 67:d.next=72;break;case 69:d.prev=69,d.t2=d.catch(59),f.e(d.t2);case 72:return d.prev=72,f.f(),d.finish(72);case 75:if("right"===t.possibleMove()){d.next=77;break}throw new Error("Unexpected: should have made right move possible");case 77:return d.next=79,e.board.move(t,"right");case 79:t=t.right,d.next=109;break;case 82:if(!(t.r>r.r)){d.next=108;break}if("up"===i){d.next=103;break}k=Object(b.a)(E(e.protect(t),n,t.up)),d.prev=85,k.s();case 87:if((w=k.n()).done){d.next=93;break}return g=w.value,d.next=91,g;case 91:d.next=87;break;case 93:d.next=98;break;case 95:d.prev=95,d.t3=d.catch(85),k.e(d.t3);case 98:return d.prev=98,k.f(),d.finish(98);case 101:if("up"===t.possibleMove()){d.next=103;break}throw new Error("Unexpected: should have made up move possible");case 103:return d.next=105,e.board.move(t,"up");case 105:t=t.up,d.next=109;break;case 108:throw new Error("Unexpected: should either expect a left, or right or up move");case 109:d.next=23;break;case 111:case"end":return d.stop()}}),x,null,[[7,17,20,23],[33,43,46,49],[59,69,72,75],[85,95,98,101]])}function E(e,t,r){var n,a,c,o,s,i;return d.a.wrap((function(u){for(;;)switch(u.prev=u.next){case 0:if(null===t.value){u.next=2;break}throw new Error("Piece not empty at ".concat(t.key));case 2:if(t.isSame(r)){u.next=17;break}if(n=t.up.up.right.isSame(r)&&t.up.right.isProtected(e)&&t.up.up.isProtected(e),a=n?[{piece:t.right,dir:"left"}]:[{piece:t.up,dir:"down"},{piece:t.down,dir:"up"},{piece:t.right,dir:"left"},{piece:t.left,dir:"right"}],0!==(c=a.filter((function(t){var r=t.piece;return r.insideBoard&&!r.isProtected(e)}))).length){u.next=8;break}throw new Error("No place to move empty ".concat(t.key));case 8:return N(c,(function(e){return e.piece.distance(r)})),o=c[0],s=o.piece,i=o.dir,u.next=12,e.board.move(s,i);case 12:if(null===(t=s).value){u.next=15;break}throw new Error("Piece not empty at ".concat(t.key));case 15:u.next=2;break;case 17:case"end":return u.stop()}}),k)}var P=function(){function e(t,r){Object(i.a)(this,e),this.board=t,this.protectedPieces=r||new Set}return Object(u.a)(e,[{key:"protect",value:function(t){var r=new Set(this.protectedPieces);return r.add(t.key),new e(this.board,r)}}]),e}(),M=function(){function e(t,r,n){Object(i.a)(this,e),this.rows=t,this.width=r,this.height=n}return Object(u.a)(e,[{key:"coord",value:function(e,t){return new R(e,t,this)}},{key:"find",value:function(e){for(var t=0;t<this.height;t+=1)for(var r=0;r<this.width;r+=1)if(this.rows[t][r]===e)return this.coord(t,r);throw new Error("Value ".concat(e," not found"))}},{key:"move",value:function(e,t){if(!e.insideBoard)throw new Error("Coordinates out of board");if(null!==e.adj(t).value)throw new Error("Invalid move: ".concat(e.key," ").concat(t));var r=this.rows.map((function(e){return e.map((function(e){return e}))})),n=r[e.r][e.c];return r[e.r][e.c]=null,"up"===t&&(r[e.r-1][e.c]=n),"down"===t&&(r[e.r+1][e.c]=n),"left"===t&&(r[e.r][e.c-1]=n),"right"===t&&(r[e.r][e.c+1]=n),this.rows=r,r}},{key:"iterateSolvedCoords",value:d.a.mark((function e(){var t,r,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=1,r=0;case 2:if(!(r<this.height)){e.next=15;break}n=0;case 4:if(!(n<this.width)){e.next=12;break}if(!(r<this.height-1||n<this.width-1)){e.next=8;break}return e.next=8,{coord:this.coord(r,n),expectedValue:t};case 8:t+=1;case 9:n+=1,e.next=4;break;case 12:r+=1,e.next=2;break;case 15:case"end":return e.stop()}}),e,this)}))}]),e}(),R=function(){function e(t,r,n){Object(i.a)(this,e),this.r=t,this.c=r,this.key="".concat(t,":").concat(r),this.board=n}return Object(u.a)(e,[{key:"lastOfRow",value:function(e){return this.c===this.board.width-e}},{key:"lastRow",value:function(e){return this.r===this.board.height-e}},{key:"isSame",value:function(e){return this.r===e.r&&this.c===e.c}},{key:"distance",value:function(e){return Math.sqrt(Math.pow(e.r-this.r,2)+Math.pow(e.c-this.c,2))}},{key:"isProtected",value:function(e){return e.protectedPieces.has(this.key)}},{key:"insideBoard",get:function(){return this.c>=0&&this.c<this.board.width&&this.r>=0&&this.r<this.board.height}},{key:"adj",value:function(t){if("up"===t)return new e(this.r-1,this.c,this.board);if("down"===t)return new e(this.r+1,this.c,this.board);if("left"===t)return new e(this.r,this.c-1,this.board);if("right"===t)return new e(this.r,this.c+1,this.board);throw new Error("Unknown direction ".concat(t))}},{key:"left",get:function(){return this.adj("left")}},{key:"right",get:function(){return this.adj("right")}},{key:"up",get:function(){return this.adj("up")}},{key:"down",get:function(){return this.adj("down")}},{key:"value",get:function(){return this.board.rows[this.r][this.c]}},{key:"possibleMove",value:function(){return this.up.insideBoard&&null===this.up.value?"up":this.right.insideBoard&&null===this.right.value?"right":this.down.insideBoard&&null===this.down.value?"down":this.left.insideBoard&&null===this.left.value?"left":null}}]),e}();function N(e,t){return e.sort((function(e,r){var n=t(e),a=t(r);return n<a?-1:n>a?1:0})),e}function V(e){var t=e.value,r=e.minValue,a=e.maxValue,c=e.onChange,o=Object(n.useState)(t),i=Object(s.a)(o,2),u=i[0],l=i[1];return Object(h.jsx)("input",{className:"input",type:"text",value:u,onChange:function(e){l(e.target.value);try{var t=parseInt(e.target.value);t>=r&&t<=a&&c(t)}catch(n){}}})}var B=function(){var e=Object(n.useState)(4),t=Object(s.a)(e,2),r=t[0],a=t[1],c=Object(n.useState)(4),o=Object(s.a)(c,2),i=o[0],u=o[1],l=Object(n.useState)(w(r,i,g(r,i))),d=Object(s.a)(l,2),b=d[0],f=d[1],v=Object(n.useState)(!1),p=Object(s.a)(v,2),x=p[0],k=p[1],S=Object(n.useState)(null),y=Object(s.a)(S,2),C=y[0],E=y[1],P=Object(n.useState)(10),R=Object(s.a)(P,2),N=R[0],B=R[1],U=Object(n.useState)({solvingSpeed:null}),z=Object(s.a)(U,1)[0];function T(){C=O(new M(b,r,i)),E(C)}function F(){var e=C.next();return!e.done&&(f(e.value),!0)}return Object(h.jsxs)("div",{className:"app",children:[Object(h.jsx)("div",{className:"board",children:b.map((function(e,t){return Object(h.jsx)("div",{className:"row",children:e.map((function(e,n){return e?Object(h.jsx)("div",{className:"square",onClick:function(e){!function(e,t,n){var a=function(e,t,r,n,a){return t<a-1&&null===e[t+1][r]?"down":t>0&&null===e[t-1][r]?"up":r<n-1&&null===e[t][r+1]?"right":r>0&&null===e[t][r-1]?"left":null}(b,t,n,r,i);a&&f(j(b,t,n,a)),e.preventDefault(),k(!1),z.solvingSpeed=null,E(null)}(e,t,n)},children:Object(h.jsx)("p",{children:e})},n):Object(h.jsx)("div",{className:"empty"},n)}))},t)}))}),Object(h.jsxs)("div",{className:"buttons",children:[Object(h.jsx)("button",{onClick:function(){f(w(r,i,g(r,i))),k(!1),z.solvingSpeed=null,E(null)},disabled:x,children:"Reset"}),Object(h.jsx)("button",{onClick:function(){f(function(e,t){for(;t>0;)e=m(e),t-=1;return e}(w(r,i,g(r,i)),r*i*1e3)),k(!1),z.solvingSpeed=null,E(null)},disabled:x,children:"Shufle"}),Object(h.jsx)("button",{onClick:function(){C||T(),F()||(k(!1),z.solvingSpeed=null,E(null))},disabled:x,children:"Solve step"}),Object(h.jsx)("button",{onClick:function(){if(x)k(!1),z.solvingSpeed=null,E(null);else{C||T(),setTimeout((function e(){C&&F()||(k(!1),z.solvingSpeed=null,E(null)),z.solvingSpeed&&setTimeout(e,1+100*(10-z.solvingSpeed))}),1),k(!0),z.solvingSpeed=N}},children:x?"Stop":"Solve"})]}),Object(h.jsxs)("div",{className:"buttons",children:["Size:",Object(h.jsx)(V,{value:i,minValue:1,maxValue:30,onChange:function(e){u(e),f(w(r,e,g(r,e)))}}),"X",Object(h.jsx)(V,{value:r,minValue:1,maxValue:30,onChange:function(e){a(e),f(w(e,i,g(e,i)))}}),"Solving speed:",Object(h.jsx)(V,{value:N,minValue:1,maxValue:10,onChange:function(e){B(e),z.solvingSpeed=e}})]}),Object(h.jsx)("div",{className:"buttons",style:{paddingTop:10},children:Object(h.jsx)("a",{href:"https://github.com/stefanomasini/8puzzle",children:"GitHub project"})})]})},U=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,19)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;r(e),n(e),a(e),c(e),o(e)}))};o.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(B,{})}),document.getElementById("root")),U()}},[[18,1,2]]]);
//# sourceMappingURL=main.459e6cd1.chunk.js.map