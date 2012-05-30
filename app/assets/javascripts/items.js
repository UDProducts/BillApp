
function add_fields(link, association, content) {
        //var new_id = new Date().getTime();
        //var new_id =link.parentNode.id;
       var new_id=Math.random()*10000;
        
        var regexp = new RegExp("new_" + association, "g");
        $("div.well.items_area").append(content.replace(regexp, new_id));
        // $("div.items_input_fields:last").append(content.replace(regexp, new_id));
        //  $(link).closest().before(content.replace(regexp, new_id));
       // $(" div.items_input_fields:last").after(content.replace(regexp, new_id));
          //$(" div.items_input_fields:last").after(content.replace(regexp));
         // $("div.well.items_area").before(content.replace(regexp, new_id));
        
}

$(document).ready(function() {
});
