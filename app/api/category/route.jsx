import { connectDB } from "@/lib/mongodb";
import categorise from "@/models/categorise";


export async function GET() {
  await connectDB();
  const field = await categorise.find();
  return Response.json(field);
}

export async function POST(request) {
  await connectDB();
  const {
    field,
    popular,
    rendom
  } = await request.json();

  const categoryData = await categorise.create({ field, popular, rendom });

  return Response.json({succes:"succesfully created category"},categoryData);
}