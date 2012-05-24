var olds=new Array();
var oldids=new Array();
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
  
  $(window).keyup(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    $('#new_bill').submit();
    event.preventDefault();
    
    return false;
  });

  $('div.items_input_fields input.item_rate').live('keyup',function() {
    var $rate = parseFloat($(this).val(), 10);
    if(isNaN($rate)) {
      $rate = 1
    }
    var inp = $('div.items_input_fields input');
    var $index = inp.index($(this));
    var $prev = $(this).prev().val();
    var $size1_id = $(this).data("size1-id");
    var $size1 = parseFloat($("#"+$size1_id).val(), 10);
    var $size2_id = $(this).data("size2-id");
    var $size2 = parseFloat($("#"+$size2_id).val(), 10);
    var $length_id = $(this).data("length-id");
    var $length = parseFloat($("#"+$length_id).val(), 10);
    var $quantity_id = $(this).data("quantity-id");
    var $quantity = parseFloat($("#"+$quantity_id).val(), 10);  
    var $metric_id = $(this).data("metric-id");
    var $metric = parseFloat($("#"+$metric_id).val(), 10);
    var $amount_id = $(this).data("amount-id");
    
    switch($metric)
    {
      case 0 :
        if(isNaN((($length*$quantity)/144)*$size1*$size2*$rate)) {
          $("#"+$amount_id).val(0);
        }else{
          $("#"+$amount_id).val((($length*$quantity)/144)*$size1*$size2*$rate);
        }
        break;
      case 1 :
        if(isNaN($size1*$rate*$size2*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
          $("#"+$amount_id).val($size1*$rate*$size2*$quantity);
        }
		    break;	
      case 2 :
        if(isNaN($size1*$rate*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
          $("#"+$amount_id).val($size1*$rate*$quantity);
        }
        break;
    }

  });

  $('div.items_input_fields input.item_length').live('keyup',function() {
    var $length = parseFloat($(this).val(), 10).toFixed(2);
    var $rate = parseFloat($(this).prev().val(),10).toFixed(2);
    var $amount_id = $(this).data("amount-id");
    
    if(isNaN($rate*$length)) {
      $("#"+$amount_id).val(0);
    }else{
      $("#"+$amount_id).val(parseFloat($rate*$length).toFixed(2));
    }   
  });

  $('input#bill_advance').live('keyup', function() {
    var $advance = parseFloat($('input#bill_advance').val(), 10).toFixed(2);
    var $amount = parseFloat($('input#bill_amount').val(), 10).toFixed(2);
        
    if(isNaN($amount - $advance)) {
   	  parseFloat($('input#bill_balance').val(0)).toFixed(2);
    }else{
   	  ($('input#bill_balance').val(parseFloat($amount - $advance).toFixed(2)));
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


  $("input.item_no").live("keyup", function(e){
    var rand=Math.floor((Math.random()*100000)+1).toString();
    if (e.which == 43 ||e.keyCode == 43 ) 
    {
      add_fields(this, "items", "\n  <div class=\"items_input_fields\" >\n    <input class=\"input-small\" data-autocomplete=\"/products/autocomplete_product_code\" data-update-elements=\"{&quot;name&quot;:&quot;#product_name&quot;,&quot;size&quot;:&quot;#product_size&quot;,&quot;category&quot;:&quot;#product_metric"+rand+"&quot;}\" id=\"bill_items_attributes_new_items_product_code\" name=\"bill[items_attributes][new_items][product_code]\" placeholder=\"Type code here\" size=\"30\" type=\"text\" /> \n\n <input class=\"input-small item_product_name\" id=\"product_name\" name=\"product_name\" size=\"30\" type=\"text\" placeholder=\"Product Name\" readonly=\"readonly\" \/>\n\n <input class=\"input-small item_product_size\" id=\"product_size\" name=\"product_size\" size=\"30\" type=\"text\" placeholder=\"Product Size\" readonly=\"readonly\" \/>\n\n <input class=\"input-small \" id=\"sold_qty\"  name=\"bill[items_attributes][new_items][sold_qty]\" size=\"30\" type=\"text\" placeholder=\"Sold Quantity\" \/> <input class=\"input-small item_rate\" id=\"item_rate"+rand+" \" size=\"30\" type=\"text\" placeholder=\"Rate\" data-metric-id=\"product_metric"+rand+"\" data-length-id=\"item_length"+rand+"\" data-amount-id=\"item_amount"+rand+"\" name=\"bill[items_attributes][new_items][rate]\"\/> \n      \n<input class=\"input-small item_length\" id=\"item_length"+rand+" \"name=\"bill[items_attributes][new_items][length]\" size=\"30\" type=\"text\" placeholder=\"Length\" data-metric-id=\"product_metric"+rand+"\" data-rate-id=\"item_rate"+rand+"\" data-amount-id=\"item_amount"+rand+"\" name=\"bill[items_attributes][new_items][length]\"  \/> \n      \n    <input class=\"input-small item_no\" id=\"item_no\" name=\"bill[items_attributes][new_items][no]\" placeholder=\"No\" size=\"30\" type=\"text\" /> \n        \n    <input class=\"input-small item_amount\" id=\"item_amount"+rand+"\" name=\"total_amount\" placeholder=\"Total Amount\" type=\"text\" /> \n    \n    <input class=\"input-small\" id=\"product_metric"+rand+"\" name=\"metric\" type=\"hidden\" />\n\n    <span id=\"metric\"><\/span> <label class=\"input-small\" for=\"bill_items_attributes_new_items__destroy\">Remove:<\/label>\n      <input name=\"bill[items_attributes][new_items][_destroy]\" type=\"hidden\" value=\"0\" /><input id=\"bill_items_attributes_new_items__destroy\" name=\"bill[items_attributes][new_items][_destroy]\" type=\"checkbox\" value=\"1\" />  <\/div>"); return false;
    }
  });

  $('i.icon-remove.close_item').live('click',function () {
  });
  
});
  



	
       
