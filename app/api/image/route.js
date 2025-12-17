import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Image from "@/models/Image"


export async function POST(req) {
  try {
    connectDB()
      const {filedId, imageUrl} = req.json()
      const image = await Image.create({
          filedId,
          imageUrl
      })
      return NextResponse.json(image, {success: true})
  } catch (error) {
    return NextResponse.json(
        {message: "Error saving image"},
        {status: 500}
    );
  }

}

