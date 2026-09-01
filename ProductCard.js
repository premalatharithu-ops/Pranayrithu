 "use client";
import {useCart} from "./CartProvider";

export default function ProductCard({p}) {
  const {add} = useCart();
  return (
    <div className="card">
      <div className="packImg">
        {p.img ? <img src={p.img} alt={p.name} /> : <span className="packEmoji">{p.emoji}</span>}
      </div>
      <div className="meta">⚡ 10–20 mins • {p.brand}</div>
      <div className="name">{p.name}</div>
      <div className="row">
        <span className="price">₹{p.price}</span>
        <button className="add" onClick={() => add(p)}>ADD</button>
      </div>
    </div>
  );
}