import TaskStorage from './taskStorage.js';
import LabelStorage from './labelStorage.js';
import '../libraries/jkanban.min.js';

const taskWrapper = document.getElementById("taskWrapper");
const taskAll = document.getElementById("taskgrid");
const form = document.getElementById("taskForm");
const tasks = document.getElementById("taskList");

var taskDescription = document.getElementById("td");
var dueDate = document.getElementById("dd");
var completionTime = document.getElementById("ct");
var priorityRating = document.getElementById("pr");
var estimatedTime = document.getElementById("et");
var labelName = document.getElementById("newLabelInput");
var labelColour = document.getElementById("labelColourInput");
// var completionStatus = document.getElementById("cs");

// var y = priorityRating.options;
// var x = priorityRating.selectedIndex;
// var prIndex = priorityRating.options[priorityRating.selectedIndex].index;

Date.prototype.toDateInputValue = (function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
});

// dueDate.value = new Date().toDateInputValue();


const addBtn = document.getElementById('addBtn');
const addPage = document.getElementById('addTask');
const uploadBtn = document.getElementById('uploadBtn');
const closeBtn = document.getElementById('closeAdd');

const taskBtn = document.querySelector('.task_btn');
const kanban = document.getElementById('kanban');

let taskOpen = false;
// Event Listener: Task List Open
taskBtn.addEventListener('click', () => {
  if (!taskOpen) {
    taskBtn.classList.add('open');
    taskAll.classList.add('open');
    taskWrapper.classList.add('open');
    kanban.classList.add('open');
    taskOpen = true;
  } else {
    taskBtn.classList.remove('open');
    taskAll.classList.remove('open');
    taskWrapper.classList.remove('open');
    kanban.classList.remove('open');
    taskOpen = false;
  }
})

// close Task List when main page is clicked
kanban.onclick = function () {
  if (taskOpen) {
    taskBtn.classList.remove('open');
    taskAll.classList.remove('open');
    taskWrapper.classList.remove('open');
    kanban.classList.remove('open');
    taskOpen = false;
  }
}

// close Add Tasks when Task Grid is clicked
taskAll.onclick = function () {
  if (addOpen) {
    addPage.classList.remove('open');
    addBtn.classList.remove('open');
    uploadBtn.classList.remove('open');
    addOpen = false;
  }
}


let addOpen = false;
// Event Listener: Open Add Page
addBtn.addEventListener('click', () => {
  if (!addOpen) {
    addPage.classList.add('open');
    addBtn.classList.add('open');
    uploadBtn.classList.add('open');
    addOpen = true;
  }
})

// Event Listener: Close Add Page
closeBtn.addEventListener('click', () => {
  if (addOpen) {
    addPage.classList.remove('open');
    addBtn.classList.remove('open');
    uploadBtn.classList.remove('open');
    addOpen = false;
  }
})


// Event Listener: Upload Tasks
uploadBtn.addEventListener("click", function (event) {
  if (addOpen) {
    event.preventDefault();
    let td = taskDescription.value;
    let dd = String(dueDate.value);
    let ct = String(completionTime.value);
    let pr = priorityRating.options[priorityRating.selectedIndex].value;
    let prIndex = priorityRating.options[priorityRating.selectedIndex].index;
    let et = estimatedTime.value;
    let cs = false;
    let label = {
      name: labelName.value,
      colour: labelColour.value
    }

    addTask(td, dd, ct, pr, prIndex, et, cs, label);
    console.log(taskList);
    // console.log(y[x].index);
    // console.log(prIndex);
  }
})


// var taskList = [];

// localStorage.setItem('tasks', JSON.stringify(taskList));

// Object.keys(localStorage).forEach(function (key) {
//   let task = localStorage.getItem(key);
//   let taskObj = JSON.parse(task);
//   showTask(taskObj);
// });

// Object.keys(localStorage).forEach(function (key) {
//   let task = localStorage.getItem(key);
//   let taskObj = JSON.parse(task);
//   showTask(taskObj);
// });



// Task Storage
const taskStorage = new TaskStorage();
const taskList = taskStorage.tasks;

