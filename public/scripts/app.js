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

  $('.item-name').on('click', function() {
    const className = $(this).attr('class')
    let slice = className.replace(/[^0-9]/g, '')

    $(this).siblings(`.${slice}`).slideToggle('slow');
  })

  $(".mo-1").on('click', function() {
    const row = $(this).parent().parent().parent().parent();
    console.log('ROW: ', row.attr('id'));
    $(row).appendTo("#watch");

    $.ajax({
      method: 'POST',
      url: '/move',
      data: { list_id: 1, item_id: row.attr('id')}
    })
      .then((res) => {
        console.log('Response from backend: ', res);
        $(row).remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        location.reload();
       })
  });

  $(".mo-2").on('click', function() {
    const row = $(this).parent().parent().parent().parent()
    console.log('ROW: ', row.attr('id'))
    $(row).appendTo("#eat");

    $.ajax({
      method: 'POST',
      url: '/move',
      data: { list_id: 2, item_id: row.attr('id')}
    })
      .then((res) => {
        console.log('Response from backend: ', res);
        $(row).remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
       location.reload();
      })
  });

  $(".mo-3").on('click', function() {
    const row = $(this).parent().parent().parent().parent()
    console.log('ROW: ', row.attr('id'))
    $(row).appendTo("#read");

    $.ajax({
      method: 'POST',
      url: '/move',
      data: { list_id: 3, item_id: row.attr('id')}
    })
      .then((res) => {
        console.log('Response from backend: ', res);
        $(row).remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        location.reload();
       })
  });

  $(".mo-4").on('click', function() {
    const row = $(this).parent().parent().parent().parent()
    console.log('ROW: ', row.attr('class'))


    $.ajax({
      method: 'POST',
      url: '/move',
      data: { list_id: 4, item_id: row.attr('id')}
    })
      .then((res) => {
        console.log('Response from backend: ', res);
        $(row).remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
       location.reload();
      })
  });

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
