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
    $('#eatList').show();

  })
  $('#read').on('click', function() {
    $('#readList').show();

  })
  $('#watch').on('click', function() {
    $('#watchList').show();

  })
  $('#buy').on('click', function() {
    $('#buyList').show();

  })
});
