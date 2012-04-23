class Item < ActiveRecord::Base
  belongs_to :bill
  belongs_to :product

 def product_code
  product.code if product
 end

 def product_code=(code)
 self.product= Product.find_by_code(code) unless code.blank?
 end

 def product_name
  product.name if product
 end

 def product_name=(name)
 self.product= Product.find_by_name(name) unless name.blank?
 end

 def product_category
  product.category if product
 end

 def product_category=(category)
 self.product= Product.find_by_category(category) unless name.blank?
 end



end
