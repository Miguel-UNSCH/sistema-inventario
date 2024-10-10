import { NextResponse } from "next/server";
import db from "@/lib/db"

export async function GET() {
  return NextResponse.json({message: 'OK'});
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);
  } catch (error) {
    NextResponse.json({message: error})
  }
}
