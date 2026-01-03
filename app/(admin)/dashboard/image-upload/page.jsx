"use client";

import { useState } from "react";
import { storage } from "@/lib/appwrite";
import { ID } from "appwrite";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async () => {
    if (!file) return alert("Select image");

  
    const uploaded = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_IMAGE_ID,
      ID.unique(),
      file
    );

    const url = storage.getFileView(
      process.env.NEXT_PUBLIC_APPWRITE_IMAGE_ID,
      uploaded.$id
    );

    setImageUrl(url);
 
  

    // saving image url in MongoDB
    // await fetch("/api/image", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     fileId: uploaded.$id,
    //     imageUrl: url,
    //   }),
    // });
    await axios.post("/api/image", {
      fileId: uploaded.$id,
      imageUrl: url,
    });
  };
const copyText = async () => {
    const text = document.getElementById("copy-text").innerText;
    await navigator.clipboard.writeText(text);
    alert("Text copied!");
  };
  return (
    <div
      style={{ padding: 20 }}
      className="border border-zinc-400/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg md:h-[75vh] h-[65vh] w-[95%] md:w-[60vw] flex dark:text-zinc-300  text-zinc-600 flex-col gap-3 px-3"
    >
      <div className=" flex justify-between">
        <input
          type="file"
          accept="image/\*"
          className="dark:bg-[#333030] bg-blue-200/20 hover:bg-indigo-400/20 cursor-pointer  hover:dark:bg-zinc-600/20 rounded-lg w-[79%] pl-5 py-3  text-zinc-800 dark:text-zinc-400"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="py-3 px-6 rounded-lg w-[20%]  cursor-pointer  bg-amber-400/70 dark:bg-zinc-100/90 text-black  active:scale-90 hover:bg-amber-600"
          onClick={uploadImage}
        >
          Upload
        </button>
      </div>
      <div
        className="w-full h-15 dark:bg-zinc-700 bg-blue-200/30 rounded-lg px-5 content-center  overflow-x-auto overflow-y-hidden"
        id="copy-text"
      >
        {imageUrl ? imageUrl : "URL is not to Available"}
      </div>
      <button
        className="py-3 px-6 rounded-lg w-[20%]  bg-amber-400/70 dark:bg-zinc-100/90 text-black  active:scale-90 hover:bg-amber-600 mr-auto  cursor-pointer "
        onClick={() => copyText()}
      >
        copy
      </button>

      <div className="border relative rounded-lg overflow-hidden border-zinc-400/30 h-[90%]">
        {imageUrl ? (
          <img src={imageUrl} alt="uploaded" className="w-full h-full" />
        ) : (
          <p className="text-zinc-800/60 dark:text-zinc-400/90 font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            No Image Uploaded
          </p>
        )}
      </div>
    </div>
  );
}
