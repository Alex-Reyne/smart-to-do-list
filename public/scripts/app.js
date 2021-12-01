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
});
