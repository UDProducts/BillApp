class Customer < ActiveRecord::Base
has_many :bills
accepts_nested_attributes_for :bills

 def self.search(search)
  if search
    find(:all, :conditions => ['name LIKE ? OR email LIKE ? OR balance LIKE ? OR ADDRESS LIKE ? OR PHONENO LIKE ?', ["%#{search}%"]*5].flatten)
  else
    find(:all)
  end
 end 

  #def customer_details
   # self.phoneno + " [" + self.name.camelize + "]"
  #end

  def customer_details
    self.phoneno 
  end

end
