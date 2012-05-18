class RemoveSizeFromProducts < ActiveRecord::Migration
  def change
   remove_column :products, :size
   add_column :products, :size1, :integer
   add_column :products, :size2, :integer

  end
end
