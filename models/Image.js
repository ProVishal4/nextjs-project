import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        fileId: String,
        imageUrl: String,
      
    },
    { timestamps: true }
);

 export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
// ✅ SAFE MODEL EXPORT
// const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

// export default Image;