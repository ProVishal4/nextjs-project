"use client";
import { categoryStore } from "@/store/categoryStore";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

export default function page({ id }) {
  const { category, fetchCategory } = categoryStore();
  const [dwonMenu, setDwonMenu] = useState(true);
  const [imgSection, setImgSection] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    imageAtl: "",
    imageUrl: "",
    metaDescription: "",
    tags: "",
    popular: false,
  });

  const arrowUp = "/icons/arrowup.png";
  const arrowDown = "/icons/arrow-down.png";

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/blog/${id}`, {
          cache: "no-store",
        })
        .then((res) => setForm(res.data))
        .catch((err) => console.log(err));
    }
    fetchCategory();
  }, [id]);

  const change = () => {
    setDwonMenu(!dwonMenu);
  };
  const imgHendel = () => {
    setImgSection(!imgSection);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };
  console.log("form data is ", form);

  const hedleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted", e);
    if (id) {
      await axios.put(`/api/blog/${id}`, form);
    } else {
      await axios.post("/api/blog", form);
    }

    setForm({
      title: "",
      description: "",
      slug: "",
      category: "",
      imageAtl: "",
      imageUrl: "",
      metaDescription: "",
      tags: "",
      popular: false,
    });
  };
  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello Tiptap!</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Every time user types → update blog field
      setForm((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  console.log(form);

  if (!editor) return null;

  return (
    <div>
      {/* <h1 className="text-2xl font-semibold w-full mb-1">Add New Article</h1> */}
      <div className="relative md:h-[80vh]   md:mt-8 w-[95%] m-auto  bg-[linear-gradient(45deg,#e8f5f6,#f9decc)] dark:bg-[linear-gradient(220deg,#100358,#302F2F)] dark:bg-[#201d1d] border-[0.5px] border-[#dbdbdb] dark:border-[#312f2f] rounded-2xl">
        <div className="w-[98%] m-auto ">
          {/*     action="/admin/add-article" enctype="multipart/form-data"
            method="post" */}
          <form
            className="content  w-[100%] md:flex text-gray-500 dark:text-white/80 dark:bg-transparent"
            onSubmit={hedleSubmit}
          >
            {/* left side content  */}
            <div className="leftSideContent overflow-y-auto overflow-x-hidden dark:bg-[linear-gradient(0deg,gray,black)] bg-[linear-gradient(0deg,#ffebcc,#fbf6fd)] md:h-[78vh] mt-[1vh] rounded-2xl pt-1   md:w-[24.8%]">
              <h3 className="bg-[#faecf4] dark:bg-[#201414] text-md ml-[5%] rounded-2xl h-[3rem] pt-3 w-[90%] text-center items-center mt-3 font-medium">
                Add new article
              </h3>

              <div className="mt-3 flex flex-col ">
                <label htmlFor="article_title" className=" ml-4 w-full">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="article_title"
                  className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] "
                  placeholder="Title for article"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <label htmlFor="article_category" className="pl-3">
                  Category
                </label>
                <select
                  className="py-1  outline-[#dbdbdb] dark:bg-[#353434]    h-10 pl-3 w-[90%] mx-auto  rounded-4xl bg-[#ebe3e3] ] "
                  name="category"
                  id="article_category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option
                    selected
                    disabled
                    className=" h-10 pl-3 w-[90%] mx-auto  bg-[#ebe3e3] dark:bg-[#201414] "
                  >
                    ---Selact---
                  </option>
                  {category.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                      className=" h-10 pl-3 w-[90%] mx-auto  bg-[#ebe3e3] dark:bg-[#201414] "
                    >
                      {item.field}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className=" font-medium bg-[#ebe3e3] dark:bg-[#201414] rounded-3xl w-[90%] mx-auto py-2 mt-2 active:bg-[#0b3f53] active:scale-90 flex gap-2 transition ease-in justify-center items-center"
                onClick={() => change()}
              >
                <h2 className="w-[70%] ">SEO Section</h2>
                <img
                  src={`${dwonMenu ? arrowDown : arrowUp}`}
                  alt="arrow key"
                  className="h-5 w-4 dark:invert"
                />
              </div>
              {/* border border-red-700  ref={imgSrc} "/icons/arrow-down.png"*/}
              <div className={` ${dwonMenu ? "hidden" : "block"}`}>
                <div className="slugName mt-3 flex flex-col ">
                  <label htmlFor="slugname" className=" pl-3 w-full">
                    SEO slug Keywords
                  </label>
                  <input
                    type="text"
                    name="slug"
                    id="slugname"
                    className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                    placeholder="SEO for Routes"
                    value={form.slug}
                    onChange={handleChange}
                  />
                </div>
                <div className="tags mt-3 flex flex-col ">
                  <label htmlFor="tags" className=" pl-3 w-full">
                    Keywords Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb]"
                    placeholder="Keyword tags "
                    value={form.tags}
                    onChange={handleChange}
                  />
                </div>
                <div className="metaDescription mt-3 flex flex-col ">
                  <label htmlFor="meta_description" className="pl-3 w-full">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    name="metaDescription"
                    id="meta_description"
                    className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb]"
                    placeholder="Meta Description"
                    value={form.metaDescription}
                    onChange={handleChange}
                  />
                </div>

                <div className="imageAtl mt-3 flex flex-col ">
                  <label htmlFor="imageAtl_desc" className=" pl-3 w-full">
                    Image Name
                  </label>
                  <input
                    type="text"
                    name="imageAtl"
                    id="imageAtl_desc"
                    className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                    value={form.imageAtl}
                    onChange={handleChange}
                    placeholder="Image Name for SEO"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="popular"
                  name="popular"
                  checked={form.popular}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="popular"
                  className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Mark as Popular
                </label>
              </div>

              <div
                className=" font-medium bg-[#ebe3e3] dark:bg-[#201414] rounded-3xl w-[90%] mx-auto py-2 mt-2 active:bg-[#0b3f53] active:scale-90 flex gap-2 transition ease-in justify-center items-center"
                onClick={() => imgHendel()}
              >
                <h2 className="w-[70%] ">image Section</h2>
                <img
                  src={`${imgSection ? arrowDown : arrowUp}`}
                  alt="arrow key"
                  className="h-5 w-4 dark:invert"
                />
              </div>
              <div className={` ${imgSection ? "hidden" : "block"}`}>
                <div className="mt-3 flex flex-col">
                  <label htmlFor="article_image" className="pl-3">
                    Upload Image
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    id="article_image"
                    className="outline-[#dbdbdb]  h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                    onChange={handleChange}
                    placeholder="Enter Image URL "
                  />
                  <div className="mx-auto border rounded-lg overflow-hidden border-lime-500 mt-3 h-40 w-[90%] lg:h-40">
                    <img
                      src={`${form.imageUrl}` || "/card1.jpeg"}
                      alt="uploaded"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                {/* <div className="mt-3 flex flex-col">
                  <label htmlFor="article_image_webp" className="pl-3">
                    Uplaod webP image
                  </label>
                  <input
                    type="file"
                    name="imageWebp"
                    id="article_image_webp"
                    className="outline-[#dbdbdb] pt-2 h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                  />
                </div> */}
              </div>
              <button
                type="submit"
                name="submit"
                className="bg-[#c379ee] rounded-2xl my-10 hover:font-bold hover:bg-[#993dbd] w-[40%] ml-[29%] h-[2rem]  text-white"
                value="Save"
              >
                Save
              </button>
            </div>

            {/* right side blog titles:-  */}
            {/* <div className="border-l-1 w-[2px] h-[100%] mx-[1%] hidden md:block bg-[#dd2424] border-[#dbdbdb]"></div> */}
            <div className="rightSideContent mx-auto rounded-2xl bg-[linear-gradient(220deg,#deecf7,#f3d0cf)] dark:bg-[linear-gradient(180deg,#100358,#302F2F)] md:mt-[1vh] md:h-[78vh] md:w-[73.9%] ">
              <div className="mt-3 w-[100%]  flex flex-col gap-2 blogbox">
                {/* <label
                  htmlFor="summernote"
                  className="font-medium text-center py-1 rounded-2xl md:w-[20%] px-4 mx-auto bg-[#ecebea]"
                >
                  Blog Description
                </label>
                <textarea
                  type="text"
                  name="blog"
                  id="summernote"
                  className="outline-[#dbdbdb] break-after-all border-[0.5px] border-[#dbdbdb] rounded-[4px]"
                  rows="5"
                ></textarea> */}
                {/* <div>{form || "no data avaliable"}</div> */}
                {/* <div>{form.map((i) => (
                  <p>{i.title}</p>
                ))}</div> */}

                {/* ======================================================================================================================================================================================================== */}

                <div>
                  {/* Toolbar */}
                  <div className="flex gap-2 mb-3 md:h-12 flex-wrap  justify-evenly border-zinc-600/50 items-center text-zinc-800/90 border  rounded-md bg-[#e2ecfa] dark:bg-zinc-800 dark:text-white/80">
                    <div
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#1b8cc0] bg-transparent dark:bg-[#42404067] rounded-xl active:scale-95"
                    >
                      Bold
                    </div>

                    <div
                      onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#1b8cc0] bg-transparent dark:bg-[#42404067] rounded-xl active:scale-95"
                    >
                      Italic
                    </div>

                    <div
                      onClick={() =>
                        editor.chain().focus().toggleStrike().run()
                      }
                      className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#1b8cc0] bg-transparent dark:bg-[#42404067] rounded-xl active:scale-95"
                    >
                      Strike
                    </div>

                    <div
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                      }
                      className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#1b8cc0] bg-transparent dark:bg-[#42404067] rounded-xl active:scale-95"
                    >
                      H2
                    </div>

                    <div
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#1b8cc0] bg-transparent dark:bg-[#42404067] rounded-xl active:scale-95"
                    >
                      • List
                    </div>

                    <div
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#1b8cc0] bg-transparent dark:bg-[#42404067] rounded-xl active:scale-95"
                    >
                      1. List
                    </div>
                    <div className="w-[20%] flex gap-2">
                      <div
                        onClick={() => editor.chain().focus().undo().run()}
                        className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#767879] bg-black/90 dark:bg-[#fcfbfb] font-medium rounded-full text-white/90 dark:text-black/90 active:scale-95 cursor-pointer"
                      >
                        Undo
                      </div>

                      <div
                        onClick={() => editor.chain().focus().redo().run()}
                        className="px-3 py-1 h-9 border-r-2 border-b-2 border-lime-400 dark:border-[#767879] bg-black/90 dark:bg-[#fcfbfb] font-medium text-white/90 dark:text-black/90 rounded-full active:scale-95 cursor-pointer"
                      >
                        Redo
                      </div>
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="border p-4 h-[15rem] rounded border-amber-600">
                    <EditorContent className="border h-[90%]" editor={editor} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
