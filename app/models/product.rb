class Product < ActiveRecord::Base
has_one :total_stock
has_many :items
has_many :stocks
validates :code,:name, :presence => true
#validates :code, :uniqueness => true
accepts_nested_attributes_for :stocks, :allow_destroy => true
 def self.search(search)
  if search
    find(:all, :conditions => ['name LIKE ? OR code LIKE ? OR size1 LIKE ? OR size2 LIKE ?', ["%#{search}%"]*4].flatten)
  else
    find(:all)
  end
 end 

  def product_details
    self.code + " [" + self.name.camelize + "]"
  end


end
