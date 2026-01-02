// import { connectDB } from "@/lib/mongodb";
// import database from "@/models/database";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const q = (searchParams.get("search") || "").toLowerCase();

//   // fetch only title and slug (use lean() if using Mongoose)
//   const docs = await database
//     .find({}, { title: 1, slug: 1, _id: 0 })
//     .lean()
//     .limit(5);

//   // return objects with title and slug and filter by title or slug
//   const filtered = docs.filter(
//     ({ title = "", slug = "" }) =>
//       title.toLowerCase().includes(q) || slug.toLowerCase().includes(q)
//   );

//   return NextResponse.json(filtered);
// }


// this page api/search/route.jsx diplay  search resultes card format
// import { connectDB } from "@/lib/mongodb";
// import database from "@/models/database";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const search = searchParams.get("search") || "not working!";

//   const data = await database.find({title: search})
//   console.log(data)

//   //const data = (await database.find().limit(10)).map(({ title }) => title);
//   //console.log("Items from database:", data);
//   // return NextResponse.json(artical)

//   // const filtered = data.filter((item) =>
//   //   item.toLowerCase().includes(search.toLowerCase())
//   // );

//   return NextResponse.json({results: data});
// }

// import { connectDB } from "@/lib/mongodb";
// import database from "@/models/database";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const search = searchParams.get("search") || "not working!";
// // const data = (await database.find().limit(10)).map(({ title }) => title);
//   const docs = await database
//     .find({}, { title: 1, slug: 1, _id: 0 })
//     .lean()
//     .limit(5);
// //const data = await database.find({ title: search });
//   // const filtered = data.filter((item) =>
//   //   item.toLowerCase().includes(search.toLowerCase())
//   // );
// const filtered = docs.filter(
//   ({ title = "", slug = "" }) =>
//     title.toLowerCase().includes(q) || slug.toLowerCase().includes(q)
// );

//   return NextResponse.json(filtered);
// }

import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const search = searchParams.get("search") || "not working!";
//   const data = (await database.find().limit(10)).map(({ title }) => title);
//   //console.log("Items from database:", data);
//   // return NextResponse.json(artical)

//   const filtered = data.filter((item) =>
//     item.toLowerCase().includes(search.toLowerCase())
//   );

//   return NextResponse.json(filtered);
// }


//  search results showing card format
export async function GET(req) {
  await connectDB();
   const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "not working!";
  //const query = request.query.article || "error-form-search"; // e.g. ?q=iphone
  try {
    const result = await database
      .find({
        title: { $regex: search, $options: "i" }, // case-insensitive search
      })
      .limit(6)
      .select("title slug description imageUrl");
  return  Response.json(result); // send JSON to frontend
  } catch (err) {
    Response.status(500).json({ error: "Server error" });
    console.log(err);
  }
}