$(document).ready(function() {
  $('.fa-check-square').hide();

  $('.fa-square').on('click', function() {
    $('.fa-square').hide();
    $('.fa-check-square').show();
  });

  $('.fa-check-square').on('click', function() {
    $('.fa-square').show();
    $('.fa-check-square').hide();
  });

});
