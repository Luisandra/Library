// //OUTLINE
// // $.ajax({
// //   url: "",
// //   method:""
// // })
// // .done(function(){
// //   //do something w/ data
// // })
// // .fail(function(){
// //   //do something w/ error
// // })


        //CODE FROM TEACHER: 
const todoUrl = 'http://localhost:3000/todos'
//full url b/c server doesn't communicate w/ front end - need to give full route

// Read - GET
$(document).ready(function(){
  //send req to server for data (toDoArray)
    $.ajax({
        url: todoUrl,
        method: "GET"
        //get, put, delete, etc

        //data will be returned
    })
    .done(function(dataObj){
        $('ul').empty();
        //Removing any pre-existing data before adding array of data

        dataObj.map(function(todo){
            let completed = todo.isComplete ? "completed" : "";
            //using ternary operator (if stmt) to determine which todo items should be lined and not lined. NEEDED b/c w/o this, server saves the isCompleted class, but HTML doesn't otherwise save the value and when browser is refreshed, all todo items will show as not completed

            $('ul').append(
              //data is an array of objects. Obj notation needed to refer to specific LI

                    //can create own custom attribute by adding adding "data-" in front of the attribute
                `<li data-id=${todo.id} class=${completed}>${todo.description}<span><i class='far fa-trash-alt'></i></span></li>`
                 //Need id to reference for isComplete toggle in update b/c path includes todos/:id
            );
        })
    })
    .fail(function(errorObj){
        console.error('Issues getting create data from back end API ', errorObj);
    })
})

// Create - POST
$('input').keypress(function(event) {
    if(event.which === 13 && $(this).val() !== '') {
      //checking to see if Enter key pressed AND input not empty
      var todoItem = {
        description: $(this).val()
      }

      //AJAX goes here after verification is done (IF stmt)
      $.ajax({
        url: todoUrl,
        method: "POST",
        data: todoItem
         //to create, have to send data, therefore adding another key/val pair
          //this is referencing "input" above
          //data refers to the body (backend is using req.body to reference this (line 52 in server.js))
      })
      .done(function(newTodo){ 
        let completed = newTodo.isComplete ? "completed" : "";
        //this is to post - receiving a single obj
          //no need to map through like above (line 32 - .done of read request)
        $('ul').append(
            `<li data-id=${newTodo.id} class=${completed}>${newTodo.description}<span><i class='far fa-trash-alt'></i></span></li>`
             //data is an array of objects. Obj notation needed to refer to specific LI
        );
        $('input').val("");
      })
      .fail(function(errObj){1
        //Do not include error object in production code. Too much info for the public. Including obj for practicing and visual purposes
        console.log("Error getting data from DELETE server", errObj);
      })
    }
  });

// Update - PUT
$('ul').on('click', 'li', function(){
  //event has to be on UL b/c there may not be any LIs. If on LI, would only apply to current LIs and not applied to future LIs

    let self = this;
    //*****need to make (this) globally available, to use in the .done

    let thisTodoId = $(this).data('id')
    //Need to access data-id
    $.ajax({
        url: `${todoUrl}/${thisTodoId}`,
        //use variable above to reference ID, which will pass into PUT method on back end (replaces todo/:id)
        method: 'PUT'
    })
    .done(function(){
        $(self).toggleClass('completed');
        //have to use variable SELF, b/c THIS will refer to something else. 
    })
    .fail(err => console.log(`Issues with trying to update class: ${err}`))
});

// Delete - DELETE
//rule for future LIs is reason for connecting to UL. see line 21

$('ul').on('click', 'span', function(event){
  event.stopPropagation();
   //This BUBBLES b/c span is in LI, so PUT request is being triggered as well. Use Propigation to fix

  var self = this;
  var thisId = $(this).parent().data('id');
  var url = `${todoUrl}/${thisId}`;
  $.ajax({
      url: url,
      method: 'DELETE',
  })
  .done(function(){
      $(self).parent().remove();
  })
  .fail(function(err){
      console.log('Delete failed with error ', err)
  });
});
