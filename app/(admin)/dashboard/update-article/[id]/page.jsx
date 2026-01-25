export const dynamic = "force-dynamic";
import React from "react";
import UpdateArticle from "../UpdateArticle";
import database from "@/models/database";
import { connectDB } from "@/lib/mongodb";
export default async function page({ params }) {
  connectDB();
  const { id } = await params;
  // findOne({_id: id})
  const 
  rawArticle = await database.findById(id).lean();
  if (!rawArticle) {
    notFound();
  }
const article = JSON.parse(JSON.stringify(rawArticle));
//return <ClientComponent article={sanitizedArticle} />;

  console.log("server comp obj is - ", article)
  //console.log(id)
  return (
    <>
      <UpdateArticle article={article} />
    </>
  );
}
