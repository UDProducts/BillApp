class AddTotalCftToBill < ActiveRecord::Migration
  def change
   add_column :bills, :total_cft, :string
  end
end
