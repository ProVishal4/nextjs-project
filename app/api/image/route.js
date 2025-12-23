import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Image from "@/models/Image"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req) {
  try {
    // const session = await authOptions();

    // if (!session) {
    //   return NextResponse.json(
    //     { message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }
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