// Label Storage
const labelStorage = new LabelStorage();
const labelList = labelStorage.labels;

taskList.forEach((element) => {
  showTask(element);
})

const labelDropdown = document.getElementById('taskLabelDropdown');

function updateLabelDropdown() {
  labelList.forEach((element) => {
    let labelSelect = document.createElement('li');
    let labelBtn = document.createElement('button');
    labelBtn.classList.add('btn');
    labelBtn.classList.add('nav_btn');
    labelBtn.classList.add('dropdown-item');
    labelBtn.classList.add('label_btns');
    labelBtn.innerHTML = element.name.toString();
  
    // add Delete Button
    let delButton = document.createElement("button");
    // // let delButtonText = document.createTextNode("X");
    // delButton.appendChild(delButtonText);
  
    delButton.setAttribute('class', "btn-close");
    delButton.classList.add('deleteBtn');
  
    delButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (confirm('Are you sure you want to delete this label from task labels?')) {
        labelStorage.delete(element);
        labelSelect.remove();
      }
    })
  
    labelSelect.appendChild(labelBtn);
    labelSelect.appendChild(delButton);
    labelDropdown.appendChild(labelSelect);
  })
}

updateLabelDropdown();

function addTask(taskDescription, dueDate, completionTime, priorityRating, priorityRatingIndex, estimatedTime, completionStatus, label) {
  let task = {
    id: Date.now(),
    taskDescription,
    dueDate,
    completionTime,
    priorityRating,
    priorityRatingIndex,
    estimatedTime,
    completionStatus,
    label
  }

  if (document.forms["taskForm"]["taskName"].value == "") {
    alert("Task Description must be filled out");
    return false;
  } 
  
  // else if (labelStorage.labelIsNew(task.label)) {

  //   let key = (task.taskDescription).toString();
  //   // let value = JSON.stringify(task);

  //   // if (localStorage.getItem(key) === null) {
  //   //   localStorage.setItem(key, value);
  //   //   showTask(task);
  //   if (taskStorage.getIndexByName(key)  === -1) {
  //     taskStorage.create(task, key);
  //     showTask(task);
  //     // updateLabelDropdown();
  //   } else {
  //     alert("Task " + key + " is already exists in the list")
  //   }
  
  // }
   else {
    let key = (task.taskDescription).toString();
    // let value = JSON.stringify(task);

    // if (localStorage.getItem(key) === null) {
    //   localStorage.setItem(key, value);
    //   showTask(task);
    if (taskStorage.getIndexByName(key)  === -1) {
      taskStorage.create(task, key);
      showTask(task);
      // updateLabelDropdown();
    } else {
      alert("Task " + key + " is already exists in the list")
    }
  }
}

function updateEmpty() {
  if (taskList.length > 0) {
    document.getElementById('emptyTaskList').style.display = 'none';
  } else {
    document.getElementById('emptyTaskList').style.display = 'block';
  }
}

// Add created labels in LabelStorage to dropdown list

// Event Listener for label buttons in dropdown list

const labelBtns = document.querySelectorAll(".label_btns");

for (let i=0; i < labelBtns.length; i++) {
  labelBtns[i].addEventListener('click', function(e) {
    let labelTitle = e.currentTarget.innerHTML;
    console.log(labelTitle.toString());
    document.getElementById("newLabelInput").value = labelTitle.toString();
    let colour = labelStorage.getColour(labelTitle.toString());
    document.getElementById("labelColourInput").value = colour;
  })
}

// function updateLabel(label) {
//     let labelSelect = document.createElement('li');
//     let labelBtn = document.createElement('button');
//     labelBtn.classList.add('btn');
//     labelBtn.classList.add('nav_btn');
//     labelBtn.classList.add('dropdown-item');
//     labelBtn.innerHTML = label.name.toString();
//     labelSelect.appendChild(labelBtn);
//     labelDropdown.appendChild(labelSelect);
// }

