
// $.ajax({
//   url: "",
//   method:""
// })
// .done(function(){
//   //do something w/ data
// })
// .fail(function(){
//   //do something w/ error
// })


//READ (GET REQ)
$(document).ready(function(){
  //send req to server for data (toDoArray)
  $.ajax({
    //full url b/c server doesn't communicate w/ front end - need to give full route
    url: "http://localhost:3000/todos",
    //get or put
    method:"GET"
    //data will be returned
  })
  .done(function(dataObj){
    //Removing any pre-existing data before adding array of data
    $('ul').empty()
    //using this to list items
    dataObj.map(function(todo){
       //using ternary operator (if stmt) to determine which todo items should be lined and not lined. NEEDED b/c w/o this, server saves the isCompleted class, but HTML doesn't otherwise save the value and when browser is refreshed, all todo items will show as not completed
       let completed = todo.isComplete ? "completed" : ""

      $("ul").append(
               //data is an array of objects. Obj notation needed to refer to specific LI
        `<li data-id=${todo.id} class =${completed}>${todo.description} 
          <span><i class='far fa-trash-alt'></i></span></li>`
          //can create own custom attribute by adding adding "data-" in front of the attribute
          //Need id to reference for isComplete toggle in update b/c path includes todos/:id

      );
    })
  })  
  .fail(function(errObj){
    console.log('Issues w/ GET from backend', errObj);    
  })
})

//CREATE (POST REQ)
$("input").keypress(function(event) {
  //checking to see if Enter key pressed AND input not empty
    if (event.which === 13 && $(this).val() !== "") {
      //AJAX goes here after verification is done (IF stmt)
      $.ajax({
          url: "http://localhost:3000/todos",
          method:"POST",
          //to create, have to send data, therefore adding another key/val pair
          //this is referencing "input" above
          //data refers to the body (backend is using req.body to reference this (line 52 in server.js))
          data: {item: $(this).val()}
        })
        .done(function(dataObj){
          //this is to post - receiving a single obj
          //no need to map through like above (line 39)
          completed = dataObj.isComplete ? "completed" : ""

          $("ul").append(
              //data is an array of objects. Obj notation needed to refer to specific LI
            `<li data-id=${dataObj.id} class =${completed}>${dataObj.description} 
              <span><i class='far fa-trash-alt'></i></span></li>`
          );
          $("input").val("");
        })
        .fail(function(errObj){1
          //Do not include error object in production code. Too much info for the public. Including obj for practicing and visual purposes
          console.log("Error getting data from DELETE server", errObj);
        })
    }
  });
  
  // UPDATE (PUT)
  //event has to be on UL b/c there may not be any LIs. If on LI, would only apply to current LIs and not applied to future LIs
  $("ul").on("click", "li", function() {
    //Need to access data-id
    let thisTodoId = $(this).data('id')

    //*****need to make (this) globally available, to use in the done
    let self = this;
    
    $.ajax({
      //use variable above to reference ID, which will pass into PUT method on back end (replaces todo/:id)
      url: `http://localhost:3000/todos/${thisTodoId}`,
      method: "PUT"
    })
    .done(function(){     
      //have to use variable SELF, b/c THIS will refer to something else.  
      $(self).toggleClass("completed");
    })
    .fail(function(errObj){
      console.error('Issues w/ PUT from backend:  ', errObj.responseText); 
    })

  });
  
  // DELETE (DELETE)
  //rule for future LIs is reason for connecting to UL. see line 21
  $("ul").on("click", "span", function(event) {
    //This BUBBLES b/c span is in LI, so PUT request is being triggered as well. Use Propigation to fix
    event.stopPropagation()
    let thisTodoId = $(this).parent().data('id')
    let self = this
    
    $.ajax({
      url: `http://localhost:3000/todos/${thisTodoId}`,
      method:"DELETE"
    })
    .done(function(){
      $(self)
        .parent()
        .remove();
    })
    .fail(function(error){
      console.log("Issue w/ DELETE", error);
      
    })




  });