$(document).ready(function() {

$('select#select_category').change(function(){
    
  if ($(this).val() == 0 || $(this).val() == 1)
  {
    
    $('#product_size2').show();

  }
  else
  {
    $('#product_size2').hide();
    
  }
});

});
