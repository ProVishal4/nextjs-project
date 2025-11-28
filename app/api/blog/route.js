import { connectDB } from "@/lib/mongodb";
import categorise from "@/models/categorise";
import Database from "@/models/database";

export async function GET() {
  await connectDB();
  const artical = await Database.find();
  return Response.json(artical);
}

export async function POST(request) {
  await connectDB();
  const { title, description, slug, popular, category, imageAtl, image } = await request.json();

  // category may be an Object (e.g. { name: 'Tech' }) or an id string.
  let categoryId = category;

  if (category && typeof category === "object") {
    // if object contains _id use it, otherwise try to find by name or create
    if (category._id) {
      categoryId = category._id;
    } else if (category.name) {
      let catDoc = await categorise.findOne({ field: category.name });
      if (!catDoc) catDoc = await categorise.create(category);
      categoryId = catDoc._id;
    } else {
      const catDoc = await categorise.create(category);
      categoryId = catDoc._id;
    }
  }

  // now create the blog document using the category id
  const newData = await Database.create({
    title,
    description,
    slug,
    category: categoryId,
    imageAtl,
    popular,
    image,
  });




  // const newData = await Database.create({ title, description, slug, category, imageAtl, image });
console.log(newData)
  return Response.json({ succes: "succesfully created article" }, newData);
}