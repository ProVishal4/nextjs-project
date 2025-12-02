import { connectDB } from "@/lib/mongodb";
import categoriseModels from "@/models/categorise";
import Database from "@/models/database";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const artical = await Database.find();
  return NextResponse.json(artical);
}

export async function POST(request) {
  await connectDB();
  try {
    const { title, description, slug, popular, category, imageAtl, image } = await request.json();
    
    
    // for each article, if category has _id, move it into 'field' (if missing) and remove _id
    artical = artical.map(a => {
      if (a.category && a.category._id) {
      a.category.field = a.category.field ?? String(a.category._id);
      delete a.category._id;
      }
      return a;
    });
   
    let categoryId = null;
   
    if (category) {
      if (typeof category === "string") {
        // provided directly as id
        categoryId = category;
      } else if (typeof category === "object") {
        if (category._id) {
          // object already contains _id
          categoryId = category._id;
        } else if (category.field) {
          // try to find by name first, otherwise create
          let catDoc = await categoriseModels.findOne({ field: category.field });
          if (!catDoc) catDoc = await categoriseModels.create(category);
          categoryId = catDoc._id;
        } else {
          // no identifying info, create a new category
          const catDoc = await categoriseModels.create(category);
          categoryId = catDoc._id;
        }
      }
    }

    // create the blog document using the resolved category id
    const newData = await Database.create({
      title,
      description,
      slug,
      category: categoryId,
      imageAtl,
      popular,
      image,
    });

    console.log(newData);
    return NextResponse.json({ success: "successfully created article", data: newData }, { status: 201 });
  } catch (error) {
    console.error("error in create blog page:- ", error);
    return NextResponse.json({ error: "Failed to create article", details: error.message }, { status: 500 });
  }
}