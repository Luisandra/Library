const todoUrl = 'http://localhost:3000/todos'

// Read - GET
$(document).ready(function(){
    $.ajax({
        url: todoUrl,
        method: "GET"
    })
    .done(function(dataObj){
        $('ul').empty();
        dataObj.map(function(todo){
            let completed = todo.isComplete ? "completed" : "";
            $('ul').append(
                `<li data-id=${todo.id} class=${completed}>${todo.description}<span><i class='far fa-trash-alt'></i></span></li>`
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
      var todoItem = {
        description: $(this).val()
      }
      $.ajax({
        url: todoUrl,
        method: "POST",
        data: todoItem
      })
      .done(function(newTodo){ 
        let completed = newTodo.isComplete ? "completed" : "";
        $('ul').append(
            `<li data-id=${newTodo.id} class=${completed}>${newTodo.description}<span>X</span></li>`
        );
        $('input').val("");
      })
    }
  });

// Update - PUT
$('ul').on('click', 'li', function(){
    let self = this;
    let thisTodoId = $(this).data('id')
    $.ajax({
        url: `${todoUrl}/${thisTodoId}`,
        method: 'PUT'
    })
    .done(function(){
        $(self).toggleClass('completed');
    })
    .fail(err => console.log(`Issues with trying to update class: ${err}`))
});

// Delete - DELETE
$('ul').on('click', 'span', function(event){
  event.stopPropagation();
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
