import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        field: String,
        popular: Boolean,
        rendom:Boolean,
    },
    { timestamps: true }
);

export default mongoose.models.category || mongoose.model("category", CategorySchema);