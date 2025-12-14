import { connectDB } from "@/lib/mongodb";
import Database from "@/models/database";

export async function PUT(request, { params }) {
    await connectDB();
    const { title, description, metaContent, slug, category, popular, imageAtl , image} = await request.json();

    const updatedDatabase = await Database.findByIdAndUpdate(
        params.id,
        { title, description, slug, metaContent, category, popular, imageAtl, image },
        { new: true }
    );

    return Response.json({ message: "Query Updated succesfully!" },updatedDatabase);
}



export async function DELETE(request, context) {
    await connectDB();
    const {id} = await context.params
    await Database.findByIdAndDelete(id);
    return Response.json({ message: "Query deleted succesfully!" });
}