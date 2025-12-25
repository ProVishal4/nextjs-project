import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        slug: String,
        imageAtl: String,
        metaDescription: String,
        tags: String,
        popular: Boolean,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        },
        imageUrl: String,

    },
    { timestamps: true }
);

export default mongoose.models.articals || mongoose.model("articals", articleSchema);