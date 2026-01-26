"use client";
import React, {
  useState,
  useEffect,
  useEffectEvent,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
//import confing from "../../config/confing";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
//import { set } from "mongoose";
import { categoryStore } from "@/store/categoryStore";

export default function UpdateArticle({ article }) {
  // const { id } =
  //const { BaseUrl } = confing;
  const API =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  //const { category, fetchCategory } = categoryStore();
  const [isDark, setIsDark] = useState(false);
  const [oneArticle, setOneArticle] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const arrowUp = "/icons/arrowup.png";
  const arrowDown = "/icons/arrow-down.png";
  const [dwonMenu, setDwonMenu] = useState(true);
  const [imgSection, setImgSection] = useState(true);

  //console.log("client single obj is - ");
  //setOneArticle(article);
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

  // fetch article + categories
  //   useEffect(() => {
  //     if (!id) return;
  //     let cancelled = false;
  //     const fetchData = async () => {
  //       setLoading(true);
  //       try {
  //         const res = await axios.get(`/api/description/${id}`);
  //         if (cancelled) return;
  //         setOneArticle(res.data.article || {});
  //         setCategories(res.data.category || []);
  //       } catch (err) {
  //         console.error("Fetch error:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //     return () => {
  //       cancelled = true;
  //     };
  //   }, [id, API]);
  const getCagetory = async () => {
    await axios
      .get("/api/category", {
        cache: "force-cache",
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("Error in fetching categories", err);
      });
  };

  const filter = categories.filter((e) => {
    return e._id === article.category;
  });
  //console.log("the filter is:- ",filter)

  // const article = useMemo(() => articles
  //   , [])
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: article.description,
    onUpdate: ({ editor }) => {
      setForm((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });
  useEffect(() => {
    getCagetory();
  }, []);
  // when article loads, populate form
  useEffect(() => {
    //if (!article || !editor) return;
    setForm({
      title: article.title || "",
      description: article.description || "",
      slug: article.slug || "",
      category: article.category || "",
      imageAtl: article.imageAtl || "",
      imageUrl: article.imageUrl || "",
      metaDescription: article.metaDescription || "",
      tags: article.tags || "",
      popular: Boolean(article.popular),
    });
  }, []);
  //const { _id } = article;
  //console.log("_id is :- ", _id);

  const handleChange = useCallback((e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // console.log("running code every render!", oneArticle);
  //console.log(oneArticle.category.name);
  //const { name, _id } = oneArticle?.category || { name: "select", _id: "1" };

  const hedleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blog/${article._id}`, form);
      alert("Article updated successfully.");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update article.");
    }
  };

  const change = () => {
    setDwonMenu(!dwonMenu);
  };
  const imgHendel = () => {
    setImgSection(!imgSection);
  };
  return (
    <div>
      <div className="relative md:h-[80vh]   md:mt-8 w-[95%] m-auto dark:bg-[#201d1d] border-[0.5px] border-[#dbdbdb] dark:border-[#312f2f] rounded-2xl">
        <div className="w-[98%] m-auto ">
          {/*     action="/admin/add-article" enctype="multipart/form-data"
               method="post" */}
          <form
            className="content  w-[100%] md:flex text-gray-500 dark:text-zinc-300 dark:bg-transparent"
            onSubmit={hedleSubmit}
          >
            {/* left side content  */}
            <div className="leftSideContent overflow-y-auto overflow-x-hidden dark:bg-[#2c2b2b] bg-[#fdf8e9] md:h-[78vh] mt-[1vh] rounded-2xl pt-1   md:w-[24.8%]">
              <h3 className="bg-[#faecf4] dark:bg-[#201414] text-md ml-[5%] rounded-2xl h-[3rem] pt-3 w-[90%] text-center items-center mt-3 font-medium">
                Update Article
              </h3>

              <div className="flex items-center w-[90%] border border-[#413f3f] mx-auto py-2 mt-2 active:bg-[#0b3f53] justify-center  active:scale-90 transition ease-in  rounded-md gap-2">
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
              <div className="mt-3 flex flex-col gap-2">
                <label htmlFor="article_category" className="pl-3">
                  Category
                </label>
                <select
                  className="py-1  outline-[#dbdbdb] dark:bg-[#353434]    h-10 pl-3 w-[98%] mx-auto  rounded-4xl bg-[#ebe3e3] ] "
                  name="category"
                  id="article_category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option
                    value={filter._id}
                    className=" h-10 pl-3 w-[90%] mx-auto  bg-[#ebe3e3] dark:bg-[#201414] "
                  >
                    {filter.field}
                  </option>
                  {categories.map((item) => (
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
                className=" font-medium text-zinc-600 dark:text-zinc-400 bg-[#ebe3e3] dark:bg-[#201414] rounded-3xl  mx-auto  py-2 mt-2 active:bg-[#0b3f53] active:scale-90 flex gap-2 transition ease-in justify-center items-center"
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
                    className="outline-none text-zinc-600 dark:text-zinc-400  h-10 pl-3 w-[90%] mx-auto rounded-md  bg-transparent border border-[#a7a7a7] dark:border-[#5a5757] "
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
                    className="outline-none text-zinc-600 dark:text-zinc-400  h-10 pl-3 w-[90%] mx-auto rounded-md  bg-transparent border border-[#a7a7a7] dark:border-[#5a5757] "
                    placeholder="Keyword Not Uploaded "
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
                    className="outline-none text-zinc-600 dark:text-zinc-400  h-10 pl-3 w-[90%] mx-auto rounded-md  bg-transparent border border-[#a7a7a7] dark:border-[#5a5757] "
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
                    className="outline-none text-zinc-600 dark:text-zinc-400  h-10 pl-3 w-[90%] mx-auto rounded-md  bg-transparent border border-[#a7a7a7] dark:border-[#5a5757]  "
                    value={form.imageAtl}
                    onChange={handleChange}
                    placeholder="Image Name for SEO"
                  />
                </div>
              </div>

              <div
                className=" font-medium bg-[#ebe3e3] dark:bg-[#201414] rounded-3xl  mx-auto py-2 mt-2 active:bg-[#0b3f53] active:scale-90 flex gap-2 transition ease-in justify-center items-center"
                onClick={() => imgHendel()}
              >
                <h2 className="w-[70%] text-zinc-600 dark:text-zinc-400 ">
                  image Section
                </h2>
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
                    className="outline-none text-zinc-600 dark:text-zinc-400  h-10 pl-3 w-[90%] mx-auto rounded-md  bg-transparent border border-[#a7a7a7] dark:border-[#5a5757] "
                    onChange={handleChange}
                    placeholder="Enter Image URL "
                  />
                  <div className="mx-auto border rounded-lg overflow-hidden border-zinc-600  mt-3 h-40 w-[90%] lg:h-40">
                    <img
                      src={`${form.imageUrl}` || "/card1.jpeg"}
                      alt="Empty"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                name="submit"
                className="dark:bg-[#b1afb3] bg-[#494849] dark:text-[#3b3a3a] font-bold  rounded-md my-10 hover:font-bold dark:hover:bg-[#eceaec] w-[90%] ml-[5%] h-[2.5rem]  text-white"
              >
                Update
              </button>
            </div>

            {/* right side blog titles:-  */}

            <div className="rightSideContent mx-auto rounded-2xl bg-[linear-gradient(220deg,#deecf7,#f3d0cf)] dark:bg-[linear-gradient(180deg,#302F2F,#302F2F)] md:mt-[1vh] md:h-[78vh] md:w-[73.9%] ">
              <div className="mt-3 w-[100%]  flex flex-col gap-2 blogbox">
                <div className="mt-3 flex flex-col ">
                  <label
                    htmlFor="article_title"
                    className="text-center ml-4 w-full"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="article_title"
                    className="outline-none h-10 pl-3 w-[98%] mx-auto rounded-md border  bg-[#ebe3e3] dark:bg-[#333131] "
                    placeholder="Title for article"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
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

                  <div className="h-[80vh] md:h-[58vh] overflow-hidden  overflow-y-auto   ">
                    <h1 className="font-medium text-center my-1">
                      Article Description Box
                    </h1>
                    {/* Editor */}
                    {/* border border-amber-600 */}
                    <div className=" p-4 h-auto rounded ">
                      <EditorContent
                        className="border h-[90%]"
                        editor={editor}
                      />
                    </div>
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
