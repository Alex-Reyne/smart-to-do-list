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
  $('.move-item').hide();


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

  $('.item-row').on('click', function() {
    let row =  $(this).siblings('.item-row');
    $(row).slideToggle('slow');
  })

  $(".remove-item").on('click', function() {
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
