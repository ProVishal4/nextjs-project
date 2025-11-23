import { connectDB } from "@/lib/mongodb";
import Database from "@/models/database";

export async function GET() {
  await connectDB();
  const artical = await Database.find();
  return Response.json(artical);
}

export async function POST(request) {
  await connectDB();
  const { title, description, slug, category, imageAtl, image } = await request.json();

  const newData = await Database.create({ title, description, slug, category, imageAtl, image });

  return Response.json(newData);
}