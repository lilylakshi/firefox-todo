class ToDoItem {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
    }
}

const storageName = "toDoList";

var itemsBackup = [
    new ToDoItem("Get Coffee", "14-01-2019"),
    new ToDoItem("Buy Tea", "21-01-2019"),
    new ToDoItem("Drink Milk", "28-01-2019"),
    new ToDoItem("Sleep All Day", "04-02-2019")
];

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
    
        var li = document.createElement("li");
        var itemDiv = document.createElement("div");
        var titleDiv = document.createElement("div");
        var dueDateDiv = document.createElement("div");

        var closeButton = document.createElement("button");
        closeButton.appendChild(document.createTextNode("Remove"));
        closeButton.addEventListener("click", removeToDo.bind(null, i), false);
    
        titleDiv.appendChild(document.createTextNode(item.title));
        dueDateDiv.appendChild(document.createTextNode(item.dueDate.toLocaleDateString()));
    
        itemDiv.appendChild(titleDiv);
        itemDiv.appendChild(dueDateDiv);
        itemDiv.appendChild(closeButton);
    
        li.appendChild(itemDiv);
    
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