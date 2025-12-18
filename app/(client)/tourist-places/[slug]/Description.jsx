"use client";

import React from "react";

export default function Description({ description }) {


  function htmlToText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
//console.log(description)
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
      <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
        {htmlToText(description)}
      </p>
    </div>
  );
}
