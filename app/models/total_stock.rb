class TotalStock < ActiveRecord::Base
  belongs_to :product

  validates_uniqueness_of :product_id
end
