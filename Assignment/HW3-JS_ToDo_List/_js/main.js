$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        // get the user input
        var user_input = $('#todo-item-input').val();
        // create an <li> element with a button using the user input
        if (user_input.trim() != '') {
        	$('#list_todo').prepend('<li> <button class="list_button"> &#9758; </button>' + user_input + '</li>');
        	$('#todo-item-input').val('');	
        }
        // $('#list_todo').prepend('<li> <button> &#9758; </button>' + user_input + '</li>');
        // $('#todo-item-input').val('');
    })
);

$("#list_todo").on('click', "button", function() {
    // move from list_todo container to list_completed container
    // change button text
    $(this).html('&#9756;')
    // get <li> container
    var complete= $(this).parent();
    // prepend to completed list
    $('#list_completed').prepend(complete);
});

$("#list_completed").on('click', "button", function() {
    // move back from list_completed container to list_todo container
    // change button text
    $(this).html('&#9758;')
    // get <li> container
    var incomplete = $(this).parent();
    // prepend to todo list
    $('#list_todo').prepend(incomplete);
});