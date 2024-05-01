let e = `<div class="container-fluid p-2 p-lg-5">
<h1 id="title">Pagination using DOM</h1>
<p id="description" class="px-3 text-primary lead">
  This page shows implementation of pagination using DOM.
</p>
<div class="table table-responsive">
  <table
    id="table"
    class="table table-bordered table-striped table-hover"
  >
    <thead class="table-dark">
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </thead>
    <tbody id="table-body"></tbody>
  </table>
</div>
<div id="buttons">
  <ul id="pageBar"  class="d-flex justify-content-center flex-wrap ">
    <li class=" first  mb-3 " onclick="firstOnClick()">First</li>
    <li class=" mb-3" onclick="previousOnClick()">Previous</li>
    <li
      id="page1"
      class="  mb-3 selected"
      onclick="pageNoOnClick('page1')"
    >
      1
    </li>
    <!-- <li id="page2" onclick="pageNoOnClick('page2')">2</li>
  <li id="page3" onclick="pageNoOnClick('page3')">3</li>
  --></ul>
</div>
</div>
`;
document.body.innerHTML = e;

let data = [];
let totalItems;
let nItemsPerPage;
let nPages;
var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);
request.send();

request.onload = function () {
  data = JSON.parse(request.response);
  console.log("inside", data);
  totalItems = data.length;
  nItemsPerPage = 5;
  nPages = Math.ceil(totalItems / nItemsPerPage);

  loadPageNumbersList();
};

function loadPageNumbersList() {
  let list = document.getElementById("pageBar");
  for (let i = 2; i <= nPages; i++) {
    list.innerHTML += `<li class=" mb-3" id="page${i}" onclick="pageNoOnClick('page${i}')">${i}</li>`;
  }
  list.innerHTML += `<li class=" mb-3" onclick="nextOnClick()">Next</li>
    <li class="last  mb-3" onclick="lastOnClick()">Last</li>`;
  displayPage(1);
}

function displayPage(pageNo) {
  let end = pageNo * nItemsPerPage;
  let start = end - nItemsPerPage + 1;
  // console.log(start, end, pageNo);

  let tbody = document.getElementById("table-body");
  tbody.innerHTML = "";
  for (let i = start - 1; i < end && i < totalItems; i++) {
    tbody.innerHTML += `<tr><td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td></tr>`;
  }
}
function pageNoOnClick(pageNo) {
  let prev = document.getElementsByClassName("selected");

  if (prev)
    for (let e of prev) {
      e.classList.remove("selected");
      e.style.backgroundColor = "rgb(237, 237, 237)";
      //   document.body.append(e.id, "--->", e.classList);
    }

  let page = document.getElementById(pageNo);
  page.style.backgroundColor = "rgb(86, 143, 180)";
  page.classList.add("selected");
  // console.log(page.innerText, typeof page.innerText);
  displayPage(+page.innerText);
}

function firstOnClick() {
  pageNoOnClick("page1");
}

function lastOnClick() {
  pageNoOnClick("page" + nPages);
}

function previousOnClick() {
  let selected = document.getElementsByClassName("selected");

  for (let e of selected) {
    let prevPage = +e.innerText - 1;
    //   document.body.append(prevPage);
    if (prevPage) pageNoOnClick("page" + prevPage);
  }
}

function nextOnClick() {
  let selected = document.getElementsByClassName("selected");

  for (let e of selected) {
    let nextPage = +e.innerText + 1;
    //   document.body.append(nextPage);
    if (nextPage <= nPages) pageNoOnClick("page" + nextPage);
    else lastOnClick();
  }
}
