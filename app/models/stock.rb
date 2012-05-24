class Stock < ActiveRecord::Base
belongs_to :product

def self.search(search)
  if search
    find(:all,:conditions => ['cost LIKE ? OR quantity LIKE ? OR created_at LIKE ?', ["%#{search}%"]*3].flatten)
  else
    find(:all)
  end
 end 


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
  
  def product_size1=(size)
   self.product= Product.find_by_size1(size) unless size.blank?
  end
 
def product_size2
   product.size2 if product
 end
  
  def product_size2=(size)
   self.product= Product.find_by_size2(size) unless size.blank?
  end
 
end
