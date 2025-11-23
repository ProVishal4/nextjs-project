import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
         title: String,
        description: String,
        slug: String,
        imageAtl:String,
        category: String,
        image:String,
    },
    { timestamps: true }
);

export default mongoose.models.Articals || mongoose.model("Articals", UserSchema);