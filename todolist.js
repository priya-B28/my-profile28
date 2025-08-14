let box = creatediv1();
document.body.appendChild(box);


let heading = document.createElement("h1");
heading.innerText = "Todo List Using JS!📝";
heading.className = "text-black  text-[80px] align-top text-center";


let mbox = createbox();
let box1 = creatediv2();
let box2 = creatediv3();
let btn = createbutton();
let form = createform();
form.id = "form";
let box3 = creatediv4();
let mytask = [];
let isEditing = false;
let currentid = null;
loadTasksFromStorage();


function creatediv1() {
  let box = document.createElement("div");
  box.className =
    "bg-linear-to-r from-yellow-300 to-lime-400 to-green-500 to-emerald-600 h-182 w-384 ";
  return box;
}
function createbox() {
  let mbox = document.createElement("div");
  mbox.className = "h-150 w-300  flex p-10 ml-50";
  return mbox;
}
function creatediv2() {
  let box1 = document.createElement("div");
  box1.className =
    "border-2 border-red-500 h-100 w-120 border-3 ml-4 mt-8 bg-gray-300 rounded-xl shadow-2xl";
  return box1;
}
function creatediv3() {
  let box2 = document.createElement("div");
  box2.className =
    "border-2 border-red-500 h-130 w-120 border-3 ml-20 bg-gray-300 rounded-xl shadow-2xl";
  return box2;
}
function createbutton() {
  let btn = document.createElement("button");
  btn.id="btnid";
  btn.className =
    "h-12 w-50 rounded-xl mt-5 ml-32 cursor-pointer bg-red-400 hover:shadow-xl font-medium";
  btn.innerText = "ADD";
  btn.onclick = mybtn;
  return btn;
}
function createform() {
  let div = document.createElement("div");
  div.id = "div1";
  div.className = "hidden";

  let input = createinput();
  input.id = "myinput";
  let textarea = createtextarea();
  textarea.id = "mytextarea";

  let button = createtaskbutton();
  button.id = "my-btn";

  div.appendChild(input);
  div.appendChild(textarea);
  div.appendChild(button);

  return div;
}
function createinput() {
  let input = document.createElement("input");
  input.className =
    "h-15 w-100 border-2 rounded-md mt-6 ml-7 hidden hover:border-red-400 bg-white";
  input.placeholder = "Enter your title";
  return input;
}
function createtextarea() {
  let textarea = document.createElement("textarea");
  textarea.className =
    "h-25 w-100 border-2 rounded-md mt-6 ml-7 hidden hover:border-red-400 bg-white";
  textarea.placeholder = "Enter your description";
  return textarea;
}
function createtaskbutton() {
  let button = document.createElement("button");
  button.className =
    "h-12 w-50 rounded-xl  mt-10 ml-32 hidden cursor-pointer bg-red-400 hover:shadow-xl font-medium";
  button.innerText = "ADD TASK";
  button.addEventListener("click", mybtn2);
  return button;
}
function creatediv4() {
  let box3 = document.createElement("div");
  box3.id = "div1";
  box3.className = " h-115 w-115 overflow-auto mt-3 ml-2 mb-5";
  return box3;
}
function mybtn() {
  let form = document.getElementById("form");
  let input = document.getElementById("myinput");
  let textarea = document.getElementById("mytextarea");
  let button = document.getElementById("my-btn");

  input.style.display = "block";
  button.style.display = "block";
  textarea.style.display = "block";
  form.style.display = "block";
  btn.style.display="none"
}
function mybtn2() {
   let input = document.getElementById("myinput");
  let textarea = document.getElementById("mytextarea");
  let button = document.getElementById("my-btn");
  let addbutton = document.getElementById("btnid");
  input.style.display = "none";
  button.style.display = "none";
  textarea.style.display = "none";
   addbutton.style.display = "block";

  let btn2 = document.getElementById("myinput").value;
  let btn3 = document.getElementById("mytextarea").value;
  if (!btn2 || !btn3) return;
  if (isEditing) {
    editbox.querySelector("h2").innerText = btn2;
    editbox.querySelector("p").innerText = btn3;
    savetoedit(btn2, btn3, currentid);
  } else {
    let id = new Date().getTime();
    let save = {
      id: id,
      heading: btn2,
      description: btn3,
    };
    createDisplayBox(save);
    savetostorage(btn2, btn3, id);
  }
  document.getElementById("myinput").value = "";
  document.getElementById("mytextarea").value = "";
}
function createDelbutton(box, id) {
  let del = document.createElement("button");
  del.innerText = "🗑️";
  del.className = "ml-2 border-2 ";
  del.onclick = () => {
    box.remove();
    mytask = mytask.filter((task) => task.id !== id);
    localStorage.setItem("mytask", JSON.stringify(mytask));
  };
  return del;
}
function createEditbutton(btn2, btn3, id, boxref) {
  let div = document.getElementById("div1");
  let edit = document.createElement("button");
  edit.innerText = "✏️";
  edit.className = " border-2 ml-64";
  edit.onclick = () => {
    document.getElementById("myinput").value = btn2;
    document.getElementById("mytextarea").value = btn3;

    let form = document.getElementById("form");
    let input = document.getElementById("myinput");
    let textarea = document.getElementById("mytextarea");
    let button = document.getElementById("my-btn");

    isEditing = true;
    currentid = id;
    editbox = boxref;

    input.style.display = "block";
    button.style.display = "block";
    textarea.style.display = "block";
    form.style.display = "block";
  };
  return edit;
}
function savetostorage(btn2, btn3, id) {
  let save = {
    id: id,
    heading: btn2,
    description: btn3,
  };
  mytask.push(save);
  localStorage.setItem("mytask", JSON.stringify(mytask));
}
function savetoedit(btn2, btn3, currentid) {
  for (let i = 0; i < mytask.length; i++) {
    if (mytask[i].id === currentid) {
      mytask[i].heading = btn2;
      mytask[i].description = btn3;
    }
  }
  localStorage.setItem("mytask", JSON.stringify(mytask));
  isEditing = false;
  currentid = null;
}
function loadTasksFromStorage() {
  let data = localStorage.getItem("mytask");
  if (data) {
    mytask = JSON.parse(data);
    for (let save of mytask) {
      createDisplayBox(save);
    }
  }
}
function createDisplayBox(save) {
  let box4 = document.createElement("div");
  box4.id = "mybox";
  box4.className =
    "border-3 border-dashed h-auto w-85 ml-15 mt-5 mb-5 hover:bg-white rounded-md ";

  let title = document.createElement("h2");
  title.innerText = save.heading;
  title.className = "ml-3 font-bold";

  let message = document.createElement("p");
  message.innerText = save.description;
  message.className = "ml-3 truncate ";

  let readmore = document.createElement("a");
  readmore.innerText = "Read-More";
  readmore.className = "ml-3 cursor-pointer text-blue-500";
  readmore.onclick = () => {
    message.className = "overflow-visible break-all ml-3 mr-3";
    readless.style.display = "block";
    readmore.style.display = "none";
  };

  let readless = document.createElement("a");
  readless.innerText = "Read-Less";
  readless.className = "ml-3 cursor-pointer text-red-500 hidden";
  readless.onclick = () => {
    message.className = "truncate ml-3 mr-3";
    readless.style.display = "none";
    readmore.style.display = "block";
  };

  let del = createDelbutton(box4, save.id);
  let edit = createEditbutton(save.heading, save.description, save.id, box);

  let div = document.createElement("div");
  div.innerText = time(save.id);
  div.className = "ml-50";

  box4.appendChild(title);
  box4.appendChild(message);
  box4.appendChild(readmore);
  box4.appendChild(readless);
  box4.appendChild(edit);
  box4.appendChild(del);
  box4.appendChild(div);
  box3.appendChild(box4);
}
function time(id) {
  let current = Date.now();
  let seconds = Math.floor(current - id) / 1000;

  if (seconds < 60) {
    return `few seconds ago`;
  }
  let minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  let hours = Math.floor(minutes / 60);
  if (hours < 24) {
    hours = hours % 24;
    return `${hours} hours ago`;
  }
  let days = Math.floor(hours / 24);
  return `${days} days ago`;
}


