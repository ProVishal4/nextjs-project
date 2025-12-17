You can use the JavaScript addEventListener method with the copy and paste events to execute custom logic when a user copies or pastes content. These events are part of the Clipboard API and provide access to the clipboard data via the event.clipboardData property. 
Detecting and Intercepting Events
You can add event listeners to a specific element or the entire document or window. 
Syntax:
javascript
element.addEventListener('paste', handlerFunction);
element.addEventListener('copy', handlerFunction);
 
Example: Intercepting a Paste Event 
This code prevents the default paste behavior (e.g., pasting into a text field) and processes the pasted text in a custom way. 
html
<textarea id="editor" rows="5" cols="40"></textarea>
<p>Pasted content will appear here: <strong id="output"></strong></p>

<script>
  const editor = document.getElementById('editor');
  const output = document.getElementById('output');

  editor.addEventListener('paste', (event) => {
    // Prevent the default paste behavior
    event.preventDefault();

    // Access the clipboard data as plain text
    const pastedText = event.clipboardData.getData('text/plain');

    // Custom processing (e.g., convert to uppercase)
    const processedText = pastedText.toUpperCase();

    // Insert the processed text into the output element
    output.textContent = processedText;
    
    // Optional: manually insert into the textarea if you still want it there
    // editor.value += processedText; 
  });
</script>
 
Modifying Copy Content
You can also modify what is copied to the clipboard when a user initiates a copy action. 
Example: Modifying the Copied Text
This example forces the user to copy a specific message instead of the selected text within a certain element. 
html
<p id="myParagraph">Select and copy this text to see the custom message on paste.</p>

<script>
  const myParagraph = document.getElementById('myParagraph');

  myParagraph.addEventListener('copy', (event) => {
    // Prevent the default copy action of the selected text
    event.preventDefault(); 

    // Set the custom data to the clipboard
    const customData = 'This is my custom copied message!';
    event.clipboardData.setData('text/plain', customData);
    
    console.log('Custom text copied to clipboard!');
  });
</script>
 
Key Points
event.clipboardData: This object is a key part of the ClipboardEvent. It implements the DataTransfer interface, allowing access to the clipboard data.
event.preventDefault(): Call this method within the event handler to stop the browser's default action (e.g., stopping the default paste into an input field).
Security: For security reasons, directly reading the clipboard contents outside of a user-initiated event (like paste or a click on a specific button) might require user permissions. The examples above work because the actions are handled within the synchronous flow of the user event.
Modern API: While older methods like document.execCommand() exist, the Clipboard API (using addEventListener with clipboardData or navigator.clipboard.writeText/readText) is the modern, widely supported approach. 


===============================================


To use the JavaScript copy event listener in a Next.js application, you should leverage React's built-in onCopy synthetic event handler for element-specific actions or the useEffect hook with window.addEventListener for global actions. 
1. Using React's onCopy handler (Recommended for specific elements)
In React (and thus Next.js), you typically avoid addEventListener on individual elements and use the camel-cased event props directly in your JSX. This works well if you want to detect copying from a specific input or paragraph. 
Mark the component as a Client Component: If you are using Next.js App Router (version 13+), components are Server Components by default and cannot use browser APIs or event handlers directly. You must add the "use client" directive at the top of the file.
Define the handler function: Create a function that will be called when the copy event is triggered.
Attach the handler: Use the onCopy prop on the desired element. 
jsx
// components/CopyTextComponent.jsx
```jsx
"use client"; // Marks this as a Client Component

import React from 'react';

const CopyTextComponent = () => {
  const handleCopy = (event) => {
    console.log("Copy triggered!");
    // Optional: Prevent the default copy action and modify the clipboard data
    // event.preventDefault();
    // const selection = window.getSelection();
    // const modifiedText = selection.toString() + " - Added by my app";
    // event.clipboardData.setData('text/plain', modifiedText);
  };

  return (
    <div>
      <p onCopy={handleCopy}>
        This is the text that will trigger an event when copied.
      </p>
      <input type="text" onCopy={handleCopy} placeholder="Copy from here too" />
    </div>
  );
};

export default CopyTextComponent;
```
2. Using useEffect for a global listener (e.g., on window or document) 
If you need a global listener (e.g., detecting any copy action on the entire page), you must use useEffect to ensure the code runs only on the client side where the window and document objects are available. 
Mark the component as a Client Component with "use client".
Use useEffect: Add the listener when the component mounts and remove it when the component unmounts to prevent memory leaks. 
jsx
// components/GlobalCopyListener.jsx
```jsx
"use client";

import React, { useEffect } from 'react';

const GlobalCopyListener = () => {
  const handleGlobalCopy = (event) => {
    console.log("A global copy was performed!");
    // You can access event details here
    const copiedText = event.clipboardData.getData('text/plain');
    console.log("Copied text:", copiedText);
  };

  useEffect(() => {
    // Add the event listener to the window object on mount
    window.addEventListener('copy', handleGlobalCopy);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('copy', handleGlobalCopy);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div>
      {/* Other components or content */}
    </div>
  );
};

export default GlobalCopyListener

How to copy <div> tag available text in clipboard on clicking button
<div > dynamic data available <button>copy</button> </div>


In React / Next.js (JavaScript only) you can copy a <div>’s text to the clipboard by using the Clipboard API.

Below are 2 correct ways.
👉 Works in client components, no TypeScript, no npm (pnpm-safe).


---

✅ Method 1: Using useRef (Best & clean)

"use client";
import { useRef } from "react";

export default function CopyText() {
  const textRef = useRef(null);

  const copyText = async () => {
    const text = textRef.current.innerText;
    await navigator.clipboard.writeText(text);
    alert("Text copied!");
  };

  return (
    <div>
      <div ref={textRef}>
        This is dynamic data coming from API or state
      </div>

      <button onClick={copyText}>Copy</button>
    </div>
  );
}

✔ Why this is good

Works with dynamic content

No DOM querying

Clean React way



---

✅ Method 2: Using id (Simple but less React-style)

"use client";

export default function CopyText() {
  const copyText = async () => {
    const text = document.getElementById("copy-text").innerText;
    await navigator.clipboard.writeText(text);
    alert("Text copied!");
  };

  return (
    <div>
      <div id="copy-text">
        Dynamic content here
      </div>

      <button onClick={copyText}>Copy</button>
    </div>
  );
}


---

⚠️ Important Notes

navigator.clipboard works only in HTTPS (or localhost)

Must be triggered by user action (button click)



---

🧠 Copy HTML instead of text?

Use this instead:

const html = textRef.current.innerHTML;
navigator.clipboard.writeText(html);


---

If you want:

copy formatted text

copy from multiple divs

show toast instead of alert

or use App Router layout


Tell me 👍





























