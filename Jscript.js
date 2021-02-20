let tasker = {
  construct: function () {
    this.selectElement();
    this.createTask();
    this.bindEvent();
  },
  selectElement: function () {
    this.taskInput = document.getElementById("myInput");
    this.addButton = document.getElementById("addBtn");
    this.taskList = document.getElementById("myUL");
    this.taskListChildren = this.taskList.children;
  },

  createTask: function () {
    if (this.taskInput.value === "") {
      return;
    } else {
      let taskListItem = document.createElement("li");
      taskListItem.setAttribute("class", "unchecked");

      let taskButton = document.createElement("span");
      let taskTrash = document.createTextNode("\u00D7");
      taskButton.setAttribute("class", "close");

      taskButton.appendChild(taskTrash);

      let taskValue = document.createTextNode(this.taskInput.value);

      taskListItem.appendChild(taskValue);
      taskListItem.appendChild(taskButton);
      this.taskList.appendChild(taskListItem);
      this.taskInput.value = "";
      this.scanTaskList();
    }
  },

  enterKey: function (event) {
    if (event.keyCode === 13) {
      this.createTask();
    }
  },

  bindEvent: function () {
    this.addButton.onclick = this.createTask.bind(this);

    this.taskInput.onkeypress = this.enterKey.bind(this);
  },

  scanTaskList: function () {
    for (let i = 0; i < this.taskListChildren.length; i++) {
      let taskListItem = this.taskListChildren[i];
      let deleteButton = taskListItem.querySelector("#myUL > li > span");

      taskListItem.onclick = this.completeTask.bind(this, taskListItem);
      deleteButton.onclick = this.deleteTaskList.bind(this, i);
    }
  },

  completeTask: function (taskListItem) {
    taskListItem.classList.toggle("checked");
  },

  deleteTaskList: function (i) {
    this.taskListChildren[i].remove();
    this.scanTaskList();
  },
};
