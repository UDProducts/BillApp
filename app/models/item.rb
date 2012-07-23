class Item < ActiveRecord::Base
  belongs_to :bill
  belongs_to :product
  validates :sold_qty, :presence =>true
  validates :product_id, :presence =>true
  validates :rate, :presence =>true
  
  attr_accessor :item_volume


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

  
 def product_size1
   product.size1 if product
 end
  
  def product_size1=(size1)
   self.product= Product.find_by_size1(size1) unless size1.blank?
  end
  
 def product_size2
   product.size2 if product
 end
  
  def product_size2=(size2)
   self.product= Product.find_by_size2(size2) unless size2.blank?
  end
  
 def product_category
  product.category if product
 end

 def product_category=(category)
 self.product= Product.find_by_category(category) unless name.blank?
 end

  def product_items
   self.product=Product.all
   return self.product
  end


end
