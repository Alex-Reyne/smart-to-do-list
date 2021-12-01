// Client facing scripts here


// Get text from textarea form
// search for specific words
// if word is found (eat)
//add list item to eat list.


//

$(document).ready(function() {
  $('#eatList').hide();
  $('#readList').hide();
  $('#watchList').hide();
  $('#buyList').hide();


  $('#eat').on('click', function() {
    $('#eatList').slideToggle('slow');
  })

  $('#read').on('click', function() {
    $('#readList').slideToggle('slow');

  })

  $('#watch').on('click', function() {
    $('#watchList').slideToggle('slow');
  })

  $('#buy').on('click', function() {
    $('#buyList').slideToggle('slow');

  })

  $(".remove-item").on('click', function(){
    // const classId = $(this).parent().attr();
    // console.log(document.getElementById(`#${classId}`))
    // console.log($(this).innerHTML) ;
    // console.log(document.getElementsByClassName('.task').innerHTML) ;
    // let rowId = $(this).parent().attr('row-id'); //Pull the attribute from your button
    let row =  $(this).parent(); //Define the TR itself

    $.ajax({
      method: 'POST',
      url: '/delete',
      data: { id: row.attr('id') }
    })
      .then((res) => {
        console.log('Response from backend: ', res);
        row.remove();
      })
      .catch((err) => {
        console.log(err);
      })
});

});
