var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r,o=(e,a)=>{for(var t in a||(a={}))n.call(a,t)&&s(e,t,a[t]);if(r)for(var t of r(a))l.call(a,t)&&s(e,t,a[t]);return e},c=(e,r)=>a(e,t(r));import{c as i,u,a as m,R as d,F as p,T as h,b as E,d as f,I as g,L as y,e as v,r as _,f as x,g as C,h as b,i as w,j as D,k as S,l as Y,m as F,n as I,o as P,p as V,q as M,S as H,B as O,s as k,t as N,v as j,w as z,M as R,x as T,y as A,z as L,A as q,C as U,D as $,E as W,G as B,H as G,J as Q,K as J,N as X,O as K,P as Z,Q as ee,U as ae,V as te,W as re,X as ne,Y as le}from"./vendor.8b6a75a1.js";const se=i("https://sctuwgacucgmlfzywnvm.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjE2MjYxOSwiZXhwIjoxOTQxNzM4NjE5fQ.05_kxuSWS9RdNG_ba1KQIMXIcYXe_sD_eoPqlszQyAQ");function oe({isLogin:e}){const a=u();let t=m();se.auth.session()&&t.push("/home");return d.createElement(p,{height:"100vh",alignItems:"center",justifyContent:"center"},d.createElement(p,{direction:"column",backgroundColor:"gray.100",p:12,rounded:6},d.createElement(h,{mb:6,textAlign:"center",fontWeight:"bold"},e?"Login":"Signup"),d.createElement("form",{onSubmit:async r=>{r.preventDefault();const{email:{value:n},password:{value:l}}=r.target,s={email:n,password:l};if(e){const{error:e}=await se.auth.signIn(s);e&&a({title:e.message,position:"top",status:"error",isClosable:!0}),t.push("/home")}else{const{error:e}=await se.auth.signUp(s);e&&a({title:e.message,position:"top",status:"error",isClosable:!0})}}},d.createElement(E,{id:"email",isRequired:!0},d.createElement(f,{fontSize:"85%"},"Email"),d.createElement(g,{borderColor:"blackAlpha.300",mb:6,variant:"filled",placeholder:"Email",type:"email",name:"email"})),d.createElement(E,{id:"Password",isRequired:!0},d.createElement(f,{fontSize:"85%"},"Password"),d.createElement(g,{borderColor:"blackAlpha.300",type:"password",mb:6,variant:"filled",placeholder:"*********",name:"password"})),d.createElement(g,{type:"submit",bgColor:"#1293d2",color:"#fff",value:e?"Login":"Signup"})," "),d.createElement(h,{mt:3},d.createElement(y,{as:v,to:e?"/signup":"/login"},e?"do not have account? Signup here":"Already have account? Login here"))))}function ce({columns:e,data:a}){const{getTableProps:t,getTableBodyProps:r,headerGroups:n,rows:l,prepareRow:s}=_.exports.useTable({columns:e,data:a},_.exports.useSortBy);return d.createElement(x,o({manualSortBy:!0,variant:"striped",colorScheme:"telegram"},t()),d.createElement(C,null,n.map((e=>d.createElement(b,o({},e.getHeaderGroupProps()),e.headers.map((e=>d.createElement(w,c(o({},e.getHeaderProps(e.getSortByToggleProps())),{isNumeric:e.isNumeric}),e.render("Header"),d.createElement(D.span,{pl:"4"},e.isSorted?e.isSortedDesc?d.createElement(S,{"aria-label":"sorted descending"}):d.createElement(Y,{"aria-label":"sorted ascending"}):null)))))))),d.createElement(F,o({},r()),l.map((e=>(s(e),d.createElement(b,o({},e.getRowProps()),e.cells.map((e=>d.createElement(I,c(o({},e.getCellProps()),{isNumeric:e.column.isNumeric}),e.render("Cell"))))))))))}const ie=async e=>{let a=!0;const t={};await Promise.all(e.map((async e=>{const a=await(async e=>{const{data:a,error:t}=await se.from("navHistory").select("*").eq("schemeCode",e).order("date",{ascending:!1}).limit(2);return a})(e);a.length>0&&(t[e]=function(e){return e.map((e=>c(o({},e),{date:P.unix(e.date).format("DD-MM-YYYY")})))}(a))})));const r=P().subtract(1,"days");if([6,7].includes(r.isoWeekday()))return{navValues:t,isAPIData:a};if(r.format("DD-MM-YYYY")===t[e[0]][0].date)return{navValues:t,isAPIData:a};a=!0;const n={method:"GET",url:"https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV",params:{Date:r.format("DD-MMM-YYYY"),SchemeCode:e.join(",")},headers:{"x-rapidapi-host":"latest-mutual-fund-nav.p.rapidapi.com","x-rapidapi-key":"7a8ebddfc2msh30345f773107b49p1768f1jsn25911e4f7501"}},l=(await V.request(n)).data.map((e=>{const a=r.format("DD-MM-YYYY");return{nav:e["Net Asset Value"],date:a,schemeCode:e["Scheme Code"],id:`${e["Scheme Code"]}_${a}`}}));return l.forEach((e=>t[e.schemeCode].unshift(e))),l.length&&await se.from("navHistory").upsert(l.map((e=>{const a=P(e.date,"DD-MM-YYYY").unix();return c(o({},e),{id:`${e.schemeCode}_${a}`,date:P(e.date,"DD-MM-YYYY").unix()})}))),{navValues:t,isAPIData:a}},ue=async()=>{const e=se.auth.user(),{data:a}=await se.rpc("mf_summary").eq("user_id",e.id),{navValues:t,isAPIData:r}=await ie(a.map((e=>e.scheme_code)));console.log({isAPIData:r});const n=await Promise.all(a.map((async e=>{const[a,r]=t[e.scheme_code],n=a.nav*e.total_units,l=n-e.total_amount;return c(o({},e),{nav:a.nav,lastDate:a.date,preNav:r.nav,preValue:r.nav*e.total_units,todayValue:n,difference:l})}))),l=n.reduce(((e,a)=>e+a.total_amount),0),s=n.reduce(((e,a)=>e+a.todayValue),0),i=n.reduce(((e,a)=>e+a.preValue),0),u=n.reduce(((e,a)=>e+a.realised_amount),0),m=s-l-u;return r&&await(async(e,a={})=>{const t=await Promise.all(a.map((async a=>{const t=P(a.lastDate,"DD-MM-YYYY").unix(),{data:r}=await se.from("dayReport").select("*").eq("scheme_code",a.scheme_code).eq("user_id",e.id).lt("date",t).limit(1).order("date",{ascending:!1}),n=r[0]||{};return{id:`${a.scheme_code}_${t}`,date:t,bank_name:a.bank_name,scheme_code:a.scheme_code,scheme_name:a.scheme_name,total_amount:a.total_amount,total_units:a.total_units,nav:a.nav,current_value:a.todayValue,unrealised_amount:a.difference,difference_percentage:(a.difference/a.total_amount*100).toFixed(2),day_change:a.difference-n.unrealised_amount,day_change_percentage:((a.difference-n.unrealised_amount)/n.unrealised_amount*100).toFixed(2),realised_amount:a.realised_amount,user_id:e.id}})));await se.from("dayReport").upsert(t)})(e,n),{summaryData:n,summary:{totalInvested:l.toFixed(2),currentValue:s.toFixed(2),totalDayChange:(s-i).toFixed(2),totalRealized:u.toFixed(2),totalUnRealized:m.toFixed(2),isProfit:s-l-u>0,profitPercentage:`${(m/l*100).toFixed(2)}%`,dayChangePercentage:`${((s-i)/i*100).toFixed(2)}%`}}},me=[{Header:"Code",accessor:"scheme_code"},{Header:"Name",accessor:"scheme_name"},{Header:"Source",accessor:"bank_name"},{Header:"Units",accessor:"total_units",isNumeric:!0,Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Invested",accessor:"total_amount",isNumeric:!0,sortable:!0,sortMethod:(e,a,t)=>{console.log(e,a)}},{Header:"Nav Date",accessor:"lastDate",isNumeric:!0},{Header:"Last Nav Value",accessor:"nav",isNumeric:!0,Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Current Value",accessor:"todayValue",isNumeric:!0,Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Revenue",accessor:"difference",isNumeric:!0,Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Revenue %",accessor:"revenue%",sortable:!0,sortType:({values:e},{values:a},t,r)=>e.difference/e.total_amount*100>a.difference/a.total_amount*100?1:-1,Cell:({row:{values:{difference:e,total_amount:a}}})=>{const t=e/a*100;return d.createElement(d.Fragment,null,d.createElement(z,{type:e>0?"increase":"decrease"}),t.toFixed(2))}},{Header:"Day Change",accessor:"preValue",sortType:({values:e},{values:a},t,r)=>e.todayValue-e.preValue>a.todayValue-a.preValue?1:-1,Cell:({row:{values:{todayValue:e,preValue:a}}})=>{const t=e-a;return d.createElement(d.Fragment,null,d.createElement(z,{type:t>0?"increase":"decrease"}),t.toFixed(2))}}],de={totalInvested:"Total Invested",currentValue:"Current Value",totalRealized:"Realized",totalUnRealized:"Un Realized",profitPercentage:"Difference %",totalDayChange:"Day Change",dayChangePercentage:"Day Change %"};function pe(){const[e,a]=M.exports.useState([]),[t,r]=M.exports.useState({totalInvested:0,currentValue:0,totalDayChange:0,totalRealized:0,totalUnRealized:0,profitPercentage:0,dayChangePercentage:0});return M.exports.useEffect((async()=>{const{summaryData:e,summary:t}=await ue();a(e),r(t)}),[]),d.createElement(p,{direction:"column",width:"100%",height:"100vh"},d.createElement(H,{minChildWidth:"120px",spacing:"40px",padding:"40px"},Object.keys(de).map((e=>d.createElement(O,null,d.createElement(k,null,d.createElement(N,null,de[e]),d.createElement(j,null,t[e])))))),d.createElement(ce,{columns:me,data:e}))}const he={header:!0,dynamicTyping:!0,skipEmptyLines:!0};function Ee({isOpen:e,onClose:a}){const[t,r]=M.exports.useState([]),[n,l]=M.exports.useState([]),s=()=>{r([]),l([]),a()};return d.createElement(R,{closeOnOverlayClick:!1,isOpen:e,onClose:s,size:"7xl"},d.createElement(T,null),d.createElement(A,null,d.createElement(L,null,"Create your account"),d.createElement(q,null),d.createElement(U,{pb:6},t.length?d.createElement("div",{style:{maxHeight:"90vh",overflow:"scroll"}},d.createElement(x,{size:"sm"},d.createElement(C,null,d.createElement(b,null,n.map(((e,a)=>d.createElement(w,{key:a},e))))),d.createElement(F,null,t.map(((e,a)=>d.createElement(b,{key:a},n.map(((a,t)=>d.createElement(I,{key:t},e[a]))))))))):d.createElement(B,{cssClass:"react-csv-input",label:"Upload CSV",onFileLoaded:(e,a)=>((e,a)=>{r(e),l(Object.keys(e[0]))})(e),parserOptions:he})),d.createElement($,null,d.createElement(W,{onClick:async()=>{await(async(e=[])=>{const a=se.auth.user(),t=e.map((e=>c(o({},e),{userId:a.id,date:P(e.date,"DD-MM-YYYY").unix()}))),{data:r,error:n}=await se.from("transactions").insert(t);return r})(t),s()},colorScheme:"blue",mr:3},"Save"),d.createElement(W,{onClick:s},"Cancel"))))}function fe(){const[e,a]=M.exports.useState(!1),t=[{icon:X,action:()=>a(!0),toolTip:"Upload Transactions"},{icon:K,action:()=>{se.auth.signOut()},toolTip:"Logout"}];return d.createElement("div",null,d.createElement(Ee,{isOpen:e,onClose:()=>a(!1)}),d.createElement(p,{bgColor:"telegram.400",height:"50px",alignItems:"center",color:"#FFF",fontSize:"1em",fontWeight:"bold",padding:"5px",justifyItems:"flex-start",justifyContent:"space-between"},d.createElement(p,null,d.createElement("div",null,d.createElement(y,{as:v,to:"/home"},"Home")),d.createElement("div",{style:{marginLeft:"25px"}},d.createElement(y,{as:v,to:"/dashboard"},"Dashboard"))),d.createElement(G,{fontSize:"1.75em",divider:d.createElement(Q,null),spacing:"24px"},t.map(((e,a)=>d.createElement(J,{as:e.icon,onClick:e.action}))))))}const ge=[{Header:"Month",accessor:"month"},{Header:"Invested",accessor:"total_amount",Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Last Month close",Cell:({row:{values:{current_value:e,total_change:a}}})=>(e-a).toFixed(2)},{Header:"Current Value",accessor:"current_value",Cell:({value:e})=>parseFloat(e).toFixed(2)},{Header:"Earned",accessor:"total_change",Cell:({value:e})=>d.createElement(d.Fragment,null,d.createElement(z,{type:e>0?"increase":"decrease"}),e.toFixed(2))}];function ye(){const[e,a]=d.useState([]),[t,r]=d.useState(null),[n,l]=d.useState([]),[s,o]=d.useState("all"),c=async e=>{if(!t)return;if("all"===e){const{data:e,error:r}=await se.rpc("monthly_summary").eq("user_id",t.id);return void a(e)}const{data:r,error:n}=await se.rpc("monthly_summary",{scheme_code:e}).eq("user_id",t.id);a(r)};return M.exports.useEffect((async()=>{const e=se.auth.user();if(r(e),!t)return;const{data:a,error:n}=await se.rpc("mf_summary").eq("user_id",t.id);l(a),c("all")}),[t]),d.createElement("div",{style:{width:"50vw"}},d.createElement(Z,{placeholder:"Select option",value:s,onChange:e=>{o(e.target.value),c(e.target.value)}},d.createElement("option",{key:"all",value:"all"},"all"),n.map((e=>d.createElement("option",{key:e.scheme_code,value:e.scheme_code},e.scheme_name)))),d.createElement(ce,{columns:ge,data:e||[]}))}function ve(e){const[a,t]=M.exports.useState(se.auth.session());se.auth.onAuthStateChange(((e,a)=>{t(a)}));const s=e=>{var t=e,{component:s}=t,i=((e,a)=>{var t={};for(var s in e)n.call(e,s)&&a.indexOf(s)<0&&(t[s]=e[s]);if(null!=e&&r)for(var s of r(e))a.indexOf(s)<0&&l.call(e,s)&&(t[s]=e[s]);return t})(t,["component"]);return d.createElement("div",null,d.createElement(fe,null),d.createElement(re,c(o({},i),{render:e=>a?d.createElement("div",null,d.createElement(s,o({},e))):d.createElement(ne,{to:"/login"})})))};return d.createElement(ee,null,d.createElement(ae,null,d.createElement(te,null,d.createElement(re,{exact:!0,path:"/",render:()=>a?d.createElement(ne,{to:"/home"}):d.createElement(ne,{to:"/login"})}),d.createElement(re,{exact:!0,path:"/login"},d.createElement(oe,{isLogin:!0})),d.createElement(re,{exact:!0,path:"/signup"},d.createElement(oe,{isLogin:!1})),d.createElement(s,{exact:!0,path:"/home",component:pe}),d.createElement(s,{exact:!0,path:"/dashboard",component:ye}))))}le.render(d.createElement(d.StrictMode,null,d.createElement(ve,null)),document.getElementById("root"));