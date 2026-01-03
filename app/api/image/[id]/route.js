
import { NextResponse } from "next/server";
import { storage } from "@/lib/appwrite";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const image = await Image.findById(params.id);
        if (!image) {
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        // Delete from Appwrite
        await storage.deleteFile(
            process.env.APPWRITE_BUCKET_ID,
            image.fileId
        );

        // Delete from MongoDB
        await Image.findByIdAndDelete(params.id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { message: "Delete failed" },
            { status: 500 }
        );
    }
}