function showTask(task) {
  updateEmpty();

  let item = document.createElement("div");
  item.setAttribute('class', 'card');
  item.classList.add('task_item');
  item.setAttribute('data-id', task.id);

  let item_body = document.createElement('div');
  item_body.setAttribute('class', 'card-body');

  let item_top = document.createElement("div");

  let item_title = document.createElement("h5");
  item_title.setAttribute('class', 'card-title');
  item_title.setAttribute('style', 'inline-block');
  item_title.appendChild(document.createTextNode(task.taskDescription));

  let doneBtn = document.createElement('button');
  doneBtn.setAttribute('type', 'button');
  doneBtn.classList.add('btn');
  doneBtn.classList.add('btn-outline-success');

  item_top.appendChild(doneBtn);
  item_top.appendChild(item_title);

  item_body.appendChild(item_top);

  // Add details only when they exist
  if (task.hasOwnProperty('label') && task['label']) {
    // let lb = document.createElement("div");
    // lb.setAttribute('class', 'task_details');
    // lb.innerHTML = '<i class="fas fa-tag"></i>';

    // if (labelStorage.getIndex(task.label) !== -1) {
    //   alert("Choose another label")
    // } else {
      labelStorage.create(task.label, task.label.name, task.label.colour);
      let labelName = task.label.name;
      let labelNameString = labelName.toString();
      let item_tag = document.createElement('span');
      item_tag.setAttribute('class', 'badge');
      item_tag.setAttribute('id', labelNameString);
      item_tag.appendChild(document.createTextNode(labelName));
      item_tag.style.backgroundColor = task.label.colour;
      item_body.appendChild(item_tag);
  }

  if (task.hasOwnProperty('dueDate') && task['dueDate']) {
    let dd = document.createElement("div");
    dd.setAttribute('class', 'task_details');
    dd.innerHTML = '<i class="far fa-calendar"></i>';

    let item_dd = document.createElement("p");
    item_dd.setAttribute('class', 'card-text');
    item_dd.appendChild(document.createTextNode(task.dueDate));

    dd.appendChild(item_dd);
    item_body.appendChild(dd);
  }

  if (task.hasOwnProperty('priorityRating') && task['priorityRating']) {
    let pr = document.createElement("div");
    pr.setAttribute('class', 'task_details');

    if (task['priorityRating'] == "Low") {
      pr.classList.add("low_pr");
    }
    else if (task['priorityRating']) {
      pr.classList.add("medium_pr");
    }
    else if (task['priorityRating']) {
      pr.classList.add("high_pr");
    }
    pr.innerHTML = '<i class="fas fa-flag"></i>';

    let item_pr = document.createElement("p");
    item_pr.setAttribute('class', 'card-text');
    // item_pr.innerHTML('<i class="fas fa-flag"></i>');
    item_pr.appendChild(document.createTextNode(task.priorityRating));

    pr.appendChild(item_pr);
    item_body.appendChild(pr);
  }


  // add estimated time input when theres an input value
  // let etInput = document.forms["taskForm"]["estimatedTime"].value;
  // if (etInput !== "") {
  //   let et = document.createElement("div");
  //   et.setAttribute('class', 'task_details');
  //   et.innerHTML = '<i class="far fa-clock"></i>';

  //   let item_et = document.createElement("p");
  //   item_et.setAttribute('class', 'card-text');
  //   item_et.appendChild(document.createTextNode(task.estimatedTime + " hours"));

  //   et.appendChild(item_et);
  //   item_body.appendChild(et);
  // }

  if (task.hasOwnProperty('estimatedTime') && task['estimatedTime']) {
    let et = document.createElement("div");
    et.setAttribute('class', 'task_details');
    et.innerHTML = '<i class="far fa-clock"></i>';

    let item_et = document.createElement("p");
    item_et.setAttribute('class', 'card-text');
    item_et.appendChild(document.createTextNode(task.estimatedTime + " hours"));

    et.appendChild(item_et);
    item_body.appendChild(et);
  }
  

  item.appendChild(item_body);


  let buttons = document.createElement("div");
  buttons.classList.add("btn-group");
  buttons.classList.add("btn-group-sm");
  buttons.classList.add("task_buttons");
  buttons.setAttribute("role", "group");

  // add Delete Button
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);

  delButton.setAttribute('class', "btn btn-outline-danger");
  delButton.classList.add('deleteBtn');

  delButton.addEventListener("click", function (event) {
    event.preventDefault();
    // let id = event.target.parentElement.getAttribute('data-id');
    // let index = taskList.findIndex(task => task.id === Number(id));
    // removeItemFromArray(taskList, index);
    // console.log(taskList);

    if (confirm('Are you sure you want to delete this task from task list?')) {
    // localStorage.removeItem(task.taskDescription.toString());
    taskStorage.delete(task.taskDescription.toString());
    item.remove();
    updateEmpty();
    }
  })

  // Create "Move to Kanban" Button
  let moveButton = document.createElement("button");
  let moveButtonText = document.createTextNode("To Do");
  moveButton.appendChild(moveButtonText);

  moveButton.setAttribute('class', "btn btn-outline-primary");
  moveButton.classList.add("moveBtn");

  moveButton.addEventListener("click", function(event) {
    event.preventDefault();
    let element = {
      id: task.taskDescription,
      title: task.taskDescription
    }

    kanbanBoard.addElement("toDo", element);
  })


  // item.appendChild(itemDd);
  // item.appendChild(itemCt);
  // item.appendChild(itemPr);
  // item.appendChild(itemEt);
  // item.appendChild(itemCs);
  buttons.appendChild(moveButton);
  buttons.appendChild(delButton);
  item.appendChild(buttons);

  tasks.appendChild(item);

  form.reset();
}

