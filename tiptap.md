To convert **raw HTML stored in MongoDB** — like:

```html
<p>Hello Tiptap!<strong><em> test</em></strong></p>
```

— into **normal plain text** on the **client side (React)**, you can strip the HTML tags safely using one of these methods.

---

# ✅ **Option 1: Use the Browser’s built-in DOMParser (Recommended)**

```jsx
function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default function Component() {
  const rawHtml = "<p>Hello Tiptap!<strong><em> test</em></strong></p>";

  return (
    <div>
      {htmlToText(rawHtml)}
    </div>
  );
}
```

**Output:**

```
Hello Tiptap! test
```

---

# ✅ **Option 2: Create a temporary DOM element**

```jsx
function htmlToText(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

export default function Component() {
  const rawHtml = "<p>Hello Tiptap!<strong><em> test</em></strong></p>";

  return <div>{htmlToText(rawHtml)}</div>;
}
```

---

# ✅ **Option 3: If you need a library**

If your HTML is complex, use `html-to-text`:

```
npm install html-to-text
```

```jsx
import { htmlToText } from "html-to-text";

export default function Component() {
  const rawHtml = "<p>Hello Tiptap!<strong><em> test</em></strong></p>";

  const text = htmlToText(rawHtml);

  return <div>{text}</div>;
}
```

---

# ⚡ Best for Next.js Client Components

Use method **1** — light and built-in.

---

If you want, I can help you integrate this directly into your **sidebar + category article list** logic from your other message.
