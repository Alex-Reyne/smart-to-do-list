$(document).ready(function() {

  $('#edit-username').hide();
  $('#edit-email').hide();
  $('#edit-password').hide();
  $('#update-profile').hide();


  $('#edit-profile').on('click', function() {
    $('#edit-profile').hide();
    $('#edit-username').slideDown();
    $('#edit-email').slideDown();
    $('#edit-password').slideDown();
    $('#update-profile').show();
  })

  $('#update-profile').on('click', function() {
    $('#edit-profile').show();
    $('#edit-username').slideUp();
    $('#edit-email').slideUp();
    $('#edit-password').slideUp();
    $('#update-profile').hide();
  })

});
