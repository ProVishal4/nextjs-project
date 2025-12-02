import { connectDB } from "@/lib/mongodb";
import categorise from "@/models/categorise";
import Database from "@/models/database";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()
   
    const artical = await Database.find("category").populate("field");
  return NextResponse.json(artical);
}