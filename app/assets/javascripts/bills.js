var x;
function remove_fields(link) {
 //alert($(link).prev("input[type=hidden]").val());
  //alert($(this).prev().prev().val());
//  alert($(link).closest("input[type=text].item_amount").val("0"));
//  $(link).closest("input[type=hidden].item_destroy").val("1");
//    $(link).prev("input[type=hidden]").val("1");
    //alert( $(link).prev().prev().prev("input[type=text]").val());
  //$(link).closest(".items_input_fields").hide();
 // alert($(link).prev().prev("input[type=hidden]").val());
  ////  alert($(link).closest("input[type=hidden].item_destroy").attr("name"));
  
  //$('input#bill_gross').val($('div.items_input_fields input.item_amount').sumValues());
}


$(document).ready(function() {
$('li.accordion-inner').live('click',function(){//alert($(this).text());

//$(this).css({position:'absolute', display:'inline',width:'20%',
  //     overflow: 'hidden',background: 'red', float: 'left'});
//var $id=$(this).attr('id');
//$("li.accordion-inner[id!=$id]").hide();
var sizecode=$(this).text();
var sep=sizecode.split('-');
//alert("sizecode="+sizecode);
//alert("sizecode length="+sizecode.length);
//alert(/A-Z/.test(sizecode));
if(sizecode.length<100)
{
//alert("code is"+$(this).attr("code"));
$("input.ui-autocomplete-input:last").val($(this).attr("code"));
//alert($(this).closest('div.accordion').attr("data"));
var $prod_name=$(this).closest('div.accordion').attr("data").concat("(").concat(sizecode).concat(")");
$prod_name=$prod_name.replace(/\s/g, "");
//alert($prod_name);
$("input.item_product_name:last").val($prod_name);
$("input.item_product_size1:last").val($(this).attr("size1"));
$("input.item_product_size2:last").val($(this).attr("size2"));
$("input.item_metric:last").val($(this).attr("metric"));
$("input.ui-autocomplete-input:last").keyup();
$("input.ui-autocomplete-input:last").change();
$("input.item_product_name:last").change();
$("input.item_product_name:last").keyup();
$("input.item_product_size1:last").keyup();
$("input.item_product_size2:last").keyup();
$("input.item_length:last").focus();
}

//alert($(this).closest('div.accordion').attr("id"));
//alert(size1);
//$("input#product_code:last").val(@h.key($(this).text()));
//jQuery('input[data-autocomplete]').railsAutocomplete();
});

$("#accordionNested").msAccordion({defaultid:2});
$("#accordionNestedChild").msAccordion({defaultid:2, vertical:true});	
/*$(".collapse").collapse()({
  toggle: true,
  show:false
  
  });

//$(".collapse").collapse();
 //$('div#two').liteAccordion();
/*$('div#two').live('click', function(){
$('div#two').liteAccordion();
});*/

  var $x=0;
  $('input#bill_plane').live('keyup', function() {
     var $total_volume = $("input#bill_volume").val();
     
     if(isNaN($total_volume * $(this).val())) {
        $("#bill_plane_amt").val(0);
     } else {
        $("#bill_plane_amt").val(parseFloat($total_volume * $(this).val()).toFixed(2));
     }       
  });
  var y=0;
  var $bill_volume=0;
  $('.ui-autocomplete-input').live('change',function(){//alert("value changed");
   //alert($(this).next().next().next().next().next().next().next().next().next().val());
     if($(this).next().next().next().next().next().next().next().next().next().val()==='2'){
     $(this).next().next().next().next().val(0);
     $(this).next().next().next().next().next().focus();
  }
  });
  $('div.items_input_fields input').live('keyup', function() {//alert("in ku");
   $('input#bill_gross').val($('input.item_amount').sumValues());
    /*if(typeof y=="undefined"||y==0){y=1;
      $bill_volume = $('#bill_volume').val();
     //alert($bill_volume);
    if(isNaN($bill_volume)) {
            $bill_volume=0;
    }
    // alert("0");
          }*/
    var $temp_volume = parseFloat($('#bill_volume').val()); 
     if(isNaN($temp_volume)) {
            $temp_volume=0;
    }
     // alert($temp_volume);
    var $total_volume = 0;
    var $item_volume = 0; 
    var $total_area=0;
    var $item_area = 0;
    var $total_len = 0;
    var $item_len =0;
    //alert($(this).data("size1-id"));
    $("div.items_input_fields input").each(function () {
      if ($(this).attr("name") === "metric") {
          var $size1_id = $(this).data("size1-id");
          var $size1 = parseFloat($("#"+$size1_id).val(), 10);
          $size1=parseFloat($(this).prev().prev().prev().prev().prev().prev().prev().val());
           //$size1=$(this).prev().prev().prev().prev().prev().prev().prev().val();

 	  
          var $size2_id = $(this).data("size2-id");
          var $size2 = parseFloat($("#"+$size2_id).val(), 10);
          $size2=parseFloat($(this).prev().prev().prev().prev().prev().prev().val());
          var $length_id = $(this).data("length-id");
          var $length = parseFloat($("#"+$length_id).val(), 10);
          $length=parseFloat($(this).prev().prev().prev().prev().prev().val());
          //alert($length);
          var $quantity_id = $(this).data("quantity-id");
          var $quantity = parseFloat($("#"+$quantity_id).val(), 10);
          $quantity=parseFloat($(this).prev().prev().prev().prev().val());
    //var $metric_id = $(this).data("metric-id");
    var $metric = $(this).val();
   // alert("met is "+$metric);
      
    switch($metric)
    {
      case "1" :
        //alert("1 1");
        if(isNaN((($length*$quantity)/144)*$size1*$size2)) {
          $(this).prev().prev().prev().val('0 cft');
        }else{
          //alert("1");
          $(this).prev().prev().prev().val(((($length*$quantity)/144)*$size1*$size2).toFixed(2)+" cft");
          
        }
        $item_volume = $(this).prev().prev().prev().val().replace("cft","");
        $total_volume = parseFloat($item_volume) + parseFloat($total_volume);
        if(isNaN($total_volume)) {
            $("#bill_volume").val($temp_volume);

          } else {
           //alert($total_volume);
          //alert("1");
            $("#bill_volume").val($total_volume);
          }
          
        break;
      case "2":
       // alert("1 2");
        if(isNaN($size1*$size2*$quantity)) {
          $(this).prev().prev().prev().val('0 sqft');
        }else{
         // alert("2");
          
          $(this).prev().prev().prev().val(($size1*$size2*$quantity).toFixed(2)+" sqft");
        }
         // $item_volume = parseFloat($(this).prev().prev().prev().val().replace("sqft",""));
           $item_area = $(this).prev().prev().prev().val().replace("sqft","");
        $total_area = parseFloat($item_area) + parseFloat($total_area);
        if(isNaN($total_area)) {
            $("#bill_area").val($temp_volume);

          } else {
           //alert($total_volume);
          //alert("1");
            $("#bill_area").val($total_area);
          }
        


         //$item_volume = $(this).prev().prev().prev().val();
        break;	
      case "3" :
        //alert("1 3");
        
        if(isNaN($size1*$quantity)) {
          $(this).prev().prev().prev().val("0 ft");
        }else{
          //alert("3");
          $(this).prev().prev().prev().val(($size1*$quantity).toFixed(2)+" ft");
        }
         //$item_volume = parseFloat($(this).prev().prev().prev().val().replace("ft",""));
         $item_len = $(this).prev().prev().prev().val().replace("ft","");
        $total_len = parseFloat($item_len) + parseFloat($total_len);
        if(isNaN($total_len)) {
            $("#bill_len").val($temp_volume);

          } else {
           //alert($total_volume);
          //alert("1");
            $("#bill_len").val($total_len);
          }
        break;
       case "4" :$(this).prev().prev().prev().val("0");
                 //alert("4");
         break;
    }
      // $item_volume = parseFloat((((($length*$quantity)/144)*$size1*$size2)).toFixed(2));
       
         
          //alert($item_volume);
          //$total_volume =  parseFloat($item_volume) + parseFloat($total_volume);
          

            

    
// alert("alert");
/*        if($(this).attr("value") !="1"){
         $(this).prev().prev().prev().val(0);
         }
        if ($(this).attr("value") === "1") {//alert($total_volume);
          var $size1_id = $(this).data("size1-id");
          var $size1 = parseFloat($("#"+$size1_id).val(), 10);
          $size1=parseFloat($(this).prev().prev().prev().prev().prev().prev().prev().val());
          var $size2_id = $(this).data("size2-id");
          var $size2 = parseFloat($("#"+$size2_id).val(), 10);
          $size2=parseFloat($(this).prev().prev().prev().prev().prev().prev().val());
          var $length_id = $(this).data("length-id");
          var $length = parseFloat($("#"+$length_id).val(), 10);
          $length=parseFloat($(this).prev().prev().prev().prev().prev().val());
          //alert($length);
          var $quantity_id = $(this).data("quantity-id");
          var $quantity = parseFloat($("#"+$quantity_id).val(), 10);
          $quantity=parseFloat($(this).prev().prev().prev().prev().val());
          //alert("size1="+$size1);
	  //alert("size2="+$size2);
           
          $item_volume = parseFloat((((($length*$quantity)/144)*$size1*$size2)).toFixed(2));
         // $total_volume = (parseFloat((((($length*$quantity)/144)*$size1*$size2)).toFixed(2)) + parseFloat///($total_volume));
          //alert($item_volume);
          $total_volume =  parseFloat($item_volume) + parseFloat($total_volume);
          if(isNaN($item_volume)) {
            $(this).prev().prev().prev().val(0);
// alert("0");
          } else {
           //alert($total_volume);
          //alert("1");
            $(this).prev().prev().prev().val($item_volume);
          }
          

           //$total_volume = (((($length*$quantity)/144)*$size1*$size2).toFixed(2)) ;
           //alert($total_volume);
          if(isNaN($total_volume)) {
            $("#bill_volume").val($temp_volume);
// alert("0");
          } else {
           //alert($total_volume);
          //alert("1");
            $("#bill_volume").val($total_volume);
          }
          
// alert($(this).data("size1-id"));
        }*/
          
     }
 
    });
      
    
    // Updating discount
    var $bill_net = parseFloat($('input#bill_net').val());
    var $bill_discount = parseFloat($('input#bill_discount').val());
    //alert($int_vamount + $bill_gross);
    if(isNaN( $bill_net - $bill_discount)) {
      $('input#bill_total').val($bill_net);
    }else{
     $('input#bill_total').val(parseFloat( $bill_net - $bill_discount).toFixed(2));
    }
    
    //
      
  });
  
  // 115 => S, 19 => Enter
  $("div.items_input_fields input").live('change', function(event) {

//     alert("second in");
//    $("div.items_input_fields input").each(function () {
//      alert($(this).attr("name"));
//      if (this.attr("name") == "metric") {
//          alert("asdf");
//         alert($(this).attr("value")); 
//  }
       
      
 //   });
  
  
  });
  
  $('div.items_input_fields input.item_rate').live('keyup',function() {
        var $rate = parseFloat($(this).val(), 10);
      //alert(("#"+($(this).prev().data("length-id"))).val());
       // <ul class="item_headers_group">
    //var $q_id=$(this).prev().prev().data("length-id");
    //var $q = parseFloat($("#"+$q_id).val(),10);
   // alert($q);
    //alert($("#"+$q_id).val());
    var $quantity_id = $(this).data("quantity-id");
    var $quantity = parseFloat($("#"+$quantity_id).val(), 10);
   // alert("quantity="+$quantity);
    // var $rate = $(this).prev().val();
    
    if(isNaN($quantity)) {
      $rate = 0
    }
    
    var $size1_id = $(this).data("size1-id");
    var $size1 = parseFloat($("#"+$size1_id).val(), 10);
    //var $size1 =($(this).prev().prev().prev().prev().val());
    //alert($size1);
    var $size2_id = $(this).data("size2-id");
    var $size2 = parseFloat($("#"+$size2_id).val(), 10);
    //alert("size2-id= "+$size2_id);
    //alert("size2= "+$size2);
    //var $size2 = parseFloat($(this).prev().prev().prev().val());
    
    //var $length_id = $(this).data("length-id");
    //var $length = parseFloat($("#"+$length_id).val(), 10);
    var $length_id = $(this).data("length-id");
     //alert("length-id="+$length_id);
     
   // var $length = parseFloat($("#"+$length_id).val(), 10);
     var $length = parseFloat($(this).prev().prev().prev().val(), 10);
     //alert("length="+$length);
   // var $length = parseFloat($length_id.val(), 10);
    //var $length = $("#"+$length_id).attr("value");
    //alert("length= "+$(this).data("length-id").value);
    //var $quantity = parseFloat($(this).prev().prev().val()); 
     
    /*if(isNaN($length)) {
      $length = 1
    }*/
    
    var $metric_id = $(this).data("metric-id");
    var $metric = $("#"+$metric_id).val();
   // alert("metric="+$metric);
  //  var $metric = parseFloat($(this).next().next().val()); 
    
    var $amount_id = $(this).data("amount-id");
    var $amount = parseFloat($("#"+$amount_id).val(), 10);
    
    if(isNaN($amount)) {
      $amount = 0
    }
/*
    alert("metric= "+$metric);
    alert("rate= "+$rate);
    alert("length= "+$length);
    alert("size1= "+$size1);
    alert("size2= "+$size2);
    alert("quantity= "+$quantity);
    alert("v = "+ ($length*$quantity/144)*$size1*$size2*$rate);
    alert("val="+(($length*$quantity)/144)*$size1*$size2*$rate);
*/  
    switch($metric)
    { 
      case "1" :
        //alert("1 1");
         //alert("size1= "+$size1);
        //alert("size2= "+$size2);
        //alert("quantity= "+$quantity);
        //alert("rate= "+$rate);
       //alert("length= "+$length);
        if(isNaN((($length*$quantity)/144)*$size1*$size2*$rate)) {
          $("#"+$amount_id).val(0);
        }else{
          //alert("1");
          $("#"+$amount_id).val(((($length*$quantity)/144)*$size1*$size2*$rate).toFixed(2));
        }
        break;
      case "2":
        //alert("1 2");
        //alert("size1= "+$size1);
       //alert("size2= "+$size2);
       //alert("quantity= "+$quantity);
        //alert("rate= "+$rate);
        if(isNaN($size1*$rate*$size2*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
         // alert("2");
          $("#"+$amount_id).val(($size1*$rate*$size2*$quantity).toFixed(2));
        }
        break;	
      case "3" :
        //alert("1 3");
        if(isNaN($size1*$rate*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
          //alert("3");
          $("#"+$amount_id).val(($size1*$rate*$quantity).toFixed(2));
        }
        break;
      case "4" :
        $("#"+$amount_id).val(($rate*$quantity).toFixed(2));
    }
            
    $('input#bill_gross').val(parseFloat($('div.items_input_fields input.item_amount').sumValues()));
});
  
  $('div.items_input_fields input.item_quantity').live('keyup',function() {
      var $quantity = parseFloat($(this).val(), 10);
       // <ul class="item_headers_group">

    var $rate_id = $(this).data("rate-id");
    var $rate = parseFloat($("#"+$rate_id).val(), 10);
    // var $rate = $(this).prev().val();
    
    if(isNaN($rate)) {
      $rate = 0
    }
    
    var $size1_id = $(this).data("size1-id");
    var $size1 = parseFloat($("#"+$size1_id).val(), 10);
    //var $size1 =parseFloat($(this).prev().prev().prev().prev().val());
    
    var $size2_id = $(this).data("size2-id");
    var $size2 = parseFloat($("#"+$size2_id).val(), 10);
    //var $size2 = parseFloat($(this).prev().prev().prev().val());
    
    //var $length_id = $(this).data("length-id");
    //var $length = parseFloat($("#"+$length_id).val(), 10);
    var $length_id = $(this).data("length-id");
    var $length = parseFloat($("#"+$length_id).val(), 10);
    
    //var $quantity = parseFloat($(this).prev().prev().val()); 
     
    if(isNaN($length)) {
      $length = 1
    }
    
    var $metric_id = $(this).data("metric-id");
    var $metric = $("#"+$metric_id).val();
  //  var $metric = parseFloat($(this).next().next().val()); 
    
    var $amount_id = $(this).data("amount-id");
    var $amount = parseFloat($("#"+$amount_id).val(), 10);
    
    if(isNaN($amount)) {
      $amount = 0
    }
/*
    alert("metric= "+$metric);
    alert("rate= "+$rate);
    alert("length= "+$length);
    alert("size1= "+$size1);
    alert("size2= "+$size2);
    alert("quantity= "+$quantity);
    alert("v = "+ ($length*$quantity/144)*$size1*$size2*$rate);
    alert("val="+(($length*$quantity)/144)*$size1*$size2*$rate);
*/
    switch($metric)
    {
      case "1" :
      //  alert("1 1");
        if(isNaN((($length*$quantity)/144)*$size1*$size2*$rate)) {
          $("#"+$amount_id).val(0);
        }else{
       //   alert("1");
          $("#"+$amount_id).val(((($length*$quantity)/144)*$size1*$size2*$rate).toFixed(2));
        }
        break;
      case "2":
       // alert("1 2");
        if(isNaN($size1*$rate*$size2*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
       //   alert("2");
          $("#"+$amount_id).val(($size1*$rate*$size2*$quantity).toFixed(2));
        }
        break;	
      case "3" :
      //  alert("1 3");
        if(isNaN($size1*$rate*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
       //   alert("3");
          $("#"+$amount_id).val(($size1*$rate*$quantity).toFixed(2));
        }
        break;
    }

    $('input#bill_gross').val(parseFloat($('div.items_input_fields input.item_amount').sumValues()));
    //$(this).next().next().focus();
});
$('div.items_input_fields input.item_quantity').live('change',function(e) {
$(this).next().next().focus();
});
  $('div.items_input_fields input.item_length').live('keyup',function(e) {//alert("ji");
      var $length = parseFloat($(this).val(), 10);
       // <ul class="item_headers_group">

    var $rate_id = $(this).data("rate-id");
    var $rate = parseFloat($("#"+$rate_id).val(), 10);
    // var $rate = $(this).prev().val();
    
    if(isNaN($rate)) {
      $rate = 0
    }
    
    var $size1_id = $(this).data("size1-id");
    var $size1 = parseFloat($("#"+$size1_id).val(), 10);
    //var $size1 =parseFloat($(this).prev().prev().prev().prev().val());
    
    var $size2_id = $(this).data("size2-id");
    var $size2 = parseFloat($("#"+$size2_id).val(), 10);
    //var $size2 = parseFloat($(this).prev().prev().prev().val());
    
    //var $length_id = $(this).data("length-id");
    //var $length = parseFloat($("#"+$length_id).val(), 10);
    var $quantity_id = $(this).data("quantity-id");
    var $quantity = parseFloat($("#"+$quantity_id).val(), 10);
    //var $quantity = parseFloat($(this).prev().prev().val()); 
     
    if(isNaN($quantity)) {
      $quantity = 0
    }
    
    var $metric_id = $(this).data("metric-id");
    var $metric = $("#"+$metric_id).val();
  //  var $metric = parseFloat($(this).next().next().val()); 
    
    var $amount_id = $(this).data("amount-id");
    var $amount = parseFloat($("#"+$amount_id).val(), 10);
    
    if(isNaN($amount)) {
      $amount = 0
    }
/*
    alert("metric= "+$metric);
    alert("rate= "+$rate);
    alert("length= "+$length);
    alert("size1= "+$size1);
    alert("size2= "+$size2);
    alert("quantity= "+$quantity);
    alert("v = "+ ($length*$quantity/144)*$size1*$size2*$rate);
    alert("val="+(($length*$quantity)/144)*$size1*$size2*$rate);
*/
    switch($metric)
    {
      case "1" :
      //  alert("1 1");
        if(isNaN((($length*$quantity)/144)*$size1*$size2*$rate)) {
          $("#"+$amount_id).val(0);
        }else{
       //   alert("1");
          $("#"+$amount_id).val(((($length*$quantity)/144)*$size1*$size2*$rate).toFixed(2));
        }
        break;
      case "2":
      //  alert("1 2");
        if(isNaN($size1*$rate*$size2*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
        //  alert("2");
          $("#"+$amount_id).val(($size1*$rate*$size2*$quantity).toFixed(2));
        }
        break;	
      case "3" :
       // alert("1 3");
        if(isNaN($size1*$rate*$quantity)) {
          $("#"+$amount_id).val(0);
        }else{
         // alert("3");
          $("#"+$amount_id).val(($size1*$rate*$quantity).toFixed(2));
        }
        break;
    }

   // alert ($(this).next().val()) ;
    $('input#bill_gross').val(parseFloat($('div.items_input_fields input.item_amount').sumValues()));

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


  $('input#bill_advance').live('keyup', function(e) {
    var $advance = parseFloat($('input#bill_advance').val(), 10).toFixed(2);
    var $bill_total = parseFloat($('input#bill_total').val(), 10).toFixed(2);
    //var $dues = parseFloat($('input#customer_dues').val(), 10).toFixed(2);
    
    if(isNaN($bill_total - $advance)) {
//   	  parseFloat($('input#bill_balance').val(0)).toFixed(2);
      ($('input#bill_balance').val(parseFloat($bill_total).toFixed(2)));
    }else{
   	  ($('input#bill_balance').val(parseFloat($bill_total - $advance).toFixed(2)));
    }
    
  
   });

   $('input#bill_gross').live('keyup',function(e) {
  var keyCode = e.keyCode || e.which; 
   
   if (keyCode == 9 || keyCode == 13 ) { 
     e.preventDefault(); 
     var $dues = parseFloat($('input#customer_dues').val()).toFixed(2);
     // alert($dues);
      
    if(isNaN($dues)) {
   	  parseFloat($('input#customer_dues').val($('input#bill_balance').val())).toFixed(2);
    }else{
   	  $('input#customer_dues').val((parseFloat($('input#bill_balance').val())+parseFloat($dues)));
    }

    
    
  } 
  
  
   });

$('input.item_amount').live('keyup', function(e){
  var keyCode = e.keyCode || e.which;
  //alert(keyCode);
 /* if(keyCode == 9) {
   e.preventDefault();
    $("#add_new_item").trigger('click');
  }*/
  //$("div.items_input_fields input").each(function () {
  if(keyCode == 13) {//alert($(this).next().val());
    e.preventDefault();
    var $x=0;
   // var $i=0;
    $("div.items_input_fields input").each(function () {
      if ($(this).attr("name") === "metric") 
       {//$i++;
        //alert("this val:"+$(this).val());
    if($(this).val()=='1')
     $x=1;
     
      }
    });
    
  }
     
   if($x==1)
   {
      $('#bill_plane').focus();
   }
    else
    {
      $('#bill_discount').focus();
    }
});
 
  $('input#bill_vat').live('keyup', function() {
//    $('input#bill_gross').val(parseFloat($('div.items_input_fields input.item_amount').sumValues()));
   // var $bill_gross = parseFloat($('input#bill_gross').val(), 10);
    //var $bill_vat = parseFloat($('input#bill_vat').val(), 10);
    //var $vat_amount = parseFloat($bill_gross * $bill_vat / 100, 10);

    //var $int_vamount = parseFloat($vat_amount, 10).toFixed(2);
    var $bill_gross = parseFloat($('input#bill_gross').val());
    var $bill_vat = parseFloat($('input#bill_vat').val());
    var $bill_plane_amt = parseFloat($('input#bill_plane_amt').val());
    var $vat_amount = parseFloat($bill_gross * $bill_vat / 100);
    var $int_vamount = parseFloat($vat_amount);
    //alert($int_vamount + $bill_gross);
    if(isNaN($int_vamount + $bill_gross + $bill_plane_amt)) {
     	$('input#bill_net').val($bill_gross);
    }else{
    	$('input#bill_net').val(parseFloat($int_vamount + $bill_gross  + $bill_plane_amt).toFixed(2));
    }
  });

$('input#bill_discount').live('keyup', function() {
    var $bill_net = parseFloat($('input#bill_net').val());
    var $bill_plane_amt = parseFloat($('input#bill_plane_amt').val());
    
    //alert($bill_plane_amt);
    if(isNaN($bill_net))
    {
     $('input#bill_net').val($('input#bill_gross').val());
     $bill_net = parseFloat($('input#bill_net').val());
    }
    if(isNaN($bill_plane_amt))
    {
     $('input#bill_plane_amt').val(0);
     
    }

    var $bill_discount = parseFloat($('input#bill_discount').val());
    //alert($int_vamount + $bill_gross);
    if(isNaN( $bill_net - $bill_discount)) {
     	$('input#bill_total').val($bill_net);
    }else{
    	$('input#bill_total').val(parseFloat( $bill_net - $bill_discount).toFixed(2));
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
 $('input').live( 'keydown',function(e) {//alert($(this).attr("class")); 
        var $key = $(this).attr("class");
        //alert($key);
      if($key!="input-small item_amount"||$key!="input-small advance_input"){
        if( e.which == 13 || e.keyCode == 13 ) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq( inputs.index($(this))+ 1 ).focus();
            e.preventDefault();
        }
      }
      
    });
  $('input.advance_input').live('keydown',function(e){
      if( e.which == 13 || e.keyCode == 13 ) {
       e.preventDefault();
       $('input#btn-save').focus();
      }
  });
  $('input#btn-save').live('keydown',function(e){
     if( e.which == 13 || e.keyCode == 13 ) {
       e.preventDefault();
       $("#new_bill").submit();
      }
  });

  $("input.item_rate").live("keydown", function(e){//alert(e.which);
    var rand=Math.floor((Math.random()*100000)+1).toString();
    if (e.which == 107 ||e.keyCode == 107) 
    {  e.preventDefault();
      add_fields(this, "items", "<div class=\"items_input_fields\" id=\"item_val\" >\n  \n  <input class=\"input-small ui-autocomplete-input\" data-autocomplete=\"/products/autocomplete_product_code\" data-update-elements=\"{&quot;name&quot;:&quot;#product_name"+rand+"&quot;,&quot;size1&quot;:&quot;#product_size1"+rand+"&quot;,&quot;size2&quot;:&quot;#product_size2"+rand+"&quot;,&quot;category&quot;:&quot;#product_metric"+rand+"&quot;}\" id=\"product_code"+rand+"\" name=\"bill[items_attributes][new_items][product_code]\" placeholder=\"Type code here\" size=\"30\" type=\"text\" /> \n\n  <input class=\"input-large item_product_name\" id=\"product_name"+rand+"\" name=\"bill[items_attributes][new_items][product_name]\" size=\"30\" type=\"text\" placeholder=\"Product Name\" readonly=\"readonly\" \/>\n\n  <input class=\"input-small item_product_size1\" id=\"product_size1"+rand+"\" name=\"bill[items_attributes][new_items][product_size1]\" size=\"30\" type=\"hidden\"  readonly=\"readonly\" \/>\n\n <input class=\"input-small item_product_size2\" id=\"product_size2"+rand+"\" name=\"bill[items_attributes][new_items][product_size2]\" size=\"30\" type=\"hidden\" readonly=\"readonly\" \/>\n\n  <input class=\"input-small item_length\" id=\"item_length"+rand+" \"name=\"bill[items_attributes][new_items][length]\" size=\"30\" type=\"text\" placeholder=\"Length\" data-metric-id=\"product_metric"+rand+"\" data-quantity-id=\"item_quantity"+rand+"\" data-size1-id=\"product_size1"+rand+"\" data-size2-id=\"product_size2"+rand+"\" data-rate-id=\"item_rate"+rand+"\" data-amount-id=\"item_amount"+rand+"\" name=\"bill[items_attributes][new_items][length]\"  \/> \n      \n    <input class=\"input-small item_quantity\" id=\"item_quantity"+rand+"\"  name=\"bill[items_attributes][new_items][sold_qty]\" size=\"30\" type=\"text\" placeholder=\"Sold Quantity\" data-metric-id=\"product_metric"+rand+"\" data-length-id=\"item_length"+rand+"\" data-size1-id=\"product_size1"+rand+"\" data-size2-id=\"product_size2"+rand+"\" data-rate-id=\"item_rate"+rand+"\" data-amount-id=\"item_amount"+rand+"\" \/> <input class=\"input-small item_cft\" id=\"item_volume"+rand+"\" name=\"bill[items_attributes][new_items][cft]\" size=\"30\" type=\"text\" placeholder=\"Volume\"readonly=\"readonly\" \/>\n\n <input class=\"input-small item_rate\" id=\"item_rate"+rand+" \" size=\"30\" type=\"text\" placeholder=\"Rate\" data-length-id=\"item_length"+rand+"\"data-metric-id=\"product_metric"+rand+"\" data-quantity-id=\"item_quantity"+rand+"\"   data-size1-id=\"product_size1"+rand+"\" data-size2-id=\"product_size2"+rand+"\" data-amount-id=\"item_amount"+rand+"\" name=\"bill[items_attributes][new_items][rate]\"\/> \n      \n<input class=\"input-small item_amount\" id=\"item_amount"+rand+"\" name=\"bill[items_attributes][new_items][total_amount]\" placeholder=\"Total Amount\" type=\"text\" readonly=\"readonly\" \/> \n    \n     <input class=\"input-small item_metric\" id=\"product_metric"+rand+"\"data-rate-id=\"item_rate"+rand+"\" data-quantity-id=\"item_quantity"+rand+"\" data-length-id=\"item_length"+rand+"\" data-size1-id=\"product_size1"+rand+"\" data-size2-id=\"product_size2"+rand+"\"data-rate-id=\"item_rate"+rand+"\"  name=\"metric\" type=\"hidden\" />\n  \n   <input id=\"bill_items_attributes_new_items__destroy\" name=\"bill[items_attributes][new_items][_destroy]\" type=\"hidden\" value=\"false\" /><span id=\"remove\"><a href=\"#\" onclick=\"remove_fields(this); return false;\"><i class=\'icon-minus-sign close_item\'>  <\/i><\/a><\/span>\n\n<\/div>\n\n "); $('.input-small.ui-autocomplete-input:last').focus();return false;}

//$(this).next().focus();
           
  });


    $('span#remove').live('click',function () {
     $(this).prev("input[type]=hidden").val("1");
     $(this).closest(".items_input_fields").hide();
     //alert($(this).prev().prev().prev().val());
     $(this).prev().prev().prev().val(0);
     if($(this).prev().prev().val()==1){

          var $size1=parseFloat($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().val());
          //alert($size1);
          var $size2=parseFloat($(this).prev().prev().prev().prev().prev().prev().prev().prev().val());
          //alert("size2="+$size2);
          var $length=parseFloat($(this).prev().prev().prev().prev().prev().prev().prev().val());
          //alert($length);
          var $quantity=parseFloat($(this).prev().prev().prev().prev().prev().prev().val());
          //alert($quantity);
	  
          var $total_volume = parseFloat((((($length*$quantity)/144)*$size1*$size2)).toFixed(2));
          $(this).prev().prev().prev().prev().prev().val(0);
          
	$('input#bill_volume').val($('input#bill_volume').val()-$total_volume);
       }
    //var $amount = parseFloat($("#"+$amount_id).val(), 10);
    // alert($amount);
    
    $('input#bill_gross').val($('div.items_input_fields input.item_amount').sumValues());
    
    //$(".input-small ui-autocomplete-input:last").focus();
    //$(this).next().focus();
    //$("input#product_code:last").focus();
  });

$("input#product_code:last").focus();
$('ul #ui-active-menu-item').live('keydown',function(e){
if (e.which == 40 ||e.keyCode == 40 ) {

 for(var i=0;i<ul.length;i++){
      ul.childNodes[i].style.background = "red";
}
}
});
/*$("input#btn-save").live('click',function(){
$('.item_cft').each(function() {alert($(this).val());
$(this).val($(this).val().replace('\[a-z\]',''));
alert($(this).val());


});
$('#new_bill').submit();
});
  */
//$("div.panel").show();
$(".trigger").live('click',function(){
               // if($("div.panel").is(":hidden"))
                 // { //alert("hidden");
		    //$("div.panel").slideDown("fast"); 
                      //$(this).toggleClass("active"); 	
                 // }
                //else
		$("div.panel").toggle("fast");
                //alert($("div.panel").is(":hidden"));
		$(this).toggleClass("active");
		return false;
	});

});
  



	
       

