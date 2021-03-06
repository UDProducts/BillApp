module ApplicationHelper

  def sortable(column, title=nil)
    title ||=column.titleize
    css_class = column == sort_column ? "current #{sort_direction}" : nil
    direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
    if direction == "asc"
      link_to raw("<i class='icon-arrow-up'></i>" + title), {:sort => column, :direction => direction}, {:class => css_class}
    else
      link_to raw("<i class='icon-arrow-down'></i>" + title), {:sort => column, :direction => direction}, {:class => css_class}
    end
  end

 def generate_stock_code
    if Stock.last.nil?
      1001
    else
      Stock.last.id + 1001
    end
  end

  def generate_bill_code
   
    if Bill.last.nil?
      1001
    else
      Bill.last.id + 1001
    end
   
  end

  def rand_number
   return Random.rand(1234342).to_s
  end

  def link_to_add_fields(name, f, association)
    
    new_object = f.object.class.reflect_on_association(association).klass.new
    fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|
      render(association.to_s.singularize + "_fields", :f => builder)
    end  
    link_to_function(name, "add_fields(this, \"#{association}\", \"#{escape_javascript(fields)}\")", :id => "add_new_item")
  end

  def link_to_remove_fields(name, builder)
     
    builder.hidden_field(:_destroy) + link_to_function(name , "remove_fields(this)") 
  end
  
  def add_hour_and_min
    Time.now.hour.to_s + Time.now.min.to_s + Time.now.sec.to_s
  end
end


