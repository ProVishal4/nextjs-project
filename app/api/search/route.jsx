import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "not working!";
  const data = (await database.find()).map(({ title }) => title);
  //console.log("Items from database:", data);
  // return NextResponse.json(artical)

  const filtered = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return NextResponse.json(filtered);
}
