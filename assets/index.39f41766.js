var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,o=(e,t)=>{for(var a in t||(t={}))n.call(t,a)&&s(e,a,t[a]);if(r)for(var a of r(t))l.call(t,a)&&s(e,a,t[a]);return e},c=(e,r)=>t(e,a(r));import{c as i,u,a as m,R as d,F as p,T as E,b as g,d as h,I as y,L as f,e as v,r as b,M as C,f as x,g as w,h as S,i as I,j as P,k as O,B as V,l as _,m as N,n as j,o as z,p as R,q as k,s as D,t as F,v as H,w as T,x as L,y as U,z as A,S as M,A as B,C as q,D as G,E as J,G as Q,H as X,J as Y,K as W,N as K}from"./vendor.45fea7cc.js";const Z=i("https://sctuwgacucgmlfzywnvm.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjE2MjYxOSwiZXhwIjoxOTQxNzM4NjE5fQ.05_kxuSWS9RdNG_ba1KQIMXIcYXe_sD_eoPqlszQyAQ");function $({isLogin:e}){const t=u();let a=m();Z.auth.session()&&a.push("/home");return d.createElement(p,{height:"100vh",alignItems:"center",justifyContent:"center"},d.createElement(p,{direction:"column",backgroundColor:"gray.100",p:12,rounded:6},d.createElement(E,{mb:6,textAlign:"center",fontWeight:"bold"},e?"Login":"Signup"),d.createElement("form",{onSubmit:async r=>{r.preventDefault();const{email:{value:n},password:{value:l}}=r.target,s={email:n,password:l};if(e){const{error:e}=await Z.auth.signIn(s);e&&t({title:e.message,position:"top",status:"error",isClosable:!0}),a.push("/home")}else{const{error:e}=await Z.auth.signUp(s);e&&t({title:e.message,position:"top",status:"error",isClosable:!0})}}},d.createElement(g,{id:"email",isRequired:!0},d.createElement(h,{fontSize:"85%"},"Email"),d.createElement(y,{borderColor:"blackAlpha.300",mb:6,variant:"filled",placeholder:"Email",type:"email",name:"email"})),d.createElement(g,{id:"Password",isRequired:!0},d.createElement(h,{fontSize:"85%"},"Password"),d.createElement(y,{borderColor:"blackAlpha.300",type:"password",mb:6,variant:"filled",placeholder:"*********",name:"password"})),d.createElement(y,{type:"submit",bgColor:"#1293d2",color:"#fff",value:e?"Login":"Signup"})," "),d.createElement(E,{mt:3},d.createElement(f,{as:v,to:e?"/signup":"/login"},e?"do not have account? Signup here":"Already have account? Login here"))))}const ee={header:!0,dynamicTyping:!0,skipEmptyLines:!0};function te({isOpen:e,onClose:t}){const[a,r]=b.exports.useState([]),[n,l]=b.exports.useState([]),s=()=>{r([]),l([]),t()};return d.createElement(C,{closeOnOverlayClick:!1,isOpen:e,onClose:s,size:"7xl"},d.createElement(x,null),d.createElement(w,null,d.createElement(S,null,"Create your account"),d.createElement(I,null),d.createElement(P,{pb:6},a.length?d.createElement("div",{style:{maxHeight:"90vh",overflow:"scroll"}},d.createElement(j,{size:"sm"},d.createElement(z,null,d.createElement(R,null,n.map(((e,t)=>d.createElement(k,{key:t},e))))),d.createElement(D,null,a.map(((e,t)=>d.createElement(R,{key:t},n.map(((t,a)=>d.createElement(F,{key:a},e[t]))))))))):d.createElement(N,{cssClass:"react-csv-input",label:"Upload CSV",onFileLoaded:(e,t)=>((e,t)=>{r(e),l(Object.keys(e[0]))})(e),parserOptions:ee})),d.createElement(O,null,d.createElement(V,{onClick:async()=>{const e=Z.auth.user(),t=a.map((t=>c(o({},t),{userId:e.id,date:_(new Date(t.date)).unix()})));await Z.from("transactions").insert(t),s()},colorScheme:"blue",mr:3},"Save"),d.createElement(V,{onClick:t},"Cancel"))))}function ae({columns:e,data:t}){const{getTableProps:a,getTableBodyProps:r,headerGroups:n,rows:l,prepareRow:s}=H.exports.useTable({columns:e,data:t},H.exports.useSortBy);return d.createElement(j,o({manualSortBy:!0,variant:"striped",colorScheme:"telegram"},a()),d.createElement(z,null,n.map((e=>d.createElement(R,o({},e.getHeaderGroupProps()),e.headers.map((e=>d.createElement(k,c(o({},e.getHeaderProps(e.getSortByToggleProps())),{isNumeric:e.isNumeric}),e.render("Header"),d.createElement(T.span,{pl:"4"},e.isSorted?e.isSortedDesc?d.createElement(L,{"aria-label":"sorted descending"}):d.createElement(U,{"aria-label":"sorted ascending"}):null)))))))),d.createElement(D,o({},r()),l.map((e=>(s(e),d.createElement(R,o({},e.getRowProps()),e.cells.map((e=>d.createElement(F,c(o({},e.getCellProps()),{isNumeric:e.column.isNumeric}),e.render("Cell"))))))))))}const re=[{Header:"Code",accessor:"scheme_code"},{Header:"Name",accessor:"scheme_name"},{Header:"Units",accessor:"total_units",isNumeric:!0,Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Invested",accessor:"total_amount",isNumeric:!0,sortable:!0,sortMethod:(e,t,a)=>{console.log(e,t)}},{Header:"Nav Date",accessor:"lastDate",isNumeric:!0},{Header:"Current Value",accessor:"todayValue",isNumeric:!0,Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Revenue",accessor:"difference",isNumeric:!0,Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Revenue %",accessor:"revenue%",sortable:!0,sortType:({values:e},{values:t},a,r)=>e.difference/e.total_amount*100>t.difference/t.total_amount*100?1:-1,Cell:({row:{values:{difference:e,total_amount:t}}})=>{const a=e/t*100;return d.createElement(d.Fragment,null,d.createElement(G,{type:e>0?"increase":"decrease"}),a.toFixed(2))}},{Header:"Day Change",accessor:"preValue",sortType:({values:e},{values:t},a,r)=>e.todayValue-e.preValue>t.todayValue-t.preValue?1:-1,Cell:({row:{values:{todayValue:e,preValue:t}}})=>{const a=e-t;return d.createElement(d.Fragment,null,d.createElement(G,{type:a>0?"increase":"decrease"}),a.toFixed(2))}}],ne={totalInvested:"Total Invested",currentValue:"Current Value",totalRealized:"Realized",totalUnRealized:"Un Realized",profitPercentage:"Difference %",totalDayChange:"Day Change",dayChangePercentage:"Day Change %"};function le(){const[e,t]=b.exports.useState([]),[a,r]=b.exports.useState(!1),[n,l]=b.exports.useState({totalInvested:0,currentValue:0,totalDayChange:0,totalRealized:0,totalUnRealized:0,profitPercentage:0,dayChangePercentage:0});return b.exports.useEffect((async()=>{if(0===e.length){const e=Z.auth.user(),{data:a}=await Z.rpc("mf_summary").eq("user_id",e.id),r=await Promise.all(a.map((async e=>{const[t,a]=await(async e=>{var t;const a=await A.get(`https://api.mfapi.in/mf/${e}`);return null==(t=null==a?void 0:a.data)?void 0:t.data.splice(0,2)})(e.scheme_code),r=t.nav*e.total_units,n=r-e.total_amount;return c(o({},e),{nav:t.nav,lastDate:t.date,preNav:a.nav,preValue:a.nav*e.total_units,todayValue:r,difference:n})}))),n=r.reduce(((e,t)=>e+t.total_amount),0),s=r.reduce(((e,t)=>e+t.todayValue),0),i=r.reduce(((e,t)=>e+t.preValue),0),u=r.reduce(((e,t)=>e+t.realised_amount),0),m=s-n-u;t(r),l({totalInvested:n,currentValue:s,totalDayChange:s-i,totalRealized:u,totalUnRealized:m,isProfit:s-n-u>0,profitPercentage:(m/n*100).toFixed(2),dayChangePercentage:((s-i)/i*100).toFixed(2)})}}),[e]),d.createElement(p,{direction:"column",width:"100%",height:"100vh"},d.createElement(V,{onClick:()=>r(!0)},"Upload Transactions"),d.createElement(te,{isOpen:a,onClose:()=>r(!1)}),d.createElement(p,{minHeight:150,alignItems:"center",justifyContent:"space-evenly"},Object.keys(ne).map((e=>d.createElement(p,null,d.createElement(M,null,d.createElement(B,null,ne[e]),d.createElement(q,null,parseFloat(n[e]).toFixed(2))))))),d.createElement(ae,{columns:re,data:e}))}function se(e){const[t,a]=b.exports.useState(Z.auth.session());Z.auth.onAuthStateChange(((e,t)=>{a(t)}));const s=e=>{var a=e,{component:s}=a,i=((e,t)=>{var a={};for(var s in e)n.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&r)for(var s of r(e))t.indexOf(s)<0&&l.call(e,s)&&(a[s]=e[s]);return a})(a,["component"]);return d.createElement(Y,c(o({},i),{render:e=>t?d.createElement("div",null,d.createElement(s,o({},e))):d.createElement(W,{to:"/login"})}))};return d.createElement(J,null,d.createElement(Q,null,d.createElement(X,null,d.createElement(Y,{path:"/",render:()=>t?d.createElement(W,{to:"/home"}):d.createElement(W,{to:"/login"})}),d.createElement(Y,{exact:!0,path:"/login"},d.createElement($,{isLogin:!0})),d.createElement(Y,{exact:!0,path:"/signup"},d.createElement($,{isLogin:!1})),d.createElement(s,{exact:!0,path:"/home",component:le}))))}K.render(d.createElement(d.StrictMode,null,d.createElement(se,null)),document.getElementById("root"));