import { connectDB } from "@/lib/mongodb";
import Database from "@/models/database";

export async function PUT(request, { params }) {
    await connectDB();
    const { title, description, slug, category, popular, imageAtl , image} = await request.json();

    const updatedDatabase = await Database.findByIdAndUpdate(
        params.id,
        { title, description, slug, category, popular, imageAtl, image },
        { new: true }
    );

    return Response.json({ message: "Query Updated succesfully!" },updatedDatabase);
}

export async function DELETE(request, { params }) {
    await connectDB();
    await Database.findByIdAndDelete(params.id);
    return Response.json({ message: "Query deleted succesfully!" });
}