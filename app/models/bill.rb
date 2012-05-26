class Bill < ActiveRecord::Base
  
  belongs_to :customer
  has_many :items
  has_many :stocks
  validates :items, :presence =>true
  validates :code,:presence => true
  
  

  accepts_nested_attributes_for :items, :allow_destroy => true
  accepts_nested_attributes_for :stocks, :allow_destroy => true

  def self.search(search)
  if search
    find(:all, :include => :customer, :conditions => ['amount LIKE ? OR code LIKE ? OR created_at LIKE ?', ["%#{search}%"]*3].flatten)
  else
    find(:all)
  end
 end 

  def self.date(date) 
    where('created_at = ?', date )
  end

  def customer_name
    customer.name if customer
  end
  
  def customer_name=(name)
    self.customer= Customer.find_or_create_by_name(name) unless name.blank?
  end
  
  def customer_phoneno
    customer.phoneno if customer
  end
  
  def customer_phoneno=(phoneno)
    self.customer= Customer.find_or_create_by_phoneno(phoneno) unless name.blank?
  end
 

end
