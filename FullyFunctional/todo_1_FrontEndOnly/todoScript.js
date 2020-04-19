$("input").keypress((event)=>{
    if (event.which === 13 && $(this).val() !== ""){
        var todoItem = $(this).val();
        $("ul").append(`<li>${todoItem}<span><i class='far fa-trash-alt'></i></span></li>`);

        //reset input
        $("input").val("");
    }
});

//put click event on UL so it will apply to LI not yet created
$("ul").on("click", "li", ()=>{
    $(this).toggleClass("completed");
});

$("ul").on("click", "span", ()=>{
    $(this).parent().remove();
});