box.appendChild(heading);
box.appendChild(mbox);
mbox.appendChild(box1);
mbox.appendChild(box2);
box1.appendChild(btn);
box1.appendChild(form);
box2.appendChild(box3);


// function creatediv1() {
//   let box = document.createElement("div");
//   box.className =
//     "min-h-screen w-full bg-gradient-to-r from-yellow-300 via-green-400 to-emerald-500 p-10";
//   return box;
// }

// function createbox() {
//   let mbox = document.createElement("div");
//   mbox.className = "flex flex-col lg:flex-row gap-10 justify-center items-start";
//   return mbox;
// }

// function creatediv2() {
//   let box1 = document.createElement("div");
//   box1.className =
//     "bg-white shadow-xl rounded-2xl p-6 w-full lg:w-1/3 border border-gray-200";
//   return box1;
// }

// function creatediv3() {
//   let box2 = document.createElement("div");
//   box2.className =
//     "bg-white shadow-xl rounded-2xl p-6 w-full lg:w-1/2 border border-gray-200";
//   return box2;
// }

// function createbutton() {
//   let btn = document.createElement("button");
//   btn.id = "btnid";
//   btn.className =
//     "w-full py-3 rounded-xl mt-3 cursor-pointer bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition-all font-semibold";
//   btn.innerText = "➕ Add New Task";
//   btn.onclick = mybtn;
//   return btn;
// }

