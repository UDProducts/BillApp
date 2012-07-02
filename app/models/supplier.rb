class Supplier < ActiveRecord::Base
has_many :stocks
accepts_nested_attributes_for :stocks

def self.search(search)
  if search
    find(:all,:conditions => ['phoneno LIKE ? OR name LIKE ? OR created_at LIKE ?', ["%#{search}%"]*3].flatten)
  else
    find(:all)
  end
 end 

def supplier_name
    self.name 
    
  end

 def supplier_name=(name)
    self.supplier=Supplier.find_by_name(name) unless name.blank?
    return name
 end

def supplier_phoneno
   self.phoneno  
  end
  
 def supplier_phoneno=(phoneno)
    self.supplier=Supplier.find_by_phoneno(phoneno) unless phoneno.blank?
    #return phoneno
 end
  
def supplier_address
   self.address  
  end
  
 def supplier_address=(address)
    self.supplier=Supplier.find_by_address(address) unless address.blank?
    #return phoneno
 end


end
