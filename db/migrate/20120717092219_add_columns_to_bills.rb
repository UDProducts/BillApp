class AddColumnsToBills < ActiveRecord::Migration
  def change
  add_column :bills, :total_sqft, :string
  add_column :bills, :total_ft, :string
  end
end
