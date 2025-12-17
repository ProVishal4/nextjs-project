Great question 👍
Uploading images inside a form using axios is very common, and I’ll show you a clean, working setup that fits Next.js App Router + Appwrite + MongoDB, JavaScript only, pnpm, no TypeScript.

---

✅ Correct Way: Form → Axios → API Route → Appwrite

> Do NOT upload directly to Appwrite from the form
> Send the form to your API route, then upload securely

---

1️⃣ Install axios

pnpm add axios

---

2️⃣ Client Form (Image + Text)

app/upload/page.jsx

```jsx
"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    await axios.post("/api/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Uploaded");
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {preview && <img src={preview} width={200} />}

      <button type="submit">Submit</button>
    </form>
  );
}




3️⃣ API Route – Upload to Appwrite (Secure)

app/api/image/upload/route.js

import { NextResponse } from "next/server";
import { storage } from "@/lib/appwrite-server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { ID, InputFile } from "appwrite";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image");
    const title = formData.get("title");

    if (!file) {
      return NextResponse.json({ message: "No file" }, { status: 400 });
    }

    // Convert file for Appwrite
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      ID.unique(),
      InputFile.fromBuffer(buffer, file.name)
    );

    const imageUrl = storage.getFileView(
      process.env.APPWRITE_BUCKET_ID,
      uploaded.$id
    );

    const image = await Image.create({
      title,
      fileId: uploaded.$id,
      imageUrl,
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}




// 4️⃣ MongoDB Model

// models/Image.js

import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    title: String,
    fileId: String,
    imageUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema);

```

---

5️⃣ Required Env Variables

.env.local

# Client safe

NEXT_PUBLIC_APPWRITE_PROJECT_ID=xxxx
NEXT_PUBLIC_APPWRITE_BUCKET_ID=images

# Server only

APPWRITE_PROJECT_ID=xxxx
APPWRITE_BUCKET_ID=images
APPWRITE_API_KEY=your_api_key
MONGODB_URI=your_mongodb_uri

Restart server:

pnpm dev

---

6️⃣ Why axios + FormData Works Best

Reason Explanation

File stays binary No base64
Large files safe Yes
Works with forms Yes
Server secure Yes

---

7️⃣ Common Mistakes (Avoid)

❌ Sending JSON instead of FormData
❌ Forgetting multipart/form-data
❌ Using client Appwrite API key
❌ Using projectId instead of bucketId

---

8️⃣ Flow Summary

Form Submit
↓
Axios (FormData)
↓
Next.js API Route
↓
Appwrite Storage
↓
MongoDB Save

---

If you want next:

Update image using form

Delete image using axios

Upload progress bar

Validation (file size / type)

Just tell me 👍
AI prompt:- 
```html
how to save image url and fileId in "form" status variable. I have many inputs I've only shown this
status -
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

const [form, setForm] = useState({
    title: "",
    description: "",
      fileId: "",
    imageUrl: "",
})
hadleSubmit -
   const hedleSubmit = async (e) => {
    e.preventDefault();
     await axios.post("/api/blog", form);
   }
catching all input name = value:- 
const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

input:-
<form  onSubmit={hedleSubmit}>
                <input
                    type="text"
                    name="title"             
                    value={form.title}
                    onChange={handleChange}
                  />
                       <input
                      type="file"
                     accept="image/*"
                     onChange={handleChange);
        }}
      />

      {imageUrl && <img src={imageUrl} className="w-15 h-10" />}
                  <button>submit</button>
                  </form>
```


============================================================================================================================================================================================================================================================




---
You’re very close 👍
The issue is conceptual, not Axios or Appwrite.

👉 File inputs do NOT work like text inputs
👉 You must NOT use the same handleChange for file input

Let’s fix this cleanly.


---

❌ What’s wrong in your code

<input type="file" onChange={handleChange} />

❌ e.target.value for file = fake path
❌ No access to fileId / imageUrl
❌ File must be uploaded first


---

✅ Correct Pattern (Industry Standard)

2-step process:

1. Upload image


2. Save fileId + imageUrl inside form state




---
```jsx

✅ Final Correct Setup

State

const [file, setFile] = useState(null);

const [form, setForm] = useState({
  title: "",
  description: "",
  fileId: "",
  imageUrl: "",
});


---

Text Inputs (unchanged)

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};


---

File Input (SEPARATE HANDLER)

const handleFileChange = async (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  setFile(selectedFile);

  // upload image immediately
  const formData = new FormData();
  formData.append("image", selectedFile);

  const res = await axios.post("/api/image/upload", formData);

  // save response into form state
  setForm((prev) => ({
    ...prev,
    fileId: res.data.fileId,
    imageUrl: res.data.imageUrl,
  }));
};


---

File Input (Correct)

<input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
/>


---

Preview Image

{form.imageUrl && (
  <img src={form.imageUrl} className="w-15 h-10" />
)}


---

Submit Form (Final)

const hedleSubmit = async (e) => {
  e.preventDefault();

  await axios.post("/api/blog", form);
};


---

🧠 Why this works

Image is uploaded before form submit

fileId & imageUrl are inside form state

Blog API receives clean JSON

No multipart parsing needed in /api/blog



---

🔁 Data Flow (Understand This)

Select Image
  ↓
Upload to Appwrite
  ↓
Get fileId + imageUrl
  ↓
Save into form state
  ↓
Submit full form


---

🚫 Common Mistakes to Avoid

❌ handleChange for file input
❌ Sending File object inside JSON
❌ Uploading image inside blog API
❌ Using value on file input


---

✅ Final Summary

Thing	Correct

File input handler	Separate
Upload image	Immediately
Save image data	Inside form
Submit blog	JSON only



---

If you want next:

Update image inside same form

Delete image on form reset

Upload progress bar

Validation (size/type)


Just tell me 👍


