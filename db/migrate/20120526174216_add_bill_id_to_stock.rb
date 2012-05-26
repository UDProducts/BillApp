class AddBillIdToStock < ActiveRecord::Migration
  def change
  add_column :stocks, :bill_id, :integer
  end
end
