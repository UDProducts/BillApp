class Customer < ActiveRecord::Base
has_many :bills

def self.search(search)
  if search
    find(:all, :include => :customer, :conditions => ['name LIKE ? OR email LIKE ? OR created_at LIKE ?', ["%#{search}%"]*3].flatten)
  else
    find(:all)
  end
 end 

end
