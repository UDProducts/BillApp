var x;
function remove_fields(link) {
 //alert($(link).prev("input[type=hidden]").val());
  $(link).prev("input[type=hidden]").val("1");
 
  $(link).closest(".items_input_fields").hide();
  $(link).prev().prev().prev().prev().prev("input[type=text]").val('0'); 
  $('input#bill_amount').val($('div.items_input_fields input.item_amount').sumValues());
}

$(document).ready(function() {

  var $x=0;

  $("input#product_name").change(function() {
  });  
 
  $('div.items_input_fields input').live('keyup', function() {
  	$('input#bill_amount').val($('input.item_amount').sumValues());
  });
  
  // 115 => S, 19 => Enter
  $(window).keyup(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    $('#new_bill').submit();
    event.preventDefault();
    
    return false;
  });

  $('div.items_input_fields input.item_length').live('keyup',function() {
    var $length = parseFloat($(this).val(), 10);
       // <ul class="item_headers_group">

    var $rate_id = $(this).data("rate-id");
    var $rate = parseFloat($("#"+$rate_id).val(), 10);
    // var $rate = $(this).prev().val();
    
    if(isNaN($rate)) {
      $rate = 1
    }
    
    var $size1_id = $(this).data("size1-id");
    //var $size1 =parseFloat($(this).prev().prev().prev().prev().val());
    
    var $size2_id = $(this).data("size2-id");
    //var $size2 = parseFloat($(this).prev().prev().prev().val());
    
    //var $length_id = $(this).data("length-id");
    //var $length = parseFloat($("#"+$length_id).val(), 10);
    var $quantity_id = $(this).data("quantity-id");
    //var $quantity = parseFloat($(this).prev().prev().val()); 
    
    var $metric_id = $(this).data("metric-id");
  //  var $metric = parseFloat($(this).next().next().val()); 
    
    var $amount_id = $(this).data("amount-id");
    /*alert("metric= "+$metric);
    alert("rate= "+$rate);
    alert("length= "+$length);
    alert("size1= "+$size1);
    alert("size2= "+$size2);
    alert("quantity= "+$quantity);
    alert("v = "+ ($length*$quantity/144)*$size1*$size2*$rate);*/
    //alert("val="+(($length*$quantity)/144)*$size1*$size2*$rate));
    switch($metric)
    {
      case 1 :
        if(isNaN((($length*$quantity)/144)*$size1*$size2*$rate)) {
          $(this).next().val(0);
        }else{
          $(this).next().val((($length*$quantity)/144)*$size1*$size2*$rate).toFixed(2);
        }
        break;
      case 2 :
        if(isNaN($size1*$rate*$size2*$quantity)) {
          $(this).next().val(0);
        }else{
         $(this).next().val($size1*$rate*$size2*$quantity).toFixed(2);
        }
        break;	
      case 3 :
        if(isNaN($size1*$rate*$quantity)) {
          $(this).next().val(0);
        }else{
          $(this).next().val($size1*$rate*$quantity).toFixed(2);
        }
        break;
    }

   // alert ($(this).next().val()) ;
$('input#bill_amount').val(parseFloat($('div.items_input_fields input.item_amount').sumValues()));

  });

  /*$('div.items_input_fields input.item_length').live('keyup',function() {
    var $length = parseFloat($(this).val(), 10).toFixed(2);
    var $rate = parseFloat($(this).prev().val(),10).toFixed(2);
    var $amount_id = $(this).data("amount-id");
    
    if(isNaN($rate*$length)) {
      $("#"+$amount_id).val(0);
    }else{
      $("#"+$amount_id).val(parseFloat($rate*$length).toFixed(2));
    }   
  });*/
$('div.items_input_fields input.item_vat').live('keyup',function() {
    var $vat = $(this).val();
    var $length_id = $(this).data("length-id");
    var $length = parseFloat($("#"+$length_id).val(), 10);
    var $rate_id = $(this).data("rate-id");
    var $rate = parseFloat($("#"+$rate_id).val(), 10);
    //alert($vat);
    var $amount_id = $(this).data("amount-id");
    var $amount = $("#"+$amount_id).val();
    //alert($amount);
    var $vatamt = parseFloat(($vat * $length *$rate)/100);
    $(this).next().val($vatamt);
     //alert(parseFloat($vatamt)+parseFloat($amount));
    if(isNaN(parseFloat($vatamt)+parseFloat($length * $rate))) {
      $("#"+$amount_id).val(0);
    }else{
      $("#"+$amount_id).val((parseFloat($vatamt)+parseFloat($length * $rate)).toFixed(2));
    }   
  });

  $('input#bill_advance').live('keyup', function() {
    var $advance = parseFloat($('input#bill_advance').val(), 10).toFixed(2);
    var $amount = parseFloat($('input#bill_amount').val(), 10).toFixed(2);
    //var $dues = parseFloat($('input#customer_dues').val(), 10).toFixed(2);
    
    if(isNaN($amount - $advance)) {
   	  parseFloat($('input#bill_balance').val(0)).toFixed(2);
    }else{
   	  ($('input#bill_balance').val(parseFloat($amount - $advance).toFixed(2)));
    }
    
  
   });

  $('input#bill_advance').live('keydown',function(e) {
   var keyCode = e.keyCode || e.which; 

  if (keyCode == 9) { 
    e.preventDefault(); 
    var $dues = parseFloat($('input#customer_dues').val()).toFixed(2);
    // alert($dues);
    // alert($dues);
    if(isNaN($dues)) {
   	  parseFloat($('input#customer_dues').val($('input#bill_balance').val())).toFixed(2);
    }else{
   	  $('input#customer_dues').val((parseFloat($('input#bill_balance').val())+parseFloat($dues)));
    }
    
    
  } 
  

   });

 
  $('input#bill_vat').live('keyup', function() {
    $('input#bill_amount').val(parseFloat($('div.items_input_fields input.item_amount').sumValues()));
   // var $bill_amount = parseFloat($('input#bill_amount').val(), 10);
    //var $bill_vat = parseFloat($('input#bill_vat').val(), 10);
    //var $vat_amount = parseFloat($bill_amount * $bill_vat / 100, 10);

    //var $int_vamount = parseFloat($vat_amount, 10).toFixed(2);
    var $bill_amount = parseFloat($('input#bill_amount').val());
    var $bill_vat = parseFloat($('input#bill_vat').val());
    var $vat_amount = parseFloat($bill_amount * $bill_vat / 100);
    var $int_vamount = parseFloat($vat_amount);
    //alert($int_vamount + $bill_amount);
    if(isNaN($int_vamount + $bill_amount)) {
     	$('input#bill_amount').val($bill_amount);
    }else{
    	$('input#bill_amount').val(parseFloat($int_vamount + $bill_amount).toFixed(2));
    }
  });

$('input#bill_discount').live('keyup', function() {
    var $bill_amount = parseFloat($('input#bill_amount').val());
    var $bill_discount = parseFloat($('input#bill_discount').val());
    //alert($int_vamount + $bill_amount);
    if(isNaN( $bill_amount - $bill_discount)) {
     	$('input#bill_amount').val($bill_amount);
    }else{
    	$('input#bill_amount').val(parseFloat( $bill_amount - $bill_discount).toFixed(2));
    }
  });

  $.fn.sumValues = function() {
  	var sum = 0; 
  	this.each(function() {
      if ( $(this).is(':input') ) {
  			var val = $(this).val();
  		} else {
  			var val = $(this).text();
  		}
  		sum += parseFloat( ('0' + val).replace(/[^0-9-\.]/g, ''), 10 );
  	});
  	return sum;
  };


  $("span#remove").live("keyup", function(e){
    var rand=Math.floor((Math.random()*100000)+1).toString();
    if (e.which == 9 ||e.keyCode == 9 ) 
    {  e.preventDefault();
      add_fields(this, "items", "<div class=\"items_input_fields\" id=\"item_val\" >\n  \n  <input class=\"input-small\" data-autocomplete=\"/products/autocomplete_product_code\" data-update-elements=\"{&quot;name&quot;:&quot;#product_name"+rand+"&quot;,&quot;size1&quot;:&quot;#product_size1"+rand+"&quot;,&quot;size2&quot;:&quot;#product_size2"+rand+"&quot;,&quot;category&quot;:&quot;#product_metric"+rand+"&quot;}\" id=\"product_code"+rand+"\" name=\"bill[items_attributes][new_items][product_code]\" placeholder=\"Type code here\" size=\"30\" type=\"text\" /> \n\n <input class=\"input-large item_product_name\" id=\"product_name"+rand+"\" name=\"product_name"+rand+"\" size=\"30\" type=\"text\" placeholder=\"Product Name\" readonly=\"readonly\" \/>\n\n <input class=\"input-small item_product_size1\" id=\"product_size1"+rand+"\" name=\"product_size1"+rand+"\" size=\"30\" type=\"hidden\"  readonly=\"readonly\" \/>\n\n<input class=\"input-small item_product_size2\" id=\"product_size2"+rand+"\" name=\"product_size2"+rand+"\" size=\"30\" type=\"hidden\" readonly=\"readonly\" \/>\n\n <input class=\"input-small \" id=\"sold_qty"+rand+"\"  name=\"bill[items_attributes][new_items][sold_qty]\" size=\"30\" type=\"text\" placeholder=\"Sold Quantity\" \/> <input class=\"input-small item_rate\" id=\"item_rate"+rand+" \" size=\"30\" type=\"text\" placeholder=\"Rate\" data-metric-id=\"product_metric"+rand+"\" data-length-id=\"item_length"+rand+"\" data-amount-id=\"item_amount"+rand+"\" name=\"bill[items_attributes][new_items][rate]\"\/> \n      \n<input class=\"input-small item_length\" id=\"item_length"+rand+" \"name=\"bill[items_attributes][new_items][length]\" size=\"30\" type=\"text\" placeholder=\"Length\" data-metric-id=\"product_metric"+rand+"\" data-rate-id=\"item_rate"+rand+"\" data-amount-id=\"item_amount"+rand+"\" name=\"bill[items_attributes][new_items][length]\"  \/> \n      \n    <input class=\"input-small item_amount\" id=\"item_amount"+rand+"\" name=\"total_amount\" placeholder=\"Total Amount\" type=\"text\" /> \n    \n    <input class=\"input-small\" id=\"product_metric"+rand+"\" name=\"metric\" type=\"hidden\" />\n  \n  <span id=\"metric\"><\/span>\n  <input id=\"bill_items_attributes_new_items__destroy\" name=\"bill[items_attributes][new_items][_destroy]\" type=\"hidden\" value=\"false\" />\n  <input id=\"bill_items_attributes_new_items__destroy\" name=\"bill[items_attributes][new_items][_destroy]\" type=\"hidden\" value=\"false\" /><span id=\"remove\"><a href=\"#\" onclick=\"remove_fields(this); return false;\"><i class=\'icon-remove close_item\'>  <\/i><\/a><\/span>\n\n<\/div>\n\n"); return false;    }
  });

  $('i.icon-remove.close_item').live('click',function () {
  });

$('ul #ui-active-menu-item').live('keydown',function(e){
if (e.which == 40 ||e.keyCode == 40 ) {

 for(var i=0;i<ul.length;i++){
      ul.childNodes[i].style.background = "red";
}
}
});
  
});
  



	
       
