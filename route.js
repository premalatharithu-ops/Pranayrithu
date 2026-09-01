import { NextResponse } from "next/server";
import { makeSession, COOKIE } from "../../../../lib/adminAuth";

export async function POST(req){
  const {password}=await req.json();
  const configuredPassword=process.env.ADMIN_PASSWORD || "SpideyStaff2026!";
  if(password!==configuredPassword)
    return NextResponse.json({error:"Invalid password"},{status:401});
  const res=NextResponse.json({ok:true});
  res.cookies.set(COOKIE,makeSession(),{httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:60*60*12});
  return res;
}