import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        slug: String,
        imageAtl: String,
        popular:Boolean,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        },
        image: String,
        metaContent: String
    },
    { timestamps: true }
);

export default mongoose.models.Articals || mongoose.model("Articals", UserSchema);