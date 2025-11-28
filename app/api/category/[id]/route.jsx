import { connectDB } from "@/lib/mongodb";
import categorise from "@/models/categorise";

export async function PUT(request, { params }) {
  await connectDB();
  const { field, popular, rendom } = await request.json();

  const updatedCategory = await  categorise.findByIdAndUpdate(
    params.id,
    { field, popular, rendom },
    { new: true }
  );

  return Response.json(
    { message: "Category Query Updated succesfully!" },
    updatedCategory
  );
}

export async function DELETE(request, { params }) {
  await connectDB();
  await categorise.findByIdAndDelete(params.id);
  return Response.json({ message: "Category Query deleted succesfully!" });
}
