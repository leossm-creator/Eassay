import Navigation from './components/navigation';

// Navigation

const links = document.querySelectorAll('.top_nav > ul > li > a');
const pages = document.querySelectorAll('.page_container');

var nav = new Navigation(links, pages);

// nav.getLinks();

nav.links.forEach(function(link){
    link.addEventListener('click', function() {
      let pageId = nav.getHash(link);
      nav.setPage(pageId);
    })
})

const subLinks = document.querySelectorAll('.sub_nav > ul > li > a');
const subPages = document.querySelectorAll('.sub_page_container');

var subNav = new Navigation(subLinks, subPages);

subNav.links.forEach((link) => {
  link.addEventListener('click', function() {
    let pageId = subNav.getHash(link);
    subNav.setPage(pageId);
  })
})


// Task list 
const form = document.getElementById("taskForm");
const button = document.getElementById("button");
const tasks = document.getElementById("taskList");

var taskDescription = document.getElementById("td");
var dueDate = document.getElementById("dd");
var completionTime = document.getElementById("ct");
var priorityRating = document.getElementById("pr");
var estimatedTime = document.getElementById("et");
var completionStatus = document.getElementById("cs");

button.addEventListener("click", function(event) {
  event.preventDefault();
  let td = taskDescription.value;
  let dd = String(dueDate.value);
  let ct = String(completionTime.value);
  let pr = priorityRating.options[priorityRating.selectedIndex].value;
  let et = estimatedTime.value;
  let cs = completionStatus.value;
  addTask(td,dd,ct,pr,et,cs);
  console.log(taskList);
})

var taskList = [];

function addTask(taskDescription, dueDate, completionTime, priorityRating, estimatedTime, completionStatus) {
  let task = {
    taskDescription,
    dueDate,
    completionTime,
    priorityRating,
    estimatedTime,
    completionStatus
  }
  taskList.push(task);
  showTask(task);
}

function showTask(task) {
  // let item = document.createElement("ul");
  // item.innerHTML  = "<p>" + task.taskDescription + "</p>";
  // let itemDd = document.createElement("li");
  // itemDd.innerHtml = "<h5>" + task.dueDate + "</h5>";
  // let itemCt = document.createElement("li");
  // itemCt.innerHTML = "<p>" + task.completionTime + "</p>";
  // let itemPr = document.createElement("li");
  // itemPr.innerHTML = "<p>" + task.priorityRating + "</p>";
  // let itemEt = document.createElement("li");
  // itemEt.innerHTML = "<p>" + task.estimatedTime + "</p>";
  // let itemCs = document.createElement("li");
  // itemCs.innerHTML = "<p>" + task.completionStatus + "</p>";

  // Build the HTML structure into a single element
  let item = document.createElement("ul");
  item.innerHTML  = "<h4>Task Due: " + task.dueDate + " @ " + task.completionTime + "</h4>" +
  "<p>Priority: <strong>" + task.priorityRating + "</strong></p><p>" + task.taskDescription + "</p><p>This will take you: <em>" + task.estimatedTime + " hours</em></p>";


  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete Task");
  delButton.appendChild(delButtonText);

  delButton.addEventListener("click", function(event){
    event.preventDefault();
    item.remove();
  })

  // item.appendChild(itemDd);
  // item.appendChild(itemCt);
  // item.appendChild(itemPr);
  // item.appendChild(itemEt);
  // item.appendChild(itemCs);
  item.appendChild(delButton);

  tasks.appendChild(item);

  form.reset();
}