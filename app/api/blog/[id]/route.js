import { connectDB } from "@/lib/mongodb";
import Database from "@/models/database";

export async function PUT(request, { params }) {
    await connectDB();
    const {id} = await params
    const { title, description, metaDescription, tags, slug, category, popular, imageAtl, fileId, imageUrl } = await request.json();
  
    const updatedDatabase = await Database.findByIdAndUpdate(
        id,
        { title, description, metaDescription, tags, slug, category, popular, imageAtl, fileId, imageUrl },
        { new: true }
    );

    return Response.json({ message: "Query Updated succesfully!" },updatedDatabase);
}



export async function DELETE(request, context) {
    await connectDB();
    const {id} = await context.params;
    await Database.findByIdAndDelete(id);
    return Response.json({ message: "Query deleted succesfully!" });
}