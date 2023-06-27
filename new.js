// language data

const javascript = [
  "this",
  "for",
  "while",
  "do",
  "if",
  "else",
  "switch",
  "String",
  "Number",
];

const english = [
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "is",
  "you",
  "that",
  "it",
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "I",
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "word",
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  "there",
  "use",
  "an",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  "some",
  "her",
  "would",
  "make",
  "like",
  "him",
  "into",
  "time",
  "has",
  "look",
  "two",
  "more",
  "write",
  "go",
  "see",
  "number",
  "no",
  "way",
  "could",
  "people",
  "my",
  "than",
  "first",
  "water",
  "been",
  "call",
  "who",
  "oil",
  "its",
  "now",
  "find",
  "long",
  "down",
  "day",
  "did",
  "get",
  "come",
  "made",
  "may",
  "part",
];

const keypress = document.getElementById("keypress");
const keypress_div = document.querySelector(".keypress-div");
const language_selector = document.querySelector(".language-selector");
const word_div = document.querySelector(".word-div");
const word_cont = document.querySelector(".word-cont");
const input_text = document.querySelector(".input-box");
const word = document.querySelector(".word");
const time_box = document.querySelector(".time");
const time_button = document.querySelector(".time-button");
const modal_window = document.querySelector(".modal-window");
const start_button = document.querySelector(".start-button");
const input_min = document.querySelector(".min");
const input_sec = document.querySelector(".sec");
const result_close_button = document.querySelector(
  ".modal-window-result-close-button"
);
const modal_window_result = document.querySelector(".modal-window-result");
const speed_div = document.querySelector(".speed");
const total_words_div = document.querySelector(".total-words");
const correct_words_div = document.querySelector(".correct-words");
const miss_words_div = document.querySelector(".miss-words");
const dark_mode_button = document.querySelector(".dark-mode-button-switch");

let current_lang = 1;
let time = [0, 0];

let total_words = 0;
let correct_words = 0;
let miss_words = 0;

let WPM = 0.0;

dark_mode_button.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  document.body.classList.toggle("light-mode-theme");
});

result_close_button.addEventListener("click", function () {
  reset_result();
  modal_window_result.classList.add("hide-me");
});

time_button.addEventListener("click", function (e) {
  modal_window.classList.remove("hide-me");
});

start_button.addEventListener("click", function (e) {
  modal_window.classList.add("hide-me");
  input_text.focus();
  time[0] = +input_min.value;
  time[1] = +input_sec.value;
  WPM = time[1] / 60 + time[0];
  input_min.value = "";
  input_sec.value = "";
  let x = setInterval(function () {
    if (time[0] < 0) {
      clearInterval(x);
      show_result();
      document
        .querySelector(".timer-text")
        .addEventListener("click", function () {
          modal_window.classList.remove("hide-me");
        });
      return;
    }
    const div = document.createElement("div");
    div.innerHTML = `<div class="timer-text">${time[0]}m:${time[1]}s</div>`;
    time_box.innerHTML = "";
    time_box.append(div);
    if (time[1] <= 0) {
      time[1] = 59;
      time[0]--;
      return;
    }
    time[1]--;
  }, 1000);
});

language_selector.addEventListener("change", function (e) {
  /* If user change the language word's will be changed. */
  let temp = language_selector.value;
  if (temp == "english") {
    current_lang = 1;
  } else if (temp == "javascript") {
    current_lang = 2;
  }
  add_word();
  reset_result();
});

const reset_result = function () {
  total_words = 0;
  correct_words = 0;
  miss_words = 0;
};

const show_result = function () {
  let gwpm = total_words / WPM;
  let nwpm = correct_words / WPM;
  let wpma = (nwpm * 100) / gwpm;
  modal_window_result.classList.remove("hide-me");
  speed_div.innerText = `Speed: ${nwpm}WPM`;
  total_words_div.innerText = `Total Words: ${total_words}`;
  correct_words_div.innerText = `Correct Words: ${correct_words}`;
  miss_words_div.innerText = `Miss Words: ${miss_words}`;
};

const add_word = function () {
  let word;
  if (current_lang == 2) {
    word =
      javascript[Math.floor(Math.random(0, 1) * javascript.length - 1) + 1];
  } else if (current_lang == 1) {
    word = english[Math.floor(Math.random(0, 1) * english.length - 1) + 1];
  }
  const span = document.createElement("span");
  let html = `<span class="word animate-faid-stay">${word}</span>`;
  span.innerHTML = html;
  word_cont.innerHTML = "";
  word_cont.append(span);
};

const mark_red = function () {
  document.querySelector(".word").classList.add("red");
};

const check_word = function () {
  let one = document.querySelector(".word").innerText;
  let two = input_text.value;
  if (one.replace(" ", "") == two.replace(" ", "")) {
    add_word();
    correct_words++;
  } else {
    miss_words++;
    mark_red();
    input_text.value = "";
    return;
  }
  input_text.value = "";
  word.innerText = "";
};

document.addEventListener("keydown", function (e) {
  const html = `<div class="key animate-faid-in" id="keypress">${e["key"]}</div>`;
  const div = document.createElement("div");
  div.innerHTML = html;
  keypress_div.innerHTML = "";
  if (e["key"] == "Escape") {
    modal_window.classList.add("hide-me");
    return;
  }
  if (/\s|Enter/.test(e["key"])) {
    check_word();
    total_words++;
    return;
  }
  if (!/Shift|Alt|Backspace/.test(e["key"])) keypress_div.append(div);
});
