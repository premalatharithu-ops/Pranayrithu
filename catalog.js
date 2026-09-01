export const catalog = [
{id:1,brand:"Lay's",name:"Classic Salted",price:5,stock:20},
{id:2,brand:"Lay's",name:"India's Magic Masala",price:5,stock:20},
{id:3,brand:"Lay's",name:"Spanish Tomato Tango",price:5,stock:20},
{id:4,brand:"Lay's",name:"Cream & Onion",price:5,stock:20},
{id:5,brand:"Lay's",name:"Chile Limon",price:5,stock:20},
{id:6,brand:"Bingo!",name:"Mad Angles Achaari Masti",price:5,stock:20},
{id:7,brand:"Bingo!",name:"Mad Angles Tomato Madness",price:5,stock:20},
{id:8,brand:"Bingo!",name:"Tedhe Medhe Masala Tadka",price:5,stock:20},
{id:9,brand:"Bingo!",name:"Tedhe Medhe Chatpata Twist",price:5,stock:20},
{id:10,brand:"Bingo!",name:"Nachos Cheese",price:5,stock:20},
{id:11,brand:"Lay's",name:"West Indies Hot n Sweet Chilli",price:5,stock:20,img:"/lays-west-indies-hot-sweet-chilli.jpeg"}
];
export function priceCart(items){
 if(!Array.isArray(items)||!items.length)throw new Error("Cart is empty.");
 const normalized=items.map(({id,qty})=>{
  const p=catalog.find(x=>x.id===Number(id)),q=Number(qty);
  if(!p||!Number.isInteger(q)||q<1||q>p.stock)throw new Error(p?`${p.name} is sold out or has insufficient stock.`:"Invalid cart item.");
  return {...p,qty:q,lineTotal:p.price*q};
 });
 return {items:normalized,total:normalized.reduce((s,i)=>s+i.lineTotal,0)};
}