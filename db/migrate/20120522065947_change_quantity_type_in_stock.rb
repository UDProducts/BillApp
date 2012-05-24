class ChangeQuantityTypeInStock < ActiveRecord::Migration
  def change
  change_column :stocks, :quantity, :integer
  end
end