// Helper functions

function compareDueDate(a, b) {
  if (a.dueDate < b.dueDate) {
    return -1;
  } else if (a.dueDate > b.dueDate) {
    return 1;
  } else {
    return 0;
  }
}

function comparePriority(a, b) {
  if (a.priorityRatingIndex < b.priorityRatingIndex) {
    return -1;
  } else if (a.priorityRatingIndex > b.priorityRatingIndex) {
    return 1;
  } else {
    return 0;
  }
}

function compareEstimatedTime(a, b) {
  if (a.estimatedTime < b.estimatedTime) {
    return -1;
  } else if (a.estimatedTime > b.estimatedTime) {
    return 1;
  } else {
    return 0;
  }
}


function removeItemFromArray(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }

  return arr;
}

// Kanban Board

var columns = [
  {id: 'toDo', title: "To Do", item: []},
  {id: 'inProgress', title:"In Progress", item: []},
  {id: 'done', title: "Done", item: []}
];

var kanbanBoard = new jKanban({
  element          : '#myKanban',                                           // selector of the kanban container
  // gutter           : '15px',                                       // gutter of the board
  // widthBoard       : '250px',                                      // width of the board
  responsivePercentage: true,                                    // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
  dragItems        : true,                                         // if false, all items are not draggable
  boards           : columns,                                           // json of boards
  dragBoards       : true,                                         // the boards are draggable, if false only item can be dragged
  itemAddOptions: {
      enabled: false,                                              // add a button to board for easy item creation
      content: '+',                                                // text or html content of the board button   
      class: 'kanban-title-button btn btn-default btn-xs',         // default class of the button
      footer: false                                                // position the button on footer
  },    
  itemHandleOptions: {
      enabled             : false,                                 // if board item handle is enabled or not
      handleClass         : "item_handle",                         // css class for your custom item handle
      customCssHandler    : "drag_handler",                        // when customHandler is undefined, jKanban will use this property to set main handler class
      customCssIconHandler: "drag_handler_icon",                   // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
      customHandler       : "<span class='item_handle'>+</span> %title% "  // your entirely customized handler. Use %title% to position item title 
                                                                           // any key's value included in item collection can be replaced with %key%
  },
  click            : function (el) {},                             // callback when any board's item are clicked
  context          : function (el, event) {},                      // callback when any board's item are right clicked
  dragEl           : function (el, source) {},                     // callback when any board's item are dragged
  dragendEl        : function (el) {},                             // callback when any board's item stop drag
  dropEl           : function (el, target, source, sibling) {},    // callback when any board's item drop in a board
  dragBoard        : function (el, source) {},                     // callback when any board stop drag
  dragendBoard     : function (el) {},                             // callback when any board stop drag
  buttonClick      : function(el, boardId) {}                      // callback when the board's button is clicked
});
