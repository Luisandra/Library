

var toDos = [];
var input = prompt("What would you like to do? (New, List, Quit)");


 
 while(input !=="quit") {
    //handle input
    if (input === "list") {
        displayList();
    } 
    else if (input === "new"){
        addListItem();
    }
    else if (input === "delete") {
        deleteListItem();
    }
    //ask again for new input
    input = prompt("What would you like to do?");
 }
 console.log("Bye!");

 function displayList () {
    console.log("**********");
    toDos.forEach(function (listItem, i) {
        console.log(i + ": " + listItem);
    })
    console.log("**********")  ;
 }

 function addListItem() {
    //ask for new todo
    var newTodo = prompt("Enter new To Do");
    //add to array
    toDos.push(newTodo);
 }

 function deleteListItem() {
     //ask for input to be deleted
     var item = prompt("Which item would you like to remove?");
     //determine the index and delete
     toDos.splice(toDos.indexOf(item), 1);
 }