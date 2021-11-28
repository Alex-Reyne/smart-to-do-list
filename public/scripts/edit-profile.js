$(document).ready(function() {

  $('#username').hide();
  $('#email').hide();
  $('#password').hide();
  $('#update-profile').hide();


  $('#edit-profile').on('click', function() {
    $('#edit-profile').slideUp();
    $('#username').slideDown();
    $('#email').slideDown();
    $('#password').slideDown();
    $('#update-profile').slideDown();
  })
  $('#update-profile').on('click', function() {
    $('#edit-profile').slideDown();
    $('#username').slideUp();
    $('#email').slideUp();
    $('#password').slideUp();
    $('#update-profile').slideUp();
  })

});
