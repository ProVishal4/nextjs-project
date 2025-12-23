import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true },
        password: { type: String, unique: true, required: true }
    },
    { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", UserSchema);