// function createinput() {
//   let input = document.createElement("input");
//   input.className =
//     "w-full border-2 rounded-lg px-3 py-2 mt-4 hidden focus:border-red-400 outline-none";
//   input.placeholder = "Enter your title";
//   return input;
// }

// function createtextarea() {
//   let textarea = document.createElement("textarea");
//   textarea.className =
//     "w-full border-2 rounded-lg px-3 py-2 mt-4 hidden focus:border-red-400 outline-none";
//   textarea.placeholder = "Enter your description";
//   return textarea;
// }

// function createtaskbutton() {
//   let button = document.createElement("button");
//   button.className =
//     "w-full py-3 rounded-xl mt-4 hidden cursor-pointer bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transition-all font-semibold";
//   button.innerText = "✅ Save Task";
//   button.addEventListener("click", mybtn2);
//   return button;
// }

// function creatediv4() {
//   let box3 = document.createElement("div");
//   box3.id = "div1";
//   box3.className = "h-[450px] overflow-auto space-y-4";
//   return box3;
// }

// function createDisplayBox(save) {
//   let box4 = document.createElement("div");
//   box4.className =
//     "p-4 border rounded-lg shadow hover:bg-gray-50 transition-all";

//   let title = document.createElement("h2");
//   title.innerText = save.heading;
//   title.className = "font-bold text-lg text-gray-800";

//   let message = document.createElement("p");
//   message.innerText = save.description;
//   message.className = "text-gray-600 truncate";

//   let readmore = document.createElement("a");
//   readmore.innerText = "Read More";
//   readmore.className = "text-blue-500 cursor-pointer ml-2";
//   readmore.onclick = () => {
//     message.className = "text-gray-600 break-all";
//     readless.style.display = "inline";
//     readmore.style.display = "none";
//   };

//   let readless = document.createElement("a");
//   readless.innerText = "Read Less";
//   readless.className = "text-red-500 cursor-pointer ml-2 hidden";
//   readless.onclick = () => {
//     message.className = "text-gray-600 truncate";
//     readless.style.display = "none";
//     readmore.style.display = "inline";
//   };

//   let actions = document.createElement("div");
//   actions.className = "flex justify-between mt-3";

//   let del = createDelbutton(box4, save.id);
//   del.className = "px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500";

//   let edit = createEditbutton(save.heading, save.description, save.id, box4);
//   edit.className =
//     "px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500";

//   let timeDiv = document.createElement("span");
//   timeDiv.innerText = time(save.id);
//   timeDiv.className = "text-sm text-gray-500 mt-2 block";

//   actions.appendChild(edit);
//   actions.appendChild(del);

