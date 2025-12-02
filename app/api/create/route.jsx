import { NextResponse } from "next/server";
import database from "@/models/database"; 
import categoryModels from "@/models/categorise";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
     title,
      description,
      slug,
      category,
      imageAtl,
      popular,
      image,
    } = body;

    await database.create({
      title,
      description,
      slug,
      category,
      imageAtl,
      popular,
      image,
    });

    const categoryInUse = await database.distinct("category");

    const categories = await categoryModels
      .find({ _id: { $in: categoryInUse } })
      .lean();

    return NextResponse.json({
      message: "article successfully created",
      categories,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
