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
try {
    const { title, description, slug, popular, category, imageAtl, image } = await request.json();
  
   // category may be an Object (e.g. { name: 'Tech' }) or an id string.
    //let categoryId = category;
  
  
  
    const categoryInUse = await Database.distinct("category");
    const categoryies = await categorise
      .find({ _id: { $in: categoryInUse } })
       .lean();
      console.log("category is ",categoryies)
  
    // if (category && typeof category === "object") {
    //   // if object contains _id use it, otherwise try to find by name or create
    //   if (category._id) {
    //     categoryId = category._id;
    //   } else if (category._id) {
    //     let catDoc = await categorise.findOne({ _id: category._id });
    //     if (!catDoc) catDoc = await categorise.create(category);
    //     categoryId = catDoc._id;
    //   } else {
    //     const catDoc = await categorise.create(category);
    //     categoryId = catDoc._id;
    //   }
    // }
  
    // now create the blog document using the category id
    const newData = await Database.create({
      title,
      description,
      slug,
      //category,
      category: categoryInUse,
      imageAtl,
      popular,
      image,
    });
  
  
  
  
    // const newData = await Database.create({ title, description, slug, category, imageAtl, image });
  console.log(newData)
    return Response.json({ succes: "succesfully created article" }, newData);
} catch (error) {
 console.log("error in create blog page:- ",error) 
  request.status(500).send("Failed to create article");
}
}