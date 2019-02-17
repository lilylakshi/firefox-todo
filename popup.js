class ToDoItem {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
    }
}

const storageName = "toDoList";

var items = [];

function readListFromStorage() {
    items = [];
 
    var storedList = JSON.parse(localStorage.getItem(storageName));

    if(storedList == null) {
        return;
    }

    for(var i = 0; i < storedList.length; i++) {
        const item = storedList[i];
        items.push(new ToDoItem(item.title, new Date(item.dueDate)));
    }
}

function populateList() {

    readListFromStorage();

    items.sort(compareFunc);

    var list = document.getElementById("list");

    while (list.hasChildNodes())
    {
        list.removeChild(list.firstChild);
    }

    for (var i = 0, len = items.length; i < len; i++) {
    
        var item = items[i];

        var itemWrapperDiv = document.createElement("div");
        itemWrapperDiv.setAttribute("class", "itemWrapperDiv");
    
        var li = document.createElement("li");
        var itemDiv = document.createElement("div");
        var titleDiv = document.createElement("div");
        var dueDateDiv = document.createElement("div");

        var closeButton = document.createElement("a");
        closeButton.setAttribute("class", "closeButton");
        closeButton.addEventListener("click", removeToDo.bind(null, i), false);
    
        titleDiv.appendChild(document.createTextNode(item.title));
        titleDiv.setAttribute("class", "title");

        dueDateDiv.appendChild(document.createTextNode(item.dueDate.toLocaleDateString()));
        dueDateDiv.setAttribute("class", "dueDate");
    
        itemDiv.setAttribute("class", "todoItem");
        itemDiv.appendChild(titleDiv);
        itemDiv.appendChild(dueDateDiv);

        itemWrapperDiv.appendChild(itemDiv);
        itemWrapperDiv.appendChild(closeButton);
    
        li.appendChild(itemWrapperDiv);
    
        list.appendChild(li);
    }
}

function addToDo() {

    var itemNameInput = document.getElementById("itemNameInput");
    var dueDateInput = document.getElementById("dueDateInput");

    var newItem = new ToDoItem(itemNameInput.value, new Date(dueDateInput.value));

    items.push(newItem);

    localStorage.setItem(storageName, JSON.stringify(items));

    populateList();
}

function removeToDo(index, event) {
    items.splice(index, 1);

    localStorage.setItem(storageName, JSON.stringify(items));

    populateList();
}

function init() {
    populateList();

    var button = document.getElementById("addToDoButton");
    button.addEventListener("click", addToDo);
}
function compareFunc(a, b) {
    return a.dueDate.getTime() - b.dueDate.getTime();
}

init();