//   box4.appendChild(title);
//   box4.appendChild(message);
//   box4.appendChild(readmore);
//   box4.appendChild(readless);
//   box4.appendChild(actions);
//   box4.appendChild(timeDiv);

//   box3.appendChild(box4);
// }

function creatediv1() {
  let box = document.createElement("div");
  box.className =
    "min-h-screen w-full bg-gradient-to-r from-yellow-300 via-green-400 to-emerald-500 p-8";
  return box;
}

function createbox() {
  let mbox = document.createElement("div");
  mbox.className =
    "flex flex-col lg:flex-row gap-10 justify-center items-start";
  return mbox;
}

function creatediv2() {
  let box1 = document.createElement("div");
  box1.className =
    "bg-white shadow-xl rounded-2xl p-6 w-full lg:w-1/3 border border-gray-200";
  return box1;
}

function creatediv3() {
  let box2 = document.createElement("div");
  box2.className =
    "bg-white shadow-xl rounded-2xl p-6 w-full lg:w-1/2 border border-gray-200";
  return box2;
}

function createbutton() {
  let btn = document.createElement("button");
  btn.id = "btnid";
  btn.className =
    "w-full py-3 rounded-xl mt-3 cursor-pointer bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition-all font-semibold";
  btn.innerText = "➕ Add New Task";
  btn.onclick = mybtn;
  return btn;
}

function createinput() {
  let input = document.createElement("input");
  input.className =
    "w-full border-2 rounded-lg px-3 py-2 mt-4 hidden focus:border-red-400 outline-none";
  input.placeholder = "Enter your title";
  return input;
}

function createtextarea() {
  let textarea = document.createElement("textarea");
  textarea.className =
    "w-full border-2 rounded-lg px-3 py-2 mt-4 hidden focus:border-red-400 outline-none";
  textarea.placeholder = "Enter your description";
  return textarea;
}

function createtaskbutton() {
  let button = document.createElement("button");
  button.className =
    "w-full py-3 rounded-xl mt-4 hidden cursor-pointer bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transition-all font-semibold";
  button.innerText = "✅ Save Task";
  button.addEventListener("click", mybtn2);
  return button;
}

function creatediv4() {
  let box3 = document.createElement("div");
  box3.id = "div1";
  box3.className = "h-[450px] overflow-auto space-y-4";
  return box3;
}

function createDisplayBox(save) {
  let box4 = document.createElement("div");
  box4.className =
    "p-4 border rounded-lg shadow hover:bg-gray-50 transition-all";

  let title = document.createElement("h2");
  title.innerText = save.heading;
  title.className = "font-bold text-lg text-gray-800";

  let message = document.createElement("p");
  message.innerText = save.description;
  message.className = "text-gray-600 truncate";

  let readmore = document.createElement("a");
  readmore.innerText = "Read More";
  readmore.className = "text-blue-500 cursor-pointer ml-2";
  readmore.onclick = () => {
    message.className = "text-gray-600 break-all";
    readless.style.display = "inline";
    readmore.style.display = "none";
  };

  let readless = document.createElement("a");
  readless.innerText = "Read Less";
  readless.className = "text-red-500 cursor-pointer ml-2 hidden";
  readless.onclick = () => {
    message.className = "text-gray-600 truncate";
    readless.style.display = "none";
    readmore.style.display = "inline";
  };

  let actions = document.createElement("div");
  actions.className = "flex justify-between mt-3";

  let del = createDelbutton(box4, save.id);
  del.className = "px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500";

  let edit = createEditbutton(save.heading, save.description, save.id, box4);
  edit.className =
    "px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500";

  let timeDiv = document.createElement("span");
  timeDiv.innerText = time(save.id);
  timeDiv.className = "text-sm text-gray-500 mt-2 block";

  actions.appendChild(edit);
  actions.appendChild(del);

  box4.appendChild(title);
  box4.appendChild(message);
  box4.appendChild(readmore);
  box4.appendChild(readless);
  box4.appendChild(actions);
  box4.appendChild(timeDiv);

  box3.appendChild(box4);
}
