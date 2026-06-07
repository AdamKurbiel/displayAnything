//Created by Adam Kurbiel
import { decode, encode } from "./coding.js";
import { greetings } from "./greetings.js";

const container = document.querySelector(".container");
const textarea = document.getElementById("textarea");
const button = document.getElementById("createNote");

function createDiv(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

const hash = window.location.hash.slice(1);

//read only if the page loads with the note
if (hash) {
  try {
    const note = decode(hash);
    //note html
    document.body.innerHTML = `
      <main style="
        width:min(720px,100%);
        margin:auto;
        padding:2rem 2rem;">
        <div style="
          background:white;
          border-radius:28px;
          padding:1rem;
          box-shadow:0 10px 20px rgba(15,23,42,.08);
          white-space:pre-wrap;
          word-break:break-word;
          font-size:1.15rem;
          line-height:1.8;">
          ${createDiv(note)}
        </div>

        <p><a href="https://adamkurbiel.github.io/displayAnything">displayAnything</a> created by <a href="https://github.com/adamkurbiel"> Adam Kurbiel</a></p>
      </main>
    `;

    throw new Error("viewer mode");
  } catch (err) {
    if (err.message === "viewer mode") {
      // :)
    } else {
      console.error("Invalid note");
    }
  }
}

//expand and collapse the editor area based on user interaction
const expand = () => {
  container.classList.add("expanded");
};

const collapse = () => {
  if (!textarea.value.trim()) {
    container.classList.remove("expanded");
  }
};

container.addEventListener("click", expand);
textarea.addEventListener("focus", expand);
textarea.addEventListener("blur", () => {
  setTimeout(collapse, 150);
});

//copy the link to the clipboard
button.addEventListener("click", async () => {
  const text = textarea.value.trim();

  if (!text) {
    textarea.focus();
    return;
  }

  const encoded = encode(text);
  const url =
    window.location.origin +
    window.location.pathname +
    "#" + encoded;

  try {
    await navigator.clipboard.writeText(url);

    const originalText = button.textContent;

    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  } catch {
    prompt("Copy this link:", url);
  }
});

//random greetings
var chosen = Math.floor(Math.random() * greetings.length);
textarea.placeholder = greetings[chosen];
