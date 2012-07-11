class ChangeDimensionsTypeInProducts < ActiveRecord::Migration
  def change
  change_column :products, :size1, :decimal
  change_column :products, :size2, :decimal
  end
end
