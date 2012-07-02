class Stock < ActiveRecord::Base
belongs_to :product
belongs_to :bill
belongs_to :supplier
#validates_numericality_of :quantity, :greater_than_or_equal_to =>:minimum_quantity, :only_integer =>:true, :on #=> :create, :message => "Stock does not meet requirement"
#validates :quantity, :numericality => true, :length => { :minimum => 0 }
def self.search(search)
  if search
    find(:all,:include => :supplier ,:conditions => ['stocks.cost LIKE ? OR stocks.quantity LIKE  ? OR suppliers.phoneno LIKE ?' , ["%#{search}%"]*3].flatten)
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
 
  def minimum_quantity

     if self.quantity<0
     errors.add_to_base('The number should be greater than or equal to 0')
     end
   return 0
  end
def supplier_name
    supplier.name if supplier
    
  end

 def supplier_name=(name)
    self.supplier=Supplier.find_by_name(name) unless name.blank?
    return name
 end
 
  
  def supplier_phoneno
   supplier.phoneno  if supplier
  end
  
 def supplier_phoneno=(phoneno)
    self.supplier=Supplier.find_by_phoneno(phoneno) unless phoneno.blank?
    #return phoneno
 end
  
def supplier_address
   supplier.address  if supplier
  end
  
 def supplier_address=(address)
    self.supplier=Supplier.find_by_address(address) unless address.blank?
    #return phoneno
 end
  
end



