import { connectDB } from "@/lib/mongodb";
import Database from "@/models/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB(); 
  const article = await Database.find()
    .limit(5)
    .sort({ createdAt: -1 })
    .select("title _id imageUrl imageAlt popular");
  return Response.json(article);
}

