class AddCodeToStocks < ActiveRecord::Migration
  def change
  add_column :stocks, :code, :integer
  end
end
