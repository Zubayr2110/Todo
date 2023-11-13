document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  if (taskText === "") {
      alert("Please enter a task!");
      return;
  }

  var tasksList = document.getElementById("tasks");
  var li = document.createElement("li");
  li.innerHTML = taskText + '<span class="delete" onclick="removeTask(this)">Delete</span>';
  tasksList.appendChild(li);

  saveTasks();

  taskInput.value = "";
}

function removeTask(element) {
  var li = element.parentElement;
  li.remove();

  saveTasks();
}

function saveTasks() {
  var tasksList = document.getElementById("tasks");
  var tasks = [];

  for (var i = 0; i < tasksList.children.length; i++) {
      tasks.push(tasksList.children[i].innerText.replace('Delete', '').trim());
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var tasksList = document.getElementById("tasks");
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = tasks[i] + '<span class="delete" onclick="removeTask(this)">Delete</span>';
      tasksList.appendChild(li);
  }
}