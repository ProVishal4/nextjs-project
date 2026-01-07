import { connectDB } from "@/lib/mongodb";

import Database from "@/models/database";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB(); 
    const articles = await Database.find().select("slug _id imageUrl imageAtl");
  return NextResponse.json(articles);
}