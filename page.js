 "use client";
import{useEffect,useState}from"react";

export default function Admin(){
 const [password,setPassword]=useState(""),[authed,setAuthed]=useState(false),[orders,setOrders]=useState([]),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 async function load(){
  const r=await fetch("/api/admin/orders");
  const x=await r.json();
  if(r.ok){setAuthed(true);setOrders(x.orders||[])}else setError(x.error||"Unable to load orders.");
 }
 useEffect(()=>{load()},[]);
 async function login(e){
  e.preventDefault();setError("");
  const r=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
  if(r.ok)load();else setError("Invalid admin password.");
 }
 async function update(id,status,payment_status){
  setLoading(true);setError("");
  const r=await fetch("/api/admin/orders",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status,payment_status})});
  const x=await r.json();
  if(!r.ok)setError(x.error||"Could not update order.");else setOrders(o=>o.map(v=>v.id===id?x.order:v));
  setLoading(false);
 }
 if(!authed)return <div className="container"><h1>Admin Login 🛠️</h1><form className="form" onSubmit={login}><input type="password" placeholder="Admin password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="checkoutButton">Sign in</button>{error&&<div className="errorBox">{error}</div>}</form></div>;
 return <div className="container"><div className="row"><h1>Orders Admin</h1><button className="add" onClick={load}>Refresh</button></div><p>Total orders: {orders.length}</p>{error&&<div className="errorBox">{error}</div>}
 {orders.map(o=><div className="adminCard" key={o.id}>
  <div className="row"><div><b>#{o.order_number}</b><div className="meta">{new Date(o.created_at).toLocaleString()}</div></div><span className="statusPill">{o.status.replaceAll("_"," ")}</span></div>
  <div className="customerBox"><b>{o.customer_name}</b> • {o.customer_phone}<br/>{o.delivery_address}</div>
  {(o.items||[]).map((i,j)=><div className="cartRow" key={j}><span>{i.brand} — {i.name}<br/><small>Qty {i.qty} × ₹{i.price}</small></span><b>₹{i.lineTotal}</b></div>)}
  <div className="totalBox">₹{o.total} • {o.payment_status==="cash_received"?"CASH RECEIVED":"COD PENDING"}</div>
  <div className="adminActions">
   <select value={o.status} disabled={loading} onChange={e=>update(o.id,e.target.value)}><option value="confirmed">Confirmed</option><option value="out_for_delivery">Out for delivery</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select>
   {o.payment_status!=="cash_received"&&o.status!=="cancelled"&&<button className="add" disabled={loading} onClick={()=>update(o.id,o.status,"cash_received")}>Mark cash received</button>}
  </div>
 </div>)}</div>
}