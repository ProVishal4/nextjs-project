"use client"
import React, { useState, useRef } from 'react'

export default function page() {
const [dwonMenu, setDwonMenu] = useState(true)
const [imgSection, setImgSection] = useState(true)
const imgSrc = useRef(null)
const arrowUp = "/icons/arrowup.png"
const arrowDown = "/icons/arrow-down.png"
const changeSrc = ()=> {
  imgSrc.current.src = "/icons/arrowup.png"
}
const change = ()=> {
setDwonMenu(!dwonMenu);
changeSrc()
}
const imgHendel = ()=>{
  setImgSection(!imgSection);
  
  changeSrc();
if()
}
//imgSection ? arrowDown : arrowUp
  return (
    <div>
      {/* <h1 className="text-2xl font-semibold w-full mb-1">Add New Article</h1> */}
      <div className="relative md:h-[80vh]   md:mt-8 w-[95%] m-auto  bg-[linear-gradient(45deg,#e8f5f6,#f9decc)] dark:bg-[linear-gradient(220deg,#100358,#302F2F)] dark:bg-[#201d1d] border-[0.5px] border-[#dbdbdb] dark:border-[#312f2f] rounded-2xl">
        <div className="w-[98%] m-auto ">
          <form
            action="/admin/add-article"
            className="content  w-[100%] md:flex text-gray-500 dark:text-white/80 dark:bg-transparent"
            enctype="multipart/form-data"
            method="post"
          >
            {/* left side content  */}
            <div className="leftSideContent overflow-y-auto overflow-x-hidden dark:bg-[linear-gradient(0deg,gray,black)] bg-[linear-gradient(0deg,#ffebcc,#fbf6fd)] md:h-[78vh] mt-[1vh] rounded-2xl pt-1   md:w-[24.8%]">
              <h3 className="bg-[#faecf4] dark:bg-[#201414] text-md ml-[5%] rounded-2xl h-[3rem] pt-3 w-[90%] text-center items-center mt-3 font-medium">
                Add new article
              </h3>
              {/* <div className="border-[0.5px] border-[#dbdbdb] "></div> */}
              <div className="mt-3 flex flex-col ">
                <label for="article_title" className=" ml-4 w-full">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="article_title"
                  className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] "
                  placeholder="Title for article"
                />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <label for="article_category" className="pl-3">
                  Category
                </label>
                <select
                  className="py-1  outline-[#dbdbdb] dark:bg-[#353434]    h-10 pl-3 w-[90%] mx-auto  rounded-4xl bg-[#ebe3e3] ] "
                  name="category"
                  id="article_category"
                >
                  <option
                    value=""
                    className=" h-10 pl-3 w-[90%] mx-auto  bg-[#ebe3e3] dark:bg-[#201414] "
                  >
                    test
                  </option>
                  <option
                    value=""
                    className=" h-10 pl-3 w-[90%] mx-auto  bg-[#ebe3e3] dark:bg-[#201414] "
                  >
                    test
                  </option>
                  {/* <% category.forEach((categoryname)=> { %>
                                <option value="<%= categoryname._id %>">
                                    <%= categoryname.name %>
                                </option>
                                <% }) %> */}
                </select>
              </div>
              {/* <div className="scoName mt-3 flex flex-col ">
                <label for="sconame" className=" pl-3 w-full">
                  sco Keywords
                </label>
                <input
                  type="text"
                  name="scoName"
                  id="sconame"
                  className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                  autocomplete="off"
                  placeholder="SCO for Routes"
                />
              </div> */}
              <div
                className=" font-medium bg-[#ebe3e3] dark:bg-[#201414] rounded-3xl w-[90%] mx-auto py-2 mt-2 active:bg-[#0b3f53] active:scale-90 flex gap-2 transition ease-in justify-center items-center"
                onClick={() => change()}
              >
                <h2 className="w-[70%] ">SCO Section</h2>
                <img
                  src="/icons/arrow-down.png"
                  ref={imgSrc}
                  alt="arrow key"
                  className="h-5 w-4 dark:invert"
                />
              </div>
              {/* border border-red-700 */}
              <div className={` ${dwonMenu ? "hidden" : "block"}`}>
                <div className="slugName mt-3 flex flex-col ">
                  <label for="slugname" className=" pl-3 w-full">
                    sco slug Keywords
                  </label>
                  <input
                    type="text"
                    name="scoName"
                    id="slugname"
                    className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                    autocomplete="off"
                    placeholder="SCO for Routes"
                  />
                </div>
                <div className="metaContent mt-3 flex flex-col ">
                  <label for="meta_desc" className=" pl-3 w-full">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    name="metaContent"
                    id="meta_desc"
                    className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                    autocomplete="off"
                    placeholder="Page meta Dec for SCO"
                  />
                </div>

                <div className="imgAtl mt-3 flex flex-col ">
                  <label for="imgAtl_desc" className=" pl-3 w-full">
                    Image Name
                  </label>
                  <input
                    type="text"
                    name="imgAtl"
                    id="imgAtl_desc"
                    className="outline-[#dbdbdb] h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                    autocomplete="off"
                    placeholder="Image Name for SCO"
                  />
                </div>
              </div>

              <div
                className=" font-medium bg-[#ebe3e3] dark:bg-[#201414] rounded-3xl w-[90%] mx-auto py-2 mt-2 active:bg-[#0b3f53] active:scale-90 flex gap-2 transition ease-in justify-center items-center"
                onClick={() => imgHendel()}
              >
                <h2 className="w-[70%] ">image Section</h2>
                <img
                  src="/icons/arrow-down.png"
                  ref={imgSrc}
                  alt="arrow key"
                  className="h-5 w-4 dark:invert"
                />
              </div>
              <div
                className={` ${
                  imgSection ? "hidden" : "block"
                }`}
              >
                <div className="mt-3 flex flex-col">
                  <label for="article_image" className="pl-3">
                    Uplaod png/jpg image
                  </label>
                  <input
                    type="file"
                    name="imageJpg"
                    id="article_image"
                    className="outline-[#dbdbdb] pt-2 h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                  />
                </div>
                <div className="mt-3 flex flex-col">
                  <label for="article_image_webp" className="pl-3">
                    Uplaod webP image
                  </label>
                  <input
                    type="file"
                    name="imageWebp"
                    id="article_image_webp"
                    className="outline-[#dbdbdb] pt-2 h-10 pl-3 w-[90%] mx-auto rounded-4xl bg-[#ebe3e3] dark:bg-[#201414] dark:border-[#dbdbdb] "
                  />
                </div>
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
                <label
                  for="summernote"
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
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
