import crypto from "crypto";
const COOKIE="spidey_admin";
function secret(){return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "SpideyStaff2026!";}
export function makeSession(){
 const value=`${Date.now()}.${crypto.randomBytes(24).toString("hex")}`;
 const sig=crypto.createHmac("sha256",secret()).update(value).digest("hex");
 return `${value}.${sig}`;
}
export function validSession(token){
 if(!token)return false;
 const parts=token.split(".");
 if(parts.length<3)return false;
 const value=parts.slice(0,2).join(".");
 const sig=parts[2];
 const expected=crypto.createHmac("sha256",secret()).update(value).digest("hex");
 const a=Buffer.from(sig),b=Buffer.from(expected);
 return a.length===b.length && crypto.timingSafeEqual(a,b);
}
export {COOKIE};