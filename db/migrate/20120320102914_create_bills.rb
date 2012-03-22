class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.integer :subcategory_id
      t.integer :quantity
      t.integer :customer_id
      t.decimal :TotalAmt

      t.timestamps
    end
  end
end
